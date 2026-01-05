'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config/site';
import { LiquidGlassPanel } from '@/components/ui/LiquidGlassPanel';

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 50; // 최소 스크롤 양

      // 페이지 최상단이면 항상 표시
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // 스크롤 방향 감지
      const scrollDiff = currentScrollY - lastScrollY;

      // 아래로 스크롤 (숨김)
      if (scrollDiff > 5) {
        setIsVisible(false);
      }
      // 위로 스크롤 (표시)
      else if (scrollDiff < -5) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 p-4 transition-transform duration-300 ease-in-out"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <LiquidGlassPanel className="max-w-6xl mx-auto">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="hidden md:block text-2xl font-display font-bold transition tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            {siteConfig.name}
          </Link>

          <ul className="flex gap-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="ink-link transition font-medium"
                  style={{ color: 'var(--text)' }}
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
