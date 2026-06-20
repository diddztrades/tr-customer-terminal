import type { MockServerUser } from './entitlement-types';

export function getMockServerUser(): MockServerUser {
  return {
    id: 'user-001',
    tier: 'bronze',
    streakSessions: 12,
    unlocks: [],
  };
}
