import { getPendingSyncAttempts, clearPendingSyncAttempts } from './indexedDB.js';

export const syncOfflineProgress = async () => {
  if (!navigator.onLine) {
    return { success: false, syncedCount: 0, message: 'Device is currently offline.' };
  }

  const pendingItems = await getPendingSyncAttempts();
  if (!pendingItems || pendingItems.length === 0) {
    return { success: true, syncedCount: 0, message: 'All offline progress is already synchronized.' };
  }

  try {
    const token = localStorage.getItem('orbit_token');
    const userStr = localStorage.getItem('orbit_user');
    let userRole = 'student';
    try {
      if (userStr) userRole = JSON.parse(userStr).role || 'student';
    } catch (e) {}

    const res = await fetch('/api/sync/queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        'x-demo-role': userRole
      },
      body: JSON.stringify({ offlineAttempts: pendingItems })
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || `Server returned HTTP status ${res.status}`);
    }

    await clearPendingSyncAttempts();
    return {
      success: true,
      syncedCount: data.syncedCount ?? pendingItems.length,
      message: data.message || `Successfully synced ${pendingItems.length} quiz attempt(s) with MongoDB!`
    };
  } catch (err) {
    console.warn('Sync attempt warning:', err.message);
    return { success: false, syncedCount: 0, message: `Sync failed: ${err.message}` };
  }
};
