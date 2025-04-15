import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, CheckCircle, ArrowRight, Loader, Info } from 'lucide-react';
import { DealerConfig } from '../types';

interface ChatbotOnboardingProps {
  initialData?: DealerConfig | null;
  onComplete: (dealer: DealerConfig) => void;
}

interface Message {
  id: string;
  type: 'ai' | 'user' | 'system';
  content: string | React.ReactNode;
  timestamp: string;
}

// Demo script of conversation including user responses
const DEMO_CONVERSATION = [
  {
    type: 'ai',
    content: "👋 Hi there! I'm your AI assistant, and I'll help you set up a new dealer microsite for your equipment financing program.",
    delay: 0
  },
  {
    type: 'ai',
    content: "I'll guide you through providing the necessary information about your dealership, and our AI agents will automatically generate a branded microsite with financing tools tailored to your business.",
    delay: 2000
  },
  {
    type: 'ai',
    content: "Let's start with the basics.",
    delay: 1500
  },
  {
    type: 'ai',
    content: "What's the name of your dealership or equipment company? Please also tell me a bit about what type of equipment you sell or finance.",
    delay: 2000
  },
  {
    type: 'user',
    content: "Rocky Mountain Equipment. We sell construction machinery like excavators, bulldozers, and loaders primarily for commercial construction projects.",
    delay: 3500
  },
  {
    type: 'ai',
    content: "Thank you! Rocky Mountain Equipment is a great name. I've recorded that you specialize in construction equipment like excavators, bulldozers, and loaders for commercial projects.",
    delay: 1500
  },
  {
    type: 'ai',
    content: "Now I need some contact information that customers can use to reach you. What's the best email address and phone number for your financing inquiries?",
    delay: 2000
  },
  {
    type: 'user',
    content: "Our finance department can be reached at finance@rockymtnequip.com or (303) 555-7890.",
    delay: 3000
  },
  {
    type: 'ai',
    content: "Perfect! I've added your contact information: finance@rockymtnequip.com and (303) 555-7890.",
    delay: 1500
  },
  {
    type: 'ai',
    content: "What's your business address?",
    delay: 1800
  },
  {
    type: 'user',
    content: "8500 Construction Way, Denver, CO 80214",
    delay: 2500
  },
  {
    type: 'ai',
    content: "Thanks! I've recorded your address as: 8500 Construction Way, Denver, CO 80214.",
    delay: 1500
  },
  {
    type: 'ai',
    content: "Which region will your microsite primarily serve?",
    delay: 2000
  },
  {
    type: 'user',
    content: "United States",
    delay: 1500
  },
  {
    type: 'ai',
    content: "Great! I've set your region to United States. This ensures that your microsite will include the appropriate regulatory disclosures and financing terms for your market.",
    delay: 2000
  },
  {
    type: 'ai',
    content: "To maintain your brand identity across the microsite, what primary color should we use? This will be applied to navigation elements, buttons, and section headings.",
    delay: 2500
  },
  {
    type: 'user',
    content: "Our brand color is orange - #F15A22",
    delay: 2500
  },
  {
    type: 'ai',
    content: "Excellent! I've set your brand color to #F15A22 (orange). This will help make your microsite visually consistent with your existing branding.",
    delay: 2000
  },
  {
    type: 'ai',
    content: "Here's a helpful tip: Color choices can affect customer perception. Orange conveys energy, enthusiasm and urgency in calls-to-action, which works well with construction equipment!",
    delay: 2500
  },
  {
    type: 'ai',
    content: "Will you need multilingual support? We can translate content to French Canadian or Spanish if needed. English will always be included by default.",
    delay: 2500
  },
  {
    type: 'user',
    content: "Let's include Spanish as well since we have many Spanish-speaking customers.",
    delay: 2800
  },
  {
    type: 'ai',
    content: "Great choice! I've added Spanish language support. Our Translation Agent will automatically create Spanish versions of all content while maintaining your brand voice and terminology.",
    delay: 2000
  },
  {
    type: 'ai',
    content: "Do you have a pricing sheet with your equipment financing rates that you'd like to upload? This is optional - if you don't have one, we'll use standard QuickFi rates.",
    delay: 2500
  },
  {
    type: 'user',
    content: "Yes, I have our current rates. I'll upload the file.",
    delay: 2500
  },
  {
    type: 'ai',
    content: "Thank you! I see you've uploaded 'rocky-mountain-rates-2025.xlsx'. Our Pricing Agent will extract the information and format it appropriately for your microsite.",
    delay: 2000
  },
  {
    type: 'ai',
    content: "Great job! I have all the essential information I need to create your Rocky Mountain Equipment microsite. Here's a summary of what you've provided:",
    delay: 2500
  },
  {
    type: 'system',
    content: (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
        <div>
          <span className="font-medium">Dealer Name:</span> Rocky Mountain Equipment
        </div>
        <div>
          <span className="font-medium">Equipment Type:</span> Construction (excavators, bulldozers, loaders)
        </div>
        <div>
          <span className="font-medium">Email:</span> finance@rockymtnequip.com
        </div>
        <div>
          <span className="font-medium">Phone:</span> (303) 555-7890
        </div>
        <div>
          <span className="font-medium">Address:</span> 8500 Construction Way, Denver, CO 80214
        </div>
        <div>
          <span className="font-medium">Region:</span> United States
        </div>
        <div>
          <span className="font-medium">Brand Color:</span> <span className="inline-block w-4 h-4 rounded-full bg-[#F15A22] align-text-bottom mr-1"></span> #F15A22
        </div>
        <div>
          <span className="font-medium">Languages:</span> English, Spanish
        </div>
        <div>
          <span className="font-medium">Pricing:</span> Custom (rocky-mountain-rates-2025.xlsx)
        </div>
      </div>
    ),
    delay: 3000
  },
  {
    type: 'ai',
    content: "I'll now process this information with our AI agents to generate your microsite. Would you like to proceed with creating the microsite?",
    delay: 2000
  },
  {
    type: 'user',
    content: "Yes, please create the microsite.",
    delay: 2500
  },
  {
    type: 'ai',
    content: "Wonderful! I'm now activating our AI agent network to create your dealer microsite. This includes content generation, design application, pricing formats, and more.",
    delay: 2000
  },
  {
    type: 'system',
    content: (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start">
        <Loader size={16} className="text-blue-600 animate-spin mr-2 mt-0.5" />
        <div className="text-blue-700 text-sm">
          <p className="font-medium">Generating Rocky Mountain Equipment microsite...</p>
          <p>AI agents are working on your content, branding, and financing tools.</p>
        </div>
      </div>
    ),
    delay: 2000
  }
];

const ChatbotOnboarding: React.FC<ChatbotOnboardingProps> = ({ initialData, onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isRunningDemo, setIsRunningDemo] = useState(false);
  const [dealerData, setDealerData] = useState<DealerConfig>(
    initialData || {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      slug: '',
      urlSlug: '',
      logo: '',
      contact: {
        email: '',
        phone: '',
        address: ''
      },
      region: 'US',
      brandColor: '#0066CC',
      languages: ['en'],
      lastUpdated: new Date().toISOString()
    }
  );
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Add initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now().toString(),
      type: 'ai' as const,
      content: "👋 Hi there! I'm your AI assistant, and I'll help you set up a new dealer microsite for your equipment financing program.",
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    };
    
    setMessages([welcomeMessage]);
    
    // Add tip after a short delay
    setTimeout(() => {
      const tipMessage = {
        id: 'tip-1',
        type: 'system' as const,
        content: (
          <div className="flex items-start">
            <Info size={16} className="text-blue-600 mr-2 mt-0.5" />
            <span className="text-blue-800">Tip: You can view your microsite on different devices in the preview tab.</span>
          </div>
        ),
        timestamp: ''
      };
      setMessages(prev => [...prev, tipMessage]);
    }, 1500);
  }, []);

  // Run the demo conversation
  const runDemoConversation = () => {
    if (isRunningDemo) return;
    setIsRunningDemo(true);
    
    let timer: NodeJS.Timeout;
    let cumulativeDelay = 1000; // Start with initial delay
    
    const processNextMessage = (index: number) => {
      if (index >= DEMO_CONVERSATION.length) {
        // Demo complete
        setIsRunningDemo(false);
        setIsComplete(true);
        createDemoDealer(); // Create the final dealer data
        return;
      }
      
      const demoMessage = DEMO_CONVERSATION[index];
      const nextDelay = demoMessage.delay;
      
      timer = setTimeout(() => {
        const newMessage = {
          id: Date.now().toString(),
          type: demoMessage.type as 'ai' | 'user' | 'system',
          content: demoMessage.content,
          timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, newMessage]);
        setCurrentMessageIndex(index + 1);
        
        // Process next message
        processNextMessage(index + 1);
      }, nextDelay);
    };
    
    // Start processing from the current index
    processNextMessage(0);
    
    return () => clearTimeout(timer);
  };
  
  // Create the final dealer data from the demo
  const createDemoDealer = () => {
    setIsProcessing(true);
    
    // Create a demo dealer based on the conversation
    const newDealerData: DealerConfig = {
      id: Math.random().toString(36).substring(2, 9),
      name: "Rocky Mountain Equipment",
      slug: "rocky-mountain-equipment",
      urlSlug: "rockymtn",
      logo: `dealer-logo-${Math.random().toString(36).substring(2, 9)}`,
      contact: {
        email: "finance@rockymtnequip.com",
        phone: "(303) 555-7890",
        address: "8500 Construction Way, Denver, CO 80214"
      },
      region: "US",
      brandColor: "#F15A22",
      languages: ['en', 'es'],
      lastUpdated: new Date().toISOString(),
      description: "Construction machinery including excavators, bulldozers, and loaders for commercial construction projects.",
      businessType: "Construction Equipment"
    };
    
    // Simulate a delay before completing
    setTimeout(() => {
      setDealerData(newDealerData);
      onComplete(newDealerData);
      
      // Add completion message
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'system',
          content: (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start">
              <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5" />
              <div className="text-green-800 text-sm">
                <p className="font-medium">Microsite successfully created!</p>
                <p>You can now view and edit your dealer microsite.</p>
              </div>
            </div>
          ),
          timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        }
      ]);
      
      setIsProcessing(false);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // If we're not running the demo, start it after user's first message
    if (!isRunningDemo && messages.length <= 2) {
      runDemoConversation();
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <Bot size={20} className="mr-2" />
        <div>
          <h3 className="font-semibold">AI Dealer Onboarding Assistant</h3>
          <p className="text-sm text-blue-100">I'll help you create a dealer microsite in minutes</p>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} ${message.type === 'system' ? 'justify-center' : ''}`}
          >
            {message.type === 'system' ? (
              <div className="max-w-3xl w-full">
                {message.content}
              </div>
            ) : (
              <div
                className={`max-w-3xl rounded-lg p-3 ${
                  message.type === 'ai'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <div className="flex items-start">
                  {message.type === 'ai' && (
                    <div className="bg-white p-1 rounded-full mr-2 mt-0.5">
                      <Bot size={14} className="text-blue-600" />
                    </div>
                  )}
                  {message.type === 'user' && (
                    <div className="bg-blue-500 p-1 rounded-full mr-2 mt-0.5">
                      <User size={14} className="text-white" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-xs mb-1">
                      {message.type === 'ai' ? 'AI Assistant' : 'You'}
                      {message.timestamp && (
                        <span className="ml-2 font-normal text-opacity-75">
                          {message.timestamp}
                        </span>
                      )}
                    </div>
                    <div>{message.content}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        {isComplete ? (
          <div className="flex justify-center">
            <button
              onClick={() => onComplete(dealerData)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <span>View Your Microsite</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your message here..."
              disabled={isRunningDemo || isProcessing}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === '' || isRunningDemo || isProcessing}
              className={`p-3 rounded-lg ${
                inputValue.trim() === '' || isRunningDemo || isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isProcessing ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        )}
        
        {/* Optional Starter Buttons */}
        {messages.length <= 2 && !isRunningDemo && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setInputValue("Hi, I'd like to create a dealer microsite for my construction equipment business.");
              }}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-lg"
            >
              Create construction equipment site
            </button>
            <button
              onClick={() => {
                setInputValue("I need a financing portal for my medical equipment dealership.");
              }}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-lg"
            >
              Set up medical equipment financing
            </button>
            <button
              onClick={() => {
                setInputValue("Can you help me get started with a dealer portal?");
              }}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-lg"
            >
              General help
            </button>
          </div>
        )}
        
        <div className="flex items-center mt-2 justify-between">
          <div className="text-xs text-gray-500">
            {isRunningDemo ? (
              <span className="flex items-center">
                <Loader size={12} className="animate-spin mr-1" />
                Simulating conversation...
              </span>
            ) : (
              <span>
                {isComplete ? 'Microsite creation complete!' : 'AI assistant is ready to help'}
              </span>
            )}
          </div>
          
          {!isRunningDemo && messages.length <= 2 && (
            <button
              onClick={runDemoConversation}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Bot size={12} className="mr-1" />
              Run demo conversation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotOnboarding;