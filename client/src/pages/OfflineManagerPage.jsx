import React, { useState, useEffect, useRef } from 'react';
import { useOffline } from '../context/OfflineContext';
import { 
  getAllDownloadedPacks, 
  deleteDownloadedPack, 
  getPendingSyncAttempts,
  getAllDownloadedVideos,
  deleteDownloadedVideo
} from '../services/indexedDB';
import { getTopicSlides, speechNarrationEngine } from '../services/videoContentLibrary';
import { 
  HardDrive, Download, Trash2, RefreshCw, Wifi, WifiOff, 
  CheckCircle2, ShieldCheck, PlayCircle, Video, Info, HelpCircle, Film, Sparkles, X, Play
} from 'lucide-react';

export const OfflineManagerPage = ({ onNavigateToLesson }) => {
  const { isOnline, pendingCount, triggerSync, refreshCounts } = useOffline();
  const [downloadedPacks, setDownloadedPacks] = useState([]);
  const [downloadedVideos, setDownloadedVideos] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  // Offline Video Player Modal State
  const [activePlayingVideo, setActivePlayingVideo] = useState(null);
  const [playingVideoUrl, setPlayingVideoUrl] = useState(null);
  const modalVideoRef = useRef(null);
  const lastSlideSpokenRef = useRef(-1);

  useEffect(() => {
    return () => {
      speechNarrationEngine.cancel();
    };
  }, []);

  useEffect(() => {
    loadOfflineData();
  }, []);

  const loadOfflineData = async () => {
    setLoading(true);
    try {
      const packs = await getAllDownloadedPacks();
      const videos = await getAllDownloadedVideos();
      const queue = await getPendingSyncAttempts();
      setDownloadedPacks(packs || []);
      setDownloadedVideos(videos || []);
      setPendingQueue(queue || []);
    } catch (err) {
      console.warn('Offline manager load err:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePack = async (packId) => {
    await deleteDownloadedPack(packId);
    await loadOfflineData();
    await refreshCounts();
  };

  const handleRemoveVideo = async (videoId) => {
    await deleteDownloadedVideo(videoId);
    await loadOfflineData();
  };

  const handleSyncNow = async () => {
    await triggerSync();
    await loadOfflineData();
  };

  const handlePlayDownloadedVideo = (video) => {
    if (video.blob) {
      const url = URL.createObjectURL(video.blob);
      setPlayingVideoUrl(url);
      setActivePlayingVideo(video);
      lastSlideSpokenRef.current = -1;
    } else if (onNavigateToLesson) {
      onNavigateToLesson(video.lessonId || 'lesson-1');
    }
  };

  const handleModalPlay = () => {
    const videoEl = modalVideoRef.current;
    if (!videoEl || !activePlayingVideo) return;
    const slides = getTopicSlides(activePlayingVideo.topicTitle);
    const idx = Math.min(Math.floor(videoEl.currentTime / 10), slides.length - 1);
    lastSlideSpokenRef.current = idx;
    speechNarrationEngine.speak(slides[idx]?.narration, {
      speed: videoEl.playbackRate,
      isMuted: videoEl.muted
    });
  };

  const handleModalTimeUpdate = () => {
    const videoEl = modalVideoRef.current;
    if (!videoEl || !activePlayingVideo) return;
    const slides = getTopicSlides(activePlayingVideo.topicTitle);
    const idx = Math.min(Math.floor(videoEl.currentTime / 10), slides.length - 1);
    if (idx !== lastSlideSpokenRef.current) {
      lastSlideSpokenRef.current = idx;
      speechNarrationEngine.speak(slides[idx]?.narration, {
        speed: videoEl.playbackRate,
        isMuted: videoEl.muted
      });
    }
  };

  const handleModalSeeked = () => {
    const videoEl = modalVideoRef.current;
    if (!videoEl || !activePlayingVideo) return;
    const slides = getTopicSlides(activePlayingVideo.topicTitle);
    const idx = Math.min(Math.floor(videoEl.currentTime / 10), slides.length - 1);
    lastSlideSpokenRef.current = idx;
    speechNarrationEngine.speak(slides[idx]?.narration, {
      speed: videoEl.playbackRate,
      isMuted: videoEl.muted
    });
  };

  const handleModalPause = () => {
    speechNarrationEngine.cancel();
  };

  const handleModalEnded = () => {
    speechNarrationEngine.cancel();
  };

  const handleCloseVideoModal = () => {
    speechNarrationEngine.cancel();
    if (playingVideoUrl) {
      URL.revokeObjectURL(playingVideoUrl);
    }
    setPlayingVideoUrl(null);
    setActivePlayingVideo(null);
  };

  const handlePlayOfflineVideo = (pack) => {
    const targetLessonId = pack.lessonId || (pack.packId ? pack.packId.replace('pack-', '') : 'lesson-1');
    if (onNavigateToLesson) {
      onNavigateToLesson(targetLessonId);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <RefreshCw className="w-8 h-8 text-[#F95738] animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-[#5A606C]">Loading IndexedDB storage status...</p>
      </div>
    );
  }

  const totalSizeKB = downloadedPacks.reduce((acc, p) => acc + (p.sizeKB || 400), 0);
  const totalVideoMB = downloadedVideos.length * 2.4;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Title & Network Status */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-[#F95738]" />
            <h2 className="text-2xl font-extrabold text-[#1E2229]">Offline Download & Sync Manager</h2>
          </div>
          <p className="text-xs text-[#5A606C] mt-1">
            Manage downloaded lesson packs, standalone video files, and offline progress synchronization.
          </p>
        </div>

        <button onClick={handleSyncNow} className="btn-coral text-xs py-2 px-4 shadow-sm">
          <RefreshCw className="w-4 h-4" />
          <span>Sync Pending Queue</span>
        </button>
      </div>

      {/* Storage Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#89909E] uppercase tracking-wider">Downloaded Packs</span>
          <div className="text-3xl font-extrabold text-[#1E2229] mt-1">{downloadedPacks.length}</div>
          <p className="text-[11px] text-[#5A606C] mt-1">Text & Quizzes ({totalSizeKB} KB)</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#89909E] uppercase tracking-wider">Downloaded Videos</span>
          <div className="text-3xl font-extrabold text-[#0D9488] mt-1">{downloadedVideos.length}</div>
          <p className="text-[11px] text-[#5A606C] mt-1">Picture & Sound (~{totalVideoMB.toFixed(1)} MB)</p>
        </div>

        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#89909E] uppercase tracking-wider">Waiting to Sync</span>
          <div className="text-3xl font-extrabold text-[#F95738] mt-1">{pendingQueue.length}</div>
          <p className="text-[11px] text-[#5A606C] mt-1">Saved locally on this device</p>
        </div>
      </div>

      {/* How to Watch Videos Offline Instruction Banner */}
      <div className="bg-[#EEF2FF] border border-[#4F46E5]/30 rounded-2xl p-5 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-[#4F46E5]">
          <Video className="w-5 h-5" />
          <h3 className="font-extrabold text-sm text-[#1E2229]">How to Watch Lesson Videos Offline</h3>
        </div>
        <p className="text-xs text-[#374151] leading-relaxed">
          1. Download any 2-minute lesson video with English audio narration while online.<br />
          2. When disconnected or offline, open this <strong>Offline Downloads</strong> page or any saved lesson.<br />
          3. Tap <strong>"Play Video"</strong> on any downloaded item below to play the video with <strong>FULL PICTURE AND AUDIO</strong> 100% offline!
        </p>
      </div>

      {/* Downloaded Videos Section with Play Video Option */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold text-[#1E2229] flex items-center gap-2">
            <Film className="w-5 h-5 text-[#F95738]" />
            <span>Downloaded Videos in IndexedDB</span>
          </h3>
          <span className="text-xs font-semibold text-[#89909E]">English Audio (02:00)</span>
        </div>

        {downloadedVideos.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF9F6] border border-dashed border-[#E5E2DA] rounded-xl">
            <Film className="w-8 h-8 text-[#89909E] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#1E2229]">No offline video files downloaded yet.</p>
            <p className="text-[11px] text-[#5A606C] mt-1">Click "Download Video File" inside any lesson video player to store complete 2-minute video files for offline viewing.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {downloadedVideos.map((video) => (
              <div key={video.videoId} className="p-4 rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#1E2229] text-sm">{video.topicTitle || '2-Minute English Lesson Video'}</h4>
                    <span className="badge-mastered">English Audio</span>
                    <span className="text-[10px] bg-[#EEF2FF] text-[#4F46E5] font-extrabold px-2 py-0.5 rounded-full border border-[#4F46E5]/20">
                      02:00 Min
                    </span>
                  </div>
                  <p className="text-xs text-[#5A606C] mt-0.5">
                    Standalone Video Blob • Size: {video.sizeMB || '2.4 MB'} • Saved: {new Date(video.downloadedAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlayDownloadedVideo(video)}
                    className="btn-coral text-xs py-2 px-3.5 shadow-sm flex items-center gap-1.5 bg-[#0D9488] hover:bg-[#0B7A70]"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Play Video</span>
                  </button>

                  <button
                    onClick={() => handleRemoveVideo(video.videoId)}
                    className="p-2 text-[#F95738] hover:bg-[#FFF0ED] rounded-lg transition-colors text-xs font-bold flex items-center gap-1 border border-[#E5E2DA]"
                    title="Remove video file from IndexedDB"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Downloaded Packs List */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#1E2229] mb-4">Downloaded Lesson Packs in IndexedDB</h3>

        {downloadedPacks.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF9F6] border border-dashed border-[#E5E2DA] rounded-xl">
            <HardDrive className="w-8 h-8 text-[#89909E] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#1E2229]">No downloaded packs yet.</p>
            <p className="text-[11px] text-[#5A606C] mt-1">Download lessons while connected to continue studying when offline.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {downloadedPacks.map((pack) => (
              <div key={pack.packId} className="p-4 rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#1E2229] text-sm">{pack.lesson?.title || 'Downloaded Pack'}</h4>
                    <span className="badge-mastered">Downloaded</span>
                  </div>
                  <p className="text-xs text-[#5A606C] mt-0.5">
                    {pack.lesson?.subject || 'STEM Topic'} • Size: {pack.sizeKB || 420} KB • Downloaded: {new Date(pack.downloadedAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlayOfflineVideo(pack)}
                    className="btn-coral text-xs py-2 px-3.5 shadow-sm flex items-center gap-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Play Video (Offline)</span>
                  </button>

                  <button
                    onClick={() => handleRemovePack(pack.packId)}
                    className="p-2 text-[#F95738] hover:bg-[#FFF0ED] rounded-lg transition-colors text-xs font-bold flex items-center gap-1 border border-[#E5E2DA]"
                    title="Remove pack from IndexedDB"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Sync Queue List */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#1E2229] mb-1">Offline Pending Sync Queue</h3>
        <p className="text-xs text-[#5A606C] mb-4">
          Quiz attempts completed while offline. Saved locally on this device and waiting to sync with database.
        </p>

        {pendingQueue.length === 0 ? (
          <div className="p-4 rounded-xl bg-[#EEFDFB] border border-[#0D9488]/30 text-xs text-[#0D9488] font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>All quiz attempts are fully synced! No pending items in queue.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingQueue.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl border border-[#E5E2DA] bg-[#FFF0ED] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#1E2229]">{item.quizTitle || 'Quiz Attempt'}</span>
                  <p className="text-[#5A606C] text-[11px] mt-0.5">
                    Score: {item.score}/{item.total} • Saved: {new Date(item.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <span className="bg-[#F95738] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  Waiting to sync
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Offline Video Player Modal */}
      {activePlayingVideo && playingVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E5E2DA] space-y-4 p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#0D9488]" />
                <div>
                  <h3 className="font-extrabold text-base text-[#1E2229]">
                    {activePlayingVideo.topicTitle || 'Offline Lesson Video'}
                  </h3>
                  <span className="text-[11px] font-bold text-[#0D9488]">
                    100% Offline Playback • English Audio Narration (02:00 Duration)
                  </span>
                </div>
              </div>
              <button 
                onClick={handleCloseVideoModal}
                className="p-2 text-[#89909E] hover:text-[#1E2229] rounded-xl hover:bg-[#FAF9F6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Native Video Element with full offline picture and sound */}
            <div className="rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-black/10 relative">
              <video
                ref={modalVideoRef}
                src={playingVideoUrl}
                controls
                autoPlay
                onPlay={handleModalPlay}
                onPause={handleModalPause}
                onTimeUpdate={handleModalTimeUpdate}
                onSeeked={handleModalSeeked}
                onEnded={handleModalEnded}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[#5A606C]">
                Loaded directly from IndexedDB local storage • No internet required
              </span>
              <button
                onClick={handleCloseVideoModal}
                className="btn-coral text-xs py-2 px-5 bg-[#1E2229] hover:bg-[#333A48]"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
