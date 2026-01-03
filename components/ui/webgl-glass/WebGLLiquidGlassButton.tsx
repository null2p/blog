'use client';

import React, { CSSProperties } from 'react';
import { WebGLLiquidGlassCard } from './WebGLLiquidGlassCard';

export interface WebGLLiquidGlassButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  displacementScale?: number;
  blurAmount?: number;
  elasticity?: number;
  saturation?: number;
  aberrationIntensity?: number;
  cornerRadius?: number;
  style?: CSSProperties;
}

export function WebGLLiquidGlassButton({
  children,
  className = '',
  onClick,
  disabled = false,
  displacementScale = 40,
  blurAmount = 0.05,
  elasticity = 0.2,
  saturation = 130,
  aberrationIntensity = 1.5,
  cornerRadius = 12,
  style,
}: WebGLLiquidGlassButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`liquid-glass-button inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={style}
    >
      <WebGLLiquidGlassCard
        displacementScale={displacementScale}
        blurAmount={blurAmount}
        elasticity={elasticity}
        saturation={saturation}
        aberrationIntensity={aberrationIntensity}
        cornerRadius={cornerRadius}
        noPadding={true}
        style={{ padding: '12px 24px' }}
      >
        <span className="font-semibold whitespace-nowrap">{children}</span>
      </WebGLLiquidGlassCard>
    </button>
  );
}
