import React, { useState, useEffect, useRef } from 'react';
import { BST_OPERATIONS } from '../../data/treeData';
import { BSTOperationItem } from '../../types';
import { TreeSvg, VisualNode, VisualEdge } from './TreeSvg';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Clock, Target, CheckCircle2, ArrowRight } from 'lucide-react';

interface BSTVisualizerProps {
  isDarkMode: boolean;
}

interface BSTStep {
  stepNumber: number;
  activeNodeId: number | null;
  highlightNodes?: { id: number; color: string; label?: string; tag?: string }[];
  visitedNodeIds: number[];
  nodes: VisualNode[];
  edges: VisualEdge[];
  title: string;
  explanation: string;
  comparisonText?: string;
}

export const BSTVisualizer: React.FC<BSTVisualizerProps> = ({ isDarkMode }) => {
  const [selectedOpId, setSelectedOpId] = useState<string>('concept');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 1, 1.5, 2

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Standard base BST layout:
  //           50 (id: 1)
  //        /         \
  //     30 (id: 2)   70 (id: 3)
  //    /     \      /     \
  //  20 (4) 40 (5) 60 (6) 80 (7)
  const defaultNodes: VisualNode[] = [
    { id: 1, value: 50, x: 325, y: 55, isRoot: true, level: 0 },
    { id: 2, value: 30, x: 190, y: 145, level: 1 },
    { id: 3, value: 70, x: 460, y: 145, level: 1 },
    { id: 4, value: 20, x: 120, y: 235, isLeaf: true, level: 2 },
    { id: 5, value: 40, x: 260, y: 235, isLeaf: true, level: 2 },
    { id: 6, value: 60, x: 390, y: 235, isLeaf: true, level: 2 },
    { id: 7, value: 80, x: 530, y: 235, isLeaf: true, level: 2 }
  ];

  const defaultEdges: VisualEdge[] = [
    { fromId: 1, toId: 2, fromX: 325, fromY: 55, toX: 190, toY: 145 },
    { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 460, toY: 145 },
    { fromId: 2, toId: 4, fromX: 190, fromY: 145, toX: 120, toY: 235 },
    { fromId: 2, toId: 5, fromX: 190, fromY: 145, toX: 260, toY: 235 },
    { fromId: 3, toId: 6, fromX: 460, fromY: 145, toX: 390, toY: 235 },
    { fromId: 3, toId: 7, fromX: 460, fromY: 145, toX: 530, toY: 235 }
  ];

  // Helper to generate steps for each BST operation
  const getStepsForOperation = (opId: string): BSTStep[] => {
    switch (opId) {
      case 'concept':
        return [
          {
            stepNumber: 1,
            activeNodeId: 1,
            visitedNodeIds: [1],
            nodes: defaultNodes.map((n) => {
              if (n.id === 1) return { ...n, subLabel: 'Root 50', highlight: true };
              if ([2, 4, 5].includes(n.id as number)) return { ...n, subLabel: '< 50', highlight: true, highlightColor: 'violet' };
              if ([3, 6, 7].includes(n.id as number)) return { ...n, subLabel: '> 50', highlight: true, highlightColor: 'emerald' };
              return n;
            }),
            edges: defaultEdges,
            title: 'BST Ordering Rule: Left < Root < Right',
            explanation: 'Every node in the Left Subtree [30, 20, 40] is strictly LESS than 50. Every node in the Right Subtree [70, 60, 80] is strictly GREATER than 50.',
            comparisonText: 'All Left < 50 < All Right'
          },
          {
            stepNumber: 2,
            activeNodeId: 2,
            visitedNodeIds: [1, 2],
            nodes: defaultNodes.map((n) => {
              if (n.id === 2) return { ...n, subLabel: 'Sub-Root 30', highlight: true };
              if (n.id === 4) return { ...n, subLabel: '20 < 30', highlight: true, highlightColor: 'violet' };
              if (n.id === 5) return { ...n, subLabel: '40 > 30', highlight: true, highlightColor: 'emerald' };
              return n;
            }),
            edges: defaultEdges,
            title: 'Recursive Property in Subtrees',
            explanation: 'The same rule applies recursively to every single subtree. For Node 30: Left Child 20 < 30, and Right Child 40 > 30.',
            comparisonText: 'Left Child (20) < 30 < Right Child (40)'
          }
        ];

      case 'searching':
        // Search for 60 in BST
        return [
          {
            stepNumber: 1,
            activeNodeId: 1,
            visitedNodeIds: [1],
            nodes: defaultNodes,
            edges: defaultEdges,
            title: 'Step 1: Start at Root (50), Compare with Target 60',
            explanation: 'Target key is 60. Compare target (60) with root (50). Since 60 > 50, according to BST rules, 60 MUST lie in the RIGHT subtree.',
            comparisonText: '60 > 50 → Branch RIGHT'
          },
          {
            stepNumber: 2,
            activeNodeId: 3,
            visitedNodeIds: [1, 3],
            nodes: defaultNodes,
            edges: defaultEdges.map((e) => e.fromId === 1 && e.toId === 3 ? { ...e, highlight: true } : e),
            title: 'Step 2: Move to Right Child (70), Compare with Target 60',
            explanation: 'Compare target (60) with current node (70). Since 60 < 70, 60 MUST lie in the LEFT subtree of 70.',
            comparisonText: '60 < 70 → Branch LEFT'
          },
          {
            stepNumber: 3,
            activeNodeId: 6,
            visitedNodeIds: [1, 3, 6],
            nodes: defaultNodes.map((n) => n.id === 6 ? { ...n, highlight: true, highlightColor: 'emerald', tag: 'Found!' } : n),
            edges: defaultEdges.map((e) => (e.fromId === 1 && e.toId === 3) || (e.fromId === 3 && e.toId === 6) ? { ...e, highlight: true } : e),
            title: 'Step 3: Target 60 Found!',
            explanation: 'Compare target (60) with current node (60). 60 == 60! Node found successfully in only 3 comparisons (O(log N) time).',
            comparisonText: '60 == 60 (MATCH FOUND)'
          }
        ];

      case 'insertion':
        // Insert key 25 into BST
        return [
          {
            stepNumber: 1,
            activeNodeId: 1,
            visitedNodeIds: [1],
            nodes: defaultNodes,
            edges: defaultEdges,
            title: 'Step 1: Compare 25 with Root (50)',
            explanation: 'Inserting 25: Compare 25 with Root 50. Since 25 < 50, traverse to the LEFT child.',
            comparisonText: '25 < 50 → Go Left'
          },
          {
            stepNumber: 2,
            activeNodeId: 2,
            visitedNodeIds: [1, 2],
            nodes: defaultNodes,
            edges: defaultEdges,
            title: 'Step 2: Compare 25 with Node 30',
            explanation: 'Compare 25 with 30. Since 25 < 30, traverse to 30’s LEFT child (20).',
            comparisonText: '25 < 30 → Go Left'
          },
          {
            stepNumber: 3,
            activeNodeId: 4,
            visitedNodeIds: [1, 2, 4],
            nodes: defaultNodes,
            edges: defaultEdges,
            title: 'Step 3: Compare 25 with Node 20',
            explanation: 'Compare 25 with 20. Since 25 > 20, 25 should be placed as the RIGHT child of 20. Since 20.right is currently null, insert 25 here!',
            comparisonText: '25 > 20 & 20.right == null → Insert as Right Child'
          },
          {
            stepNumber: 4,
            activeNodeId: 8,
            visitedNodeIds: [1, 2, 4, 8],
            nodes: [
              ...defaultNodes,
              { id: 8, value: 25, x: 155, y: 315, isLeaf: true, highlight: true, highlightColor: 'emerald', tag: 'New' }
            ],
            edges: [
              ...defaultEdges,
              { fromId: 4, toId: 8, fromX: 120, fromY: 235, toX: 155, toY: 315, highlight: true }
            ],
            title: 'Step 4: Node 25 Attached Successfully',
            explanation: 'Node 25 is created and attached as 20’s right child. The BST ordering property remains perfectly preserved!',
            comparisonText: 'Insertion Complete at 20.right'
          }
        ];

      case 'deletion-leaf':
        // Delete leaf node 20 (Case 1)
        return [
          {
            stepNumber: 1,
            activeNodeId: 4,
            visitedNodeIds: [1, 2, 4],
            nodes: defaultNodes.map((n) => n.id === 4 ? { ...n, highlight: true, highlightColor: 'rose', tag: 'Delete' } : n),
            edges: defaultEdges,
            title: 'Case 1: Deleting Leaf Node 20 (0 Children)',
            explanation: 'We locate target Node 20. Notice Node 20 has 0 children (both left and right pointers are null).',
            comparisonText: 'Target 20 is a Leaf (0 Children)'
          },
          {
            stepNumber: 2,
            activeNodeId: 2,
            visitedNodeIds: [1, 2],
            nodes: defaultNodes.map((n) => {
              if (n.id === 4) return { ...n, highlight: true, highlightColor: 'rose', subLabel: 'Set to null' };
              if (n.id === 2) return { ...n, highlight: true, highlightColor: 'violet', subLabel: 'Parent' };
              return n;
            }),
            edges: defaultEdges.map((e) => e.toId === 4 ? { ...e, highlight: true } : e),
            title: 'Step 2: Disconnect from Parent (30)',
            explanation: 'Simply update parent Node 30’s left child pointer to null (parent.left = null).',
            comparisonText: '30.left = null'
          },
          {
            stepNumber: 3,
            activeNodeId: null,
            visitedNodeIds: [1, 2],
            nodes: defaultNodes.filter((n) => n.id !== 4),
            edges: defaultEdges.filter((e) => e.toId !== 4),
            title: 'Step 3: Leaf Node Removed Cleanly',
            explanation: 'Node 20 is freed from memory. The rest of the tree is completely unaffected.',
            comparisonText: 'Deletion Complete (Simple Disconnect)'
          }
        ];

      case 'deletion-one-child':
        // Delete node with 1 child (e.g. node 30 after 20 was removed, or deleting 70 if 80 only)
        {
          const oneChildNodes: VisualNode[] = [
            { id: 1, value: 50, x: 325, y: 55, isRoot: true },
            { id: 2, value: 30, x: 190, y: 145, highlight: true, highlightColor: 'rose', tag: 'Delete', subLabel: '1 Child' },
            { id: 3, value: 70, x: 460, y: 145 },
            { id: 5, value: 40, x: 190, y: 235, isLeaf: true, highlight: true, highlightColor: 'emerald', subLabel: 'Only Child' },
            { id: 6, value: 60, x: 390, y: 235, isLeaf: true },
            { id: 7, value: 80, x: 530, y: 235, isLeaf: true }
          ];
          const oneChildEdges: VisualEdge[] = [
            { fromId: 1, toId: 2, fromX: 325, fromY: 55, toX: 190, toY: 145 },
            { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 460, toY: 145 },
            { fromId: 2, toId: 5, fromX: 190, fromY: 145, toX: 190, toY: 235 },
            { fromId: 3, toId: 6, fromX: 460, fromY: 145, toX: 390, toY: 235 },
            { fromId: 3, toId: 7, fromX: 460, fromY: 145, toX: 530, toY: 235 }
          ];

          return [
            {
              stepNumber: 1,
              activeNodeId: 2,
              visitedNodeIds: [1, 2],
              nodes: oneChildNodes,
              edges: oneChildEdges,
              title: 'Case 2: Deleting Node 30 with Exactly 1 Child (40)',
              explanation: 'Target Node 30 has only one child (Right child 40, left child is null).',
              comparisonText: 'Target 30 has 1 child (40)'
            },
            {
              stepNumber: 2,
              activeNodeId: 1,
              visitedNodeIds: [1],
              nodes: oneChildNodes.map((n) => {
                if (n.id === 1) return { ...n, highlight: true, subLabel: 'Link to 40' };
                return n;
              }),
              edges: [
                { fromId: 1, toId: 5, fromX: 325, fromY: 55, toX: 190, toY: 235, highlight: true },
                ...oneChildEdges.filter((e) => e.fromId !== 1 || e.toId !== 2)
              ],
              title: 'Step 2: Bypass Node 30 and Link Parent (50) Directly to Child (40)',
              explanation: 'Connect parent Node 50’s left child directly to Node 40 (parent.left = target.right).',
              comparisonText: '50.left = 30.right (Bypass 30)'
            },
            {
              stepNumber: 3,
              activeNodeId: null,
              visitedNodeIds: [],
              nodes: [
                { id: 1, value: 50, x: 325, y: 55, isRoot: true },
                { id: 5, value: 40, x: 190, y: 145, isLeaf: true, highlight: true, highlightColor: 'emerald', subLabel: 'Promoted' },
                { id: 3, value: 70, x: 460, y: 145 },
                { id: 6, value: 60, x: 390, y: 235, isLeaf: true },
                { id: 7, value: 80, x: 530, y: 235, isLeaf: true }
              ],
              edges: [
                { fromId: 1, toId: 5, fromX: 325, fromY: 55, toX: 190, toY: 145 },
                { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 460, toY: 145 },
                { fromId: 3, toId: 6, fromX: 460, fromY: 145, toX: 390, toY: 235 },
                { fromId: 3, toId: 7, fromX: 460, fromY: 145, toX: 530, toY: 235 }
              ],
              title: 'Step 3: Node 40 Promoted, 30 Deleted',
              explanation: 'Node 40 smoothly takes Node 30’s place. The BST properties remain valid (40 < 50).',
              comparisonText: 'Deletion Complete'
            }
          ];
        }

      case 'deletion-two-children':
      case 'inorder-successor':
        // Delete Root 50 with 2 children using In-order Successor (60)
        return [
          {
            stepNumber: 1,
            activeNodeId: 1,
            visitedNodeIds: [1],
            nodes: defaultNodes.map((n) => n.id === 1 ? { ...n, highlight: true, highlightColor: 'rose', tag: 'Delete' } : n),
            edges: defaultEdges,
            title: 'Case 3: Deleting Node with 2 Children (Node 50)',
            explanation: 'Target Node 50 has both Left Child (30) and Right Child (70). We cannot simply delete or bypass it.',
            comparisonText: 'Target has 2 children → Find In-Order Successor'
          },
          {
            stepNumber: 2,
            activeNodeId: 6,
            visitedNodeIds: [1, 3, 6],
            nodes: defaultNodes.map((n) => {
              if (n.id === 1) return { ...n, highlight: true, highlightColor: 'rose', tag: 'Delete' };
              if (n.id === 3) return { ...n, subLabel: 'Right Subtree' };
              if (n.id === 6) return { ...n, highlight: true, highlightColor: 'emerald', tag: 'Succ', subLabel: 'Min in Right Subtree' };
              return n;
            }),
            edges: defaultEdges,
            title: 'Step 2: Find In-Order Successor (Smallest in Right Subtree)',
            explanation: 'Go to the Right Subtree (Node 70), then go as far LEFT as possible. The leftmost node is 60. Node 60 is the In-Order Successor!',
            comparisonText: 'In-Order Successor = 60 (Smallest key > 50)'
          },
          {
            stepNumber: 3,
            activeNodeId: 1,
            visitedNodeIds: [1, 6],
            nodes: defaultNodes.map((n) => {
              if (n.id === 1) return { ...n, value: 60, highlight: true, highlightColor: 'emerald', subLabel: 'Copied 60' };
              if (n.id === 6) return { ...n, highlight: true, highlightColor: 'rose', tag: 'Remove' };
              return n;
            }),
            edges: defaultEdges,
            title: 'Step 3: Copy Successor Value (60) into Target Node',
            explanation: 'Copy value 60 into Node 50. Now the target node holds value 60.',
            comparisonText: 'Copy 60 into Root'
          },
          {
            stepNumber: 4,
            activeNodeId: null,
            visitedNodeIds: [],
            nodes: [
              { id: 1, value: 60, x: 325, y: 55, isRoot: true, highlight: true, highlightColor: 'emerald' },
              { id: 2, value: 30, x: 190, y: 145 },
              { id: 3, value: 70, x: 460, y: 145 },
              { id: 4, value: 20, x: 120, y: 235, isLeaf: true },
              { id: 5, value: 40, x: 260, y: 235, isLeaf: true },
              { id: 7, value: 80, x: 530, y: 235, isLeaf: true }
            ],
            edges: [
              { fromId: 1, toId: 2, fromX: 325, fromY: 55, toX: 190, toY: 145 },
              { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 460, toY: 145 },
              { fromId: 2, toId: 4, fromX: 190, fromY: 145, toX: 120, toY: 235 },
              { fromId: 2, toId: 5, fromX: 190, fromY: 145, toX: 260, toY: 235 },
              { fromId: 3, toId: 7, fromX: 460, fromY: 145, toX: 530, toY: 235 }
            ],
            title: 'Step 4: Delete Original Successor Node (Case 1 / 2)',
            explanation: 'Delete the old leaf 60 from the right subtree. The resulting tree is a 100% valid BST with ordering [30, 20, 40] < 60 < [70, 80]!',
            comparisonText: 'Deletion of 2-Child Node Finished Perfectly'
          }
        ];

      default:
        return [];
    }
  };

  const steps = getStepsForOperation(selectedOpId);
  const currentStep = steps[currentStepIndex] || steps[0];

  const selectedOpInfo: BSTOperationItem =
    BST_OPERATIONS.find((op) => op.id === selectedOpId) || BST_OPERATIONS[0];

  // Auto-play timer loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(1800 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, steps.length]);

  const handleSelectOp = (id: string) => {
    setIsPlaying(false);
    setSelectedOpId(id);
    setCurrentStepIndex(0);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Operation Tabs */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider mb-2.5 opacity-75">
          Select BST Operation to Visualize:
        </div>
        <div className="flex flex-wrap gap-2">
          {BST_OPERATIONS.map((op) => {
            const isSelected = op.id === selectedOpId;
            return (
              <button
                key={op.id}
                onClick={() => handleSelectOp(op.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-violet-600 text-white shadow-md ring-2 ring-violet-400'
                      : 'bg-violet-600 text-white shadow-md ring-2 ring-violet-500'
                    : isDarkMode
                    ? 'bg-[#1e1533] text-purple-200 hover:bg-[#281c44] border border-purple-900/40'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {op.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Playback Controls */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#18112a] border-purple-900/40' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md shadow-violet-900/30 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Play Animation</span>
              </>
            )}
          </button>

          <button
            onClick={handleRestart}
            title="Restart animation"
            className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-[#1f1538] hover:bg-[#2a1c4b] text-purple-200 border-purple-900/40'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'bg-[#1f1538] hover:bg-[#2a1c4b] text-purple-200 border-purple-900/40'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIndex >= steps.length - 1}
            className={`p-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'bg-[#1f1538] hover:bg-[#2a1c4b] text-purple-200 border-purple-900/40'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-semibold opacity-80 ml-1">
            Step {currentStepIndex + 1} / {steps.length}
          </span>
        </div>

        {/* Speed Controls: 1x, 1.5x, 2x */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold opacity-70 mr-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Speed:
          </span>
          {[1, 1.5, 2].map((speed) => (
            <button
              key={speed}
              onClick={() => setPlaybackSpeed(speed)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                playbackSpeed === speed
                  ? isDarkMode
                    ? 'bg-violet-600 text-white ring-1 ring-violet-400'
                    : 'bg-violet-600 text-white ring-1 ring-violet-500'
                  : isDarkMode
                  ? 'bg-[#1f1538] text-purple-300 hover:bg-[#2a1c4b]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode ? 'bg-[#150f24] border-purple-900/40' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-violet-400">
              {selectedOpInfo.title}
            </span>
          </div>
          {currentStep?.comparisonText && (
            <div className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
              isDarkMode ? 'bg-violet-950/80 text-violet-300 border border-violet-800/50' : 'bg-violet-100 text-violet-900 border border-violet-200'
            }`}>
              {currentStep.comparisonText}
            </div>
          )}
        </div>

        <TreeSvg
          nodes={currentStep?.nodes || defaultNodes}
          edges={currentStep?.edges || defaultEdges}
          activeNodeId={currentStep?.activeNodeId}
          visitedNodeIds={currentStep?.visitedNodeIds || []}
          isDarkMode={isDarkMode}
          height={330}
        />
      </div>

      {/* Step Explanation Card */}
      <div className={`p-5 rounded-xl border ${
        isDarkMode ? 'bg-[#171129] border-purple-900/50 text-purple-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <h4 className="text-sm font-bold text-violet-400 mb-1 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-violet-400" />
          {currentStep?.title}
        </h4>
        <p className="text-sm leading-relaxed mb-4">
          {currentStep?.explanation}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-purple-900/30">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1.5">
              Operation Rules:
            </div>
            <ul className="space-y-1 text-xs opacity-85">
              {selectedOpInfo.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <ArrowRight className="w-3 h-3 text-violet-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1.5">
              Time Complexity:
            </div>
            <div className={`p-2.5 rounded-lg text-xs space-y-1 font-mono ${
              isDarkMode ? 'bg-[#1e1533] text-purple-200 border border-purple-900/30' : 'bg-slate-50 text-slate-700 border border-slate-200'
            }`}>
              <div>Average Case: <strong className="text-violet-400">{selectedOpInfo.complexity.average}</strong> (Balanced)</div>
              <div>Worst Case: <strong className="text-rose-400">{selectedOpInfo.complexity.worst}</strong> (Skewed)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
