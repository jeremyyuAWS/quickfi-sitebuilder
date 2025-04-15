import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, CheckCircle, ShieldAlert, XCircle, 
  ScrollText, Globe, FileCheck, EyeOff, Filter, Search,
  Download, ClipboardCheck, Info, ExternalLink
} from 'lucide-react';
import { DealerConfig, ComplianceResult } from '../types';
import { ComplianceReviewAgent } from '../agents/advanced';

interface ComplianceCheckingToolsProps {
  dealer: DealerConfig;
  onScanComplete?: (result: ComplianceResult) => void;
}

const ComplianceCheckingTools: React.FC<ComplianceCheckingToolsProps> = ({ dealer, onScanComplete }) => {
  const [scanResults, setScanResults] = useState<ComplianceResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'financing' | 'regional' | 'accessibility' | 'language'>('financing');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (dealer) {
      runComplianceScan();
    }
  }, [dealer]);

  const runComplianceScan = async () => {
    setScanning(true);
    
    try {
      // Use the ComplianceReviewAgent to get results
      const agent = new ComplianceReviewAgent();
      const results = agent.generateResult(dealer);
      
      // Simulate API delay
      setTimeout(() => {
        setScanResults(results);
        setScanning(false);
        
        if (onScanComplete) {
          onScanComplete(results);
        }
      }, 1500);
    } catch (error) {
      console.error('Error during compliance scan:', error);
      setScanning(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="text-green-500" />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />;
      case 'violation':
        return <XCircle className="text-red-500" />;
      default:
        return <Info className="text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Filter issues based on severity and search term
  const filteredIssues = scanResults?.issues.filter(issue => {
    // Filter by severity
    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !issue.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !issue.recommendation.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  }) || [];

  const regionName = {
    'US': 'United States',
    'CA': 'Canada',
    'FR': 'France'
  }[dealer.region] || dealer.region;

  // Additional mock data for different tabs
  const financingDisclosures = [
    { id: 1, name: 'APR Disclosure', required: true, present: true, compliant: true },
    { id: 2, name: 'Term Length Disclosure', required: true, present: true, compliant: true },
    { id: 3, name: 'Payment Schedule', required: true, present: false, compliant: false },
    { id: 4, name: 'Fees and Charges', required: true, present: true, compliant: false },
    { id: 5, name: 'Early Termination Clause', required: true, present: true, compliant: true },
    { id: 6, name: 'Credit Application Process', required: false, present: true, compliant: true },
  ];

  const accessibilityIssues = [
    { 
      id: 1, 
      element: 'Application Form', 
      issue: 'Missing form labels for screen readers', 
      guideline: 'WCAG 2.1 - 1.3.1 Info and Relationships', 
      severity: 'high' 
    },
    { 
      id: 2, 
      element: 'Equipment Images', 
      issue: 'Missing alt text on 4 equipment images', 
      guideline: 'WCAG 2.1 - 1.1.1 Non-text Content', 
      severity: 'high' 
    },
    { 
      id: 3, 
      element: 'Pricing Table', 
      issue: 'Insufficient color contrast on table headers', 
      guideline: 'WCAG 2.1 - 1.4.3 Contrast (Minimum)', 
      severity: 'medium' 
    },
    { 
      id: 4, 
      element: 'Call-to-Action Buttons', 
      issue: 'Element has insufficient target size', 
      guideline: 'WCAG 2.1 - 2.5.5 Target Size', 
      severity: 'medium' 
    },
  ];

  const languageIssues = [
    { 
      id: 1, 
      phrase: 'Guaranteed approval', 
      risk: 'Making promises that all applications will be approved is misleading', 
      suggestion: 'Replace with "Quick approval decisions"', 
      severity: 'high' 
    },
    { 
      id: 2, 
      phrase: 'No credit check required', 
      risk: 'Misleading if any credit evaluation is performed', 
      suggestion: 'Replace with "Flexible credit requirements" or specify actual credit process', 
      severity: 'high' 
    },
    { 
      id: 3, 
      phrase: 'Interest-free financing', 
      risk: 'Unless truly 0% APR, this can be misleading', 
      suggestion: 'Specify exact terms: "0% APR for 12 months"', 
      severity: 'medium' 
    },
    { 
      id: 4, 
      phrase: 'Low monthly payments', 
      risk: 'Subjective claim without specifics', 
      suggestion: 'Provide actual payment examples with terms', 
      severity: 'low' 
    },
  ];

  const regionalRequirements = [
    {
      region: 'US',
      requirements: [
        'Truth in Lending Act (TILA) Disclosures',
        'Equal Credit Opportunity Act Notice',
        'Fair Credit Reporting Act Disclosure',
        'State-specific disclosures where applicable'
      ]
    },
    {
      region: 'CA',
      requirements: [
        'Cost of Borrowing Disclosure',
        'Annual Percentage Rate (APR)',
        'Personal Information Protection Statement',
        'Provincial consumer protection requirements'
      ]
    },
    {
      region: 'Quebec (CA)',
      requirements: [
        'French Language Requirements (Charter of the French Language)',
        'Consumer Protection Act Disclosures',
        'Specific cooling-off period disclosures',
        'Quebec-specific transparency requirements'
      ]
    }
  ];

  // Get regional requirements based on dealer location
  const currentRegionalRequirements = regionalRequirements.find(r => 
    r.region === dealer.region || 
    (dealer.region === 'CA' && dealer.languages.includes('fr') && r.region === 'Quebec (CA)')
  ) || regionalRequirements[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-blue-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <ShieldAlert className="mr-2" />
            Compliance Checker
          </h2>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-white/80 flex items-center">
              <Globe className="mr-1" size={16} />
              Region: {regionName}
            </div>
            {dealer.languages.includes('fr') && (
              <div className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded text-xs font-medium">
                French Requirements
              </div>
            )}
          </div>
        </div>
        <p className="text-blue-100 mt-1">
          Verify compliance across financing regulations, regional requirements, and accessibility standards
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('financing')}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === 'financing' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ScrollText size={16} className="mr-2" />
            Financing Disclosures
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === 'regional' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Globe size={16} className="mr-2" />
            Regional Compliance
          </button>
          <button
            onClick={() => setActiveTab('accessibility')}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === 'accessibility' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <EyeOff size={16} className="mr-2" />
            Accessibility (WCAG)
          </button>
          <button
            onClick={() => setActiveTab('language')}
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === 'language' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertTriangle size={16} className="mr-2" />
            Risky Language
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {/* Filters */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
            {scanResults ? (
              <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                scanResults.status === 'compliant' 
                  ? 'bg-green-100 text-green-800' 
                  : scanResults.status === 'warning'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {getStatusIcon(scanResults.status)}
                <span className="ml-1 capitalize">{scanResults.status}</span>
              </div>
            ) : (
              <div className="flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {scanning ? 'Scanning...' : 'Not scanned'}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {(activeTab === 'accessibility' || activeTab === 'language') && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {(activeTab === 'accessibility' || activeTab === 'language') && (
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value as any)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="high">High Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="low">Low Severity</option>
              </select>
            )}

            <button
              onClick={runComplianceScan}
              disabled={scanning}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                scanning 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {scanning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <FileCheck size={16} className="mr-2" />
                  Run Compliance Check
                </>
              )}
            </button>

            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 flex items-center hover:bg-gray-50"
            >
              <Download size={16} className="mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Financing Disclosures Tab */}
        {activeTab === 'financing' && (
          <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Financing Disclosure Requirements</h3>
              
              <div className="flex space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-600">Compliant</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-600">Non-Compliant</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                  <span className="text-xs text-gray-600">Not Required</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Disclosure Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Required
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Present
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {financingDisclosures.map((disclosure) => (
                    <tr key={disclosure.id} className={disclosure.required && !disclosure.compliant ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {disclosure.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {disclosure.required ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Required</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Optional</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {disclosure.present ? (
                          <CheckCircle className="text-green-500" size={18} />
                        ) : (
                          <XCircle className="text-red-500" size={18} />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {disclosure.required ? (
                          disclosure.compliant ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Compliant</span>
                          ) : (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Non-Compliant</span>
                          )
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {disclosure.required && !disclosure.compliant ? (
                          <button className="text-blue-600 hover:text-blue-800">
                            Fix Issue
                          </button>
                        ) : (
                          <button className="text-gray-400 cursor-not-allowed">
                            Fix Issue
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Why this matters</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Proper financing disclosures are required by regulations such as the Truth in Lending Act (TILA) and similar regional requirements. 
                    Non-compliance can result in regulatory penalties and customer disputes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regional Compliance Tab */}
        {activeTab === 'regional' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Regional Compliance for {regionName}
              </h3>
              <p className="text-gray-600">
                Required disclosures and regulatory requirements specific to {regionName}
                {dealer.languages.includes('fr') && dealer.region === 'CA' && ' with French Canadian requirements'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <FileCheck className="mr-2 text-blue-600" size={18} />
                  Required Disclosures
                </h4>
                
                <ul className="space-y-3">
                  {currentRegionalRequirements.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                        <CheckCircle className="text-blue-600" size={14} />
                      </div>
                      <span className="text-sm text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-blue-600 text-sm flex items-center hover:text-blue-800">
                    <Download size={14} className="mr-1" />
                    Download Compliance Template
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h4 className="font-medium text-gray-800 mb-3">Compliance Status</h4>
                
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <AlertTriangle className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-yellow-800">Attention Required</h5>
                      <p className="text-sm text-yellow-700 mt-1">
                        {dealer.region === 'CA' && dealer.languages.includes('fr') 
                          ? 'Your site requires full French translation under Quebec language laws'
                          : dealer.region === 'US'
                          ? 'State-specific disclosures may be required based on dealer location'
                          : 'Additional regional requirements may apply'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {scanResults?.requiredDisclosures.map((disclosure, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-800">{disclosure}</span>
                      {index % 3 === 0 ? (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">Missing</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">Present</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start">
                <ClipboardCheck className="text-blue-600 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-medium text-blue-800">Regional Compliance Requirements</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Different regions have specific regulatory requirements for financing disclosures. 
                    Ensure your microsite complies with all requirements for {regionName}.
                    {dealer.languages.includes('fr') && dealer.region === 'CA' && ' Quebec has specific French language requirements that must be followed.'}
                  </p>
                  
                  <div className="mt-2">
                    <a 
                      href="#" 
                      className="text-blue-700 text-sm hover:underline flex items-center"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      View detailed regulatory guidelines
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accessibility Tab */}
        {activeTab === 'accessibility' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                WCAG Accessibility Compliance
              </h3>
              <p className="text-gray-600">
                Web Content Accessibility Guidelines (WCAG) 2.1 compliance scan results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">{accessibilityIssues.length}</div>
                <div className="text-sm text-gray-500">Total Issues</div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {accessibilityIssues.filter(i => i.severity === 'high').length}
                </div>
                <div className="text-sm text-gray-500">High Severity</div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  {accessibilityIssues.filter(i => i.severity === 'medium').length}
                </div>
                <div className="text-sm text-gray-500">Medium Severity</div>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {accessibilityIssues.filter(i => i.severity === 'low').length}
                </div>
                <div className="text-sm text-gray-500">Low Severity</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 font-medium text-gray-700">
                Accessibility Issues
              </div>
              
              <div className="divide-y divide-gray-200">
                {accessibilityIssues
                  .filter(issue => {
                    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) {
                      return false;
                    }
                    if (searchTerm && !issue.issue.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        !issue.element.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return false;
                    }
                    return true;
                  })
                  .map((issue) => (
                    <div key={issue.id} className="px-6 py-4">
                      <div className="flex items-start">
                        <div className={`p-1 rounded-full mr-3 flex-shrink-0 ${
                          issue.severity === 'high' 
                            ? 'bg-red-100 text-red-600' 
                            : issue.severity === 'medium'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          <AlertTriangle size={16} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium text-gray-800">{issue.element}</h5>
                              <p className="text-sm text-gray-600 mt-1">{issue.issue}</p>
                            </div>
                            
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              issue.severity === 'high' 
                                ? 'bg-red-100 text-red-800' 
                                : issue.severity === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                            </span>
                          </div>
                          
                          <div className="mt-3 text-xs text-gray-500 flex items-center">
                            <span className="mr-3">Guideline: {issue.guideline}</span>
                          </div>
                          
                          <div className="mt-3 flex space-x-3">
                            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                              Fix Issue
                            </button>
                            <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                
                {accessibilityIssues
                  .filter(issue => {
                    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) {
                      return false;
                    }
                    if (searchTerm && !issue.issue.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        !issue.element.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return false;
                    }
                    return true;
                  }).length === 0 && (
                  <div className="px-6 py-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                      <EyeOff className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-gray-500 font-medium mb-1">No issues found</h3>
                    <p className="text-sm text-gray-400">
                      {searchTerm || filterSeverity !== 'all' 
                        ? 'Try changing your search or filters' 
                        : 'No accessibility issues detected'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Why Accessibility Matters</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Ensuring your dealer microsite is accessible helps you reach all potential customers, regardless of disability. 
                    It also helps protect against ADA (Americans with Disabilities Act) related legal claims.
                  </p>
                  <div className="mt-2">
                    <a 
                      href="https://www.w3.org/WAI/standards-guidelines/wcag/" 
                      className="text-blue-700 text-sm hover:underline flex items-center"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Learn more about WCAG guidelines
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risky Language Tab */}
        {activeTab === 'language' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Risky Language Analysis
              </h3>
              <p className="text-gray-600">
                Identification of potentially misleading or non-compliant language in your dealer microsite
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 font-medium text-gray-700 flex justify-between items-center">
                <span>Flagged Language</span>
                <span className="text-sm font-normal text-gray-500">
                  {languageIssues.filter(issue => {
                    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) {
                      return false;
                    }
                    if (searchTerm && !issue.phrase.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        !issue.risk.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return false;
                    }
                    return true;
                  }).length} issues found
                </span>
              </div>
              
              <div className="divide-y divide-gray-200">
                {languageIssues
                  .filter(issue => {
                    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) {
                      return false;
                    }
                    if (searchTerm && !issue.phrase.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        !issue.risk.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return false;
                    }
                    return true;
                  })
                  .map((issue) => (
                    <div key={issue.id} className="px-6 py-4">
                      <div className="flex items-start">
                        <div className={`p-1 rounded-full mr-3 flex-shrink-0 ${
                          issue.severity === 'high' 
                            ? 'bg-red-100 text-red-600' 
                            : issue.severity === 'medium'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          <AlertTriangle size={16} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium text-gray-800">"{issue.phrase}"</h5>
                              <p className="text-sm text-gray-600 mt-1">{issue.risk}</p>
                            </div>
                            
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              issue.severity === 'high' 
                                ? 'bg-red-100 text-red-800' 
                                : issue.severity === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                            </span>
                          </div>
                          
                          <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-lg">
                            <div className="text-xs font-medium text-green-800 mb-1">Suggested Alternative:</div>
                            <div className="text-sm text-green-700">{issue.suggestion}</div>
                          </div>
                          
                          <div className="mt-3 flex space-x-3">
                            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                              Replace Text
                            </button>
                            <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                              Ignore
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                
                {languageIssues
                  .filter(issue => {
                    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) {
                      return false;
                    }
                    if (searchTerm && !issue.phrase.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        !issue.risk.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return false;
                    }
                    return true;
                  }).length === 0 && (
                  <div className="px-6 py-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                      <CheckCircle className="text-gray-400" size={24} />
                    </div>
                    <h3 className="text-gray-500 font-medium mb-1">No risky language found</h3>
                    <p className="text-sm text-gray-400">
                      {searchTerm || filterSeverity !== 'all' 
                        ? 'Try changing your search or filters' 
                        : 'Your content appears to be compliant'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800">Why Language Matters</h4>
                  <p className="text-sm text-yellow-600 mt-1">
                    Using misleading or non-compliant language in financing offers can lead to regulatory issues and customer complaints. 
                    Ensure all claims about financing terms are accurate and transparent.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-start">
                      <div className="text-yellow-600 mr-1">•</div>
                      <span className="text-xs text-yellow-700">Avoid absolute guarantees like "guaranteed approval"</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-yellow-600 mr-1">•</div>
                      <span className="text-xs text-yellow-700">Always specify terms and conditions for promotional rates</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-yellow-600 mr-1">•</div>
                      <span className="text-xs text-yellow-700">Be specific about credit requirements</span>
                    </div>
                    <div className="flex items-start">
                      <div className="text-yellow-600 mr-1">•</div>
                      <span className="text-xs text-yellow-700">Include clear examples for payment claims</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Last scan: {new Date().toLocaleString()}</span>
          </div>
          
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 flex items-center hover:bg-gray-50">
              <Download size={16} className="mr-2" />
              Export Full Report
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center hover:bg-blue-700">
              <ClipboardCheck size={16} className="mr-2" />
              Fix All Issues
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCheckingTools;