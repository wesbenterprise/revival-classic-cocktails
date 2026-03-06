'use client';

import { useState } from 'react';

// ============================================================
// COPY BANK — Marketing copy, quotes, taglines, brainstorms
// ============================================================

interface CopyEntry {
  id: string;
  category: 'quote' | 'tagline' | 'description' | 'social' | 'brainstorm';
  text: string;
  attribution?: string;
  usedOn?: string;
  notes?: string;
}

const COPY_BANK: CopyEntry[] = [
  // === QUOTES IN USE ===
  {
    id: '1',
    category: 'quote',
    text: 'Go placidly amid the noise and the haste, and remember what peace there may be in silence.',
    attribution: 'Max Ehrmann, Desiderata',
    usedOn: 'Visit page',
    notes: 'Perfect for the visit page — walking into Revival from downtown.',
  },
  {
    id: '2',
    category: 'quote',
    text: 'Enjoy your achievements as well as your plans. Keep interested in your own career, however humble; it is a real possession in the changing fortunes of time.',
    attribution: 'Max Ehrmann, Desiderata',
    usedOn: 'Team page (Our Story section)',
    notes: 'Speaks to the craft and the team.',
  },
  {
    id: '3',
    category: 'quote',
    text: 'She may not wear a cape, though she wears an apron and kicks butt while taking names through this game called life.',
    attribution: 'Ryan Lopez',
    usedOn: 'Jeannie memorial page',
  },
  {
    id: '4',
    category: 'quote',
    text: 'Her handmade cocktails were as unique as her spirit — bold, imaginative, and unforgettable. Though she is no longer with us, her legacy lives on in every pour, every recipe, and every bartender who works under her eternal gaze and guidance.',
    attribution: 'Wesley Barnett',
    usedOn: 'Jeannie memorial page',
  },

  // === DESIDERATA — UNUSED EXCERPTS ===
  {
    id: '5',
    category: 'quote',
    text: 'Be yourself. Especially do not feign affection. Neither be cynical about love; for in the face of all aridity and disenchantment, it is as perennial as the grass.',
    attribution: 'Max Ehrmann, Desiderata',
    notes: 'Strong for a "come as you are" vibe. Could work on homepage or menu page.',
  },
  {
    id: '6',
    category: 'quote',
    text: 'You are a child of the universe no less than the trees and the stars; you have a right to be here.',
    attribution: 'Max Ehrmann, Desiderata',
    notes: 'Closing-time wisdom. Could work as a footer quote or on the Jeannie page.',
  },
  {
    id: '7',
    category: 'quote',
    text: 'And whatever your labors and aspirations, in the noisy confusion of life, keep peace in your soul. With all its sham, drudgery and broken dreams, it is still a beautiful world.',
    attribution: 'Max Ehrmann, Desiderata',
    notes: 'The whole Revival mood in one passage. Strong closer for any page.',
  },
  {
    id: '8',
    category: 'quote',
    text: 'Nurture strength of spirit to shield you in sudden misfortune. But do not distress yourself with dark imaginings. Many fears are born of fatigue and loneliness.',
    attribution: 'Max Ehrmann, Desiderata',
    notes: 'Heavier tone — could work for the Jeannie tribute context.',
  },
  {
    id: '9',
    category: 'quote',
    text: 'Take kindly the counsel of the years, gracefully surrendering the things of youth.',
    attribution: 'Max Ehrmann, Desiderata',
    notes: 'Mid-century cocktail culture vibes. Short and elegant.',
  },

  // === ORIGINAL REVIVAL COPY ===
  {
    id: '10',
    category: 'quote',
    text: 'No amount of physical contact could match the healing powers of a well made cocktail.',
    attribution: 'David Sedaris',
    usedOn: 'Old Revival website (header)',
    notes: 'Was the hero quote on the original WordPress site.',
  },
  {
    id: '11',
    category: 'quote',
    text: "Isn't it funny how danger makes people passionate?",
    attribution: 'Zelda Fitzgerald',
    notes: 'Was on the old site and original team page. Replaced by Desiderata.',
  },

  // === TAGLINES & DESCRIPTIONS ===
  {
    id: '20',
    category: 'tagline',
    text: 'Dark corners. Bright drinks. Good company.',
    usedOn: 'Homepage',
    notes: 'Core tagline.',
  },
  {
    id: '21',
    category: 'tagline',
    text: 'No gimmicks. No snazz.',
    notes: 'From Jeannie\'s original concept. Used in Our Story section.',
  },
  {
    id: '22',
    category: 'tagline',
    text: 'Welcome to Revival. Drink well.',
    usedOn: 'Team page (Our Story closing)',
    notes: 'The closer. Simple and perfect.',
  },
  {
    id: '23',
    category: 'tagline',
    text: 'Fine Spirits & Fine Company.',
    notes: 'From original website. Classic.',
  },

  // === DESCRIPTION COPY ===
  {
    id: '30',
    category: 'description',
    text: 'Revival was born out of a simple idea: downtown Lakeland deserved a place where craft cocktails were taken seriously, but the people never were.',
    usedOn: 'Our Story section',
  },
  {
    id: '31',
    category: 'description',
    text: 'We source the finest caliber of spirits and ingredients in order to supply you with an unparalleled handcrafted beverage quality.',
    usedOn: 'Our Story section / old website',
    notes: 'Original Jeannie copy — preserved exactly.',
  },
  {
    id: '32',
    category: 'description',
    text: 'Jeannie, our founder and master mixologist, was a detail-obsessed creative force whose passion and talent shaped every corner of our bar and the spirit of our business.',
    attribution: 'Wesley Barnett (original website bio)',
    notes: 'Wesley\'s original tribute from revivallakeland.com/home/about/',
  },

  // === SOCIAL / BRAINSTORM ===
  {
    id: '40',
    category: 'social',
    text: 'Tuesday nights are for testing limits. $8 Test Drink Tuesdays.',
    notes: 'Instagram caption idea.',
  },
  {
    id: '41',
    category: 'social',
    text: 'Champagne and charcuterie. It\'s like lunchables but better (you also catch a buzz).',
    usedOn: 'Monday special description',
    notes: 'Already in rotation.',
  },
  {
    id: '42',
    category: 'brainstorm',
    text: 'We came here strangers, left here family — poured a little reckless, loved a little loud, and called it Revival.',
    notes: 'Ace brainstorm. Desperadita vibe. Could work for merch or social.',
  },
  {
    id: '43',
    category: 'brainstorm',
    text: 'Every pour is a prayer. Every shift is a story. We don\'t just tend the bar — we tend to each other.',
    notes: 'Ace brainstorm. Team-focused.',
  },
  {
    id: '44',
    category: 'brainstorm',
    text: 'Dark corners. Bright drinks. Good trouble.',
    notes: 'Ace brainstorm. Edgier variant of the main tagline.',
  },
  {
    id: '45',
    category: 'brainstorm',
    text: 'We\'re the ones who stayed past last call — not because we had to, but because this place is worth it.',
    notes: 'Ace brainstorm. Team anthem energy.',
  },
  {
    id: '46',
    category: 'brainstorm',
    text: 'She built this bar like she mixed her drinks — bold, a little dangerous, and impossible to forget. Now we carry it forward, one reckless pour at a time.',
    notes: 'Ace brainstorm. Jeannie tribute / outlaw-romantic.',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'quote', label: 'Quotes' },
  { key: 'tagline', label: 'Taglines' },
  { key: 'description', label: 'Descriptions' },
  { key: 'social', label: 'Social' },
  { key: 'brainstorm', label: 'Brainstorms' },
] as const;

export default function CopyBankPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? COPY_BANK
    : COPY_BANK.filter((c) => c.category === activeCategory);

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-100 mb-2">Copy Bank</h1>
      <p className="text-zinc-400 text-sm mb-8">
        Marketing copy, quotes, taglines, and brainstorms. Everything in one place.
      </p>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`
              px-4 py-2 rounded-full text-xs tracking-wide uppercase transition-colors
              ${activeCategory === cat.key
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                : 'text-zinc-400 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-600'
              }
            `}
          >
            {cat.label}
            <span className="ml-1.5 text-zinc-500">
              {cat.key === 'all' ? COPY_BANK.length : COPY_BANK.filter(c => c.category === cat.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Copy entries */}
      <div className="space-y-4">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-zinc-200 leading-relaxed italic">
                  &ldquo;{entry.text}&rdquo;
                </p>
                {entry.attribution && (
                  <p className="mt-2 text-amber-400/70 text-sm">— {entry.attribution}</p>
                )}
              </div>
              <span className={`
                shrink-0 px-2.5 py-1 rounded-full text-[10px] tracking-wide uppercase
                ${entry.category === 'quote' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : ''}
                ${entry.category === 'tagline' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : ''}
                ${entry.category === 'description' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : ''}
                ${entry.category === 'social' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : ''}
                ${entry.category === 'brainstorm' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : ''}
              `}>
                {entry.category}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              {entry.usedOn && (
                <span className="text-green-400/60">
                  ✓ Used on: {entry.usedOn}
                </span>
              )}
              {entry.notes && (
                <span className="text-zinc-500">
                  {entry.notes}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-zinc-600 text-xs">
        {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
        {activeCategory !== 'all' && ` in ${activeCategory}`}
      </div>
    </div>
  );
}
