import React, { useState, useEffect } from 'react';
import { useOffline } from '../context/OfflineContext';
import { generateSampleVideoBlob } from '../services/sampleMediaGenerator';
import { saveDownloadedVideo, getDownloadedVideo, deleteDownloadedVideo, getAllDownloadedVideos } from '../services/indexedDB';
import { 
  Play, Pause, Volume2, VolumeX, Globe, Subtitles, CheckCircle2, 
  Film, RotateCcw, Sparkles, Tv, WifiOff, Download, Trash2, HardDrive, AlertCircle, RefreshCw
} from 'lucide-react';

export const MultilingualVideoPlayer = ({ topicTitle = "Photosynthesis & Plant Energy" }) => {
  const { isOnline } = useOffline();
  const [activeLang, setActiveLang] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [viewMode, setViewMode] = useState('offline-video'); // 'offline-video' | 'offline-animated' | 'online-youtube'

  // Video Blob & Download State
  const [downloadedVideosMap, setDownloadedVideosMap] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);

  const videoLanguages = [
    { code: 'en', label: 'English', audioNote: 'English Audio Narration & Subtitles' },
    { code: 'ta', label: 'தமிழ் (Tamil)', audioNote: 'தமிழ் குரல் பாடம் மற்றும் உரை விளக்கம்' },
    { code: 'hi', label: 'हिंदी (Hindi)', audioNote: 'हिंदी ऑडियो पाठ एवं उपशीर्षक' },
    { code: 'es', label: 'Español (Spanish)', audioNote: 'Audio y subtítulos en español' },
    { code: 'te', label: 'తెలుగు (Telugu)', audioNote: 'తెలుగు వాయిస్ మరియు పాఠము' }
  ];

  // Refresh local downloaded video status from IndexedDB
  const refreshVideoStatus = async () => {
    try {
      const allVideos = await getAllDownloadedVideos();
      const map = {};
      allVideos.forEach(v => {
        map[v.videoId] = v;
      });
      setDownloadedVideosMap(map);

      const currentKey = `${topicTitle}_${activeLang}`;
      const existing = map[currentKey];
      if (existing && existing.blob) {
        const url = URL.createObjectURL(existing.blob);
        setVideoBlobUrl(url);
      } else {
        setVideoBlobUrl(null);
      }
    } catch (err) {
      console.warn('Error fetching downloaded videos:', err);
    }
  };

  useEffect(() => {
    refreshVideoStatus();
    return () => {
      if (videoBlobUrl) URL.revokeObjectURL(videoBlobUrl);
    };
  }, [topicTitle, activeLang]);

  // Spoken TTS Narration Trigger for Tamil / Hindi / English
  const triggerAudioSpeech = (text, langCode) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langMap = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN', es: 'es-ES', te: 'te-IN' };
      utterance.lang = langMap[langCode] || 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle Download of 1-Minute Standalone Video File for active language
  const handleDownloadVideo = async () => {
    const langObj = videoLanguages.find(l => l.code === activeLang) || videoLanguages[0];
    const videoId = `${topicTitle}_${activeLang}`;
    setIsDownloading(true);
    setDownloadProgress(10);

    try {
      const interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const blob = await generateSampleVideoBlob({
        title: topicTitle,
        language: activeLang,
        langName: langObj.label
      });

      clearInterval(interval);
      setDownloadProgress(100);

      await saveDownloadedVideo({
        videoId,
        topicTitle,
        language: activeLang,
        langName: langObj.label,
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
    const videoId = `${topicTitle}_${activeLang}`;
    try {
      await deleteDownloadedVideo(videoId);
      if (videoBlobUrl) URL.revokeObjectURL(videoBlobUrl);
      setVideoBlobUrl(null);
      await refreshVideoStatus();
    } catch (err) {
      console.error('Failed to delete video:', err);
    }
  };

  // Dynamic Multi-Language Content
  const getTopicData = (title, lang) => {
    const isCompSci = /computer|python|algorithm|coding|structure/i.test(title);
    const isMath = /equation|algebra|linear|math|calculus/i.test(title);

    if (lang === 'ta') {
      return {
        title: isCompSci ? 'ஆல்காரிதம் மற்றும் பைதான் நிரலாக்க பாடம்' : isMath ? 'இருபடி சமன்பாடுகள் மற்றும் கணித சூத்திரங்கள்' : 'தாவரங்களின் ஒளிச்சேர்க்கை மற்றும் ஆற்றல் பரிமாற்றம்',
        captionText: isCompSci ? 'பைனரி தேடல் O(log n) நேரத்தில் இயங்குகிறது.' : isMath ? 'நேரியல் சமன்பாடு y = mx + b சாய்வு விகிதத்தைக் கணக்கிடுகிறது.' : 'பச்சையம் சூரிய ஒளியைப் பயன்படுத்தி குளுக்கோஸ் மற்றும் ஆக்சிஜனை உருவாக்குகிறது.',
        narrationText: isCompSci ? 'ஆல்காரிதம் கணினி நிரலாக்கத்தின் அடிப்படை வழிமுறையாகும்.' : isMath ? 'சமன்பாடுகள் கணிதத்தின் மிக முக்கியமான கணக்கீட்டு முறைகள்.' : 'தாவரங்கள் ஒளிச்சேர்க்கை மூலம் பூமியின் ஆக்சிஜன் தேவையை பூர்த்தி செய்கின்றன.',
        formula: isCompSci ? 'O(log N) Time Complexity' : isMath ? 'y = mx + b' : '6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂',
        imageUrl: isCompSci ? 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
        diagramLabel: 'பாட வரைபடம் மற்றும் அனிமேஷன் காட்சி'
      };
    }

    if (lang === 'hi') {
      return {
        title: isCompSci ? 'कंप्यूटर एल्गोरिदम और डेटा संरचनाएं' : isMath ? 'रैखिक समीकरण और गणितीय गणना' : 'पौधों में प्रकाश संश्लेषण और ऊर्जा चक्र',
        captionText: isCompSci ? 'बाइनरी सर्च एल्गोरिदम समय जटिलता को घटाता है।' : isMath ? 'समीकरण y = mx + b सीधी रेखा की ढाल दिखाता है।' : 'क्लोरोफिल सूर्य के प्रकाश को रासायनिक ऊर्जा में बदलता है।',
        narrationText: 'प्रकाश संश्लेषण प्रक्रिया पौधों में भोजन का निर्माण करती है।',
        formula: isCompSci ? 'O(log N)' : isMath ? 'y = mx + b' : '6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂',
        imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
        diagramLabel: 'पाठ चित्र आरेख'
      };
    }

    return {
      title: isCompSci ? 'Algorithms, Data Structures & Python Execution' : isMath ? 'Linear Equations & Coordinate Geometry' : `${title} - Plant Photosynthesis Engine`,
      captionText: isCompSci ? 'Binary Search reduces time complexity to O(log n).' : isMath ? 'Linear equations model constant growth rates (y = mx + b).' : 'Chlorophyll pigments absorb solar photons to split water into glucose and oxygen.',
      narrationText: `${title} lesson module playing with synchronized audio narration and video slides.`,
      formula: isCompSci ? 'O(log N) Search' : isMath ? 'y = mx + b' : '6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂',
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      diagramLabel: 'STEM Diagram & Visual Vector'
    };
  };

  const currentLangObj = videoLanguages.find(l => l.code === activeLang) || videoLanguages[0];
  const currentContent = getTopicData(topicTitle, activeLang);
  const currentVideoRecord = downloadedVideosMap[`${topicTitle}_${activeLang}`];

  return (
    <div className="bg-[#1E2229] border border-[#E5E2DA] rounded-3xl overflow-hidden shadow-xl text-white">
      
      {/* Video Player Header Bar */}
      <div className="bg-[#2A2F38] p-3.5 px-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-[#F95738]" />
          <h4 className="font-extrabold text-xs tracking-wider uppercase text-white">
            Multilingual Video Lesson (1-Minute Standalone Playback)
          </h4>
        </div>

        {/* Language Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {videoLanguages.map((l) => {
            const isDownloaded = !!downloadedVideosMap[`${topicTitle}_${l.code}`];
            return (
              <button
                key={l.code}
                onClick={() => {
                  setActiveLang(l.code);
                  setIsPlaying(true);
                  const data = getTopicData(topicTitle, l.code);
                  triggerAudioSpeech(data.narrationText, l.code);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeLang === l.code
                    ? 'bg-[#F95738] text-white shadow-sm ring-2 ring-[#F95738]/30'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <span>{l.label}</span>
                {isDownloaded && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Download Status & Storage Action Bar */}
      <div className="bg-[#161B22] px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-[#0D9488]" />
          <span className="font-semibold text-gray-300">
            Selected Language: <span className="text-white font-bold">{currentLangObj.label}</span>
          </span>
          <span className="text-gray-500">•</span>
          {currentVideoRecord ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 1-Min Offline Video Saved ({currentVideoRecord.sizeMB || '2.4 MB'})
            </span>
          ) : (
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Not Saved Offline (~2.4 MB)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isDownloading ? (
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
              <RefreshCw className="w-3.5 h-3.5 text-[#F95738] animate-spin" />
              <span className="text-xs font-mono">Generating 1-Min Video {downloadProgress}%...</span>
            </div>
          ) : currentVideoRecord ? (
            <button
              onClick={handleDeleteVideo}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Video File
            </button>
          ) : (
            <button
              onClick={handleDownloadVideo}
              className="bg-[#0D9488] hover:bg-[#0B7A70] text-white text-[11px] px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Save 1-Min Video ({currentLangObj.label})
            </button>
          )}

          <button
            onClick={() => triggerAudioSpeech(currentContent.narrationText, activeLang)}
            className="bg-white/10 hover:bg-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1"
          >
            <Volume2 className="w-3.5 h-3.5 text-yellow-300" />
            <span>Spoken Audio</span>
          </button>
        </div>
      </div>

      {/* Video Screen Area */}
      <div className="relative aspect-video bg-[#0D1117] flex items-center justify-center overflow-hidden">
        
        {viewMode === 'offline-video' && (
          videoBlobUrl ? (
            <video 
              src={videoBlobUrl}
              controls
              autoPlay={isPlaying}
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-b from-[#0D1117] to-[#161B22]">
              <Film className="w-12 h-12 text-[#F95738]" />
              <h4 className="font-extrabold text-white text-base">
                1-Min Video File ({currentLangObj.label}) Not Saved
              </h4>
              <p className="text-xs text-gray-300 max-w-md leading-relaxed">
                Save the complete 1-minute educational video file with picture slides and audio narration in <strong>{currentLangObj.label}</strong> for offline playback.
              </p>
              <button
                onClick={handleDownloadVideo}
                className="btn-coral text-xs py-2.5 px-5 shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Save 1-Minute Video Pack (~2.4 MB)</span>
              </button>
            </div>
          )
        )}

      </div>

      {/* Subtitles & Spoken Audio Narration Display Bar */}
      <div className="p-4 bg-[#2A2F38] text-xs leading-relaxed border-t border-white/10 flex items-start gap-3">
        <Subtitles className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-[#0D9488] uppercase tracking-wider text-[10px] block mb-0.5">
            {currentLangObj.label} Narration & Subtitles
          </span>
          <p className="text-gray-200 font-medium">{currentContent.captionText}</p>
        </div>
      </div>

    </div>
  );
};
