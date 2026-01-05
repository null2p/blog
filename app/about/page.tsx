import { siteConfig } from '@/lib/config/site';

export const metadata = {
  title: 'About | My Blog',
  description: 'About me and this blog',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <p
          className="text-sm uppercase tracking-widest mb-2"
          style={{ color: 'var(--muted)' }}
        >
          Introduction
        </p>
        <h1
          className="text-5xl font-display mb-4 tracking-tight"
          style={{ color: 'var(--text)', fontWeight: 900 }}
        >
          About
        </h1>
        <p
          className="text-xl font-body"
          style={{ color: 'var(--muted)' }}
        >
          Learn more about me and this blog
        </p>
      </div>

      <div
        className="paper-surface p-8"
        style={{ borderRadius: '16px' }}
      >
        <div className="prose max-w-none space-y-6">
          <h2
            className="text-3xl font-display tracking-tight"
            style={{ color: 'var(--text)', fontWeight: 900 }}
          >
            Welcome!
          </h2>

          <p
            className="leading-7 font-body"
            style={{ color: 'var(--text)' }}
          >
            안녕하세요! 이 블로그는 기술, 디자인, 그리고 개발에 대한 이야기를 나누는 공간입니다.
          </p>

          <h3
            className="text-2xl font-display mt-6 tracking-tight"
            style={{ color: 'var(--text)', fontWeight: 400 }}
          >
            기술 스택
          </h3>

          <p
            className="leading-7 font-body"
            style={{ color: 'var(--text)' }}
          >
            이 블로그는 다음 기술들로 만들어졌습니다:
          </p>

          <ul
            className="list-disc list-inside space-y-2"
            style={{ color: 'var(--text)' }}
          >
            <li><strong>Next.js 16</strong> - React 기반 프레임워크</li>
            <li><strong>MDX</strong> - 마크다운에서 컴포넌트 사용</li>
            <li><strong>Tailwind CSS</strong> - 유틸리티 기반 스타일링</li>
            <li><strong>Warm Editorial Codex</strong> - 책과 같은 따뜻한 디자인</li>
            <li><strong>GitHub Pages</strong> - 무료 정적 호스팅</li>
          </ul>

          <h3
            className="text-2xl font-display mt-6 tracking-tight"
            style={{ color: 'var(--text)', fontWeight: 400 }}
          >
            특징
          </h3>

          <ul
            className="list-disc list-inside space-y-2"
            style={{ color: 'var(--text)' }}
          >
            <li>완전한 정적 사이트 (Static Export)</li>
            <li>빠른 페이지 로딩</li>
            <li>반응형 디자인</li>
            <li>코드 신택스 하이라이팅</li>
            <li>태그 기반 글 분류</li>
            <li>읽기 시간 표시</li>
          </ul>

          <h3
            className="text-2xl font-display mt-6 tracking-tight"
            style={{ color: 'var(--text)', fontWeight: 400 }}
          >
            연락처
          </h3>

          <div className="flex gap-4 mt-4">
            {siteConfig.links.github && (
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link"
              >
                GitHub
              </a>
            )}
            {siteConfig.links.linkedin && (
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link"
              >
                LinkedIn
              </a>
            )}
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="ink-link"
            >
              Email
            </a>
          </div>

          <div
            className="mt-8 p-4 rounded-lg"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
            }}
          >
            <p
              className="text-sm"
              style={{ color: 'var(--muted)' }}
            >
              이 블로그는 오픈소스 프로젝트입니다.
              자유롭게 참고하시고 활용하세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
