'use client';

import type { SafeSetup } from '@/lib/entitlements/entitlement-types';
import Link from 'next/link';

interface SetupCardProps {
  setup: SafeSetup;
}

export default function SetupCard({ setup }: SetupCardProps) {
  const directionColor = setup.direction === 'LONG' ? 'text-green-400' : 'text-tr-red';
  const riskColor = {
    LOW: 'bg-green-400/10 text-green-400 border-green-400',
    NORMAL: 'bg-blue-400/10 text-blue-400 border-blue-400',
    ELEVATED: 'bg-yellow-400/10 text-yellow-400 border-yellow-400',
    CRITICAL: 'bg-tr-red/10 text-tr-red border-tr-red',
  };

  if (setup.locked) {
    return (
      <div className="tr-card relative">
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Asset</div>
              <div className="text-lg font-bold text-tr-red">{setup.asset}</div>
            </div>
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Direction</div>
              <div className={`text-lg font-bold uppercase ${directionColor}`}>{setup.direction}</div>
            </div>
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Status</div>
              <div className="text-sm uppercase text-blue-400">{setup.status}</div>
            </div>
          </div>

          <div className="py-3 border-t border-tr-gray-dark">
            <div className="text-sm text-tr-white mb-2">{setup.publicSummary}</div>
            <div className="text-sm text-tr-gray-light">{setup.thesis}</div>
          </div>

          <div className="pt-3 border-t border-tr-gray-dark">
            <div className="text-sm font-mono uppercase tracking-wider text-tr-red">
              {setup.upgradeReason || 'Exact entry, stop & target — Platinum'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/setups/${setup.id}`}>
      <div className="tr-card cursor-pointer hover:bg-tr-gray-dark transition-all">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-bold text-tr-red mb-1">{setup.asset}</div>
              <div className="text-sm font-mono text-tr-gray-light">{setup.publicSummary}</div>
            </div>
            {'riskFlag' in setup && setup.riskFlag ? (
              <div className={`tr-badge ${riskColor[setup.riskFlag]}`}>{setup.riskFlag}</div>
            ) : (
              <div className="tr-badge tr-badge-neutral">{setup.status}</div>
            )}
          </div>

          {/* Direction & Setup Type */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Direction</div>
              <div className={`text-base font-bold uppercase ${directionColor}`}>{setup.direction}</div>
            </div>
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Type</div>
              <div className="text-base font-bold uppercase">{setup.setupType}</div>
            </div>
          </div>

          {/* Entry & Target */}
          <div className="grid grid-cols-1 gap-3 py-3 border-t border-b border-tr-gray-dark">
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Entry</div>
              <div className="font-mono text-base">{'entry' in setup && setup.entry ? setup.entry : 'Locked'}</div>
            </div>
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Stop</div>
              <div className="font-mono text-base">{'stop' in setup && setup.stop ? setup.stop : 'Locked'}</div>
            </div>
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Target</div>
              <div className="font-mono text-base text-green-400">{'target' in setup && setup.target ? setup.target : 'Locked'}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Confidence</div>
              <span className="tr-badge tr-badge-neutral">{setup.convictionScore}</span>
            </div>
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Bias</div>
              <div className="text-sm font-mono uppercase">{'bias' in setup && setup.bias ? setup.bias : 'Pending'}</div>
            </div>
            <div>
              <div className="text-sm font-mono text-tr-gray-light mb-1">Time</div>
              <div className="text-sm font-mono">
                {'realTimeTimestamp' in setup && setup.realTimeTimestamp
                  ? new Date(setup.realTimeTimestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                  : 'Delayed'}
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          {('fullWhyThisMatters' in setup && setup.fullWhyThisMatters) || ('partialWhyThisMatters' in setup && setup.partialWhyThisMatters) ? (
            <div className="pt-3 border-t border-tr-gray-dark">
              <div className="text-sm font-mono text-tr-gray-light mb-2">Why It Matters</div>
              <p className="text-sm text-tr-gray-light line-clamp-2">
                {'fullWhyThisMatters' in setup && setup.fullWhyThisMatters
                  ? setup.fullWhyThisMatters
                  : 'partialWhyThisMatters' in setup
                    ? setup.partialWhyThisMatters
                    : ''}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
