'use client';

import TerminalShell from '@/components/TerminalShell';
import { mockUser, mockMarketIntelligence } from '@/lib/mock-data';
import LockedPreview from '@/components/LockedPreview';
import { canAccessTier } from '@/lib/tier-access';

export default function MarketDeskPage() {
  const market = mockMarketIntelligence;
  const hasMarketDeskAccess = canAccessTier(mockUser.tier, 'platinum');

  const riskColor = {
    LOW: 'bg-green-400/10 text-green-400 border-green-400',
    NORMAL: 'bg-blue-400/10 text-blue-400 border-blue-400',
    ELEVATED: 'bg-yellow-400/10 text-yellow-400 border-yellow-400',
    CRITICAL: 'bg-tr-red/10 text-tr-red border-tr-red',
  };

  return (
    <TerminalShell userTier={mockUser.tier} currentSection="market-desk">
      <div className="px-5 py-6 space-y-5">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">MARKET DESK</h1>
          <p className="text-tr-gray-light text-base">Intelligence terminal: macro threats, confirmation board, and system signals.</p>
        </div>

        {hasMarketDeskAccess ? (
          <>
            {/* Market Pulse */}
            <div className="space-y-3">
              <h2 className="tr-heading tr-heading-3">Market Pulse</h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="tr-card">
                  <div className="text-sm font-mono text-tr-gray-light mb-2">Market Status</div>
                  <div className="text-3xl font-bold text-green-400">{market.marketStatus.replace('_', ' ')}</div>
                  <div className="text-sm text-tr-gray-light mt-2">Equities following through. Breadth confirmation needed.</div>
                </div>
                <div className="tr-card">
                  <div className="text-sm font-mono text-tr-gray-light mb-2">Threat Level</div>
                  <div className={`text-3xl font-bold ${market.threatLevel === 'CRITICAL' ? 'text-tr-red' : market.threatLevel === 'ELEVATED' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {market.threatLevel}
                  </div>
                  <div className="text-sm text-tr-gray-light mt-2">Event risk present. Jobs data Friday.</div>
                </div>
              </div>
            </div>

            {/* Confirmation Board */}
            <div className="space-y-3">
              <h2 className="tr-heading tr-heading-3">Confirmation Board</h2>
              <div className="grid grid-cols-1 gap-3">
                {market.confirmationBoard.map((item, i) => (
                  <div key={i} className="tr-card">
                    <div className="flex items-start justify-between mb-3">
                      <div className="font-mono text-sm uppercase font-bold">{item.label}</div>
                      <span
                        className={`text-sm font-mono uppercase tracking-wider px-2 py-1 rounded border ${
                          item.status === 'CONFIRM'
                            ? 'bg-green-400/10 text-green-400 border-green-400'
                            : item.status === 'CONFLICT'
                              ? 'bg-tr-red/10 text-tr-red border-tr-red'
                              : 'bg-gray-500/10 text-gray-400 border-gray-500'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-tr-gray-light">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Flags */}
            <div className="space-y-3">
              <h2 className="tr-heading tr-heading-3">Risk Flags</h2>
              <div className="space-y-3">
                {market.riskFlags.map((flag, i) => (
                  <div key={i} className={`tr-card border ${riskColor[flag.severity]}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-mono font-bold uppercase">{flag.asset}</div>
                      <span className={`text-sm font-mono uppercase tracking-wider px-2 py-1 rounded ${riskColor[flag.severity]}`}>
                        {flag.severity}
                      </span>
                    </div>
                    <div className="font-mono text-sm mb-2 opacity-80">{flag.flag}</div>
                    <p className="text-sm text-tr-gray-light">{flag.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Intelligence Grid */}
            <div className="grid grid-cols-1 gap-3">
              {/* Macro Threats */}
              <div className="tr-card">
                <h3 className="font-mono text-sm uppercase font-bold mb-4">Macro Threats</h3>
                <ul className="space-y-2">
                  {market.macroThreats.map((threat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-tr-red text-sm">⚠</span>
                      <span className="text-sm">{threat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assets In Play */}
              <div className="tr-card">
                <h3 className="font-mono text-sm uppercase font-bold mb-4">Assets In Play</h3>
                <div className="flex flex-wrap gap-2">
                  {market.assetsInPlay.map((asset) => (
                    <span key={asset} className="px-3 py-1 bg-tr-gray-dark text-tr-red font-mono text-sm rounded border border-tr-gray-dark">
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tino's Deep Read */}
            <div className="tr-card tr-accent-border">
              <h3 className="font-mono text-sm uppercase font-bold mb-3 text-tr-red">Tino's Deep Read</h3>
              <p className="text-base leading-relaxed mb-4">{market.tinoRead}</p>
              <div className="pt-4 border-t border-tr-gray-dark text-sm text-tr-gray-light">
                <strong>Stand Down Condition:</strong> {market.standDownCondition}
              </div>
            </div>

            {/* Placeholder Features */}
            <div className="grid grid-cols-1 gap-3">
              <div className="tr-card bg-tr-black/50 border-tr-gray-dark">
                <h3 className="font-mono text-sm uppercase font-bold mb-2 text-tr-gray-light">TR Signals</h3>
                <div className="text-2xl font-bold text-tr-gray-light opacity-50">Coming Soon</div>
              </div>
              <div className="tr-card bg-tr-black/50 border-tr-gray-dark">
                <h3 className="font-mono text-sm uppercase font-bold mb-2 text-tr-gray-light">Gamma Exposure</h3>
                <div className="text-2xl font-bold text-tr-gray-light opacity-50">Coming Soon</div>
              </div>
              <div className="tr-card bg-tr-black/50 border-tr-gray-dark">
                <h3 className="font-mono text-sm uppercase font-bold mb-2 text-tr-gray-light">ACTUS Score</h3>
                <div className="text-2xl font-bold text-tr-gray-light opacity-50">Coming Soon</div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-12">
            <LockedPreview userTier={mockUser.tier} requiredTier="platinum" blurred={false} />
          </div>
        )}
      </div>
    </TerminalShell>
  );
}
