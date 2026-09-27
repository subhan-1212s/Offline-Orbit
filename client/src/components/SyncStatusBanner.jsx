import React from 'react';
import { useOffline } from '../context/OfflineContext';
import { RefreshCw, HardDrive, CheckCircle2 } from 'lucide-react';

export const SyncStatusBanner = () => {
  const { pendingCount, downloadedPacksCount, syncing, syncMessage, triggerSync } = useOffline();

  return (
    <div className="bg-white border-b border-[#E5E2DA] py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Offline Status & Download Pills */}
        <div className="flex items-center gap-3 flex-wrap text-xs text-[#5A606C]">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-[#89909E]" />
            <span>Downloaded Packs: <strong className="text-[#1E2229]">{downloadedPacksCount}</strong></span>
          </div>

          <span className="text-[#E5E2DA]">|</span>

          {pendingCount > 0 ? (
            <span className="bg-[#FFF0ED] text-[#F95738] border border-[#F95738]/30 px-2.5 py-0.5 rounded-full font-bold">
              Waiting to sync ({pendingCount})
            </span>
          ) : (
            <span className="text-[#0D9488] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Synced
            </span>
          )}
        </div>

        {/* Sync Action */}
        <div className="flex items-center gap-3">
          {syncMessage && (
            <span className="text-xs text-[#5A606C] italic hidden md:inline">
              {syncMessage}
            </span>
          )}

          <button
            onClick={triggerSync}
            disabled={syncing}
            className="btn-outline text-xs py-1 px-3 flex items-center gap-1.5 bg-[#FAF9F6] hover:bg-[#F3F1EC]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-[#F95738]' : 'text-[#5A606C]'}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Queue'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
