import React from 'react';

interface FloatingChatButtonProps {
  isDarkMode?: boolean;
  isSoundOn?: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Decorative AlgoLearn Assistant Icon (Static display only, non-interactive) */}
      <div
        id="floating-chat-bubble-icon"
        title="AlgoLearn Assistant"
        aria-label="AlgoLearn Assistant"
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl drop-shadow-md select-none"
      >
        {/* Exact gradient circle with centered white hollow speech bubble outline matching the image */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
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
