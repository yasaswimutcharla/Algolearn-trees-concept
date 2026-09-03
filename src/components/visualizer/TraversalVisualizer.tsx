import React, { useState, useEffect, useRef } from 'react';
import { TRAVERSALS_LIST } from '../../data/treeData';
import { TraversalStep, TraversalTypeItem } from '../../types';
import { TreeSvg, VisualNode, VisualEdge } from './TreeSvg';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, FastForward, CheckCircle, Clock } from 'lucide-react';

interface TraversalVisualizerProps {
  isDarkMode: boolean;
}

export const TraversalVisualizer: React.FC<TraversalVisualizerProps> = ({ isDarkMode }) => {
  const [selectedTraversalId, setSelectedTraversalId] = useState<'preorder' | 'inorder' | 'postorder' | 'levelorder'>('inorder');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 1, 1.5, 2

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Tree nodes for traversal visualization
  //           1 (50)
  //        /         \
  //     2 (30)       3 (70)
  //    /     \      /     \
  //  4 (20) 5 (40) 6 (60) 7 (80)
  const baseNodes: VisualNode[] = [
    { id: 1, value: 50, x: 325, y: 55, isRoot: true, level: 0 },
    { id: 2, value: 30, x: 190, y: 145, level: 1 },
    { id: 3, value: 70, x: 460, y: 145, level: 1 },
    { id: 4, value: 20, x: 120, y: 235, isLeaf: true, level: 2 },
    { id: 5, value: 40, x: 260, y: 235, isLeaf: true, level: 2 },
    { id: 6, value: 60, x: 390, y: 235, isLeaf: true, level: 2 },
    { id: 7, value: 80, x: 530, y: 235, isLeaf: true, level: 2 }
  ];

  const baseEdges: VisualEdge[] = [
    { fromId: 1, toId: 2, fromX: 325, fromY: 55, toX: 190, toY: 145 },
    { fromId: 1, toId: 3, fromX: 325, fromY: 55, toX: 460, toY: 145 },
    { fromId: 2, toId: 4, fromX: 190, fromY: 145, toX: 120, toY: 235 },
    { fromId: 2, toId: 5, fromX: 190, fromY: 145, toX: 260, toY: 235 },
    { fromId: 3, toId: 6, fromX: 460, fromY: 145, toX: 390, toY: 235 },
    { fromId: 3, toId: 7, fromX: 460, fromY: 145, toX: 530, toY: 235 }
  ];

  // Generate detailed steps for each traversal
  const getStepsForTraversal = (type: 'preorder' | 'inorder' | 'postorder' | 'levelorder'): TraversalStep[] => {
    switch (type) {
      case 'preorder':
        // Preorder: Root -> Left -> Right
        // 50 -> 30 -> 20 -> 40 -> 70 -> 60 -> 80
        return [
          {
            stepNumber: 1,
            nodeId: 1,
            nodeValue: 50,
            description: '1. Visit Root Node 50 (Print 50)',
            actionType: 'visit',
            currentSequence: [50],
            callStackOrQueue: ['Preorder(50)'],
            explanation: 'Rule: Root → Left → Right. We immediately process and visit the Root node 50 first.'
          },
          {
            stepNumber: 2,
            nodeId: 2,
            nodeValue: 30,
            description: '2. Move to Left Child 30 and Visit (Print 30)',
            actionType: 'visit',
            currentSequence: [50, 30],
            callStackOrQueue: ['Preorder(50)', 'Preorder(30)'],
            explanation: 'Next, we move to 50’s left child (30). Process and print 30 before exploring its children.'
          },
          {
            stepNumber: 3,
            nodeId: 4,
            nodeValue: 20,
            description: '3. Move to Left Child 20 and Visit (Print 20)',
            actionType: 'visit',
            currentSequence: [50, 30, 20],
            callStackOrQueue: ['Preorder(50)', 'Preorder(30)', 'Preorder(20)'],
            explanation: 'Move to 30’s left child (20). Visit 20. Since 20 is a leaf (children are null), return to parent 30.'
          },
          {
            stepNumber: 4,
            nodeId: 5,
            nodeValue: 40,
            description: '4. Move to Right Child 40 and Visit (Print 40)',
            actionType: 'visit',
            currentSequence: [50, 30, 20, 40],
            callStackOrQueue: ['Preorder(50)', 'Preorder(30)', 'Preorder(40)'],
            explanation: 'From 30, explore the right child (40). Process and print 40. Left subtree of 50 is now completely finished.'
          },
          {
            stepNumber: 5,
            nodeId: 3,
            nodeValue: 70,
            description: '5. Move to Right Child of Root 70 and Visit (Print 70)',
            actionType: 'visit',
            currentSequence: [50, 30, 20, 40, 70],
            callStackOrQueue: ['Preorder(50)', 'Preorder(70)'],
            explanation: 'Backtrack to Root 50 and move to its right child (70). Process and print 70.'
          },
          {
            stepNumber: 6,
            nodeId: 6,
            nodeValue: 60,
            description: '6. Move to Left Child 60 and Visit (Print 60)',
            actionType: 'visit',
            currentSequence: [50, 30, 20, 40, 70, 60],
            callStackOrQueue: ['Preorder(50)', 'Preorder(70)', 'Preorder(60)'],
            explanation: 'Explore 70’s left child (60). Process and print 60. Node 60 is a leaf.'
          },
          {
            stepNumber: 7,
            nodeId: 7,
            nodeValue: 80,
            description: '7. Move to Right Child 80 and Visit (Print 80)',
            actionType: 'visit',
            currentSequence: [50, 30, 20, 40, 70, 60, 80],
            callStackOrQueue: ['Preorder(50)', 'Preorder(70)', 'Preorder(80)'],
            explanation: 'Explore 70’s right child (80). Process and print 80. Preorder traversal is COMPLETE!'
          }
        ];

      case 'inorder':
        // Inorder: Left -> Root -> Right
        // 20 -> 30 -> 40 -> 50 -> 60 -> 70 -> 80
        return [
          {
            stepNumber: 1,
            nodeId: 4,
            nodeValue: 20,
            description: '1. Traverse deep left to 20 and Visit (Print 20)',
            actionType: 'visit',
            currentSequence: [20],
            callStackOrQueue: ['Inorder(50)', 'Inorder(30)', 'Inorder(20)'],
            explanation: 'Rule: Left → Root → Right. Traverse left from 50 → 30 → 20. 20 has no left child, so visit and print 20.'
          },
          {
            stepNumber: 2,
            nodeId: 2,
            nodeValue: 30,
            description: '2. Backtrack to Root of subtree 30 and Visit (Print 30)',
            actionType: 'visit',
            currentSequence: [20, 30],
            callStackOrQueue: ['Inorder(50)', 'Inorder(30)'],
            explanation: 'Left child (20) is done. Now process the root of this subtree (30). Print 30.'
          },
          {
            stepNumber: 3,
            nodeId: 5,
            nodeValue: 40,
            description: '3. Traverse to Right Child 40 and Visit (Print 40)',
            actionType: 'visit',
            currentSequence: [20, 30, 40],
            callStackOrQueue: ['Inorder(50)', 'Inorder(30)', 'Inorder(40)'],
            explanation: 'Explore right child of 30 (40). No left child, so visit and print 40. Left subtree of 50 complete.'
          },
          {
            stepNumber: 4,
            nodeId: 1,
            nodeValue: 50,
            description: '4. Backtrack to Main Root 50 and Visit (Print 50)',
            actionType: 'visit',
            currentSequence: [20, 30, 40, 50],
            callStackOrQueue: ['Inorder(50)'],
            explanation: 'The entire left subtree of Root 50 is complete! Now process and print Root 50 itself.'
          },
          {
            stepNumber: 5,
            nodeId: 6,
            nodeValue: 60,
            description: '5. Move to Right Subtree, go deep left to 60 and Visit (Print 60)',
            actionType: 'visit',
            currentSequence: [20, 30, 40, 50, 60],
            callStackOrQueue: ['Inorder(50)', 'Inorder(70)', 'Inorder(60)'],
            explanation: 'Move to 50’s right child (70), then its left child (60). Visit and print 60.'
          },
          {
            stepNumber: 6,
            nodeId: 3,
            nodeValue: 70,
            description: '6. Backtrack to Root 70 and Visit (Print 70)',
            actionType: 'visit',
            currentSequence: [20, 30, 40, 50, 60, 70],
            callStackOrQueue: ['Inorder(50)', 'Inorder(70)'],
            explanation: 'Left child (60) finished. Now visit and print 70.'
          },
          {
            stepNumber: 7,
            nodeId: 7,
            nodeValue: 80,
            description: '7. Move to Right Child 80 and Visit (Print 80)',
            actionType: 'visit',
            currentSequence: [20, 30, 40, 50, 60, 70, 80],
            callStackOrQueue: ['Inorder(50)', 'Inorder(70)', 'Inorder(80)'],
            explanation: 'Visit right child 80. Notice the sequence is in sorted order: [20, 30, 40, 50, 60, 70, 80]!'
          }
        ];

      case 'postorder':
        // Postorder: Left -> Right -> Root
        // 20 -> 40 -> 30 -> 60 -> 80 -> 70 -> 50
        return [
          {
            stepNumber: 1,
            nodeId: 4,
            nodeValue: 20,
            description: '1. Traverse deep left to Leaf 20 and Visit (Print 20)',
            actionType: 'visit',
            currentSequence: [20],
            callStackOrQueue: ['Postorder(50)', 'Postorder(30)', 'Postorder(20)'],
            explanation: 'Rule: Left → Right → Root. Go down left branch to leaf 20. Process and print 20.'
          },
          {
            stepNumber: 2,
            nodeId: 5,
            nodeValue: 40,
            description: '2. Traverse to Right Sibling 40 and Visit (Print 40)',
            actionType: 'visit',
            currentSequence: [20, 40],
            callStackOrQueue: ['Postorder(50)', 'Postorder(30)', 'Postorder(40)'],
            explanation: 'Before visiting parent 30, Postorder requires exploring the right child (40). Process and print 40.'
          },
          {
            stepNumber: 3,
            nodeId: 2,
            nodeValue: 30,
            description: '3. Both children done, now Visit Parent 30 (Print 30)',
            actionType: 'visit',
            currentSequence: [20, 40, 30],
            callStackOrQueue: ['Postorder(50)', 'Postorder(30)'],
            explanation: 'Both left child (20) and right child (40) are completed. Now visit parent 30.'
          },
          {
            stepNumber: 4,
            nodeId: 6,
            nodeValue: 60,
            description: '4. Explore Right Subtree, deep left to 60 (Print 60)',
            actionType: 'visit',
            currentSequence: [20, 40, 30, 60],
            callStackOrQueue: ['Postorder(50)', 'Postorder(70)', 'Postorder(60)'],
            explanation: 'Traverse into right subtree of 50 → 70 → 60. Process leaf 60.'
          },
          {
            stepNumber: 5,
            nodeId: 7,
            nodeValue: 80,
            description: '5. Traverse to Right Child 80 and Visit (Print 80)',
            actionType: 'visit',
            currentSequence: [20, 40, 30, 60, 80],
            callStackOrQueue: ['Postorder(50)', 'Postorder(70)', 'Postorder(80)'],
            explanation: 'Process right leaf 80 before parent 70.'
          },
          {
            stepNumber: 6,
            nodeId: 3,
            nodeValue: 70,
            description: '6. Both children of 70 done, now Visit 70 (Print 70)',
            actionType: 'visit',
            currentSequence: [20, 40, 30, 60, 80, 70],
            callStackOrQueue: ['Postorder(50)', 'Postorder(70)'],
            explanation: 'Children [60, 80] finished. Now visit parent 70.'
          },
          {
            stepNumber: 7,
            nodeId: 1,
            nodeValue: 50,
            description: '7. Finally, Visit the Root Node 50 last (Print 50)',
            actionType: 'visit',
            currentSequence: [20, 40, 30, 60, 80, 70, 50],
            callStackOrQueue: ['Postorder(50)'],
            explanation: 'Both subtrees [30] and [70] are finished. The Root 50 is visited last in Postorder!'
          }
        ];

      case 'levelorder':
        // Level Order (BFS): 50 -> 30 -> 70 -> 20 -> 40 -> 60 -> 80
        return [
          {
            stepNumber: 1,
            nodeId: 1,
            nodeValue: 50,
            description: '1. Dequeue 50 (Level 0), Visit 50, Enqueue children [30, 70]',
            actionType: 'visit',
            currentSequence: [50],
            callStackOrQueue: ['Queue: [30, 70]'],
            explanation: 'Start with Queue = [50]. Dequeue 50, visit it, and push its children 30 and 70 into the Queue.'
          },
          {
            stepNumber: 2,
            nodeId: 2,
            nodeValue: 30,
            description: '2. Dequeue 30 (Level 1), Visit 30, Enqueue children [20, 40]',
            actionType: 'visit',
            currentSequence: [50, 30],
            callStackOrQueue: ['Queue: [70, 20, 40]'],
            explanation: 'Dequeue front node 30. Visit 30, and enqueue its children 20 and 40.'
          },
          {
            stepNumber: 3,
            nodeId: 3,
            nodeValue: 70,
            description: '3. Dequeue 70 (Level 1), Visit 70, Enqueue children [60, 80]',
            actionType: 'visit',
            currentSequence: [50, 30, 70],
            callStackOrQueue: ['Queue: [20, 40, 60, 80]'],
            explanation: 'Dequeue 70. Visit 70, and enqueue its children 60 and 80. Level 1 is complete!'
          },
          {
            stepNumber: 4,
            nodeId: 4,
            nodeValue: 20,
            description: '4. Dequeue 20 (Level 2), Visit 20 (no children)',
            actionType: 'visit',
            currentSequence: [50, 30, 70, 20],
            callStackOrQueue: ['Queue: [40, 60, 80]'],
            explanation: 'Dequeue 20. Visit 20. Node 20 is a leaf.'
          },
          {
            stepNumber: 5,
            nodeId: 5,
            nodeValue: 40,
            description: '5. Dequeue 40 (Level 2), Visit 40 (no children)',
            actionType: 'visit',
            currentSequence: [50, 30, 70, 20, 40],
            callStackOrQueue: ['Queue: [60, 80]'],
            explanation: 'Dequeue 40. Visit 40.'
          },
          {
            stepNumber: 6,
            nodeId: 6,
            nodeValue: 60,
            description: '6. Dequeue 60 (Level 2), Visit 60 (no children)',
            actionType: 'visit',
            currentSequence: [50, 30, 70, 20, 40, 60],
            callStackOrQueue: ['Queue: [80]'],
            explanation: 'Dequeue 60. Visit 60.'
          },
          {
            stepNumber: 7,
            nodeId: 7,
            nodeValue: 80,
            description: '7. Dequeue 80 (Level 2), Visit 80, Queue is now empty',
            actionType: 'visit',
            currentSequence: [50, 30, 70, 20, 40, 60, 80],
            callStackOrQueue: ['Queue: [] (Empty)'],
            explanation: 'Dequeue 80. Queue is empty. Level-Order Traversal is complete!'
          }
        ];
    }
  };

  const steps = getStepsForTraversal(selectedTraversalId);
  const currentStep = steps[currentStepIndex] || steps[0];

  const selectedTraversalInfo: TraversalTypeItem =
    TRAVERSALS_LIST.find((t) => t.id === selectedTraversalId) || TRAVERSALS_LIST[0];

  // Node mapping: find which nodes are visited up to currentStepIndex
  const visitedNodeIds: number[] = [];
  for (let i = 0; i <= currentStepIndex; i++) {
    if (steps[i] && !visitedNodeIds.includes(steps[i].nodeId)) {
      visitedNodeIds.push(steps[i].nodeId);
    }
  }

  // Animation player loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(1600 / playbackSpeed);
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

  const handleSelectTraversal = (id: 'preorder' | 'inorder' | 'postorder' | 'levelorder') => {
    setIsPlaying(false);
    setSelectedTraversalId(id);
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
      {/* Traversal Method Selector Tabs */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider mb-2.5 opacity-75">
          Select Traversal Algorithm:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TRAVERSALS_LIST.map((t) => {
            const isSelected = t.id === selectedTraversalId;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTraversal(t.id)}
                className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-violet-600 text-white shadow-md ring-2 ring-violet-400'
                      : 'bg-violet-600 text-white shadow-md ring-2 ring-violet-500'
                    : isDarkMode
                    ? 'bg-[#1e1533] text-purple-200 hover:bg-[#281c44] border border-purple-900/40'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <div className="text-xs font-bold">{t.name}</div>
                <div className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-purple-100' : 'opacity-70'}`}>
                  {t.orderFormula}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Traversal Controls Bar */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#18112a] border-purple-900/40' : 'bg-slate-50 border-slate-200'
      }`}>
        {/* Play / Pause / Restart / Step Controls */}
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

      {/* Tree Visualization Canvas */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode ? 'bg-[#150f24] border-purple-900/40' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FastForward className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-violet-400">
              Live Traversal: {selectedTraversalInfo.name} ({selectedTraversalInfo.orderFormula})
            </span>
          </div>
          <span className="text-xs font-mono text-violet-400 font-semibold">
            Active Node: {currentStep.nodeValue}
          </span>
        </div>

        <TreeSvg
          nodes={baseNodes}
          edges={baseEdges}
          activeNodeId={currentStep.nodeId}
          visitedNodeIds={visitedNodeIds}
          isDarkMode={isDarkMode}
          height={320}
        />
      </div>

      {/* Traversal Output Sequence & Call Stack State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Output Sequence */}
        <div className={`p-4 rounded-xl border ${
          isDarkMode ? 'bg-[#171129] border-purple-900/50 text-purple-100' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            Traversal Output Array:
          </div>
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-black/20 border border-purple-900/30 min-h-[52px]">
            {currentStep.currentSequence.map((val, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-violet-600 text-white font-mono text-xs font-bold shadow-sm animate-scale-in"
              >
                {val}
              </span>
            ))}
            {currentStep.currentSequence.length === 0 && (
              <span className="text-xs opacity-50 italic">Waiting to visit nodes...</span>
            )}
          </div>
        </div>

        {/* Algorithm State / Stack / Queue */}
        <div className={`p-4 rounded-xl border ${
          isDarkMode ? 'bg-[#171129] border-purple-900/50 text-purple-100' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
            Execution State ({selectedTraversalId === 'levelorder' ? 'Queue (FIFO)' : 'Call Stack (LIFO)'}):
          </div>
          <div className="p-3 rounded-lg bg-black/20 border border-purple-900/30 min-h-[52px] font-mono text-xs text-purple-300 flex items-center">
            {currentStep.callStackOrQueue ? (
              <span>{currentStep.callStackOrQueue.join(' → ')}</span>
            ) : (
              <span>In progress</span>
            )}
          </div>
        </div>
      </div>

      {/* Step Detailed Explanation Box */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode ? 'bg-[#1e1436] border-purple-800/40 text-purple-100' : 'bg-violet-50/70 border-violet-200 text-violet-950'
      }`}>
        <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">
          {currentStep.description}
        </div>
        <p className="text-sm leading-relaxed">
          {currentStep.explanation}
        </p>
      </div>
    </div>
  );
};
