'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function AboutSection() {
  const { language, t } = useLanguage();
  const observe = useScrollReveal();

  return (
    <section ref={observe} className="reveal-up space-y-12 lg:space-y-16">
      
      {/* Genesis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-brandYellow text-slate-900 font-bold text-xs tracking-widest uppercase shadow-sm">
            {t('Genesis', 'সূচনা')}
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-brandBlue leading-tight">
            {t('Genesis of CGWWA', 'সিজিডব্লিউডব্লিউএ-এর সূচনা')}
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
            <p>
              {t(
                "CGWWA is an organization set up, run and managed by the volunteers from spouses of Bangladesh Coast Guard Personnel. The motto of CGWWA is 'Self Help' and every member voluntarily contributes her time, talent and skills towards improving the quality of life within the Coast Guard community.",
                "সিজিডব্লিউডব্লিউএ হলো বাংলাদেশ কোস্ট গার্ড সদস্যদের স্বামীদের/স্ত্রীদের সমন্বয়ে গঠিত, পরিচালিত এবং নিয়ন্ত্রিত একটি স্বেচ্ছাসেবী সংগঠন। সিজিডব্লিউডব্লিউএ-এর মূলমন্ত্র হলো 'আত্মনির্ভরশীলতা' এবং প্রতিটি সদস্য কোস্ট গার্ড পরিবারের জীবনযাত্রার মান উন্নয়নে স্বেচ্ছায় তাদের সময়, মেধা এবং দক্ষতা অবদান রাখেন।"
              )}
            </p>
            <p>
              {t(
                "The Coast Guard Wives Welfare Association has been active since the inception of the Bangladesh Coast Guard. However, it formally came into existence on 1998, when it was registered and adopted its own constitution. Since then, CGWWA has evolved as Coast Guard Welfare and Wellness Association, expanding into a multi-role organisation dedicated to the holistic development and well-being of its members, while rendering yeoman service to the Coast Guard community.",
                "বাংলাদেশ কোস্ট গার্ড প্রতিষ্ঠার শুরু থেকেই কোস্ট গার্ড ওয়াইভস ওয়েলফেয়ার অ্যাসোসিয়েশন সক্রিয় রয়েছে। তবে এটি আনুষ্ঠানিকভাবে ১৯৯৮ সালে নিবন্ধিত হয় এবং এর নিজস্ব গঠনতন্ত্র প্রণয়ন করে। এরপর থেকে, এটি কোস্ট গার্ড ওয়েলফেয়ার অ্যান্ড ওয়েলনেস অ্যাসোসিয়েশন হিসেবে বিকশিত হয়েছে, যা সদস্যদের সার্বিক উন্নয়ন ও কল্যাণের পাশাপাশি কোস্ট গার্ড পরিবারের জন্য বহুমুখী সেবামূলক কাজ করে যাচ্ছে।"
              )}
            </p>
            <p>
              {t(
                "The CGWWA has an emblem of its own which depicts the cohesiveness for working together to improve the quality of life in the Bangladesh Coast Guard.",
                "সিজিডব্লিউডব্লিউএ-এর নিজস্ব একটি প্রতীক রয়েছে যা বাংলাদেশ কোস্ট গার্ডে জীবনযাত্রার মান উন্নয়নে একসঙ্গে কাজ করার দৃঢ় প্রত্যয়কে তুলে ধরে।"
              )}
            </p>
          </div>
        </div>
        
        <div className="relative rounded-md overflow-hidden shadow-2xl aspect-square md:aspect-video lg:aspect-square group">
          <img 
            src="/images/about-placeholder.png" 
            alt="Genesis of CGWWA" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="font-bold text-lg">{t('Empowering the Community', 'সম্প্রদায়ের ক্ষমতায়ন')}</p>
          </div>
        </div>
      </div>
      
    </section>
  );
}
