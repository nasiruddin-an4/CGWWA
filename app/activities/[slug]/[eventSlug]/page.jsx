'use client';

import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { activitiesData } from '@/data/activities';
import { useLanguage } from '@/context/LanguageContext';
import * as Icons from 'lucide-react';
import { X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export default function EventDetailsPage({ params }) {
  const { slug, eventSlug } = use(params);
  const { language, t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  const category = activitiesData.find(c => c.slug === slug);
  const event = category?.events.find(e => e.eventSlug === eventSlug);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxImage || !event?.photos) return;
      const currentIndex = event.photos.indexOf(lightboxImage);
      
      if (e.key === 'ArrowRight' && currentIndex < event.photos.length - 1) {
        setLightboxImage(event.photos[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setLightboxImage(event.photos[currentIndex - 1]);
      } else if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, event]);
  
  if (!category || !event) return notFound();

  const Icon = Icons[category.icon];

  return (
    <div className="space-y-10 pb-20">
      
      {/* 1. HEADER SECTION */}
      <section className="bg-slate-50 border-b border-slate-200 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <Link href={`/activities/${slug}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-brandBlue transition-colors font-semibold text-sm uppercase tracking-wider mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t("Back to", "ফিরে যান")} {language === 'bn' ? category.titleBn : category.title}
          </Link>

          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandYellow/20 border border-brandYellow/30 mb-2">
                {Icon && <Icon className="w-4 h-4 text-brandYellowDark" />}
                <span className="text-xs font-bold tracking-widest uppercase text-brandYellowDark">
                  {t('Event Gallery', 'ইভেন্ট গ্যালারি')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brandBlue leading-tight">
                {language === 'bn' ? event.titleBn : event.title}
              </h1>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. DESCRIPTION & GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 mt-8">
        
        {/* Description */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-4">{t("About this event", "এই ইভেন্ট সম্পর্কে")}</h3>
          <p className="text-slate-600 text-lg leading-relaxed max-w-4xl">
            {language === 'bn' ? event.descBn : event.desc}
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
            <Icons.Image className="w-6 h-6 text-brandYellowDark" />
            <h2 className="text-2xl font-serif font-bold text-brandBlue">
              {t("Photo Gallery", "ছবির গ্যালারি")}
            </h2>
            <span className="bg-slate-100 text-slate-600 text-sm font-bold px-3 py-1 rounded-full ml-auto">
              {event.photos.length} {t("Photos", "ছবি")}
            </span>
          </div>

          {event.photos && event.photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.photos.map((photo, photoIdx) => (
                <div 
                  key={photoIdx} 
                  className={`relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 group/photo ${photoIdx === 0 && event.photos.length % 2 !== 0 ? 'col-span-2 row-span-2' : 'aspect-square'}`}
                  onClick={() => setLightboxImage(photo)}
                >
                  <img 
                    src={photo} 
                    alt={language === 'bn' ? event.titleBn : event.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brandBlue/0 group-hover/photo:bg-brandBlue/30 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity transform scale-50 group-hover/photo:scale-100 duration-300">
                      <Icons.Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
              <Icons.ImageOff className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">{t("No photos available for this event.", "এই ইভেন্টের জন্য কোনো ছবি নেই।")}</p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {mounted && lightboxImage && createPortal(
        <div 
          className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center group/modal">
            
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
              className="absolute top-0 right-0 z-50 bg-white/10 hover:bg-brandRed text-white transition-all rounded-full p-2.5 cursor-pointer backdrop-blur-md m-4"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            {event.photos.indexOf(lightboxImage) > 0 && (
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setLightboxImage(event.photos[event.photos.indexOf(lightboxImage) - 1]); 
                }}
                className="absolute left-4 z-50 p-4 rounded-full bg-black/50 hover:bg-brandYellow text-white hover:text-black transition-all backdrop-blur-md opacity-100 sm:opacity-0 sm:group-hover/modal:opacity-100"
                title="Previous Image (Left Arrow)"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            <img 
              src={lightboxImage} 
              alt="Expanded view" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next Button */}
            {event.photos.indexOf(lightboxImage) < event.photos.length - 1 && (
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setLightboxImage(event.photos[event.photos.indexOf(lightboxImage) + 1]); 
                }}
                className="absolute right-4 z-50 p-4 rounded-full bg-black/50 hover:bg-brandYellow text-white hover:text-black transition-all backdrop-blur-md opacity-100 sm:opacity-0 sm:group-hover/modal:opacity-100"
                title="Next Image (Right Arrow)"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-sm font-semibold tracking-wider">
              {event.photos.indexOf(lightboxImage) + 1} / {event.photos.length}
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
