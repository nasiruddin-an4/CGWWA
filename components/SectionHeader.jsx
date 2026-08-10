'use client';

import { useLanguage } from '@/context/LanguageContext';

export const SectionHeader = ({
  title,
  titleBn,
  subtitle,
  subtitleBn,
  badge,
  badgeBn,
  centered = false,
  lightText = false,
  className = '',
}) => {
  const { language, t } = useLanguage();

  return (
    <div className={`mb-8 sm:mb-10 ${centered ? 'text-center mx-auto flex flex-col items-center' : 'text-left max-w-3xl'} ${className}`}>
      {badge && (
        <span className={`inline-block px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3 border shadow-sm ${
          lightText 
            ? 'bg-white/10 border-white/20 text-white backdrop-blur-sm' 
            : 'bg-brandYellow/10 border-brandYellow/20 text-brandBlue'
        }`}>
          {t(badge, badgeBn || badge)}
        </span>
      )}

      {title && (
        <h2 className={`text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold leading-tight tracking-tight mb-3 ${
          lightText ? 'text-white' : 'text-brandBlue'
        }`}>
          {language === 'bn' && titleBn ? titleBn : title}
        </h2>
      )}

      {subtitle && (
        <p className={`text-sm sm:text-base leading-relaxed ${centered ? 'mx-auto max-w-2xl' : ''} ${
          lightText ? 'text-white/80' : 'text-[#8E9299]'
        }`}>
          {language === 'bn' && subtitleBn ? subtitleBn : subtitle}
        </p>
      )}
    </div>
  );
};
