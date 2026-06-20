'use client';

import TerminalShell from '@/components/TerminalShell';
import { mockUser, mockBriefings } from '@/lib/mock-data';
import { canAccessTier } from '@/lib/tier-access';
import LockedPreview from '@/components/LockedPreview';

export default function BriefingsPage() {
  const dailyBriefings = mockBriefings.filter((b) => b.type === 'DAILY');
  const weeklyBriefings = mockBriefings.filter((b) => b.type === 'WEEKLY');

  return (
    <TerminalShell userTier={mockUser.tier} currentSection="briefings">
      <div className="p-4 md:p-8 space-y-8">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">BRIEFINGS</h1>
          <p className="text-tr-gray-light text-sm md:text-base">Daily and weekly market intelligence from Tino.</p>
        </div>

        {/* Daily Briefings */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Daily Briefing</h2>

          {dailyBriefings.map((briefing) => {
            const canAccess = canAccessTier(mockUser.tier, briefing.tierRequired);

            return (
              <div key={briefing.id} className={`tr-card ${canAccess ? '' : 'relative'}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{briefing.title}</h3>
                    <div className="text-xs text-tr-gray-light font-mono">
                      {briefing.timestamp.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-tr-red">{briefing.type}</span>
                </div>

                {canAccess ? (
                  <>
                    <p className="text-sm md:text-base leading-relaxed mb-4 text-tr-white">{briefing.content}</p>

                    <div className="border-t border-tr-gray-dark pt-4">
                      <div className="text-xs font-mono text-tr-gray-light mb-2">Tino's Notes</div>
                      <p className="text-sm italic text-tr-white">{briefing.tinoNotes}</p>
                    </div>

                    {briefing.pdfUrl && (
                      <div className="mt-4 flex gap-2">
                        <a
                          href={briefing.pdfUrl}
                          className="text-xs font-mono text-tr-red hover:text-tr-red/80 uppercase tracking-wider"
                        >
                          Download PDF →
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-4">
                    <LockedPreview userTier={mockUser.tier} requiredTier={briefing.tierRequired} blurred={false} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Weekly Briefings */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Weekly Review</h2>

          {weeklyBriefings.map((briefing) => {
            const canAccess = canAccessTier(mockUser.tier, briefing.tierRequired);

            return (
              <div key={briefing.id} className={`tr-card ${canAccess ? '' : 'relative'}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{briefing.title}</h3>
                    <div className="text-xs text-tr-gray-light font-mono">
                      {briefing.timestamp.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: '2-digit',
                      })}
                    </div>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-tr-red">{briefing.type}</span>
                </div>

                {canAccess ? (
                  <>
                    <p className="text-sm md:text-base leading-relaxed mb-4 text-tr-white">{briefing.content}</p>

                    <div className="border-t border-tr-gray-dark pt-4">
                      <div className="text-xs font-mono text-tr-gray-light mb-2">Tino's Notes</div>
                      <p className="text-sm italic text-tr-white">{briefing.tinoNotes}</p>
                    </div>
                  </>
                ) : (
                  <div className="py-4">
                    <LockedPreview userTier={mockUser.tier} requiredTier={briefing.tierRequired} blurred={false} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </TerminalShell>
  );
}
