import React from 'react';
import { NavItem, TopicId } from '../../types';
import {
  Sparkles,
  Layers,
  Zap,
  Folder,
  Globe,
  Star,
  Search,
  Binary,
  PlusCircle,
  Activity,
  GitBranch,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { AlgoLearnCapIcon } from '../AlgoLearnLogo';

interface HomeViewProps {
  onNavigate: (nav: NavItem, topicId?: TopicId) => void;
  isDarkMode: boolean;
}

const RocketIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20 sm:w-24 sm:h-24' }) => (
  <svg
    viewBox="0 0 120 120"
    className={`${className} select-none shrink-0`}
    aria-hidden="true"
  >
    <defs>
      {/* Fuselage subtle gradient */}
      <linearGradient id="rocketRefBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>

      {/* Royal Blue / Indigo Fin & Nose cone gradient */}
      <linearGradient id="rocketRefBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="40%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>

      {/* Glass Porthole Window */}
      <linearGradient id="rocketRefWindow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>

      {/* Thruster Fire */}
      <linearGradient id="rocketRefFlame" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="40%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>

      {/* Cloud Puffs */}
      <linearGradient id="rocketRefCloud" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E0E7FF" />
      </linearGradient>
    </defs>

    {/* Soft cloud base puffs */}
    <g opacity="0.95">
      <circle cx="34" cy="94" r="16" fill="url(#rocketRefCloud)" />
      <circle cx="52" cy="100" r="13" fill="url(#rocketRefCloud)" />
      <circle cx="20" cy="98" r="11" fill="url(#rocketRefCloud)" />
      <circle cx="38" cy="105" r="9" fill="#CBD5E1" opacity="0.5" />
    </g>

    {/* Sparkles / Stars around rocket */}
    <path d="M96 22 L98 26 L102 28 L98 30 L96 34 L94 30 L90 28 L94 26 Z" fill="#818CF8" />
    <path d="M22 52 L23.5 55 L26.5 56.5 L23.5 58 L22 61 L20.5 58 L17.5 56.5 L20.5 55 Z" fill="#60A5FA" />
    <circle cx="104" cy="48" r="2" fill="#38BDF8" />
    <circle cx="82" cy="14" r="1.5" fill="#818CF8" />

    {/* Main Rocket body rotated 45 degrees */}
    <g transform="translate(6, 4)">
      {/* Thruster Exhaust Flame */}
      <path
        d="M44 76 C40 86 36 96 40 102 C45 98 52 88 56 80 Z"
        fill="url(#rocketRefFlame)"
      />
      <path
        d="M43 78 C41 84 39 90 42 94 C44 91 48 85 51 81 Z"
        fill="#FEF08A"
      />

      {/* Thruster Nozzle */}
      <polygon points="43,72 57,80 52,85 39,77" fill="#334155" />

      {/* Left Wing / Fin */}
      <path
        d="M42 60 L24 76 C24 76 29 83 40 77 L46 68 Z"
        fill="url(#rocketRefBlue)"
      />

      {/* Right Wing / Fin */}
      <path
        d="M60 42 L76 24 C76 24 83 29 77 40 L68 46 Z"
        fill="url(#rocketRefBlue)"
      />

      {/* Rocket Main Fuselage */}
      <path
        d="M84 20 C70 20 46 40 40 72 L58 80 C86 74 102 46 84 20 Z"
        fill="url(#rocketRefBody)"
      />

      {/* Nose Cone (Royal Blue) */}
      <path
        d="M84 20 C78 21 70 27 66 33 C73 37 83 46 88 54 C92 48 94 36 84 20 Z"
        fill="url(#rocketRefBlue)"
      />

      {/* Center Dorsal Spine Fin */}
      <polygon points="54,54 44,68 50,71 60,57" fill="#3730A3" />

      {/* Porthole Window */}
      <circle cx="66" cy="48" r="9" fill="#312E81" />
      <circle cx="66" cy="48" r="7" fill="url(#rocketRefWindow)" />
      <ellipse cx="64" cy="46" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.8" transform="rotate(-30 64 46)" />
      <circle cx="68" cy="50" r="1.2" fill="#FFFFFF" opacity="0.75" />
    </g>
  </svg>
);

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, isDarkMode }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2">
      {/* ==================================================================== */}
      {/* HERO CARD                                                           */}
      {/* ==================================================================== */}
      <section
        id="home-hero-card"
        className={`relative overflow-hidden p-6 sm:p-8 md:p-10 rounded-3xl border transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-2xl shadow-violet-950/40'
            : 'bg-white border-blue-100 text-black shadow-xl shadow-blue-100/50'
        }`}
      >
        {isDarkMode && (
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${
              isDarkMode
                ? 'bg-blue-950/40 text-blue-300 border-blue-800/50'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              <AlgoLearnCapIcon isDark={isDarkMode} size={18} className="shrink-0" />
              <span className="font-extrabold text-blue-600 dark:text-blue-400">AlgoLearn</span>
              <span className="opacity-40">•</span>
              <span>THEORY CURRICULUM • MODULE 01 • CHAPTER 01</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-balance">
              <span className={isDarkMode ? 'text-white' : 'text-black'}>
                Non-Linear Hierarchical{' '}
              </span>
              <span className={isDarkMode ? 'text-violet-400' : 'text-indigo-600'}>
                Data Structures
              </span>
            </h1>

            <p className="text-sm sm:text-base opacity-80 leading-relaxed text-balance">
              Trees organize data in top-down levels rather than linear sequences. 
              Master the foundational hierarchy of roots, internal nodes, leaves, subtrees, 
              and logarithmic search efficiency.
            </p>
          </div>

          {/* Right Hero Graphic: Tree Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className={`w-full max-w-sm p-4 rounded-2xl border flex flex-col items-center justify-center ${
                isDarkMode
                  ? 'bg-[#090d18] border-violet-950/80'
                  : 'bg-blue-50/40 border-blue-100'
              }`}
            >
              {/* Responsive SVG Tree Illustration */}
              <svg viewBox="0 0 320 230" className="w-full h-auto select-none">
                <defs>
                  <linearGradient id="heroEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isDarkMode ? '#8b5cf6' : '#6366f1'} />
                    <stop offset="100%" stopColor={isDarkMode ? '#6d28d9' : '#4f46e5'} />
                  </linearGradient>
                  <filter id="heroNodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={isDarkMode ? '#8b5cf6' : '#6366f1'} floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Level Guideline indicators */}
                <line x1="20" y1="40" x2="300" y2="40" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} strokeDasharray="3 3" strokeWidth="1" />
                <text x="25" y="32" fill={isDarkMode ? '#64748b' : '#94a3b8'} fontSize="8" fontFamily="monospace">Level 0 (Root)</text>

                <line x1="20" y1="115" x2="300" y2="115" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} strokeDasharray="3 3" strokeWidth="1" />
                <text x="25" y="107" fill={isDarkMode ? '#64748b' : '#94a3b8'} fontSize="8" fontFamily="monospace">Level 1 (Branch)</text>

                <line x1="20" y1="190" x2="300" y2="190" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} strokeDasharray="3 3" strokeWidth="1" />
                <text x="25" y="182" fill={isDarkMode ? '#64748b' : '#94a3b8'} fontSize="8" fontFamily="monospace">Level 2 (Leaves)</text>

                {/* Edges */}
                <line x1="160" y1="40" x2="95" y2="115" stroke="url(#heroEdgeGrad)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="160" y1="40" x2="225" y2="115" stroke="url(#heroEdgeGrad)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="95" y1="115" x2="60" y2="190" stroke="url(#heroEdgeGrad)" strokeWidth="2" strokeLinecap="round" />
                <line x1="95" y1="115" x2="130" y2="190" stroke="url(#heroEdgeGrad)" strokeWidth="2" strokeLinecap="round" />
                <line x1="225" y1="115" x2="190" y2="190" stroke="url(#heroEdgeGrad)" strokeWidth="2" strokeLinecap="round" />
                <line x1="225" y1="115" x2="260" y2="190" stroke="url(#heroEdgeGrad)" strokeWidth="2" strokeLinecap="round" />

                {/* Root Node */}
                <circle cx="160" cy="40" r="18" fill={isDarkMode ? '#7c3aed' : '#4f46e5'} filter="url(#heroNodeGlow)" stroke={isDarkMode ? '#c4b5fd' : '#ffffff'} strokeWidth="2" />
                <text x="160" y="44" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">50</text>

                {/* Level 1 Nodes */}
                <circle cx="95" cy="115" r="15" fill={isDarkMode ? '#1e1b4b' : '#e0e7ff'} stroke={isDarkMode ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />
                <text x="95" y="119" fill={isDarkMode ? '#e0e7ff' : '#1e1b4b'} fontSize="10" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">30</text>

                <circle cx="225" cy="115" r="15" fill={isDarkMode ? '#1e1b4b' : '#e0e7ff'} stroke={isDarkMode ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />
                <text x="225" y="119" fill={isDarkMode ? '#e0e7ff' : '#1e1b4b'} fontSize="10" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">70</text>

                {/* Level 2 Leaves */}
                <circle cx="60" cy="190" r="13" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="1.5" />
                <text x="60" y="194" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">20</text>

                <circle cx="130" cy="190" r="13" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="1.5" />
                <text x="130" y="194" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">40</text>

                <circle cx="190" cy="190" r="13" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="1.5" />
                <text x="190" y="194" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">60</text>

                <circle cx="260" cy="190" r="13" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="1.5" />
                <text x="260" y="194" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">80</text>
              </svg>

              <div className="mt-2 text-[11px] font-mono opacity-60 text-center">
                Root: 50 | Leaves: [20, 40, 60, 80] | (N - 1) Edges Rule
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* THREE INFORMATION CARDS                                              */}
      {/* ==================================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Core Idea */}
        <div
          id="info-card-core-idea"
          onClick={() => onNavigate('visualize')}
          className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 hover:border-violet-500/50'
              : 'bg-white border-blue-100 hover:border-blue-300 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
              isDarkMode
                ? 'bg-violet-950/40 border-violet-500/50 text-violet-400 shadow-sm shadow-violet-500/20'
                : 'bg-violet-50 border-violet-200 text-violet-600'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-violet-300' : 'text-indigo-900'}`}>
              Core Idea
            </h3>
          </div>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            Trees organize data hierarchically, where each node connects to its children.
          </p>
        </div>

        {/* Card 2: Important Concept */}
        <div
          id="info-card-important-concept"
          className={`p-6 rounded-2xl border transition-all duration-200 ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 hover:border-violet-500/50'
              : 'bg-white border-blue-100 hover:border-blue-300 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
              isDarkMode
                ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-400 shadow-sm shadow-cyan-500/20'
                : 'bg-cyan-50 border-cyan-200 text-cyan-600'
            }`}>
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-violet-300' : 'text-indigo-900'}`}>
              Important Concept
            </h3>
          </div>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            Trees are non-linear structures with no cycles and a unique path between nodes.
          </p>
        </div>

        {/* Card 3: Main Challenge */}
        <div
          id="info-card-main-challenge"
          className={`p-6 rounded-2xl border transition-all duration-200 ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 hover:border-violet-500/50'
              : 'bg-white border-blue-100 hover:border-blue-300 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
              isDarkMode
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-400 shadow-sm shadow-amber-500/20'
                : 'bg-amber-50 border-amber-200 text-amber-600'
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-violet-300' : 'text-indigo-900'}`}>
              Main Challenge
            </h3>
          </div>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            Understand tree traversal and maintain efficient search performance.
          </p>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 1. THE MAIN IDEA                                                     */}
      {/* ==================================================================== */}
      <section
        id="section-the-main-idea"
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-slate-100'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
              isDarkMode
                ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40'
                : 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
            }`}
          >
            1
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            1. The Main Idea
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Explanation Area */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-sm leading-relaxed opacity-90">
              A tree starts with a root node and grows into smaller connected nodes, just like branches of a real tree.
            </p>
          </div>

          {/* Visual Concept Area */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className={`w-full p-4 rounded-2xl border flex flex-col items-center justify-center ${
                isDarkMode ? 'bg-[#090d18] border-violet-950/80' : 'bg-blue-50/40 border-blue-100'
              }`}
            >
              <div className={`text-[11px] font-bold tracking-wider uppercase mb-2 ${
                isDarkMode ? 'text-violet-400' : 'text-violet-700'
              }`}>
                Linear vs Hierarchical Concept
              </div>

              {/* Diagram */}
              <div className="w-full space-y-3 text-xs">
                {/* Linear */}
                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  isDarkMode ? 'bg-[#121929] border-violet-950/60' : 'bg-white border-blue-100'
                }`}>
                  <span className="text-[10px] font-bold uppercase opacity-60">Linear List</span>
                  <div className="flex items-center gap-1 font-mono text-[11px] font-bold">
                    <span className={isDarkMode ? 'px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-200' : 'px-1.5 py-0.5 rounded bg-blue-100 text-blue-900'}>A</span> →
                    <span className={isDarkMode ? 'px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-200' : 'px-1.5 py-0.5 rounded bg-blue-100 text-blue-900'}>B</span> →
                    <span className={isDarkMode ? 'px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-200' : 'px-1.5 py-0.5 rounded bg-blue-100 text-blue-900'}>C</span> →
                    <span className={isDarkMode ? 'px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-200' : 'px-1.5 py-0.5 rounded bg-blue-100 text-blue-900'}>D</span>
                  </div>
                </div>

                {/* Tree */}
                <div className={`p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-[#121929] border-violet-950/60' : 'bg-white border-blue-100'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>Tree Hierarchy</span>
                    <span className={`text-[10px] font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>O(log N) Search</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 font-mono text-[11px]">
                    <div className="px-2 py-0.5 rounded bg-violet-600 text-white font-bold">Root (A)</div>
                    <div className="flex items-center gap-6">
                      <div className={`px-2 py-0.5 rounded border ${isDarkMode ? 'bg-indigo-900/60 border-indigo-500/40 text-indigo-200' : 'bg-indigo-100 border-indigo-300 text-indigo-900 font-semibold'}`}>Subtree B</div>
                      <div className={`px-2 py-0.5 rounded border ${isDarkMode ? 'bg-indigo-900/60 border-indigo-500/40 text-indigo-200' : 'bg-indigo-100 border-indigo-300 text-indigo-900 font-semibold'}`}>Subtree C</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. CONCEPT ROADMAP                                                   */}
      {/* ==================================================================== */}
      <section
        id="section-concept-roadmap"
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-slate-100'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                isDarkMode
                  ? 'bg-violet-950/60 border-violet-800/50 text-violet-400'
                  : 'bg-violet-50 border-violet-200 text-violet-600'
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              2. Concept Roadmap
            </h2>
          </div>

          <button
            onClick={() => onNavigate('learn')}
            className="text-xs sm:text-sm font-semibold text-[#6D3DF5] dark:text-[#A78BFA] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>View all lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal roadmap container with numbered steps, connecting line, colorful circular icons */}
        <div className="relative">
          {/* Horizontal Connecting Line (visible on desktop) */}
          <div 
            className={`hidden lg:block absolute top-[44px] left-[50px] right-[50px] h-[2px] z-0 ${
              isDarkMode ? 'bg-slate-800' : 'bg-blue-100'
            }`} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
            {[
              {
                num: '1',
                title: 'Tree Basics',
                sub: 'Root, Edges & Leaves',
                topicId: 'basics' as TopicId,
                icon: Layers,
                colorLight: 'bg-[#EEF2FF] border-[#C7D2FE] text-[#4F46E5] group-hover:border-[#818CF8]',
                colorDark: 'bg-[#1e1b4b]/60 border-[#4338ca]/60 text-[#818cf8] group-hover:border-[#6366f1]',
                cardBorderLight: 'hover:border-[#818CF8]/60 hover:bg-indigo-50/30',
                cardBorderDark: 'hover:border-[#6366f1]/60 hover:bg-[#1e1b4b]/20'
              },
              {
                num: '2',
                title: 'Tree Terminology',
                sub: '15 Core Terms',
                topicId: 'terminology' as TopicId,
                icon: Binary,
                colorLight: 'bg-[#F0F9FF] border-[#BAE6FD] text-[#0284C7] group-hover:border-[#38BDF8]',
                colorDark: 'bg-[#082f49]/60 border-[#0369a1]/60 text-[#38bdf8] group-hover:border-[#0284c7]',
                cardBorderLight: 'hover:border-[#38BDF8]/60 hover:bg-sky-50/30',
                cardBorderDark: 'hover:border-[#38bdf8]/60 hover:bg-[#082f49]/20'
              },
              {
                num: '3',
                title: 'Types of Trees',
                sub: 'General, Binary, BST',
                topicId: 'types' as TopicId,
                icon: Search,
                colorLight: 'bg-[#ECFEFF] border-[#A5F3FC] text-[#0891B2] group-hover:border-[#22D3EE]',
                colorDark: 'bg-[#164e63]/60 border-[#0e7490]/60 text-[#22d3ee] group-hover:border-[#06b6d4]',
                cardBorderLight: 'hover:border-[#22D3EE]/60 hover:bg-cyan-50/30',
                cardBorderDark: 'hover:border-[#22d3ee]/60 hover:bg-[#164e63]/20'
              },
              {
                num: '4',
                title: 'Binary Tree',
                sub: 'Pointers & Structure',
                topicId: 'binary-tree' as TopicId,
                icon: PlusCircle,
                colorLight: 'bg-[#FDF2F8] border-[#FBCFE8] text-[#DB2777] group-hover:border-[#F472B6]',
                colorDark: 'bg-[#831843]/40 border-[#be185d]/60 text-[#f472b6] group-hover:border-[#ec4899]',
                cardBorderLight: 'hover:border-[#F472B6]/60 hover:bg-pink-50/30',
                cardBorderDark: 'hover:border-[#f472b6]/60 hover:bg-[#831843]/20'
              },
              {
                num: '5',
                title: 'Binary Search Tree',
                sub: 'Left < Root < Right',
                topicId: 'bst' as TopicId,
                icon: GitBranch,
                colorLight: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669] group-hover:border-[#34D399]',
                colorDark: 'bg-[#064e3b]/50 border-[#047857]/60 text-[#34d399] group-hover:border-[#10b981]',
                cardBorderLight: 'hover:border-[#34D399]/60 hover:bg-emerald-50/30',
                cardBorderDark: 'hover:border-[#34d399]/60 hover:bg-[#064e3b]/20'
              },
              {
                num: '6',
                title: 'Tree Traversals',
                sub: 'In, Pre & Post-Order',
                topicId: 'traversals' as TopicId,
                icon: Activity,
                colorLight: 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706] group-hover:border-[#FBBF24]',
                colorDark: 'bg-[#78350f]/40 border-[#b45309]/60 text-[#fbbf24] group-hover:border-[#f59e0b]',
                cardBorderLight: 'hover:border-[#FBBF24]/60 hover:bg-amber-50/30',
                cardBorderDark: 'hover:border-[#fbbf24]/60 hover:bg-[#78350f]/20'
              },
              {
                num: '7',
                title: 'Applications',
                sub: 'Real-World Systems',
                topicId: 'applications' as TopicId,
                icon: Globe,
                colorLight: 'bg-[#F5F3FF] border-[#DDD6FE] text-[#7C3AED] group-hover:border-[#A78BFA]',
                colorDark: 'bg-[#2e1065]/50 border-[#6d28d9]/60 text-[#a78bfa] group-hover:border-[#8b5cf6]',
                cardBorderLight: 'hover:border-[#A78BFA]/60 hover:bg-violet-50/30',
                cardBorderDark: 'hover:border-[#a78bfa]/60 hover:bg-[#2e1065]/20'
              }
            ].map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigate('learn', step.topicId)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer group hover:scale-[1.03] flex flex-col items-center text-center ${
                    isDarkMode
                      ? `bg-[#090d18] border-violet-950/80 ${step.cardBorderDark}`
                      : `bg-blue-50/40 border-blue-100 ${step.cardBorderLight}`
                  }`}
                >
                  {/* Circular Icon with Reference Colors */}
                  <div className="mb-3 flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-200 group-hover:scale-105 shadow-sm ${
                        isDarkMode ? step.colorDark : step.colorLight
                      }`}
                    >
                      <IconComp className="w-6 h-6 stroke-[1.8]" />
                    </div>
                  </div>

                  <h3 className={`text-xs sm:text-sm font-bold leading-snug mb-1 transition-colors ${
                    isDarkMode ? 'text-slate-100 group-hover:text-white' : 'text-black group-hover:text-blue-950'
                  }`}>
                    {step.title}
                  </h3>

                  <p className={`text-[11px] transition-colors ${
                    isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-blue-900/80 group-hover:text-black'
                  }`}>
                    {step.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. WHY BINARY SEARCH TREES MATTER                                    */}
      {/* ==================================================================== */}
      <section
        id="section-why-trees-matter"
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-slate-100'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
              isDarkMode
                ? 'bg-violet-950/60 border-violet-800/50 text-violet-400'
                : 'bg-violet-50 border-violet-200 text-[#6D3DF5]'
            }`}
          >
            <Star className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            3. Why Binary Search Trees Matter
          </h2>
        </div>

        {/* 3 Pillar Cards matching Screenshot (47) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Fast O(log n) Search */}
          <div
            className={`p-6 rounded-2xl border transition-all duration-200 ${
              isDarkMode
                ? 'bg-[#090d18] border-violet-950/70 hover:border-violet-800/60'
                : 'bg-blue-50/40 border-blue-100 hover:border-blue-300'
            }`}
          >
            <h3 className={`text-base font-bold mb-2 ${
              isDarkMode ? 'text-slate-100' : 'text-black'
            }`}>
              Fast O(log n) Search
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-blue-950/80'
            }`}>
              Eliminate half of the remaining search space with every single node comparison, guaranteeing high speed even across millions of items.
            </p>
          </div>

          {/* Card 2: Dynamic Organization */}
          <div
            className={`p-6 rounded-2xl border transition-all duration-200 ${
              isDarkMode
                ? 'bg-[#090d18] border-violet-950/70 hover:border-violet-800/60'
                : 'bg-blue-50/40 border-blue-100 hover:border-blue-300'
            }`}
          >
            <h3 className={`text-base font-bold mb-2 ${
              isDarkMode ? 'text-slate-100' : 'text-black'
            }`}>
              Dynamic Organization
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-blue-950/80'
            }`}>
              Insert and delete nodes dynamically without needing continuous memory block reallocations or costly linear shifts.
            </p>
          </div>

          {/* Card 3: Real-World Applications */}
          <div
            className={`p-6 rounded-2xl border transition-all duration-200 ${
              isDarkMode
                ? 'bg-[#090d18] border-violet-950/70 hover:border-violet-800/60'
                : 'bg-blue-50/40 border-blue-100 hover:border-blue-300'
            }`}
          >
            <h3 className={`text-base font-bold mb-2 ${
              isDarkMode ? 'text-slate-100' : 'text-black'
            }`}>
              Real-World Applications
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-blue-950/80'
            }`}>
              Underpins database indexing (B-Trees, AVL, Red-Black), syntax parsers, file system hierarchies, and auto-complete search engines.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. ABOUT TOPICS & CURRICULUM                                         */}
      {/* ==================================================================== */}
      <section
        id="section-about-topics"
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-slate-100'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
              isDarkMode
                ? 'bg-violet-950/60 border-violet-800/50 text-violet-400'
                : 'bg-violet-50 border-violet-200 text-[#6D3DF5]'
            }`}
          >
            <Layers className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            4. About Topics & Curriculum
          </h2>
        </div>

        {/* 4 Modules Matching Screenshot (47) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Module A */}
          <div
            onClick={() => onNavigate('learn', 'basics')}
            className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer group hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-[#090d18] border-violet-950/70 hover:border-violet-700/60'
                : 'bg-blue-50/40 border-blue-100 hover:border-blue-300'
            }`}
          >
            <span className="inline-block text-[11px] font-mono font-bold tracking-wider uppercase text-violet-500 dark:text-violet-400 mb-1.5">
              MODULE A
            </span>
            <h3 className={`text-sm sm:text-base font-bold mb-2 transition-colors ${
              isDarkMode ? 'text-slate-100 group-hover:text-violet-400' : 'text-black group-hover:text-blue-600'
            }`}>
              Foundations & Rules
            </h3>
            <p className={`text-xs leading-relaxed transition-colors ${
              isDarkMode ? 'text-slate-400 dark:text-slate-400' : 'text-blue-900/80 group-hover:text-black'
            }`}>
              Tree terminology, root, edges, leaves, subtree definitions, and the binary search invariant.
            </p>
          </div>

          {/* Module B */}
          <div
            onClick={() => onNavigate('learn', 'binary-search-tree')}
            className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer group hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-[#090d18] border-violet-950/70 hover:border-blue-700/60'
                : 'bg-blue-50/40 border-blue-100 hover:border-blue-300'
            }`}
          >
            <span className="inline-block text-[11px] font-mono font-bold tracking-wider uppercase text-blue-500 dark:text-blue-400 mb-1.5">
              MODULE B
            </span>
            <h3 className={`text-sm sm:text-base font-bold mb-2 transition-colors ${
              isDarkMode ? 'text-slate-100 group-hover:text-blue-400' : 'text-black group-hover:text-blue-600'
            }`}>
              Search & Insertion
            </h3>
            <p className={`text-xs leading-relaxed transition-colors ${
              isDarkMode ? 'text-slate-400 dark:text-slate-400' : 'text-blue-900/80 group-hover:text-black'
            }`}>
              Navigating step-by-step from root to leaf, comparing keys, and attaching new nodes accurately.
            </p>
          </div>

          {/* Module C */}
          <div
            onClick={() => onNavigate('learn', 'binary-search-tree')}
            className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer group hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-[#090d18] border-violet-950/70 hover:border-amber-700/60'
                : 'bg-blue-50/40 border-blue-100 hover:border-blue-300'
            }`}
          >
            <span className="inline-block text-[11px] font-mono font-bold tracking-wider uppercase text-amber-500 dark:text-amber-400 mb-1.5">
              MODULE C
            </span>
            <h3 className={`text-sm sm:text-base font-bold mb-2 transition-colors ${
              isDarkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-black group-hover:text-blue-600'
            }`}>
              3-Case Deletion
            </h3>
            <p className={`text-xs leading-relaxed transition-colors ${
              isDarkMode ? 'text-slate-400 dark:text-slate-400' : 'text-blue-900/80 group-hover:text-black'
            }`}>
              Leaf pruning, single-child bypass, and 2-child replacement using in-order successor and predecessor.
            </p>
          </div>

          {/* Module D */}
          <div
            onClick={() => onNavigate('learn', 'traversals')}
            className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer group hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-[#090d18] border-violet-950/70 hover:border-emerald-700/60'
                : 'bg-blue-50/40 border-blue-100 hover:border-blue-300'
            }`}
          >
            <span className="inline-block text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-500 dark:text-emerald-400 mb-1.5">
              MODULE D
            </span>
            <h3 className={`text-sm sm:text-base font-bold mb-2 transition-colors ${
              isDarkMode ? 'text-slate-100 group-hover:text-emerald-400' : 'text-black group-hover:text-blue-600'
            }`}>
              Traversals & Analysis
            </h3>
            <p className={`text-xs leading-relaxed transition-colors ${
              isDarkMode ? 'text-slate-400 dark:text-slate-400' : 'text-blue-900/80 group-hover:text-black'
            }`}>
              In-Order sorted printing, Pre-Order serialization, Post-Order memory cleanup, and tree height.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. READY TO MASTER BINARY SEARCH TREES?                              */}
      {/* ==================================================================== */}
      <section
        id="section-ready-to-master"
        className={`p-6 sm:p-8 md:p-9 rounded-3xl border transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-xl shadow-violet-950/30'
            : 'bg-[#F8F9FE] border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            {/* Illustrated Rocket matching reference design */}
            <RocketIllustration />

            {/* Heading & description matching reference screenshot */}
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Ready to Master Binary Search Trees?
              </h2>
              <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-blue-950/80'
              }`}>
                Begin with the fundamental tree properties and learn through interactive visualizations, 
                step-by-step guided walkthroughs, and hands-on tree construction exercises.
              </p>
            </div>
          </div>

          {/* Start Learning Action Button */}
          <button
            id="overview-start-learning-btn"
            onClick={() => onNavigate('learn')}
            className="px-6 sm:px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-indigo-500/20 active:scale-95"
          >
            <span>Start Learning</span>
            <span className="text-base leading-none">→</span>
          </button>
        </div>
      </section>

      {/* Footer Tagline matching reference */}
      <div className="text-center pt-2 pb-4">
        <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-blue-900/70'}`}>
          AlgoLearn • Your DSA Journey • Learn • Think • Build
        </p>
      </div>
    </div>
  );
};
