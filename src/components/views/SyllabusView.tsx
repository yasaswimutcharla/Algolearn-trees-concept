import React from 'react';
import { TopicId } from '../../types';
import { TREE_TOPICS, TERMINOLOGY_LIST, TREE_TYPES_LIST, TRAVERSALS_LIST, BST_OPERATIONS } from '../../data/treeData';
import { ArrowRight, BookOpen, CheckCircle, ListTree, Sparkles } from 'lucide-react';

interface SyllabusViewProps {
  onSelectTopic: (topicId: TopicId) => void;
  isDarkMode: boolean;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({ onSelectTopic, isDarkMode }) => {
  // Helper to render the specific subtopics listed in requirements
  const renderTopicHighlights = (topicId: TopicId) => {
    switch (topicId) {
      case 'basics':
        return (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {['Hierarchical Structure', 'Non-linear Concept', 'Real-world Examples', 'Tree vs Linear Lists', 'N-1 Edges Rule'].map((item, idx) => (
              <span
                key={idx}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${
                  isDarkMode ? 'bg-[#22173d] text-purple-200 border border-purple-900/40' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        );

      case 'terminology':
        return (
          <div className="mt-3 space-y-2">
            <div className="text-xs font-semibold text-violet-400">
              13 Fundamental Terms (Definition + Example + Visual Highlight):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
              {TERMINOLOGY_LIST.map((term) => (
                <span
                  key={term.id}
                  className={`text-[11px] px-2 py-1 rounded-md font-mono font-medium ${
                    isDarkMode ? 'bg-[#22173d] text-purple-200 border border-purple-900/30' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {term.name}
                </span>
              ))}
            </div>
          </div>
        );

      case 'types':
        return (
          <div className="mt-3 space-y-2">
            <div className="text-xs font-semibold text-violet-400">
              7 Tree Classifications & Structural Rules:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {TREE_TYPES_LIST.map((t) => (
                <div
                  key={t.id}
                  className={`text-xs px-2.5 py-1.5 rounded-md font-medium ${
                    isDarkMode ? 'bg-[#22173d] text-purple-200 border border-purple-900/30' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <strong className="text-violet-400">{t.name}:</strong> {t.rule}
                </div>
              ))}
            </div>
          </div>
        );

      case 'binary-tree':
        return (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {['Max 2 Children', 'Left & Right Pointers', 'Level Node Capacities (2^L)', 'Array Mapping (2i+1, 2i+2)', 'Leaf Count Formula'].map((item, idx) => (
              <span
                key={idx}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${
                  isDarkMode ? 'bg-[#22173d] text-purple-200 border border-purple-900/40' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        );

      case 'traversals':
        return (
          <div className="mt-3 space-y-2">
            <div className="text-xs font-semibold text-violet-400">
              Step-by-Step Traversal Algorithms:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {TRAVERSALS_LIST.map((trav) => (
                <div
                  key={trav.id}
                  className={`text-xs px-2.5 py-1.5 rounded-md ${
                    isDarkMode ? 'bg-[#22173d] text-purple-200 border border-purple-900/30' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <strong className="text-violet-400">{trav.name}</strong> ({trav.orderFormula})
                </div>
              ))}
            </div>
          </div>
        );

      case 'bst':
        return (
          <div className="mt-3 space-y-2">
            <div className="text-xs font-semibold text-violet-400">
              BST Operations & Properties:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {BST_OPERATIONS.map((op) => (
                <div
                  key={op.id}
                  className={`text-xs px-2.5 py-1.5 rounded-md ${
                    isDarkMode ? 'bg-[#22173d] text-purple-200 border border-purple-900/30' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <strong className="text-violet-400">{op.name}</strong>
                </div>
              ))}
            </div>
          </div>
        );

      case 'applications':
        return (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {['File Systems', 'Fast Searching', 'Database Indexing', 'HTML DOM Trees', 'Decision Trees in AI'].map((item, idx) => (
              <span
                key={idx}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${
                  isDarkMode ? 'bg-[#22173d] text-purple-200 border border-purple-900/40' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">
      {/* Syllabus Header */}
      <div className={`p-6 rounded-2xl border ${
        isDarkMode
          ? 'bg-[#160f29] border-purple-900/50 text-purple-100'
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-2.5 text-violet-400 font-bold text-xs uppercase tracking-wider mb-2">
          <ListTree className="w-4 h-4" />
          <span>Official Syllabus</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-violet-400">
          Tree DSA Topics & Curriculum
        </h1>
        <p className="text-sm mt-1.5 opacity-80 leading-relaxed">
          Select any of the 6 topics below to launch the focused learning view. Each topic provides simple beginner-friendly explanations, examples, and an on-demand Visual Representation animation.
        </p>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {TREE_TOPICS.map((topic) => (
          <div
            key={topic.id}
            id={`syllabus-topic-card-${topic.id}`}
            className={`p-6 rounded-2xl border transition-all duration-200 ${
              isDarkMode
                ? 'bg-[#150f24] border-purple-900/40 text-purple-100 hover:border-violet-500/50'
                : 'bg-white border-slate-200 text-slate-900 hover:border-violet-400'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30">
                    Topic {topic.index}
                  </span>
                  <h2 className="text-lg font-bold text-violet-300">
                    {topic.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm opacity-80 mt-1 max-w-2xl">
                  {topic.summary}
                </p>
              </div>

              <button
                onClick={() => onSelectTopic(topic.id)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-all shadow-md shadow-violet-900/30 shrink-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Learn Topic {topic.index}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Structured Subtopics breakdown */}
            {renderTopicHighlights(topic.id)}
          </div>
        ))}
      </div>
    </div>
  );
};
