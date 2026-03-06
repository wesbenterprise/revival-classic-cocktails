'use client';

import { useState, useEffect, useCallback } from 'react';

type CopyCategory = 'quote' | 'tagline' | 'description' | 'social' | 'brainstorm';

interface CopyEntry {
  id: string;
  category: CopyCategory;
  text: string;
  attribution: string | null;
  used_on: string | null;
  notes: string | null;
  created_at: string;
}

const CATEGORIES: { key: CopyCategory | 'all'; label: string; emoji: string }[] = [
  { key: 'all', label: 'All', emoji: '📋' },
  { key: 'quote', label: 'Quotes', emoji: '💬' },
  { key: 'tagline', label: 'Taglines', emoji: '✨' },
  { key: 'description', label: 'Descriptions', emoji: '📝' },
  { key: 'social', label: 'Social', emoji: '📱' },
  { key: 'brainstorm', label: 'Brainstorm', emoji: '💡' },
];

export default function AdminCopy() {
  const [entries, setEntries] = useState<CopyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CopyCategory | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CopyEntry | null>(null);
  const [form, setForm] = useState({ category: 'quote' as CopyCategory, text: '', attribution: '', used_on: '', notes: '' });
  const [saving, setSaving] = useState(false);

  const loadEntries = useCallback(async () => {
    const res = await fetch('/api/revival/copy');
    if (res.ok) setEntries(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { loadEntries(); }, [loadEntries]);

  const filtered = activeCategory === 'all'
    ? entries
    : entries.filter((c) => c.category === activeCategory);

  const openCreate = () => {
    setEditing(null);
    setForm({ category: (activeCategory === 'all' ? 'quote' : activeCategory) as CopyCategory, text: '', attribution: '', used_on: '', notes: '' });
    setShowModal(true);
  };

  const openEdit = (entry: CopyEntry) => {
    setEditing(entry);
    setForm({
      category: entry.category,
      text: entry.text,
      attribution: entry.attribution || '',
      used_on: entry.used_on || '',
      notes: entry.notes || '',
    });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.text.trim()) return;
    setSaving(true);
    const payload = {
      ...form,
      attribution: form.attribution || null,
      used_on: form.used_on || null,
      notes: form.notes || null,
    };
    if (editing) {
      await fetch('/api/revival/copy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editing.id, ...payload }),
      });
    } else {
      await fetch('/api/revival/copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    setSaving(false);
    setShowModal(false);
    loadEntries();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this copy entry?')) return;
    await fetch('/api/revival/copy', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadEntries();
  };

  if (loading) return <div className="p-8 text-center text-[#888]">Loading copy bank…</div>;

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Copy Bank</h1>
          <p className="text-sm text-[#888] mt-1">Marketing copy, quotes, taglines, brainstorms</p>
        </div>
        <button onClick={openCreate} className="bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068]">
          + Add Entry
        </button>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
            className={`shrink-0 px-3 py-2 rounded-lg text-sm ${activeCategory === cat.key ? 'bg-[#C8A050]/15 text-[#C8A050] font-medium' : 'text-[#888] hover:text-white'}`}>
            {cat.emoji} {cat.label}
            <span className="ml-1 text-xs opacity-60">
              {cat.key === 'all' ? entries.length : entries.filter(c => c.category === cat.key).length}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((entry) => (
          <div key={entry.id} className="bg-[#1A1A1A] border border-[#222] rounded-xl p-4 group">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-revival-cream text-sm leading-relaxed italic">&ldquo;{entry.text}&rdquo;</p>
                {entry.attribution && (
                  <p className="text-xs text-[#888] mt-1.5">— {entry.attribution}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#222] text-[#888] uppercase tracking-wider">{entry.category}</span>
                  {entry.used_on && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4ADE80]/10 text-[#4ADE80] uppercase tracking-wider">📌 {entry.used_on}</span>
                  )}
                </div>
                {entry.notes && (
                  <p className="text-xs text-[#555] mt-2">{entry.notes}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(entry)} className="p-2 text-[#666] hover:text-white rounded-lg hover:bg-[#222]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
                </button>
                <button onClick={() => remove(entry.id)} className="p-2 text-[#666] hover:text-red-400 rounded-lg hover:bg-[#222]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-[#1A1A1A] border border-[#333] rounded-t-2xl lg:rounded-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1A1A1A] px-5 py-4 border-b border-[#222] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Entry' : 'New Copy Entry'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-[#666] hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as CopyCategory })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]">
                  {CATEGORIES.filter(c => c.key !== 'all').map((cat) => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Text</label>
                <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] min-h-[100px]" autoFocus />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Attribution (optional)</label>
                <input type="text" value={form.attribution} onChange={(e) => setForm({ ...form, attribution: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" placeholder="Author name" />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Used On (optional)</label>
                <input type="text" value={form.used_on} onChange={(e) => setForm({ ...form, used_on: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" placeholder="Homepage, Visit page, etc." />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Notes (optional)</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] min-h-[60px]" />
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1A1A1A] px-5 py-4 border-t border-[#222] flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-lg text-sm text-[#888] border border-[#333]">Cancel</button>
              <button onClick={save} disabled={!form.text.trim() || saving} className="flex-1 bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068] disabled:opacity-40">
                {saving ? 'Saving…' : editing ? 'Save' : 'Add Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
