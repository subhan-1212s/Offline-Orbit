import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useOffline } from '../context/OfflineContext';
import { generateSampleVideoBlob } from '../services/sampleMediaGenerator';
import { saveDownloadedVideo, deleteDownloadedVideo, getAllDownloadedVideos } from '../services/indexedDB';
import { getTopicSlides, speechNarrationEngine } from '../services/videoContentLibrary';
import { 
  Play, Pause, Volume2, VolumeX, CheckCircle2, 
  Film, RotateCcw, Download, Trash2, HardDrive, RefreshCw, Clock
} from 'lucide-react';

export const MultilingualVideoPlayer = ({ topicTitle = "Photosynthesis & Plant Energy" }) => {
  const { isOnline } = useOffline();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 120 seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const totalDuration = 120; // Exactly 2 minutes (02:00)

  // Dynamic slides for this specific STEM topic
  const slides = useMemo(() => getTopicSlides(topicTitle), [topicTitle]);

  // Download & Video Blob State
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedVideoItem, setDownloadedVideoItem] = useState(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);

  const videoRef = useRef(null);
  const videoId = `${topicTitle}_en`;

  // Refresh local downloaded video status from IndexedDB
  const refreshVideoStatus = async () => {
    try {
      const allVideos = await getAllDownloadedVideos();
      const existing = allVideos.find(v => v.videoId === videoId);
      if (existing) {
        setDownloadedVideoItem(existing);
        if (existing.blob) {
          const url = URL.createObjectURL(existing.blob);
          setVideoBlobUrl(url);
        }
      } else {
        setDownloadedVideoItem(null);
        setVideoBlobUrl(null);
      }
    } catch (err) {
      console.warn('Error reading video from IndexedDB:', err);
    }
  };

  useEffect(() => {
    refreshVideoStatus();
    return () => {
      if (videoBlobUrl) URL.revokeObjectURL(videoBlobUrl);
      speechNarrationEngine.cancel();
    };
  }, [topicTitle]);

  // Audio speech narration helper
  const speakCurrentNarration = (text) => {
    speechNarrationEngine.speak(text, { speed: playbackSpeed, isMuted });
  };

  // Playback timer (runs when playing and not using native video)
  useEffect(() => {
    let timer;
    if (isPlaying && !videoBlobUrl) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            speechNarrationEngine.cancel();
            return totalDuration;
          }
          const nextSec = prev + 1;
          const currentSlide = slides[Math.min(Math.floor(nextSec / 10), slides.length - 1)];
          if (nextSec % 10 === 0 && currentSlide) {
            speakCurrentNarration(currentSlide.narration);
          }
          return nextSec;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, videoBlobUrl, isMuted, slides]);

  // Native video event listeners (syncs speech narration with downloaded WebM video)
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !videoBlobUrl) return;

    let lastIdx = -1;

    const handlePlay = () => {
      const currentIdx = Math.min(Math.floor(videoEl.currentTime / 10), slides.length - 1);
      lastIdx = currentIdx;
      speechNarrationEngine.speak(slides[currentIdx]?.narration, {
        speed: videoEl.playbackRate,
        isMuted: videoEl.muted
      });
    };

    const handlePause = () => {
      speechNarrationEngine.cancel();
    };

    const handleTimeUpdate = () => {
      const currentIdx = Math.min(Math.floor(videoEl.currentTime / 10), slides.length - 1);
      if (currentIdx !== lastIdx) {
        lastIdx = currentIdx;
        speechNarrationEngine.speak(slides[currentIdx]?.narration, {
          speed: videoEl.playbackRate,
          isMuted: videoEl.muted
        });
      }
    };

    const handleSeeked = () => {
      const currentIdx = Math.min(Math.floor(videoEl.currentTime / 10), slides.length - 1);
      lastIdx = currentIdx;
      speechNarrationEngine.speak(slides[currentIdx]?.narration, {
        speed: videoEl.playbackRate,
        isMuted: videoEl.muted
      });
    };

    const handleEnded = () => {
      speechNarrationEngine.cancel();
    };

    const handleVolumeChange = () => {
      if (videoEl.muted) {
        speechNarrationEngine.cancel();
      } else {
        const currentIdx = Math.min(Math.floor(videoEl.currentTime / 10), slides.length - 1);
        speechNarrationEngine.speak(slides[currentIdx]?.narration, {
          speed: videoEl.playbackRate,
          isMuted: false
        });
      }
    };

    videoEl.addEventListener('play', handlePlay);
    videoEl.addEventListener('pause', handlePause);
    videoEl.addEventListener('timeupdate', handleTimeUpdate);
    videoEl.addEventListener('seeked', handleSeeked);
    videoEl.addEventListener('ended', handleEnded);
    videoEl.addEventListener('volumechange', handleVolumeChange);

    return () => {
      speechNarrationEngine.cancel();
      videoEl.removeEventListener('play', handlePlay);
      videoEl.removeEventListener('pause', handlePause);
      videoEl.removeEventListener('timeupdate', handleTimeUpdate);
      videoEl.removeEventListener('seeked', handleSeeked);
      videoEl.removeEventListener('ended', handleEnded);
      videoEl.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoBlobUrl, slides]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      const currentSlide = slides[Math.min(Math.floor(currentTime / 10), slides.length - 1)];
      speakCurrentNarration(currentSlide?.narration);
    } else {
      speechNarrationEngine.cancel();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    speakCurrentNarration(slides[0]?.narration);
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    const currentSlide = slides[Math.min(Math.floor(newTime / 10), slides.length - 1)];
    speakCurrentNarration(currentSlide?.narration);
  };

  // Handle Download of 2-Minute Standalone Video File
  const handleDownloadVideo = async () => {
    setIsDownloading(true);
    setDownloadProgress(15);

    try {
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 15;
        });
      }, 250);

      const blob = await generateSampleVideoBlob({
        title: topicTitle,
        language: 'en',
        langName: 'English'
      });

      clearInterval(interval);
      setDownloadProgress(100);

      await saveDownloadedVideo({
        videoId,
        topicTitle,
        language: 'en',
        langName: 'English',
        sizeMB: (blob.size / (1024 * 1024)).toFixed(1) + ' MB',
        sizeBytes: blob.size,
        blob,
        downloadedAt: new Date().toISOString()
      });

      setTimeout(async () => {
        setIsDownloading(false);
        setDownloadProgress(0);
        await refreshVideoStatus();
      }, 400);

    } catch (err) {
      console.error('Failed to download video file:', err);
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleDeleteVideo = async () => {
    try {
      speechNarrationEngine.cancel();
      await deleteDownloadedVideo(videoId);
      if (videoBlobUrl) URL.revokeObjectURL(videoBlobUrl);
      setVideoBlobUrl(null);
      await refreshVideoStatus();
    } catch (err) {
      console.error('Failed to delete video:', err);
    }
  };

  // Format MM:SS
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const activeSlideIndex = Math.min(Math.floor(currentTime / 10), slides.length - 1);
  const activeSlide = slides[activeSlideIndex] || slides[0];

  return (
    <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-6">
      
      {/* Header with Title & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E2DA] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-[#F95738]" />
            <h3 className="text-xl font-extrabold text-[#1E2229]">{topicTitle}</h3>
          </div>
          <p className="text-xs text-[#5A606C] mt-1">
            2-Minute Masterclass with English Audio Narration & Conceptual Step-by-Step Breakdown
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-[#EEF2FF] text-[#4F46E5] text-xs font-extrabold px-3 py-1 rounded-full border border-[#4F46E5]/30 flex items-center gap-1.5 shadow-2xs">
            <Clock className="w-3.5 h-3.5" /> 02:00 Full Video
          </span>
          <span className="badge-mastered flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> English Audio & Subtitles
          </span>
          {downloadedVideoItem && (
            <span className="bg-[#EEFDFB] text-[#0D9488] text-xs font-bold px-3 py-1 rounded-full border border-[#0D9488]/40 flex items-center gap-1 shadow-2xs">
              <HardDrive className="w-3.5 h-3.5" /> Saved Offline ({downloadedVideoItem.sizeMB || '2.4 MB'})
            </span>
          )}
        </div>
      </div>

      {/* Main Video Viewport (Plays Native Blob or High-Definition 2-Min Interactive Canvas) */}
      <div className="rounded-2xl overflow-hidden bg-[#1E2229] border border-[#E5E2DA] shadow-md relative aspect-video flex flex-col justify-between">
        
        {videoBlobUrl ? (
          // Play standalone downloaded video file directly
          <video
            ref={videoRef}
            src={videoBlobUrl}
            controls
            className="w-full h-full object-contain bg-black"
          />
        ) : (
          // Dynamic 2-Minute English Animated Masterclass Player
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-[#1E2229] via-[#2A303C] to-[#1E2229] text-white select-none">
            
            {/* Top Bar with Chapter & Timer */}
            <div className="flex items-center justify-between text-xs">
              <span className="bg-[#F95738] text-white px-3 py-1 rounded-full font-extrabold uppercase tracking-wider text-[10px]">
                {activeSlide?.title} (Slide {activeSlideIndex + 1}/{slides.length})
              </span>

              <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#0D9488] bg-black/40 px-3 py-1 rounded-xl border border-white/10">
                <span>{formatTime(currentTime)}</span>
                <span className="text-gray-400">/</span>
                <span>02:00</span>
              </div>
            </div>

            {/* Center Stage Animation & Content */}
            <div className="flex items-center gap-6 my-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl sm:text-5xl shadow-xl shrink-0">
                {activeSlide?.icon || '🔬'}
              </div>

              <div className="space-y-2 max-w-xl">
                <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {activeSlide?.headline}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {activeSlide?.narration}
                </p>
                {activeSlide?.formula && (
                  <div className="inline-block bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 font-mono text-xs font-bold text-[#4ADE80]">
                    ⚡ {activeSlide.formula}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Scrubber & Time Bar */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={totalDuration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full accent-[#F95738] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>00:00</span>
                <span className="font-semibold text-white">{activeSlide?.title}</span>
                <span>02:00</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Video Player Action Controls Bar */}
      <div className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Play / Pause / Replay / Audio Controls */}
        <div className="flex items-center gap-2">
          {!videoBlobUrl && (
            <>
              <button
                onClick={handleTogglePlay}
                className="p-3 bg-[#F95738] text-white rounded-xl hover:bg-[#E04728] transition-colors shadow-xs flex items-center gap-1.5 text-xs font-bold"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isPlaying ? 'Pause' : 'Play 2-Min Lesson'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="p-3 bg-white text-[#5A606C] hover:text-[#1E2229] border border-[#E5E2DA] rounded-xl hover:bg-[#F3F1EC] transition-colors text-xs font-bold flex items-center gap-1"
                title="Restart from beginning"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </button>

              <button
                onClick={() => {
                  const nextMuted = !isMuted;
                  setIsMuted(nextMuted);
                  if (nextMuted) {
                    speechNarrationEngine.cancel();
                  } else if (isPlaying) {
                    speakCurrentNarration(activeSlide?.narration);
                  }
                }}
                className={`p-3 border rounded-xl transition-colors text-xs font-bold flex items-center gap-1 ${
                  isMuted 
                    ? 'bg-red-50 text-red-600 border-red-200' 
                    : 'bg-white text-[#5A606C] border-[#E5E2DA] hover:bg-[#F3F1EC]'
                }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? 'Muted' : 'Audio On'}</span>
              </button>

              {/* Playback Speed */}
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="p-2.5 bg-white border border-[#E5E2DA] rounded-xl text-xs font-bold text-[#5A606C] focus:outline-none"
              >
                <option value={0.75}>0.75x Speed</option>
                <option value={1}>1.0x Normal</option>
                <option value={1.25}>1.25x Speed</option>
                <option value={1.5}>1.5x Speed</option>
              </select>
            </>
          )}

          {videoBlobUrl && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0D9488] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Playing Standalone 2-Min Video with Synchronized English Audio
              </span>
            </div>
          )}
        </div>

        {/* Offline Download Action Button */}
        <div className="flex items-center gap-2">
          {downloadedVideoItem ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0D9488] bg-[#EEFDFB] border border-[#0D9488]/30 px-3 py-2 rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Offline Ready ({downloadedVideoItem.sizeMB || '2.4 MB'})
              </span>
              <button
                onClick={handleDeleteVideo}
                className="p-2.5 text-[#F95738] hover:bg-[#FFF0ED] border border-[#E5E2DA] rounded-xl transition-colors text-xs font-bold flex items-center gap-1"
                title="Remove video file from IndexedDB"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleDownloadVideo}
              disabled={isDownloading}
              className="btn-coral text-xs py-2.5 px-4 shadow-sm bg-[#0D9488] hover:bg-[#0B7A70] flex items-center gap-2 font-bold"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving 2-Min Video ({downloadProgress}%)...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download 2-Min Video (Offline Ready)</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

      {/* English Video Lecture Chapters Grid (12 Slides over 2:00) */}
      <div className="space-y-3">
        <h4 className="text-xs font-extrabold text-[#1E2229] uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#F95738]" /> 2-Minute Lesson Chapters & Concept Timeline
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentTime(slide.sec);
                speakCurrentNarration(slide.narration);
              }}
              className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                activeSlideIndex === idx 
                  ? 'bg-[#EEFDFB] border-[#0D9488] text-[#0D9488] shadow-xs font-bold' 
                  : 'bg-[#FAF9F6] border-[#E5E2DA] text-[#5A606C] hover:bg-[#F3F1EC]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-[#89909E]">
                <span>{slide.icon} Slide {idx + 1}</span>
                <span>{formatTime(slide.sec)}</span>
              </div>
              <p className="font-bold text-[11px] text-[#1E2229] line-clamp-1">{slide.title}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export const EnglishVideoPlayer = MultilingualVideoPlayer;
