export interface DealerConfig {
  id: string;
  name: string;
  slug: string;
  urlSlug: string;
  logo: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  region: 'US' | 'CA' | 'FR';
  brandColor: string;
  languages: ('en' | 'fr' | 'es')[];
  pricingFile?: string;
  published?: boolean;
  publishedUrl?: string;
  lastUpdated: string;
  description?: string;
  businessType?: string;
  equipmentTypes?: string[];
  healthScore?: number;
}

export interface AgentOutput {
  id: string;
  type: 'content' | 'translation' | 'design' | 'pricing' | 'email' | 'documentation' | 'link' | 'health' | 'recommendation' | 'compliance' | 'seo';
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: any;
  error?: string;
}

export interface MicrositeContent {
  hero: {
    title: string;
    subtitle: string;
  };
  sections: {
    title: string;
    content: string;
  }[];
  cta: {
    primary: string;
    secondary: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

export interface PricingData {
  terms: number[];
  rates: Record<number, number>;
  examples: {
    amount: number;
    term: number;
    payment: number;
  }[];
}

export interface HealthScoreData {
  score: number;
  metrics: {
    name: string;
    value: number;
    weight: number;
    score: number;
  }[];
  recommendations: string[];
}

export interface ComplianceResult {
  status: 'compliant' | 'warning' | 'violation';
  issues: {
    severity: 'low' | 'medium' | 'high';
    description: string;
    recommendation: string;
  }[];
  requiredDisclosures: string[];
}

export interface SeoRecommendation {
  title: string;
  description: string;
  keywords: string[];
  localRecommendations: string[];
  contentSuggestions: string[];
}

export interface DocGenerationResult {
  documentType: string;
  fileName: string;
  pageCount: number;
  sections: string[];
  generated: boolean;
}

export interface EmailTemplate {
  subject: string;
  body: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

export interface DealerAnalyticsType {
  visitors: number;
  applications: number;
  conversionRate: number;
  averageTime: number;
  leadScore: number;
  bySource: Record<string, number>;
}