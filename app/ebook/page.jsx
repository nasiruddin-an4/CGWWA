'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Download, ChevronRight, Loader2 } from 'lucide-react';
import { useDbData } from '@/hooks/useDbData';
import Link from 'next/link';
import Image from 'next/image';

export default function EBookPage() {
  const { language, t } = useLanguage();
  const { data: ebooks, loading } = useDbData('ebooks', []);

  return (
    <div className="space-y-16 max-w-7xl mx-auto pb-20">
      <PageHeader
        category="Publications"
        categoryBn="প্রকাশনা"
        title="Digital Library"
        titleBn="ডিজিটাল লাইব্রেরি"
        subtitle="Explore our annual magazines, reports, and welfare guidelines in a digital interactive format."
        subtitleBn="আমাদের বার্ষিক ম্যাগাজিন, রিপোর্ট এবং কল্যাণ নির্দেশিকা ডিজিটাল মাধ্যমে পড়ুন।" />

      <section className="px-4 py-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-brandBlue animate-spin mb-4" />
            <p className="text-slate-500 font-medium">{t('Loading library...', 'লাইব্রেরি লোড হচ্ছে...')}</p>
          </div>
        ) : ebooks.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('No E-Books Available', 'কোনো ই-বুক পাওয়া যায়নি')}</h3>
            <p className="text-slate-500">{t('Please check back later for new publications.', 'নতুন প্রকাশনার জন্য অনুগ্রহ করে পরে আবার চেক করুন।')}</p>
          </div>
        ) : ebooks.length === 1 ? (
          <div className="max-w-5xl mx-auto">
            {ebooks.map((ebook) => (
              <div key={ebook._id} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row p-6 md:p-10 gap-8 md:gap-16 items-center">
                {/* Featured Image - Book Style */}
                <div className="w-full md:w-2/5 flex justify-center">
                  <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-r-2xl rounded-l-md shadow-2xl shadow-slate-900/30 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/40 before:via-transparent before:to-transparent before:w-4 before:z-10 bg-white group transition-transform duration-500 hover:scale-105">
                    <Image 
                      src={ebook.coverImage} 
                      alt={ebook.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="w-full md:w-3/5 flex flex-col justify-center text-center md:text-left">
                  <div className="inline-block px-4 py-1.5 bg-brandBlue/10 text-brandBlue font-bold text-sm rounded-full mb-6 w-fit mx-auto md:mx-0">
                    {t('Featured Publication', 'বিশেষ প্রকাশনা')}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif">
                    {language === 'bn' && ebook.titleBn ? ebook.titleBn : ebook.title}
                  </h3>
                  
                  <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-2xl">
                    {language === 'bn' && ebook.descBn ? ebook.descBn : ebook.desc}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto justify-center md:justify-start">
                    {ebook.pdfUrl ? (
                      <Link 
                        href={`/ebook/read/${ebook._id}`}
                        className="w-full sm:w-auto px-8 py-3.5 bg-brandBlue text-white text-center rounded-xl font-bold text-base hover:bg-[#1a365d] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brandBlue/30 hover:shadow-brandBlue/50 hover:-translate-y-1 transform duration-200"
                      >
                        <BookOpen size={20} />
                        {t('Read Now', 'এখন পড়ুন')}
                      </Link>
                    ) : (
                      <button disabled className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 text-slate-400 text-center rounded-xl font-bold text-base flex items-center justify-center gap-2">
                        {t('Unavailable', 'পাওয়া যাচ্ছে না')}
                      </button>
                    )}
                    
                    {ebook.pdfUrl && (
                      <a 
                        href={ebook.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-bold text-base hover:bg-brandYellow hover:text-brandBlue hover:border-brandYellow transition-colors flex items-center justify-center gap-2 hover:-translate-y-1 transform duration-200"
                      >
                        <Download size={20} />
                        {t('Download PDF', 'পিডিএফ ডাউনলোড')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ebooks.map((ebook) => (
              <div key={ebook._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col">
                <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
                  <Image 
                    src={ebook.coverImage} 
                    alt={ebook.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {ebook.publishedYear && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brandBlue shadow-sm">
                      {ebook.publishedYear}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 font-serif group-hover:text-brandBlue transition-colors">
                    {language === 'bn' && ebook.titleBn ? ebook.titleBn : ebook.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
                    {language === 'bn' && ebook.descBn ? ebook.descBn : ebook.desc}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    {ebook.pdfUrl ? (
                      <Link 
                        href={`/ebook/read/${ebook._id}`}
                        className="flex-1 bg-brandBlue text-white text-center py-2.5 rounded-xl font-medium text-sm hover:bg-[#1a365d] transition-colors flex items-center justify-center gap-2 shadow-md shadow-brandBlue/20"
                      >
                        <BookOpen size={16} />
                        {t('Read Book', 'বই পড়ুন')}
                      </Link>
                    ) : (
                      <button disabled className="flex-1 bg-slate-100 text-slate-400 text-center py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                        {t('Unavailable', 'পাওয়া যাচ্ছে না')}
                      </button>
                    )}
                    
                    {ebook.pdfUrl && (
                      <a 
                        href={ebook.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-brandYellow hover:text-brandBlue hover:border-brandYellow transition-colors shrink-0"
                        title={t('Download PDF', 'পিডিএফ ডাউনলোড')}
                      >
                        <Download size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
