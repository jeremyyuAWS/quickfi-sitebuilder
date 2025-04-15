import React, { useState, useEffect } from 'react';
import { Building, ChevronsRight, Home, List, PenTool, Settings, Activity, Users, MessageCircle, Play } from 'lucide-react';
import WelcomeModal from './components/WelcomeModal';
import DealerForm from './components/DealerForm';
import DealerPreview from './components/DealerPreview';
import Dashboard from './components/Dashboard';
import DealerAnalytics from './components/DealerAnalytics';
import FeedbackMode, { FeedbackData } from './components/FeedbackMode'; 
import AdminPanel from './components/AdminPanel';
import ChatbotOnboarding from './components/ChatbotOnboarding';
import DemoModePanel from './components/DemoModePanel';
import { DealerConfig } from './types';
import { mockDealers, demoDealer } from './data/mockData';
import { agentRegistry } from './agents';

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'preview' | 'dashboard' | 'analytics' | 'admin' | 'chatbot'>('dashboard');
  const [selectedDealer, setSelectedDealer] = useState<DealerConfig | null>(null);
  const [dealers, setDealers] = useState<DealerConfig[]>(mockDealers);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSimulatedMode, setIsSimulatedMode] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showDemoPanel, setShowDemoPanel] = useState(false);
  
  // Set activeTab when component mounts to ensure we have a visible UI
  useEffect(() => {
    setActiveTab('dashboard');
  }, []);
  
  const handleDealerSave = (dealer: DealerConfig) => {
    const exists = dealers.find(d => d.id === dealer.id);
    if (exists) {
      setDealers(dealers.map(d => d.id === dealer.id ? dealer : d));
    } else {
      setDealers([...dealers, dealer]);
    }
    setSelectedDealer(dealer);
    setActiveTab('preview');
  };

  const handlePublish = (dealerId: string) => {
    setDealers(
      dealers.map(d => 
        d.id === dealerId 
          ? { ...d, published: true, publishedUrl: `go.quickfi.com/${d.urlSlug}` } 
          : d
      )
    );
    // Auto update the selected dealer if it's the one being published
    if (selectedDealer && selectedDealer.id === dealerId) {
      const updated = dealers.find(d => d.id === dealerId);
      if (updated) setSelectedDealer(updated);
    }
  };

  const handleSubmitFeedback = (feedback: FeedbackData) => {
    // In a real app, this would send feedback to a server
    console.log('Feedback submitted:', feedback);
    alert('Thank you for your feedback! It will help us improve our AI agents.');
  };

  const handleToggleMode = (isSimulated: boolean) => {
    setIsSimulatedMode(isSimulated);
    // In a real app, this would change the data source between mock and real API
    alert(`Switched to ${isSimulated ? 'Simulated' : 'Live'} Mode`);
  };

  const activateDemoMode = () => {
    setIsDemoMode(true);
    setShowDemoPanel(false);
    // Load the demo dealer data
    const demoDealerConfig = demoDealer;
    setSelectedDealer(demoDealerConfig);
    
    // If the demo dealer doesn't exist in the dealers list, add it
    if (!dealers.some(d => d.id === demoDealerConfig.id)) {
      setDealers([...dealers, demoDealerConfig]);
    }
    
    // Switch to preview tab to show the demo
    setActiveTab('preview');
  };

  const exitDemoMode = () => {
    setIsDemoMode(false);
    setSelectedDealer(null);
    setActiveTab('dashboard');
  };

  const toggleDemoPanel = () => {
    setShowDemoPanel(!showDemoPanel);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-20 bg-blue-900 text-white flex flex-col items-center py-8">
        <div className="mb-12 text-2xl font-bold">Q</div>
        <nav className="flex flex-col items-center space-y-8 flex-1">
          <button 
            onClick={() => setActiveTab('create')}
            className={`p-3 rounded-xl ${activeTab === 'create' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
            title="Create New Microsite"
          >
            <PenTool size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('chatbot')}
            className={`p-3 rounded-xl ${activeTab === 'chatbot' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
            title="AI Onboarding Assistant"
          >
            <MessageCircle size={24} />
          </button>
          <button
            onClick={() => setActiveTab('preview')} 
            className={`p-3 rounded-xl ${activeTab === 'preview' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
            title="Preview Microsite"
            disabled={!selectedDealer}
          >
            <Home size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`p-3 rounded-xl ${activeTab === 'dashboard' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
            title="Dealer Dashboard"
          >
            <List size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`p-3 rounded-xl ${activeTab === 'analytics' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
            title="Analytics Dashboard"
            disabled={!selectedDealer}
          >
            <Activity size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('admin')} 
            className={`p-3 rounded-xl ${activeTab === 'admin' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
            title="Admin Panel"
          >
            <Users size={24} />
          </button>
        </nav>
        <div>
          <button className="p-3 hover:bg-blue-800 rounded-xl" title="Settings">
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building className="text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">QuickFi Dealer Microsite Builder</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isDemoMode && (
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Demo Mode
              </span>
            )}
            <button 
              onClick={toggleDemoPanel}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg flex items-center space-x-1"
            >
              <Play size={16} />
              <span>Demo</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <span>View Tutorials</span>
              <ChevronsRight size={16} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {activeTab === 'create' && (
            <DealerForm 
              initialData={selectedDealer} 
              onSave={handleDealerSave} 
            />
          )}

          {activeTab === 'chatbot' && (
            <div className="container mx-auto p-6 max-w-3xl h-full">
              <ChatbotOnboarding 
                initialData={selectedDealer}
                onComplete={handleDealerSave}
              />
            </div>
          )}

          {activeTab === 'preview' && selectedDealer && (
            <DealerPreview 
              dealer={selectedDealer} 
              onPublish={handlePublish} 
            />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard 
              dealers={dealers} 
              onSelect={(dealer) => {
                setSelectedDealer(dealer);
                setActiveTab('preview');
              }}
              onEdit={(dealer) => {
                setSelectedDealer(dealer);
                setActiveTab('create');
              }}
            />
          )}

          {activeTab === 'analytics' && selectedDealer && (
            <div className="container mx-auto p-6 max-w-6xl">
              <DealerAnalytics dealer={selectedDealer} />
            </div>
          )}

          {activeTab === 'admin' && (
            <AdminPanel onBack={() => setActiveTab('dashboard')} />
          )}
        </main>
      </div>

      {/* Welcome Modal */}
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      {/* Demo Mode Panel */}
      {showDemoPanel && (
        <DemoModePanel 
          onActivate={activateDemoMode}
          onClose={() => setShowDemoPanel(false)}
        />
      )}

      {/* Demo Mode Exit Button */}
      {isDemoMode && (
        <button 
          onClick={exitDemoMode}
          className="fixed bottom-20 right-4 z-40 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Exit Demo Mode
        </button>
      )}

      {/* Feedback Mode Component */}
      <FeedbackMode 
        isSimulated={isSimulatedMode}
        onToggleMode={handleToggleMode}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </div>
  );
}

export default App;