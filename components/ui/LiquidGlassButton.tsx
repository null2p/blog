'use client';

import React from 'react';
import LiquidGlass from 'liquid-glass-react';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function LiquidGlassButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
}: LiquidGlassButtonProps) {
  const baseStyles = 'relative inline-block rounded-lg transition-transform hover:scale-105';
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20',
    secondary: 'bg-white/10',
  };

  const content = (
    <div className="relative px-6 py-3 backdrop-blur-md border border-white/20">
      <span className="relative z-10 font-medium text-white">{children}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
        <LiquidGlass displacementScale={40} blurAmount={0.04} elasticity={0.2}>
          {content}
        </LiquidGlass>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <LiquidGlass displacementScale={40} blurAmount={0.04} elasticity={0.2}>
        {content}
      </LiquidGlass>
    </button>
  );
}
