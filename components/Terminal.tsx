import React, { useRef, useEffect } from 'react';
import { TerminalMessage } from '../types';
import { UploadIcon, PlayIcon, PauseIcon } from './Icons';

interface TerminalProps {
  messages: TerminalMessage[];
  isPlaying: boolean;
  currentTrackName: string;
  isAudioLoading: boolean;
  onPlayPause: () => void;
  onAudioUpload: (file: File) => void;
}

const Terminal: React.FC<TerminalProps> = ({ messages, isPlaying, currentTrackName, isAudioLoading, onPlayPause, onAudioUpload }) => {
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onAudioUpload(file);
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
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <button onClick={onPlayPause} className="p-2 text-white bg-[#ff4e42]/30 rounded-full hover:bg-[#ff4e42]/60 transition-colors disabled:opacity-50" aria-label={isPlaying ? 'Pause audio' : 'Play audio'} disabled={isAudioLoading}>
                    {isPlaying ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5" />}
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-700/50 text-gray-300 rounded-md hover:bg-gray-600/50 transition-colors">
                    <UploadIcon className="w-4 h-4" />
                    <span>Load Audio</span>
                </button>
                <input type="file" accept="audio/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
            <p className="text-xs text-gray-400 truncate flex-1 text-right ml-2">
              {isAudioLoading ? 'LOADING AUDIO...' : `NOW PLAYING: ${currentTrackName}`}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
