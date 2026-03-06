'use client';

import { useState } from 'react';
import { GalleryPhoto, GalleryCategory } from '@/types/database';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import InstagramEmbed from '@/components/InstagramEmbed';

// ============================================================
// Gallery — Brand illustrations (real photography coming soon)
// ============================================================
const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: '1', image_url: '/images/illustrations/dreamer.png', category: 'art', caption: 'The Dreamer', sort_order: 0, created_at: '' },
  { id: '2', image_url: '/images/illustrations/mystic.png', category: 'art', caption: 'The Mystic', sort_order: 1, created_at: '' },
  { id: '3', image_url: '/images/illustrations/old-fashioned.png', category: 'art', caption: 'The Old Fashioned', sort_order: 2, created_at: '' },
  { id: '4', image_url: '/images/illustrations/fishing.png', category: 'art', caption: 'Gone Fishing', sort_order: 3, created_at: '' },
  { id: '5', image_url: '/images/illustrations/moon.png', category: 'art', caption: 'Moonlight', sort_order: 4, created_at: '' },
  { id: '6', image_url: '/images/illustrations/snake-guy.png', category: 'art', caption: 'The Snake Charmer', sort_order: 5, created_at: '' },
  { id: '7', image_url: '/images/illustrations/twins.png', category: 'art', caption: 'The Twins', sort_order: 6, created_at: '' },
  // Room
  { id: 'r1', image_url: '/images/gallery/bar-interior.jpg', category: 'room', caption: 'The Bar', sort_order: 10, created_at: '' },
  { id: 'r2', image_url: '/images/gallery/bookshelf.jpg', category: 'room', caption: 'The Library Wall', sort_order: 11, created_at: '' },
  { id: 'r3', image_url: '/images/gallery/revival-exterior.jpg', category: 'room', caption: '119 South Kentucky', sort_order: 12, created_at: '' },
  { id: 'r4', image_url: '/images/gallery/bar-scene.jpg', category: 'room', caption: 'Saturday Night', sort_order: 13, created_at: '' },
  // Drinks
  { id: 'd1', image_url: '/images/gallery/cocktail-rybo.jpg', category: 'drinks', caption: 'The Rybonator', sort_order: 20, created_at: '' },
  { id: 'd2', image_url: '/images/gallery/old-fashioned-photo.jpg', category: 'drinks', caption: 'The Old Fashioned', sort_order: 21, created_at: '' },
  { id: 'd3', image_url: '/images/gallery/ig-blood-orange-cocktail.jpg', category: 'drinks', caption: 'Blood Orange Season', sort_order: 22, created_at: '' },
  { id: 'd4', image_url: '/images/gallery/ig-craft-cocktail.jpg', category: 'drinks', caption: 'Craft & Care', sort_order: 23, created_at: '' },
  { id: 'd5', image_url: '/images/gallery/ig-whiskey.jpg', category: 'drinks', caption: 'Top Shelf', sort_order: 24, created_at: '' },
  { id: 'd6', image_url: '/images/gallery/ig-cocktail-jan.jpg', category: 'drinks', caption: 'January Specials', sort_order: 25, created_at: '' },
  // People
  { id: 'p1', image_url: '/images/gallery/ig-team-photo.jpg', category: 'people', caption: 'The Revival Family', sort_order: 30, created_at: '' },
  // Nights
  { id: 'n1', image_url: '/images/gallery/ig-love-language-menu.jpg', category: 'nights', caption: 'Love Language Menu', sort_order: 40, created_at: '' },
  { id: 'n2', image_url: '/images/gallery/ig-new-years.jpg', category: 'nights', caption: "New Year's Eve", sort_order: 41, created_at: '' },
  { id: 'n3', image_url: '/images/gallery/ig-christmas.jpg', category: 'nights', caption: 'Holiday Season', sort_order: 42, created_at: '' },
  { id: 'n4', image_url: '/images/gallery/ig-halloween.jpg', category: 'nights', caption: 'Halloween at Revival', sort_order: 43, created_at: '' },
];

// ============================================================

const CATEGORY_CONFIG: { key: GalleryCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'room', label: 'The Room' },
  { key: 'drinks', label: 'The Drinks' },
  { key: 'people', label: 'The People' },
  { key: 'nights', label: 'The Nights' },
  { key: 'art', label: 'Brand Art' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

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
        <div className="max-w-6xl mx-auto flex justify-center gap-1 px-4 py-3 overflow-x-auto">
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
              className="
                block w-full rounded-lg overflow-hidden border border-revival-border/30
                hover:border-revival-amber/30 transition-all duration-300
                cursor-pointer break-inside-avoid aspect-[3/4]
              "
            >
              {photo.category === 'art' ? (
                <div className="w-full h-full bg-[#F5EDE0] flex items-center justify-center p-4">
                  <img
                    src={photo.image_url}
                    alt={photo.caption || 'Revival brand illustration'}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <img
                  src={photo.image_url}
                  alt={photo.caption || 'Revival gallery photo'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
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
            {sortedPhotos[lightboxIndex].category === 'art' ? (
              <div className="max-w-full max-h-[75vh] rounded-lg overflow-hidden bg-[#F5EDE0] p-8 flex items-center justify-center">
                <img
                  src={sortedPhotos[lightboxIndex].image_url}
                  alt={sortedPhotos[lightboxIndex].caption || 'Brand illustration'}
                  className="max-w-full max-h-[65vh] object-contain"
                />
              </div>
            ) : (
              <img
                src={sortedPhotos[lightboxIndex].image_url}
                alt={sortedPhotos[lightboxIndex].caption || 'Gallery photo'}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
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
