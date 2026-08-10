'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { formerLeaders } from '@/data/leadership';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FormerLeadersPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <PageHeader
        category="Historical Record"
        categoryBn="ইতিহাসের পাতা"
        title="Former Chairmen & Directors General"
        titleBn="সাবেক চেয়ারম্যান ও মহাপরিচালকবৃন্দ"
        subtitle="Honouring the visionary leaders who established and expanded CGFWA since 1998."
        subtitleBn="১৯৯৮ সাল থেকে সংস্থাকে পরিচালিত করা সাবেক শ্রদ্ধেয় চেয়ারম্যানবৃন্দ।" />


      <div className="space-y-5">
        {formerLeaders.map((item, idx) => (
          <div key={item.id} className="group relative bg-white rounded-md border border-slate-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 overflow-hidden">

            {/* Watermark SL */}
            <div className="absolute -left-2 -top-6 text-[100px] sm:text-[140px] font-black text-slate-50 group-hover:text-brandYellow/10 transition-colors z-0 select-none pointer-events-none font-mono tracking-tighter leading-none">
              {(idx + 1).toString().padStart(2, '0')}
            </div>

            {/* Image (Larger) */}
            <div className="relative z-10 shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-md sm:rounded-md overflow-hidden bg-slate-100 border-4 border-white shadow-lg group-hover:border-brandYellow/40 transition-colors">
                <img src={item.photo} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              </div>
            </div>

            {/* Content Details */}
            <div className="relative z-10 flex-1 text-center sm:text-left space-y-1.5">
              <h3 className="font-semibold text-brandBlue text-xl sm:text-2xl leading-tight">
                {language === 'bn' ? item.nameBn : item.name}
              </h3>
              <p className="text-sm sm:text-base font-medium text-slate-500">
                {language === 'bn' ? item.designationBn : item.designation}
              </p>
            </div>

            {/* Tenure & Badges */}
            <div className="relative z-10 shrink-0 flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto pt-5 sm:pt-0 border-t sm:border-t-0 border-slate-100 mt-2 sm:mt-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-50 text-brandBlue text-sm sm:text-base font-bold font-mono group-hover:bg-brandYellow/10 transition-colors shadow-sm">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brandYellowDark" />
                {item.startDate} &mdash; {item.endDate}
              </div>
              <span className="px-4 py-1.5 text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full bg-slate-100 text-slate-400 border border-slate-200">
                {t('Former Leader', 'সাবেক লিডার')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>);

};