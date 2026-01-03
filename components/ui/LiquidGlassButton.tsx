'use client';

import React from 'react';
import LiquidGlass from 'liquid-glass-react';

type LiquidGlassMode = 'standard' | 'polar' | 'prominent' | 'shader';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  displacementScale?: number;
  blurAmount?: number;
  elasticity?: number;
  saturation?: number;
  aberrationIntensity?: number;
  mode?: LiquidGlassMode;
  cornerRadius?: number;
  overLight?: boolean;
}

export function LiquidGlassButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  displacementScale = 40,
  blurAmount = 0.04,
  elasticity = 0.2,
  saturation = 140,
  aberrationIntensity = 2,
  mode = 'standard',
  cornerRadius = 8,
  overLight = false,
}: LiquidGlassButtonProps) {
  const baseStyles = 'relative inline-block rounded-lg transition-transform hover:scale-105';
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20',
    secondary: 'bg-white/10',
  };

  const glassContent = (
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
      <div className="w-full h-full bg-white/5 backdrop-blur-md border border-white/20" />
    </LiquidGlass>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variantStyles[variant]} ${className} overflow-hidden`}>
        <div className="absolute inset-0 z-0 [&_span]:hidden">
          {glassContent}
        </div>
        <div className="relative z-10 px-6 py-3">
          <span className="font-medium text-white text-shadow-lg">{children}</span>
        </div>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className} overflow-hidden`}>
      <div className="absolute inset-0 z-0 [&_span]:hidden">
        {glassContent}
      </div>
      <div className="relative z-10 px-6 py-3">
        <span className="font-medium text-white text-shadow-lg">{children}</span>
      </div>
    </button>
  );
}
