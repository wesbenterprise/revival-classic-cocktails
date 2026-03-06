# Revival Classic Cocktails — Claude Code Handoff

**Generated:** March 6, 2026
**Context:** This file was prepared in Cowork after reviewing all brand assets, the full menu PDF, the marketing playbook (V2), and the current website codebase. Feed this file to Claude Code along with the companion JSON files.

---

## Files in This Handoff

| File | Purpose |
|------|---------|
| `revival-menu-data.json` | Complete menu with 74 cocktails, 14 wines, 24+ beers, flights, mocktails — structured to match the database types |
| `revival-database-types-updated.ts` | Drop-in replacement for `src/types/database.ts` — expands MenuCategory from 5 to 13 real categories |
| `revival-asset-manifest.json` | Maps every brand asset (illustrations, logos, merch) to recommended website usage |
| `revival-playbook-v2.docx` | Full marketing playbook with SEO requirements, meta tags, JSON-LD specs, content strategy |
| This file | Implementation instructions |

---

## Priority 1: Replace Demo Menu Data with Real Data

The current `src/app/menu/page.tsx` has 16 hardcoded demo items with made-up cocktails. The real menu has 100+ items across 13 categories.

### Steps:
1. Replace `src/types/database.ts` with `revival-database-types-updated.ts`
2. Update `CATEGORY_CONFIG` in `menu/page.tsx` to use the 13 real categories from `revival-menu-data.json` → `categories` array
3. Replace `DEMO_MENU` with the items from `revival-menu-data.json` → `menu_items` array
4. Update `CATEGORY_ORDER` to match the new category IDs
5. The menu page's sticky nav needs to handle 13 categories (consider a scrollable horizontal nav or grouped sections like "Cocktails" / "Beer & Wine" / "Non-Alcoholic")
6. Wine items have a `subcategory` field (bubbles/white/red) — render these as sub-headers within the wine section
7. Add a "Bartender's Choice" feature section (see `bartenders_choice` in the JSON)
8. Add the Weekly Revival / Weekly Lineup info (see `weekly_lineup` in the JSON)
9. Happy Hour sections should display the time prominently: "Monday–Friday, 1 PM – 7 PM"

### Notes:
- The menu PDF is from March 2023. Wesley should verify with Ryan that prices and items are current before deploying to production.
- Spirit flights are 4 × ¾ oz pours — display this in the section header.
- Tiki drinks can be served sharable for $40 — note this in the tiki section.

---

## Priority 2: Update Weekly Specials on Homepage

The current `DEMO_SPECIALS` in `page.tsx` has placeholder events. Replace with the real weekly lineup:

| Day | Title | Description |
|-----|-------|-------------|
| Monday | Champagne & Charcuterie | It's like lunchables but better (you also catch a buzz). |
| Tuesday | Test Drink Tuesday | Put down the vodka soda and step outside your comfort zone. Try out one of three weekly drinks invented by yours truly. |
| Wednesday | Wanderlust Wednesday | Grab a drink but leave your baggage at home. Every Wednesday, we pick a spot on the map and showcase three drinks that highlight the local cocktail culture. |
| Thursday | Tiki Thursday | Because who doesn't love a tiny paper umbrella in their drink? Explore the varying tastes of tropical drinks. |

Weekly Revival: "For one week only: a custom recipe or a riff on a classic. $12." — This should be featured prominently.

---

## Priority 3: Deploy Brand Illustrations

The site currently has zero illustrations. The `Illustrations/` folder has 7 high-quality ink-and-red-accent illustrations that define the brand. See `revival-asset-manifest.json` for specific placement recommendations.

### Suggested placements:
- **Homepage hero or about section:** `dreamer.png` (woman with rose and cocktail)
- **Menu page:** `old fashioned.png` (crystal glass close-up) or `mystic.png` (hand holding glass)
- **Old Fashioneds section:** `mystic.png`
- **Jeannie's page:** `dreamer.png`
- **Team/about:** `snake guy.png` or `twins.png`
- **Gallery header:** `fishing.png`
- **Section dividers:** `moon.png` (crescent moon with goblet)

### Important:
These illustrations are black ink on white background with red accents. The website has a dark theme. Options:
1. Display illustrations in light-colored card/container sections
2. Use CSS `filter: invert(1)` and adjust (loses the red accents)
3. Create a contrasting light section specifically for illustration features
4. Use them as subtle background elements with reduced opacity

---

## Priority 4: Update Merch Page

Replace the 4 demo items with real merch. Images available:
- House of Spirits Keychain → `Merch 2025/Keychains/House.png`
- Pick Your Poison Keychain → `Merch 2025/Keychains/Poison.png`
- Palmistry design → `Merch 2025/Palmistry.png`
- Star Logo items → `Merch 2025/Star Logo.png`
- Revival Forever design → `Merch 2025/Revival Forever_Revival Forever.png`

Tiki mugs are also sold ($25, mentioned in the menu). Consider adding those.

---

## Priority 5: SEO Implementation (from Playbook V2)

### Per-page meta tags (add to each route's metadata export):

| Page | Title | Description |
|------|-------|-------------|
| / | Revival Craft Cocktails \| Downtown Lakeland's Cocktail Bar | Lakeland's dedicated craft cocktail bar. In-house syrups, custom garnishes, new Weekly Revival every Tuesday. Happy hour Mon–Fri 1–7pm. Walk in tonight. |
| /menu | Cocktail Menu \| Revival Craft Cocktails — Lakeland, FL | House originals, classics, spirit-free cocktails, and craft beer. Made with in-house syrups and custom garnishes. New Weekly Revival every Tuesday, $12. |
| /visit | Visit Revival \| Hours, Parking & Directions — Downtown Lakeland | 119 S Kentucky Ave, Lakeland FL. Open 7 days. Happy hour Mon–Fri 1–7pm. Free street parking after 3:30. Walk-in only, first come first served. |
| /team | Our Team \| Revival Craft Cocktails — Lakeland | Meet the bartenders and team behind Revival Craft Cocktails in downtown Lakeland, Florida. |
| /contact | Contact & Private Events \| Revival Craft Cocktails | Book a private event, inquire about catering, or get in touch with Revival Craft Cocktails in downtown Lakeland. |
| /gallery | Gallery \| Revival Craft Cocktails — Lakeland, FL | Photos from inside Revival — the drinks, the room, the people, and the nights. |
| /jeannie | Our Story \| Jeannie Weaver & Revival Craft Cocktails | Founded by Jeannie Weaver to revive mid-century cocktail culture in downtown Lakeland. Learn the story behind the bar. |

### JSON-LD structured data (add to layout.tsx):
Add `@type: ["Bar", "LocalBusiness"]` with:
- name: "Revival Craft Cocktails"
- address: 119 S Kentucky Ave, Lakeland, FL 33801
- telephone: (863) 606-6090
- priceRange: "$$"
- servesCuisine: "Cocktails"
- aggregateRating: 4.8 stars, 767+ reviews
- hasMenu: link to /menu
- sameAs: [Instagram, Facebook URLs]
- geo: lat/long for 119 S Kentucky Ave

### Add sitemap.ts and robots.ts:
- sitemap: All public routes, exclude /admin/*
- robots: Allow all crawlers on public pages, disallow /admin/*

### Homepage body copy:
Add the SEO-optimized paragraph from the playbook below the WeeklyStrip component. The playbook has the exact copy — it naturally hits all primary keywords.

### Footer NAP:
The footer currently says "A craft cocktail bar in Lakeland, FL" — expand to include full address and phone number on every page.

---

## Brand Color Note

The website's current accent is amber/gold (`#C8A050`). The actual brand assets use a deeper crimson red (`#8B2332`) with gold (`#C4943A`). Consider:
- Adding `--color-revival-red: #8B2332` to globals.css
- Using red for badges, highlights, or the "Old Fashioneds" section (their signature program)
- Keeping amber as primary accent but introducing red as secondary

---

## What's NOT in This Handoff (Still Needed)

1. **Professional photography** — The playbook recommends a $500–$800 photo shoot. All gallery entries are placeholders.
2. **Supabase connection** — The menu JSON is structured for easy Supabase import, but someone needs to create the tables and seed the data.
3. **Bottles & Cans beer list** — I omitted the 30+ bottle/can beers to keep the JSON manageable. The full list is in the PDF. Add when ready.
4. **Toast gift card link** — Currently `#` in the merch page. Ryan needs to provide the real URL.
5. **GA4 tracking code** — Needs to be set up and added to the site.
6. **Google Search Console** — Verify domain after deployment.
