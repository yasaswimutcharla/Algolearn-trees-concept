import React, { useState, useEffect } from 'react';
import { NavItem, TopicId } from './types';
import { NavigationSidebar } from './components/NavigationSidebar';
import { TopHeader } from './components/TopHeader';
import { HomeView } from './components/views/HomeView';
import { LearnView } from './components/views/LearnView';
import { VisualizeView } from './components/views/VisualizeView';
import { QuizView, clearSavedQuizState } from './components/views/QuizView';
import { ProgressView } from './components/views/ProgressView';
import {
  saveVideoToStorage,
  loadVideoFromStorage,
  deleteVideoFromStorage
} from './utils/videoStorage';

export default function App() {
  const [currentNav, setCurrentNav] = useState<NavItem>('home');
  const [currentTopicId, setCurrentTopicId] = useState<TopicId>('basics');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Violet/purple dark theme default
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

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
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [uploadedVideoName, setUploadedVideoName] = useState<string>('');
  const [uploadedVideoSize, setUploadedVideoSize] = useState<string>('');
  const [isVideoCompleted, setIsVideoCompleted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tree_dsa_video_completed') === 'true';
    } catch {
      return false;
    }
  });
  const [showVisualizeVideo, setShowVisualizeVideo] = useState<boolean>(false);

  // Restore stored video from IndexedDB on startup
  useEffect(() => {
    loadVideoFromStorage().then((data) => {
      if (data && data.blob) {
        const url = URL.createObjectURL(data.blob);
        setUploadedVideoUrl(url);
        setUploadedVideoName(data.name || 'Tree DSA Complete Visual Lesson');
        setUploadedVideoSize(data.size || '');
      }
    });
  }, []);

  const handleUploadVideo = (file: File) => {
    if (!file) return;
    if (uploadedVideoUrl) {
      URL.revokeObjectURL(uploadedVideoUrl);
    }
    const url = URL.createObjectURL(file);
    const size = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    setUploadedVideoUrl(url);
    setUploadedVideoName(file.name);
    setUploadedVideoSize(size);
    saveVideoToStorage(file, file.name, size);
  };

  const handleRemoveVideo = () => {
    if (uploadedVideoUrl) {
      URL.revokeObjectURL(uploadedVideoUrl);
    }
    setUploadedVideoUrl(null);
    setUploadedVideoName('');
    setUploadedVideoSize('');
    setShowVisualizeVideo(false);
    deleteVideoFromStorage();
  };

  const handleToggleVideoCompleted = () => {
    setIsVideoCompleted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('tree_dsa_video_completed', String(next));
      } catch {}
      return next;
    });
  };

  const handleWatchAgainFromProgress = () => {
    setShowVisualizeVideo(true);
    handleNavigate('visualize');
  };

  // Completed topics & quiz progress tracking in localStorage (defaults to empty array 0/6)
  const [completedTopics, setCompletedTopics] = useState<TopicId[]>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_quiz_score');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [quizProgress, setQuizProgress] = useState<{ completed: number; total: number }>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_quiz_progress');
      if (saved) return JSON.parse(saved);
      const quizState = localStorage.getItem('tree_dsa_quiz_state');
      if (quizState) {
        const parsed = JSON.parse(quizState);
        const count = Object.keys(parsed?.confirmedQuestions || {}).length;
        return { completed: count, total: 10 };
      }
    } catch {}
    return { completed: 0, total: 10 };
  });

  const [quizKey, setQuizKey] = useState<number>(0);
  const [completedVisualizations, setCompletedVisualizations] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tree_dsa_completed_visualizations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleMarkTopicCompleted = (topicId: TopicId) => {
    setCompletedTopics((prev) => {
      let next: TopicId[];
      if (prev.includes(topicId)) {
        next = prev.filter((id) => id !== topicId);
      } else {
        next = [...prev, topicId];
      }
      try {
        localStorage.setItem('tree_dsa_completed_topics', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleUpdateQuizScore = (score: number, total: number) => {
    const data = { score, total };
    setQuizScore(data);
    try {
      localStorage.setItem('tree_dsa_quiz_score', JSON.stringify(data));
    } catch {}
  };

  const handleUpdateQuizProgress = (completed: number, total: number) => {
    const data = { completed, total };
    setQuizProgress(data);
    try {
      localStorage.setItem('tree_dsa_quiz_progress', JSON.stringify(data));
    } catch {}
  };

  const handleResetProgress = () => {
    // 1. Reset all React state to initial zero/empty state
    setCompletedTopics([]);
    setQuizScore(null);
    setQuizProgress({ completed: 0, total: 10 });
    setIsVideoCompleted(false);
    setCompletedVisualizations([]);
    setQuizKey((prev) => prev + 1);

    // 2. Clear Quiz in-memory cache and storage
    clearSavedQuizState();

    // 3. Clear and persist the reset values to localStorage and sessionStorage
    try {
      localStorage.setItem('tree_dsa_completed_topics', JSON.stringify([]));
      localStorage.removeItem('tree_dsa_quiz_score');
      localStorage.setItem('tree_dsa_quiz_progress', JSON.stringify({ completed: 0, total: 10 }));
      localStorage.setItem('tree_dsa_video_completed', 'false');
      localStorage.setItem('tree_dsa_completed_visualizations', JSON.stringify([]));

      localStorage.removeItem('tree_dsa_quiz_state');
      sessionStorage.removeItem('tree_dsa_quiz_state');

      // Purge any fallback, legacy, or topic/quiz/game/progress keys
      const allStorageKeys = Object.keys(localStorage);
      for (const key of allStorageKeys) {
        if (key === 'tree_dsa_theme' || key === 'tree_dsa_sound') continue;
        if (
          key.includes('quiz') ||
          key.includes('score') ||
          key.includes('progress') ||
          key.includes('topic') ||
          key.includes('completed') ||
          (key.includes('video') && key !== 'tree_dsa_video_completed') ||
          key.includes('viz') ||
          key.includes('game') ||
          key.includes('xp') ||
          key.includes('learn')
        ) {
          localStorage.removeItem(key);
        }
      }
      sessionStorage.clear();
    } catch {}
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
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#080c16] text-slate-100 selection:bg-violet-600 selection:text-white'
          : 'bg-white text-black selection:bg-blue-600 selection:text-white'
      }`}
    >
      {/* Left-Side Navigation Sidebar */}
      <NavigationSidebar
        currentNav={currentNav}
        onSelectNav={(nav) => handleNavigate(nav)}
        isOpen={isSidebarOpen}
        onToggleOpen={handleToggleSidebar}
        onClose={() => setIsSidebarOpen(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        completedTopics={completedTopics}
        quizScore={quizScore}
        quizProgress={quizProgress}
        isVideoCompleted={isVideoCompleted}
        isSoundOn={isSoundOn}
        onToggleSound={() => setIsSoundOn((prev) => !prev)}
        onResetProgress={handleResetProgress}
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
          onResetPage={() => handleNavigate('home')}
          isSoundOn={isSoundOn}
          onToggleSound={() => setIsSoundOn((prev) => !prev)}
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
              videoUrl={uploadedVideoUrl}
              videoName={uploadedVideoName}
              videoSize={uploadedVideoSize}
              isVideoCompleted={isVideoCompleted}
              onToggleVideoCompleted={handleToggleVideoCompleted}
              onUploadVideo={handleUploadVideo}
              onRemoveVideo={handleRemoveVideo}
            />
          )}

          {currentNav === 'quiz' && (
            <QuizView
              key={quizKey}
              isDarkMode={isDarkMode}
              onUpdateQuizScore={handleUpdateQuizScore}
              onUpdateQuizProgress={handleUpdateQuizProgress}
            />
          )}

          {currentNav === 'progress' && (
            <ProgressView
              completedTopics={completedTopics}
              quizScore={quizScore}
              completedVisualizations={completedVisualizations}
              onNavigate={handleNavigate}
              onResetProgress={handleResetProgress}
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
    </div>
  );
}
