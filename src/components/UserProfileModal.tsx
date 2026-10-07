import React, { useState } from 'react';
import { UserData, UserSummary } from '../types';
import {
  User,
  Users,
  Plus,
  RotateCcw,
  X,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserData;
  allUsers: UserSummary[];
  isDarkMode: boolean;
  onSwitchUser: (userId: string) => Promise<void> | void;
  onCreateUser: (displayName: string, avatar: string) => Promise<void> | void;
  onResetCurrentUser: () => void;
}

const AVATAR_OPTIONS = ['🌳', '🌿', '🌲', '🌴', '🎋', '🦉', '⚡', '🚀', '🧠', '💻'];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allUsers,
  isDarkMode,
  onSwitchUser,
  onCreateUser,
  onResetCurrentUser
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'switch' | 'new'>('profile');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🌳');
  const [customUserIdInput, setCustomUserIdInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisplayName.trim()) return;
    setIsSubmitting(true);
    try {
      await onCreateUser(newDisplayName.trim(), selectedAvatar);
      setNewDisplayName('');
      setActiveTab('profile');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInWithId = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUserIdInput.trim()) return;
    setIsSubmitting(true);
    try {
      await onSwitchUser(customUserIdInput.trim());
      setCustomUserIdInput('');
      setActiveTab('profile');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#0d121f] border-zinc-800 text-slate-100 shadow-black/80'
            : 'bg-white border-indigo-100 text-slate-900 shadow-indigo-200/50'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4.5 flex items-center justify-between border-b ${
            isDarkMode
              ? 'bg-zinc-900/60 border-zinc-800/80'
              : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-indigo-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-xl shadow-md">
              {currentUser.avatar || '🌳'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">Learner Account</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Isolated Profile
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">ID: {currentUser.userId}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close user profile"
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDarkMode ? 'hover:bg-zinc-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className={`px-6 pt-4 flex gap-2 border-b ${isDarkMode ? 'border-zinc-800/60' : 'border-slate-100'}`}>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            My Progress
          </button>

          <button
            onClick={() => setActiveTab('switch')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'switch'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Switch Learner ({allUsers.length})
          </button>

          <button
            onClick={() => setActiveTab('new')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'new'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            New Learner
          </button>
        </div>

        {/* Tab 1: Current Profile Overview */}
        {activeTab === 'profile' && (
          <div className="p-6 space-y-5">
            <div
              className={`p-4 rounded-2xl border ${
                isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200/60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{currentUser.avatar || '🌳'}</div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{currentUser.displayName}</h4>
                    <p className="text-xs text-slate-400">Current Active Learner</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-indigo-400">{currentUser.progress}%</span>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Overall Mastery</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${currentUser.progress}%` }}
                />
              </div>

              {/* Stat Badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-800/40 text-center">
                <div>
                  <div className="text-xs font-bold text-indigo-400">{currentUser.completedTopics.length} / 7</div>
                  <div className="text-[10px] text-slate-400">Topics Done</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-400">{currentUser.xp} XP</div>
                  <div className="text-[10px] text-slate-400">Earned XP</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-400">
                    {currentUser.quizScore ? `${currentUser.quizScore.score}/10` : 'Not Taken'}
                  </div>
                  <div className="text-[10px] text-slate-400">Quiz Score</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Multi-User Isolation Active:</strong> Your progress, XP, completed topics,
                and quiz answers belong exclusively to this learner profile ({currentUser.userId}) and will never overwrite
                another learner's state.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Reset progress for ${currentUser.displayName} (${currentUser.userId}) only? Other users will not be affected.`)) {
                    onResetCurrentUser();
                    onClose();
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isDarkMode
                    ? 'border-rose-900/40 text-rose-400 hover:bg-rose-950/40 hover:border-rose-800'
                    : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Only My Progress
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('new')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add / Switch Learner
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Switch to another user */}
        {activeTab === 'switch' && (
          <div className="p-6 space-y-4 max-h-[420px] overflow-y-auto">
            <p className="text-xs text-slate-400">
              Select an existing learner to immediately load their independent progress, or sign in by ID:
            </p>

            <div className="space-y-2">
              {allUsers.map((user) => {
                const isSelected = user.userId === currentUser.userId;
                return (
                  <div
                    key={user.userId}
                    onClick={() => {
                      if (!isSelected) {
                        onSwitchUser(user.userId);
                        onClose();
                      }
                    }}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? isDarkMode
                          ? 'bg-indigo-950/40 border-indigo-700/60 text-white'
                          : 'bg-indigo-50 border-indigo-300 text-indigo-950'
                        : isDarkMode
                        ? 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 text-slate-300 hover:bg-zinc-900'
                        : 'bg-white border-slate-200 hover:border-indigo-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl w-8 h-8 rounded-xl bg-zinc-800/60 flex items-center justify-center shrink-0">
                        {user.avatar || '🌳'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">{user.displayName}</span>
                          {isSelected && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-500 text-white">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {user.userId}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-bold text-indigo-400">{user.progress}%</span>
                        <p className="text-[10px] text-slate-400">{user.xp} XP</p>
                      </div>
                      {isSelected ? (
                        <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Sign In by ID / Username across devices */}
            <form onSubmit={handleSignInWithId} className="pt-3 border-t border-zinc-800/60 space-y-2">
              <label className="text-[11px] font-bold text-slate-300 block">
                Sign in with custom User ID / Username (Cross-Device Sync)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customUserIdInput}
                  onChange={(e) => setCustomUserIdInput(e.target.value)}
                  placeholder="e.g. user_alice or mutcharlayasaswi"
                  className={`flex-1 px-3 py-2 rounded-xl text-xs outline-none border transition-all ${
                    isDarkMode
                      ? 'bg-zinc-900 border-zinc-800 focus:border-indigo-500 text-white'
                      : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!customUserIdInput.trim() || isSubmitting}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 transition-all cursor-pointer shrink-0"
                >
                  Load Profile
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Create New Learner */}
        {activeTab === 'new' && (
          <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-400">
              Create a brand new learner account. It will start with completely clean, isolated data (0% progress, 0 XP,
              unanswered quiz).
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Learner Display Name</label>
              <input
                type="text"
                required
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                placeholder="e.g. Learner 2, Alice, Bob"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                  isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 focus:border-indigo-500 text-white'
                    : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Choose Tree Avatar</label>
              <div className="flex flex-wrap gap-2">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all cursor-pointer ${
                      selectedAvatar === av
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 scale-105'
                        : isDarkMode
                        ? 'bg-zinc-900 text-slate-300 hover:bg-zinc-800'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newDisplayName.trim() || isSubmitting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:opacity-95 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isSubmitting ? 'Creating...' : 'Create Isolated Account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
