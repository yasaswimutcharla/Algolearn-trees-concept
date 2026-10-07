import { UserData, UserSummary, TopicId } from '../types';

const ACTIVE_USER_STORAGE_KEY = 'tree_dsa_active_user_id';

// Default initial state for a fresh user (strictly isolated, zero progress)
export const createDefaultUserData = (userId: string, displayName?: string, avatar?: string): UserData => {
  const name = displayName?.trim() || (userId.startsWith('user_') ? `Learner ${userId.replace('user_', '').slice(0, 4)}` : userId);
  return {
    userId,
    displayName: name,
    avatar: avatar || '🌳',
    progress: 0,
    xp: 0,
    score: 0,
    completedTopics: [],
    completedVisualizations: [],
    quizScore: null,
    quizProgress: { completed: 0, total: 10 },
    quizState: null,
    gameScore: 0,
    gameXP: 0,
    achievements: [],
    videoCompleted: false,
    learningStreak: 1,
    timelineTimestamps: { joined: Date.now() },
    joinedTime: Date.now(),
    currentNav: 'home',
    currentTopicId: 'basics',
    settings: {
      isDarkMode: true,
      isSoundOn: true,
    },
    lastUpdated: Date.now(),
  };
};

/**
 * Returns currently active user ID. Generates an isolated user ID if first visit.
 */
export const getActiveUserId = (): string => {
  try {
    const existing = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
    if (existing && existing.trim()) {
      return existing.trim();
    }
    const newId = `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    localStorage.setItem(ACTIVE_USER_STORAGE_KEY, newId);
    return newId;
  } catch {
    return 'user_default';
  }
};

/**
 * Sets the active user ID in local storage.
 */
export const setActiveUserId = (userId: string): void => {
  try {
    localStorage.setItem(ACTIVE_USER_STORAGE_KEY, userId);
  } catch {}
};

/**
 * Generates an isolated, user-namespaced storage key.
 */
export const getUserStorageKey = (userId: string, key: string): string => {
  const safeId = (userId || 'default').replace(/[^a-zA-Z0-9_-]/g, '_');
  return `tree_dsa_${safeId}_${key}`;
};

/**
 * Read user-specific item from localStorage
 */
export const getUserItem = (userId: string, key: string): string | null => {
  try {
    return localStorage.getItem(getUserStorageKey(userId, key));
  } catch {
    return null;
  }
};

/**
 * Write user-specific item to localStorage
 */
export const setUserItem = (userId: string, key: string, value: string): void => {
  try {
    localStorage.setItem(getUserStorageKey(userId, key), value);
  } catch {}
};

/**
 * Remove user-specific item from localStorage
 */
export const removeUserItem = (userId: string, key: string): void => {
  try {
    localStorage.removeItem(getUserStorageKey(userId, key));
  } catch {}
};

/**
 * Purge ONLY this user's keys from localStorage without touching any other user
 */
export const resetUserStorage = (userId: string): void => {
  try {
    const prefix = `tree_dsa_${(userId || 'default').replace(/[^a-zA-Z0-9_-]/g, '_')}_`;
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        // Keep theme and sound preferences if desired, or remove everything for that user
        if (key.endsWith('_theme') || key.endsWith('_sound')) continue;
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}
};

/**
 * Fetch all available users from backend
 */
export const fetchAllUsers = async (): Promise<UserSummary[]> => {
  try {
    const res = await fetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      return data.users || [];
    }
  } catch (err) {
    console.warn('Failed to fetch users from backend:', err);
  }
  return [];
};

/**
 * Load user data from server (falls back to namespaced localStorage)
 */
export const fetchUserData = async (userId: string): Promise<UserData> => {
  try {
    const res = await fetch(`/api/users/${encodeURIComponent(userId)}`);
    if (res.ok) {
      const serverData = await res.json();
      return serverData;
    }
  } catch (err) {
    console.warn(`Could not fetch data for user ${userId} from server:`, err);
  }

  // Fallback: reconstruct from namespaced localStorage
  try {
    const saved = getUserItem(userId, 'profile_data');
    if (saved) return JSON.parse(saved);
  } catch {}

  return createDefaultUserData(userId);
};

/**
 * Save user data to server and local storage
 */
export const syncUserDataToServer = async (userData: UserData): Promise<void> => {
  try {
    // Save to namespaced localStorage immediately for instant responsiveness
    setUserItem(userData.userId, 'profile_data', JSON.stringify(userData));
    setUserItem(userData.userId, 'completed_topics', JSON.stringify(userData.completedTopics));
    if (userData.quizScore) {
      setUserItem(userData.userId, 'quiz_score', JSON.stringify(userData.quizScore));
    } else {
      removeUserItem(userData.userId, 'quiz_score');
    }
    setUserItem(userData.userId, 'quiz_progress', JSON.stringify(userData.quizProgress));
    setUserItem(userData.userId, 'video_completed', String(userData.videoCompleted));
    setUserItem(userData.userId, 'completed_visualizations', JSON.stringify(userData.completedVisualizations));

    // Sync to backend
    await fetch(`/api/users/${encodeURIComponent(userData.userId)}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  } catch (err) {
    console.warn('Failed to sync user data to server:', err);
  }
};

/**
 * Reset user progress on server and local storage
 */
export const resetUserProgress = async (userId: string): Promise<UserData> => {
  resetUserStorage(userId);
  try {
    const res = await fetch(`/api/users/${encodeURIComponent(userId)}/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        setUserItem(userId, 'profile_data', JSON.stringify(data.user));
        return data.user;
      }
    }
  } catch (err) {
    console.warn('Failed to reset user on server:', err);
  }
  const fallback = createDefaultUserData(userId);
  setUserItem(userId, 'profile_data', JSON.stringify(fallback));
  return fallback;
};

/**
 * Switch or create user profile on server
 */
export const switchOrCreateUser = async (
  userId?: string,
  displayName?: string,
  avatar?: string
): Promise<UserData> => {
  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, displayName, avatar }),
    });
    if (res.ok) {
      const data = await res.json();
      setActiveUserId(data.userId);
      setUserItem(data.userId, 'profile_data', JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Failed to switch/create user on server:', err);
  }

  const targetId = userId || `user_${Date.now().toString(36)}`;
  const fallback = createDefaultUserData(targetId, displayName, avatar);
  setActiveUserId(targetId);
  setUserItem(targetId, 'profile_data', JSON.stringify(fallback));
  return fallback;
};
