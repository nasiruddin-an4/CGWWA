'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Shield, Sparkles } from 'lucide-react';

export const PageHeader = ({
  category,
  categoryBn,
  title,
  titleBn,
  subtitle,
  subtitleBn,
  badge,
}) => {
  const { language, t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-brandBlue text-white rounded-md p-6 sm:p-10 mb-8 border border-brandYellow/30 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-brandBlue via-brandBlue/95 to-brandYellow/20 z-0" />
      <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-brandYellow/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brandYellow/30 border border-brandYellow/50 text-white text-[10px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-brandBlue brightness-150" />
              {t(category, categoryBn || category)}
            </span>
          )}

          {badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brandRed/20 border border-brandRed/40 text-brandRed brightness-125 text-[10px] font-bold">
              <Shield className="w-3 h-3" />
              {badge}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif leading-tight text-white mb-3">
          {language === 'bn' && titleBn ? titleBn : title}
        </h1>

        {subtitle && (
          <p className="text-[#8E9299] text-sm sm:text-base leading-relaxed max-w-2xl font-semibold">
            {language === 'bn' && subtitleBn ? subtitleBn : subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
