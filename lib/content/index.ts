import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft?: boolean;
  cover?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

/**
 * 모든 포스트 파일명(slug) 가져오기
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

/**
 * 특정 slug의 포스트 데이터 가져오기
 */
export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fallbackPath = path.join(postsDirectory, `${slug}.md`);

  let fileContents: string;

  if (fs.existsSync(fullPath)) {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } else if (fs.existsSync(fallbackPath)) {
    fileContents = fs.readFileSync(fallbackPath, 'utf8');
  } else {
    throw new Error(`Post not found: ${slug}`);
  }

  const { data, content } = matter(fileContents);
  const reading = readingTime(content);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: reading.text,
  };
}

/**
 * 모든 포스트 가져오기 (draft 제외, 날짜순 정렬)
 */
export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA; // 최신순
    });

  return posts;
}

/**
 * 모든 태그 가져오기
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet).sort();
}

/**
 * 특정 태그의 포스트 가져오기
 */
export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.frontmatter.tags?.includes(tag)
  );
}

/**
 * Featured 포스트 가져오기 (최신 3개)
 */
export function getFeaturedPosts(count: number = 3): Post[] {
  const posts = getAllPosts();
  return posts.slice(0, count);
}
