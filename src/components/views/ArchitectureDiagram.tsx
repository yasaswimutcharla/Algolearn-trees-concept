import React from 'react';
import { TopicId } from '../../types';
import { Network, GitBranch, Binary, ArrowRight, CornerDownRight, Folder, FileText, Globe, Code, HelpCircle, CheckCircle } from 'lucide-react';
import { TerminologyArchitectureDiagrams } from './TerminologyArchitectureDiagrams';
import { BinaryTreeArchitectureDiagrams } from './BinaryTreeArchitectureDiagrams';

interface ArchitectureDiagramProps {
  topicId: TopicId;
  isDarkMode: boolean;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ topicId, isDarkMode }) => {
  const renderDiagramContent = () => {
    switch (topicId) {
      /* ================================================================== */
      /* 01. WHAT IS A TREE? ARCHITECTURE DIAGRAM                          */
      /* ================================================================== */
      case 'basics':
        return (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-violet-950/60 text-violet-300 border border-violet-800/50' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              }`}>
                Hierarchical Tree Architecture
              </span>
            </div>

            {/* SVG Visual Diagram */}
            <div className={`p-4 sm:p-6 rounded-2xl border flex flex-col items-center justify-center overflow-x-auto ${
              isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-blue-50/40 border-blue-100'
            }`}>
              <svg viewBox="0 0 460 220" className="w-full max-w-lg h-auto">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={isDarkMode ? '#8b5cf6' : '#6366f1'} />
                  </marker>
                </defs>

                {/* Edges */}
                <line x1="230" y1="45" x2="130" y2="105" stroke={isDarkMode ? '#6d28d9' : '#a5b4fc'} strokeWidth="2.5" />
                <line x1="230" y1="45" x2="330" y2="105" stroke={isDarkMode ? '#6d28d9' : '#a5b4fc'} strokeWidth="2.5" />
                <line x1="130" y1="115" x2="75" y2="175" stroke={isDarkMode ? '#6d28d9' : '#a5b4fc'} strokeWidth="2.5" />
                <line x1="130" y1="115" x2="185" y2="175" stroke={isDarkMode ? '#6d28d9' : '#a5b4fc'} strokeWidth="2.5" />
                <line x1="330" y1="115" x2="330" y2="175" stroke={isDarkMode ? '#6d28d9' : '#a5b4fc'} strokeWidth="2.5" />

                {/* Edge Label Callout */}
                <rect x="150" y="65" width="54" height="20" rx="6" fill={isDarkMode ? '#1e1b4b' : '#e0e7ff'} stroke={isDarkMode ? '#6366f1' : '#818cf8'} strokeWidth="1" />
                <text x="177" y="79" fill={isDarkMode ? '#c7d2fe' : '#3730a3'} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">EDGE</text>

                {/* Root Node */}
                <g>
                  <circle cx="230" cy="35" r="24" fill={isDarkMode ? '#7c3aed' : '#4f46e5'} stroke={isDarkMode ? '#c4b5fd' : '#818cf8'} strokeWidth="2" />
                  <text x="230" y="40" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Root</text>
                  <rect x="265" y="24" width="76" height="22" rx="6" fill={isDarkMode ? '#3b0764' : '#f5f3ff'} stroke={isDarkMode ? '#a855f7' : '#c084fc'} strokeWidth="1" />
                  <text x="303" y="39" fill={isDarkMode ? '#e9d5ff' : '#6b21a8'} fontSize="10" fontWeight="bold" textAnchor="middle">Top Node</text>
                </g>

                {/* Child Nodes (Level 1) */}
                <g>
                  <circle cx="130" cy="115" r="22" fill={isDarkMode ? '#1e1b4b' : '#e0e7ff'} stroke={isDarkMode ? '#818cf8' : '#6366f1'} strokeWidth="2" />
                  <text x="130" y="120" fill={isDarkMode ? '#e0e7ff' : '#1e1b4b'} fontSize="12" fontWeight="bold" textAnchor="middle">Node A</text>
                </g>

                <g>
                  <circle cx="330" cy="115" r="22" fill={isDarkMode ? '#1e1b4b' : '#e0e7ff'} stroke={isDarkMode ? '#818cf8' : '#6366f1'} strokeWidth="2" />
                  <text x="330" y="120" fill={isDarkMode ? '#e0e7ff' : '#1e1b4b'} fontSize="12" fontWeight="bold" textAnchor="middle">Node B</text>
                </g>

                {/* Leaf Nodes (Level 2) */}
                <g>
                  <circle cx="75" cy="180" r="20" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke={isDarkMode ? '#34d399' : '#059669'} strokeWidth="2" />
                  <text x="75" y="185" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="11" fontWeight="bold" textAnchor="middle">Leaf 1</text>
                </g>

                <g>
                  <circle cx="185" cy="180" r="20" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke={isDarkMode ? '#34d399' : '#059669'} strokeWidth="2" />
                  <text x="185" y="185" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="11" fontWeight="bold" textAnchor="middle">Leaf 2</text>
                </g>

                <g>
                  <circle cx="330" cy="180" r="20" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke={isDarkMode ? '#34d399' : '#059669'} strokeWidth="2" />
                  <text x="330" y="185" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="11" fontWeight="bold" textAnchor="middle">Leaf 3</text>
                </g>
              </svg>
            </div>

            {/* Architecture Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border text-center ${
                isDarkMode ? 'bg-[#090d18] border-violet-950/70' : 'bg-white border-slate-200'
              }`}>
                <div className={`text-[10px] font-mono uppercase font-bold ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>Root Node</div>
                <div className="text-[11px] font-semibold opacity-80 mt-0.5">Top starting point</div>
              </div>
              <div className={`p-2.5 rounded-xl border text-center ${
                isDarkMode ? 'bg-[#090d18] border-violet-950/70' : 'bg-white border-slate-200'
              }`}>
                <div className={`text-[10px] font-mono uppercase font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>Edges</div>
                <div className="text-[11px] font-semibold opacity-80 mt-0.5">Connection links</div>
              </div>
              <div className={`p-2.5 rounded-xl border text-center ${
                isDarkMode ? 'bg-[#090d18] border-violet-950/70' : 'bg-white border-slate-200'
              }`}>
                <div className={`text-[10px] font-mono uppercase font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Parent / Child</div>
                <div className="text-[11px] font-semibold opacity-80 mt-0.5">Branch hierarchy</div>
              </div>
              <div className={`p-2.5 rounded-xl border text-center ${
                isDarkMode ? 'bg-[#090d18] border-violet-950/70' : 'bg-white border-slate-200'
              }`}>
                <div className={`text-[10px] font-mono uppercase font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Leaf Nodes</div>
                <div className="text-[11px] font-semibold opacity-80 mt-0.5">0 children (ends)</div>
              </div>
            </div>
          </div>
        );

      /* ================================================================== */
      /* 02. TREE TERMINOLOGY ARCHITECTURE DIAGRAM                          */
      /* ================================================================== */
      case 'terminology':
        return <TerminologyArchitectureDiagrams isDarkMode={isDarkMode} />;

      /* ================================================================== */
      /* 03. TYPES OF TREES ARCHITECTURE DIAGRAM                            */
      /* ================================================================== */
      case 'types':
        return (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
              }`}>
                Branching Rules Comparison
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Type 1: General Tree */}
              <div className={`p-4 rounded-2xl border flex flex-col items-center text-center ${
                isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-800'}`}>1. GENERAL TREE</div>
                <div className="text-[10px] opacity-70 mb-3">Any number of children</div>
                
                <svg viewBox="0 0 140 100" className="w-full max-w-[140px] h-24 mb-2">
                  <line x1="70" y1="20" x2="25" y2="65" stroke={isDarkMode ? '#06b6d4' : '#0284c7'} strokeWidth="2" />
                  <line x1="70" y1="20" x2="70" y2="65" stroke={isDarkMode ? '#06b6d4' : '#0284c7'} strokeWidth="2" />
                  <line x1="70" y1="20" x2="115" y2="65" stroke={isDarkMode ? '#06b6d4' : '#0284c7'} strokeWidth="2" />
                  <circle cx="70" cy="20" r="14" fill={isDarkMode ? '#0e7490' : '#0284c7'} />
                  <text x="70" y="24" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">A</text>
                  <circle cx="25" cy="70" r="11" fill={isDarkMode ? '#164e63' : '#bae6fd'} />
                  <text x="25" y="74" fill={isDarkMode ? '#cffafe' : '#0369a1'} fontSize="9" fontWeight="bold" textAnchor="middle">B</text>
                  <circle cx="70" cy="70" r="11" fill={isDarkMode ? '#164e63' : '#bae6fd'} />
                  <text x="70" y="74" fill={isDarkMode ? '#cffafe' : '#0369a1'} fontSize="9" fontWeight="bold" textAnchor="middle">C</text>
                  <circle cx="115" cy="70" r="11" fill={isDarkMode ? '#164e63' : '#bae6fd'} />
                  <text x="115" y="74" fill={isDarkMode ? '#cffafe' : '#0369a1'} fontSize="9" fontWeight="bold" textAnchor="middle">D</text>
                </svg>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                  isDarkMode ? 'bg-cyan-500/10 text-cyan-300' : 'bg-cyan-100 text-cyan-900 border border-cyan-200'
                }`}>
                  Branch Factor: Unlimited
                </span>
              </div>

              {/* Type 2: Binary Tree */}
              <div className={`p-4 rounded-2xl border flex flex-col items-center text-center ${
                isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-violet-400' : 'text-violet-800'}`}>2. BINARY TREE</div>
                <div className="text-[10px] opacity-70 mb-3">At most 2 children (Left / Right)</div>
                
                <svg viewBox="0 0 140 100" className="w-full max-w-[140px] h-24 mb-2">
                  <line x1="70" y1="20" x2="35" y2="65" stroke={isDarkMode ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />
                  <line x1="70" y1="20" x2="105" y2="65" stroke={isDarkMode ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />
                  <circle cx="70" cy="20" r="14" fill={isDarkMode ? '#7c3aed' : '#4f46e5'} />
                  <text x="70" y="24" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">A</text>
                  <circle cx="35" cy="70" r="12" fill={isDarkMode ? '#2e1065' : '#e0e7ff'} stroke={isDarkMode ? '#a78bfa' : '#6366f1'} strokeWidth="1.5" />
                  <text x="35" y="74" fill={isDarkMode ? '#e9d5ff' : '#312e81'} fontSize="9" fontWeight="bold" textAnchor="middle">L</text>
                  <circle cx="105" cy="70" r="12" fill={isDarkMode ? '#2e1065' : '#e0e7ff'} stroke={isDarkMode ? '#a78bfa' : '#6366f1'} strokeWidth="1.5" />
                  <text x="105" y="74" fill={isDarkMode ? '#e9d5ff' : '#312e81'} fontSize="9" fontWeight="bold" textAnchor="middle">R</text>
                </svg>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                  isDarkMode ? 'bg-violet-500/10 text-violet-300' : 'bg-violet-100 text-violet-900 border border-violet-200'
                }`}>
                  Branch Factor: ≤ 2
                </span>
              </div>

              {/* Type 3: Binary Search Tree */}
              <div className={`p-4 rounded-2xl border flex flex-col items-center text-center ${
                isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>3. BINARY SEARCH TREE</div>
                <div className="text-[10px] opacity-70 mb-3">Left &lt; Node &lt; Right</div>
                
                <svg viewBox="0 0 140 100" className="w-full max-w-[140px] h-24 mb-2">
                  <line x1="70" y1="20" x2="35" y2="65" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" />
                  <line x1="70" y1="20" x2="105" y2="65" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" />
                  <circle cx="70" cy="20" r="14" fill={isDarkMode ? '#059669' : '#10b981'} />
                  <text x="70" y="24" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">10</text>
                  <circle cx="35" cy="70" r="12" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke={isDarkMode ? '#34d399' : '#059669'} strokeWidth="1.5" />
                  <text x="35" y="74" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="9" fontWeight="bold" textAnchor="middle">5</text>
                  <circle cx="105" cy="70" r="12" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke={isDarkMode ? '#34d399' : '#059669'} strokeWidth="1.5" />
                  <text x="105" y="74" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="9" fontWeight="bold" textAnchor="middle">15</text>
                </svg>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                  isDarkMode ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}>
                  Sorted Ordering
                </span>
              </div>
            </div>
          </div>
        );

      /* ================================================================== */
      /* 04. BINARY TREE ARCHITECTURE DIAGRAM                               */
      /* ================================================================== */
      case 'binary-tree':
        return <BinaryTreeArchitectureDiagrams isDarkMode={isDarkMode} />;

      /* ================================================================== */
      /* 05. BINARY SEARCH TREE ARCHITECTURE DIAGRAM                        */
      /* ================================================================== */
      case 'bst':
        return (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                BST Invariant: Left &lt; Root &lt; Right
              </span>
            </div>

            <div className={`p-4 sm:p-6 rounded-2xl border flex flex-col items-center justify-center overflow-x-auto ${
              isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <svg viewBox="0 0 460 210" className="w-full max-w-md h-auto">
                {/* Comparison Arrows */}
                <path d="M 205 38 L 135 90" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 3" />
                <path d="M 255 38 L 325 90" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="3 3" />

                {/* Subtree Left Boundary */}
                <rect x="40" y="85" width="160" height="115" rx="14" fill={isDarkMode ? '#064e3b' : '#ecfdf5'} fillOpacity="0.25" stroke="#10b981" strokeWidth="1.5" />
                <text x="120" y="78" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">&lt; 50 (GO LEFT)</text>

                {/* Subtree Right Boundary */}
                <rect x="260" y="85" width="160" height="115" rx="14" fill={isDarkMode ? '#1e3a8a' : '#eff6ff'} fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="340" y="78" fill="#3b82f6" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">&gt; 50 (GO RIGHT)</text>

                {/* Edges */}
                <line x1="230" y1="40" x2="120" y2="110" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2.5" />
                <line x1="230" y1="40" x2="340" y2="110" stroke={isDarkMode ? '#3b82f6' : '#2563eb'} strokeWidth="2.5" />
                <line x1="120" y1="120" x2="80" y2="170" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" />
                <line x1="120" y1="120" x2="160" y2="170" stroke={isDarkMode ? '#10b981' : '#059669'} strokeWidth="2" />
                <line x1="340" y1="120" x2="300" y2="170" stroke={isDarkMode ? '#3b82f6' : '#2563eb'} strokeWidth="2" />
                <line x1="340" y1="120" x2="380" y2="170" stroke={isDarkMode ? '#3b82f6' : '#2563eb'} strokeWidth="2" />

                {/* Root 50 */}
                <g>
                  <circle cx="230" cy="38" r="24" fill={isDarkMode ? '#059669' : '#10b981'} stroke="#ffffff" strokeWidth="2" />
                  <text x="230" y="44" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">50</text>
                  <text x="230" y="10" fill={isDarkMode ? '#6ee7b7' : '#047857'} fontSize="10" fontWeight="bold" textAnchor="middle">ROOT (50)</text>
                </g>

                {/* Left Child 30 */}
                <g>
                  <circle cx="120" cy="115" r="18" fill={isDarkMode ? '#064e3b' : '#d1fae5'} stroke="#10b981" strokeWidth="2" />
                  <text x="120" y="120" fill={isDarkMode ? '#ffffff' : '#065f46'} fontSize="11" fontWeight="bold" textAnchor="middle">30</text>
                </g>

                {/* Right Child 70 */}
                <g>
                  <circle cx="340" cy="115" r="18" fill={isDarkMode ? '#1e3a8a' : '#dbeafe'} stroke="#3b82f6" strokeWidth="2" />
                  <text x="340" y="120" fill={isDarkMode ? '#ffffff' : '#1e3a8a'} fontSize="11" fontWeight="bold" textAnchor="middle">70</text>
                </g>

                {/* Leaves */}
                <circle cx="80" cy="170" r="14" fill={isDarkMode ? '#022c22' : '#a7f3d0'} stroke="#10b981" strokeWidth="1.5" />
                <text x="80" y="174" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">20</text>

                <circle cx="160" cy="170" r="14" fill={isDarkMode ? '#022c22' : '#a7f3d0'} stroke="#10b981" strokeWidth="1.5" />
                <text x="160" y="174" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">40</text>

                <circle cx="300" cy="170" r="14" fill={isDarkMode ? '#172554' : '#bfdbfe'} stroke="#3b82f6" strokeWidth="1.5" />
                <text x="300" y="174" fill={isDarkMode ? '#bfdbfe' : '#1e3a8a'} fontSize="10" fontWeight="bold" textAnchor="middle">60</text>

                <circle cx="380" cy="170" r="14" fill={isDarkMode ? '#172554' : '#bfdbfe'} stroke="#3b82f6" strokeWidth="1.5" />
                <text x="380" y="174" fill={isDarkMode ? '#bfdbfe' : '#1e3a8a'} fontSize="10" fontWeight="bold" textAnchor="middle">80</text>
              </svg>
            </div>

            <div className="p-3.5 rounded-2xl border text-xs flex items-center justify-around font-mono text-center">
              <span className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>20, 30, 40 &lt; 50</span>
              <span className="opacity-40">|</span>
              <span className={`font-bold ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>ROOT = 50</span>
              <span className="opacity-40">|</span>
              <span className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>50 &lt; 60, 70, 80</span>
            </div>
          </div>
        );

      /* ================================================================== */
      /* 06. TREE TRAVERSALS ARCHITECTURE DIAGRAM                           */
      /* ================================================================== */
      case 'traversals':
        return (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                Traversal Sequences & Order Rules
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Preorder */}
              <div className={`p-4 rounded-2xl border text-center ${
                isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>PREORDER</div>
                <div className="text-[10px] font-mono opacity-80 mb-2">Root → Left → Right</div>
                <div className="flex items-center justify-center gap-1 my-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-900 font-mono font-bold text-xs flex items-center justify-center">1</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/40">2</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/40">3</span>
                </div>
                <p className="text-[11px] opacity-75 mt-2">Visits current node before children.</p>
              </div>

              {/* Inorder */}
              <div className={`p-4 rounded-2xl border text-center ${
                isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>INORDER</div>
                <div className="text-[10px] font-mono opacity-80 mb-2">Left → Root → Right</div>
                <div className="flex items-center justify-center gap-1 my-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/40">2</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-900 font-mono font-bold text-xs flex items-center justify-center">1</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/40">3</span>
                </div>
                <p className="text-[11px] opacity-75 mt-2">Gives sorted ascending order in BST.</p>
              </div>

              {/* Postorder */}
              <div className={`p-4 rounded-2xl border text-center ${
                isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-violet-400' : 'text-violet-800'}`}>POSTORDER</div>
                <div className="text-[10px] font-mono opacity-80 mb-2">Left → Right → Root</div>
                <div className="flex items-center justify-center gap-1 my-2">
                  <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 font-mono font-bold text-xs flex items-center justify-center border border-violet-500/40">2</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                  <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 font-mono font-bold text-xs flex items-center justify-center border border-violet-500/40">3</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                  <span className="w-6 h-6 rounded-full bg-violet-500 text-slate-900 font-mono font-bold text-xs flex items-center justify-center">1</span>
                </div>
                <p className="text-[11px] opacity-75 mt-2">Visits children before the parent.</p>
              </div>
            </div>
          </div>
        );

      /* ================================================================== */
      /* 07. TREE APPLICATIONS ARCHITECTURE DIAGRAM                         */
      /* ================================================================== */
      case 'applications':
        return (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-violet-950/60 text-violet-300 border border-violet-800/50' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              }`}>
                Real-World System Hierarchies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Application 1: File System Directory Tree */}
              <div className={`p-4 rounded-2xl border ${
                isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Folder className={`w-4 h-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                  <div className={`text-xs font-bold uppercase ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>OS File System Hierarchy</div>
                </div>

                <div className={`p-3 rounded-xl font-mono text-xs space-y-1.5 ${
                  isDarkMode ? 'bg-[#0e1424] text-slate-300' : 'bg-white text-slate-700 border border-slate-200'
                }`}>
                  <div className={`font-bold ${isDarkMode ? 'text-violet-400' : 'text-violet-800'}`}>📁 Root (/)</div>
                  <div className={`pl-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500 font-medium'}`}>├── 📁 Documents/</div>
                  <div className={`pl-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700 font-semibold'}`}>├── 📄 resume.pdf</div>
                  <div className={`pl-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700 font-semibold'}`}>└── 📄 notes.txt</div>
                  <div className={`pl-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500 font-medium'}`}>└── 📁 Photos/</div>
                  <div className={`pl-8 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-700 font-semibold'}`}>└── 🖼️ sunset.png</div>
                </div>
              </div>

              {/* Application 2: Browser DOM Tree */}
              <div className={`p-4 rounded-2xl border ${
                isDarkMode ? 'bg-[#070a12] border-violet-950/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <div className={`text-xs font-bold uppercase ${isDarkMode ? 'text-cyan-400' : 'text-cyan-800'}`}>Web Browser DOM Tree</div>
                </div>

                <div className={`p-3 rounded-xl font-mono text-xs space-y-1.5 ${
                  isDarkMode ? 'bg-[#0e1424] text-slate-300' : 'bg-white text-slate-700 border border-slate-200'
                }`}>
                  <div className={`font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-800'}`}>&lt;html&gt; (Root)</div>
                  <div className={`pl-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500 font-medium'}`}>├── &lt;head&gt;</div>
                  <div className={`pl-8 ${isDarkMode ? 'text-violet-400' : 'text-violet-800 font-semibold'}`}>└── &lt;title&gt;My App&lt;/title&gt;</div>
                  <div className={`pl-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500 font-medium'}`}>└── &lt;body&gt;</div>
                  <div className={`pl-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700 font-semibold'}`}>├── &lt;h1&gt;Header&lt;/h1&gt;</div>
                  <div className={`pl-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700 font-semibold'}`}>└── &lt;button&gt;Click&lt;/button&gt;</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      id="section-architecture-diagram"
      className={`p-6 sm:p-7 rounded-3xl border transition-all ${
        isDarkMode
          ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-sm'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-violet-400 shadow-xs shadow-violet-400' : 'bg-violet-600 shadow-xs shadow-violet-400/50'}`} />
          <h3 className={`text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 ${
            isDarkMode ? 'text-violet-400' : 'text-violet-700 font-extrabold'
          }`}>
            <Network className="w-4 h-4" />
            Architecture Diagram
          </h3>
        </div>
        <span className="text-[11px] font-mono opacity-60">Visual Blueprint</span>
      </div>

      {renderDiagramContent()}
    </div>
  );
};
