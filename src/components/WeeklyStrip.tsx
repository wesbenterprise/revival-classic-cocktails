import { ScheduleRecurring, DayOfWeek } from '@/types/database';
import { getDayLabel, getTodayDow } from '@/lib/utils';

interface WeeklyStripProps {
  specials: ScheduleRecurring[];
}

const DAY_ORDER: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function WeeklyStrip({ specials }: WeeklyStripProps) {
  const today = getTodayDow();

  if (specials.length === 0) return null;

  // Sort by day order
  const sorted = [...specials].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
  );

  return (
    <section className="py-10">
      <h3 className="text-center text-revival-amber text-xs tracking-[0.3em] uppercase mb-6">
        This Week
      </h3>
      <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
        {sorted.map((special) => {
          const isToday = special.day === today;
          return (
            <div
              key={special.id}
              className={`
                flex-none w-56 snap-center rounded-lg p-5
                border transition-colors
                ${isToday
                  ? 'bg-revival-amber/10 border-revival-amber/40'
                  : 'bg-revival-dark border-revival-border/50 hover:border-revival-border'
                }
              `}
            >
              <p className={`text-xs tracking-[0.2em] uppercase mb-2 ${
                isToday ? 'text-revival-amber' : 'text-revival-cream-dim'
              }`}>
                {isToday ? '→ Tonight' : getDayLabel(special.day)}
              </p>
              <p className="font-display text-lg text-revival-cream">
                {special.title}
              </p>
              {special.description && (
                <p className="mt-1 text-sm text-revival-cream-muted line-clamp-2">
                  {special.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
