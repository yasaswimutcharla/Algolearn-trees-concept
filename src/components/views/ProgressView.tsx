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
  GraduationCap,
  Globe,
  GitBranch,
  Target,
  Award,
  Activity,
  Clock,
  Lock,
  Check,
  Flame
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

type ModuleCategory = 'all' | 'fundamentals' | 'types' | 'bst' | 'traversals' | 'applications';

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
    title: '01. WHAT IS A TREE?',
    category: 'fundamentals',
    categoryLabel: 'Fundamentals',
    description: 'Understand how trees organize data in a simple hierarchy.',
    criteria: 'Understand non-linear hierarchical node organization, roots, edges, and leaf structures.',
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
    description: 'Learn the basic words used when talking about trees.',
    criteria: 'Master the 15 standard terms: node, root, edge, parent, child, leaf, internal node, degree, level, height, depth, subtree, siblings, ancestor, and descendant.',
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
    description: 'Learn the three main types of trees: General Tree, Binary Tree, and Binary Search Tree.',
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
    description: 'Learn how nodes can have up to two children.',
    criteria: 'Master binary tree properties, left/right child pointers, and classifications (Strictly Binary, Full, Complete, Perfect, Degenerate).',
    difficulty: 'Beginner',
    estTime: '3 min read',
    navTarget: 'learn',
    topicId: 'binary-tree',
    icon: GitBranch
  },
  {
    id: 'TOPIC-05',
    title: '05. BINARY SEARCH TREE',
    category: 'bst',
    categoryLabel: 'BST',
    description: 'Learn how a BST keeps values organized (Left < Parent < Right).',
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
    description: 'Learn how we visit every node in a tree.',
    criteria: 'Master Preorder (Root → Left → Right), Inorder (Left → Root → Right), Postorder (Left → Right → Root), and Level Order (BFS).',
    difficulty: 'Beginner',
    estTime: '3 min read',
    navTarget: 'learn',
    topicId: 'traversals',
    icon: Zap
  },
  {
    id: 'TOPIC-07',
    title: '07. TREE APPLICATIONS',
    category: 'applications',
    categoryLabel: 'Applications',
    description: 'See where trees are useful in real life.',
    criteria: 'Explore practical applications: operating system file structures, browser HTML DOM trees, database indexing, and AI decision trees.',
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
  category: string;
  type: 'learn' | 'visualize' | 'quiz';
  icon: React.FC<{ className?: string }>;
  statusText: string;
  navTarget: NavItem;
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
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory>('all');
  const [localIsVideoCompleted, setLocalIsVideoCompleted] = useState<boolean>(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState<boolean>(false);
  const [localResetTick, setLocalResetTick] = useState<number>(0);

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
    try {
      localStorage.removeItem('tree_dsa_learning_streak');
    } catch {}
    onResetProgress();
  };

  // Real App Calculations
  const totalTopicsCount = CURRICULUM_MODULES.length; // 7
  const topicsCompletedCount = completedTopics.length;
  const isVisualDone = Boolean(isVideoCompleted || completedVisualizations.length > 0);
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

  // Real Mastery Level from progress state
  const getMasteryLevel = () => {
    if (overallPercentage >= 85) return { label: 'Master', level: 4, rank: 'Advanced' };
    if (overallPercentage >= 50) return { label: 'Proficient', level: 3, rank: 'Senior' };
    if (overallPercentage >= 20) return { label: 'Intermediate', level: 2, rank: 'Developing' };
    return { label: 'Beginner', level: 1, rank: 'Novice' };
  };
  const mastery = getMasteryLevel();

  // TreeDSA Achievements from real progress state
  const achievements: TreeAchievement[] = [
    {
      id: 'ach-tree-fundamentals',
      title: 'Tree Fundamentals',
      category: 'Fundamentals',
      description: 'Complete the fundamental Tree concepts.',
      requirement: 'Complete Topic 01: What is a Tree?',
      xpReward: 25,
      isUnlocked: completedTopics.includes('basics'),
      icon: Layers
    },
    {
      id: 'ach-tree-terminology-master',
      title: 'Tree Terminology Master',
      category: 'Fundamentals',
      description: 'Master important Tree terminology and relationships.',
      requirement: 'Complete Topic 02: Tree Terminology',
      xpReward: 25,
      isUnlocked: completedTopics.includes('terminology'),
      icon: BookOpen
    },
    {
      id: 'ach-tree-types-explorer',
      title: 'Tree Types Explorer',
      category: 'Tree Types',
      description: 'Learn the different types and classifications of Trees.',
      requirement: 'Complete Topic 03: Types of Trees',
      xpReward: 25,
      isUnlocked: completedTopics.includes('types'),
      icon: BrainCircuit
    },
    {
      id: 'ach-binary-tree-learner',
      title: 'Binary Tree Learner',
      category: 'Binary Trees',
      description: 'Understand Binary Tree concepts and structures.',
      requirement: 'Complete Topic 04: Binary Tree',
      xpReward: 25,
      isUnlocked: completedTopics.includes('binary-tree'),
      icon: GitBranch
    },
    {
      id: 'ach-bst-explorer',
      title: 'BST Explorer',
      category: 'BST',
      description: 'Master Binary Search Tree concepts and ordering rules.',
      requirement: 'Complete Topic 05: Binary Search Tree',
      xpReward: 30,
      isUnlocked: completedTopics.includes('bst'),
      icon: Terminal
    },
    {
      id: 'ach-tree-visualizer',
      title: 'Tree Visualizer',
      category: 'Visualization',
      description: 'Complete Tree visualization activities.',
      requirement: 'Complete 1 Visual Lesson in Visualize',
      xpReward: 30,
      isUnlocked: isVisualDone,
      icon: Video
    },
    {
      id: 'ach-tree-game-challenger',
      title: 'Tree Game Challenger',
      category: 'Game & Challenge',
      description: 'Complete TreeDSA game challenges.',
      requirement: 'Answer 5 or more challenge questions',
      xpReward: 35,
      isUnlocked: quizAnsweredCount >= 5 || (quizScore !== null && quizScore.score >= 5),
      icon: Award
    },
    {
      id: 'ach-bst-quiz-master',
      title: 'BST Quiz Master',
      category: 'Evaluation',
      description: 'Successfully complete the BST Quiz.',
      requirement: 'Score at least 7/10 on the Quiz',
      xpReward: 50,
      isUnlocked: quizPassed,
      icon: Trophy
    }
  ];

  const unlockedAchievementsCount = achievements.filter((a) => a.isUnlocked).length;

  // Real TreeDSA Activity Timeline from actual state
  const timelineItems: TimelineItem[] = [];

  completedTopics.forEach((topicId) => {
    const mod = CURRICULUM_MODULES.find((m) => m.topicId === topicId);
    if (mod) {
      timelineItems.push({
        id: `timeline-learn-${topicId}`,
        title: `Completed ${mod.title}`,
        description: mod.criteria,
        category: mod.categoryLabel,
        type: 'learn',
        icon: mod.icon,
        statusText: 'Verified Topic • +10 XP',
        navTarget: 'learn',
        topicId: mod.topicId
      });
    }
  });

  if (isVisualDone) {
    timelineItems.push({
      id: 'timeline-viz',
      title: 'Completed Visual Masterclass',
      description: 'Finished Introduction to Binary Search Trees & Tree Data Structures.',
      category: 'Visualize',
      type: 'visualize',
      icon: Video,
      statusText: 'Visual Lesson Mastered • +20 XP',
      navTarget: 'visualize'
    });
  }

  if (quizScore !== null) {
    timelineItems.push({
      id: 'timeline-quiz-score',
      title: `Completed BST Quiz (${quizScore.score}/${quizScore.total})`,
      description: quizScore.score >= 7 ? 'Successfully passed the BST evaluation quiz with distinction.' : 'Completed BST evaluation quiz attempt.',
      category: 'Quiz',
      type: 'quiz',
      icon: Trophy,
      statusText: quizScore.score >= 7 ? 'Passed with Distinction • +50 XP' : 'Attempt Recorded',
      navTarget: 'quiz'
    });
  } else if (quizAnsweredCount > 0) {
    timelineItems.push({
      id: 'timeline-quiz-progress',
      title: `Interactive Game Challenge Progress (${quizAnsweredCount}/10 Solved)`,
      description: 'Actively solving TreeDSA challenge questions in the interactive quiz.',
      category: 'Challenge',
      type: 'quiz',
      icon: Award,
      statusText: `${quizAnsweredCount} Questions Solved`,
      navTarget: 'quiz'
    });
  }

  // Helper to determine curriculum module status
  const getModuleProgress = (mod: CurriculumModule): { status: 'Not Started' | 'In Progress' | 'Completed'; progressPct: number } => {
    if (mod.topicId && completedTopics.includes(mod.topicId)) {
      return { status: 'Completed', progressPct: 100 };
    }
    return { status: 'Not Started', progressPct: 0 };
  };

  // Filter modules
  const filteredModules = CURRICULUM_MODULES.filter((mod) => {
    if (selectedCategory === 'all') return true;
    return mod.category === selectedCategory;
  });

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
              <span>TREEDSA LEARNING PROGRESS</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
              isDarkMode ? 'text-[#F8FAFC]' : 'text-black'
            }`}>
              TreeDSA Learning Progress
            </h1>
            <p className={`text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-[#E2E8F0]' : 'text-blue-900'
            }`}>
              Track your Tree DSA learning progress, achievements, practice, and mastery.
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
                  TreeDSA Progress & History
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
                TreeDSA
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
              /7 Topics
            </span>
            <span>
              <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{isVisualDone ? '1' : '0'}</span>
              /1 Viz
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
            <span>TreeDSA Score</span>
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

      {/* CURRICULUM MODULES WITH CATEGORY TABS */}
      <div
        id="treedsa-curriculum-modules-section"
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2.5 ${
              isDarkMode ? 'text-[#F8FAFC]' : 'text-black'
            }`}>
              <GraduationCap className={`w-6 h-6 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'}`} />
              <span>Tree DSA Curriculum Modules</span>
            </h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#E2E8F0]' : 'text-blue-900'}`}>
              Filter by syllabus category to review specific theoretical and hands-on modules.
            </p>
          </div>

          <div className={`text-xs font-mono font-semibold ${
            isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'
          }`}>
            Showing <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{filteredModules.length}</span> of <span className={isDarkMode ? 'text-white font-bold' : 'text-slate-900 font-bold'}>{CURRICULUM_MODULES.length}</span> modules
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              { id: 'all', label: 'All Topics' },
              { id: 'fundamentals', label: 'Fundamentals' },
              { id: 'types', label: 'Tree Types' },
              { id: 'bst', label: 'BST' },
              { id: 'traversals', label: 'Traversals' },
              { id: 'applications', label: 'Applications' }
            ] as { id: ModuleCategory; label: string }[]
          ).map((tab) => {
            const isSelected = selectedCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40 ring-1 ring-violet-400/40'
                      : 'bg-[#6D3DF5] text-white shadow-md shadow-[#6D3DF5]/30'
                    : isDarkMode
                    ? 'bg-[#090d18] hover:bg-violet-950/40 text-[#94A3B8] border border-violet-950/80 hover:border-violet-700/40 hover:text-[#F8FAFC]'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 hover:text-black'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modules List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredModules.map((module) => {
            const { status, progressPct } = getModuleProgress(module);
            const isCompleted = status === 'Completed';

            return (
              <div
                key={module.id}
                className={`w-full p-5 sm:p-6 rounded-3xl border transition-all duration-200 group ${
                  isDarkMode
                    ? isCompleted
                      ? 'bg-[#090d18] border-violet-800/40 hover:border-violet-500/60 shadow-md'
                      : 'bg-[#090d18] border-violet-950/70 hover:border-violet-600/50 hover:shadow-lg hover:shadow-violet-950/40'
                    : isCompleted
                    ? 'bg-blue-50/40 border-blue-200 hover:border-blue-300'
                    : 'bg-blue-50/30 border-blue-100 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* LEFT & CENTER */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase ${
                        isDarkMode
                          ? 'bg-violet-600/20 text-[#A78BFA] border border-violet-500/30'
                          : 'bg-[#6D3DF5]/10 text-[#6D3DF5] border border-[#6D3DF5]/30'
                      }`}>
                        {module.id}
                      </span>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                          isDarkMode
                            ? 'bg-violet-950/60 text-[#A78BFA] border border-violet-800/40'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {module.categoryLabel}
                      </span>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 border ${
                          status === 'Completed'
                            ? isDarkMode
                              ? 'bg-violet-950/60 text-[#A78BFA] border-violet-700/50'
                              : 'bg-violet-50 text-[#6D3DF5] border-violet-200'
                            : isDarkMode
                            ? 'bg-slate-800/40 text-[#94A3B8] border-slate-700/40'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {status === 'Completed' ? (
                          <CheckCircle2 className={`w-3 h-3 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'}`} />
                        ) : (
                          <Circle className="w-3 h-3 opacity-40" />
                        )}
                        <span>{status}</span>
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-extrabold uppercase tracking-tight transition-colors ${
                      isDarkMode
                        ? 'text-[#F8FAFC] group-hover:text-[#A78BFA]'
                        : 'text-black group-hover:text-black'
                    }`}>
                      {module.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 max-w-3xl ${
                      isDarkMode ? 'text-[#E2E8F0]' : 'text-blue-900'
                    }`}>
                      {module.description}
                    </p>

                    <div
                      className={`mt-3 p-2.5 sm:px-3 sm:py-2 rounded-2xl border text-xs leading-relaxed inline-block max-w-3xl ${
                        isDarkMode
                          ? 'bg-[#060913] border-violet-950/80 text-[#E2E8F0]'
                          : 'bg-white border-blue-100 text-blue-900'
                      }`}
                    >
                      <span className={`font-bold font-mono uppercase mr-1.5 ${
                        isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
                      }`}>
                        Criteria:
                      </span>
                      <span>{module.criteria}</span>
                    </div>
                  </div>

                  {/* RIGHT AREA */}
                  <div className={`lg:w-64 shrink-0 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 ${
                    isDarkMode ? 'border-violet-950/40' : 'border-blue-100'
                  }`}>
                    <div className="w-full sm:w-auto lg:w-full lg:text-right">
                      <div className="flex items-center justify-between lg:justify-end gap-3 mb-1.5">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                          isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'
                        }`}>
                          Progress
                        </span>
                        <span className={`text-xs font-mono font-bold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {progressPct}%
                        </span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden border ${
                        isDarkMode
                          ? 'bg-violet-950/60 border-violet-800/40'
                          : 'bg-blue-100 border-blue-200'
                      }`}>
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            status === 'Completed'
                              ? isDarkMode ? 'bg-violet-500 shadow-sm shadow-violet-500/50' : 'bg-[#6D3DF5] shadow-sm shadow-[#6D3DF5]/30'
                              : isDarkMode ? 'bg-violet-600' : 'bg-[#6D3DF5]'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate(module.navTarget, module.topicId)}
                      className={`w-full sm:w-auto lg:w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shrink-0 ${
                        isCompleted
                          ? isDarkMode
                            ? 'bg-violet-950/60 hover:bg-violet-900/60 text-[#A78BFA] border border-violet-700/50 hover:border-violet-500'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-200 hover:text-black'
                          : isDarkMode
                          ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/50 hover:scale-[1.02] ring-1 ring-violet-400/30'
                          : 'bg-[#6D3DF5] hover:bg-[#5b2fe0] text-white shadow-md shadow-[#6D3DF5]/30 hover:scale-[1.02]'
                      }`}
                    >
                      <span>{isCompleted ? 'Review Module →' : 'Start Module →'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
