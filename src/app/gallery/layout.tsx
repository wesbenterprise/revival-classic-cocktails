import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Revival Craft Cocktails \u2014 Lakeland, FL',
  description:
    'Photos from inside Revival \u2014 the drinks, the room, the people, and the nights.',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
