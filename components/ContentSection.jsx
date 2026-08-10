'use client';

import { SectionHeader } from './SectionHeader';

export const ContentSection = ({
  title,
  titleBn,
  subtitle,
  subtitleBn,
  badge,
  badgeBn,
  children,
  className = '',
  lightBackground = false,
}) => {
  return (
    <section className={`py-8 sm:py-12 px-4 sm:px-8 rounded-md ${lightBackground ? 'bg-white border border-[#E5E7EB] shadow-sm' : 'bg-transparent'} ${className}`}>
      {(title || subtitle || badge) && (
        <SectionHeader
          title={title}
          titleBn={titleBn}
          subtitle={subtitle}
          subtitleBn={subtitleBn}
          badge={badge}
          badgeBn={badgeBn}
        />
      )}
      {children}
    </section>
  );
};
