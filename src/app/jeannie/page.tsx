import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jeannie Weaver Lopez | Revival Craft Cocktails',
  description:
    'Remembering Jeannie Weaver Lopez, the founder of Revival Craft Cocktails in Lakeland, Florida. Her spirit lives on in every pour.',
  openGraph: {
    title: 'Jeannie Weaver Lopez — Founder of Revival',
    description: 'Her spirit lives on in every pour.',
  },
};

export default function JeanniePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-revival-amber)_0%,_transparent_60%)] opacity-[0.03]" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-revival-amber text-xs tracking-[0.3em] uppercase mb-6">
            In Loving Memory
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-revival-cream leading-tight">
            Jeannie Weaver Lopez
          </h1>
          <p className="mt-3 text-revival-cream-dim text-lg">
            1985 – 2024
          </p>
          <div className="mt-8 w-16 h-px bg-revival-amber/50 mx-auto" />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        {/* Photo placeholder */}
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-revival-dark border border-revival-border/50 mb-12 flex items-center justify-center">
          <div className="text-center">
            <span className="font-display text-5xl text-revival-cream-dim">JWL</span>
            <p className="mt-2 text-revival-cream-dim text-xs tracking-wide">Photo</p>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-6 text-revival-cream-muted leading-relaxed">
          <p className="font-display text-2xl md:text-3xl text-revival-cream leading-snug">
            Revival exists because Jeannie Weaver Lopez had a vision — and the tenacity to make it real.
          </p>

          <p>
            A Fort Meade native who made Lakeland her home, Jeannie spent years honing her
            craft behind the bar at Linksters Tap Room before deciding downtown Lakeland
            needed something different: a sophisticated cocktail lounge where the drinks were
            taken seriously but the people never were.
          </p>

          <p>
            In 2017, she transformed a vacant storefront at 119 South Kentucky Avenue — a
            space that once held a record shop and a costume store — into the warm, moody room
            that Revival is today. The concept was simple and ambitious at the same time: no
            gimmicks, no snazz, just the belief that a beverage program can challenge you to
            enjoy some of earth's finest pleasures.
          </p>

          <p>
            And she was right. Revival quickly became a cornerstone of downtown Lakeland — the
            kind of place where regulars felt like family, where a bartender would remember
            your name and your drink, and where a conversation with a stranger could turn into
            a lasting friendship. Jeannie built that. Not just the business, but the culture.
          </p>

          <p>
            She went on to open The Peach House in the historic Lake Morton neighborhood,
            bringing the same entrepreneurial spirit and community-first approach to a new
            venture. Her impact on downtown Lakeland extended far beyond the walls of her
            businesses.
          </p>

          <p>
            Jeannie passed away on November 14, 2024 at the age of 39, after complications
            from a respiratory illness. She left behind her husband Ryan, their daughter
            Pepper, and a community that will never forget her.
          </p>

          {/* Quote */}
          <blockquote className="border-l-2 border-revival-amber/50 pl-6 py-2 my-10">
            <p className="font-display text-xl text-revival-cream italic leading-relaxed">
              "She may not wear a cape, though she wears an apron and kicks butt while taking
              names through this game called life."
            </p>
            <cite className="block mt-3 text-revival-cream-dim text-sm not-italic">
              — Ryan Lopez
            </cite>
          </blockquote>

          <p>
            Today, Ryan carries forward the vision Jeannie built. The team behind the bar
            works under her eternal gaze and guidance. Her recipes live on. Her standards
            remain. And every guest who walks through that door on Kentucky Avenue is
            experiencing something she created from nothing but passion, hard work, and an
            unshakable belief that Lakeland deserved a place like this.
          </p>

          <p className="font-display text-xl text-revival-cream">
            We raise a glass in her honor. Every night.
          </p>
        </div>

        {/* Divider */}
        <div className="mt-16 mb-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-revival-border/30" />
          <span className="text-revival-amber text-xs tracking-[0.3em]">✦</span>
          <div className="flex-1 h-px bg-revival-border/30" />
        </div>

        {/* The Pepper Project */}
        <div className="text-center">
          <h2 className="font-display text-xl text-revival-cream mb-3">The Pepper Project</h2>
          <p className="text-revival-cream-muted text-sm leading-relaxed max-w-md mx-auto mb-6">
            In Jeannie's memory, the Lakeland community came together to support her daughter
            Pepper's future. If you'd like to contribute, the fund remains open.
          </p>
          <a
            href="https://www.gofundme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              border border-revival-amber/50 text-revival-amber text-sm tracking-wide
              hover:bg-revival-amber/10 hover:border-revival-amber transition-colors
            "
          >
            The Pepper Project
          </a>
        </div>

        {/* Back link */}
        <div className="mt-16 text-center">
          <Link
            href="/team"
            className="text-revival-cream-dim text-sm hover:text-revival-amber transition-colors"
          >
            ← Back to Team
          </Link>
        </div>
      </section>
    </div>
  );
}
