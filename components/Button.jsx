'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const Button = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  external = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2.5 font-bold uppercase tracking-wider transition-all duration-300';
  
  const variants = {
    primary: 'bg-brandYellow hover:bg-brandYellowDark text-slate-900 shadow-lg shadow-brandYellow/30 hover:shadow-xl hover:shadow-brandYellow/40',
    secondary: 'bg-white text-brandBlue border border-brandYellow/30 hover:border-brandYellow hover:bg-brandYellow/5 shadow-sm',
    outline: 'bg-transparent text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm',
    ghost: 'bg-transparent text-brandBlue hover:bg-brandYellow/10',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-[10px] rounded-md',
    md: 'px-6 py-3 text-xs rounded-md',
    lg: 'px-8 py-4 text-sm rounded-md',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className} group/btn`;

  // Default icon logic: if variant is primary and no icon is provided, use ArrowRight. 
  // If explicitly null, don't show an icon.
  const renderIcon = () => {
    if (icon === null) return null;
    if (icon) return <span className="transition-transform duration-300 group-hover/btn:translate-x-1">{icon}</span>;
    if (variant === 'primary') return <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />;
    return null;
  };

  if (href) {
    if (external) {
      return (
        <a href={href} className={combinedClassName} target="_blank" rel="noopener noreferrer" {...props}>
          <span>{children}</span>
          {renderIcon()}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName} {...props}>
        <span>{children}</span>
        {renderIcon()}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName} {...props}>
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
};
