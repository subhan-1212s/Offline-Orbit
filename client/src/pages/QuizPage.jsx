import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';
import { BadgeCelebrationModal } from '../components/BadgeCelebrationModal';
import { 
  CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, 
  Award, ShieldCheck, RefreshCw, Sparkles, WifiOff, AlertTriangle, 
  Play, Gamepad2, Download, Clock, HardDrive, BookOpen, Target, Zap 
} from 'lucide-react';

export const QuizPage = ({ 
  quizId, 
  lessonId, 
  isDiagnostic = false, 
  onComplete, 
  onNavigateToLesson,
  onNavigateToQuests
}) => {
  const { user, updateUserProfile } = useAuth();
  const { isOnline, triggerSync } = useOffline();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  
  // Results & Badge Celebration State
  const [quizResult, setQuizResult] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(null);

  useEffect(() => {
    loadQuiz();
  }, [quizId, lessonId]);

  const loadQuiz = async (isRetakeCall = false) => {
    setLoading(true);
    try {
      let data;
      const opts = {
        retake: isRetakeCall,
        seed: Date.now(),
        interestDomain: user?.interestDomain || 'Computer Science & AI',
        subLevel: user?.subLevel || user?.grade || 'Intermediate'
      };

      if (isDiagnostic) {
        data = await api.getDiagnosticQuiz(opts);
      } else if (lessonId) {
        data = await api.getLessonQuiz(lessonId, opts);
      } else {
        data = await api.getDiagnosticQuiz(opts);
      }
      setQuiz(data);
    } catch (err) {
      console.warn('Error loading quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizResult(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowFollowUp(false);
    setRecommendation(null);
    setEarnedBadge(null);
    loadQuiz(true);
  };

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);

    const currentQ = quiz?.questions?.[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: selectedOption
    }));

    if (selectedOption === currentQ.correctAnswerIndex) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex + 1 < (quiz?.questions?.length || 0)) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowFollowUp(false);
    } else {
      // Submit Quiz
      setSubmitting(true);
      try {
        const res = await api.submitQuiz({
          quizId: quiz?._id,
          quizTitle: quiz?.title,
          topic: quiz?.topic,
          subject: quiz?.subject,
          answers
        });
        setQuizResult(res);

        // Fetch personalized recommendation explanation
        const rec = await api.aiRecommend({ quizAttempts: [res] });
        setRecommendation(rec);

        // Update streak and points
        if (updateUserProfile) {
          updateUserProfile({
            streakDays: (user?.streakDays || 1) + 1,
            points: (user?.points || 480) + (res.percentage * 2)
          });
        }

        // Add website notification alert to drawer
        const newNotif = {
          id: `notif-${Date.now()}`,
          title: isDiagnostic ? 'Diagnostic Assessment Complete' : 'STEM Assessment Complete',
          message: `Scored ${res.percentage}% (${res.score}/${res.total}). Streak increased to ${(user?.streakDays || 1) + 1} days!`,
          time: 'Just now',
          unread: true,
          type: 'achievement'
        };
        try {
          const prevNotifs = JSON.parse(localStorage.getItem('orbit_notifications') || '[]');
          localStorage.setItem('orbit_notifications', JSON.stringify([newNotif, ...prevNotifs]));
        } catch (e) {}

        // Send Email Notification Report via Brevo API
        api.sendProgressReportEmail({
          recipientEmail: user?.email || 'learner@orbit.edu',
          studentName: user?.name || 'Learner',
          summaryText: `Completed ${quiz?.title || 'STEM Assessment'} with score ${res.percentage}% (${res.score}/${res.total}). Active streak: ${(user?.streakDays || 1) + 1} days.`,
          topicMastery: [
            { topic: quiz?.topic || 'STEM Practice', scoreAvg: res.percentage, status: res.percentage >= 80 ? 'mastered' : 'practising' }
          ]
        }).catch(e => console.warn('Email dispatch notice:', e.message));

        // Earn Badge Celebration trigger
        if (res.percentage >= 60) {
          confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
          setEarnedBadge({
            title: isDiagnostic ? 'Diagnostic Recovery Champion' : 'STEM Quiz Master',
            description: `Congratulations! You scored ${res.percentage}% on ${quiz?.title || 'your assessment'}!`,
            xp: res.percentage * 2,
            iconEmoji: res.percentage >= 85 ? '🏆' : '🥇'
          });
        }
      } catch (err) {
        console.error('Quiz submit failed:', err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-[#F95738] animate-spin mx-auto mb-3" />
        <h3 className="font-extrabold text-base text-[#1E2229]">Generating Tailored 10-Question Assessment...</h3>
        <p className="text-xs text-[#5A606C]">Matching questions to {user?.interestDomain || 'Computer Science & AI'} ({user?.subLevel || 'Intermediate Tier'})...</p>
      </div>
    );
  }

  const questions = quiz?.questions || [];
  const currentQ = questions[currentQuestionIndex];
  const userName = user?.name || 'Learner';
  const userInterest = user?.interestDomain || 'Computer Science & AI';
  const userEducation = user?.subLevel || user?.grade || user?.learnerCategory || 'Intermediate';
  const displayTitle = quiz?.title || `${userInterest} Assessment (${userEducation})`;

  // Calculate missed questions for Areas to Improve
  const missedFeedback = (quizResult?.feedbackList || []).filter(f => !f.isCorrect);

  // Show Professional Diagnostic & Practice Results Screen
  if (quizResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Celebratory Badge Pop-up */}
        {earnedBadge && (
          <BadgeCelebrationModal
            badge={earnedBadge}
            onClose={() => setEarnedBadge(null)}
            onContinue={() => setEarnedBadge(null)}
          />
        )}

        {/* Top Header & Score Card */}
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <span className="bg-[#FFF0ED] text-[#F95738] border border-[#F95738]/20 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {isDiagnostic ? `${userInterest} Diagnostic Report (${userEducation})` : 'Assessment Results'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E2229] tracking-tight">
                {isDiagnostic ? `${userInterest} Diagnostic Complete` : 'Assessment Completed Successfully'}
              </h2>
              <p className="text-xs text-[#5A606C]">
                {displayTitle} • Personalized result report for <strong className="text-[#1E2229]">{userName}</strong>
              </p>
            </div>

            {/* Score Metric Badge */}
            <div className="bg-[#FAF9F6] border border-[#E5E2DA] p-6 rounded-2xl text-center shrink-0 min-w-[220px] shadow-xs">
              <div className="text-4xl font-extrabold text-[#F95738]">{quizResult.percentage}%</div>
              <p className="text-xs font-extrabold text-[#1E2229] mt-1">
                {quizResult.score} out of {quizResult.total} Questions Correct
              </p>
              <div className="mt-3 inline-block">
                <span className={
                  quizResult.masteryStatus === 'mastered' ? 'badge-mastered' :
                  quizResult.masteryStatus === 'practising' ? 'badge-practising' : 'badge-review'
                }>
                  Mastery: {quizResult.masteryStatus?.toUpperCase() || 'PRACTISING'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Result Action Buttons (Retake & Games) */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E5E2DA]">
            <button
              onClick={handleRetakeQuiz}
              className="btn-coral text-xs py-3 px-5 shadow-xs flex items-center gap-2 bg-[#F95738] hover:bg-[#E0482B]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz (Fresh Questions)</span>
            </button>

            {onNavigateToQuests && (
              <button
                onClick={onNavigateToQuests}
                className="btn-outline text-xs py-3 px-5 bg-[#EEF2FF] text-[#4F46E5] border-[#4F46E5]/30 hover:bg-[#E0E7FF] font-bold flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4 text-[#4F46E5]" />
                <span>Play Interactive Games</span>
              </button>
            )}

            <button
              onClick={onComplete}
              className="btn-outline text-xs py-3 px-5 bg-white text-[#1E2229] hover:bg-[#FAF9F6] font-bold ml-auto"
            >
              <span>Return to Dashboard</span>
            </button>
          </div>

          {/* Diagnostic Strengths & Specific Areas to Improve */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            
            {/* Strengths Card */}
            <div className="bg-[#EEFDFB] border border-[#0D9488]/30 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-extrabold text-[#0D9488] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488]" /> Demonstrated Strengths
              </span>
              <h4 className="font-extrabold text-sm text-[#1E2229]">
                {userInterest} Core Concepts
              </h4>
              <p className="text-xs text-[#5A606C] leading-relaxed">
                Strong recall on foundational definitions, terminology, and direct application steps ({quizResult.score} correct answers).
              </p>
            </div>

            {/* Areas to Improve Card */}
            <div className="bg-[#FFF0ED] border border-[#F95738]/30 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-extrabold text-[#F95738] uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#F95738]" /> Key Focus Areas to Improve
              </span>
              <h4 className="font-extrabold text-sm text-[#1E2229]">
                {missedFeedback.length > 0 ? `${missedFeedback.length} Missed Concept Step(s)` : 'Advanced Mastery Challenges'}
              </h4>
              <p className="text-xs text-[#5A606C] leading-relaxed">
                {missedFeedback.length > 0 
                  ? 'Review the step-by-step misconception explanations below to boost your score on retakes.' 
                  : 'Great job! You answered all questions correctly. Try advanced tier challenges or interactive games to lock in 100% mastery.'}
              </p>
            </div>

          </div>

          {/* Detailed Misconception Breakdown for Missed Questions */}
          {missedFeedback.length > 0 && (
            <div className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-extrabold text-[#1E2229] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#F95738]" /> Misconception Analysis & Areas to Improve for Future
              </h4>
              
              <div className="space-y-2.5">
                {missedFeedback.map((fb, idx) => (
                  <div key={idx} className="bg-white border border-[#E5E2DA] p-3.5 rounded-xl text-xs space-y-1">
                    <div className="flex items-center gap-2 text-[#F95738] font-bold">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Focus Area #{idx + 1}</span>
                    </div>
                    <p className="text-[#1E2229] font-medium leading-relaxed">
                      {fb.misconception || fb.explanation || 'Review inverse operations and step-by-step logic.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Tailored Recommendation */}
          <div className="bg-[#EEF2FF] border border-[#4F46E5]/20 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-extrabold text-[#4F46E5] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#4F46E5]" /> AI Recommendation Rationale
            </span>
            <p className="text-xs text-[#1E2229] font-medium leading-relaxed bg-white p-3 rounded-xl border border-[#E5E2DA]">
              {recommendation?.whyThis || `Based on your score of ${quizResult.percentage}%, we have unlocked custom next-step video modules and interactive practice games.`}
            </p>
          </div>

        </div>

        {/* Professional Video Recommendations Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-[#1E2229] tracking-tight flex items-center gap-2">
              <Play className="w-5 h-5 text-[#F95738] fill-[#F95738]" /> Recommended Video Lessons for Future Improvement
            </h3>
            <span className="text-xs font-semibold text-[#89909E]">Personalized video recommendations</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Video Card 1 */}
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#F95738]/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="bg-[#FFF0ED] text-[#F95738] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {userInterest.includes('Math') ? 'Mathematics' : 'Computer Science'}
                  </span>
                  <span className="text-[11px] font-bold text-[#89909E] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 15 mins
                  </span>
                </div>

                <h4 className="font-extrabold text-[#1E2229] text-base leading-snug">
                  {userInterest.includes('Math') ? 'Algebra: Two-Step Linear Equations & Functions' : 'Computer Science: Algorithms, Big O & Python'}
                </h4>
                <p className="text-xs text-[#5A606C] leading-relaxed line-clamp-2">
                  Interactive video lesson addressing key focus areas with worked step-by-step examples.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E2DA] flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateToLesson && onNavigateToLesson(userInterest.includes('Math') ? 'lesson-math-1' : 'lesson-cs-1')}
                  className="btn-coral text-xs py-2 px-4 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Video</span>
                </button>

                <span className="text-[11px] font-bold text-[#0D9488] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Offline Ready
                </span>
              </div>
            </div>

            {/* Video Card 2 */}
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#4F46E5]/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {userInterest.includes('Physics') ? 'Physics' : 'Artificial Intelligence'}
                  </span>
                  <span className="text-[11px] font-bold text-[#89909E] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 18 mins
                  </span>
                </div>

                <h4 className="font-extrabold text-[#1E2229] text-base leading-snug">
                  {userInterest.includes('Physics') ? 'Newtonian Physics & Force Vectors' : 'Artificial Intelligence & Neural Networks'}
                </h4>
                <p className="text-xs text-[#5A606C] leading-relaxed line-clamp-2">
                  Comprehensive topic breakdown designed to reinforce weak concept areas.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E2DA] flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateToLesson && onNavigateToLesson(userInterest.includes('Physics') ? 'lesson-phy-1' : 'lesson-cs-2')}
                  className="btn-coral text-xs py-2 px-4 shadow-xs bg-[#4F46E5] hover:bg-[#4338CA]"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Video</span>
                </button>

                <span className="text-[11px] font-bold text-[#0D9488] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Offline Ready
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Professional Knowledge Games Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-[#1E2229] tracking-tight flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-[#4F46E5]" /> Recommended Knowledge Games
            </h3>
            <span className="text-xs font-semibold text-[#89909E]">Interactive game practice</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            
            {/* Game Card 1 */}
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-[#4F46E5]/40 transition-all">
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Matching Game
                </span>
                <h4 className="font-extrabold text-sm text-[#1E2229]">STEM Term & Definition Match</h4>
                <p className="text-xs text-[#5A606C]">Match mathematical formulas and plant biology terms to lock in 100% mastery.</p>
              </div>
              <button
                onClick={onNavigateToQuests}
                className="w-full btn-outline text-xs py-2 bg-[#EEF2FF] text-[#4F46E5] border-[#4F46E5]/30 hover:bg-[#E0E7FF] justify-center"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Launch Matching Game</span>
              </button>
            </div>

            {/* Game Card 2 */}
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-[#0D9488]/40 transition-all">
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold text-[#0D9488] bg-[#EEFDFB] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Category Sorter
                </span>
                <h4 className="font-extrabold text-sm text-[#1E2229]">Speed Concept Classifier</h4>
                <p className="text-xs text-[#5A606C]">Sort photosynthesis inputs vs outputs and linear terms under speed time pressure.</p>
              </div>
              <button
                onClick={onNavigateToQuests}
                className="w-full btn-outline text-xs py-2 bg-[#EEFDFB] text-[#0D9488] border-[#0D9488]/30 hover:bg-[#CCFBF1] justify-center"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Launch Speed Sorter</span>
              </button>
            </div>

            {/* Game Card 3 */}
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-[#F95738]/40 transition-all">
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold text-[#F95738] bg-[#FFF0ED] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Boss Challenge
                </span>
                <h4 className="font-extrabold text-sm text-[#1E2229]">Mixed Topic Boss Review</h4>
                <p className="text-xs text-[#5A606C]">Conquer 5 mixed questions across all subjects to earn the Boss Victor badge.</p>
              </div>
              <button
                onClick={onNavigateToQuests}
                className="w-full btn-coral text-xs py-2 justify-center shadow-xs"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Launch Boss Review</span>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Return Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-[#E5E2DA] rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5A606C]">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>Progress recorded and saved locally to device storage.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRetakeQuiz}
              className="btn-outline text-xs py-2.5 px-4 bg-white text-[#F95738] border-[#F95738]/30 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={onComplete}
              className="btn-coral text-xs py-2.5 px-6 shadow-sm"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    );
  }

  if (!currentQ) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-xs text-[#5A606C]">No questions found for this quiz.</p>
        <button onClick={onComplete} className="btn-secondary text-xs">Return Home</button>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQ.correctAnswerIndex;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      
      {/* Quiz Header & Progress Bar */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-extrabold text-[#F95738] uppercase tracking-wider">
            {displayTitle}
          </span>
          <span className="font-bold text-[#5A606C]">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-[#F3F1EC] h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#F95738] h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        
        <h3 className="text-lg font-bold text-[#1E2229] leading-snug">
          {currentQ.questionText}
        </h3>

        {/* Multiple Choice Options */}
        <div className="space-y-3">
          {currentQ.options?.map((optionText, idx) => {
            let optionStyle = 'border-[#E5E2DA] bg-[#FAF9F6] text-[#1E2229] hover:bg-[#F3F1EC]';
            
            if (selectedOption === idx) {
              optionStyle = 'border-[#F95738] bg-[#FFF0ED] text-[#F95738] shadow-xs';
            }

            if (isAnswered) {
              if (idx === currentQ.correctAnswerIndex) {
                optionStyle = 'border-[#0D9488] bg-[#EEFDFB] text-[#0D9488] font-bold';
              } else if (selectedOption === idx && !isCorrect) {
                optionStyle = 'border-[#F95738] bg-[#FFF0ED] text-[#F95738]';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${optionStyle}`}
              >
                <span>{optionText}</span>
                {isAnswered && idx === currentQ.correctAnswerIndex && (
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                )}
                {isAnswered && selectedOption === idx && !isCorrect && (
                  <XCircle className="w-4 h-4 text-[#F95738]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Misconception Alert */}
        {isAnswered && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
            isCorrect 
              ? 'bg-[#EEFDFB] border-[#0D9488]/40 text-[#0D9488]' 
              : 'bg-[#FFF0ED] border-[#F95738]/40 text-[#1E2229]'
          }`}>
            <div className="flex items-center gap-2 font-bold mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                  <span>Correct Answer</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-[#F95738]" />
                  <span className="text-[#F95738]">Misconception Analysis</span>
                </>
              )}
            </div>

            <p className="mt-1">
              {isCorrect ? currentQ.explanation : (
                currentQ.misconceptionMap?.[selectedOption] || currentQ.explanation
              )}
            </p>

            {/* Follow-up question trigger if wrong */}
            {!isCorrect && currentQ.followUpQuestion && !showFollowUp && (
              <button
                onClick={() => setShowFollowUp(true)}
                className="mt-3 btn-outline text-[11px] py-1 px-3 bg-white text-[#F95738] border-[#F95738]/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Try Step-by-Step Follow-Up Retry</span>
              </button>
            )}
          </div>
        )}

        {/* Step-by-Step Follow Up Retry Question */}
        {showFollowUp && currentQ.followUpQuestion && (
          <div className="p-4 bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl text-xs space-y-3">
            <span className="font-extrabold text-[#4F46E5] uppercase tracking-wider text-[10px] block">
              Step-by-Step Follow-Up Retry
            </span>
            <p className="font-bold text-[#1E2229]">{currentQ.followUpQuestion.questionText}</p>
            <div className="space-y-2">
              {currentQ.followUpQuestion.options.map((opt, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white border border-[#E5E2DA] text-xs font-semibold">
                  {opt}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#5A606C] italic">{currentQ.followUpQuestion.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex justify-end pt-4 border-t border-[#E5E2DA]">
          {!isAnswered ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={selectedOption === null}
              className="btn-coral text-xs py-2.5 px-6 shadow-sm disabled:opacity-50"
            >
              Confirm Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={submitting}
              className="btn-coral text-xs py-2.5 px-6 shadow-sm"
            >
              <span>{currentQuestionIndex + 1 === questions.length ? 'Submit Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
