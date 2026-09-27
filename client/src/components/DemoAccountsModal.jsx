import React from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Compass, BookOpen, Check, X, Sparkles } from 'lucide-react';

export const DemoAccountsModal = ({ isOpen, onClose }) => {
  const { user, switchRole } = useAuth();

  if (!isOpen) return null;

  const accounts = [
    {
      role: 'student-aarav',
      title: 'Learner A: Aarav Sharma (Grade 7)',
      name: 'Interest: Physics & Mathematics',
      description: 'Struggled with Equivalent Fractions & Equations. Demonstrates Math recovery recommendations.',
      icon: GraduationCap,
      color: 'border-[#F95738]/40 bg-[#FFF0ED] text-[#F95738]',
      activeCheck: user?.name?.includes('Aarav')
    },
    {
      role: 'student-priya',
      title: 'Learner B: Priya Patel (Grade 7)',
      name: 'Interest: Computer Science & AI',
      description: 'Struggled with Algorithmic Complexity (Big O). Demonstrates CS & AI recovery recommendations.',
      icon: GraduationCap,
      color: 'border-[#4F46E5]/40 bg-[#EEF2FF] text-[#4F46E5]',
      activeCheck: user?.name?.includes('Priya')
    },
    {
      role: 'independent',
      title: 'Independent Learner: Alex Rivera',
      name: 'Interest: Biotechnology & Chemistry',
      description: 'Self-paced rural learner testing independent goals without a teacher classroom.',
      icon: Compass,
      color: 'border-[#0D9488]/40 bg-[#EEFDFB] text-[#0D9488]',
      activeCheck: user?.role === 'independent'
    },
    {
      role: 'teacher',
      title: 'Educator: Mr. Rajesh Kumar',
      name: 'Grade 7 STEM Lead Teacher',
      description: 'Manages Class 7A, inspects real synced student analytics, class gaps, and offline status.',
      icon: BookOpen,
      color: 'border-[#1E2229]/40 bg-[#FAF9F6] text-[#1E2229]',
      activeCheck: user?.role === 'educator' || user?.role === 'teacher'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E5E2DA] rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E2DA]">
          <div>
            <h3 className="text-xl font-extrabold text-[#1E2229] tracking-tight">Select Demo Persona</h3>
            <p className="text-xs text-[#5A606C] mt-0.5">Switch instantly between learners with different interests and quiz histories to test recommendations.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-[#89909E] hover:text-[#1E2229] hover:bg-[#FAF9F6] rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {accounts.map((acc) => {
            const Icon = acc.icon;
            const isSelected = acc.activeCheck;
            return (
              <div 
                key={acc.role}
                onClick={async () => {
                  await switchRole(acc.role);
                  onClose();
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-[#F95738] bg-white shadow-md ring-2 ring-[#F95738]/20' 
                    : 'border-[#E5E2DA] bg-[#FAF9F6] hover:border-[#F95738]/40 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${acc.color} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-[#1E2229] text-sm">{acc.title}</h4>
                        {isSelected && (
                          <span className="text-[10px] font-extrabold bg-[#F95738] text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#5A606C] mt-0.5">{acc.name}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#5A606C] mt-2 leading-relaxed">{acc.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-[#E5E2DA] flex justify-end">
          <button 
            onClick={onClose} 
            className="btn-outline text-xs py-2 px-5 bg-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
