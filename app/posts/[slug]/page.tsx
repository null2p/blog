import { getAllPostSlugs, getPostBySlug } from '@/lib/content';
import { MDXContent } from '@/components/mdx/MDXContent';
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
      {/* Post Header - Paper Surface */}
      <header className="paper-surface p-8 mb-8 animate-fade-in-up">
        <div className="space-y-4">
          <p
            className="text-sm uppercase tracking-widest"
            style={{ color: 'var(--muted)' }}
          >
            Article
          </p>
          <h1
            className="text-4xl md:text-5xl font-display tracking-tight delay-1 animate-fade-in-up"
            style={{ color: 'var(--text)', fontWeight: 900 }}
          >
            {title}
          </h1>

          <p
            className="text-xl font-body leading-relaxed delay-2 animate-fade-in-up"
            style={{ color: 'var(--muted)' }}
          >
            {description}
          </p>

          <div
            className="flex items-center gap-4 text-sm delay-3 animate-fade-in-up"
            style={{ color: 'var(--muted)' }}
          >
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span style={{ color: 'var(--border)' }}>|</span>
            <span>{post.readingTime}</span>
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 delay-4 animate-fade-in-up">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="px-3 py-1 text-xs font-medium rounded-full transition"
                  style={{
                    background: 'var(--surface-2)',
                    color: 'var(--accent)',
                  }}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Post Content - Solid Paper Surface */}
      <div className="paper-surface p-8">
        <MDXContent source={post.content} />
      </div>
    </article>
  );
}
