"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function WelfareProgramsPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-brandBlue max-w-7xl mx-auto rounded-md mt-8 lg:mt-12 shadow-xl border border-brandBlue/20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/programs-placeholder.png" alt="Welfare" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brandBlue/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Icons.HeartHandshake className="w-5 h-5 text-brandYellow" />
              <span className="text-sm font-bold tracking-widest uppercase text-brandYellow">
                {t("Core Initiative", "মূল উদ্যোগ")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight">
              {t("Welfare Programs & Crisis Relief", "কল্যাণমূলক কর্মসূচি ও সংকটকালীন ত্রাণ")}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl">
              {t("Providing direct financial and material support to distressed coastal families during emergencies, cyclonic surges, and seasonal fishing bans.", "জরুরি অবস্থা, ঘূর্ণিঝড় এবং মাছ ধরা নিষেধাজ্ঞার সময় বিপন্ন উপকূলীয় পরিবারগুলোকে প্রত্যক্ষ আর্থিক ও বস্তুগত সহায়তা প্রদান।")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. AT A GLANCE STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 relative z-20">
          {[
            { icon: "Users", value: "45,000+", label: "Families Supported", labelBn: "সহায়তাপ্রাপ্ত পরিবার" },
            { icon: "Banknote", value: "8.5 Cr", label: "Emergency Grants (BDT)", labelBn: "জরুরি অনুদান (টাকা)" },
            { icon: "MapPin", value: "19", label: "Districts Reached", labelBn: "অন্তর্ভুক্ত জেলা" },
            { icon: "Box", value: "1.2M", label: "Ration Kits Delivered", labelBn: "রেশন কিট বিতরণ" },
          ].map((stat, idx) => {
            const Icon = Icons[stat.icon];
            return (
              <div key={idx} className="bg-white rounded-md p-6 shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-brandYellow/10 flex items-center justify-center text-brandYellowDark mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-brandBlue font-mono mb-1">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{language === 'bn' ? stat.labelBn : stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CORE INITIATIVES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brandBlue">
            {t("How We Deliver Welfare", "আমরা কীভাবে কল্যাণ নিশ্চিত করি")}
          </h2>
          <p className="text-slate-600 text-lg">
            {t("Our comprehensive approach ensures that the most vulnerable coastal demographics receive targeted, transparent, and immediate assistance.", "আমাদের সমন্বিত পদ্ধতি নিশ্চিত করে যে উপকূলীয় সবচেয়ে ঝুঁকিপূর্ণ জনগোষ্ঠী লক্ষ্যভিত্তিক, স্বচ্ছ এবং তাৎক্ষণিক সহায়তা পায়।")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Bereavement Pensions",
              titleBn: "শোক ভাতা",
              desc: "Monthly stipends provided to families who have lost their primary breadwinner at sea due to storms or accidents.",
              descBn: "সমুদ্রে ঝড় বা দুর্ঘটনায় প্রধান উপার্জনকারী হারানো পরিবারগুলোকে মাসিক উপবৃত্তি প্রদান।",
              icon: "ShieldAlert"
            },
            {
              title: "Fishing Ban Subsidies",
              titleBn: "মাছ ধরা নিষেধাজ্ঞার ভর্তুকি",
              desc: "Cash grants and dry ration kits distributed during the 65-day government fishing ban to ensure food security.",
              descBn: "খাদ্য নিরাপত্তা নিশ্চিত করতে ৬৫ দিনের সরকারি মাছ ধরা নিষেধাজ্ঞার সময় নগদ অনুদান এবং রেশন কিট বিতরণ।",
              icon: "Fish"
            },
            {
              title: "Winter Relief",
              titleBn: "শীতকালীন ত্রাণ",
              desc: "Distribution of blankets, warm clothing, and essential medicines to remote islands during severe cold waves.",
              descBn: "তীব্র শৈত্যপ্রবাহের সময় দুর্গম দ্বীপগুলোতে কম্বল, গরম কাপড় এবং প্রয়োজনীয় ওষুধ বিতরণ।",
              icon: "ThermometerSnowflake"
            }
          ].map((item, idx) => {
            const Icon = Icons[item.icon];
            return (
              <div key={idx} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 hover:border-brandYellow transition-colors group">
                <div className="w-14 h-14 rounded-md bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brandBlue mb-6 group-hover:bg-brandBlue group-hover:text-brandYellow transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-brandBlue mb-3">{language === 'bn' ? item.titleBn : item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{language === 'bn' ? item.descBn : item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. IMPACT STORY (SPLIT SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-brandBlue rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <Icons.Quote className="w-12 h-12 text-brandYellow/30 mb-6" />
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-snug mb-6">
              {t(
                "\"After the devastating cyclone washed away our trawler, the bereavement pension saved my family from starvation. Today, my children are back in school.\"",
                "\"বিধ্বংসী ঘূর্ণিঝড়ে আমাদের ট্রলার ভেসে যাওয়ার পর, শোক ভাতা আমার পরিবারকে অনাহার থেকে রক্ষা করেছে। আজ, আমার ছেলেমেয়েরা আবার স্কুলে ফিরেছে।\""
              )}
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-300 overflow-hidden">
                <img src="/images/about-placeholder.png" alt="Story" className="w-full h-full object-cover grayscale" />
              </div>
              <div>
                <p className="text-white font-bold">{t("Fatema Begum", "ফাতেমা বেগম")}</p>
                <p className="text-brandYellow text-sm">{t("Beneficiary, Patuakhali", "সুবিধাভোগী, পটুয়াখালী")}</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative min-h-[300px]">
            <img src="/images/programs-placeholder.png" alt="Impact" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 5. PROCESS TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brandBlue text-center mb-12">
          {t("Emergency Response Protocol", "জরুরি প্রতিক্রিয়া প্রোটোকল")}
        </h2>
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-4 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-slate-200 z-0"></div>
          
          {[
            { step: "01", title: "Crisis Alert", titleBn: "সংকট সতর্কতা", desc: "Coast Guard signals impending cyclonic threats.", descBn: "কোস্ট গার্ড আসন্ন ঘূর্ণিঝড়ের সংকেত দেয়।" },
            { step: "02", title: "Fund Allocation", titleBn: "তহবিল বরাদ্দ", desc: "Immediate unfreezing of disaster relief funds.", descBn: "জরুরি ত্রাণ তহবিল তাৎক্ষণিক ছাড়করণ।" },
            { step: "03", title: "Logistics Dispatch", titleBn: "লজিস্টিক প্রেরণ", desc: "Dry rations and medical kits sent to shelters.", descBn: "আশ্রয়কেন্দ্রে শুকনো রেশন এবং মেডিকেল কিট প্রেরণ।" },
            { step: "04", title: "Rehabilitation", titleBn: "পুনর্বাসন", desc: "Post-storm financial grants for rebuilding homes.", descBn: "ঘরবাড়ি পুনর্নির্মাণের জন্য ঝড়-পরবর্তী আর্থিক অনুদান।" }
          ].map((item, idx) => (
            <div key={idx} className="relative z-10 flex-1 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-brandBlue shadow-lg flex items-center justify-center text-2xl font-black text-brandBlue font-mono mb-6">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-brandBlue mb-2">{language === 'bn' ? item.titleBn : item.title}</h3>
              <p className="text-slate-600 text-sm max-w-xs">{language === 'bn' ? item.descBn : item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-brandYellow/20 rounded-md p-10 md:p-14 text-center border border-brandYellow/30">
          <h2 className="text-3xl font-serif font-bold text-brandBlue mb-4">
            {t("Support Our Welfare Initiatives", "আমাদের কল্যাণমূলক উদ্যোগে সহায়তা করুন")}
          </h2>
          <p className="text-brandBlue/80 text-lg mb-8 max-w-xl mx-auto">
            {t("Your contribution directly impacts the lives of coastal families struggling against natural disasters.", "আপনার অবদান সরাসরি প্রাকৃতিক দুর্যোগের বিরুদ্ধে লড়াইরত উপকূলীয় পরিবারের জীবনে প্রভাব ফেলে।")}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-brandBlue text-white px-8 py-4 rounded-md font-bold hover:bg-brandBlue/90 transition-colors shadow-lg hover:shadow-xl">
            {t("Partner With Us", "আমাদের সাথে যুক্ত হোন")}
            <Icons.ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
