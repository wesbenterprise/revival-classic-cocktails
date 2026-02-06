'use client';

import { useState } from 'react';

interface MerchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  sort_order: number;
}

const demoMerch: MerchItem[] = [
  { id: '1', name: 'Revival Logo Tee', description: 'Vintage-washed black tee with gold Revival logo.', price: 30, is_available: true, sort_order: 0 },
  { id: '2', name: 'Revival Cap', description: 'Structured cap with embroidered Revival wordmark.', price: 28, is_available: true, sort_order: 1 },
  { id: '3', name: 'Bar Spoon Set', description: 'Professional bar spoon and jigger set.', price: 22, is_available: true, sort_order: 2 },
  { id: '4', name: 'Rocks Glasses (Set of 2)', description: 'Etched Revival logo on heavy-base glasses.', price: 24, is_available: true, sort_order: 3 },
];

export default function AdminMerch() {
  const [items, setItems] = useState(demoMerch);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<MerchItem | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: 0, is_available: true });

  const openCreate = () => { setEditing(null); setForm({ name: '', description: '', price: 0, is_available: true }); setShowModal(true); };
  const openEdit = (item: MerchItem) => { setEditing(item); setForm({ name: item.name, description: item.description, price: item.price, is_available: item.is_available }); setShowModal(true); };

  const save = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setItems((prev) => prev.map((i) => i.id === editing.id ? { ...i, ...form } : i));
    } else {
      setItems((prev) => [...prev, { id: Date.now().toString(), ...form, sort_order: items.length }]);
    }
    setShowModal(false);
  };

  const toggleAvailable = (id: string) => setItems((prev) => prev.map((i) => i.id === id ? { ...i, is_available: !i.is_available } : i));
  const remove = (id: string) => { if (confirm('Delete this item?')) setItems((prev) => prev.filter((i) => i.id !== id)); };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Merch</h1>
          <p className="text-sm text-[#888] mt-1">{items.filter((i) => i.is_available).length} available items</p>
        </div>
        <button onClick={openCreate} className="bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068]">+ Add Item</button>
      </div>

      <div className="space-y-2">
        {items.sort((a, b) => a.sort_order - b.sort_order).map((item) => (
          <div key={item.id} className={`bg-[#1A1A1A] border rounded-xl p-4 flex items-center gap-4 ${item.is_available ? 'border-[#222]' : 'border-[#222] opacity-50'}`}>
            <div className="w-14 h-14 rounded-lg bg-[#222] border border-[#333] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-white font-medium">{item.name}</p>
                {!item.is_available && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#333] text-[#888] uppercase tracking-wider">Hidden</span>}
              </div>
              <p className="text-sm text-[#888] truncate">{item.description}</p>
              <p className="text-sm text-[#C8A050] font-medium mt-0.5">${item.price}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleAvailable(item.id)} className={`p-2 rounded-lg ${item.is_available ? 'text-[#4ADE80] hover:bg-[#222]' : 'text-[#555] hover:bg-[#222]'}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg>
              </button>
              <button onClick={() => openEdit(item)} className="p-2 text-[#666] hover:text-white rounded-lg hover:bg-[#222]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
              </button>
              <button onClick={() => remove(item.id)} className="p-2 text-[#666] hover:text-red-400 rounded-lg hover:bg-[#222]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-[#1A1A1A] border border-[#333] rounded-t-2xl lg:rounded-2xl">
            <div className="px-5 py-4 border-b border-[#222] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Item' : 'New Merch Item'}</h2>
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
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Description</label>
                <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Price</label>
                <input type="number" value={form.price || ''} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" step="0.50" />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-[#222] flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-lg text-sm text-[#888] border border-[#333]">Cancel</button>
              <button onClick={save} disabled={!form.name.trim()} className="flex-1 bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068] disabled:opacity-40">
                {editing ? 'Save' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
