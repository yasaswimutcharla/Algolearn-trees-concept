import React, { useState } from 'react';
import { Layers, Network, Eye, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

interface TerminologyArchitectureDiagramsProps {
  isDarkMode: boolean;
}

type FilterView =
  | 'all'
  | 'root-edges'
  | 'parent-child'
  | 'leaf-internal'
  | 'levels-depth'
  | 'subtree-siblings'
  | 'ancestor-descendant'
  | 'height-degree';

export const TerminologyArchitectureDiagrams: React.FC<TerminologyArchitectureDiagramsProps> = ({ isDarkMode }) => {
  const [activeFilter, setActiveFilter] = useState<FilterView>('all');

  const filterButtons: { id: FilterView; label: string; tag: string }[] = [
    { id: 'all', label: 'All Annotations', tag: 'Complete Overview' },
    { id: 'root-edges', label: 'Root & Edges', tag: 'Top & Links' },
    { id: 'parent-child', label: 'Parent & Child', tag: 'Branching' },
    { id: 'leaf-internal', label: 'Leaf vs Internal', tag: 'Node Roles' },
    { id: 'levels-depth', label: 'Levels & Depth', tag: 'Distance Scales' },
    { id: 'subtree-siblings', label: 'Subtree & Siblings', tag: 'Groupings' },
    { id: 'ancestor-descendant', label: 'Ancestor & Descendant', tag: 'Lineage' },
    { id: 'height-degree', label: 'Height & Degree', tag: 'Tree Metrics' }
  ];

  const isAll = activeFilter === 'all';
  const showRootEdges = isAll || activeFilter === 'root-edges';
  const showParentChild = isAll || activeFilter === 'parent-child';
  const showLeafInternal = isAll || activeFilter === 'leaf-internal';
  const showLevelsDepth = isAll || activeFilter === 'levels-depth';
  const showSubtreeSiblings = isAll || activeFilter === 'subtree-siblings';
  const showAncestorDescendant = isAll || activeFilter === 'ancestor-descendant';
  const showHeightDegree = isAll || activeFilter === 'height-degree';

  return (
    <div
      id="terminology-architecture-diagram-container"
      className={`p-5 sm:p-7 rounded-3xl border transition-all ${
        isDarkMode
          ? 'bg-[#0a0f1d] border-violet-900/50 text-slate-100 shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-violet-950/60">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isDarkMode
                ? 'bg-violet-950/80 border border-violet-800/60 text-violet-300'
                : 'bg-violet-50 border border-violet-200 text-violet-700'
            }`}
          >
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-violet-300' : 'text-violet-900 font-extrabold'}`}>
              Complete Tree Architecture Blueprint
            </h3>
            <p className="text-xs opacity-75">
              Interactive visual layout of all 15 terminology concepts
            </p>
          </div>
        </div>

        <span
          className={`text-[11px] font-mono font-semibold px-3 py-1 rounded-full border self-start sm:self-auto ${
            isDarkMode
              ? 'bg-violet-950/50 text-violet-300 border-violet-800/40'
              : 'bg-violet-50 text-violet-800 border-violet-200 font-bold'
          }`}
        >
          Visual Diagram
        </span>
      </div>

      {/* Filter Chips Bar */}
      <div className="mb-5">
        <div className={`text-[11px] font-mono uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5 ${
          isDarkMode ? 'text-violet-400' : 'text-violet-700'
        }`}>
          <Compass className="w-3.5 h-3.5" />
          <span>Filter Visual Focus:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                id={`filter-btn-${btn.id}`}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 text-white border-violet-500 shadow-sm shadow-violet-600/30'
                    : isDarkMode
                    ? 'bg-[#0e1424] text-slate-300 border-violet-900/40 hover:bg-[#151c2e] hover:text-white'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main SVG Architecture Diagram Canvas */}
      <div
        className={`p-4 sm:p-6 rounded-2xl border flex flex-col items-center justify-center overflow-x-auto relative ${
          isDarkMode ? 'bg-[#060913] border-violet-950/90' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <svg
          viewBox="0 0 760 460"
          className="w-full max-w-3xl h-auto"
          style={{ minWidth: '580px' }}
        >
          <defs>
            <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient id="internalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <filter id="glowViolet" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.6" />
            </filter>
            <filter id="glowEmerald" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10b981" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* ============================================================= */}
          {/* BACKGROUND LEVEL BANDS (Levels 0, 1, 2)                      */}
          {/* ============================================================= */}
          {showLevelsDepth && (
            <g opacity={isDarkMode ? 0.35 : 0.45}>
              {/* Level 0 Band */}
              <rect x="20" y="20" width="720" height="90" rx="12" fill={isDarkMode ? '#1e1b4b' : '#ede9fe'} stroke={isDarkMode ? '#4338ca' : '#c7d2fe'} strokeDasharray="4,4" />
              {/* Level 1 Band */}
              <rect x="20" y="140" width="720" height="110" rx="12" fill={isDarkMode ? '#172554' : '#e0f2fe'} stroke={isDarkMode ? '#1d4ed8' : '#bae6fd'} strokeDasharray="4,4" />
              {/* Level 2 Band */}
              <rect x="20" y="280" width="720" height="130" rx="12" fill={isDarkMode ? '#064e3b' : '#ecfdf5'} stroke={isDarkMode ? '#047857' : '#a7f3d0'} strokeDasharray="4,4" />
            </g>
          )}

          {/* ============================================================= */}
          {/* LEVEL & DEPTH LABELS (Left & Right margins)                  */}
          {/* ============================================================= */}
          {showLevelsDepth && (
            <g>
              {/* Left: Levels */}
              <rect x="35" y="50" width="85" height="28" rx="8" fill={isDarkMode ? '#312e81' : '#c7d2fe'} />
              <text x="77" y="68" fill={isDarkMode ? '#c7d2fe' : '#312e81'} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Level 0</text>

              <rect x="35" y="180" width="85" height="28" rx="8" fill={isDarkMode ? '#1e3a8a' : '#bfdbfe'} />
              <text x="77" y="198" fill={isDarkMode ? '#bfdbfe' : '#1e3a8a'} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Level 1</text>

              <rect x="35" y="330" width="85" height="28" rx="8" fill={isDarkMode ? '#065f46' : '#a7f3d0'} />
              <text x="77" y="348" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Level 2</text>

              {/* Right: Depths */}
              <rect x="640" y="50" width="85" height="28" rx="8" fill={isDarkMode ? '#312e81' : '#c7d2fe'} />
              <text x="682" y="68" fill={isDarkMode ? '#c7d2fe' : '#312e81'} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Depth 0</text>

              <rect x="640" y="180" width="85" height="28" rx="8" fill={isDarkMode ? '#1e3a8a' : '#bfdbfe'} />
              <text x="682" y="198" fill={isDarkMode ? '#bfdbfe' : '#1e3a8a'} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Depth 1</text>

              <rect x="640" y="330" width="85" height="28" rx="8" fill={isDarkMode ? '#065f46' : '#a7f3d0'} />
              <text x="682" y="348" fill={isDarkMode ? '#a7f3d0' : '#065f46'} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Depth 2</text>
            </g>
          )}

          {/* ============================================================= */}
          {/* SUBTREE BOUNDARY BOX (Around Node 20, 40, 50)               */}
          {/* ============================================================= */}
          {showSubtreeSiblings && (
            <g>
              <rect
                x="145"
                y="145"
                width="240"
                height="245"
                rx="16"
                fill={isDarkMode ? 'rgba(139, 92, 246, 0.08)' : 'rgba(99, 102, 241, 0.08)'}
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeDasharray="6,4"
              />
              <rect x="155" y="152" width="130" height="22" rx="6" fill={isDarkMode ? '#3b0764' : '#f3e8ff'} stroke="#a855f7" strokeWidth="1" />
              <text x="220" y="167" fill={isDarkMode ? '#e9d5ff' : '#6b21a8'} fontSize="10.5" fontWeight="bold" textAnchor="middle">
                Subtree (Root: 20)
              </text>
            </g>
          )}

          {/* ============================================================= */}
          {/* EDGES & HEIGHT PATH                                          */}
          {/* ============================================================= */}
          {/* Edge: 10 -> 20 */}
          <line
            x1="380"
            y1="75"
            x2="245"
            y2="190"
            stroke={showHeightDegree || showRootEdges ? '#8b5cf6' : isDarkMode ? '#475569' : '#94a3b8'}
            strokeWidth={showHeightDegree ? 4.5 : 3}
          />
          {/* Edge: 10 -> 30 */}
          <line
            x1="380"
            y1="75"
            x2="515"
            y2="190"
            stroke={showRootEdges ? '#8b5cf6' : isDarkMode ? '#475569' : '#94a3b8'}
            strokeWidth={3}
          />
          {/* Edge: 20 -> 40 (Part of Longest Path) */}
          <line
            x1="245"
            y1="210"
            x2="190"
            y2="330"
            stroke={showHeightDegree ? '#8b5cf6' : isDarkMode ? '#475569' : '#94a3b8'}
            strokeWidth={showHeightDegree ? 4.5 : 3}
          />
          {/* Edge: 20 -> 50 */}
          <line
            x1="245"
            y1="210"
            x2="300"
            y2="330"
            stroke={isDarkMode ? '#475569' : '#94a3b8'}
            strokeWidth={3}
          />

          {/* EDGE Callout Badge */}
          {showRootEdges && (
            <g>
              <rect x="290" y="115" width="55" height="22" rx="6" fill={isDarkMode ? '#1e1b4b' : '#e0e7ff'} stroke="#8b5cf6" strokeWidth="1" />
              <text x="317" y="130" fill={isDarkMode ? '#c7d2fe' : '#3730a3'} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                EDGE
              </text>
            </g>
          )}

          {/* ============================================================= */}
          {/* SIBLINGS CONNECTORS                                          */}
          {/* ============================================================= */}
          {showSubtreeSiblings && (
            <g>
              {/* Siblings 20 & 30 */}
              <path d="M 270 200 Q 380 230 490 200" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="4,4" />
              <rect x="340" y="218" width="80" height="20" rx="6" fill={isDarkMode ? '#500724' : '#fce7f3'} stroke="#ec4899" strokeWidth="1" />
              <text x="380" y="232" fill={isDarkMode ? '#fbcfe8' : '#be185d'} fontSize="10" fontWeight="bold" textAnchor="middle">
                Siblings
              </text>

              {/* Siblings 40 & 50 */}
              <path d="M 210 345 Q 245 365 280 345" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="4,4" />
              <rect x="215" y="360" width="60" height="18" rx="5" fill={isDarkMode ? '#500724' : '#fce7f3'} stroke="#ec4899" strokeWidth="1" />
              <text x="245" y="373" fill={isDarkMode ? '#fbcfe8' : '#be185d'} fontSize="9.5" fontWeight="bold" textAnchor="middle">
                Siblings
              </text>
            </g>
          )}

          {/* ============================================================= */}
          {/* ANCESTOR / DESCENDANT LINEAGE ARROWS                         */}
          {/* ============================================================= */}
          {showAncestorDescendant && (
            <g>
              {/* Ancestor Callout on 10 */}
              <rect x="430" y="45" width="130" height="24" rx="6" fill={isDarkMode ? '#1e1b4b' : '#ede9fe'} stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="495" y="61" fill={isDarkMode ? '#ddd6fe' : '#5b21b6'} fontSize="10.5" fontWeight="bold" textAnchor="middle">
                Ancestor of 20, 30, 40, 50
              </text>

              {/* Descendant Callout on 40 */}
              <rect x="130" y="390" width="130" height="24" rx="6" fill={isDarkMode ? '#064e3b' : '#ecfdf5'} stroke="#10b981" strokeWidth="1.5" />
              <text x="195" y="406" fill={isDarkMode ? '#a7f3d0' : '#047857'} fontSize="10.5" fontWeight="bold" textAnchor="middle">
                Descendant of 10 & 20
              </text>
            </g>
          )}

          {/* ============================================================= */}
          {/* HEIGHT & DEGREE LABELS                                       */}
          {/* ============================================================= */}
          {showHeightDegree && (
            <g>
              {/* Height Indicator along longest branch */}
              <rect x="130" y="240" width="105" height="26" rx="8" fill={isDarkMode ? '#3b0764' : '#fae8ff'} stroke="#c084fc" strokeWidth="1.5" />
              <text x="182" y="257" fill={isDarkMode ? '#f5d0fe' : '#86198f'} fontSize="10.5" fontWeight="bold" textAnchor="middle">
                Height = 2 Edges
              </text>
            </g>
          )}

          {/* ============================================================= */}
          {/* TREE NODES                                                   */}
          {/* ============================================================= */}

          {/* Node 10 (Root / Internal) */}
          <g filter={showRootEdges ? 'url(#glowViolet)' : undefined}>
            <circle cx="380" cy="65" r="28" fill="url(#rootGrad)" stroke="#ffffff" strokeWidth="2.5" />
            <text x="380" y="72" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">
              10
            </text>

            {/* Badges on Root */}
            {showRootEdges && (
              <g>
                <rect x="330" y="18" width="100" height="22" rx="6" fill="#7c3aed" />
                <text x="380" y="33" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  ROOT NODE
                </text>
              </g>
            )}

            {showParentChild && (
              <g>
                <rect x="420" y="70" width="95" height="20" rx="5" fill={isDarkMode ? '#1e293b' : '#e2e8f0'} stroke="#64748b" strokeWidth="1" />
                <text x="467" y="84" fill={isDarkMode ? '#cbd5e1' : '#334155'} fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  Parent of 20, 30
                </text>
              </g>
            )}

            {showHeightDegree && (
              <g>
                <rect x="335" y="98" width="90" height="20" rx="5" fill={isDarkMode ? '#1e1b4b' : '#ede9fe'} stroke="#818cf8" strokeWidth="1" />
                <text x="380" y="112" fill={isDarkMode ? '#c7d2fe' : '#3730a3'} fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  Degree: 2
                </text>
              </g>
            )}
          </g>

          {/* Node 20 (Internal / Parent of 40, 50 / Child of 10) */}
          <g>
            <circle cx="245" cy="200" r="26" fill="url(#internalGrad)" stroke="#ffffff" strokeWidth="2" />
            <text x="245" y="206" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              20
            </text>

            {showLeafInternal && (
              <g>
                <rect x="150" y="188" width="85" height="22" rx="6" fill={isDarkMode ? '#1e3a8a' : '#dbeafe'} stroke="#3b82f6" strokeWidth="1" />
                <text x="192" y="203" fill={isDarkMode ? '#bfdbfe' : '#1e40af'} fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  Internal Node
                </text>
              </g>
            )}

            {showParentChild && (
              <g>
                <rect x="150" y="215" width="85" height="20" rx="5" fill={isDarkMode ? '#1e293b' : '#e2e8f0'} stroke="#64748b" strokeWidth="1" />
                <text x="192" y="229" fill={isDarkMode ? '#cbd5e1' : '#334155'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  Parent of 40, 50
                </text>
              </g>
            )}

            {showHeightDegree && (
              <g>
                <rect x="255" y="165" width="70" height="18" rx="5" fill={isDarkMode ? '#1e1b4b' : '#ede9fe'} stroke="#818cf8" strokeWidth="1" />
                <text x="290" y="178" fill={isDarkMode ? '#c7d2fe' : '#3730a3'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  Degree: 2
                </text>
              </g>
            )}
          </g>

          {/* Node 30 (Leaf / Child of 10) */}
          <g filter={showLeafInternal ? 'url(#glowEmerald)' : undefined}>
            <circle cx="515" cy="200" r="26" fill="url(#leafGrad)" stroke="#ffffff" strokeWidth="2" />
            <text x="515" y="206" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              30
            </text>

            {showLeafInternal && (
              <g>
                <rect x="550" y="188" width="105" height="24" rx="6" fill="#047857" />
                <text x="602" y="204" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Leaf (0 Children)
                </text>
              </g>
            )}

            {showParentChild && (
              <g>
                <rect x="550" y="215" width="80" height="20" rx="5" fill={isDarkMode ? '#1e293b' : '#e2e8f0'} stroke="#64748b" strokeWidth="1" />
                <text x="590" y="229" fill={isDarkMode ? '#cbd5e1' : '#334155'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  Child of 10
                </text>
              </g>
            )}

            {showHeightDegree && (
              <g>
                <rect x="475" y="165" width="70" height="18" rx="5" fill={isDarkMode ? '#064e3b' : '#ecfdf5'} stroke="#10b981" strokeWidth="1" />
                <text x="510" y="178" fill={isDarkMode ? '#a7f3d0' : '#047857'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  Degree: 0
                </text>
              </g>
            )}
          </g>

          {/* Node 40 (Leaf / Child of 20) */}
          <g filter={showLeafInternal ? 'url(#glowEmerald)' : undefined}>
            <circle cx="190" cy="340" r="24" fill="url(#leafGrad)" stroke="#ffffff" strokeWidth="2" />
            <text x="190" y="346" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
              40
            </text>

            {showLeafInternal && (
              <g>
                <rect x="110" y="330" width="65" height="22" rx="6" fill="#047857" />
                <text x="142" y="345" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  Leaf Node
                </text>
              </g>
            )}

            {showHeightDegree && (
              <g>
                <rect x="155" y="305" width="70" height="18" rx="5" fill={isDarkMode ? '#064e3b' : '#ecfdf5'} stroke="#10b981" strokeWidth="1" />
                <text x="190" y="318" fill={isDarkMode ? '#a7f3d0' : '#047857'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  Degree: 0
                </text>
              </g>
            )}
          </g>

          {/* Node 50 (Leaf / Child of 20) */}
          <g filter={showLeafInternal ? 'url(#glowEmerald)' : undefined}>
            <circle cx="300" cy="340" r="24" fill="url(#leafGrad)" stroke="#ffffff" strokeWidth="2" />
            <text x="300" y="346" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
              50
            </text>

            {showLeafInternal && (
              <g>
                <rect x="335" y="330" width="65" height="22" rx="6" fill="#047857" />
                <text x="367" y="345" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  Leaf Node
                </text>
              </g>
            )}

            {showHeightDegree && (
              <g>
                <rect x="265" y="305" width="70" height="18" rx="5" fill={isDarkMode ? '#064e3b' : '#ecfdf5'} stroke="#10b981" strokeWidth="1" />
                <text x="300" y="318" fill={isDarkMode ? '#a7f3d0' : '#047857'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  Degree: 0
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Visual Legend Key */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
        <div
          className={`p-3 rounded-2xl border text-center ${
            isDarkMode ? 'bg-[#060913] border-violet-950/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-3 h-3 rounded-full bg-violet-600" />
            <span className={`text-xs font-bold ${isDarkMode ? 'text-violet-400' : 'text-violet-800'}`}>Root (10)</span>
          </div>
          <div className="text-[11px] opacity-75">Topmost node, Level 0</div>
        </div>

        <div
          className={`p-3 rounded-2xl border text-center ${
            isDarkMode ? 'bg-[#060913] border-violet-950/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span className={`text-xs font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>Internal (10, 20)</span>
          </div>
          <div className="text-[11px] opacity-75">Has 1+ children</div>
        </div>

        <div
          className={`p-3 rounded-2xl border text-center ${
            isDarkMode ? 'bg-[#060913] border-violet-950/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>Leaves (30, 40, 50)</span>
          </div>
          <div className="text-[11px] opacity-75">0 children, Degree 0</div>
        </div>

        <div
          className={`p-3 rounded-2xl border text-center ${
            isDarkMode ? 'bg-[#060913] border-violet-950/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-3 h-3 rounded-full bg-pink-500" />
            <span className={`text-xs font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-800'}`}>Subtree / Siblings</span>
          </div>
          <div className="text-[11px] opacity-75">Subtree rooted at 20</div>
        </div>
      </div>
    </div>
  );
};
