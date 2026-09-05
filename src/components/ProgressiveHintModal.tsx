import React, { useEffect } from 'react';
import {
  Lightbulb,
  X,
  Lock,
  Unlock,
  Sparkles,
  Compass,
  KeyRound,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export interface HintStages {
  stage1: string;
  stage2: string;
  stage3: string;
}

export const TOPIC_HINT_STAGES: Record<string, HintStages> = {
  // Tree Basics / Introduction
  basics: {
    stage1: 'Think about how nodes are connected in a tree diagram.',
    stage2: 'Look at the connecting lines between nodes. In graph theory, individual data elements are vertices, and the links connecting them have a standard name.',
    stage3: 'Rule out execution stack frames and array indices. Trees are acyclic hierarchical structures joined by links called edges.'
  },
  'tree-basics': {
    stage1: 'Think about how nodes are connected in a tree diagram.',
    stage2: 'Look at the connecting lines between nodes. In graph theory, individual data elements are vertices, and the links connecting them have a standard name.',
    stage3: 'Rule out execution stack frames and array indices. Trees are acyclic hierarchical structures joined by links called edges.'
  },

  // Tree Terminology
  terminology: {
    stage1: 'Recall how nodes branch downwards from their parent in a hierarchy.',
    stage2: 'Examine node 20 and notice that nodes 40 and 50 branch downwards directly beneath it. Determine whether they represent upstream ancestors or immediate offspring.',
    stage3: 'Ancestors and parents sit above on the path towards the root; nodes positioned immediately below a parent are its children.'
  },
  'tree-terminology': {
    stage1: 'Recall how nodes branch downwards from their parent in a hierarchy.',
    stage2: 'Examine node 20 and notice that nodes 40 and 50 branch downwards directly beneath it. Determine whether they represent upstream ancestors or immediate offspring.',
    stage3: 'Ancestors and parents sit above on the path towards the root; nodes positioned immediately below a parent are its children.'
  },

  // Types of Trees / General Trees
  types: {
    stage1: 'Think about the tree structure that places no restriction on the number of child branches a node can have.',
    stage2: 'Binary tree variations strictly cap child branches at two per node. Identify the overarching, unrestricted tree category.',
    stage3: 'Consider the broad classification describing the most universal form of tree before any branching limitations are applied (General Tree).'
  },
  'types-of-trees': {
    stage1: 'Think about the tree structure that places no restriction on the number of child branches a node can have.',
    stage2: 'Binary tree variations strictly cap child branches at two per node. Identify the overarching, unrestricted tree category.',
    stage3: 'Consider the broad classification describing the most universal form of tree before any branching limitations are applied (General Tree).'
  },
  'general-trees': {
    stage1: 'Think about the tree structure that places no restriction on the number of child branches a node can have.',
    stage2: 'Binary tree variations strictly cap child branches at two per node. Identify the overarching, unrestricted tree category.',
    stage3: 'Consider the broad classification describing the most universal form of tree before any branching limitations are applied (General Tree).'
  },

  // Binary Trees / Leaf nodes
  'binary-tree': {
    stage1: 'Remember the botanical definition of a leaf node at the terminal boundary of a branch.',
    stage2: 'Trace through each node in the tree and check its outgoing degree: leaf nodes have exactly zero child nodes attached below them.',
    stage3: 'Node 10 branches to 5 and 15; node 5 branches to 2 and 7. Nodes that have children cannot be leaves; look for nodes with 0 children.'
  },
  'binary-tree-basics': {
    stage1: 'Remember the botanical definition of a leaf node at the terminal boundary of a branch.',
    stage2: 'Trace through each node in the tree and check its outgoing degree: leaf nodes have exactly zero child nodes attached below them.',
    stage3: 'Node 10 branches to 5 and 15; node 5 branches to 2 and 7. Nodes that have children cannot be leaves; look for nodes with 0 children.'
  },

  // Binary Search Trees (BST)
  bst: {
    stage1: 'Recall the BST ordering rule that governs node placement relative to the parent.',
    stage2: 'Compare the candidate value 7 directly against root node 10. Does a smaller numerical value branch left or right in a BST?',
    stage3: 'In a Binary Search Tree, all values smaller than a node belong in its left subtree, while larger values go to the right.'
  },
  'binary-search-trees': {
    stage1: 'Recall the BST ordering rule that governs node placement relative to the parent.',
    stage2: 'Compare the candidate value 7 directly against root node 10. Does a smaller numerical value branch left or right in a BST?',
    stage3: 'In a Binary Search Tree, all values smaller than a node belong in its left subtree, while larger values go to the right.'
  },

  // Tree Traversals
  traversals: {
    stage1: 'Think about the meaning of the Latin prefix "Pre-" and how it relates to visiting the root node.',
    stage2: 'Traversal names specify when the Root is visited relative to its children: Preorder, Inorder, or Postorder.',
    stage3: 'Preorder visits the Root before any child branch (Root → Left → Right), whereas Inorder visits Root in between and Postorder visits Root after.'
  },
  'tree-traversal': {
    stage1: 'Think about the meaning of the Latin prefix "Pre-" and how it relates to visiting the root node.',
    stage2: 'Traversal names specify when the Root is visited relative to its children: Preorder, Inorder, or Postorder.',
    stage3: 'Preorder visits the Root before any child branch (Root → Left → Right), whereas Inorder visits Root in between and Postorder visits Root after.'
  },

  // Tree Applications
  applications: {
    stage1: 'Think about how nested HTML tags create a hierarchy in web development.',
    stage2: 'Web browsers parse nested tags into a standard hierarchical tree of document elements.',
    stage3: 'The browser\'s Document Object Model (DOM) is structured as a hierarchical tree of parent and child nodes.'
  },
  'tree-applications': {
    stage1: 'Think about how nested HTML tags create a hierarchy in web development.',
    stage2: 'Web browsers parse nested tags into a standard hierarchical tree of document elements.',
    stage3: 'The browser\'s Document Object Model (DOM) is structured as a hierarchical tree of parent and child nodes.'
  }
};

export const QUIZ_HINT_STAGES: Record<string, HintStages> = {
  q1: {
    stage1: 'Consider the mathematical relationship between the number of nodes (N) and the number of connecting branches (edges) in any valid, loop-free tree.',
    stage2: 'Start with small examples: a 1-node tree has 0 edges, a 2-node tree has 1 edge, and a 3-node tree has 2 edges. Notice the fixed difference.',
    stage3: 'Every additional node attached to a tree introduces exactly one new connecting edge. Use the universal tree rule: Number of Edges = N - 1.'
  },
  q2: {
    stage1: 'Recall that every tree is a graph, but trees must obey strict structural constraints regarding hierarchy and connectivity.',
    stage2: 'Think about whether you can loop back to a previously visited node through an alternate path in a valid tree hierarchy.',
    stage3: 'A tree is defined as an acyclic, connected graph with a single root; unlike general graphs, it can never contain closed cycles or loops.'
  },
  q3: {
    stage1: 'Picture the botanical metaphor of a tree: what defines the nodes at the very ends of the branches?',
    stage2: 'Leaf nodes are also called terminal or external nodes because they terminate paths in the hierarchy.',
    stage3: 'Because no further branches extend beneath a leaf node, its total count of children (out-degree) is strictly 0.'
  },
  q4: {
    stage1: 'Recall how Depth is defined: it measures the number of edge steps on the path from the root down to a target node.',
    stage2: 'Ask yourself how many edge hops are needed to travel from the root node to the root node itself.',
    stage3: 'Since the root is the origin of the entire tree, the distance in edges from the root to itself is zero.'
  },
  q5: {
    stage1: 'Look closely at the Latin prefix "Bi-" in "Binary" (like bicycle or binoculars).',
    stage2: 'Nodes in a binary tree do not require children, but there is a strict upper limit on how many child branches can emerge from any single node.',
    stage3: 'By definition, a binary tree restricts the branching factor so that every node can have 0, 1, or at most 2 children.'
  },
  q6: {
    stage1: 'Think about spatial positioning when drawing or visualizing a branching binary hierarchy on paper or a screen.',
    stage2: 'Consider standard traversal orders and computer science terminology that reference child branches by horizontal direction.',
    stage3: 'Because the two branches split horizontally beneath a parent, they are conventionally designated the Left Child and Right Child.'
  },
  q7: {
    stage1: 'Recall the core ordering invariant that allows Binary Search Trees to perform rapid search and retrieval operations.',
    stage2: 'Think of a standard number line: smaller numbers are positioned toward one direction, and larger numbers toward the opposite direction.',
    stage3: 'In a BST, every key value that is strictly less than the parent node is routed into its Left subtree.'
  },
  q8: {
    stage1: 'To list elements in ascending order, you must visit smaller values first, then the root value, then larger values.',
    stage2: 'In a BST, all smaller elements reside in the left subtree, and all larger elements reside in the right subtree. Which traversal pattern follows: Left → Root → Right?',
    stage3: 'The traversal that processes the root "in between" its left and right subtrees (Inorder) naturally retrieves BST elements in sorted order.'
  },
  q9: {
    stage1: 'Analyze the Latin prefixes of traversal methods: Pre- (before), In- (between), and Post- (after).',
    stage2: 'Observe when the Root is processed in the pattern: the Root node is evaluated before visiting any of its child branches.',
    stage3: 'Because the Root is visited before (pre-) traversing the left and right subtrees, this sequence is named Preorder.'
  },
  q10: {
    stage1: 'Reflect on how web pages are structured: HTML tags enclose inner elements, forming parent-child hierarchies.',
    stage2: 'Consider the standard web API and acronym used by JavaScript to manipulate page elements (e.g., document.querySelector).',
    stage3: 'Browsers convert the nested hierarchy of HTML markup into the Document Object Model (DOM) Tree.'
  }
};

export const getContextualHints = (
  topicId: string,
  question?: string,
  existingHint?: string,
  questionId?: string
): HintStages => {
  const normQId = (questionId || '').toLowerCase().trim();
  if (QUIZ_HINT_STAGES[normQId]) {
    return QUIZ_HINT_STAGES[normQId];
  }

  const normId = (topicId || '').toLowerCase().trim();
  if (QUIZ_HINT_STAGES[normId]) {
    return QUIZ_HINT_STAGES[normId];
  }
  if (TOPIC_HINT_STAGES[normId]) {
    return TOPIC_HINT_STAGES[normId];
  }

  // Keyword detection from question
  if (question) {
    const qLower = question.toLowerCase();
    if (qLower.includes('how many edges') && qLower.includes('nodes')) {
      return QUIZ_HINT_STAGES['q1'];
    }
    if (qLower.includes('distinguishes a tree from a general graph') || (qLower.includes('graph') && qLower.includes('cycle'))) {
      return QUIZ_HINT_STAGES['q2'];
    }
    if (qLower.includes('true about a leaf node') || (qLower.includes('leaf') && qLower.includes('children'))) {
      return QUIZ_HINT_STAGES['q3'];
    }
    if (qLower.includes('depth of the root') || qLower.includes('depth(root)')) {
      return QUIZ_HINT_STAGES['q4'];
    }
    if (qLower.includes('binary tree') && qLower.includes('at most')) {
      return QUIZ_HINT_STAGES['q5'];
    }
    if (qLower.includes('two children traditionally called')) {
      return QUIZ_HINT_STAGES['q6'];
    }
    if (qLower.includes('smaller than the current node')) {
      return QUIZ_HINT_STAGES['q7'];
    }
    if (qLower.includes('ascending sorted order')) {
      return QUIZ_HINT_STAGES['q8'];
    }
    if (qLower.includes('root node first') || qLower.includes('root → left → right')) {
      return QUIZ_HINT_STAGES['q9'];
    }
    if (qLower.includes('html document elements') || qLower.includes('dom')) {
      return QUIZ_HINT_STAGES['q10'];
    }

    if (qLower.includes('connect') && (qLower.includes('node') || qLower.includes('two nodes'))) {
      return TOPIC_HINT_STAGES['basics'];
    }
    if (qLower.includes('children') || qLower.includes('parent') || qLower.includes('node 20') || qLower.includes('node 40')) {
      return TOPIC_HINT_STAGES['terminology'];
    }
    if (qLower.includes('bst') || qLower.includes('binary search tree') || qLower.includes('candidate node 7')) {
      return TOPIC_HINT_STAGES['bst'];
    }
    if (qLower.includes('leaf') || qLower.includes('leaves') || qLower.includes('which nodes are leaves')) {
      return TOPIC_HINT_STAGES['binary-tree'];
    }
    if (qLower.includes('traversal') || qLower.includes('preorder') || qLower.includes('inorder') || qLower.includes('postorder')) {
      return TOPIC_HINT_STAGES['traversals'];
    }
    if (qLower.includes('dom') || qLower.includes('browser') || qLower.includes('html')) {
      return TOPIC_HINT_STAGES['applications'];
    }
    if (qLower.includes('any number') || qLower.includes('no limit') || qLower.includes('general tree')) {
      return TOPIC_HINT_STAGES['types'];
    }
  }

  return {
    stage1: existingHint || 'Think carefully about the foundational hierarchical tree rules governing this problem.',
    stage2: question
      ? `Analyze "${question.slice(0, 75)}..." by breaking down its core constraints and eliminating choices that violate tree rules.`
      : 'Analyze the relationships between parent nodes and their children step-by-step.',
    stage3: 'Compare each remaining choice against the exact structural properties of this problem to identify the correct approach.'
  };
};

interface ProgressiveHintModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  topicId?: string;
  topicTitle?: string;
  question?: string;
  questionId?: string;
  existingHint?: string;
  revealedStage: number;
  onRevealNextStage: () => void;
  customHints?: HintStages;
  returnButtonText?: string;
}

export const ProgressiveHintModal: React.FC<ProgressiveHintModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  topicId,
  topicTitle,
  question,
  questionId,
  existingHint,
  revealedStage,
  onRevealNextStage,
  customHints,
  returnButtonText = 'Got It, Return to Game'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hints = customHints || getContextualHints(topicId || '', question, existingHint, questionId);

  return (
    <div
      id="progressive-hint-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-5 bg-black/65 backdrop-blur-sm transition-opacity animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="progressive-hint-modal-card"
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-3xl border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-all transform animate-in zoom-in-95 duration-150 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/50 text-slate-100 shadow-violet-950/60'
            : 'bg-white border-blue-100 text-black shadow-xl'
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 sm:p-6 pb-4 border-b flex items-start justify-between gap-3 ${
            isDarkMode ? 'border-violet-950/60 bg-[#12192d]/70' : 'border-blue-100 bg-blue-50/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-2xl border shrink-0 ${
                isDarkMode
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-amber-50 border-amber-200 text-amber-600'
              }`}
            >
              <Lightbulb className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
                3-Stage Progressive Hint System
              </h3>
              <p
                className={`text-xs mt-0.5 ${
                  isDarkMode ? 'text-violet-300/70' : 'text-blue-800'
                }`}
              >
                Unlocks gentle conceptual hints to direct clues
              </p>
            </div>
          </div>

          <button
            id="close-hint-modal-btn"
            onClick={onClose}
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
              isDarkMode
                ? 'bg-[#182138] border-violet-950 hover:bg-[#202b48] text-slate-400 hover:text-white'
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-800 hover:text-black'
            }`}
            title="Close hint modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Question context chip */}
        <div
          className={`px-5 sm:px-6 py-2.5 border-b text-[11px] sm:text-xs flex items-center gap-2 ${
            isDarkMode
              ? 'bg-[#090d17] border-violet-950/40 text-violet-300/80'
              : 'bg-blue-50/50 border-blue-100 text-blue-900'
          }`}
        >
          <span className="font-semibold uppercase tracking-wider text-[10px] shrink-0 opacity-70">
            Current Question:
          </span>
          <span className="truncate opacity-90 font-medium">{question}</span>
        </div>

        {/* Body - 3 Progressive Stages */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4">
          {/* STAGE 1 */}
          <div
            id="hint-stage-1-card"
            className={`p-4 rounded-2xl border transition-all ${
              isDarkMode
                ? 'bg-violet-950/25 border-violet-800/40 text-violet-100'
                : 'bg-violet-50/70 border-violet-200 text-violet-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <h4 className="text-xs font-bold tracking-wide">
                  Stage 1: Concept Reminder
                </h4>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isDarkMode
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                Available
              </span>
            </div>
            <p className="text-xs leading-relaxed opacity-95">
              {hints.stage1}
            </p>
          </div>

          {/* STAGE 2 */}
          <div
            id="hint-stage-2-card"
            className={`p-4 rounded-2xl border transition-all ${
              revealedStage >= 2
                ? isDarkMode
                  ? 'bg-purple-950/25 border-purple-800/40 text-purple-100'
                  : 'bg-purple-50/70 border-purple-200 text-purple-950'
                : isDarkMode
                ? 'bg-[#121829]/60 border-violet-950/40 text-slate-400'
                : 'bg-blue-50/30 border-blue-100 text-blue-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {revealedStage >= 2 ? (
                  <Compass className="w-4 h-4 text-purple-400" />
                ) : (
                  <Lock className="w-4 h-4 opacity-50" />
                )}
                <h4 className="text-xs font-bold tracking-wide">
                  Stage 2: Directional Guidance
                </h4>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  revealedStage >= 2
                    ? isDarkMode
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-purple-100 text-purple-800 border border-purple-200'
                    : isDarkMode
                    ? 'bg-slate-800/60 text-slate-400 border border-slate-700/40'
                    : 'bg-blue-100 text-blue-900'
                }`}
              >
                {revealedStage >= 2 ? 'Unlocked' : 'Locked'}
              </span>
            </div>

            {revealedStage >= 2 ? (
              <p className="text-xs leading-relaxed opacity-95">
                {hints.stage2}
              </p>
            ) : (
              <div className="flex items-center gap-2 text-xs py-1 opacity-70">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Click &ldquo;Reveal Next Hint&rdquo; below to unlock directional guidance for this challenge.</span>
              </div>
            )}
          </div>

          {/* STAGE 3 */}
          <div
            id="hint-stage-3-card"
            className={`p-4 rounded-2xl border transition-all ${
              revealedStage >= 3
                ? isDarkMode
                  ? 'bg-fuchsia-950/25 border-fuchsia-800/40 text-fuchsia-100'
                  : 'bg-fuchsia-50/70 border-fuchsia-200 text-fuchsia-950'
                : isDarkMode
                ? 'bg-[#121829]/60 border-violet-950/40 text-slate-400'
                : 'bg-blue-50/30 border-blue-100 text-blue-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {revealedStage >= 3 ? (
                  <KeyRound className="w-4 h-4 text-fuchsia-400" />
                ) : (
                  <Lock className="w-4 h-4 opacity-50" />
                )}
                <h4 className="text-xs font-bold tracking-wide">
                  Stage 3: Direct Solution Clue
                </h4>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  revealedStage >= 3
                    ? isDarkMode
                      ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                      : 'bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-200'
                    : isDarkMode
                    ? 'bg-slate-800/60 text-slate-400 border border-slate-700/40'
                    : 'bg-blue-100 text-blue-900'
                }`}
              >
                {revealedStage >= 3 ? 'Unlocked' : 'Locked'}
              </span>
            </div>

            {revealedStage >= 3 ? (
              <p className="text-xs leading-relaxed opacity-95">
                {hints.stage3}
              </p>
            ) : (
              <div className="flex items-center gap-2 text-xs py-1 opacity-70">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Click &ldquo;Reveal Next Hint&rdquo; to unlock the strongest clue without spoiling the final answer.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-5 sm:p-6 pt-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
            isDarkMode ? 'border-violet-950/60 bg-[#10162a]/70' : 'border-blue-100 bg-blue-50/50'
          }`}
        >
          {/* Status counter & progress pills */}
          <div className="flex items-center justify-between sm:justify-start gap-2.5">
            <span
              className={`text-xs font-semibold ${
                isDarkMode ? 'text-violet-200' : 'text-blue-950'
              }`}
            >
              Revealed {revealedStage} of 3 hints
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all ${
                    revealedStage >= step
                      ? 'w-4 bg-violet-500'
                      : isDarkMode
                      ? 'w-2 bg-slate-800'
                      : 'w-2 bg-blue-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            {revealedStage < 3 ? (
              <button
                id="reveal-next-hint-btn"
                onClick={onRevealNextStage}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                  isDarkMode
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-950/50'
                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-200'
                }`}
              >
                <span>Reveal Next Hint ({revealedStage + 1}/3) →</span>
              </button>
            ) : (
              <button
                disabled
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border cursor-default ${
                  isDarkMode
                    ? 'bg-[#151d33] border-violet-950/80 text-violet-400'
                    : 'bg-blue-50 border-blue-200 text-blue-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>All Hints Unlocked</span>
              </button>
            )}

            <button
              id="return-to-game-btn"
              onClick={onClose}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-[#141b2f] hover:bg-[#1c2642] border-violet-950/80 text-slate-200'
                  : 'bg-white hover:bg-blue-50 border-blue-200 text-blue-950 shadow-sm'
              }`}
            >
              Got It, Return to Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
