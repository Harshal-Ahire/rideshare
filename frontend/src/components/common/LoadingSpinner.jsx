import React from 'react';

export default function LoadingSpinner({ size = 'medium', color = 'brand', fullPage = false }) {
  const sizes = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };

  const colors = {
    brand: 'border-brand border-t-transparent',
    dark: 'border-dark border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  const spinner = (
    <div className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`} role="status" />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}