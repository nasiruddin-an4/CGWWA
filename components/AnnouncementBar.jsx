'use client';

import { useState } from 'react';
import { Bell, X, ArrowRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const AnnouncementBar = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-brandBlue text-white text-xs sm:text-sm py-2 px-3 sm:px-6 border-b border-brandYellow/30 relative z-30 flex items-center justify-between shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brandRed text-white font-bold text-[10px] uppercase tracking-widest shrink-0 animate-pulse">
            <ShieldAlert className="w-3 h-3" />
            {t('OFFICIAL NOTICE', 'জরুরি নোটিশ')}
          </span>
          <p className="truncate text-slate-200 font-medium text-[12px] sm:text-sm">
            {t(
              'Applications now open for Coastal Education Merit Scholarships 2026. Last date: August 30.',
              'উপকূলীয় শিক্ষা ও মেধা উপবৃত্তি ২০২৬ এর আবেদন গ্রহণ চলছে। আবেদনের শেষ তারিখ: ৩০ আগস্ট।'
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-1 text-brandYellow brightness-150 hover:brightness-200 font-bold text-xs transition-colors hover:underline uppercase tracking-wide"
          >
            {t('Apply / Circular', 'আবেদন ও বিস্তারিত')}
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="p-1 text-[#8E9299] hover:text-white rounded-full transition-colors"
            aria-label="Close Notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
