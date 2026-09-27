import React, { useState } from 'react';
import { api } from '../services/api';
import { Sparkles, Search, CheckCircle2, Lightbulb, Zap, BookOpen, RefreshCw } from 'lucide-react';

export const AIConceptPlaygroundPage = () => {
  const [topic, setTopic] = useState('Photosynthesis');
  const [query, setQuery] = useState('How does light energy split water molecules into oxygen and hydrogen?');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const data = await api.aiConceptBreakdown({ topic, query });
      setResult(data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const presetTopics = [
    { title: 'Photosynthesis Photolysis', query: 'How does light energy split water molecules into oxygen gas?' },
    { title: 'Linear Equations Isolating X', query: 'Step-by-step inverse operations for 3x + 7 = 22' },
    { title: 'Unit Speed Rates', query: 'How to calculate km/h unit speed rate from total distance' },
    { title: 'Ecosystem 10% Energy Rule', query: 'Why only 10% energy transfers between trophic levels' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-[#4F46E5]" />
          <h2 className="text-2xl font-extrabold text-[#1E2229]">AI Interactive Concept & Equation Playground</h2>
        </div>
        <p className="text-xs text-[#5A606C]">
          Explore any STEM equation or concept. Generate step-by-step breakdowns, worked solutions, real-world analogies, and memory mnemonics!
        </p>
      </div>

      {/* Input Search Form */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1E2229] mb-1">Target Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                placeholder="e.g. Photosynthesis"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#1E2229] mb-1">Specific Concept Question or Equation</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
                placeholder="e.g. How does photolysis split water into oxygen?"
              />
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
            {/* Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[11px] font-bold text-[#89909E]">Presets:</span>
              {presetTopics.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setTopic(p.title);
                    setQuery(p.query);
                  }}
                  className="text-[10px] font-bold text-[#4F46E5] bg-[#EEF2FF] border border-[#4F46E5]/30 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-[#4F46E5] hover:text-white transition-colors"
                >
                  {p.title}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-coral text-xs py-2 px-6 shadow-sm bg-[#4F46E5] hover:bg-[#4338CA]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Analyzing Concept...' : 'Generate AI Breakdown'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          
          {/* Step by Step Breakdown */}
          <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
            <span className="text-[10px] font-extrabold text-[#4F46E5] uppercase tracking-wider block mb-1">
              AI STEP-BY-STEP BREAKDOWN
            </span>
            <h3 className="text-lg font-extrabold text-[#1E2229] mb-3">{result.title}</h3>
            <p className="text-xs text-[#5A606C] mb-4 leading-relaxed">{result.summary}</p>

            <div className="space-y-3">
              {(result.stepByStep || []).map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E2DA] text-xs flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#4F46E5] text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-[#1E2229]">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Analogies & Worked Solution */}
          <div className="space-y-6">
            
            {/* Real World Analogy */}
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-[#D97706]" />
                <h4 className="font-bold text-[#1E2229] text-sm">Real-World Analogy</h4>
              </div>
              <p className="text-xs text-[#1E2229] leading-relaxed p-3.5 bg-[#FFFBEB] border border-[#D97706]/30 rounded-xl">
                {result.realWorldAnalogy}
              </p>
            </div>

            {/* Memory Mnemonic */}
            <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-[#F95738]" />
                <h4 className="font-bold text-[#1E2229] text-sm">Memory Mnemonic Trick</h4>
              </div>
              <p className="text-xs font-bold text-[#F95738] p-3.5 bg-[#FFF0ED] border border-[#F95738]/30 rounded-xl">
                💡 {result.memoryMnemonic}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
