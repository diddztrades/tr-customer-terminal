'use client';

import TerminalShell from '@/components/TerminalShell';
import { mockUser } from '@/lib/mock-data';
import { getTodayBattlefield } from '@/lib/intelligence-engine';
import Link from 'next/link';

export default function TodayPage() {
  const battlefield = getTodayBattlefield();
  const { marketState, threat, opportunities, battlefield: bf, tinoRead, agents } = battlefield as any;

  const marketStateLabel = marketState.marketState;
  const marketStateConfidence = marketState.confidence;
  const threatLevel = threat.threatLevel;

  

  return (
    <TerminalShell userTier={mockUser.tier} currentSection="today">
      <div className="px-5 py-6 space-y-5">
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">TODAY'S BATTLEFIELD</h1>
          <p className="text-tr-gray-light text-sm uppercase tracking-[0.25em]">Know what matters before the session starts.</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="tr-card">
            <div className="text-sm font-mono text-tr-gray-light uppercase tracking-[0.25em] mb-2">Market State</div>
            <div className={`text-xl font-bold uppercase ${marketStateLabel === 'RISK_ON' ? 'text-green-400' : marketStateLabel === 'RISK_OFF' ? 'text-tr-red' : 'text-yellow-400'}`}>{marketStateLabel}</div>
            <div className="mt-2 text-sm text-tr-gray-light">Confidence {marketStateConfidence}%</div>
          </div>

          <div className="tr-card">
            <div className="text-sm font-mono text-tr-gray-light uppercase tracking-[0.25em] mb-2">Threat Level</div>
            <div className="text-xl font-bold uppercase text-tr-red">{threatLevel}</div>
            <div className="mt-2 text-sm text-tr-gray-light">Score {Math.round(threat.score)}</div>
          </div>

          <div className="tr-card">
            <div className="text-sm font-mono text-tr-gray-light uppercase tracking-[0.25em] mb-2">Best Opportunity</div>
            {bf.bestOpportunity ? (
              <>
                <div className="text-xl font-bold uppercase text-tr-red">{bf.bestOpportunity.asset}</div>
                <div className="mt-2 text-sm text-tr-gray-light">Op {bf.bestOpportunity.opportunityScore} • Conf {bf.bestOpportunity.confidenceScore} • Risk {bf.bestOpportunity.riskScore}</div>
              </>
            ) : (
              <div className="text-sm text-tr-gray-light">No clear opportunity</div>
            )}
          </div>

          <div className="tr-card">
            <div className="text-sm font-mono text-tr-gray-light uppercase tracking-[0.25em] mb-2">Agent Conviction</div>
            <div className={`text-xl font-bold uppercase ${agents.convictionScore >= 60 ? 'text-green-400' : agents.convictionScore <= 40 ? 'text-tr-red' : 'text-tr-gray-light'}`}>
              {agents.stance.replace('_', ' ')}
            </div>
            <div className="mt-2 text-sm text-tr-gray-light">Conviction {agents.convictionScore}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="tr-card">
            <div className="text-sm font-mono text-tr-gray-light uppercase tracking-[0.25em] mb-3">Tino's Read</div>
            <div className="text-sm text-tr-white leading-relaxed">{tinoRead.marketNarrative}</div>
            <div className="mt-3 text-sm text-tr-gray-light">Trap: {tinoRead.trap}</div>
            <div className="mt-2 text-sm text-tr-gray-light">What Matters: {tinoRead.whatMatters.join(' • ')}</div>
            <div className="mt-2 text-sm text-tr-gray-light">Stand Down: {tinoRead.standDownCondition}</div>
          </div>

          <div className="tr-card">
            <div className="text-sm font-mono text-tr-gray-light uppercase tracking-[0.25em] mb-3">Top Ranked Opportunities</div>
            <div className="space-y-3">
              {opportunities.sort((a: any, b: any) => b.opportunityScore - a.opportunityScore).slice(0, 6).map((o: any, i: number) => (
                <div key={o.asset} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold uppercase">{i + 1}. {o.asset}</div>
                    <div className="text-sm text-tr-gray-light">Op {o.opportunityScore} • Conf {o.confidenceScore}</div>
                  </div>
                  <div className={`text-sm font-bold uppercase ${o.status === 'READY' ? 'text-green-400' : o.status === 'AVOID' ? 'text-tr-red' : 'text-tr-gray-light'}`}>{o.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="tr-heading tr-heading-3">Latest Setup</h2>
            <Link href="/setups" className="text-sm font-mono text-tr-red hover:text-tr-red/80 uppercase tracking-wider">View All →</Link>
          </div>

          {/* Reuse previous teaser behavior by linking to /setups */}
          <div className="tr-card">
            <div className="text-sm font-mono text-tr-gray-light mb-2">Top Setup</div>
            {bf.bestOpportunity ? (
              <>
                <div className="text-lg font-bold">{bf.bestOpportunity.asset}</div>
                <div className="text-sm text-tr-gray-light">Status: {bf.bestOpportunity.status}</div>
              </>
            ) : (
              <div className="text-sm text-tr-gray-light">No top setup available</div>
            )}
            <div className="mt-3 text-sm">
              <Link href="/setups" className="text-sm font-mono text-tr-red hover:text-tr-red/80 uppercase tracking-wider">Unlock full execution →</Link>
            </div>
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}
