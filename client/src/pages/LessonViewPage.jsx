import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import { api } from '../services/api';
import { MultilingualVideoPlayer } from '../components/MultilingualVideoPlayer';

import { 
  BookOpen, Download, Volume2, Video, Sparkles, HelpCircle, 
  ArrowLeft, CheckCircle2, ChevronRight, RefreshCw, MessageSquare, Zap
} from 'lucide-react';

export const LessonViewPage = ({ lessonId, onBack, onLaunchQuiz }) => {
  const { lang } = useLanguage();
  const { isOnline } = useOffline();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloaded, setDownloaded] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  // AI "Explain another way" state
  const [activeExplainMode, setActiveExplainMode] = useState(null);
  const [explainResult, setExplainResult] = useState(null);
  const [explainLoading, setExplainLoading] = useState(false);

  // AI Extra practice question state
  const [extraPractice, setExtraPractice] = useState(null);
  const [extraPracticeLoading, setExtraPracticeLoading] = useState(false);
  const [selectedExtraOption, setSelectedExtraOption] = useState(null);
  const [showExtraFeedback, setShowExtraFeedback] = useState(false);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    setLoading(true);
    try {
      const data = await api.getLessonById(lessonId || 'lesson-1');
      setLesson(data);
      setDownloaded(!!data.isDownloadedPack);
    } catch (err) {
      console.warn('Error fetching lesson:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      await api.downloadLessonPack(lessonId || 'lesson-1');
      setDownloaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExplainAnotherWay = async (mode) => {
    setActiveExplainMode(mode);
    setExplainLoading(true);
    const sec = lesson?.sections[selectedSectionIndex] || {};
    
    if (sec.explanations && sec.explanations[mode]) {
      setExplainResult({
        explanationText: sec.explanations[mode],
        mode,
        isAIGenerated: true,
        source: 'Pre-Packaged Lesson Data'
      });
      setExplainLoading(false);
      return;
    }

    try {
      const res = await api.aiExplain({
        sectionTitle: sec.title || 'Lesson Section',
        content: sec.content || 'Photosynthesis content',
        mode
      });
      setExplainResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setExplainLoading(false);
    }
  };

  const handleGenerateExtraPractice = async () => {
    setExtraPracticeLoading(true);
    setSelectedExtraOption(null);
    setShowExtraFeedback(false);
    const sec = lesson?.sections[selectedSectionIndex] || {};
    try {
      const res = await api.aiExtraPractice({
        lessonTitle: lesson?.title || 'Lesson',
        content: sec.content || 'Photosynthesis content'
      });
      setExtraPractice(res);
    } catch (err) {
      console.error(err);
    } finally {
      setExtraPracticeLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <RefreshCw className="w-8 h-8 text-[#F95738] animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-[#5A606C]">Loading lesson module...</p>
      </div>
    );
  }

  const currentSection = lesson?.sections?.[selectedSectionIndex] || {
    title: '1. Introduction',
    content: 'Photosynthesis converts solar light into glucose energy.',
    keyTakeaways: ['Chlorophyll absorbs sunlight', 'Oxygen gas is released']
  };

  const translation = lesson?.languageTranslations?.[lang];
  const translatedTitle = translation?.title || lesson?.title;
  const translatedSection = translation?.sections?.[selectedSectionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="btn-outline text-xs py-1.5 px-3 bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          {downloaded ? (
            <span className="badge-mastered flex items-center gap-1.5 px-3 py-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Pack Downloaded (420 KB)
            </span>
          ) : (
            <button
              onClick={handleDownload}
              className="btn-coral text-xs py-1.5 px-4 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Pack for Offline Use</span>
            </button>
          )}

          <button
            onClick={() => onLaunchQuiz(lesson?._id)}
            className="btn-secondary text-xs py-1.5 px-4"
          >
            <Zap className="w-4 h-4 text-[#F95738]" />
            <span>Take Lesson Quiz</span>
          </button>
        </div>
      </div>

      {/* Main Lesson Reader Container */}
      <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Lesson Header */}
        <div className="border-b border-[#E5E2DA] pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-extrabold text-[#F95738] uppercase tracking-wider">{lesson?.subject}</span>
            <span className="text-[#89909E]">•</span>
            <span className="text-xs font-semibold text-[#5A606C]">{lesson?.grade}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1E2229] tracking-tight">
            {translatedTitle}
          </h1>
          <p className="text-xs text-[#5A606C] mt-2 leading-relaxed">
            {translation?.summary || lesson?.summary}
          </p>
        </div>

        {/* Section Tabs */}
        {lesson?.sections?.length > 1 && (
          <div className="flex items-center gap-2 pb-2 overflow-x-auto border-b border-[#E5E2DA]">
            {lesson.sections.map((sec, idx) => (
              <button
                key={sec.id || idx}
                onClick={() => {
                  setSelectedSectionIndex(idx);
                  setExplainResult(null);
                  setActiveExplainMode(null);
                  setExtraPractice(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedSectionIndex === idx
                    ? 'bg-[#FFF0ED] text-[#F95738] border border-[#F95738]/30 shadow-xs'
                    : 'bg-[#FAF9F6] text-[#5A606C] border border-[#E5E2DA] hover:bg-[#F3F1EC]'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        )}

        {/* Section Title */}
        <h2 className="text-xl font-bold text-[#1E2229]">
          {translatedSection?.title || currentSection.title}
        </h2>

        {/* Multilingual STEM Video Player (English, Hindi, Tamil, Telugu, Malayalam) */}
        <MultilingualVideoPlayer topicTitle={translatedTitle} />

        {/* Lesson Body Content */}
        <div className="prose max-w-none text-sm text-[#1E2229] leading-relaxed whitespace-pre-line">
          {translatedSection?.content || currentSection.content}
        </div>

        {/* Key Takeaways */}
        {currentSection.keyTakeaways && currentSection.keyTakeaways.length > 0 && (
          <div className="bg-[#EEFDFB] border border-[#0D9488]/30 rounded-2xl p-5">
            <h4 className="text-xs font-extrabold text-[#0D9488] uppercase tracking-wider mb-2">
              Key Takeaways
            </h4>
            <ul className="space-y-2 text-xs text-[#1E2229]">
              {(translatedSection?.keyTakeaways || currentSection.keyTakeaways).map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* "Explain another way" Interactive Section */}
        <div className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <h4 className="text-sm font-bold text-[#1E2229]">Explain another way</h4>
            </div>
          </div>

          <p className="text-xs text-[#5A606C] mb-4">
            Stuck or want a different perspective? Choose how you would like this concept re-explained:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {[
              { id: 'simpler', label: 'Simpler' },
              { id: 'stepByStep', label: 'Step-by-Step' },
              { id: 'workedExample', label: 'Worked Example' },
              { id: 'realWorld', label: 'Real-World' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => handleExplainAnotherWay(m.id)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  activeExplainMode === m.id
                    ? 'border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5] shadow-xs'
                    : 'border-[#E5E2DA] bg-white text-[#5A606C] hover:border-[#4F46E5]/40'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {explainLoading && (
            <div className="p-4 bg-white rounded-xl border border-[#E5E2DA] text-center">
              <RefreshCw className="w-5 h-5 text-[#4F46E5] animate-spin mx-auto mb-2" />
              <p className="text-xs text-[#5A606C]">Generating alternate explanation...</p>
            </div>
          )}

          {explainResult && !explainLoading && (
            <div className="p-4 bg-white rounded-xl border border-[#4F46E5]/30 text-xs text-[#1E2229] leading-relaxed shadow-xs animate-in fade-in duration-200">
              <span className="font-extrabold text-[#4F46E5] uppercase tracking-wider text-[10px] block mb-1">
                {explainResult.mode?.toUpperCase()} EXPLANATION
              </span>
              <p className="whitespace-pre-line">{explainResult.explanationText}</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
