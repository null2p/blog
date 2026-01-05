import { getAllPosts } from '@/lib/content';
import { PostCard } from '@/components/ui/PostCard';

export const metadata = {
  title: 'All Posts | My Blog',
  description: 'Browse all blog posts',
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p
          className="text-sm uppercase tracking-widest mb-2"
          style={{ color: 'var(--muted)' }}
        >
          Archive
        </p>
        <h1
          className="text-5xl font-display mb-4 tracking-tight"
          style={{ color: 'var(--text)', fontWeight: 900 }}
        >
          All Posts
        </h1>
        <p
          className="text-xl font-body"
          style={{ color: 'var(--muted)' }}
        >
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
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
            No posts yet. Start writing your first post!
          </p>
        </div>
      )}
    </div>
  );
}
