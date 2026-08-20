'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, PhoneCall, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function EmergencySupportSection() {
  const { language, t } = useLanguage();
  const observe = useScrollReveal();

  return (
    <section
      ref={observe}
      className="reveal-up cta-banner relative text-white rounded-md p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 group/cta border border-white/10">
      
      {/* Cinematic Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/armmzmyq/image/upload/v1787248722/cgfwa/cta-bg_wrafk7.jpg" 
          alt="Coast Guard Support" 
          className="w-full h-full object-cover group-hover/cta:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-brandBlue/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-brandBlue/95 via-brandBlue/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="space-y-5 max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{t('EMERGENCY SUPPORT & APPLICATION PORTAL', 'জরুরি সহায়তা ও আবেদন পোর্টাল')}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight">
          {t('Need Emergency Support or Application Forms?', 'জরুরি সামাজিক সহায়তা বা আবেদন ফরম সংক্রান্ত তথ্য?')}
        </h2>

        <p className="text-slate-300/80 text-xs sm:text-sm leading-relaxed">
          {t(
            'Access official downloadable forms for educational stipends, marine disaster compensation, medical grants, and relief applications directly from our central service hub.',
            'শিক্ষাবৃত্তি, সামুদ্রিক দুর্ঘটনা ক্ষতিপূরণ, চিকিৎসা অনুদান ও ত্রাণ সহায়তার জন্য অফিসিয়াল আবেদন ফরম সংগ্রহ করুন অথবা সেন্ট্রাল সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করুন।'
          )}
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-semibold text-emerald-200">
          {[
          { label: t('Educational Stipends', 'শিক্ষাবৃত্তি') },
          { label: t('Disaster Relief', 'দুর্যোগ ত্রাণ') },
          { label: t('Medical Grants', 'চিকিৎসা অনুদান') }].
          map((badge, i) =>
          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {badge.label}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full lg:w-auto relative z-10">
        <Link
          href="/downloads"
          className="cta-btn inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-md bg-brandYellow hover:bg-yellow-400 text-slate-900 font-extrabold text-[13px] tracking-wider uppercase transition-all duration-300 shadow-xl shadow-brandYellow/20 border border-brandYellow group/dl hover:shadow-2xl hover:-translate-y-1">
          
          <FileText className="w-5 h-5 group-hover/dl:scale-110 transition-transform duration-300" />
          <span>{t('Download Forms', 'আবেদন ফরমসমূহ')}</span>
          <ArrowRight className="w-5 h-5 group-hover/dl:translate-x-1 transition-transform duration-300" />
        </Link>

        <Link
          href="/contact"
          className="cta-btn inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-md bg-white/8 hover:bg-white/14 text-white border border-white/15 font-extrabold text-xs tracking-wider uppercase transition-all duration-300 backdrop-blur-md group/ct hover:border-white/25">
          
          <PhoneCall className="w-4 h-4 text-emerald-300 group-hover/ct:scale-110 transition-transform duration-300" />
          <span>{t('Contact HQ', 'হেডকোয়ার্টার্স যোগাযোগ')}</span>
        </Link>
      </div>
    </section>
  );
}
