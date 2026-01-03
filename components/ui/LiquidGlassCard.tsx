'use client';

import React from 'react';
import LiquidGlass from 'liquid-glass-react';

type LiquidGlassMode = 'standard' | 'polar' | 'prominent' | 'shader';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  displacementScale?: number;
  blurAmount?: number;
  elasticity?: number;
  saturation?: number;
  aberrationIntensity?: number;
  mode?: LiquidGlassMode;
  cornerRadius?: number;
  overLight?: boolean;
  overflowHidden?: boolean;
  noPadding?: boolean;
}

export function LiquidGlassCard({
  children,
  className = '',
  displacementScale = 70,
  blurAmount = 0.0625,
  elasticity = 0.15,
  saturation = 140,
  aberrationIntensity = 2,
  mode = 'standard',
  cornerRadius = 16,
  overLight = false,
  overflowHidden = true,
  noPadding = false,
}: LiquidGlassCardProps) {
  return (
    <div className={`relative rounded-2xl ${overflowHidden ? 'overflow-hidden' : ''} ${className}`}>
      <div className="absolute inset-0 z-0 [&_span]:hidden">
        <LiquidGlass
          displacementScale={displacementScale}
          blurAmount={blurAmount}
          elasticity={elasticity}
          saturation={saturation}
          aberrationIntensity={aberrationIntensity}
          mode={mode}
          cornerRadius={cornerRadius}
          overLight={overLight}
        >
          <div className="w-full h-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl" />
        </LiquidGlass>
      </div>
      <div className={`relative z-10 text-shadow-lg ${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>
    </div>
  );
}
