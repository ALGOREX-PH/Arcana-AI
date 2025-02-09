import React, { useState } from 'react';
import { Send, HelpCircle } from 'lucide-react';
/*

Coded by Danielle Bagaforo Meer
Lets Connect : https://www.linkedin.com/in/algorexph

*/
interface QuestionFormProps {
  onSubmit: (question: string) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-purple-900/10 backdrop-blur-sm rounded-xl border border-gold/30 
                    shadow-lg p-8 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="font-cinzel text-2xl text-gold">Ask Your Question</h2>
          <p className="text-astral-blue/90">
            Focus on your inquiry as you type. The cards await your question.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <HelpCircle className="absolute top-3 left-3 w-5 h-5 text-gold/50" />
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What guidance do you seek from the cards?"
              className="w-full px-10 py-3 bg-purple-900/20 text-white placeholder-purple-300/50
                       rounded-lg border border-gold/30 focus:outline-none focus:border-gold/60
                       min-h-[120px] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!question.trim()}
            className="w-full px-6 py-3 bg-purple-900/50 hover:bg-purple-800/60 text-gold
                     rounded-lg border border-gold/30 transition-all duration-300
                     flex items-center justify-center space-x-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Proceed to Card Reading</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuestionForm;