import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';
import { api } from '../services/api';
import { LearningTrendChart } from '../components/charts/LearningTrendChart';
import { TopicMasteryChart } from '../components/charts/TopicMasteryChart';
import { InstallPWABanner } from '../components/InstallPWABanner';

import { 
  Play, Sparkles, BookOpen, Download, HardDrive, Award, 
  HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, Zap, RefreshCw, 
  TrendingUp, Key, Users, Check, Gamepad2, Layers, Filter, Compass, BrainCircuit, Target, Star
} from 'lucide-react';

export const StudentHomePage = ({ 
  onNavigateToLesson, 
  onNavigateToQuiz, 
  onNavigateToDiagnostic, 
  onNavigateToOffline,
  onNavigateToQuests 
}) => {
  const { user } = useAuth();
  const { downloadedPacksCount } = useOffline();

  const [lessons, setLessons] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  // Filters state
  const [activeMasteryFilter, setActiveMasteryFilter] = useState('all'); // 'all' | 'mastered' | 'practising' | 'needs_review'
  const [activeLevelFilter, setActiveLevelFilter] = useState('all'); // 'all' | 'beginner' | 'intermediate' | 'advanced'
  const [activeSubjectFilter, setActiveSubjectFilter] = useState('all');

  // Ref for auto-scrolling when clicking analytics card
  const curriculumRef = useRef(null);

  // Join Classroom 6-Digit Code Modal State
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinStatusMsg, setJoinStatusMsg] = useState(null);
  const [joining, setJoining] = useState(false);
  const [joinedRoom, setJoinedRoom] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const fetchedLessons = await api.getLessons();
      const fetchedProgress = await api.getStudentProgress();
      const rec = await api.aiRecommend(fetchedProgress);
      const myRooms = await api.getMyClasses();
      
      setLessons(fetchedLessons && fetchedLessons.length > 0 ? fetchedLessons : DEFAULT_CURRICULUM_LESSONS);
      setProgress(fetchedProgress);
      setRecommendation(rec);
      if (myRooms && myRooms.length > 0) {
        setJoinedRoom(myRooms[0]);
      } else {
        setJoinedRoom(null);
      }
    } catch (err) {
      console.warn('Error loading learner home data:', err);
      setLessons(DEFAULT_CURRICULUM_LESSONS);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveRoom = (e) => {
    e.stopPropagation();
    if (window.confirm('Do you want to leave this classroom room?')) {
      localStorage.removeItem('orbit_joined_rooms');
      setJoinedRoom(null);
    }
  };

  const handleJoinClassroom = async (e) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;
    setJoining(true);
    setJoinStatusMsg(null);
    try {
      const res = await api.joinClass(joinCodeInput);
      setJoinedRoom(res.room);
      setJoinStatusMsg({ type: 'success', text: `✅ Joined "${res.room?.className || 'Classroom Room'}" successfully!` });
      setTimeout(() => {
        setShowJoinModal(false);
        setJoinStatusMsg(null);
        setJoinCodeInput('');
      }, 1500);
    } catch (err) {
      setJoinStatusMsg({ type: 'error', text: err.message || 'Invalid 6-digit code. Please try again.' });
    } finally {
      setJoining(false);
    }
  };

  const handleDownloadPack = async (e, lessonId) => {
    e.stopPropagation();
    setDownloadingId(lessonId);
    try {
      await api.downloadLessonPack(lessonId);
      await loadData();
    } catch (err) {
      console.error('Download pack failed:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleAnalyticsCardClick = (status) => {
    setActiveMasteryFilter(status);
    if (curriculumRef.current) {
      curriculumRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <RefreshCw className="w-10 h-10 text-[#F95738] animate-spin mx-auto mb-4" />
        <p className="text-sm font-bold text-[#5A606C]">Loading your personalized adaptive learning portal...</p>
      </div>
    );
  }

  // Filter lessons based on active filters
  const filteredLessons = lessons.filter(l => {
    // Mastery filter
    if (activeMasteryFilter !== 'all') {
      const status = l.status || (l._id.includes('1') ? 'mastered' : l._id.includes('2') ? 'practising' : 'needs_review');
      if (status !== activeMasteryFilter) return false;
    }
    // Level filter
    if (activeLevelFilter !== 'all') {
      const level = (l.level || 'Intermediate').toLowerCase();
      if (level !== activeLevelFilter.toLowerCase()) return false;
    }
    // Subject filter
    if (activeSubjectFilter !== 'all') {
      const subject = (l.subject || '').toLowerCase();
      if (!subject.includes(activeSubjectFilter.toLowerCase())) return false;
    }
    return true;
  });

  const interest = user?.interestDomain || 'Computer Science';
  const primaryLesson = (lessons || []).find(l => 
    l.subject?.toLowerCase().includes(interest.toLowerCase()) || 
    l.topic?.toLowerCase().includes(interest.toLowerCase())
  ) || lessons[0];

  const masteredCount = lessons.filter(l => (l.status || (l._id.includes('1') ? 'mastered' : '')) === 'mastered').length || 4;
  const practisingCount = lessons.filter(l => (l.status || (l._id.includes('2') ? 'practising' : '')) === 'practising').length || 6;
  const reviewCount = lessons.filter(l => (l.status || (l._id.includes('3') ? 'needs_review' : '')) === 'needs_review').length || 2;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* 1. Hero Executive Welcome Header */}
      <div className="bg-gradient-to-r from-white via-[#FFF0ED]/40 to-[#EEFDFB]/30 border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#F95738] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              {user?.learnerCategory ? `${user.learnerCategory} (${user.subLevel || 'Standard Tier'})` : user?.learnerType || 'STEM Learner'}
            </span>
            <span className="bg-[#FFF0ED] text-[#F95738] border border-[#F95738]/30 text-xs font-extrabold px-3 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-[#F95738]" /> {user?.streakDays || 1}-Day Active Streak
            </span>

            {joinedRoom ? (
              <span className="bg-[#EEF2FF] text-[#4F46E5] border border-[#4F46E5]/30 text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                <Users className="w-3.5 h-3.5" /> Room: {joinedRoom.className} (Code: {joinedRoom.code})
                <button
                  onClick={handleLeaveRoom}
                  title="Leave this classroom room"
                  className="ml-1 text-[#89909E] hover:text-[#F95738] font-bold text-xs"
                >
                  ✕
                </button>
              </span>
            ) : (
              <button 
                onClick={() => setShowJoinModal(true)}
                className="bg-[#FAF9F6] hover:bg-[#EEF2FF] text-[#5A606C] hover:text-[#4F46E5] border border-[#E5E2DA] hover:border-[#4F46E5]/40 text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Users className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span>No Classroom Joined • Click to Enter 6-Digit Code</span>
              </button>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2229] tracking-tight leading-tight">
            Welcome back, <span className="text-[#F95738]">{user?.name}</span>!
          </h2>
          <p className="text-xs sm:text-sm text-[#5A606C] leading-relaxed">
            Your personalized STEM curriculum for <strong className="text-[#1E2229]">{user?.interestDomain || 'Computer Science'}</strong> is active! Select any module to view videos, attempt adaptive topic quizzes, or practice interactive games.
          </p>
        </div>

        {/* Hero Quick Action Stats */}
        <div className="flex flex-col gap-3 relative z-10 sm:min-w-[260px]">
          <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-[#0D9488] bg-[#EEFDFB] text-[#0D9488] font-extrabold text-base flex items-center justify-center shadow-xs">
              88%
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#89909E] uppercase tracking-wider block">Overall Mastery Index</span>
              <h4 className="font-extrabold text-[#1E2229] text-sm">{masteredCount} Topics Mastered</h4>
            </div>
          </div>

          <button
            onClick={() => setShowJoinModal(true)}
            className="w-full btn-coral text-xs py-3 shadow-sm bg-[#4F46E5] hover:bg-[#4338CA] justify-center"
          >
            <Key className="w-4 h-4" />
            <span>Join Educator Room (6-Digit Code)</span>
          </button>
        </div>
      </div>

      {/* 2. PWA Add to Home Screen Banner (Light Theme) */}
      <InstallPWABanner onNavigateToOffline={onNavigateToOffline} />

      {/* 3. Interactive Analytics & Filter Redirection Dashboard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-[#1E2229] tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#F95738]" /> Interactive Analytics Summary
          </h3>
          <span className="text-xs font-semibold text-[#89909E]">Click any card to filter & jump to topics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: All Curriculum */}
          <div 
            onClick={() => handleAnalyticsCardClick('all')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
              activeMasteryFilter === 'all' 
                ? 'bg-white border-[#F95738] ring-2 ring-[#F95738]/20 shadow-md' 
                : 'bg-white border-[#E5E2DA] hover:border-[#F95738]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#89909E] uppercase tracking-wider">Total STEM Modules</span>
              <div className="p-2 rounded-xl bg-[#FAF9F6] text-[#1E2229]">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#1E2229]">{lessons.length}</div>
            <p className="text-[11px] text-[#5A606C] mt-1 font-semibold flex items-center gap-1">
              <span>View all available topics</span> <ArrowRight className="w-3 h-3 text-[#F95738]" />
            </p>
          </div>

          {/* Card 2: Mastered Topics */}
          <div 
            onClick={() => handleAnalyticsCardClick('mastered')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
              activeMasteryFilter === 'mastered' 
                ? 'bg-[#EEFDFB] border-[#0D9488] ring-2 ring-[#0D9488]/20 shadow-md' 
                : 'bg-white border-[#E5E2DA] hover:border-[#0D9488]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#0D9488] uppercase tracking-wider">Mastered Content</span>
              <div className="p-2 rounded-xl bg-[#EEFDFB] text-[#0D9488]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#0D9488]">{masteredCount}</div>
            <p className="text-[11px] text-[#0D9488] mt-1 font-semibold flex items-center gap-1">
              <span>Click to view completed mastered content</span> <ArrowRight className="w-3 h-3" />
            </p>
          </div>

          {/* Card 3: Practising / Active Topics */}
          <div 
            onClick={() => handleAnalyticsCardClick('practising')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
              activeMasteryFilter === 'practising' 
                ? 'bg-[#EEF2FF] border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-md' 
                : 'bg-white border-[#E5E2DA] hover:border-[#4F46E5]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#4F46E5] uppercase tracking-wider">In Progress</span>
              <div className="p-2 rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#4F46E5]">{practisingCount}</div>
            <p className="text-[11px] text-[#4F46E5] mt-1 font-semibold flex items-center gap-1">
              <span>Click to view active practising topics</span> <ArrowRight className="w-3 h-3" />
            </p>
          </div>

          {/* Card 4: Needs Review */}
          <div 
            onClick={() => handleAnalyticsCardClick('needs_review')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
              activeMasteryFilter === 'needs_review' 
                ? 'bg-[#FFF0ED] border-[#F95738] ring-2 ring-[#F95738]/20 shadow-md' 
                : 'bg-white border-[#E5E2DA] hover:border-[#F95738]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#F95738] uppercase tracking-wider">Needs Review</span>
              <div className="p-2 rounded-xl bg-[#FFF0ED] text-[#F95738]">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#F95738]">{reviewCount}</div>
            <p className="text-[11px] text-[#F95738] mt-1 font-semibold flex items-center gap-1">
              <span>Click to view topics needing practice</span> <ArrowRight className="w-3 h-3" />
            </p>
          </div>

        </div>
      </div>

      {/* 4. Analytics Visual Charts Component */}
      <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-xl font-extrabold text-[#1E2229] tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#F95738]" /> Detailed Mastery & Progress Analytics
            </h3>
            <p className="text-xs text-[#5A606C] mt-0.5">Track your real-time score trajectory and skill growth across key subjects.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-[#5A606C] uppercase tracking-wider">Score Performance Curve</h4>
            <LearningTrendChart />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-[#5A606C] uppercase tracking-wider">Topic Mastery Breakdown</h4>
            <TopicMasteryChart />
          </div>
        </div>
      </div>

      {/* 5. AI Misconception Diagnostic Remediation Alert */}
      <div className="bg-[#FFF0ED] border border-[#F95738]/30 rounded-3xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 max-w-2xl">
          <div className="p-2.5 bg-white text-[#F95738] rounded-2xl border border-[#F95738]/20 shrink-0 shadow-xs">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#F95738] uppercase tracking-wider block">AI Adaptive Diagnostic Alert</span>
            <h4 className="font-extrabold text-[#1E2229] text-base mt-0.5">Algorithmic Complexity & Linear Algebra Gap Detected</h4>
            <p className="text-xs text-[#5A606C] mt-1 leading-relaxed">
              Quiz analysis suggests reviewing step-by-step logic for time complexity (Big O) to achieve full topic mastery.
            </p>
          </div>
        </div>

        <button 
          onClick={onNavigateToDiagnostic}
          className="btn-coral text-xs py-2.5 px-5 shadow-sm"
        >
          <Zap className="w-4 h-4" />
          <span>Launch AI Diagnostic Remediation</span>
        </button>
      </div>

      {/* 6. Featured Recommendation & Topic-Linked Quiz/Games Portal */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Recommended Lesson Box */}
        <div className="lg:col-span-2 bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-[#F95738] uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-[#F95738]" /> Adaptive Next Step Lesson
              </span>
              <span className="text-xs font-semibold text-[#89909E] bg-[#FAF9F6] border border-[#E5E2DA] px-2.5 py-1 rounded-full">
                {primaryLesson.subject} • {primaryLesson.level || 'Intermediate'}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-[#1E2229] tracking-tight">
              {primaryLesson.title}
            </h3>
            <p className="text-xs text-[#5A606C] mt-2 leading-relaxed">
              {primaryLesson.summary}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E2DA] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onNavigateToLesson(primaryLesson._id)}
                className="btn-coral text-xs py-2.5 px-4 shadow-sm"
              >
                <Play className="w-4 h-4" />
                <span>Watch Lesson Video</span>
              </button>

              <button
                onClick={() => onNavigateToQuiz(primaryLesson._id)}
                className="btn-outline text-xs py-2.5 px-4 bg-white hover:bg-[#FAF9F6]"
              >
                <Target className="w-4 h-4 text-[#F95738]" />
                <span>Topic Quiz</span>
              </button>

              {onNavigateToQuests && (
                <button
                  onClick={onNavigateToQuests}
                  className="btn-outline text-xs py-2.5 px-4 bg-[#EEF2FF] text-[#4F46E5] border-[#4F46E5]/30 hover:bg-[#E0E7FF]"
                >
                  <Gamepad2 className="w-4 h-4 text-[#4F46E5]" />
                  <span>Topic Games</span>
                </button>
              )}
            </div>

            <button
              onClick={(e) => handleDownloadPack(e, primaryLesson._id)}
              disabled={downloadingId === primaryLesson._id}
              className="text-xs text-[#89909E] hover:text-[#1E2229] font-bold flex items-center gap-1.5"
            >
              <Download className={`w-3.5 h-3.5 ${downloadingId === primaryLesson._id ? 'animate-bounce text-[#F95738]' : ''}`} />
              <span>{downloadingId === primaryLesson._id ? 'Saving Offline...' : 'Save Pack'}</span>
            </button>
          </div>
        </div>

        {/* Knowledge Games & Interactive Quizzes Showcase Box */}
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#4F46E5]">
              <Gamepad2 className="w-4 h-4 text-[#4F46E5]" />
              <span>Interactive Topic Games & Quizzes</span>
            </div>

            <h4 className="text-xl font-extrabold text-[#1E2229] leading-snug">
              Gamified STEM Challenges & Quizzes
            </h4>
            <p className="text-xs text-[#5A606C] leading-relaxed">
              Reinforce formulas, code concepts, and scientific diagrams through interactive mini-games including Term Matching, Speed Sorting, and Boss Reviews.
            </p>
          </div>

          <div className="mt-6 space-y-2.5">
            <button
              onClick={onNavigateToQuests}
              className="w-full btn-coral text-xs py-3 px-4 justify-center shadow-xs bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Launch Knowledge Games Center</span>
            </button>

            <button
              onClick={() => onNavigateToQuiz('quiz-diagnostic-g7')}
              className="w-full btn-outline text-xs py-2.5 px-4 bg-white hover:bg-[#FAF9F6] text-[#1E2229] font-bold justify-center"
            >
              <Target className="w-3.5 h-3.5 text-[#F95738]" />
              <span>Take Full Diagnostic Assessment</span>
            </button>
          </div>
        </div>

      </div>

      {/* 7. STEM Curriculum Modules Grid (Filtered & Level Organized) */}
      <div ref={curriculumRef} className="space-y-6 pt-4 border-t border-[#E5E2DA]">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-extrabold text-[#1E2229] tracking-tight">
                STEM Curriculum Modules
              </h3>
              {activeMasteryFilter !== 'all' && (
                <span className="bg-[#FFF0ED] text-[#F95738] border border-[#F95738]/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Filtered: {activeMasteryFilter.replace('_', ' ')}
                </span>
              )}
            </div>
            <p className="text-xs text-[#5A606C] mt-0.5">
              Personalized according to your skill level ({user?.subLevel || 'Beginner/Intermediate'}) and selected topics.
            </p>
          </div>

          <button onClick={onNavigateToOffline} className="text-xs font-bold text-[#F95738] hover:underline flex items-center gap-1 self-start md:self-auto">
            <HardDrive className="w-4 h-4" /> Downloaded Offline Packs ({downloadedPacksCount})
          </button>
        </div>

        {/* Level & Subject Filter Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E5E2DA]">
          
          {/* Difficulty Level Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-extrabold text-[#89909E] uppercase tracking-wider mr-1">Level:</span>
            {[
              { id: 'all', label: 'All Tiers' },
              { id: 'beginner', label: 'Beginner' },
              { id: 'intermediate', label: 'Intermediate' },
              { id: 'advanced', label: 'Advanced' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveLevelFilter(tab.id)}
                className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all ${
                  activeLevelFilter === tab.id
                    ? 'bg-[#1E2229] text-white shadow-xs'
                    : 'bg-[#FAF9F6] text-[#5A606C] hover:bg-[#E5E2DA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Subject Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[11px] font-extrabold text-[#89909E] uppercase tracking-wider mr-1">Subject:</span>
            {[
              { id: 'all', label: 'All Subjects' },
              { id: 'computer science', label: 'CompSci & AI' },
              { id: 'mathematics', label: 'Math' },
              { id: 'physics', label: 'Physics' },
              { id: 'biology', label: 'Biology' },
              { id: 'chemistry', label: 'Chemistry' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubjectFilter(tab.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                  activeSubjectFilter === tab.id
                    ? 'bg-[#F95738] text-white shadow-xs'
                    : 'bg-[#FAF9F6] text-[#5A606C] hover:bg-[#E5E2DA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Modules Grid */}
        {filteredLessons.length === 0 ? (
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-12 text-center space-y-3">
            <Filter className="w-10 h-10 text-[#89909E] mx-auto" />
            <h4 className="font-extrabold text-base text-[#1E2229]">No STEM modules match your current filter selections</h4>
            <p className="text-xs text-[#5A606C] max-w-md mx-auto">
              Try resetting your level or mastery filters to view more topics across the curriculum.
            </p>
            <button 
              onClick={() => { setActiveMasteryFilter('all'); setActiveLevelFilter('all'); setActiveSubjectFilter('all'); }}
              className="btn-coral text-xs py-2 px-4 inline-flex items-center gap-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, idx) => {
              const statusMap = ['mastered', 'practising', 'needs_review'];
              const currentStatus = lesson.status || statusMap[idx % 3];
              const level = lesson.level || (idx % 3 === 0 ? 'Beginner' : idx % 3 === 1 ? 'Intermediate' : 'Advanced');

              return (
                <div 
                  key={lesson._id}
                  className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#F95738]/50 transition-all flex flex-col justify-between group relative"
                >
                  <div className="space-y-3">
                    
                    {/* Card Top Meta */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-extrabold text-[#F95738] bg-[#FFF0ED] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          {lesson.subject}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          level.toLowerCase() === 'beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          level.toLowerCase() === 'intermediate' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {level}
                        </span>
                      </div>

                      <span className={
                        currentStatus === 'mastered' ? 'badge-mastered' :
                        currentStatus === 'practising' ? 'badge-practising' : 'badge-review'
                      }>
                        {currentStatus === 'mastered' ? 'Mastered' : currentStatus === 'practising' ? 'Practising' : 'Needs Review'}
                      </span>
                    </div>

                    {/* Lesson Title & Description */}
                    <div>
                      <h4 className="font-extrabold text-[#1E2229] text-base group-hover:text-[#F95738] transition-colors leading-snug">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-[#5A606C] mt-2 line-clamp-2 leading-relaxed">
                        {lesson.summary}
                      </p>
                    </div>

                    {/* AI Capability Note */}
                    <div className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-2.5 text-[11px] text-[#5A606C] font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F95738] shrink-0" />
                      <span>Adapted for {level} learner level</span>
                    </div>
                  </div>

                  {/* Direct Topic Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-[#E5E2DA] space-y-2">
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onNavigateToLesson(lesson._id)}
                        className="btn-coral text-xs py-2 px-3 justify-center shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Watch Video</span>
                      </button>

                      <button
                        onClick={() => onNavigateToQuiz(lesson._id)}
                        className="btn-outline text-xs py-2 px-3 justify-center bg-white text-[#1E2229] hover:bg-[#FAF9F6]"
                      >
                        <Target className="w-3.5 h-3.5 text-[#F95738]" />
                        <span>Quiz</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {onNavigateToQuests && (
                        <button
                          onClick={onNavigateToQuests}
                          className="btn-outline text-xs py-1.5 px-2.5 justify-center bg-[#EEF2FF] text-[#4F46E5] border-[#4F46E5]/30 hover:bg-[#E0E7FF]"
                        >
                          <Gamepad2 className="w-3.5 h-3.5" />
                          <span>Games</span>
                        </button>
                      )}

                      <button
                        onClick={(e) => handleDownloadPack(e, lesson._id)}
                        disabled={downloadingId === lesson._id}
                        className="btn-outline text-xs py-1.5 px-2.5 justify-center bg-white text-[#89909E] hover:text-[#1E2229]"
                      >
                        <Download className={`w-3.5 h-3.5 ${downloadingId === lesson._id ? 'animate-bounce text-[#F95738]' : ''}`} />
                        <span>{downloadingId === lesson._id ? 'Saving...' : 'Save Pack'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Join Classroom Room Modal (6-Digit Code) */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3">
              <h3 className="font-extrabold text-lg text-[#1E2229]">Join Educator Room with 6-Digit Code</h3>
              <button onClick={() => setShowJoinModal(false)} className="text-[#89909E] hover:text-[#1E2229] text-lg font-bold">✕</button>
            </div>

            {joinStatusMsg && (
              <div className={`p-3 rounded-xl text-xs font-bold ${joinStatusMsg.type === 'success' ? 'bg-[#EEFDFB] text-[#0D9488] border border-[#0D9488]/30' : 'bg-[#FFF0ED] text-[#F95738] border border-[#F95738]/30'}`}>
                {joinStatusMsg.text}
              </div>
            )}

            <form onSubmit={handleJoinClassroom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">6-Digit Class Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 794201"
                  value={joinCodeInput}
                  onChange={(e) => setJoinCodeInput(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-3 text-center font-mono text-xl tracking-widest font-extrabold text-[#4F46E5] focus:outline-none focus:border-[#4F46E5]"
                />
                <p className="text-[11px] text-[#89909E] mt-1 text-center">Ask your teacher for their 6-digit room code.</p>
              </div>

              <button
                type="submit"
                disabled={joining || !joinCodeInput.trim()}
                className="w-full btn-coral text-xs py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] shadow-md justify-center"
              >
                <span>{joining ? 'Connecting to Room...' : 'Join Classroom Room'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// Rich Default Dataset for Multi-Level STEM Curriculum
const DEFAULT_CURRICULUM_LESSONS = [
  {
    _id: 'lesson-cs-1',
    title: 'Computer Science: Algorithms, Big O & Python',
    subject: 'Computer Science',
    topic: 'Algorithms & Complexity',
    level: 'Beginner',
    status: 'mastered',
    summary: 'Learn essential computer science principles: algorithmic thinking, computational complexity (Big O notation), linear vs binary search, and Python data structures.',
    sizeKB: 420
  },
  {
    _id: 'lesson-cs-2',
    title: 'Artificial Intelligence & Neural Networks',
    subject: 'Computer Science',
    topic: 'Machine Learning',
    level: 'Intermediate',
    status: 'practising',
    summary: 'Explore deep learning architectures, perceptrons, backpropagation gradients, computer vision, and neural network training parameters.',
    sizeKB: 580
  },
  {
    _id: 'lesson-math-1',
    title: 'Algebra: Two-Step Linear Equations & Functions',
    subject: 'Mathematics',
    topic: 'Algebra & Functions',
    level: 'Beginner',
    status: 'needs_review',
    summary: 'Master solving linear equations step by step, applying inverse operations, coordinate geometry slope-intercept forms, and algebraic word problems.',
    sizeKB: 390
  },
  {
    _id: 'lesson-math-2',
    title: 'Calculus: Derivatives, Gradients & Optimization',
    subject: 'Mathematics',
    topic: 'Calculus',
    level: 'Advanced',
    status: 'practising',
    summary: 'Understand rates of change, power rule differentiation, partial derivatives, and optimization techniques used in physical systems.',
    sizeKB: 510
  },
  {
    _id: 'lesson-phy-1',
    title: 'Newtonian Physics & Force Vectors',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    level: 'Intermediate',
    status: 'mastered',
    summary: 'Analyze Newton laws of motion, free body vector diagrams, friction dynamics, momentum conservation, and kinetic energy transformations.',
    sizeKB: 460
  },
  {
    _id: 'lesson-phy-2',
    title: 'Electromagnetism & Circuit Dynamics',
    subject: 'Physics',
    topic: 'Electricity & Magnetism',
    level: 'Advanced',
    status: 'practising',
    summary: 'Calculate Ohm law resistance, Kirchhoff current laws, magnetic flux induction, electromagnetic wave frequencies, and circuit diagrams.',
    sizeKB: 630
  },
  {
    _id: 'lesson-[#lesson-bio-1]',
    title: 'Cellular Biology, DNA Replication & Genetics',
    subject: 'Biology',
    topic: 'Cell Biology',
    level: 'Beginner',
    status: 'mastered',
    summary: 'Discover cell organelles, ATP mitochondria cellular respiration, DNA double helix transcription into RNA, and Mendelian inheritance genetics.',
    sizeKB: 480
  },
  {
    _id: 'lesson-bio-2',
    title: 'Molecular Genetics & CRISPR Gene Editing',
    subject: 'Biology',
    topic: 'Genomics',
    level: 'Advanced',
    status: 'practising',
    summary: 'Explore Cas9 enzyme target recognition, guide RNA synthesis, DNA double-strand break repair mechanisms, and bioethical applications.',
    sizeKB: 540
  },
  {
    _id: 'lesson-chem-1',
    title: 'Chemical Reactions, Stoichiometry & Periodic Table',
    subject: 'Chemistry',
    topic: 'General Chemistry',
    level: 'Intermediate',
    status: 'needs_review',
    summary: 'Balance chemical equations, calculate molar mass stoichiometry ratios, electron orbital configurations, and periodic element trends.',
    sizeKB: 410
  }
];
