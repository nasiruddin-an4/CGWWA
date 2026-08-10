"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function CommunityDevelopmentPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-slate-900 max-w-7xl mx-auto rounded-md mt-8 lg:mt-12 shadow-xl">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="/images/programs-placeholder.png" alt="Infrastructure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Icons.Building2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold tracking-widest uppercase text-emerald-400">
                {t("Core Initiative", "মূল উদ্যোগ")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight">
              {t("Community Infrastructure", "কমিউনিটি অবকাঠামো")}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              {t("Building resilient, sustainable infrastructure including multi-purpose cyclone shelters, clean water desalination plants, and solar grids.", "বহুমুখী ঘূর্ণিঝড় আশ্রয়কেন্দ্র, বিশুদ্ধ পানির প্ল্যান্ট এবং সৌর গ্রিডসহ টেকসই অবকাঠামো নির্মাণ।")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. INFRASTRUCTURE STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-md p-8 lg:p-12 shadow-xl border border-slate-100 mt-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {[
              { value: "124", label: "Cyclone Shelters Built", labelBn: "নির্মিত আশ্রয়কেন্দ্র" },
              { value: "86", label: "Desalination Plants", labelBn: "পানি বিশুদ্ধকরণ প্ল্যান্ট" },
              { value: "215", label: "Solar Micro-Grids", labelBn: "সৌর মাইক্রো-গ্রিড" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0">
                <span className="text-5xl font-black text-slate-800 font-mono mb-2">{stat.value}</span>
                <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">{language === 'bn' ? stat.labelBn : stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MASONRY GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">
              {t("Resilient Architecture", "টেকসই স্থাপত্য")}
            </h2>
            <p className="text-slate-600 text-lg">
              {t("Our shelters are engineered to withstand category 5 cyclonic winds while serving as primary schools during peace time.", "আমাদের আশ্রয়কেন্দ্রগুলো ক্যাটাগরি ৫ ঘূর্ণিঝড় সহ্য করার মতো শক্তিশালী এবং স্বাভাবিক সময়ে প্রাথমিক বিদ্যালয় হিসেবে কাজ করে।")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px] rounded-md overflow-hidden relative group">
            <img src="/images/programs-placeholder.png" alt="Shelter" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end p-8">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase mb-3 inline-block">Bagerhat</span>
                <h3 className="text-2xl font-serif font-bold text-white">{t("Multi-Purpose Cyclone Shelter", "বহুমুখী ঘূর্ণিঝড় আশ্রয়কেন্দ্র")}</h3>
              </div>
            </div>
          </div>
          <div className="h-[400px] rounded-md overflow-hidden relative group">
            <img src="/images/programs-placeholder.png" alt="Solar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end p-8">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold uppercase mb-3 inline-block">Bhola</span>
                <h3 className="text-xl font-serif font-bold text-white">{t("Solar Micro-Grid Installation", "সৌর মাইক্রো-গ্রিড স্থাপন")}</h3>
              </div>
            </div>
          </div>
          <div className="h-[300px] rounded-md overflow-hidden relative group">
            <img src="/images/programs-placeholder.png" alt="Water" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end p-8">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-bold uppercase mb-3 inline-block">Satkhira</span>
                <h3 className="text-xl font-serif font-bold text-white">{t("Desalination Plant", "পানি বিশুদ্ধকরণ প্ল্যান্ট")}</h3>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 h-[300px] rounded-md overflow-hidden relative group bg-emerald-900 p-10 flex flex-col justify-center">
            <Icons.Sprout className="w-12 h-12 text-emerald-400 mb-6" />
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              {t("Sustainable Materials", "টেকসই নির্মাণ সামগ্রী")}
            </h3>
            <p className="text-emerald-100 max-w-lg">
              {t("We utilize locally sourced, salt-resistant materials and elevated foundational pilings to combat rising sea levels and soil salinity.", "আমরা সমুদ্রপৃষ্ঠের উচ্চতা বৃদ্ধি এবং মাটির লবণাক্ততা রোধে স্থানীয়ভাবে সংগৃহীত, লবণ-প্রতিরোধী সামগ্রী ব্যবহার করি।")}
            </p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-12">
        <div className="bg-slate-100 rounded-md p-10 md:p-14 text-center border border-slate-200">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">
            {t("Help Us Build Safer Coasts", "নিরাপদ উপকূল গড়তে সাহায্য করুন")}
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            {t("Every brick laid is a life saved during a storm. Partner with us to fund the next cyclone shelter.", "ঝড়ের সময় প্রতিটি ইট একটি জীবন বাঁচায়। পরবর্তী আশ্রয়কেন্দ্র নির্মাণে আমাদের সাথে অংশীদার হোন।")}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-md font-bold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl">
            {t("Become a Partner", "অংশীদার হোন")}
            <Icons.ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
