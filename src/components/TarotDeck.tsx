import React, { useState } from 'react';
import { Shuffle, Sparkles } from 'lucide-react';
import { TarotCard } from '../types';
import { TAROT_DECK } from '../data/tarotDeck';

interface TarotDeckProps {
  onCardSelect: (card: TarotCard) => void;
}

const TarotDeck: React.FC<TarotDeckProps> = ({ onCardSelect }) => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const shuffleAndDraw = () => {
    setIsShuffling(true);
    setTimeout(() => {
      const randomCard = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
      const isReversed = Math.random() > 0.5;
      const drawnCard = { ...randomCard, isReversed };
      
      setSelectedCard(drawnCard);
      onCardSelect(drawnCard);
      setIsShuffling(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className={`relative w-64 h-96 ${isShuffling ? 'animate-shuffle' : ''}`}>
        {selectedCard ? (
          <div className={`relative w-full h-full transform transition-transform duration-1000
                          ${selectedCard.isReversed ? 'rotate-180' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-purple-900/30 
                          backdrop-blur-sm rounded-xl border border-gold/30
                          shadow-lg hover:shadow-gold/20 transition-all duration-300
                          flex flex-col items-center justify-center p-6 space-y-4
                          overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1572097662444-9d891d517060')] 
                            opacity-10 bg-cover bg-center" />
              <div className="relative z-10 text-center space-y-4">
                <h3 className="font-cinzel text-2xl text-gold font-bold">
                  {selectedCard.name}
                </h3>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <p className="text-astral-blue/90 text-lg font-lora">
                  {selectedCard.description}
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="text-sm text-gold/80 font-lora italic">
                  {selectedCard.isReversed ? '(Reversed)' : '(Upright)'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-purple-900/30
                         backdrop-blur-sm rounded-xl border border-gold/30
                         shadow-lg hover:shadow-gold/20 transition-all duration-300 group
                         flex items-center justify-center cursor-pointer
                         overflow-hidden"
               onClick={shuffleAndDraw}>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1572097662444-9d891d517060')] 
                          opacity-5 group-hover:opacity-10 transition-opacity duration-300 bg-cover bg-center" />
            <div className="relative z-10 text-gold space-y-3 text-center">
              <Shuffle className="w-12 h-12 mb-2 group-hover:rotate-180 transition-transform duration-500" />
              <p className="font-cinzel text-lg">Draw a Card</p>
              <Sparkles className="w-4 h-4 mx-auto animate-pulse" />
            </div>
          </div>
        )}
      </div>
      
      {selectedCard && (
        <button
          onClick={shuffleAndDraw}
          className="group px-6 py-3 bg-purple-900/50 hover:bg-purple-800/60 text-gold font-cinzel
                     rounded-lg border border-gold/30 shadow-lg hover:shadow-gold/20
                     transition-all duration-300 flex items-center space-x-2
                     relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Shuffle className="w-4 h-4" />
            <span>Draw Again</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/0 via-gold/10 to-purple-900/0 
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>
      )}
    </div>
  );
}

export default TarotDeck;