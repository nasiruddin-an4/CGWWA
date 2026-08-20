'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { zoneChairmen } from '@/data/leadership';
import { useLanguage } from '@/context/LanguageContext';

export default function ChairmanCommitteePage() {
  const { language, t } = useLanguage();

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
    <div className="space-y-12 max-w-7xl mx-auto pb-16">
      <PageHeader
        category="Regional Leadership"
        categoryBn="আঞ্চলিক নেতৃত্ব"
        title="Chairman Committee"
        titleBn="চেয়ারম্যান কমিটি"
        subtitle="Leadership across all coastal zones steering our regional welfare initiatives."
        subtitleBn="সকল উপকূলীয় জোনে আমাদের আঞ্চলিক কল্যাণমূলক কার্যক্রম পরিচালনায় নিয়োজিত নেতৃত্ব।" />

      <section className="space-y-6 pt-4 px-4 sm:px-6">
        <div className="flex justify-center">
          <div className="w-full flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl">
            {zoneChairmen.map((member) => (
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
