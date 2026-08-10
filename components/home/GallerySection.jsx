'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Eye, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { photoGallery } from '@/data/gallery';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function GallerySection() {
  const { language, t } = useLanguage();
  const observe = useScrollReveal();
  const [activeModalImage, setActiveModalImage] = useState(null);

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveModalImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <section
        ref={observe}
        className="reveal-up py-8 sm:py-12 lg:py-14 space-y-8 relative overflow-hidden">

        {/* Section Header */}
        <div className="relative z-10 border-b border-slate-200 pb-7 mb-8">
          <SectionHeader
            title="Photo Records of Operations & Field Services"
            titleBn="চিত্রপট: জনসেবা, চিকিৎসা ও উপকূলীয় কার্যক্রম"
            subtitle="Documenting mobile healthcare fleets, scholarship distribution ceremonies, and disaster relief operations across Bangladesh."
            subtitleBn="কোস্ট গার্ড ওয়েলফেয়ার অ্যাসোসিয়েশনের বিভিন্ন স্বাস্থ্যসেবা, শিক্ষা বৃত্তি প্রদান এবং ত্রাণ বিতরণ কর্মসূচির দৃশ্যপট।"
            lightText={false}
            className="!mb-0 [&>h2]:!mb-0"
            centered={true}
          />
        </div>

        {/* Clean Masonry Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 relative z-10">
          {photoGallery.slice(0, 6).map((p, idx) => (
            <div
              key={p.id}
              ref={observe}
              data-reveal-delay={(idx + 1) * 100}
              className="reveal-up relative break-inside-avoid rounded-md overflow-hidden group/thumb cursor-pointer border border-slate-200 bg-slate-50 shadow-lg"
              onClick={() => setActiveModalImage(p)}>

              <img
                src={p.url}
                alt={p.title}
                className="w-full h-auto object-cover group-hover/thumb:scale-105 transition-transform duration-700 opacity-90 group-hover/thumb:opacity-100"
                loading="lazy"
              />

              {/* Subtle hover overlay without text */}
              <div className="absolute inset-0 bg-brandBlue/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-14 h-14 rounded-full bg-brandYellow text-brandBlue flex items-center justify-center transform scale-50 group-hover/thumb:scale-100 transition-transform duration-300 shadow-xl">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Button */}
        <div className="flex justify-center mt-10 relative z-10">
          <Button href="/gallery" className="bg-brandYellow text-brandBlue hover:bg-yellow-400 font-bold px-8 py-3 rounded-md shadow-[0_8px_20px_rgba(245,238,49,0.25)] transition-all transform hover:-translate-y-1" size="lg">
            {t('Explore Full Gallery', 'সম্পূর্ণ গ্যালারি দেখুন')}
          </Button>
        </div>
      </section>

      {/* ═══════════════════ IMAGE LIGHTBOX MODAL ═══════════════════ */}
      {activeModalImage &&
        <div
          className="lightbox-overlay fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 flex items-center justify-center"
          onClick={() => setActiveModalImage(null)}>

          <div
            className="lightbox-content bg-slate-900 rounded-md max-w-3xl w-full p-4 border border-white/15 space-y-3 relative text-white"
            onClick={(e) => e.stopPropagation()}>

            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 z-10">

              <X className="w-5 h-5" />
            </button>

            <img
              src={activeModalImage.url}
              alt={activeModalImage.title}
              className="w-full max-h-[70vh] object-contain rounded-md" />

            <div className="p-2 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                {activeModalImage.category}
              </span>
              <h4 className="font-semibold text-lg">
                {language === 'bn' ? activeModalImage.titleBn : activeModalImage.title}
              </h4>
              {(activeModalImage.description || activeModalImage.descriptionBn) &&
                <p className="text-xs text-slate-300">
                  {language === 'bn' ? activeModalImage.descriptionBn : activeModalImage.description}
                </p>
              }
            </div>
          </div>
        </div>
      }
    </>
  );
}
