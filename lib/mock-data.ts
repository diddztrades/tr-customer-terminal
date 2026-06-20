export type UserTier = 'bronze' | 'gold' | 'platinum' | 'black';

export interface User {
  id: string;
  name: string;
  tier: UserTier;
  joinedAt: Date;
  alertPreferences: {
    pushEnabled: boolean;
    emailEnabled: boolean;
    types: string[];
  };
  academyProgress: {
    completedLessons: string[];
    currentTrack: string;
  };
}

export type SetupDirection = 'LONG' | 'SHORT';
export type SetupType = 'BREAKOUT' | 'REVERSAL' | 'PULLBACK' | 'RANGE' | 'STRUCTURAL';
export type SetupBias = 'BULLISH' | 'BEARISH' | 'NEUTRAL' | 'CONFLICTED';
export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type RiskFlag = 'ELEVATED' | 'NORMAL' | 'LOW' | 'CRITICAL';

export interface Setup {
  id: string;
  asset: string;
  assetClass: 'EQUITY' | 'CRYPTO' | 'FOREX' | 'COMMODITY' | 'INDEX';
  direction: SetupDirection;
  setupType: SetupType;
  bias: SetupBias;
  entry: string;
  invalidation: string;
  target: string;
  confidence: ConfidenceLevel;
  riskFlag: RiskFlag;
  tierRequired: UserTier;
  delayMinutes: number;
  issuedAt: Date;
  tinoNote: string;
  whyItMatters: string;
  status: 'ACTIVE' | 'HIT' | 'INVALIDATED' | 'CLOSED';
}

export interface MarketIntelligence {
  marketStatus: 'RISK_ON' | 'RISK_OFF' | 'MIXED' | 'STAND_DOWN' | 'EVENT_RISK';
  threatLevel: 'LOW' | 'ELEVATED' | 'CRITICAL';
  assetsInPlay: string[];
  macroThreats: string[];
  confirmationBoard: ConfirmationItem[];
  riskFlags: RiskFlagItem[];
  nextEvent: string;
  standDownCondition: string;
  tinoRead: string;
  timestamp: Date;
}

export interface ConfirmationItem {
  label: string;
  status: 'CONFIRM' | 'CONFLICT' | 'NEUTRAL';
  note: string;
}

export interface RiskFlagItem {
  asset: string;
  flag: string;
  severity: RiskFlag;
  detail: string;
}

export interface AcademyLesson {
  id: string;
  title: string;
  track: 'START_HERE' | 'CORE_PRINCIPLES' | 'EXECUTION' | 'PROFESSIONAL' | 'SPECIALIST';
  tierRequired: UserTier;
  progress: number;
  locked: boolean;
  duration: number;
  description: string;
  videoUrl?: string;
}

export interface Alert {
  id: string;
  asset: string;
  type: 'SETUP' | 'MARKET_MOVE' | 'MACRO' | 'RISK' | 'BRIEFING';
  message: string;
  tierRequired: UserTier;
  issuedAt: Date;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  read: boolean;
}

export interface Briefing {
  id: string;
  title: string;
  type: 'DAILY' | 'WEEKLY';
  content: string;
  pdfUrl?: string;
  tinoNotes: string;
  tierRequired: UserTier;
  timestamp: Date;
}

// MOCK DATA

export const mockUser: User = {
  id: 'user-001',
  name: 'Trader Name',
  tier: 'bronze',
  joinedAt: new Date('2024-01-15'),
  alertPreferences: {
    pushEnabled: true,
    emailEnabled: true,
    types: ['SETUP', 'MARKET_MOVE', 'MACRO'],
  },
  academyProgress: {
    completedLessons: ['lesson-001', 'lesson-002'],
    currentTrack: 'START_HERE',
  },
};

export const mockSetups: Setup[] = [
  {
    id: 'setup-001',
    asset: 'SPY',
    assetClass: 'EQUITY',
    direction: 'LONG',
    setupType: 'BREAKOUT',
    bias: 'BULLISH',
    entry: '552 - 555',
    invalidation: '548',
    target: '565 - 570',
    confidence: 'HIGH',
    riskFlag: 'NORMAL',
    tierRequired: 'gold',
    delayMinutes: 120,
    issuedAt: new Date('2024-01-20T08:30:00Z'),
    tinoNote: 'Clean retest of previous breakdown. Market structure improving. Confirm with volume.',
    whyItMatters: 'Equity reversal into key support turning resistance. Broader indices moving in sync.',
    status: 'ACTIVE',
  },
  {
    id: 'setup-002',
    asset: 'EURUSD',
    assetClass: 'FOREX',
    direction: 'SHORT',
    setupType: 'REVERSAL',
    bias: 'BEARISH',
    entry: '1.0950 - 1.0960',
    invalidation: '1.0980',
    target: '1.0900 - 1.0880',
    confidence: 'MEDIUM',
    riskFlag: 'ELEVATED',
    tierRequired: 'platinum',
    delayMinutes: 0,
    issuedAt: new Date('2024-01-20T10:15:00Z'),
    tinoNote: 'Divergence at resistance. BOE commentary has flow implications. Position size appropriately.',
    whyItMatters: 'Currency weakness tied to rate expectations. DXY breadth confirmation matters here.',
    status: 'ACTIVE',
  },
  {
    id: 'setup-003',
    asset: 'BTC',
    assetClass: 'CRYPTO',
    direction: 'LONG',
    setupType: 'PULLBACK',
    bias: 'BULLISH',
    entry: '43500 - 44200',
    invalidation: '42800',
    target: '46000 - 47500',
    confidence: 'HIGH',
    riskFlag: 'NORMAL',
    tierRequired: 'platinum',
    delayMinutes: 0,
    issuedAt: new Date('2024-01-20T14:00:00Z'),
    tinoNote: 'Structural support holding. Options flow bullish. ETF inflows accelerating.',
    whyItMatters: 'Bitcoin is the ticker. This drives retail + pro crypto flows. Estate planning window opening.',
    status: 'ACTIVE',
  },
];

export const mockMarketIntelligence: MarketIntelligence = {
  marketStatus: 'RISK_ON',
  threatLevel: 'ELEVATED',
  assetsInPlay: ['SPY', 'EURUSD', 'BTC', 'GLD', 'DXY', 'IWM'],
  macroThreats: ['ECB Communication', 'US Jobs Report (Fri)', 'Crypto Regulation Risk', 'Geopolitical Tension'],
  confirmationBoard: [
    { label: 'Technicals', status: 'CONFIRM', note: 'Higher lows intact. No breakdown warnings yet.' },
    { label: 'Macro', status: 'CONFLICT', note: 'Yields stable but policy divergence emerging.' },
    { label: 'Sentiment', status: 'NEUTRAL', note: 'Options flow mixed. VIX structurally low.' },
    { label: 'Risk', status: 'CONFLICT', note: 'Positioning crowded on long equities. Gamma exposure elevated.' },
  ],
  riskFlags: [
    {
      asset: 'SPY',
      flag: 'Sector Concentration',
      severity: 'ELEVATED',
      detail: 'Tech leadership narrowing. Breadth warning.',
    },
    {
      asset: 'EURUSD',
      flag: 'Policy Divergence',
      severity: 'CRITICAL',
      detail: 'ECB less hawkish than expected. BOE hold likely.',
    },
    {
      asset: 'VIX',
      flag: 'Complacency Risk',
      severity: 'ELEVATED',
      detail: 'VIX at lows despite headline risks.',
    },
  ],
  nextEvent: 'US Jobs Report - Friday 8:30 AM EST',
  standDownCondition: 'Do not fade reversal patterns until after jobs data.',
  tinoRead:
    'Market is pricing perfection into jobs data. Breadth deteriorating. Small caps rolling over. This is the setup for a shakeout into key data. We want to see follow-through AFTER Friday morning, not before.',
  timestamp: new Date(),
};

export const mockAcademyLessons: AcademyLesson[] = [
  {
    id: 'lesson-001',
    title: 'Market Structure Foundation',
    track: 'START_HERE',
    tierRequired: 'bronze',
    progress: 100,
    locked: false,
    duration: 45,
    description: 'Understand the basics of support, resistance, and trend identification.',
  },
  {
    id: 'lesson-002',
    title: 'Bias vs. Setup',
    track: 'CORE_PRINCIPLES',
    tierRequired: 'gold',
    progress: 60,
    locked: false,
    duration: 52,
    description: 'Learn how to separate market bias from actionable setup conditions.',
  },
  {
    id: 'lesson-003',
    title: 'Execution Track: Risk Management',
    track: 'EXECUTION',
    tierRequired: 'platinum',
    progress: 0,
    locked: true,
    duration: 68,
    description: 'Master position sizing, invalidation logic, and portfolio heat management.',
  },
  {
    id: 'lesson-004',
    title: 'Professional Track: Flow Analysis',
    track: 'PROFESSIONAL',
    tierRequired: 'platinum',
    progress: 0,
    locked: true,
    duration: 75,
    description: 'Read order flow, gamma exposure, and institutional positioning.',
  },
  {
    id: 'lesson-005',
    title: 'Specialist Track: Macro Integration',
    track: 'SPECIALIST',
    tierRequired: 'black',
    progress: 0,
    locked: true,
    duration: 90,
    description: 'Connect macro policy, central bank action, and multi-asset setup correlation.',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    asset: 'SPY',
    type: 'SETUP',
    message: 'New setup issued: LONG breakout setup in SPY',
    tierRequired: 'gold',
    issuedAt: new Date(Date.now() - 30 * 60000),
    priority: 'HIGH',
    read: false,
  },
  {
    id: 'alert-002',
    asset: 'EURUSD',
    type: 'MARKET_MOVE',
    message: 'EURUSD approaching key resistance. Reversal setup active.',
    tierRequired: 'platinum',
    issuedAt: new Date(Date.now() - 60 * 60000),
    priority: 'HIGH',
    read: false,
  },
  {
    id: 'alert-003',
    asset: 'BTC',
    type: 'SETUP',
    message: 'Bitcoin pullback completion. Structural support holding.',
    tierRequired: 'platinum',
    issuedAt: new Date(Date.now() - 120 * 60000),
    priority: 'MEDIUM',
    read: true,
  },
  {
    id: 'alert-004',
    asset: 'ECB',
    type: 'MACRO',
    message: 'ECB communication risk: Policy divergence emerging.',
    tierRequired: 'gold',
    issuedAt: new Date(Date.now() - 180 * 60000),
    priority: 'MEDIUM',
    read: true,
  },
];

export const mockBriefings: Briefing[] = [
  {
    id: 'briefing-001',
    title: 'Daily Briefing - Market Preparation',
    type: 'DAILY',
    content:
      'Session opens with risk-on positioning. Equities following through, but breadth signals are deteriorating. Focus on SPY structure and EURUSD reversal setup.',
    tinoNotes: 'Watch for shakeout into jobs data. This is a natural consolidation ahead of Friday.',
    tierRequired: 'gold',
    timestamp: new Date(),
  },
  {
    id: 'briefing-002',
    title: 'Weekly Review - Macro Context',
    type: 'WEEKLY',
    content:
      'Week concluded with tech leadership holding but small caps rolling. This divergence matters. Bond yields stable, DXY neutral. Crypto showing strength.',
    tinoNotes:
      'Next week is about confirmation. Do not get cute with fades until breadth stabilizes post-jobs data.',
    tierRequired: 'platinum',
    timestamp: new Date(Date.now() - 86400000),
  },
];

export const membershipTiers = {
  bronze: {
    name: 'Bronze',
    price: 'Free',
    description: 'Learning',
    features: [
      'Market snapshot access',
      'One free lesson',
      'Newsletter signup',
      'Delayed setup previews (preview only)',
      'Limited dashboard',
      'Community preview',
    ],
  },
  gold: {
    name: 'Gold',
    price: '$97/month',
    description: 'Structured Trader',
    features: [
      'Delayed setups (120 min delay)',
      'Daily briefing',
      'Core education tracks',
      'Community access',
      'Basic market dashboard',
      'Alert history',
      'All Bronze features',
    ],
  },
  platinum: {
    name: 'Platinum',
    price: '$297/month',
    description: 'Professional System User',
    features: [
      'Real-time setups (no delay)',
      'Full market desk access',
      'Confirmation board & risk flags',
      'Full briefings & PDF breakdowns',
      'Masterclass access',
      'Discord access',
      'TR Archives',
      'Hybrid Academy (all tracks)',
      'Priority alerts',
      'Tino notes on all setups',
      'All Gold features',
    ],
  },
  black: {
    name: 'Black',
    price: '$997/month',
    description: 'Elite Market Desk',
    features: [
      'Priority alerts (immediate)',
      'Elite desk notes',
      'Higher-confidence setups',
      'Advanced intelligence reports',
      'Early access to new tools',
      'Direct Q&A session access',
      'Private market analysis',
      'Gamma/positioning reports',
      'VIP Discord access',
      'All Platinum features',
    ],
  },
};
