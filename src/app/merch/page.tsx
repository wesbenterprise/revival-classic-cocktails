import { Gift } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { MerchItem } from '@/types/database';

export const metadata: Metadata = {
  title: 'Merch | Revival Craft Cocktails — Lakeland, FL',
  description: 'Keychains, prints, tiki mugs, and more. Take a piece of Revival home with you. Available in-store at 119 S Kentucky Ave, Lakeland.',
};

// ============================================================
// MERCH DATA — Replace with Supabase query when ready
// ============================================================
const MERCH_ITEMS: MerchItem[] = [
  {
    id: '1', name: 'House of Spirits Keychain',
    description: 'Revival keychain — snake wrapped around martini glass, stars and moons. "House of Spirits."',
    price: null, image_url: '/images/merch/house-keychain.png',
    is_available: true, sort_order: 0, created_at: '', updated_at: '',
  },
  {
    id: '2', name: 'Pick Your Poison Keychain',
    description: 'Revival keychain — snake and martini glass with "Pick Your Poison" detail.',
    price: null, image_url: '/images/merch/poison-keychain.png',
    is_available: true, sort_order: 1, created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'Palmistry Print',
    description: 'Palmistry hand illustration with snake, star logo, and "Purveyors of Fine Spirits" text. Dark background with gold stars.',
    price: null, image_url: '/images/merch/palmistry-print.png',
    is_available: true, sort_order: 2, created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'Revival Star Logo',
    description: 'The iconic 12-point star with gold serif R. Available on various items.',
    price: null, image_url: '/images/merch/star-logo-item.png',
    is_available: true, sort_order: 3, created_at: '', updated_at: '',
  },
  {
    id: '5', name: 'Revival Forever',
    description: 'Revival Forever wordmark with intertwined snake. Red and black striped snake, gold star accent.',
    price: null, image_url: '/images/merch/revival-forever-item.png',
    is_available: true, sort_order: 4, created_at: '', updated_at: '',
  },
  {
    id: '6', name: 'Tiki Mug',
    description: 'Revival tiki mug. The same ones we serve drinks in. Take one home.',
    price: 25, image_url: null,
    is_available: true, sort_order: 5, created_at: '', updated_at: '',
  },
];

const GIFT_CARD_URL = '#'; // TODO: Replace with Toast gift card link — waiting on Ryan

// ============================================================

function PlaceholderImage({ name, index }: { name: string; index: number }) {
  const hues = [32, 28, 36, 24, 30, 26];
  const hue = hues[index % hues.length];
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: `linear-gradient(145deg, hsl(${hue}, 25%, 10%) 0%, hsl(${hue}, 35%, 16%) 100%)`,
      }}
    >
      <span className="font-display text-2xl text-revival-cream-dim/40">
        {name.split(' ').map(w => w[0]).join('').slice(0, 2)}
      </span>
    </div>
  );
}

export default function MerchPage() {
  const available = MERCH_ITEMS.filter((m) => m.is_available).sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-10 px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-revival-cream">Merch</h1>
        <p className="mt-3 text-revival-cream-dim text-sm tracking-wide">
          Take a piece of the bar home with you.
        </p>
      </section>

      {/* Gift Card CTA */}
      <section className="max-w-2xl mx-auto px-6 mb-12">
        <div
          className="
            block rounded-lg border border-revival-amber/30 bg-revival-amber/5
            p-8 text-center
          "
        >
          <Gift size={28} className="mx-auto text-revival-amber mb-4" />
          <h2 className="font-display text-2xl text-revival-cream">
            Gift Cards
          </h2>
          <p className="mt-2 text-revival-cream-muted text-sm">
            Give the gift of a well-made drink. Available in any amount.
          </p>
          <span className="inline-block mt-4 text-revival-amber/60 text-sm tracking-wide">
            Coming Soon
          </span>
        </div>
      </section>

      {/* Merch grid */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {available.map((item, i) => (
            <div key={item.id} className="group">
              {/* Image */}
              <div className="aspect-square rounded-lg overflow-hidden border border-revival-border/50 group-hover:border-revival-amber/30 transition-all duration-300 bg-[#F5F0E8]">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-2"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <PlaceholderImage name={item.name} index={i} />
                )}
              </div>

              {/* Details */}
              <div className="mt-3">
                <h3 className="font-display text-base text-revival-cream group-hover:text-revival-amber transition-colors">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="mt-1 text-revival-cream-dim text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}
                {item.price ? (
                  <p className="mt-2 text-revival-cream-muted text-sm tabular-nums">
                    ${item.price}
                  </p>
                ) : (
                  <p className="mt-2 text-revival-cream-dim text-[10px] tracking-[0.15em] uppercase">
                    Price available in-store
                  </p>
                )}
              </div>

              {/* Available at bar note */}
              <p className="mt-1 text-revival-cream-dim text-[10px] tracking-[0.15em] uppercase">
                Available at the bar
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-revival-cream-dim text-xs tracking-wide">
            All merch is available in-store only. Prices available in-store — ask your bartender.
          </p>
        </div>
      </section>
    </div>
  );
}
