import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ArrowLeft, GraduationCap, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Wifi, Mail, Send } from 'lucide-react';

export const TeacherLearnerViewPage = ({ studentId, onBack }) => {
  const [learner, setLearner] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email Modal State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');

  useEffect(() => {
    loadLearner();
  }, [studentId]);

  const loadLearner = async () => {
    setLoading(true);
    try {
      const data = await api.getIndividualLearnerAnalytics(studentId || 'user-student-1');
      setLearner(data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailReport = async (e) => {
    e.preventDefault();
    if (!recipientEmail) return;
    setSendingEmail(true);
    setEmailStatus('');

    try {
      const res = await api.sendProgressReportEmail({
        recipientEmail,
        studentName: learner?.name || 'Maya Lin',
        summaryText: `${learner?.name} demonstrates strong conceptual mastery in Photosynthesis (92% avg) and is making steady progress in Ratios & Proportional Reasoning.`,
        topicMastery: learner?.topicMastery
      });

      if (res.success) {
        setEmailStatus(`✅ Email sent successfully to ${recipientEmail} via Brevo!`);
        setTimeout(() => {
          setShowEmailModal(false);
          setEmailStatus('');
        }, 3000);
      } else {
        setEmailStatus(`⚠️ Email dispatch notice: ${res.message}`);
      }
    } catch (err) {
      setEmailStatus(`⚠️ Error sending email: ${err.message}`);
    } finally {
      setSendingEmail(false);
    }
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
      <button onClick={onBack} className="btn-outline text-xs py-1.5 px-3 bg-white">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Teacher Dashboard</span>
      </button>

      {/* Student Profile Card */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] border border-[#4F46E5]/20 flex items-center justify-center font-extrabold text-2xl">
            {learner?.name?.charAt(0) || 'M'}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#1E2229]">{learner?.name}</h2>
            <p className="text-xs text-[#5A606C] mt-0.5">
              Grade: {learner?.grade} • Language: <strong className="uppercase">{learner?.preferredLanguage || 'en'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowEmailModal(true)}
            className="btn-coral text-xs py-2 px-4 shadow-sm bg-[#0D9488] hover:bg-[#0B7A70]"
          >
            <Mail className="w-4 h-4" />
            <span>Email Report via Brevo</span>
          </button>

          <span className="bg-[#EEFDFB] text-[#0D9488] border border-[#0D9488]/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" /> {learner?.syncStatus || 'Synced'}
          </span>
        </div>
      </div>

      {/* AI Learner Progress Summary */}
      <div className="p-4 bg-[#EEF2FF] border border-[#4F46E5]/30 rounded-2xl text-xs text-[#1E2229] flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-[#4F46E5] block mb-1">Teacher AI Learner Insights</span>
          <p className="leading-relaxed">
            {learner?.name} demonstrates strong conceptual mastery in Photosynthesis and Ratios. Solving two-step linear equations remains a concept gap where step-by-step worked examples are recommended.
          </p>
        </div>
      </div>

      {/* Topic Mastery Matrix */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#1E2229] mb-4">Topic Mastery Breakdown</h3>
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

      {/* Email Report Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E2DA] rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DA]">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#0D9488]" />
                <h3 className="font-extrabold text-base text-[#1E2229]">Email Progress Report</h3>
              </div>
              <button onClick={() => setShowEmailModal(false)} className="text-xs text-[#89909E] hover:text-[#1E2229]">✕</button>
            </div>

            <form onSubmit={handleSendEmailReport} className="mt-4 space-y-4">
              <p className="text-xs text-[#5A606C]">
                Send an automated HTML progress digest for <strong>{learner?.name}</strong> using the Brevo Email API.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#1E2229] mb-1">Recipient Email (Parent / Student)</label>
                <input
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              {emailStatus && (
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E2DA] text-xs font-semibold leading-relaxed">
                  {emailStatus}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E2DA]">
                <button type="button" onClick={() => setShowEmailModal(false)} className="btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={sendingEmail} className="btn-coral text-xs py-2 px-4 bg-[#0D9488] hover:bg-[#0B7A70]">
                  <Send className="w-3.5 h-3.5" />
                  <span>{sendingEmail ? 'Sending...' : 'Send via Brevo API'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
