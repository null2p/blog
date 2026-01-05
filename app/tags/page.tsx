import { getAllTags, getPostsByTag } from '@/lib/content';
import Link from 'next/link';

export const metadata = {
  title: 'All Tags | My Blog',
  description: 'Browse posts by tags',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p
          className="text-sm uppercase tracking-widest mb-2"
          style={{ color: 'var(--muted)' }}
        >
          Topics
        </p>
        <h1
          className="text-5xl font-display mb-4 tracking-tight"
          style={{ color: 'var(--text)', fontWeight: 900 }}
        >
          All Tags
        </h1>
        <p
          className="text-xl font-body"
          style={{ color: 'var(--muted)' }}
        >
          Browse posts by topic
        </p>
      </div>

      {tags.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags.map((tag) => {
            const postCount = getPostsByTag(tag).length;
            return (
              <Link key={tag} href={`/tags/${tag}`}>
                <article className="paper-card p-8 text-center cursor-pointer">
                  <h2
                    className="text-3xl font-display mb-2 tracking-tight"
                    style={{ color: 'var(--accent)', fontWeight: 900 }}
                  >
                    #{tag}
                  </h2>
                  <p style={{ color: 'var(--muted)' }}>
                    {postCount} {postCount === 1 ? 'post' : 'posts'}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 paper-surface">
          <p
            className="text-lg"
            style={{ color: 'var(--muted)' }}
          >
            No tags yet.
          </p>
        </div>
      )}
    </div>
  );
}
