'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';

import { useLanguage } from '@/context/LanguageContext';
import { useDbData } from '@/hooks/useDbData';



export default function ProgramsPage() {
  const { language, t } = useLanguage();
  const { data: dbPrograms } = useDbData('programs', []);

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      <PageHeader
        title="Flagship Welfare Programs"
        titleBn="প্রধান ফ্ল্যাগশিপ প্রকল্পসমূহ"
        subtitle="Long-term sustainable initiatives empowering coastal families across Bangladesh."
        subtitleBn="বাংলাদেশ উপকূল জুড়ে মৎস্যজীবী ও দরিদ্র পরিবারের টেকসই জীবনমান উন্নয়ন প্রকল্প।" />
      

      <div className="space-y-6">
        {dbPrograms.map((prog) =>
        <div
          key={prog.id}
          className="bg-white rounded-md border border-[#E5E7EB] p-6 sm:p-8 shadow-xs hover:border-brandYellow transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
            <div className="lg:col-span-4 aspect-16/10 rounded-md overflow-hidden bg-slate-100 border border-[#E5E7EB]">
              <img
              src={prog.image}
              alt={prog.title}
              className="w-full h-full object-cover" />
            
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-brandYellow/10 text-brandBlue text-xs font-bold font-mono uppercase">
                  {prog.id}
                </span>
                <span className="px-3 py-1 rounded-full bg-brandBlue text-white text-[10px] font-bold uppercase tracking-widest">
                  {prog.category}
                </span>
              </div>

              <h3 className="font-serif font-semibold text-brandBlue text-xl sm:text-2xl">
                {language === 'bn' ? prog.titleBn : prog.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#8E9299] leading-relaxed">
                {language === 'bn' ? prog.shortDescBn : prog.shortDesc}
              </p>

              {/* Key Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#F8F9FA] p-3 rounded-md border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#8E9299] uppercase font-bold block">{t('Beneficiaries', 'উপকারভোগী')}</span>
                  <span className="text-sm font-bold text-brandBlue">{prog.beneficiariesTarget}</span>
                </div>
                <div className="bg-[#F8F9FA] p-3 rounded-md border border-[#E5E7EB]">
                  <span className="text-[10px] text-[#8E9299] uppercase font-bold block">{t('Active Zone', 'কার্যকর এলাকা')}</span>
                  <span className="text-sm font-bold text-brandBlue">{prog.districtsInvolved.join(', ')}</span>
                </div>
                <div className="bg-[#F8F9FA] p-3 rounded-md border border-[#E5E7EB] col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#8E9299] uppercase font-bold block">{t('Status', 'বর্তমান অবস্থা')}</span>
                  <span className="text-sm font-bold text-brandBlue">{prog.status}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

};