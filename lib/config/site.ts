export const siteConfig = {
  name: '기술 블로그',
  description: 'A beautiful blog built with Next.js, MDX, and Liquid Glass',
  url: 'https://null2p.github.io/blog',
  author: {
    name: 'Nuri Park',
    email: 'pnr9255@gmail.com',
    linkedin: 'Nuri Park',
    github: 'null2p',
  },
  links: {
    github: 'https://github.com/null2p',
    linkedin: 'https://linkedin.com/in/nuri-park-32062332b',
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
    { name: 'Playground', href: '/playground' },
    { name: 'About', href: '/about' },
  ],
};

export type SiteConfig = typeof siteConfig;
