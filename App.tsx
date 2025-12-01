import React, { useState, useEffect, useRef, useCallback } from 'react';
import ThreeScene from './components/ThreeScene';
import Terminal from './components/Terminal';
import Portfolio from './components/Portfolio';
import { TerminalMessage } from './types';

const initialMessages: TerminalMessage[] = [
  { text: 'SYSTEM BOOTING...', type: 'system' },
  { text: 'LOADING DARSHAN_PORTFOLIO_V1.0', type: 'system' },
  { text: 'AWAITING USER INTERACTION.', type: 'system' },
];

export default function App() {
  const [messages, setMessages] = useState<TerminalMessage[]>(initialMessages);
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const addMessage = useCallback((text: string, type: 'system' | 'error') => {
    setMessages(prev => [...prev, { text, type }]);
  }, []);

  const setupAudio = useCallback((url: string, trackName: string) => {
    setIsAudioLoading(true);
    setCurrentTrack('');
    addMessage(`Initializing audio: ${trackName}`, 'system');
    
    // 1. Clean up previous audio player and source node
    if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.removeAttribute('src');
        audioPlayerRef.current.load();
    }
    if (audioSourceRef.current) {
        audioSourceRef.current.disconnect();
    }
    
    // 2. Initialize AudioContext and Analyser on first run
    if (!audioContextRef.current) {
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = context;
        
        const analyser = context.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        setFrequencyData(dataArray);

        analyser.connect(context.destination);
        addMessage('AUDIO ANALYSIS SYSTEM INITIALIZED.', 'system');
      } catch (e) {
        console.error("Error initializing AudioContext", e);
        addMessage('ERROR: AUDIO SYSTEM FAILED TO INITIALIZE.', 'error');
        setIsAudioLoading(false);
        return;
      }
    }

    // 3. Create a new player and source for the new track
    // Setting crossOrigin BEFORE src is important for CORS to work correctly with Web Audio API
    const player = new Audio();
    player.crossOrigin = "anonymous";
    player.src = url;
    player.loop = true;
    audioPlayerRef.current = player;

    const source = audioContextRef.current.createMediaElementSource(player);
    audioSourceRef.current = source;
    source.connect(analyserRef.current!);

    // 4. Set up event listeners
    player.onplay = () => {
      setIsAudioPlaying(true);
      setIsAudioLoading(false);
      setCurrentTrack(trackName);
      addMessage(`Playback started.`, 'system');
    };
    player.onpause = () => setIsAudioPlaying(false);
    player.onended = () => setIsAudioPlaying(false);
    player.onerror = (e) => {
      const error = player.error;
      console.error("Audio player error:", error, e);
      let message = 'Unknown audio error.';
      if (error) {
          switch (error.code) {
              case error.MEDIA_ERR_ABORTED:
                  message = 'Playback aborted by the user.';
                  break;
              case error.MEDIA_ERR_NETWORK:
                  message = 'A network error caused the download to fail.';
                  break;
              case error.MEDIA_ERR_DECODE:
                  message = 'An error occurred while decoding the media.';
                  break;
              case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                  message = 'The audio format is not supported or the source could not be found.';
                  break;
              default:
                  message = `An unknown error occurred. Code: ${error.code}`;
                  break;
          }
      } else {
        message = 'Network error or format not supported.';
      }
      addMessage(`ERROR: FAILED TO LOAD TRACK: ${trackName}. ${message}`, 'error');
      setIsAudioPlaying(false);
      setIsAudioLoading(false);
      setCurrentTrack('ERROR');
    };
    
    // 5. Attempt to play
    const playPromise = player.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Autoplay prevented:", error.message);
        if (audioContextRef.current?.state === 'suspended') {
          addMessage('Audio context suspended. Click play to start.', 'system');
        }
        setIsAudioLoading(false);
      });
    }
  }, [addMessage]);
  
  const startApp = useCallback(() => {
    if(showWelcome) {
       setShowWelcome(false);
       // Removed default audio setup to prevent autoplay
    }
  }, [showWelcome]);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(function animate() {
      if (analyserRef.current && frequencyData && audioPlayerRef.current && !audioPlayerRef.current.paused) {
        analyserRef.current.getByteFrequencyData(frequencyData);
        setFrequencyData(new Uint8Array(frequencyData));
      }
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, [frequencyData]);

  const handlePlayPause = useCallback(() => {
    const player = audioPlayerRef.current;
    if (player && !isAudioLoading) {
      if (player.paused) {
        if (audioContextRef.current?.state === 'suspended') {
          audioContextRef.current.resume().then(() => {
            player.play().catch(err => {
              console.error("Play action failed after resume:", err)
              addMessage('ERROR: Playback failed.', 'error');
            });
          });
        } else {
          player.play().catch(err => {
            console.error("Play action failed:", err);
            addMessage('ERROR: Playback failed.', 'error');
          });
        }
      } else {
        player.pause();
      }
    }
  }, [isAudioLoading, addMessage]);

  const handleAudioUpload = useCallback((file: File) => {
    // Revoke the old blob URL if it exists to prevent memory leaks
    if (audioPlayerRef.current && audioPlayerRef.current.src.startsWith('blob:')) {
      URL.revokeObjectURL(audioPlayerRef.current.src);
    }
    const fileURL = URL.createObjectURL(file);
    setupAudio(fileURL, file.name);
  }, [setupAudio]);
  
  useEffect(() => {
    return () => {
      // Component unmount cleanup
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        if (audioPlayerRef.current.src.startsWith('blob:')) {
          URL.revokeObjectURL(audioPlayerRef.current.src);
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(e => console.error('Failed to close AudioContext', e));
      }
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0e17]">
      {showWelcome && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0e17]/80 backdrop-blur-sm text-center p-4">
          <div className="text-center p-8">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white uppercase tracking-widest">Darshan</h1>
            <h2 className="mt-2 text-lg sm:text-xl md:text-2xl text-[#ff4e42] font-mono">AI & Robotics Portfolio</h2>
            <p className="mt-6 max-w-2xl text-gray-300">
              This is an interactive portfolio experience featuring a WebGL audio visualizer.
              Click below to enter.
            </p>
            <button
              onClick={startApp}
              className="mt-8 px-8 py-3 bg-[#ff4e42] text-white font-bold uppercase tracking-wider rounded-md transition-all duration-300 hover:bg-white hover:text-[#ff4e42] hover:shadow-lg hover:shadow-[#ff4e42]/30 active:scale-95"
            >
              Enter
            </button>
          </div>
        </div>
      )}
      <ThreeScene frequencyData={frequencyData} isAudioPlaying={isAudioPlaying} />
      <div className={`absolute inset-0 grid grid-cols-1 grid-rows-5 lg:grid-cols-3 lg:grid-rows-3 gap-4 p-4 transition-opacity duration-1000 ${showWelcome ? 'opacity-0' : 'opacity-100'}`}>
        <div className="row-span-3 lg:col-span-2 lg:row-span-2 min-h-0">
          <Portfolio />
        </div>
        <div className="row-span-2 lg:col-start-3 lg:row-span-3 min-h-0">
          <Terminal 
            messages={messages} 
            isPlaying={isAudioPlaying}
            currentTrackName={currentTrack}
            isAudioLoading={isAudioLoading}
            onPlayPause={handlePlayPause}
            onAudioUpload={handleAudioUpload}
          />
        </div>
      </div>
    </div>
  );
}