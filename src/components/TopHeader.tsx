import React from 'react';
import { NavItem } from '../types';
import {
  Menu,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  RotateCcw
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
  onNavigateHome
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
          ? 'bg-[#080c1a]/90 border-indigo-950/70 text-slate-100'
          : 'bg-white/95 border-indigo-100/80 text-slate-900'
      }`}
    >
      {/* Bottom accent gradient line matching the uploaded theme */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] opacity-80" />

      {/* Left side: Hamburger menu button + AlgoLearn Logo at top left in place of section headings */}
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <button
            id="header-hamburger-btn"
            onClick={onToggleSidebar}
            onMouseEnter={() => onToggleSidebar()}
            title="Open Navigation Menu (☰)"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isDarkMode
                ? 'hover:bg-indigo-950/40 text-slate-300 hover:text-white'
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

      {/* Right side: 3 circular buttons matching Screenshot (47) in order: Sun/Theme, Sound/Audio, Reset */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* 1. Theme toggle circular button */}
        <button
          id="header-theme-toggle-btn"
          onClick={onToggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
            isDarkMode
              ? 'border-indigo-900/60 bg-[#0e1328] hover:bg-indigo-950/60 text-amber-300'
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
              ? 'border-indigo-900/60 bg-[#0e1328] hover:bg-indigo-950/60 text-indigo-300 hover:text-white'
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
          title="Reset All Progress & State"
          className={`group w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
            isDarkMode
              ? 'border-indigo-900/60 bg-[#0e1328] hover:bg-rose-950/40 hover:border-rose-500/50 text-slate-300 hover:text-rose-300'
              : 'border-indigo-200 bg-indigo-50/60 hover:bg-rose-50 text-indigo-900 hover:text-rose-900 hover:border-rose-300'
          }`}
        >
          <RotateCcw className={`w-4 h-4 transition-transform duration-500 ${
            isResetting
              ? 'rotate-180 text-rose-400'
              : 'group-hover:rotate-180 ' + (isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-700 group-hover:text-black')
          }`} />
        </button>
      </div>
    </header>
  );
};
