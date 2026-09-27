const DB_NAME = 'OfflineOrbitDB';
const DB_VERSION = 2; // Incremented DB Version for Video Blobs & Idempotent Sync

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Store 1: Downloaded Lesson Packs
      if (!db.objectStoreNames.contains('downloadedPacks')) {
        db.createObjectStore('downloadedPacks', { keyPath: 'packId' });
      }

      // Store 2: Pending Offline Progress Queue
      if (!db.objectStoreNames.contains('pendingSync')) {
        db.createObjectStore('pendingSync', { keyPath: 'id' });
      }

      // Store 3: Cached Lessons List
      if (!db.objectStoreNames.contains('lessonsCache')) {
        db.createObjectStore('lessonsCache', { keyPath: '_id' });
      }

      // Store 4: App State / Settings
      if (!db.objectStoreNames.contains('appSettings')) {
        db.createObjectStore('appSettings', { keyPath: 'key' });
      }

      // Store 5: Downloaded Standalone Multilingual Video Blobs (Picture + Sound)
      if (!db.objectStoreNames.contains('downloadedVideos')) {
        db.createObjectStore('downloadedVideos', { keyPath: 'videoId' });
      }

      // Store 6: Idempotent Sync Hashes
      if (!db.objectStoreNames.contains('idempotentSyncKeys')) {
        db.createObjectStore('idempotentSyncKeys', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// --- Store 1: Downloaded Packs ---
export const saveDownloadedPack = async (packData) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('downloadedPacks', 'readwrite');
    const store = tx.objectStore('downloadedPacks');
    const request = store.put(packData);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

export const getAllDownloadedPacks = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('downloadedPacks', 'readonly');
    const store = tx.objectStore('downloadedPacks');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};

export const getDownloadedPackById = async (packId) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('downloadedPacks', 'readonly');
    const store = tx.objectStore('downloadedPacks');
    const request = store.get(packId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteDownloadedPack = async (packId) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('downloadedPacks', 'readwrite');
    const store = tx.objectStore('downloadedPacks');
    const request = store.delete(packId);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

// --- Store 5: Multilingual Standalone Video Blobs ---
export const saveDownloadedVideo = async (videoData) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('downloadedVideos', 'readwrite');
    const store = tx.objectStore('downloadedVideos');
    const request = store.put(videoData);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

export const getDownloadedVideo = async (videoId) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('downloadedVideos', 'readonly');
    const store = tx.objectStore('downloadedVideos');
    const request = store.get(videoId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAllDownloadedVideos = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('downloadedVideos', 'readonly');
    const store = tx.objectStore('downloadedVideos');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};

export const deleteDownloadedVideo = async (videoId) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('downloadedVideos', 'readwrite');
    const store = tx.objectStore('downloadedVideos');
    const request = store.delete(videoId);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

// --- Store 2: Pending Offline Sync Queue ---
export const queueOfflineAttempt = async (attemptData) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pendingSync', 'readwrite');
    const store = tx.objectStore('pendingSync');
    const item = {
      id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      ...attemptData
    };
    const request = store.put(item);
    request.onsuccess = () => resolve(item);
    request.onerror = () => reject(request.error);
  });
};

export const getPendingSyncAttempts = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pendingSync', 'readonly');
    const store = tx.objectStore('pendingSync');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};

export const clearPendingSyncAttempts = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pendingSync', 'readwrite');
    const store = tx.objectStore('pendingSync');
    const request = store.clear();
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

// --- Lessons Cache ---
export const cacheLessonsList = async (lessons) => {
  const db = await openDB();
  const tx = db.transaction('lessonsCache', 'readwrite');
  const store = tx.objectStore('lessonsCache');
  lessons.forEach(l => store.put(l));
  return tx.complete;
};

export const getCachedLessonsList = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('lessonsCache', 'readonly');
    const store = tx.objectStore('lessonsCache');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};
