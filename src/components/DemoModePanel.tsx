import React, { useState } from 'react';
import { X, PlayCircle, Rocket, Clock, ChevronRight, Building } from 'lucide-react';
import { dealerExamples } from '../data/mockData';
import DealerLogo from './DealerLogo';

interface DemoModePanelProps {
  onActivate: () => void;
  onClose: () => void;
}

const DemoModePanel: React.FC<DemoModePanelProps> = ({ onActivate, onClose }) => {
  const [selectedScenario, setSelectedScenario] = useState('construction');
  
  const demoScenarios = [
    {
      id: 'construction',
      name: 'Construction Equipment Dealer',
      description: 'Full dealer setup with equipment pricing, French language support, and custom branding',
      time: '1 minute demo',
      active: true,
      industry: 'construction'
    },
    {
      id: 'medical',
      name: 'Medical Equipment Financing',
      description: 'Healthcare-specific financing with specialized terms and compliance features',
      time: '1 minute demo',
      active: true,
      industry: 'medical'
    },
    {
      id: 'agriculture',
      name: 'Agricultural Machinery Financing',
      description: 'Seasonal financing offers with regional compliance features',
      time: '1 minute demo',
      active: true,
      industry: 'agriculture'
    },
    {
      id: 'solar',
      name: 'Renewable Energy Equipment',
      description: 'Solar and clean energy equipment with extended terms and special financing',
      time: '1 minute demo',
      active: true,
      industry: 'energy'
    },
    {
      id: 'logistics',
      name: 'Transportation & Logistics Equipment',
      description: 'Fleet financing solutions with specialized terms for transportation companies',
      time: '1 minute demo',
      active: true,
      industry: 'transportation'
    }
  ];

  const handleScenarioSelect = (id: string) => {
    setSelectedScenario(id);
  };

  const handleActivate = () => {
    // Pass the selected scenario to the parent component
    onActivate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center">
            <PlayCircle className="mr-2" size={24} />
            Demo Mode - Select a Dealer Microsite
          </h2>
          <button onClick={onClose} className="text-white hover:text-blue-200">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Select a pre-configured dealer microsite to instantly preview the full functionality of the QuickFi Dealer Microsite Builder. Each option represents a different industry with specialized financing terms and content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 pr-6 border-r border-gray-200">
              <h3 className="font-medium text-gray-700 mb-4">Select Industry</h3>
              <div className="space-y-2">
                {demoScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => handleScenarioSelect(scenario.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedScenario === scenario.id 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{scenario.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{scenario.description}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="font-medium text-gray-700 mb-4">Dealer Preview</h3>
              
              <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
                {selectedScenario === 'construction' && (
                  <DealerPreview 
                    name="Caterpillar Equipment Finance"
                    logo="dealer-logo-cat"
                    description="Premium construction and mining equipment financing solutions with competitive rates and flexible terms for contractors and construction companies."
                    brandColor="#FFCC00"
                    region="US"
                    languages={['en', 'fr']}
                  />
                )}
                
                {selectedScenario === 'medical' && (
                  <DealerPreview 
                    name="NextGen Medical Systems"
                    logo="dealer-logo-medical"
                    description="Specialized financing for advanced diagnostic and surgical equipment with extended terms and healthcare-specific payment options."
                    brandColor="#3949AB"
                    region="US"
                    languages={['en']}
                  />
                )}
                
                {selectedScenario === 'agriculture' && (
                  <DealerPreview 
                    name="GreenField Agriculture"
                    logo="dealer-logo-agriculture"
                    description="Seasonal financing solutions for agricultural machinery with payment schedules aligned to harvest cycles and cash flow patterns."
                    brandColor="#33691E"
                    region="US"
                    languages={['en', 'es']}
                  />
                )}
                
                {selectedScenario === 'solar' && (
                  <DealerPreview 
                    name="Solar Power Finance"
                    logo="dealer-logo-solar"
                    description="Long-term financing for solar panel systems and clean energy equipment with terms designed to match energy production and ROI timelines."
                    brandColor="#FBC02D"
                    region="US"
                    languages={['en', 'es']}
                  />
                )}
                
                {selectedScenario === 'logistics' && (
                  <DealerPreview 
                    name="LogistiQuip Transport"
                    logo="dealer-logo-transport"
                    description="Fleet financing solutions for transportation companies with volume discounts and maintenance-inclusive options for trucks and logistics equipment."
                    brandColor="#1565C0"
                    region="US"
                    languages={['en']}
                  />
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-3">Features Included</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5 mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Industry-Specific Content</div>
                      <div className="text-gray-600 text-xs">Tailored copy and FAQs</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5 mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Custom Branding</div>
                      <div className="text-gray-600 text-xs">Applied to all touchpoints</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5 mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Compliance Checking</div>
                      <div className="text-gray-600 text-xs">Region-specific regulations</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5 mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Specialized Pricing</div>
                      <div className="text-gray-600 text-xs">Industry-appropriate rates & terms</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5 mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Multi-Language Support</div>
                      <div className="text-gray-600 text-xs">Where available</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5 mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Automated Documentation</div>
                      <div className="text-gray-600 text-xs">Program PDFs & welcome emails</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-between">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={handleActivate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700"
          >
            <PlayCircle size={18} className="mr-2" />
            Launch Demo: {selectedScenario === 'construction' ? 'Caterpillar' :
                         selectedScenario === 'medical' ? 'NextGen Medical' :
                         selectedScenario === 'agriculture' ? 'GreenField Agriculture' :
                         selectedScenario === 'solar' ? 'Solar Power Finance' :
                         'LogistiQuip Transport'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface DealerPreviewProps {
  name: string;
  logo: string;
  description: string;
  brandColor: string;
  region: 'US' | 'CA' | 'FR';
  languages: ('en' | 'fr' | 'es')[];
}

const DealerPreview: React.FC<DealerPreviewProps> = ({ name, logo, description, brandColor, region, languages }) => {
  // Helper to get industry from logo ID or description
  const getIndustry = (): string | undefined => {
    if (logo === 'dealer-logo-medical') return 'medical';
    if (logo === 'dealer-logo-agriculture') return 'agriculture';
    if (logo === 'dealer-logo-construction') return 'construction';
    if (logo === 'dealer-logo-transport') return 'transportation';
    if (logo === 'dealer-logo-solar' || logo === 'dealer-logo-energy') return 'energy';
    if (logo === 'dealer-logo-cat') return 'construction';
    
    if (description.toLowerCase().includes('medical')) return 'medical';
    if (description.toLowerCase().includes('agriculture')) return 'agriculture';
    if (description.toLowerCase().includes('construct')) return 'construction';
    if (description.toLowerCase().includes('transport') || description.toLowerCase().includes('fleet')) return 'transportation';
    if (description.toLowerCase().includes('solar') || description.toLowerCase().includes('renewable')) return 'energy';
    
    return undefined;
  };
  
  return (
    <div className="flex items-start">
      <div 
        className="w-16 h-16 rounded-lg flex items-center justify-center mr-4 overflow-hidden"
        style={{ backgroundColor: brandColor === '#FFFFFF' ? '#f3f4f6' : brandColor }}
      >
        {logo.startsWith('dealer-logo-') ? (
          <DealerLogo 
            name={name} 
            brandColor={brandColor}
            size={40} 
            industry={getIndustry()}
            className="rounded-lg"
          />
        ) : (
          <img 
            src={logo} 
            alt={name} 
            className="w-12 h-12 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D';
            }}
          />
        )}
      </div>
      
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-800">{name}</h4>
        
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
            {region === 'US' ? 'United States' : region === 'CA' ? 'Canada' : 'France'}
          </span>
          
          {languages.map((lang) => (
            <span 
              key={lang} 
              className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {lang === 'en' ? 'English' : lang === 'fr' ? 'French' : 'Spanish'}
            </span>
          ))}
          
          <span 
            className="w-5 h-5 rounded-full border border-gray-300" 
            style={{ backgroundColor: brandColor }}
            title="Brand color"
          ></span>
        </div>
      </div>
    </div>
  );
};

export default DemoModePanel;