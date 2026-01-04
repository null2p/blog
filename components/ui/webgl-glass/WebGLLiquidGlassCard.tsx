'use client';

import React, {
  useRef,
  useEffect,
  useState,
  CSSProperties,
} from 'react';
import { useScrollSync } from './hooks/useScrollSync';
import { useMouseInteraction } from './hooks/useMouseInteraction';

export interface WebGLLiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  displacementScale?: number;
  blurAmount?: number;
  elasticity?: number;
  saturation?: number;
  aberrationIntensity?: number;
  cornerRadius?: number;
  noPadding?: boolean;
  style?: CSSProperties;
}

// Background image path - should match globals.css
const BG_IMAGE = '/images/space-bg.jpg';

export function WebGLLiquidGlassCard({
  children,
  className = '',
  displacementScale = 70,
  blurAmount = 0.0625,
  elasticity = 0.15,
  saturation = 140,
  aberrationIntensity = 2,
  cornerRadius = 50,
  noPadding = false,
  style,
}: WebGLLiquidGlassCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { position, viewportSize } = useScrollSync(containerRef);
  const mouse = useMouseInteraction(containerRef, { elasticity });

  const padding = noPadding ? '0' : '24px';
  const ghostPadding = noPadding ? '' : 'p-6';

  // Calculate blur based on props (convert to pixels)
  const blurPx = Math.round(blurAmount * 200);

  // Calculate saturation filter
  const saturationValue = saturation / 100;

  // Calculate background position to align with page background
  // Both page background and this layer use CSS background-size: cover,
  // so centering is handled automatically - just offset by element position
  const calculateBgPosition = () => {
    if (!mounted || viewportSize.width === 0) {
      return { x: 0, y: 0 };
    }
    return {
      x: -position.x,
      y: -position.y,
    };
  };

  const bgPos = calculateBgPosition();

  // Mouse-based displacement effect (only after mount)
  const mouseDisplacement = mounted ? {
    x: (mouse.normalizedX - 0.5) * displacementScale * 0.1,
    y: (mouse.normalizedY - 0.5) * displacementScale * 0.1,
  } : { x: 0, y: 0 };

  // Use consistent values for SSR - switch to dynamic values only after mount
  const bgWidth = mounted ? viewportSize.width : '100vw';
  const bgHeight = mounted ? viewportSize.height : '100vh';
  const bgLeft = mounted ? bgPos.x + mouseDisplacement.x : 0;
  const bgTop = mounted ? bgPos.y + mouseDisplacement.y : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`liquid-glass-card relative overflow-hidden ${className}`}
      style={{
        borderRadius: cornerRadius,
        ...style,
      }}
    >
      {/* Ghost content for sizing */}
      <div className={`invisible ${ghostPadding}`} aria-hidden="true">
        {children}
      </div>

      {/* Replicated background with blur effect */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: cornerRadius }}
      >
        {/* Background image layer */}
        <div
          className="absolute transition-transform duration-100"
          style={{
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: bgWidth,
            height: bgHeight,
            left: bgLeft,
            top: bgTop,
            filter: `blur(${blurPx}px) saturate(${saturationValue})`,
            transform: 'scale(1.1)', // Prevent blur edge artifacts
          }}
        />

        {/* Chromatic aberration simulation layers */}
        {aberrationIntensity > 0 && mounted && (
          <>
            <div
              className="absolute mix-blend-screen opacity-30 transition-transform duration-100"
              style={{
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: bgWidth,
                height: bgHeight,
                left: bgLeft + aberrationIntensity,
                top: bgTop,
                filter: `blur(${blurPx}px) saturate(${saturationValue})`,
                transform: 'scale(1.1)',
              }}
            />
            <div
              className="absolute mix-blend-screen opacity-30 transition-transform duration-100"
              style={{
                backgroundImage: `url(${BG_IMAGE})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: bgWidth,
                height: bgHeight,
                left: bgLeft - aberrationIntensity,
                top: bgTop,
                filter: `blur(${blurPx}px) saturate(${saturationValue}) hue-rotate(10deg)`,
                transform: 'scale(1.1)',
              }}
            />
          </>
        )}

        {/* Glass tint overlay */}
        <div
          className="absolute inset-0 bg-white/5"
          style={{ borderRadius: cornerRadius }}
        />
      </div>

      {/* Content overlay */}
      <div
        className="absolute inset-0 text-shadow-lg"
        style={{ padding }}
      >
        {children}
      </div>

      {/* 3D Bezel effect - macOS liquid-glass style */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: cornerRadius,
          borderTop: '1px solid rgba(255, 255, 255, 0.35)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.25)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
          borderRight: '1px solid rgba(0, 0, 0, 0.15)',
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
}
