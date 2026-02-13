'use client';

interface StatusBadgeProps {
  isOpen: boolean;
  closingSoon?: boolean;
  todayHours: string;
}

export default function StatusBadge({ isOpen, closingSoon, todayHours }: StatusBadgeProps) {
  const showClosingSoon = isOpen && closingSoon;

  const dotColor = showClosingSoon
    ? 'bg-amber-500'
    : isOpen
      ? 'bg-revival-open'
      : 'bg-revival-closed';

  const pingClass = showClosingSoon
    ? 'animate-glow-amber bg-amber-500'
    : 'animate-ping bg-revival-open';

  const labelColor = showClosingSoon
    ? 'text-amber-500'
    : isOpen
      ? 'text-revival-open'
      : 'text-revival-closed';

  const label = showClosingSoon
    ? 'Come Soon'
    : isOpen
      ? 'Open Now'
      : 'Closed';

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
