import React, { useState, useEffect } from 'react';
import { 
  BarChart2, Globe, Search, AlertCircle, CheckCircle, ExternalLink, 
  ArrowUp, ArrowDown, Edit, RefreshCw, Copy, Smartphone, Laptop 
} from 'lucide-react';
import { DealerConfig, SeoRecommendation } from '../types';
import { SeoOptimizationAgent } from '../agents/advanced';

interface SeoOptimizationDashboardProps {
  dealer: DealerConfig;
  initialData?: SeoRecommendation;
}

// Mock historical SEO data
const mockSeoHistory = [
  { date: '2025-04-01', score: 67 },
  { date: '2025-04-08', score: 72 },
  { date: '2025-04-15', score: 78 },
  { date: '2025-04-22', score: 76 },
  { date: '2025-04-29', score: 81 },
  { date: '2025-05-06', score: 85 }
];

const SeoOptimizationDashboard: React.FC<SeoOptimizationDashboardProps> = ({ dealer, initialData }) => {
  const [seoData, setSeoData] = useState<SeoRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'keywords' | 'technical'>('overview');
  const [historyData] = useState(mockSeoHistory);
  
  useEffect(() => {
    const fetchSeoData = async () => {
      setLoading(true);
      if (initialData) {
        setSeoData(initialData);
        setLoading(false);
        return;
      }
      
      // Simulate API call to get SEO data
      try {
        const seoAgent = new SeoOptimizationAgent();
        const result = seoAgent.generateResult(dealer);
        setSeoData(result);
        setTimeout(() => {
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching SEO data:', error);
        setLoading(false);
      }
    };
    
    fetchSeoData();
  }, [dealer, initialData]);
  
  const calculateScoreColor = (score: number) => {
    if (score >= 80) return { color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-500' };
    if (score >= 70) return { color: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-500' };
    return { color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-500' };
  };
  
  const currentScore = seoData ? 85 : 0; // In a real app, this would come from the SEO analysis
  const scoreColors = calculateScoreColor(currentScore);
  
  const contentIssues = [
    { 
      type: 'critical', 
      message: 'Missing meta description on equipment financing page', 
      impact: 'high',
      recommendation: 'Add descriptive meta descriptions to improve click-through rates.'
    },
    { 
      type: 'warning', 
      message: 'Duplicate title tags on similar product pages', 
      impact: 'medium',
      recommendation: 'Create unique, descriptive titles for each page.'
    },
    { 
      type: 'success', 
      message: 'Proper heading structure (H1, H2, H3) in place', 
      impact: 'positive',
      recommendation: 'Continue using semantic headings to structure content.'
    }
  ];
  
  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <AlertCircle size={16} />;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Analyzing SEO data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">SEO Optimization</h2>
        <button className="flex items-center space-x-1 text-blue-600 text-sm">
          <RefreshCw size={14} />
          <span>Refresh Analysis</span>
        </button>
      </div>
      
      {/* SEO Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:col-span-1">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">SEO Score</h3>
            <div className={`w-32 h-32 rounded-full flex items-center justify-center border-8 ${scoreColors.borderColor}`}>
              <span className="text-4xl font-bold">{currentScore}</span>
            </div>
            <div className="mt-3 flex items-center">
              <ArrowUp size={16} className="text-green-600" />
              <span className="text-green-600 font-medium">+8 points</span>
              <span className="text-gray-500 text-sm ml-1">last month</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:col-span-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">SEO Score History</h3>
          <div className="h-48 relative">
            {/* Simplified chart representation */}
            <div className="absolute inset-0 flex items-end px-6">
              {historyData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full max-w-[30px] bg-blue-600 rounded-t"
                    style={{ height: `${item.score}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'overview' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'content' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'keywords' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('keywords')}
          >
            Keywords
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'technical' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('technical')}
          >
            Technical
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {activeTab === 'overview' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-5 text-gray-800">SEO Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-md font-medium mb-3 text-gray-700">Search Engine Preview</h4>
                
                <div className="flex mb-3">
                  <button
                    className={`flex-1 py-2 text-sm font-medium text-center ${
                      previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    } rounded-l-md`}
                    onClick={() => setPreviewDevice('desktop')}
                  >
                    <Laptop size={16} className="inline mr-1" />
                    Desktop
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium text-center ${
                      previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    } rounded-r-md`}
                    onClick={() => setPreviewDevice('mobile')}
                  >
                    <Smartphone size={16} className="inline mr-1" />
                    Mobile
                  </button>
                </div>
                
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-white p-4 border-b border-gray-300">
                    <div className="text-blue-600 hover:underline font-medium overflow-hidden text-ellipsis">
                      {seoData?.title || `${dealer.name} Equipment Financing | Fast & Easy Approvals`}
                    </div>
                    <div className="text-green-700 text-sm">
                      {`https://go.quickfi.com/${dealer.urlSlug}`} ▼
                    </div>
                    <div className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {seoData?.description || `Get instant financing for your equipment purchase through ${dealer.name}. 100% digital application, quick approvals, and competitive rates. Apply online now!`}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-300 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Search Engine Preview</span>
                    <button className="text-blue-600 text-xs flex items-center">
                      <Edit size={12} className="mr-1" />
                      Edit Meta Data
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium mb-3 text-gray-700">Priority Improvements</h4>
                  <ul className="space-y-3">
                    {contentIssues.map((issue, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mt-0.5 mr-2">{getIssueIcon(issue.type)}</div>
                        <div>
                          <p className="text-sm text-gray-800">{issue.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{issue.recommendation}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-3 text-gray-700">Top Keywords</h4>
                <div className="space-y-3">
                  {seoData?.keywords?.slice(0, 6).map((keyword, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xs text-gray-700 font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-800">{keyword}</span>
                          <span className="text-xs text-gray-500">
                            {Math.floor(100 - index * 8)}% relevant
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${100 - index * 8}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-md font-medium mb-3 text-gray-700">Local SEO Suggestions</h4>
                  <ul className="space-y-2">
                    {seoData?.localRecommendations?.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="text-blue-600 mr-2">•</div>
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'content' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Content Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-700">Content Quality</h4>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Good</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Your content is well-structured and provides valuable information about equipment financing options.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-700">Readability</h4>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">Fair</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Some paragraphs are too long. Break them down into smaller chunks to improve readability.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-700">Keyword Usage</h4>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Good</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Keywords are used naturally throughout the content without keyword stuffing.</p>
              </div>
            </div>
            
            <h4 className="text-md font-medium mb-3 text-gray-700">Content Optimization Suggestions</h4>
            <div className="space-y-4">
              {seoData?.contentSuggestions?.map((suggestion, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">{suggestion}</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        {index === 0 ? 'Customer testimonials build trust and improve conversion rates while also providing valuable user-generated content for SEO.' :
                         index === 1 ? 'FAQs help address common customer questions and provide opportunities to rank for long-tail keywords.' :
                         'Regular blog content keeps your site fresh and provides more indexable pages for search engines.'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'keywords' && (
          <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Keyword Analysis</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg flex items-center">
                  <Globe size={14} className="mr-1" />
                  Add Keywords
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Relevance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Competition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {seoData?.keywords?.map((keyword, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{keyword}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{Math.floor(100 - index * 6)}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${index % 3 === 0 ? 'text-red-600' : index % 3 === 1 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {index % 3 === 0 ? 'High' : index % 3 === 1 ? 'Medium' : 'Low'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{100 * (10 - index)}+</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          {index < 3 ? (
                            <>
                              <span className="text-green-600 mr-1">{index + 1}</span>
                              <ArrowUp size={14} className="text-green-600" />
                            </>
                          ) : index < 6 ? (
                            <>
                              <span className="mr-1">{index + 7}</span>
                              <ArrowDown size={14} className="text-red-600" />
                            </>
                          ) : (
                            <>
                              <span className="text-yellow-600 mr-1">11+</span>
                              <ArrowUp size={14} className="text-yellow-600" />
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${index < 3 ? 'bg-green-100 text-green-800' : index < 6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {index < 3 ? 'Ranking' : index < 6 ? 'Improving' : 'Opportunity'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'technical' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-5 text-gray-800">Technical SEO Issues</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-green-800">Passed</h4>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">7</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-yellow-800">Warnings</h4>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">3</span>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-red-800">Errors</h4>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">1</span>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-blue-800">Info</h4>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">2</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-700">Technical Issues Found</h4>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="px-6 py-4">
                  <div className="flex items-start">
                    <div className="bg-red-100 text-red-700 rounded-full p-1 mr-3">
                      <AlertCircle size={16} />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Missing Alt Text on Images</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        5 images on the equipment gallery page are missing descriptive alt text.
                      </p>
                      <div className="mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline flex items-center">
                          <Edit size={14} className="mr-1" />
                          Fix Issue
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 text-yellow-700 rounded-full p-1 mr-3">
                      <AlertCircle size={16} />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Mobile Responsiveness Issues</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        The application form is too wide on mobile devices, causing horizontal scrolling.
                      </p>
                      <div className="mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline flex items-center">
                          <Smartphone size={14} className="mr-1" />
                          View Mobile Preview
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 text-yellow-700 rounded-full p-1 mr-3">
                      <AlertCircle size={16} />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Page Load Speed</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Your homepage takes 3.2 seconds to load on mobile, which may affect SEO ranking and user experience.
                      </p>
                      <div className="mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline flex items-center">
                          <ExternalLink size={14} className="mr-1" />
                          Run Speed Test
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-700">Schema Markup</h4>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-600 mb-4">
                  Add structured data to help search engines understand your content better.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs font-mono overflow-auto max-h-36">
                  <pre>{`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${dealer.name}",
  "url": "https://go.quickfi.com/${dealer.urlSlug}",
  "logo": "${dealer.logo}",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "${dealer.contact.phone}",
    "contactType": "customer service"
  },
  "offers": {
    "@type": "Offer",
    "description": "Equipment Financing",
    "priceCurrency": "USD"
  }
}`}</pre>
                </div>
                <div className="mt-3 flex justify-end">
                  <button className="text-blue-600 text-sm hover:underline flex items-center">
                    <Copy size={14} className="mr-1" />
                    Copy Schema Markup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeoOptimizationDashboard;