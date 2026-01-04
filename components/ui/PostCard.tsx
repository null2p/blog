'use client';

import Link from 'next/link';
import { LiquidGlassCard } from './LiquidGlassCard';
import { Post } from '@/lib/content';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;
  const { title, date, description, tags } = frontmatter;

  return (
    <Link href={`/posts/${slug}/`} className="block h-full">
      <LiquidGlassCard className="hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
        <div className="space-y-4 min-w-[280px]">
          <div>
            <h3 className="text-xl font-display font-bold text-white text-shadow-lg mb-2 line-clamp-2 tracking-tight">
              {title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-white/60 text-shadow-lg">
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

          <p className="text-white/80 text-shadow-lg line-clamp-3">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-white/10 rounded-full text-white/80 text-shadow-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </LiquidGlassCard>
    </Link>
  );
}
