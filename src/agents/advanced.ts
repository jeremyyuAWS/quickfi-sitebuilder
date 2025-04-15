import { Agent } from './index';
import { DealerConfig, HealthScoreData, ComplianceResult, SeoRecommendation } from '../types';

// Dealer Health Scoring Agent
export class HealthScoringAgent extends Agent {
  constructor() {
    super('health-scoring-agent', 'health', 'Evaluates dealer performance metrics');
  }
  
  generateResult(dealer: DealerConfig): HealthScoreData {
    // Simulate health score calculation based on dealer attributes
    const baseScore = Math.floor(Math.random() * 30) + 70; // 70-99 range
    
    // Generate metrics
    const metrics = [
      {
        name: 'Loan Volume',
        value: Math.floor(Math.random() * 1000000),
        weight: 0.3,
        score: Math.floor(Math.random() * 100)
      },
      {
        name: 'Approval Rate',
        value: Math.floor(Math.random() * 30) + 70, // 70-99% range
        weight: 0.2,
        score: Math.floor(Math.random() * 100)
      },
      {
        name: 'Default Rate',
        value: Math.random() * 5, // 0-5% range
        weight: 0.3,
        score: Math.floor(Math.random() * 100)
      },
      {
        name: 'Customer Satisfaction',
        value: Math.floor(Math.random() * 2) + 3, // 3-5 range
        weight: 0.2,
        score: Math.floor(Math.random() * 100)
      }
    ];
    
    // Generate recommendations based on score
    const recommendations = [];
    
    if (baseScore < 80) {
      recommendations.push('Focus on improving approval rates by offering better terms to qualified customers');
      recommendations.push('Implement a customer follow-up program to reduce defaults');
    } else if (baseScore < 90) {
      recommendations.push('Consider expanding marketing efforts to attract higher quality applicants');
      recommendations.push('Offer special promotions to increase loan volume');
    } else {
      recommendations.push('Maintain excellent performance with targeted marketing campaigns');
      recommendations.push('Consider expanding into new equipment categories');
    }
    
    return {
      score: baseScore,
      metrics,
      recommendations
    };
  }
}

// Compliance Review Agent
export class ComplianceReviewAgent extends Agent {
  constructor() {
    super('compliance-agent', 'compliance', 'Checks content for regulatory compliance');
  }
  
  generateResult(dealer: DealerConfig): ComplianceResult {
    // Determine compliance status based on region
    const isUS = dealer.region === 'US';
    const isCanada = dealer.region === 'CA';
    const isFrance = dealer.region === 'FR';
    
    // Simulate different compliance requirements by region
    const requiredDisclosures = [];
    
    if (isUS) {
      requiredDisclosures.push('APR Disclosure');
      requiredDisclosures.push('Equal Opportunity Lender Statement');
      requiredDisclosures.push('Terms and Conditions Link');
    }
    
    if (isCanada) {
      requiredDisclosures.push('Annual Percentage Rate (APR)');
      requiredDisclosures.push('Cost of Borrowing Disclosure');
      
      if (dealer.languages.includes('fr')) {
        requiredDisclosures.push('French Language Requirements (Quebec)');
      }
    }
    
    if (isFrance) {
      requiredDisclosures.push('GDPR Compliance Notice');
      requiredDisclosures.push('Cookie Consent Banner');
      requiredDisclosures.push('Right to Be Forgotten Statement');
    }
    
    // Simulate compliance issues
    const severity = Math.random();
    const issues = [];
    
    if (severity > 0.7) {
      // High severity issues
      issues.push({
        severity: 'high' as const,
        description: 'Missing required rate disclosure',
        recommendation: 'Add APR disclosure to pricing section'
      });
    } else if (severity > 0.4) {
      // Medium severity issues
      issues.push({
        severity: 'medium' as const,
        description: 'Privacy policy link not prominently displayed',
        recommendation: 'Add privacy policy link to footer and contact form'
      });
    } else {
      // Low severity issues
      issues.push({
        severity: 'low' as const,
        description: 'Font size for disclaimers may be too small',
        recommendation: 'Increase font size of disclaimer text to improve readability'
      });
    }
    
    return {
      status: severity > 0.7 ? 'violation' : severity > 0.4 ? 'warning' : 'compliant',
      issues,
      requiredDisclosures
    };
  }
}

// SEO Optimization Agent
export class SeoOptimizationAgent extends Agent {
  constructor() {
    super('seo-agent', 'seo', 'Optimizes content for search engines');
  }
  
  generateResult(dealer: DealerConfig): SeoRecommendation {
    // Generate local keywords based on dealer region
    const localTerms = dealer.region === 'US' 
      ? ['US', 'United States', 'American'] 
      : dealer.region === 'CA' 
      ? ['Canada', 'Canadian', 'Ontario', 'Quebec'] 
      : ['France', 'French', 'European'];
    
    // Generate equipment keywords
    const equipmentTerms = ['construction equipment', 'heavy machinery', 'industrial equipment', 'forklifts', 'loaders', 'excavators'];
    
    // Generate financing keywords
    const financingTerms = ['equipment financing', 'heavy equipment loans', 'machinery leasing', 'construction financing'];
    
    // Generate combined keywords
    const keywords = [
      ...localTerms.flatMap(local => 
        financingTerms.map(term => `${local} ${term}`)
      ),
      ...equipmentTerms.flatMap(equipment => 
        financingTerms.map(term => `${equipment} ${term}`)
      ),
      `${dealer.name} financing`,
      `${dealer.name} equipment loans`
    ];
    
    return {
      title: `${dealer.name} Equipment Financing | Fast & Easy Approvals`,
      description: `Get instant financing for your equipment purchase through ${dealer.name}. 100% digital application, quick approvals, and competitive rates. Apply online now!`,
      keywords: keywords.slice(0, 10), // Top 10 keywords
      localRecommendations: [
        `Add "${dealer.region === 'US' ? 'zip code' : 'postal code'}" targeting to reach customers in your service area`,
        'Create location-specific landing pages for major service regions',
        `Include local business schema markup for ${dealer.name}`
      ],
      contentSuggestions: [
        'Add customer testimonials with location information',
        'Create an FAQ section addressing region-specific financing questions',
        'Include a blog with articles about equipment financing in your region',
        'Add schema markup for financing offers and equipment types'
      ]
    };
  }
}