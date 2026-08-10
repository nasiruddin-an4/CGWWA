'use client';

import { useState } from 'react';
import { Menu, Search, Globe, Phone, Bell, Shield, Type } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { useLanguage } from '@/context/LanguageContext';

export const Header = ({ onOpenMobileSidebar, onOpenSearch }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [fontSize, setFontSize] = useState('normal');

  const handleFontChange = () => {
    const next = fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'xlarge' : 'normal';
    setFontSize(next);
    document.documentElement.classList.remove('text-normal', 'text-large', 'text-xlarge');
    document.documentElement.classList.add(`text-${next}`);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] h-[72px] flex items-center">
      <div className="px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-md text-brandBlue hover:bg-[#F3F4F6] transition-colors border border-[#E5E7EB]"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:block overflow-hidden">
            <Breadcrumb />
          </div>

          <div className="sm:hidden font-serif font-bold text-brandBlue text-sm truncate">
            {t('Bangladesh Coastal Welfare', 'বাংলাদেশ উপকূল কল্যাণ')}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="relative hidden md:block">
            <button
              onClick={onOpenSearch}
              className="flex items-center justify-between bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-full px-4 py-2 text-xs w-56 text-[#8E9299] transition-all text-left"
            >
              <span>{t('Search initiatives...', 'অনুসন্ধান করুন...')}</span>
              <Search className="w-3.5 h-3.5 text-[#8E9299]" />
            </button>
          </div>

          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-full bg-[#F3F4F6] text-brandBlue"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={handleFontChange}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-brandBlue text-xs font-semibold transition-colors"
            title="Toggle Font Size"
          >
            <Type className="w-3.5 h-3.5 text-[#8E9299]" />
            <span className="text-[10px] font-bold">
              {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
            </span>
          </button>

          <button
            onClick={toggleLanguage}
            className="w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-brandBlue flex items-center justify-center font-bold text-xs transition-colors shadow-sm"
            aria-label="Toggle Language"
            title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
          >
            {language === 'en' ? 'BN' : 'EN'}
          </button>

          <a
            href="tel:16122"
            className="w-9 h-9 rounded-full bg-brandYellow text-white flex items-center justify-center shadow-sm hover:brightness-110 transition-all"
            title="Emergency Hotline 16122"
          >
            <Phone className="w-4 h-4 text-white animate-pulse" />
          </a>
        </div>
      </div>
    </header>
  );
};
