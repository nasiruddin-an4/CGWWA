'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Breadcrumb = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const pathnames = pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (part) => {
    switch (part) {
      case 'about': return t('About Us', 'আমাদের সম্পর্কে');
      case 'history': return t('History', 'ইতিহাস');
      case 'mission-vision': return t('Mission & Vision', 'লক্ষ্য ও উদ্দেশ্য');
      case 'objectives': return t('Key Objectives', 'প্রধান লক্ষ্যসমূহ');
      case 'leadership': return t('Leadership', 'নেতৃত্ব');
      case 'chairman-message': return t("Chairman's Message", 'চেয়ারম্যানের বাণী');
      case 'director-message': return t("Director's Message", 'মহাপরিচালকের বাণী');
      case 'team': return t('Leadership Team', 'নেতৃত্ব পরিষদ');
      case 'former-leaders': return t('Former Leaders', 'সাবেক নেতৃত্ব');
      case 'activities': return t('Activities', 'কার্যক্রম');
      case 'programs': return t('Programs', 'প্রকল্পসমূহ');
      case 'news': return t('News & Updates', 'সংবাদ ও বিজ্ঞপ্তি');
      case 'events': return t('Events', 'ইভেন্ট');
      case 'gallery': return t('Gallery', 'গ্যালারি');
      case 'photos': return t('Photo Gallery', 'ছবি গ্যালারি');
      case 'videos': return t('Video Gallery', 'ভিডিও গ্যালারি');
      case 'downloads': return t('Publications & Downloads', 'প্রকাশনা ও ডাউনলোড');
      case 'contact': return t('Contact Us', 'যোগাযোগ');
      default: return part.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  return (
    <nav className="flex items-center text-xs text-slate-500 font-medium overflow-x-auto py-1 scrollbar-none" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('Home', 'হোম')}</span>
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="inline-flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-0.5 shrink-0" />
              {isLast ? (
                <span className="text-emerald-800 font-semibold truncate max-w-[200px]" aria-current="page">
                  {getBreadcrumbName(value)}
                </span>
              ) : (
                <Link href={to || '#'} className="text-slate-600 hover:text-emerald-700 transition-colors capitalize truncate max-w-[150px]">
                  {getBreadcrumbName(value)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
