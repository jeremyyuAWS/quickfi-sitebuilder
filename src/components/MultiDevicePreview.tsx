import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, ExternalLink, Code, Copy } from 'lucide-react';
import { DealerConfig } from '../types';

interface MultiDevicePreviewProps {
  dealer: DealerConfig;
  children: React.ReactNode;
}

const MultiDevicePreview: React.FC<MultiDevicePreviewProps> = ({ dealer, children }) => {
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [showDevTools, setShowDevTools] = useState(false);
  
  const getDeviceStyles = () => {
    switch (activeDevice) {
      case 'mobile':
        return {
          width: '375px',
          height: '667px',
          maxHeight: '80vh',
          borderRadius: '20px',
        };
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          maxHeight: '80vh',
          borderRadius: '16px',
        };
      default:
        return {
          width: '100%',
          height: '70vh',
          borderRadius: '8px',
        };
    }
  };
  
  const deviceFrameClasses = {
    mobile: 'border-8 border-gray-800 rounded-[20px] shadow-xl',
    tablet: 'border-[12px] border-gray-800 rounded-[16px] shadow-xl',
    desktop: 'border-[16px] border-gray-800 rounded-[8px] shadow-xl'
  };
  
  const deviceStyles = getDeviceStyles();
  
  // Mocked responsive issues for demo
  const responsiveIssues = {
    mobile: [
      { element: 'Application Form', issue: 'Overflow causes horizontal scrolling', severity: 'high' },
      { element: 'Navigation Menu', issue: 'Items too close together for touch targets', severity: 'medium' }
    ],
    tablet: [
      { element: 'Pricing Table', issue: 'Columns too narrow on tablet portrait view', severity: 'medium' }
    ],
    desktop: []
  };
  
  const currentIssues = responsiveIssues[activeDevice];
  const hasIssues = currentIssues.length > 0;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="font-semibold text-gray-800">Multi-Device Preview</h3>
          <span className="ml-2 text-sm text-gray-500">
            {dealer.publishedUrl || `go.quickfi.com/${dealer.urlSlug}`}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveDevice('mobile')}
            className={`p-2 rounded ${activeDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Mobile View"
          >
            <Smartphone size={20} />
          </button>
          <button
            onClick={() => setActiveDevice('tablet')}
            className={`p-2 rounded ${activeDevice === 'tablet' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Tablet View"
          >
            <Tablet size={20} />
          </button>
          <button
            onClick={() => setActiveDevice('desktop')}
            className={`p-2 rounded ${activeDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Desktop View"
          >
            <Monitor size={20} />
          </button>
          <button
            onClick={() => setShowDevTools(!showDevTools)}
            className={`p-2 rounded ${showDevTools ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Developer Tools"
          >
            <Code size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-6 bg-gray-100 flex flex-col items-center">
        <div className="relative mb-4">
          <div 
            className={deviceFrameClasses[activeDevice]}
            style={deviceStyles}
          >
            <div 
              className="bg-white w-full h-full overflow-auto"
              style={{ pointerEvents: hasIssues ? 'none' : 'auto' }}
            >
              {children}
            </div>
          </div>
          
          {hasIssues && (
            <>
              {currentIssues.map((issue, index) => (
                <div
                  key={index}
                  className={`absolute ${
                    index === 0 
                      ? 'top-1/3 left-1/4' 
                      : 'top-2/3 right-1/4'
                  } z-10`}
                >
                  <div className={`
                    px-3 py-1 rounded-full text-white text-xs
                    ${issue.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'}
                  `}>
                    {issue.element}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        
        {/* Device Information */}
        <div className="text-sm text-gray-500 flex items-center">
          <span className="font-medium mr-1">
            {activeDevice === 'mobile' ? 'Mobile' : activeDevice === 'tablet' ? 'Tablet' : 'Desktop'}
          </span>
          •
          <span className="mx-1">
            {activeDevice === 'mobile' ? '375 x 667px' : activeDevice === 'tablet' ? '768 x 1024px' : 'Responsive'}
          </span>
          
          {activeDevice === 'mobile' && (
            <span className="ml-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
              Optimizations needed
            </span>
          )}
        </div>
      </div>
      
      {hasIssues && (
        <div className="border-t border-gray-200 bg-white p-4">
          <h4 className="font-medium text-gray-800 mb-2">Responsive Issues Found</h4>
          <div className="space-y-2">
            {currentIssues.map((issue, index) => (
              <div key={index} className="flex items-start">
                <div className={`
                  p-1 rounded-full flex-shrink-0 mr-2
                  ${issue.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}
                `}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {issue.element}
                  </div>
                  <div className="text-xs text-gray-600">
                    {issue.issue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {showDevTools && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-800">Device CSS Media Queries</h4>
            <button className="text-blue-600 text-sm flex items-center">
              <Copy size={14} className="mr-1" />
              Copy
            </button>
          </div>
          <pre className="bg-gray-800 text-gray-200 p-3 rounded text-xs overflow-auto">
            {activeDevice === 'mobile' 
              ? `/* Mobile-specific styles */
@media (max-width: 767px) {
  .container {
    padding: 1rem;
  }
  
  .navbar {
    flex-direction: column;
  }
  
  .pricing-table {
    overflow-x: auto;
  }
}`
              : activeDevice === 'tablet'
              ? `/* Tablet-specific styles */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    padding: 1.5rem;
  }
  
  .columns {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .sidebar {
    width: 240px;
  }
}`
              : `/* Desktop-specific styles */
@media (min-width: 1024px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .columns {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .sidebar {
    width: 280px;
  }
}`}
          </pre>
          <div className="mt-2 text-xs text-gray-500">
            <a href="#" className="text-blue-600 flex items-center hover:underline">
              <ExternalLink size={12} className="mr-1" />
              View Responsive Design Guidelines
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiDevicePreview;