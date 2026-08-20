'use client';

import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { activitiesData } from '@/data/activities';
import { useLanguage } from '@/context/LanguageContext';
import { PageHeader } from '@/components/PageHeader';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export default function ActivityCategoryPage({ params }) {
  const { slug } = use(params);
  const { language, t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const category = activitiesData.find(c => c.slug === slug);
  
  if (!category) {
    return notFound();
  }

  const Icon = Icons[category.icon];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-brandBlue max-w-7xl mx-auto rounded-md mt-12 shadow-2xl border border-brandBlue/20">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brandBlue/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            {Icon && <Icon className="w-5 h-5 text-brandYellow" />}
            <span className="text-sm font-bold tracking-widest uppercase text-brandYellow">
              {t("Core Initiative", "মূল উদ্যোগ")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
            {language === 'bn' ? category.titleBn : category.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl">
            {language === 'bn' ? category.shortDescBn : category.shortDesc}
          </p>
        </div>
      </section>

      {/* 2. SUB-ACTIVITIES CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {category.events && category.events.map((event, idx) => {
            const eventCoverImage = event.photos && event.photos.length > 0 ? event.photos[0] : category.image;
            return (
              <Link 
                key={idx} 
                href={`/activities/${slug}/${event.eventSlug}`}
                className="group flex flex-col bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Header */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img 
                    src={eventCoverImage} 
                    alt={language === 'bn' ? event.titleBn : event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-4 left-6 px-3 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg text-xs font-bold uppercase tracking-wider">
                    {t('Event', 'ইভেন্ট')}
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  <h3 className="font-serif font-bold text-brandBlue text-xl mb-3 group-hover:text-brandYellow transition-colors line-clamp-2">
                    {language === 'bn' ? event.titleBn : event.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3">
                    {language === 'bn' ? event.descBn : event.desc}
                  </p>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                    <span className="text-sm font-bold text-brandBlue uppercase tracking-wider group-hover:text-brandYellowDark transition-colors">
                      {t('View Gallery', 'গ্যালারি দেখুন')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brandYellow/20 transition-colors">
                      <Icons.ArrowRight className="w-4 h-4 text-brandBlue group-hover:text-brandYellowDark transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
