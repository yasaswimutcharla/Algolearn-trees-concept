import React from 'react';
import { Network, CheckCircle2 } from 'lucide-react';

interface BinaryTreeArchitectureDiagramsProps {
  isDarkMode: boolean;
}

interface BinaryTreeTypeBlock {
  key: string;
  letter: string;
  title: string;
  badge: string;
  explanation: string;
  note: string;
  renderSvg: (dark: boolean) => React.ReactNode;
}

export const BinaryTreeArchitectureDiagrams: React.FC<BinaryTreeArchitectureDiagramsProps> = ({ isDarkMode }) => {
  const blocks: BinaryTreeTypeBlock[] = [
    {
      key: 'strictly',
      letter: 'A',
      title: 'Strictly Binary Tree',
      badge: '0 or 2 Children Rule',
      explanation:
        'In a strictly binary tree, every node has either zero (0) children or exactly two (2) children. No node in the tree is permitted to have only one child.',
      note: 'Every node is either a parent with 2 children or a leaf with 0 children.',
      renderSvg: (dark) => (
        <svg viewBox="0 0 380 180" className="w-full max-w-sm h-auto">
          {/* Edges from Root 10 */}
          <line x1="190" y1="40" x2="110" y2="115" stroke={dark ? '#8b5cf6' : '#6366f1'} strokeWidth="2.5" />
          <line x1="190" y1="40" x2="270" y2="115" stroke={dark ? '#8b5cf6' : '#6366f1'} strokeWidth="2.5" />

          {/* Root Node 10 */}
          <g>
            <circle cx="190" cy="40" r="22" fill={dark ? '#7c3aed' : '#4f46e5'} stroke={dark ? '#c4b5fd' : '#818cf8'} strokeWidth="2" />
            <text x="190" y="45" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">10</text>
            <rect x="220" y="28" width="92" height="22" rx="6" fill={dark ? '#3b0764' : '#f5f3ff'} stroke={dark ? '#a855f7' : '#c084fc'} strokeWidth="1" />
            <text x="266" y="43" fill={dark ? '#e9d5ff' : '#6b21a8'} fontSize="10" fontWeight="bold" textAnchor="middle">2 Children (Root)</text>
          </g>

          {/* Left Leaf Node 5 */}
          <g>
            <circle cx="110" cy="115" r="20" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="2" />
            <text x="110" y="120" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="12" fontWeight="bold" textAnchor="middle">5</text>
            <text x="110" y="152" fill={dark ? '#6ee7b7' : '#047857'} fontSize="10" fontWeight="600" textAnchor="middle">0 Children (Leaf)</text>
          </g>

          {/* Right Leaf Node 15 */}
          <g>
            <circle cx="270" cy="115" r="20" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="2" />
            <text x="270" y="120" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="12" fontWeight="bold" textAnchor="middle">15</text>
            <text x="270" y="152" fill={dark ? '#6ee7b7' : '#047857'} fontSize="10" fontWeight="600" textAnchor="middle">0 Children (Leaf)</text>
          </g>
        </svg>
      )
    },
    {
      key: 'full',
      letter: 'B',
      title: 'Full Binary Tree',
      badge: 'Strict 0 or 2 Children',
      explanation:
        'A binary tree in which every node has either zero (0) or exactly two (2) children. All non-leaf nodes branch into two paths with no dangling single children.',
      note: 'All parents (10, 5, 15) have 2 children; all leaves (2, 7, 12, 18) have 0 children.',
      renderSvg: (dark) => (
        <svg viewBox="0 0 380 195" className="w-full max-w-md h-auto">
          {/* Level 0 to 1 */}
          <line x1="190" y1="35" x2="105" y2="90" stroke={dark ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />
          <line x1="190" y1="35" x2="275" y2="90" stroke={dark ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />
          {/* Level 1 to 2 */}
          <line x1="105" y1="90" x2="65" y2="145" stroke={dark ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />
          <line x1="105" y1="90" x2="145" y2="145" stroke={dark ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />
          <line x1="275" y1="90" x2="235" y2="145" stroke={dark ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />
          <line x1="275" y1="90" x2="315" y2="145" stroke={dark ? '#8b5cf6' : '#6366f1'} strokeWidth="2" />

          {/* Root 10 */}
          <circle cx="190" cy="35" r="18" fill={dark ? '#7c3aed' : '#4f46e5'} stroke="#ffffff" strokeWidth="2" />
          <text x="190" y="39" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">10</text>

          {/* Node 5 */}
          <circle cx="105" cy="90" r="17" fill={dark ? '#2e1065' : '#e0e7ff'} stroke={dark ? '#a78bfa' : '#6366f1'} strokeWidth="2" />
          <text x="105" y="94" fill={dark ? '#e9d5ff' : '#312e81'} fontSize="11" fontWeight="bold" textAnchor="middle">5</text>

          {/* Node 15 */}
          <circle cx="275" cy="90" r="17" fill={dark ? '#2e1065' : '#e0e7ff'} stroke={dark ? '#a78bfa' : '#6366f1'} strokeWidth="2" />
          <text x="275" y="94" fill={dark ? '#e9d5ff' : '#312e81'} fontSize="11" fontWeight="bold" textAnchor="middle">15</text>

          {/* Leaves: 2, 7, 12, 18 */}
          <circle cx="65" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="65" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">2</text>

          <circle cx="145" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="145" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">7</text>

          <circle cx="235" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="235" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">12</text>

          <circle cx="315" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="315" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">18</text>

          <text x="190" y="180" fill={dark ? '#c4b5fd' : '#4f46e5'} fontSize="10" fontWeight="600" textAnchor="middle">
            Every node has 0 or 2 children · No node has 1 child
          </text>
        </svg>
      )
    },
    {
      key: 'complete',
      letter: 'C',
      title: 'Complete Binary Tree',
      badge: 'Filled Left to Right',
      explanation:
        'All levels are completely filled except possibly the last level. In the last level, all nodes are placed sequentially as far left as possible with no empty gaps on the left.',
      note: 'Last level nodes [2] → [7] → [12] are packed left-to-right without skipping slots.',
      renderSvg: (dark) => (
        <svg viewBox="0 0 380 200" className="w-full max-w-md h-auto">
          {/* Edges */}
          <line x1="190" y1="35" x2="105" y2="90" stroke={dark ? '#06b6d4' : '#0284c7'} strokeWidth="2" />
          <line x1="190" y1="35" x2="275" y2="90" stroke={dark ? '#06b6d4' : '#0284c7'} strokeWidth="2" />
          <line x1="105" y1="90" x2="65" y2="145" stroke={dark ? '#06b6d4' : '#0284c7'} strokeWidth="2" />
          <line x1="105" y1="90" x2="145" y2="145" stroke={dark ? '#06b6d4' : '#0284c7'} strokeWidth="2" />
          <line x1="275" y1="90" x2="235" y2="145" stroke={dark ? '#06b6d4' : '#0284c7'} strokeWidth="2" />

          {/* Root 10 */}
          <circle cx="190" cy="35" r="18" fill={dark ? '#0891b2' : '#0284c7'} stroke="#ffffff" strokeWidth="2" />
          <text x="190" y="39" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">10</text>

          {/* Node 5 */}
          <circle cx="105" cy="90" r="17" fill={dark ? '#164e63' : '#e0f2fe'} stroke={dark ? '#38bdf8' : '#0284c7'} strokeWidth="2" />
          <text x="105" y="94" fill={dark ? '#e0f2fe' : '#0369a1'} fontSize="11" fontWeight="bold" textAnchor="middle">5</text>

          {/* Node 15 */}
          <circle cx="275" cy="90" r="17" fill={dark ? '#164e63' : '#e0f2fe'} stroke={dark ? '#38bdf8' : '#0284c7'} strokeWidth="2" />
          <text x="275" y="94" fill={dark ? '#e0f2fe' : '#0369a1'} fontSize="11" fontWeight="bold" textAnchor="middle">15</text>

          {/* Leaves: 2, 7, 12 */}
          <circle cx="65" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="65" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">2</text>

          <circle cx="145" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="145" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">7</text>

          <circle cx="235" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="235" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">12</text>

          {/* Empty Next Slot */}
          <circle cx="315" cy="145" r="15" fill="none" stroke={dark ? '#475569' : '#cbd5e1'} strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="315" y="149" fill={dark ? '#64748b' : '#94a3b8'} fontSize="9" textAnchor="middle">next</text>

          <text x="190" y="185" fill={dark ? '#38bdf8' : '#0284c7'} fontSize="10" fontWeight="600" textAnchor="middle">
            Bottom level packed from left to right: [2] → [7] → [12]
          </text>
        </svg>
      )
    },
    {
      key: 'perfect',
      letter: 'D',
      title: 'Perfect Binary Tree',
      badge: 'Full Symmetrical Triangle',
      explanation:
        'A binary tree in which every internal node has exactly two children and all leaf nodes are situated at the exact same depth/level, creating a completely solid triangle.',
      note: 'All internal nodes have 2 children and all 4 leaf nodes sit together on Level 2.',
      renderSvg: (dark) => (
        <svg viewBox="0 0 380 200" className="w-full max-w-md h-auto">
          {/* Edges */}
          <line x1="190" y1="35" x2="105" y2="90" stroke={dark ? '#ec4899' : '#db2777'} strokeWidth="2" />
          <line x1="190" y1="35" x2="275" y2="90" stroke={dark ? '#ec4899' : '#db2777'} strokeWidth="2" />
          <line x1="105" y1="90" x2="65" y2="145" stroke={dark ? '#ec4899' : '#db2777'} strokeWidth="2" />
          <line x1="105" y1="90" x2="145" y2="145" stroke={dark ? '#ec4899' : '#db2777'} strokeWidth="2" />
          <line x1="275" y1="90" x2="235" y2="145" stroke={dark ? '#ec4899' : '#db2777'} strokeWidth="2" />
          <line x1="275" y1="90" x2="315" y2="145" stroke={dark ? '#ec4899' : '#db2777'} strokeWidth="2" />

          {/* Root 10 */}
          <circle cx="190" cy="35" r="18" fill={dark ? '#db2777' : '#be185d'} stroke="#ffffff" strokeWidth="2" />
          <text x="190" y="39" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">10</text>

          {/* Node 5 */}
          <circle cx="105" cy="90" r="17" fill={dark ? '#831843' : '#fce7f3'} stroke={dark ? '#f472b6' : '#db2777'} strokeWidth="2" />
          <text x="105" y="94" fill={dark ? '#fbcfe8' : '#831843'} fontSize="11" fontWeight="bold" textAnchor="middle">5</text>

          {/* Node 15 */}
          <circle cx="275" cy="90" r="17" fill={dark ? '#831843' : '#fce7f3'} stroke={dark ? '#f472b6' : '#db2777'} strokeWidth="2" />
          <text x="275" y="94" fill={dark ? '#fbcfe8' : '#831843'} fontSize="11" fontWeight="bold" textAnchor="middle">15</text>

          {/* Leaves: 2, 7, 12, 18 all at y=145 */}
          <circle cx="65" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="65" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">2</text>

          <circle cx="145" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="145" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">7</text>

          <circle cx="235" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="235" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">12</text>

          <circle cx="315" cy="145" r="15" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="1.5" />
          <text x="315" y="149" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="10" fontWeight="bold" textAnchor="middle">18</text>

          {/* Level baseline */}
          <line x1="45" y1="172" x2="335" y2="172" stroke={dark ? '#f472b6' : '#db2777'} strokeWidth="1" strokeDasharray="3 3" />
          <text x="190" y="187" fill={dark ? '#f472b6' : '#db2777'} fontSize="10" fontWeight="bold" textAnchor="middle">
            All 4 leaf nodes align on the exact same level (Level 2)
          </text>
        </svg>
      )
    },
    {
      key: 'degenerate',
      letter: 'E',
      title: 'Degenerate Binary Tree',
      badge: 'Single Line / Chain',
      explanation:
        'A binary tree where every parent node has only one child. Because there is no two-way branching, the tree behaves like a linear linked list with O(N) search time.',
      note: 'Each node has exactly 1 child, resulting in a single vertical/diagonal path.',
      renderSvg: (dark) => (
        <svg viewBox="0 0 380 205" className="w-full max-w-md h-auto">
          {/* Diagonal connecting lines */}
          <line x1="80" y1="35" x2="150" y2="85" stroke={dark ? '#f59e0b' : '#d97706'} strokeWidth="2.5" />
          <line x1="150" y1="85" x2="220" y2="135" stroke={dark ? '#f59e0b' : '#d97706'} strokeWidth="2.5" />
          <line x1="220" y1="135" x2="290" y2="180" stroke={dark ? '#f59e0b' : '#d97706'} strokeWidth="2.5" />

          {/* Node 10 */}
          <g>
            <circle cx="80" cy="35" r="18" fill={dark ? '#d97706' : '#b45309'} stroke="#ffffff" strokeWidth="2" />
            <text x="80" y="39" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">10</text>
            <text x="80" y="14" fill={dark ? '#fcd34d' : '#92400e'} fontSize="9" fontWeight="bold" textAnchor="middle">Root (1 child)</text>
          </g>

          {/* Node 20 */}
          <g>
            <circle cx="150" cy="85" r="18" fill={dark ? '#78350f' : '#fef3c7'} stroke={dark ? '#fbbf24' : '#d97706'} strokeWidth="2" />
            <text x="150" y="89" fill={dark ? '#fef3c7' : '#78350f'} fontSize="12" fontWeight="bold" textAnchor="middle">20</text>
            <text x="150" y="64" fill={dark ? '#fcd34d' : '#92400e'} fontSize="9" fontWeight="bold" textAnchor="middle">1 child</text>
          </g>

          {/* Node 30 */}
          <g>
            <circle cx="220" cy="135" r="18" fill={dark ? '#78350f' : '#fef3c7'} stroke={dark ? '#fbbf24' : '#d97706'} strokeWidth="2" />
            <text x="220" y="139" fill={dark ? '#fef3c7' : '#78350f'} fontSize="12" fontWeight="bold" textAnchor="middle">30</text>
            <text x="220" y="114" fill={dark ? '#fcd34d' : '#92400e'} fontSize="9" fontWeight="bold" textAnchor="middle">1 child</text>
          </g>

          {/* Node 40 (Leaf) */}
          <g>
            <circle cx="290" cy="180" r="18" fill={dark ? '#064e3b' : '#d1fae5'} stroke={dark ? '#34d399' : '#059669'} strokeWidth="2" />
            <text x="290" y="184" fill={dark ? '#a7f3d0' : '#065f46'} fontSize="12" fontWeight="bold" textAnchor="middle">40</text>
            <text x="290" y="201" fill={dark ? '#34d399' : '#059669'} fontSize="9" fontWeight="bold" textAnchor="middle">Leaf (End)</text>
          </g>
        </svg>
      )
    }
  ];

  return (
    <div
      id="binary-tree-architecture-diagrams-container"
      className="space-y-5"
    >
      {/* Header Banner */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border flex items-center justify-between gap-3 ${
          isDarkMode
            ? 'bg-[#0a0f1d] border-violet-900/50 text-slate-100 shadow-xl'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isDarkMode
                ? 'bg-violet-950/80 border border-violet-800/60 text-violet-300'
                : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
            }`}
          >
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-violet-300">
              Binary Tree Architecture Diagrams
            </h3>
            <p className="text-xs opacity-75">
              Visual structural topology for all 5 binary tree classifications
            </p>
          </div>
        </div>

        <span
          className={`text-[11px] font-mono font-semibold px-3 py-1 rounded-full border shrink-0 ${
            isDarkMode
              ? 'bg-violet-950/50 text-violet-300 border-violet-800/40'
              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
          }`}
        >
          5 Visual Models
        </span>
      </div>

      {/* 5 Separate Architecture Diagram Blocks */}
      {blocks.map((block) => (
        <div
          key={block.key}
          id={`arch-diagram-block-${block.key}`}
          className={`p-5 sm:p-6 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-[#0a0f1d] border-violet-900/40 text-slate-100 shadow-lg'
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}
        >
          {/* Block Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-400 font-mono font-bold text-xs flex items-center justify-center">
                {block.letter}
              </span>
              <h4 className="text-base sm:text-lg font-bold tracking-tight">
                {block.title}
              </h4>
            </div>

            <span
              className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                isDarkMode
                  ? 'bg-[#151c2e] border-violet-800/40 text-violet-300'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700'
              }`}
            >
              {block.badge}
            </span>
          </div>

          {/* Short Explanation */}
          <p className="text-xs sm:text-sm opacity-90 leading-relaxed mb-4">
            {block.explanation}
          </p>

          {/* SVG Diagram Canvas */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border flex flex-col items-center justify-center overflow-x-auto my-3 ${
              isDarkMode
                ? 'bg-[#060913] border-violet-950/90'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            {block.renderSvg(isDarkMode)}
          </div>

          {/* Bottom Note */}
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 mt-3 ${
              isDarkMode
                ? 'bg-[#121829] border-violet-950/80 text-slate-300'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <span className="opacity-95">{block.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
