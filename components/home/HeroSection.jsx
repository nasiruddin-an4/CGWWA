'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function HeroSection() {
  const { language, t } = useLanguage();
  const [activeHeroTab, setActiveHeroTab] = useState(0);

  // Hero Carousel Stories
  const heroStories = [
    {
      title: t(
        'Empowering Coastal Scholars',
        'উপকূলীয় চরাঞ্চলের মেধাবী শিক্ষার্থীদের উপবৃত্তি'
      ),
      desc: t(
        'Reaching remote riverine sub-districts to ensure zero high-school dropout.',
        'উপকূলীয় চরাঞ্চলের শিক্ষার্থীদের ঝরে পড়া রোধে নিয়মিত উপবৃত্তি প্রদান।'
      ),
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80',
      link: '/programs/coastal-education-scholarship'
    },
    {
      title: t(
        'Lifeline for Fishing Communities',
        'মৌসুমি মাছ ধরা নিষেধাজ্ঞায় জেলে পরিবারে সহায়তা'
      ),
      desc: t(
        'Distributing monthly ration packs and grants during conservation periods.',
        '৬৫ দিনের সরকারি নিষেধাজ্ঞাকালে উপকূলীয় জেলে পরিবারে আর্থিক সহায়তা।'
      ),
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=80',
      link: '/programs/emergency-fisherman-relief'
    },
    {
      title: t(
        'Vocational Skills for Women',
        'উপকূলের স্বাবলম্বী নারীদের কারিগরি প্রশিক্ষণ'
      ),
      desc: t(
        'Establishing community craft hubs with fair-trade market access.',
        'সেলাই ও হস্তশিল্পের মাধ্যমে গ্রামীণ নারীদের আত্মনির্ভরশীল করে তোলা।'
      ),
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=2000&q=80',
      link: '/programs/women-artisans-livelihood'
    }];

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
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
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
