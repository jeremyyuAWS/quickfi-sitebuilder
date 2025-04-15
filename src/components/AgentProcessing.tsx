import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, Bot, Check, Clock, FileText, Globe, Link, Loader, Mail, Palette, RotateCw 
} from 'lucide-react';
import { AgentOutput } from '../types';

interface AgentProcessingProps {
  agent: AgentOutput;
  onComplete?: (output: AgentOutput) => void;
}

const AgentProcessing: React.FC<AgentProcessingProps> = ({ agent, onComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (agent.status === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else if (agent.status === 'completed') {
      setProgress(100);
    }
  }, [agent.status]);
  
  const getAgentIcon = () => {
    switch (agent.type) {
      case 'content':
        return <Bot size={18} />;
      case 'translation':
        return <Globe size={18} />;
      case 'design':
        return <Palette size={18} />;
      case 'pricing':
        return <FileText size={18} />;
      case 'email':
        return <Mail size={18} />;
      case 'documentation':
        return <FileText size={18} />;
      case 'link':
        return <Link size={18} />;
      default:
        return <Bot size={18} />;
    }
  };
  
  const getAgentName = () => {
    switch (agent.type) {
      case 'content':
        return 'Content Agent';
      case 'translation':
        return 'Translation Agent';
      case 'design':
        return 'Design Agent';
      case 'pricing':
        return 'Pricing Agent';
      case 'email':
        return 'Email Agent';
      case 'documentation':
        return 'Documentation Agent';
      case 'link':
        return 'Link Agent';
      default:
        return 'Agent';
    }
  };
  
  const getAgentDescription = () => {
    switch (agent.type) {
      case 'content':
        return 'Generating branded website content and FAQs';
      case 'translation':
        return 'Translating content to French Canadian';
      case 'design':
        return 'Applying brand colors and styles';
      case 'pricing':
        return 'Formatting pricing information';
      case 'email':
        return 'Creating dealer onboarding email';
      case 'documentation':
        return 'Generating program PDF';
      case 'link':
        return 'Creating branded shortlink';
      default:
        return 'Processing...';
    }
  };
  
  const getStatusIcon = () => {
    switch (agent.status) {
      case 'pending':
        return <Clock className="text-gray-400" />;
      case 'processing':
        return <Loader className="text-blue-600 animate-spin" />;
      case 'completed':
        return <Check className="text-green-600" />;
      case 'error':
        return <AlertCircle className="text-red-600" />;
      default:
        return <Clock className="text-gray-400" />;
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          <div 
            className={`p-1 rounded-full 
              ${agent.status === 'pending' ? 'bg-gray-100' : 
                agent.status === 'processing' ? 'bg-blue-100' : 
                agent.status === 'completed' ? 'bg-green-100' : 
                'bg-red-100'}`}
          >
            {getAgentIcon()}
          </div>
          <div>
            <h4 className="font-medium text-gray-800">{getAgentName()}</h4>
            <p className="text-sm text-gray-600">{getAgentDescription()}</p>
          </div>
        </div>
        <div>
          {getStatusIcon()}
        </div>
      </div>
      
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ease-out
            ${agent.status === 'processing' ? 'bg-blue-600' : 
              agent.status === 'completed' ? 'bg-green-600' : 
              agent.status === 'error' ? 'bg-red-600' : 'bg-gray-300'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {agent.status === 'error' && agent.error && (
        <p className="mt-2 text-sm text-red-600">{agent.error}</p>
      )}
      
      {agent.status === 'processing' && (
        <p className="mt-2 text-sm text-gray-500">
          {Math.round(progress)}% complete
        </p>
      )}
      
      {agent.status === 'completed' && agent.type === 'translation' && (
        <div className="mt-2 flex justify-end">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
            <Check size={12} className="mr-1" />
            Translated to French
          </span>
        </div>
      )}
      
      {agent.status === 'completed' && agent.type === 'link' && (
        <div className="mt-2 flex justify-end">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            go.quickfi.com/dealer-slug
          </span>
        </div>
      )}
    </div>
  );
};

export default AgentProcessing;