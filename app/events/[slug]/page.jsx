"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import { useDbData } from "@/hooks/useDbData";
import * as Icons from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function EventDetailPage({ params }) {
  const { language, t } = useLanguage();
  const { slug } = use(params);
  const { data: dbEvents, loading } = useDbData('events', []);
  
  // Find the event by slug
  const event = dbEvents.find((e) => e.slug === slug);

  if (loading) {
    return <div className="flex justify-center p-20"><Icons.Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  }

  if (!event && !loading) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden bg-brandBlue max-w-7xl mx-auto rounded-md mt-8 lg:mt-12 shadow-xl border border-white/10">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brandBlue/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandYellow/10 backdrop-blur-md border border-brandYellow/20 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-brandYellow">
              {event.category}
            </span>
            <span className="text-white/50">•</span>
            <span className="text-xs font-medium text-white/80 flex items-center gap-1.5">
              <Icons.Clock className="w-3.5 h-3.5 text-brandYellow" />
              {event.status}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white mb-6 drop-shadow-md">
            {language === 'bn' ? event.titleBn : event.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm md:text-base text-slate-300 font-medium">
            <span className="flex items-center gap-2">
              <Icons.Calendar className="w-5 h-5 text-brandYellow" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Icons.MapPin className="w-5 h-5 text-brandYellow" />
              {language === 'bn' ? event.locationBn : event.location}
            </span>
          </div>
        </div>
      </section>

      {/* 2. EVENT DETAILS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-md p-8 md:p-12 shadow-2xl border border-slate-100 mt-8 relative z-20">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Left Col: Description */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-brandBlue mb-4 flex items-center gap-2">
                  <Icons.Info className="w-6 h-6 text-brandYellow" />
                  {t("Event Overview", "অনুষ্ঠানের বিবরণ")}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {language === 'bn' ? event.descriptionBn : event.description}
                </p>
              </div>

              {event.agenda && (
                <div>
                  <h3 className="text-xl font-serif font-bold text-brandBlue mb-6 flex items-center gap-2">
                    <Icons.List className="w-6 h-6 text-brandYellow" />
                    {t("Event Agenda", "অনুষ্ঠানের সময়সূচি")}
                  </h3>
                  <div className="space-y-4">
                    {event.agenda.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-md bg-slate-50 border border-slate-100 hover:border-brandYellow/30 transition-colors">
                        <div className="w-24 shrink-0 font-bold text-brandBlue text-sm flex flex-col justify-center border-r border-slate-200 pr-4">
                          {item.time}
                        </div>
                        <div className="text-slate-600 text-sm font-medium flex items-center">
                          {item.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Quick Info */}
            <div className="space-y-6 bg-slate-50 rounded-md p-6 border border-slate-100 h-fit">
              <h3 className="text-lg font-bold text-brandBlue border-b border-slate-200 pb-3">
                {t("Quick Information", "সংক্ষিপ্ত তথ্য")}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">{t("Time", "সময়")}</p>
                  <p className="font-semibold text-slate-700">{event.time}</p>
                </div>
                
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">{t("District", "জেলা")}</p>
                  <p className="font-semibold text-slate-700">{event.district}</p>
                </div>
                
                {event.chiefGuest && (
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">{t("Chief Guest", "প্রধান অতিথি")}</p>
                    <p className="font-semibold text-brandBlue text-sm">{event.chiefGuest}</p>
                  </div>
                )}
              </div>

              <div className="pt-6">
                <button className="w-full py-3 px-4 bg-brandBlue text-white font-bold rounded-md hover:bg-brandBlue/90 transition-colors shadow-md">
                  {t("Add to Calendar", "ক্যালেন্ডারে যোগ করুন")}
                </button>
              </div>
            </div>
            
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <Link href="/" className="inline-flex items-center gap-2 text-brandBlue font-bold hover:text-brandYellow transition-colors">
              <Icons.ArrowLeft className="w-5 h-5" />
              {t("Back to Home", "হোমপেজে ফিরে যান")}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
