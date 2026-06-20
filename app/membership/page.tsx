'use client';

import TerminalShell from '@/components/TerminalShell';
import { mockUser, membershipTiers } from '@/lib/mock-data';
import type { UserTier } from '@/lib/mock-data';
import Link from 'next/link';

export default function MembershipPage() {
  const tiers: UserTier[] = ['bronze', 'gold', 'platinum', 'black'];
  const tierAccent: Record<UserTier, string> = {
    bronze: 'tr-tier-bronze',
    gold: 'tr-tier-gold',
    platinum: 'tr-tier-platinum',
    black: 'tr-tier-black',
  };
  const tierText: Record<UserTier, string> = {
    bronze: 'text-tr-bronze',
    gold: 'text-tr-gold',
    platinum: 'text-tr-chrome',
    black: 'text-tr-white',
  };

  return (
    <TerminalShell userTier={mockUser.tier} currentSection="membership">
      <div className="px-5 py-6 space-y-5">
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">MEMBERSHIP</h1>
          <p className="text-base text-tr-gray-light">Choose your trader identity and intelligence access level.</p>
        </div>

        <div className="tr-card tr-tier-bronze">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="tr-heading text-[22px] leading-none">Current Plan</h2>
            <span className="tr-badge tr-badge-warning">{mockUser.tier}</span>
          </div>
          <p className="text-sm leading-relaxed text-tr-gray-light">
            Joined {mockUser.joinedAt.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
            Access level: <span className="font-bold text-tr-white">{membershipTiers[mockUser.tier].description}</span>
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Compare Plans</h2>

          <div className="grid grid-cols-1 gap-3">
            {tiers.map((tier) => {
              const tierInfo = membershipTiers[tier];
              const isCurrent = mockUser.tier === tier;

              return (
                <div key={tier} className={`tr-card tr-membership-card ${tierAccent[tier]} ${isCurrent ? 'border-2' : ''}`}>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className={`tr-heading text-[28px] leading-none ${tierText[tier]}`}>{tierInfo.name}</h3>
                      <p className="mt-1 text-sm text-tr-gray-light">{tierInfo.description}</p>
                    </div>
                    <span className="tr-badge tr-badge-neutral">{tier}</span>
                  </div>

                  <div className="mb-4 border-y border-tr-border py-3">
                    <div className={`font-mono text-xl font-bold ${tierText[tier]}`}>{tierInfo.price}</div>
                    <div className="tr-label mt-1">Access Level</div>
                  </div>

                  <div className="mb-4 space-y-2 border-b border-tr-border pb-4">
                    {tierInfo.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="font-mono text-tr-green">+</span>
                        <span className="text-tr-gray-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {isCurrent ? (
                    <button disabled className="w-full rounded-lg border border-tr-border bg-tr-surface-alt py-3 font-tr-condensed text-sm font-bold uppercase tracking-[0.12em] text-tr-gray-light opacity-70">
                      Current Plan
                    </button>
                  ) : (
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Upgrade to ${tierInfo.name} - Demo only. In production, this would show payment flow.`);
                      }}
                      className="block w-full rounded-lg bg-tr-red py-3 text-center font-tr-condensed text-sm font-bold uppercase tracking-[0.12em] text-tr-black transition-all hover:bg-opacity-90"
                    >
                      Upgrade
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Feature Breakdown</h2>

          <div className="grid grid-cols-1 gap-3">
            {[
              ['Setup Access', ['Bronze: Teasers only', 'Gold: Delayed 120 min', 'Platinum: Real-time', 'Black: Priority + Elite']],
              ['Market Desk', ['Bronze: Locked', 'Gold: Locked', 'Platinum: Full Access', 'Black: Advanced + VIP']],
              ['Academy', ['Bronze: Start Here only', 'Gold: Core track', 'Platinum: All tracks', 'Black: Premium + Priority']],
              ['Community Access', ['Bronze: Preview', 'Gold: Basic access', 'Platinum: Full Discord', 'Black: VIP Discord + Q&A']],
            ].map(([title, rows]) => (
              <div key={title as string} className="tr-card">
                <h3 className="tr-heading mb-3 text-[20px] leading-none text-tr-red">{title}</h3>
                <ul className="space-y-2 text-sm">
                  {(rows as string[]).map((row) => {
                    const [label, value] = row.split(': ');
                    return (
                      <li key={row} className="flex justify-between gap-3">
                        <span>{label}:</span>
                        <span className="text-right text-tr-gray-light">{value}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {mockUser.tier !== 'bronze' && (
          <div className="tr-card tr-card-dark">
            <h3 className="tr-heading mb-3 text-[20px] leading-none">Billing</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-tr-gray-light">Billing Cycle:</span>
                <span>Monthly</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-tr-gray-light">Next Billing Date:</span>
                <span>{new Date(Date.now() + 30 * 86400000).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="border-t border-tr-border pt-2">
                <button className="font-tr-condensed text-sm font-bold uppercase tracking-[0.12em] text-tr-red hover:text-tr-white">
                  Manage Billing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TerminalShell>
  );
}
