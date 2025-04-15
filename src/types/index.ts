export type ConversationStep = 
  | 'welcome'
  | 'basicInfo'
  | 'financing'
  | 'equipment'
  | 'branding'
  | 'review';

export interface FinancingTier {
  rates: number[];
  terms: number[];
}

export interface NewEquipmentFinancing {
  tier1: FinancingTier;
  tier2: FinancingTier;
  tier3: FinancingTier;
}

export interface UsedEquipmentFinancing {
  rate: number;
  terms: number[];
  minAmount: number;
  maxAmount: number;
}

export interface FinancingOptions {
  newEquipment: NewEquipmentFinancing;
  usedEquipment: UsedEquipmentFinancing;
}

export interface DealerInfo {
  name: string;
  specialization: string;
  location: string;
  brandColor: string;
  secondaryColor: string;
  financingOptions: FinancingOptions;
  equipmentModels?: string[];
  logo?: string;
  showcaseImages?: string[];
} 