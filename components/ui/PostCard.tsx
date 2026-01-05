import Link from 'next/link';
import { Post } from '@/lib/content';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;
  const { title, date, description, tags } = frontmatter;

  return (
    <Link href={`/posts/${slug}/`} className="block h-full">
      <article className="paper-card p-6 h-full cursor-pointer">
        <div className="space-y-4 min-w-[280px]">
          <div>
            <h3
              className="text-xl font-display font-bold mb-2 line-clamp-2 tracking-tight"
              style={{ color: 'var(--text)' }}
            >
              {title}
            </h3>
            <div
              className="flex items-center gap-4 text-sm"
              style={{ color: 'var(--muted)' }}
            >
              <time dateTime={date}>
                {new Date(date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>{readingTime}</span>
            </div>
          </div>

          <p
            className="line-clamp-3"
            style={{ color: 'var(--text)', opacity: 0.85 }}
          >
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    background: 'var(--surface-2)',
                    color: 'var(--accent)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
