import React, { useState } from 'react';
import { TreeSvg, VisualNode, VisualEdge } from './TreeSvg';
import { Layers, Database, Calculator } from 'lucide-react';

interface BinaryTreeVisualizerProps {
  isDarkMode: boolean;
}

export const BinaryTreeVisualizer: React.FC<BinaryTreeVisualizerProps> = ({ isDarkMode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'pointers' | 'array'>('pointers');

  const nodes: VisualNode[] = [
    { id: 1, value: 'A (10)', x: 325, y: 55, isRoot: true, level: 0, subLabel: 'Index 0' },
    { id: 2, value: 'B (20)', x: 190, y: 145, level: 1, subLabel: 'Index 1 (2*0+1)' },
    { id: 3, value: 'C (30)', x: 460, y: 145, level: 1, subLabel: 'Index 2 (2*0+2)' },
    { id: 4, value: 'D (40)', x: 120, y: 235, isLeaf: true, level: 2, subLabel: 'Index 3 (2*1+1)' },
    { id: 5, value: 'E (50)', x: 260, y: 235, isLeaf: true, level: 2, subLabel: 'Index 4 (2*1+2)' },
    { id: 6, value: 'F (60)', x: 390, y: 235, isLeaf: true, level: 2, subLabel: 'Index 5 (2*2+1)' },
    { id: 7, value: 'G (70)', x: 530, y: 235, isLeaf: true, level: 2, subLabel: 'Index 6 (2*2+2)' }
  ];

  const edges: VisualEdge[] = [
    { fromId: 1, toId: 2, fromX: 325, fromY: 55, toX: 190, toY: 145, label: 'L' },
    { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 460, toY: 145, label: 'R' },
    { fromId: 2, toId: 4, fromX: 190, fromY: 145, toX: 120, toY: 235, label: 'L' },
    { fromId: 2, toId: 5, fromX: 190, fromY: 145, toX: 260, toY: 235, label: 'R' },
    { fromId: 3, toId: 6, fromX: 460, fromY: 145, toX: 390, toY: 235, label: 'L' },
    { fromId: 3, toId: 7, fromX: 460, fromY: 145, toX: 530, toY: 235, label: 'R' }
  ];

  const highlightedNodes = nodes.map((n) => ({
    ...n,
    highlight: n.id === selectedNodeId,
    highlightColor: n.id === selectedNodeId ? 'violet' : undefined
  }));

  const nodeDetails: Record<number, { name: string; val: number; left: string; right: string; arrayIdx: number; level: number }> = {
    1: { name: 'Node A', val: 10, left: 'Node B (20)', right: 'Node C (30)', arrayIdx: 0, level: 0 },
    2: { name: 'Node B', val: 20, left: 'Node D (40)', right: 'Node E (50)', arrayIdx: 1, level: 1 },
    3: { name: 'Node C', val: 30, left: 'Node F (60)', right: 'Node G (70)', arrayIdx: 2, level: 1 },
    4: { name: 'Node D', val: 40, left: 'null', right: 'null', arrayIdx: 3, level: 2 },
    5: { name: 'Node E', val: 50, left: 'null', right: 'null', arrayIdx: 4, level: 2 },
    6: { name: 'Node F', val: 60, left: 'null', right: 'null', arrayIdx: 5, level: 2 },
    7: { name: 'Node G', val: 70, left: 'null', right: 'null', arrayIdx: 6, level: 2 }
  };

  const selected = nodeDetails[selectedNodeId] || nodeDetails[1];

  const arrayItems = [
    { idx: 0, val: 'A (10)', id: 1 },
    { idx: 1, val: 'B (20)', id: 2 },
    { idx: 2, val: 'C (30)', id: 3 },
    { idx: 3, val: 'D (40)', id: 4 },
    { idx: 4, val: 'E (50)', id: 5 },
    { idx: 5, val: 'F (60)', id: 6 },
    { idx: 6, val: 'G (70)', id: 7 }
  ];

  return (
    <div className="space-y-6">
      {/* Visual Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider opacity-75">
          Select Visual Mode:
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('pointers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'pointers'
                ? 'bg-violet-600 text-white shadow-md'
                : isDarkMode
                ? 'bg-[#1e1533] text-purple-200 border border-purple-900/40'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Pointers & Tree View
          </button>
          <button
            onClick={() => setViewMode('array')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'array'
                ? 'bg-violet-600 text-white shadow-md'
                : isDarkMode
                ? 'bg-[#1e1533] text-purple-200 border border-purple-900/40'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            Array Representation (2i+1, 2i+2)
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode ? 'bg-[#150f24] border-purple-900/40' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-violet-400">
              Binary Tree Node Layout (Click any node)
            </span>
          </div>
          <span className="text-xs opacity-60">
            Edges labeled: L = Left Child, R = Right Child
          </span>
        </div>

        <TreeSvg
          nodes={highlightedNodes}
          edges={edges}
          isDarkMode={isDarkMode}
          onNodeClick={(n) => setSelectedNodeId(Number(n.id))}
          height={320}
        />
      </div>

      {/* Array Sequential Mapping Display */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode ? 'bg-[#171129] border-purple-900/50 text-purple-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-4 h-4 text-violet-400" />
          <h4 className="text-sm font-bold text-violet-400">
            Array Sequential Memory Representation
          </h4>
        </div>
        <p className="text-xs mb-3 opacity-80">
          In a 0-indexed array: For any parent at index <code>i</code>, Left Child is at index <code>2*i + 1</code>, Right Child is at index <code>2*i + 2</code>, Parent is at <code>floor((i-1)/2)</code>.
        </p>

        <div className="grid grid-cols-7 gap-2 text-center font-mono">
          {arrayItems.map((item) => {
            const isSelected = item.id === selectedNodeId;
            return (
              <button
                key={item.idx}
                onClick={() => setSelectedNodeId(item.id)}
                className={`p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-violet-600 border-violet-400 text-white font-bold ring-2 ring-violet-400'
                      : 'bg-violet-600 border-violet-500 text-white font-bold ring-2 ring-violet-500'
                    : isDarkMode
                    ? 'bg-[#1e1533] border-purple-900/40 text-purple-200 hover:bg-[#281c44]'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="text-[10px] opacity-70">Idx {item.idx}</div>
                <div className="text-sm font-bold mt-0.5">{item.val}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Node Pointer Inspector */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode ? 'bg-[#18112b] border-purple-900/40' : 'bg-slate-50 border-slate-200'
      }`}>
        <h5 className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
          Memory Pointers for Selected Node ({selected.name})
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className={`p-2.5 rounded-lg border ${
            isDarkMode ? 'bg-[#1e1533] border-purple-900/30' : 'bg-white border-slate-200'
          }`}>
            <span className="text-violet-400 font-semibold">Data Value: </span>
            <span className="font-bold">{selected.val}</span>
          </div>
          <div className={`p-2.5 rounded-lg border ${
            isDarkMode ? 'bg-[#1e1533] border-purple-900/30' : 'bg-white border-slate-200'
          }`}>
            <span className="text-violet-400 font-semibold">Left Pointer: </span>
            <span className="font-bold">{selected.left}</span>
          </div>
          <div className={`p-2.5 rounded-lg border ${
            isDarkMode ? 'bg-[#1e1533] border-purple-900/30' : 'bg-white border-slate-200'
          }`}>
            <span className="text-violet-400 font-semibold">Right Pointer: </span>
            <span className="font-bold">{selected.right}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
