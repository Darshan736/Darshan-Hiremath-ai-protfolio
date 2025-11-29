import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from '@google/genai';
import ThreeScene from './components/ThreeScene';
import Terminal from './components/Terminal';
import Portfolio from './components/Portfolio';
import { TerminalMessage } from './types';
import { createChat, isApiConfigured } from './services/geminiService';

const initialMessages: TerminalMessage[] = [
  { text: 'SYSTEM BOOTING...', type: 'system' },
  { text: 'LOADING DARSHAN_PORTFOLIO_V1.0', type: 'system' },
  { text: 'AI CORE ONLINE. AWAITING COMMAND.', type: 'response' },
];

export default function App() {
  const [messages, setMessages] = useState<TerminalMessage[]>(initialMessages);
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  const addMessage = useCallback((text: string, type: 'user' | 'response' | 'system' | 'error') => {
    setMessages(prev => [...prev, { text, type }]);
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!chatRef.current) {
        if (!isApiConfigured()) {
            addMessage('ERROR: AI chat is disabled. API key not configured by host.', 'error');
        } else {
            addMessage('ERROR: Chat not initialized. Cannot send message.', 'error');
        }
        return;
    }
    
    addMessage(`USER: ${message}`, 'user');

    let fullResponse = '';
    let responseMessageIndex = -1;

    // Add a placeholder for the streaming response
    setMessages(prev => {
        // FIX: The `as const` assertion prevents TypeScript from widening the type of 'response'
        // to a generic 'string', ensuring it matches the stricter 'TerminalMessage' type.
        const newMessages = [...prev, { text: 'AI: ', type: 'response' as const }];
        responseMessageIndex = newMessages.length - 1;
        return newMessages;
    });

    try {
        const stream = await chatRef.current.sendMessageStream({ message });
        for await (const chunk of stream) {
            // FIX: The text from a streaming chunk can be undefined. Coalesce to an empty string
            // to prevent "undefined" from appearing in the output.
            fullResponse += chunk.text || '';
            setMessages(prev => {
                const newMessages = [...prev];
                if (newMessages[responseMessageIndex]) {
                  newMessages[responseMessageIndex] = { text: `AI: ${fullResponse}`, type: 'response' };
                }
                return newMessages;
            });
        }
    } catch (error) {
        console.error("Gemini chat error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[responseMessageIndex]) {
              newMessages[responseMessageIndex] = { text: `ERROR: ${errorMessage}`, type: 'error' };
            }
            return newMessages;
        });
    }
  }, [addMessage]);

  const handleInitiateChat = useCallback(() => {
    addMessage('AI: Feel free to ask me anything about my skills, projects, or my thoughts on AI and robotics.', 'response');
    terminalInputRef.current?.focus();
  }, [addMessage]);
  
  const initAudio = useCallback(() => {
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
      }
    }
    return !!audioContextRef.current;
  }, [addMessage]);

  const connectAudioSource = useCallback((audioElement: HTMLAudioElement) => {
    if (!audioContextRef.current || !analyserRef.current) return;
    if (audioSourceRef.current) {
      audioSourceRef.current.disconnect();
    }
    const source = audioContextRef.current.createMediaElementSource(audioElement);
    audioSourceRef.current = source;
    source.connect(analyserRef.current);
    audioPlayerRef.current = audioElement;

    audioElement.onplay = () => setIsAudioPlaying(true);
    audioElement.onpause = () => setIsAudioPlaying(false);
    audioElement.onended = () => setIsAudioPlaying(false);

  }, []);

  const startApp = useCallback(() => {
    if(showWelcome) {
       setShowWelcome(false);
       if(initAudio() && audioContextRef.current?.state === 'suspended') {
         audioContextRef.current.resume();
       }
       if (!chatRef.current) {
           if (isApiConfigured()) {
               const chat = createChat();
               if (chat) {
                   chatRef.current = chat;
                   addMessage('CHAT INTERFACE INITIALIZED.', 'system');
               } else {
                   addMessage('ERROR: FAILED TO INITIALIZE CHAT.', 'error');
               }
           } else {
               addMessage('ERROR: AI features are disabled. API key not configured by host.', 'error');
           }
       }
    }
  }, [showWelcome, initAudio, addMessage]);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(function animate() {
      if (analyserRef.current && frequencyData) {
        analyserRef.current.getByteFrequencyData(frequencyData);
        setFrequencyData(new Uint8Array(frequencyData));
      }
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, [frequencyData]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0e17]">
      {showWelcome && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0e17]/80 backdrop-blur-sm">
          <div className="text-center p-8">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white uppercase tracking-widest">Darshan</h1>
            <h2 className="mt-2 text-xl md:text-2xl text-[#ff4e42] font-mono">AI & Robotics Portfolio</h2>
            <p className="mt-6 max-w-2xl text-gray-300">
              This is an interactive portfolio experience featuring a WebGL audio visualizer.
              Click below to enter and activate the audio context.
            </p>
            <button
              onClick={startApp}
              className="mt-8 px-8 py-3 bg-[#ff4e42] text-white font-bold uppercase tracking-wider rounded-md transition-all duration-300 hover:bg-white hover:text-[#ff4e42] hover:shadow-lg hover:shadow-[#ff4e42]/30"
            >
              Enter
            </button>
          </div>
        </div>
      )}
      <ThreeScene frequencyData={frequencyData} isAudioPlaying={isAudioPlaying} />
      <div className={`absolute inset-0 grid grid-cols-1 lg:grid-cols-3 grid-rows-3 gap-4 p-4 transition-opacity duration-1000 ${showWelcome ? 'opacity-0' : 'opacity-100'}`}>
        <div className="lg:col-span-2 lg:row-span-2">
          <Portfolio onInitiateChat={handleInitiateChat} />
        </div>
        <div className="lg:col-start-3 lg:row-span-3">
          <Terminal 
            messages={messages} 
            audioPlayerRef={audioPlayerRef} 
            connectAudioSource={connectAudioSource}
            onSendMessage={handleSendMessage}
            inputRef={terminalInputRef}
          />
        </div>
      </div>
    </div>
  );
}
