'use client';

import type { UserTier } from '@/lib/mock-data';
import { getUpgradeMessage } from '@/lib/tier-access';
import Link from 'next/link';

interface LockedPreviewProps {
  userTier: UserTier;
  requiredTier: UserTier;
  children?: React.ReactNode;
  blurred?: boolean;
}

export default function LockedPreview({ userTier, requiredTier, children, blurred = true }: LockedPreviewProps) {
  return (
    <div className="relative">
      {blurred && <div className={`${blurred ? 'tr-locked' : ''}`}>{children}</div>}

      <div className="tr-locked-overlay">
        <div className="text-center space-y-3 px-6">
          <div className="text-tr-red text-sm font-mono uppercase tracking-wider">⚠ LOCKED</div>
          <div className="text-tr-white text-base max-w-xs">{getUpgradeMessage(userTier, requiredTier)}</div>
          <Link
            href="/membership"
            className="inline-block mt-4 px-6 py-2 bg-tr-red text-tr-black font-bold text-sm uppercase tracking-wider rounded hover:bg-opacity-90 transition-all"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
