'use client';

export default function InstagramEmbed() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl text-revival-cream">
          Follow Along
        </h2>
        <p className="mt-2 text-revival-cream-dim text-sm">
          See what&apos;s happening at Revival right now.
        </p>
        <a
          href="https://instagram.com/revivallakeland"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2 mt-4 text-revival-amber text-sm tracking-wide
            hover:text-revival-amber-light transition-colors
          "
        >
          @revivallakeland →
        </a>
      </div>

      {/* Instagram feed snapshot */}
      <div className="max-w-sm md:max-w-md mx-auto">
        <a
          href="https://instagram.com/revivallakeland"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg overflow-hidden border border-revival-border/30 hover:border-revival-amber/30 transition-all duration-300"
        >
          <img
            src="/images/gallery/instagram-feed.jpg"
            alt="Revival Lakeland Instagram — @revivallakeland"
            className="w-full h-auto"
          />
        </a>
      </div>

      <p className="text-center mt-4 text-revival-cream-dim text-xs">
        Follow us on Instagram for the latest cocktails, events, and vibes.
      </p>
    </section>
  );
}
