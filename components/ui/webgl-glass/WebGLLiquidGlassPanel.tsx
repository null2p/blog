'use client';

import React, { CSSProperties } from 'react';
import { WebGLLiquidGlassCard } from './WebGLLiquidGlassCard';

export interface WebGLLiquidGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  cornerRadius?: number;
  style?: CSSProperties;
}

export function WebGLLiquidGlassPanel({
  children,
  className = '',
  blurAmount = 0.0625,
  saturation = 140,
  aberrationIntensity = 2,
  cornerRadius = 24,
  style,
}: WebGLLiquidGlassPanelProps) {
  return (
    <div className={`liquid-glass-panel ${className}`} style={style}>
      <WebGLLiquidGlassCard
        blurAmount={blurAmount}
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
