import React, { useState } from 'react';
import { RotateCw, CheckCircle2, Award, Sparkles } from 'lucide-react';

export const FlashcardDeck = ({ cards = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const sampleCards = cards.length > 0 ? cards : [
    { front: 'Chloroplast', back: 'Organelle inside plant cells where photosynthesis occurs, housing green chlorophyll pigments.' },
    { front: 'Stomata', back: 'Microscopic pores on leaf surfaces regulated by guard cells for carbon dioxide intake and transpiration.' },
    { front: 'Unit Rate', back: 'A ratio simplified so that the second quantity equals 1 unit (e.g., 60 km per 1 hour).' },
    { front: 'Photolysis', back: 'The chemical reaction in photosynthesis where solar light splits water molecules into oxygen and hydrogen.' }
  ];

  const currentCard = sampleCards[currentIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < sampleCards.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompletedCount(sampleCards.length);
    }
  };

  return (
    <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-sm max-w-xl mx-auto text-center">
      
      <div className="flex items-center justify-between text-xs mb-4">
        <span className="font-extrabold text-[#4F46E5] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Spaced-Repetition Flashcards
        </span>
        <span className="font-bold text-[#5A606C]">
          Card {currentIndex + 1} of {sampleCards.length}
        </span>
      </div>

      {/* 3D Flip Card Container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-56 cursor-pointer relative perspective-1000 my-4"
      >
        <div className={`w-full h-full rounded-2xl border-2 transition-all duration-500 transform-style-3d p-6 flex flex-col justify-center items-center shadow-md ${
          isFlipped 
            ? 'border-[#0D9488] bg-[#EEFDFB] text-[#0D9488]' 
            : 'border-[#F95738] bg-white text-[#1E2229] hover:border-[#F95738]'
        }`}>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#89909E] mb-2">
            {isFlipped ? 'ANSWER / DEFINITION' : 'QUESTION / TERM (TAP TO FLIP)'}
          </span>
          <h3 className="text-xl font-extrabold tracking-tight">
            {isFlipped ? currentCard.back : currentCard.front}
          </h3>
          <p className="text-[11px] text-[#5A606C] mt-3 italic">
            {isFlipped ? 'Tap to flip back' : 'Tap to reveal answer'}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="btn-outline text-xs py-2 px-4 bg-[#FAF9F6]"
        >
          <RotateCw className="w-4 h-4 text-[#F95738]" />
          <span>Flip Card</span>
        </button>

        <button
          onClick={handleNextCard}
          className="btn-coral text-xs py-2 px-5 shadow-sm"
        >
          <span>Next Flashcard</span>
        </button>
      </div>

    </div>
  );
};
