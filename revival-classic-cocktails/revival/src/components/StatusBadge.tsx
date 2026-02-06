'use client';

interface StatusBadgeProps {
  isOpen: boolean;
  todayHours: string;
}

export default function StatusBadge({ isOpen, todayHours }: StatusBadgeProps) {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-revival-dark/80 border border-revival-border/50">
      <span className="relative flex h-2.5 w-2.5">
        {isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-revival-open opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isOpen ? 'bg-revival-open' : 'bg-revival-closed'
          }`}
        />
      </span>
      <span className="text-sm tracking-wide">
        <span className={isOpen ? 'text-revival-open' : 'text-revival-closed'}>
          {isOpen ? 'Open Now' : 'Closed'}
        </span>
        <span className="text-revival-cream-dim ml-2">
          {todayHours}
        </span>
      </span>
    </div>
  );
}
