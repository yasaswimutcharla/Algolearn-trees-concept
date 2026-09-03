import React from 'react';
import { NavItem, TopicId } from '../types';
import {
  LayoutGrid,
  BookOpen,
  Eye,
  GraduationCap,
  Trophy,
  X
} from 'lucide-react';
import { AlgoLearnLogo } from './AlgoLearnLogo';

interface NavigationSidebarProps {
  currentNav: NavItem;
  onSelectNav: (nav: NavItem) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  completedTopics?: TopicId[];
  quizScore?: { score: number; total: number } | null;
  completedVisualizations?: string[];
  isVideoCompleted?: boolean;
  isSoundOn?: boolean;
  onToggleSound?: () => void;
  onResetProgress?: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentNav,
  onSelectNav,
  isOpen,
  onToggleOpen,
  onClose,
  isDarkMode,
  onToggleTheme,
  completedTopics = [],
  quizScore = null,
  completedVisualizations: propCompletedVisualizations,
  isVideoCompleted: propIsVideoCompleted,
  isSoundOn = true,
  onToggleSound,
  onResetProgress
}) => {
  const [hoveredNav, setHoveredNav] = React.useState<NavItem | null>(null);

  // Read video completion status for the single Visualize item
  const isVideoDone = propIsVideoCompleted !== undefined ? propIsVideoCompleted : (() => {
    try {
      return localStorage.getItem('tree_dsa_video_completed') === 'true';
    } catch {
      return false;
    }
  })();

  const getProgressBadge = (id: NavItem): string | null => {
    switch (id) {
      case 'learn':
        return `${completedTopics.length}/7`;
      case 'visualize':
        return isVideoDone ? '1/1' : '0/1';
      case 'quiz':
        return quizScore ? `${quizScore.score}/${quizScore.total}` : '0/10';
      case 'progress':
        return `${completedTopics.length * 10} XP`;
      default:
        return null;
    }
  };

  const navItems: { id: NavItem; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Overview', icon: LayoutGrid },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'visualize', label: 'Visualize', icon: Eye },
    { id: 'quiz', label: 'Quiz', icon: GraduationCap },
    { id: 'progress', label: 'Progress', icon: Trophy }
  ];

  const handleNavClick = (id: NavItem) => {
    onSelectNav(id);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop (when sidebar is open on small screens) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        id="app-navigation-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 flex flex-col transition-transform duration-300 ease-in-out border-r ${
          isDarkMode
            ? 'bg-[#080c16] border-slate-800/80 text-slate-200 shadow-2xl shadow-violet-950/40'
            : 'bg-white border-slate-200 text-slate-800 shadow-xl'
        } ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar branding area matching exact AlgoLearn reference */}
        <div
          className={`p-4 flex items-center justify-between border-b ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
          }`}
        >
          <AlgoLearnLogo isDark={isDarkMode} size="sm" />

          {/* Close Button */}
          <button
            id="sidebar-close-btn"
            onClick={onClose}
            title="Close Sidebar"
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
              isDarkMode
                ? 'border-slate-800 bg-[#0e1424] hover:bg-slate-800 text-slate-400 hover:text-white'
                : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Menu Header & Items List (scrollbar visually hidden) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="px-3 py-2 text-[11px] font-mono font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            Navigation Menu
          </div>

          <nav className="space-y-1.5 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentNav === item.id;
              const progressBadge = getProgressBadge(item.id);
              const isHovered = hoveredNav === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 cursor-pointer justify-start ${
                    isActive
                      ? isDarkMode
                        ? 'bg-[#121829] border border-violet-900/60 text-white shadow-sm'
                        : 'bg-violet-50 border border-violet-200 text-slate-950 shadow-sm'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  {/* Icon Container: Vibrant purple rounded square when active, clean icon when inactive */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#6D3DF5] text-white shadow-md shadow-violet-900/40'
                        : isDarkMode
                        ? 'text-slate-400 group-hover:text-slate-200'
                        : 'text-slate-600 group-hover:text-slate-950'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`text-sm tracking-tight ${
                      isActive
                        ? isDarkMode
                          ? 'font-bold text-white'
                          : 'font-bold text-slate-950'
                        : isDarkMode
                        ? 'font-medium text-slate-400 group-hover:text-slate-100'
                        : 'font-medium text-slate-700 group-hover:text-slate-950'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Progress Indicator: Hidden by default, smoothly revealed only when hovered */}
                  {progressBadge !== null && (
                    <span
                      className={`ml-auto text-[11px] font-mono font-bold px-2 py-0.5 rounded-full transition-all duration-200 ease-out whitespace-nowrap select-none pointer-events-none ${
                        isHovered
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0'
                      } ${
                        isDarkMode
                          ? isActive
                            ? 'bg-violet-900/60 text-violet-200 border border-violet-700/60'
                            : 'bg-violet-950/80 text-violet-300 border border-violet-800/50'
                          : isActive
                          ? 'bg-violet-100 text-slate-950 border border-violet-300'
                          : 'bg-slate-200/80 text-slate-900 border border-slate-300'
                      }`}
                    >
                      {progressBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
