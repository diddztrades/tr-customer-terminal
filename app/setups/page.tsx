'use client';

import TerminalShell from '@/components/TerminalShell';
import SetupCard from '@/components/SetupCard';
import { mockUser, mockSetups } from '@/lib/mock-data';
import { useState } from 'react';

export default function SetupsPage() {
  const [filterDirection, setFilterDirection] = useState<string | null>(null);
  const [filterAssetClass, setFilterAssetClass] = useState<string | null>(null);

  let filteredSetups = mockSetups;

  if (filterDirection) {
    filteredSetups = filteredSetups.filter((s) => s.direction === filterDirection);
  }

  if (filterAssetClass) {
    filteredSetups = filteredSetups.filter((s) => s.assetClass === filterAssetClass);
  }

  const assetClasses = Array.from(new Set(mockSetups.map((s) => s.assetClass)));
  const directions = ['LONG', 'SHORT'];

  return (
    <TerminalShell userTier={mockUser.tier} currentSection="setups">
      <div className="p-4 md:p-8 space-y-8">
        {/* Page Title */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="tr-heading tr-heading-1">SETUPS</h1>
            <p className="text-tr-gray-light text-sm md:text-base">Market-ready trade setup cards with full execution context.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Direction Filter */}
            <div className="flex gap-2">
              {directions.map((dir) => (
                <button
                  key={dir}
                  onClick={() => setFilterDirection(filterDirection === dir ? null : dir)}
                  className={`text-xs font-mono px-3 py-2 rounded uppercase tracking-wider border transition-colors ${
                    filterDirection === dir
                      ? 'bg-tr-red text-tr-black border-tr-red'
                      : 'bg-transparent border-tr-gray-dark text-tr-gray-light hover:text-tr-white'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>

            {/* Asset Class Filter */}
            <div className="flex gap-2">
              {assetClasses.map((assetClass) => (
                <button
                  key={assetClass}
                  onClick={() => setFilterAssetClass(filterAssetClass === assetClass ? null : assetClass)}
                  className={`text-xs font-mono px-3 py-2 rounded uppercase tracking-wider border transition-colors ${
                    filterAssetClass === assetClass
                      ? 'bg-tr-red text-tr-black border-tr-red'
                      : 'bg-transparent border-tr-gray-dark text-tr-gray-light hover:text-tr-white'
                  }`}
                >
                  {assetClass}
                </button>
              ))}
            </div>

            {/* Reset */}
            {(filterDirection || filterAssetClass) && (
              <button
                onClick={() => {
                  setFilterDirection(null);
                  setFilterAssetClass(null);
                }}
                className="text-xs font-mono px-3 py-2 rounded uppercase tracking-wider border border-tr-gray-dark text-tr-gray-light hover:text-tr-white"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Setups Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredSetups.length > 0 ? (
            filteredSetups.map((setup) => <SetupCard key={setup.id} setup={setup} userTier={mockUser.tier} showDelay={true} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-tr-gray-light">No setups match your filters.</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="tr-card bg-tr-black/50 border-tr-gray-dark">
          <p className="text-xs md:text-sm text-tr-gray-light">
            <span className="text-tr-red font-bold">Bronze</span> members see setup teasers.{' '}
            <span className="text-tr-red font-bold">Gold</span> members see full setups with delay.{' '}
            <span className="text-tr-red font-bold">Platinum+</span> receive real-time alerts and execution notes.
          </p>
        </div>
      </div>
    </TerminalShell>
  );
}
