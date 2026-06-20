'use client';

import TerminalShell from '@/components/TerminalShell';
import { mockUser, mockAcademyLessons } from '@/lib/mock-data';
import { canAccessTier } from '@/lib/tier-access';
import Link from 'next/link';

export default function AcademyPage() {
  const tracks = ['START_HERE', 'CORE_PRINCIPLES', 'EXECUTION', 'PROFESSIONAL', 'SPECIALIST'];
  const trackLabels = {
    START_HERE: 'Start Here',
    CORE_PRINCIPLES: 'Core Principles',
    EXECUTION: 'Execution Track',
    PROFESSIONAL: 'Professional Track',
    SPECIALIST: 'Specialist Track',
  };

  return (
    <TerminalShell userTier={mockUser.tier} currentSection="academy">
      <div className="px-5 py-6 space-y-5">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">ACADEMY</h1>
          <p className="text-tr-gray-light text-base">Trader progression system: from fundamentals to elite mastery.</p>
        </div>

        {/* Track Overview */}
        {tracks.map((track) => {
          const lessons = mockAcademyLessons.filter((l) => l.track === track);

          return (
            <div key={track} className="space-y-3">
              <h2 className="tr-heading tr-heading-3">{trackLabels[track as keyof typeof trackLabels]}</h2>

              <div className="grid grid-cols-1 gap-3">
                {lessons.map((lesson) => {
                  const canAccess = canAccessTier(mockUser.tier, lesson.tierRequired);

                  return (
                    <div key={lesson.id} className={`tr-card ${canAccess ? '' : 'opacity-60 border-tr-gray-dark'}`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-bold mb-1">{lesson.title}</h3>
                          <p className="text-sm text-tr-gray-light mb-3">{lesson.description}</p>

                          <div className="flex flex-wrap gap-3">
                            <div className="text-sm">
                              <span className="font-mono text-tr-gray-light">Duration:</span>
                              <span className="ml-2 text-tr-white">{lesson.duration} min</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-mono text-tr-gray-light">Requires:</span>
                              <span className="ml-2 text-tr-red font-bold uppercase">{lesson.tierRequired}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 items-end">
                          {/* Progress Bar */}
                          {canAccess && (
                            <>
                              <div className="text-sm text-tr-gray-light">{lesson.progress}% Complete</div>
                              <div className="w-24 h-2 bg-tr-gray-dark rounded overflow-hidden">
                                <div
                                  className="h-full bg-tr-red transition-all"
                                  style={{ width: `${lesson.progress}%` }}
                                ></div>
                              </div>
                            </>
                          )}

                          {canAccess && !lesson.locked ? (
                            <Link
                              href={`/academy/${lesson.id}`}
                              className="text-sm font-mono uppercase tracking-wider text-tr-red hover:text-tr-red/80 mt-2 md:mt-0"
                            >
                              Start →
                            </Link>
                          ) : canAccess && lesson.locked ? (
                            <button disabled className="text-sm font-mono uppercase tracking-wider text-tr-gray-light opacity-50 mt-2 md:mt-0">
                              Locked
                            </button>
                          ) : (
                            <span className="text-sm font-mono uppercase tracking-wider text-tr-red">Upgrade</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Upgrade CTA */}
        {!canAccessTier(mockUser.tier, 'platinum') && (
          <div className="tr-card tr-accent-border">
            <div className="space-y-3">
              <h3 className="font-bold text-tr-red">Unlock Full Academy</h3>
              <p className="text-sm text-tr-gray-light">
                Platinum members access all tracks, including Execution, Professional, and Specialist advanced training.
              </p>
              <Link href="/membership" className="inline-block text-sm font-mono text-tr-red hover:text-tr-red/80 uppercase tracking-wider">
                View Plans →
              </Link>
            </div>
          </div>
        )}
      </div>
    </TerminalShell>
  );
}
