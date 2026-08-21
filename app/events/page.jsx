'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';

import { useLanguage } from '@/context/LanguageContext';
import { useDbData } from '@/hooks/useDbData';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';

import Link from 'next/link';

export default function EventsPage() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const { data: eventSource } = useDbData('events', []);

  const filteredEvents = eventSource
    .filter((event) => {
      const isUpcoming = new Date(event.date).getTime() >= new Date().setHours(0, 0, 0, 0);
      if (filter === 'upcoming') return isUpcoming;
      if (filter === 'completed') return !isUpcoming;
      return true;
    })
    .sort((a, b) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      const aIsFuture = dateA >= now;
      const bIsFuture = dateB >= now;
      
      if (aIsFuture && !bIsFuture) return -1;
      if (!aIsFuture && bIsFuture) return 1;
      if (aIsFuture && bIsFuture) return dateA.getTime() - dateB.getTime();
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      <PageHeader
        title="Notices & Events"
        titleBn="নোটিশ ও ইভেন্টসমূহ"
        subtitle="Schedules of upcoming workshops, conventions, and general notices."
        subtitleBn="আসন্ন কর্মশালা, সমাবেশ এবং সাধারণ নোটিশের সময়সূচি।" />
      

      {/* Filter Tabs */}
      <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-3 px-4 sm:px-0">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
          filter === 'all' ?
          'bg-brandBlue text-white shadow-xs' :
          'bg-[#F8F9FA] text-[#8E9299] hover:text-brandBlue'}`
          }>
          
          {t('All Notices', 'সকল নোটিশ')}
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
          filter === 'upcoming' ?
          'bg-brandYellow text-white shadow-xs' :
          'bg-[#F8F9FA] text-[#8E9299] hover:text-brandBlue'}`
          }>
          
          {t('Upcoming', 'আসন্ন')}
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
          filter === 'completed' ?
          'bg-slate-700 text-white shadow-xs' :
          'bg-[#F8F9FA] text-[#8E9299] hover:text-brandBlue'}`
          }>
          
          {t('Past Archives', 'সম্পন্ন ইভেন্ট')}
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-0">
        {filteredEvents.map((event) => {
          const isUpcoming = new Date(event.date).getTime() >= new Date().setHours(0, 0, 0, 0);

          return (
            <Link
              href={`/events/${event.slug}`}
              key={event.id}
              className="bg-white rounded-md border border-[#E5E7EB] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
            
              {/* Image Header */}
              <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-brandBlue text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {event.category}
                </span>

                {/* Status Badge */}
                {isUpcoming ? (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-brandRed text-white text-[10px] font-bold uppercase tracking-widest shadow-sm animate-pulse">
                    {t('Upcoming', 'আসন্ন')}
                  </span>
                ) : (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-600 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {t('Completed', 'সম্পন্ন')}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-brandYellow/10 text-brandBlue text-[10px] font-bold uppercase tracking-widest font-mono">
                      {event.date}
                    </span>
                  </div>

                  <h3 className="font-serif font-semibold text-brandBlue text-lg leading-snug group-hover:text-brandBlue/80 transition-colors">
                    {language === 'bn' ? event.titleBn : event.title}
                  </h3>

                  <p className="text-xs text-[#8E9299] leading-relaxed line-clamp-3">
                    {language === 'bn' ? event.descriptionBn : event.description}
                  </p>

                  <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-[#8E9299] border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brandBlue shrink-0" />
                      <span className="truncate">{language === 'bn' ? event.locationBn : event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brandBlue shrink-0" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs text-[#8E9299] flex items-center gap-1 font-mono">
                    <Users className="w-3.5 h-3.5 text-brandBlue" />
                    {event.district}
                  </span>
                  <span className="text-xs font-bold text-brandBlue group-hover:underline uppercase tracking-wide inline-flex items-center gap-1">
                    {t('View Details', 'বিস্তারিত দেখুন')}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}