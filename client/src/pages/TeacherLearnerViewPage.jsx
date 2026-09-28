import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ArrowLeft, GraduationCap, CheckCircle2, RefreshCw, Sparkles, Wifi, Check, Copy, Printer, FileText, BarChart3, Award } from 'lucide-react';

export const TeacherLearnerViewPage = ({ studentId, studentMeta, onBack }) => {
  const [learner, setLearner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedDigest, setCopiedDigest] = useState(false);

  const rawName = studentMeta?.name || learner?.name || 'Mohamed Subhan';
  const cleanDisplayName = rawName.includes('Aarav') ? 'Mohamed Subhan' : rawName;
  const displayGrade = 'High School';

  useEffect(() => {
    loadLearner();
  }, [studentId, studentMeta]);

  const loadLearner = async () => {
    setLoading(true);
    try {
      const meta = studentMeta || { name: 'Mohamed Subhan', grade: 'High School' };
      const data = await api.getIndividualLearnerAnalytics(studentId || 'user-student-mohamed', meta);
      if (meta?.name) {
        data.name = meta.name;
      }
      if (!data.name || data.name.includes('Aarav')) {
        data.name = 'Mohamed Subhan';
      }
      data.grade = 'High School';
      setLearner(data);
    } catch (err) {
      console.warn('Error loading student analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReportDigest = () => {
    const textDigest = `🪐 OFFLINE ORBIT LEARNER REPORT\n` +
      `Student: ${cleanDisplayName}\n` +
      `Grade: ${displayGrade}\n` +
      `Language: ${(learner?.preferredLanguage || 'en').toUpperCase()}\n` +
      `Sync Status: Synchronized\n\n` +
      `HIGH SCHOOL TOPIC MASTERY:\n` +
      (learner?.topicMastery || []).map(t => `• ${t.topic}: ${t.scoreAvg}% (${t.status.toUpperCase()})`).join('\n') +
      `\n\nGenerated via Offline Orbit Learning Platform`;

    navigator.clipboard.writeText(textDigest);
    setCopiedDigest(true);
    setTimeout(() => setCopiedDigest(false), 3000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <RefreshCw className="w-8 h-8 text-[#4F46E5] animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-[#5A606C]">Loading student analytics profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Back Control */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-outline text-xs py-1.5 px-3 bg-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teacher Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReportDigest}
            className="btn-outline text-xs py-1.5 px-3 bg-white flex items-center gap-1.5 text-[#1E2229]"
          >
            {copiedDigest ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedDigest ? 'Summary Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handlePrintReport}
            className="btn-outline text-xs py-1.5 px-3 bg-white flex items-center gap-1.5 text-[#1E2229]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] border border-[#4F46E5]/20 flex items-center justify-center font-extrabold text-2xl shadow-xs">
            {cleanDisplayName.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#1E2229]">{cleanDisplayName}</h2>
            <p className="text-xs text-[#5A606C] mt-0.5">
              Grade: <span className="font-bold text-[#1E2229]">{displayGrade}</span> • Curriculum: <span className="font-semibold text-[#4F46E5]">STEM & Computer Science</span> • Language: <strong className="uppercase">{learner?.preferredLanguage || 'en'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="bg-[#EEFDFB] text-[#0D9488] border border-[#0D9488]/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" /> {learner?.syncStatus || 'Synced'}
          </span>
        </div>
      </div>

      {/* AI Learner Progress Summary */}
      <div className="p-4 bg-[#EEF2FF] border border-[#4F46E5]/30 rounded-2xl text-xs text-[#1E2229] flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-[#4F46E5] block mb-1">Teacher AI Learner Insights ({displayGrade})</span>
          <p className="leading-relaxed">
            {cleanDisplayName} demonstrates strong conceptual mastery in High School STEM, Algorithms, and Photosynthesis. Recommended focused practice in step-by-step worked examples to solidify foundational problem solving.
          </p>
        </div>
      </div>

      {/* Topic Mastery Matrix */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0D9488]" />
            <h3 className="text-lg font-extrabold text-[#1E2229]">High School Topic Mastery Breakdown</h3>
          </div>
          <span className="text-xs font-bold text-[#5A606C]">
            {(learner?.topicMastery || []).length} Modules Tracked
          </span>
        </div>

        <div className="space-y-3">
          {(learner?.topicMastery || []).map((t, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] flex items-center justify-between text-xs">
              <span className="font-bold text-[#1E2229]">{t.topic}</span>
              <div className="flex items-center gap-3">
                <span className="text-[#5A606C] font-semibold">{t.scoreAvg}% Score Avg</span>
                <span className={
                  t.status === 'mastered' ? 'badge-mastered' :
                  t.status === 'practising' ? 'badge-practising' : 'badge-review'
                }>
                  {t.status?.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Next Actions for Educator */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#F95738]" />
          <h3 className="text-base font-extrabold text-[#1E2229]">Educator Action Recommendations</h3>
        </div>
        <ul className="text-xs text-[#5A606C] space-y-2 list-disc list-inside leading-relaxed">
          <li>Assign <strong>Photosynthesis Advanced Laboratory</strong> module for enriched hands-on experimentation.</li>
          <li>Schedule a targeted review on <strong>Linear Equations</strong> with visual step-by-step balance scale simulations.</li>
          <li>Synchronize offline pack attempts on next local Wi-Fi or Bluetooth mesh connection.</li>
        </ul>
      </div>

    </div>
  );
};
