'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X, ChevronDown, ChevronRight, Search, Headphones,
  LayoutDashboard, Info, Award, Briefcase, Layers,
  Newspaper, Calendar, Image, FileText, PhoneCall
} from 'lucide-react';
import {  navigationMenu  } from '@/lib/navigation';
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

export const MobileSidebar = ({ isOpen, onClose, onOpenSearch }) => {
  const pathname = usePathname();
  const { language, t } = useLanguage();

  const [expandedItems, setExpandedItems] = useState({
    about: true,
    leadership: false,
    activities: false,
    programs: false,
  });

  if (!isOpen) return null;

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isRouteActive = (path) => {
    if (!path) return false;
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-full max-w-[300px] bg-brandBlue text-slate-100 shadow-2xl flex flex-col z-10 overflow-hidden border-r border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-brandBlue">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <CoastGuardLogo className="w-10 h-12 shrink-0 drop-shadow-md" />
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-sm">CGFWA Bangladesh</span>
              <span className="text-[10px] text-slate-300">{t('Coastal Welfare Portal', 'উপকূলীয় সমাজ কল্যাণ পোর্টাল')}</span>
            </div>
          </Link>
          <button onClick={onClose} className="p-2 text-[#8E9299] hover:text-white rounded-md hover:bg-white/10" aria-label="Close Menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 border-b border-white/10">
          <button
            onClick={() => { onClose(); onOpenSearch(); }}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs rounded-full bg-white/5 text-white/70 border border-white/10"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-brandBlue brightness-150" />
              <span>{t('Search site content...', 'অনুসন্ধান করুন...')}</span>
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {navigationMenu.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = !!expandedItems[item.id];
            const active = isRouteActive(item.path);

            return (
              <div key={item.id} className="space-y-0.5">
                {hasChildren ? (
                  <button onClick={() => toggleExpand(item.id)} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium text-white/80 hover:bg-white/5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-white/50">{item.icon && iconMap[item.icon]}</span>
                      <span>{language === 'bn' ? item.titleBn : item.title}</span>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-brandBlue brightness-150" /> : <ChevronRight className="w-4 h-4 text-white/30" />}
                  </button>
                ) : (
                  <Link
                    href={item.path || '/'}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors ${
                      active ? 'bg-brandYellow/25 text-white border-l-4 border-brandYellow font-semibold' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={active ? 'text-brandBlue brightness-150' : 'text-white/50'}>{item.icon && iconMap[item.icon]}</span>
                      <span>{language === 'bn' ? item.titleBn : item.title}</span>
                    </div>
                    {item.badge && <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/20">{item.badge}</span>}
                  </Link>
                )}

                {hasChildren && isExpanded && (
                  <div className="pl-9 space-y-1 my-1">
                    {item.children?.map((sub) => {
                      const subActive = isRouteActive(sub.path);
                      return (
                        <Link
                          key={sub.id}
                          href={sub.path || '/'}
                          onClick={onClose}
                          className={`block py-1.5 px-2 text-[12px] rounded ${subActive ? 'text-white font-semibold' : 'text-white/40 hover:text-white'}`}
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
          <div className="p-3 rounded-md bg-white/5 border border-brandYellow/30 flex items-center gap-3">
            <Headphones className="w-5 h-5 text-brandBlue brightness-150 animate-pulse" />
            <div>
              <div className="text-[10px] text-brandBlue brightness-150 font-bold uppercase tracking-widest">{t('Emergency Helpline', 'জরুরি সেবা')}</div>
              <a href="tel:16122" className="text-white font-bold text-sm">16122</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
