'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useDbData } from '@/hooks/useDbData';

export function EventsSection() {
  const { language, t } = useLanguage();
  const observe = useScrollReveal();
  const { data: eventsData } = useDbData('events', []);

  // Sort events: Upcoming first (closest date), then Past events (most recent first)
  const sortedEvents = React.useMemo(() => {
    const now = new Date();
    // Reset time to start of day for accurate comparison
    now.setHours(0, 0, 0, 0);

    return [...eventsData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      const aIsFuture = dateA >= now;
      const bIsFuture = dateB >= now;
      
      if (aIsFuture && !bIsFuture) return -1;
      if (!aIsFuture && bIsFuture) return 1;
      
      if (aIsFuture && bIsFuture) {
        return dateA.getTime() - dateB.getTime();
      }
      
      return dateB.getTime() - dateA.getTime();
    });
  }, [eventsData]);

  return (
    <section className="space-y-6">
      <div
        ref={observe}
        className="reveal-up flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200/80 pb-5 mb-8">
        
        <div className="flex-1">
          <SectionHeader
            title="Notices & Updates"
            titleBn="নোটিশ ও আপডেটসমূহ"
            className="!mb-0 [&>h2]:!mb-0"
          />
        </div>

        <div className="shrink-0">
          <Button href="/events" variant="secondary" size="md">
            {t('View All Notices', 'সকল নোটিশ দেখুন')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.slice(0, 3).map((evt, idx) => {
          const isUpcoming = new Date(evt.date).getTime() >= new Date().setHours(0, 0, 0, 0);

          return (
            <Link
              href={`/events/${evt.slug}`}
              key={evt.id}
              ref={observe}
              data-reveal-delay={idx * 120}
              className="reveal-up group/evt rounded-md bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden">
              
              {/* Image Header */}
              <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
                <Image 
                  src={evt.image} 
                  alt={evt.title} 
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover/evt:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-brandBlue text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {evt.category}
                </span>

                {/* Upcoming Badge */}
                {isUpcoming && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-brandRed text-white text-[10px] font-bold uppercase tracking-widest shadow-sm animate-pulse">
                    {t('Upcoming', 'আসন্ন')}
                  </span>
                )}

                {/* Floating Date Badge */}
                <div className="absolute bottom-4 right-4 bg-brandYellow text-slate-900 rounded-md px-4 py-2 text-center shadow-lg transform group-hover/evt:-translate-y-1 transition-transform duration-300 z-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 border-b border-slate-900/10 pb-1 mb-1">
                    {evt.date.split(' ')[0].substring(0, 3)}
                  </div>
                  <div className="text-2xl font-black leading-none">
                    {evt.date.split(' ')[1].replace(',', '')}
                  </div>
                </div>
              </div>

          {/* Body */}
          <div className="p-6 pt-8 flex-1 flex flex-col justify-between space-y-5">
            <div>
              <h3 className="font-semibold text-brandBlue text-lg group-hover/evt:text-brandBlue/80 transition-colors duration-300 leading-snug line-clamp-2 pr-12">
                {language === 'bn' ? evt.titleBn : evt.title}
              </h3>
            </div>

            <div className="space-y-3 pt-5 border-t border-slate-100">
              <div className="flex items-start gap-3 text-sm text-slate-500 font-medium">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{evt.time}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-500 font-medium">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2 leading-relaxed">{evt.location}</span>
              </div>
            </div>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
