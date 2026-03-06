'use client';

import { MapPin, Gift, Navigation, Phone } from 'lucide-react';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import TonightBlock from '@/components/TonightBlock';
import WeeklyStrip from '@/components/WeeklyStrip';
import { TonightData, ScheduleRecurring } from '@/types/database';
import { getTodayDow } from '@/lib/utils';

const WEEKLY_SPECIALS: ScheduleRecurring[] = [
  {
    id: '1', day: 'monday', title: 'Champagne & Charcuterie',
    description: "It's like lunchables but better (you also catch a buzz).",
    image_url: null, is_active: true,
    created_at: '', updated_at: '',
  },
  {
    id: '2', day: 'tuesday', title: 'Test Drink Tuesday',
    description: 'Put down the vodka soda and step outside your comfort zone. Try out one of three weekly drinks invented by yours truly.',
    image_url: null, is_active: true,
    created_at: '', updated_at: '',
  },
  {
    id: '3', day: 'wednesday', title: 'Wanderlust Wednesday',
    description: 'Grab a drink but leave your baggage at home. Every Wednesday, we pick a spot on the map and showcase three drinks that highlight the local cocktail culture.',
    image_url: null, is_active: true,
    created_at: '', updated_at: '',
  },
  {
    id: '4', day: 'thursday', title: 'Tiki Thursday',
    description: "Because who doesn't love a tiny paper umbrella in their drink? Explore the varying tastes of tropical drinks.",
    image_url: null, is_active: true,
    created_at: '', updated_at: '',
  },
];

// ============================================================

const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=119+S+Kentucky+Ave+Lakeland+FL+33801';

export default function HomePage() {
  // TODO: Replace with real data from Supabase
  const isOpen = true;
  const todayHours = '5 PM – 12 AM';

  // Dynamic tonight's special based on current day (EST)
  const today = getTodayDow();
  const tonightSpecial = WEEKLY_SPECIALS.find(s => s.day === today);
  const tonightData: TonightData = tonightSpecial
    ? { type: 'recurring', title: tonightSpecial.title, description: tonightSpecial.description || '' }
    : { type: 'recurring', title: 'Craft Cocktails', description: 'Handcrafted drinks in the heart of downtown Lakeland.' };

  return (
    <div className="min-h-screen">
      {/* ============================
          HERO
          ============================ */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Semi-transparent overlay — global moody background shows through */}
        <div className="absolute inset-0 bg-revival-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-revival-amber)_0%,_transparent_70%)] opacity-[0.06]" />

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 animate-fade-in">
          {/* Logo */}
          <h1 className="sr-only">Revival Craft Cocktails – Lakeland, FL</h1>
          <img
            src="/images/revival-logo.jpg"
            alt="Revival Craft Cocktails"
            className="h-32 md:h-44 w-auto"
          />
          <p className="text-revival-cream-dim text-sm tracking-[0.25em] uppercase -mt-4">
            Craft Cocktails · Lakeland, FL
          </p>

          {/* Status */}
          <StatusBadge isOpen={isOpen} todayHours={todayHours} />
          <p className="text-revival-cream-muted text-xs tracking-wide -mt-4">
            119 S Kentucky Ave, Lakeland, FL 33801
          </p>
          <a
            href="tel:+18636066090"
            className="inline-flex items-center gap-1.5 text-revival-cream-muted text-xs tracking-wide hover:text-revival-amber transition-colors -mt-4"
          >
            <Phone size={11} />
            (863) 606-6090
          </a>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-revival-cream-dim text-xs tracking-wide hover:text-revival-amber transition-colors -mt-4"
          >
            <Navigation size={11} />
            Directions
          </a>

          {/* Tonight feature */}
          <TonightBlock data={tonightData} />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-full
                bg-revival-amber text-revival-black font-medium text-sm tracking-wide
                hover:bg-revival-amber-light transition-colors
              "
            >
              <MapPin size={16} />
              Get Directions
            </a>
            <a
              href="#"
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-full
                border border-revival-border text-revival-cream-muted text-sm tracking-wide
                hover:border-revival-amber hover:text-revival-amber transition-colors
              "
            >
              <Gift size={16} />
              Gift Cards
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-soft">
          <div className="w-px h-8 bg-gradient-to-b from-revival-amber/50 to-transparent" />
        </div>
      </section>

      {/* ============================
          WEEKLY REVIVAL FEATURE
          ============================ */}
      <section className="max-w-2xl mx-auto text-center px-6 py-12">
        <div className="rounded-lg border border-revival-red/40 bg-revival-red/10 px-6 py-5">
          <p className="text-revival-amber text-xs tracking-[0.3em] uppercase mb-2">Weekly Revival</p>
          <p className="text-revival-cream text-sm leading-relaxed">
            For one week only: a custom recipe or a riff on a classic. <span className="text-revival-amber font-medium">$12.</span>
          </p>
        </div>
      </section>

      {/* ============================
          WEEKLY SPECIALS
          ============================ */}
      <section className="max-w-6xl mx-auto">
        <WeeklyStrip specials={WEEKLY_SPECIALS} />
      </section>

      {/* ============================
          BOTTOM SECTION
          ============================ */}
      <section className="max-w-2xl mx-auto text-center px-6 py-20">
        <p className="font-display text-2xl md:text-3xl text-revival-cream leading-relaxed">
          Dark corners. Bright drinks.
          <br />
          Good company.
        </p>
        <p className="mt-6 text-revival-cream-muted text-sm leading-relaxed max-w-md mx-auto">
          Founded by Jeannie Weaver Lopez, Revival was born from one belief —
          Lakeland deserved a place where the drinks were taken seriously but the
          people never were. Her spirit lives on in every pour.
        </p>
        <Link
          href="/jeannie"
          className="inline-block mt-4 text-revival-amber text-sm tracking-wide hover:text-revival-amber-light transition-colors"
        >
          Her Story →
        </Link>
        <p className="mt-8 text-revival-cream-dim text-xs tracking-wide">
          No reservations. Just walk in.
        </p>
      </section>

      {/* SEO body copy */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <p className="text-revival-cream-dim text-sm leading-relaxed text-center">
          Revival Craft Cocktails is downtown Lakeland&apos;s dedicated craft cocktail bar.
          Every drink is built from scratch with in-house syrups, hand-cut garnishes, and
          carefully sourced spirits. From our signature Old Fashioned program to the weekly
          rotating cocktail, there&apos;s always something new to discover. Happy hour runs
          Monday through Friday, 1 PM to 7 PM, with craft cocktails starting at $6. Walk in
          tonight — no reservations needed.
        </p>
      </section>
    </div>
  );
}
