'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';

import { useLanguage } from '@/context/LanguageContext';
import { useDbData } from '@/hooks/useDbData';

export default function CentralCommitteePage() {
  const { language, t } = useLanguage();
  const { data: dbData } = useDbData('central_committee', []);

  // Extract tiers based on the serial order (skipping president at index 0)
  const executiveTier = dbData.slice(1, 3); // Vice President, General Secretary
  const memberTier = dbData.slice(3); // The rest

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
        category="Executive Committee"
        categoryBn="নির্বাহী কমিটি"
        title="Central Committee"
        titleBn="কেন্দ্রীয় কমিটি"
        subtitle="The dedicated central leadership steering the welfare and community initiatives."
        subtitleBn="কল্যাণমূলক ও সমাজসেবামূলক কার্যক্রম পরিচালনায় নিবেদিত কেন্দ্রীয় ব্যক্তিবর্গ।" />

      <section id="central" className="space-y-12 pt-4 px-4 sm:px-6">
        
        {/* Tier 2: Executives */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {executiveTier.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Tier 3: Members */}
        <div className="flex justify-center">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {memberTier.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}