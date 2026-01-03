import { MDXRemote } from 'next-mdx-remote/rsc';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';

interface MDXContentProps {
  source: string;
}

// MDX 컴포넌트 정의
const components = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-white mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-white mt-6 mb-3" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold text-white mt-4 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="text-white/80 leading-7 mb-4" {...props} />
  ),
  a: (props: any) => (
    <a
      className="text-blue-400 hover:text-blue-300 underline transition"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside text-white/80 mb-4 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside text-white/80 mb-4 space-y-2" {...props} />
  ),
  li: (props: any) => (
    <li className="ml-4" {...props} />
  ),
  code: (props: any) => {
    const { className, children, ...rest } = props;
    const isInline = !className;

    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 bg-white/10 rounded text-sm text-pink-300 font-mono text-shadow-lg"
          {...rest}
        >
          {children}
        </code>
      );
    }

    // 코드 블록 내 code - highlight.js 스타일 유지
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
  pre: (props: any) => (
    <LiquidGlassCard className="mb-4" noPadding={true}>
      <pre className="p-4 overflow-x-auto !m-0" {...props} />
    </LiquidGlassCard>
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-white/5 rounded-r-lg text-white/80 italic" {...props} />
  ),
  hr: () => (
    <hr className="my-8 border-white/10" />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border border-white/10" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border border-white/10 px-4 py-2 bg-white/5 text-white font-semibold" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-white/10 px-4 py-2 text-white/80" {...props} />
  ),
};

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
      />
    </div>
  );
}
