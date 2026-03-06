'use client';

interface StatusBadgeProps {
  isOpen: boolean;
  minutesToClose: number | null;
  minutesToOpen: number | null;
  todayHours: string;
}

export default function StatusBadge({ isOpen, minutesToClose, minutesToOpen, todayHours }: StatusBadgeProps) {
  // Open tiers
  const lastCall = isOpen && minutesToClose !== null && minutesToClose <= 20;
  const closingSoon = isOpen && !lastCall && minutesToClose !== null && minutesToClose <= 60;

  // Pre-open tier
  const openingSoon = !isOpen && minutesToOpen !== null && minutesToOpen <= 60;

  let dotColor: string;
  let pingClass: string;
  let labelColor: string;
  let label: string;
  let showPing = false;

  if (lastCall) {
    dotColor = 'bg-orange-600';
    pingClass = 'animate-glow-orange bg-orange-600';
    labelColor = 'text-orange-500';
    label = 'Open — Last Call';
    showPing = true;
  } else if (closingSoon) {
    dotColor = 'bg-amber-400';
    pingClass = 'animate-glow-amber bg-amber-400';
    labelColor = 'text-amber-400';
    label = 'Open';
    showPing = true;
  } else if (isOpen) {
    dotColor = 'bg-revival-open';
    pingClass = 'animate-ping bg-revival-open';
    labelColor = 'text-revival-open';
    label = 'Open';
    showPing = true;
  } else if (openingSoon) {
    dotColor = 'bg-yellow-400';
    pingClass = 'animate-glow-yellow bg-yellow-400';
    labelColor = 'text-yellow-400';
    label = 'Opening Soon';
    showPing = true;
  } else {
    dotColor = 'bg-revival-closed';
    pingClass = '';
    labelColor = 'text-revival-closed';
    label = 'Closed';
  }

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-revival-dark/80 border border-revival-border/50">
      <span className="relative flex h-2.5 w-2.5">
        {showPing && (
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
