import { AgentOutput, DealerConfig } from '../types';

// Simulated timeouts for agent processing (in ms)
const AGENT_PROCESSING_TIMES = {
  content: { min: 1500, max: 3000 },
  translation: { min: 2000, max: 4000 },
  design: { min: 1000, max: 2500 },
  pricing: { min: 1500, max: 3500 },
  email: { min: 1000, max: 2000 },
  documentation: { min: 2000, max: 3500 },
  link: { min: 800, max: 1500 },
};

// Helper to get random processing time within range
const getProcessingTime = (agentType: string): number => {
  const range = AGENT_PROCESSING_TIMES[agentType as keyof typeof AGENT_PROCESSING_TIMES];
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
};

// Base Agent class to simulate AI agent behavior
export class Agent {
  id: string;
  type: AgentOutput['type'];
  description: string;
  
  constructor(id: string, type: AgentOutput['type'], description: string) {
    this.id = id;
    this.type = type;
    this.description = description;
  }
  
  // Simulate agent processing
  async process(dealer: DealerConfig): Promise<AgentOutput> {
    // Initial state
    const output: AgentOutput = {
      id: this.id,
      type: this.type,
      status: 'processing'
    };
    
    // Simulate processing delay
    const processingTime = getProcessingTime(this.type);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate agent-specific results
        const result = this.generateResult(dealer);
        
        // Randomly simulate errors (10% chance)
        if (Math.random() < 0.1 && this.type !== 'content') {
          output.status = 'error';
          output.error = `Error processing ${this.type}: Service unavailable`;
        } else {
          output.status = 'completed';
          output.result = result;
        }
        
        resolve(output);
      }, processingTime);
    });
  }
  
  // Override in derived classes to generate agent-specific results
  generateResult(dealer: DealerConfig): any {
    return { processed: true };
  }
}

// Specific agent implementations
export class ContentAgent extends Agent {
  constructor() {
    super('content-agent', 'content', 'Generates branded website content and FAQs');
  }
  
  generateResult(dealer: DealerConfig): any {
    return {
      websiteCopy: `Experience hassle-free equipment financing with QuickFi and ${dealer.name}. Our 100% digital application takes minutes to complete, with instant decisions and competitive fixed rates.`,
      faqItems: [
        {
          question: "What is QuickFi?",
          answer: "QuickFi is a 100% digital equipment financing platform that offers simple, transparent financing with fixed rates and terms from 24-60 months."
        },
        {
          question: "How do I apply?",
          answer: "You can apply online at our dedicated portal. The application takes about 3 minutes to complete, and most decisions are provided instantly."
        },
        {
          question: "What rates can I expect?",
          answer: `${dealer.name} offers fixed rates starting from 5.99% depending on your business profile, equipment type, and term length.`
        }
      ]
    };
  }
}

export class TranslationAgent extends Agent {
  constructor() {
    super('translation-agent', 'translation', 'Translates content to French Canadian');
  }
  
  generateResult(dealer: DealerConfig): any {
    // Only simulate translation if French is requested
    if (!dealer.languages.includes('fr')) {
      return { skipped: true, reason: 'French language not selected' };
    }
    
    return {
      translated: true,
      languages: dealer.languages.filter(lang => lang !== 'en'),
      contentSamples: {
        hero: "Financement d'équipement rapide avec " + dealer.name,
        cta: "Faire une demande",
        faq: [
          {
            question: "Qu'est-ce que QuickFi?",
            answer: "QuickFi est une plateforme de financement d'équipement 100% numérique qui offre un financement simple et transparent avec des taux fixes et des durées de 24 à 60 mois."
          }
        ]
      }
    };
  }
}

export class DesignAgent extends Agent {
  constructor() {
    super('design-agent', 'design', 'Applying brand colors and styles');
  }
  
  generateResult(dealer: DealerConfig): any {
    // Generate a color palette based on the brand color
    const brandColor = dealer.brandColor || '#0066CC';
    
    // Simple algorithm to generate complementary colors
    const lightenColor = (color: string, percent: number): string => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return '#' + (
        0x1000000 + 
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      ).toString(16).slice(1);
    };
    
    return {
      colorPalette: {
        primary: brandColor,
        secondary: lightenColor(brandColor, -30),
        accent: lightenColor(brandColor, 30),
        text: '#333333',
        background: '#FFFFFF'
      },
      typography: {
        headingFont: 'Inter, sans-serif',
        bodyFont: 'Inter, sans-serif',
        primarySize: '16px'
      },
      layoutRecommendation: `Clean, modern layout with prominent ${dealer.name} branding in the header and QuickFi co-branding in the footer.`
    };
  }
}

export class PricingAgent extends Agent {
  constructor() {
    super('pricing-agent', 'pricing', 'Formatting pricing information');
  }
  
  generateResult(dealer: DealerConfig): any {
    // Simulate pricing data extraction
    return {
      processed: true,
      pricingTable: {
        terms: [24, 36, 48, 60],
        rates: {
          24: 0.0599,
          36: 0.0649,
          48: 0.0699,
          60: 0.0749
        },
        examples: [
          { amount: 10000, term: 24, payment: 442 },
          { amount: 25000, term: 36, payment: 765 },
          { amount: 50000, term: 48, payment: 1184 },
          { amount: 100000, term: 60, payment: 1995 }
        ]
      }
    };
  }
}

export class EmailAgent extends Agent {
  constructor() {
    super('email-agent', 'email', 'Creating dealer onboarding email');
  }
  
  generateResult(dealer: DealerConfig): any {
    return {
      subject: `Your New ${dealer.name} QuickFi Financing Portal is Live!`,
      body: `Dear ${dealer.name} Team,

We're excited to announce that your custom QuickFi financing portal is now live at ${dealer.publishedUrl || `go.quickfi.com/${dealer.urlSlug}`}!

The portal includes:
- Your branding and colors
- Current pricing and terms
- Customer-friendly application process
- Marketing materials and resources

We've attached a one-page program guide that you can share with your sales team. The guide includes a QR code that links directly to your financing portal.

Please review the portal and let us know if you'd like any adjustments.

Best regards,
The QuickFi Team`
    };
  }
}

export class DocumentationAgent extends Agent {
  constructor() {
    super('documentation-agent', 'documentation', 'Generating program PDF');
  }
  
  generateResult(dealer: DealerConfig): any {
    return {
      documentType: 'Program Summary',
      fileName: `${dealer.name.replace(/\s+/g, '-').toLowerCase()}-quickfi-program.pdf`,
      pageCount: 1,
      sections: [
        'Program Highlights',
        'How It Works',
        'Equipment Types',
        'Contact Information',
        'QR Code'
      ],
      generated: true
    };
  }
}

export class LinkAgent extends Agent {
  constructor() {
    super('link-agent', 'link', 'Creating branded shortlink');
  }
  
  generateResult(dealer: DealerConfig): any {
    const urlSlug = dealer.urlSlug || dealer.name.toLowerCase().replace(/\s+/g, '-');
    
    return {
      shortlink: `go.quickfi.com/${urlSlug}`,
      analytics: {
        enabled: true,
        trackClicks: true,
        trackSource: true
      },
      metadata: {
        dealerName: dealer.name,
        region: dealer.region,
        created: new Date().toISOString()
      }
    };
  }
}

// Create an agent registry to manage all agents
export class AgentRegistry {
  private agents: Map<string, Agent>;
  
  constructor() {
    this.agents = new Map();
    
    // Register all agents
    const allAgents = [
      new ContentAgent(),
      new TranslationAgent(),
      new DesignAgent(),
      new PricingAgent(),
      new EmailAgent(),
      new DocumentationAgent(),
      new LinkAgent()
    ];
    
    allAgents.forEach(agent => {
      this.agents.set(agent.id, agent);
    });
  }
  
  // Get agent by ID
  getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }
  
  // Get agent by type
  getAgentByType(type: AgentOutput['type']): Agent | undefined {
    return Array.from(this.agents.values()).find(agent => agent.type === type);
  }
  
  // Get all agents
  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }
  
  // Process a dealer with all agents
  async processDealer(dealer: DealerConfig): Promise<AgentOutput[]> {
    const agents = this.getAllAgents();
    const results: AgentOutput[] = [];
    
    // Process agents in sequence
    for (const agent of agents) {
      // Skip translation agent if French is not selected
      if (agent.type === 'translation' && !dealer.languages.includes('fr')) {
        results.push({
          id: agent.id,
          type: agent.type,
          status: 'completed',
          result: { skipped: true, reason: 'French language not selected' }
        });
        continue;
      }
      
      // Process the agent
      const output = await agent.process(dealer);
      results.push(output);
    }
    
    return results;
  }
}

// Singleton instance of the agent registry
export const agentRegistry = new AgentRegistry();