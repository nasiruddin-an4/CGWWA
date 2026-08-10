"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function HealthcarePage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-slate-50 max-w-7xl mx-auto rounded-md mt-8 lg:mt-12 shadow-xl border border-slate-200">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="/images/programs-placeholder.png" alt="Healthcare" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-6 text-slate-800">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-200">
              <Icons.Stethoscope className="w-5 h-5 text-red-600" />
              <span className="text-sm font-bold tracking-widest uppercase text-red-600">
                {t("Core Initiative", "মূল উদ্যোগ")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-brandBlue leading-tight">
              {t("Healthcare & Medical Fleet", "স্বাস্থ্যসেবা ও মেডিকেল ফ্লিট")}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
              {t("Deploying specialized mobile watercraft to deliver emergency surgery, maternal care, and free medicines to remote islanders.", "দ্বীপবাসীদের জরুরি অস্ত্রোপচার, মাতৃকালীন সেবা এবং বিনামূল্যে ওষুধ সরবরাহের জন্য বিশেষায়িত মোবাইল নৌযান মোতায়েন।")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. FLEET STATS (OVERLAPPING) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-brandBlue rounded-md p-8 shadow-2xl border border-brandBlue mt-8 relative z-20 overflow-hidden">
          {/* Subtle medical cross background pattern */}
          <div className="absolute -right-20 -top-20 opacity-5">
            <Icons.Plus className="w-96 h-96 text-white" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "6", label: "Floating Hospital Ships", labelBn: "ভাসমান হাসপাতাল জাহাজ" },
              { value: "1.2M+", label: "Patients Treated", labelBn: "চিকিৎসাপ্রাপ্ত রোগী" },
              { value: "4,500", label: "Free Surgeries Performed", labelBn: "বিনামূল্যে অস্ত্রোপচার" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0 text-white">
                <span className="text-5xl font-black font-mono mb-2">{stat.value}</span>
                <span className="text-sm font-bold text-brandYellow uppercase tracking-wider">{language === 'bn' ? stat.labelBn : stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MEDICAL FLEET CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 pt-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brandBlue">
              {t("Inside the Floating Hospitals", "ভাসমান হাসপাতালের ভেতরে")}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t("Access to specialized healthcare is a major challenge for isolated coastal communities. To bridge this gap, CGWWA operates a state-of-the-art Mobile Medical Fleet.", "বিচ্ছিন্ন উপকূলীয় জনগোষ্ঠীর জন্য বিশেষায়িত স্বাস্থ্যসেবা পাওয়া একটি বড় চ্যালেঞ্জ। এই ব্যবধান ঘোচাতে, সিজিডব্লিউডব্লিউএ একটি অত্যাধুনিক মোবাইল মেডিকেল ফ্লিট পরিচালনা করে।")}
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                { title: "Mini-Operation Theaters", titleBn: "মিনি-অপারেশন থিয়েটার", desc: "Fully equipped for emergency surgeries and cataract removals.", descBn: "জরুরি অস্ত্রোপচার এবং ছানি অপসারণের জন্য সম্পূর্ণ সজ্জিত।", icon: "Activity" },
                { title: "Maternal Care Units", titleBn: "মাতৃকালীন সেবা ইউনিট", desc: "Providing safe deliveries and pre/post-natal checkups.", descBn: "নিরাপদ প্রসব এবং প্রাক/প্রসবোত্তর চেকআপ প্রদান।", icon: "Baby" },
                { title: "Diagnostic Labs", titleBn: "ডায়াগনস্টিক ল্যাব", desc: "Onboard blood testing, ultrasonography, and pathology.", descBn: "অনবোর্ড রক্ত পরীক্ষা, আল্ট্রাসনোগ্রাফি এবং প্যাথলজি।", icon: "Microscope" }
              ].map((item, idx) => {
                const Icon = Icons[item.icon];
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brandBlue text-lg">{language === 'bn' ? item.titleBn : item.title}</h4>
                      <p className="text-slate-500 text-sm">{language === 'bn' ? item.descBn : item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <img src="/images/programs-placeholder.png" alt="Medical 1" className="w-full h-48 object-cover rounded-md shadow-lg" />
                <img src="/images/programs-placeholder.png" alt="Medical 2" className="w-full h-64 object-cover rounded-md shadow-lg" />
              </div>
              <div className="space-y-4">
                <img src="/images/programs-placeholder.png" alt="Medical 3" className="w-full h-64 object-cover rounded-md shadow-lg" />
                <div className="bg-red-600 rounded-md p-6 shadow-lg h-48 flex flex-col justify-center items-center text-center text-white">
                  <Icons.HeartPulse className="w-10 h-10 mb-2 opacity-80" />
                  <span className="font-serif font-bold text-xl">{t("Saving Lives at Sea", "সমুদ্রে জীবন বাঁচানো")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HEALTH CAMPS (FULL WIDTH) */}
      <section className="bg-slate-900 text-white py-20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              {t("Specialized Health Camps", "বিশেষায়িত স্বাস্থ্য ক্যাম্প")}
            </h2>
            <p className="text-slate-400 text-lg">
              {t("Beyond the floating hospitals, we organize massive onshore medical camps for seasonal outbreaks and specialized treatments.", "ভাসমান হাসপাতালের বাইরেও, আমরা মৌসুমী প্রাদুর্ভাব এবং বিশেষায়িত চিকিৎসার জন্য বিশাল স্বাস্থ্য ক্যাম্পের আয়োজন করি।")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Free Eye Care & Cataract", titleBn: "বিনামূল্যে চক্ষু সেবা এবং ছানি", icon: "Eye", desc: "Thousands of elderly coastal residents regain their sight annually through our free cataract surgery camps.", descBn: "আমাদের বিনামূল্যে ছানি অস্ত্রোপচার ক্যাম্পের মাধ্যমে প্রতি বছর হাজার হাজার বয়স্ক উপকূলীয় বাসিন্দা তাদের দৃষ্টিশক্তি ফিরে পান।" },
              { title: "Epidemic Response", titleBn: "মহামারী প্রতিক্রিয়া", icon: "ShieldPlus", desc: "Rapid deployment of medical teams during cholera and waterborne disease outbreaks after cyclones.", descBn: "ঘূর্ণিঝড়ের পর কলেরা এবং পানিবাহিত রোগের প্রাদুর্ভাবের সময় মেডিকেল টিমের দ্রুত মোতায়েন।" },
              { title: "Free Medicine Dispensation", titleBn: "বিনামূল্যে ওষুধ বিতরণ", icon: "Pill", desc: "Providing essential medicines, antibiotics, and vitamins free of cost to impoverished communities.", descBn: "দরিদ্র সম্প্রদায়কে বিনামূল্যে প্রয়োজনীয় ওষুধ, অ্যান্টিবায়োটিক এবং ভিটামিন সরবরাহ করা।" }
            ].map((camp, idx) => {
              const Icon = Icons[camp.icon];
              return (
                <div key={idx} className="bg-slate-800 rounded-md p-8 border border-slate-700 hover:border-red-500/50 transition-colors group">
                  <div className="w-14 h-14 rounded-md bg-slate-700 flex items-center justify-center text-red-400 mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{language === 'bn' ? camp.titleBn : camp.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{language === 'bn' ? camp.descBn : camp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-12">
        <div className="bg-red-50 rounded-md p-10 md:p-14 text-center border border-red-100 shadow-sm">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">
            {t("Support Our Medical Fleet", "আমাদের মেডিকেল ফ্লিটকে সহায়তা করুন")}
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            {t("Your donations help us buy essential medicines, fuel the hospital ships, and perform life-saving surgeries for those in extreme poverty.", "আপনার অনুদান আমাদের প্রয়োজনীয় ওষুধ কিনতে, হাসপাতাল জাহাজগুলোতে জ্বালানি সরবরাহ করতে এবং চরম দারিদ্র্যের মধ্যে থাকা মানুষের জীবন রক্ষাকারী অস্ত্রোপচার করতে সাহায্য করে।")}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-md font-bold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
            {t("Donate Medical Supplies", "চিকিৎসা সামগ্রী দান করুন")}
            <Icons.ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
