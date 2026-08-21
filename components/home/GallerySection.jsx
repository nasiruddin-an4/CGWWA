'use client';

import React from 'react';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useDbData } from '@/hooks/useDbData';

export function GallerySection() {
  const { language, t } = useLanguage();
  const observe = useScrollReveal();
  const { data: galleryData } = useDbData('gallery_photos', []);

  return (
    <>
      <section
        ref={observe}
        className="reveal-up py-8 sm:py-12 lg:py-14 space-y-8 relative overflow-hidden">

        {/* Section Header */}
        <div className="relative z-10 border-b border-slate-200 pb-7 mb-8">
          <SectionHeader
            title="Photo Gallery"
            titleBn="ফটো গ্যালারি"
            subtitle="Explore our visual journey of community engagement, training programs, and welfare activities."
            subtitleBn="কোস্ট গার্ড ওয়েলফেয়ার অ্যাসোসিয়েশনের বিভিন্ন কর্মসূচির দৃশ্যপট অন্বেষণ করুন।"
            lightText={false}
            className="!mb-0 [&>h2]:!mb-0"
            centered={true}
          />
        </div>

        {/* Clean Masonry Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 relative z-10">
          {galleryData.slice(0, 6).map((p, idx) => (
            <Link
              href={p.link}
              key={p.id}
              ref={observe}
              data-reveal-delay={(idx + 1) * 100}
              className="reveal-up relative break-inside-avoid rounded-md overflow-hidden group/thumb cursor-pointer border border-slate-200 bg-slate-50 shadow-lg block">

              <Image
                src={p.url}
                alt={p.title}
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: '100%', height: 'auto' }}
                className="group-hover/thumb:scale-105 transition-transform duration-700 opacity-90 group-hover/thumb:opacity-100"
              />

              {/* Subtle hover overlay without text */}
              <div className="absolute inset-0 bg-brandBlue/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-14 h-14 rounded-full bg-brandYellow text-brandBlue flex items-center justify-center transform scale-50 group-hover/thumb:scale-100 transition-transform duration-300 shadow-xl">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Centered Button */}
        <div className="flex justify-center mt-10 relative z-10">
          <Button href="/gallery" className="bg-brandYellow text-brandBlue hover:bg-yellow-400 font-bold px-8 py-3 rounded-md shadow-[0_8px_20px_rgba(245,238,49,0.25)] transition-all transform hover:-translate-y-1" size="lg">
            {t('Explore Full Gallery', 'সম্পূর্ণ গ্যালারি দেখুন')}
          </Button>
        </div>
      </section>
    </>
  );
}
