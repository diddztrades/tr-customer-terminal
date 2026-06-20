import type { Alert, Briefing, SetupBias, SetupDirection, SetupType, UserTier } from '@/lib/mock-data';

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

export interface SafeBriefingBase {
  id: string;
  title: string;
  type: Briefing['type'];
  summary: string;
  marketState: string;
  threatHeadline: string;
  publicNarrative: string;
  timestamp: string;
  locked: boolean;
  upgradeReason?: string;
}

export interface SafeBriefingGold extends SafeBriefingBase {
  delayedSummary?: string;
  partialAnalysis?: string;
  partialContext?: string;
  delayMinutes?: number;
  delayedTimestamp?: string;
}

export interface SafeBriefingPlatinum extends SafeBriefingGold {
  fullContent?: string;
  tinoNotes?: string;
  executionFocus?: string;
  premiumAnalysis?: string;
}

export interface SafeBriefingBlack extends SafeBriefingPlatinum {
  eliteCommentary?: string;
  priorityContext?: string;
}

export type SafeBriefing = SafeBriefingBase | SafeBriefingGold | SafeBriefingPlatinum | SafeBriefingBlack;

export interface SafeAlertBase {
  id: string;
  headline: string;
  asset: string;
  alertType: Alert['type'];
  timestamp: string;
  read: boolean;
  priority: Alert['priority'];
  locked: boolean;
  upgradeReason?: string;
}

export interface SafeAlertGold extends SafeAlertBase {
  delayedHeadline?: string;
  partialAnalysis?: string;
  partialContext?: string;
  delayMinutes?: number;
  delayedTimestamp?: string;
}

export interface SafeAlertPlatinum extends SafeAlertGold {
  fullMessage?: string;
  executionDetails?: string;
  realTimeContext?: string;
  premiumCommentary?: string;
}

export interface SafeAlertBlack extends SafeAlertPlatinum {
  eliteCommentary?: string;
  priorityContext?: string;
}

export type SafeAlert = SafeAlertBase | SafeAlertGold | SafeAlertPlatinum | SafeAlertBlack;
