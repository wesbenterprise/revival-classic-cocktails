'use client';

export default function InstagramEmbed() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl text-revival-cream">
          Follow Along
        </h2>
        <p className="mt-2 text-revival-cream-dim text-sm">
          See what's happening at Revival right now.
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

      {/* 
        Instagram Embed Grid
        
        Option 1 (Recommended): Use a service like Elfsight, SnapWidget, or Behold
        to generate an embed script. Replace the placeholder below with the script/iframe.
        
        Option 2: Use Meta's oEmbed API to pull recent posts server-side.
        Requires a Facebook/Instagram App and access token.
        
        Option 3: Manual — curate specific post embeds using Instagram's native embed feature.
        Each post gets its own <blockquote> + script tag.
      */}
      
      {/* Placeholder grid — replace with live embed */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => {
          const hues = [30, 28, 34, 26, 32, 24, 36, 22];
          const hue = hues[i % hues.length];
          return (
            <a
              key={i}
              href="https://instagram.com/revivallakeland"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square rounded-md overflow-hidden border border-revival-border/30 hover:border-revival-amber/30 transition-all duration-300 group"
            >
              <div
                className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  background: `linear-gradient(135deg, hsl(${hue}, 25%, 10%) 0%, hsl(${hue}, 35%, 18%) 100%)`,
                }}
              >
                <svg
                  className="w-6 h-6 text-revival-cream-dim/30 group-hover:text-revival-amber/40 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </a>
          );
        })}
      </div>

      <p className="text-center mt-4 text-revival-cream-dim text-xs">
        Live feed will be connected via Instagram embed. Showing placeholder.
      </p>
    </section>
  );
}
