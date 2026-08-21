'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

import Image from 'next/image';
import { useDbData } from '@/hooks/useDbData';

export function HeroSection() {
  const { language, t } = useLanguage();
  const [activeHeroTab, setActiveHeroTab] = useState(0);
  const { data: dbBanners } = useDbData('hero_banners', []);

  // Hero Carousel Stories
  const defaultHeroStories = [
    {
      title: t(
        'Sewing Training Workshop',
        'সেলাই প্রশিক্ষণ কর্মশালা'
      ),
      desc: t(
        'Chief Guest Farhana Begum, President CGFWA, inaugurating the sewing machines to empower coastal women.',
        'উপকূলীয় নারীদের স্বাবলম্বী করার লক্ষ্যে প্রেসিডেন্ট সিজিএফডব্লিউএ ফারহানা বেগম কর্তৃক সেলাই প্রশিক্ষণ কর্মশালা উদ্বোধন।'
      ),
      image: 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248264/cgfwa/compressed_1787248261628_BCG_5647_vzvhhu.jpg',
      link: '/activities/training-programs/sewing-training-workshop'
    },
    {
      title: t(
        'Tree Plantation Campaign 2026',
        'বৃক্ষরোপণ অভিযান ২০২৬'
      ),
      desc: t(
        'Decorating the country with tree plantation. Planting trees to protect the coastal environment.',
        '“বৃক্ষরোপণে সাজাই দেশ, সবার আগে বাংলাদেশ” - উপকূলীয় পরিবেশ রক্ষায় সিজিএফডব্লিউএ এর উদ্যোগে বৃক্ষরোপণ কর্মসূচি।'
      ),
      image: 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248267/cgfwa/compressed_1787248264727_BCG_7482_zehb2t.jpg',
      link: '/activities/community-engagement/tree-plantation'
    },
    {
      title: t(
        'Iftar Distribution',
        'ইফতার বিতরণ'
      ),
      desc: t(
        'Distributing Iftar among orphan students during the holy month of Ramadan.',
        'পবিত্র মাহে রমজান উপলক্ষ্যে এতিমদের মাঝে সিজিএফডব্লিউএ কর্তৃক ইফতার বিতরণ কর্মসূচি।'
      ),
      image: 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248269/cgfwa/compressed_1787248267862_DSC_2978_mp5tlt.jpg',
      link: '/activities/welfare-programs/iftar-distribution'
    },
    {
      title: t(
        'CGFWA Raising Day',
        'সিজিএফডব্লিউএ রেইজিং ডে'
      ),
      desc: t(
        'Celebrating the founding anniversary and the continued legacy of the Coast Guard Family Welfare Association.',
        'বাংলাদেশ কোস্ট গার্ড পরিবার কল্যাণ সংঘের প্রতিষ্ঠাবার্ষিকী ও অবিরাম পথচলা উদযাপন।'
      ),
      image: 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248271/cgfwa/compressed_1787248269824_DSC_3660_grr0qs.jpg',
      link: '/about'
    }
  ];

  // Merge db banners formatting them for the view
  const dbHeroStories = dbBanners.map(b => ({
    title: language === 'bn' && b.titleBn ? b.titleBn : b.title,
    desc: language === 'bn' && b.descBn ? b.descBn : b.desc,
    image: b.image,
    link: b.link || '#'
  }));

  const heroStories = dbHeroStories.length > 0 ? dbHeroStories : defaultHeroStories;

  // Auto-play for Hero Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroTab((prev) => (prev + 1) % heroStories.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroStories.length]);

  const handleNextSlide = () => {
    setActiveHeroTab((prev) => (prev + 1) % heroStories.length);
  };

  const handlePrevSlide = () => {
    setActiveHeroTab((prev) => (prev - 1 + heroStories.length) % heroStories.length);
  };

  return (
    <section className="relative w-full h-[80vh] lg:h-screen flex items-end overflow-hidden group">
      {/* Background Images */}
      {heroStories.map((story, idx) => (
        <div
          key={`bg-${idx}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeHeroTab === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Subtle gradient to ensure text readability at the bottom left */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />
          <Image
            src={story.image}
            alt={story.title}
            fill={true}
            priority={idx === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Content Container (Bottom Left) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-2xl">
          <h1
            key={`title-${activeHeroTab}`}
            className="hero-slide-text text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white tracking-tight mb-4 drop-shadow-md">
            {heroStories[activeHeroTab].title}
          </h1>

          <p
            key={`desc-${activeHeroTab}`}
            className="hero-slide-text text-slate-200 text-lg sm:text-xl leading-relaxed mb-8 drop-shadow">
            {heroStories[activeHeroTab].desc}
          </p>

          <div className="hero-slide-text">
            <a
              href={heroStories[activeHeroTab].link}
              className="inline-flex items-center gap-2 text-white font-semibold uppercase tracking-wider hover:text-brandYellow transition-colors group/btn"
            >
              {t('Learn More', 'বিস্তারিত জানুন')}
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-30">
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <button
        onClick={handleNextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-30">
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 right-6 sm:right-8 flex items-center gap-2 z-30">
        {heroStories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveHeroTab(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`rounded-full transition-all duration-500 ${activeHeroTab === idx ?
              'w-8 h-1.5 bg-brandYellow' :
              'w-2 h-1.5 bg-white/40 hover:bg-white/80'
              }`}
          />
        ))}
      </div>
    </section>
  );
}
