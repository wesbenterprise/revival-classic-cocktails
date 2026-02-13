import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-revival-border/50 bg-revival-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <img src="/images/revival-logo.jpg" alt="Revival Craft Cocktails" className="h-12 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-revival-cream-dim">
              A craft cocktail bar in Lakeland, FL
            </p>
          </div>

          {/* Quick links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <Link href="/menu" className="text-sm text-revival-cream-muted hover:text-revival-cream transition-colors">Menu</Link>
              <Link href="/visit" className="text-sm text-revival-cream-muted hover:text-revival-cream transition-colors">Visit</Link>
              <Link href="/team" className="text-sm text-revival-cream-muted hover:text-revival-cream transition-colors">Our Story</Link>
              <Link href="/jeannie" className="text-sm text-revival-cream-muted hover:text-revival-cream transition-colors">Jeannie</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/gallery" className="text-sm text-revival-cream-muted hover:text-revival-cream transition-colors">Gallery</Link>
              <Link href="/merch" className="text-sm text-revival-cream-muted hover:text-revival-cream transition-colors">Merch</Link>
              <Link href="/contact" className="text-sm text-revival-cream-muted hover:text-revival-cream transition-colors">Contact Us</Link>
              <Link href="/contact?category=employment" className="text-sm text-revival-cream-muted hover:text-revival-cream transition-colors">Career Opportunities</Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <a
              href="https://instagram.com/revivallakeland"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-revival-cream-muted hover:text-revival-amber transition-colors"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-revival-border/30 text-center">
          <p className="text-xs text-revival-cream-dim">
            © {new Date().getFullYear()} Revival Craft Cocktails. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
