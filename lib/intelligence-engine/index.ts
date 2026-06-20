import { mockMarketIntelligence } from '@/lib/mock-data';

// Core enums / types
export type MarketState = 'RISK_ON' | 'RISK_OFF' | 'MIXED' | 'STAND_DOWN';
export type ThreatLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
export type ConfirmationState = 'CONFIRM' | 'CONFLICT' | 'NEUTRAL';

export interface MarketStateOutput {
  marketState: MarketState;
  confidence: number; // 0-100
  rationale: string;
}

export interface ThreatOutput {
  threatLevel: ThreatLevel;
  score: number; // 0-100
  threats: string[];
}

export interface ConfirmationItem {
  asset: string;
  state: ConfirmationState;
}

export interface ConfirmationBoardOutput {
  confirmations: ConfirmationItem[];
}

export interface OpportunityOutput {
  asset: string;
  opportunityScore: number; // 0-100
  confidenceScore: number; // 0-100
  riskScore: number; // 0-100
  actionabilityScore: number; // 0-100
  status: 'READY' | 'WATCH' | 'AVOID';
}

export interface BattlefieldOutput {
  bestOpportunity: OpportunityOutput | null;
  biggestThreat: string | null;
  assetsInPlay: string[];
  standDownCondition: string | null;
  nextEventRisk: string | null;
}

export interface TinoReadOutput {
  marketNarrative: string;
  trap: string;
  whatMatters: string[];
  executionFocus: string[];
  standDownCondition: string | null;
}

export interface AgentOutput {
  agent: 'Macro' | 'Technical' | 'Sentiment' | 'Risk' | 'Hybrid';
  vote: 'BULLISH' | 'NEUTRAL' | 'BEARISH';
  confidence: number; // 0-100
  rationale: string;
}

export interface AgentsSummary {
  agents: AgentOutput[];
  convictionScore: number; // 0-100
  stance: 'BEARISH' | 'CAUTIOUS_BEARISH' | 'NEUTRAL' | 'CAUTIOUS_BULLISH' | 'BULLISH';
}

// --- MARKET STATE ENGINE ---
export function computeMarketStateEngine(): MarketStateOutput {
  const mi = mockMarketIntelligence;
  const ms = mi.marketStatus;
  let marketState: MarketState = 'MIXED';
  if (ms === 'RISK_ON') marketState = 'RISK_ON';
  if (ms === 'RISK_OFF') marketState = 'RISK_OFF';
  if (ms === 'STAND_DOWN') marketState = 'STAND_DOWN';

  // confidence heuristic: threatLevel low -> higher confidence if clear risk on/off
  let confidence = 60;
  if (marketState === 'RISK_ON') confidence = mi.threatLevel === 'LOW' ? 85 : 65;
  if (marketState === 'RISK_OFF') confidence = mi.threatLevel === 'CRITICAL' ? 90 : 70;
  if (marketState === 'MIXED') confidence = 45;
  if (marketState === 'STAND_DOWN') confidence = 75;

  const rationale = mi.tinoRead || 'Market heuristics derived from mock intelligence.';

  return { marketState, confidence, rationale };
}

// --- THREAT ENGINE ---
export function computeThreatEngine(): ThreatOutput {
  const mi = mockMarketIntelligence;
  const threats = mi.macroThreats || [];
  // base score from threatLevel
  let base = 50;
  if (mi.threatLevel === 'LOW') base = 20;
  if (mi.threatLevel === 'ELEVATED') base = 60;
  if (mi.threatLevel === 'CRITICAL') base = 85;

  // risk flags increase score
  const riskBoost = (mi.riskFlags || []).reduce((s, f) => s + (f.severity === 'CRITICAL' ? 20 : f.severity === 'ELEVATED' ? 10 : 0), 0);

  const score = Math.min(100, base + riskBoost);
  const level: ThreatLevel = score > 80 ? 'EXTREME' : score > 60 ? 'HIGH' : score > 35 ? 'MODERATE' : 'LOW';

  return { threatLevel: level, score, threats };
}

// --- CONFIRMATION BOARD ENGINE ---
const DEFAULT_ASSETS = ['DXY', 'VIX', 'TLT', 'SPY', 'QQQ', 'IWM'];
export function computeConfirmationBoardEngine(): ConfirmationBoardOutput {
  const mi = mockMarketIntelligence;
  const out: ConfirmationItem[] = [];
  const map = new Map(mi.confirmationBoard.map((c) => [c.label.toUpperCase(), c]));
  for (const a of DEFAULT_ASSETS) {
    const found = map.get(a.toUpperCase());
    if (found) {
      out.push({ asset: a, state: found.status as ConfirmationState });
    } else {
      // fallback neutral
      out.push({ asset: a, state: 'NEUTRAL' });
    }
  }
  return { confirmations: out };
}

// --- OPPORTUNITY ENGINE ---
const TARGET_ASSETS = ['NQ', 'ES', 'GOLD', 'OIL', 'BTC', 'ETH'];
function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function computeOpportunityEngine(): OpportunityOutput[] {
  const mi = mockMarketIntelligence;
  const confirmations = computeConfirmationBoardEngine();
  return TARGET_ASSETS.map((asset, idx) => {
    // base per asset
    const baseMap: Record<string, number> = { NQ: 70, ES: 68, GOLD: 75, OIL: 65, BTC: 60, ETH: 58 };
    let base = baseMap[asset] ?? 60;

    // boost if in assetsInPlay
    if (mi.assetsInPlay.includes(asset) || mi.assetsInPlay.includes(asset.toUpperCase())) base += 8;

    // confirmation influence
    const conf = confirmations.confirmations.find((c) => c.asset === asset || c.asset === asset.toUpperCase());
    if (conf && conf.state === 'CONFIRM') base += 10;
    if (conf && conf.state === 'CONFLICT') base -= 12;

    // threat influence
    const t = computeThreatEngine();
    const threatPenalty = t.score > 70 ? -10 : t.score > 50 ? -5 : 0;
    base += threatPenalty;

    // derive scores
    const opportunityScore = clamp(base + (idx % 3) * 2);
    const confidenceScore = clamp(50 + (opportunityScore - 60) / 1.2);
    const riskScore = clamp(40 + (100 - confidenceScore) / 1.5 + (t.score > 60 ? 10 : 0));
    const actionabilityScore = clamp((confidenceScore * (100 - riskScore)) / 100 + 20);

    let status: OpportunityOutput['status'] = 'WATCH';
    if (opportunityScore > 80 && confidenceScore > 65 && riskScore < 55) status = 'READY';
    if (riskScore > 80) status = 'AVOID';

    return {
      asset,
      opportunityScore,
      confidenceScore,
      riskScore,
      actionabilityScore,
      status,
    };
  });
}

// --- AGENT LAYER ---
function macroAgent(): AgentOutput {
  const mi = mockMarketIntelligence;
  const threats = mi.macroThreats || [];
  if (threats.length >= 2 || mi.threatLevel === 'CRITICAL') return { agent: 'Macro', vote: 'BEARISH', confidence: 80, rationale: `Macro threats: ${threats.slice(0, 3).join(', ')}` };
  if (mi.marketStatus === 'RISK_ON') return { agent: 'Macro', vote: 'BULLISH', confidence: 65, rationale: 'Macro backdrop risk-on' };
  return { agent: 'Macro', vote: 'NEUTRAL', confidence: 45, rationale: 'Macro neutral' };
}

function technicalAgent(): AgentOutput {
  const mi = mockMarketIntelligence;
  const tech = mi.confirmationBoard.find((c) => c.label === 'Technicals');
  if (!tech) return { agent: 'Technical', vote: 'NEUTRAL', confidence: 40, rationale: 'No technicals line' };
  if (tech.status === 'CONFIRM') return { agent: 'Technical', vote: 'BULLISH', confidence: 70, rationale: tech.note };
  if (tech.status === 'CONFLICT') return { agent: 'Technical', vote: 'BEARISH', confidence: 60, rationale: tech.note };
  return { agent: 'Technical', vote: 'NEUTRAL', confidence: 45, rationale: tech.note };
}

function sentimentAgent(): AgentOutput {
  const mi = mockMarketIntelligence;
  const sent = mi.confirmationBoard.find((c) => c.label === 'Sentiment');
  if (!sent) return { agent: 'Sentiment', vote: 'NEUTRAL', confidence: 40, rationale: 'No sentiment line' };
  if (sent.status === 'CONFIRM') return { agent: 'Sentiment', vote: 'BULLISH', confidence: 60, rationale: sent.note };
  if (sent.status === 'CONFLICT') return { agent: 'Sentiment', vote: 'BEARISH', confidence: 60, rationale: sent.note };
  return { agent: 'Sentiment', vote: 'NEUTRAL', confidence: 45, rationale: sent.note };
}

function riskAgent(): AgentOutput {
  const mi = mockMarketIntelligence;
  const critical = mi.riskFlags.some((f) => f.severity === 'CRITICAL');
  const elevated = mi.riskFlags.some((f) => f.severity === 'ELEVATED');
  if (critical) return { agent: 'Risk', vote: 'BEARISH', confidence: 85, rationale: 'Critical risk flags' };
  if (elevated) return { agent: 'Risk', vote: 'BEARISH', confidence: 60, rationale: 'Elevated risk flags' };
  return { agent: 'Risk', vote: 'NEUTRAL', confidence: 45, rationale: 'Risk normal' };
}

function hybridAgent(): AgentOutput {
  const t = technicalAgent();
  const s = sentimentAgent();
  // simple combine
  const bulls = (t.vote === 'BULLISH' ? 1 : 0) + (s.vote === 'BULLISH' ? 1 : 0);
  const bears = (t.vote === 'BEARISH' ? 1 : 0) + (s.vote === 'BEARISH' ? 1 : 0);
  if (bulls > bears) return { agent: 'Hybrid', vote: 'BULLISH', confidence: Math.round((t.confidence + s.confidence) / 2), rationale: `Hybrid: ${t.rationale}; ${s.rationale}` };
  if (bears > bulls) return { agent: 'Hybrid', vote: 'BEARISH', confidence: Math.round((t.confidence + s.confidence) / 2), rationale: `Hybrid: ${t.rationale}; ${s.rationale}` };
  return { agent: 'Hybrid', vote: 'NEUTRAL', confidence: Math.round((t.confidence + s.confidence) / 2), rationale: `Hybrid: ${t.rationale}; ${s.rationale}` };
}

export function computeAgentLayer(): AgentsSummary {
  const agents = [macroAgent(), technicalAgent(), sentimentAgent(), riskAgent(), hybridAgent()];
  // conviction score: map votes to -1..+1 weighted by confidence
  let weighted = 0;
  let sumW = 0;
  for (const a of agents) {
    const sign = a.vote === 'BULLISH' ? 1 : a.vote === 'BEARISH' ? -1 : 0;
    const w = a.confidence / 100;
    weighted += sign * w;
    sumW += w;
  }
  const raw = sumW ? weighted / sumW : 0; // -1..1
  const convictionScore = clamp((raw + 1) * 50); // map to 0..100
  let stance: AgentsSummary['stance'] = 'NEUTRAL';
  if (convictionScore >= 75) stance = 'BULLISH';
  else if (convictionScore >= 60) stance = 'CAUTIOUS_BULLISH';
  else if (convictionScore <= 25) stance = 'BEARISH';
  else if (convictionScore <= 40) stance = 'CAUTIOUS_BEARISH';

  return { agents, convictionScore, stance };
}

// --- TINO READ ENGINE ---
export function computeTinoRead(): TinoReadOutput {
  const mi = mockMarketIntelligence;
  const whatMatters = ['DXY', 'BONDS', 'OIL'].filter(Boolean);
  const opportunities = computeOpportunityEngine();
  const executionFocus = opportunities.filter((o) => o.status === 'READY').slice(0, 3).map((o) => `${o.asset} ${o.status}`);
  const trap = "Don't chase early breakouts — wait for confirmation.";
  return {
    marketNarrative: mi.tinoRead,
    trap,
    whatMatters,
    executionFocus,
    standDownCondition: mi.standDownCondition || null,
  };
}

// --- BATTLEFIELD ENGINE ---
export function computeBattlefieldEngine(): BattlefieldOutput {
  const ops = computeOpportunityEngine();
  const ready = ops.filter((o) => o.status === 'READY');
  const best = ready.length ? ready.sort((a, b) => b.opportunityScore - a.opportunityScore)[0] : ops.sort((a, b) => b.opportunityScore - a.opportunityScore)[0] ?? null;
  const threat = computeThreatEngine();
  return {
    bestOpportunity: best || null,
    biggestThreat: threat.threats[0] || null,
    assetsInPlay: mockMarketIntelligence.assetsInPlay || [],
    standDownCondition: mockMarketIntelligence.standDownCondition || null,
    nextEventRisk: mockMarketIntelligence.nextEvent || null,
  };
}

// Export a composed battlefield used by the app
export function getTodayBattlefield() {
  return {
    marketState: computeMarketStateEngine(),
    threat: computeThreatEngine(),
    confirmationBoard: computeConfirmationBoardEngine(),
    opportunities: computeOpportunityEngine(),
    battlefield: computeBattlefieldEngine(),
    tinoRead: computeTinoRead(),
    agents: computeAgentLayer(),
  };
}
