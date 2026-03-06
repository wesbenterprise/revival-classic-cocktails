import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merch | Revival Craft Cocktails',
  description:
    'Keychains, apparel, and more from Revival Craft Cocktails in downtown Lakeland, FL.',
};

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
