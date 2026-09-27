import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Compass, Target, BookOpen, Award, ArrowRight, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export const IndependentHomePage = ({ onNavigateToLesson, onNavigateToQuiz }) => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getLessons();
      setLessons(data || []);
    } catch (err) {
      console.warn('Independent home load err:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <RefreshCw className="w-8 h-8 text-[#0D9488] animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-[#5A606C]">Loading your self-paced learning orbit...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#0D9488]" />
            <h2 className="text-2xl font-extrabold text-[#1E2229]">Independent Learner Orbit</h2>
          </div>
          <p className="text-xs text-[#5A606C] mt-1">
            Self-paced study path for <strong>{user?.name}</strong> • Goals: {user?.goals?.join(', ') || 'Data Literacy & Science'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-[#EEFDFB] text-[#0D9488] border border-[#0D9488]/30 text-xs font-bold px-3 py-1 rounded-full">
            Self-Directed Mode
          </span>
        </div>
      </div>

      {/* Goals & Personal Milestones */}
      <div className="grid md:grid-cols-3 gap-4">
        {(user?.goals || ['Master Algebra', 'Science Olympiad', 'Data Literacy']).map((goal, idx) => (
          <div key={idx} className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#EEFDFB] text-[#0D9488] border border-[#0D9488]/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#89909E] uppercase tracking-wider">Active Goal {idx + 1}</span>
              <h4 className="font-bold text-[#1E2229] text-sm">{goal}</h4>
              <p className="text-[11px] text-[#5A606C] mt-1">3 of 5 topics completed</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Self-Paced Modules */}
      <div>
        <h3 className="text-lg font-extrabold text-[#1E2229] mb-3">Self-Paced Learning Modules</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="card-paper p-5 card-paper-hover cursor-pointer flex flex-col justify-between" onClick={() => onNavigateToLesson(lesson._id)}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-[#0D9488] uppercase">{lesson.subject}</span>
                  <span className="text-xs font-semibold text-[#89909E]">{lesson.estimatedMinutes || 15} mins</span>
                </div>
                <h4 className="font-bold text-[#1E2229] text-lg">{lesson.title}</h4>
                <p className="text-xs text-[#5A606C] mt-1.5 leading-relaxed">{lesson.summary}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E2DA] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0D9488]">Explore Lesson</span>
                <ArrowRight className="w-4 h-4 text-[#0D9488]" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
