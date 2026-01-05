import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton';
import { LiquidGlassPanel } from '@/components/ui/LiquidGlassPanel';

interface MDXContentProps {
  source: string;
}

// MDX components - Warm Editorial Codex style
const components = {
  h1: (props: any) => (
    <h1
      className="text-4xl font-display mt-8 mb-4"
      style={{ color: 'var(--text)', fontWeight: 900 }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-3xl font-display mt-6 mb-3"
      style={{ color: 'var(--text)', fontWeight: 900 }}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="text-2xl font-display mt-4 mb-2"
      style={{ color: 'var(--text)', fontWeight: 400 }}
      {...props}
    />
  ),
  p: (props: any) => (
    <div
      className="leading-7 mb-4"
      style={{ color: 'var(--text)' }}
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="ink-link underline transition"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="list-disc list-inside mb-4 space-y-2"
      style={{ color: 'var(--text)' }}
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal list-inside mb-4 space-y-2"
      style={{ color: 'var(--text)' }}
      {...props}
    />
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
          className="px-1.5 py-0.5 rounded-lg text-sm font-mono"
          style={{
            background: 'var(--surface-2)',
            color: 'var(--accent)',
          }}
          {...rest}
        >
          {children}
        </code>
      );
    }

    // Code block - highlight.js styles preserved
    return (
      <code className={`${className} !bg-transparent`} {...rest}>
        {children}
      </code>
    );
  },
  pre: (props: any) => (
    <pre
      className="p-4 mb-4 overflow-x-auto rounded-2xl"
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
      }}
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="pl-4 py-2 my-4 rounded-r-2xl italic"
      style={{
        borderLeft: '4px solid var(--accent)',
        background: 'rgba(197, 106, 43, 0.05)',
        color: 'var(--text)',
      }}
      {...props}
    />
  ),
  hr: () => (
    <hr
      className="my-8"
      style={{ borderColor: 'var(--border)' }}
    />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="min-w-full"
        style={{ border: '1px solid var(--border)' }}
        {...props}
      />
    </div>
  ),
  th: (props: any) => (
    <th
      className="px-4 py-2 font-semibold"
      style={{
        border: '1px solid var(--border)',
        background: 'var(--surface-2)',
        color: 'var(--text)',
      }}
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="px-4 py-2"
      style={{
        border: '1px solid var(--border)',
        color: 'var(--text)',
      }}
      {...props}
    />
  ),
  LiquidGlassCard,
  LiquidGlassButton,
  LiquidGlassPanel,
};

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
      />
    </div>
  );
}
