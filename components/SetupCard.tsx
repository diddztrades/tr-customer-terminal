'use client';

import { Setup, UserTier } from '@/lib/mock-data';
import { canAccessTier, getDelayForTier } from '@/lib/tier-access';
import LockedPreview from './LockedPreview';
import Link from 'next/link';

interface SetupCardProps {
  setup: Setup;
  userTier: UserTier;
  showDelay?: boolean;
}

export default function SetupCard({ setup, userTier, showDelay = false }: SetupCardProps) {
  const canAccess = canAccessTier(userTier, setup.tierRequired);
  const delay = showDelay ? getDelayForTier(userTier, setup.tierRequired, setup.delayMinutes) : 0;

  const directionColor = setup.direction === 'LONG' ? 'text-green-400' : 'text-tr-red';
  const riskColor = {
    LOW: 'bg-green-400/10 text-green-400 border-green-400',
    NORMAL: 'bg-blue-400/10 text-blue-400 border-blue-400',
    ELEVATED: 'bg-yellow-400/10 text-yellow-400 border-yellow-400',
    CRITICAL: 'bg-tr-red/10 text-tr-red border-tr-red',
  };

  const confidenceColor = {
    HIGH: 'bg-green-400/10 text-green-400',
    MEDIUM: 'bg-yellow-400/10 text-yellow-400',
    LOW: 'bg-gray-500/10 text-gray-400',
  };

  if (!canAccess && delay > 0) {
    return (
      <div className="tr-card relative">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Asset</div>
              <div className="text-lg font-bold text-tr-red">{setup.asset}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Direction</div>
              <div className={`text-lg font-bold uppercase ${directionColor}`}>{setup.direction}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Status</div>
              <div className="text-sm uppercase text-blue-400">Delayed Setup</div>
            </div>
          </div>

          <div className="py-3 border-t border-tr-gray-dark">
            <div className="text-xs text-tr-gray-light mb-2">This setup will be available in {delay} minutes</div>
            <div className="h-2 bg-tr-gray-dark rounded overflow-hidden">
              <div className="h-full bg-tr-red" style={{ width: `${(delay / setup.delayMinutes) * 100}%` }}></div>
            </div>
          </div>

          <div className="pt-3 border-t border-tr-gray-dark">
            <LockedPreview userTier={userTier} requiredTier={setup.tierRequired} blurred={false} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/setups/${setup.id}`}>
      <div className="tr-card cursor-pointer hover:bg-tr-gray-dark transition-all">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg md:text-2xl font-bold text-tr-red mb-1">{setup.asset}</div>
              <div className="text-xs font-mono text-tr-gray-light">{setup.assetClass}</div>
            </div>
            <div className={`tr-badge ${riskColor[setup.riskFlag]}`}>{setup.riskFlag}</div>
          </div>

          {/* Direction & Setup Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Direction</div>
              <div className={`text-sm md:text-base font-bold uppercase ${directionColor}`}>{setup.direction}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Type</div>
              <div className="text-sm md:text-base font-bold uppercase">{setup.setupType}</div>
            </div>
          </div>

          {/* Entry & Target */}
          <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-tr-gray-dark">
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Entry</div>
              <div className="font-mono text-sm md:text-base">{setup.entry}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Target</div>
              <div className="font-mono text-sm md:text-base text-green-400">{setup.target}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Confidence</div>
              <span className={`tr-badge ${confidenceColor[setup.confidence]}`}>{setup.confidence}</span>
            </div>
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Bias</div>
              <div className="text-xs font-mono uppercase">{setup.bias}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-1">Time</div>
              <div className="text-xs font-mono">{setup.issuedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>

          {/* Why It Matters */}
          {canAccess && (
            <div className="pt-3 border-t border-tr-gray-dark">
              <div className="text-xs font-mono text-tr-gray-light mb-2">Why It Matters</div>
              <p className="text-xs md:text-sm text-tr-gray-light line-clamp-2">{setup.whyItMatters}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
