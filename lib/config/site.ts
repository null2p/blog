export const siteConfig = {
  name: 'My Blog',
  description: 'A beautiful blog built with Next.js, MDX, and Liquid Glass',
  url: 'https://yourusername.github.io/blog',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    twitter: '@yourhandle',
    github: 'yourusername',
  },
  links: {
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourhandle',
  },
  // Giscus 댓글 설정 (나중에 활성화)
  giscus: {
    enabled: false,
    repo: 'yourusername/blog',
    repoId: 'YOUR_REPO_ID',
    category: 'General',
    categoryId: 'YOUR_CATEGORY_ID',
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'top',
    theme: 'light',
    lang: 'ko',
  },
  // 네비게이션 메뉴
  nav: [
    { name: 'Home', href: '/' },
    { name: 'Posts', href: '/posts' },
    { name: 'Tags', href: '/tags' },
    { name: 'About', href: '/about' },
  ],
};

export type SiteConfig = typeof siteConfig;
