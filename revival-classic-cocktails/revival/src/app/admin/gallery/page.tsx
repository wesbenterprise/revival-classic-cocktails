'use client';

import { useState } from 'react';

type GalleryCategory = 'room' | 'drinks' | 'people' | 'nights';

interface GalleryPhoto {
  id: string;
  category: GalleryCategory;
  caption: string;
  sort_order: number;
  placeholder_color: string; // Temp until real uploads
}

const categoryLabels: Record<GalleryCategory, string> = {
  room: 'The Room',
  drinks: 'The Drinks',
  people: 'The People',
  nights: 'The Nights',
};

const placeholderColors = ['#2A1F1F', '#1F2A20', '#1F1F2A', '#2A201F', '#201F2A', '#1F2A2A'];

export default function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('room');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<GalleryCategory>('room');
  const [uploadCaption, setUploadCaption] = useState('');

  const filtered = photos.filter((p) => p.category === activeCategory).sort((a, b) => a.sort_order - b.sort_order);

  const simulateUpload = () => {
    const newPhoto: GalleryPhoto = {
      id: Date.now().toString(),
      category: uploadCategory,
      caption: uploadCaption,
      sort_order: photos.filter((p) => p.category === uploadCategory).length,
      placeholder_color: placeholderColors[Math.floor(Math.random() * placeholderColors.length)],
    };
    setPhotos((prev) => [...prev, newPhoto]);
    setUploadCaption('');
    setShowUpload(false);
  };

  const remove = (id: string) => {
    if (confirm('Delete this photo?')) setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gallery</h1>
          <p className="text-sm text-[#888] mt-1">{photos.length} photos across {Object.keys(categoryLabels).length} categories</p>
        </div>
        <button onClick={() => { setUploadCategory(activeCategory); setShowUpload(true); }}
          className="bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068]">
          + Upload
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {(Object.keys(categoryLabels) as GalleryCategory[]).map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3 py-2 rounded-lg text-sm ${activeCategory === cat ? 'bg-[#C8A050]/15 text-[#C8A050] font-medium' : 'text-[#888] hover:text-white'}`}>
            {categoryLabels[cat]}
            <span className="ml-1 text-xs opacity-60">{photos.filter((p) => p.category === cat).length}</span>
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-[#222] rounded-xl">
          <svg className="w-12 h-12 text-[#333] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <p className="text-[#555] text-sm">No photos in &quot;{categoryLabels[activeCategory]}&quot; yet</p>
          <button onClick={() => { setUploadCategory(activeCategory); setShowUpload(true); }}
            className="mt-3 text-sm text-[#C8A050] hover:underline">Upload your first photo</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((photo) => (
            <div key={photo.id} className="relative group aspect-square rounded-xl overflow-hidden border border-[#222]"
              style={{ backgroundColor: photo.placeholder_color }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-xs text-white">{photo.caption}</p>
                </div>
              )}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => remove(photo.id)}
                  className="p-1.5 bg-black/60 rounded-lg text-white hover:bg-red-500/80 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowUpload(false)} />
          <div className="relative w-full max-w-lg bg-[#1A1A1A] border border-[#333] rounded-t-2xl lg:rounded-2xl">
            <div className="px-5 py-4 border-b border-[#222] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Upload Photo</h2>
              <button onClick={() => setShowUpload(false)} className="p-1 text-[#666] hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Upload zone */}
              <div className="border-2 border-dashed border-[#333] rounded-xl p-8 text-center hover:border-[#C8A050]/30 transition-colors cursor-pointer">
                <svg className="w-10 h-10 text-[#444] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm text-[#888]">Tap to select photo</p>
                <p className="text-xs text-[#555] mt-1">JPG, PNG, WebP · Max 5MB</p>
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Category</label>
                <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value as GalleryCategory)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050] appearance-none">
                  {(Object.keys(categoryLabels) as GalleryCategory[]).map((cat) => (
                    <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase tracking-wider mb-1.5">Caption (optional)</label>
                <input type="text" value={uploadCaption} onChange={(e) => setUploadCaption(e.target.value)}
                  className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#C8A050]" placeholder="A quiet Thursday evening" />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-[#222] flex gap-3">
              <button onClick={() => setShowUpload(false)} className="flex-1 px-4 py-2.5 rounded-lg text-sm text-[#888] border border-[#333]">Cancel</button>
              <button onClick={simulateUpload} className="flex-1 bg-[#C8A050] text-[#0A0A0A] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#D4B068]">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
