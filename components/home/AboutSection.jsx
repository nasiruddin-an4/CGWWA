'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Play, X } from 'lucide-react';

export function AboutSection() {
  const { language, t } = useLanguage();
  const observe = useScrollReveal();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <section ref={observe} className="reveal-up space-y-12 lg:space-y-16">
        
        {/* Genesis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-brandYellow text-slate-900 font-bold text-xs tracking-widest uppercase shadow-sm">
            {t('Introduction', 'ভূমিকা')}
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-brandBlue leading-tight">
            {t('Bangladesh Coast Guard Family Welfare Association', 'বাংলাদেশ কোস্ট গার্ড পরিবার কল্যাণ সংঘ')}
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg text-justify">
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
        </div>
        
        <div 
          className="relative rounded-md overflow-hidden shadow-2xl aspect-square md:aspect-video lg:aspect-square group cursor-pointer" 
          onClick={() => setIsVideoOpen(true)}
        >
          <video 
            src="/aboutVideo.mp4" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            preload="metadata"
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brandBlue text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
            <p className="font-bold text-lg">{t('Watch Our Story', 'আমাদের গল্প দেখুন')}</p>
          </div>
        </div>
      </div>
      </section>
      
      {/* Video Modal - Using React Portal to attach directly to body, escaping ALL parent constraints */}
      {mounted && isVideoOpen && createPortal(
        <div 
          className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/70 text-white transition-all transform hover:scale-110 rounded-full p-2 cursor-pointer backdrop-blur-md"
              title="Close Video"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>
            <video 
              src="/aboutVideo.mp4" 
              controls 
              autoPlay 
              className="w-full h-full object-contain outline-none"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
