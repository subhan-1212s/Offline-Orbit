import React from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Compass, BookOpen, WifiOff, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const WelcomePage = ({ onGetStarted, onOpenDemo }) => {
  const { loginDemo } = useAuth();

  return (
    <div className="min-h-[90vh] flex flex-col justify-center max-w-5xl mx-auto px-4 py-8">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0ED] border border-[#F95738]/30 text-[#F95738] text-xs font-bold mb-4">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Low-Bandwidth & Offline Capable PWA</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E2229] tracking-tight leading-tight">
          Personalized learning that works everywhere—<span className="text-[#F95738]">even offline.</span>
        </h1>
        <p className="text-base text-[#5A606C] mt-4 max-w-2xl mx-auto leading-relaxed">
          Offline Orbit empowers school students, independent learners, and teachers with tailored study paths, interactive quizzes, AI coaching, and offline lesson downloads.
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        
        {/* School Student */}
        <div 
          onClick={async () => {
            await loginDemo('student');
            onGetStarted('student');
          }}
          className="card-paper p-6 card-paper-hover cursor-pointer border-2 hover:border-[#F95738] group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#FFF0ED] text-[#F95738] flex items-center justify-center font-bold mb-4 border border-[#F95738]/20 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1E2229]">School Student</h3>
            <p className="text-xs text-[#5A606C] mt-2 leading-relaxed">
              Select your education level and subjects, complete teacher-assigned work, take diagnostic quizzes, and download offline lesson packs.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#F95738]">
            <span>Start as Student</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Independent Learner */}
        <div 
          onClick={async () => {
            await loginDemo('independent');
            onGetStarted('independent');
          }}
          className="card-paper p-6 card-paper-hover cursor-pointer border-2 hover:border-[#0D9488] group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#EEFDFB] text-[#0D9488] flex items-center justify-center font-bold mb-4 border border-[#0D9488]/20 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1E2229]">Independent Learner</h3>
            <p className="text-xs text-[#5A606C] mt-2 leading-relaxed">
              Set personal learning goals, master new skills at your own pace, and track your topic growth without classroom constraints.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#0D9488]">
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Teacher */}
        <div 
          onClick={async () => {
            await loginDemo('teacher');
            onGetStarted('teacher');
          }}
          className="card-paper p-6 card-paper-hover cursor-pointer border-2 hover:border-[#4F46E5] group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold mb-4 border border-[#4F46E5]/20 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#1E2229]">Teacher</h3>
            <p className="text-xs text-[#5A606C] mt-2 leading-relaxed">
              Manage classes, assign work, identify concept gaps in real-time, and draft customized quizzes with the AI Teacher Assistant.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#4F46E5]">
            <span>Teacher Portal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Quick Demo Mode Banner for Judges */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FAF9F6] rounded-xl text-[#D97706] border border-[#E5E2DA]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1E2229]">Quick Demo Mode for Judges & Reviewers</h4>
            <p className="text-xs text-[#5A606C]">Pre-populated with Middle & High School Science & Math demo content, sample diagnostic quiz, and offline sync queue.</p>
          </div>
        </div>
        <button
          onClick={onOpenDemo}
          className="btn-coral text-xs py-2 px-4 shadow-sm"
        >
          <span>Launch Demo Switcher</span>
        </button>
      </div>

    </div>
  );
};
