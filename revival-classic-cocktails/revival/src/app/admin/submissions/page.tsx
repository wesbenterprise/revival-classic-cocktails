'use client';

import { useState } from 'react';

type SubmissionCategory = 'all' | 'general' | 'private_events' | 'catering' | 'press' | 'employment' | 'vendor' | 'feedback';

interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
  event_type?: string;
  event_date?: string;
  guest_count?: string;
  budget_range?: string;
  resume_filename?: string;
}

const categoryLabels: Record<string, string> = {
  all: 'All',
  general: 'General',
  private_events: 'Private Events',
  catering: 'Catering',
  press: 'Press',
  employment: 'Employment',
  vendor: 'Vendor',
  feedback: 'Feedback',
};

const categoryColors: Record<string, string> = {
  general: '#60A5FA',
  private_events: '#C8A050',
  catering: '#F472B6',
  press: '#A78BFA',
  employment: '#4ADE80',
  vendor: '#FB923C',
  feedback: '#6EE7B7',
};

const demoSubmissions: Submission[] = [
  {
    id: '1', name: 'Sarah Mitchell', email: 'sarah@email.com', phone: '(863) 555-0142',
    category: 'private_events', message: 'Hi! I\'d love to book Revival for my husband\'s 40th birthday. We\'re looking at a Saturday night in March, probably 20-25 guests. We\'d want full cocktail service and maybe some small bites. Budget is flexible but thinking $3-5k range. Can we set up a call?',
    is_read: false, is_archived: false, created_at: '2026-02-06T14:30:00Z',
    event_type: 'Birthday Party', event_date: '2026-03-14', guest_count: '20-30', budget_range: '$3,000 - $5,000',
  },
  {
    id: '2', name: 'Mike Torres', email: 'mike.t@gmail.com', phone: '(863) 555-0198',
    category: 'employment', message: 'I have 3 years of bartending experience at craft cocktail bars in Tampa (Ciro\'s and The Mandarin Hide). I\'m relocating to Lakeland next month and would love to be part of the Revival team. I\'m passionate about classic cocktails and have competition experience.',
    is_read: false, is_archived: false, created_at: '2026-02-06T11:15:00Z',
    resume_filename: 'Mike_Torres_Resume.pdf',
  },
  {
    id: '3', name: 'Jessica Chang', email: 'jchang@lakelandledger.com',
    category: 'press', message: 'I\'m writing a feature on Lakeland\'s evolving downtown scene for the Ledger\'s weekend edition. Would love to include Revival — could we arrange a brief interview with the owner this week? Happy to work around your schedule.',
    is_read: false, is_archived: false, created_at: '2026-02-05T16:00:00Z',
  },
  {
    id: '4', name: 'Jake Rivera', email: 'jake@email.com',
    category: 'feedback', message: 'Came in last Saturday for the first time and had an incredible experience. The Gatsby was one of the best cocktails I\'ve ever had. Your staff was incredibly knowledgeable and welcoming. Will definitely be back!',
    is_read: true, is_archived: false, created_at: '2026-02-04T20:45:00Z',
  },
  {
    id: '5', name: 'Tom Walsh', email: 'tom@craftspirits.com', phone: '(407) 555-0231',
    category: 'vendor', message: 'We distribute small-batch spirits from Florida distilleries and think our portfolio would be a great fit for Revival. Would you be open to a quick tasting session? No pressure — just want to get our products in front of the right bars.',
    is_read: true, is_archived: false, created_at: '2026-02-03T09:30:00Z',
  },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState(demoSubmissions);
  const [filter, setFilter] = useState<SubmissionCategory>('all');
  const [showArchived, setShowArchived] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = submissions.filter((s) => {
    if (s.is_archived !== showArchived) return false;
    if (filter === 'all') return true;
    return s.category === filter;
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const unreadCount = submissions.filter((s) => !s.is_read && !s.is_archived).length;

  const toggleRead = (id: string) => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, is_read: !s.is_read } : s));
  };

  const toggleArchive = (id: string) => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, is_archived: !s.is_archived } : s));
  };

  const expand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    // Auto-mark as read
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, is_read: true } : s));
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Submissions
            {unreadCount > 0 && (
              <span className="ml-2 bg-[#C8A050] text-[#0A0A0A] text-xs font-bold px-2 py-0.5 rounded-full align-middle">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-sm text-[#888] mt-1">{submissions.filter((s) => !s.is_archived).length} total messages</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-3 scrollbar-hide">
        {(Object.keys(categoryLabels) as SubmissionCategory[]).map((cat) => {
          const count = submissions.filter((s) => !s.is_archived && (cat === 'all' || s.category === cat)).length;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 px-3 py-2 rounded-lg text-sm transition-colors ${
                filter === cat ? 'bg-[#C8A050]/15 text-[#C8A050] font-medium' : 'text-[#888] hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              {categoryLabels[cat]}
              <span className="ml-1 text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Active/Archived */}
      <div className="flex gap-4 mb-4 text-sm">
        <button onClick={() => setShowArchived(false)} className={showArchived ? 'text-[#666]' : 'text-white font-medium'}>
          Inbox
        </button>
        <button onClick={() => setShowArchived(true)} className={showArchived ? 'text-white font-medium' : 'text-[#666]'}>
          Archived
        </button>
      </div>

      {/* Messages */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#555]"><p className="text-sm">{showArchived ? 'No archived messages' : 'No messages'}</p></div>
        )}
        {filtered.map((sub) => (
          <div key={sub.id} className={`bg-[#1A1A1A] border rounded-xl overflow-hidden transition-colors ${
            !sub.is_read ? 'border-[#C8A050]/20' : 'border-[#222]'
          }`}>
            {/* Header row — always visible */}
            <button
              onClick={() => expand(sub.id)}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-[#222]/30 transition-colors"
            >
              {!sub.is_read && <span className="w-2 h-2 rounded-full bg-[#C8A050] shrink-0" />}
              {sub.is_read && <span className="w-2 h-2 shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${sub.is_read ? 'text-[#999]' : 'text-white font-medium'}`}>{sub.name}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold"
                    style={{ backgroundColor: `${categoryColors[sub.category]}15`, color: categoryColors[sub.category] }}
                  >
                    {categoryLabels[sub.category] || sub.category}
                  </span>
                </div>
                <p className="text-xs text-[#666] truncate mt-0.5">{sub.message}</p>
              </div>
              <span className="text-xs text-[#555] shrink-0">{timeAgo(sub.created_at)}</span>
              <svg className={`w-4 h-4 text-[#555] shrink-0 transition-transform ${expandedId === sub.id ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Expanded detail */}
            {expandedId === sub.id && (
              <div className="px-4 pb-4 border-t border-[#222]">
                <div className="pt-3 space-y-3">
                  {/* Contact info */}
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    <a href={`mailto:${sub.email}`} className="text-[#C8A050] hover:underline">{sub.email}</a>
                    {sub.phone && <span className="text-[#888]">{sub.phone}</span>}
                  </div>

                  {/* Event-specific fields */}
                  {(sub.event_type || sub.event_date || sub.guest_count || sub.budget_range) && (
                    <div className="grid grid-cols-2 gap-2 p-3 bg-[#111] rounded-lg text-sm">
                      {sub.event_type && <div><span className="text-[#666] text-xs">Event Type</span><p className="text-white">{sub.event_type}</p></div>}
                      {sub.event_date && <div><span className="text-[#666] text-xs">Preferred Date</span><p className="text-white">{new Date(sub.event_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p></div>}
                      {sub.guest_count && <div><span className="text-[#666] text-xs">Guest Count</span><p className="text-white">{sub.guest_count}</p></div>}
                      {sub.budget_range && <div><span className="text-[#666] text-xs">Budget Range</span><p className="text-white">{sub.budget_range}</p></div>}
                    </div>
                  )}

                  {/* Resume */}
                  {sub.resume_filename && (
                    <div className="flex items-center gap-2 p-3 bg-[#111] rounded-lg text-sm">
                      <svg className="w-4 h-4 text-[#C8A050]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-[#C8A050]">{sub.resume_filename}</span>
                    </div>
                  )}

                  {/* Full message */}
                  <div className="text-sm text-[#ccc] leading-relaxed whitespace-pre-wrap">{sub.message}</div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <a
                      href={`mailto:${sub.email}?subject=Re: Your inquiry to Revival`}
                      className="bg-[#C8A050] text-[#0A0A0A] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#D4B068] transition-colors"
                    >
                      Reply
                    </a>
                    <button
                      onClick={() => toggleRead(sub.id)}
                      className="px-4 py-2 rounded-lg text-sm text-[#888] border border-[#333] hover:border-[#555] transition-colors"
                    >
                      Mark {sub.is_read ? 'Unread' : 'Read'}
                    </button>
                    <button
                      onClick={() => toggleArchive(sub.id)}
                      className="px-4 py-2 rounded-lg text-sm text-[#888] border border-[#333] hover:border-[#555] transition-colors"
                    >
                      {sub.is_archived ? 'Unarchive' : 'Archive'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
