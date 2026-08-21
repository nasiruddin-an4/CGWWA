'use client';

import React, { useState, useEffect } from 'react';
import { X, BellRing } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const eventData = {
  id: 'evt-notice-01',
  slug: 'baking-workshop-2026',
  title: 'Baking Workshop by BCG Ladies Club',
  titleBn: 'বেকিং বিষয়ক কর্মশালা',
  date: 'August 22, 2026',
  time: '10:00 AM - 02:00 PM',
  location: 'Coast Guard Headquarters, Dhaka',
  locationBn: 'কোস্ট গার্ড সদর দপ্তর, ঢাকা',
  district: 'Dhaka',
  category: 'Workshop',
  description: 'A baking workshop organized by BCG Ladies Club Dhaka. Willing officers\' wives are requested to register and send their names via email.',
  descriptionBn: 'বিসিজি লেডিস ক্লাব ঢাকা এর ব্যবস্থাপনায় কোস্ট গার্ড সদর দপ্তরে অনুষ্ঠিতব্য কর্মশালা। আগ্রহী কর্মকর্তা পত্নীগণের নাম ই-মেইলে প্রেরণের জন্য অনুরোধ করা হলো।',
  agenda: [
    { time: '10:00 AM', activity: 'Inauguration & Registration' },
    { time: '10:30 AM', activity: 'Baking Demonstration' },
    { time: '01:00 PM', activity: 'Tasting & Q&A Session' },
  ],
  chiefGuest: 'President, BCG Ladies Club',
  status: 'Upcoming',
  image: '/noticeImg.jpeg',
};

export const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Show on every load/refresh with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden relative animate-in zoom-in-95 duration-300 flex flex-col md:flex-row"
      >
        {/* Close Button - Now sits over the white content area on desktop */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side Image */}
        <div className="relative h-48 md:h-auto md:w-2/5 shrink-0 bg-slate-200">
          <img
            src={eventData.image}
            alt={eventData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/50" />

          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brandYellow text-brandBlue text-xs font-bold uppercase tracking-wider shadow-md">
              <BellRing className="w-3.5 h-3.5" />
              {t('Upcoming Event', 'আসন্ন ইভেন্ট')}
            </span>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center space-y-5 bg-white">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-brandBlue leading-tight pr-8">
            {language === 'bn' ? eventData.titleBn : eventData.title}
          </h3>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
            {language === 'bn' ? eventData.descriptionBn : eventData.description}
          </p>

          {/* Extra Event Details for context */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{t('Date:', 'তারিখ:')}</span>
              {eventData.date} ({eventData.time})
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{t('Location:', 'স্থান:')}</span>
              {language === 'bn' ? eventData.locationBn : eventData.location}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 mt-auto">
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t('Close', 'বন্ধ করুন')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
