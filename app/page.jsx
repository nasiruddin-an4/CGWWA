import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { ProgramsSection } from '@/components/home/ProgramsSection';
import { EventsSection } from '@/components/home/EventsSection';
import { GallerySection } from '@/components/home/GallerySection';

export const metadata = {
  title: 'Home - Coast Guard Family Welfare Association',
  description: 'Welcome to the official website of Bangladesh Coast Guard Family Welfare Association (CGFWA). Dedicated to coastal development and welfare.',
};

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden bg-slate-50">
      <HeroSection />

      <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-20 sm:space-y-32">
        <AboutSection />
      </div>

      <ProgramsSection />

      <div className="container mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-20 sm:space-y-32">
        <EventsSection />
        <GallerySection />
      </div>
    </div>
  );
}