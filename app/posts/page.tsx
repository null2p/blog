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
        <h1 className="text-5xl font-display font-bold text-white mb-4 tracking-tight">All Posts</h1>
        <p className="text-xl text-white/70 font-body font-light">
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
        <div className="text-center py-20">
          <p className="text-white/60 text-lg">
            No posts yet. Start writing your first post!
          </p>
        </div>
      )}
    </div>
  );
}
