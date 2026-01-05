import { siteConfig } from '@/lib/config/site';

export function Footer() {
  return (
    <footer className="mt-20 p-4">
      <div
        className="max-w-6xl mx-auto paper-surface p-6"
        style={{ borderRadius: '12px' }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-sm"
            style={{ color: 'var(--muted)' }}
          >
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex gap-4">
            {siteConfig.links.github && (
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link text-sm"
              >
                GitHub
              </a>
            )}
            {siteConfig.links.linkedin && (
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link text-sm"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
