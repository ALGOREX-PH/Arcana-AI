import React, { useState, useEffect } from 'react';
import { Send, Sparkles, MessageCircle } from 'lucide-react';
import { TarotCard } from '../types';
import { getTarotReading } from '../lib/gemini';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuestion && messages.length === 0) {
      setMessages([{
        id: Date.now().toString(),
        text: initialQuestion,
        sender: 'user'
      }]);
    }
  }, [initialQuestion, messages.length]);

  useEffect(() => {
    const getReading = async () => {
      if (!selectedCard || !initialQuestion) return;

      setIsTyping(true);
      setError(null);
      
      try {
        const reading = await getTarotReading(initialQuestion, selectedCard);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: reading,
          sender: 'ai'
        }]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to connect with the mystical forces. Please try again.';
        setError(errorMessage);
        console.error('Reading error:', err);
      } finally {
        setIsTyping(false);
      }
    };

    if (selectedCard && initialQuestion) {
      getReading();
    }
  }, [selectedCard, initialQuestion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedCard) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const reading = await getTarotReading(input, selectedCard);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: reading,
        sender: 'ai'
      }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect with the mystical forces. Please try again.';
      setError(errorMessage);
      console.error('Reading error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-purple-900/10 backdrop-blur-sm rounded-xl border border-gold/30
                    shadow-lg overflow-hidden">
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
              <span className="whitespace-pre-wrap">{message.text}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-astral-blue">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Consulting the cards...</span>
          </div>
        )}
        {error && (
          <div className="text-red-400 text-center p-2 bg-red-900/20 rounded-lg border border-red-900/50">
            {error}
          </div>
        )}
      </div>

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
            disabled={isTyping}
            className="px-4 py-2 bg-purple-900/50 hover:bg-purple-800/60 text-gold
                     rounded-lg border border-gold/30 transition-colors duration-300
                     hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;