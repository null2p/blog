'use client';

import React from 'react';
import LiquidGlass from 'liquid-glass-react';

type LiquidGlassMode = 'standard' | 'polar' | 'prominent' | 'shader';

interface LiquidGlassPanelProps {
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
}

export function LiquidGlassPanel({
  children,
  className = '',
  displacementScale = 50,
  blurAmount = 0.0625,
  elasticity = 0.15,
  saturation = 140,
  aberrationIntensity = 2,
  mode = 'standard',
  cornerRadius = 12,
  overLight = false,
}: LiquidGlassPanelProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
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
          <div className="w-full h-full bg-white/5 backdrop-blur-md border border-white/10" />
        </LiquidGlass>
      </div>
      <div className="relative z-10 p-4 text-shadow-lg">
        {children}
      </div>
    </div>
  );
}
