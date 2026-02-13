'use client';

interface StatusBadgeProps {
  isOpen: boolean;
  minutesToClose: number | null;
  todayHours: string;
}

export default function StatusBadge({ isOpen, minutesToClose, todayHours }: StatusBadgeProps) {
  // Three open tiers: normal, closing soon (<60m), last call (<20m)
  const lastCall = isOpen && minutesToClose !== null && minutesToClose <= 20;
  const closingSoon = isOpen && !lastCall && minutesToClose !== null && minutesToClose <= 60;

  let dotColor: string;
  let pingClass: string;
  let labelColor: string;
  let label: string;

  if (lastCall) {
    dotColor = 'bg-orange-600';
    pingClass = 'animate-glow-orange bg-orange-600';
    labelColor = 'text-orange-500';
    label = 'Open — Last Call';
  } else if (closingSoon) {
    dotColor = 'bg-amber-400';
    pingClass = 'animate-glow-amber bg-amber-400';
    labelColor = 'text-amber-400';
    label = 'Open';
  } else if (isOpen) {
    dotColor = 'bg-revival-open';
    pingClass = 'animate-ping bg-revival-open';
    labelColor = 'text-revival-open';
    label = 'Open';
  } else {
    dotColor = 'bg-revival-closed';
    pingClass = '';
    labelColor = 'text-revival-closed';
    label = 'Closed';
  }

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-revival-dark/80 border border-revival-border/50">
      <span className="relative flex h-2.5 w-2.5">
        {isOpen && (
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${pingClass}`} />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColor}`}
        />
      </span>
      <span className="text-sm tracking-wide">
        <span className={labelColor}>
          {label}
        </span>
        <span className="text-revival-cream-dim ml-2">
          {todayHours}
        </span>
      </span>
    </div>
  );
}
