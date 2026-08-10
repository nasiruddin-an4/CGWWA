'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Info, Award, Briefcase, Layers, Newspaper, Calendar,
  Image, FileText, PhoneCall, ChevronDown, ChevronRight, Search, Headphones
} from 'lucide-react';
import { navigationMenu } from '@/data/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { CoastGuardLogo } from './CoastGuardLogo';

const iconMap = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  Info: <Info className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Newspaper: <Newspaper className="w-4 h-4" />,
  Calendar: <Calendar className="w-4 h-4" />,
  Image: <Image className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  PhoneCall: <PhoneCall className="w-4 h-4" />,
};

export const Sidebar = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const { language, t } = useLanguage();

  const [expandedItems, setExpandedItems] = useState({
    about: pathname === '/' || pathname.startsWith('/about'),
    leadership: pathname.startsWith('/leadership'),
    activities: pathname.startsWith('/activities'),
    programs: pathname.startsWith('/programs'),
    gallery: pathname.startsWith('/gallery'),
    publications: pathname.startsWith('/downloads'),
  });

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isRouteActive = (path) => {
    if (!path) return false;
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <aside className="hidden lg:flex flex-col w-[280px] bg-brandBlue text-slate-100 h-screen sticky top-0 left-0 border-r border-brandYellow/20 shadow-2xl z-20 shrink-0 select-none overflow-hidden">
      <div className="p-6 border-b border-white/10 bg-brandBlue">
        <Link href="/" className="flex items-center gap-3 group">
          <CoastGuardLogo className="w-12 h-14 shrink-0 drop-shadow-lg group-hover:scale-105 transition-transform" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base leading-tight tracking-tight">{t('CGFWA', 'সিজিএফডব্লিউএ')}</span>
              <span className="text-[9px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">OFFICIAL</span>
            </div>
            <span className="text-[10px] text-[#8E9299] uppercase tracking-wider font-semibold leading-tight mt-0.5 truncate">
              {t('Coast Guard Welfare', 'কোস্ট গার্ড ওয়েলফেয়ার')}
            </span>
          </div>
        </Link>

        <button
          onClick={onOpenSearch}
          className="mt-5 w-full flex items-center justify-between px-3.5 py-2 text-xs rounded-md bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-white/40 group-hover:text-brandBlue brightness-125 transition-colors" />
            <span>{t('Search portal...', 'অনুসন্ধান করুন...')}</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-black/40 text-white/40 border border-white/10">Ctrl K</kbd>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-bold text-[#8E9299] uppercase tracking-widest">
          {t('MAIN NAVIGATION', 'মূল নেভিগেশন')}
        </div>

        {navigationMenu.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = !!expandedItems[item.id];
          const active = isRouteActive(item.path);

          return (
            <div key={item.id} className="space-y-0.5">
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium transition-all ${
                    isExpanded || (item.id === 'about' && pathname === '/') || pathname.startsWith(`/${item.id}`)
                      ? 'bg-brandYellow/25 text-white border-l-4 border-brandYellow'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-white/50">{item.icon && iconMap[item.icon]}</span>
                    <span className="text-xs font-medium">{language === 'bn' ? item.titleBn : item.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${item.badgeColor || 'bg-white/10 text-white/80 border-white/20'}`}>{item.badge}</span>}
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-brandBlue brightness-125" /> : <ChevronRight className="w-3.5 h-3.5 text-white/30" />}
                  </div>
                </button>
              ) : (
                <Link
                  href={item.path || '/'}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium transition-all ${
                    active
                      ? 'bg-brandYellow/20 text-white border-l-4 border-brandYellow font-semibold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={active ? 'text-brandBlue brightness-150' : 'text-white/50'}>{item.icon && iconMap[item.icon]}</span>
                    <span>{language === 'bn' ? item.titleBn : item.title}</span>
                  </div>
                  {item.badge && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${item.badgeColor || 'bg-white/10 text-white/80 border-white/20'}`}>{item.badge}</span>}
                </Link>
              )}

              {hasChildren && isExpanded && (
                <div className="pl-9 space-y-1 my-1.5">
                  {item.children?.map((sub) => {
                    const subActive = isRouteActive(sub.path);
                    return (
                      <Link
                        key={sub.id}
                        href={sub.path || '/'}
                        className={`block py-1.5 px-2 text-[12px] rounded transition-colors ${subActive ? 'text-white font-semibold' : 'text-white/40 hover:text-white'}`}
                      >
                        {language === 'bn' ? sub.titleBn : sub.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10 bg-brandBlue">
        <div className="flex items-center space-x-3 text-white/80">
          <div className="w-8 h-8 rounded-full bg-brandYellow/30 border border-brandYellow/50 flex items-center justify-center shrink-0">
            <Headphones className="w-4 h-4 text-brandBlue brightness-125 animate-pulse" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-white">{t('Support Desk 24/7', 'সাপোর্ট ডেস্ক ২৪/৭')}</p>
            <a href="tel:16122" className="text-[12px] font-bold text-brandBlue brightness-125 hover:underline">
              16122 Emergency Hotline
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
