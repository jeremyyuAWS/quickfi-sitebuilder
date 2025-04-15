import React, { useState } from 'react';
import { 
  Calendar, Check, Edit, ExternalLink, Globe, MoreHorizontal, Search,
  BarChart, ArrowUpRight, Filter
} from 'lucide-react';
import { DealerConfig } from '../types';
import DealerAnalytics from './DealerAnalytics';
import DealerLogo from './DealerLogo';

interface DashboardProps {
  dealers: DealerConfig[];
  onSelect: (dealer: DealerConfig) => void;
  onEdit: (dealer: DealerConfig) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ dealers, onSelect, onEdit }) => {
  const [viewMode, setViewMode] = useState<'list' | 'analytics'>('list');
  const [selectedDealer, setSelectedDealer] = useState<DealerConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Apply filters
  const filteredDealers = dealers.filter(dealer => {
    // Search term filter
    if (searchTerm && !dealer.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Region filter
    if (regionFilter !== 'all' && dealer.region !== regionFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter === 'published' && !dealer.published) {
      return false;
    }
    if (statusFilter === 'draft' && dealer.published) {
      return false;
    }
    
    return true;
  });
  
  const handleViewAnalytics = (dealer: DealerConfig) => {
    setSelectedDealer(dealer);
    setViewMode('analytics');
  };
  
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedDealer(null);
  };

  // Helper function to determine if logo is a component reference
  const isLogoComponent = (logo: string | undefined): boolean => {
    return typeof logo === 'string' && logo.startsWith('dealer-logo-');
  };

  // Helper to get industry from dealer
  const getDealerIndustry = (dealer: DealerConfig): string | undefined => {
    if (!dealer) return undefined;
    
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
      {viewMode === 'list' ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Dealer Microsites</h2>
            <p className="text-gray-600">Manage and view all your dealer microsites</p>
          </div>
          
          <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search dealers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[280px]"
              />
            </div>
            
            <div className="flex space-x-2">
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Regions</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50">
                <Filter size={16} />
                <span>More Filters</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left text-sm">
                    <th className="px-6 py-3 font-medium text-gray-500">Dealer</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Region</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Languages</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Last Updated</th>
                    <th className="px-6 py-3 font-medium text-gray-500">URL</th>
                    <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDealers.map(dealer => (
                    <tr key={dealer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {isLogoComponent(dealer.logo) ? (
                            <DealerLogo 
                              name={dealer.name} 
                              brandColor={dealer.brandColor}
                              size={32} 
                              industry={getDealerIndustry(dealer)}
                              className="rounded-full"
                            />
                          ) : dealer.logo ? (
                            <img 
                              src={dealer.logo} 
                              alt={dealer.name} 
                              className="h-8 w-8 rounded-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://placehold.co/100x100/' + dealer.brandColor.replace('#', '') + '/FFFFFF?text=' + dealer.name.charAt(0);
                              }}
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs text-gray-500">{dealer.name.charAt(0)}</span>
                            </div>
                          )}
                          <span className="font-medium text-gray-800">{dealer.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {dealer.region === 'US' ? 'United States' : 
                         dealer.region === 'CA' ? 'Canada' : 'France'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-1">
                          {dealer.languages.map(lang => (
                            <span 
                              key={lang} 
                              className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-xs text-gray-800"
                            >
                              <Globe size={12} className="mr-1" />
                              {lang.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {dealer.published ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">
                            <Check size={12} className="mr-1" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(dealer.lastUpdated)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {dealer.publishedUrl ? (
                          <a 
                            href="#" 
                            className="text-blue-600 hover:underline inline-flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {dealer.publishedUrl}
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleViewAnalytics(dealer)}
                            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="View Analytics"
                          >
                            <BarChart size={18} />
                          </button>
                          <button 
                            onClick={() => onSelect(dealer)}
                            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="View Microsite"
                          >
                            <ExternalLink size={18} />
                          </button>
                          <button 
                            onClick={() => onEdit(dealer)}
                            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit Microsite"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="More Options"
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredDealers.length === 0 && (
              <div className="py-12 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-4">No dealers found</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Create Your First Dealer Microsite
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <button 
                onClick={handleBackToList}
                className="text-blue-600 flex items-center mb-2 hover:underline"
              >
                <ArrowUpRight size={16} className="mr-1 transform rotate-180" />
                Back to Dealer List
              </button>
              <h2 className="text-2xl font-bold text-gray-800">{selectedDealer?.name} Analytics</h2>
              <p className="text-gray-600">Performance metrics and AI-generated insights</p>
            </div>
            <div className="flex items-center space-x-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="180">Last 6 Months</option>
                <option value="365">Last Year</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
            {selectedDealer && <DealerAnalytics dealer={selectedDealer} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;