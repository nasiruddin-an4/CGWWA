'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

import { useLanguage } from '@/context/LanguageContext';
import { useDbData } from '@/hooks/useDbData';
import * as Icons from 'lucide-react';

export default function ActivitiesPage() {
  const { language, t } = useLanguage();
  const { data: dbActivities } = useDbData('activities', []);

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <PageHeader
        category="Our Core Initiatives"
        categoryBn="আমাদের মূল উদ্যোগসমূহ"
        title="Impactful Activities"
        titleBn="প্রভাবশালী কার্যক্রমসমূহ"
        subtitle="Discover how we are building a more resilient, educated, and prosperous coastal Bangladesh."
        subtitleBn="জানুন কিভাবে আমরা একটি সহনশীল, শিক্ষিত এবং সমৃদ্ধ উপকূলীয় বাংলাদেশ গড়ছি।"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dbActivities.map((activity) => {
          const Icon = Icons[activity.icon];
          return (
            <Link 
              key={activity.id} 
              href={`/activities/${activity.slug}`}
              className="group flex flex-col bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Floating Icon */}
                <div className="absolute bottom-4 left-6 w-12 h-12 rounded-md bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
              </div>

              {/* Content Body */}
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <h3 className="font-serif font-bold text-brandBlue text-2xl mb-3 group-hover:text-brandYellow transition-colors">
                  {language === 'bn' ? activity.titleBn : activity.title}
                </h3>
                <p className="text-slate-600 text-sm md:text-base mb-6 flex-1 line-clamp-3">
                  {language === 'bn' ? activity.shortDescBn : activity.shortDesc}
                </p>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                  <span className="text-sm font-bold text-brandBlue uppercase tracking-wider group-hover:text-brandYellowDark transition-colors">
                    {t('Learn More', 'আরও জানুন')}
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
    </div>
  );
}