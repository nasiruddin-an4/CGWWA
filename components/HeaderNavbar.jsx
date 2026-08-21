'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search, Globe, Menu, X, ChevronDown, ExternalLink, BookOpen
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

import {  navigationMenu  } from '@/lib/navigation';
import { useDbData } from '@/hooks/useDbData';
import { CoastGuardLogo } from './CoastGuardLogo';

export const HeaderNavbar = ({ onOpenSearch }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedMobileAccordions, setExpandedMobileAccordions] = useState({});

  const [scrolled, setScrolled] = useState(false);
  const { data: dbOrg } = useDbData('organization', [{}]);
  const organizationInfo = dbOrg[0] || {};

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  const toggleMobileAccordion = (id) => {
    setExpandedMobileAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isLinkActive = (path) => {
    if (!path) return false;
    const cleanPath = path.split('?')[0];
    if (cleanPath === '/') return pathname === '/';
    return pathname === cleanPath || pathname.startsWith(`${cleanPath}/`);
  };

  const isParentActive = (item) => {
    if (isLinkActive(item.path)) return true;
    if (item.children) {
      return item.children.some((child) => isLinkActive(child.path));
    }
    return false;
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${isTransparent
          ? 'bg-black/30 backdrop-blur-md border-b border-white/10 shadow-sm'
          : 'bg-brandBlue border-b border-white/10 shadow-lg'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">

          <Link href="/" className="flex items-center group shrink-0" title={language === 'bn' ? organizationInfo.nameBn : organizationInfo.name}>
            <CoastGuardLogo className="w-12 h-14 sm:w-14 sm:h-16 drop-shadow-md group-hover:scale-105 transition-transform" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-2 font-medium text-sm tracking-wide">
            {navigationMenu.map((item) => {
                const active = isParentActive(item);
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div
                    key={item.id}
                    className="relative group py-2"
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.path || '#'}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-colors ${active
                        ? 'bg-brandYellow/20 text-brandYellow font-bold'
                        : 'text-white/80 hover:text-brandYellow hover:bg-white/10'
                        }`}
                    >
                      <span>{language === 'bn' ? item.titleBn : item.title}</span>
                      {hasChildren && (
                        <ChevronDown className="w-3.5 h-3.5 text-white/50 group-hover:text-brandYellow transition-transform group-hover:rotate-180" />
                      )}
                    </Link>

                    {hasChildren && (
                      <div
                        className={`absolute left-0 top-full pt-1 w-60 z-50 transition-all duration-150 transform origin-top-left ${activeDropdown === item.id
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-95 pointer-events-none'
                          }`}
                      >
                        <div className="bg-white/95 backdrop-blur-xl rounded-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 p-2 space-y-1 font-sans text-sm min-w-[240px]">
                          {item.children?.map((child) => {
                            const childActive = isLinkActive(child.path);
                            return (
                              <Link
                                key={child.id}
                                href={child.path || '#'}
                                className={`flex items-center justify-between px-4 py-2.5 rounded-md transition-all duration-300 group/link ${childActive
                                  ? 'bg-brandYellow/20 text-brandBlue font-bold'
                                  : 'text-slate-600 hover:text-brandBlue hover:bg-brandYellow/10'
                                  }`}
                              >
                                <span className={`transition-transform duration-300 ${!childActive && 'group-hover:translate-x-1'}`}>
                                  {language === 'bn' ? child.titleBn : child.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button onClick={onOpenSearch} className="p-2 rounded-md text-white/80 hover:text-brandYellow hover:bg-white/10 transition-colors" title="Search Website">
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/20 text-xs font-semibold text-white/90 hover:border-brandYellow hover:text-brandYellow hover:bg-white/10 transition-colors"
              title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-current" />
              <span>{language === 'en' ? 'BN' : 'EN'}</span>
            </button>
            <a href="https://mohona-xi.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brandYellow hover:bg-brandYellowDark text-black text-xs font-bold transition-all shadow-sm hover:shadow-md">
              <span>{t('Mohona Shop', 'মোহনা শপ')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link href="/ebook" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-brandBlue text-xs font-bold transition-all shadow-sm hover:shadow-md hover:bg-slate-100">
              <span>{t('E-book', 'ই-বুক')}</span>
              <BookOpen className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href="https://mohona-xi.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brandYellow text-black text-xs font-bold shadow-sm">
              <span>{t('Mohona Shop', 'মোহনা শপ')}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link href="/ebook" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-brandBlue text-xs font-bold shadow-sm">
              <span>{t('E-book', 'ই-বুক')}</span>
              <BookOpen className="w-3 h-3" />
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 focus:outline-none" aria-label="Toggle Mobile Menu">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-brandBlue border-t border-white/10 shadow-xl">
          <div className="p-4 space-y-2 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <button onClick={toggleLanguage} className="flex items-center gap-1.5 text-xs font-bold text-brandYellow">
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'বাংলা সংস্করণ' : 'English Version'}</span>
              </button>
              <button onClick={onOpenSearch} className="flex items-center gap-1 text-xs font-medium text-white/80">
                <Search className="w-4 h-4" />
                <span>{t('Search', 'অনুসন্ধান')}</span>
              </button>
            </div>

            {navigationMenu.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedMobileAccordions[item.id];
                const active = isParentActive(item);

                return (
                  <div key={item.id} className="border-b border-white/10 last:border-none pb-1">
                    {hasChildren ? (
                      <div>
                        <button
                          onClick={() => toggleMobileAccordion(item.id)}
                          className={`w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-bold transition-colors ${active ? 'bg-brandYellow/20 text-brandYellow' : 'text-white/90 hover:bg-white/10'
                            }`}
                        >
                          <span>{language === 'bn' ? item.titleBn : item.title}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-brandYellow' : 'text-white/50'}`} />
                        </button>
                        {isExpanded && (
                          <div className="ml-3 mt-1 pl-3 border-l-2 border-brandYellow space-y-1">
                            {item.children?.map((child) => (
                              <Link
                                key={child.id}
                                href={child.path || '#'}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${isLinkActive(child.path)
                                  ? 'text-brandYellow font-bold bg-brandYellow/10'
                                  : 'text-white/80 hover:text-brandYellow hover:bg-white/5'
                                  }`}
                              >
                                {language === 'bn' ? child.titleBn : child.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.path || '#'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-2 px-3 rounded-md text-sm font-bold transition-colors ${active ? 'bg-brandYellow/20 text-brandYellow' : 'text-white/90 hover:bg-white/10'
                          }`}
                      >
                        {language === 'bn' ? item.titleBn : item.title}
                      </Link>
                    )}
                  </div>
                );
              })}

            <div className="pt-2 flex flex-col gap-2">
              <a href="https://mohona-xi.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-md bg-brandYellow text-black font-bold text-xs flex items-center justify-center gap-2 shadow-sm">
                <span>{t('Visit Mohona Portal', 'মোহনা পোর্টালে যান')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link href="/ebook" className="w-full py-2.5 px-4 rounded-md bg-white text-brandBlue font-bold text-xs flex items-center justify-center gap-2 shadow-sm" onClick={() => setMobileMenuOpen(false)}>
                <span>{t('Read E-book', 'ই-বুক পড়ুন')}</span>
                <BookOpen className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
