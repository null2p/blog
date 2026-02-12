import { getFeaturedPosts } from '@/lib/content';
import { PostCard } from '@/components/ui/PostCard';
import Link from 'next/link';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <div className="space-y-16">
      {/* Hero Section - Warm Editorial Style */}
      <section className="text-center py-20 animate-fade-in-up">
        <p
          className="text-sm uppercase tracking-widest mb-4 delay-1 animate-fade-in-up"
          style={{ color: 'var(--muted)' }}
        >
          Personal Blog
        </p>
        <h1
          className="hero-title font-display mb-6 tracking-tight delay-2 animate-fade-in-up"
          style={{ color: 'var(--text)', fontWeight: 900 }}
        >
          Welcome to My Blog
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-body leading-relaxed delay-3 animate-fade-in-up"
          style={{ color: 'var(--muted)' }}
        >
          Exploring technology, design, and everything in between
        </p>
        <div className="flex gap-4 justify-center delay-4 animate-fade-in-up">
          <Link
            href="/posts"
            className="px-6 py-3 rounded-xl font-medium transition"
            style={{
              background: 'var(--accent)',
              color: 'var(--surface)',
            }}
          >
            Read Articles
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-xl font-medium transition"
            style={{
              background: 'var(--surface)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
            }}
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Decorative Ornament */}
      <div className="flex justify-center">
        <div
          className="w-24 h-px"
          style={{ background: 'var(--border)' }}
        />
      </div>

      {/* Featured Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2
            className="font-display tracking-tight"
            style={{ color: 'var(--text)', fontWeight: 900 }}
          >
            Featured Posts
          </h2>
          <Link
            href="/posts"
            className="ink-link font-medium"
          >
            View All
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 paper-surface">
            <p
              className="text-lg"
              style={{ color: 'var(--muted)' }}
            >
              No posts yet. Start writing your first post!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
