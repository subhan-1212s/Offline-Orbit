import { getPendingSyncAttempts, clearPendingSyncAttempts } from './indexedDB.js';

export const syncOfflineProgress = async () => {
  if (!navigator.onLine) {
    return { success: false, syncedCount: 0, message: 'Device is currently offline. Progress is safely saved locally.' };
  }

  const pendingItems = await getPendingSyncAttempts();
  if (!pendingItems || pendingItems.length === 0) {
    return { success: true, syncedCount: 0, message: 'All offline progress is already synchronized.' };
  }

  const token = localStorage.getItem('orbit_token');
  const userStr = localStorage.getItem('orbit_user');
  let userRole = 'student';
  try {
    if (userStr) userRole = JSON.parse(userStr).role || 'student';
  } catch (e) {}

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    'x-demo-role': userRole
  };

  const candidateUrls = [
    '/api/sync/queue',
    'http://localhost:5000/api/sync/queue',
    '/api/sync',
    'http://localhost:5000/api/sync'
  ];

  let lastError = null;

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ offlineAttempts: pendingItems })
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        await clearPendingSyncAttempts();
        return {
          success: true,
          syncedCount: data.syncedCount ?? pendingItems.length,
          message: data.message || `Successfully synced ${pendingItems.length} quiz attempt(s) with MongoDB!`
        };
      }

      // If server returned 405 or 404, continue to next candidate URL
      if (res.status === 405 || res.status === 404) {
        continue;
      }

      const errData = await res.json().catch(() => ({}));
      lastError = errData.message || `Server returned HTTP status ${res.status}`;
    } catch (netErr) {
      lastError = netErr.message;
    }
  }

  return {
    success: false,
    syncedCount: 0,
    message: lastError ? `Sync notice: ${lastError}` : 'Offline progress safely kept in IndexedDB; will retry automatically.'
  };
};
