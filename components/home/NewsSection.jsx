'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useDbData } from '@/hooks/useDbData';

export function NewsSection() {
  const { language, t } = useLanguage();
  const observe = useScrollReveal();
  const { data: newsData } = useDbData('news', []);

  return (
    <section className="space-y-8">
      <div
        ref={observe}
        className="reveal-up flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        
        <div>
          <SectionHeader
            badge="OFFICIAL BULLETIN"
            badgeBn="অফিসিয়াল প্রেস রিলিজ"
            title="Latest Press Releases & Circulars"
            titleBn="সাম্প্রতিক সংবাদ ও সার্কুলার"
            className="mb-0 sm:mb-0"
          />
        </div>

        <Button href="/news" variant="secondary" size="md">
          {t('Browse Full Press Room', 'সকল সংবাদ পড়ুন')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
        {newsData.slice(0, 3).map((art, idx) =>
        <Link
          href={`/news/${art.slug}`}
          key={art.id}
          ref={observe}
          data-reveal-delay={idx * 130}
          className="reveal-up news-card block bg-white rounded-md border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 overflow-hidden group/news">
          
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img
              src={art.featuredImage}
              alt={art.title}
              className="w-full h-full object-cover group-hover/news:scale-108 transition-transform duration-700" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brandBlue/90 backdrop-blur-sm text-rose-300 text-[10px] font-bold uppercase border border-white/10">
                {art.category}
              </span>
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{art.publishedAt}</span>
                </div>
                <h3 className="font-semibold text-brandBlue text-base group-hover/news:text-brandBlue transition-colors duration-300 leading-snug line-clamp-2">
                  {language === 'bn' ? art.titleBn : art.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {language === 'bn' ? art.excerptBn : art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">{art.author}</span>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-brandBlue group-hover/news:underline">
                
                  <span>{t('Read Story', 'বিস্তারিত')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
