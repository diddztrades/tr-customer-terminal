import TerminalShell from '@/components/TerminalShell';
import { getSafeBriefingsForUser } from '@/lib/entitlements/get-safe-briefings';
import { getMockServerUser } from '@/lib/entitlements/mock-session';

export default function BriefingsPage() {
  const user = getMockServerUser();
  const safeBriefings = getSafeBriefingsForUser();
  const dailyBriefings = safeBriefings.filter((b) => b.type === 'DAILY');
  const weeklyBriefings = safeBriefings.filter((b) => b.type === 'WEEKLY');

  const renderBriefing = (briefing: (typeof safeBriefings)[number], showYear = false) => (
    <div key={briefing.id} className="tr-card relative">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
        <div>
          <h3 className="text-lg font-bold mb-1">{briefing.title}</h3>
          <div className="text-xs text-tr-gray-light font-mono">
            {new Date(briefing.timestamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: showYear ? '2-digit' : undefined,
              hour: showYear ? undefined : '2-digit',
              minute: showYear ? undefined : '2-digit',
            })}
          </div>
        </div>
        <span className="text-xs font-mono uppercase tracking-wider text-tr-red">{briefing.type}</span>
      </div>

      <div className="space-y-3">
        <p className="text-sm md:text-base leading-relaxed text-tr-white">
          {'fullContent' in briefing && briefing.fullContent ? briefing.fullContent : briefing.publicNarrative}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="text-xs font-mono text-tr-gray-light mb-1">Market State</div>
            <div className="text-sm text-tr-white">{briefing.marketState}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-tr-gray-light mb-1">Threat</div>
            <div className="text-sm text-tr-white">{briefing.threatHeadline}</div>
          </div>
        </div>

        {'partialAnalysis' in briefing && briefing.partialAnalysis ? (
          <div className="border-t border-tr-gray-dark pt-4">
            <div className="text-xs font-mono text-tr-gray-light mb-2">Partial Analysis</div>
            <p className="text-sm text-tr-gray-light">{briefing.partialAnalysis}</p>
          </div>
        ) : null}

        {'tinoNotes' in briefing && briefing.tinoNotes ? (
          <div className="border-t border-tr-gray-dark pt-4">
            <div className="text-xs font-mono text-tr-gray-light mb-2">Tino's Notes</div>
            <p className="text-sm italic text-tr-white">{briefing.tinoNotes}</p>
          </div>
        ) : (
          <div className="border-t border-tr-gray-dark pt-4">
            <div className="text-xs font-mono uppercase tracking-wider text-tr-red">
              {briefing.upgradeReason || "Tino's execution notes available in Platinum."}
            </div>
          </div>
        )}

        {'eliteCommentary' in briefing && briefing.eliteCommentary ? (
          <div className="border-t border-tr-gray-dark pt-4">
            <div className="text-xs font-mono text-tr-gray-light mb-2">Elite Commentary</div>
            <p className="text-sm text-tr-white">{briefing.eliteCommentary}</p>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <TerminalShell userTier={user.tier} currentSection="briefings">
      <div className="p-4 md:p-8 space-y-8">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">BRIEFINGS</h1>
          <p className="text-tr-gray-light text-sm md:text-base">Daily and weekly market intelligence from Tino.</p>
        </div>

        {/* Daily Briefings */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Daily Briefing</h2>
          {dailyBriefings.map((briefing) => renderBriefing(briefing))}
        </div>

        {/* Weekly Briefings */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Weekly Review</h2>
          {weeklyBriefings.map((briefing) => renderBriefing(briefing, true))}
        </div>
      </div>
    </TerminalShell>
  );
}
