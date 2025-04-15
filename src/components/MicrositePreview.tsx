import React, { useState } from 'react';
import { ArrowRight, Building, CreditCard, ExternalLink, FileText, Mail } from 'lucide-react';
import { DealerConfig } from '../types';
import { mockPricingData } from '../data/mockData';
import Phone from './Phone';
import DealerLogo from './DealerLogo';

interface MicrositePreviewProps {
  dealer: DealerConfig;
  content: any;
}

const MicrositePreview: React.FC<MicrositePreviewProps> = ({ dealer, content }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Helper to determine if color is light or dark
  const isLightColor = (color: string) => {
    try {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 155;
    } catch (e) {
      return false; // Default to treating as dark if there's an error
    }
  };
  
  // Helper to calculate monthly payment
  const calculatePayment = (amount: number, rate: number, term: number) => {
    try {
      const monthlyRate = rate / 12;
      const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
      return Math.round(payment).toLocaleString();
    } catch (e) {
      return "Error";
    }
  };

  // Helper to determine if a dealer logo is a component reference
  const isLogoComponent = (logo: string | undefined): boolean => {
    return typeof logo === 'string' && logo.startsWith('dealer-logo-');
  };
  
  // Get the industry type from the dealer data
  const getDealerIndustry = (dealer: DealerConfig): string | undefined => {
    if (!dealer) return undefined;
    
    // Try to determine industry from business type or description
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
    <div className="overflow-hidden">
      {/* Browser mockup */}
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center text-xs space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 bg-gray-700 rounded-md px-2 py-1 flex items-center justify-center">
          {dealer.publishedUrl || `go.quickfi.com/${dealer.urlSlug}`}
        </div>
      </div>
      
      {/* Microsite */}
      <div className="bg-white" style={{ height: '70vh', overflowY: 'auto' }}>
        {/* Hero */}
        <div 
          className="relative py-16 px-4 flex flex-col items-center justify-center text-center" 
          style={{ 
            backgroundColor: dealer.brandColor,
            color: isLightColor(dealer.brandColor) ? '#333' : '#fff'
          }}
        >
          <div className="absolute top-4 left-4">
            {dealer.logo && isLogoComponent(dealer.logo) ? (
              <DealerLogo 
                name={dealer.name} 
                brandColor={dealer.brandColor}
                size={48} 
                industry={getDealerIndustry(dealer)}
                className="rounded-lg"
              />
            ) : dealer.logo ? (
              <img 
                src={dealer.logo} 
                alt={dealer.name} 
                className="h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/200x100/0066CC/FFFFFF?text=' + dealer.name.charAt(0);
                }}
              />
            ) : null}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            {content.hero.title.replace('{dealerName}', dealer.name)}
          </h1>
          <p className="text-xl max-w-lg">
            {content.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              className="px-6 py-3 rounded-lg text-lg font-medium"
              style={{ 
                backgroundColor: isLightColor(dealer.brandColor) ? '#333' : '#fff',
                color: isLightColor(dealer.brandColor) ? '#fff' : '#333'
              }}
            >
              {content.cta.primary}
            </button>
            <button 
              className="px-6 py-3 rounded-lg text-lg font-medium border-2"
              style={{ 
                borderColor: isLightColor(dealer.brandColor) ? '#333' : '#fff',
              }}
            >
              {content.cta.secondary}
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="max-w-5xl mx-auto py-12 px-4">
          {/* Info sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {content.sections.map((section: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6">
                <h2 
                  className="text-xl font-bold mb-4"
                  style={{ color: dealer.brandColor }}
                >
                  {section.title}
                </h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pricing table */}
          <div className="mb-16">
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: dealer.brandColor }}
            >
              Equipment Financing Rates
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-3 text-left">Financing Amount</th>
                    {mockPricingData.terms.map(term => (
                      <th key={term} className="border border-gray-200 px-4 py-3 text-center">
                        {term} Months
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockPricingData.examples.map((example, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 px-4 py-3 font-medium">
                        ${example.amount.toLocaleString()}
                      </td>
                      {mockPricingData.terms.map(term => (
                        <td key={term} className="border border-gray-200 px-4 py-3 text-center">
                          ${calculatePayment(example.amount, mockPricingData.rates[term], term)}
                          <div className="text-xs text-gray-500">
                            {(mockPricingData.rates[term] * 100).toFixed(2)}%
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              *Rates are subject to credit approval. The above table shows estimated monthly payments.
            </p>
          </div>
          
          {/* FAQs */}
          <div className="mb-16">
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: dealer.brandColor }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {content.faq.map((faq: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    className="w-full px-6 py-4 text-left font-medium flex justify-between items-center"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    style={{ 
                      backgroundColor: expandedFaq === i ? dealer.brandColor : 'white',
                      color: expandedFaq === i 
                        ? (isLightColor(dealer.brandColor) ? '#333' : '#fff')
                        : '#333'
                    }}
                  >
                    <span>{faq.question}</span>
                    <span>{expandedFaq === i ? '−' : '+'}</span>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-6 py-4 bg-white text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact section */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: dealer.brandColor }}
            >
              Ready to get started?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <a 
                href="#" 
                className="flex flex-col items-center text-center p-4 hover:bg-white rounded-lg transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: dealer.brandColor }}
                >
                  <CreditCard size={20} color={isLightColor(dealer.brandColor) ? '#333' : '#fff'} />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Apply Online</h3>
                <p className="text-sm text-gray-600">Complete our secure online application in minutes</p>
              </a>
              <a 
                href={`tel:${dealer.contact.phone}`} 
                className="flex flex-col items-center text-center p-4 hover:bg-white rounded-lg transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: dealer.brandColor }}
                >
                  <Phone size={20} color={isLightColor(dealer.brandColor) ? '#333' : '#fff'} />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Call Us</h3>
                <p className="text-sm text-gray-600">{dealer.contact.phone}</p>
              </a>
              <a 
                href="#" 
                className="flex flex-col items-center text-center p-4 hover:bg-white rounded-lg transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: dealer.brandColor }}
                >
                  <FileText size={20} color={isLightColor(dealer.brandColor) ? '#333' : '#fff'} />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Download Info</h3>
                <p className="text-sm text-gray-600">Get our equipment financing guide</p>
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About {dealer.name}</h3>
              <p className="text-gray-300 text-sm">
                {dealer.description || `Trusted equipment provider offering quality products and financing solutions for businesses of all sizes.`}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-center">
                  <Building size={16} className="mr-2" />
                  {dealer.contact.address || "123 Business St, New York, NY 10001"}
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  {dealer.contact.phone || "(800) 555-1234"}
                </li>
                <li className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  {dealer.contact.email || "info@example.com"}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">QuickFi Financing</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• 100% digital application</li>
                <li>• Fixed interest rates</li>
                <li>• 24-60 month terms</li>
                <li>• No hidden fees</li>
              </ul>
              <a 
                href="#" 
                className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mt-4 text-sm"
              >
                <span>Learn More</span>
                <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-xs">
            <p>© {new Date().getFullYear()} {dealer.name}. Powered by QuickFi®. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MicrositePreview;