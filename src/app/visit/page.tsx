import { MapPin, Clock, Car, Users, Navigation, Phone } from 'lucide-react';
import { DayOfWeek } from '@/types/database';
import { formatTime12, getDayLabel, getTodayDow } from '@/lib/utils';
import { SITE_HOURS, SITE_ADDRESS } from '@/lib/siteConfig';

// Monday-first order for display
const DISPLAY_DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const PARKING = 'Free street parking along Kentucky Ave and surrounding downtown blocks.';

const WALK_IN_POLICY = "Seating is first come, first serve. Just walk in.";

const NEIGHBORHOOD = 'In the heart of downtown Lakeland, just off Munn Park.';

export default function VisitPage() {
  const today = getTodayDow();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-10 px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-revival-cream">Visit</h1>
        <p className="mt-3 text-revival-cream-dim text-sm tracking-wide">
          {NEIGHBORHOOD}
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Map embed */}
        <section className="rounded-lg overflow-hidden border border-revival-border/50 mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d878.8!2d-81.9557!3d28.0394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dd39d8b4a2f28f%3A0x7e9e5e5d44df7a3e!2s119%20S%20Kentucky%20Ave%2C%20Lakeland%2C%20FL%2033801!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="350"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Revival Craft Cocktails — 119 S Kentucky Ave, Lakeland, FL"
            className="w-full"
          />
        </section>

        {/* Info grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left column */}
          <div className="space-y-10">
            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-revival-amber" />
                <h2 className="text-xs tracking-[0.3em] uppercase text-revival-amber">Address</h2>
              </div>
              <p className="font-display text-xl text-revival-cream leading-relaxed">
                {SITE_ADDRESS.street}
              </p>
              <p className="text-revival-cream-muted">
                {SITE_ADDRESS.city}, {SITE_ADDRESS.state} {SITE_ADDRESS.zip}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <a
                  href={SITE_ADDRESS.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                    bg-revival-amber text-revival-black font-medium text-sm tracking-wide
                    hover:bg-revival-amber-light transition-colors
                  "
                >
                  <Navigation size={14} />
                  Get Directions
                </a>
                <a
                  href={`tel:${SITE_ADDRESS.phone.replace(/[^\d]/g, '')}`}
                  className="
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                    border border-revival-border text-revival-cream-muted text-sm tracking-wide
                    hover:border-revival-amber hover:text-revival-amber transition-colors
                  "
                >
                  <Phone size={14} />
                  {SITE_ADDRESS.phone}
                </a>
              </div>
            </div>

            {/* Parking */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Car size={16} className="text-revival-amber" />
                <h2 className="text-xs tracking-[0.3em] uppercase text-revival-amber">Parking</h2>
              </div>
              <p className="text-revival-cream-muted leading-relaxed">
                {PARKING}
              </p>
            </div>

            {/* Walk-in policy */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-revival-amber" />
                <h2 className="text-xs tracking-[0.3em] uppercase text-revival-amber">Seating</h2>
              </div>
              <p className="font-display text-xl text-revival-cream italic">
                {WALK_IN_POLICY}
              </p>
            </div>
          </div>

          {/* Right column — Hours */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-revival-amber" />
              <h2 className="text-xs tracking-[0.3em] uppercase text-revival-amber">Hours</h2>
            </div>

            <div className="rounded-lg border border-revival-border/50 overflow-hidden">
              {DISPLAY_DAYS.map((day) => {
                const hours = SITE_HOURS[day];
                const isToday = day === today;

                return (
                  <div
                    key={day}
                    className={`
                      flex items-center justify-between px-5 py-3.5
                      border-b border-revival-border/20 last:border-b-0
                      ${isToday ? 'bg-revival-amber/5' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-revival-amber flex-none" />
                      )}
                      <span className={`text-sm ${isToday ? 'text-revival-cream font-medium' : 'text-revival-cream-muted'}`}>
                        {getDayLabel(day)}
                      </span>
                    </div>
                    <span className={`text-sm tabular-nums ${isToday ? 'text-revival-amber' : 'text-revival-cream-dim'}`}>
                      {hours.is_closed || !hours.open || !hours.close
                        ? 'Closed'
                        : `${formatTime12(hours.open)} – ${formatTime12(hours.close)}`
                      }
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
