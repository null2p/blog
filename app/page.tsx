import { getFeaturedPosts } from '@/lib/content';
import { PostCard } from '@/components/ui/PostCard';
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome to My Blog
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
          Exploring technology, design, and everything in between with a touch of Liquid Glass
        </p>
        <div className="flex gap-4 justify-center">
          <LiquidGlassButton href="/posts" variant="primary">
            Read Articles
          </LiquidGlassButton>
          <LiquidGlassButton href="/about" variant="secondary">
            About Me
          </LiquidGlassButton>
        </div>
      </section>

      {/* Featured Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-white">Featured Posts</h2>
          <LiquidGlassButton href="/posts" variant="secondary">
            View All
          </LiquidGlassButton>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
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
      </section>
    </div>
  );
}
