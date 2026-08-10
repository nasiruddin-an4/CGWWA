'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { flagshipPrograms } from '@/data/programs';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ProgramsSection() {
  const { language, t } = useLanguage();
  const observe = useScrollReveal();
  const [swiper, setSwiper] = React.useState(null);

  return (
    <section className="w-full bg-brandBlue py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div
          ref={observe}
          className="reveal-up flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">

          <div>
            <SectionHeader
              title="Latest Programs & Projects"
              titleBn="সর্বশেষ কল্যাণ ও উন্নয়ন প্রকল্পসমূহ"
              className="!mb-0 [&>h2]:!mb-0"
              lightText={true}
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button href="/programs" className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-brandBlue transition-colors border" size="md">
              {t('View All Programs', 'সকল প্রকল্প দেখুন')}
            </Button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => swiper?.slidePrev()}
                className="programs-prev-btn p-2.5 rounded-md bg-white/5 border border-white/10 text-white/70 hover:bg-brandYellow hover:text-white hover:border-brandYellow transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Previous Slide">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => swiper?.slideNext()}
                className="programs-next-btn p-2.5 rounded-md bg-white/5 border border-white/10 text-white/70 hover:bg-brandYellow hover:text-white hover:border-brandYellow transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Next Slide">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={setSwiper}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 }
            }}
            className="pb-2">

            {flagshipPrograms.map((prog) =>
              <SwiperSlide key={prog.id} className="!h-auto flex">
                <Link
                  href={`/programs/${prog.slug}`}
                  className="program-card w-full bg-white/5 backdrop-blur-md rounded-md border border-white/10 shadow-lg transition-all duration-500 flex flex-col overflow-hidden group/card h-full hover:bg-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 relative">

                  {/* Image Header */}
                  <div className="relative h-56 overflow-hidden bg-slate-900 shrink-0 rounded-t-3xl">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000 ease-out" />

                    <div className="absolute inset-0 bg-gradient-to-t from-brandBlue/80 via-black/20 to-transparent" />
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-semibold text-white text-lg group-hover/card:text-brandYellow transition-colors duration-300 leading-snug line-clamp-2">
                        {language === 'bn' ? prog.titleBn : prog.title}
                      </h3>
                      <p className="text-xs text-white/70 line-clamp-3 mt-2.5 leading-relaxed">
                        {language === 'bn' ? prog.shortDescBn : prog.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="text-[11px] text-white/50 font-semibold">
                        Target: <span className="text-brandYellow font-bold">{prog.beneficiariesTarget}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-brandYellow">
                        <span>{t('Details', 'বিস্তারিত')}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
