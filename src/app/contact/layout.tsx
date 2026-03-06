import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Private Events | Revival Craft Cocktails',
  description:
    'Book a private event, inquire about catering, or get in touch with Revival Craft Cocktails in downtown Lakeland.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
