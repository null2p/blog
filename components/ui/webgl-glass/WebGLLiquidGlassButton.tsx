'use client';

import React, { CSSProperties } from 'react';
import Link from 'next/link';
import { WebGLLiquidGlassCard } from './WebGLLiquidGlassCard';

export interface WebGLLiquidGlassButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
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
  href,
  onClick,
  disabled = false,
  variant = 'primary',
  displacementScale = 40,
  blurAmount = 0.05,
  elasticity = 0.2,
  saturation = 130,
  aberrationIntensity = 1.5,
  cornerRadius = 100,
  style,
}: WebGLLiquidGlassButtonProps) {
  const variantStyles = variant === 'primary'
    ? 'text-white'
    : 'text-white/80';

  const content = (
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
      <span className={`font-display font-semibold whitespace-nowrap ${variantStyles}`}>{children}</span>
    </WebGLLiquidGlassCard>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`liquid-glass-button inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className}`}
        style={style}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`liquid-glass-button inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={style}
    >
      {content}
    </button>
  );
}
