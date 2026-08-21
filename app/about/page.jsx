'use client';

import React from 'react';
import { organizationInfo, coreValues } from '@/data/organization';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-10 max-w-7xl mx-auto">

      {/* Overview Section */}
      <div className="bg-white rounded-md p-6 sm:p-10 border border-[#E5E7EB] shadow-xs space-y-6">
        <SectionHeader
          badge="INTRODUCTION"
          badgeBn="ভূমিকা"
          title="Bangladesh Coast Guard Family Welfare Association"
          titleBn="বাংলাদেশ কোস্ট গার্ড পরিবার কল্যাণ সংঘ"
          className="mb-0 sm:mb-0"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
            <p>
              {t(
                'In the historical continuity of the evolution of human civilization, man has formed family, society, and state for his own needs. The goal of society is mutual assistance, development, and welfare. In the modern state system, it is not possible to meet the basic needs of an individual or society alone or to achieve mutual welfare, as a result of which welfare organizations in the name of various groups and professional classes have been formed. Bangladesh Coast Guard Family Welfare Association is such a welfare-oriented, non-profit, and voluntary organization. Every volunteer member of the organization is initiated and dedicated to this core mantra of "Service and Welfare".',
                'মানব সভ্যতার ক্রমবিকাশের ঐতিহাসিক ধারাবাহিকতায় মানুষ নিজের প্রয়োজনে গঠন করেছে পরিবার, সমাজ, এবং রাষ্ট্র। সমাজের লক্ষ্য পারস্পরিক সহায়তা, উন্নয়ন ও কল্যাণ সাধন। আধুনিক রাষ্ট্র ব্যবস্থায় এককভাবে ব্যক্তি বা সমাজের মৌলিক চাহিদা মেটানো কিংবা পরস্পরের কল্যাণ সাধন সম্ভব নয়, যার প্রেক্ষিতে গড়ে উঠেছে বিভিন্ন গোষ্ঠী ও শ্রেণি পেশার নামে কল্যাণধর্মী সংগঠন। বাংলাদেশ কোস্ট গার্ড পরিবার কল্যাণ সংঘ এমনই একটি কল্যাণধর্মী, অলাভজনক ও স্বেচ্ছাসেবী সংগঠন। “সেবা ও কল্যাণ” এই মূল মন্ত্রে দীক্ষিত ও নিবেদিত সংগঠনের প্রতিটি স্বেচ্ছাসেবী সদস্য।'
              )}
            </p>
            <p>
              {t(
                'The Family Welfare Association is basically an organization managed under the direct supervision of the families of Coast Guard members. To ensure the proper upbringing of the future generations of Coast Guard members with human values from childhood in a favorable environment, to assist the families of Coast Guard members as well as all female members to get involved in the workplace including vocational education, above all, this association is dedicated to the overall development and welfare by creating a mutual bridge among the Coast Guard families.',
                'পরিবার কল্যাণ সংঘ মূলত কোস্ট গার্ড সদস্যের পরিবারবর্গের প্রত্যক্ষ তত্ত্বাবধানে পরিচালিত একটি সংস্থা। কোস্ট গার্ড সদস্যদের ভবিষ্যৎ প্রজন্মের জন্য শিশু বয়স থেকে যথার্থ অনুকূল পরিবেশে মানবিক মূল্যবোধসহ গড়ে ওঠা নিশ্চিত করা, কোস্ট গার্ড সদস্যদের পরিবার তথা সকল মহিলা সদস্যদের বৃত্তিমূলক শিক্ষাসহ কর্মক্ষেত্রে সম্পৃক্ততার ব্যাপারে সহায়তা করা, সর্বোপরি কোস্ট গার্ড পরিবারের মধ্যে পারস্পরিক সেতুবন্ধন সৃষ্টিতে সামগ্রিক উন্নয়ন ও কল্যাণে এ সংঘ নিবেদিত প্রাণ।'
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
                <span className="font-bold text-white">Social Welfare Advisory Board</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8E9299] shrink-0 mr-4">{t('Headquarters:', 'হেডকোয়ার্টার্স:')}</span>
                <span className="font-bold text-white text-right max-w-[200px] leading-tight">
                  {t(organizationInfo.headquarters.address, organizationInfo.headquarters.addressBn)}, {organizationInfo.headquarters.city}-{organizationInfo.headquarters.postalCode}
                </span>
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