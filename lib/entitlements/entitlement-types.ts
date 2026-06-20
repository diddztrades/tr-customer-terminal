import type { SetupBias, SetupDirection, SetupType, UserTier } from '@/lib/mock-data';

export interface MockServerUser {
  id: string;
  tier: UserTier;
  streakSessions: number;
  unlocks: string[];
}

export interface SafeSetupBase {
  id: string;
  asset: string;
  direction: SetupDirection;
  setupType: SetupType;
  status: 'ACTIVE' | 'HIT' | 'INVALIDATED' | 'CLOSED';
  publicSummary: string;
  thesis: string;
  convictionScore: number;
  locked: boolean;
  upgradeReason?: string;
}

export interface SafeSetupGold extends SafeSetupBase {
  entry?: string;
  stop?: string;
  target?: string;
  partialWhyThisMatters?: string;
  delayMinutes?: number;
  delayedTimestamp?: string;
}

export interface SafeSetupPlatinum extends SafeSetupGold {
  assetClass?: 'EQUITY' | 'CRYPTO' | 'FOREX' | 'COMMODITY' | 'INDEX';
  bias?: SetupBias;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  riskFlag?: 'ELEVATED' | 'NORMAL' | 'LOW' | 'CRITICAL';
  fullWhyThisMatters?: string;
  executionNotes?: string;
  tinoNote?: string;
  realTimeTimestamp?: string;
}

export interface SafeSetupBlack extends SafeSetupPlatinum {
  eliteDeskNote?: string;
  priorityContext?: string;
}

export type SafeSetup = SafeSetupBase | SafeSetupGold | SafeSetupPlatinum | SafeSetupBlack;
