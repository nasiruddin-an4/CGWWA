'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { organizationInfo, coreValues } from '@/data/organization';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <PageHeader
        category="Institutional Profile"
        categoryBn="প্রাতিষ্ঠানিক প্রোফাইল"
        title="About Bangladesh Coastal & Community Welfare Association"
        titleBn="বাংলাদেশ উপকূল ও সমাজ কল্যাণ সংস্থা (বিসিসিডব্লিউএ)"
        subtitle="Genesis, Governance, Statutory Mandate, and Operational Footprint across 64 Districts."
        subtitleBn="সংস্থার উৎপত্তি, শাসনব্যবস্থা, আইনি গঠনতন্ত্র ও ৬৪ জেলায় কল্যাণমূলক প্রসার।" />
      

      {/* Overview Section */}
      <div className="bg-white rounded-md p-6 sm:p-10 border border-[#E5E7EB] shadow-xs space-y-6">
        <SectionHeader
          badge="GENESIS & MANDATE"
          badgeBn="উৎপত্তি ও মূল্যবোধ"
          title="Genesis of CGWWA"
          titleBn="সিজিডব্লিউডব্লিউএ-এর ইতিহাস ও পটভূমি"
          className="mb-0 sm:mb-0"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              {t(
                'The Coast Guard Welfare and Wellness Association (CGWWA) was instituted in 1998 by a dedicated cadre of maritime officers, social workers, and community elders in Chittagong and Khulna to address severe hardship suffered by coastal families following devastating marine cyclones.',
                '১৯৯৮ সালে উপকূলীয় ঘূর্ণিঝড় ও প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্ত পরিবারগুলোর পাশে দাঁড়াতে চট্টগ্রাম ও খুলনায় নৌকল্যাণ উদ্যোগ হিসেবে সিজিডব্লিউডব্লিউএ প্রতিষ্ঠিত হয়।'
              )}
            </p>
            <p>
              {t(
                'Registered under national welfare directives (Registration No: CGWWA/GOV-REG/1998-042), the organization has grown into a premier statutory institution operating under the advisory guidance of the Ministry of Social Welfare and Bangladesh Coast Guard.',
                'পরবর্তী সময়ে সমাজকল্যাণ মন্ত্রণালয় ও বাংলাদেশ কোস্ট গার্ডের তত্ত্বাবধানে এটি একটি পূর্ণাঙ্গ জাতীয় প্রতিষ্ঠানে রূপ নেয়।'
              )}
            </p>
            <p>
              {t(
                'CGWWA’s emblem symbolizes the unity of coastal women, fishermen guilds, and relief volunteers working together to enhance the quality of life, education, and disaster resilience across Bangladesh’s 710-kilometer coastal belt.',
                'সংস্থার প্রতীকটিতে উপকূলের নারী, জেলে সম্প্রদায় ও স্বেচ্ছাসেবকদের ঐক্যবদ্ধ প্রচেষ্টার রূপ প্রতিফলিত হয়েছে।'
              )}
            </p>
          </div>

          <div className="lg:col-span-5 bg-brandBlue text-white p-6 sm:p-8 rounded-md border border-white/10 shadow-lg space-y-4">
            <h3 className="font-serif text-lg text-white border-b border-white/10 pb-2">
              {t('Statutory Registration Details', 'আইনি নিবন্ধন বিবরণ')}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8E9299]">{t('Registration No:', 'নিবন্ধন নম্বর:')}</span>
                <span className="font-bold text-white font-mono">{organizationInfo.registrationNo}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8E9299]">{t('Establishment Year:', 'প্রতিষ্ঠা সাল:')}</span>
                <span className="font-bold text-white">{organizationInfo.establishmentYear}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8E9299]">{t('Advisory Body:', 'উপদেষ্টা পর্ষদ:')}</span>
                <span className="font-bold text-brandBlue brightness-150">Social Welfare Advisory Board</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8E9299]">{t('Headquarters:', 'হেডকোয়ার্টার্স:')}</span>
                <span className="font-bold text-white">Agargaon, Dhaka</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Feature Grid */}
      <div className="space-y-6">
        <SectionHeader
          title="Core Institutional Values"
          titleBn="আমাদের মূল নীতিসমূহ"
          className="mb-0 sm:mb-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val) =>
          <Card key={val.title}>
            <CardHeader className="space-y-3 pb-2">
              <div className="w-10 h-10 rounded-full bg-brandYellow/10 text-brandBlue flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <CardTitle>
                {language === 'bn' ? val.titleBn : val.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#8E9299] leading-relaxed">
                {language === 'bn' ? val.descBn : val.desc}
              </p>
            </CardContent>
          </Card>
          )}
        </div>
      </div>

      {/* 64 Districts Coverage Overview */}
      <div className="bg-brandBlue text-white rounded-md p-8 border border-white/10 shadow-lg space-y-6">
        <SectionHeader
          badge="NATIONWIDE PRESENCE"
          badgeBn="সারাদেশে কার্যক্রম"
          title="64 Districts Operational Coverage Grid"
          titleBn="৬৪ জেলায় বিস্তৃত সেবা নেটওয়ার্ক"
          subtitle="Operating through regional field hubs in Patuakhali, Barguna, Bhola, Satkhira, Chittagong, Khulna, Noakhali, and Cox’s Bazar."
          subtitleBn="পটুয়াখালী, বরগুনা, ভোলা, সাতক্ষীরা, চট্টগ্রাম, খুলনা, নোয়াখালী ও কক্সবাজারে আঞ্চলিক কেন্দ্র পরিচালনা।"
          lightText={true}
          className="mb-0 sm:mb-0"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-center text-xs">
          {['Patuakhali', 'Barguna', 'Bhola', 'Satkhira', 'Chittagong', 'Cox’s Bazar', 'Khulna', 'Bagerhat', 'Noakhali', 'Lakshmipur', 'Pirojpur', 'Dhaka HQ'].map((dist) =>
          <div key={dist} className="p-3 rounded-md bg-white/5 border border-white/10 text-white font-medium">
              📍 {dist}
            </div>
          )}
        </div>
      </div>
    </div>);

};