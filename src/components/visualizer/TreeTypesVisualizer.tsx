import React, { useState } from 'react';
import { TREE_MAIN_TYPES_LIST } from '../../data/treeData';
import { TreeTypeItem } from '../../types';
import { TreeSvg, VisualNode, VisualEdge } from './TreeSvg';
import { CheckCircle2, ShieldCheck, GitBranch } from 'lucide-react';

interface TreeTypesVisualizerProps {
  isDarkMode: boolean;
}

export const TreeTypesVisualizer: React.FC<TreeTypesVisualizerProps> = ({ isDarkMode }) => {
  const [selectedTypeId, setSelectedTypeId] = useState<string>('general');

  const selectedType: TreeTypeItem =
    TREE_MAIN_TYPES_LIST.find((t) => t.id === selectedTypeId) || TREE_MAIN_TYPES_LIST[0];

  // Generate nodes and edges for the 3 main tree types
  const getTreeData = () => {
    switch (selectedTypeId) {
      case 'general': {
        const nodes: VisualNode[] = [
          { id: '10', value: 10, x: 325, y: 45, isRoot: true, subLabel: 'Root (3 Ch)', highlight: true },
          { id: '20', value: 20, x: 160, y: 135, subLabel: '3 Children', highlight: true },
          { id: '30', value: 30, x: 325, y: 135, subLabel: '0 Ch (Leaf)', isLeaf: true, highlightColor: 'emerald', highlight: true },
          { id: '40', value: 40, x: 490, y: 135, subLabel: '0 Ch (Leaf)', isLeaf: true, highlightColor: 'emerald', highlight: true },
          { id: '50', value: 50, x: 90, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true },
          { id: '60', value: 60, x: 160, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true },
          { id: '70', value: 70, x: 230, y: 235, isLeaf: true, highlightColor: 'emerald', highlight: true }
        ];
        const edges: VisualEdge[] = [
          { fromId: '10', toId: '20', fromX: 325, fromY: 45, toX: 160, toY: 135 },
          { fromId: '10', toId: '30', fromX: 325, fromY: 45, toX: 325, toY: 135 },
          { fromId: '10', toId: '40', fromX: 325, fromY: 45, toX: 490, toY: 135 },
          { fromId: '20', toId: '50', fromX: 160, fromY: 135, toX: 90, toY: 235 },
          { fromId: '20', toId: '60', fromX: 160, fromY: 135, toX: 160, toY: 235 },
          { fromId: '20', toId: '70', fromX: 160, fromY: 135, toX: 230, toY: 235 }
        ];
        return {
          nodes,
          edges,
          description: 'General Tree: Nodes can have any number of children (0, 1, 2, 3, or more). Root 10 has 3 children; Node 20 also has 3 children.'
        };
      }

      case 'binary': {
        const nodes: VisualNode[] = [
          { id: '10', value: 10, x: 325, y: 50, isRoot: true, subLabel: 'Max 2 Ch (L, R)', highlight: true },
          { id: '20', value: 20, x: 190, y: 140, subLabel: 'Left Child', highlight: true },
          { id: '30', value: 30, x: 460, y: 140, subLabel: 'Right Child', highlight: true },
          { id: '40', value: 40, x: 120, y: 235, subLabel: '0 Ch (Leaf)', isLeaf: true, highlightColor: 'emerald', highlight: true },
          { id: '50', value: 50, x: 260, y: 235, subLabel: '0 Ch (Leaf)', isLeaf: true, highlightColor: 'emerald', highlight: true },
          { id: '60', value: 60, x: 390, y: 235, subLabel: '0 Ch (Leaf)', isLeaf: true, highlightColor: 'emerald', highlight: true }
        ];
        const edges: VisualEdge[] = [
          { fromId: '10', toId: '20', fromX: 325, fromY: 50, toX: 190, toY: 140, label: 'L' },
          { fromId: '10', toId: '30', fromX: 325, fromY: 50, toX: 460, toY: 140, label: 'R' },
          { fromId: '20', toId: '40', fromX: 190, fromY: 140, toX: 120, toY: 235, label: 'L' },
          { fromId: '20', toId: '50', fromX: 190, fromY: 140, toX: 260, toY: 235, label: 'R' },
          { fromId: '30', toId: '60', fromX: 460, fromY: 140, toX: 390, toY: 235, label: 'L' }
        ];
        return {
          nodes,
          edges,
          description: 'Binary Tree: Every node is strictly restricted to at most two children, labeled as Left Child and Right Child.'
        };
      }

      case 'bst': {
        const nodes: VisualNode[] = [
          { id: '50', value: 50, x: 325, y: 50, isRoot: true, subLabel: 'Root (50)', highlight: true },
          { id: '30', value: 30, x: 190, y: 140, subLabel: '< 50 (Left)', highlightColor: 'emerald', highlight: true },
          { id: '70', value: 70, x: 460, y: 140, subLabel: '> 50 (Right)', highlightColor: 'indigo', highlight: true },
          { id: '20', value: 20, x: 120, y: 235, isLeaf: true, subLabel: '< 30', highlightColor: 'emerald', highlight: true },
          { id: '40', value: 40, x: 260, y: 235, isLeaf: true, subLabel: '> 30', highlightColor: 'emerald', highlight: true },
          { id: '60', value: 60, x: 390, y: 235, isLeaf: true, subLabel: '< 70', highlightColor: 'indigo', highlight: true },
          { id: '80', value: 80, x: 530, y: 235, isLeaf: true, subLabel: '> 70', highlightColor: 'indigo', highlight: true }
        ];
        const edges: VisualEdge[] = [
          { fromId: '50', toId: '30', fromX: 325, fromY: 50, toX: 190, toY: 140 },
          { fromId: '50', toId: '70', fromX: 325, fromY: 50, toX: 460, toY: 140 },
          { fromId: '30', toId: '20', fromX: 190, fromY: 140, toX: 120, toY: 235 },
          { fromId: '30', toId: '40', fromX: 190, fromY: 140, toX: 260, toY: 235 },
          { fromId: '70', toId: '60', fromX: 460, fromY: 140, toX: 390, toY: 235 },
          { fromId: '70', toId: '80', fromX: 460, fromY: 140, toX: 530, toY: 235 }
        ];
        return {
          nodes,
          edges,
          description: 'Binary Search Tree (BST): An ordered binary tree where all values in the Left subtree (<50) are smaller and Right subtree (>50) are larger.'
        };
      }

      default:
        return { nodes: [], edges: [], description: '' };
    }
  };

  const { nodes, edges, description } = getTreeData();

  return (
    <div className="space-y-6">
      {/* Type Selector Tabs */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider mb-2.5 opacity-75">
          Select Main Tree Type:
        </div>
        <div className="flex flex-wrap gap-2">
          {TREE_MAIN_TYPES_LIST.map((type) => {
            const isSelected = type.id === selectedTypeId;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedTypeId(type.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40 ring-2 ring-violet-400'
                      : 'bg-violet-600 text-white shadow-md shadow-violet-200 ring-2 ring-violet-500'
                    : isDarkMode
                    ? 'bg-[#151c2e] text-slate-200 hover:bg-[#1e2840] border border-violet-900/40'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5 text-violet-400" />
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div
        className={`p-4 rounded-2xl border transition-colors ${
          isDarkMode ? 'bg-[#0a0f1c] border-violet-900/40' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-violet-400">
              Visual Structure: {selectedType.name}
            </span>
          </div>
          <span className="text-xs opacity-60">
            Interactive Topology
          </span>
        </div>

        <TreeSvg
          nodes={nodes}
          edges={edges}
          isDarkMode={isDarkMode}
          height={320}
        />

        <div
          className={`mt-2 p-3 rounded-xl text-xs text-center font-medium ${
            isDarkMode ? 'bg-[#151c2e] text-violet-200 border border-violet-900/40' : 'bg-violet-50 text-violet-900 border border-violet-200'
          }`}
        >
          {description}
        </div>
      </div>

      {/* Rule Verification Card */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border ${
          isDarkMode ? 'bg-[#0e1424] border-violet-900/50 text-slate-100' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        }`}
      >
        <h4 className="text-base font-bold text-violet-400 mb-2">
          {selectedType.name} Specifications
        </h4>
        <p className="text-xs sm:text-sm leading-relaxed mb-4 opacity-90">
          {selectedType.definition}
        </p>

        <div
          className={`p-3.5 rounded-xl mb-4 text-xs font-semibold ${
            isDarkMode
              ? 'bg-[#151c2e] text-violet-300 border border-violet-800/40'
              : 'bg-violet-50 text-violet-900 border border-violet-200'
          }`}
        >
          Core Rule: {selectedType.rule}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-violet-400">
            Key Properties:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {selectedType.properties.map((prop, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  isDarkMode
                    ? 'bg-[#151c2e] border border-violet-900/30 text-slate-200'
                    : 'bg-slate-50 border border-slate-200 text-slate-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                <span>{prop}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
