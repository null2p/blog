'use client';

import React, { CSSProperties } from 'react';
import { WebGLLiquidGlassCard } from './WebGLLiquidGlassCard';

export interface WebGLLiquidGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  displacementScale?: number;
  blurAmount?: number;
  elasticity?: number;
  saturation?: number;
  aberrationIntensity?: number;
  cornerRadius?: number;
  style?: CSSProperties;
}

export function WebGLLiquidGlassPanel({
  children,
  className = '',
  displacementScale = 50,
  blurAmount = 0.0625,
  elasticity = 0.15,
  saturation = 140,
  aberrationIntensity = 2,
  cornerRadius = 12,
  style,
}: WebGLLiquidGlassPanelProps) {
  return (
    <div className={`liquid-glass-panel ${className}`} style={style}>
      <WebGLLiquidGlassCard
        displacementScale={displacementScale}
        blurAmount={blurAmount}
        elasticity={elasticity}
        saturation={saturation}
        aberrationIntensity={aberrationIntensity}
        cornerRadius={cornerRadius}
        noPadding={false}
        style={{ padding: '16px' }}
      >
        {children}
      </WebGLLiquidGlassCard>
    </div>
  );
}
