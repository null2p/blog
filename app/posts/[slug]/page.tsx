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

      {/* Post Content */}
      <LiquidGlassCard>
        <MDXContent source={post.content} />
      </LiquidGlassCard>
    </article>
  );
}
