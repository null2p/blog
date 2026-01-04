import { getAllPostSlugs, getPostBySlug } from '@/lib/content';
import { MDXContent } from '@/components/mdx/MDXContent';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: `${post.frontmatter.title} | My Blog`,
    description: post.frontmatter.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const { title, date, tags, description } = post.frontmatter;

  return (
    <article className="max-w-4xl mx-auto">
      {/* Post Header */}
      <LiquidGlassCard className="mb-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            {title}
          </h1>

          <p className="text-xl text-white/70 font-body font-light leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-4 text-sm text-white/60">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="px-3 py-1 text-xs font-medium bg-white/10 rounded-full text-white/80 hover:bg-white/20 transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </LiquidGlassCard>

      {/* Post Content - CSS-based glass effect (no WebGL for performance) */}
      <div
        className="p-6 rounded-[50px] bg-black/20 backdrop-blur-md border border-white/10"
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.35)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.25)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
          borderRight: '1px solid rgba(0, 0, 0, 0.15)',
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <MDXContent source={post.content} />
      </div>
    </article>
  );
}
