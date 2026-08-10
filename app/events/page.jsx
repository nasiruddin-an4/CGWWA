'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { upcomingEvents } from '@/data/events';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';

export default function EventsPage() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const filteredEvents = upcomingEvents.filter((event) => {
    if (filter === 'upcoming') return event.status !== 'Completed';
    if (filter === 'completed') return event.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      <PageHeader
        title="Events & Field Schedules"
        titleBn="ইভেন্ট ও ফিল্ড সময়সূচি"
        subtitle="Schedules of relief distributions, mobile health fleets, and official assemblies."
        subtitleBn="ত্রাণ বিতরণ, মোবাইল মেডিকেল ক্যাম্প ও দাপ্তরিক সভার সময়সূচি।" />
      

      {/* Filter Tabs */}
      <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
          filter === 'all' ?
          'bg-brandBlue text-white shadow-xs' :
          'bg-[#F8F9FA] text-[#8E9299] hover:text-brandBlue'}`
          }>
          
          {t('All Events', 'সকল ইভেন্ট')}
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
          filter === 'upcoming' ?
          'bg-brandYellow text-white shadow-xs' :
          'bg-[#F8F9FA] text-[#8E9299] hover:text-brandBlue'}`
          }>
          
          {t('Upcoming Schedules', 'আসন্ন সময়সূচি')}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) =>
        <div
          key={event.id}
          className="bg-white rounded-md border border-[#E5E7EB] p-6 shadow-xs hover:border-brandYellow transition-all flex flex-col justify-between space-y-4">
          
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-brandYellow/10 text-brandBlue text-[10px] font-bold uppercase tracking-widest font-mono">
                  {event.date}
                </span>
                {event.status === 'Completed' ?
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {t('Completed', 'সম্পন্ন')}
                  </span> :

              <span className="px-2.5 py-0.5 rounded-full bg-brandRed/10 text-brandRed text-[10px] font-bold">
                    {t('Registration Open', 'নিবন্ধন চলছে')}
                  </span>
              }
              </div>

              <h3 className="font-serif font-semibold text-brandBlue text-lg leading-snug">
                {language === 'bn' ? event.titleBn : event.title}
              </h3>

              <p className="text-xs text-[#8E9299] leading-relaxed">
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

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-xs text-[#8E9299] flex items-center gap-1 font-mono">
                <Users className="w-3.5 h-3.5 text-brandBlue" />
                {event.district}
              </span>
              <button className="text-xs font-bold text-brandBlue hover:underline uppercase tracking-wide inline-flex items-center gap-1 cursor-pointer">
                {t('View Circular', 'বিস্তারিত দেখুন')}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);

};