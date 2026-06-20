'use client';

import Link from 'next/link';
import type { UserTier } from '@/lib/mock-data';
import { tierLabels } from '@/lib/tier-access';

interface TerminalShellProps {
  children: React.ReactNode;
  userTier: UserTier;
  currentSection: 'today' | 'setups' | 'market-desk' | 'academy' | 'briefings' | 'alerts' | 'membership' | 'profile';
}

export default function TerminalShell({ children, userTier, currentSection }: TerminalShellProps) {
  const sections = [
    { id: 'today', label: 'TODAY', href: '/' },
    { id: 'setups', label: 'SETUPS', href: '/setups' },
    { id: 'market-desk', label: 'DESK', href: '/market-desk' },
    { id: 'academy', label: 'ACADEMY', href: '/academy' },
    { id: 'briefings', label: 'BRIEFINGS', href: '/briefings' },
    { id: 'alerts', label: 'ALERTS', href: '/alerts' },
    { id: 'membership', label: 'MEMBER', href: '/membership' },
    { id: 'profile', label: 'PROFILE', href: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-tr-black text-tr-white tr-grid-bg">
      <div className="mx-auto min-h-screen w-[100vw] max-w-[440px] overflow-hidden border-x border-tr-gray-dark/70 bg-tr-black/95 shadow-2xl shadow-black">
        <header className="sticky top-0 z-40 border-b border-tr-gray-dark bg-tr-black/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="tr-heading text-[26px] leading-none text-tr-red">TR</div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-tr-white">Market Terminal</div>
              <div className="mt-0.5 text-sm text-tr-gray-light">{tierLabels[userTier]}</div>
            </div>

            <div className="text-right">
              <div className="tr-badge tr-badge-neutral">{userTier}</div>
              <button className="mt-2 flex h-9 w-9 items-center justify-center rounded border border-tr-gray-dark text-tr-gray-light hover:border-tr-red hover:text-tr-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="pb-36">{children}</main>

        <nav className="fixed bottom-0 left-1/2 z-50 w-[100vw] max-w-[440px] -translate-x-1/2 border-t border-tr-gray-dark bg-[#080808]/95 px-3 py-3 backdrop-blur">
          <div className="grid grid-cols-4 gap-2">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                className={`flex h-11 items-center justify-center rounded border text-[11px] font-mono uppercase tracking-[0.08em] transition-colors ${
                  currentSection === section.id
                    ? 'border-tr-red bg-tr-red text-tr-black'
                    : 'border-tr-gray-dark bg-[#121212] text-tr-gray-light hover:border-tr-red hover:text-tr-white'
                }`}
              >
                {section.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
