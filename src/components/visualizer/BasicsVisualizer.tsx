import React, { useState } from 'react';
import { TreeSvg, VisualNode, VisualEdge } from './TreeSvg';
import { FolderTree, Network, GitBranch } from 'lucide-react';

interface BasicsVisualizerProps {
  isDarkMode: boolean;
}

export const BasicsVisualizer: React.FC<BasicsVisualizerProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'filesystem' | 'properties'>('hierarchy');

  const getVisualData = () => {
    if (activeTab === 'filesystem') {
      const nodes: VisualNode[] = [
        { id: 1, value: '/ (Root)', x: 325, y: 55, isRoot: true, subLabel: 'Hard Drive Root' },
        { id: 2, value: 'Documents', x: 190, y: 145, subLabel: 'Folder' },
        { id: 3, value: 'Pictures', x: 460, y: 145, subLabel: 'Folder' },
        { id: 4, value: 'resume.pdf', x: 120, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true, subLabel: 'File (Leaf)' },
        { id: 5, value: 'notes.txt', x: 260, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true, subLabel: 'File (Leaf)' },
        { id: 6, value: 'photo.png', x: 390, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true, subLabel: 'File (Leaf)' },
        { id: 7, value: 'vacation.jpg', x: 530, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true, subLabel: 'File (Leaf)' }
      ];
      const edges: VisualEdge[] = [
        { fromId: 1, toId: 2, fromX: 325, fromY: 55, toX: 190, toY: 145 },
        { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 460, toY: 145 },
        { fromId: 2, toId: 4, fromX: 190, fromY: 145, toX: 120, toY: 235 },
        { fromId: 2, toId: 5, fromX: 190, fromY: 145, toX: 260, toY: 235 },
        { fromId: 3, toId: 6, fromX: 460, fromY: 145, toX: 390, toY: 235 },
        { fromId: 3, toId: 7, fromX: 460, fromY: 145, toX: 530, toY: 235 }
      ];
      return {
        nodes,
        edges,
        label: 'Real-World Tree Example: Operating System Folder & File Directory Hierarchy',
        note: 'Folders are Internal Nodes branching downward. Files are Leaf Nodes with no further children.'
      };
    }

    if (activeTab === 'properties') {
      const nodes: VisualNode[] = [
        { id: 1, value: '1', x: 325, y: 55, isRoot: true, subLabel: 'Root (Depth 0)' },
        { id: 2, value: '2', x: 200, y: 145, subLabel: 'Edge 1' },
        { id: 3, value: '3', x: 450, y: 145, subLabel: 'Edge 2' },
        { id: 4, value: '4', x: 130, y: 235, isLeaf: true, subLabel: 'Edge 3' },
        { id: 5, value: '5', x: 270, y: 235, isLeaf: true, subLabel: 'Edge 4' },
        { id: 6, value: '6', x: 450, y: 235, isLeaf: true, subLabel: 'Edge 5' }
      ];
      const edges: VisualEdge[] = [
        { fromId: 1, toId: 2, fromX: 325, fromY: 55, toX: 200, toY: 145, highlight: true },
        { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 450, toY: 145, highlight: true },
        { fromId: 2, toId: 4, fromX: 200, fromY: 145, toX: 130, toY: 235, highlight: true },
        { fromId: 2, toId: 5, fromX: 200, fromY: 145, toX: 270, toY: 235, highlight: true },
        { fromId: 3, toId: 6, fromX: 450, fromY: 145, toX: 450, toY: 235, highlight: true }
      ];
      return {
        nodes,
        edges,
        label: 'Mathematical Property: N Nodes = 6, Edges = 5 (N - 1 Edges Rule)',
        note: 'Notice every single valid tree of N nodes always has exactly N - 1 edges and NO closed cycles.'
      };
    }

    // Default: General hierarchy
    const nodes: VisualNode[] = [
      { id: 1, value: 'Root', x: 325, y: 55, isRoot: true, highlight: true, subLabel: 'Topmost' },
      { id: 2, value: 'Node A', x: 190, y: 145, subLabel: 'Level 1' },
      { id: 3, value: 'Node B', x: 460, y: 145, subLabel: 'Level 1' },
      { id: 4, value: 'Leaf 1', x: 120, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true, subLabel: 'Level 2' },
      { id: 5, value: 'Leaf 2', x: 260, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true, subLabel: 'Level 2' },
      { id: 6, value: 'Leaf 3', x: 390, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true, subLabel: 'Level 2' },
      { id: 7, value: 'Leaf 4', x: 530, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true, subLabel: 'Level 2' }
    ];
    const edges: VisualEdge[] = [
      { fromId: 1, toId: 2, fromX: 325, fromY: 55, toX: 190, toY: 145 },
      { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 460, toY: 145 },
      { fromId: 2, toId: 4, fromX: 190, fromY: 145, toX: 120, toY: 235 },
      { fromId: 2, toId: 5, fromX: 190, fromY: 145, toX: 260, toY: 235 },
      { fromId: 3, toId: 6, fromX: 460, fromY: 145, toX: 390, toY: 235 },
      { fromId: 3, toId: 7, fromX: 460, fromY: 145, toX: 530, toY: 235 }
    ];
    return {
      nodes,
      edges,
      label: 'Hierarchical Structure: Top-down branching from Single Root',
      note: 'Nodes represent data entities, and edges represent parent-to-child relationships.'
    };
  };

  const { nodes, edges, label, note } = getVisualData();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('hierarchy')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'hierarchy'
              ? 'bg-violet-600 text-white shadow-md'
              : isDarkMode
              ? 'bg-[#1e1533] text-purple-200 border border-purple-900/40'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          Tree Hierarchy Concept
        </button>
        <button
          onClick={() => setActiveTab('filesystem')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'filesystem'
              ? 'bg-violet-600 text-white shadow-md'
              : isDarkMode
              ? 'bg-[#1e1533] text-purple-200 border border-purple-900/40'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          File System Analogy
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'properties'
              ? 'bg-violet-600 text-white shadow-md'
              : isDarkMode
              ? 'bg-[#1e1533] text-purple-200 border border-purple-900/40'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          N Nodes = N - 1 Edges Rule
        </button>
      </div>

      <div className={`p-4 rounded-xl border ${
        isDarkMode ? 'bg-[#150f24] border-purple-900/40' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-violet-400">{label}</span>
          <span className="text-xs opacity-60">Visual Representation</span>
        </div>

        <TreeSvg
          nodes={nodes}
          edges={edges}
          isDarkMode={isDarkMode}
          height={320}
        />

        <div className={`mt-2 p-2.5 rounded-lg text-xs text-center font-medium ${
          isDarkMode ? 'bg-[#1c1330] text-purple-200' : 'bg-violet-50 text-violet-900'
        }`}>
          {note}
        </div>
      </div>
    </div>
  );
};
