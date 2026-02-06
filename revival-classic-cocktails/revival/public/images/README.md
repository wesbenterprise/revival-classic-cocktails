# Revival Logo Files

Place logo files here:

- `revival-logo.png` — Nav bar logo (recommended: ~200px tall, transparent background)
- `revival-logo-large.png` — Hero/splash logo (recommended: ~400px tall, transparent background)
- `revival-logo.svg` — SVG version if available (preferred for crisp rendering at all sizes)
- `favicon.ico` — Browser tab icon (16x16, 32x32, 48x48)
- `apple-touch-icon.png` — iOS home screen icon (180x180)
- `og-image.jpg` — Social sharing preview image (1200x630)

Once files are placed here, uncomment the <img> tags in:
- `src/components/Navigation.tsx` (nav logo)
- `src/app/page.tsx` (hero logo)

Files in `/public/images/` are served at `/images/filename.ext`
