import { getAllTags, getPostsByTag } from '@/lib/content';
import { PostCard } from '@/components/ui/PostCard';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  return {
    title: `Posts tagged with "${tag}" | My Blog`,
    description: `All posts tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p
          className="text-sm uppercase tracking-widest mb-2"
          style={{ color: 'var(--muted)' }}
        >
          Tagged
        </p>
        <h1
          className="text-5xl font-display mb-4 tracking-tight"
          style={{ color: 'var(--accent)', fontWeight: 900 }}
        >
          #{tag}
        </h1>
        <p
          className="text-xl font-body"
          style={{ color: 'var(--muted)' }}
        >
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with {tag}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-20 paper-surface"
          style={{ borderRadius: '12px' }}
        >
          <p
            className="text-lg"
            style={{ color: 'var(--muted)' }}
          >
            No posts found with this tag.
          </p>
        </div>
      )}
    </div>
  );
}
