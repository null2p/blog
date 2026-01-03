'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ScrollSyncResult {
  position: ElementPosition;
  viewportSize: { width: number; height: number };
  updatePosition: () => void;
}

export function useScrollSync(
  elementRef: RefObject<HTMLElement | null>
): ScrollSyncResult {
  const [position, setPosition] = useState<ElementPosition>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const updatePosition = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();

    setPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
  }, [elementRef]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      updatePosition();
    };

    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      updatePosition();
    };

    // Initial update
    updatePosition();
    handleResize();

    // Listen to scroll and resize
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Also use ResizeObserver for element size changes
    let resizeObserver: ResizeObserver | null = null;
    if (elementRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updatePosition();
      });
      resizeObserver.observe(elementRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();
    };
  }, [elementRef, updatePosition]);

  return { position, viewportSize, updatePosition };
}
