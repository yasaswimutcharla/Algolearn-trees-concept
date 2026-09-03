export type NavItem = 'home' | 'learn' | 'visualize' | 'quiz' | 'progress';

export type TopicId = 
  | 'basics'
  | 'terminology'
  | 'types'
  | 'binary-tree'
  | 'bst'
  | 'traversals'
  | 'applications';

export interface TerminologyItem {
  id: string;
  name: string;
  definition: string;
  example: string;
  highlightCategory: 'root' | 'leaf' | 'parent-child' | 'sibling' | 'internal' | 'edge' | 'path' | 'degree' | 'depth' | 'height' | 'subtree' | 'node' | 'ancestor' | 'descendant';
  details?: string[];
  formula?: string;
  diagramExplanation?: string;
}

export interface TreeTypeItem {
  id: string;
  name: string;
  definition: string;
  rule: string;
  example: string;
  properties: string[];
}

export interface TraversalTypeItem {
  id: 'preorder' | 'inorder' | 'postorder' | 'levelorder';
  name: string;
  orderFormula: string;
  description: string;
  mnemonic: string;
  algorithmSteps: string[];
}

export interface BSTOperationItem {
  id: 'concept' | 'insertion' | 'searching' | 'deletion-leaf' | 'deletion-one-child' | 'deletion-two-children' | 'inorder-successor';
  name: string;
  title: string;
  explanation: string;
  rules: string[];
  complexity: {
    average: string;
    worst: string;
  };
}

export interface TopicContent {
  id: TopicId;
  index: number;
  title: string;
  shortDescription: string;
  summary: string;
  readTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  definition?: {
    text: string;
    highlights?: string[];
  };
  coreIntuition?: {
    analogy: string;
    explanation: string;
    points?: string[];
  };
  goldenRules?: string[];
  complexity?: {
    time: string;
    space: string;
    details?: string;
  };
  commonMistakes?: {
    mistake: string;
    correction: string;
  }[];
  practicalApplications?: string[];
  sections?: {
    title: string;
    content: string;
    bulletPoints?: string[];
    codeSnippet?: string;
    note?: string;
  }[];
  keyPoints: string[];
  architectureDiagram?: {
    title: string;
    caption: string;
    diagramType: string;
  };
  miniPractice?: {
    instruction: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    hint?: string;
    guidedSolve?: {
      steps: {
        stepNumber: number;
        title: string;
        explanation: string;
        nextPrompt?: string;
      }[];
      finalAnswer: string;
      finalExplanation: string;
    };
  };
}

export interface TreeNodeData {
  id: number;
  value: number | string;
  left?: TreeNodeData | null;
  right?: TreeNodeData | null;
  children?: TreeNodeData[];
  x?: number;
  y?: number;
  level?: number;
  isVisited?: boolean;
  isCurrent?: boolean;
  isHighlighted?: boolean;
  highlightColor?: string;
  label?: string;
}

export interface TraversalStep {
  stepNumber: number;
  nodeId: number;
  nodeValue: number | string;
  description: string;
  actionType: 'visit' | 'traverse_left' | 'traverse_right' | 'backtrack' | 'enqueue' | 'dequeue';
  currentSequence: (number | string)[];
  callStackOrQueue?: (number | string)[];
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  topicId: TopicId;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
