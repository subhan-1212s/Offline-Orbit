import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Sparkles, Send, CheckCircle2, User } from 'lucide-react';

export const CommunityBoardPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Jordan Smith',
      question: 'Why do plants produce oxygen gas only during the daytime and not at night?',
      upvotes: 8,
      aiAnswer: 'During the day, light energy drives photolysis in chloroplasts which splits water molecules to release oxygen gas. At night, without sunlight, the light-dependent phase stops!',
      teacherVerified: true
    },
    {
      id: 2,
      author: 'Samantha Wu',
      question: 'What is the fastest way to memorize unit speed rate conversion formulas?',
      upvotes: 5,
      aiAnswer: 'Remember: Speed = Distance ÷ Time. To find unit rate, always divide total distance by total time so the denominator becomes 1 hour!',
      teacherVerified: true
    }
  ]);

  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newPost = {
      id: Date.now(),
      author: 'Maya Lin',
      question: newQuestion,
      upvotes: 1,
      aiAnswer: 'Orbit AI: Great question! Chlorophyll pigments absorb solar radiation photons to energize electrons during photolysis.',
      teacherVerified: false
    };

    setPosts([newPost, ...posts]);
    setNewQuestion('');
  };

  const handleUpvote = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Title Banner */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-6 h-6 text-[#0D9488]" />
          <h2 className="text-2xl font-extrabold text-[#1E2229]">Class 7A STEM Community Q&A</h2>
        </div>
        <p className="text-xs text-[#5A606C]">
          Collaborate with classmates, ask STEM questions, and receive grounded AI responses verified by Ms. Sarah Vance.
        </p>
      </div>

      {/* Post a Question Form */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm">
        <form onSubmit={handleAddQuestion} className="space-y-3">
          <label className="block text-xs font-bold text-[#1E2229]">Ask a STEM Question to the Class & AI Tutor</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="e.g. How does transpiration pull water up tall trees?"
              className="flex-1 bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0D9488]"
            />
            <button type="submit" className="btn-coral text-xs py-2 px-5 bg-[#0D9488] hover:bg-[#0B7A70] shadow-sm">
              <Send className="w-4 h-4" />
              <span>Ask</span>
            </button>
          </div>
        </form>
      </div>

      {/* Q&A Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#E5E2DA] flex items-center justify-center font-bold text-xs text-[#5A606C]">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#1E2229]">{post.author}</h4>
                  <span className="text-[10px] text-[#89909E]">Middle School STEM Student</span>
                </div>
              </div>

              <button
                onClick={() => handleUpvote(post.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E5E2DA] bg-[#FAF9F6] text-xs font-bold text-[#5A606C] hover:border-[#0D9488] hover:text-[#0D9488] transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.upvotes}</span>
              </button>
            </div>

            <h3 className="font-extrabold text-[#1E2229] text-base leading-snug">
              {post.question}
            </h3>

            {/* AI Grounded Answer Box */}
            <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#4F46E5]/20 text-xs text-[#1E2229] leading-relaxed space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#4F46E5] uppercase text-[10px] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> ORBIT AI TUTOR ANSWER
                </span>
                {post.teacherVerified && (
                  <span className="text-[10px] font-bold text-[#0D9488] bg-[#EEFDFB] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Teacher Verified
                  </span>
                )}
              </div>
              <p className="mt-1">{post.aiAnswer}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
