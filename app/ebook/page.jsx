'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Download, ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

export default function EBookPage() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-16 max-w-7xl mx-auto pb-20">
      <PageHeader
        category="Publications"
        categoryBn="প্রকাশনা"
        title="Digital E-Book"
        titleBn="ডিজিটাল ই-বুক"
        subtitle="Explore our annual magazines, reports, and welfare guidelines in a digital interactive format."
        subtitleBn="আমাদের বার্ষিক ম্যাগাজিন, রিপোর্ট এবং কল্যাণ নির্দেশিকা ডিজিটাল মাধ্যমে পড়ুন।" />

      <section className="flex flex-col lg:flex-row items-center justify-center gap-16 px-4 py-10">
        
        {/* 3D Book Container */}
        <div className="relative perspective-[1500px] w-[300px] sm:w-[350px] h-[450px] sm:h-[500px] group cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          
          <div className={`w-full h-full relative preserve-3d transition-all duration-1000 ease-in-out origin-left ${isOpen ? 'rotate-y-[-180deg]' : 'group-hover:rotate-y-[-15deg]'}`}>
            
            {/* Front Cover */}
            <div className="absolute w-full h-full bg-brandBlue rounded-r-xl border-l-8 border-[#1a365d] shadow-2xl backface-hidden overflow-hidden flex flex-col justify-between">
              
              {/* Cover Design */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
              
              <div className="pt-12 px-6 flex flex-col items-center relative z-10">
                <div className="w-20 h-24 mb-6 relative bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                   <Image src="https://res.cloudinary.com/armmzmyq/image/upload/v1787248712/cgfwa/englishLogo_yztxt4.png" alt="Logo" fill className="object-contain p-1" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-white text-center leading-tight">
                  {t('CGFWA Annual Magazine', 'সিজিএফডব্লিউএ বার্ষিক ম্যাগাজিন')}
                </h1>
                <div className="w-16 h-1 bg-brandYellow mt-6 rounded-full"></div>
              </div>

              <div className="pb-8 px-6 text-center relative z-10">
                <p className="text-brandYellow font-medium tracking-widest uppercase text-sm">2024 - 2025</p>
                <p className="text-blue-100 text-xs mt-2">{t('Empowering Families, Enriching the Coast', 'পরিবারের ক্ষমতায়ন, উপকূলের উন্নয়ন')}</p>
              </div>

              {/* Spine edge effect */}
              <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>

            {/* Back of Front Cover (Inside Cover) */}
            <div className="absolute w-full h-full bg-slate-50 rounded-l-xl border-r border-slate-200 shadow-inner rotate-y-180 backface-hidden">
               <div className="w-full h-full p-8 flex items-center justify-center border-[12px] border-slate-100">
                  <div className="text-center opacity-40">
                    <BookOpen size={48} className="mx-auto text-slate-400 mb-4" />
                    <p className="text-slate-500 font-serif">Published by CGFWA</p>
                  </div>
               </div>
            </div>
            
          </div>

          {/* Book Pages (Body) - visible when open or slightly tilted */}
          <div className="absolute top-[2%] left-0 w-[96%] h-[96%] bg-white rounded-r-lg shadow-[inset_-2px_0_5px_rgba(0,0,0,0.1),5px_5px_15px_rgba(0,0,0,0.1)] -z-10 flex flex-col items-center justify-center px-10 text-center">
            {isOpen && (
              <div className="animate-fade-in delay-300">
                <h2 className="text-2xl font-serif font-bold text-brandBlue mb-4">
                  {t('Table of Contents', 'সূচিপত্র')}
                </h2>
                <ul className="text-slate-600 text-sm space-y-3 font-medium text-left">
                  <li className="flex justify-between border-b border-dashed border-slate-300 pb-1"><span>{t('Message from President', 'প্রেসিডেন্টের বাণী')}</span> <span>01</span></li>
                  <li className="flex justify-between border-b border-dashed border-slate-300 pb-1"><span>{t('Welfare Programs', 'কল্যাণমূলক কর্মসূচি')}</span> <span>05</span></li>
                  <li className="flex justify-between border-b border-dashed border-slate-300 pb-1"><span>{t('Training Initiatives', 'প্রশিক্ষণ উদ্যোগ')}</span> <span>12</span></li>
                  <li className="flex justify-between border-b border-dashed border-slate-300 pb-1"><span>{t('Success Stories', 'সাফল্যের গল্প')}</span> <span>24</span></li>
                </ul>
                <button className="mt-10 bg-brandBlue text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-brandYellow hover:text-brandBlue transition-colors shadow-md flex items-center gap-2 mx-auto">
                  <Download size={16} /> {t('Download Full PDF', 'সম্পূর্ণ পিডিএফ ডাউনলোড করুন')}
                </button>
              </div>
            )}
            
            {/* Page lines effect on the right edge */}
            <div className="absolute top-0 bottom-0 right-0 w-3 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,#e2e8f0_2px,#e2e8f0_3px)] opacity-50 rounded-r-lg"></div>
          </div>

          {/* Spine (Visible when open) */}
          <div className={`absolute top-0 left-0 w-8 h-full bg-[#112440] origin-right transition-transform duration-1000 -z-20 ${isOpen ? 'rotate-y-0 translate-x-[-100%]' : 'rotate-y-[-90deg]'}`}>
             <div className="w-full h-full flex items-center justify-center opacity-50">
               <span className="text-white text-xs whitespace-nowrap rotate-[-90deg] font-serif tracking-widest">CGFWA MAGAZINE 2024</span>
             </div>
          </div>

        </div>

        {/* Text Content */}
        <div className="max-w-md text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-brandBlue rounded-full text-sm font-semibold tracking-wide uppercase border border-blue-100">
            <BookOpen size={16} /> {t('New Release', 'নতুন প্রকাশনা')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A233A] leading-tight">
            {t('Discover Our Latest Digital Magazine', 'আমাদের সর্বশেষ ডিজিটাল ম্যাগাজিনটি পড়ুন')}
          </h2>
          <p className="text-[#64748B] text-lg">
            {t(
              'Explore the achievements, ongoing projects, and future goals of the Bangladesh Coast Guard Family Welfare Association in our comprehensive interactive E-Book.',
              'আমাদের এই ডিজিটাল ই-বুকে বাংলাদেশ কোস্ট গার্ড পরিবার কল্যাণ সংঘের অর্জন, চলমান প্রকল্প এবং ভবিষ্যৎ লক্ষ্যসমূহ সম্পর্কে বিস্তারিত জানুন।'
            )}
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
             <button 
                onClick={() => setIsOpen(!isOpen)}
                className="px-6 py-3 bg-brandBlue text-white font-medium rounded-md hover:bg-[#1a365d] transition-colors shadow-lg shadow-brandBlue/20 flex items-center justify-center gap-2">
                {isOpen ? t('Close Book', 'বই বন্ধ করুন') : t('Read E-Book', 'ই-বুক পড়ুন')}
                {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
             </button>
             <button className="px-6 py-3 bg-white text-brandBlue border-2 border-brandBlue font-medium rounded-md hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Download size={18} /> {t('Download PDF', 'পিডিএফ ডাউনলোড')}
             </button>
          </div>
        </div>

      </section>

      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-[1500px] {
          perspective: 1500px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-[-180deg] {
          transform: rotateY(-180deg);
        }
        .rotate-y-[-15deg] {
          transform: rotateY(-15deg);
        }
        .rotate-y-[-90deg] {
          transform: rotateY(-90deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .translate-x-[-100%] {
          transform: translateX(-100%);
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
