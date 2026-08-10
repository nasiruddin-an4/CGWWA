"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function WomenEmpowermentPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-rose-950 max-w-7xl mx-auto rounded-md mt-8 lg:mt-12 shadow-xl border border-rose-900/50">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="/images/programs-placeholder.png" alt="Women Empowerment" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-rose-950/70 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Icons.Users className="w-5 h-5 text-rose-300" />
              <span className="text-sm font-bold tracking-widest uppercase text-rose-300">
                {t("Core Initiative", "মূল উদ্যোগ")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight">
              {t("Women Empowerment", "নারী ক্ষমতায়ন")}
            </h1>
            <p className="text-lg md:text-xl text-rose-100 leading-relaxed max-w-2xl">
              {t("Transforming coastal women into micro-entrepreneurs through vocational training, handloom hubs, and zero-interest loans.", "বৃত্তিমূলক প্রশিক্ষণ, তাঁত হাব এবং শূন্য-সুদের ঋণের মাধ্যমে উপকূলীয় নারীদের ক্ষুদ্র উদ্যোক্তায় রূপান্তর।")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATS & MICRO-FINANCE INTRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-md p-8 lg:p-12 shadow-2xl border border-slate-100 mt-8 relative z-20 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-serif font-bold text-slate-800">
              {t("Independence Through Skill", "দক্ষতার মাধ্যমে স্বনির্ভরতা")}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t("When you empower a coastal woman, you secure the future of an entire family. Our Women Artisans & Micro-Livelihood Project (WAML) is the cornerstone of our empowerment strategy.", "আপনি যখন একজন উপকূলীয় নারীকে ক্ষমতায়ন করেন, তখন আপনি একটি পুরো পরিবারের ভবিষ্যত সুরক্ষিত করেন। আমাদের নারী কারিগর ও ক্ষুদ্র জীবিকা প্রকল্প আমাদের ক্ষমতায়ন কৌশলের মূলভিত্তি।")}
            </p>
            <div className="flex gap-4 pt-4">
              <div className="bg-rose-50 rounded-md p-4 flex-1 text-center border border-rose-100">
                <span className="block text-3xl font-black text-rose-600 mb-1">18,500</span>
                <span className="text-xs font-bold text-slate-600 uppercase">{t("Women Trained", "প্রশিক্ষিত নারী")}</span>
              </div>
              <div className="bg-rose-50 rounded-md p-4 flex-1 text-center border border-rose-100">
                <span className="block text-3xl font-black text-rose-600 mb-1">12 Cr</span>
                <span className="text-xs font-bold text-slate-600 uppercase">{t("Micro-Loans (BDT)", "ক্ষুদ্র-ঋণ (টাকা)")}</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-rose-100 rounded-full blur-3xl opacity-50"></div>
            <img src="/images/programs-placeholder.png" alt="Empowerment" className="relative z-10 w-full h-80 object-cover rounded-[2rem] shadow-lg border-4 border-white" />
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-md shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center text-white">
                <Icons.TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{t("Economic Growth", "অর্থনৈতিক প্রবৃদ্ধি")}</p>
                <p className="text-xs text-slate-500">{t("Sustainable Income", "টেকসই আয়")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VOCATIONAL HUBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 py-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">
            {t("Vocational Training Hubs", "বৃত্তিমূলক প্রশিক্ষণ হাব")}
          </h2>
          <p className="text-slate-600 text-lg">
            {t("We establish local vocational hubs where women are trained in high-demand trades, equipping them with the tools they need.", "আমরা স্থানীয় বৃত্তিমূলক হাব স্থাপন করি যেখানে নারীদের উচ্চ-চাহিদাসম্পন্ন ট্রেডে প্রশিক্ষণ দেওয়া হয় এবং প্রয়োজনীয় সরঞ্জাম সরবরাহ করা হয়।")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Tailoring & Garments",
              titleBn: "সেলাই ও পোশাক",
              desc: "6-month intensive training on modern sewing machines, pattern making, and commercial garment production.",
              descBn: "আধুনিক সেলাই মেশিন, প্যাটার্ন তৈরি এবং বাণিজ্যিক পোশাক উৎপাদনের ওপর ৬ মাসের নিবিড় প্রশিক্ষণ।",
              icon: "Scissors"
            },
            {
              title: "Handloom Weaving",
              titleBn: "তাঁত বুনন",
              desc: "Reviving traditional coastal handlooms. We provide the raw materials and looms required to start weaving.",
              descBn: "ঐতিহ্যবাহী উপকূলীয় তাঁতের পুনরুজ্জীবন। বুনন শুরু করার জন্য প্রয়োজনীয় কাঁচামাল এবং তাঁত সরবরাহ করা হয়।",
              icon: "Baseline"
            },
            {
              title: "Coastal Agriculture",
              titleBn: "উপকূলীয় কৃষি",
              desc: "Training on saline-tolerant crops, homestead poultry, and modern aquaculture for alternative income.",
              descBn: "লবণাক্ততা-সহনশীল ফসল, বাড়ির হাঁস-মুরগি এবং বিকল্প আয়ের জন্য আধুনিক জলজ চাষের ওপর প্রশিক্ষণ।",
              icon: "Wheat"
            }
          ].map((hub, idx) => {
            const Icon = Icons[hub.icon] || Icons.Circle;
            return (
              <div key={idx} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 hover:shadow-lg transition-all group hover:-translate-y-2">
                <div className="w-16 h-16 rounded-md bg-white shadow-sm flex items-center justify-center text-rose-500 mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{language === 'bn' ? hub.titleBn : hub.title}</h3>
                <p className="text-slate-600 leading-relaxed">{language === 'bn' ? hub.descBn : hub.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SUCCESS STORIES */}
      <section className="bg-rose-50 py-20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">
                {t("Voices of Empowerment", "ক্ষমতায়নের কণ্ঠস্বর")}
              </h2>
              <p className="text-slate-600 text-lg">
                {t("Real stories from women who have rewritten their destinies.", "নিজেদের ভাগ্য বদলানো নারীদের বাস্তব গল্প।")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Rahima Khatun",
                nameBn: "রহিমা খাতুন",
                location: "Barguna",
                locationBn: "বরগুনা",
                story: "After losing my husband to a storm, I had no income. The CGWWA sewing machine and training allowed me to open a small tailoring shop. Today, I employ three other women from my village.",
                storyBn: "ঝড়ে স্বামীকে হারানোর পর আমার কোনো আয় ছিল না। সিজিডব্লিউডব্লিউএ-এর সেলাই মেশিন এবং প্রশিক্ষণ আমাকে একটি ছোট টেইলারিং শপ খুলতে সাহায্য করেছে। আজ, আমি আমার গ্রামের আরও তিন নারীকে চাকরি দিয়েছি।"
              },
              {
                name: "Ayesha Siddiqa",
                nameBn: "আয়েশা সিদ্দিকা",
                location: "Cox's Bazar",
                locationBn: "কক্সবাজার",
                story: "The zero-interest micro-loan helped me buy saline-resistant seeds and poultry. I now earn a steady income and can afford to send both my daughters to school without taking exploitative loans.",
                storyBn: "শূন্য-সুদের ক্ষুদ্র-ঋণ আমাকে লবণ-প্রতিরোধী বীজ এবং হাঁস-মুরগি কিনতে সাহায্য করেছে। আমি এখন একটি স্থির আয় করি এবং শোষক ঋণ না নিয়েই আমার দুই মেয়েকে স্কুলে পাঠাতে পারি।"
              }
            ].map((story, idx) => (
              <div key={idx} className="bg-white rounded-md p-8 lg:p-10 shadow-sm border border-slate-100 relative">
                <Icons.Quote className="absolute top-8 right-8 w-12 h-12 text-rose-100" />
                <p className="text-lg text-slate-700 italic leading-relaxed mb-8 relative z-10">
                  "{language === 'bn' ? story.storyBn : story.story}"
                </p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div className="w-12 h-12 rounded-full bg-rose-200 overflow-hidden">
                    <img src="/images/about-placeholder.png" alt={story.name} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{language === 'bn' ? story.nameBn : story.name}</h4>
                    <p className="text-sm text-slate-500">{language === 'bn' ? story.locationBn : story.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-16">
        <div className="bg-rose-900 rounded-md p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Icons.Heart className="w-full h-full text-white transform scale-150" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              {t("Fund a Micro-Business", "একটি ক্ষুদ্র-ব্যবসার অর্থায়ন করুন")}
            </h2>
            <p className="text-rose-200 text-lg mb-8 max-w-xl mx-auto">
              {t("Your donation provides sewing machines, looms, and seed capital to women ready to start their entrepreneurial journey.", "আপনার অনুদান এমন নারীদের সেলাই মেশিন, তাঁত এবং বীজ মূলধন প্রদান করে যারা তাদের উদ্যোক্তা যাত্রা শুরু করতে প্রস্তুত।")}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-rose-900 px-8 py-4 rounded-md font-bold hover:bg-rose-50 transition-colors shadow-lg hover:shadow-xl">
              {t("Donate Now", "এখনই দান করুন")}
              <Icons.ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
