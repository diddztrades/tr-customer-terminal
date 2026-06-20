'use client';

import TerminalShell from '@/components/TerminalShell';
import { mockUser, membershipTiers } from '@/lib/mock-data';
import { UserTier } from '@/lib/mock-data';
import Link from 'next/link';

export default function MembershipPage() {
  const tiers: UserTier[] = ['bronze', 'gold', 'platinum', 'black'];

  return (
    <TerminalShell userTier={mockUser.tier} currentSection="membership">
      <div className="p-4 md:p-8 space-y-8">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">MEMBERSHIP</h1>
          <p className="text-tr-gray-light text-sm md:text-base">Choose your trader identity and intelligence access level.</p>
        </div>

        {/* Current Status */}
        <div className="tr-card tr-accent-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Your Current Plan</h2>
            <span className="text-xs font-mono uppercase tracking-wider text-tr-red">{mockUser.tier}</span>
          </div>
          <p className="text-sm text-tr-gray-light">
            Joined {mockUser.joinedAt.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Access level:{' '}
            <span className="text-tr-white font-bold">{membershipTiers[mockUser.tier].description}</span>
          </p>
        </div>

        {/* Tier Comparison */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Compare Plans</h2>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-w-max md:min-w-full">
              {tiers.map((tier) => {
                const tierInfo = membershipTiers[tier];
                const isCurrent = mockUser.tier === tier;

                return (
                  <div key={tier} className={`tr-card ${isCurrent ? 'tr-accent-border border-2' : ''}`}>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1">{tierInfo.name}</h3>
                      <p className="text-xs text-tr-gray-light italic">{tierInfo.description}</p>
                      <div className="text-lg font-bold text-tr-red mt-2">{tierInfo.price}</div>
                    </div>

                    <div className="space-y-2 mb-4 pb-4 border-b border-tr-gray-dark">
                      {tierInfo.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className="text-green-400 text-sm">✓</span>
                          <span className="text-tr-gray-light">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {isCurrent ? (
                      <button disabled className="w-full py-2 bg-tr-gray-dark text-tr-gray-light text-xs font-mono uppercase tracking-wider rounded opacity-50">
                        Current Plan
                      </button>
                    ) : (
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Upgrade to ${tierInfo.name} - Demo only. In production, this would show payment flow.`);
                        }}
                        className="block w-full py-2 bg-tr-red text-tr-black text-xs font-mono uppercase tracking-wider rounded font-bold hover:bg-opacity-90 transition-all text-center"
                      >
                        Upgrade
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tier Features Detail */}
        <div className="space-y-4">
          <h2 className="tr-heading tr-heading-3">Feature Breakdown</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Setups */}
            <div className="tr-card">
              <h3 className="font-bold mb-3 text-tr-red">Setup Access</h3>
              <ul className="text-xs space-y-2">
                <li className="flex justify-between">
                  <span>Bronze:</span>
                  <span className="text-tr-gray-light">Teasers only</span>
                </li>
                <li className="flex justify-between">
                  <span>Gold:</span>
                  <span className="text-tr-gray-light">Delayed 120 min</span>
                </li>
                <li className="flex justify-between">
                  <span>Platinum:</span>
                  <span className="text-green-400">Real-time</span>
                </li>
                <li className="flex justify-between">
                  <span>Black:</span>
                  <span className="text-green-400">Priority + Elite</span>
                </li>
              </ul>
            </div>

            {/* Market Intelligence */}
            <div className="tr-card">
              <h3 className="font-bold mb-3 text-tr-red">Market Desk</h3>
              <ul className="text-xs space-y-2">
                <li className="flex justify-between">
                  <span>Bronze:</span>
                  <span className="text-tr-gray-light">Locked</span>
                </li>
                <li className="flex justify-between">
                  <span>Gold:</span>
                  <span className="text-tr-gray-light">Locked</span>
                </li>
                <li className="flex justify-between">
                  <span>Platinum:</span>
                  <span className="text-green-400">Full Access</span>
                </li>
                <li className="flex justify-between">
                  <span>Black:</span>
                  <span className="text-green-400">Advanced + VIP</span>
                </li>
              </ul>
            </div>

            {/* Education */}
            <div className="tr-card">
              <h3 className="font-bold mb-3 text-tr-red">Academy</h3>
              <ul className="text-xs space-y-2">
                <li className="flex justify-between">
                  <span>Bronze:</span>
                  <span className="text-tr-gray-light">Start Here only</span>
                </li>
                <li className="flex justify-between">
                  <span>Gold:</span>
                  <span className="text-tr-gray-light">Core track</span>
                </li>
                <li className="flex justify-between">
                  <span>Platinum:</span>
                  <span className="text-green-400">All tracks</span>
                </li>
                <li className="flex justify-between">
                  <span>Black:</span>
                  <span className="text-green-400">Premium + Priority</span>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="tr-card">
              <h3 className="font-bold mb-3 text-tr-red">Community Access</h3>
              <ul className="text-xs space-y-2">
                <li className="flex justify-between">
                  <span>Bronze:</span>
                  <span className="text-tr-gray-light">Preview</span>
                </li>
                <li className="flex justify-between">
                  <span>Gold:</span>
                  <span className="text-tr-gray-light">Basic access</span>
                </li>
                <li className="flex justify-between">
                  <span>Platinum:</span>
                  <span className="text-green-400">Full Discord</span>
                </li>
                <li className="flex justify-between">
                  <span>Black:</span>
                  <span className="text-green-400">VIP Discord + Q&A</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Billing Info */}
        {mockUser.tier !== 'bronze' && (
          <div className="tr-card bg-tr-black/50 border-tr-gray-dark">
            <h3 className="font-bold mb-3 text-sm">Billing</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-tr-gray-light">Billing Cycle:</span>
                <span>Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tr-gray-light">Next Billing Date:</span>
                <span>
                  {new Date(Date.now() + 30 * 86400000).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="pt-2 border-t border-tr-gray-dark">
                <button className="text-xs font-mono text-tr-red hover:text-tr-red/80 uppercase tracking-wider">
                  Manage Billing →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TerminalShell>
  );
}
