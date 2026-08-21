'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';

import { useLanguage } from '@/context/LanguageContext';
import { useDbData } from '@/hooks/useDbData';

export default function CgfwaZonesPage() {
  const { language, t } = useLanguage();
  const { data: dbDhaka } = useDbData('dhaka_committee', []);
  const { data: dbLcDhaka } = useDbData('lc_dhaka_committee', []);

  const MemberCard = ({ member }) => (
    <div className="flex flex-col items-center group transition-all duration-300 w-full max-w-[280px] mx-auto">
      
      {/* Large Vertical Image */}
      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 mb-5 shadow-sm group-hover:shadow-lg transition-all duration-300 border border-[#E5E7EB]">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50">
            <span className="text-slate-300 text-sm font-medium">No Photo</span>
          </div>
        )}
      </div>
      
      {/* Centered Text */}
      <div className="text-center space-y-1.5 w-full px-2">
        <h3 className="font-serif font-bold text-[#1A233A] text-xl leading-tight">
          {language === 'bn' ? member.nameBn : member.name}
        </h3>
        <p className="font-medium text-[#64748B] text-sm">
          {language === 'bn' ? member.designationBn : member.designation}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-16 max-w-7xl mx-auto pb-16">
      <PageHeader
        category="Regional Committees"
        categoryBn="আঞ্চলিক কমিটি"
        title="CGFWA Zones"
        titleBn="সিজিএফডব্লিউএ জোনসমূহ"
        subtitle="The dedicated executive members of Dhaka Zone and Ladies Club steering local community initiatives."
        subtitleBn="ঢাকা জোন ও লেডিস ক্লাবের স্থানীয় সমাজসেবামূলক কার্যক্রম পরিচালনায় নিবেদিত কার্যনির্বাহী সদস্যবৃন্দ।" />

      {/* Dhaka Committee */}
      <section className="space-y-8 pt-4 px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-serif font-bold text-brandBlue">
            {t('CGFWA Dhaka Committee', 'সিজিএফডব্লিউএ ঢাকা কমিটি')}
          </h2>
          <div className="w-24 h-1 bg-brandYellow mx-auto rounded-full"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl">
            {dbDhaka.map((member) => (
              <div key={member.id} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-[280px]">
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Break / Divider */}
      <div className="px-6">
        <hr className="border-slate-200" />
      </div>

      {/* LC Dhaka Committee */}
      <section className="space-y-8 px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-serif font-bold text-brandBlue">
            {t('BCG Ladies Club Dhaka', 'বিসিজি লেডিস ক্লাব ঢাকা')}
          </h2>
          <div className="w-24 h-1 bg-brandYellow mx-auto rounded-full"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl">
            {dbLcDhaka.map((member) => (
              <div key={member.id} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-[280px]">
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
