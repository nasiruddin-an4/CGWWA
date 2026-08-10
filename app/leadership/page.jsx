'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { chairmanInfo, directorInfo } from '@/data/leadership';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
        subtitle="Distinguished leaders guiding Bangladesh Coastal & Community Welfare Association."
        subtitleBn="বিসিসিডব্লিউএ-এর গতিশীল ও অভিজ্ঞ পরিচালনা পর্ষদ।" />
      

      {/* Chairman & Director General Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chairman */}
        <div className="bg-white rounded-md p-6 border border-[#E5E7EB] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="aspect-4/3 rounded-md overflow-hidden bg-slate-100">
              <img
                src={chairmanInfo.photo}
                alt={chairmanInfo.name}
                className="w-full h-full object-cover" />
              
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-brandYellow/10 text-brandBlue tracking-widest">
                {t('Board Chairman', 'চেয়ারম্যান')}
              </span>
              <h3 className="text-xl font-serif text-brandBlue mt-2">
                {language === 'bn' ? chairmanInfo.nameBn : chairmanInfo.name}
              </h3>
              <p className="text-xs text-[#8E9299]">
                {language === 'bn' ? chairmanInfo.designationBn : chairmanInfo.designation}
              </p>
            </div>
            <blockquote className="text-xs italic text-slate-700 bg-[#F8F9FA] p-3.5 rounded-md border-l-2 border-brandYellow">
              "{language === 'bn' ? chairmanInfo.quoteBn : chairmanInfo.quote}"
            </blockquote>
          </div>

          <Link
            href="/leadership/chairman-message"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:underline pt-2 uppercase tracking-wide">
            
            <span>{t("Read Chairman's Full Address", 'চেয়ারম্যানের সম্পূর্ণ বাণী পড়ুন')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Director General */}
        <div className="bg-white rounded-md p-6 border border-[#E5E7EB] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="aspect-4/3 rounded-md overflow-hidden bg-slate-100">
              <img
                src={directorInfo.photo}
                alt={directorInfo.name}
                className="w-full h-full object-cover" />
              
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-brandBlue/10 text-brandBlue tracking-widest">
                {t('Director General & CEO', 'মহাপরিচালক')}
              </span>
              <h3 className="text-xl font-serif text-brandBlue mt-2">
                {language === 'bn' ? directorInfo.nameBn : directorInfo.name}
              </h3>
              <p className="text-xs text-[#8E9299]">
                {language === 'bn' ? directorInfo.designationBn : directorInfo.designation}
              </p>
            </div>
            <blockquote className="text-xs italic text-slate-700 bg-[#F8F9FA] p-3.5 rounded-md border-l-2 border-brandBlue">
              "{language === 'bn' ? directorInfo.quoteBn : directorInfo.quote}"
            </blockquote>
          </div>

          <Link
            href="/leadership/director-message"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:underline pt-2 uppercase tracking-wide">
            
            <span>{t("Read Director's Message", 'মহাপরিচালকের বাণী পড়ুন')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/leadership/team"
          className="p-6 rounded-md bg-brandBlue text-white border border-white/10 hover:border-brandYellow transition-all flex items-center justify-between shadow-lg">
          
          <div>
            <h4 className="font-serif font-semibold text-base text-white">{t('Executive Leadership Team', 'পরিচালনা পর্ষদ টিম')}</h4>
            <p className="text-xs text-[#8E9299] mt-1">{t('Meet our directors for Admin, Finance & Field Ops', 'পরিচালকবৃন্দ')}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-brandBlue brightness-150" />
        </Link>

        <Link
          href="/leadership/former-leaders"
          className="p-6 rounded-md bg-brandBlue text-white border border-white/10 hover:border-brandYellow transition-all flex items-center justify-between shadow-lg">
          
          <div>
            <h4 className="font-serif font-semibold text-base text-white">{t('Former Leaders Archive', 'সাবেক চেয়ারম্যান ও মহাপরিচালকগণ')}</h4>
            <p className="text-xs text-[#8E9299] mt-1">{t('Honouring historical leaders from 1998 to 2023', 'স্মরণীয় নেতৃত্ব')}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-brandBlue brightness-150" />
        </Link>
      </div>
    </div>);

};