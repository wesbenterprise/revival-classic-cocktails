'use client';

import { useState } from 'react';
import { GalleryPhoto, GalleryCategory } from '@/types/database';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import InstagramEmbed from '@/components/InstagramEmbed';

// ============================================================
// DEMO DATA — Replace with Supabase query
// ============================================================
const DEMO_PHOTOS: GalleryPhoto[] = [
  { id: '1', image_url: '', category: 'room', caption: 'The bar at golden hour', sort_order: 0, created_at: '' },
  { id: '2', image_url: '', category: 'room', caption: 'Candlelit corner booth', sort_order: 1, created_at: '' },
  { id: '3', image_url: '', category: 'room', caption: 'Bookshelves and warm light', sort_order: 2, created_at: '' },
  { id: '4', image_url: '', category: 'room', caption: 'Kentucky Ave storefront', sort_order: 3, created_at: '' },
  { id: '5', image_url: '', category: 'room', caption: 'The apothecary wall', sort_order: 4, created_at: '' },
  { id: '6', image_url: '', category: 'drinks', caption: 'Old Fashioned, done right', sort_order: 0, created_at: '' },
  { id: '7', image_url: '', category: 'drinks', caption: 'Smoke and citrus', sort_order: 1, created_at: '' },
  { id: '8', image_url: '', category: 'drinks', caption: 'Espresso Martini', sort_order: 2, created_at: '' },
  { id: '9', image_url: '', category: 'drinks', caption: 'Seasonal special', sort_order: 3, created_at: '' },
  { id: '10', image_url: '', category: 'people', caption: 'Behind the bar', sort_order: 0, created_at: '' },
  { id: '11', image_url: '', category: 'people', caption: 'Friday night regulars', sort_order: 1, created_at: '' },
  { id: '12', image_url: '', category: 'people', caption: 'Cheers', sort_order: 2, created_at: '' },
  { id: '13', image_url: '', category: 'nights', caption: 'Vinyl Friday', sort_order: 0, created_at: '' },
  { id: '14', image_url: '', category: 'nights', caption: 'A packed house', sort_order: 1, created_at: '' },
  { id: '15', image_url: '', category: 'nights', caption: 'Guest bartender night', sort_order: 2, created_at: '' },
  { id: '16', image_url: '', category: 'nights', caption: 'Holiday pop-up', sort_order: 3, created_at: '' },
];

// ============================================================

const CATEGORY_CONFIG: { key: GalleryCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'room', label: 'The Room' },
  { key: 'drinks', label: 'The Drinks' },
  { key: 'people', label: 'The People' },
  { key: 'nights', label: 'The Nights' },
];

function PlaceholderTile({ caption, index }: { caption: string | null; index: number }) {
  const hues = [30, 35, 25, 40, 20, 32, 28, 38, 22, 36, 26, 34, 24, 42, 30, 35];
  const hue = hues[index % hues.length];
  return (
    <div
      className="w-full h-full flex items-end p-4"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 30%, 8%) 0%, hsl(${hue}, 40%, 14%) 50%, hsl(${hue}, 25%, 6%) 100%)`,
      }}
    >
      {caption && (
        <span className="text-xs text-revival-cream-dim/60 tracking-wide">{caption}</span>
      )}
    </div>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'all'
    ? DEMO_PHOTOS
    : DEMO_PHOTOS.filter((p) => p.category === activeCategory);

  const sortedPhotos = [...filtered].sort((a, b) => a.sort_order - b.sort_order);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % sortedPhotos.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + sortedPhotos.length) % sortedPhotos.length);
    }
  };

  const heightClasses = [
    'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-square',
    'aspect-[3/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[3/4]',
    'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-square',
    'aspect-[4/5]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]',
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-6 px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-revival-cream">Gallery</h1>
        <p className="mt-3 text-revival-cream-dim text-sm tracking-wide">
          The room. The drinks. The people. The nights.
        </p>
      </section>

      {/* Category filters */}
      <nav className="sticky top-16 z-30 bg-revival-black/90 backdrop-blur-md border-b border-revival-border/30">
        <div className="max-w-6xl mx-auto flex justify-center gap-1 px-4 py-3">
          {CATEGORY_CONFIG.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`
                px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-colors whitespace-nowrap
                ${activeCategory === cat.key
                  ? 'bg-revival-amber/15 text-revival-amber border border-revival-amber/30'
                  : 'text-revival-cream-muted hover:text-revival-cream hover:bg-revival-dark border border-transparent'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Photo grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {sortedPhotos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => openLightbox(i)}
              className={`
                block w-full rounded-lg overflow-hidden border border-revival-border/30
                hover:border-revival-amber/30 transition-all duration-300
                cursor-pointer break-inside-avoid
                ${heightClasses[i % heightClasses.length]}
              `}
            >
              {photo.image_url ? (
                <img
                  src={photo.image_url}
                  alt={photo.caption || 'Revival gallery photo'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <PlaceholderTile caption={photo.caption} index={i} />
              )}
            </button>
          ))}
        </div>

        {sortedPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-revival-cream-dim text-sm">No photos in this category yet.</p>
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-revival-border/30" />
      </div>

      {/* Instagram embed */}
      <InstagramEmbed />

      {/* Lightbox */}
      {lightboxIndex !== null && sortedPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-revival-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-revival-cream-muted hover:text-revival-cream transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 text-revival-cream-muted hover:text-revival-cream transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={36} />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] mx-16 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {sortedPhotos[lightboxIndex].image_url ? (
              <img
                src={sortedPhotos[lightboxIndex].image_url}
                alt={sortedPhotos[lightboxIndex].caption || 'Gallery photo'}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            ) : (
              <div className="w-[600px] max-w-full aspect-[4/3] rounded-lg overflow-hidden">
                <PlaceholderTile
                  caption={sortedPhotos[lightboxIndex].caption}
                  index={lightboxIndex}
                />
              </div>
            )}
            {sortedPhotos[lightboxIndex].caption && (
              <p className="mt-4 text-revival-cream-muted text-sm text-center">
                {sortedPhotos[lightboxIndex].caption}
              </p>
            )}
            <p className="mt-2 text-revival-cream-dim text-xs">
              {lightboxIndex + 1} / {sortedPhotos.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 text-revival-cream-muted hover:text-revival-cream transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
}
