'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { presidentInfo } from '@/data/leadership';
import Link from 'next/link';
import { ArrowRight, Users, Map, Heart, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LeadershipOverviewPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <PageHeader
        category="Governance"
        categoryBn="প্রশাসনিক পরিষদ"
        title="Leadership & Board of Governors"
        titleBn="সংস্থার পরিচালনা পর্ষদ ও প্রশাসনিক নেতৃত্ব"
        subtitle="Distinguished leaders guiding Bangladesh Coast Guard Family Welfare Association."
        subtitleBn="বিসিসিডব্লিউএ-এর গতিশীল ও অভিজ্ঞ পরিচালনা পর্ষদ।" />
      

      {/* President Card (Centered) */}
      <div className="max-w-3xl mx-auto bg-white rounded-md p-6 sm:p-8 border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <div className="w-full sm:w-1/3 aspect-3/4 rounded-md overflow-hidden bg-slate-100 shrink-0">
          <img
            src={presidentInfo.photo}
            alt={presidentInfo.name}
            className="w-full h-full object-cover" />
        </div>
        
        <div className="w-full sm:w-2/3 space-y-4 flex flex-col justify-between h-full">
          <div>
            <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-brandYellow/10 text-brandBlue tracking-widest">
              {t('President, CGFWA', 'প্রেসিডেন্ট')}
            </span>
            <h3 className="text-2xl font-serif text-brandBlue mt-4 mb-1">
              {language === 'bn' ? presidentInfo.nameBn : presidentInfo.name}
            </h3>
            <p className="text-sm text-[#8E9299]">
              {language === 'bn' ? presidentInfo.designationBn : presidentInfo.designation}
            </p>
          </div>
          
          <blockquote className="text-sm italic text-slate-700 bg-[#F8F9FA] p-4 rounded-md border-l-2 border-brandYellow">
            "{language === 'bn' ? presidentInfo.quoteBn : presidentInfo.quote}"
          </blockquote>

          <Link
            href="/leadership/president-message"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:underline pt-2 uppercase tracking-wide">
            <span>{t("Read President's Full Message", 'প্রেসিডেন্টের সম্পূর্ণ বাণী পড়ুন')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quick Navigation Cards for Committees */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        
        <Link
          href="/leadership/president-committee"
          className="p-6 rounded-md bg-brandBlue text-white border border-white/10 hover:border-brandYellow transition-all flex flex-col justify-between shadow-lg space-y-4 group">
          <Award className="w-8 h-8 text-brandYellow group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="font-serif font-bold text-lg">{t('President Committee', 'প্রেসিডেন্ট কমিটি')}</h3>
            <p className="text-white/70 text-sm mt-1">{t('View details', 'বিস্তারিত দেখুন')} &rarr;</p>
          </div>
        </Link>

        <Link
          href="/leadership/central-committee"
          className="p-6 rounded-md bg-brandBlue text-white border border-white/10 hover:border-brandYellow transition-all flex flex-col justify-between shadow-lg space-y-4 group">
          <Users className="w-8 h-8 text-brandYellow group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="font-serif font-bold text-lg">{t('Central Committee', 'কেন্দ্রীয় কমিটি')}</h3>
            <p className="text-white/70 text-sm mt-1">{t('View details', 'বিস্তারিত দেখুন')} &rarr;</p>
          </div>
        </Link>

        <Link
          href="/leadership/chairman-committee"
          className="p-6 rounded-md bg-brandBlue text-white border border-white/10 hover:border-brandYellow transition-all flex flex-col justify-between shadow-lg space-y-4 group">
          <Map className="w-8 h-8 text-brandYellow group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="font-serif font-bold text-lg">{t('Chairman Committee', 'চেয়ারম্যান কমিটি')}</h3>
            <p className="text-white/70 text-sm mt-1">{t('View details', 'বিস্তারিত দেখুন')} &rarr;</p>
          </div>
        </Link>
        
        <Link
          href="/leadership/cgfwa-zones"
          className="p-6 rounded-md bg-brandBlue text-white border border-white/10 hover:border-brandYellow transition-all flex flex-col justify-between shadow-lg space-y-4 group">
          <Heart className="w-8 h-8 text-brandYellow group-hover:scale-110 transition-transform" />
          <div>
            <h3 className="font-serif font-bold text-lg">{t('CGFWA Zones', 'সিজিএফডব্লিউএ জোনসমূহ')}</h3>
            <p className="text-white/70 text-sm mt-1">{t('View details', 'বিস্তারিত দেখুন')} &rarr;</p>
          </div>
        </Link>
      </div>
    </div>);
};