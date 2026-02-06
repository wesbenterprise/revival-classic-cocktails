'use client';

import Link from 'next/link';

// Demo data — will be replaced with Supabase queries
const stats = [
  { label: 'Menu Items', value: 24, href: '/admin/menu', color: '#C8A050' },
  { label: 'Unread Messages', value: 3, href: '/admin/submissions', color: '#4ADE80' },
  { label: 'Team Members', value: 7, href: '/admin/team', color: '#60A5FA' },
  { label: 'Gallery Photos', value: 0, href: '/admin/gallery', color: '#A78BFA' },
];

const tonightPreview = {
  type: 'recurring' as const,
  title: 'Whiskey Wednesday',
  description: '$2 off all bourbon pours. Because midweek deserves something warm.',
};

const recentSubmissions = [
  { id: '1', name: 'Sarah Mitchell', category: 'Private Events', time: '2 hours ago', is_read: false },
  { id: '2', name: 'Mike Torres', category: 'Employment', time: '5 hours ago', is_read: false },
  { id: '3', name: 'Lakeland Ledger', category: 'Press', time: '1 day ago', is_read: false },
  { id: '4', name: 'Jake Rivera', category: 'Feedback', time: '2 days ago', is_read: true },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-[#888] mt-1">Welcome back. Here&apos;s what&apos;s happening at Revival.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-[#1A1A1A] border border-[#222] rounded-xl p-4 hover:border-[#333] transition-colors group"
          >
            <p className="text-xs text-[#888] uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-semibold text-white mt-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tonight Preview */}
        <div className="bg-[#1A1A1A] border border-[#222] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#222] flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">Tonight at Revival</h2>
            <Link href="/admin/schedule" className="text-xs text-[#C8A050] hover:underline">
              Edit →
            </Link>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#C8A050] mt-2 shrink-0" />
              <div>
                <p className="text-xs text-[#C8A050] uppercase tracking-wider mb-1">
                  {tonightPreview.type === 'recurring' ? 'Weekly Special' : 'One-Off Event'}
                </p>
                <p className="text-lg font-semibold text-white">{tonightPreview.title}</p>
                <p className="text-sm text-[#999] mt-1">{tonightPreview.description}</p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-[#222]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4ADE80]" />
                </span>
                <span className="text-sm text-[#4ADE80]">Open Now</span>
                <span className="text-sm text-[#666] ml-1">· Closes at 12:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-[#1A1A1A] border border-[#222] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#222] flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">
              Recent Submissions
              <span className="ml-2 bg-[#C8A050] text-[#0A0A0A] text-xs font-bold px-2 py-0.5 rounded-full">3 new</span>
            </h2>
            <Link href="/admin/submissions" className="text-xs text-[#C8A050] hover:underline">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-[#222]">
            {recentSubmissions.map((sub) => (
              <Link
                key={sub.id}
                href="/admin/submissions"
                className="flex items-center gap-3 px-5 py-3 hover:bg-[#222]/50 transition-colors"
              >
                {!sub.is_read && <span className="w-2 h-2 rounded-full bg-[#C8A050] shrink-0" />}
                {sub.is_read && <span className="w-2 h-2 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${sub.is_read ? 'text-[#888]' : 'text-white font-medium'}`}>
                    {sub.name}
                  </p>
                  <p className="text-xs text-[#666]">{sub.category}</p>
                </div>
                <span className="text-xs text-[#555] shrink-0">{sub.time}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-medium text-[#888] uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Add Menu Item', href: '/admin/menu', icon: '+' },
            { label: 'Add Event', href: '/admin/schedule', icon: '📅' },
            { label: 'Upload Photos', href: '/admin/gallery', icon: '📷' },
            { label: 'Edit Hours', href: '/admin/settings', icon: '⏰' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 bg-[#1A1A1A] border border-[#222] rounded-xl px-4 py-3 hover:border-[#C8A050]/30 hover:bg-[#C8A050]/5 transition-colors"
            >
              <span className="text-lg">{action.icon}</span>
              <span className="text-sm text-[#ccc]">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
