/**
 * Layout Configuration
 * 레이아웃 관련 설정을 한 곳에서 관리합니다.
 */

export const layoutConfig = {
  // 콘텐츠 최대 너비 (Tailwind 클래스)
  maxWidth: 'max-w-6xl',

  // 콘텐츠 컨테이너 기본 클래스
  container: 'max-w-6xl mx-auto',

  // 페이지별 패딩
  padding: {
    page: 'px-4',
    section: 'p-8',
  },

  // 반응형 브레이크포인트별 값 (참고용)
  breakpoints: {
    'max-w-6xl': '1152px',
    'max-w-5xl': '1024px',
    'max-w-4xl': '896px',
    'max-w-3xl': '768px',
  },
} as const;

export type LayoutConfig = typeof layoutConfig;
