import { TonightData } from '@/types/database';

interface TonightBlockProps {
  data: TonightData;
}

export default function TonightBlock({ data }: TonightBlockProps) {
  // Private event — closure message
  if (data.type === 'private') {
    return (
      <div className="text-center px-6 py-16">
        <p className="font-display text-2xl md:text-3xl text-revival-cream italic leading-relaxed">
          {data.message || 'Revival is hosting a private event this evening.'}
        </p>
        <p className="mt-4 text-revival-cream-dim text-sm tracking-wide">
          We'll see you soon.
        </p>
      </div>
    );
  }

  // Event, recurring special, or fallback
  return (
    <div className="text-center px-6 py-12">
      {/* Label */}
      <p className="text-revival-amber text-xs tracking-[0.3em] uppercase mb-4">
        {data.type === 'event' ? 'Tonight' : data.type === 'recurring' ? "Tonight's Special" : 'Every Night'}
      </p>

      {/* Title */}
      <h2 className="font-display text-3xl md:text-5xl text-revival-cream leading-tight">
        {data.title}
      </h2>

      {/* Description */}
      {data.description && (
        <p className="mt-4 text-revival-cream-muted text-lg max-w-lg mx-auto leading-relaxed">
          {data.description}
        </p>
      )}
    </div>
  );
}
