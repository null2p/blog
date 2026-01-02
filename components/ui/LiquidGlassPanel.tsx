'use client';

import React from 'react';
import LiquidGlass from 'liquid-glass-react';

interface LiquidGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  displacementScale?: number;
  blurAmount?: number;
}

export function LiquidGlassPanel({
  children,
  className = '',
  displacementScale = 50,
  blurAmount = 0.5,
}: LiquidGlassPanelProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div className="absolute inset-0 z-0 [&_span]:hidden">
        <LiquidGlass
          displacementScale={displacementScale}
          blurAmount={blurAmount}
        >
          <div className="w-full h-full bg-white/5 backdrop-blur-md border border-white/10" />
        </LiquidGlass>
      </div>
      <div className="relative z-10 p-4">
        {children}
      </div>
    </div>
  );
}
