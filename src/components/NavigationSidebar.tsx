import React from 'react';
import { NavItem, TopicId } from '../types';
import {
  LayoutGrid,
  BookOpen,
  Sparkles,
  CircleHelp,
  TrendingUp,
  X
} from 'lucide-react';

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
  quizProgress?: { completed: number; total: number } | null;
  completedVisualizations?: string[];
  isVideoCompleted?: boolean;
  isSoundOn?: boolean;
  onToggleSound?: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentNav,
  onSelectNav,
  isOpen,
  onToggleOpen,
  onClose,
  isDarkMode,
  completedTopics = [],
  quizProgress = null,
  completedVisualizations = [],
  isVideoCompleted: propIsVideoCompleted,
}) => {
  // Menu bar hover state: progress appears only when cursor is on the menu bar
  const [isMenuHovered, setIsMenuHovered] = React.useState(false);
  const [isMobileScreen, setIsMobileScreen] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On desktop/laptop: STRICTLY when cursor is on the menu bar!
  // On mobile phone drawer: show when sidebar is open
  const showProgress = isMobileScreen ? true : isMenuHovered;

  // Read video completion status
  const isVideoDone = propIsVideoCompleted !== undefined ? propIsVideoCompleted : (() => {
    try {
      return localStorage.getItem('tree_dsa_video_completed') === 'true';
    } catch {
      return false;
    }
  })();

  // Activity counts
  const learnTotal = 6;
  const vizTotal = 1;
  const quizTotal = 10;
  const totalActivities = learnTotal + vizTotal + quizTotal;

  // Real dynamic completion
  const learnCompleted = Math.min(completedTopics.length, learnTotal);
  const vizCompleted = Math.min((isVideoDone ? 1 : 0) + (completedVisualizations.length > 0 ? 1 : 0), vizTotal);
  const quizCompleted = quizProgress ? Math.min(quizProgress.completed, quizTotal) : (() => {
    try {
      const raw = localStorage.getItem('tree_dsa_quiz_progress');
      if (raw) return Math.min(JSON.parse(raw).completed, quizTotal);
      const state = localStorage.getItem('tree_dsa_quiz_state');
      if (state) return Math.min(Object.keys(JSON.parse(state).confirmedQuestions || {}).length, quizTotal);
    } catch {}
    return 0;
  })();

  const totalCompleted = learnCompleted + vizCompleted + quizCompleted;
  const overallPercent = Math.min(100, Math.round((totalCompleted / totalActivities) * 100));

  const getBadgeValue = (id: NavItem): string => {
    switch (id) {
      case 'home':
        return `${totalCompleted}/${totalActivities}`;
      case 'learn':
        return `${learnCompleted}/${learnTotal}`;
      case 'visualize':
        return `${vizCompleted}/${vizTotal}`;
      case 'quiz':
        return `${quizCompleted}/${quizTotal}`;
      case 'progress':
        return `${overallPercent}%`;
      default:
        return '0';
    }
  };

  // Exactly matching items in Screenshot (105) with Game removed
  const navItems: { id: NavItem; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Overview', icon: LayoutGrid },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'visualize', label: 'Visualize', icon: Sparkles },
    { id: 'quiz', label: 'Quiz', icon: CircleHelp },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
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
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Sidebar Container matching Screenshot (105) */}
      <aside
        id="app-navigation-sidebar"
        onMouseEnter={() => setIsMenuHovered(true)}
        onMouseLeave={() => setIsMenuHovered(false)}
        onFocus={() => setIsMenuHovered(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsMenuHovered(false);
          }
        }}
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 sm:w-72 flex flex-col transition-transform duration-300 ease-in-out ${
          isDarkMode
            ? 'bg-[#080c1a] border-r border-indigo-950/70 text-slate-200 shadow-2xl shadow-indigo-950/50'
            : 'bg-white border-r-0 border-transparent text-slate-900 shadow-lg md:shadow-none'
        } ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header matching Screenshot (105) */}
        <div
          className={`px-4 py-4 flex items-center justify-between border-b ${
            isDarkMode ? 'border-indigo-950/70' : 'border-white'
          }`}
        >
          <span className={`text-xs font-bold tracking-wider uppercase font-sans select-none ${
            isDarkMode ? 'text-slate-500' : 'text-slate-400'
          }`}>
            NAVIGATION MENU
          </span>

          {/* Close Button matching clean X in Screenshot (105) */}
          <button
            id="sidebar-close-btn"
            onClick={onClose}
            title="Close Sidebar (✕)"
            aria-label="Close Navigation Menu"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDarkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-indigo-950/50'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List matching Screenshot (105) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const badge = getBadgeValue(item.id);
              const isActive = item.id === currentNav;

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-150 cursor-pointer justify-start border ${
                    isActive
                      ? isDarkMode
                        ? 'bg-indigo-950/50 border-indigo-800/40 text-white font-semibold'
                        : 'bg-[#EEF2FF] border-transparent text-[#1E1B4B] font-semibold'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-slate-100 hover:bg-indigo-950/30 border-transparent font-medium'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 border-transparent font-medium'
                  }`}
                >
                  {/* Icon Container: vibrant rounded square for active; soft bordered square for inactive */}
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#4F46E5] text-white shadow-sm'
                        : isDarkMode
                        ? 'bg-[#0e1428] border border-slate-800 text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-800/60'
                        : 'bg-[#F8FAFC] border border-slate-200/70 text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Label with exact font size matching Screenshot (105) */}
                  <span
                    className={`text-sm tracking-tight ${
                      isActive
                        ? isDarkMode
                          ? 'text-white'
                          : 'text-[#1E1B4B]'
                        : isDarkMode
                        ? 'text-slate-300 group-hover:text-white'
                        : 'text-slate-700 group-hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Progress Badge Pill: Appears only when cursor is on the menu bar, otherwise hidden */}
                  <span
                    className={`ml-auto text-xs font-mono font-bold px-2.5 py-0.5 rounded-full select-none transition-all duration-200 ease-out ${
                      showProgress
                        ? 'opacity-100 scale-100 translate-x-0'
                        : 'opacity-0 scale-90 translate-x-2 pointer-events-none'
                    } ${
                      isActive
                        ? isDarkMode
                          ? 'bg-indigo-900/60 text-indigo-300'
                          : 'bg-[#E0E7FF] text-[#4F46E5]'
                        : isDarkMode
                        ? 'bg-blue-950/50 text-blue-400'
                        : 'bg-[#EFF6FF] text-[#3B82F6]'
                    }`}
                  >
                    {badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Curriculum Progress Section: Appears only when cursor is on the menu bar, otherwise hidden */}
        <div
          className={`transition-all duration-300 ease-in-out mt-auto ${
            showProgress
              ? `p-4 border-t opacity-100 max-h-48 ${
                  isDarkMode ? 'border-indigo-950/70 bg-[#080c1a]' : 'border-white bg-white'
                }`
              : 'p-0 border-t-0 border-transparent opacity-0 max-h-0 overflow-hidden pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Tree Curriculum
            </span>
            <span className={`text-xs font-bold font-mono ${isDarkMode ? 'text-indigo-400' : 'text-[#4F46E5]'}`}>
              {overallPercent}%
            </span>
          </div>

          {/* Progress bar: in light mode, clean white bar with subtle border; in dark mode, dark track with gradient */}
          <div className={`w-full h-2 rounded-full overflow-hidden mb-2 ${
            isDarkMode ? 'bg-slate-800' : 'bg-white border border-slate-200/80 shadow-xs'
          }`}>
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#4F46E5]'
                  : 'bg-white'
              }`}
              style={{ width: `${overallPercent}%` }}
            />
          </div>

          <div className={`flex items-center justify-between text-[11px] ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span>{totalCompleted} completed</span>
            <span>{totalActivities} total activities</span>
          </div>
        </div>
      </aside>
    </>
  );
};

