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
  blurAmount = 0.05,
}: LiquidGlassPanelProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <LiquidGlass
        displacementScale={displacementScale}
        blurAmount={blurAmount}
      >
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-4">
          {children}
        </div>
      </LiquidGlass>
    </div>
  );
}
