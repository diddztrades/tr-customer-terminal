'use client';

import TerminalShell from '@/components/TerminalShell';
import { mockUser, mockAlerts } from '@/lib/mock-data';
import { canAccessTier } from '@/lib/tier-access';
import LockedPreview from '@/components/LockedPreview';
import { useState } from 'react';

export default function AlertsPage() {
  const [readFilter, setReadFilter] = useState<'all' | 'unread'>('unread');

  const filteredAlerts = mockAlerts.filter((alert) => {
    if (readFilter === 'unread') {
      return !alert.read;
    }
    return true;
  });

  const unreadCount = mockAlerts.filter((a) => !a.read).length;

  const priorityColor = {
    LOW: 'bg-blue-400/10 text-blue-400 border-blue-400',
    MEDIUM: 'bg-yellow-400/10 text-yellow-400 border-yellow-400',
    HIGH: 'bg-orange-400/10 text-orange-400 border-orange-400',
    CRITICAL: 'bg-tr-red/10 text-tr-red border-tr-red',
  };

  return (
    <TerminalShell userTier={mockUser.tier} currentSection="alerts">
      <div className="p-4 md:p-8 space-y-8">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">ALERTS</h1>
          <p className="text-tr-gray-light text-sm md:text-base">
            Real-time market alerts, setup notifications, and macro warnings.
          </p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="tr-card">
            <div className="text-xs font-mono text-tr-gray-light mb-2">Unread</div>
            <div className="text-3xl font-bold text-tr-red">{unreadCount}</div>
          </div>
          <div className="tr-card">
            <div className="text-xs font-mono text-tr-gray-light mb-2">Total</div>
            <div className="text-3xl font-bold">{mockAlerts.length}</div>
          </div>
          <div className="tr-card">
            <div className="text-xs font-mono text-tr-gray-light mb-2">Alert Mode</div>
            <div className="text-sm uppercase">Enabled</div>
          </div>
          <div className="tr-card">
            <div className="text-xs font-mono text-tr-gray-light mb-2">Tier Access</div>
            <div className="text-sm uppercase text-tr-red">{mockUser.tier}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setReadFilter('unread')}
            className={`text-xs font-mono px-3 py-2 rounded uppercase tracking-wider border transition-colors ${
              readFilter === 'unread'
                ? 'bg-tr-red text-tr-black border-tr-red'
                : 'bg-transparent border-tr-gray-dark text-tr-gray-light hover:text-tr-white'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setReadFilter('all')}
            className={`text-xs font-mono px-3 py-2 rounded uppercase tracking-wider border transition-colors ${
              readFilter === 'all'
                ? 'bg-tr-red text-tr-black border-tr-red'
                : 'bg-transparent border-tr-gray-dark text-tr-gray-light hover:text-tr-white'
            }`}
          >
            All
          </button>
        </div>

        {/* Alerts Feed */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const canAccess = canAccessTier(mockUser.tier, alert.tierRequired);

            return (
              <div key={alert.id} className={`tr-card ${canAccess ? '' : 'relative'}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {!alert.read && <div className="w-2 h-2 bg-tr-red rounded-full"></div>}
                      <span className={`tr-badge ${priorityColor[alert.priority]}`}>{alert.priority}</span>
                      <span className="text-xs font-mono text-tr-gray-light">{alert.type}</span>
                    </div>

                    {canAccess ? (
                      <>
                        <h3 className="font-bold mb-2 text-tr-red">{alert.asset}</h3>
                        <p className="text-sm text-tr-white mb-2">{alert.message}</p>
                        <div className="text-xs text-tr-gray-light font-mono">
                          {alert.issuedAt.toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="py-2">
                        <LockedPreview userTier={mockUser.tier} requiredTier={alert.tierRequired} blurred={false} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-tr-gray-light">No alerts to display.</p>
            </div>
          )}
        </div>

        {/* Alert Preferences */}
        <div className="tr-card bg-tr-black/50 border-tr-gray-dark">
          <h3 className="font-bold mb-3 text-sm">Alert Preferences</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span>Real-time Setup Alerts</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}
