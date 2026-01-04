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

// Background image path - should match globals.css
const BG_IMAGE = '/images/space-bg.jpg';

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
