import { fetchSpecials, fetchHours } from '@/lib/db';
import HomeClient from '@/components/HomeClient';

export const revalidate = 60; // revalidate every 60 seconds

export default async function HomePage() {
  const [specials, hours] = await Promise.all([fetchSpecials(), fetchHours()]);
  return <HomeClient specials={specials} hours={hours} />;
}
