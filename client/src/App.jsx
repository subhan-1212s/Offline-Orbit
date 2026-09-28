import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OfflineProvider } from './context/OfflineContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { SyncStatusBanner } from './components/SyncStatusBanner';
import { AITutorWidget } from './components/AITutorWidget';

// Pages
import { AuthPage } from './pages/AuthPage';
import { StudentHomePage } from './pages/StudentHomePage';
import { IndependentHomePage } from './pages/IndependentHomePage';
import { LessonViewPage } from './pages/LessonViewPage';
import { QuizPage } from './pages/QuizPage';
import { QuestsPage } from './pages/QuestsPage';
import { StudentAnalyticsPage } from './pages/StudentAnalyticsPage';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { TeacherLearnerViewPage } from './pages/TeacherLearnerViewPage';
import { OfflineManagerPage } from './pages/OfflineManagerPage';

// Interactive AI Pages
import { AIConceptPlaygroundPage } from './pages/AIConceptPlaygroundPage';
import { AIQuizGeneratorPage } from './pages/AIQuizGeneratorPage';
import { CommunityBoardPage } from './pages/CommunityBoardPage';
import { AdminManagementPage } from './pages/AdminManagementPage';

const MainAppContent = () => {
  const { user, setUser } = useAuth();
  
  const getDefaultTab = () => {
    if (!user) return 'auth';
    if (user.role === 'admin' || user.email?.toLowerCase().includes('admin')) return 'admin-management';
    if (user.role === 'educator' || user.role === 'teacher') return 'teacher-dashboard';
    if (user.role === 'independent') return 'independent-home';
    return 'student-home';
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab());
  const [selectedLessonId, setSelectedLessonId] = useState('lesson-1');
  const [selectedQuizId, setSelectedQuizId] = useState('quiz-diagnostic-g7');
  const [selectedStudentId, setSelectedStudentId] = useState('user-student-mohamed');
  const [selectedStudentMeta, setSelectedStudentMeta] = useState({ name: 'Mohamed Subhan', email: 'mohamedsubhan155@gmail.com', grade: 'High School' });

  const handleLaunchLesson = (lessonId) => {
    setSelectedLessonId(lessonId || 'lesson-1');
    setActiveTab('lesson-view');
  };

  const handleLaunchQuiz = (quizId) => {
    setSelectedQuizId(quizId || 'quiz-diagnostic-g7');
    setActiveTab('quiz-view');
  };

  const handleSignOut = () => {
    localStorage.removeItem('orbit_token');
    localStorage.removeItem('orbit_user');
    setUser(null);
    setActiveTab('auth');
  };

  if (!user || activeTab === 'auth') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#1E2229]">
        <AuthPage onAuthSuccess={(u) => {
          if (u?.role === 'admin' || u?.email?.toLowerCase().includes('admin')) {
            setActiveTab('admin-management');
          } else if (u?.role === 'educator' || u?.role === 'teacher' || u?.email?.toLowerCase().includes('teacher')) {
            setActiveTab('teacher-dashboard');
          } else {
            setSelectedQuizId('quiz-diagnostic-g7');
            setActiveTab('quiz-view');
          }
        }} />
      </div>
    );
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'student-home':
        return (
          <StudentHomePage
            onNavigateToLesson={handleLaunchLesson}
            onNavigateToQuiz={handleLaunchQuiz}
            onNavigateToDiagnostic={() => {
              setSelectedQuizId('quiz-diagnostic-g7');
              setActiveTab('quiz-view');
            }}
            onNavigateToOffline={() => setActiveTab('offline-manager')}
            onNavigateToQuests={() => setActiveTab('quests')}
          />
        );

      case 'independent-home':
        return (
          <IndependentHomePage
            onNavigateToLesson={handleLaunchLesson}
            onNavigateToQuiz={handleLaunchQuiz}
          />
        );

      case 'concept-playground':
        return <AIConceptPlaygroundPage />;

      case 'custom-quiz-gen':
        return <AIQuizGeneratorPage />;

      case 'community-board':
        return <CommunityBoardPage />;

      case 'lesson-view':
        return (
          <LessonViewPage
            lessonId={selectedLessonId}
            onBack={() => setActiveTab(user?.role === 'educator' || user?.role === 'teacher' ? 'teacher-dashboard' : 'student-home')}
            onLaunchQuiz={(lId) => handleLaunchQuiz(`quiz-lesson-${lId}`)}
          />
        );

      case 'quiz-view':
        return (
          <QuizPage
            quizId={selectedQuizId}
            lessonId={selectedLessonId}
            isDiagnostic={selectedQuizId === 'quiz-diagnostic-g7'}
            onComplete={() => setActiveTab(user?.role === 'educator' || user?.role === 'teacher' ? 'teacher-dashboard' : 'student-home')}
            onNavigateToLesson={handleLaunchLesson}
            onNavigateToQuests={() => setActiveTab('quests')}
          />
        );

      case 'quests':
        return (
          <QuestsPage
            onLaunchQuiz={handleLaunchQuiz}
            onLaunchLesson={handleLaunchLesson}
          />
        );

      case 'analytics':
        return <StudentAnalyticsPage />;

      case 'teacher-dashboard':
        return (
          <TeacherDashboardPage
            onSelectStudent={(studentId, studentMeta) => {
              setSelectedStudentId(studentId);
              setSelectedStudentMeta(studentMeta || { name: 'Mohamed Subhan', email: 'mohamedsubhan155@gmail.com', grade: 'High School' });
              setActiveTab('teacher-learner');
            }}
          />
        );

      case 'teacher-learner':
        return (
          <TeacherLearnerViewPage
            studentId={selectedStudentId}
            studentMeta={selectedStudentMeta}
            onBack={() => setActiveTab('teacher-dashboard')}
          />
        );

      case 'admin-management':
        return <AdminManagementPage />;

      case 'offline-manager':
        return <OfflineManagerPage onNavigateToLesson={handleLaunchLesson} />;

      default:
        return (
          <StudentHomePage
            onNavigateToLesson={handleLaunchLesson}
            onNavigateToQuiz={handleLaunchQuiz}
            onNavigateToDiagnostic={() => setActiveTab('quiz-view')}
            onNavigateToOffline={() => setActiveTab('offline-manager')}
            onNavigateToQuests={() => setActiveTab('quests')}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col text-[#1E2229] relative ${activeTab === 'admin-management' ? 'bg-white' : 'bg-[#FAF9F6]'}`}>
      <SyncStatusBanner />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onSignOut={handleSignOut} />
      
      <main className={`flex-1 pb-16 ${activeTab === 'admin-management' ? 'bg-white' : ''}`}>
        {renderActiveScreen()}
      </main>

      {/* Floating AI Tutor Chatbot Sidecar Widget */}
      <AITutorWidget />

      <footer className="bg-white border-t border-[#E5E2DA] py-5 px-6 text-xs text-[#5A606C]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <span className="font-semibold text-[#1E2229]">
            Offline Orbit Platform • Low-Bandwidth & Offline Learning System
          </span>
          <span className="text-[#89909E] font-medium pr-16 sm:pr-24">
            All rights reserved © 2026
          </span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <OfflineProvider>
        <LanguageProvider>
          <MainAppContent />
        </LanguageProvider>
      </OfflineProvider>
    </AuthProvider>
  );
}
