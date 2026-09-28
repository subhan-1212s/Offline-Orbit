import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { BadgeCelebrationModal } from '../components/BadgeCelebrationModal';
import { 
  Award, Zap, CheckCircle2, Lock, Compass, Users, Sparkles, ArrowRight, 
  ShieldCheck, RefreshCw, Layers, Brain, Gamepad2, Play, Trophy, RotateCcw 
} from 'lucide-react';

export const QuestsPage = ({ onLaunchQuiz, onLaunchLesson }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('path'); // 'path' | 'matching' | 'sorting' | 'memory' | 'boss' | 'daily'
  const [earnedBadgeModal, setEarnedBadgeModal] = useState(null);

  // --- GAME 1: Concept & Definition Matcher State ---
  const [matchingPairs] = useState([
    { id: 'm1', concept: 'Chlorophyll', definition: 'Solar-absorbing pigment in chloroplast cells' },
    { id: 'm2', concept: 'Stomata', definition: 'Microscopic leaf pores for CO₂ and transpiration' },
    { id: 'm3', concept: 'Binary Search', definition: 'Divide-and-conquer O(log n) lookup algorithm' },
    { id: 'm4', concept: 'Slope (m)', definition: 'Rate of change calculation m = (y₂ - y₁)/(x₂ - x₁)' }
  ]);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [matchScore, setMatchScore] = useState(0);

  // --- GAME 2: STEM Classification Sorter State ---
  const [sortItems] = useState([
    { id: 's1', name: 'Absorbs CO₂ & Sunlight', category: 'photosynthesis' },
    { id: 's2', name: 'Releases Energy & H₂O', category: 'respiration' },
    { id: 's3', name: 'Generates Oxygen Gas', category: 'photosynthesis' },
    { id: 's4', name: 'Consumes Glucose Sugar', category: 'respiration' }
  ]);
  const [sortAssignments, setSortAssignments] = useState({});
  const [sortSubmitted, setSortSubmitted] = useState(false);

  // --- GAME 3: Memory Pair Flipping Game State ---
  const [memoryCards, setMemoryCards] = useState([
    { id: 'c1', text: '6 CO₂ + 6 H₂O', pairId: 1, flipped: false, matched: false },
    { id: 'c2', text: 'Photosynthesis Reactants', pairId: 1, flipped: false, matched: false },
    { id: 'c3', text: 'y = mx + b', pairId: 2, flipped: false, matched: false },
    { id: 'c4', text: 'Linear Equation Slope', pairId: 2, flipped: false, matched: false },
    { id: 'c5', text: 'O(1) Time', pairId: 3, flipped: false, matched: false },
    { id: 'c6', text: 'Direct Array Index Access', pairId: 3, flipped: false, matched: false }
  ]);
  const [flippedIndices, setFlippedIndices] = useState([]);

  // --- GAME 4: Mixed-Topic Boss Review Challenge State ---
  const [bossStep, setBossStep] = useState(0);
  const [bossAnswers, setBossAnswers] = useState({});
  const [bossCompleted, setBossCompleted] = useState(false);

  const bossQuestions = [
    {
      q: 'Q1 (Science): Which gas is released as a byproduct during water splitting in plant chloroplasts?',
      options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Methane'],
      correct: 1
    },
    {
      q: 'Q2 (Mathematics): If a linear function has slope m = 3 and passes through (0, 5), what is its equation?',
      options: ['y = 5x + 3', 'y = 3x + 5', 'y = 3x - 5', 'y = 5x - 3'],
      correct: 1
    },
    {
      q: 'Q3 (Computer Science): What is the worst-case time complexity of Binary Search in a sorted array?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correct: 2
    }
  ];

  // Learning Path Quests Data
  const quests = [
    { id: 'node-1', title: 'Photosynthesis Fundamentals', subject: 'Science', status: 'completed', score: 100 },
    { id: 'node-2', title: 'Stomata & Transpiration', subject: 'Science', status: 'completed', score: 90 },
    { id: 'node-3', title: 'Ratios & Unit Speed Rates', subject: 'Mathematics', status: 'active', score: 75 },
    { id: 'node-4', title: 'Solving Linear Equations', subject: 'Mathematics', status: 'needs_review', score: 58 },
    { id: 'node-5', title: 'Algorithms & Python Data Structures', subject: 'Computer Science', status: 'active', score: 85 }
  ];

  const badges = [
    { code: 'first_quiz', title: 'First Steps', desc: 'Completed diagnostic quiz', icon: 'Award', color: 'bg-[#FFF0ED] text-[#F95738] border-[#F95738]/30', earned: true },
    { code: 'streak_3', title: '3-Day Explorer', desc: 'Maintained 3-day active streak', icon: 'Zap', color: 'bg-[#EEFDFB] text-[#0D9488] border-[#0D9488]/30', earned: true },
    { code: 'master_plant', title: 'Plant Scientist', desc: 'Reached 90%+ in Photosynthesis', icon: 'Sparkles', color: 'bg-[#EEF2FF] text-[#4F46E5] border-[#4F46E5]/30', earned: true },
    { code: 'offline_pro', title: 'Offline Ready', desc: 'Downloaded 2+ lesson packs for offline practice', icon: 'ShieldCheck', color: 'bg-[#FFFBEB] text-[#D97706] border-[#D97706]/30', earned: true }
  ];

  // --- Handlers for Matching Game ---
  const handleConceptClick = (item) => {
    if (matchedIds.includes(item.id)) return;
    setSelectedConcept(item);
  };

  const handleDefinitionClick = async (defItem) => {
    if (!selectedConcept || matchedIds.includes(defItem.id)) return;
    if (selectedConcept.id === defItem.id) {
      const newMatched = [...matchedIds, defItem.id];
      setMatchedIds(newMatched);
      setSelectedConcept(null);
      setMatchScore(prev => prev + 1);

      if (newMatched.length === matchingPairs.length) {
        const res = await api.submitGameResult({
          gameType: 'matching',
          title: 'Concept & Definition Matcher',
          score: 4,
          totalQuestions: 4,
          topic: 'STEM Concepts'
        });
        if (res.badgeEarned) {
          setEarnedBadgeModal({ title: res.badgeEarned.title, description: res.badgeEarned.desc, xp: 200, iconEmoji: '🧩' });
        }
      }
    } else {
      setSelectedConcept(null);
    }
  };

  // --- Handlers for Sorter Game ---
  const handleAssignCategory = (itemId, cat) => {
    setSortAssignments(prev => ({ ...prev, [itemId]: cat }));
  };

  const handleCheckSorter = async () => {
    let correct = 0;
    sortItems.forEach(item => {
      if (sortAssignments[item.id] === item.category) correct++;
    });
    setSortSubmitted(true);

    const res = await api.submitGameResult({
      gameType: 'sorting',
      title: 'Classification & Sorting Challenge',
      score: correct,
      totalQuestions: sortItems.length,
      topic: 'Photosynthesis vs Respiration'
    });

    if (res.badgeEarned) {
      setEarnedBadgeModal({ title: res.badgeEarned.title, description: res.badgeEarned.desc, xp: 200, iconEmoji: '🏷️' });
    }
  };

  // --- Handlers for Memory Game ---
  const handleCardClick = async (index) => {
    if (flippedIndices.length === 2 || memoryCards[index].flipped || memoryCards[index].matched) return;
    
    const updated = [...memoryCards];
    updated[index].flipped = true;
    setMemoryCards(updated);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [idx1, idx2] = newFlipped;
      if (updated[idx1].pairId === updated[idx2].pairId) {
        updated[idx1].matched = true;
        updated[idx2].matched = true;
        setMemoryCards([...updated]);
        setFlippedIndices([]);

        if (updated.every(c => c.matched)) {
          const res = await api.submitGameResult({
            gameType: 'memory',
            title: 'Memory Pair Challenge',
            score: 3,
            totalQuestions: 3,
            topic: 'STEM Formula Pairs'
          });
          if (res.badgeEarned) {
            setEarnedBadgeModal({ title: res.badgeEarned.title, description: res.badgeEarned.desc, xp: 250, iconEmoji: '🧠' });
          }
        }
      } else {
        setTimeout(() => {
          updated[idx1].flipped = false;
          updated[idx2].flipped = false;
          setMemoryCards([...updated]);
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  // --- Handlers for Boss Challenge ---
  const handleBossAnswer = (qIdx, optionIdx) => {
    setBossAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleFinishBoss = async () => {
    let score = 0;
    bossQuestions.forEach((q, idx) => {
      if (bossAnswers[idx] === q.correct) score++;
    });
    setBossCompleted(true);

    const res = await api.submitGameResult({
      gameType: 'boss',
      title: 'Mixed-Topic Boss Challenge',
      score,
      totalQuestions: bossQuestions.length,
      topic: 'Mixed STEM Review'
    });

    if (res.badgeEarned) {
      setEarnedBadgeModal({ title: res.badgeEarned.title, description: res.badgeEarned.desc, xp: 300, iconEmoji: '👑' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Badge Unlock Celebration Modal */}
      {earnedBadgeModal && (
        <BadgeCelebrationModal
          badge={earnedBadgeModal}
          onClose={() => setEarnedBadgeModal(null)}
        />
      )}

      {/* Page Title */}
      <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#F95738]" />
            <h2 className="text-2xl font-extrabold text-[#1E2229]">Interactive STEM Games & Mastery Path</h2>
          </div>
          <p className="text-xs text-[#5A606C] mt-1">
            Build topic mastery through interactive matching, sorting, memory flipping, puzzle paths, and class quests.
          </p>
        </div>

        <button 
          onClick={() => onLaunchQuiz('quiz-diagnostic-assessment')}
          className="btn-coral text-xs py-2 px-4 shadow-sm"
        >
          <Zap className="w-4 h-4" />
          <span>Daily Challenge Quiz</span>
        </button>
      </div>

      {/* Game Mode Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E2DA]">
        {[
          { id: 'path', label: 'Learning Path', icon: Compass },
          { id: 'matching', label: 'Concept Matcher', icon: Layers },
          { id: 'sorting', label: 'Classification Sorter', icon: Brain },
          { id: 'memory', label: 'Memory Pairs', icon: Gamepad2 },
          { id: 'boss', label: 'Boss Review', icon: Trophy }
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#F95738] text-white shadow-md'
                  : 'bg-white text-[#5A606C] border border-[#E5E2DA] hover:bg-[#FAF9F6]'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cooperative Class Goal */}
      <div className="bg-gradient-to-r from-white to-[#EEFDFB] border border-[#0D9488]/30 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0D9488]" />
            <h4 className="text-sm font-bold text-[#1E2229]">Class Cooperative Goal: 500 Questions Completed</h4>
          </div>
          <span className="text-xs font-extrabold text-[#0D9488]">385 / 500 Questions (77%)</span>
        </div>
        
        <div className="w-full bg-[#E5E2DA] h-3 rounded-full overflow-hidden mb-2">
          <div className="bg-[#0D9488] h-full rounded-full transition-all duration-500" style={{ width: '77%' }} />
        </div>
        <p className="text-[11px] text-[#5A606C]">Working together as a team! Every game play and quiz completed adds to our shared progress bar.</p>
      </div>

      {/* TAB 1: Visual Learning Path */}
      {activeTab === 'path' && (
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-[#1E2229] mb-4">Topic Unlockable Path Progression</h3>

          <div className="relative border-l-2 border-[#E5E2DA] ml-4 pl-6 space-y-6">
            {quests.map((q, idx) => (
              <div key={q.id} className="relative flex items-center justify-between flex-wrap gap-3 group">
                <div className={`absolute -left-[33px] w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white ${
                  q.status === 'completed' ? 'border-[#0D9488] text-[#0D9488]' :
                  q.status === 'active' ? 'border-[#F95738] text-[#F95738]' : 'border-[#E5E2DA] text-[#89909E]'
                }`}>
                  {q.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#89909E] uppercase">{q.subject}</span>
                  <h4 className="font-bold text-[#1E2229] text-base">{q.title}</h4>
                </div>

                <div className="flex items-center gap-3">
                  {q.status === 'completed' && <span className="badge-mastered">Mastered (100%)</span>}
                  {q.status === 'active' && <span className="badge-practising">Practising (85%)</span>}
                  {q.status === 'needs_review' && <span className="badge-review">Needs Review</span>}

                  <button
                    onClick={() => onLaunchLesson('lesson-1')}
                    className="btn-outline text-xs py-1.5 px-3 bg-[#FAF9F6]"
                  >
                    <span>{q.status === 'completed' ? 'Review' : 'Start'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Concept & Definition Matcher */}
      {activeTab === 'matching' && (
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#1E2229]">Concept & Definition Matcher</h3>
              <p className="text-xs text-[#5A606C]">Select a term on the left, then click its corresponding definition on the right.</p>
            </div>
            <span className="text-xs font-extrabold text-[#0D9488] bg-[#EEFDFB] border border-[#0D9488]/30 px-3 py-1 rounded-full">
              Matched: {matchedIds.length} / {matchingPairs.length}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            {/* Left Concepts */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#89909E] uppercase">STEM Terms</h4>
              {matchingPairs.map(item => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedConcept?.id === item.id;
                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleConceptClick(item)}
                    className={`w-full p-4 rounded-xl text-left font-extrabold text-sm border transition-all flex items-center justify-between ${
                      isMatched
                        ? 'bg-[#EEFDFB] text-[#0D9488] border-[#0D9488]/30 opacity-75'
                        : isSelected
                        ? 'bg-[#FFF0ED] text-[#F95738] border-[#F95738] shadow-md scale-[1.02]'
                        : 'bg-[#FAF9F6] text-[#1E2229] border-[#E5E2DA] hover:border-[#F95738]/50'
                    }`}
                  >
                    <span>{item.concept}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />}
                  </button>
                );
              })}
            </div>

            {/* Right Definitions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#89909E] uppercase">Definitions</h4>
              {matchingPairs.map(item => {
                const isMatched = matchedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleDefinitionClick(item)}
                    className={`w-full p-4 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                      isMatched
                        ? 'bg-[#EEFDFB] text-[#0D9488] border-[#0D9488]/30 opacity-75'
                        : 'bg-white text-[#1E2229] border-[#E5E2DA] hover:border-[#F95738]/50'
                    }`}
                  >
                    <span>{item.definition}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Classification & Sorting Activity */}
      {activeTab === 'sorting' && (
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#1E2229]">Classification & Process Sorter</h3>
            <p className="text-xs text-[#5A606C]">Classify each biological process statement into Photosynthesis or Cellular Respiration.</p>
          </div>

          <div className="space-y-3 pt-2">
            {sortItems.map(item => {
              const assigned = sortAssignments[item.id];
              const isCorrect = sortSubmitted && assigned === item.category;

              return (
                <div key={item.id} className="p-4 rounded-xl border border-[#E5E2DA] bg-[#FAF9F6] flex flex-wrap items-center justify-between gap-3">
                  <span className="font-bold text-sm text-[#1E2229]">{item.name}</span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAssignCategory(item.id, 'photosynthesis')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        assigned === 'photosynthesis'
                          ? 'bg-[#0D9488] text-white border-[#0D9488]'
                          : 'bg-white text-[#5A606C] border-[#E5E2DA]'
                      }`}
                    >
                      Photosynthesis
                    </button>

                    <button
                      onClick={() => handleAssignCategory(item.id, 'respiration')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        assigned === 'respiration'
                          ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                          : 'bg-white text-[#5A606C] border-[#E5E2DA]'
                      }`}
                    >
                      Respiration
                    </button>

                    {sortSubmitted && (
                      isCorrect ? (
                        <span className="text-emerald-600 text-xs font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="text-red-500 text-xs font-bold">Incorrect</span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleCheckSorter}
            className="btn-coral text-xs py-2.5 px-5 shadow-sm mt-2"
          >
            Submit Classification Answers
          </button>
        </div>
      )}

      {/* TAB 4: Memory-Pair Flipping Game */}
      {activeTab === 'memory' && (
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#1E2229]">STEM Memory Pair Challenge</h3>
            <p className="text-xs text-[#5A606C]">Flip cards to find matching formula and concept pairs.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {memoryCards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`h-28 rounded-2xl font-extrabold text-xs sm:text-sm p-4 border transition-all duration-300 flex items-center justify-center text-center shadow-xs ${
                  card.matched
                    ? 'bg-[#EEFDFB] text-[#0D9488] border-[#0D9488]/40 scale-95'
                    : card.flipped
                    ? 'bg-[#FFF0ED] text-[#F95738] border-[#F95738] scale-105 shadow-md'
                    : 'bg-[#1E2229] text-white border-transparent hover:bg-[#2A2F38]'
                }`}
              >
                {card.flipped || card.matched ? card.text : '❓ Flip Card'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Mixed-Topic Boss Challenge */}
      {activeTab === 'boss' && (
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#1E2229]">Mixed-Topic Boss Challenge</h3>
              <p className="text-xs text-[#5A606C]">Prove your mastery across Science, Mathematics, and Computer Science!</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>

          {!bossCompleted ? (
            <div className="space-y-4">
              {bossQuestions.map((bq, qIdx) => (
                <div key={qIdx} className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl p-4 space-y-3">
                  <h4 className="font-bold text-sm text-[#1E2229]">{bq.q}</h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {bq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleBossAnswer(qIdx, oIdx)}
                        className={`p-3 rounded-xl text-xs text-left font-semibold border transition-all ${
                          bossAnswers[qIdx] === oIdx
                            ? 'bg-[#F95738] text-white border-[#F95738] shadow-sm'
                            : 'bg-white text-[#5A606C] border-[#E5E2DA] hover:bg-[#FAF9F6]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleFinishBoss}
                className="btn-coral text-xs py-2.5 px-6 shadow-md"
              >
                Submit Boss Challenge
              </button>
            </div>
          ) : (
            <div className="p-6 bg-[#EEFDFB] border border-[#0D9488]/30 rounded-2xl text-center space-y-3">
              <Trophy className="w-12 h-12 text-[#0D9488] mx-auto" />
              <h4 className="text-xl font-extrabold text-[#1E2229]">Boss Review Challenge Completed!</h4>
              <p className="text-xs text-[#5A606C]">Your results have been updated and connected to real mastery analytics!</p>
              <button
                onClick={() => {
                  setBossCompleted(false);
                  setBossAnswers({});
                }}
                className="btn-outline text-xs py-2 px-4 bg-white"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Challenge</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Earned Mastery Badges Gallery */}
      <div>
        <h3 className="text-lg font-extrabold text-[#1E2229] mb-3">Earned Mastery Badges</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div key={b.code} className="bg-white border border-[#E5E2DA] rounded-2xl p-4 shadow-sm flex items-start gap-3">
              <div className={`p-2.5 rounded-xl border ${b.color}`}>
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#1E2229] text-sm">{b.title}</h4>
                <p className="text-[11px] text-[#5A606C] mt-1 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

