import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Header />
        <main className="relative z-10 pt-24 px-4 min-h-screen">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
