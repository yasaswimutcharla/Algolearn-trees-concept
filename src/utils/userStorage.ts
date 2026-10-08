import { UserData, UserSummary } from '../types';

// In-memory fallback map to ensure total isolation even if browser storage is restricted
const memoryStorageMap = new Map<string, string>();

// Unique active session ID key in sessionStorage (per browser tab/window)
const SESSION_USER_KEY = 'app_session_user_id';
const LOCAL_USER_KEY = 'app_last_active_user_id';

/**
 * Creates default 0% initial state for a fresh user
 */
export const createDefaultUserData = (userId: string, displayName?: string, avatar?: string): UserData => {
  const shortId = userId.replace(/^user_/, '').slice(0, 4);
  const name = displayName?.trim() || `Learner ${shortId || '1'}`;
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
    learningStreak: 0,
    timelineTimestamps: {},
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
 * Generates a cryptographically strong unique random user ID
 */
export const generateUniqueUserId = (): string => {
  const rand1 = Math.random().toString(36).substring(2, 9);
  const rand2 = Math.random().toString(36).substring(2, 9);
  const timestamp = Date.now().toString(36);
  return `user_${timestamp}_${rand1}${rand2}`;
};

/**
 * Returns currently active user ID.
 * Prioritizes window/session storage for tab-level isolation (satisfying multi-window isolation).
 * Generates a fresh unique user ID on first visit.
 */
export const getActiveUserId = (): string => {
  // 1. First check URL query parameter (e.g. ?uid=user_xxx)
  if (typeof window !== 'undefined' && window.location?.search) {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlUid = params.get('uid');
      if (urlUid && urlUid.trim()) {
        const cleanUid = urlUid.trim();
        setActiveUserId(cleanUid);
        return cleanUid;
      }
    } catch {}
  }

  // 2. Check tab session storage (guarantees window A and window B remain separate)
  try {
    const sessionUid = sessionStorage.getItem(SESSION_USER_KEY);
    if (sessionUid && sessionUid.trim()) {
      return sessionUid.trim();
    }
  } catch {}

  // 3. Check in-memory session map
  const inMemSession = memoryStorageMap.get(SESSION_USER_KEY);
  if (inMemSession && inMemSession.trim()) {
    return inMemSession.trim();
  }

  // 4. Fresh visitor: generate a completely new isolated user ID
  const newUserId = generateUniqueUserId();
  setActiveUserId(newUserId);
  return newUserId;
};

/**
 * Sets the active user ID in session, local, and in-memory storage.
 */
export const setActiveUserId = (userId: string): void => {
  if (!userId || !userId.trim()) return;
  const cleanId = userId.trim();

  try {
    sessionStorage.setItem(SESSION_USER_KEY, cleanId);
  } catch {}

  try {
    localStorage.setItem(LOCAL_USER_KEY, cleanId);
  } catch {}

  memoryStorageMap.set(SESSION_USER_KEY, cleanId);
};

/**
 * Generates an isolated, user-namespaced storage key following the pattern:
 * app_progress_<uniqueUserId>, app_completed_topics_<uniqueUserId>, etc.
 */
export const getUserStorageKey = (userId: string, key: string): string => {
  const safeId = (userId || 'anon').replace(/[^a-zA-Z0-9_-]/g, '_');
  return `app_${key}_${safeId}`;
};

/**
 * Read user-specific item from storage (sessionStorage -> localStorage -> memoryStorage)
 */
export const getUserItem = (userId: string, key: string): string | null => {
  const storageKey = getUserStorageKey(userId, key);

  try {
    const val = sessionStorage.getItem(storageKey);
    if (val !== null) return val;
  } catch {}

  try {
    const val = localStorage.getItem(storageKey);
    if (val !== null) return val;
  } catch {}

  return memoryStorageMap.get(storageKey) ?? null;
};

/**
 * Write user-specific item to storage
 */
export const setUserItem = (userId: string, key: string, value: string): void => {
  const storageKey = getUserStorageKey(userId, key);

  try {
    sessionStorage.setItem(storageKey, value);
  } catch {}

  try {
    localStorage.setItem(storageKey, value);
  } catch {}

  memoryStorageMap.set(storageKey, value);
};

/**
 * Remove user-specific item from storage
 */
export const removeUserItem = (userId: string, key: string): void => {
  const storageKey = getUserStorageKey(userId, key);

  try {
    sessionStorage.removeItem(storageKey);
  } catch {}

  try {
    localStorage.removeItem(storageKey);
  } catch {}

  memoryStorageMap.delete(storageKey);
};

/**
 * Purge ONLY this user's keys without affecting any other user's data
 */
export const resetUserStorage = (userId: string): void => {
  const safeId = (userId || 'anon').replace(/[^a-zA-Z0-9_-]/g, '_');
  const userSuffix = `_${safeId}`;

  // Purge from sessionStorage
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k && (k.endsWith(userSuffix) || k.includes(`_${safeId}_`))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => sessionStorage.removeItem(k));
  } catch {}

  // Purge from localStorage
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.endsWith(userSuffix) || k.includes(`_${safeId}_`))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}

  // Purge from in-memory map
  for (const k of Array.from(memoryStorageMap.keys())) {
    if (k.endsWith(userSuffix) || k.includes(`_${safeId}_`)) {
      memoryStorageMap.delete(k);
    }
  }
};

/**
 * Fetch all available user profiles from backend
 */
export const fetchAllUsers = async (): Promise<UserSummary[]> => {
  try {
    const res = await fetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      return data.users || [];
    }
  } catch (err) {
    console.warn('Failed to fetch users from server:', err);
  }
  return [];
};

/**
 * Load user data from server, falling back to namespaced client storage
 */
export const fetchUserData = async (userId: string): Promise<UserData> => {
  // 1. Try fetching from server
  try {
    const res = await fetch(`/api/users/${encodeURIComponent(userId)}`);
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && serverData.userId === userId) {
        return serverData;
      }
    }
  } catch (err) {
    console.warn(`Could not fetch data for user ${userId} from server:`, err);
  }

  // 2. Fallback: check isolated namespaced client storage
  try {
    const saved = getUserItem(userId, 'progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.userId === userId) {
        return parsed;
      }
    }
  } catch {}

  // 3. Fresh user first visit -> initialize strictly 0% state
  return createDefaultUserData(userId);
};

/**
 * Save user data to server and user-isolated local storage
 */
export const syncUserDataToServer = async (userData: UserData): Promise<void> => {
  if (!userData || !userData.userId) return;
  const uid = userData.userId;

  try {
    // Save to user-isolated namespaced keys
    setUserItem(uid, 'progress', JSON.stringify(userData));
    setUserItem(uid, 'completed_topics', JSON.stringify(userData.completedTopics || []));
    if (userData.quizScore) {
      setUserItem(uid, 'quiz_score', JSON.stringify(userData.quizScore));
    } else {
      removeUserItem(uid, 'quiz_score');
    }
    setUserItem(uid, 'quiz_progress', JSON.stringify(userData.quizProgress || { completed: 0, total: 10 }));
    setUserItem(uid, 'video_completed', String(Boolean(userData.videoCompleted)));
    setUserItem(uid, 'completed_visualizations', JSON.stringify(userData.completedVisualizations || []));

    // Sync to backend API
    await fetch(`/api/users/${encodeURIComponent(uid)}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  } catch (err) {
    console.warn('Failed to sync user data to server:', err);
  }
};

/**
 * Reset user progress on server and local storage for this user ONLY
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
        setUserItem(userId, 'progress', JSON.stringify(data.user));
        return data.user;
      }
    }
  } catch (err) {
    console.warn('Failed to reset user on server:', err);
  }

  const fresh = createDefaultUserData(userId);
  setUserItem(userId, 'progress', JSON.stringify(fresh));
  return fresh;
};

/**
 * Switch or create user profile
 */
export const switchOrCreateUser = async (
  userId?: string,
  displayName?: string,
  avatar?: string
): Promise<UserData> => {
  const targetId = userId?.trim() || generateUniqueUserId();

  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: targetId, displayName, avatar }),
    });
    if (res.ok) {
      const data = await res.json();
      setActiveUserId(data.userId);
      setUserItem(data.userId, 'progress', JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Failed to switch/create user on server:', err);
  }

  const fallback = createDefaultUserData(targetId, displayName, avatar);
  setActiveUserId(targetId);
  setUserItem(targetId, 'progress', JSON.stringify(fallback));
  return fallback;
};
