'use client';

import TerminalShell from '@/components/TerminalShell';
import { mockUser, mockAcademyLessons } from '@/lib/mock-data';
import { tierLabels } from '@/lib/tier-access';
import Link from 'next/link';

export default function ProfilePage() {
  const completedCount = mockUser.academyProgress.completedLessons.length;
  const totalLessons = mockAcademyLessons.length;
  const progressPercent = (completedCount / totalLessons) * 100;

  return (
    <TerminalShell userTier={mockUser.tier} currentSection="profile">
      <div className="p-4 md:p-8 space-y-8">
        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="tr-heading tr-heading-1">PROFILE</h1>
          <p className="text-tr-gray-light text-sm md:text-base">Your account, learning progress, and preferences.</p>
        </div>

        {/* User Info Card */}
        <div className="tr-card tr-accent-border">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-2">Username</div>
              <div className="text-lg font-bold">{mockUser.name}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-2">Member Since</div>
              <div className="text-lg font-bold">
                {mockUser.joinedAt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-tr-gray-light mb-2">Account Status</div>
              <div className="text-lg font-bold text-green-400">Active</div>
            </div>
          </div>
        </div>

        {/* Membership Status */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Membership</h2>

          <div className="tr-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl text-tr-red mb-1">{mockUser.tier.toUpperCase()}</h3>
                <p className="text-sm text-tr-gray-light">{tierLabels[mockUser.tier]}</p>
              </div>
              <Link href="/membership" className="text-xs font-mono text-tr-red hover:text-tr-red/80 uppercase tracking-wider">
                Change Plan →
              </Link>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-tr-gray-light">Status:</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tr-gray-light">Next Renewal:</span>
                <span>
                  {new Date(Date.now() + 30 * 86400000).toLocaleString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Learning Progress</h2>

          <div className="tr-card">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-mono">Overall Progress</span>
                <span className="text-sm font-mono text-tr-red">{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-3 bg-tr-gray-dark rounded overflow-hidden">
                <div className="h-full bg-tr-red transition-all" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{completedCount}</div>
                <div className="text-xs text-tr-gray-light mt-1">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">{totalLessons - completedCount}</div>
                <div className="text-xs text-tr-gray-light mt-1">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-tr-white">{totalLessons}</div>
                <div className="text-xs text-tr-gray-light mt-1">Total</div>
              </div>
            </div>
          </div>

          <div className="tr-card">
            <h3 className="font-bold mb-3">Current Track</h3>
            <p className="text-sm text-tr-gray-light mb-3">
              Track: <span className="text-tr-white font-mono">{mockUser.academyProgress.currentTrack}</span>
            </p>
            <Link href="/academy" className="text-xs font-mono text-tr-red hover:text-tr-red/80 uppercase tracking-wider">
              Continue Learning →
            </Link>
          </div>
        </div>

        {/* Alert Preferences */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Alert Preferences</h2>

          <div className="tr-card">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-tr-gray-dark">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Push Notifications</span>
                </label>
                <span className="text-xs text-green-400">Enabled</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-tr-gray-dark">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Email Notifications</span>
                </label>
                <span className="text-xs text-green-400">Enabled</span>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Real-time Setup Alerts</span>
                </label>
                <span className="text-xs text-green-400">Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Services */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Connected Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="tr-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Discord</h3>
                  <p className="text-xs text-tr-gray-light">
                    {mockUser.tier === 'bronze' ? 'Community preview' : 'Connected'}
                  </p>
                </div>
                <span className={`text-xs font-mono uppercase ${mockUser.tier === 'bronze' ? 'text-tr-gray-light' : 'text-green-400'}`}>
                  {mockUser.tier === 'bronze' ? 'Upgrade' : 'Connected'}
                </span>
              </div>
            </div>

            <div className="tr-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Email</h3>
                  <p className="text-xs text-tr-gray-light">Updates and briefings</p>
                </div>
                <span className="text-xs font-mono uppercase text-green-400">Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="space-y-3">
          <h2 className="tr-heading tr-heading-3">Account</h2>

          <div className="tr-card bg-tr-black/50 border-tr-gray-dark space-y-3">
            <button className="text-xs font-mono text-tr-white hover:text-tr-red uppercase tracking-wider">
              Change Password →
            </button>
            <div className="border-t border-tr-gray-dark pt-3">
              <button className="text-xs font-mono text-tr-gray-light hover:text-tr-white uppercase tracking-wider">
                Privacy Settings →
              </button>
            </div>
            <div className="border-t border-tr-gray-dark pt-3">
              <button className="text-xs font-mono text-tr-gray-light hover:text-tr-red uppercase tracking-wider">
                Sign Out →
              </button>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="tr-card tr-accent-border">
          <h3 className="font-bold mb-2">Need Help?</h3>
          <p className="text-sm text-tr-gray-light mb-3">
            Contact our support team or access documentation for any questions about your account.
          </p>
          <Link href="#" className="text-xs font-mono text-tr-red hover:text-tr-red/80 uppercase tracking-wider">
            Support Center →
          </Link>
        </div>
      </div>
    </TerminalShell>
  );
}
