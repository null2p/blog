'use client';

import React, {
  useRef,
  useEffect,
  useState,
  CSSProperties,
} from 'react';
import { useScrollSync } from './hooks/useScrollSync';
import { useWebGLRenderer } from './hooks/useWebGLRenderer';
import { vertexShader } from './shaders/vertex';
import { fragmentShader } from './shaders/fragment';

export interface WebGLLiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  refractionStrength?: number;
  cornerRadius?: number;
  noPadding?: boolean;
  style?: CSSProperties;
}

// Background - warm paper color for glass effect
// Uses a data URL with warm vellum color since we no longer have space-bg
const BG_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23F6F0E6" width="100" height="100"/%3E%3C/svg%3E';

export function WebGLLiquidGlassCard({
  children,
  className = '',
  blurAmount = 0.5,
  saturation = 140,
  aberrationIntensity = 2,
  refractionStrength = 3,
  cornerRadius = 50,
  noPadding = false,
  style,
}: WebGLLiquidGlassCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  const { position } = useScrollSync(containerRef);

  const padding = noPadding ? '0' : '24px';
  const ghostPadding = noPadding ? '' : 'p-6';

  // Initialize WebGL renderer
  const { updateUniforms } = useWebGLRenderer(
    canvasRef,
    BG_IMAGE,
    {
      vertexShader,
      fragmentShader,
    }
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update uniforms when position changes
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    updateUniforms({
      u_resolution: [window.innerWidth, window.innerHeight],
      u_elementPos: [rect.left, rect.top],
      u_elementSize: [rect.width, rect.height],
      u_aberrationIntensity: aberrationIntensity,
      u_blurAmount: blurAmount,
      u_saturation: saturation,
      u_refractionStrength: refractionStrength,
      u_time: performance.now() / 1000,
    });
  }, [
    mounted,
    position,
    aberrationIntensity,
    blurAmount,
    saturation,
    refractionStrength,
    updateUniforms,
  ]);

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

      {/* WebGL Canvas for glass effect (refraction + aberration) + CSS blur */}
      {mounted && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            borderRadius: cornerRadius,
            filter: `blur(${4 + blurAmount * 32}px)`,
          }}
        />
      )}

      {/* Content overlay */}
      <div
        className="absolute inset-0"
        style={{ padding }}
      >
        {children}
      </div>

      {/* Warm glass overlay tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: cornerRadius,
          background: 'rgba(255, 248, 239, 0.4)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Thin 3D bezel - warm amber tint */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -1,
          borderRadius: cornerRadius + 1,
          background: `linear-gradient(
            145deg,
            rgba(255, 248, 230, 0.9) 0%,
            rgba(255, 248, 230, 0.6) 15%,
            rgba(255, 248, 230, 0.2) 40%,
            transparent 55%,
            rgba(28, 26, 22, 0.1) 75%,
            rgba(28, 26, 22, 0.2) 100%
          )`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 1,
        }}
      />
      {/* Inner glow for convex effect - warm tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: cornerRadius,
          boxShadow: `
            inset 0 1px 1px 0 rgba(255, 248, 230, 0.6),
            inset 1px 0 1px 0 rgba(255, 248, 230, 0.4),
            inset 0 -1px 1px 0 rgba(255, 248, 230, 0.2),
            inset -1px 0 1px 0 rgba(255, 248, 230, 0.15)
          `,
        }}
      />
    </div>
  );
}
