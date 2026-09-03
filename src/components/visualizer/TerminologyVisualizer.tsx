import React, { useState } from 'react';
import { TERMINOLOGY_LIST } from '../../data/treeData';
import { TerminologyItem } from '../../types';
import { TreeSvg, VisualNode, VisualEdge } from './TreeSvg';
import { Sparkles, BookOpen, Layers } from 'lucide-react';

interface TerminologyVisualizerProps {
  isDarkMode: boolean;
}

export const TerminologyVisualizer: React.FC<TerminologyVisualizerProps> = ({ isDarkMode }) => {
  const [selectedTermId, setSelectedTermId] = useState<string>('root');

  const selectedTerm: TerminologyItem = 
    TERMINOLOGY_LIST.find((t) => t.id === selectedTermId) || TERMINOLOGY_LIST[0];

  // Canonical reference tree requested:
  //            10
  //          /    \
  //        20      30
  //       /  \
  //     40    50
  const baseNodes: VisualNode[] = [
    { id: 10, value: 10, x: 325, y: 55, isRoot: true, isInternal: true, level: 0 },
    { id: 20, value: 20, x: 205, y: 150, isInternal: true, level: 1 },
    { id: 30, value: 30, x: 445, y: 150, isLeaf: true, level: 1 },
    { id: 40, value: 40, x: 135, y: 245, isLeaf: true, level: 2 },
    { id: 50, value: 50, x: 275, y: 245, isLeaf: true, level: 2 }
  ];

  const baseEdges: VisualEdge[] = [
    { fromId: 10, toId: 20, fromX: 325, fromY: 55, toX: 205, toY: 150 },
    { fromId: 10, toId: 30, fromX: 325, fromY: 55, toX: 445, toY: 150 },
    { fromId: 20, toId: 40, fromX: 205, fromY: 150, toX: 135, toY: 245 },
    { fromId: 20, toId: 50, fromX: 205, fromY: 150, toX: 275, toY: 245 }
  ];

  // Dynamic visual states based on selected terminology
  const nodes = baseNodes.map((node) => {
    const updated = { ...node };

    switch (selectedTerm.id) {
      case 'node':
        updated.highlight = true;
        updated.subLabel = 'Node';
        break;

      case 'root':
        if (node.id === 10) {
          updated.highlight = true;
          updated.highlightColor = 'violet';
          updated.subLabel = 'Root Node';
          updated.tag = 'Root';
        }
        break;

      case 'edge':
        // Nodes remain standard, edges are highlighted
        break;

      case 'parent':
        if (node.id === 10) {
          updated.highlight = true;
          updated.highlightColor = 'amber';
          updated.subLabel = 'Parent of 20, 30';
        }
        if (node.id === 20) {
          updated.highlight = true;
          updated.highlightColor = 'amber';
          updated.subLabel = 'Parent of 40, 50';
        }
        if ([30, 40, 50].includes(node.id as number)) {
          updated.subLabel = 'Child';
        }
        break;

      case 'child':
        if (node.id === 10) {
          updated.subLabel = 'Parent';
        }
        if ([20, 30].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'emerald';
          updated.subLabel = 'Child of 10';
        }
        if ([40, 50].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'emerald';
          updated.subLabel = 'Child of 20';
        }
        break;

      case 'leaf':
        if ([30, 40, 50].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'emerald';
          updated.subLabel = 'Leaf (0 ch)';
        }
        break;

      case 'internal':
        if ([10, 20].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'violet';
          updated.subLabel = 'Internal Node';
        }
        break;

      case 'degree':
        if (node.id === 10) updated.subLabel = 'Deg: 2 (2 ch)';
        if (node.id === 20) updated.subLabel = 'Deg: 2 (2 ch)';
        if (node.id === 30) updated.subLabel = 'Deg: 0 (0 ch)';
        if (node.id === 40) updated.subLabel = 'Deg: 0 (0 ch)';
        if (node.id === 50) updated.subLabel = 'Deg: 0 (0 ch)';
        updated.highlight = true;
        break;

      case 'level':
        if (node.id === 10) updated.subLabel = 'Level 0';
        if ([20, 30].includes(node.id as number)) updated.subLabel = 'Level 1';
        if ([40, 50].includes(node.id as number)) updated.subLabel = 'Level 2';
        updated.highlight = true;
        break;

      case 'height':
        if ([10, 20, 40].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'amber';
        }
        if (node.id === 10) updated.subLabel = 'Start (Root)';
        if (node.id === 40) updated.subLabel = 'Deepest Leaf';
        break;

      case 'depth':
        if (node.id === 10) updated.subLabel = 'Depth = 0';
        if ([20, 30].includes(node.id as number)) updated.subLabel = 'Depth = 1';
        if ([40, 50].includes(node.id as number)) updated.subLabel = 'Depth = 2';
        updated.highlight = true;
        break;

      case 'subtree':
        if ([20, 40, 50].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'violet';
          if (node.id === 20) updated.subLabel = 'Subtree Root';
          else updated.subLabel = 'Descendant';
        }
        break;

      case 'siblings':
        if ([20, 30].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'purple';
          updated.subLabel = 'Siblings (Parent 10)';
        }
        if ([40, 50].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'emerald';
          updated.subLabel = 'Siblings (Parent 20)';
        }
        break;

      case 'ancestor':
        if ([10, 20].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'amber';
          updated.subLabel = 'Ancestor of 40';
        }
        if (node.id === 40) {
          updated.highlight = true;
          updated.highlightColor = 'emerald';
          updated.subLabel = 'Target Node';
        }
        break;

      case 'descendant':
        if (node.id === 20) {
          updated.highlight = true;
          updated.highlightColor = 'amber';
          updated.subLabel = 'Source Node';
        }
        if ([40, 50].includes(node.id as number)) {
          updated.highlight = true;
          updated.highlightColor = 'emerald';
          updated.subLabel = 'Descendant of 20';
        }
        break;

      default:
        break;
    }
    return updated;
  });

  const edges = baseEdges.map((edge) => {
    const updated = { ...edge };
    if (selectedTerm.id === 'edge') {
      updated.highlight = true;
      updated.label = 'Edge';
    }
    if (selectedTerm.id === 'height' || selectedTerm.id === 'ancestor') {
      if ((edge.fromId === 10 && edge.toId === 20) || (edge.fromId === 20 && edge.toId === 40)) {
        updated.highlight = true;
        updated.highlightColor = 'amber';
      }
    }
    if (selectedTerm.id === 'parent' || selectedTerm.id === 'child') {
      updated.highlight = true;
    }
    if (selectedTerm.id === 'descendant') {
      if (edge.fromId === 20 && (edge.toId === 40 || edge.toId === 50)) {
        updated.highlight = true;
      }
    }
    return updated;
  });

  // Path nodes for path demonstration (Height and Ancestor)
  const pathNodeIds = (selectedTerm.id === 'height' || selectedTerm.id === 'ancestor') ? [10, 20, 40] : [];

  // Level lines for depth, height, level
  const levelLines = (selectedTerm.id === 'depth' || selectedTerm.id === 'height' || selectedTerm.id === 'level') ? [
    { y: 55, label: 'Level 0', depth: 0, height: 2 },
    { y: 150, label: 'Level 1', depth: 1, height: 1 },
    { y: 245, label: 'Level 2', depth: 2, height: 0 }
  ] : undefined;

  // Subtree box around 20, 40, 50
  const subtreeBox = selectedTerm.id === 'subtree' ? {
    x: 95,
    y: 110,
    width: 220,
    height: 175,
    label: 'Subtree rooted at 20'
  } : undefined;

  return (
    <div className="space-y-6">
      {/* Terminology Selector Pills (All 15 Terms) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>Select Term to Highlight on Reference Tree (15 Concepts):</span>
          </div>
          <span className="text-[11px] font-mono opacity-60">
            {TERMINOLOGY_LIST.findIndex((t) => t.id === selectedTermId) + 1} of {TERMINOLOGY_LIST.length}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {TERMINOLOGY_LIST.map((term, index) => {
            const isSelected = term.id === selectedTermId;
            return (
              <button
                key={term.id}
                id={`term-pill-${term.id}`}
                onClick={() => setSelectedTermId(term.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50 ring-2 ring-violet-400'
                      : 'bg-violet-600 text-white shadow-md shadow-violet-200 ring-2 ring-violet-500'
                    : isDarkMode
                    ? 'bg-[#151c2e] text-slate-300 hover:bg-[#1f2a42] border border-violet-950/70'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span className="text-[10px] opacity-70 font-mono">{index + 1}.</span>
                <span>{term.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Tree Display */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
        isDarkMode ? 'bg-[#090d18] border-violet-900/40' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-violet-400">
              Reference Tree Highlight: {selectedTerm.name}
            </span>
          </div>
          <span className="text-xs font-mono opacity-60">
            {selectedTerm.id === 'height' || selectedTerm.id === 'ancestor' 
              ? 'Longest Path: 10 → 20 → 40' 
              : 'Canonical Reference Tree'}
          </span>
        </div>

        <TreeSvg
          nodes={nodes}
          edges={edges}
          isDarkMode={isDarkMode}
          levelLines={levelLines}
          subtreeBox={subtreeBox}
          pathNodeIds={pathNodeIds}
        />

        {/* Dynamic Diagram Explanation Callout */}
        {selectedTerm.diagramExplanation && (
          <div className={`mt-3 p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
            isDarkMode
              ? 'bg-violet-950/40 border-violet-800/40 text-violet-200'
              : 'bg-indigo-50 border-indigo-200 text-indigo-900'
          }`}>
            <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
            <span className="font-medium">
              <strong className="font-semibold text-violet-300">Diagram Insight: </strong>
              {selectedTerm.diagramExplanation}
            </span>
          </div>
        )}
      </div>

      {/* Detailed Definition & Example Card */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${
        isDarkMode ? 'bg-[#0e1424] border-violet-900/50 text-slate-100' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      }`}>
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-violet-600 text-white shrink-0 mt-0.5 shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-violet-400">
                  {selectedTerm.name}
                </h4>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Term #{TERMINOLOGY_LIST.findIndex((t) => t.id === selectedTermId) + 1}
                </span>
              </div>
              <p className="text-sm mt-1.5 leading-relaxed font-medium">
                {selectedTerm.definition}
              </p>
            </div>

            <div className={`p-3.5 rounded-xl text-xs space-y-1.5 border ${
              isDarkMode ? 'bg-[#090d18] border-violet-950/70' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-bold text-violet-400 uppercase tracking-wider text-[11px]">Example:</div>
              <div className="leading-relaxed opacity-95 text-xs sm:text-sm font-medium">{selectedTerm.example}</div>
            </div>

            {selectedTerm.details && (
              <div className="pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider opacity-70 mb-1.5">Key Highlights:</div>
                <ul className="space-y-1 text-xs opacity-90 list-disc list-inside">
                  {selectedTerm.details.map((detail, i) => (
                    <li key={i} className="leading-relaxed">{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

