import React, { useState, useEffect } from 'react';
import { Send, Sparkles, MessageCircle } from 'lucide-react';
import { TarotCard } from '../types';

interface ChatWindowProps {
  selectedCard: TarotCard | null;
  initialQuestion: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedCard, initialQuestion }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Add initial question
    if (initialQuestion && messages.length === 0) {
      setMessages([{
        id: Date.now().toString(),
        text: initialQuestion,
        sender: 'user'
      }]);
    }
  }, [initialQuestion]);

  useEffect(() => {
    if (selectedCard) {
      const cardMessage = `You've drawn ${selectedCard.name}${selectedCard.isReversed ? ' (Reversed)' : ''}. 
                          This card appears in response to your question: "${initialQuestion}"
                          
                          ${selectedCard.isReversed ? selectedCard.reversed : selectedCard.upright}
                          
                          What would you like to know more about?`;
      
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: cardMessage,
          sender: 'ai'
        }]);
        setIsTyping(false);
      }, 1000);
    }
  }, [selectedCard]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    }]);

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I sense that this card holds significant meaning for your question. The energies suggest...",
        sender: 'ai'
      }]);
      setIsTyping(false);
    }, 1500);

    setInput('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-purple-900/10 backdrop-blur-sm rounded-xl border border-gold/30
                    shadow-lg overflow-hidden">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg flex items-start space-x-2 ${
              message.sender === 'user'
                ? 'bg-purple-900/50 text-gold'
                : 'bg-midnight/50 text-astral-blue'
            }`}>
              {message.sender === 'ai' && <Sparkles className="w-4 h-4 mt-1" />}
              {message.sender === 'user' && <MessageCircle className="w-4 h-4 mt-1" />}
              <span>{message.text}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-astral-blue">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Consulting the cards...</span>
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gold/30">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your reading..."
            className="flex-1 px-4 py-2 bg-purple-900/20 text-white placeholder-purple-300/50
                     rounded-lg border border-gold/30 focus:outline-none focus:border-gold/60"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-900/50 hover:bg-purple-800/60 text-gold
                     rounded-lg border border-gold/30 transition-colors duration-300
                     hover:shadow-lg hover:shadow-gold/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;