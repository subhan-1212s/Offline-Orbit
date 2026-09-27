import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Check, ArrowRight, BookOpen, Globe, Target } from 'lucide-react';

export const OnboardingPage = ({ onComplete }) => {
  const { user, updateUserProfile } = useAuth();
  const { lang, changeLanguage } = useLanguage();

  const [selectedGrade, setSelectedGrade] = useState(user?.grade || 'Grade 7');
  const [selectedSubjects, setSelectedSubjects] = useState(user?.subjects || ['Science', 'Mathematics']);
  const [selectedGoals, setSelectedGoals] = useState(user?.goals || ['Master Grade 7 Algebra']);

  const grades = ['Grade 6', 'Grade 7', 'Grade 8', 'High School', 'Self-Paced Adult'];
  const subjectsList = ['Science', 'Mathematics', 'English Language Arts', 'Environmental Studies'];
  const sampleGoals = ['Master Grade 7 Algebra', 'Science Olympiad Prep', 'Data Literacy', 'Offline Study Habit'];

  const toggleSubject = (subj) => {
    setSelectedSubjects(prev => 
      prev.includes(subj) ? prev.filter(s => s !== subj) : [...prev, subj]
    );
  };

  const toggleGoal = (goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      grade: selectedGrade,
      subjects: selectedSubjects,
      goals: selectedGoals,
      preferredLanguage: lang
    });
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 md:p-8 shadow-sm">
        
        <div className="mb-6">
          <span className="text-xs font-bold text-[#F95738] uppercase tracking-wider">Step 1 of 1</span>
          <h2 className="text-2xl font-extrabold text-[#1E2229] mt-1">Personalize Your Orbit Profile</h2>
          <p className="text-xs text-[#5A606C] mt-1">Configure your preferred grade, subjects, and language for offline lesson recommendations.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Grade / Level Selection */}
          <div>
            <label className="block text-xs font-bold text-[#1E2229] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#F95738]" /> Select Grade or Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {grades.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGrade(g)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedGrade === g
                      ? 'border-[#F95738] bg-[#FFF0ED] text-[#F95738]'
                      : 'border-[#E5E2DA] bg-[#FAF9F6] text-[#5A606C] hover:border-[#D4CF0]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Selection */}
          <div>
            <label className="block text-xs font-bold text-[#1E2229] mb-2 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#0D9488]" /> Primary Subjects
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {subjectsList.map(s => {
                const isSelected = selectedSubjects.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSubject(s)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#0D9488] bg-[#EEFDFB] text-[#0D9488]'
                        : 'border-[#E5E2DA] bg-[#FAF9F6] text-[#5A606C]'
                    }`}
                  >
                    <span>{s}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-xs font-bold text-[#1E2229] mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#4F46E5]" /> Preferred Content & UI Language
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { code: 'en', name: 'English' },
                { code: 'es', name: 'Español' },
                { code: 'hi', name: 'हिंदी' },
                { code: 'fr', name: 'Français' }
              ].map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => changeLanguage(l.code)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    lang === l.code
                      ? 'border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]'
                      : 'border-[#E5E2DA] bg-[#FAF9F6] text-[#5A606C]'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* Goals Selection */}
          <div>
            <label className="block text-xs font-bold text-[#1E2229] mb-2">
              Personal Learning Goals
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleGoals.map(goal => {
                const isSelected = selectedGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`py-1.5 px-3 rounded-full text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'border-[#F95738] bg-[#F95738] text-white'
                        : 'border-[#E5E2DA] bg-[#FAF9F6] text-[#5A606C]'
                    }`}
                  >
                    {goal}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#E5E2DA] flex justify-end">
            <button
              type="submit"
              className="btn-coral text-xs py-2.5 px-6 shadow-sm"
            >
              <span>Save Profile & Launch Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
