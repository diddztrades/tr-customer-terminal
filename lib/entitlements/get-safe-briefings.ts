import { mockBriefings } from '@/lib/mock-data';
import type { Briefing, UserTier } from '@/lib/mock-data';
import type { SafeBriefing } from './entitlement-types';
import { canAccessTier, isAtLeastTier } from './access-policy';
import { getMockServerUser } from './mock-session';

function firstSentence(value: string): string {
  return value.split('.')[0] + '.';
}

function getDelayedTimestamp(briefing: Briefing): string {
  return new Date(briefing.timestamp.getTime() + 120 * 60000).toISOString();
}

export function projectBriefingForUser(briefing: Briefing, userTier: UserTier): SafeBriefing {
  const canAccess = canAccessTier(userTier, briefing.tierRequired);
  const base = {
    id: briefing.id,
    title: briefing.title,
    type: briefing.type,
    summary: firstSentence(briefing.content),
    marketState: briefing.type === 'DAILY' ? 'Session Prep' : 'Weekly Review',
    threatHeadline: briefing.type === 'DAILY' ? 'Event risk and breadth remain in focus.' : 'Macro divergence remains the main watch.',
    publicNarrative: 'Market intelligence is available with tier-appropriate detail.',
    timestamp: briefing.timestamp.toISOString(),
    locked: !canAccess,
    upgradeReason: canAccess ? undefined : "Tino's execution notes available in Platinum.",
  };

  if (userTier === 'bronze') {
    return base;
  }

  if (userTier === 'gold' && !canAccess) {
    return {
      ...base,
      delayedSummary: base.summary,
      partialAnalysis: firstSentence(briefing.content),
      partialContext: 'Delayed briefing context is available for Gold members.',
      delayMinutes: 120,
      delayedTimestamp: getDelayedTimestamp(briefing),
    };
  }

  if (userTier === 'gold') {
    return {
      ...base,
      locked: false,
      delayedSummary: base.summary,
      partialAnalysis: firstSentence(briefing.content),
      partialContext: 'Gold briefing context is delayed and intentionally partial.',
      delayMinutes: 120,
      delayedTimestamp: getDelayedTimestamp(briefing),
    };
  }

  const platinumBriefing = {
    ...base,
    locked: false,
    fullContent: briefing.content,
    tinoNotes: briefing.tinoNotes,
    executionFocus: `Execution focus: ${firstSentence(briefing.tinoNotes)}`,
    premiumAnalysis: briefing.content,
  };

  if (!isAtLeastTier(userTier, 'black')) {
    return platinumBriefing;
  }

  return {
    ...platinumBriefing,
    eliteCommentary: `Elite desk commentary: ${briefing.tinoNotes}`,
    priorityContext: `${briefing.type} briefing receives Black desk priority review.`,
  };
}

export function getSafeBriefingsForUser(): SafeBriefing[] {
  const user = getMockServerUser();

  return mockBriefings.map((briefing) => projectBriefingForUser(briefing, user.tier));
}
