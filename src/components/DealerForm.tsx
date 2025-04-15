import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Building2, Check, Globe, Image, Info, Palette, Send, Upload, Settings
} from 'lucide-react';
import { DealerConfig } from '../types';
import { agentRegistry } from '../agents';
import AgentConfigPanel from './AgentConfigPanel';
import DealerLogo from './DealerLogo';

interface DealerFormProps {
  initialData?: DealerConfig | null;
  onSave: (dealer: DealerConfig) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const DEFAULT_DEALER: DealerConfig = {
  id: '',
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
};

const DealerForm: React.FC<DealerFormProps> = ({ initialData, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DealerConfig>(initialData || {
    ...DEFAULT_DEALER,
    id: generateId()
  });
  const [fileSelected, setFileSelected] = useState(false);
  const [showAgentConfig, setShowAgentConfig] = useState(false);
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof DealerConfig],
          [child]: value
        }
      });
    } else if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      const urlSlug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(' ')[0];
        
      setFormData({
        ...formData,
        name: value,
        slug,
        urlSlug
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleLanguageChange = (lang: 'en' | 'fr' | 'es', checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        languages: [...formData.languages, lang]
      });
    } else {
      setFormData({
        ...formData,
        languages: formData.languages.filter(l => l !== lang)
      });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, we'd handle file upload here
    // For this demo, we'll just set the dealer logo id
    setFileSelected(true);
    // Generate a logo ID based on the company name
    const logoId = `dealer-logo-${formData.id}`;
    setFormData({
      ...formData,
      logo: logoId
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      lastUpdated: new Date().toISOString()
    });
  };

  const handleUploadPricing = () => {
    // Simulate uploading a pricing file
    setTimeout(() => {
      setFileSelected(true);
    }, 500);
  };

  const handleAgentToggle = (agentId: string, enabled: boolean) => {
    // This would be implemented to enable/disable specific agents
    console.log(`Agent ${agentId} ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleModelChange = (agentId: string, model: string) => {
    // This would be implemented to change the model for a specific agent
    console.log(`Agent ${agentId} model changed to ${model}`);
  };

  const handleThresholdChange = (agentId: string, threshold: number) => {
    // This would be implemented to change the confidence threshold for a specific agent
    console.log(`Agent ${agentId} threshold changed to ${threshold}`);
  };

  // Helper function to detect industry from dealer name or data
  const guessIndustry = (): string | undefined => {
    const name = formData.name.toLowerCase();
    if (name.includes('med') || name.includes('health') || name.includes('care')) {
      return 'medical';
    }
    if (name.includes('farm') || name.includes('agri') || name.includes('crop')) {
      return 'agriculture';
    }
    if (name.includes('construct') || name.includes('build') || name.includes('cat')) {
      return 'construction';
    }
    if (name.includes('transport') || name.includes('logisti') || name.includes('truck')) {
      return 'transportation';
    }
    if (name.includes('solar') || name.includes('energy') || name.includes('power')) {
      return 'energy';
    }
    return undefined;
  };
  
  // Workflow steps configuration
  const workflowSteps = [
    { id: 1, title: 'Dealer Info', icon: <Building2 size={16} /> },
    { id: 2, title: 'Branding', icon: <Palette size={16} /> },
    { id: 3, title: 'Content', icon: <Upload size={16} /> },
    { id: 4, title: 'Review', icon: <Check size={16} /> }
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? 'Edit Dealer Microsite' : 'Create New Dealer Microsite'}
          </h2>
          <p className="text-gray-600">Configure the dealer's information to generate a branded microsite</p>
        </div>
        <button 
          onClick={() => setShowAgentConfig(!showAgentConfig)}
          className="flex items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
        >
          <Settings size={16} className="mr-2" />
          Configure AI Agents
        </button>
      </div>

      {/* Agent Configuration Panel */}
      {showAgentConfig && (
        <div className="mb-6">
          <AgentConfigPanel 
            agents={agentRegistry.getAllAgents()}
            onAgentToggle={handleAgentToggle}
            onModelChange={handleModelChange}
            onThresholdChange={handleThresholdChange}
            onApply={() => setShowAgentConfig(false)}
            onCancel={() => setShowAgentConfig(false)}
          />
        </div>
      )}

      {/* Enhanced Workflow Indicator */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
          <div className="relative z-10 flex justify-between">
            {workflowSteps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative">
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center 
                      ${isCompleted ? 'bg-blue-600 text-white' : isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}
                      transition-colors duration-200
                    `}
                  >
                    {isCompleted ? <Check size={18} /> : step.icon}
                  </div>
                  
                  {/* Progress Line */}
                  {index < workflowSteps.length - 1 && (
                    <div 
                      className="absolute h-1 top-5 left-10 transition-all duration-200"
                      style={{ 
                        width: 'calc(100% - 20px)', 
                        backgroundColor: isCompleted ? '#2563EB' : '#E5E7EB',
                        right: '-100%'
                      }}
                    ></div>
                  )}
                  
                  <span 
                    className={`
                      mt-2 text-sm font-medium whitespace-nowrap
                      ${isActive || isCompleted ? 'text-blue-800' : 'text-gray-500'}
                    `}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Step 1: Dealer Info */}
        {currentStep === 1 && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Dealer Information</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Dealer Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., XCMG North America"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact.email">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contact.email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="contact@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact.phone">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    id="contact.phone"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact.address">
                  Business Address
                </label>
                <textarea
                  id="contact.address"
                  name="contact.address"
                  value={formData.contact.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Street, City, State, ZIP"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="region">
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Branding */}
        {currentStep === 2 && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Branding & Design</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Logo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {formData.logo ? (
                      <div className="flex flex-col items-center">
                        {formData.logo.startsWith('dealer-logo-') ? (
                          <div className="mb-2">
                            <DealerLogo 
                              name={formData.name} 
                              brandColor={formData.brandColor}
                              size={96} 
                              industry={guessIndustry()}
                              className="rounded-lg"
                            />
                          </div>
                        ) : (
                          <img 
                            src={formData.logo} 
                            alt="Dealer logo" 
                            className="h-24 object-contain mb-2"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D';
                            }}
                          />
                        )}
                        <button 
                          type="button" 
                          className="text-sm text-blue-600 hover:text-blue-800"
                          onClick={() => setFormData({ ...formData, logo: '' })}
                        >
                          Replace
                        </button>
                      </div>
                    ) : (
                      <>
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input 
                              id="logo-upload" 
                              name="logo-upload" 
                              type="file" 
                              className="sr-only" 
                              accept="image/*"
                              onChange={handleLogoChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="brandColor">
                  Brand Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    id="brandColor"
                    name="brandColor"
                    value={formData.brandColor}
                    onChange={handleChange}
                    className="h-10 w-16 border-0 rounded p-0"
                  />
                  <input
                    type="text"
                    name="brandColor"
                    value={formData.brandColor}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="#000000"
                  />
                  <div className="flex-1">
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => setFormData({ ...formData, brandColor: e.target.value })}
                      value={formData.brandColor}
                    >
                      <option value="#0066CC">QuickFi Blue</option>
                      <option value="#FF6B00">Construction Orange</option>
                      <option value="#FFD100">Equipment Yellow</option>
                      <option value="#007700">Industrial Green</option>
                      <option value="#9900CC">Premium Purple</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Languages Support
                </label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lang-en"
                      checked={formData.languages.includes('en')}
                      onChange={(e) => handleLanguageChange('en', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled // English is required
                    />
                    <label htmlFor="lang-en" className="ml-2 block text-gray-700">
                      English (required)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lang-fr"
                      checked={formData.languages.includes('fr')}
                      onChange={(e) => handleLanguageChange('fr', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="lang-fr" className="ml-2 block text-gray-700">
                      French Canadian
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lang-es"
                      checked={formData.languages.includes('es')}
                      onChange={(e) => handleLanguageChange('es', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="lang-es" className="ml-2 block text-gray-700">
                      Spanish
                    </label>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Additional languages will be automatically translated by our Translation Agent
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Content & Upload */}
        {currentStep === 3 && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Content & Additional Information</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start space-x-3">
                <Info className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">
                    AI Content Generation
                  </h4>
                  <p className="text-sm text-blue-700">
                    Our AI agents will automatically generate dealer-specific website content, FAQs, 
                    and marketing materials based on the information you've provided.
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pricing Sheet (Optional)
                </label>
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Upload className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Upload Pricing CSV/Excel
                        </p>
                        <p className="text-xs text-gray-500">
                          Template: Equipment Type, Term (months), Rate (%)
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleUploadPricing}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Browse
                    </button>
                  </div>
                  {fileSelected && (
                    <div className="mt-3 flex items-center text-sm text-green-600">
                      <Check size={16} className="mr-1" />
                      pricing-sheet-may-2025.xlsx
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  If no pricing sheet is provided, we'll use standard QuickFi rates
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Final Review</h3>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg divide-y">
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-1">Dealer Information</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Name:</strong> {formData.name}</li>
                    <li><strong>Region:</strong> {formData.region}</li>
                    <li><strong>Contact:</strong> {formData.contact.email} | {formData.contact.phone}</li>
                    <li><strong>URL Slug:</strong> go.quickfi.com/{formData.urlSlug}</li>
                  </ul>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-1">Branding & Design</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center space-x-2">
                      <strong>Logo:</strong> 
                      {formData.logo ? (
                        formData.logo.startsWith('dealer-logo-') ? (
                          <DealerLogo
                            name={formData.name} 
                            brandColor={formData.brandColor}
                            size={24} 
                            industry={guessIndustry()}
                            className="rounded-full ml-2"
                          />
                        ) : (
                          <img 
                            src={formData.logo} 
                            alt="Logo" 
                            className="h-6 w-6 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D';
                            }}
                          />
                        )
                      ) : (
                        <span className="text-red-500">Not uploaded</span>
                      )}
                    </li>
                    <li className="flex items-center space-x-2">
                      <strong>Brand Color:</strong> 
                      <div 
                        className="h-4 w-4 rounded-full border border-gray-300" 
                        style={{ backgroundColor: formData.brandColor }}
                      ></div>
                      <span>{formData.brandColor}</span>
                    </li>
                    <li>
                      <strong>Languages:</strong> {formData.languages.map(l => l === 'en' ? 'English' : l === 'fr' ? 'French' : 'Spanish').join(', ')}
                    </li>
                  </ul>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-1">AI-Generated Assets</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center space-x-2">
                      <span>✓</span>
                      <span>Website Content & FAQs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>✓</span>
                      <span>Dealer Welcome Email</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>✓</span>
                      <span>Program Overview PDF</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>✓</span>
                      <span>Custom URL: go.quickfi.com/{formData.urlSlug}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="bg-gray-50 p-6 flex justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {currentStep < workflowSteps.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <span>Create Microsite</span>
              <Send size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DealerForm;