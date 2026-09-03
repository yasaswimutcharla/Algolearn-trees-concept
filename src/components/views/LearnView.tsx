import React, { useState, useEffect } from 'react';
import { TopicId } from '../../types';
import {
  TREE_TOPICS,
  TERMINOLOGY_LIST,
  TREE_TYPES_LIST,
  TRAVERSALS_LIST
} from '../../data/treeData';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import {
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  ListFilter,
  Layers,
  Check,
  HelpCircle,
  FolderTree,
  Search,
  Database,
  Globe,
  GitBranch,
  ArrowRight,
  RotateCcw,
  Compass,
  X,
  ExternalLink
} from 'lucide-react';

// Destination URL for existing separate BST learning application
const BST_APP_URL =
  ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_BST_APP_URL) ||
  '[PASTE MY EXISTING BST APP URL HERE]';

interface LearnViewProps {
  currentTopicId: TopicId;
  onSelectTopic: (topicId: TopicId) => void;
  isDarkMode: boolean;
  completedTopics?: TopicId[];
  onMarkTopicCompleted?: (topicId: TopicId) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  currentTopicId,
  onSelectTopic,
  isDarkMode,
  completedTopics = [],
  onMarkTopicCompleted
}) => {
  const [showTerminologyArchitecture, setShowTerminologyArchitecture] = useState<boolean>(false);
  const [showBinaryTreeArchitecture, setShowBinaryTreeArchitecture] = useState<boolean>(false);
  const [isMobileSyllabusOpen, setIsMobileSyllabusOpen] = useState<boolean>(false);

  // Mini-practice interactive state per topic
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
  const [hasSubmittedPractice, setHasSubmittedPractice] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showGuidedSolve, setShowGuidedSolve] = useState<boolean>(false);
  const [guidedStepIndex, setGuidedStepIndex] = useState<number>(0);

  // When switching topic, reset architecture and practice state
  useEffect(() => {
    setShowTerminologyArchitecture(false);
    setShowBinaryTreeArchitecture(false);
    setIsMobileSyllabusOpen(false);
    setSelectedPracticeOption(null);
    setHasSubmittedPractice(false);
    setShowHint(false);
    setShowGuidedSolve(false);
    setGuidedStepIndex(0);
  }, [currentTopicId]);

  const currentTopic =
    TREE_TOPICS.find((t) => t.id === currentTopicId) || TREE_TOPICS[0];
  const currentIndex = TREE_TOPICS.findIndex((t) => t.id === currentTopicId);

  const prevTopic = currentIndex > 0 ? TREE_TOPICS[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < TREE_TOPICS.length - 1 ? TREE_TOPICS[currentIndex + 1] : null;

  const isCurrentCompleted = completedTopics.includes(currentTopicId);

  const handleToggleCompleted = () => {
    if (onMarkTopicCompleted) {
      onMarkTopicCompleted(currentTopicId);
    }
  };

  const TOPIC_SUBTITLES: Record<TopicId, string> = {
    basics: 'Hierarchy & Simple Branching',
    terminology: '15 Essential Terms & Relationships',
    types: 'General Tree, Binary Tree & BST',
    'binary-tree': '5 Types of Binary Trees & Node Branching',
    bst: 'Left Smaller, Right Larger',
    traversals: 'Preorder, Inorder & Postorder',
    applications: 'Files, DOM & Search Engines'
  };

  const completedCount = completedTopics.length;

  return (
    <div className="max-w-7xl mx-auto py-2">
      {/* Mobile Table of Contents Bar */}
      <div className="lg:hidden mb-4">
        <button
          id="mobile-toc-toggle-btn"
          onClick={() => setIsMobileSyllabusOpen(!isMobileSyllabusOpen)}
          className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/50 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-violet-600/30 text-violet-400' : 'bg-indigo-100 text-indigo-600'
              }`}
            >
              <ListFilter className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-bold">
                Table of Contents · 0{currentTopic.index}/0{TREE_TOPICS.length}
              </div>
              <div className="text-xs font-bold truncate max-w-[200px] sm:max-w-xs">
                {currentTopic.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-400">
              {completedCount}/{TREE_TOPICS.length} Done
            </span>
            <span className="text-xs text-violet-400 font-bold">
              {isMobileSyllabusOpen ? 'Hide ▲' : 'Browse ▼'}
            </span>
          </div>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ==================================================================== */}
        {/* LEFT COLUMN: Table of Contents Panel (Strict 7 Topics)               */}
        {/* ==================================================================== */}
        <aside
          id="table-of-contents-panel"
          className={`w-full lg:w-80 shrink-0 ${
            isMobileSyllabusOpen ? 'block' : 'hidden lg:block'
          } lg:sticky lg:top-24 space-y-4`}
        >
          <div
            className={`p-5 rounded-3xl border transition-all duration-200 ${
              isDarkMode
                ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-xl shadow-violet-950/20'
                : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}
          >
            {/* TOC Header */}
            <div className="pb-3 border-b border-violet-950/60 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isDarkMode ? 'bg-violet-600/30 text-violet-300' : 'bg-indigo-100 text-indigo-600'
                    }`}
                  >
                    <ListFilter className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-violet-400">
                    Table of Contents
                  </h2>
                </div>
                <span
                  id="toc-completion-counter"
                  className="text-[11px] font-mono font-bold text-violet-400 px-2 py-0.5 rounded-md bg-violet-600/10 border border-violet-500/20"
                >
                  {completedCount}/{TREE_TOPICS.length}
                </span>
              </div>
            </div>

            {/* 7 Topics List */}
            <nav className="space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
              {TREE_TOPICS.map((topic) => {
                const isSelected = topic.id === currentTopicId;
                const isCompleted = completedTopics.includes(topic.id);
                const formattedNum = String(topic.index).padStart(2, '0');
                const subtitle = TOPIC_SUBTITLES[topic.id] || topic.shortDescription;

                return (
                  <button
                    key={topic.id}
                    id={`toc-item-${topic.id}`}
                    onClick={() => {
                      onSelectTopic(topic.id);
                      setIsMobileSyllabusOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? isDarkMode
                          ? 'bg-violet-950/60 border-violet-500/70 text-white shadow-md shadow-violet-950/50 ring-1 ring-violet-500/40'
                          : 'bg-indigo-50/90 border-indigo-400 text-indigo-950 shadow-xs ring-1 ring-indigo-300'
                        : isDarkMode
                        ? 'bg-[#090d18]/80 border-violet-950/70 hover:bg-[#121929] hover:border-violet-700/50 text-slate-300'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-indigo-300 text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-xs font-mono font-bold shrink-0 ${
                            isSelected
                              ? isDarkMode
                                ? 'text-violet-300 font-extrabold'
                                : 'text-indigo-600 font-extrabold'
                              : 'text-slate-400'
                          }`}
                        >
                          {formattedNum}.
                        </span>
                        <span
                          className={`text-xs font-bold truncate ${
                            isSelected
                              ? isDarkMode
                                ? 'text-white'
                                : 'text-indigo-950'
                              : ''
                          }`}
                        >
                          {topic.title.replace(/^\d+\.\s*/, '')}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] mt-0.5 truncate pl-6 ${
                          isSelected
                            ? isDarkMode
                              ? 'text-violet-200/80'
                              : 'text-indigo-700/80'
                            : 'opacity-60'
                        }`}
                      >
                        {subtitle}
                      </p>
                    </div>

                    <div className="shrink-0 ml-2 flex items-center justify-center w-6 h-6">
                      {isCompleted && (
                        <div
                          className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-xs"
                          title="Completed"
                        >
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ==================================================================== */}
        {/* RIGHT COLUMN: Clean Lesson Content (Definition + Core + Cards)      */}
        {/* ==================================================================== */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Header Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
              isDarkMode
                ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-xl shadow-violet-950/20'
                : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}
          >
            {/* Eyebrow & Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30">
                TOPIC 0{currentTopic.index} OF 0{TREE_TOPICS.length}
              </span>
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  isDarkMode
                    ? 'bg-[#151c2e] border-violet-950/70 text-emerald-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                Beginner Friendly
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentTopic.title.replace(/^\d+\.\s*/, '').toUpperCase()}
            </h1>

            {/* Short Subtitle */}
            <p className="text-sm sm:text-base mt-2 opacity-80 leading-relaxed max-w-3xl">
              {currentTopic.shortDescription}
            </p>
          </div>

          {/* ================================================================== */}
          {/* Section: DEFINITION                                                */}
          {/* ================================================================== */}
          {currentTopic.definition && (
            <div
              id="section-definition"
              className={`p-6 sm:p-7 rounded-3xl border ${
                isDarkMode
                  ? 'bg-[#0e1424] border-violet-900/40 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-xs shadow-violet-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-violet-400">
                  Definition
                </h3>
              </div>

              <blockquote className={`p-4 rounded-2xl border text-sm sm:text-base font-medium leading-relaxed ${
                isDarkMode
                  ? 'bg-[#090d18] border-violet-950/80 text-violet-100'
                  : 'bg-violet-50/60 border-violet-200 text-violet-950'
              }`}>
                &ldquo;{currentTopic.definition.text}&rdquo;
              </blockquote>
            </div>
          )}

          {/* ================================================================== */}
          {/* Section: CORE INTUITION / CORE IDEA                                */}
          {/* ================================================================== */}
          {currentTopic.coreIntuition && (
            <div
              id="section-core-intuition"
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 ${
                isDarkMode
                  ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-xl shadow-violet-950/20'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isDarkMode
                      ? 'bg-violet-400 shadow-xs shadow-violet-400/60'
                      : 'bg-indigo-600 shadow-xs shadow-indigo-400/50'
                  }`}
                />
                <h3
                  className={`text-xs font-mono font-bold uppercase tracking-widest ${
                    isDarkMode ? 'text-violet-400' : 'text-indigo-600'
                  }`}
                >
                  Core Intuition
                </h3>
              </div>

              <div
                className={`p-4 rounded-2xl border mb-3 flex items-start gap-3 transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-violet-950/20 border-violet-500/30 text-violet-200'
                    : 'bg-indigo-50/70 border-indigo-200 text-indigo-900'
                }`}
              >
                <Lightbulb
                  className={`w-5 h-5 shrink-0 mt-0.5 ${
                    isDarkMode ? 'text-violet-400' : 'text-indigo-600'
                  }`}
                />
                <div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${
                      isDarkMode ? 'text-violet-400' : 'text-indigo-600'
                    }`}
                  >
                    Real-World Analogy
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {currentTopic.coreIntuition.analogy}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed opacity-90">
                {currentTopic.coreIntuition.explanation}
              </p>
            </div>
          )}

          {/* ================================================================== */}
          {/* Section: KEY POINTS (Unified & Visible across all topics)          */}
          {/* ================================================================== */}
          {currentTopic.keyPoints && currentTopic.keyPoints.length > 0 && (
            <div
              id="section-key-points"
              className={`p-6 sm:p-7 rounded-3xl border ${
                isDarkMode
                  ? 'bg-[#0e1424] border-violet-900/40 text-slate-100'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs shadow-amber-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                  Key Points
                </h3>
              </div>

              <div className="space-y-2.5">
                {currentTopic.keyPoints.map((pt, idx) => {
                  const colonIndex = pt.indexOf(':');
                  const hasColon = colonIndex !== -1;
                  const termTitle = hasColon ? pt.substring(0, colonIndex).trim() : '';
                  const termContent = hasColon ? pt.substring(colonIndex + 1).trim() : pt;

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
                        isDarkMode
                          ? 'bg-[#090d18] border-violet-950/70 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <div className="leading-relaxed">
                        {hasColon ? (
                          <>
                            <span
                              className={`font-bold mr-1.5 ${
                                isDarkMode ? 'text-amber-300' : 'text-amber-800'
                              }`}
                            >
                              {termTitle}:
                            </span>
                            <span className="font-normal opacity-95">{termContent}</span>
                          </>
                        ) : (
                          <span className="font-medium">{pt}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* Section: ARCHITECTURE DIAGRAM (SVG Visual Structure)               */}
          {/* ================================================================== */}
          {currentTopicId === 'terminology' ? (
            <div id="section-architecture-diagram" className="space-y-4">
              <div className="flex items-center justify-start">
                <button
                  id="terminology-architecture-toggle-btn"
                  onClick={() => setShowTerminologyArchitecture(!showTerminologyArchitecture)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs transition-all border cursor-pointer ${
                    showTerminologyArchitecture
                      ? isDarkMode
                        ? 'bg-[#151c2e] text-violet-300 border-violet-700/50 hover:bg-[#1c263e]'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100'
                      : isDarkMode
                      ? 'bg-[#0e1424] hover:bg-[#151c2e] text-slate-300 border-violet-900/40 hover:text-violet-300'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:text-slate-900 shadow-xs'
                  }`}
                >
                  {showTerminologyArchitecture ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-violet-400" />
                      <span>Hide Architecture Diagram</span>
                      <ChevronUp className="w-3.5 h-3.5 text-violet-400 ml-0.5" />
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-violet-400" />
                      <span>View Architecture Diagram</span>
                      <ChevronDown className="w-3.5 h-3.5 text-violet-400 ml-0.5" />
                    </>
                  )}
                </button>
              </div>

              {showTerminologyArchitecture && (
                <div className="transition-all duration-300">
                  <ArchitectureDiagram topicId={currentTopicId} isDarkMode={isDarkMode} />
                </div>
              )}
            </div>
          ) : currentTopicId === 'binary-tree' ? (
            <div id="section-architecture-diagram" className="space-y-4">
              <div className="flex items-center justify-start">
                <button
                  id="binary-tree-architecture-toggle-btn"
                  onClick={() => setShowBinaryTreeArchitecture(!showBinaryTreeArchitecture)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs transition-all border cursor-pointer ${
                    showBinaryTreeArchitecture
                      ? isDarkMode
                        ? 'bg-[#151c2e] text-violet-300 border-violet-700/50 hover:bg-[#1c263e]'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100'
                      : isDarkMode
                      ? 'bg-[#0e1424] hover:bg-[#151c2e] text-slate-300 border-violet-900/40 hover:text-violet-300'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:text-slate-900 shadow-xs'
                  }`}
                >
                  {showBinaryTreeArchitecture ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-violet-400" />
                      <span>Hide Architecture Diagram</span>
                      <ChevronUp className="w-3.5 h-3.5 text-violet-400 ml-0.5" />
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-violet-400" />
                      <span>View Architecture Diagram</span>
                      <ChevronDown className="w-3.5 h-3.5 text-violet-400 ml-0.5" />
                    </>
                  )}
                </button>
              </div>

              {showBinaryTreeArchitecture && (
                <div className="transition-all duration-300">
                  <ArchitectureDiagram topicId={currentTopicId} isDarkMode={isDarkMode} />
                </div>
              )}
            </div>
          ) : (
            <div id="section-architecture-diagram">
              <ArchitectureDiagram topicId={currentTopicId} isDarkMode={isDarkMode} />
            </div>
          )}

          {/* ================================================================== */}
          {/* Section: TRY IT YOURSELF — MINI PRACTICE (Beginner Simple)        */}
          {/* ================================================================== */}
          {currentTopic.miniPractice && (
            <div
              id="section-mini-practice"
              className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                isDarkMode
                  ? 'bg-[#0e1424] border-violet-800/40 text-slate-100 shadow-lg'
                  : 'bg-white border-indigo-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    Try It Yourself · Mini Practice
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                  1-Question Check
                </span>
              </div>

              <p className="text-xs font-semibold opacity-70 mb-2">
                {currentTopic.miniPractice.instruction}
              </p>

              <div className="text-sm font-bold mb-4">
                {currentTopic.miniPractice.question}
              </div>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {currentTopic.miniPractice.options.map((opt, oIdx) => {
                  const isSelected = selectedPracticeOption === oIdx;
                  const isCorrect = oIdx === currentTopic.miniPractice?.correctIndex;

                  let optionStyle = isDarkMode
                    ? 'bg-[#090d18] border-violet-950/70 hover:border-violet-600/50 text-slate-200'
                    : 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-800 hover:text-slate-950';

                  if (hasSubmittedPractice) {
                    if (isCorrect) {
                      optionStyle = isDarkMode
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-400 text-emerald-900';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = isDarkMode
                        ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                        : 'bg-rose-50 border-rose-400 text-rose-900';
                    }
                  } else if (isSelected) {
                    optionStyle = isDarkMode
                      ? 'bg-violet-950/60 border-violet-400 text-white ring-1 ring-violet-400'
                      : 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-1 ring-indigo-400';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={hasSubmittedPractice}
                      onClick={() => setSelectedPracticeOption(oIdx)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {hasSubmittedPractice && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons & Feedback */}
              {!hasSubmittedPractice ? (
                <button
                  disabled={selectedPracticeOption === null}
                  onClick={() => setHasSubmittedPractice(true)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                    selectedPracticeOption !== null
                      ? isDarkMode
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'opacity-40 cursor-not-allowed bg-slate-700 text-slate-300'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <div className="space-y-3">
                  <div
                    className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                      selectedPracticeOption === currentTopic.miniPractice.correctIndex
                        ? isDarkMode
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : isDarkMode
                        ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                    }`}
                  >
                    {selectedPracticeOption === currentTopic.miniPractice.correctIndex ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold mb-0.5">
                        {selectedPracticeOption === currentTopic.miniPractice.correctIndex
                          ? 'Correct!'
                          : 'Not quite!'}
                      </div>
                      <div>{currentTopic.miniPractice.explanation}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPracticeOption(null);
                      setHasSubmittedPractice(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                      isDarkMode
                        ? 'bg-[#151c2e] hover:bg-[#1e2840] border-violet-950/80 text-slate-200'
                        : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              )}

              {/* Assistance Options: 💡 Give me a Hint & 🧭 Guided Solve */}
              <div className="mt-5 pt-4 border-t border-violet-950/40 flex flex-wrap items-center gap-2.5">
                <button
                  id="practice-hint-btn"
                  onClick={() => setShowHint(!showHint)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    showHint
                      ? isDarkMode
                        ? 'bg-amber-950/50 border-amber-500/60 text-amber-300 ring-1 ring-amber-500/30'
                        : 'bg-amber-50 border-amber-300 text-amber-900 ring-1 ring-amber-300'
                      : isDarkMode
                      ? 'bg-[#121829] hover:bg-[#1a233a] border-violet-950/80 text-amber-300/90'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-amber-700'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showHint ? 'Hide Hint' : 'Give me a Hint'}</span>
                </button>

                <button
                  id="practice-guided-solve-btn"
                  onClick={() => {
                    setShowGuidedSolve(!showGuidedSolve);
                    setGuidedStepIndex(0);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    showGuidedSolve
                      ? isDarkMode
                        ? 'bg-sky-950/50 border-sky-500/60 text-sky-300 ring-1 ring-sky-500/30'
                        : 'bg-sky-50 border-sky-300 text-sky-900 ring-1 ring-sky-300'
                      : isDarkMode
                      ? 'bg-[#121829] hover:bg-[#1a233a] border-violet-950/80 text-sky-300/90'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-sky-700'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-sky-400" />
                  <span>{showGuidedSolve ? 'Close Guided Solve' : 'Guided Solve'}</span>
                </button>
              </div>

              {/* 💡 Hint Box */}
              {showHint && currentTopic.miniPractice.hint && (
                <div
                  id="practice-hint-box"
                  className={`mt-3 p-4 rounded-2xl border text-xs leading-relaxed transition-all ${
                    isDarkMode
                      ? 'bg-amber-950/25 border-amber-500/30 text-amber-200'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1.5 text-amber-400">
                    <div className="flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>Helpful Hint</span>
                    </div>
                    <button
                      onClick={() => setShowHint(false)}
                      className="p-1 hover:opacity-75 rounded cursor-pointer text-amber-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="opacity-95">{currentTopic.miniPractice.hint}</p>
                </div>
              )}

              {/* 🧭 Guided Solve Progressive Box */}
              {showGuidedSolve && currentTopic.miniPractice.guidedSolve && (
                <div
                  id="practice-guided-solve-box"
                  className={`mt-3 p-4 sm:p-5 rounded-2xl border text-xs leading-relaxed transition-all ${
                    isDarkMode
                      ? 'bg-[#0a1020] border-sky-800/40 text-slate-200'
                      : 'bg-sky-50/70 border-sky-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-sky-900/30">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-sky-400" />
                      <span className="font-bold font-mono uppercase tracking-wider text-sky-400">
                        Guided Step-by-Step Solve
                      </span>
                    </div>
                    <button
                      onClick={() => setShowGuidedSolve(false)}
                      className="p-1 hover:opacity-75 rounded cursor-pointer text-sky-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Step Progress Indicators */}
                  <div className="flex items-center gap-2 mb-3">
                    {currentTopic.miniPractice.guidedSolve.steps.map((_, sIdx) => {
                      const isPast = sIdx < guidedStepIndex;
                      const isCurrent = sIdx === guidedStepIndex;
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setGuidedStepIndex(sIdx)}
                          className={`flex-1 h-1.5 rounded-full transition-all cursor-pointer ${
                            isPast || isCurrent
                              ? 'bg-sky-400'
                              : isDarkMode
                              ? 'bg-slate-800'
                              : 'bg-slate-200'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Current Active Step */}
                  {guidedStepIndex < currentTopic.miniPractice.guidedSolve.steps.length ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          Step {currentTopic.miniPractice.guidedSolve.steps[guidedStepIndex].stepNumber} of {currentTopic.miniPractice.guidedSolve.steps.length}
                        </span>
                        <span className="font-bold text-sky-300">
                          {currentTopic.miniPractice.guidedSolve.steps[guidedStepIndex].title}
                        </span>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl border ${
                          isDarkMode
                            ? 'bg-[#10172c] border-sky-900/40 text-slate-200'
                            : 'bg-white border-sky-200 text-slate-800'
                        }`}
                      >
                        {currentTopic.miniPractice.guidedSolve.steps[guidedStepIndex].explanation}
                      </div>

                      {currentTopic.miniPractice.guidedSolve.steps[guidedStepIndex].nextPrompt && (
                        <div className="text-[11px] font-semibold text-sky-400/90 flex items-center gap-1.5">
                          <span>👉</span>
                          <span>{currentTopic.miniPractice.guidedSolve.steps[guidedStepIndex].nextPrompt}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <button
                          disabled={guidedStepIndex === 0}
                          onClick={() => setGuidedStepIndex(guidedStepIndex - 1)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            guidedStepIndex === 0
                              ? 'opacity-40 cursor-not-allowed border-transparent'
                              : isDarkMode
                              ? 'bg-[#151c2e] hover:bg-[#1e2840] border-violet-950/80 text-slate-200 cursor-pointer'
                              : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800 cursor-pointer'
                          }`}
                        >
                          Previous Step
                        </button>

                        <button
                          onClick={() => setGuidedStepIndex(guidedStepIndex + 1)}
                          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-sm cursor-pointer flex items-center gap-1"
                        >
                          <span>Next Step</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Final Answer & Explanation after all steps */
                    <div className="space-y-3">
                      <div
                        className={`p-4 rounded-xl border ${
                          isDarkMode
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                            : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold mb-1 text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct Answer: {currentTopic.miniPractice.guidedSolve.finalAnswer}</span>
                        </div>
                        <p className="text-xs opacity-95">
                          {currentTopic.miniPractice.guidedSolve.finalExplanation}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => setGuidedStepIndex(0)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isDarkMode
                              ? 'bg-[#151c2e] hover:bg-[#1e2840] border-violet-950/80 text-slate-200'
                              : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                          }`}
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Restart Steps</span>
                        </button>

                        <button
                          onClick={() => setShowGuidedSolve(false)}
                          className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-all cursor-pointer"
                        >
                          Got It!
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================================================================== */}
          {/* Section: DEDICATED BST LEARNING APP CALL-TO-ACTION (BST Topic Only)*/}
          {/* ================================================================== */}
          {currentTopicId === 'bst' && (
            <div
              id="section-bst-cta-card"
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                isDarkMode
                  ? 'bg-gradient-to-br from-[#0e1424] via-[#12182b] to-[#181133] border-violet-800/60 text-slate-100 shadow-xl shadow-violet-950/30'
                  : 'bg-gradient-to-br from-white via-indigo-50/50 to-violet-50/70 border-violet-200 text-slate-900 shadow-sm'
              }`}
            >
              {/* Background ambient decorative glow */}
              <div
                className={`absolute -right-16 -bottom-16 w-60 h-60 rounded-full blur-3xl pointer-events-none ${
                  isDarkMode ? 'bg-violet-600/15' : 'bg-indigo-400/15'
                }`}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                      Dedicated Learning App
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center gap-2.5">
                    <span className="text-xl sm:text-2xl" role="img" aria-label="tree">🌳</span>
                    <span className={isDarkMode ? 'text-violet-200' : 'text-slate-900'}>
                      Learn Binary Search Tree
                    </span>
                  </h3>

                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-normal">
                    “Explore BST concepts, properties, insertion, searching, traversal, and interactive examples in a dedicated BST learning experience.”
                  </p>
                </div>

                <div className="shrink-0 flex items-center">
                  <a
                    id="learn-bst-cta-btn"
                    href={BST_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 border border-violet-400/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Learn BST</span>
                    <span className="text-base font-bold leading-none">→</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* Bottom Topic Navigation Bar: Prev / Mark Completed / Next         */}
          {/* ================================================================== */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDarkMode
                ? 'bg-[#0e1424] border-violet-900/40'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {/* Previous Topic Button */}
            {prevTopic ? (
              <button
                id="prev-topic-btn"
                onClick={() => onSelectTopic(prevTopic.id)}
                className={`w-full sm:w-auto flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs border transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#141c2e] hover:bg-[#1c263e] text-slate-200 border-violet-950/70'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-950 border-slate-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-[10px] opacity-60">Previous Topic</div>
                  <div className="truncate font-semibold">{prevTopic.title}</div>
                </div>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {/* Middle Mark Completed Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button
                onClick={handleToggleCompleted}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrentCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : isDarkMode
                    ? 'bg-[#151c2e] text-slate-300 border-violet-950/70 hover:border-violet-600/50'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-indigo-300 hover:text-slate-950'
                }`}
              >
                {isCurrentCompleted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Topic Completed</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark Completed</span>
                  </>
                )}
              </button>
            </div>

            {/* Next Topic Button */}
            {nextTopic ? (
              <button
                id="next-topic-btn"
                onClick={() => onSelectTopic(nextTopic.id)}
                className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-6 py-3 rounded-2xl font-bold text-xs transition-all shadow-md cursor-pointer ml-auto ${
                  isDarkMode
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/40'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-200'
                }`}
              >
                <div className="text-right">
                  <div className="text-[10px] opacity-80">Next Topic</div>
                  <div className="truncate font-semibold">{nextTopic.title}</div>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 ml-auto">
                <CheckCircle2 className="w-4 h-4" />
                All 7 Topics Mastered!
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
