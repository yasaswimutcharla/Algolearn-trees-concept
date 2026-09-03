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
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentNav,
  onToggleSidebar,
  isSidebarOpen = false,
  isDarkMode,
  onToggleTheme,
  onResetPage,
  isSoundOn = true,
  onToggleSound
}) => {
  const getPageTitle = (nav: NavItem): string => {
    switch (nav) {
      case 'home':
        return 'Overview';
      case 'learn':
        return 'Learn';
      case 'visualize':
        return 'Visualize';
      case 'quiz':
        return 'Quiz';
      case 'progress':
        return 'Progress';
      default:
        return 'Overview';
    }
  };

  return (
    <header
      id="top-header-bar"
      className={`h-16 px-4 sm:px-6 flex items-center justify-between border-b sticky top-0 z-30 transition-colors duration-200 backdrop-blur-md ${
        isDarkMode
          ? 'bg-[#090d16]/90 border-slate-800/80 text-slate-100'
          : 'bg-white/90 border-slate-200 text-slate-900'
      }`}
    >
      {/* Left side: Hamburger menu button (hidden when sidebar is open, visible when closed) + Project Icon + Title/Subtitle */}
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <button
            id="header-hamburger-btn"
            onClick={onToggleSidebar}
            title="Open Navigation Menu (☰)"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isDarkMode
                ? 'hover:bg-[#151c2e] text-slate-300 hover:text-white'
                : 'hover:bg-slate-100 text-slate-700 hover:text-slate-950'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* AlgoLearn Exact Logo with 3D cap, gradient Learn, and YOUR DSA JOURNEY subtitle */}
        <div className="flex items-center">
          <AlgoLearnLogo isDark={isDarkMode} size="sm" />
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
              ? 'border-slate-800 bg-[#0e1424] hover:bg-slate-800 text-amber-300'
              : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-indigo-600'
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
              ? 'border-slate-800 bg-[#0e1424] hover:bg-slate-800 text-slate-300 hover:text-white'
              : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950'
          }`}
        >
          {isSoundOn ? (
            <Volume2 className={`w-4 h-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
          ) : (
            <VolumeX className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`} />
          )}
        </button>

        {/* 3. Reset / Reload page circular button */}
        <button
          id="header-reset-page-btn"
          onClick={onResetPage}
          title="Reset View / State"
          className={`group w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
            isDarkMode
              ? 'border-slate-800 bg-[#0e1424] hover:bg-slate-800 text-slate-300 hover:text-white'
              : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950'
          }`}
        >
          <RotateCcw className={`w-4 h-4 group-hover:rotate-180 transition-transform duration-300 ${
            isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-950'
          }`} />
        </button>
      </div>
    </header>
  );
};
