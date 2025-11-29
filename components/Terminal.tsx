import React, { useRef, useEffect, useState } from 'react';
import { TerminalMessage } from '../types';
import { UploadIcon, PlayIcon, PauseIcon, SendIcon } from './Icons';

interface TerminalProps {
  messages: TerminalMessage[];
  connectAudioSource: (element: HTMLAudioElement) => void;
  audioPlayerRef: React.RefObject<HTMLAudioElement | null>;
  onSendMessage: (message: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const Terminal: React.FC<TerminalProps> = ({ messages, connectAudioSource, audioPlayerRef, onSendMessage, inputRef }) => {
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('No track loaded');
  const [input, setInput] = useState('');

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const player = audioPlayerRef.current;
    if (!player) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    player.addEventListener('play', onPlay);
    player.addEventListener('pause', onPause);
    player.addEventListener('ended', onPause);

    return () => {
        player.removeEventListener('play', onPlay);
        player.removeEventListener('pause', onPause);
        player.removeEventListener('ended', onPause);
    };
  }, [audioPlayerRef, audioPlayerRef.current]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      
      const newPlayer = new Audio(fileURL);
      newPlayer.crossOrigin = "anonymous";
      connectAudioSource(newPlayer);
      newPlayer.play().catch(err => console.error("Autoplay was prevented:", err));
      setCurrentTrack(file.name);
    }
  };

  const handlePlayPause = () => {
    const player = audioPlayerRef.current;
    if (player) {
      if (player.paused) {
        player.play().catch(err => console.error("Play action failed:", err));
      } else {
        player.pause();
      }
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
        onSendMessage(input.trim());
        setInput('');
    }
  };

  return (
    <div className="w-full h-full glass-pane rounded-lg flex flex-col">
      <div className="flex-shrink-0 p-2 border-b border-[#ff4e42]/20">
        <h3 className="font-bold text-white uppercase tracking-widest">SYSTEM TERMINAL</h3>
      </div>
      <div ref={terminalContentRef} className="flex-grow p-2 overflow-y-auto text-sm">
        {messages.map((msg, index) => (
          <p key={index} className={`whitespace-pre-wrap ${
            msg.type === 'user' ? 'text-cyan-400' :
            msg.type === 'response' ? 'text-lime-400' :
            msg.type === 'system' ? 'text-gray-400' :
            'text-red-500'
          }`}>
            {msg.text}
          </p>
        ))}
        <div className="h-4"></div>
      </div>
      <div className="flex-shrink-0 p-2 border-t border-[#ff4e42]/20 space-y-2">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="> Ask the AI..."
            className="flex-grow bg-gray-900/50 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4e42] focus:border-[#ff4e42] transition-colors"
            aria-label="Chat input"
          />
          <button type="submit" className="p-2 text-white bg-[#ff4e42]/80 rounded-md hover:bg-[#ff4e42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!input.trim()} aria-label="Send message">
            <SendIcon className="w-5 h-5"/>
          </button>
        </form>
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <button onClick={handlePlayPause} className="p-2 text-white bg-[#ff4e42]/30 rounded-full hover:bg-[#ff4e42]/60 transition-colors" aria-label={isPlaying ? 'Pause audio' : 'Play audio'}>
                    {isPlaying ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5" />}
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-700/50 text-gray-300 rounded-md hover:bg-gray-600/50 transition-colors">
                    <UploadIcon className="w-4 h-4" />
                    <span>Load Audio</span>
                </button>
                <input type="file" accept="audio/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
            <p className="text-xs text-gray-400 truncate flex-1 text-right ml-2">NOW PLAYING: {currentTrack}</p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;