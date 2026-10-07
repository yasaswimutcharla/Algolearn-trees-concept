import React from 'react';
import { NavItem, TopicId } from '../../types';
import {
  Sparkles,
  Layers,
  Zap,
  Globe,
  Star,
  Search,
  Binary,
  PlusCircle,
  Activity,
  GitBranch,
  ArrowRight
} from 'lucide-react';
import { AlgoLearnCapIcon } from '../AlgoLearnLogo';

interface HomeViewProps {
  onNavigate: (nav: NavItem, topicId?: TopicId) => void;
  isDarkMode: boolean;
}

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
            ? 'bg-black border-zinc-800 text-slate-100 shadow-2xl shadow-black/80'
            : 'bg-white border-indigo-100 text-slate-900 shadow-xl shadow-indigo-100/50'
        }`}
      >
        {isDarkMode && (
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${
              isDarkMode
                ? 'bg-zinc-900/90 text-indigo-300 border-zinc-800'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 border-indigo-200'
            }`}>
              <AlgoLearnCapIcon isDark={isDarkMode} size={18} className="shrink-0" />
              <span className="font-extrabold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">AlgoLearn</span>
              <span className="opacity-40">•</span>
              <span>TREES • MODULE 01 • CHAPTER 01</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-balance">
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                Non-Linear Hierarchical{' '}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED]">
                Data Structure
              </span>
            </h1>

            <p className="text-sm sm:text-base opacity-85 leading-relaxed text-balance">
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
                  ? 'bg-[#0a0a0a] border-zinc-800/80'
                  : 'bg-indigo-50/30 border-indigo-100'
              }`}
            >
              {/* Responsive SVG Tree Illustration */}
              <svg viewBox="0 0 320 230" className="w-full h-auto select-none">
                <defs>
                  <linearGradient id="heroEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="50%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                  <filter id="heroNodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4F46E5" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Level Guideline indicators */}
                <line x1="20" y1="40" x2="300" y2="40" stroke={isDarkMode ? '#27272a' : '#e2e8f0'} strokeDasharray="3 3" strokeWidth="1" />
                <text x="25" y="32" fill={isDarkMode ? '#71717a' : '#94a3b8'} fontSize="8" fontFamily="monospace">Level 0 (Root)</text>

                <line x1="20" y1="115" x2="300" y2="115" stroke={isDarkMode ? '#27272a' : '#e2e8f0'} strokeDasharray="3 3" strokeWidth="1" />
                <text x="25" y="107" fill={isDarkMode ? '#71717a' : '#94a3b8'} fontSize="8" fontFamily="monospace">Level 1 (Branch)</text>

                <line x1="20" y1="190" x2="300" y2="190" stroke={isDarkMode ? '#27272a' : '#e2e8f0'} strokeDasharray="3 3" strokeWidth="1" />
                <text x="25" y="182" fill={isDarkMode ? '#71717a' : '#94a3b8'} fontSize="8" fontFamily="monospace">Level 2 (Leaves)</text>

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
              ? 'bg-black border-zinc-800 hover:border-zinc-700 shadow-lg shadow-black/40'
              : 'bg-white border-indigo-100 hover:border-indigo-300 shadow-md shadow-indigo-100/30'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
              isDarkMode
                ? 'bg-blue-950/60 border-blue-500/50 text-blue-400 shadow-sm shadow-blue-500/20'
                : 'bg-blue-50 border-blue-200 text-blue-600'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-indigo-300' : 'text-indigo-950'}`}>
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
              ? 'bg-black border-zinc-800 hover:border-zinc-700 shadow-lg shadow-black/40'
              : 'bg-white border-indigo-100 hover:border-indigo-300 shadow-md shadow-indigo-100/30'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
              isDarkMode
                ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-400 shadow-sm shadow-indigo-500/20'
                : 'bg-indigo-50 border-indigo-200 text-indigo-600'
            }`}>
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-indigo-300' : 'text-indigo-950'}`}>
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
              ? 'bg-black border-zinc-800 hover:border-zinc-700 shadow-lg shadow-black/40'
              : 'bg-white border-indigo-100 hover:border-indigo-300 shadow-md shadow-indigo-100/30'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all ${
              isDarkMode
                ? 'bg-purple-950/60 border-purple-500/50 text-purple-400 shadow-sm shadow-purple-500/20'
                : 'bg-purple-50 border-purple-200 text-purple-600'
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-indigo-300' : 'text-indigo-950'}`}>
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
            ? 'bg-black border-zinc-800 text-slate-100'
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
                isDarkMode ? 'bg-[#0a0a0a] border-zinc-850' : 'bg-blue-50/40 border-blue-100'
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
                  isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-blue-100'
                }`}>
                  <span className="text-[10px] font-bold uppercase opacity-60">Linear List</span>
                  <div className="flex items-center gap-1 font-mono text-[11px] font-bold">
                    <span className={isDarkMode ? 'px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200' : 'px-1.5 py-0.5 rounded bg-blue-100 text-blue-900'}>A</span> →
                    <span className={isDarkMode ? 'px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200' : 'px-1.5 py-0.5 rounded bg-blue-100 text-blue-900'}>B</span> →
                    <span className={isDarkMode ? 'px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200' : 'px-1.5 py-0.5 rounded bg-blue-100 text-blue-900'}>C</span> →
                    <span className={isDarkMode ? 'px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200' : 'px-1.5 py-0.5 rounded bg-blue-100 text-blue-900'}>D</span>
                  </div>
                </div>

                {/* Tree */}
                <div className={`p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-blue-100'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>Tree Hierarchy</span>
                    <span className={`text-[10px] font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>O(log N) Search</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 font-mono text-[11px]">
                    <div className="px-2 py-0.5 rounded bg-violet-600 text-white font-bold">Root (A)</div>
                    <div className="flex items-center gap-6">
                      <div className={`px-2 py-0.5 rounded border ${isDarkMode ? 'bg-indigo-950/70 border-indigo-500/40 text-indigo-200' : 'bg-indigo-100 border-indigo-300 text-indigo-900 font-semibold'}`}>Subtree B</div>
                      <div className={`px-2 py-0.5 rounded border ${isDarkMode ? 'bg-indigo-950/70 border-indigo-500/40 text-indigo-200' : 'bg-indigo-100 border-indigo-300 text-indigo-900 font-semibold'}`}>Subtree C</div>
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
            ? 'bg-black border-zinc-800 text-slate-100'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                isDarkMode
                  ? 'bg-zinc-900 border-zinc-800 text-violet-400'
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

        {/* Roadmap steps without connecting line */}
        <div className="relative">
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
                cardBorderDark: 'hover:border-zinc-700 hover:bg-zinc-900/40'
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
                cardBorderDark: 'hover:border-zinc-700 hover:bg-zinc-900/40'
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
                cardBorderDark: 'hover:border-zinc-700 hover:bg-zinc-900/40'
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
                cardBorderDark: 'hover:border-zinc-700 hover:bg-zinc-900/40'
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
                cardBorderDark: 'hover:border-zinc-700 hover:bg-zinc-900/40'
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
                cardBorderDark: 'hover:border-zinc-700 hover:bg-zinc-900/40'
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
                cardBorderDark: 'hover:border-zinc-700 hover:bg-zinc-900/40'
              }
            ].map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigate('learn', step.topicId)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer group hover:scale-[1.03] flex flex-col items-center text-center ${
                    isDarkMode
                      ? `bg-[#0a0a0a] border-zinc-800/80 ${step.cardBorderDark}`
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
            ? 'bg-black border-zinc-800 text-slate-100'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
              isDarkMode
                ? 'bg-zinc-900 border-zinc-800 text-violet-400'
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
                ? 'bg-[#0a0a0a] border-zinc-800/80 hover:border-zinc-700'
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
                ? 'bg-[#0a0a0a] border-zinc-800/80 hover:border-zinc-700'
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
                ? 'bg-[#0a0a0a] border-zinc-800/80 hover:border-zinc-700'
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
    </div>
  );
};
