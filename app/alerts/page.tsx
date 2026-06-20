import TerminalShell from '@/components/TerminalShell';
import { getSafeAlertsForUser } from '@/lib/entitlements/get-safe-alerts';
import { getMockServerUser } from '@/lib/entitlements/mock-session';

interface AlertsPageProps {
  searchParams?: {
    filter?: 'all' | 'unread';
  };
}

export default function AlertsPage({ searchParams }: AlertsPageProps) {
  const user = getMockServerUser();
  const safeAlerts = getSafeAlertsForUser();
  const readFilter = searchParams?.filter === 'all' ? 'all' : 'unread';
  const filteredAlerts = readFilter === 'unread' ? safeAlerts.filter((alert) => !alert.read) : safeAlerts;
  const unreadCount = safeAlerts.filter((alert) => !alert.read).length;

  const priorityColor = {
    LOW: 'tr-badge-info',
    MEDIUM: 'tr-badge-warning',
    HIGH: 'tr-badge-warning',
    CRITICAL: 'tr-badge-danger',
  };

  return (
    <TerminalShell userTier={user.tier} currentSection="alerts">
      <div className="px-5 py-6 space-y-5">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">ALERTS</h1>
          <p className="text-tr-gray-light text-base">
            Real-time market alerts, setup notifications, and macro warnings.
          </p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 gap-3">
          <div className="tr-card">
            <div className="tr-label mb-2">Unread</div>
            <div className="text-3xl font-bold text-tr-red">{unreadCount}</div>
          </div>
          <div className="tr-card">
            <div className="tr-label mb-2">Total</div>
            <div className="text-3xl font-bold">{safeAlerts.length}</div>
          </div>
          <div className="tr-card">
            <div className="tr-label mb-2">Alert Mode</div>
            <div className="text-sm uppercase">Enabled</div>
          </div>
          <div className="tr-card">
            <div className="tr-label mb-2">Tier Access</div>
            <div className="text-sm uppercase text-tr-red">{user.tier}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <a
            href="/alerts"
            className={`rounded-lg border px-4 py-2 font-tr-condensed text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
              readFilter === 'unread'
                ? 'bg-tr-red text-tr-black border-tr-red'
                : 'bg-transparent border-tr-border text-tr-gray-light hover:text-tr-white'
            }`}
          >
            Unread
          </a>
          <a
            href="/alerts?filter=all"
            className={`rounded-lg border px-4 py-2 font-tr-condensed text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
              readFilter === 'all'
                ? 'bg-tr-red text-tr-black border-tr-red'
                : 'bg-transparent border-tr-border text-tr-gray-light hover:text-tr-white'
            }`}
          >
            All
          </a>
        </div>

        {/* Alerts Feed */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="tr-card relative">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {!alert.read && <div className="w-2 h-2 bg-tr-red rounded-full"></div>}
                    <span className={`tr-badge ${priorityColor[alert.priority]}`}>{alert.priority}</span>
                    <span className="text-sm font-mono text-tr-gray-light">{alert.alertType}</span>
                  </div>

                  <h3 className="tr-heading mb-2 text-[24px] leading-none text-tr-red">{alert.asset}</h3>
                  <p className="text-sm text-tr-white mb-2">
                    {'fullMessage' in alert && alert.fullMessage ? alert.fullMessage : alert.headline}
                  </p>

                  {'partialContext' in alert && alert.partialContext ? (
                    <p className="text-sm text-tr-gray-light mb-2">{alert.partialContext}</p>
                  ) : null}

                  {'executionDetails' in alert && alert.executionDetails ? (
                    <p className="text-sm text-tr-gray-light mb-2">{alert.executionDetails}</p>
                  ) : (
                    <div className="tr-lock-callout mb-2">
                      {alert.upgradeReason || 'Real-time alert context available in Platinum.'}
                    </div>
                  )}

                  {'eliteCommentary' in alert && alert.eliteCommentary ? (
                    <p className="text-sm text-tr-white mb-2">{alert.eliteCommentary}</p>
                  ) : null}

                  <div className="text-sm text-tr-gray-light font-mono">
                    {new Date(alert.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-tr-gray-light">No alerts to display.</p>
            </div>
          )}
        </div>

        {/* Alert Preferences */}
        <div className="tr-card bg-tr-black/50 border-tr-border">
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
