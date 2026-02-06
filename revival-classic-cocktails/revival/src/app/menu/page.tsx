import { MenuItem, MenuCategory } from '@/types/database';

// ============================================================
// DEMO DATA — Replace with Supabase query
// ============================================================
const DEMO_MENU: MenuItem[] = [
  // House Originals
  {
    id: '1', category: 'house', name: 'The Revival',
    description: 'Bourbon, honey, lemon, rosemary smoke',
    price: 15, spirit_base: 'bourbon', badge: null, sort_order: 0,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '2', category: 'house', name: 'Midnight in Lakeland',
    description: 'Mezcal, activated charcoal, agave, lime, black salt rim',
    price: 16, spirit_base: 'mezcal', badge: 'new', sort_order: 1,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '3', category: 'house', name: 'Golden Hour',
    description: 'Gin, turmeric, passion fruit, elderflower, prosecco float',
    price: 15, spirit_base: 'gin', badge: null, sort_order: 2,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '4', category: 'house', name: 'Velvet Fog',
    description: 'Vodka, creme de violette, lemon, egg white, lavender mist',
    price: 14, spirit_base: 'vodka', badge: null, sort_order: 3,
    is_archived: false, created_at: '', updated_at: '',
  },
  // Classics
  {
    id: '5', category: 'classics', name: 'Old Fashioned',
    description: 'Bourbon, demerara, Angostura, orange peel',
    price: 14, spirit_base: 'bourbon', badge: null, sort_order: 0,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '6', category: 'classics', name: 'Negroni',
    description: 'Gin, Campari, sweet vermouth',
    price: 14, spirit_base: 'gin', badge: null, sort_order: 1,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '7', category: 'classics', name: 'Daiquiri',
    description: 'White rum, lime, simple — done right',
    price: 13, spirit_base: 'rum', badge: null, sort_order: 2,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '8', category: 'classics', name: 'Manhattan',
    description: 'Rye, sweet vermouth, Angostura, luxardo cherry',
    price: 15, spirit_base: 'rye', badge: null, sort_order: 3,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '9', category: 'classics', name: 'Espresso Martini',
    description: 'Vodka, espresso, coffee liqueur, vanilla',
    price: 15, spirit_base: 'vodka', badge: null, sort_order: 4,
    is_archived: false, created_at: '', updated_at: '',
  },
  // Spirit Free
  {
    id: '10', category: 'spirit_free', name: 'Garden Party',
    description: 'Cucumber, elderflower, lime, soda, mint',
    price: 10, spirit_base: null, badge: null, sort_order: 0,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '11', category: 'spirit_free', name: 'Smoke Signal',
    description: 'Lapsang souchong tea, ginger, honey, lemon',
    price: 10, spirit_base: null, badge: 'new', sort_order: 1,
    is_archived: false, created_at: '', updated_at: '',
  },
  // Beer & Wine
  {
    id: '12', category: 'beer_wine', name: 'Rotating Draft',
    description: 'Ask your bartender — it changes weekly',
    price: 8, spirit_base: null, badge: null, sort_order: 0,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '13', category: 'beer_wine', name: 'House Red',
    description: 'Cotes du Rhone, France',
    price: 12, spirit_base: null, badge: null, sort_order: 1,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '14', category: 'beer_wine', name: 'House White',
    description: 'Albarino, Spain',
    price: 12, spirit_base: null, badge: null, sort_order: 2,
    is_archived: false, created_at: '', updated_at: '',
  },
  // Rotating
  {
    id: '15', category: 'rotating', name: 'Winter Solstice',
    description: 'Rye, allspice dram, maple, walnut bitters, cinnamon',
    price: 16, spirit_base: 'rye', badge: 'seasonal', sort_order: 0,
    is_archived: false, created_at: '', updated_at: '',
  },
  {
    id: '16', category: 'rotating', name: 'Orchard Smash',
    description: 'Apple brandy, pear, thyme, lemon, sparkling cider',
    price: 15, spirit_base: 'brandy', badge: 'seasonal', sort_order: 1,
    is_archived: false, created_at: '', updated_at: '',
  },
];

// ============================================================

const CATEGORY_CONFIG: Record<MenuCategory, { label: string; subtitle: string }> = {
  house: {
    label: 'House Originals',
    subtitle: 'Ours alone.',
  },
  classics: {
    label: 'Classics',
    subtitle: 'Timeless cocktails, done right.',
  },
  spirit_free: {
    label: 'Spirit Free',
    subtitle: 'All the craft, none of the proof.',
  },
  beer_wine: {
    label: 'Beer & Wine',
    subtitle: 'A curated selection.',
  },
  rotating: {
    label: 'Rotating',
    subtitle: 'Here today, gone tomorrow.',
  },
};

const CATEGORY_ORDER: MenuCategory[] = ['house', 'classics', 'spirit_free', 'beer_wine', 'rotating'];

function groupByCategory(items: MenuItem[]): Record<MenuCategory, MenuItem[]> {
  const grouped: Record<MenuCategory, MenuItem[]> = {
    house: [], classics: [], spirit_free: [], beer_wine: [], rotating: [],
  };
  items
    .filter((item) => !item.is_archived)
    .sort((a, b) => a.sort_order - b.sort_order)
    .forEach((item) => grouped[item.category].push(item));
  return grouped;
}

export default function MenuPage() {
  const grouped = groupByCategory(DEMO_MENU);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-10 px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-revival-cream">Menu</h1>
        <p className="mt-3 text-revival-cream-dim text-sm tracking-wide">
          Crafted with intention. Poured with care.
        </p>
      </section>

      {/* Sticky category nav */}
      <nav className="sticky top-16 z-30 bg-revival-black/90 backdrop-blur-md border-b border-revival-border/30">
        <div className="max-w-4xl mx-auto flex overflow-x-auto gap-1 px-4 py-3 scrollbar-hide">
          {CATEGORY_ORDER.map((cat) => {
            if (grouped[cat].length === 0) return null;
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
                {CATEGORY_CONFIG[cat].label}
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
                <div className="mt-4 w-12 h-px bg-revival-amber/50" />
              </div>

              {/* Items */}
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex items-baseline justify-between gap-4">
                      {/* Name + badge */}
                      <div className="flex items-baseline gap-2 min-w-0">
                        <h3 className="font-display text-lg text-revival-cream group-hover:text-revival-amber transition-colors">
                          {item.name}
                        </h3>
                        {item.badge && (
                          <span className={`
                            flex-none text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full
                            ${item.badge === 'new'
                              ? 'bg-revival-amber/20 text-revival-amber'
                              : 'bg-revival-muted text-revival-cream-muted'
                            }
                          `}>
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Dots + Price */}
                      <div className="flex items-baseline gap-2 flex-none">
                        <span className="hidden sm:block text-revival-border tracking-[0.3em] text-xs">
                          ···········
                        </span>
                        {item.price && (
                          <span className="text-revival-cream-muted text-sm tabular-nums">
                            {item.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="mt-1 text-revival-cream-dim text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
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
