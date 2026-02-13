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
        {/* Moody lounge atmosphere backdrop — swap inner divs with <img src="/images/lounge-bg.jpg" className="w-full h-full object-cover" /> when ready */}
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-revival-black" />
          {/* Warm pendant glow — upper right */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_80%_8%,_rgba(200,160,80,0.12)_0%,_transparent_70%)]" />
          {/* Dim candle glow — lower left */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_15%_85%,_rgba(200,160,80,0.07)_0%,_transparent_60%)]" />
          {/* Faint center fill */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_500px_300px_at_45%_45%,_rgba(200,160,80,0.04)_0%,_transparent_50%)]" />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.4)_100%)]" />
        </div>
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
