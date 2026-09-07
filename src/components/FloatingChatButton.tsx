import React, { useState } from 'react';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';

interface FloatingChatButtonProps {
  isDarkMode: boolean;
  isSoundOn?: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  isDarkMode,
  isSoundOn = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: 'Hi there! 👋 Welcome to AlgoLearn. Ask any question about Tree Data Structures or navigate through topics!'
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userText = message.trim();
    setMessage('');
    setChatLog((prev) => [...prev, { sender: 'user', text: userText }]);

    // Smart contextual response for Tree DSA
    setTimeout(() => {
      let reply = "Trees are hierarchical data structures consisting of nodes connected by edges! Check out the 'Learn' tab for deep dives into Binary Trees, BSTs, and Traversals.";
      const lower = userText.toLowerCase();

      if (lower.includes('bst') || lower.includes('search tree')) {
        reply = "In a Binary Search Tree (BST), every node follows the BST property: left subtree values < node value < right subtree values. Search and insertion are O(log n) on average!";
      } else if (lower.includes('traversal') || lower.includes('inorder') || lower.includes('preorder')) {
        reply = "Tree traversals include Inorder (Left-Root-Right), Preorder (Root-Left-Right), Postorder (Left-Right-Root), and Level-order (BFS). Inorder traversal of a BST yields elements in sorted ascending order!";
      } else if (lower.includes('quiz') || lower.includes('score')) {
        reply = "You can test your mastery in the 'Quiz' section! Each question includes progressive hints if you get stuck.";
      } else if (lower.includes('video') || lower.includes('visualize')) {
        reply = "Visit the 'Visualize' section to watch visual animations and even upload your own study videos with automatic progress tracking.";
      } else if (lower.includes('hello') || lower.includes('hi')) {
        reply = "Hello! What tree topic would you like to explore today? Terminology, Binary Trees, BSTs, or Traversals?";
      }

      setChatLog((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 450);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Quick Help / Chat Popover Dialog */}
      {isOpen && (
        <div
          id="chat-widget-popover"
          className={`mb-3 w-80 sm:w-96 rounded-3xl shadow-2xl border overflow-hidden backdrop-blur-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-4 ${
            isDarkMode
              ? 'bg-[#0b101e]/95 border-indigo-900/60 text-slate-100 shadow-violet-950/60'
              : 'bg-white/95 border-indigo-100 text-slate-900 shadow-indigo-500/20'
          }`}
        >
          {/* Popover Header */}
          <div
            className={`px-4 py-3.5 flex items-center justify-between border-b ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white border-indigo-900/50'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-indigo-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-md">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="headerCircleGrad" x1="12%" y1="12%" x2="88%" y2="88%">
                      <stop offset="0%" stopColor="#1E65FD" />
                      <stop offset="35%" stopColor="#3649FA" />
                      <stop offset="70%" stopColor="#6E24F7" />
                      <stop offset="100%" stopColor="#8C13F6" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="49" fill="url(#headerCircleGrad)" />
                  <path
                    d="M 36.2 56.4
                       A 16.5 16.5 0 1 1 49.2 64.9
                       C 44.5 65.1 39.8 64.8 37.2 63.8
                       C 35.2 63 33.6 61.5 34.0 59.2
                       C 34.2 58 35.1 57.1 36.2 56.4 Z"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="5.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">AlgoLearn Assistant</h4>
                <p className="text-[11px] opacity-90 flex items-center gap-1 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block animate-pulse" />
                  Online • Tree DSA Guide
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full transition-colors hover:bg-white/20 text-white cursor-pointer"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3.5 h-64 overflow-y-auto space-y-2.5 text-xs">
            {chatLog.map((entry, idx) => (
              <div
                key={idx}
                className={`flex ${entry.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    entry.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-sm rounded-br-xs'
                      : isDarkMode
                      ? 'bg-[#12192d] text-slate-200 border border-indigo-900/50 rounded-bl-xs'
                      : 'bg-indigo-50/70 text-slate-800 border border-indigo-100 rounded-bl-xs'
                  }`}
                >
                  {entry.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className={`p-2.5 border-t flex items-center gap-2 ${
            isDarkMode ? 'border-indigo-900/50 bg-[#080d1a]' : 'border-indigo-100 bg-slate-50/60'
          }`}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about trees, BSTs, traversals..."
              className={`flex-1 px-3.5 py-2 rounded-xl text-xs outline-none transition-all ${
                isDarkMode
                  ? 'bg-[#0f172e] text-white border border-indigo-900/60 focus:border-indigo-500'
                  : 'bg-white text-slate-900 border border-indigo-200 focus:border-indigo-500 shadow-xs'
              }`}
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
              title="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button (Exact Match to User Uploaded Image) */}
      <button
        id="floating-chat-bubble-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        title={isOpen ? 'Close chat' : 'Open chat'}
        aria-label="Chat with AlgoLearn Assistant"
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-indigo-600/40 select-none focus:outline-hidden"
      >
        {/* Exact gradient circle with centered white speech bubble matching the uploaded image */}
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

        {/* Subtle hover specular ring */}
        <span className="absolute inset-0 rounded-full border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </button>
    </div>
  );
};
