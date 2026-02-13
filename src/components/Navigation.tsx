'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Tonight' },
  { href: '/menu', label: 'Menu' },
  { href: '/visit', label: 'Visit' },
  { href: '/team', label: 'Our Story' },
  { href: '/jeannie', label: 'Jeannie' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/merch', label: 'Merch' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop nav bar */}
      <div className="bg-revival-black/90 backdrop-blur-md border-b border-revival-border/50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <img src="/images/revival-logo.jpg" alt="Revival Craft Cocktails" className="h-10 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-revival-cream-muted hover:text-revival-amber transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+18636066090"
              className="inline-flex items-center gap-1.5 text-sm tracking-widest uppercase text-revival-cream-muted hover:text-revival-amber transition-colors"
            >
              <Phone size={13} />
              (863) 606-6090
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-revival-cream hover:text-revival-amber transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-revival-black/98 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-6 text-revival-cream-muted hover:text-revival-amber transition-colors"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="mb-12"
            >
              <img src="/images/revival-logo.jpg" alt="Revival Craft Cocktails" className="h-20 w-auto" />
            </Link>

            {/* Links */}
            <div className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg tracking-[0.2em] uppercase text-revival-cream-muted hover:text-revival-cream transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+18636066090"
                className="inline-flex items-center gap-2 text-lg tracking-[0.2em] uppercase text-revival-cream-muted hover:text-revival-cream transition-colors animate-fade-in"
                style={{ animationDelay: `${NAV_LINKS.length * 60}ms` }}
              >
                <Phone size={16} />
                (863) 606-6090
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
