import React from 'react';
import { NavItem, UserData } from '../types';
import {
  Menu,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  RotateCcw,
  User
} from 'lucide-react';
import { AlgoLearnLogo } from './AlgoLearnLogo';

interface TopHeaderProps {
  currentNav: NavItem;
  onToggleSidebar: () => void;
  isSidebarOpen?: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onResetPage?: () => void;
  isSoundOn?: boolean;
  onToggleSound?: () => void;
  onNavigateHome?: () => void;
  currentUser?: UserData;
  onOpenProfile?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentNav,
  onToggleSidebar,
  isSidebarOpen = false,
  isDarkMode,
  onToggleTheme,
  onResetPage,
  isSoundOn = true,
  onToggleSound,
  onNavigateHome,
  currentUser,
  onOpenProfile
}) => {
  const [isResetting, setIsResetting] = React.useState(false);

  const handleResetClick = () => {
    setIsResetting(true);
    if (onResetPage) {
      onResetPage();
    }
    setTimeout(() => {
      setIsResetting(false);
    }, 800);
  };

  return (
    <header
      id="top-header-bar"
      className={`h-16 px-4 sm:px-6 flex items-center justify-between border-b sticky top-0 z-30 transition-colors duration-200 backdrop-blur-md relative ${
        isDarkMode
          ? 'bg-black/95 border-zinc-900 text-slate-100'
          : 'bg-white/95 border-indigo-100/80 text-slate-900'
      }`}
    >
      {/* Left side: Hamburger menu button + AlgoLearn Logo at top left in place of section headings */}
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <button
            id="header-hamburger-btn"
            onClick={onToggleSidebar}
            title="Open Navigation Menu (☰)"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isDarkMode
                ? 'hover:bg-zinc-900 text-slate-300 hover:text-white'
                : 'hover:bg-indigo-50 text-slate-700 hover:text-indigo-950'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* AlgoLearn Logo at top left in place of learn/game headings */}
        <div
          id="header-algolearn-logo"
          onClick={() => onNavigateHome?.()}
          className="cursor-pointer transition-opacity hover:opacity-90 flex items-center select-none"
          title="AlgoLearn • Overview"
          role="button"
          tabIndex={0}
        >
          <AlgoLearnLogo isDark={isDarkMode} size="sm" variant="full" />
        </div>
      </div>

      {/* Right side: 3 circular buttons (Sun, Sound, Reset) */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* 1. Theme toggle circular button */}
        <button
          id="header-theme-toggle-btn"
          onClick={onToggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
            isDarkMode
              ? 'border-zinc-800 bg-[#0d0d0d] hover:bg-zinc-900 text-amber-300'
              : 'border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-600'
          }`}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
        </button>

        {/* 2. Sound / Audio feedback circular button */}
        <button
          id="header-audio-toggle-btn"
          onClick={onToggleSound}
          title={isSoundOn ? 'Audio Effects Enabled' : 'Audio Effects Muted'}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
            isDarkMode
              ? 'border-zinc-800 bg-[#0d0d0d] hover:bg-zinc-900 text-indigo-300 hover:text-white'
              : 'border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-700 hover:text-black'
          }`}
        >
          {isSoundOn ? (
            <Volume2 className={`w-4 h-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          ) : (
            <VolumeX className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          )}
        </button>

        {/* 3. Reset / Reload page circular button */}
        <button
          id="header-reset-page-btn"
          onClick={handleResetClick}
          title="Reset Active Learner's Progress & State"
          className={`group w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
            isDarkMode
              ? 'border-zinc-800 bg-[#0d0d0d] hover:bg-rose-950/40 hover:border-zinc-700 text-slate-300 hover:text-rose-300'
              : 'border-indigo-200 bg-indigo-50/60 hover:bg-rose-50 text-indigo-900 hover:text-rose-900 hover:border-rose-300'
          }`}
        >
          <RotateCcw className={`w-4 h-4 transition-transform duration-500 ${
            isResetting
              ? 'rotate-180 text-rose-400'
              : 'group-hover:rotate-180 ' + (isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-700 group-hover:text-black')
          }`} />
        </button>

        {/* 4. Learner Profile Button */}
        {currentUser && onOpenProfile && (
          <button
            id="header-profile-btn"
            onClick={onOpenProfile}
            title={`Active Learner: ${currentUser.displayName} (${currentUser.userId}) - Click to manage account or switch user`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer text-xs font-semibold ${
              isDarkMode
                ? 'border-zinc-800 bg-[#0d0d0d] hover:bg-zinc-900 text-slate-200'
                : 'border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-900'
            }`}
          >
            <span className="text-sm leading-none">{currentUser.avatar || '🌳'}</span>
            <span className="hidden sm:inline max-w-[85px] truncate">{currentUser.displayName}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                isDarkMode ? 'bg-violet-950/80 text-violet-300 border border-violet-800/40' : 'bg-indigo-100 text-indigo-800'
              }`}
            >
              {currentUser.progress}%
            </span>
          </button>
        )}
      </div>
    </header>
  );
};
