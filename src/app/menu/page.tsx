import { Metadata } from 'next';
import { MenuItem, MenuCategory, WineSubcategory } from '@/types/database';
import DrinkItem from '@/components/DrinkItem';
import { fetchMenuItems } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Cocktail Menu | Revival Craft Cocktails — Lakeland, FL',
  description:
    'House originals, classics, spirit-free cocktails, and craft beer. Made with in-house syrups and custom garnishes. New Weekly Revival every Tuesday, $12.',
};

// ============================================================
// REAL MENU DATA — from revival-menu-data.json
// ============================================================

const CATEGORY_CONFIG: Record<MenuCategory, { label: string; subtitle: string }> = {
  old_fashioneds: {
    label: 'Old Fashioneds',
    subtitle: 'Our signature program. 15 ways to start the night.',
  },
  seasonal: {
    label: 'Seasonal Offerings',
    subtitle: 'Limited runs. Crafted for the moment.',
  },
  classics: {
    label: 'Classics',
    subtitle: 'Timeless cocktails, Revival style.',
  },
  tiki: {
    label: 'Tiki',
    subtitle: 'All Tiki drinks can be served sharable for $40. Best for groups of 3.',
  },
  spritz: {
    label: 'Spritz',
    subtitle: 'Light, bright, and built for the Florida sun.',
  },
  happy_hour_6: {
    label: 'Happy Hour — $6 Favorites',
    subtitle: 'Monday–Friday, 1 PM – 7 PM.',
  },
  happy_hour_8: {
    label: 'Happy Hour — $8 Revival Favorites',
    subtitle: 'Monday–Friday, 1 PM – 7 PM.',
  },
  mocktails: {
    label: 'Mocktails',
    subtitle: 'All the craft, none of the proof.',
  },
  spirit_flights: {
    label: 'Spirit Flights',
    subtitle: 'Four \u00BE oz pours of your chosen spirit.',
  },
  wine: {
    label: 'Wine',
    subtitle: 'A curated selection by the glass.',
  },
  draft_beer: {
    label: 'Draft Beer',
    subtitle: 'On tap.',
  },
  bottles_cans: {
    label: 'Bottles & Cans',
    subtitle: 'From the cooler.',
  },
  non_alcoholic: {
    label: 'Non-Alcoholic',
    subtitle: 'For the designated drivers and the sober-curious.',
  },
};

const CATEGORY_ORDER: MenuCategory[] = [
  'old_fashioneds',
  'seasonal',
  'classics',
  'tiki',
  'spritz',
  'happy_hour_6',
  'happy_hour_8',
  'mocktails',
  'spirit_flights',
  'wine',
  'draft_beer',
  'bottles_cans',
  'non_alcoholic',
];

const WINE_SUBCATEGORY_LABELS: Record<WineSubcategory, string> = {
  bubbles: 'Bubbles',
  white: 'White',
  red: 'Red',
};

// ============================================================

function groupByCategory(items: MenuItem[]): Record<MenuCategory, MenuItem[]> {
  const grouped = {} as Record<MenuCategory, MenuItem[]>;
  for (const cat of CATEGORY_ORDER) {
    grouped[cat] = [];
  }
  items
    .filter((item) => !item.is_archived)
    .sort((a, b) => a.sort_order - b.sort_order)
    .forEach((item) => grouped[item.category]?.push(item));
  return grouped;
}

export const revalidate = 60;

export default async function MenuPage() {
  const menuItems = await fetchMenuItems();
  const grouped = groupByCategory(menuItems as MenuItem[]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-10 px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-revival-cream">Menu</h1>
        <p className="mt-3 text-revival-cream-dim text-sm tracking-wide">
          Crafted with intention. Poured with care.
        </p>
      </section>

      {/* Weekly Revival banner */}
      <div className="max-w-2xl mx-auto px-6 mb-6">
        <div className="rounded-lg border border-revival-red/40 bg-revival-red/10 px-5 py-4 text-center">
          <p className="text-revival-amber text-xs tracking-[0.2em] uppercase mb-1">Weekly Revival</p>
          <p className="text-revival-cream text-sm">
            For one week only: a custom recipe or a riff on a classic. <span className="text-revival-amber font-medium">$12.</span>
          </p>
        </div>
      </div>

      {/* Bartender's Choice */}
      <div className="max-w-2xl mx-auto px-6 mb-8">
        <div className="rounded-lg border border-revival-amber/30 bg-revival-dark p-6 text-center">
          <p className="text-revival-amber text-xs tracking-[0.2em] uppercase mb-2">★ Bartender&apos;s Choice</p>
          <p className="text-revival-cream-muted text-sm">
            Let us take a stab at your new favorite drink. All we need is a little guidance.
          </p>
          <div className="mt-4 space-y-2 text-xs text-revival-cream-dim">
            <p>
              <span className="text-revival-cream-muted font-medium">Spirit:</span>{' '}
              Vodka · Gin · Rum · Tequila · Mezcal · Bourbon · Rye · Scotch
            </p>
            <p>
              <span className="text-revival-cream-muted font-medium">Profile:</span>{' '}
              Spirit Forward · Fruity · Refreshing · Citrusy · Savory · Sweet · Herbal · Spicy · Bitter · Floral · Smoky · Non-Alcoholic
            </p>
          </div>
        </div>
      </div>

      {/* Sticky category nav */}
      <nav className="sticky top-16 z-30 bg-revival-black/90 backdrop-blur-md border-b border-revival-border/30">
        <div className="max-w-4xl mx-auto flex overflow-x-auto gap-1 px-4 py-3 scrollbar-hide">
          {CATEGORY_ORDER.map((cat) => {
            if (grouped[cat].length === 0) return null;
            const shortLabel = CATEGORY_CONFIG[cat].label
              .replace('Happy Hour \u2014 ', '')
              .replace(' Favorites', '');
            return (
              <a
                key={cat}
                href={`#${cat}`}
                className="
                  flex-none px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase
                  text-revival-cream-muted hover:text-revival-cream
                  hover:bg-revival-dark transition-colors whitespace-nowrap
                "
              >
                {shortLabel}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Menu sections */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        {CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat];
          if (items.length === 0) return null;
          const config = CATEGORY_CONFIG[cat];
          const isHappyHour = cat === 'happy_hour_6' || cat === 'happy_hour_8';
          const isWine = cat === 'wine';
          const isTiki = cat === 'tiki';

          return (
            <section key={cat} id={cat} className="pt-16 first:pt-10">
              {/* Category header */}
              <div className="mb-8">
                <h2 className="font-display text-2xl md:text-3xl text-revival-cream">
                  {config.label}
                </h2>
                <p className="mt-1 text-revival-cream-dim text-sm italic">
                  {config.subtitle}
                </p>
                {isHappyHour && (
                  <p className="mt-2 text-revival-amber text-xs tracking-[0.15em] uppercase font-medium">
                    Monday–Friday, 1 PM – 7 PM
                  </p>
                )}
                {cat === 'happy_hour_6' && (
                  <p className="mt-2 text-revival-cream-dim text-xs leading-relaxed">
                    Well spirits $6: Wheatley Vodka, Ford Gin, Plantation 3 Stars Rum, Corazon Tequila, Old Forester Bourbon. House wines $6.
                  </p>
                )}
                {isTiki && (
                  <p className="mt-2 text-revival-cream-dim text-xs">
                    Single serve Tiki mugs available for purchase — $25.
                  </p>
                )}
                <div className={`mt-4 w-12 h-px ${cat === 'old_fashioneds' ? 'bg-revival-red/60' : 'bg-revival-amber/50'}`} />
              </div>

              {/* Items — wine gets subcategory sub-headers */}
              {isWine ? (
                <div className="space-y-6">
                  {(['bubbles', 'white', 'red'] as WineSubcategory[]).map((sub) => {
                    const subItems = items.filter((i) => i.subcategory === sub);
                    if (subItems.length === 0) return null;
                    return (
                      <div key={sub}>
                        <h3 className="text-revival-amber text-xs tracking-[0.2em] uppercase mb-4">
                          {WINE_SUBCATEGORY_LABELS[sub]}
                        </h3>
                        <div className="space-y-6">
                          {subItems.map((item) => (
                            <DrinkItem key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <DrinkItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* Bottom note */}
        <div className="mt-20 pt-10 border-t border-revival-border/30 text-center">
          <p className="text-revival-cream-dim text-xs tracking-wide">
            Menu changes seasonally. Prices do not include tax or gratuity.
          </p>
          <p className="mt-2 text-revival-cream-dim text-xs tracking-wide">
            Please inform your bartender of any allergies.
          </p>
        </div>
      </div>
    </div>
  );
}
