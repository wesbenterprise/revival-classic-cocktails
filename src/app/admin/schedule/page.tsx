'use client';

import { useState } from 'react';

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
type EventType = 'event' | 'private';

interface RecurringSpecial {
  id: string;
  day: DayOfWeek;
  title: string;
  description: string;
  is_active: boolean;
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

const demoRecurring: RecurringSpecial[] = [
  { id: '1', day: 'tuesday', title: 'Industry Night', description: 'Half off for our friends in the service industry.', is_active: true },
  { id: '2', day: 'wednesday', title: 'Whiskey Wednesday', description: '$2 off all bourbon pours.', is_active: true },
  { id: '3', day: 'thursday', title: "Dealer's Choice", description: 'Tell us a flavor. Trust the bartender.', is_active: true },
  { id: '4', day: 'friday', title: 'Vinyl Fridays', description: 'Guest DJ spins vinyl all night.', is_active: true },
  { id: '5', day: 'saturday', title: 'Late Night Revival', description: 'Doors open til 2 AM. The night is yours.', is_active: true },
];

const demoEvents: ScheduleEvent[] = [
  { id: 'e1', event_date: '2026-02-14', title: "Valentine's Night: Paired Cocktails", description: 'Special tasting menu with paired cocktails for two.', type: 'event', closure_message: '' },
  { id: 'e2', event_date: '2026-02-21', title: 'Private Event — Mitchell Wedding', description: '', type: 'private', closure_message: 'Revival is hosting a private event this evening. We\'ll see you soon.' },
];

export default function AdminSchedule() {
  const [recurring, setRecurring] = useState(demoRecurring);
  const [events, setEvents] = useState(demoEvents);
  const [activeTab, setActiveTab] = useState<'recurring' | 'events'>('recurring');
  const [editingRecurring, setEditingRecurring] = useState<RecurringSpecial | null>(null);
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Recurring form
  const [rForm, setRForm] = useState({ day: 'monday' as DayOfWeek, title: '', description: '' });

  // Event form
  const [eForm, setEForm] = useState({ event_date: '', title: '', description: '', type: 'event' as EventType, closure_message: 'Revival is hosting a private event this evening. We\'ll see you soon.' });

  const openCreateRecurring = () => {
    setEditingRecurring(null);
    setRForm({ day: 'monday', title: '', description: '' });
    setActiveTab('recurring');
    setShowModal(true);
  };

  const openEditRecurring = (item: RecurringSpecial) => {
    setEditingRecurring(item);
    setRForm({ day: item.day, title: item.title, description: item.description });
    setActiveTab('recurring');
    setShowModal(true);
  };

  const saveRecurring = () => {
    if (!rForm.title.trim()) return;
    if (editingRecurring) {
      setRecurring((prev) => prev.map((i) => i.id === editingRecurring.id ? { ...i, ...rForm } : i));
    } else {
      setRecurring((prev) => [...prev, { id: Date.now().toString(), ...rForm, is_active: true }]);
    }
    setShowModal(false);
  };

  const openCreateEvent = () => {
    setEditingEvent(null);
    setEForm({ event_date: '', title: '', description: '', type: 'event', closure_message: 'Revival is hosting a private event this evening. We\'ll see you soon.' });
    setActiveTab('events');
    setShowModal(true);
  };

  const openEditEvent = (item: ScheduleEvent) => {
    setEditingEvent(item);
    setEForm({ event_date: item.event_date, title: item.title, description: item.description, type: item.type, closure_message: item.closure_message });
    setActiveTab('events');
    setShowModal(true);
  };

  const saveEvent = () => {
    if (!eForm.title.trim() || !eForm.event_date) return;
    if (editingEvent) {
      setEvents((prev) => prev.map((i) => i.id === editingEvent.id ? { ...i, ...eForm } : i));
    } else {
      setEvents((prev) => [...prev, { id: Date.now().toString(), ...eForm }]);
    }
    setShowModal(false);
  };

  const toggleActive = (id: string) => {
    setRecurring((prev) => prev.map((i) => i.id === id ? { ...i, is_active: !i.is_active } : i));
  };

  const deleteRecurring = (id: string) => {
    if (confirm('Delete this weekly special?')) setRecurring((prev) => prev.filter((i) => i.id !== id));
  };

  const deleteEvent = (id: string) => {
    if (confirm('Delete this event?')) setEvents((prev) => prev.filter((i) => i.id !== id));
  };

  const sortedRecurring = [...recurring].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Schedule</h1>
          <p className="text-sm text-[#888] mt-1">Manage weekly specials and upcoming events.</p>
        </div>
      </div>

      {/* Tabs + Add */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('recurring')}
            className={`px-3 py-2 rounded-lg text-sm ${activeTab === 'recurring' ? 'bg-[#C8A050]/15 text-[#C8A050] font-medium' : 'text-[#888] hover:text-white'}`}
          >
            Weekly Specials
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-2 rounded-lg text-sm ${activeTab === 'events' ? 'bg-[#C8A050]/15 text-[#C8A050] font-medium' : 'text-[#888] hover:text-white'}`}
          >
            Events
          </button>
        </div>
        <button
          onClick={activeTab === 'recurring' ? openCreateRecurring : openCreateEvent}
          className="bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068] transition-colors"
        >
          + Add {activeTab === 'recurring' ? 'Special' : 'Event'}
        </button>
      </div>

      {/* Recurring Specials */}
      {activeTab === 'recurring' && (
        <div className="space-y-2">
          {sortedRecurring.map((item) => (
            <div key={item.id} className={`bg-[#1A1A1A] border rounded-xl p-4 flex items-start gap-4 ${item.is_active ? 'border-[#222]' : 'border-[#222] opacity-50'}`}>
              <div className="w-20 shrink-0">
                <span className="text-xs text-[#C8A050] uppercase tracking-wider font-medium">
                  {dayLabels[item.day].slice(0, 3)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{item.title}</p>
                <p className="text-sm text-[#888] mt-0.5">{item.description}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleActive(item.id)}
                  className={`p-2 rounded-lg transition-colors ${item.is_active ? 'text-[#4ADE80] hover:bg-[#222]' : 'text-[#555] hover:bg-[#222]'}`}
                  title={item.is_active ? 'Active — click to disable' : 'Disabled — click to enable'}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                </button>
                <button onClick={() => openEditRecurring(item)} className="p-2 text-[#666] hover:text-white rounded-lg hover:bg-[#222]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button onClick={() => deleteRecurring(item.id)} className="p-2 text-[#666] hover:text-red-400 rounded-lg hover:bg-[#222]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Events */}
      {activeTab === 'events' && (
        <div className="space-y-2">
          {events.length === 0 && (
            <div className="text-center py-12 text-[#555]"><p className="text-sm">No upcoming events</p></div>
          )}
          {events.sort((a, b) => a.event_date.localeCompare(b.event_date)).map((item) => (
            <div key={item.id} className={`bg-[#1A1A1A] border rounded-xl p-4 flex items-start gap-4 ${item.type === 'private' ? 'border-red-900/30' : 'border-[#222]'}`}>
              <div className="w-20 shrink-0 text-center">
                <p className="text-2xl font-semibold text-white">
                  {new Date(item.event_date + 'T12:00:00').getDate()}
                </p>
                <p className="text-xs text-[#888] uppercase">
                  {new Date(item.event_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short' })}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-medium">{item.title}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold ${
                    item.type === 'private' ? 'bg-red-500/15 text-red-400' : 'bg-[#C8A050]/15 text-[#C8A050]'
                  }`}>
                    {item.type === 'private' ? 'Private' : 'Public'}
                  </span>
                </div>
                {item.description && <p className="text-sm text-[#888] mt-0.5">{item.description}</p>}
                {item.type === 'private' && item.closure_message && (
                  <p className="text-xs text-red-400/60 mt-1 italic">&quot;{item.closure_message}&quot;</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEditEvent(item)} className="p-2 text-[#666] hover:text-white rounded-lg hover:bg-[#222]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button onClick={() => deleteEvent(item.id)} className="p-2 text-[#666] hover:text-red-400 rounded-lg hover:bg-[#222]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-[#1A1A1A] border border-[#333] rounded-t-2xl lg:rounded-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1A1A1A] px-5 py-4 border-b border-[#222] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {activeTab === 'recurring'
                  ? (editingRecurring ? 'Edit Weekly Special' : 'New Weekly Special')
                  : (editingEvent ? 'Edit Event' : 'New Event')
                }
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-[#666] hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {activeTab === 'recurring' ? (
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Day of Week</label>
                  <select
                    value={rForm.day}
                    onChange={(e) => setRForm({ ...rForm, day: e.target.value as DayOfWeek })}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] appearance-none"
                  >
                    {dayOrder.map((d) => <option key={d} value={d}>{dayLabels[d]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Title</label>
                  <input type="text" value={rForm.title} onChange={(e) => setRForm({ ...rForm, title: e.target.value })}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]"
                    placeholder="Whiskey Wednesday" autoFocus />
                </div>
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Description</label>
                  <textarea value={rForm.description} onChange={(e) => setRForm({ ...rForm, description: e.target.value })}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] min-h-[80px] resize-none"
                    placeholder="$2 off all bourbon pours." />
                </div>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Event Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setEForm({ ...eForm, type: 'event' })}
                      className={`px-3 py-2.5 rounded-lg text-sm border transition-colors ${eForm.type === 'event' ? 'border-[#C8A050] bg-[#C8A050]/10 text-[#C8A050]' : 'border-[#333] text-[#888]'}`}
                    >
                      🎉 Public Event
                    </button>
                    <button
                      onClick={() => setEForm({ ...eForm, type: 'private' })}
                      className={`px-3 py-2.5 rounded-lg text-sm border transition-colors ${eForm.type === 'private' ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-[#333] text-[#888]'}`}
                    >
                      🔒 Private Event
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Date</label>
                  <input type="date" value={eForm.event_date} onChange={(e) => setEForm({ ...eForm, event_date: e.target.value })}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Title</label>
                  <input type="text" value={eForm.title} onChange={(e) => setEForm({ ...eForm, title: e.target.value })}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]"
                    placeholder={eForm.type === 'private' ? 'Private Event — Client Name' : 'Valentine\'s Night Special'} autoFocus />
                </div>
                {eForm.type === 'event' && (
                  <div>
                    <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Description</label>
                    <textarea value={eForm.description} onChange={(e) => setEForm({ ...eForm, description: e.target.value })}
                      className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] min-h-[80px] resize-none" />
                  </div>
                )}
                {eForm.type === 'private' && (
                  <div>
                    <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Closure Message (shown to public)</label>
                    <textarea value={eForm.closure_message} onChange={(e) => setEForm({ ...eForm, closure_message: e.target.value })}
                      className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] min-h-[80px] resize-none" />
                  </div>
                )}
              </div>
            )}

            <div className="sticky bottom-0 bg-[#1A1A1A] px-5 py-4 border-t border-[#222] flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-lg text-sm text-[#888] border border-[#333] hover:border-[#555]">Cancel</button>
              <button
                onClick={activeTab === 'recurring' ? saveRecurring : saveEvent}
                className="flex-1 bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068]"
              >
                {(editingRecurring || editingEvent) ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
