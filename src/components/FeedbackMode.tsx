import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Send, AlertTriangle, HelpCircle, Lock, Bot } from 'lucide-react';

interface FeedbackModeProps {
  isSimulated: boolean;
  onToggleMode: (isSimulated: boolean) => void;
  onSubmitFeedback: (feedback: FeedbackData) => void;
}

export interface FeedbackData {
  rating: 'positive' | 'negative' | null;
  category: string;
  message: string;
  agentId?: string;
}

const FeedbackMode: React.FC<FeedbackModeProps> = ({ 
  isSimulated, 
  onToggleMode,
  onSubmitFeedback
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: null,
    category: '',
    message: '',
    agentId: ''
  });

  const handleSubmit = () => {
    if (!feedback.message) return;
    
    onSubmitFeedback(feedback);
    
    // Reset form
    setFeedback({
      rating: null,
      category: '',
      message: '',
      agentId: ''
    });
    
    // Close feedback form
    setIsOpen(false);
  };

  const feedbackCategories = [
    'Content Quality',
    'Translation Accuracy',
    'Design Suggestions',
    'Pricing Format',
    'Technical Issue',
    'Feature Request',
    'Other'
  ];

  const agents = [
    { id: 'content-agent', name: 'Content Agent' },
    { id: 'translation-agent', name: 'Translation Agent' },
    { id: 'design-agent', name: 'Design Agent' },
    { id: 'pricing-agent', name: 'Pricing Agent' },
    { id: 'email-agent', name: 'Email Agent' },
    { id: 'documentation-agent', name: 'Documentation Agent' },
    { id: 'link-agent', name: 'Link Agent' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Mode Toggle */}
      <div className="bg-white shadow-lg rounded-lg mb-2 p-2 flex items-center justify-between">
        <div className="text-xs text-gray-500 mr-2">Mode:</div>
        <div className="flex rounded-md shadow-sm">
          <button
            onClick={() => onToggleMode(true)}
            className={`px-3 py-1 text-xs font-medium rounded-l-md transition-colors ${
              isSimulated 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Use mock data for demonstration"
          >
            <Bot size={12} className="inline mr-1" />
            Simulated
          </button>
          <button
            onClick={() => onToggleMode(false)}
            className={`px-3 py-1 text-xs font-medium rounded-r-md transition-colors flex items-center ${
              !isSimulated 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Connect to live Lyzr agents"
          >
            {!isSimulated ? (
              <>Live</>
            ) : (
              <>
                <Lock size={10} className="inline mr-1" />
                Live
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feedback Button */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center shadow-lg
            ${isOpen ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}
          `}
        >
          {isOpen ? <MessageSquare size={20} /> : <MessageSquare size={20} />}
        </button>
      </div>

      {/* Feedback Form */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-3">
            <h3 className="font-medium">Send Feedback</h3>
            <p className="text-xs text-blue-100">
              Help us improve our AI agents
            </p>
          </div>
          
          <div className="p-4">
            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How was your experience?
              </label>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setFeedback({...feedback, rating: 'positive'})}
                  className={`p-2 rounded-full ${
                    feedback.rating === 'positive' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <ThumbsUp size={20} />
                </button>
                <button
                  onClick={() => setFeedback({...feedback, rating: 'negative'})}
                  className={`p-2 rounded-full ${
                    feedback.rating === 'negative' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <ThumbsDown size={20} />
                </button>
              </div>
            </div>
            
            {/* Feedback Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={feedback.category}
                onChange={(e) => setFeedback({...feedback, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Select category</option>
                {feedbackCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Specific Agent */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specific Agent (Optional)
              </label>
              <select
                value={feedback.agentId || ''}
                onChange={(e) => setFeedback({...feedback, agentId: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">All agents</option>
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
              </select>
            </div>
            
            {/* Feedback Message */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Feedback
              </label>
              <textarea
                value={feedback.message}
                onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                rows={3}
                placeholder="Please describe your feedback, suggestions or issues..."
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 flex items-center">
                <HelpCircle size={12} className="mr-1" />
                <a href="https://www.lyzr.ai/responsible-ai" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Lyzr Responsible AI
                </a>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!feedback.message}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium flex items-center
                  ${feedback.message 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                `}
              >
                <Send size={14} className="mr-1" />
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackMode;