import React, { useState } from 'react';
import { NavItem, TopicId } from '../../types';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Circle,
  ArrowRight,
  Play,
  RotateCcw,
  BookOpen,
  Layers,
  Activity,
  Terminal,
  Trophy,
  Sparkles,
  Zap,
  Check,
  Video,
  Clock,
  ExternalLink,
  Flame,
  BrainCircuit,
  GraduationCap,
  Globe,
  GitBranch,
  Search,
  Trash2,
  Share2,
  Network,
  Upload,
  FileVideo,
  X
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
  id: string; // e.g. "TOPIC-01"
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
  const [isResetDone, setIsResetDone] = useState<boolean>(false);
  const [localIsVideoCompleted, setLocalIsVideoCompleted] = useState<boolean>(false);
  const [localUploadedVideoUrl, setLocalUploadedVideoUrl] = useState<string | null>(null);
  const [localUploadedVideoName, setLocalUploadedVideoName] = useState<string>('');
  const [localUploadedVideoSize, setLocalUploadedVideoSize] = useState<string>('');
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleResetClick = () => {
    setLocalIsVideoCompleted(false);
    onResetProgress();
    setIsResetDone(true);
    setTimeout(() => {
      setIsResetDone(false);
    }, 1500);
  };

  const uploadedVideoUrl = propVideoUrl !== undefined ? propVideoUrl : localUploadedVideoUrl;
  const uploadedVideoName = propVideoName !== undefined ? propVideoName : localUploadedVideoName;
  const uploadedVideoSize = propVideoSize !== undefined ? propVideoSize : localUploadedVideoSize;
  const isVideoCompleted = propVideoCompleted !== undefined ? propVideoCompleted : localIsVideoCompleted;

  // Clean up local blob URL on unmount or video change only if locally managed
  React.useEffect(() => {
    return () => {
      if (propVideoUrl === undefined && localUploadedVideoUrl) {
        URL.revokeObjectURL(localUploadedVideoUrl);
      }
    };
  }, [propVideoUrl, localUploadedVideoUrl]);

  const handleVideoFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|mov|ogg|mkv)$/i)) {
      alert('Please select a valid video file (MP4, WebM, MOV, etc.).');
      return;
    }
    if (onUploadVideo) {
      onUploadVideo(file);
    } else {
      if (localUploadedVideoUrl) {
        URL.revokeObjectURL(localUploadedVideoUrl);
      }
      const url = URL.createObjectURL(file);
      setLocalUploadedVideoUrl(url);
      setLocalUploadedVideoName(file.name);
      setLocalUploadedVideoSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
    }
    setIsPlayerOpen(true);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleVideoFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleRemoveVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveVideo) {
      onRemoveVideo();
    } else {
      if (localUploadedVideoUrl) {
        URL.revokeObjectURL(localUploadedVideoUrl);
      }
      setLocalUploadedVideoUrl(null);
      setLocalUploadedVideoName('');
      setLocalUploadedVideoSize('');
    }
    setIsPlayerOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

  // Dynamic calculations
  const totalTopicsCount = CURRICULUM_MODULES.length;
  const topicsCompletedCount = completedTopics.length;
  const vizCompletedCount = Math.min(6, completedVisualizations.length);
  const quizAttempted = quizScore !== null;
  const quizPassed = quizScore !== null && quizScore.score >= 7;

  // Helper to determine module completion and progress percentage
  const getModuleProgress = (mod: CurriculumModule): { status: 'Not Started' | 'In Progress' | 'Completed'; progressPct: number } => {
    if (mod.topicId && completedTopics.includes(mod.topicId)) {
      return { status: 'Completed', progressPct: 100 };
    }
    return { status: 'Not Started', progressPct: 0 };
  };

  // Compute total completed modules
  const completedModulesCount = CURRICULUM_MODULES.filter((m) => getModuleProgress(m).status === 'Completed').length;
  const overallPercentage = Math.round((completedModulesCount / CURRICULUM_MODULES.length) * 100);

  // Master challenges calculation (out of 4)
  let masterChallengesCount = 0;
  if (topicsCompletedCount >= 3) masterChallengesCount += 1;
  if (topicsCompletedCount >= 7) masterChallengesCount += 1;
  if (quizScore && quizScore.score >= 7) masterChallengesCount += 1;
  if (topicsCompletedCount === 7 && quizScore && quizScore.score >= 9) masterChallengesCount += 1;

  // Recommended next step logic
  const firstIncompleteModule = CURRICULUM_MODULES.find((m) => getModuleProgress(m).status !== 'Completed') || CURRICULUM_MODULES[CURRICULUM_MODULES.length - 1];

  // Filter modules
  const filteredModules = CURRICULUM_MODULES.filter((mod) => {
    if (selectedCategory === 'all') return true;
    return mod.category === selectedCategory;
  });

  const getCategoryCount = (cat: ModuleCategory) => {
    if (cat === 'all') return CURRICULUM_MODULES.length;
    return CURRICULUM_MODULES.filter((m) => m.category === cat).length;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2">
      {/* Top Header Card */}
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
              <span>TREE DSA CURRICULUM</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
              isDarkMode ? 'text-[#F8FAFC]' : 'text-black'
            }`}>
              Tree DSA Curriculum & Progress
            </h1>
            <p className={`text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-[#E2E8F0]' : 'text-blue-900'
            }`}>
              Track your journey through tree concepts, algorithms, visualizations, and interactive challenges.
            </p>
          </div>

          {/* Reset Action */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              id="reset-progress-btn"
              onClick={handleResetClick}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                isDarkMode
                  ? 'bg-violet-950/40 hover:bg-rose-950/40 border-violet-800/40 hover:border-rose-500/50 text-[#94A3B8] hover:text-rose-300 shadow-md'
                  : 'bg-blue-50 hover:bg-rose-50 border-blue-200 hover:border-rose-300 text-blue-900 hover:text-rose-900'
              }`}
              title="Reset learning analytics to starting state"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isResetDone ? 'rotate-180 transition-transform duration-500' : ''}`} />
              <span>{isResetDone ? 'Reset Done' : 'Reset Progress'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Card Progress Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1 — OVERALL COMPLETION */}
        <div
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
                OVERALL COMPLETION
              </span>
              <span className={`text-xs font-semibold font-mono ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                {completedModulesCount} of {CURRICULUM_MODULES.length} Modules
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                {overallPercentage}%
              </span>
              <span className={`text-xs font-medium ${
                isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'
              }`}>Completed</span>
            </div>

            {/* Horizontal Progress Bar */}
            <div className={`w-full h-3 rounded-full overflow-hidden mt-5 p-0.5 border ${
              isDarkMode
                ? 'bg-violet-950/50 border-violet-800/30'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-700 via-[#6D3DF5] to-violet-400 transition-all duration-700 shadow-sm shadow-violet-500/50"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>

          <div className={`mt-6 pt-4 border-t flex items-center justify-between text-[11px] font-mono ${
            isDarkMode ? 'border-violet-950/50 text-[#94A3B8]' : 'border-blue-100 text-blue-700'
          }`}>
            <span className="flex items-center gap-1.5 font-semibold">
              <span className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-[#A78BFA]' : 'bg-[#6D3DF5]'}`} />
              0% Beginner
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <span className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-[#A78BFA]' : 'bg-[#6D3DF5]'}`} />
              100% Master
            </span>
          </div>
        </div>

        {/* CARD 2 — PERFORMANCE STATS */}
        <div
          className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
              : 'bg-white border-blue-100 text-black shadow-sm'
          }`}
        >
          <div>
            <div className={`text-[11px] font-bold font-mono uppercase tracking-wider mb-4 ${
              isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
            }`}>
              PERFORMANCE STATS
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              {/* Stat 1: Topics Mastered */}
              <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-[#090d18] border-violet-950/70' : 'bg-blue-50/50 border-blue-100'}`}>
                <div className={`text-xl sm:text-2xl font-black font-mono ${
                  isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
                }`}>
                  {String(topicsCompletedCount).padStart(2, '0')}
                </div>
                <div className={`text-[10px] font-bold font-mono tracking-wider uppercase mt-1 ${
                  isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'
                }`}>
                  MASTERED
                </div>
              </div>

              {/* Stat 2: Modules Completed */}
              <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-[#090d18] border-violet-950/70' : 'bg-blue-50/50 border-blue-100'}`}>
                <div className={`text-xl sm:text-2xl font-black font-mono ${
                  isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
                }`}>
                  {String(completedModulesCount).padStart(2, '0')} / {CURRICULUM_MODULES.length}
                </div>
                <div className={`text-[10px] font-bold font-mono tracking-wider uppercase mt-1 ${
                  isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'
                }`}>
                  MODULES
                </div>
              </div>

              {/* Stat 3: Quiz Score */}
              <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-[#090d18] border-violet-950/70' : 'bg-blue-50/50 border-blue-100'}`}>
                <div className={`text-xl sm:text-2xl font-black font-mono ${
                  isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
                }`}>
                  {quizScore ? `${String(quizScore.score).padStart(2, '0')}/${String(quizScore.total).padStart(2, '0')}` : '00/10'}
                </div>
                <div className={`text-[10px] font-bold font-mono tracking-wider uppercase mt-1 ${
                  isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'
                }`}>
                  QUIZ SCORE
                </div>
              </div>
            </div>
          </div>

          {/* Master Challenges Highlight */}
          <div className={`mt-4 pt-3 border-t ${isDarkMode ? 'border-violet-950/50' : 'border-blue-100'}`}>
            <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
              isDarkMode
                ? 'bg-violet-950/40 border-violet-800/40 text-[#E2E8F0]'
                : 'bg-blue-50 border-blue-200 text-black'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-base">🏆</span>
                <span className={isDarkMode ? 'text-[#E2E8F0]' : 'text-black'}>Master Challenges:</span>
              </div>
              <span className={`font-mono font-bold ${
                isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
              }`}>
                {masterChallengesCount} / 4 Challenges
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3 — RECOMMENDED NEXT STEP */}
        <div
          className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
              : 'bg-white border-blue-100 text-black shadow-sm'
          }`}
        >
          <div>
            <div className={`flex items-center gap-2 text-[11px] font-bold font-mono uppercase tracking-wider mb-2 ${
              isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>RECOMMENDED NEXT STEP</span>
            </div>

            <h3 className={`text-lg font-extrabold tracking-tight mt-1 ${
              isDarkMode ? 'text-[#F8FAFC]' : 'text-black'
            }`}>
              {firstIncompleteModule.id}: {firstIncompleteModule.title}
            </h3>

            <p className={`text-xs leading-relaxed mt-2.5 line-clamp-3 ${
              isDarkMode ? 'text-[#E2E8F0]' : 'text-blue-900'
            }`}>
              {firstIncompleteModule.description}
            </p>
          </div>

          <div className="mt-5">
            <button
              onClick={() => onNavigate(firstIncompleteModule.navTarget, firstIncompleteModule.topicId)}
              className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg ${
                isDarkMode
                  ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/50 ring-1 ring-violet-400/40 hover:scale-[1.02]'
                  : 'bg-[#6D3DF5] hover:bg-[#5b2fe0] text-white shadow-md shadow-[#6D3DF5]/30 hover:scale-[1.02]'
              }`}
            >
              <span>CONTINUE LEARNING →</span>
            </button>
          </div>
        </div>
      </div>

      {/* VISUAL LESSONS SECTION - MATCHING REFERENCE DESIGN */}
      <div
        id="progress-visual-lessons-section"
        className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-[#F8FAFC] shadow-xl shadow-violet-950/20'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        {/* Top Header Row matching screenshot */}
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
                1 VISUAL LESSON ({isVideoCompleted ? '1' : '0'} / 1 Completed)
              </h2>
            </div>
          </div>
        </div>

        {/* Single Video Lesson Item Card matching reference screenshot */}
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
                  {uploadedVideoName ? uploadedVideoName : 'Introduction to Binary Search Trees & Tree Data Structures'}
                </span>
                {uploadedVideoSize && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isDarkMode
                      ? 'bg-violet-950/60 text-[#A78BFA] border-violet-800/40'
                      : 'bg-violet-50 text-[#6D3DF5] border-violet-200'
                  }`}>
                    {uploadedVideoSize}
                  </span>
                )}
              </div>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-blue-900'}`}>
                {uploadedVideoUrl 
                  ? 'Custom video ready to play on the Visualize page.' 
                  : 'Masterclass video lesson covering fundamental tree and BST concepts.'}
              </p>
            </div>
          </div>

          {/* Right Action Controls: Watch Again and Completion Pill */}
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
            {/* Watch Again button navigating to Visualize page to rewatch the video */}
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

            {/* Status Pill matching reference screenshot */}
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

          {/* Module Counter */}
          <div className={`text-xs font-mono font-semibold ${
            isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'
          }`}>
            Showing {filteredModules.length} of {CURRICULUM_MODULES.length} modules
          </div>
        </div>

        {/* Category Tabs: All Topics, Fundamentals, Tree Types, BST, Traversals, Applications */}
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

        {/* Modules List: Single-column wide horizontal rectangular cards */}
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
                  {/* LEFT & CENTER: Badges, Title, Description, Criteria */}
                  <div className="flex-1 min-w-0">
                    {/* TOP/LEFT: Module ID badge, Category badge, Status badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {/* Module ID Badge */}
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase ${
                        isDarkMode
                          ? 'bg-violet-600/20 text-[#A78BFA] border border-violet-500/30'
                          : 'bg-[#6D3DF5]/10 text-[#6D3DF5] border border-[#6D3DF5]/30'
                      }`}>
                        {module.id}
                      </span>

                      {/* Category Badge */}
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                          isDarkMode
                            ? 'bg-violet-950/60 text-[#A78BFA] border border-violet-800/40'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {module.categoryLabel}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 border ${
                          status === 'Completed'
                            ? isDarkMode
                              ? 'bg-violet-950/60 text-[#A78BFA] border-violet-700/50'
                              : 'bg-violet-50 text-[#6D3DF5] border-violet-200'
                            : status === 'In Progress'
                            ? isDarkMode
                              ? 'bg-violet-950/40 text-violet-300 border-violet-800/40'
                              : 'bg-violet-50/60 text-violet-700 border-violet-200'
                            : isDarkMode
                            ? 'bg-slate-800/40 text-[#94A3B8] border-slate-700/40'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {status === 'Completed' ? (
                          <CheckCircle2 className={`w-3 h-3 ${isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'}`} />
                        ) : status === 'In Progress' ? (
                          <span className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-violet-400' : 'bg-[#6D3DF5]'}`} />
                        ) : (
                          <Circle className="w-3 h-3 opacity-40" />
                        )}
                        <span>{status}</span>
                      </span>
                    </div>

                    {/* MAIN TITLE: Large uppercase module title */}
                    <h3 className={`text-base sm:text-lg font-extrabold uppercase tracking-tight transition-colors ${
                      isDarkMode
                        ? 'text-[#F8FAFC] group-hover:text-[#A78BFA]'
                        : 'text-black group-hover:text-black'
                    }`}>
                      {module.title}
                    </h3>

                    {/* Short beginner-friendly description */}
                    <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 max-w-3xl ${
                      isDarkMode ? 'text-[#E2E8F0]' : 'text-blue-900'
                    }`}>
                      {module.description}
                    </p>

                    {/* Criteria Section */}
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

                  {/* RIGHT AREA: Progress Info & Start Module Button */}
                  <div className={`lg:w-64 shrink-0 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 ${
                    isDarkMode ? 'border-violet-950/40' : 'border-blue-100'
                  }`}>
                    {/* Progress label, % and bar */}
                    <div className="w-full sm:w-auto lg:w-full lg:text-right">
                      <div className="flex items-center justify-between lg:justify-end gap-3 mb-1.5">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                          isDarkMode ? 'text-[#94A3B8]' : 'text-blue-700'
                        }`}>
                          Progress
                        </span>
                        <span className={`text-xs font-mono font-bold ${
                          isDarkMode ? 'text-[#A78BFA]' : 'text-[#6D3DF5]'
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
                              : status === 'In Progress'
                              ? isDarkMode ? 'bg-violet-400' : 'bg-violet-500'
                              : isDarkMode ? 'bg-violet-600' : 'bg-[#6D3DF5]'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Start / Review Module Button */}
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

