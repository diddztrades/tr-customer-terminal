import type { Setup, UserTier } from '@/lib/mock-data';
import type { SafeSetup } from './entitlement-types';
import { canAccessTier, getDelayedAccessMinutes, isAtLeastTier } from './access-policy';

const convictionByConfidence: Record<Setup['confidence'], number> = {
  HIGH: 86,
  MEDIUM: 68,
  LOW: 51,
};

function getPublicSummary(setup: Setup): string {
  return `${setup.asset} ${setup.direction} ${setup.setupType.toLowerCase()} is on the desk.`;
}

function getPublicThesis(setup: Setup): string {
  return `${setup.asset} is being monitored for structure, timing, and risk alignment.`;
}

function getPartialWhyThisMatters(setup: Setup): string {
  return setup.whyItMatters.split('.')[0] + '.';
}

function getDelayedTimestamp(setup: Setup, delayMinutes: number): string {
  return new Date(setup.issuedAt.getTime() + delayMinutes * 60000).toISOString();
}

export function projectSetupForUser(setup: Setup, userTier: UserTier): SafeSetup {
  const canAccess = canAccessTier(userTier, setup.tierRequired);
  const delayMinutes = getDelayedAccessMinutes(userTier, setup.tierRequired, setup.delayMinutes);
  const base = {
    id: setup.id,
    asset: setup.asset,
    direction: setup.direction,
    setupType: setup.setupType,
    status: setup.status,
    publicSummary: getPublicSummary(setup),
    thesis: getPublicThesis(setup),
    convictionScore: convictionByConfidence[setup.confidence],
    locked: !canAccess,
    upgradeReason: canAccess ? undefined : 'Exact entry, stop & target — Platinum',
  };

  if (userTier === 'bronze') {
    return base;
  }

  if (userTier === 'gold' && !canAccess) {
    return {
      ...base,
      locked: true,
      delayMinutes,
      delayedTimestamp: getDelayedTimestamp(setup, delayMinutes),
      partialWhyThisMatters: getPartialWhyThisMatters(setup),
    };
  }

  if (userTier === 'gold') {
    return {
      ...base,
      locked: false,
      entry: setup.entry,
      stop: setup.invalidation,
      target: setup.target,
      partialWhyThisMatters: getPartialWhyThisMatters(setup),
      delayMinutes,
      delayedTimestamp: getDelayedTimestamp(setup, delayMinutes),
    };
  }

  const platinumSetup = {
    ...base,
    locked: false,
    assetClass: setup.assetClass,
    bias: setup.bias,
    confidence: setup.confidence,
    riskFlag: setup.riskFlag,
    entry: setup.entry,
    stop: setup.invalidation,
    target: setup.target,
    fullWhyThisMatters: setup.whyItMatters,
    executionNotes: `Entry ${setup.entry}. Stop ${setup.invalidation}. Target ${setup.target}.`,
    tinoNote: setup.tinoNote,
    realTimeTimestamp: setup.issuedAt.toISOString(),
  };

  if (!isAtLeastTier(userTier, 'black')) {
    return platinumSetup;
  }

  return {
    ...platinumSetup,
    eliteDeskNote: `Priority desk context: ${setup.tinoNote}`,
    priorityContext: `${setup.asset} receives elevated review for Black desk workflows.`,
  };
}
