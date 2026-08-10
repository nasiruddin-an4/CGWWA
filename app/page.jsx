'use client';

import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { StatisticsSection } from '@/components/home/StatisticsSection';
import { AboutSection } from '@/components/home/AboutSection';
import { ProgramsSection } from '@/components/home/ProgramsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { EventsSection } from '@/components/home/EventsSection';
import { GallerySection } from '@/components/home/GallerySection';
import { EmergencySupportSection } from '@/components/home/EmergencySupportSection';

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden bg-slate-50">
      <HeroSection />

      <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-20 sm:space-y-32">
        <AboutSection />
        <StatisticsSection />
      </div>

      <ProgramsSection />

      <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-20 sm:space-y-32">
        <NewsSection />
        <EventsSection />
        <GallerySection />
        <EmergencySupportSection />
      </div>
    </div>
  );
}