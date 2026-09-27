import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { LearningTrendChart } from '../components/charts/LearningTrendChart';
import { TopicMasteryChart } from '../components/charts/TopicMasteryChart';
import { ActivityHeatmapChart } from '../components/charts/ActivityHeatmapChart';
import { GraduationCap, Sparkles, TrendingUp, CheckCircle2, RefreshCw } from 'lucide-react';

export const StudentAnalyticsPage = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await api.getStudentProgress();
      const aiSum = await api.aiRecommend(data); // or aiSummary endpoint
      setProgress(data);
      setSummary(aiSum);
    } catch (err) {
      console.warn('Analytics err:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <RefreshCw className="w-8 h-8 text-[#F95738] animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-[#5A606C]">Generating growth analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Title & AI Summary Banner */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-6 h-6 text-[#F95738]" />
          <h2 className="text-2xl font-extrabold text-[#1E2229]">My Growth & Topic Mastery Analytics</h2>
        </div>

        {/* AI Progress Summary */}
        <div className="mt-4 p-4 rounded-xl bg-[#EEF2FF] border border-[#4F46E5]/30 text-xs text-[#1E2229] flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-[#4F46E5] block mb-1">AI Automated Progress Summary</span>
            <p className="leading-relaxed">
              Maya has achieved Mastery status in <strong>Photosynthesis & Energy Flow</strong> (92% avg) and is making steady progress in <strong>Ratios & Unit Rates</strong>. Consistent effort across 5 active days this week!
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Score Performance Trend Chart */}
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-extrabold text-[#1E2229]">Quiz Performance Over Time</h3>
              <p className="text-xs text-[#5A606C]">Score trends across diagnostic & lesson quizzes.</p>
            </div>
            <TrendingUp className="w-5 h-5 text-[#F95738]" />
          </div>
          <LearningTrendChart />
        </div>

        {/* Topic Mastery Distribution Chart */}
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-extrabold text-[#1E2229]">Topic Mastery Distribution</h3>
              <p className="text-xs text-[#5A606C]">Mastered vs Practising vs Needs Review topics.</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#0D9488]" />
          </div>
          <TopicMasteryChart />
        </div>

      </div>

      {/* Weekly Activity Heatmap */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#1E2229] mb-1">Weekly Practice Activity</h3>
        <p className="text-xs text-[#5A606C] mb-4">Questions answered per day across subjects.</p>
        <ActivityHeatmapChart />
      </div>

    </div>
  );
};
