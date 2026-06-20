'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserTier } from '@/lib/mock-data';
import { tierLabels } from '@/lib/tier-access';

interface TerminalShellProps {
  children: React.ReactNode;
  userTier: UserTier;
  currentSection: 'today' | 'setups' | 'market-desk' | 'academy' | 'briefings' | 'alerts' | 'membership' | 'profile';
}

export default function TerminalShell({ children, userTier, currentSection }: TerminalShellProps) {
  const [showMenu, setShowMenu] = useState(false);

  const sections = [
    { id: 'today', label: 'TODAY', href: '/' },
    { id: 'setups', label: 'SETUPS', href: '/setups' },
    { id: 'market-desk', label: 'MARKET DESK', href: '/market-desk' },
    { id: 'academy', label: 'ACADEMY', href: '/academy' },
    { id: 'briefings', label: 'BRIEFINGS', href: '/briefings' },
    { id: 'alerts', label: 'ALERTS', href: '/alerts' },
    { id: 'membership', label: 'MEMBERSHIP', href: '/membership' },
    { id: 'profile', label: 'PROFILE', href: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-tr-black text-tr-white tr-grid-bg">
      <div className="bg-tr-black border-b border-tr-gray-dark px-4 py-3 md:px-5 md:py-4">
        <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="text-tr-2xl font-bold tr-heading">TR</div>
            <div className="hidden sm:block">
              <div className="text-xs font-mono text-tr-gray-light uppercase tracking-wider">MARKET TERMINAL</div>
              <div className="text-xs font-mono text-tr-gray-light opacity-70">{tierLabels[userTier]}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="tr-badge tr-badge-neutral">{tierLabels[userTier]}</div>
            <button className="p-2 rounded border border-tr-gray-dark text-tr-gray-light hover:text-tr-white hover:border-tr-red">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 hover:bg-tr-gray-dark rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {showMenu && (
          <div className="md:hidden border-t border-tr-gray-dark mt-4 pt-4 space-y-2">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                onClick={() => setShowMenu(false)}
                className={`block text-xs font-mono uppercase tracking-wider py-2 px-3 rounded transition-colors ${
                  currentSection === section.id
                    ? 'bg-tr-gray-dark text-tr-red'
                    : 'text-tr-gray-light hover:bg-tr-gray-dark'
                }`}
              >
                {section.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex bg-tr-black border-b border-tr-gray-dark">
        <div className="flex overflow-x-auto w-full max-w-7xl mx-auto">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className={`text-[11px] font-mono uppercase tracking-[.25em] px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                currentSection === section.id
                  ? 'border-tr-red text-tr-red'
                  : 'border-transparent text-tr-gray-light hover:text-tr-white'
              }`}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
