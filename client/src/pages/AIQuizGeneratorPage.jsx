import React, { useState } from 'react';
import { api } from '../services/api';
import { QuizPage } from './QuizPage';
import { Sparkles, Sliders, Play, RefreshCw, HelpCircle } from 'lucide-react';

export const AIQuizGeneratorPage = () => {
  const [topic, setTopic] = useState('Photosynthesis & Stomata');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [questionCount, setQuestionCount] = useState(3);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inQuizMode, setInQuizMode] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.aiCustomQuiz({ topic, difficulty, questionCount });
      setGeneratedQuiz(res);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  if (inQuizMode && generatedQuiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <QuizPage
          quizId="ai-custom-quiz"
          lessonId="lesson-1"
          onComplete={() => setInQuizMode(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-[#F95738]" />
          <h2 className="text-2xl font-extrabold text-[#1E2229]">AI Custom Practice Quiz Generator</h2>
        </div>
        <p className="text-xs text-[#5A606C]">
          Customize any STEM topic, difficulty level, and number of questions to dynamically generate a grounded AI practice quiz!
        </p>
      </div>

      {/* Generator Controls Card */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleGenerate} className="space-y-6">
          
          <div>
            <label className="block text-xs font-bold text-[#1E2229] mb-1">Target STEM Topic</label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#F95738]"
              placeholder="e.g. Photosynthesis, Linear Equations, Ratios"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1E2229] mb-1">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced (Olympiad)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E2229] mb-1">Number of Questions</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
              >
                <option value={2}>2 Questions</option>
                <option value={3}>3 Questions</option>
                <option value={5}>5 Questions</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-[#E5E2DA]">
            <button
              type="submit"
              disabled={loading}
              className="btn-coral text-xs py-2.5 px-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Generating Custom AI Quiz...' : 'Generate Practice Quiz'}</span>
            </button>
          </div>

        </form>
      </div>

      {/* Generated Quiz Preview */}
      {generatedQuiz && (
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DA]">
            <div>
              <span className="text-[10px] font-extrabold text-[#F95738] uppercase tracking-wider block">AI GENERATED QUIZ PREVIEW</span>
              <h3 className="text-lg font-extrabold text-[#1E2229]">{generatedQuiz.quizTitle}</h3>
            </div>

            <button
              onClick={() => setInQuizMode(true)}
              className="btn-coral text-xs py-2 px-5 shadow-sm bg-[#0D9488] hover:bg-[#0B7A70]"
            >
              <Play className="w-4 h-4" />
              <span>Launch Quiz Now</span>
            </button>
          </div>

          <div className="space-y-3">
            {generatedQuiz.questions?.map((q, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] text-xs">
                <p className="font-bold text-[#1E2229] text-sm mb-2">{idx + 1}. {q.questionText}</p>
                <div className="grid grid-cols-2 gap-2">
                  {q.options?.map((opt, i) => (
                    <div key={i} className={`p-2 rounded-lg border text-xs font-semibold ${
                      i === q.correctAnswerIndex ? 'bg-[#EEFDFB] border-[#0D9488] text-[#0D9488]' : 'bg-white border-[#E5E2DA]'
                    }`}>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
