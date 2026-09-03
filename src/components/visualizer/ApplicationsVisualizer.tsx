import React, { useState } from 'react';
import { TreeSvg, VisualNode, VisualEdge } from './TreeSvg';
import { FolderTree, Globe, GitBranch } from 'lucide-react';

interface ApplicationsVisualizerProps {
  isDarkMode: boolean;
}

export const ApplicationsVisualizer: React.FC<ApplicationsVisualizerProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'filesystem' | 'dom' | 'decision'>('filesystem');
  const [selectedNodeId, setSelectedNodeId] = useState<number>(1);

  const getVisualData = () => {
    if (activeTab === 'filesystem') {
      const nodes: VisualNode[] = [
        { id: 1, value: '/ (Root)', x: 325, y: 55, isRoot: true, subLabel: 'C: / Root Drive' },
        { id: 2, value: 'Documents', x: 190, y: 145, subLabel: 'Folder' },
        { id: 3, value: 'Photos', x: 460, y: 145, subLabel: 'Folder' },
        { id: 4, value: 'resume.pdf', x: 120, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'File (Leaf)' },
        { id: 5, value: 'notes.txt', x: 260, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'File (Leaf)' },
        { id: 6, value: 'beach.jpg', x: 390, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'File (Leaf)' },
        { id: 7, value: 'party.png', x: 530, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'File (Leaf)' }
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
        label: 'Application 1: Operating System Folder & File Directory Hierarchy',
        note: 'Folders are internal nodes that contain subfolders and files. Individual files are leaf nodes.'
      };
    }

    if (activeTab === 'dom') {
      const nodes: VisualNode[] = [
        { id: 1, value: '<html>', x: 325, y: 55, isRoot: true, subLabel: 'Document Root' },
        { id: 2, value: '<head>', x: 190, y: 145, subLabel: 'Metadata' },
        { id: 3, value: '<body>', x: 460, y: 145, subLabel: 'Page Body' },
        { id: 4, value: '<title>', x: 120, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'Leaf Element' },
        { id: 5, value: '<meta>', x: 260, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'Leaf Element' },
        { id: 6, value: '<header>', x: 390, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'Leaf Element' },
        { id: 7, value: '<main>', x: 530, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'Leaf Element' }
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
        label: 'Application 2: Web Browser HTML Document Object Model (DOM)',
        note: 'Web browsers parse web pages into a tree of HTML tags with parent, child, and sibling elements.'
      };
    }

    // Decision Tree
    const nodes: VisualNode[] = [
      { id: 1, value: 'Sunny?', x: 325, y: 55, isRoot: true, subLabel: 'Root Decision' },
      { id: 2, value: 'Windy?', x: 190, y: 145, subLabel: 'Yes Branch' },
      { id: 3, value: 'Rainy?', x: 460, y: 145, subLabel: 'No Branch' },
      { id: 4, value: 'Play Golf', x: 120, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'Outcome' },
      { id: 5, value: 'Fly Kite', x: 260, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'Outcome' },
      { id: 6, value: 'Watch Movie', x: 390, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'Outcome' },
      { id: 7, value: 'Read Book', x: 530, y: 235, isLeaf: true, highlightColor: 'emerald', subLabel: 'Outcome' }
    ];
    const edges: VisualEdge[] = [
      { fromId: 1, toId: 2, fromX: 325, fromY: 55, toX: 190, toY: 145, label: 'Yes' },
      { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 460, toY: 145, label: 'No' },
      { fromId: 2, toId: 4, fromX: 190, fromY: 145, toX: 120, toY: 235, label: 'Calm' },
      { fromId: 2, toId: 5, fromX: 190, fromY: 145, toX: 260, toY: 235, label: 'Breeze' },
      { fromId: 3, toId: 6, fromX: 460, fromY: 145, toX: 390, toY: 235, label: 'Heavy' },
      { fromId: 3, toId: 7, fromX: 460, fromY: 145, toX: 530, toY: 235, label: 'Light' }
    ];
    return {
      nodes,
      edges,
      label: 'Application 3: AI & Machine Learning Decision Tree',
      note: 'Decision trees evaluate conditions at each branch to reach an outcome or prediction.'
    };
  };

  const { nodes, edges, label, note } = getVisualData();

  const highlightedNodes = nodes.map((n) => ({
    ...n,
    highlight: n.id === selectedNodeId,
    highlightColor: n.id === selectedNodeId ? 'violet' : n.highlightColor
  }));

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveTab('filesystem');
            setSelectedNodeId(1);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'filesystem'
              ? 'bg-violet-600 text-white shadow-md'
              : isDarkMode
              ? 'bg-[#1e1533] text-purple-200 border border-purple-900/40'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          File System Hierarchy
        </button>
        <button
          onClick={() => {
            setActiveTab('dom');
            setSelectedNodeId(1);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'dom'
              ? 'bg-violet-600 text-white shadow-md'
              : isDarkMode
              ? 'bg-[#1e1533] text-purple-200 border border-purple-900/40'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          HTML / DOM Tree
        </button>
        <button
          onClick={() => {
            setActiveTab('decision');
            setSelectedNodeId(1);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'decision'
              ? 'bg-violet-600 text-white shadow-md'
              : isDarkMode
              ? 'bg-[#1e1533] text-purple-200 border border-purple-900/40'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          Decision Tree
        </button>
      </div>

      {/* SVG Canvas */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode ? 'bg-[#150f24] border-purple-900/40' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-violet-400">{label}</span>
          <span className="text-xs opacity-60">Interactive Application Demo</span>
        </div>

        <TreeSvg
          nodes={highlightedNodes}
          edges={edges}
          isDarkMode={isDarkMode}
          onNodeClick={(n) => setSelectedNodeId(Number(n.id))}
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
