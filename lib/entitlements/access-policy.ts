import type { UserTier } from '@/lib/mock-data';

const tierRank: Record<UserTier, number> = {
  bronze: 0,
  gold: 1,
  platinum: 2,
  black: 3,
};

export function canAccessTier(userTier: UserTier, requiredTier: UserTier): boolean {
  return tierRank[userTier] >= tierRank[requiredTier];
}

export function isAtLeastTier(userTier: UserTier, minimumTier: UserTier): boolean {
  return tierRank[userTier] >= tierRank[minimumTier];
}

export function getDelayedAccessMinutes(userTier: UserTier, requiredTier: UserTier, setupDelayMinutes: number): number {
  if (canAccessTier(userTier, requiredTier)) {
    return 0;
  }

  if (userTier === 'gold' && requiredTier === 'platinum') {
    return setupDelayMinutes;
  }

  return setupDelayMinutes * 2;
}
