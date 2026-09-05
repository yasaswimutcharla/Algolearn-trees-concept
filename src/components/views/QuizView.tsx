import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../../data/treeData';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Lightbulb
} from 'lucide-react';
import { ProgressiveHintModal, QUIZ_HINT_STAGES } from '../ProgressiveHintModal';

const QUIZ_STORAGE_KEY = 'tree_dsa_quiz_state';

export interface QuizSavedState {
  currentQuestionIndex: number;
  userAnswers: Record<string, number>;
  confirmedQuestions: Record<string, boolean>;
  submitted: boolean;
}

// In-memory cache ensures zero-loss persistence across component unmounts in the session
let inMemoryQuizState: QuizSavedState | null = null;

export const loadSavedQuizState = (): QuizSavedState | null => {
  if (inMemoryQuizState) {
    return inMemoryQuizState;
  }
  try {
    const raw = sessionStorage.getItem(QUIZ_STORAGE_KEY) || localStorage.getItem(QUIZ_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      inMemoryQuizState = parsed;
      return parsed;
    }
  } catch {}
  return null;
};

export const saveQuizState = (state: QuizSavedState) => {
  inMemoryQuizState = state;
  try {
    const serialized = JSON.stringify(state);
    sessionStorage.setItem(QUIZ_STORAGE_KEY, serialized);
    localStorage.setItem(QUIZ_STORAGE_KEY, serialized);
  } catch {}
};

export const clearSavedQuizState = () => {
  inMemoryQuizState = null;
  try {
    sessionStorage.removeItem(QUIZ_STORAGE_KEY);
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  } catch {}
};

interface QuizViewProps {
  isDarkMode: boolean;
  onUpdateQuizScore?: (score: number, total: number) => void;
  onUpdateQuizProgress?: (completed: number, total: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  isDarkMode,
  onUpdateQuizScore,
  onUpdateQuizProgress
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    const saved = loadSavedQuizState();
    if (typeof saved?.currentQuestionIndex === 'number') {
      return Math.max(0, Math.min(QUIZ_QUESTIONS.length - 1, saved.currentQuestionIndex));
    }
    return 0;
  });
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>(() => {
    const saved = loadSavedQuizState();
    return saved?.userAnswers ?? {};
  });
  const [confirmedQuestions, setConfirmedQuestions] = useState<Record<string, boolean>>(() => {
    const saved = loadSavedQuizState();
    return saved?.confirmedQuestions ?? {};
  });
  const [submitted, setSubmitted] = useState<boolean>(() => {
    const saved = loadSavedQuizState();
    return Boolean(saved?.submitted);
  });
  const [isHintModalOpen, setIsHintModalOpen] = useState<boolean>(false);
  const [revealedHintStages, setRevealedHintStages] = useState<Record<string, number>>({});

  const totalQuestions = QUIZ_QUESTIONS.length;

  useEffect(() => {
    saveQuizState({
      currentQuestionIndex,
      userAnswers,
      confirmedQuestions,
      submitted
    });
  }, [currentQuestionIndex, userAnswers, confirmedQuestions, submitted]);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQ?.id];
  const isCurrentConfirmed = Boolean(confirmedQuestions[currentQ?.id]);
  const answeredCount = Object.keys(confirmedQuestions).length;
  const currentHintStage = (currentQ?.id && revealedHintStages[currentQ.id]) || 1;

  // Sync progress on mount or when answeredCount updates
  useEffect(() => {
    if (onUpdateQuizProgress) {
      onUpdateQuizProgress(answeredCount, totalQuestions);
    }
  }, [answeredCount, totalQuestions, onUpdateQuizProgress]);

  const handleSelectOption = (optionIndex: number) => {
    if (submitted || isCurrentConfirmed) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === undefined) return;
    const newConfirmed = {
      ...confirmedQuestions,
      [currentQ.id]: true
    };
    setConfirmedQuestions(newConfirmed);

    const completedCount = Object.keys(newConfirmed).length;
    if (onUpdateQuizProgress) {
      onUpdateQuizProgress(completedCount, totalQuestions);
    }

    // Update global score progress (separate correct-answer score)
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    });
    if (onUpdateQuizScore) {
      onUpdateQuizScore(score, totalQuestions);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all questions
      setSubmitted(true);
      if (onUpdateQuizScore) {
        onUpdateQuizScore(calculateScore(), totalQuestions);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleRetake = () => {
    clearSavedQuizState();
    setUserAnswers({});
    setConfirmedQuestions({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
    if (onUpdateQuizProgress) {
      onUpdateQuizProgress(0, totalQuestions);
    }
    if (onUpdateQuizScore) {
      onUpdateQuizScore(0, totalQuestions);
    }
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);
  const isCorrect = selectedAnswer !== undefined && selectedAnswer === currentQ?.correctAnswerIndex;

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      {/* Quiz Header Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-xl shadow-violet-950/30'
            : 'bg-white border-blue-100 text-black shadow-sm'
        }`}
      >
        {/* Top Meta Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isDarkMode ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' : 'bg-blue-50 text-blue-900 border border-blue-200'
          }`}>
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Assessment</span>
          </div>

          <span
            className={`text-xs font-mono font-medium tracking-tight ${
              isDarkMode ? 'text-slate-400' : 'text-blue-900/80'
            }`}
          >
            Tree Quiz (10 Questions)
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Tree DSA Concept Quiz
        </h1>
        <p className="text-xs sm:text-sm mt-1.5 opacity-80 leading-relaxed max-w-2xl">
          Test your understanding of Trees, their properties, terminology, traversal methods, and search techniques.
        </p>

        {/* Question Progress and Status Boxes */}
        <div className="mt-6 space-y-3">
          <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
            <span>Progress:</span>
            <span
              id="quiz-progress-counter"
              className={`font-bold font-mono ${isDarkMode ? 'text-violet-400' : 'text-violet-800'}`}
            >
              {answeredCount}/{totalQuestions}
            </span>
            <span className="opacity-75">Answered</span>
          </div>

          {/* Q1..Q10 Status Boxes Row */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isConfirmed = Boolean(confirmedQuestions[q.id]);
              const isAnsCorrect = userAnswers[q.id] === q.correctAnswerIndex;

              let boxStyle = '';
              let content = null;

              if (isConfirmed) {
                if (isAnsCorrect) {
                  // Correct Answer - Dark Green background + Green border + light text + green checkmark
                  boxStyle = isDarkMode
                    ? `bg-[#063b27] border border-emerald-500/80 text-white font-semibold shadow-sm ${
                        isCurrent ? 'ring-2 ring-violet-400 ring-offset-2 ring-offset-[#0e1424]' : 'hover:bg-[#084d33]'
                      }`
                    : `bg-emerald-100 border border-emerald-600 text-emerald-950 font-semibold shadow-sm ${
                        isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : 'hover:bg-emerald-200'
                      }`;
                  content = (
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Q{idx + 1}</span>
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                    </div>
                  );
                } else {
                  // Incorrect Answer - Dark Red/Maroon background + Red border + light text + red X
                  boxStyle = isDarkMode
                    ? `bg-[#3f0d18] border border-rose-500/80 text-white font-semibold shadow-sm ${
                        isCurrent ? 'ring-2 ring-violet-400 ring-offset-2 ring-offset-[#0e1424]' : 'hover:bg-[#521321]'
                      }`
                    : `bg-rose-100 border border-rose-600 text-rose-950 font-semibold shadow-sm ${
                        isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white' : 'hover:bg-rose-200'
                      }`;
                  content = (
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Q{idx + 1}</span>
                      <X className="w-3.5 h-3.5 text-rose-400 stroke-[3]" />
                    </div>
                  );
                }
              } else if (isCurrent) {
                // Currently Selected Question (Unanswered) - Purple Active
                boxStyle = isDarkMode
                  ? 'bg-violet-600 border border-violet-400 text-white font-bold shadow-md shadow-violet-950/60 ring-2 ring-violet-400/50'
                  : 'bg-indigo-600 border border-indigo-400 text-white font-bold shadow-md shadow-indigo-300/60 ring-2 ring-indigo-400/50';
                content = <span>Q{idx + 1}</span>;
              } else {
                // Unanswered Questions - Neutral dark
                boxStyle = isDarkMode
                  ? 'bg-[#12192c] text-slate-400 border border-violet-950/70 hover:border-violet-700/60 hover:text-slate-200'
                  : 'bg-blue-50 text-blue-900 border border-blue-200 hover:border-blue-300 hover:text-black';
                content = <span>Q{idx + 1}</span>;
              }

              return (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-150 flex items-center justify-center cursor-pointer shrink-0 ${boxStyle}`}
                  title={`Question ${idx + 1}`}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>

        {/* Completion Banner (When Submitted/Finished) */}
        {submitted && (
          <div
            className={`mt-6 p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              percentage >= 70
                ? isDarkMode
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : isDarkMode
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 shrink-0 text-amber-400" />
              <div>
                <div className="text-sm font-bold">
                  {percentage >= 70 ? 'Excellent Work!' : 'Keep Practicing!'}
                </div>
                <div className="text-xs opacity-80">
                  You scored {score} out of {totalQuestions} ({percentage}%)
                </div>
              </div>
            </div>

            <button
              onClick={handleRetake}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-[#18233c] hover:bg-[#202e4f] text-white border border-violet-900/60'
                  : 'bg-white hover:bg-blue-50 text-black hover:text-blue-900 border border-blue-200 shadow-sm'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        )}
      </div>

      {/* Single Question Card */}
      {currentQ && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-200 ${
            isDarkMode
              ? 'bg-[#0e1424] border-violet-900/40 text-slate-100 shadow-xl shadow-violet-950/20'
              : 'bg-white border-blue-100 text-black shadow-sm'
          }`}
        >
          {/* Card Top Meta */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
              isDarkMode ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' : 'bg-violet-100 text-violet-800 border border-violet-200'
            }`}>
              Question {String(currentQuestionIndex + 1).padStart(2, '0')} of {totalQuestions}
            </span>

            {isCurrentConfirmed && (
              <span
                className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                  isCorrect
                    ? isDarkMode
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-400'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : isDarkMode
                    ? 'bg-rose-950/60 border-rose-600 text-rose-400'
                    : 'bg-rose-50 border-rose-300 text-rose-700'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> Incorrect Answer
                  </>
                )}
              </span>
            )}
          </div>

          {/* Question Title */}
          <h3 className="text-base sm:text-lg font-bold mb-6 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswer === optIdx;
              let optionStyle = isDarkMode
                ? 'bg-[#090d18] border-violet-950/70 text-slate-200 hover:border-violet-600/50'
                : 'bg-blue-50/40 border-blue-100 text-black hover:border-blue-400 hover:bg-blue-50';

              if (isSelected && !isCurrentConfirmed) {
                optionStyle = isDarkMode
                  ? 'bg-violet-600/30 border-violet-500 text-white font-bold ring-1 ring-violet-500/40'
                  : 'bg-blue-50 border-blue-500 text-blue-950 font-bold ring-1 ring-blue-500/40';
              }

              if (isCurrentConfirmed) {
                if (optIdx === currentQ.correctAnswerIndex) {
                  optionStyle = isDarkMode
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = isDarkMode
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold'
                    : 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isCurrentConfirmed || submitted}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-violet-600 text-white'
                            : 'bg-indigo-600 text-white'
                          : isDarkMode
                          ? 'bg-[#141b2d] text-slate-400'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>

                  {isCurrentConfirmed && optIdx === currentQ.correctAnswerIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isCurrentConfirmed && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (when confirmed) */}
          {isCurrentConfirmed && (
            <div
              className={`mt-6 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed border animate-fadeIn ${
                isDarkMode
                  ? 'bg-[#090d18] border-violet-950/80 text-violet-300'
                  : 'bg-indigo-50/70 border-indigo-200 text-indigo-900'
              }`}
            >
              <span className={`font-bold uppercase tracking-wider block mb-1 ${
                isDarkMode ? 'text-violet-400' : 'text-indigo-800'
              }`}>
                Explanation
              </span>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation & Action Controls Row */}
          <div className={`mt-8 pt-5 border-t ${isDarkMode ? 'border-violet-950/60' : 'border-blue-100'} flex items-center justify-between gap-3`}>
            {/* Left: Previous Button & Hint */}
            <div className="flex items-center gap-2">
              <button
                id="quiz-prev-btn"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  currentQuestionIndex > 0
                    ? isDarkMode
                      ? 'bg-[#141b2d] hover:bg-[#1c2740] text-slate-200 border border-violet-900/40 cursor-pointer'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-900 hover:text-black border border-blue-200 cursor-pointer'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                id="quiz-hint-btn"
                onClick={() => setIsHintModalOpen(true)}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2.5 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#121829] hover:bg-[#1a233a] border-violet-950/80 text-amber-300/90'
                    : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
                }`}
                title="Open 3-Stage Progressive Hint"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Hint</span>
              </button>
            </div>

            {/* Right: Confirm Answer / Next Button */}
            <div className="flex items-center gap-2.5">
              {!isCurrentConfirmed ? (
                <button
                  id="quiz-confirm-btn"
                  onClick={handleConfirmAnswer}
                  disabled={selectedAnswer === undefined}
                  className={`flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                    selectedAnswer !== undefined
                      ? isDarkMode
                        ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/40 ring-1 ring-violet-400/50 cursor-pointer hover:scale-[1.02]'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-300/60 cursor-pointer hover:scale-[1.02]'
                      : isDarkMode
                      ? 'bg-[#141b2d]/60 text-slate-500 border border-violet-950/40 cursor-not-allowed opacity-60'
                      : 'bg-blue-50/60 text-blue-900/40 border border-blue-100 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>Submit Answer</span>
                </button>
              ) : (
                <button
                  id="quiz-next-btn"
                  onClick={handleNext}
                  className={`flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/40 ring-1 ring-violet-400/50'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-300/60'
                  }`}
                >
                  <span>
                    {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3-Stage Progressive Hint Modal */}
      {currentQ && (
        <ProgressiveHintModal
          isOpen={isHintModalOpen}
          onClose={() => setIsHintModalOpen(false)}
          isDarkMode={isDarkMode}
          topicId={currentQ.topicId}
          topicTitle="Quiz Challenge"
          question={currentQ.question}
          questionId={currentQ.id}
          customHints={QUIZ_HINT_STAGES[currentQ.id]}
          revealedStage={currentHintStage}
          onRevealNextStage={() =>
            setRevealedHintStages((prev) => ({
              ...prev,
              [currentQ.id]: Math.min(3, (prev[currentQ.id] || 1) + 1)
            }))
          }
          returnButtonText="Got It, Return to Game"
        />
      )}
    </div>
  );
};

