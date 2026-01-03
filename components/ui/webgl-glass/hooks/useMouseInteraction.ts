'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  isOver: boolean;
}

export function useMouseInteraction(
  elementRef: RefObject<HTMLElement | null>,
  options: {
    elasticity?: number;
  } = {}
): MousePosition {
  const { elasticity = 0.15 } = options;

  const [mousePos, setMousePos] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
    isOver: false,
  });

  const [targetPos, setTargetPos] = useState({ x: 0.5, y: 0.5 });

  // Smooth interpolation towards target
  useEffect(() => {
    if (!mousePos.isOver) return;

    let animationFrame: number;

    const animate = () => {
      setMousePos((prev) => {
        const newX = prev.normalizedX + (targetPos.x - prev.normalizedX) * elasticity;
        const newY = prev.normalizedY + (targetPos.y - prev.normalizedY) * elasticity;

        // Stop animating if we're close enough
        if (
          Math.abs(newX - targetPos.x) < 0.001 &&
          Math.abs(newY - targetPos.y) < 0.001
        ) {
          return {
            ...prev,
            normalizedX: targetPos.x,
            normalizedY: targetPos.y,
          };
        }

        return {
          ...prev,
          normalizedX: newX,
          normalizedY: newY,
        };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [targetPos, elasticity, mousePos.isOver]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normalizedX = Math.max(0, Math.min(1, x / rect.width));
      const normalizedY = Math.max(0, Math.min(1, y / rect.height));

      setMousePos((prev) => ({
        ...prev,
        x,
        y,
        isOver: true,
      }));

      setTargetPos({ x: normalizedX, y: normalizedY });
    };

    const handleMouseEnter = () => {
      setMousePos((prev) => ({ ...prev, isOver: true }));
    };

    const handleMouseLeave = () => {
      setMousePos((prev) => ({ ...prev, isOver: false }));
      // Reset to center when mouse leaves
      setTargetPos({ x: 0.5, y: 0.5 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef]);

  return mousePos;
}
