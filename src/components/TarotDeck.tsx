import React, { useState } from 'react';
import { Shuffle, Sparkles } from 'lucide-react';
import { TarotCard } from '../types';
import { TAROT_DECK } from '../data/tarotDeck';

interface TarotDeckProps {
  onCardSelect: (card: TarotCard) => void;
}
/*

Coded by Danielle Bagaforo Meer
Lets Connect : https://www.linkedin.com/in/algorexph

*/
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
            <div className="absolute inset-0 rounded-xl border border-gold/30
                          shadow-lg hover:shadow-gold/20 transition-all duration-300
                          overflow-hidden group">
              <img 
                src={selectedCard.image} 
                alt={selectedCard.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 p-4
                            transition-opacity duration-300 flex flex-col justify-end">
                <div className="w-full text-center bg-black/60 backdrop-blur-sm rounded-lg p-3">
                  <h3 className="font-cinzel text-xl text-gold font-bold mb-1.5 drop-shadow-lg">
                    {selectedCard.name}
                  </h3>
                  <p className="text-sm text-white font-lora mb-1.5 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {selectedCard.description}
                  </p>
                  <p className="text-sm text-gold font-lora italic drop-shadow">
                    {selectedCard.isReversed ? '(Reversed)' : '(Upright)'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1572097662444-9d891d517060')] 
                         bg-cover bg-center rounded-xl border border-gold/30
                         shadow-lg hover:shadow-gold/20 transition-all duration-300 group
                         cursor-pointer overflow-hidden"
               onClick={shuffleAndDraw}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-midnight/90" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gold space-y-3">
              <Shuffle className="w-12 h-12 mb-2 group-hover:rotate-180 transition-transform duration-500" />
              <p className="font-cinzel text-lg">Draw a Card</p>
              <Sparkles className="w-4 h-4 animate-pulse" />
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