'use client';

import { useState } from 'react';
import { TEAM_DATA, TeamMemberData } from '@/lib/teamData';

export default function AdminTeam() {
  const [team, setTeam] = useState<TeamMemberData[]>(TEAM_DATA);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TeamMemberData | null>(null);
  const [filter, setFilter] = useState<'active' | 'alumni'>('active');
  const [form, setForm] = useState({ name: '', title: '', bio: '', status: 'active' as 'active' | 'alumni' });

  const filtered = team.filter((m) => m.status === filter).sort((a, b) => a.sort_order - b.sort_order);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', title: '', bio: '', status: filter });
    setShowModal(true);
  };

  const openEdit = (member: TeamMemberData) => {
    setEditing(member);
    setForm({ name: member.name, title: member.title, bio: member.bio, status: member.status });
    setShowModal(true);
  };

  const save = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setTeam((prev) => prev.map((m) => m.id === editing.id ? { ...m, ...form } : m));
    } else {
      setTeam((prev) => [...prev, { id: Date.now().toString(), ...form, photo_url: null, sort_order: filtered.length }]);
    }
    setShowModal(false);
  };

  const remove = (id: string) => {
    if (confirm('Remove this team member?')) setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  const move = (id: string, dir: 'up' | 'down') => {
    const idx = filtered.findIndex((m) => m.id === id);
    if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === filtered.length - 1)) return;
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    setTeam((prev) => prev.map((m) => {
      if (m.id === filtered[idx].id) return { ...m, sort_order: filtered[swapIdx].sort_order };
      if (m.id === filtered[swapIdx].id) return { ...m, sort_order: filtered[idx].sort_order };
      return m;
    }));
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Team</h1>
          <p className="text-sm text-[#888] mt-1">
            {team.filter((m) => m.status === 'active').length} active · {team.filter((m) => m.status === 'alumni').length} alumni
          </p>
          <p className="text-xs text-[#555] mt-1">
            Source: <code className="text-[#666]">src/lib/teamData.ts</code> — edit there to persist changes
          </p>
        </div>
        <button onClick={openCreate} className="bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068]">
          + Add Member
        </button>
      </div>

      <div className="flex gap-4 mb-4 text-sm">
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'text-white font-medium' : 'text-[#666]'}>Active</button>
        <button onClick={() => setFilter('alumni')} className={filter === 'alumni' ? 'text-white font-medium' : 'text-[#666]'}>Alumni</button>
      </div>

      <div className="space-y-2">
        {filtered.map((member, idx) => (
          <div key={member.id} className="bg-[#1A1A1A] border border-[#222] rounded-xl p-4 flex items-center gap-4 group">
            {/* Reorder */}
            <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => move(member.id, 'up')} disabled={idx === 0} className="text-[#555] hover:text-white disabled:opacity-20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
              </button>
              <button onClick={() => move(member.id, 'down')} disabled={idx === filtered.length - 1} className="text-[#555] hover:text-white disabled:opacity-20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </button>
            </div>

            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-[#222] border border-[#333] flex items-center justify-center shrink-0 overflow-hidden">
              {member.photo_url ? (
                <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg text-[#555]">{member.name.charAt(0)}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-medium">{member.name}</p>
              <p className="text-sm text-[#888]">{member.title}</p>
              {member.bio && <p className="text-xs text-[#555] mt-0.5">{member.bio}</p>}
              {member.photo_url && <p className="text-xs text-green-500/60 mt-0.5">📷 Has photo</p>}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => openEdit(member)} className="p-2 text-[#666] hover:text-white rounded-lg hover:bg-[#222]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
              <button onClick={() => remove(member.id)} className="p-2 text-[#666] hover:text-red-400 rounded-lg hover:bg-[#222]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-[#1A1A1A] border border-[#333] rounded-t-2xl lg:rounded-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1A1A1A] px-5 py-4 border-b border-[#222] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Member' : 'New Team Member'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-[#666] hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" autoFocus />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Title / Role</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" placeholder="Bartender" />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Bio (optional)</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] min-h-[80px]" placeholder="One or two sentences about them" />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setForm({ ...form, status: 'active' })}
                    className={`px-3 py-2.5 rounded-lg text-sm border ${form.status === 'active' ? 'border-[#4ADE80]/50 bg-[#4ADE80]/10 text-[#4ADE80]' : 'border-[#333] text-[#888]'}`}>Active</button>
                  <button onClick={() => setForm({ ...form, status: 'alumni' })}
                    className={`px-3 py-2.5 rounded-lg text-sm border ${form.status === 'alumni' ? 'border-[#C8A050]/50 bg-[#C8A050]/10 text-[#C8A050]' : 'border-[#333] text-[#888]'}`}>Alumni</button>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1A1A1A] px-5 py-4 border-t border-[#222] flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-lg text-sm text-[#888] border border-[#333]">Cancel</button>
              <button onClick={save} disabled={!form.name.trim()} className="flex-1 bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068] disabled:opacity-40">
                {editing ? 'Save' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
