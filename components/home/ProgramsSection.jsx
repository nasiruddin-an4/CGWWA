'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight, ImageIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { activitiesData } from '@/data/activities';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ProgramsSection() {
  const { language, t } = useLanguage();
  const observe = useScrollReveal();
  const [swiper, setSwiper] = React.useState(null);

  // Flatten all events from all categories
  const allEvents = React.useMemo(() => {
    const events = [];
    activitiesData.forEach(cat => {
      cat.events.forEach(ev => {
        events.push({
          ...ev,
          categorySlug: cat.slug,
          categoryTitle: cat.title,
          categoryTitleBn: cat.titleBn
        });
      });
    });
    return events;
  }, []);

  return (
    <section className="w-full bg-brandBlue py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div
          ref={observe}
          className="reveal-up flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">

          <div>
            <SectionHeader
              title="Latest Activities & Events"
              titleBn="সর্বশেষ কার্যক্রম ও ইভেন্টসমূহ"
              className="!mb-0 [&>h2]:!mb-0"
              lightText={true}
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button href="/activities" className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-brandBlue transition-colors border" size="md">
              {t('View All Activities', 'সকল কার্যক্রম দেখুন')}
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
            slidesPerGroup={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 1 },
              1024: { slidesPerView: 3, spaceBetween: 28, slidesPerGroup: 1 }
            }}
            className="pb-2">

            {allEvents.map((ev, idx) => {
              const coverImage = ev.photos && ev.photos.length > 0 ? ev.photos[0] : 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248725/cgfwa/programs-placeholder_rymijf.jpg';
              return (
                <SwiperSlide key={idx} className="!h-auto flex p-2">
                  <Link
                    href={`/activities/${ev.categorySlug}/${ev.eventSlug}`}
                    className="program-card w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg transition-all duration-500 flex flex-col overflow-hidden group/card h-full hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 relative">

                    {/* Image Header */}
                    <div className="relative h-60 overflow-hidden bg-brandBlue shrink-0">
                      <Image
                        src={coverImage}
                        alt={language === 'bn' ? ev.titleBn : ev.title}
                        fill={true}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover opacity-85 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700 ease-out" />

                      <div className="absolute inset-0 bg-gradient-to-t from-brandBlue via-brandBlue/40 to-transparent opacity-90 group-hover/card:opacity-60 transition-opacity duration-500" />
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-b from-brandBlue to-brandBlue/90">
                      <div>
                        <h3 className="font-serif font-bold text-white text-xl md:text-2xl group-hover/card:text-brandYellow transition-colors duration-300 leading-snug line-clamp-2">
                          {language === 'bn' ? ev.titleBn : ev.title}
                        </h3>
                        <p className="text-sm text-white/60 line-clamp-3 mt-3 leading-relaxed group-hover/card:text-white/90 transition-colors duration-300">
                          {language === 'bn' ? ev.descBn : ev.desc}
                        </p>
                      </div>

                      <div className="pt-5 border-t border-white/10 flex items-center justify-between mt-auto group-hover/card:border-white/20 transition-colors duration-300">
                        <div className="text-xs text-white/50 font-semibold flex items-center gap-1.5 group-hover/card:text-white/70 transition-colors">
                          <ImageIcon className="w-4 h-4" />
                          <span>{ev.photos ? ev.photos.length : 0} {t('Photos', 'ছবি')}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brandYellow group-hover/card:text-white transition-colors duration-300">
                          <span className="uppercase tracking-wider">{t('View Gallery', 'গ্যালারি দেখুন')}</span>
                          <div className="w-6 h-6 rounded-full bg-brandYellow/10 flex items-center justify-center group-hover/card:bg-brandYellow group-hover/card:text-brandBlue transition-all duration-300">
                            <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-0.5 transition-transform duration-300" />
                          </div>
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
