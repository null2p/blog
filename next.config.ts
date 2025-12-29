import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // GitHub Pages 배포를 위한 설정
  output: 'export',
  images: {
    unoptimized: true, // 정적 export에서는 이미지 최적화 비활성화
  },

  // MDX 파일을 페이지로 처리
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // basePath는 GitHub Pages 배포 시 레포 이름으로 설정
  // 로컬 개발 시에는 환경변수로 조건부 설정
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // Trailing slash for GitHub Pages
  trailingSlash: true,
};

const withMDX = createMDX({
  // MDX 옵션은 next-mdx-remote에서 처리
});

export default withMDX(nextConfig);
