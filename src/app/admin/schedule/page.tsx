'use client';

import { useState, useEffect, useCallback } from 'react';

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
type EventType = 'event' | 'private';

interface RecurringSpecial {
  id: string;
  day: DayOfWeek;
  title: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

interface ScheduleEvent {
  id: string;
  event_date: string;
  title: string;
  description: string;
  type: EventType;
  closure_message: string;
}

const dayLabels: Record<DayOfWeek, string> = {
  monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday',
  friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
};
const dayOrder: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function AdminSchedule() {
  const [recurring, setRecurring] = useState<RecurringSpecial[]>([]);
  const [loading, setLoading] = useState(true);
  const [events] = useState<ScheduleEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'recurring' | 'events'>('recurring');
  const [editingRecurring, setEditingRecurring] = useState<RecurringSpecial | null>(null);
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [rForm, setRForm] = useState({ day: 'monday' as DayOfWeek, title: '', description: '' });
  const [eForm, setEForm] = useState({ event_date: '', title: '', description: '', type: 'event' as EventType, closure_message: '' });

  const loadSpecials = useCallback(async () => {
    const res = await fetch('/api/revival/specials');
    if (res.ok) setRecurring(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { loadSpecials(); }, [loadSpecials]);

  const openCreateRecurring = () => {
    setEditingRecurring(null);
    setRForm({ day: 'monday', title: '', description: '' });
    setActiveTab('recurring');
    setShowModal(true);
  };

  const openEditRecurring = (item: RecurringSpecial) => {
    setEditingRecurring(item);
    setRForm({ day: item.day, title: item.title, description: item.description || '' });
    setActiveTab('recurring');
    setShowModal(true);
  };

  const saveRecurring = async () => {
    if (!rForm.title.trim()) return;
    setSaving(true);
    if (editingRecurring) {
      await fetch('/api/revival/specials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingRecurring.id, ...rForm }),
      });
    } else {
      await fetch('/api/revival/specials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...rForm, is_active: true }),
      });
    }
    setSaving(false);
    setShowModal(false);
    loadSpecials();
  };

  const toggleActive = async (item: RecurringSpecial) => {
    await fetch('/api/revival/specials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, is_active: !item.is_active }),
    });
    loadSpecials();
  };

  const deleteRecurring = async (id: string) => {
    if (!confirm('Delete this weekly special?')) return;
    await fetch('/api/revival/specials', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadSpecials();
  };

  const sortedRecurring = [...recurring].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

  if (loading) return <div className="p-8 text-center text-[#888]">Loading schedule…</div>;

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Schedule</h1>
          <p className="text-sm text-[#888] mt-1">Manage weekly specials and upcoming events.</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          <button onClick={() => setActiveTab('recurring')} className={`px-3 py-2 rounded-lg text-sm ${activeTab === 'recurring' ? 'bg-[#C8A050]/15 text-[#C8A050] font-medium' : 'text-[#888] hover:text-white'}`}>Weekly Specials</button>
          <button onClick={() => setActiveTab('events')} className={`px-3 py-2 rounded-lg text-sm ${activeTab === 'events' ? 'bg-[#C8A050]/15 text-[#C8A050] font-medium' : 'text-[#888] hover:text-white'}`}>Events</button>
        </div>
        <button onClick={activeTab === 'recurring' ? openCreateRecurring : () => { setEditingEvent(null); setEForm({ event_date: '', title: '', description: '', type: 'event', closure_message: '' }); setActiveTab('events'); setShowModal(true); }}
          className="bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068]">
          + Add {activeTab === 'recurring' ? 'Special' : 'Event'}
        </button>
      </div>

      {activeTab === 'recurring' && (
        <div className="space-y-2">
          {sortedRecurring.map((item) => (
            <div key={item.id} className={`bg-[#1A1A1A] border rounded-xl p-4 flex items-start gap-4 ${item.is_active ? 'border-[#222]' : 'border-[#222] opacity-50'}`}>
              <div className="w-20 shrink-0">
                <span className="text-xs text-[#C8A050] uppercase tracking-wider font-medium">{dayLabels[item.day].slice(0, 3)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{item.title}</p>
                <p className="text-sm text-[#888] mt-0.5">{item.description}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleActive(item)} className={`p-2 rounded-lg ${item.is_active ? 'text-[#4ADE80] hover:bg-[#222]' : 'text-[#555] hover:bg-[#222]'}`} title={item.is_active ? 'Active' : 'Disabled'}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg>
                </button>
                <button onClick={() => openEditRecurring(item)} className="p-2 text-[#666] hover:text-white rounded-lg hover:bg-[#222]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                </button>
                <button onClick={() => deleteRecurring(item.id)} className="p-2 text-[#666] hover:text-red-400 rounded-lg hover:bg-[#222]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="text-center py-12 text-[#555]">
          <p className="text-sm">Events table coming soon — currently {events.length} events.</p>
        </div>
      )}

      {showModal && activeTab === 'recurring' && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-[#1A1A1A] border border-[#333] rounded-t-2xl lg:rounded-2xl">
            <div className="sticky top-0 bg-[#1A1A1A] px-5 py-4 border-b border-[#222] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editingRecurring ? 'Edit Weekly Special' : 'New Weekly Special'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-[#666] hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Day of Week</label>
                <select value={rForm.day} onChange={(e) => setRForm({ ...rForm, day: e.target.value as DayOfWeek })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]">
                  {dayOrder.map((d) => <option key={d} value={d}>{dayLabels[d]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Title</label>
                <input type="text" value={rForm.title} onChange={(e) => setRForm({ ...rForm, title: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" autoFocus />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Description</label>
                <textarea value={rForm.description} onChange={(e) => setRForm({ ...rForm, description: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] min-h-[80px]" />
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1A1A1A] px-5 py-4 border-t border-[#222] flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-lg text-sm text-[#888] border border-[#333]">Cancel</button>
              <button onClick={saveRecurring} disabled={!rForm.title.trim() || saving} className="flex-1 bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068] disabled:opacity-40">
                {saving ? 'Saving…' : editingRecurring ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
