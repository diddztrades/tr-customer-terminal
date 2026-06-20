import TerminalShell from '@/components/TerminalShell';
import SetupCard from '@/components/SetupCard';
import { getSafeSetupsForUser } from '@/lib/entitlements/get-safe-setups';
import { getMockServerUser } from '@/lib/entitlements/mock-session';
import type { SetupDirection } from '@/lib/mock-data';

interface SetupsPageProps {
  searchParams?: {
    direction?: SetupDirection;
  };
}

const directions: SetupDirection[] = ['LONG', 'SHORT'];

export default function SetupsPage({ searchParams }: SetupsPageProps) {
  const user = getMockServerUser();
  const safeSetups = getSafeSetupsForUser();
  const filterDirection = directions.includes(searchParams?.direction as SetupDirection) ? searchParams?.direction : undefined;

  let filteredSetups = safeSetups;

  if (filterDirection) {
    filteredSetups = filteredSetups.filter((s) => s.direction === filterDirection);
  }

  return (
    <TerminalShell userTier={user.tier} currentSection="setups">
      <div className="px-5 py-6 space-y-5">
        {/* Page Title */}
        <div className="space-y-3">
          <div className="space-y-2">
            <h1 className="tr-heading tr-heading-1">SETUPS</h1>
            <p className="text-tr-gray-light text-base">Market-ready trade setup cards with full execution context.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Direction Filter */}
            <div className="flex gap-2">
              {directions.map((dir) => (
                <a
                  key={dir}
                  href={filterDirection === dir ? '/setups' : `/setups?direction=${dir}`}
                  className={`text-sm font-mono px-3 py-2 rounded uppercase tracking-wider border transition-colors ${
                    filterDirection === dir
                      ? 'bg-tr-red text-tr-black border-tr-red'
                      : 'bg-transparent border-tr-gray-dark text-tr-gray-light hover:text-tr-white'
                  }`}
                >
                  {dir}
                </a>
              ))}
            </div>

            {/* Reset */}
            {filterDirection && (
              <a
                href="/setups"
                className="text-sm font-mono px-3 py-2 rounded uppercase tracking-wider border border-tr-gray-dark text-tr-gray-light hover:text-tr-white"
              >
                Reset
              </a>
            )}
          </div>
        </div>

        {/* Setups Grid */}
        <div className="grid grid-cols-1 gap-3">
          {filteredSetups.length > 0 ? (
            filteredSetups.map((setup) => <SetupCard key={setup.id} setup={setup} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-tr-gray-light">No setups match your filters.</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="tr-card bg-tr-black/50 border-tr-gray-dark">
          <p className="text-sm text-tr-gray-light">
            <span className="text-tr-red font-bold">Bronze</span> members see setup teasers.{' '}
            <span className="text-tr-red font-bold">Gold</span> members see full setups with delay.{' '}
            <span className="text-tr-red font-bold">Platinum+</span> receive real-time alerts and execution notes.
          </p>
        </div>
      </div>
    </TerminalShell>
  );
}
