import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, Activity, ArrowUp, ArrowDown, Users, DollarSign, Globe } from 'lucide-react';
import { DealerConfig, DealerAnalyticsType, HealthScoreData } from '../types';
import SeoOptimizationDashboard from './SeoOptimizationDashboard';

interface DealerAnalyticsProps {
  dealer: DealerConfig;
  data?: DealerAnalyticsType;
  healthScore?: HealthScoreData;
}

// Mock analytics data generator
const generateMockAnalytics = (dealer: DealerConfig): DealerAnalyticsType => {
  return {
    visitors: Math.floor(Math.random() * 1000) + 500,
    applications: Math.floor(Math.random() * 100) + 20,
    conversionRate: Math.random() * 10 + 2,
    averageTime: Math.floor(Math.random() * 180) + 60,
    leadScore: Math.floor(Math.random() * 30) + 70,
    bySource: {
      'Direct': Math.floor(Math.random() * 200) + 100,
      'Organic': Math.floor(Math.random() * 150) + 50,
      'Referral': Math.floor(Math.random() * 100) + 20,
      'Email': Math.floor(Math.random() * 80) + 10,
      'Social': Math.floor(Math.random() * 50) + 5
    }
  };
};

// Helper to format numbers with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const DealerAnalytics: React.FC<DealerAnalyticsProps> = ({ dealer, data, healthScore }) => {
  // Use provided data or generate mock data
  const analyticsData = data || generateMockAnalytics(dealer);
  const [activeView, setActiveView] = useState<'overview' | 'health' | 'seo'>('overview');
  
  // Calculate if conversion is up or down (random for demo)
  const isConversionUp = Math.random() > 0.5;
  const conversionChange = (Math.random() * 2 + 0.5).toFixed(1);
  
  // Calculate health score and recommendations (if not provided)
  const dealerHealth = healthScore || {
    score: Math.floor(Math.random() * 30) + 70,
    metrics: [
      {
        name: 'Loan Volume',
        value: Math.floor(Math.random() * 1000000),
        weight: 0.3,
        score: Math.floor(Math.random() * 100)
      },
      {
        name: 'Approval Rate',
        value: Math.floor(Math.random() * 30) + 70,
        weight: 0.2,
        score: Math.floor(Math.random() * 100)
      }
    ],
    recommendations: [
      'Implement special financing offers for qualified buyers',
      'Increase visibility of financing options on product pages'
    ]
  };
  
  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveView('overview')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            activeView === 'overview' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Activity size={16} className="mr-2" />
          Performance Overview
        </button>
        <button
          onClick={() => setActiveView('health')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            activeView === 'health' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <BarChart size={16} className="mr-2" />
          Dealer Health Score
        </button>
        <button
          onClick={() => setActiveView('seo')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            activeView === 'seo' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Globe size={16} className="mr-2" />
          SEO Optimization
        </button>
      </div>
      
      {activeView === 'overview' && (
        <>
          <h2 className="text-2xl font-bold text-gray-800">Performance Overview</h2>
          
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Visitors"
              value={formatNumber(analyticsData.visitors)}
              icon={<Users size={20} />}
              change={+5.2}
              positive={true}
            />
            <MetricCard
              title="Applications"
              value={formatNumber(analyticsData.applications)}
              icon={<DollarSign size={20} />}
              change={+3.8}
              positive={true}
            />
            <MetricCard
              title="Conversion Rate"
              value={`${analyticsData.conversionRate.toFixed(1)}%`}
              icon={<Activity size={20} />}
              change={parseFloat(conversionChange)}
              positive={isConversionUp}
            />
            <MetricCard
              title="Lead Score"
              value={analyticsData.leadScore}
              icon={<BarChart size={20} />}
              change={-2.1}
              positive={false}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Traffic Sources */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <PieChart size={18} className="mr-2 text-blue-600" />
                Traffic Sources
              </h3>
              
              <div className="space-y-4">
                {Object.entries(analyticsData.bySource).map(([source, value]) => (
                  <div key={source}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{source}</span>
                      <span className="font-medium">{formatNumber(value)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${(value / analyticsData.visitors) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Health Score */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Activity size={18} className="mr-2 text-blue-600" />
                Dealer Health Score
              </h3>
              
              <div className="flex justify-center mb-4">
                <div 
                  className={`w-28 h-28 rounded-full flex items-center justify-center border-8 ${
                    dealerHealth.score >= 90 ? 'border-green-500' :
                    dealerHealth.score >= 80 ? 'border-blue-500' :
                    dealerHealth.score >= 70 ? 'border-yellow-500' :
                    'border-red-500'
                  }`}
                >
                  <span className="text-3xl font-bold text-gray-800">{dealerHealth.score}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {dealerHealth.metrics.slice(0, 2).map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{metric.name}</span>
                      <span className="font-medium">
                        {typeof metric.value === 'number' && metric.name.includes('Rate') 
                          ? `${metric.value}%` 
                          : metric.value}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          metric.score >= 80 ? 'bg-green-500' :
                          metric.score >= 60 ? 'bg-blue-500' :
                          metric.score >= 40 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* AI Recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <LineChart size={18} className="mr-2 text-blue-600" />
                AI Recommendations
              </h3>
              
              <ul className="space-y-3">
                {dealerHealth.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700 text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                <p>Generated by Lyzr AI Health Scoring Agent</p>
                <a href="https://www.lyzr.ai/responsible-ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Learn about Lyzr's Responsible AI
                </a>
              </div>
            </div>
          </div>
        </>
      )}
      
      {activeView === 'health' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Dealer Health Score</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Activity size={18} className="mr-2 text-blue-600" />
                Overall Score
              </h3>
              
              <div className="flex flex-col items-center">
                <div 
                  className={`w-48 h-48 rounded-full flex items-center justify-center border-12 ${
                    dealerHealth.score >= 90 ? 'border-green-500' :
                    dealerHealth.score >= 80 ? 'border-blue-500' :
                    dealerHealth.score >= 70 ? 'border-yellow-500' :
                    'border-red-500'
                  }`}
                >
                  <span className="text-6xl font-bold text-gray-800">{dealerHealth.score}</span>
                </div>
                
                <div className="mt-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    dealerHealth.score >= 90 ? 'bg-green-100 text-green-800' :
                    dealerHealth.score >= 80 ? 'bg-blue-100 text-blue-800' :
                    dealerHealth.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {dealerHealth.score >= 90 ? 'Excellent' :
                     dealerHealth.score >= 80 ? 'Good' :
                     dealerHealth.score >= 70 ? 'Fair' :
                     'Needs Improvement'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Performance Metrics
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Loan Volume', value: '$1,245,000', score: 85, trend: '+12%' },
                  { name: 'Approval Rate', value: '82%', score: 78, trend: '+5%' },
                  { name: 'Default Rate', value: '2.1%', score: 92, trend: '-0.5%' },
                  { name: 'Customer Satisfaction', value: '4.7/5', score: 94, trend: '+0.2' },
                  { name: 'Average Loan Size', value: '$48,500', score: 72, trend: '+$3,200' }
                ].map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <div>
                        <span className="font-medium text-gray-800">{metric.name}</span>
                        <span className="text-green-600 text-xs ml-2">{metric.trend}</span>
                      </div>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          metric.score >= 90 ? 'bg-green-500' :
                          metric.score >= 80 ? 'bg-blue-500' :
                          metric.score >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                AI Recommendations
              </h3>
              
              <div className="space-y-4">
                {[
                  'Implement special financing offers for equipment purchases over $50,000',
                  'Target return customers with loyalty discounts on new equipment financing',
                  'Increase visibility of financing options on high-traffic product pages',
                  'Develop a pre-approval program for qualified business customers',
                  'Create educational content about equipment financing options'
                ].map((recommendation, index) => (
                  <div key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                    <div className="bg-blue-100 text-blue-700 rounded-full p-1 mr-2 mt-0.5">
                      <LineChart size={14} />
                    </div>
                    <span className="text-gray-700 text-sm">{recommendation}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                <p>Generated by Lyzr AI Health Scoring Agent</p>
                <a href="https://www.lyzr.ai/responsible-ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Learn about Lyzr's Responsible AI
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Historical Performance
              </h3>
              
              <div className="h-64 relative">
                {/* Simulated chart - in a real app, use a chart library */}
                <div className="absolute inset-0 flex items-end space-x-1 px-4">
                  {[65, 70, 68, 75, 78, 74, 79, 81, 83, 80, 85, 88].map((score, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full max-w-[20px] bg-blue-600 rounded-t"
                        style={{ height: `${score}%` }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-1">
                        {index === 0 ? 'Jun' : 
                         index === 3 ? 'Sep' : 
                         index === 6 ? 'Dec' : 
                         index === 9 ? 'Mar' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center text-xs text-gray-500">
                Last 12 Months
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'seo' && (
        <SeoOptimizationDashboard dealer={dealer} />
      )}
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
  positive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, change, positive }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <div className={`p-2 rounded-full ${positive ? 'bg-green-100' : 'bg-red-100'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className={`flex items-center mt-1 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
          <span>{Math.abs(change)}%</span>
          <span className="text-gray-500 ml-1">vs. last month</span>
        </div>
      </div>
    </div>
  );
};

export default DealerAnalytics;