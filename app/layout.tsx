import type { Metadata } from "next";
import { Fraunces, Crimson_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config/site";
import { layoutConfig } from "@/lib/config/layout";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["200", "400", "900"],
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

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
      <body className={`${fraunces.variable} ${crimsonPro.variable} ${jetbrainsMono.variable} antialiased`}>
        <Header />
        <main className={`relative z-10 pt-24 ${layoutConfig.padding.page} min-h-screen`}>
          <div className={layoutConfig.container}>
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
