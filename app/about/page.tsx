import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';
import { siteConfig } from '@/lib/config/site';

export const metadata = {
  title: 'About | My Blog',
  description: 'About me and this blog',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-display font-bold text-white mb-4 tracking-tight">About</h1>
        <p className="text-xl text-white/70 font-body font-light">
          Learn more about me and this blog
        </p>
      </div>

      <LiquidGlassCard>
        <div className="prose prose-invert max-w-none space-y-6">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">Welcome!</h2>

          <p className="text-white/80 leading-7 font-body">
            안녕하세요! 이 블로그는 기술, 디자인, 그리고 개발에 대한 이야기를 나누는 공간입니다.
          </p>

          <h3 className="text-2xl font-display font-bold text-white mt-6 tracking-tight">기술 스택</h3>

          <p className="text-white/80 leading-7 font-body">
            이 블로그는 다음 기술들로 만들어졌습니다:
          </p>

          <ul className="list-disc list-inside text-white/80 space-y-2">
            <li><strong>Next.js 16</strong> - React 기반 프레임워크</li>
            <li><strong>MDX</strong> - 마크다운에서 컴포넌트 사용</li>
            <li><strong>Tailwind CSS</strong> - 유틸리티 기반 스타일링</li>
            <li><strong>Liquid Glass React</strong> - 아름다운 유리 효과 UI</li>
            <li><strong>GitHub Pages</strong> - 무료 정적 호스팅</li>
          </ul>

          <h3 className="text-2xl font-display font-bold text-white mt-6 tracking-tight">특징</h3>

          <ul className="list-disc list-inside text-white/80 space-y-2">
            <li>완전한 정적 사이트 (Static Export)</li>
            <li>빠른 페이지 로딩</li>
            <li>반응형 디자인</li>
            <li>코드 신택스 하이라이팅</li>
            <li>태그 기반 글 분류</li>
            <li>읽기 시간 표시</li>
          </ul>

          <h3 className="text-2xl font-display font-bold text-white mt-6 tracking-tight">연락처</h3>

          <div className="flex gap-4 mt-4">
            {siteConfig.links.github && (
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline transition"
              >
                GitHub
              </a>
            )}
            {siteConfig.links.linkedin && (
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline transition"
              >
                LinkedIn
              </a>
            )}
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="text-blue-400 hover:text-blue-300 underline transition"
            >
              Email
            </a>
          </div>

          <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/60 text-sm">
              이 블로그는 오픈소스 프로젝트입니다.
              자유롭게 참고하시고 활용하세요!
            </p>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
