'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { chairmanInfo } from '@/data/leadership';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ChairmanMessagePage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <PageHeader
        category="Chairman's Address"
        categoryBn="চেয়ারম্যানের বাণী"
        title="Chairman's Message to the Nation"
        titleBn="সংস্থার চেয়ারম্যানের বাৎসরিক বাণী"
        subtitle={chairmanInfo.messageTitle}
        subtitleBn={chairmanInfo.messageTitleBn} />
      

      <div className="bg-white rounded-md p-6 sm:p-10 border border-[#E5E7EB] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Portrait & Details */}
        <div className="lg:col-span-4 space-y-4">
          <div className="aspect-3/4 rounded-md overflow-hidden bg-slate-100 border border-[#E5E7EB] shadow-sm">
            <img
              src={chairmanInfo.photo}
              alt={chairmanInfo.name}
              className="w-full h-full object-cover" />
            
          </div>

          <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#E5E7EB] space-y-2">
            <h3 className="font-serif font-semibold text-brandBlue text-lg">
              {language === 'bn' ? chairmanInfo.nameBn : chairmanInfo.name}
            </h3>
            <p className="text-xs text-brandBlue font-bold">
              {language === 'bn' ? chairmanInfo.designationBn : chairmanInfo.designation}
            </p>
            <div className="pt-2 border-t border-[#E5E7EB] text-xs text-[#8E9299] space-y-1">
              {chairmanInfo.bio.map((b, i) =>
              <p key={i}>• {b}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Full Official Message */}
        <div className="lg:col-span-8 space-y-6">
          <blockquote className="p-5 rounded-md bg-brandYellow/10 border-l-4 border-brandYellow text-brandBlue font-serif font-medium text-sm sm:text-base leading-relaxed relative">
            <Quote className="w-8 h-8 text-brandBlue absolute right-4 bottom-4 opacity-30" />
            "{language === 'bn' ? chairmanInfo.quoteBn : chairmanInfo.quote}"
          </blockquote>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            {(language === 'bn' ? chairmanInfo.fullMessageBn : chairmanInfo.fullMessage)?.map((para, i) =>
            <p key={i}>{para}</p>
            )}
          </div>

          {/* Official Signature Seal Block */}
          <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-between">
            <div>
              <div className="font-serif font-bold text-brandBlue text-sm">
                {language === 'bn' ? chairmanInfo.nameBn : chairmanInfo.name}
              </div>
              <div className="text-xs text-[#8E9299]">
                Chairman, Board of Governors, CGWWA
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-brandBlue text-white font-serif text-[10px] font-bold uppercase tracking-widest">
              [Official Seal Attached]
            </div>
          </div>
        </div>
      </div>
    </div>);

};