"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function SocialResponsibilityPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-teal-950 max-w-7xl mx-auto rounded-md mt-8 lg:mt-12 shadow-xl border border-teal-900/50">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="/images/programs-placeholder.png" alt="Social Responsibility" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-teal-950/70 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Icons.Globe2 className="w-5 h-5 text-teal-300" />
              <span className="text-sm font-bold tracking-widest uppercase text-teal-300">
                {t("Core Initiative", "মূল উদ্যোগ")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight">
              {t("Social Responsibility", "সামাজিক দায়িত্ববোধ")}
            </h1>
            <p className="text-lg md:text-xl text-teal-100 leading-relaxed max-w-2xl">
              {t("Fostering environmental conservation, coastal heritage preservation, and climate change awareness among youth.", "পরিবেশ সংরক্ষণ, উপকূলীয় ঐতিহ্য রক্ষা এবং তরুণদের মধ্যে জলবায়ু পরিবর্তন বিষয়ক সচেতনতা বৃদ্ধি।")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. ENVIRONMENTAL IMPACT STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-md p-8 lg:p-12 shadow-2xl border border-slate-100 mt-8 relative z-20 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-3xl font-serif font-bold text-slate-800">
              {t("Protecting the Coast", "উপকূল রক্ষা")}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t("Our duty extends beyond human welfare to the preservation of the delicate coastal ecosystem that sustains these communities.", "আমাদের দায়িত্ব মানব কল্যাণের বাইরেও এই সম্প্রদায়গুলোকে টিকিয়ে রাখা সূক্ষ্ম উপকূলীয় বাস্তুতন্ত্র সংরক্ষণের প্রসারিত।")}
            </p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { value: "500k+", label: "Mangroves Planted", labelBn: "ম্যানগ্রোভ রোপণ", icon: "TreePine" },
              { value: "12,500", label: "Youth Volunteers", labelBn: "যুব স্বেচ্ছাসেবক", icon: "Users" },
              { value: "340", label: "Awareness Camps", labelBn: "সচেতনতা ক্যাম্প", icon: "Megaphone" }
            ].map((stat, idx) => {
              const Icon = Icons[stat.icon];
              return (
                <div key={idx} className="bg-teal-50 rounded-md p-6 text-center border border-teal-100 relative overflow-hidden group">
                  <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-150 transition-transform duration-500">
                    <Icon className="w-32 h-32 text-teal-900" />
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="block text-4xl font-black text-teal-700 font-mono mb-2">{stat.value}</span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{language === 'bn' ? stat.labelBn : stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. KEY INITIATIVES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 py-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">
            {t("Our Ecological & Social Duty", "আমাদের পরিবেশগত ও সামাজিক দায়িত্ব")}
          </h2>
          <p className="text-slate-600 text-lg">
            {t("We believe in a holistic approach to welfare that includes the environment, culture, and the next generation.", "আমরা কল্যাণের এমন একটি সামগ্রিক পদ্ধতিতে বিশ্বাস করি যার মধ্যে পরিবেশ, সংস্কৃতি এবং ভবিষ্যৎ প্রজন্ম অন্তর্ভুক্ত।")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Mangrove Afforestation",
              titleBn: "ম্যানগ্রোভ বনায়ন",
              desc: "Massive mangrove afforestation drives along the coastlines to create natural barriers against tidal surges and protect biodiversity.",
              descBn: "জলোচ্ছ্বাসের বিরুদ্ধে প্রাকৃতিক বাধা তৈরি করতে এবং জীববৈচিত্র্য রক্ষায় উপকূল বরাবর বিশাল ম্যানগ্রোভ বনায়ন কর্মসূচি।",
              image: "/images/programs-placeholder.png"
            },
            {
              title: "Climate Change Education",
              titleBn: "জলবায়ু পরিবর্তন শিক্ষা",
              desc: "Organizing extensive awareness camps in schools, teaching the next generation how to adapt and protect their fragile environment.",
              descBn: "স্কুলগুলোতে ব্যাপক সচেতনতা ক্যাম্পের আয়োজন, ভবিষ্যৎ প্রজন্মকে শেখানো কীভাবে তাদের ভঙ্গুর পরিবেশের সাথে খাপ খাইয়ে নিতে এবং রক্ষা করতে হয়।",
              image: "/images/programs-placeholder.png"
            },
            {
              title: "Coastal Heritage Preservation",
              titleBn: "উপকূলীয় ঐতিহ্য সংরক্ষণ",
              desc: "Hosting the National Maritime Cultural Festival to celebrate and preserve the unique folk traditions, music, and crafts of coastal people.",
              descBn: "উপকূলীয় মানুষের অনন্য লোকজ ঐতিহ্য, সঙ্গীত এবং কারুশিল্প উদযাপন ও সংরক্ষণের জন্য জাতীয় সামুদ্রিক সাংস্কৃতিক উৎসবের আয়োজন।",
              image: "/images/programs-placeholder.png"
            },
            {
              title: "Elderly & Orphan Support",
              titleBn: "প্রবীণ ও এতিম সহায়তা",
              desc: "Providing monthly pensions to elderly citizens without families and supporting local coastal orphanages with food and educational supplies.",
              descBn: "পরিবারহীন প্রবীণ নাগরিকদের মাসিক ভাতা প্রদান এবং স্থানীয় উপকূলীয় এতিমখানাগুলোতে খাদ্য ও শিক্ষা সামগ্রী সহায়তা।",
              image: "/images/programs-placeholder.png"
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row bg-slate-50 rounded-md overflow-hidden border border-slate-200 group">
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="sm:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-teal-900 mb-3">{language === 'bn' ? item.titleBn : item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{language === 'bn' ? item.descBn : item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION - YOUTH VOLUNTEERS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 mt-16">
        <div className="bg-teal-900 rounded-md p-10 md:p-14 text-center shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 opacity-20">
            <img src="/images/programs-placeholder.png" alt="Volunteers" className="w-full h-full object-cover mix-blend-overlay" />
          </div>
          <div className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-teal-300 mb-6">
            <Icons.HandHeart className="w-10 h-10" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              {t("Join the Youth Volunteer Corps", "যুব স্বেচ্ছাসেবক দলে যোগ দিন")}
            </h2>
            <p className="text-teal-100 text-lg mb-8">
              {t("Be the change your community needs. We are currently recruiting youth volunteers for our upcoming afforestation and emergency response drives.", "আপনার সম্প্রদায়ের প্রয়োজনীয় পরিবর্তন হোন। আমরা আসন্ন বনায়ন এবং জরুরি প্রতিক্রিয়া কর্মসূচির জন্য যুব স্বেচ্ছাসেবক নিয়োগ করছি।")}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-md font-bold hover:bg-teal-400 transition-colors shadow-lg hover:shadow-xl">
              {t("Register as Volunteer", "স্বেচ্ছাসেবক হিসেবে নিবন্ধন করুন")}
              <Icons.ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
