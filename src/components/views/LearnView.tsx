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
  ExternalLink,
  X
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
  const [showPracticeHint, setShowPracticeHint] = useState<boolean>(false);

  // When switching topic, reset architecture and practice state
  useEffect(() => {
    setShowTerminologyArchitecture(false);
    setShowBinaryTreeArchitecture(false);
    setIsMobileSyllabusOpen(false);
    setSelectedPracticeOption(null);
    setHasSubmittedPractice(false);
    setShowPracticeHint(false);
  }, [currentTopicId]);

  const currentTopic =
    TREE_TOPICS.find((t) => t.id === currentTopicId) || TREE_TOPICS[0];
  const currentIndex = TREE_TOPICS.findIndex((t) => t.id === currentTopicId);

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
              : 'bg-white border-blue-100 text-black shadow-xs'
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
              <div className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                isDarkMode ? 'text-violet-400' : 'text-violet-700'
              }`}>
                Table of Contents · 0{currentTopic.index}/0{TREE_TOPICS.length}
              </div>
              <div className="text-xs font-bold truncate max-w-[200px] sm:max-w-xs">
                {currentTopic.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isDarkMode ? 'bg-violet-600/20 text-violet-400' : 'bg-violet-100 text-violet-800'
            }`}>
              {completedCount}/{TREE_TOPICS.length} Done
            </span>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>
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
                : 'bg-white border-blue-100 text-black shadow-sm'
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
                  <h2 className={`text-xs font-bold font-mono uppercase tracking-widest ${
                    isDarkMode ? 'text-violet-400' : 'text-violet-800'
                  }`}>
                    Table of Contents
                  </h2>
                </div>
                <span
                  id="toc-completion-counter"
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isDarkMode
                      ? 'text-violet-400 bg-violet-600/10 border border-violet-500/20'
                      : 'text-violet-800 bg-violet-100 border border-violet-200'
                  }`}
                >
                  {completedCount}/{TREE_TOPICS.length}
                </span>
              </div>
            </div>

            {/* 7 Topics List */}
            <nav className="space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                          : 'bg-violet-50 border-violet-400 text-violet-950 shadow-xs ring-1 ring-violet-300'
                        : isDarkMode
                        ? 'bg-[#090d18]/80 border-violet-950/70 hover:bg-[#121929] hover:border-violet-700/50 text-slate-300'
                        : 'bg-blue-50/50 border-blue-100 hover:bg-white hover:border-blue-300 text-blue-900 hover:text-black'
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-xs font-mono font-bold shrink-0 ${
                            isSelected
                              ? isDarkMode
                                ? 'text-violet-300 font-extrabold'
                                : 'text-violet-700 font-extrabold'
                              : 'text-blue-700'
                          }`}
                        >
                          {formattedNum}.
                        </span>
                        <span
                          className={`text-xs font-bold truncate ${
                            isSelected
                              ? isDarkMode
                                ? 'text-white'
                                : 'text-violet-950 font-extrabold'
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
                              : 'text-violet-900 font-medium'
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
                : 'bg-white border-blue-100 text-black shadow-sm'
            }`}
          >
            {/* Eyebrow & Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                isDarkMode
                  ? 'bg-violet-600/20 text-violet-400 border-violet-500/30'
                  : 'bg-violet-100 text-violet-800 border-violet-300'
              }`}>
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
                  : 'bg-white border-blue-100 text-black shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-violet-400 shadow-xs shadow-violet-400' : 'bg-violet-600 shadow-xs shadow-violet-400/50'}`} />
                <h3 className={`text-xs font-mono font-bold uppercase tracking-widest ${isDarkMode ? 'text-violet-400' : 'text-violet-700 font-extrabold'}`}>
                  Definition
                </h3>
              </div>

              <blockquote className={`p-4 rounded-2xl border text-sm sm:text-base font-medium leading-relaxed ${
                isDarkMode
                  ? 'bg-[#090d18] border-violet-950/80 text-violet-100'
                  : 'bg-violet-50/80 border-violet-200 text-violet-950'
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
                  : 'bg-white border-blue-100 text-black shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isDarkMode
                      ? 'bg-violet-400 shadow-xs shadow-violet-400/60'
                      : 'bg-violet-600 shadow-xs shadow-violet-400/50'
                  }`}
                />
                <h3
                  className={`text-xs font-mono font-bold uppercase tracking-widest ${
                    isDarkMode ? 'text-violet-400' : 'text-violet-700 font-extrabold'
                  }`}
                >
                  Core Intuition
                </h3>
              </div>

              <div
                className={`p-4 rounded-2xl border mb-3 flex items-start gap-3 transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-violet-950/20 border-violet-500/30 text-violet-200'
                    : 'bg-violet-50/80 border-violet-200 text-violet-950'
                }`}
              >
                <Lightbulb
                  className={`w-5 h-5 shrink-0 mt-0.5 ${
                    isDarkMode ? 'text-violet-400' : 'text-violet-700'
                  }`}
                />
                <div>
                  <div
                    className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${
                      isDarkMode ? 'text-violet-400' : 'text-violet-700 font-extrabold'
                    }`}
                  >
                    Real-World Analogy
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-violet-200' : 'text-violet-950 font-medium'}`}>
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
                  : 'bg-white border-blue-100 text-black shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs shadow-amber-400" />
                <h3 className={`text-xs font-mono font-bold uppercase tracking-widest ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-800 font-extrabold'
                }`}>
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
                          : 'bg-blue-50/40 border-blue-100 text-blue-950'
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
                      : 'bg-white hover:bg-blue-50 text-blue-900 border-blue-200 hover:text-black shadow-xs'
                  }`}
                >
                  {showTerminologyArchitecture ? (
                    <>
                      <EyeOff className={`w-3.5 h-3.5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                      <span>Hide Architecture Diagram</span>
                      <ChevronUp className={`w-3.5 h-3.5 ml-0.5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                    </>
                  ) : (
                    <>
                      <Eye className={`w-3.5 h-3.5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                      <span>View Architecture Diagram</span>
                      <ChevronDown className={`w-3.5 h-3.5 ml-0.5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
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
                      : 'bg-white hover:bg-blue-50 text-blue-900 border-blue-200 hover:text-black shadow-xs'
                  }`}
                >
                  {showBinaryTreeArchitecture ? (
                    <>
                      <EyeOff className={`w-3.5 h-3.5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                      <span>Hide Architecture Diagram</span>
                      <ChevronUp className={`w-3.5 h-3.5 ml-0.5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                    </>
                  ) : (
                    <>
                      <Eye className={`w-3.5 h-3.5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                      <span>View Architecture Diagram</span>
                      <ChevronDown className={`w-3.5 h-3.5 ml-0.5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
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
                  : 'bg-white border-blue-100 text-black shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isDarkMode
                        ? 'bg-violet-400 shadow-xs shadow-violet-400'
                        : 'bg-violet-600 shadow-xs shadow-violet-400/50'
                    }`}
                  />
                  <h4
                    className={`text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                      isDarkMode ? 'text-violet-400' : 'text-violet-700 font-extrabold'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    Try It Yourself · Mini Practice
                  </h4>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    isDarkMode
                      ? 'bg-violet-500/20 text-violet-300'
                      : 'bg-violet-100 text-violet-800 border border-violet-200 font-bold'
                  }`}
                >
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
                    : 'bg-blue-50/40 border-blue-100 hover:border-blue-300 text-blue-900 hover:text-black';

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
                      : 'bg-violet-50 border-violet-500 text-violet-950 ring-1 ring-violet-400 font-semibold';
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
                      : 'opacity-40 cursor-not-allowed bg-blue-200 text-blue-900'
                  }`}
                >
                  Submit Answer
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
                      setShowPracticeHint(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                      isDarkMode
                        ? 'bg-[#151c2e] hover:bg-[#1e2840] border-violet-950/80 text-slate-200'
                        : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-950'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>
              )}

              {/* Assistance Options: 💡 Simple 1-2 line conceptual hint */}
              <div className="mt-5 pt-4 border-t border-violet-950/40 space-y-3">
                <button
                  id="practice-hint-btn"
                  onClick={() => setShowPracticeHint((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    showPracticeHint
                      ? isDarkMode
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-xs shadow-amber-950/30'
                        : 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs shadow-amber-200/50'
                      : isDarkMode
                      ? 'bg-[#121829] hover:bg-[#1a233a] border-violet-950/80 text-amber-300/90'
                      : 'bg-amber-50/60 hover:bg-amber-100 border-amber-200 text-amber-900 font-semibold'
                  }`}
                  title={showPracticeHint ? 'Hide hint' : 'Show conceptual hint'}
                >
                  <Lightbulb className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                  <span>Hint</span>
                </button>

                {showPracticeHint && currentTopic.miniPractice.hint && (
                  <div
                    id="practice-hint-box"
                    className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start justify-between gap-3 transition-all ${
                      isDarkMode
                        ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                        : 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <Lightbulb className={`w-4 h-4 shrink-0 mt-0.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`} />
                      <div>
                        <span className={`font-bold block mb-0.5 text-[11px] uppercase tracking-wider ${
                          isDarkMode ? 'text-amber-400' : 'text-amber-900 font-extrabold'
                        }`}>
                          Hint
                        </span>
                        <p className={isDarkMode ? 'text-amber-200' : 'text-amber-950'}>{currentTopic.miniPractice.hint}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPracticeHint(false)}
                      className={`p-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                        isDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                          : 'text-amber-700 hover:text-amber-900 hover:bg-amber-100/80'
                      }`}
                      aria-label="Close hint"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
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
                  : 'bg-gradient-to-br from-white via-indigo-50/50 to-violet-50/70 border-violet-200 text-black shadow-sm'
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
                    <span className={isDarkMode ? 'text-violet-200' : 'text-black'}>
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
          {/* Bottom Topic Navigation Bar: Mark Completed & Next Topic           */}
          {/* ================================================================== */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDarkMode
                ? 'bg-[#0e1424] border-violet-900/40'
                : 'bg-white border-blue-100 shadow-sm'
            }`}
          >
            {/* Mark Completed Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button
                onClick={handleToggleCompleted}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrentCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : isDarkMode
                    ? 'bg-[#151c2e] text-slate-300 border-violet-950/70 hover:border-violet-600/50'
                    : 'bg-blue-50 text-blue-900 border-blue-200 hover:border-blue-300 hover:text-black'
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
                <span>Next Topic</span>
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
