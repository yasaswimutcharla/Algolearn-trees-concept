import React, { useState, useEffect } from 'react';
import { NavItem, TopicId } from '../../types';
import {
  TrendingUp,
  CheckCircle2,
  Circle,
  RotateCcw,
  BookOpen,
  Layers,
  Terminal,
  Trophy,
  Zap,
  Video,
  BrainCircuit,
  Globe,
  GitBranch,
  Target,
  Award,
  Activity,
  Clock,
  Lock,
  Check,
  Flame,
  Sparkles
} from 'lucide-react';

interface ProgressViewProps {
  completedTopics: TopicId[];
  quizScore: { score: number; total: number } | null;
  completedVisualizations?: string[];
  onNavigate: (nav: NavItem, topicId?: TopicId) => void;
  onResetProgress: () => void;
  onToggleTopicCompleted?: (topicId: TopicId) => void;
  isDarkMode: boolean;
  uploadedVideoUrl?: string | null;
  uploadedVideoName?: string;
  uploadedVideoSize?: string;
  isVideoCompleted?: boolean;
  onUploadVideo?: (file: File) => void;
  onRemoveVideo?: () => void;
  onToggleVideoCompleted?: () => void;
  onWatchAgain?: () => void;
}

interface CurriculumModule {
  id: string;
  title: string;
  category: 'fundamentals' | 'types' | 'bst' | 'traversals' | 'applications';
  categoryLabel: string;
  description: string;
  criteria: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estTime: string;
  navTarget: NavItem;
  topicId: TopicId;
  icon: React.FC<{ className?: string }>;
}

const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'TOPIC-01',
    title: '01. TREE FUNDAMENTALS',
    category: 'fundamentals',
    categoryLabel: 'Fundamentals',
    description: 'Understand hierarchical tree structures, root, edges, and non-linear data organization.',
    criteria: 'Master non-linear hierarchical node organization, roots, edges, parent-child relationships, and leaf structures.',
    difficulty: 'Beginner',
    estTime: '3 min read',
    navTarget: 'learn',
    topicId: 'basics',
    icon: Layers
  },
  {
    id: 'TOPIC-02',
    title: '02. TREE TERMINOLOGY',
    category: 'fundamentals',
    categoryLabel: 'Fundamentals',
    description: 'Master core terminology: roots, parents, children, leaves, height, depth, and subtrees.',
    criteria: 'Master essential tree terms: node, root, edge, parent, child, leaf, internal node, degree, level, height, depth, subtree, siblings, ancestor, and descendant.',
    difficulty: 'Beginner',
    estTime: '4 min read',
    navTarget: 'learn',
    topicId: 'terminology',
    icon: BookOpen
  },
  {
    id: 'TOPIC-03',
    title: '03. TYPES OF TREES',
    category: 'types',
    categoryLabel: 'Tree Types',
    description: 'Learn primary tree structures: General Trees, Binary Trees, and Binary Search Trees.',
    criteria: 'Distinguish between General Trees (arbitrary branching), Binary Trees (at most 2 children), and Binary Search Trees (ordered values).',
    difficulty: 'Beginner',
    estTime: '3 min read',
    navTarget: 'learn',
    topicId: 'types',
    icon: BrainCircuit
  },
  {
    id: 'TOPIC-04',
    title: '04. BINARY TREE',
    category: 'types',
    categoryLabel: 'Tree Types',
    description: 'Learn binary tree properties where every node has at most two children (left and right).',
    criteria: 'Master binary tree structures, left/right child pointers, and classifications (Strictly Binary, Full, Complete, Perfect, Degenerate).',
    difficulty: 'Beginner',
    estTime: '3 min read',
    navTarget: 'learn',
    topicId: 'binary-tree',
    icon: GitBranch
  },
  {
    id: 'TOPIC-05',
    title: '05. BINARY SEARCH TREE & OPERATIONS',
    category: 'bst',
    categoryLabel: 'BST',
    description: 'Learn BST ordering rules (Left < Parent < Right) and core operations (Search, Insert, Delete).',
    criteria: 'Master the BST invariant rule, O(log N) searching, insertion step routing, and node deletion cases.',
    difficulty: 'Beginner',
    estTime: '3 min read',
    navTarget: 'learn',
    topicId: 'bst',
    icon: Terminal
  },
  {
    id: 'TOPIC-06',
    title: '06. TREE TRAVERSALS',
    category: 'traversals',
    categoryLabel: 'Traversals',
    description: 'Learn how to visit every node systematically using depth-first and breadth-first strategies.',
    criteria: 'Master Preorder (Root → Left → Right), Inorder (Left → Root → Right), Postorder (Left → Right → Root), and Level Order (BFS).',
    difficulty: 'Beginner',
    estTime: '3 min read',
    navTarget: 'learn',
    topicId: 'traversals',
    icon: Zap
  },
  {
    id: 'TOPIC-07',
    title: '07. ADVANCED TREE CONCEPTS',
    category: 'applications',
    categoryLabel: 'Applications',
    description: 'Explore practical real-world tree structures: file systems, HTML DOM, databases, and AI.',
    criteria: 'Explore operating system file hierarchies, browser DOM trees, database indexing structures, and decision trees.',
    difficulty: 'Beginner',
    estTime: '3 min read',
    navTarget: 'learn',
    topicId: 'applications',
    icon: Globe
  }
];

interface TreeAchievement {
  id: string;
  title: string;
  category: string;
  description: string;
  requirement: string;
  xpReward: number;
  isUnlocked: boolean;
  icon: React.FC<{ className?: string }>;
}

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  xp: number;
  type: 'joined' | 'learn' | 'visualize' | 'quiz';
  icon: React.FC<{ className?: string }>;
  timestamp: number;
  timestampStr: string;
  navTarget?: NavItem;
  topicId?: TopicId;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  completedTopics,
  quizScore,
  completedVisualizations = [],
  onNavigate,
  onResetProgress,
  isDarkMode,
  uploadedVideoUrl: propVideoUrl,
  uploadedVideoName: propVideoName,
  uploadedVideoSize: propVideoSize,
  isVideoCompleted: propVideoCompleted,
  onUploadVideo,
  onRemoveVideo,
  onToggleVideoCompleted,
  onWatchAgain
}) => {
  const [localIsVideoCompleted, setLocalIsVideoCompleted] = useState<boolean>(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState<boolean>(false);
  const [localResetTick, setLocalResetTick] = useState<number>(0);

  // Persistent timeline timestamps (remains saved across reloads/nav)
  const [timelineTimestamps, setTimelineTimestamps] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_timeline_timestamps');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const [joinedTime, setJoinedTime] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_joined_time');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
      const now = Date.now();
      localStorage.setItem('tree_dsa_joined_time', String(now));
      return now;
    } catch {
      return Date.now();
    }
  });

  // Sync quiz answered progress from real app storage
  const [quizAnsweredCount, setQuizAnsweredCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_quiz_progress');
      if (saved) return JSON.parse(saved).completed || 0;
      const quizState = localStorage.getItem('tree_dsa_quiz_state');
      if (quizState) {
        const parsed = JSON.parse(quizState);
        return Object.keys(parsed?.confirmedQuestions || {}).length || 0;
      }
    } catch {}
    return 0;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_quiz_progress');
      if (saved) {
        setQuizAnsweredCount(JSON.parse(saved).completed || 0);
        return;
      }
      const quizState = localStorage.getItem('tree_dsa_quiz_state');
      if (quizState) {
        const parsed = JSON.parse(quizState);
        setQuizAnsweredCount(Object.keys(parsed?.confirmedQuestions || {}).length || 0);
        return;
      }
      setQuizAnsweredCount(0);
    } catch {
      setQuizAnsweredCount(0);
    }
  }, [quizScore, completedTopics, localResetTick]);

  const isVideoCompleted = propVideoCompleted !== undefined ? propVideoCompleted : localIsVideoCompleted;
  const isVisualDone = Boolean(isVideoCompleted || completedVisualizations.length > 0);

  // Automatically record & persist timestamps for actual completion activity
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_timeline_timestamps');
      const existing: Record<string, number> = saved ? JSON.parse(saved) : {};
      let changed = false;

      if (!existing['joined']) {
        existing['joined'] = joinedTime;
        changed = true;
      }

      completedTopics.forEach((topicId, idx) => {
        const key = `topic-${topicId}`;
        if (!existing[key]) {
          existing[key] = Date.now() + idx * 50;
          changed = true;
        }
      });

      if (isVisualDone && !existing['visualize']) {
        existing['visualize'] = Date.now();
        changed = true;
      }

      if (quizScore !== null && !existing['quiz']) {
        existing['quiz'] = Date.now();
        changed = true;
      }

      // Cleanup removed topics or reset state
      Object.keys(existing).forEach((key) => {
        if (key.startsWith('topic-')) {
          const tId = key.replace('topic-', '');
          if (!completedTopics.includes(tId as TopicId)) {
            delete existing[key];
            changed = true;
          }
        }
        if (key === 'visualize' && !isVisualDone) {
          delete existing['visualize'];
          changed = true;
        }
        if (key === 'quiz' && quizScore === null) {
          delete existing['quiz'];
          changed = true;
        }
      });

      if (changed) {
        localStorage.setItem('tree_dsa_timeline_timestamps', JSON.stringify(existing));
        setTimelineTimestamps(existing);
      }
    } catch {}
  }, [completedTopics, isVisualDone, quizScore, joinedTime, localResetTick]);

  const handleToggleCompleted = () => {
    if (onToggleVideoCompleted) {
      onToggleVideoCompleted();
    } else {
      setLocalIsVideoCompleted((prev) => !prev);
    }
  };

  const handleWatchAgain = () => {
    if (onWatchAgain) {
      onWatchAgain();
    } else {
      onNavigate('visualize');
    }
  };

  const handleConfirmReset = () => {
    setShowResetConfirmModal(false);
    setLocalIsVideoCompleted(false);
    setQuizAnsweredCount(0);
    setLocalResetTick((t) => t + 1);
    const now = Date.now();
    try {
      localStorage.removeItem('tree_dsa_learning_streak');
      localStorage.removeItem('tree_dsa_timeline_timestamps');
      localStorage.setItem('tree_dsa_joined_time', String(now));
    } catch {}
    setTimelineTimestamps({ joined: now });
    setJoinedTime(now);
    onResetProgress();
  };

  // Real App Calculations
  const totalTopicsCount = CURRICULUM_MODULES.length; // 7
  const topicsCompletedCount = completedTopics.length;
  const quizHasScore = quizScore !== null;
  const currentQuizScore = quizScore ? quizScore.score : 0;
  const quizPassed = quizHasScore && currentQuizScore >= 7;

  // Real XP calculation:
  // 10 XP per Learn topic (up to 70 XP)
  // 20 XP for Visual Lesson (up to 20 XP)
  // 10 XP per correct Quiz answer or 5 XP per question answered (up to 100 XP)
  const totalXP =
    topicsCompletedCount * 10 +
    (isVisualDone ? 20 : 0) +
    (quizScore ? quizScore.score * 10 : quizAnsweredCount * 5);

  // Overall TreeDSA progress calculation (weighted across Learn 60%, Visualize 20%, Quiz 20%):
  const learnWeight = (topicsCompletedCount / totalTopicsCount) * 60;
  const vizWeight = isVisualDone ? 20 : 0;
  const quizWeight = quizScore
    ? (quizScore.score / quizScore.total) * 20
    : (quizAnsweredCount / 10) * 10;
  const overallPercentage = Math.min(100, Math.round(learnWeight + vizWeight + quizWeight));

  // Real Learning Streak from actual app activity
  const streakDays = (() => {
    if (topicsCompletedCount === 0 && !isVisualDone && !quizScore && quizAnsweredCount === 0) {
      return 0;
    }
    try {
      const saved = localStorage.getItem('tree_dsa_learning_streak');
      if (saved) {
        const num = parseInt(saved, 10);
        if (!isNaN(num) && num > 0) return num;
      }
    } catch {}
    return 1;
  })();

  // Real Mastery Level from progress state (Tree DSA Mastery Terminology)
  const getMasteryLevel = () => {
    if (overallPercentage >= 85) return { label: 'Tree Grandmaster', level: 4, rank: 'Grandmaster' };
    if (overallPercentage >= 50) return { label: 'Tree Specialist', level: 3, rank: 'Specialist' };
    if (overallPercentage >= 20) return { label: 'Tree Explorer', level: 2, rank: 'Explorer' };
    return { label: 'Tree Novice', level: 1, rank: 'Novice' };
  };
  const mastery = getMasteryLevel();

  // Tree DSA Achievements from real progress state
  const achievements: TreeAchievement[] = [
    {
      id: 'ach-first-tree',
      title: 'First Tree',
      category: 'Fundamentals',
      description: 'Understand the basic structure of a tree.',
      requirement: 'Complete Topic 01: Tree Fundamentals',
      xpReward: 25,
      isUnlocked: completedTopics.includes('basics'),
      icon: Layers
    },
    {
      id: 'ach-tree-terminology-master',
      title: 'Tree Terminology Master',
      category: 'Terminology',
      description: 'Master nodes, roots, parents, children, leaves, depth, and height.',
      requirement: 'Complete Topic 02: Tree Terminology',
      xpReward: 25,
      isUnlocked: completedTopics.includes('terminology'),
      icon: BookOpen
    },
    {
      id: 'ach-binary-tree-specialist',
      title: 'Binary Tree Specialist',
      category: 'Binary Trees',
      description: 'Complete Binary Tree concepts and challenges.',
      requirement: 'Complete Topic 04: Binary Tree',
      xpReward: 30,
      isUnlocked: completedTopics.includes('binary-tree'),
      icon: GitBranch
    },
    {
      id: 'ach-bst-explorer',
      title: 'BST Explorer',
      category: 'BST',
      description: 'Master Binary Search Tree ordering and operations.',
      requirement: 'Complete Topic 05: Binary Search Tree',
      xpReward: 30,
      isUnlocked: completedTopics.includes('bst'),
      icon: Terminal
    },
    {
      id: 'ach-traversal-expert',
      title: 'Traversal Expert',
      category: 'Traversals',
      description: 'Master Preorder, Inorder, Postorder, and Level Order traversal.',
      requirement: 'Complete Topic 06: Tree Traversals',
      xpReward: 35,
      isUnlocked: completedTopics.includes('traversals'),
      icon: Zap
    },
    {
      id: 'ach-tree-builder',
      title: 'Tree Builder',
      category: 'Construction',
      description: 'Successfully solve interactive tree construction challenges.',
      requirement: 'Complete 1 Tree Visualization masterclass lesson',
      xpReward: 35,
      isUnlocked: isVisualDone,
      icon: BrainCircuit
    },
    {
      id: 'ach-tree-problem-solver',
      title: 'Tree Problem Solver',
      category: 'Problem Solving',
      description: 'Complete advanced Tree DSA challenges.',
      requirement: 'Answer 5 or more challenge questions in Quiz',
      xpReward: 40,
      isUnlocked: quizAnsweredCount >= 5 || (quizScore !== null && quizScore.score >= 5),
      icon: Award
    },
    {
      id: 'ach-tree-grandmaster',
      title: 'Tree Grandmaster',
      category: 'Mastery',
      description: 'Demonstrate mastery across the complete Tree DSA curriculum.',
      requirement: 'Complete all 7 topics and pass the Tree Quiz',
      xpReward: 100,
      isUnlocked: topicsCompletedCount >= 7 && (quizPassed || (quizScore !== null && quizScore.score >= 7)),
      icon: Trophy
    }
  ];

  const unlockedAchievementsCount = achievements.filter((a) => a.isUnlocked).length;

  const formatTimestamp = (ts: number): string => {
    if (!ts) return 'Just now';
    const diffMs = Math.max(0, Date.now() - ts);
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(ts).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
  };

  // Real Tree DSA Activity Timeline from actual state
  const timelineItems: TimelineItem[] = [];

  // 1. Joined Tree DSA Learning (Always present once entered)
  const joinedTs = timelineTimestamps['joined'] || joinedTime;
  timelineItems.push({
    id: 'timeline-joined',
    title: 'Joined Tree DSA Learning',
    description: 'Started the Tree DSA interactive learning environment.',
    xp: 10,
    type: 'joined',
    icon: Sparkles,
    timestamp: joinedTs,
    timestampStr: formatTimestamp(joinedTs),
    navTarget: 'learn',
    topicId: 'basics'
  });

  // 2. Tree Fundamentals Completed
  if (completedTopics.includes('basics')) {
    const ts = timelineTimestamps['topic-basics'] || Date.now();
    timelineItems.push({
      id: 'timeline-basics',
      title: 'Tree Fundamentals Completed',
      description: 'Learned nodes, roots, edges, parents, children, leaves, height, and depth.',
      xp: 25,
      type: 'learn',
      icon: Layers,
      timestamp: ts,
      timestampStr: formatTimestamp(ts),
      navTarget: 'learn',
      topicId: 'basics'
    });
  }

  // 3. Tree Terminology Completed
  if (completedTopics.includes('terminology')) {
    const ts = timelineTimestamps['topic-terminology'] || Date.now();
    timelineItems.push({
      id: 'timeline-terminology',
      title: 'Tree Terminology Completed',
      description: 'Practiced node relationships, subtree, siblings, ancestors, and descendants.',
      xp: 25,
      type: 'learn',
      icon: BookOpen,
      timestamp: ts,
      timestampStr: formatTimestamp(ts),
      navTarget: 'learn',
      topicId: 'terminology'
    });
  }

  // 4. Types of Trees Completed
  if (completedTopics.includes('types')) {
    const ts = timelineTimestamps['topic-types'] || Date.now();
    timelineItems.push({
      id: 'timeline-types',
      title: 'Types of Trees Completed',
      description: 'Learned General Tree, Binary Tree, and Binary Search Tree concepts.',
      xp: 25,
      type: 'learn',
      icon: BrainCircuit,
      timestamp: ts,
      timestampStr: formatTimestamp(ts),
      navTarget: 'learn',
      topicId: 'types'
    });
  }

  // 5. Binary Tree Concepts Completed
  if (completedTopics.includes('binary-tree')) {
    const ts = timelineTimestamps['topic-binary-tree'] || Date.now();
    timelineItems.push({
      id: 'timeline-binary-tree',
      title: 'Binary Tree Concepts Completed',
      description: 'Practiced Strictly Binary, Full, Complete, Perfect, and Degenerate Binary Trees.',
      xp: 25,
      type: 'learn',
      icon: GitBranch,
      timestamp: ts,
      timestampStr: formatTimestamp(ts),
      navTarget: 'learn',
      topicId: 'binary-tree'
    });
  }

  // 6. Binary Search Tree Completed
  if (completedTopics.includes('bst')) {
    const ts = timelineTimestamps['topic-bst'] || Date.now();
    timelineItems.push({
      id: 'timeline-bst',
      title: 'Binary Search Tree Completed',
      description: 'Learned BST ordering rules, searching, insertion, and deletion concepts.',
      xp: 25,
      type: 'learn',
      icon: Terminal,
      timestamp: ts,
      timestampStr: formatTimestamp(ts),
      navTarget: 'learn',
      topicId: 'bst'
    });
  }

  // 7. Tree Traversals Completed
  if (completedTopics.includes('traversals')) {
    const ts = timelineTimestamps['topic-traversals'] || Date.now();
    timelineItems.push({
      id: 'timeline-traversals',
      title: 'Tree Traversals Completed',
      description: 'Practiced Preorder, Inorder, Postorder, and Level Order traversal.',
      xp: 25,
      type: 'learn',
      icon: Zap,
      timestamp: ts,
      timestampStr: formatTimestamp(ts),
      navTarget: 'learn',
      topicId: 'traversals'
    });
  }

  // Topic 7: Advanced Tree Concepts Completed
  if (completedTopics.includes('applications')) {
    const ts = timelineTimestamps['topic-applications'] || Date.now();
    timelineItems.push({
      id: 'timeline-applications',
      title: 'Advanced Tree Concepts Completed',
      description: 'Explored file systems, HTML DOM, databases, and decision tree applications.',
      xp: 25,
      type: 'learn',
      icon: Globe,
      timestamp: ts,
      timestampStr: formatTimestamp(ts),
      navTarget: 'learn',
      topicId: 'applications'
    });
  }

  // 8. Visualize Lesson Completed
  if (isVisualDone) {
    const ts = timelineTimestamps['visualize'] || Date.now();
    timelineItems.push({
      id: 'timeline-viz',
      title: 'Visualize Lesson Completed',
      description: 'Completed the Tree DSA visual learning lesson.',
      xp: 20,
      type: 'visualize',
      icon: Video,
      timestamp: ts,
      timestampStr: formatTimestamp(ts),
      navTarget: 'visualize'
    });
  }

  // Quiz evaluation if completed
  if (quizScore !== null) {
    const ts = timelineTimestamps['quiz'] || Date.now();
    timelineItems.push({
      id: 'timeline-quiz-score',
      title: `Completed Tree DSA Quiz (${quizScore.score}/${quizScore.total})`,
      description: quizScore.score >= 7 ? 'Successfully passed the Tree & BST evaluation quiz with distinction.' : 'Completed Tree evaluation quiz attempt.',
      xp: quizScore.score >= 7 ? 50 : 25,
      type: 'quiz',
      icon: Trophy,
      timestamp: ts,
      timestampStr: formatTimestamp(ts),
      navTarget: 'quiz'
    });
  }

  // Sort newest/recent learning events first
  timelineItems.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div id="progress-view-root" className="max-w-6xl mx-auto space-y-8 py-2">
      {/* Top Header Card with Reset Circle */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/30'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider mb-3 ${
                isDarkMode
                  ? 'bg-violet-600/20 text-[#A78BFA] border border-violet-500/30'
                  : 'bg-[#6D3DF5]/10 text-[#6D3DF5] border border-[#6D3DF5]/30'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>TREE DSA LEARNING PROGRESS</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
              isDarkMode ? 'text-[#F8FAFC]' : 'text-black'
            }`}>
              Tree DSA Learning Progress
            </h1>
            <p className={`text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-[#E2E8F0]' : 'text-blue-900'
            }`}>
              Track your Tree DSA mastery, completed topics, achievements, and learning activity.
            </p>
          </div>

          {/* Reset Circle Action */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              id="reset-activity-circle-btn"
              onClick={() => setShowResetConfirmModal(true)}
              title="Reset Activity & Progress"
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-violet-950/40 hover:bg-rose-950/50 border-violet-800/40 hover:border-rose-500/60 text-[#94A3B8] hover:text-rose-300 shadow-md'
                  : 'bg-blue-50 hover:bg-rose-50 border-blue-200 hover:border-rose-300 text-blue-900 hover:text-rose-900'
              }`}
            >
              <RotateCcw className="w-4 h-4 transition-transform duration-500 hover:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Reset Activity */}
      {showResetConfirmModal && (
        <div
          id="reset-confirm-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-150 ${
              isDarkMode
                ? 'bg-[#0e1424] border-violet-900/60 text-[#F8FAFC]'
                : 'bg-white border-blue-100 text-black'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                isDarkMode
                  ? 'bg-rose-950/50 border-rose-800/50 text-rose-400'
                  : 'bg-rose-50 border-rose-200 text-rose-600'
              }`}>
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold tracking-tight">Reset Learning Activity</h3>
                <p className={`text-xs ${isDarkMode ? 'text-[#94A3B8]' : 'text-blue-900'}`}>
                  Tree DSA Progress & History
                </p>
              </div>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
              isDarkMode ? 'text-[#E2E8F0]' : 'text-slate-600'
            }`}>
              Are you sure you want to reset all your learning progress? This will reset your overall completion to 0%, clear topic checkmarks, quiz scores, XP, achievements, and activity history. Course material and lesson videos are preserved.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                id="cancel-reset-btn"
                onClick={() => setShowResetConfirmModal(false)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                  isDarkMode
                    ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
              >
                Cancel
              </button>
              <button
                id="confirm-reset-btn"
                onClick={handleConfirmReset}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/30"
              >
                Reset Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4 SUMMARY-CARD LAYOUT TRACKING REAL APPDATA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* CARD 1 — OVERALL PROGRESS */}
        <div
          id="summary-card-overall-progress"
          className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
              : 'bg-white border-blue-100 text-black shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold font-mono uppercase tracking-wider ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                OVERALL PROGRESS
              </span>
              <Target className={`w-4 h-4 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'}`} />
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-4xl font-black font-mono tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {overallPercentage}%
              </span>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'}`}>
                Tree DSA
              </span>
            </div>

            {/* Horizontal Progress Bar */}
            <div className={`w-full h-2.5 rounded-full overflow-hidden mt-4 border ${
              isDarkMode ? 'bg-violet-950/50 border-violet-800/30' : 'bg-blue-50 border-blue-200'
            }`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-700 via-[#6D3DF5] to-violet-400 transition-all duration-700 shadow-sm"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>

          <div className={`mt-5 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
            isDarkMode ? 'border-violet-950/50 text-[#94A3B8]' : 'border-blue-100 text-blue-700'
          }`}>
            <span>
              <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{topicsCompletedCount}</span>
              /7 Topics Completed
            </span>
            <span>
              <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>
                {topicsCompletedCount + (isVisualDone ? 1 : 0) + (quizPassed ? 1 : 0)}
              </span>
              /9 Modules
            </span>
          </div>
        </div>

        {/* CARD 2 — MASTERY LEVEL */}
        <div
          id="summary-card-mastery-level"
          className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
              : 'bg-white border-blue-100 text-black shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold font-mono uppercase tracking-wider ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                MASTERY LEVEL
              </span>
              <Award className={`w-4 h-4 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'}`} />
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-4xl font-black font-mono tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {mastery.label}
              </span>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'}`}>
                Level <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{mastery.level}</span>/4
              </span>
            </div>

            {/* Horizontal Progress Bar */}
            <div className={`w-full h-2.5 rounded-full overflow-hidden mt-4 border ${
              isDarkMode ? 'bg-violet-950/50 border-violet-800/30' : 'bg-blue-50 border-blue-200'
            }`}>
              <div
                className="h-full rounded-full bg-[#6D3DF5] transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>

          <div className={`mt-5 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
            isDarkMode ? 'border-violet-950/50 text-[#94A3B8]' : 'border-blue-100 text-blue-700'
          }`}>
            <span>Rank: {mastery.rank}</span>
            <span>
              <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{topicsCompletedCount}</span>
              /7 Topics
            </span>
          </div>
        </div>

        {/* CARD 3 — TOTAL XP */}
        <div
          id="summary-card-total-xp"
          className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
              : 'bg-white border-blue-100 text-black shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold font-mono uppercase tracking-wider ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                TOTAL XP
              </span>
              <Zap className={`w-4 h-4 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'}`} />
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-4xl font-black font-mono tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {totalXP}
              </span>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'}`}>
                XP Earned
              </span>
            </div>

            {/* Horizontal Progress Bar */}
            <div className={`w-full h-2.5 rounded-full overflow-hidden mt-4 border ${
              isDarkMode ? 'bg-violet-950/50 border-violet-800/30' : 'bg-blue-50 border-blue-200'
            }`}>
              <div
                className="h-full rounded-full bg-[#6D3DF5] transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalXP / 190) * 100))}%` }}
              />
            </div>
          </div>

          <div className={`mt-5 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
            isDarkMode ? 'border-violet-950/50 text-[#94A3B8]' : 'border-blue-100 text-blue-700'
          }`}>
            <span>Tree DSA Score</span>
            <span>
              {quizScore ? (
                <>
                  <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{quizScore.score}</span>
                  /{quizScore.total} Quiz
                </>
              ) : (
                <>
                  <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{quizAnsweredCount}</span>
                  /10 Qs
                </>
              )}
            </span>
          </div>
        </div>

        {/* CARD 4 — LEARNING STREAK */}
        <div
          id="summary-card-learning-streak"
          className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
              : 'bg-white border-blue-100 text-black shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold font-mono uppercase tracking-wider ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                LEARNING STREAK
              </span>
              <Flame className={`w-4 h-4 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'}`} />
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-4xl font-black font-mono tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {streakDays}
              </span>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'}`}>
                {streakDays === 1 ? 'Day Active' : 'Days Active'}
              </span>
            </div>

            {/* Horizontal Progress Bar */}
            <div className={`w-full h-2.5 rounded-full overflow-hidden mt-4 border ${
              isDarkMode ? 'bg-violet-950/50 border-violet-800/30' : 'bg-blue-50 border-blue-200'
            }`}>
              <div
                className="h-full rounded-full bg-[#6D3DF5] transition-all duration-500"
                style={{ width: `${streakDays > 0 ? 100 : 0}%` }}
              />
            </div>
          </div>

          <div className={`mt-5 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
            isDarkMode ? 'border-violet-950/50 text-[#94A3B8]' : 'border-blue-100 text-blue-700'
          }`}>
            <span>Consistency</span>
            <span>{streakDays > 0 ? 'Active Today' : 'Start Today'}</span>
          </div>
        </div>
      </div>

      {/* VISUAL LESSONS SECTION */}
      <div
        id="progress-visual-lessons-section"
        className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
              isDarkMode
                ? 'bg-violet-950/60 border-violet-800/40 text-[#A78BFA]'
                : 'bg-violet-50 border-violet-200 text-[#6D3DF5]'
            }`}>
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] sm:text-[11px] font-bold font-mono tracking-wider uppercase ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                VISUAL LESSONS
              </div>
              <h2 className={`text-base sm:text-lg font-black tracking-tight mt-0.5 ${
                isDarkMode ? 'text-[#F8FAFC]' : 'text-black'
              }`}>
                1 VISUAL LESSON (<span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{isVideoCompleted ? '1' : '0'}</span> / 1 Completed)
              </h2>
            </div>
          </div>
        </div>

        {/* Single Video Lesson Item Card */}
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
            isDarkMode
              ? 'bg-[#090d18] border-violet-950/70 hover:border-violet-800/60'
              : 'bg-blue-50/40 border-blue-100 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              isDarkMode ? 'bg-[#A78BFA]' : 'bg-[#6D3DF5]'
            }`} />

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-bold text-sm sm:text-base truncate ${
                  isDarkMode ? 'text-slate-100' : 'text-black'
                }`}>
                  Introduction to Binary Search Trees & Tree Data Structures
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-blue-900'}`}>
                Masterclass video lesson covering fundamental tree and BST concepts.
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
            <button
              id="btn-watch-again-progress"
              onClick={handleWatchAgain}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border shadow-sm ${
                isDarkMode
                  ? 'bg-violet-950/70 hover:bg-violet-900/70 text-[#C4B5FD] border-violet-800/60 hover:border-violet-600 hover:text-white'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-950 hover:text-black border-blue-200 hover:border-blue-300'
              }`}
              title="Watch this video lesson on the Visualize page"
            >
              <span>Watch Again →</span>
            </button>

            <button
              id="btn-toggle-completed-progress"
              onClick={handleToggleCompleted}
              className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                isVideoCompleted
                  ? isDarkMode
                    ? 'text-[#A78BFA] bg-violet-950/60 border-violet-700/60 hover:bg-violet-900/60 font-semibold'
                    : 'text-black hover:text-black bg-blue-50 border-blue-300 hover:bg-blue-100 font-semibold'
                  : isDarkMode
                    ? 'text-slate-400 bg-slate-900/40 border-slate-800 hover:bg-slate-800/60'
                    : 'text-blue-800 hover:text-black bg-white border-blue-200 hover:bg-blue-50'
              }`}
              title="Click to toggle completed status"
            >
              {isVideoCompleted ? (
                <>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'}`} />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5 opacity-60" />
                  <span>Not completed</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENT BADGES & MILESTONES SECTION */}
      <div
        id="tree-dsa-achievements-section"
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
              isDarkMode
                ? 'bg-violet-950/60 border-violet-800/40 text-[#A78BFA]'
                : 'bg-violet-50 border-violet-200 text-[#6D3DF5]'
            }`}>
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] sm:text-[11px] font-bold font-mono tracking-wider uppercase ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                ACHIEVEMENTS & BADGES
              </div>
              <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5 ${
                isDarkMode ? 'text-[#F8FAFC]' : 'text-black'
              }`}>
                Tree DSA Milestones ({unlockedAchievementsCount} / {achievements.length} Unlocked)
              </h2>
            </div>
          </div>

          <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-full border self-start sm:self-auto ${
            isDarkMode
              ? 'bg-violet-950/60 text-[#A78BFA] border-violet-800/40'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}>
            {unlockedAchievementsCount === achievements.length
              ? 'All Badges Unlocked!'
              : `${achievements.length - unlockedAchievementsCount} Remaining`}
          </div>
        </div>

        {/* 8 Achievement Cards in a Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-5 rounded-3xl border flex flex-col justify-between transition-all duration-200 group ${
                  achievement.isUnlocked
                    ? isDarkMode
                      ? 'bg-[#090d18] border-violet-700/50 hover:border-violet-500 shadow-md shadow-violet-950/30'
                      : 'bg-blue-50/40 border-blue-200 hover:border-blue-300 shadow-sm'
                    : isDarkMode
                    ? 'bg-[#090d18]/60 border-violet-950/60 opacity-75 hover:opacity-100'
                    : 'bg-white/80 border-slate-200/80 opacity-75 hover:opacity-100'
                }`}
              >
                <div>
                  {/* Top row: Icon & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${
                        achievement.isUnlocked
                          ? isDarkMode
                            ? 'bg-violet-600/20 border-violet-500/40 text-[#A78BFA] shadow-sm shadow-violet-900/40'
                            : 'bg-[#6D3DF5]/10 border-[#6D3DF5]/30 text-[#6D3DF5]'
                          : isDarkMode
                          ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Unlocked / Locked Pill */}
                    {achievement.isUnlocked ? (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                          isDarkMode
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>UNLOCKED</span>
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                          isDarkMode
                            ? 'bg-slate-800/60 text-slate-400 border-slate-700/50'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <Lock className="w-3 h-3" />
                        <span>LOCKED</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`text-base font-extrabold tracking-tight mt-3 transition-colors ${
                      achievement.isUnlocked
                        ? isDarkMode
                          ? 'text-white group-hover:text-[#A78BFA]'
                          : 'text-slate-900'
                        : isDarkMode
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}
                  >
                    {achievement.title}
                  </h3>

                  <p
                    className={`text-xs mt-1.5 leading-relaxed ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {achievement.description}
                  </p>

                  {/* Requirement Box */}
                  <div
                    className={`mt-3 p-2.5 rounded-2xl border text-[11px] leading-relaxed ${
                      isDarkMode
                        ? 'bg-[#060913] border-violet-950/80 text-slate-300'
                        : 'bg-white border-blue-100 text-slate-600'
                    }`}
                  >
                    <span
                      className={`font-bold font-mono uppercase text-[10px] mr-1.5 ${
                        isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
                      }`}
                    >
                      Criteria:
                    </span>
                    <span>{achievement.requirement}</span>
                  </div>
                </div>

                {/* Footer: Category & XP Reward Pill */}
                <div
                  className={`mt-4 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
                    isDarkMode ? 'border-violet-950/50' : 'border-blue-100'
                  }`}
                >
                  <span
                    className={`font-semibold uppercase tracking-wider text-[10px] ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {achievement.category}
                  </span>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border ${
                      achievement.isUnlocked
                        ? isDarkMode
                          ? 'bg-violet-600/20 text-[#C4B5FD] border-violet-500/40'
                          : 'bg-[#6D3DF5]/10 text-[#6D3DF5] border-[#6D3DF5]/30'
                        : isDarkMode
                        ? 'bg-slate-800/40 text-slate-500 border-slate-700/30'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    +{achievement.xpReward} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LEARNING EVENT TIMELINE SECTION */}
      <div
        id="tree-dsa-learning-timeline-section"
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
              isDarkMode
                ? 'bg-violet-950/60 border-violet-800/40 text-[#A78BFA]'
                : 'bg-violet-50 border-violet-200 text-[#6D3DF5]'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] sm:text-[11px] font-bold font-mono tracking-wider uppercase ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                ACTIVITY & MILESTONES
              </div>
              <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5 ${
                isDarkMode ? 'text-[#F8FAFC]' : 'text-black'
              }`}>
                LEARNING EVENT TIMELINE
              </h2>
            </div>
          </div>

          <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-full border self-start sm:self-auto ${
            isDarkMode
              ? 'bg-violet-950/60 text-[#A78BFA] border-violet-800/40'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}>
            Showing {timelineItems.length} Verified {timelineItems.length === 1 ? 'Event' : 'Events'}
          </div>
        </div>

        {/* Compact Event Layout */}
        <div className="space-y-3">
          {timelineItems.map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => item.navTarget && onNavigate(item.navTarget, item.topicId)}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer group ${
                  isDarkMode
                    ? 'bg-[#090d18] border-violet-950/70 hover:border-violet-700/60 shadow-xs'
                    : 'bg-blue-50/30 border-blue-100 hover:border-blue-300 shadow-xs'
                }`}
              >
                {/* Left: Icon and Details */}
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                      item.type === 'joined'
                        ? isDarkMode
                          ? 'bg-violet-950/50 border-violet-800/50 text-[#C4B5FD]'
                          : 'bg-violet-50 border-violet-200 text-[#6D3DF5]'
                        : item.type === 'visualize'
                        ? isDarkMode
                          ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                        : isDarkMode
                        ? 'bg-violet-950/40 border-violet-800/40 text-[#A78BFA]'
                        : 'bg-blue-50 border-blue-200 text-[#6D3DF5]'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                        isDarkMode ? 'text-[#F8FAFC] group-hover:text-[#C4B5FD]' : 'text-slate-900 group-hover:text-[#6D3DF5]'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-[11px] sm:text-xs mt-0.5 leading-snug line-clamp-1 sm:line-clamp-2 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right: Timestamp and XP Badge */}
                <div className="shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-3">
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono whitespace-nowrap ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {item.timestampStr}
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold whitespace-nowrap border ${
                      isDarkMode
                        ? 'bg-violet-950/60 text-[#A78BFA] border-violet-800/40'
                        : 'bg-violet-50 text-[#6D3DF5] border-violet-200'
                    }`}
                  >
                    +{item.xp} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
