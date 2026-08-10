'use client';

import React from 'react';
import { Users, GraduationCap, HeartHandshake, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function StatisticsSection() {
  const { language } = useLanguage();
  const observe = useScrollReveal();

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {[
      {
        icon: Users,
        value: '450,000+',
        labelEn: 'Beneficiaries Served',
        labelBn: 'মোট সুবিধাভোগী',
        accent: '#006A4E',
        glow: 'group-hover:shadow-[0_10px_40px_-10px_rgba(0,106,78,0.3)]'
      },
      {
        icon: GraduationCap,
        value: '42,000+',
        labelEn: 'Educational Scholarships',
        labelBn: 'প্রদত্ত শিক্ষাবৃত্তি',
        accent: '#006A4E',
        glow: 'group-hover:shadow-[0_10px_40px_-10px_rgba(0,106,78,0.3)]'
      },
      {
        icon: HeartHandshake,
        value: '12,500+',
        labelEn: 'Volunteers Active',
        labelBn: 'সক্রিয় স্বেচ্ছাসেবক',
        accent: '#006A4E',
        glow: 'group-hover:shadow-[0_10px_40px_-10px_rgba(0,106,78,0.3)]'
      },
      {
        icon: MapPin,
        value: '64',
        labelEn: 'Districts Reached',
        labelBn: 'সমগ্র দেশব্যাপী বিস্তৃত',
        accent: '#E11D48',
        glow: 'group-hover:shadow-[0_10px_40px_-10px_rgba(225,29,72,0.3)]'
      }].
      map((stat, idx) =>
      <div
        key={idx}
        ref={observe}
        data-reveal-delay={idx * 120}
        className={`reveal-up stat-card bg-white p-6 sm:p-8 rounded-md border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col items-center text-center space-y-4 group cursor-default relative overflow-hidden ${stat.glow}`}>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent opacity-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

          <div
          className="stat-icon relative z-10 w-16 h-16 rounded-md flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
          style={{
            backgroundColor: `${stat.accent}12`,
            color: stat.accent
          }}>
            <stat.icon className="w-7 h-7" />
          </div>
          <div className="relative z-10 space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-brandBlue tracking-tight font-heading">{stat.value}</div>
            <div className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-widest">{language === 'bn' ? stat.labelBn : stat.labelEn}</div>
          </div>
        </div>
      )}
    </section>
  );
}
