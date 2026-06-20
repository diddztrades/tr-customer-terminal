import { UserTier } from './mock-data';

const tierHierarchy: Record<UserTier, number> = {
  bronze: 0,
  gold: 1,
  platinum: 2,
  black: 3,
};

export const canAccessTier = (userTier: UserTier, requiredTier: UserTier): boolean => {
  return tierHierarchy[userTier] >= tierHierarchy[requiredTier];
};

export const getAccessStatus = (userTier: UserTier, requiredTier: UserTier) => {
  if (canAccessTier(userTier, requiredTier)) {
    return { accessible: true, type: 'full' as const };
  }
  return { accessible: false, type: 'locked' as const };
};

export const getDelayForTier = (tier: UserTier, requiredTier: UserTier, baseDelay: number): number => {
  if (canAccessTier(tier, requiredTier)) {
    return 0;
  }

  // For users below tier, show delay
  if (tier === 'bronze') return baseDelay * 2;
  if (tier === 'gold' && requiredTier === 'platinum') return baseDelay;

  return baseDelay;
};

export const tierLabels: Record<UserTier, string> = {
  bronze: 'Bronze - Learning',
  gold: 'Gold - Structured Trader',
  platinum: 'Platinum - Professional',
  black: 'Black - Elite Desk',
};

export const tierColors: Record<UserTier, string> = {
  bronze: '#CD7F32',
  gold: '#FFD700',
  platinum: '#E5E4E2',
  black: '#1a1a1a',
};

export const getUpgradeMessage = (userTier: UserTier, requiredTier: UserTier): string => {
  if (requiredTier === 'platinum') {
    if (userTier === 'bronze') {
      return 'Unlock real-time setups, market desk access, and full intelligence. Go Platinum.';
    }
    if (userTier === 'gold') {
      return 'Upgrade to Platinum for real-time market desk access and full execution notes.';
    }
  }

  if (requiredTier === 'black') {
    return 'Unlock elite desk notes, priority alerts, and VIP market access. Go Black.';
  }

  return 'Unlock premium features. Upgrade your membership.';
};
