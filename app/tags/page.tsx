import { getAllTags, getPostsByTag } from '@/lib/content';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';
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
        <h1 className="text-5xl font-bold text-white mb-4">All Tags</h1>
        <p className="text-xl text-white/70">
          Browse posts by topic
        </p>
      </div>

      {tags.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags.map((tag) => {
            const postCount = getPostsByTag(tag).length;
            return (
              <Link key={tag} href={`/tags/${tag}`}>
                <LiquidGlassCard className="hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                  <div className="text-center py-8">
                    <h2 className="text-3xl font-bold text-purple-400 mb-2">
                      #{tag}
                    </h2>
                    <p className="text-white/60">
                      {postCount} {postCount === 1 ? 'post' : 'posts'}
                    </p>
                  </div>
                </LiquidGlassCard>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-white/60 text-lg">
            No tags yet.
          </p>
        </div>
      )}
    </div>
  );
}
