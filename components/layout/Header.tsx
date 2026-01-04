'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/config/site';
import { LiquidGlassPanel } from '@/components/ui/LiquidGlassPanel';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <LiquidGlassPanel className="max-w-6xl mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-bold text-white hover:text-blue-300 transition tracking-tight">
            {siteConfig.name}
          </Link>

          <ul className="flex gap-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-white transition font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </LiquidGlassPanel>
    </header>
  );
}
