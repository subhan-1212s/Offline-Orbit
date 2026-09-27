import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPendingSyncAttempts, getAllDownloadedPacks } from '../services/indexedDB.js';
import { syncOfflineProgress } from '../services/syncManager.js';

const OfflineContext = createContext();

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [downloadedPacksCount, setDownloadedPacksCount] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const refreshCounts = async () => {
    try {
      const pending = await getPendingSyncAttempts();
      setPendingCount(pending.length);
      const packs = await getAllDownloadedPacks();
      setDownloadedPacksCount(packs.length);
    } catch (err) {
      console.warn('Error reading IndexedDB counts:', err);
    }
  };

  useEffect(() => {
    refreshCounts();

    const handleOnline = async () => {
      setIsOnline(true);
      setSyncMessage('Back online! Automatically syncing offline work...');
      await triggerSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncMessage('Offline Mode active. Downloaded lessons work without internet.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = async () => {
    if (!isOnline) {
      setSyncMessage('Device is offline. Saved on this device - will sync when online.');
      return;
    }
    setSyncing(true);
    const result = await syncOfflineProgress();
    setSyncing(false);
    setSyncMessage(result.message);
    await refreshCounts();
    setTimeout(() => setSyncMessage(''), 5000);
    return result;
  };

  return (
    <OfflineContext.Provider value={{
      isOnline,
      pendingCount,
      downloadedPacksCount,
      syncing,
      syncMessage,
      triggerSync,
      refreshCounts
    }}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => useContext(OfflineContext);
