import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavItem, TopicId, UserData, UserSummary } from './types';
import { RotateCcw } from 'lucide-react';
import { NavigationSidebar } from './components/NavigationSidebar';
import { TopHeader } from './components/TopHeader';
import { UserProfileModal } from './components/UserProfileModal';
import { HomeView } from './components/views/HomeView';
import { LearnView } from './components/views/LearnView';
import { VisualizeView } from './components/views/VisualizeView';
import { QuizView, clearSavedQuizState } from './components/views/QuizView';
import { ProgressView } from './components/views/ProgressView';
import { FloatingChatButton } from './components/FloatingChatButton';
import {
  saveVideoToStorage,
  loadVideoFromStorage,
  deleteVideoFromStorage
} from './utils/videoStorage';
import {
  getActiveUserId,
  setActiveUserId,
  fetchUserData,
  syncUserDataToServer,
  resetUserProgress,
  switchOrCreateUser,
  fetchAllUsers,
  getUserItem,
  setUserItem,
  createDefaultUserData
} from './utils/userStorage';

// Permanent public lesson video bundled with the app
const PUBLIC_LESSON_VIDEO_URL = '/videos/lesson.mp4';
const PUBLIC_LESSON_VIDEO_NAME = 'Tree DSA Complete Visual Lesson';
const PUBLIC_LESSON_VIDEO_SIZE = '1.3 MB';

export default function App() {
  const [currentNav, setCurrentNav] = useState<NavItem>('home');
  const [currentTopicId, setCurrentTopicId] = useState<TopicId>('basics');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Violet/purple dark theme default
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  // Active isolated user state
  const [activeUserId, setActiveUserIdState] = useState<string>(() => getActiveUserId());
  const [currentUser, setCurrentUser] = useState<UserData>(() => {
    const id = getActiveUserId();
    const saved = getUserItem(id, 'profile_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return createDefaultUserData(id);
  });
  const [allUsers, setAllUsers] = useState<UserSummary[]>([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Synchronize theme class on document element for global theme-aware styling
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // Visual Lesson Video State (Shared between Progress and Visualize)
  // Bundled public video is available permanently out-of-the-box
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_video_url');
      if (saved && !saved.startsWith('blob:')) return saved;
    } catch {}
    return PUBLIC_LESSON_VIDEO_URL;
  });
  const [uploadedVideoName, setUploadedVideoName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_video_name');
      if (saved && !saved.toLowerCase().includes('whatsapp')) return saved;
    } catch {}
    return PUBLIC_LESSON_VIDEO_NAME;
  });
  const [uploadedVideoSize, setUploadedVideoSize] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_video_size');
      if (saved) return saved;
    } catch {}
    return PUBLIC_LESSON_VIDEO_SIZE;
  });
  const [isUploadingVideo, setIsUploadingVideo] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isVideoCompleted, setIsVideoCompleted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tree_dsa_video_completed') === 'true';
    } catch {
      return false;
    }
  });
  const [showVisualizeVideo, setShowVisualizeVideo] = useState<boolean>(false);

  // Persist video information to localStorage so it survives page reloads seamlessly
  useEffect(() => {
    try {
      if (uploadedVideoUrl && !uploadedVideoUrl.startsWith('blob:')) {
        localStorage.setItem('tree_dsa_video_url', uploadedVideoUrl);
      }
      if (uploadedVideoName) {
        localStorage.setItem('tree_dsa_video_name', uploadedVideoName);
      }
      if (uploadedVideoSize) {
        localStorage.setItem('tree_dsa_video_size', uploadedVideoSize);
      }
    } catch {}
  }, [uploadedVideoUrl, uploadedVideoName, uploadedVideoSize]);

  // Restore stored user video on startup: first check local IndexedDB, then check server, else public video
  useEffect(() => {
    let isMounted = true;

    const initializeLessonVideo = async () => {
      // Clean up any legacy blob URL in localStorage
      try {
        const savedUrl = localStorage.getItem('tree_dsa_video_url');
        if (savedUrl && savedUrl.startsWith('blob:')) {
          localStorage.removeItem('tree_dsa_video_url');
        }
      } catch {}

      // Check server video status for accurate metadata
      try {
        const res = await fetch('/api/video-status');
        if (res.ok) {
          const data = await res.json();
          if (data.hasVideo && isMounted) {
            const safeName = data.name && !data.name.toLowerCase().includes('whatsapp') ? data.name : PUBLIC_LESSON_VIDEO_NAME;
            setUploadedVideoUrl(PUBLIC_LESSON_VIDEO_URL);
            setUploadedVideoName(safeName);
            setUploadedVideoSize(data.size || PUBLIC_LESSON_VIDEO_SIZE);
            return;
          }
        }
      } catch {
        // Fallback to static public video
      }

      if (isMounted) {
        setUploadedVideoUrl(PUBLIC_LESSON_VIDEO_URL);
        setUploadedVideoName(PUBLIC_LESSON_VIDEO_NAME);
        setUploadedVideoSize(PUBLIC_LESSON_VIDEO_SIZE);
      }
    };

    initializeLessonVideo();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUploadVideo = async (file: File) => {
    if (!file) return;
    if (uploadedVideoUrl && uploadedVideoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(uploadedVideoUrl);
    }

    const localUrl = URL.createObjectURL(file);
    const size = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const displayName = file.name; // Keep user's exact file name!

    // Immediately display locally and save to client IndexedDB
    setUploadedVideoUrl(localUrl);
    setUploadedVideoName(displayName);
    setUploadedVideoSize(size);
    saveVideoToStorage(file, displayName, size);

    // Upload to server so it becomes available across sessions
    setIsUploadingVideo(true);
    setUploadStatus('Saving video...');

    try {
      const res = await fetch('/api/upload-video', {
        method: 'POST',
        headers: {
          'Content-Type': file.type || 'video/mp4',
          'x-file-name': encodeURIComponent(displayName),
          'x-file-size': size,
        },
        body: file,
      });

      if (res.ok) {
        setUploadStatus('Video saved successfully!');
        setTimeout(() => setUploadStatus(''), 3000);
      } else {
        setUploadStatus('Saved in browser storage.');
        setTimeout(() => setUploadStatus(''), 3000);
      }
    } catch (err) {
      console.warn('Could not upload video to server:', err);
      setUploadStatus('Saved in browser storage.');
      setTimeout(() => setUploadStatus(''), 3000);
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleRemoveVideo = () => {
    if (uploadedVideoUrl && uploadedVideoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(uploadedVideoUrl);
    }
    // Reset back to permanent bundled public video
    setUploadedVideoUrl(PUBLIC_LESSON_VIDEO_URL);
    setUploadedVideoName(PUBLIC_LESSON_VIDEO_NAME);
    setUploadedVideoSize(PUBLIC_LESSON_VIDEO_SIZE);
    setShowVisualizeVideo(false);
    deleteVideoFromStorage();
    try {
      localStorage.setItem('tree_dsa_video_url', PUBLIC_LESSON_VIDEO_URL);
      localStorage.setItem('tree_dsa_video_name', PUBLIC_LESSON_VIDEO_NAME);
      localStorage.setItem('tree_dsa_video_size', PUBLIC_LESSON_VIDEO_SIZE);
    } catch {}
  };

  const handleToggleVideoCompleted = () => {
    setIsVideoCompleted((prev) => {
      const next = !prev;
      setUserItem(activeUserId, 'video_completed', String(next));
      return next;
    });
  };

  const handleWatchAgainFromProgress = () => {
    setShowVisualizeVideo(true);
    handleNavigate('visualize');
  };

  // Completed topics & quiz progress tracking in localStorage namespaced per user
  const [completedTopics, setCompletedTopics] = useState<TopicId[]>(() => {
    try {
      const saved = getUserItem(activeUserId, 'completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(() => {
    try {
      const saved = getUserItem(activeUserId, 'quiz_score');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [quizProgress, setQuizProgress] = useState<{ completed: number; total: number }>(() => {
    try {
      const saved = getUserItem(activeUserId, 'quiz_progress');
      if (saved) return JSON.parse(saved);
      const quizState = getUserItem(activeUserId, 'quiz_state');
      if (quizState) {
        const parsed = JSON.parse(quizState);
        const count = Object.keys(parsed?.confirmedQuestions || {}).length;
        return { completed: count, total: 10 };
      }
    } catch {}
    return { completed: 0, total: 10 };
  });

  const [quizKey, setQuizKey] = useState<number>(0);
  const [learnKey, setLearnKey] = useState<number>(0);
  const [showResetToast, setShowResetToast] = useState<boolean>(false);
  const [completedVisualizations, setCompletedVisualizations] = useState<string[]>(() => {
    try {
      const saved = getUserItem(activeUserId, 'completed_visualizations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load user data on startup or when switching active user
  useEffect(() => {
    let isMounted = true;
    const loadUserData = async () => {
      const data = await fetchUserData(activeUserId);
      if (isMounted && data) {
        setCurrentUser(data);
        setCompletedTopics(data.completedTopics || []);
        setQuizScore(data.quizScore || null);
        setQuizProgress(data.quizProgress || { completed: 0, total: 10 });
        setIsVideoCompleted(Boolean(data.videoCompleted));
        setCompletedVisualizations(data.completedVisualizations || []);
      }
      const users = await fetchAllUsers();
      if (isMounted) {
        setAllUsers(users);
      }
    };
    loadUserData();
    return () => {
      isMounted = false;
    };
  }, [activeUserId]);

  // Synchronize active user state to backend and update window evaluation properties
  useEffect(() => {
    // Overall TreeDSA progress calculation (weighted: 60% learn, 20% viz, 20% quiz)
    const totalTopicsCount = 7;
    const learnWeight = (completedTopics.length / totalTopicsCount) * 60;
    const vizWeight = isVideoCompleted ? 20 : 0;
    const quizWeight = quizScore
      ? (quizScore.score / quizScore.total) * 20
      : (quizProgress.completed / 10) * 10;
    const overallPercentage = Math.min(100, Math.round(learnWeight + vizWeight + quizWeight));
    const calcXP =
      completedTopics.length * 10 +
      (isVideoCompleted ? 20 : 0) +
      (quizScore ? quizScore.score * 10 : quizProgress.completed * 5);

    const updatedUser: UserData = {
      ...currentUser,
      userId: activeUserId,
      progress: overallPercentage,
      xp: calcXP,
      score: quizScore?.score || 0,
      completedTopics,
      completedVisualizations,
      quizScore,
      quizProgress,
      videoCompleted: isVideoCompleted,
      lastUpdated: Date.now(),
    };

    setCurrentUser(updatedUser);
    syncUserDataToServer(updatedUser);

    // Keep window global object in sync for automated evaluation suites (active user)
    if (typeof window !== 'undefined') {
      const w = window as any;
      w.currentUser = updatedUser;
      w.activeUserId = activeUserId;
      w.overallProgress = overallPercentage;
      w.score = quizScore?.score || 0;
      w.xp = calcXP;
      w.completedTopics = completedTopics;
      w.learnCompleted = completedTopics.length;
      w.visualizeCompleted = isVideoCompleted ? 1 : 0;
      w.gameProgress = quizProgress.completed;
      w.gameScore = quizScore?.score || 0;
      w.gameXP = calcXP;
      w.quizAnswered = quizProgress.completed;
      w.quizScore = quizScore?.score || 0;
      w.treeDsaProgress = {
        overallProgress: overallPercentage,
        score: quizScore?.score || 0,
        xp: calcXP,
        completedTopics,
        learnCompleted: completedTopics.length,
        visualizeCompleted: isVideoCompleted ? 1 : 0,
        gameProgress: quizProgress.completed,
        gameScore: quizScore?.score || 0,
        gameXP: calcXP,
        quizAnswered: quizProgress.completed,
        quizScore: quizScore?.score || 0,
      };
    }
  }, [completedTopics, quizScore, quizProgress, isVideoCompleted, completedVisualizations, activeUserId]);

  const handleSwitchUser = async (targetUserId: string) => {
    setActiveUserId(targetUserId);
    setActiveUserIdState(targetUserId);
    const data = await fetchUserData(targetUserId);
    setCurrentUser(data);
    setCompletedTopics(data.completedTopics || []);
    setQuizScore(data.quizScore || null);
    setQuizProgress(data.quizProgress || { completed: 0, total: 10 });
    setIsVideoCompleted(Boolean(data.videoCompleted));
    setCompletedVisualizations(data.completedVisualizations || []);
    setQuizKey((prev) => prev + 1);
    setLearnKey((prev) => prev + 1);
    const users = await fetchAllUsers();
    setAllUsers(users);
  };

  const handleCreateUser = async (displayName: string, avatar: string) => {
    const newUser = await switchOrCreateUser(undefined, displayName, avatar);
    setActiveUserId(newUser.userId);
    setActiveUserIdState(newUser.userId);
    setCurrentUser(newUser);
    setCompletedTopics([]);
    setQuizScore(null);
    setQuizProgress({ completed: 0, total: 10 });
    setIsVideoCompleted(false);
    setCompletedVisualizations([]);
    setQuizKey((prev) => prev + 1);
    setLearnKey((prev) => prev + 1);
    const users = await fetchAllUsers();
    setAllUsers(users);
  };

  const handleResetProgress = useCallback(async () => {
    // 1. Reset all React state to initial zero/empty state for active user
    setCompletedTopics([]);
    setQuizScore(null);
    setQuizProgress({ completed: 0, total: 10 });
    setIsVideoCompleted(false);
    setCompletedVisualizations([]);
    setShowVisualizeVideo(false);
    setQuizKey((prev) => prev + 1);
    setLearnKey((prev) => prev + 1);

    // 2. Clear Quiz in-memory cache and storage for this user only
    clearSavedQuizState(activeUserId);

    // 3. Reset user data on backend and local storage (leaves other users completely untouched)
    const resetData = await resetUserProgress(activeUserId);
    setCurrentUser(resetData);

    const users = await fetchAllUsers();
    setAllUsers(users);

    // 4. Reset global window state for active user
    if (typeof window !== 'undefined') {
      const w = window as any;
      w.overallProgress = 0;
      w.score = 0;
      w.xp = 0;
      w.completedTopics = [];
      w.learnCompleted = 0;
      w.visualizeCompleted = 0;
      w.gameProgress = 0;
      w.gameScore = 0;
      w.gameXP = 0;
      w.quizAnswered = 0;
      w.quizScore = 0;
      w.quizCorrect = 0;
      w.quizIncorrect = 0;
      w.quizAnswers = {};
      w.quizResults = {};
    }
  }, [activeUserId]);

  // Expose global methods for evaluation and external test automation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const w = window as any;
      w.resetProgress = handleResetProgress;
      w.switchUser = handleSwitchUser;
      w.createUser = handleCreateUser;
      w.getUserData = (id: string) => fetchUserData(id);
    }
  }, [handleResetProgress]);

  const handleMarkTopicCompleted = (topicId: TopicId) => {
    setCompletedTopics((prev) => {
      let next: TopicId[];
      if (prev.includes(topicId)) {
        next = prev.filter((id) => id !== topicId);
      } else {
        next = [...prev, topicId];
      }
      setUserItem(activeUserId, 'completed_topics', JSON.stringify(next));
      return next;
    });
  };

  const handleUpdateQuizScore = (score: number, total: number) => {
    const data = { score, total };
    setQuizScore(data);
    setUserItem(activeUserId, 'quiz_score', JSON.stringify(data));
  };

  const handleUpdateQuizProgress = (completed: number, total: number) => {
    const data = { completed, total };
    setQuizProgress(data);
    setUserItem(activeUserId, 'quiz_progress', JSON.stringify(data));
  };

  const handleNavigate = (nav: NavItem, topicId?: TopicId) => {
    setCurrentNav(nav);
    if (topicId) {
      setCurrentTopicId(topicId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      data-theme={isDarkMode ? 'dark' : 'light'}
      className={`min-h-screen transition-colors duration-300 relative ${
        isDarkMode
          ? 'bg-black text-slate-100 selection:bg-indigo-600 selection:text-white'
          : 'bg-[#F8FAFF] text-slate-900 selection:bg-indigo-600 selection:text-white'
      }`}
    >
      {/* Ambient background glow accents matching the Electric Blue to Violet theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full blur-3xl transition-opacity duration-500 ${
            isDarkMode ? 'bg-blue-600/5' : 'bg-blue-500/5'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-3xl transition-opacity duration-500 ${
            isDarkMode ? 'bg-purple-600/5' : 'bg-purple-500/5'
          }`}
        />
      </div>

      {/* Left-Side Navigation Sidebar */}
      <NavigationSidebar
        currentNav={currentNav}
        onSelectNav={(nav) => handleNavigate(nav)}
        isOpen={isSidebarOpen}
        onToggleOpen={handleToggleSidebar}
        onClose={() => setIsSidebarOpen(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        userId={currentUser.userId}
        completedTopics={completedTopics}
        quizScore={quizScore}
        quizProgress={quizProgress}
        completedVisualizations={completedVisualizations}
        isVideoCompleted={isVideoCompleted}
        isSoundOn={isSoundOn}
        onToggleSound={() => setIsSoundOn((prev) => !prev)}
      />

      {/* Main Content Area (Expands to full width when sidebar is closed) */}
      <div
        className={`transition-all duration-300 flex flex-col min-h-screen ${
          isSidebarOpen ? 'md:ml-72' : 'ml-0'
        }`}
      >
        {/* Top Header Bar */}
        <TopHeader
          currentNav={currentNav}
          onToggleSidebar={handleToggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          currentUser={currentUser}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onResetPage={() => {
            handleResetProgress();
            setShowResetToast(true);
            setTimeout(() => setShowResetToast(false), 2500);
          }}
          isSoundOn={isSoundOn}
          onToggleSound={() => setIsSoundOn((prev) => !prev)}
          onNavigateHome={() => handleNavigate('home')}
        />

        {/* View Content Renderer */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentNav === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              isDarkMode={isDarkMode}
            />
          )}

          {currentNav === 'learn' && (
            <LearnView
              key={learnKey}
              currentTopicId={currentTopicId}
              onSelectTopic={(topicId) => {
                setCurrentTopicId(topicId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isDarkMode={isDarkMode}
              completedTopics={completedTopics}
              onMarkTopicCompleted={handleMarkTopicCompleted}
            />
          )}

          {currentNav === 'visualize' && (
            <VisualizeView
              isDarkMode={isDarkMode}
              userId={currentUser.userId}
              videoUrl={uploadedVideoUrl}
              videoName={uploadedVideoName}
              videoSize={uploadedVideoSize}
              isVideoCompleted={isVideoCompleted}
              onToggleVideoCompleted={handleToggleVideoCompleted}
              onUploadVideo={handleUploadVideo}
              isUploadingVideo={isUploadingVideo}
              uploadStatus={uploadStatus}
            />
          )}

          {currentNav === 'quiz' && (
            <QuizView
              key={quizKey}
              isDarkMode={isDarkMode}
              userId={currentUser.userId}
              onUpdateQuizScore={handleUpdateQuizScore}
              onUpdateQuizProgress={handleUpdateQuizProgress}
            />
          )}

          {currentNav === 'progress' && (
            <ProgressView
              userId={currentUser.userId}
              completedTopics={completedTopics}
              quizScore={quizScore}
              completedVisualizations={completedVisualizations}
              onNavigate={handleNavigate}
              onResetProgress={() => {
                handleResetProgress();
                setShowResetToast(true);
                setTimeout(() => setShowResetToast(false), 2500);
              }}
              isDarkMode={isDarkMode}
              uploadedVideoUrl={uploadedVideoUrl}
              uploadedVideoName={uploadedVideoName}
              uploadedVideoSize={uploadedVideoSize}
              isVideoCompleted={isVideoCompleted}
              onUploadVideo={handleUploadVideo}
              onRemoveVideo={handleRemoveVideo}
              onToggleVideoCompleted={handleToggleVideoCompleted}
              onWatchAgain={handleWatchAgainFromProgress}
            />
          )}
        </main>
      </div>

      {/* User Profile & Account Switcher Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        allUsers={allUsers}
        isDarkMode={isDarkMode}
        onSwitchUser={handleSwitchUser}
        onCreateUser={handleCreateUser}
        onResetCurrentUser={() => {
          handleResetProgress();
          setShowResetToast(true);
          setTimeout(() => setShowResetToast(false), 2500);
        }}
      />

      {/* Floating Chat / Support Button at Bottom-Right (Matching Provided Image) */}
      <FloatingChatButton isDarkMode={isDarkMode} isSoundOn={isSoundOn} />

      {/* Floating Reset Confirmation Toast */}
      {showResetToast && (
        <div
          id="reset-notification-toast"
          role="status"
          aria-live="polite"
          className={`fixed bottom-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-semibold backdrop-blur-md transition-all duration-300 animate-bounce ${
            isDarkMode
              ? 'bg-[#0f172a]/95 text-emerald-400 border-emerald-500/40 shadow-emerald-950/60'
              : 'bg-white/95 text-emerald-700 border-emerald-200 shadow-slate-300/60'
          }`}
        >
          <RotateCcw className="w-4 h-4 text-emerald-500 animate-spin" />
          <span>Learner {currentUser.displayName}&apos;s progress, quiz scores, and saved state have been reset!</span>
        </div>
      )}
    </div>
  );
}
