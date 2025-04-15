import { DealerConfig } from '../types';

// Mock dealer data for initial demonstration
export const mockDealers: DealerConfig[] = [
  {
    id: '1',
    name: 'XCMG North America',
    slug: 'xcmg-north-america',
    urlSlug: 'xcmg',
    logo: 'dealer-logo-1',
    contact: {
      email: 'sales@xcmg-na.com',
      phone: '(888) 123-4567',
      address: '123 Construction Way, Charlotte, NC 28208'
    },
    region: 'US',
    brandColor: '#FF6B00',
    languages: ['en'],
    lastUpdated: '2023-10-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Wacker Neuson Canada',
    slug: 'wacker-neuson-canada',
    urlSlug: 'wacker',
    logo: 'dealer-logo-2',
    contact: {
      email: 'info@wackerneuson.ca',
      phone: '(866) 987-6543',
      address: '3330 Equipment Blvd, Toronto, ON M5V 2C6'
    },
    region: 'CA',
    brandColor: '#FFD100',
    languages: ['en', 'fr'],
    published: true,
    publishedUrl: 'go.quickfi.com/wacker',
    lastUpdated: '2023-11-10T09:15:00Z'
  }
];

// Demo dealer for demo mode - a complete, fully prepared dealer ready to showcase
export const demoDealer: DealerConfig = {
  id: 'demo-dealer',
  name: 'Caterpillar Equipment Finance',
  slug: 'caterpillar-equipment-finance',
  urlSlug: 'cat-finance',
  logo: 'dealer-logo-cat',
  contact: {
    email: 'financing@catequipment.com',
    phone: '(800) 455-4567',
    address: '100 NE Adams St, Peoria, IL 61629'
  },
  region: 'US',
  brandColor: '#FFCC00',
  languages: ['en', 'fr', 'es'],
  published: true,
  publishedUrl: 'go.quickfi.com/cat-finance',
  lastUpdated: '2025-05-01T10:30:00Z',
  description: 'Premium construction and mining equipment financing solutions',
  businessType: 'Heavy Equipment Dealer',
  equipmentTypes: ['Construction', 'Mining', 'Forestry', 'Agriculture'],
  healthScore: 92
};

// Additional pre-built dealer examples for easy showcase
export const dealerExamples: DealerConfig[] = [
  {
    id: 'example-1',
    name: 'NextGen Medical Systems',
    slug: 'nextgen-medical-systems',
    urlSlug: 'nextgen-med',
    logo: 'dealer-logo-medical',
    contact: {
      email: 'finance@nextgenmed.com',
      phone: '(888) 222-3333',
      address: '450 Brookline Ave, Boston, MA 02215'
    },
    region: 'US',
    brandColor: '#3949AB',
    languages: ['en'],
    published: true,
    publishedUrl: 'go.quickfi.com/nextgen-med',
    lastUpdated: '2025-04-01T08:30:00Z',
    description: 'Advanced medical imaging and diagnostic equipment financing',
    businessType: 'Healthcare Equipment',
    equipmentTypes: ['MRI', 'CT Scanners', 'Ultrasound', 'X-Ray'],
    healthScore: 94
  },
  {
    id: 'example-2',
    name: 'GreenField Agriculture',
    slug: 'greenfield-agriculture',
    urlSlug: 'greenfield',
    logo: 'dealer-logo-agriculture',
    contact: {
      email: 'loans@greenfieldequipment.com',
      phone: '(877) 123-4567',
      address: '1200 Farm Rd, Des Moines, IA 50309'
    },
    region: 'US',
    brandColor: '#33691E',
    languages: ['en', 'es'],
    published: true,
    publishedUrl: 'go.quickfi.com/greenfield',
    lastUpdated: '2025-03-15T14:15:00Z',
    description: 'Specialized equipment financing for modern farming operations',
    businessType: 'Agricultural Equipment',
    equipmentTypes: ['Tractors', 'Harvesters', 'Irrigation', 'Drones'],
    healthScore: 86
  },
  {
    id: 'example-3',
    name: 'Tech Manufacturing Solutions',
    slug: 'tech-manufacturing-solutions',
    urlSlug: 'techmanufacturing',
    logo: 'dealer-logo-manufacturing',
    contact: {
      email: 'finance@techmanufacturing.com',
      phone: '(866) 987-6543',
      address: '2100 Industrial Blvd, Austin, TX 78744'
    },
    region: 'US',
    brandColor: '#00838F',
    languages: ['en'],
    published: false,
    lastUpdated: '2025-05-02T16:45:00Z',
    description: 'Flexible financing for advanced manufacturing equipment',
    businessType: 'Industrial Equipment',
    equipmentTypes: ['CNC Machines', 'Robotics', '3D Printers', 'Assembly Lines'],
    healthScore: 81
  },
  {
    id: 'example-4',
    name: 'ConstructPro Quebec',
    slug: 'constructpro-quebec',
    urlSlug: 'constructpro-qc',
    logo: 'dealer-logo-construction',
    contact: {
      email: 'info@constructpro.ca',
      phone: '(514) 555-1234',
      address: '3500 Boulevard Crémazie, Montréal, QC H2A 1A1'
    },
    region: 'CA',
    brandColor: '#FFA000',
    languages: ['en', 'fr'],
    published: true,
    publishedUrl: 'go.quickfi.com/constructpro-qc',
    lastUpdated: '2025-04-10T09:30:00Z',
    description: 'Equipment financing for construction professionals in Quebec',
    businessType: 'Construction Equipment',
    equipmentTypes: ['Excavators', 'Loaders', 'Cranes', 'Concrete Equipment'],
    healthScore: 89
  },
  {
    id: 'example-5',
    name: 'LogistiQuip Transport',
    slug: 'logistiquip-transport',
    urlSlug: 'logistiquip',
    logo: 'dealer-logo-transport',
    contact: {
      email: 'financing@logistiquip.com',
      phone: '(800) 789-0123',
      address: '1888 Logistics Way, Memphis, TN 38116'
    },
    region: 'US',
    brandColor: '#1565C0',
    languages: ['en'],
    published: true,
    publishedUrl: 'go.quickfi.com/logistiquip',
    lastUpdated: '2025-02-28T13:20:00Z',
    description: 'Transportation and logistics equipment financing solutions',
    businessType: 'Transportation Equipment',
    equipmentTypes: ['Trucks', 'Trailers', 'Forklifts', 'Warehouse Equipment'],
    healthScore: 84
  }
];

// Mock copy for the microsite
export const mockMicrositeContent = {
  en: {
    hero: {
      title: "Fast Equipment Financing with {dealerName}",
      subtitle: "Get approved in minutes with simple, transparent terms"
    },
    sections: [
      {
        title: "How It Works",
        content: "QuickFi® makes equipment financing simple, transparent, and 100% digital. Apply in minutes, get instant approval, and sign your documents electronically. No paperwork, no hassle."
      },
      {
        title: "Why Choose QuickFi®",
        content: "• 100% digital application and approval\n• No hidden fees or charges\n• Fixed rates from 5.99%\n• Terms from 24-60 months\n• Decisions in minutes, not days"
      },
      {
        title: "Equipment We Finance",
        content: "• Construction Equipment\n• Forklifts & Material Handling\n• Manufacturing Equipment\n• Transportation & Logistics\n• Agriculture & Landscaping"
      }
    ],
    cta: {
      primary: "Apply Now",
      secondary: "Calculate Payment"
    },
    faq: [
      {
        question: "How much can I finance?",
        answer: "QuickFi offers financing from $5,000 to $250,000 for qualified businesses."
      },
      {
        question: "How long does approval take?",
        answer: "Most applicants receive an approval decision within minutes of completing the application."
      },
      {
        question: "What documents do I need?",
        answer: "For transactions under $75,000, you typically only need a completed application. For larger amounts, recent business financial statements may be required."
      }
    ]
  },
  fr: {
    hero: {
      title: "Financement d'équipement rapide avec {dealerName}",
      subtitle: "Obtenez une approbation en quelques minutes avec des conditions simples et transparentes"
    },
    sections: [
      {
        title: "Comment ça fonctionne",
        content: "QuickFi® rend le financement d'équipement simple, transparent et 100% numérique. Faites une demande en quelques minutes, obtenez une approbation instantanée et signez vos documents électroniquement. Pas de paperasse, pas de tracas."
      },
      {
        title: "Pourquoi choisir QuickFi®",
        content: "• Demande et approbation 100% numériques\n• Aucuns frais cachés\n• Taux fixes à partir de 5,99%\n• Durées de 24 à 60 mois\n• Décisions en minutes, pas en jours"
      },
      {
        title: "Équipement que nous finançons",
        content: "• Équipement de construction\n• Chariots élévateurs et manutention\n• Équipement de fabrication\n• Transport et logistique\n• Agriculture et aménagement paysager"
      }
    ],
    cta: {
      primary: "Faire une demande",
      secondary: "Calculer le paiement"
    },
    faq: [
      {
        question: "Combien puis-je financer?",
        answer: "QuickFi offre un financement de 5 000 $ à 250 000 $ pour les entreprises qualifiées."
      },
      {
        question: "Combien de temps dure l'approbation?",
        answer: "La plupart des demandeurs reçoivent une décision d'approbation en quelques minutes après avoir rempli la demande."
      },
      {
        question: "Quels documents dois-je fournir?",
        answer: "Pour les transactions inférieures à 75 000 $, vous n'avez généralement besoin que d'une demande complète. Pour les montants plus importants, des états financiers récents de l'entreprise peuvent être requis."
      }
    ]
  }
};

// Industry-specific content by dealer type
export const industrySpecificContent = {
  'Medical': {
    sections: [
      {
        title: "Medical Equipment Financing",
        content: "Acquire cutting-edge medical technology with flexible financing options designed specifically for healthcare providers. Stay competitive with the latest diagnostic and treatment equipment."
      },
      {
        title: "Equipment We Finance",
        content: "• Diagnostic Imaging (MRI, CT, X-ray)\n• Surgical Equipment\n• Laboratory Equipment\n• Patient Monitoring Systems\n• Telemedicine Technology"
      },
      {
        title: "Benefits for Healthcare Providers",
        content: "• Preserve working capital\n• Keep up with technological advances\n• Potential tax advantages\n• Fixed monthly payments\n• Quick application and approval process"
      }
    ],
    faq: [
      {
        question: "Do you offer financing for specialty medical practices?",
        answer: "Yes, we provide specialized financing solutions for dental, vision care, veterinary, chiropractic, and other specialty healthcare practices."
      },
      {
        question: "Can I finance installation and training costs?",
        answer: "Absolutely. We understand that medical equipment often requires professional installation and staff training, which can be included in your financing package."
      }
    ]
  },
  'Agricultural': {
    sections: [
      {
        title: "Ag Equipment Financing",
        content: "Modern farming requires modern equipment. Our financing solutions help you acquire the machinery you need to maximize productivity while managing seasonal cash flow."
      },
      {
        title: "Equipment We Finance",
        content: "• Tractors & Implements\n• Irrigation Systems\n• Grain Storage & Handling\n• Precision Ag Technology\n• Livestock Equipment"
      },
      {
        title: "Season-Friendly Payment Options",
        content: "• Skip payment options during off-seasons\n• Harvest schedule payment plans\n• Flexible terms for all farm sizes\n• New and used equipment options\n• Quick approval for time-sensitive purchases"
      }
    ],
    faq: [
      {
        question: "Do you offer seasonal payment plans?",
        answer: "Yes, we understand the seasonal nature of farming income and can structure payments to align with your harvest or production cycles."
      },
      {
        question: "Can I finance pre-owned agricultural equipment?",
        answer: "Absolutely. We offer competitive financing options for quality used equipment, helping you maximize your investment."
      }
    ]
  },
  'Construction': {
    sections: [
      {
        title: "Construction Equipment Financing",
        content: "Keep your projects moving with flexible financing solutions designed for construction businesses. From heavy equipment to specialty tools, we've got you covered."
      },
      {
        title: "Equipment We Finance",
        content: "• Excavators & Backhoes\n• Dozers & Graders\n• Concrete Equipment\n• Aerial Lifts & Platforms\n• Specialty Construction Tools"
      },
      {
        title: "Project-Friendly Options",
        content: "• Match payments to project timelines\n• Flexible term lengths\n• Competitive rates for all credit profiles\n• New and used equipment options\n• Quick approval for time-sensitive projects"
      }
    ],
    faq: [
      {
        question: "Can I finance equipment for a specific project duration?",
        answer: "Yes, we offer short-term financing options that can be aligned with specific project timelines, allowing you to acquire equipment for just the period you need it."
      },
      {
        question: "Do you offer financing for equipment attachments and accessories?",
        answer: "Yes, we can finance both stand-alone equipment and any necessary attachments or accessories to ensure you have a complete solution."
      }
    ]
  },
  'Transportation': {
    sections: [
      {
        title: "Transportation Equipment Financing",
        content: "Keep your fleet moving with financing solutions designed for transportation and logistics businesses. From trucks to warehouse equipment, we provide the capital you need to grow."
      },
      {
        title: "Equipment We Finance",
        content: "• Commercial Trucks & Trailers\n• Delivery Vehicles\n• Material Handling Equipment\n• Warehouse Systems\n• Fleet Management Technology"
      },
      {
        title: "Fleet-Friendly Options",
        content: "• TRAC leases and finance leases\n• Flexible term lengths\n• Bundle multiple vehicles\n• New and used equipment options\n• Quick approval for fleet expansions"
      }
    ],
    faq: [
      {
        question: "Do you offer fleet financing packages?",
        answer: "Yes, we specialize in fleet financing solutions that allow you to acquire multiple vehicles under a single agreement with volume-based pricing."
      },
      {
        question: "Can I finance technology upgrades for my existing fleet?",
        answer: "Absolutely. We offer financing for fleet management systems, GPS tracking, telematics, and other technology upgrades to improve your fleet's efficiency."
      }
    ]
  },
  'Renewable': {
    sections: [
      {
        title: "Clean Energy Equipment Financing",
        content: "Accelerate the transition to renewable energy with financing solutions designed specifically for solar, wind, and energy storage projects. Our programs help businesses and contractors acquire the equipment needed for sustainable energy solutions."
      },
      {
        title: "Equipment We Finance",
        content: "• Solar Panel Systems\n• Energy Storage Solutions\n• Inverters & Control Systems\n• Installation Equipment\n• Monitoring Technology"
      },
      {
        title: "Green Energy Advantages",
        content: "• Extended terms up to 84 months\n• Specialized in renewable asset financing\n• Financing that complements available tax incentives\n• Options for contractors and end-users\n• Quick approval for seasonal demand"
      }
    ],
    faq: [
      {
        question: "Can financing be structured to align with energy production and savings?",
        answer: "Yes, we can structure financing to align with projected energy production and utility savings, helping to create cash-flow positive financing from day one."
      },
      {
        question: "Do you finance energy storage systems?",
        answer: "Absolutely. As battery storage becomes increasingly important to renewable energy deployments, we offer specific financing programs for energy storage solutions."
      }
    ]
  }
};

// Mock pricing data
export const mockPricingData = {
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
};

// Industry-specific pricing
export const industryPricingData = {
  'Medical': {
    terms: [24, 36, 48, 60, 84],
    rates: {
      24: 0.0549,
      36: 0.0599,
      48: 0.0649,
      60: 0.0699,
      84: 0.0749
    },
    examples: [
      { amount: 25000, term: 24, payment: 1103 },
      { amount: 75000, term: 36, payment: 2294 },
      { amount: 150000, term: 48, payment: 3498 },
      { amount: 250000, term: 60, payment: 4943 },
      { amount: 500000, term: 84, payment: 8062 }
    ]
  },
  'Agricultural': {
    terms: [24, 36, 48, 60],
    rates: {
      24: 0.0579,
      36: 0.0629,
      48: 0.0679,
      60: 0.0729
    },
    examples: [
      { amount: 15000, term: 24, payment: 662 },
      { amount: 50000, term: 36, payment: 1526 },
      { amount: 100000, term: 48, payment: 2363 },
      { amount: 200000, term: 60, payment: 3975 }
    ]
  },
  'Renewable': {
    terms: [36, 60, 84, 120],
    rates: {
      36: 0.0549,
      60: 0.0599,
      84: 0.0649,
      120: 0.0699
    },
    examples: [
      { amount: 20000, term: 36, payment: 606 },
      { amount: 50000, term: 60, payment: 965 },
      { amount: 100000, term: 84, payment: 1547 },
      { amount: 250000, term: 120, payment: 2896 }
    ]
  }
};

// Mock agent outputs
export const mockAgentOutputs = {
  content: {
    websiteCopy: "Experience hassle-free equipment financing with QuickFi and {dealerName}. Our 100% digital application takes minutes to complete, with instant decisions and competitive fixed rates.",
    emailTemplate: "Subject: Welcome to the {dealerName} QuickFi Financing Program\n\nDear {customerName},\n\nThank you for your interest in financing your equipment purchase through {dealerName}'s QuickFi program. We're excited to offer you a simple, transparent financing solution.\n\nWith QuickFi, you can:\n- Apply 100% online in minutes\n- Get instant decisions\n- Choose terms from 24-60 months\n- Enjoy competitive fixed rates\n\nTo get started, simply visit {dealerURL} or scan the QR code in the attached program guide.\n\nBest regards,\n{dealerName} Team",
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
        answer: "QuickFi offers fixed rates starting from 5.99% depending on your business profile, equipment type, and term length."
      }
    ]
  },
  design: {
    colorPalette: {
      primary: "#FF6B00",
      secondary: "#003366",
      accent: "#FFD100",
      text: "#333333",
      background: "#FFFFFF"
    },
    layoutRecommendation: "Clean, modern layout with prominent dealer branding in the header and QuickFi co-branding in the footer. Use high-quality equipment images in the hero section."
  },
  email: {
    subject: "Your New {dealerName} QuickFi Financing Portal is Live!",
    body: "Dear {dealerName} Team,\n\nWe're excited to announce that your custom QuickFi financing portal is now live at {portalUrl}!\n\nThe portal includes:\n- Your branding and colors\n- Current pricing and terms\n- Customer-friendly application process\n- Marketing materials and resources\n\nPlease review the portal and let us know if you'd like any adjustments.\n\nBest regards,\nThe QuickFi Team"
  }
};

// Industry-specific agent outputs
export const industryAgentOutputs = {
  'Medical': {
    content: {
      websiteCopy: "Financing specialized medical equipment shouldn't slow down your practice. With QuickFi through {dealerName}, healthcare providers can quickly access the latest technology with flexible financing solutions tailored to medical professionals.",
      faqItems: [
        {
          question: "Is financing available for all medical specialties?",
          answer: "Yes, our financing solutions are available for all medical specialties including general practice, dentistry, veterinary, chiropractic, ophthalmology, and more."
        },
        {
          question: "Can we finance both equipment and software?",
          answer: "Absolutely. Modern medical equipment often includes integrated software and technology solutions, which can be included in your financing package."
        }
      ]
    }
  },
  'Agricultural': {
    content: {
      websiteCopy: "Agriculture has its own rhythm. That's why {dealerName} and QuickFi offer equipment financing solutions that align with your seasonal cash flow and production cycles, helping you grow your operation with the right equipment at the right time.",
      faqItems: [
        {
          question: "Do you offer seasonal payment structures?",
          answer: "Yes, we understand the seasonal nature of farming and can structure payments to align with your harvest or production schedule."
        },
        {
          question: "Can I finance irrigation systems or other land improvements?",
          answer: "Yes, we offer financing for a wide range of agricultural improvements including irrigation systems, grain handling equipment, and other permanent installations."
        }
      ]
    }
  },
  'Construction': {
    content: {
      websiteCopy: "Keep your projects moving forward with flexible equipment financing from {dealerName} and QuickFi. Our streamlined application process ensures you get the equipment you need when you need it, with payment plans that align with your project timelines.",
      faqItems: [
        {
          question: "Can I finance equipment for a specific project duration?",
          answer: "Yes, we offer short-term financing options that can be aligned with specific project timelines, allowing you to acquire equipment for just the period you need it."
        },
        {
          question: "How quickly can equipment be available after approval?",
          answer: "Once approved, equipment can typically be available within 1-2 business days, depending on dealer inventory and delivery logistics."
        }
      ]
    }
  }
};