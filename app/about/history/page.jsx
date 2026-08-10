'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { historyMilestones } from '@/data/organization';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';

export default function HistoryPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <PageHeader
        category="Chronology"
        categoryBn="ইতিহাসের ধারা"
        title="History & Key Institutional Milestones"
        titleBn="সংস্থার ইতিহাস ও অর্জনের পথপরিক্রমা"
        subtitle="28 Years of Transforming Coastal Hardship into Institutional Resilience (1998 - 2026)."
        subtitleBn="১৯৯৮ সাল থেকে ২০২৬ পর্যন্ত ২৮ বছরের পথচলা ও উন্নয়ন চিত্র।" />
      

      <div className="bg-white rounded-md p-6 sm:p-10 border border-[#E5E7EB] shadow-xs space-y-8">
        <SectionHeader
          title="Historical Timeline (1998 - 2026)"
          titleBn="ঐতিহাসিক মাইলফলকসমূহ"
          className="mb-0 sm:mb-0"
        />

        {/* Timeline Component */}
        <div className="relative border-l-2 border-brandYellow ml-4 sm:ml-8 space-y-8 py-2">
          {historyMilestones.map((m) =>
          <div key={m.year} className="relative pl-6 sm:pl-10 group">
              {/* Year Marker Circle */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-brandYellow text-slate-900 font-bold text-xs flex items-center justify-center ring-4 ring-white shadow-xs font-mono">
                {m.year.slice(-2)}
              </div>

              <div className="bg-[#F8F9FA] p-6 rounded-md border border-[#E5E7EB] group-hover:border-brandYellow transition-all">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brandYellow/10 text-brandBlue font-bold text-[10px] tracking-widest uppercase mb-2">
                  <Calendar className="w-3 h-3" />
                  {m.year}
                </div>
                <h3 className="text-lg font-serif font-semibold text-brandBlue mb-2">
                  {language === 'bn' ? m.titleBn : m.title}
                </h3>
                <p className="text-sm text-[#8E9299] leading-relaxed">
                  {language === 'bn' ? m.descriptionBn : m.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};