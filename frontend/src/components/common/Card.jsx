import React from 'react';

export default function Card({ children, title, subtitle, variant = 'default', className = '', ...props }) {
  const baseStyle = 'rounded-2xl p-5 transition-all duration-200';
  
  const variants = {
    default: 'bg-white border border-gray-100 shadow-sm',
    elevated: 'bg-white border border-gray-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
    outline: 'bg-transparent border border-gray-200',
    light: 'bg-light/50 border border-gray-100'
  };

  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="font-bold text-dark text-base tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-gray-400 font-medium mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}