'use client';

import type { SafeSetup } from '@/lib/entitlements/entitlement-types';
import Link from 'next/link';

interface SetupCardProps {
  setup: SafeSetup;
}

export default function SetupCard({ setup }: SetupCardProps) {
  const directionClass = setup.direction === 'LONG' ? 'text-tr-green' : 'text-tr-red';
  const riskClass = {
    LOW: 'tr-badge-success',
    NORMAL: 'tr-badge-info',
    ELEVATED: 'tr-badge-warning',
    CRITICAL: 'tr-badge-danger',
  };

  const cardBody = (
    <div className="tr-card space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="tr-label mb-1">Asset</div>
          <div className="tr-heading text-[30px] leading-none text-tr-red">{setup.asset}</div>
        </div>

        {'riskFlag' in setup && setup.riskFlag ? (
          <span className={`tr-badge ${riskClass[setup.riskFlag]}`}>{setup.riskFlag}</span>
        ) : (
          <span className="tr-badge tr-badge-neutral">{setup.status}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="tr-stat-cell">
          <div className="tr-label mb-2">Direction</div>
          <div className={`font-mono text-base font-bold ${directionClass}`}>{setup.direction}</div>
        </div>
        <div className="tr-stat-cell">
          <div className="tr-label mb-2">Type</div>
          <div className="font-mono text-base font-bold text-tr-white">{setup.setupType}</div>
        </div>
      </div>

      <div className="text-sm leading-relaxed text-tr-gray-light">{setup.thesis}</div>

      {setup.locked ? (
        <div className="tr-lock-callout">{setup.upgradeReason || 'Exact entry, stop and target - Platinum'}</div>
      ) : (
        <>
          <div className="tr-stat-grid">
            <div className="tr-stat-cell">
              <div className="tr-label mb-2">Entry</div>
              <div className="font-mono text-sm text-tr-white">{'entry' in setup && setup.entry ? setup.entry : 'Locked'}</div>
            </div>
            <div className="tr-stat-cell">
              <div className="tr-label mb-2">Stop</div>
              <div className="font-mono text-sm text-tr-white">{'stop' in setup && setup.stop ? setup.stop : 'Locked'}</div>
            </div>
            <div className="tr-stat-cell">
              <div className="tr-label mb-2">Target</div>
              <div className="font-mono text-sm text-tr-green">{'target' in setup && setup.target ? setup.target : 'Locked'}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-tr-border pt-3">
            <div>
              <div className="tr-label mb-2">Score</div>
              <span className="font-mono text-base font-bold text-tr-white">{setup.convictionScore}</span>
            </div>
            <div>
              <div className="tr-label mb-2">Bias</div>
              <span className="font-mono text-sm uppercase text-tr-white">{'bias' in setup && setup.bias ? setup.bias : 'Pending'}</span>
            </div>
            <div>
              <div className="tr-label mb-2">Time</div>
              <span className="font-mono text-sm text-tr-gray-light">
                {'realTimeTimestamp' in setup && setup.realTimeTimestamp
                  ? new Date(setup.realTimeTimestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                  : 'Delayed'}
              </span>
            </div>
          </div>
        </>
      )}

      {('fullWhyThisMatters' in setup && setup.fullWhyThisMatters) || ('partialWhyThisMatters' in setup && setup.partialWhyThisMatters) ? (
        <div className="border-t border-tr-border pt-3">
          <div className="tr-label mb-2">Why It Matters</div>
          <p className="text-sm leading-relaxed text-tr-gray-light">
            {'fullWhyThisMatters' in setup && setup.fullWhyThisMatters
              ? setup.fullWhyThisMatters
              : 'partialWhyThisMatters' in setup
                ? setup.partialWhyThisMatters
                : ''}
          </p>
        </div>
      ) : null}
    </div>
  );

  if (setup.locked) {
    return cardBody;
  }

  return <Link href={`/setups/${setup.id}`}>{cardBody}</Link>;
}
