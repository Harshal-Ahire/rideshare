import React from 'react';

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const baseStyle = "font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-dark text-white hover:bg-neutral-800",
    brand: "bg-[#00B14F] text-white hover:bg-[#008F3E]",
    secondary: "bg-[#F6F6F6] text-dark hover:bg-gray-200 border border-gray-100",
    outline: "bg-transparent text-dark border border-neutral-300 hover:bg-neutral-50"
  };

  const sizes = {
    sm: "text-xs py-2 px-3",
    md: "text-sm py-3 px-5",
    lg: "text-base py-4 px-6"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}