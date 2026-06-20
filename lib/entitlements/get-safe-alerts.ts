import { mockAlerts } from '@/lib/mock-data';
import type { Alert, UserTier } from '@/lib/mock-data';
import type { SafeAlert } from './entitlement-types';
import { canAccessTier, isAtLeastTier } from './access-policy';
import { getMockServerUser } from './mock-session';

function getHeadline(alert: Alert): string {
  return `${alert.asset} ${alert.type.replace('_', ' ').toLowerCase()} alert`;
}

function getDelayedTimestamp(alert: Alert): string {
  return new Date(alert.issuedAt.getTime() + 120 * 60000).toISOString();
}

export function projectAlertForUser(alert: Alert, userTier: UserTier): SafeAlert {
  const canAccess = canAccessTier(userTier, alert.tierRequired);
  const base = {
    id: alert.id,
    headline: getHeadline(alert),
    asset: alert.asset,
    alertType: alert.type,
    timestamp: alert.issuedAt.toISOString(),
    read: alert.read,
    priority: alert.priority,
    locked: !canAccess,
    upgradeReason: canAccess ? undefined : 'Real-time alert context available in Platinum.',
  };

  if (userTier === 'bronze') {
    return base;
  }

  if (userTier === 'gold' && !canAccess) {
    return {
      ...base,
      delayedHeadline: base.headline,
      partialAnalysis: 'Delayed alert context is available for Gold members.',
      partialContext: `${alert.asset} remains on watch without real-time execution detail.`,
      delayMinutes: 120,
      delayedTimestamp: getDelayedTimestamp(alert),
    };
  }

  if (userTier === 'gold') {
    return {
      ...base,
      locked: false,
      delayedHeadline: base.headline,
      partialAnalysis: 'Gold alert context is delayed and intentionally partial.',
      partialContext: `${alert.asset} alert context is available after the delay window.`,
      delayMinutes: 120,
      delayedTimestamp: getDelayedTimestamp(alert),
    };
  }

  const platinumAlert = {
    ...base,
    locked: false,
    fullMessage: alert.message,
    executionDetails: `Execution context for ${alert.asset}: ${alert.message}`,
    realTimeContext: `${alert.asset} alert issued at ${alert.issuedAt.toISOString()}.`,
    premiumCommentary: alert.message,
  };

  if (!isAtLeastTier(userTier, 'black')) {
    return platinumAlert;
  }

  return {
    ...platinumAlert,
    eliteCommentary: `Elite alert commentary: ${alert.message}`,
    priorityContext: `${alert.priority} priority alert routed to Black desk context.`,
  };
}

export function getSafeAlertsForUser(): SafeAlert[] {
  const user = getMockServerUser();

  return mockAlerts.map((alert) => projectAlertForUser(alert, user.tier));
}
