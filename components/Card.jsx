'use client';

import React from 'react';

export const Card = ({ children, className = '', hoverEffect = true, border = true }) => {
  return (
    <div className={`bg-white rounded-md ${border ? 'border border-slate-200/90' : ''} shadow-xs ${hoverEffect ? 'hover:border-brandYellow/40 hover:shadow-md transition-all duration-300 group/card' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 sm:p-8 pb-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`font-semibold text-brandBlue text-base leading-snug group-hover/card:text-brandBlue transition-colors ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 sm:p-8 pt-0 ${className}`}>
      {children}
    </div>
  );
};

// Convenience component for quick standard cards with icons
export const FeatureCard = ({ title, description, icon, badge, className = '' }) => {
  return (
    <Card className={`flex flex-col justify-between h-full ${className}`}>
      <CardHeader className="space-y-4">
        {icon || badge ? (
          <div className="flex items-center justify-between gap-2">
            {icon && (
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200/80 shrink-0 group-hover/card:bg-brandYellow/10 group-hover/card:border-brandYellow/20 group-hover/card:text-brandBlue transition-all">
                {icon}
              </div>
            )}
            {badge && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-brandYellow/10 text-brandBlue border border-brandYellow/20 uppercase tracking-widest">
                {badge}
              </span>
            )}
          </div>
        ) : null}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
