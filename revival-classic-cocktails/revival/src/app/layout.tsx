import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revival Craft Cocktails | Lakeland, FL",
  description:
    "A craft cocktail bar in Lakeland, Florida. Dark corners, bright drinks, good company.",
  openGraph: {
    title: "Revival Craft Cocktails",
    description: "A craft cocktail bar in Lakeland, Florida.",
    type: "website",
    locale: "en_US",
    siteName: "Revival Craft Cocktails",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
