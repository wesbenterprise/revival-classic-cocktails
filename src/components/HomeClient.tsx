'use client';

import { MapPin, Gift, Navigation, Phone } from 'lucide-react';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import TonightBlock from '@/components/TonightBlock';
import WeeklyStrip from '@/components/WeeklyStrip';
import { TonightData, ScheduleRecurring, HoursConfig } from '@/types/database';
import { getTodayDow, isCurrentlyOpen, minutesToClose, minutesToOpen, getTodayHoursString } from '@/lib/utils';
import { SITE_ADDRESS } from '@/lib/siteConfig';

interface HomeClientProps {
  specials: ScheduleRecurring[];
  hours: HoursConfig;
}

export default function HomeClient({ specials, hours }: HomeClientProps) {
  const isOpen = isCurrentlyOpen(hours);
  const minsLeft = minutesToClose(hours);
  const minsToOpen = minutesToOpen(hours);
  const todayHours = getTodayHoursString(hours);

  // Dynamic tonight's special based on current day (EST)
  const today = getTodayDow();
  const tonightSpecial = specials.find(s => s.day === today);
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
          <StatusBadge isOpen={isOpen} minutesToClose={minsLeft} minutesToOpen={minsToOpen} todayHours={todayHours} />
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
            href={SITE_ADDRESS.google_maps_url}
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
              href={SITE_ADDRESS.google_maps_url}
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
          WEEKLY SPECIALS
          ============================ */}
      <section className="max-w-6xl mx-auto">
        <WeeklyStrip specials={specials} />
      </section>

      {/* ============================
          WEEKLY REVIVAL FEATURE
          ============================ */}
      <section className="max-w-2xl mx-auto text-center px-6 py-12">
        <div className="rounded-lg border border-revival-amber/30 bg-revival-amber/5 p-8">
          <p className="text-revival-amber text-xs tracking-[0.3em] uppercase mb-3">
            Weekly Revival
          </p>
          <p className="font-display text-2xl text-revival-cream">
            For one week only
          </p>
          <p className="mt-3 text-revival-cream-muted text-sm leading-relaxed max-w-md mx-auto">
            A custom recipe or a riff on a classic. New every week. $12.
          </p>
        </div>
      </section>

      {/* SEO body copy */}
      <section className="max-w-2xl mx-auto px-6 py-8">
        <p className="text-revival-cream-muted text-sm leading-relaxed">
          Revival Craft Cocktails is downtown Lakeland&apos;s dedicated cocktail bar, located at
          119 South Kentucky Avenue just off Munn Park. Every drink on our menu is built with
          in-house syrups, fresh-pressed juices, and custom garnishes — from our signature program
          of 15 Old Fashioned variations to seasonal originals, tiki drinks, and spirit-free cocktails.
          Happy hour runs Monday through Friday, 1 PM to 7 PM, with well cocktails starting at $6.
          Try a new Weekly Revival every week for $12, or let our bartenders craft something just for
          you with Bartender&apos;s Choice. Walk in tonight — no reservations needed.
        </p>
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
    </div>
  );
}
