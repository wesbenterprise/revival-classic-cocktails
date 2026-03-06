'use client';

import { useEffect } from 'react';

const INSTAGRAM_POSTS = [
  'https://www.instagram.com/p/DGzJn5WR8rQ/',
  'https://www.instagram.com/p/DGVXeeFxuQq/',
  'https://www.instagram.com/p/DFaFwMrx6d4/',
  'https://www.instagram.com/p/DEz2q-yReXd/',
];

export default function InstagramEmbed() {
  useEffect(() => {
    // Load Instagram embed script
    const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (existingScript) {
      // Re-process embeds if script already loaded
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
      return;
    }

    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup not strictly necessary since Instagram's script is idempotent
    };
  }, []);

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INSTAGRAM_POSTS.map((url) => (
          <div key={url} className="flex justify-center">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                maxWidth: '540px',
                width: '100%',
                minWidth: '280px',
                padding: '0',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
