import React from 'react';
import { Award, Sparkles, CheckCircle2, Zap, ArrowRight, X } from 'lucide-react';

export const BadgeCelebrationModal = ({ badge, onClose, onContinue }) => {
  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Celebration Card */}
      <div className="relative w-full max-w-md bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Animated Celebration Glow in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-[#F95738] to-[#0D9488] rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Close Icon Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#89909E] hover:text-[#1E2229] rounded-full hover:bg-[#FAF9F6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating Confetti Badges */}
        <div className="flex items-center justify-center gap-1 text-xs font-extrabold text-[#0D9488] uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
          <span>Milestone Unlocked!</span>
          <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
        </div>

        {/* Trophy / Badge Icon Container */}
        <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F95738] to-[#FF7B54] rounded-3xl blur-md opacity-60 animate-ping" />
          <div className="relative w-full h-full bg-gradient-to-tr from-[#F95738] to-[#E04728] rounded-3xl shadow-xl flex items-center justify-center text-white text-4xl border-2 border-white">
            {badge.iconEmoji || '🏆'}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl font-extrabold text-[#1E2229] tracking-tight">
          Badge Earned Successfully!
        </h3>
        
        <p className="text-sm font-bold text-[#F95738] mt-1">
          "{badge.title || 'STEM Master'}"
        </p>

        <p className="text-xs text-[#5A606C] mt-2 leading-relaxed max-w-xs mx-auto">
          {badge.description || 'You have demonstrated excellent topic comprehension and completed this learning milestone!'}
        </p>

        {/* XP Points Gained Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FFF0ED] border border-[#F95738]/30 px-4 py-1.5 rounded-full text-xs font-extrabold text-[#F95738] my-4 shadow-xs">
          <Zap className="w-4 h-4 fill-[#F95738]" />
          <span>+{badge.xp || 150} XP Points Earned</span>
        </div>

        {/* Action Button */}
        <div className="mt-2 space-y-2">
          <button
            onClick={onContinue || onClose}
            className="w-full btn-coral text-xs py-3.5 shadow-md justify-center hover:scale-[1.02] transition-transform"
          >
            <span>Awesome! Continue Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
