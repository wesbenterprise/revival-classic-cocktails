import type { Metadata } from 'next';
import Link from 'next/link';
import { TeamMember } from '@/types/database';

export const metadata: Metadata = {
  title: 'Our Story | Revival Craft Cocktails',
  description:
    'The story of Revival Craft Cocktails — from a vision on Kentucky Avenue to downtown Lakeland\'s living room.',
};

// ============================================================
// DEMO DATA — Replace with Supabase query
// ============================================================
const DEMO_TEAM: TeamMember[] = [
  {
    id: '1', name: 'Ryan Lopez', title: 'Owner',
    bio: 'Carrying forward the vision Jeannie built, one pour at a time.',
    photo_url: null, status: 'active', sort_order: 0,
    created_at: '', updated_at: '',
  },
  {
    id: '2', name: 'Katie', title: 'Lead Bartender',
    bio: 'One of the longest-tenured members of the Revival family. Master of classics, lover of experimentation. Also skeet shoots.',
    photo_url: null, status: 'active', sort_order: 1,
    created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'Jordane', title: 'Bartender',
    bio: 'Brings innovative qualities to every cocktail. Specializes in spiced spirits and bold recipes.',
    photo_url: null, status: 'active', sort_order: 2,
    created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'Brian', title: 'Operations',
    bio: 'Behind-the-scenes guru with a background in guest relations from The Walt Disney World Company. Like Santa Claus — you never see him, but you know he visited.',
    photo_url: null, status: 'active', sort_order: 3,
    created_at: '', updated_at: '',
  },
];

const DEMO_ALUMNI: TeamMember[] = [
  {
    id: '10', name: 'Alec', title: 'Bartender',
    bio: null, photo_url: null, status: 'alumni', sort_order: 0,
    created_at: '', updated_at: '',
  },
  {
    id: '11', name: 'Jordan', title: 'Bartender',
    bio: null, photo_url: null, status: 'alumni', sort_order: 1,
    created_at: '', updated_at: '',
  },
  {
    id: '12', name: 'Josh', title: 'Bartender',
    bio: null, photo_url: null, status: 'alumni', sort_order: 2,
    created_at: '', updated_at: '',
  },
];

// ============================================================

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function TeamCard({ member, size = 'large' }: { member: TeamMember; size?: 'large' | 'small' }) {
  const isLarge = size === 'large';

  return (
    <div className="group text-center">
      <div
        className={`
          mx-auto rounded-lg overflow-hidden bg-revival-dark border border-revival-border/50
          group-hover:border-revival-amber/30 transition-all duration-300
          ${isLarge ? 'w-48 h-56 md:w-56 md:h-64' : 'w-32 h-36 md:w-40 md:h-44'}
        `}
      >
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-revival-muted to-revival-dark">
            <span className={`font-display text-revival-cream-dim ${isLarge ? 'text-3xl' : 'text-xl'}`}>
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      <h3 className={`font-display text-revival-cream mt-4 group-hover:text-revival-amber transition-colors ${isLarge ? 'text-xl' : 'text-base'}`}>
        {member.name}
      </h3>
      {member.title && (
        <p className={`text-revival-amber-dim tracking-wide uppercase mt-1 ${isLarge ? 'text-xs' : 'text-[10px]'}`}>
          {member.title}
        </p>
      )}

      {isLarge && member.bio && (
        <p className="mt-3 text-revival-cream-dim text-sm leading-relaxed max-w-xs mx-auto">
          {member.bio}
        </p>
      )}
    </div>
  );
}

export default function OurStoryPage() {
  const active = DEMO_TEAM.filter((m) => m.status === 'active').sort((a, b) => a.sort_order - b.sort_order);
  const alumni = DEMO_ALUMNI.filter((m) => m.status === 'alumni').sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-6 px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-revival-cream">Our Story</h1>
      </section>

      {/* ============================
          THE REVIVAL STORY
          ============================ */}
      <section className="max-w-2xl mx-auto px-6 py-10">
        <div className="space-y-6 text-revival-cream-muted leading-relaxed">
          {/* Opening */}
          <p className="font-display text-2xl md:text-3xl text-revival-cream leading-snug">
            No gimmicks. No snazz. Just the belief that a beverage program can challenge you to enjoy some of earth's finest pleasures.
          </p>

          <div className="w-12 h-px bg-revival-amber/50" />

          <p>
            Revival was born out of a simple idea: downtown Lakeland deserved a place where
            craft cocktails were taken seriously, but the people never were. A place where you
            could walk in alone and leave with a friend. Where the bartender remembers your
            name, your drink, and what you were talking about last Tuesday.
          </p>

          <p>
            In 2017, founder Jeannie Weaver Lopez transformed a vacant storefront at 119 South
            Kentucky Avenue — a building that had housed everything from a record shop to a
            costume store — into the warm, moody room you know today. She brought with her
            years of experience from behind the bar at Linksters Tap Room and a vision for
            something downtown Lakeland had never seen.
          </p>

          <p>
            The concept was ambitious in its simplicity. Source the finest spirits and
            ingredients. Hire bartenders who care about their craft. Create an atmosphere that
            feels like walking into someone's living room — if that someone had exceptional
            taste in bourbon and an ear for vinyl. Seating is first come, first serve. Always
            has been.
          </p>

          {/* Photo placeholder */}
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-revival-dark border border-revival-border/50 my-8 flex items-center justify-center">
            <span className="text-revival-cream-dim text-xs tracking-wide">Revival interior photo</span>
          </div>

          <p>
            What started as one woman's vision quickly became downtown Lakeland's living room.
            Revival has been the backdrop for first dates and anniversaries, business deals and
            late-night confessions, quiet Tuesday evenings and packed Saturday nights. It's a
            place that treats every guest like a regular and every regular like family.
          </p>

          <p>
            We source the finest caliber of spirits and ingredients to supply you with an
            unparalleled handcrafted beverage quality. We invite you to consult with your
            bartender concerning spirits, cordials, and garnishes — or choose from our menu of
            signature cocktails. We also host a generous list of domestic beer, craft beer, and
            a variety of wines and champagnes.
          </p>

          <blockquote className="border-l-2 border-revival-amber/50 pl-6 py-2 my-8">
            <p className="font-display text-xl text-revival-cream italic leading-relaxed">
              "Isn't it funny how danger makes people passionate?"
            </p>
            <cite className="block mt-3 text-revival-cream-dim text-sm not-italic">
              — Zelda Fitzgerald
            </cite>
          </blockquote>

          <p>
            We invite you to experiment with our mixologists in the pursuit of expanding your
            comfort zone. Fine spirits and fine company — that's what Revival is about.
          </p>

          <p className="font-display text-xl text-revival-cream">
            Welcome to Revival. Drink well.
          </p>
        </div>

        {/* Catering callout */}
        <div className="mt-16 p-8 rounded-lg border border-revival-border/50 bg-revival-charcoal text-center">
          <h3 className="font-display text-xl text-revival-cream mb-3">Catering</h3>
          <p className="text-revival-cream-muted text-sm leading-relaxed max-w-md mx-auto mb-6">
            Not only are we refining the cocktail experience in our lounge, we can bring it to
            your location. Our catering team offers a full service menu, customized drink
            options, and full beer and wine options. Weddings, birthday parties, home
            gatherings, corporate events, and more.
          </p>
          <Link
            href="/contact"
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              border border-revival-amber/50 text-revival-amber text-sm tracking-wide
              hover:bg-revival-amber/10 hover:border-revival-amber transition-colors
            "
          >
            Inquire About Catering
          </Link>
        </div>
      </section>

      {/* ============================
          FOUNDER TRIBUTE
          ============================ */}
      <section className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center border border-revival-border/50 rounded-lg p-8 md:p-12 bg-gradient-to-b from-revival-charcoal to-revival-black">
          <p className="text-revival-amber text-xs tracking-[0.3em] uppercase mb-6">
            Our Founder
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-revival-cream">
            Jeannie Weaver Lopez
          </h2>
          <p className="mt-2 text-revival-cream-dim text-sm">
            1985 – 2024
          </p>
          <div className="mt-6 w-12 h-px bg-revival-amber/50 mx-auto" />
          <p className="mt-6 text-revival-cream-muted leading-relaxed max-w-lg mx-auto italic">
            Though she is no longer with us, her legacy lives on in every pour, every recipe, and every bartender who works under her eternal gaze and guidance.
          </p>
          <p className="mt-4 text-revival-cream-muted leading-relaxed max-w-lg mx-auto italic">
            We raise a glass in her honor.
          </p>
          <Link
            href="/jeannie"
            className="
              inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full
              border border-revival-amber/50 text-revival-amber text-sm tracking-wide
              hover:bg-revival-amber/10 hover:border-revival-amber transition-colors
            "
          >
            Her Story
          </Link>
        </div>
      </section>

      {/* ============================
          THE TEAM
          ============================ */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-center text-revival-amber text-xs tracking-[0.3em] uppercase mb-10">
          The Team
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {active.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* ============================
          ALUMNI
          ============================ */}
      {alumni.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-t border-revival-border/30">
          <h2 className="text-center text-revival-cream-dim text-xs tracking-[0.3em] uppercase mb-8">
            Alumni
          </h2>
          <p className="text-center text-revival-cream-dim text-sm mb-10 max-w-md mx-auto">
            Friends of the bar who helped shape what Revival is today. Once Revival family, always Revival family.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {alumni.map((member) => (
              <TeamCard key={member.id} member={member} size="small" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
