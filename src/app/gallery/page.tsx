import { Metadata } from 'next';
import { fetchGalleryPhotos } from '@/lib/db';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery | Revival Craft Cocktails — Lakeland, FL',
  description: 'Photos and brand art from Revival Craft Cocktails in downtown Lakeland.',
};

export const revalidate = 60;

export default async function GalleryPage() {
  const photos = await fetchGalleryPhotos();
  return <GalleryClient photos={photos} />;
}
