'use client';

import React from 'react';
import LiquidGlass from 'liquid-glass-react';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  displacementScale?: number;
  blurAmount?: number;
  elasticity?: number;
}

export function LiquidGlassCard({
  children,
  className = '',
  displacementScale = 70,
  blurAmount = 0.5,
  elasticity = 0.15,
}: LiquidGlassCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div className="absolute inset-0 z-0 [&_span]:hidden">
        <LiquidGlass
          displacementScale={displacementScale}
          blurAmount={blurAmount}
          elasticity={elasticity}
        >
          <div className="w-full h-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl" />
        </LiquidGlass>
      </div>
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}
