import React, { useEffect } from 'react';

interface FloatingChatButtonProps {
  isDarkMode?: boolean;
  isSoundOn?: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = () => {
  // Clear any legacy arbitrary dragged coordinates so the icon is always reliably visible
  useEffect(() => {
    try {
      localStorage.removeItem('algolearn_chat_x');
      localStorage.removeItem('algolearn_chat_y');
    } catch {}
  }, []);

  return (
    <div
      id="floating-chat-bubble-container"
      /* Positioned at the right corner, elevated above the bottom control bar so it NEVER covers the square full-screen button or player options */
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-30 flex flex-col items-end select-none pointer-events-auto transition-all duration-200"
    >
      {/* Exact AlgoLearn Assistant Icon matching provided design */}
      <div
        id="floating-chat-bubble-icon"
        title="AlgoLearn Assistant"
        aria-label="AlgoLearn Assistant"
        className="relative w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center shadow-2xl drop-shadow-lg select-none hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        {/* Exact gradient circle with centered white hollow speech bubble outline */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md pointer-events-none"
        >
          <defs>
            <linearGradient id="userChatCircleGrad" x1="12%" y1="12%" x2="88%" y2="88%">
              <stop offset="0%" stopColor="#1E65FD" />
              <stop offset="35%" stopColor="#3649FA" />
              <stop offset="70%" stopColor="#6E24F7" />
              <stop offset="100%" stopColor="#8C13F6" />
            </linearGradient>
            <filter id="chatGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#1e1b4b" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Outer circle with vibrant blue-to-purple gradient */}
          <circle cx="50" cy="50" r="49" fill="url(#userChatCircleGrad)" />

          {/* Centered white hollow speech bubble outline with smooth rounded tail */}
          <path
            d="M 36.2 56.4
               A 16.5 16.5 0 1 1 49.2 64.9
               C 44.5 65.1 39.8 64.8 37.2 63.8
               C 35.2 63 33.6 61.5 34.0 59.2
               C 34.2 58 35.1 57.1 36.2 56.4 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#chatGlowFilter)"
          />
        </svg>
      </div>
    </div>
  );
};
