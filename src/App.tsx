import React, { useState } from 'react';
import { Moon, Stars, Sparkles, HelpCircle } from 'lucide-react';
import TarotDeck from './components/TarotDeck';
import ChatWindow from './components/ChatWindow';
import QuestionForm from './components/QuestionForm';
import { TarotCard } from './types';

function App() {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [question, setQuestion] = useState<string>('');
  const [canDrawCard, setCanDrawCard] = useState(false);

  const startReading = () => {
    setIsReading(true);
  };

  const handleQuestionSubmit = (userQuestion: string) => {
    setQuestion(userQuestion);
    setCanDrawCard(true);
  };

  return (
    <div className="min-h-screen bg-midnight text-white relative overflow-hidden">
      {/* Animated background with enhanced effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-purple-900/20 to-midnight" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-5 bg-cover bg-center" />
        <Stars className="absolute top-10 left-10 w-8 h-8 text-gold animate-pulse" />
        <Moon className="absolute top-20 right-20 w-12 h-12 text-astral-blue animate-float" />
        <Sparkles className="absolute bottom-10 left-1/4 w-6 h-6 text-gold animate-twinkle" />
        <Sparkles className="absolute top-1/4 right-1/3 w-4 h-4 text-astral-blue animate-twinkle" />
        <Stars className="absolute bottom-1/4 right-1/4 w-5 h-5 text-gold/50 animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        {!isReading ? (
          // Enhanced landing page
          <div className="text-center space-y-8">
            <div className="mb-12">
              <img 
                src="https://raw.githubusercontent.com/gdgmapua/gdgmapua.github.io/main/assets/img/gdg-logo.png" 
                alt="Google Developer Groups On Campus - Mapúa University Manila" 
                className="h-24 mx-auto"
              />
            </div>
            <div className="relative inline-block">
              <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl text-gold font-bold mb-6 animate-glow">
                ArcanaAI
              </h1>
              <div className="absolute -top-8 -right-8 text-gold/30 animate-float">
                <Stars className="w-8 h-8" />
              </div>
            </div>
            <p className="font-lora text-xl md:text-2xl text-astral-blue mb-8 max-w-2xl mx-auto leading-relaxed">
              Unlock the Wisdom of the Cards Through the Power of AI
            </p>
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={startReading}
                className="group px-8 py-4 bg-purple-900/50 hover:bg-purple-800/60 text-gold font-cinzel text-xl rounded-lg 
                         border border-gold/30 shadow-lg hover:shadow-gold/20 transition-all duration-300
                         animate-pulse-slow relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Begin Your Reading
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/0 via-gold/10 to-purple-900/0 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
              <p className="text-astral-blue/70 text-sm italic">
                A project by Google Developer Groups On Campus - Mapúa University Manila
              </p>
            </div>
          </div>
        ) : (
          // Enhanced reading interface
          <div className="w-full max-w-6xl mx-auto">
            {!canDrawCard ? (
              <QuestionForm onSubmit={handleQuestionSubmit} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TarotDeck onCardSelect={setSelectedCard} />
                <ChatWindow selectedCard={selectedCard} initialQuestion={question} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;