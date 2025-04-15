import React from 'react';
import { X, Bot, Globe, Palette, Calculator, Mail, FileText, Link, MessageCircle } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Welcome to QuickFi Dealer Microsite Builder</h2>
          <button onClick={onClose} className="text-white hover:text-blue-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">This app is powered by AI agents from the Lyzr platform</h3>
            <p className="text-gray-600">
              Automate the end-to-end setup of branded dealer microsites for QuickFi's equipment loan programs, 
              dramatically reducing manual effort and scaling onboarding capacity.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Meet the AI Agents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AgentCard 
                icon={<Bot className="text-purple-500" />}
                title="Content Agent"
                description="Auto-generates branded onboarding copy, FAQs, and page content"
              />
              <AgentCard 
                icon={<Globe className="text-green-500" />}
                title="Translation Agent"
                description="Translates content into French Canadian or other selected languages"
              />
              <AgentCard 
                icon={<Palette className="text-pink-500" />}
                title="Design Agent"
                description="Applies logos, styles, and color schemes to the microsite"
              />
              <AgentCard 
                icon={<Calculator className="text-amber-500" />}
                title="Pricing Agent"
                description="Reads pricing sheet, formats table, and embeds in microsite"
              />
              <AgentCard 
                icon={<Mail className="text-blue-500" />}
                title="Email Agent"
                description="Crafts customized dealer onboarding email"
              />
              <AgentCard 
                icon={<FileText className="text-indigo-500" />}
                title="Documentation Agent"
                description="Creates downloadable dealer program PDF (1-pager)"
              />
              <AgentCard 
                icon={<Link className="text-teal-500" />}
                title="Link Agent"
                description="Generates shortlink and stores metadata"
              />
              <AgentCard 
                icon={<MessageCircle className="text-rose-500" />}
                title="Onboarding Assistant"
                description="Guides you through setup with a conversational interface"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Getting Started</h3>
            <ol className="list-decimal ml-5 space-y-2 text-gray-600">
              <li>Complete the dealer intake form with logo, colors, and contact information</li>
              <li>Or use our AI Assistant for a guided conversational setup experience</li>
              <li>Watch as our AI agents automatically generate content, designs, and assets</li>
              <li>Preview the dealer microsite in real-time</li>
              <li>Publish the microsite to make it live</li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This is a demo application. In this simulated environment, AI-generated content is 
              pre-configured. In a production environment, Lyzr AI agents would generate this content in real-time based 
              on your inputs.
            </p>
            <p className="text-sm text-blue-800 mt-2">
              <a href="https://www.lyzr.ai/responsible-ai" target="_blank" rel="noopener noreferrer" className="underline">
                Learn more about Lyzr's Responsible AI
              </a>
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

interface AgentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start space-x-3 shadow-sm">
      <div className="bg-gray-50 p-2 rounded-full">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default WelcomeModal;