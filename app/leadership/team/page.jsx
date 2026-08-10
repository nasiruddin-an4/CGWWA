'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { leadershipTeam } from '@/data/leadership';

import { useLanguage } from '@/context/LanguageContext';

export default function LeadershipTeamPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <PageHeader
        category="Executive Committee"
        categoryBn="নির্বাহী পর্ষদ"
        title="Executive Leadership Team"
        titleBn="সংস্থার পরিচালনা পর্ষদ ও বিভাগীয় প্রধানগণ"
        subtitle="Directors overseeing Administration, Finance, Field Operations, Medical Fleets, and Education."
        subtitleBn="প্রশাসন, অর্থ, চিকিৎসা সেবা, শিক্ষা ও উদ্ধার কার্যক্রম প্রধানগণ।" />
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leadershipTeam.map((member) =>
        <div key={member.id} className="bg-white rounded-md border border-[#E5E7EB] p-5 shadow-xs flex gap-4 items-center">
            <div className="w-24 h-28 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-[#E5E7EB]">
              <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover" />
            
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-semibold text-brandBlue text-base">
                {language === 'bn' ? member.nameBn : member.name}
              </h3>
              <p className="text-xs font-bold text-brandBlue">
                {language === 'bn' ? member.designationBn : member.designation}
              </p>
              <p className="text-xs text-[#8E9299] line-clamp-2 pt-1">
                {language === 'bn' ? member.bioBn?.[0] : member.bio[0]}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>);

};