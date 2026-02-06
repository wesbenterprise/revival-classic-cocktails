import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = {
  title: 'Admin | Revival Craft Cocktails',
  robots: 'noindex, nofollow',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
