'use client';

import { siteConfig } from '@/lib/config/site';
import { LiquidGlassPanel } from '@/components/ui/LiquidGlassPanel';

export function Footer() {
  return (
    <footer className="mt-20 p-4">
      <LiquidGlassPanel className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex gap-4">
            {siteConfig.links.github && (
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition text-sm"
              >
                GitHub
              </a>
            )}
            {siteConfig.links.linkedin && (
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition text-sm"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </LiquidGlassPanel>
    </footer>
  );
}
