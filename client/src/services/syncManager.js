import { getPendingSyncAttempts, clearPendingSyncAttempts } from './indexedDB.js';

export const syncOfflineProgress = async () => {
  if (!navigator.onLine) {
    return { success: false, syncedCount: 0, message: 'Device is currently offline.' };
  }

  const pendingItems = await getPendingSyncAttempts();
  if (!pendingItems || pendingItems.length === 0) {
    return { success: true, syncedCount: 0, message: 'No pending items to sync.' };
  }

  try {
    const token = localStorage.getItem('orbit_token');
    const res = await fetch('/api/sync/queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'x-demo-role': 'student'
      },
      body: JSON.stringify({ offlineAttempts: pendingItems })
    });

    if (!res.ok) {
      throw new Error('Sync server failed');
    }

    const data = await res.json();
    await clearPendingSyncAttempts();
    return {
      success: true,
      syncedCount: pendingItems.length,
      message: data.message || `Synced ${pendingItems.length} item(s) successfully!`
    };
  } catch (err) {
    console.warn('Sync failed:', err.message);
    return { success: false, syncedCount: 0, message: `Sync failed: ${err.message}` };
  }
};
