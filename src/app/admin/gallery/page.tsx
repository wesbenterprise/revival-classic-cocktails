'use client';

import { useState, useEffect, useCallback } from 'react';
import { GalleryPhoto, GalleryCategory } from '@/types/database';

const categoryLabels: Record<GalleryCategory | 'all', string> = {
  all: 'All',
  room: 'The Room',
  drinks: 'The Drinks',
  people: 'The People',
  nights: 'The Nights',
  art: 'Brand Art',
};

export default function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<GalleryPhoto | null>(null);
  const [form, setForm] = useState({ image_url: '', category: 'room' as GalleryCategory, caption: '' });
  const [saving, setSaving] = useState(false);

  const loadPhotos = useCallback(async () => {
    const res = await fetch('/api/revival/gallery');
    if (res.ok) setPhotos(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { loadPhotos(); }, [loadPhotos]);

  const filtered = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);
  const sorted = [...filtered].sort((a, b) => a.sort_order - b.sort_order);

  const openCreate = () => {
    setEditing(null);
    setForm({ image_url: '', category: (activeCategory === 'all' ? 'room' : activeCategory) as GalleryCategory, caption: '' });
    setShowModal(true);
  };

  const openEdit = (photo: GalleryPhoto) => {
    setEditing(photo);
    setForm({ image_url: photo.image_url, category: photo.category as GalleryCategory, caption: photo.caption || '' });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.image_url.trim()) return;
    setSaving(true);
    if (editing) {
      await fetch('/api/revival/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    } else {
      await fetch('/api/revival/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sort_order: photos.filter(p => p.category === form.category).length }),
      });
    }
    setSaving(false);
    setShowModal(false);
    loadPhotos();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    await fetch('/api/revival/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadPhotos();
  };

  if (loading) return <div className="p-8 text-center text-[#888]">Loading gallery…</div>;

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gallery</h1>
          <p className="text-sm text-[#888] mt-1">{photos.length} photos</p>
        </div>
        <button onClick={openCreate} className="bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068]">
          + Add Photo
        </button>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {(Object.keys(categoryLabels) as (GalleryCategory | 'all')[]).map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3 py-2 rounded-lg text-sm ${activeCategory === cat ? 'bg-[#C8A050]/15 text-[#C8A050] font-medium' : 'text-[#888] hover:text-white'}`}>
            {categoryLabels[cat]}
            <span className="ml-1 text-xs opacity-60">{cat === 'all' ? photos.length : photos.filter(p => p.category === cat).length}</span>
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-[#222] rounded-xl">
          <p className="text-[#555] text-sm">No photos in this category yet</p>
          <button onClick={openCreate} className="mt-3 text-sm text-[#C8A050] hover:underline">Add your first photo</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {sorted.map((photo) => (
            <div key={photo.id} className="relative group aspect-square rounded-xl overflow-hidden border border-[#222] bg-[#111]">
              <img src={photo.image_url} alt={photo.caption || ''} className="w-full h-full object-cover" />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-xs text-white">{photo.caption}</p>
                </div>
              )}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button onClick={() => openEdit(photo)} className="p-1.5 bg-black/60 rounded-lg text-white hover:bg-[#C8A050]/80 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                </button>
                <button onClick={() => remove(photo.id)} className="p-1.5 bg-black/60 rounded-lg text-white hover:bg-red-500/80 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-[#1A1A1A] border border-[#333] rounded-t-2xl lg:rounded-2xl">
            <div className="px-5 py-4 border-b border-[#222] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Photo' : 'Add Photo'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-[#666] hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Image URL</label>
                <input type="text" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" placeholder="/images/gallery/photo.jpg" autoFocus />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as GalleryCategory })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]">
                  {(['room', 'drinks', 'people', 'nights', 'art'] as GalleryCategory[]).map((cat) => (
                    <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Caption (optional)</label>
                <input type="text" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" placeholder="A quiet Thursday evening" />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-[#222] flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-lg text-sm text-[#888] border border-[#333]">Cancel</button>
              <button onClick={save} disabled={!form.image_url.trim() || saving} className="flex-1 bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068] disabled:opacity-40">
                {saving ? 'Saving…' : editing ? 'Save' : 'Add Photo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
