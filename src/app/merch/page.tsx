import { Gift } from 'lucide-react';
import { MerchItem } from '@/types/database';

// ============================================================
// DEMO DATA — Replace with Supabase query
// ============================================================
const DEMO_MERCH: MerchItem[] = [
  {
    id: '1', name: 'Revival Logo Tee', description: 'Black cotton tee with embroidered Revival wordmark.',
    price: 30, image_url: null, is_available: true, sort_order: 0,
    created_at: '', updated_at: '',
  },
  {
    id: '2', name: 'Revival Cap', description: 'Structured dad cap. Black with amber stitching.',
    price: 28, image_url: null, is_available: true, sort_order: 1,
    created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'Bar Spoon Set', description: 'Professional-grade bar spoon and jigger. The same tools we use.',
    price: 22, image_url: null, is_available: true, sort_order: 2,
    created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'Revival Rocks Glass', description: 'Heavy-bottom rocks glass with etched logo. Set of two.',
    price: 24, image_url: null, is_available: true, sort_order: 3,
    created_at: '', updated_at: '',
  },
];

const GIFT_CARD_URL = '#'; // TODO: Replace with Toast gift card link

// ============================================================

function PlaceholderImage({ name, index }: { name: string; index: number }) {
  const hues = [32, 28, 36, 24];
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
  const available = DEMO_MERCH.filter((m) => m.is_available).sort((a, b) => a.sort_order - b.sort_order);

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
        <a
          href={GIFT_CARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="
            block rounded-lg border border-revival-amber/30 bg-revival-amber/5
            p-8 text-center group hover:border-revival-amber/60 hover:bg-revival-amber/10
            transition-all duration-300
          "
        >
          <Gift size={28} className="mx-auto text-revival-amber mb-4" />
          <h2 className="font-display text-2xl text-revival-cream group-hover:text-revival-amber transition-colors">
            Gift Cards
          </h2>
          <p className="mt-2 text-revival-cream-muted text-sm">
            Give the gift of a well-made drink. Available in any amount.
          </p>
          <span className="inline-block mt-4 text-revival-amber text-sm tracking-wide">
            Purchase a Gift Card →
          </span>
        </a>
      </section>

      {/* Merch grid */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {available.map((item, i) => (
            <div key={item.id} className="group">
              {/* Image */}
              <div className="aspect-square rounded-lg overflow-hidden border border-revival-border/50 group-hover:border-revival-amber/30 transition-all duration-300">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                {item.price && (
                  <p className="mt-2 text-revival-cream-muted text-sm tabular-nums">
                    ${item.price}
                  </p>
                )}
              </div>

              {/* Available at bar note */}
              <p className="mt-2 text-revival-cream-dim text-[10px] tracking-[0.15em] uppercase">
                Available at the bar
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-revival-cream-dim text-xs tracking-wide">
            All merch is available in-store only. Ask your bartender.
          </p>
        </div>
      </section>
    </div>
  );
}
