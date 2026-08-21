'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { presidentInfo } from '@/data/leadership';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, Mail, ArrowRight } from 'lucide-react';

export default function PresidentCommitteePage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-16">
      <PageHeader
        title="President Committee"
        titleBn="প্রেসিডেন্ট কমিটি"
        subtitle="The dedicated central leadership steering the welfare and community initiatives."
        subtitleBn="কল্যাণমূলক ও সমাজসেবামূলক কার্যক্রম পরিচালনায় নিবেদিত কেন্দ্রীয় ব্যক্তিবর্গ।" />

      <section id="central" className="space-y-12 pt-4 px-4 sm:px-6">
        
        {/* Tier 1: President Detailed Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
            
            {/* President Image */}
            <div className="w-full md:w-72 lg:w-80 shrink-0 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <img 
                src={presidentInfo.photo} 
                alt={presidentInfo.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* President Content */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A233A]">
                  {language === 'bn' ? presidentInfo.nameBn : presidentInfo.name}
                </h2>
                <p className="text-xl font-semibold text-brandBlue">
                  {language === 'bn' ? presidentInfo.designationBn : presidentInfo.designation}
                </p>
              </div>

              <div className="text-[#64748B] leading-relaxed text-[15px]">
                <p className="line-clamp-4">
                  {language === 'bn' ? presidentInfo.bioBn[0] : presidentInfo.bio[0]}
                  {' '}
                  {language === 'bn' ? presidentInfo.bioBn[1] : presidentInfo.bio[1]}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center sm:justify-start border-t border-slate-100">
                <Link 
                  href="/leadership/president-message"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#002B5B] text-white font-medium hover:bg-brandBlue/90 transition-colors shadow-md"
                >
                  {t('View Message', 'বাণী দেখুন')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}