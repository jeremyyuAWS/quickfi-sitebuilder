import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Check, ExternalLink, Globe, GlobeIcon, Loader, Send, ShieldAlert 
} from 'lucide-react';
import { AgentOutput, DealerConfig } from '../types';
import AgentManager from './AgentManager';
import MicrositePreview from './MicrositePreview';
import MultiDevicePreview from './MultiDevicePreview';
import ComplianceCheckingTools from './ComplianceCheckingTools';
import { mockMicrositeContent } from '../data/mockData';
import DealerLogo from './DealerLogo';

interface DealerPreviewProps {
  dealer: DealerConfig;
  onPublish: (dealerId: string) => void;
}

const DealerPreview: React.FC<DealerPreviewProps> = ({ dealer, onPublish }) => {
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'fr'>('en');
  const [agentOutputs, setAgentOutputs] = useState<AgentOutput[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'preview' | 'email' | 'pdf' | 'compliance' | 'device-preview'>('preview');
  const [emailContent, setEmailContent] = useState<{ subject: string; body: string } | null>(null);
  
  const handleAgentsComplete = (outputs: AgentOutput[]) => {
    setAgentOutputs(outputs);
    setIsProcessing(false);
    
    // Extract email content from email agent output
    const emailAgent = outputs.find(output => output.type === 'email' && output.status === 'completed');
    if (emailAgent && emailAgent.result) {
      setEmailContent({
        subject: emailAgent.result.subject,
        body: emailAgent.result.body
      });
    }
  };
  
  const handlePublish = () => {
    onPublish(dealer.id);
  };

  // Helper function to detect if logo is a component reference
  const isLogoComponent = (logo: string | undefined): boolean => {
    return typeof logo === 'string' && logo.startsWith('dealer-logo-');
  };

  // Helper function to determine industry from dealer data
  const getDealerIndustry = (dealer: DealerConfig): string | undefined => {
    if (dealer.businessType?.toLowerCase().includes('medical') || 
        dealer.name.toLowerCase().includes('med') ||
        dealer.description?.toLowerCase().includes('medical')) {
      return 'medical';
    }
    if (dealer.businessType?.toLowerCase().includes('agri') || 
        dealer.name.toLowerCase().includes('farm') ||
        dealer.description?.toLowerCase().includes('agri')) {
      return 'agriculture';
    }
    if (dealer.businessType?.toLowerCase().includes('construct') || 
        dealer.description?.toLowerCase().includes('construct')) {
      return 'construction';
    }
    if (dealer.businessType?.toLowerCase().includes('transport') || 
        dealer.name.toLowerCase().includes('logisti') ||
        dealer.description?.toLowerCase().includes('transport')) {
      return 'transportation';
    }
    if (dealer.description?.toLowerCase().includes('solar') || 
        dealer.description?.toLowerCase().includes('renewable')) {
      return 'energy';
    }
    return undefined;
  };
  
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {dealer.name} Microsite
          </h2>
          <p className="text-gray-600 flex items-center mt-1">
            <span>Status:</span>
            {dealer.published ? (
              <span className="flex items-center ml-2 text-green-600">
                <Check size={16} className="mr-1" />
                Published
              </span>
            ) : (
              <span className="flex items-center ml-2 text-blue-600">
                <Loader size={16} className="mr-1 animate-spin" />
                Preview Mode
              </span>
            )}
          </p>
        </div>
        
        {isProcessing ? (
          <button
            disabled
            className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg flex items-center space-x-2 cursor-not-allowed"
          >
            <Loader size={16} className="animate-spin" />
            <span>Generating...</span>
          </button>
        ) : dealer.published ? (
          <a 
            href="#" 
            className="px-6 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-2 hover:bg-green-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Visit Live Site</span>
            <ExternalLink size={16} />
          </a>
        ) : (
          <button
            onClick={handlePublish}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <span>Publish Microsite</span>
            <Send size={16} />
          </button>
        )}
      </div>

      {isProcessing ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
            <Loader size={18} className="animate-spin mr-2" />
            Generating Dealer Microsite
          </h3>
          
          <div className="space-y-6">
            <p className="text-gray-600">
              Our AI agents are working to create a custom microsite for {dealer.name}. This process typically takes less than a minute.
            </p>
            
            <AgentManager 
              dealer={dealer}
              onComplete={handleAgentsComplete}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedTab('preview')}
                className={`py-4 px-6 text-sm font-medium ${
                  selectedTab === 'preview'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Microsite Preview
              </button>
              <button
                onClick={() => setSelectedTab('device-preview')}
                className={`py-4 px-6 text-sm font-medium ${
                  selectedTab === 'device-preview'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Multi-Device Preview
              </button>
              <button
                onClick={() => setSelectedTab('compliance')}
                className={`py-4 px-6 text-sm font-medium flex items-center ${
                  selectedTab === 'compliance'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ShieldAlert size={16} className="mr-1" />
                Compliance Check
              </button>
              <button
                onClick={() => setSelectedTab('email')}
                className={`py-4 px-6 text-sm font-medium ${
                  selectedTab === 'email'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Welcome Email
              </button>
              <button
                onClick={() => setSelectedTab('pdf')}
                className={`py-4 px-6 text-sm font-medium ${
                  selectedTab === 'pdf'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Program PDF
              </button>
            </div>
          </div>
          
          {/* Language Toggle - Only show if French is supported */}
          {dealer.languages.includes('fr') && (selectedTab === 'preview' || selectedTab === 'device-preview') && (
            <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-end">
              <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setActiveLanguage('en')}
                  className={`px-3 py-1 text-sm rounded-md flex items-center ${
                    activeLanguage === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <GlobeIcon size={12} className="mr-1" />
                  EN
                </button>
                <button
                  onClick={() => setActiveLanguage('fr')}
                  className={`px-3 py-1 text-sm rounded-md flex items-center ${
                    activeLanguage === 'fr'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <GlobeIcon size={12} className="mr-1" />
                  FR
                </button>
              </div>
            </div>
          )}
          
          {/* Content Based on Selected Tab */}
          {selectedTab === 'preview' && (
            <MicrositePreview 
              dealer={dealer} 
              content={mockMicrositeContent[activeLanguage]}
            />
          )}
          
          {selectedTab === 'device-preview' && (
            <MultiDevicePreview dealer={dealer}>
              <MicrositePreview 
                dealer={dealer} 
                content={mockMicrositeContent[activeLanguage]}
              />
            </MultiDevicePreview>
          )}

          {selectedTab === 'compliance' && (
            <ComplianceCheckingTools dealer={dealer} />
          )}
          
          {selectedTab === 'email' && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-2 text-gray-500">From:</div>
                    <div className="col-span-10">QuickFi Team &lt;onboarding@quickfi.com&gt;</div>
                    
                    <div className="col-span-2 text-gray-500">To:</div>
                    <div className="col-span-10">{dealer.name} Team</div>
                    
                    <div className="col-span-2 text-gray-500">Subject:</div>
                    <div className="col-span-10 font-medium">
                      {emailContent?.subject || `Your New ${dealer.name} QuickFi Financing Portal is Live!`}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white text-gray-700 whitespace-pre-line">
                  {emailContent?.body || `Dear ${dealer.name} Team,

We're excited to announce that your custom QuickFi financing portal is now live at ${dealer.publishedUrl || `go.quickfi.com/${dealer.urlSlug}`}!

The portal includes:
- Your branding and colors
- Current pricing and terms
- Customer-friendly application process
- Marketing materials and resources

We've attached a one-page program guide that you can share with your sales team. The guide includes a QR code that links directly to your financing portal.

Please review the portal and let us know if you'd like any adjustments.

Best regards,
The QuickFi Team`}
                </div>
              </div>
              
              <div className="text-center mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center space-x-2 hover:bg-blue-700">
                  <span>Download Email Template</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
          
          {selectedTab === 'pdf' && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-white p-8" style={{ backgroundColor: dealer.brandColor === '#FFFFFF' ? '#f9f9f9' : 'white' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: dealer.brandColor }}>
                        {dealer.name} Equipment Financing
                      </h2>
                      <h3 className="text-lg mt-1 text-gray-700">powered by QuickFi®</h3>
                    </div>
                    {dealer.logo && (
                      isLogoComponent(dealer.logo) ? (
                        <DealerLogo 
                          name={dealer.name} 
                          brandColor={dealer.brandColor}
                          size={48} 
                          industry={getDealerIndustry(dealer)}
                          className="rounded-lg"
                        />
                      ) : (
                        <img 
                          src={dealer.logo} 
                          alt={dealer.name} 
                          className="h-12 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D';
                          }}
                        />
                      )
                    )}
                  </div>
                  
                  <div className="mt-8 space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-gray-800">Program Highlights</h3>
                      <ul className="mt-2 space-y-1 text-gray-700">
                        <li>• 100% digital application process</li>
                        <li>• Instant credit decisions for qualified customers</li>
                        <li>• Fixed rates from 5.99% to 7.49%</li>
                        <li>• Terms from 24 to 60 months</li>
                        <li>• Financing from $5,000 to $250,000</li>
                      </ul>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold text-gray-800">How It Works</h3>
                      <div className="mt-2 grid grid-cols-3 gap-4 text-center text-sm">
                        <div className="border border-gray-200 rounded-lg p-3">
                          <div className="text-xl font-bold mb-2" style={{ color: dealer.brandColor }}>1</div>
                          <p>Customer scans QR code or visits dealer portal</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3">
                          <div className="text-xl font-bold mb-2" style={{ color: dealer.brandColor }}>2</div>
                          <p>Completes 2-minute digital application</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3">
                          <div className="text-xl font-bold mb-2" style={{ color: dealer.brandColor }}>3</div>
                          <p>Reviews offer and e-signs documents</p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="flex justify-between items-center border-t border-gray-200 pt-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Access Your Financing Portal</h3>
                        <p className="text-gray-600 text-sm mt-1">Scan the QR code or visit the URL below</p>
                        <p className="font-medium mt-2" style={{ color: dealer.brandColor }}>
                          {dealer.publishedUrl || `go.quickfi.com/${dealer.urlSlug}`}
                        </p>
                      </div>
                      <div className="border-4 border-gray-200 p-4 bg-white">
                        {/* Simulated QR code */}
                        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">QR Code</span>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center space-x-2 hover:bg-blue-700">
                  <span>Download PDF</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DealerPreview;