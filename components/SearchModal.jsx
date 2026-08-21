'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, Newspaper, Calendar, Layers, User, ArrowRight } from 'lucide-react';




import { useLanguage } from '@/context/LanguageContext';
import { useDbData } from '@/hooks/useDbData';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { language, t } = useLanguage();

  const { data: dbNews } = useDbData('news', []);
  const { data: dbEvents } = useDbData('events', []);
  const { data: dbPrograms } = useDbData('programs', []);
  const { data: dbDownloads } = useDbData('downloads', []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const searchItems = [];

    const pages = [
      { title: 'About CGFWA Overview', titleBn: 'আমাদের সম্পর্কে - মূল পরিচিতি', path: '/about', desc: 'Overview, founding history and statutory mandate' },
      { title: 'History & Milestones', titleBn: 'ইতিহাস ও মাইলফলক', path: '/about/history', desc: 'Chronological timeline from 1998 to present' },
      { title: 'Mission & Vision', titleBn: 'লক্ষ্য ও উদ্দেশ্য', path: '/about/mission-vision', desc: 'Core mission, vision, and strategic values' },
      { title: 'Photo & Video Gallery', titleBn: 'গ্যালারি', path: '/gallery', desc: 'Visual archives of welfare camps and relief drives' },
      { title: 'Publications & Downloads', titleBn: 'প্রকাশনা ও ডাউনলোড', path: '/downloads', desc: 'Annual reports, circulars, forms, and guidelines' },
      { title: 'Contact Us', titleBn: 'যোগাযোগ', path: '/contact', desc: 'Headquarters address, phone numbers, and emergency inquiry' },
    ];

    pages.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.titleBn.includes(q) || p.desc.toLowerCase().includes(q)) {
        searchItems.push({ id: p.path, title: p.title, titleBn: p.titleBn, type: 'Page', path: p.path, description: p.desc });
      }
    });

    dbNews.forEach((n) => {
      if (n.title.toLowerCase().includes(q) || n.titleBn.includes(q) || n.excerpt.toLowerCase().includes(q)) {
        searchItems.push({ id: n.id, title: n.title, titleBn: n.titleBn, type: 'News', path: `/news/${n.slug}`, description: `${n.category} • ${n.publishedAt}` });
      }
    });

    dbPrograms.forEach((pr) => {
      if (pr.title.toLowerCase().includes(q) || pr.titleBn.includes(q) || pr.shortDesc.toLowerCase().includes(q)) {
        searchItems.push({ id: pr.id, title: pr.title, titleBn: pr.titleBn, type: 'Program', path: `/programs/${pr.slug}`, description: pr.category });
      }
    });

    dbEvents.forEach((ev) => {
      if (ev.title.toLowerCase().includes(q) || ev.titleBn.includes(q) || ev.excerpt.toLowerCase().includes(q)) {
        searchItems.push({ id: ev.id, title: ev.title, titleBn: ev.titleBn, type: 'Event', path: `/events/${ev.slug}`, description: `${ev.location} • ${ev.date}` });
      }
    });

    dbDownloads.forEach((dl) => {
      if (dl.title.toLowerCase().includes(q) || dl.titleBn.includes(q)) {
        searchItems.push({ id: dl.id, title: dl.title, titleBn: dl.titleBn, type: 'Download', path: '/downloads', description: dl.category });
      }
    });

    setResults(searchItems);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    router.push(path);
    onClose();
    setQuery('');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'News': return <Newspaper className="w-4 h-4 text-rose-600" />;
      case 'Event': return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'Program': return <Layers className="w-4 h-4 text-indigo-600" />;
      case 'Publication': return <FileText className="w-4 h-4 text-amber-600" />;
      case 'Leadership': return <User className="w-4 h-4 text-purple-600" />;
      default: return <Search className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-md shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-emerald-700 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search programs, news, events, reports...', 'প্রকল্প, সংবাদ, নোটিশ, নির্দেশিকা খুঁজুন...')}
            className="w-full bg-transparent text-slate-900 text-sm font-medium focus:outline-none placeholder-slate-400"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 rounded-md">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="px-2 py-1 text-xs font-semibold rounded bg-slate-200 text-slate-700 hover:bg-slate-300">ESC</button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-slate-100">
          {query.trim() && results.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              {t('No portal content matched your search term.', 'কোনো ফলাফল পাওয়া যায়নি।')}
            </div>
          )}

          {!query.trim() && (
            <div className="p-4 text-xs text-slate-500 space-y-2">
              <span className="font-semibold uppercase tracking-wider text-slate-400">
                {t('Suggested Search Categories:', 'জনপ্রিয় বিভাগসমূহ:')}
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Scholarship', 'Medical Camp', 'Fishermen Relief', 'Annual Report', 'Women Empowerment'].map((tag) => (
                  <button key={tag} onClick={() => setQuery(tag)} className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-medium transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((res) => (
            <button
              key={`${res.type}-${res.id}`}
              onClick={() => handleSelect(res.path)}
              className="w-full text-left p-3 hover:bg-emerald-50/60 rounded-md transition-colors group flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-slate-100 group-hover:bg-emerald-100 shrink-0 transition-colors">
                  {getTypeIcon(res.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200 group-hover:bg-emerald-200 text-slate-700 group-hover:text-emerald-900">{res.type}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-900 line-clamp-1">
                    {language === 'bn' ? res.titleBn : res.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{res.description}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 shrink-0 self-center" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
