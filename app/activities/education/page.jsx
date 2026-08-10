"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function EducationPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-brandBlue max-w-7xl mx-auto rounded-md mt-8 lg:mt-12 shadow-xl border border-brandBlue/20">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src="/images/programs-placeholder.png" alt="Education" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brandBlue/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Icons.BookOpen className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold tracking-widest uppercase text-amber-400">
                {t("Core Initiative", "মূল উদ্যোগ")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight">
              {t("Education & Literacy", "শিক্ষা ও সাক্ষরতা")}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl">
              {t("Eradicating illiteracy in remote fishing villages through merit scholarships, book distribution, and innovative floating digital classrooms.", "মেধা বৃত্তি, বই বিতরণ এবং উদ্ভাবনী ভাসমান ডিজিটাল ক্লাসরুমের মাধ্যমে দুর্গম জেলে পল্লীতে নিরক্ষরতা দূরীকরণ।")}
            </p>
          </div>
        </div>
      </section>

      {/* 2. EDUCATION DASHBOARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-md shadow-2xl border border-slate-100 overflow-hidden mt-8 relative z-20 flex flex-col lg:flex-row">
          <div className="lg:w-1/3 bg-brandYellow/10 p-10 flex flex-col justify-center">
            <h3 className="text-3xl font-serif font-bold text-brandBlue mb-4">{t("Our Impact", "আমাদের প্রভাব")}</h3>
            <p className="text-slate-600 mb-8">{t("Education is the most powerful tool to break the cycle of poverty in coastal regions.", "উপকূলীয় অঞ্চলে দারিদ্র্যের চক্র ভাঙার সবচেয়ে শক্তিশালী হাতিয়ার হলো শিক্ষা।")}</p>
            <Link href="/programs/coastal-education-scholarship" className="inline-flex items-center gap-2 text-brandBlue font-bold hover:text-brandYellowDark transition-colors">
              {t("View CESP Program", "সিইএসপি প্রোগ্রাম দেখুন")} <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:w-2/3 p-10 grid grid-cols-2 gap-8">
            {[
              { value: "10,000+", label: "Active Scholarships", labelBn: "সক্রিয় বৃত্তি" },
              { value: "12", label: "Floating Schools", labelBn: "ভাসমান বিদ্যালয়" },
              { value: "+15%", label: "Literacy Rate Boost", labelBn: "সাক্ষরতার হার বৃদ্ধি" },
              { value: "25k", label: "Book Bundles Distributed", labelBn: "বই বিতরণ" }
            ].map((stat, idx) => (
              <div key={idx}>
                <span className="text-4xl font-black text-brandBlue font-mono block mb-1">{stat.value}</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{language === 'bn' ? stat.labelBn : stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SCHOLARSHIP JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 py-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brandBlue">
            {t("The Scholarship Journey", "বৃত্তির যাত্রা")}
          </h2>
          <p className="text-slate-600 text-lg">
            {t("How a student from a remote coastal family achieves higher education through our support.", "আমাদের সহায়তার মাধ্যমে কীভাবে একটি দুর্গম উপকূলীয় পরিবারের শিক্ষার্থী উচ্চশিক্ষা অর্জন করে।")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Identification", titleBn: "শনাক্তকরণ", desc: "Local volunteers identify meritorious students from low-income fishing families.", descBn: "স্থানীয় স্বেচ্ছাসেবকরা নিম্ন আয়ের জেলে পরিবারের মেধাবী শিক্ষার্থীদের শনাক্ত করে।", icon: "Search" },
            { step: "2", title: "Sponsorship", titleBn: "স্পন্সরশিপ", desc: "Students are matched with sponsors who cover full tuition and boarding.", descBn: "শিক্ষার্থীদের স্পন্সরদের সাথে যুক্ত করা হয় যারা সম্পূর্ণ টিউশন এবং থাকা-খাওয়ার খরচ বহন করে।", icon: "HandCoins" },
            { step: "3", title: "Mentorship", titleBn: "মেন্টরশিপ", desc: "Regular academic tracking and career counseling from CGFWA officers.", descBn: "সিজিএফডব্লিউএ কর্মকর্তাদের কাছ থেকে নিয়মিত একাডেমিক ট্র্যাকিং এবং ক্যারিয়ার কাউন্সেলিং।", icon: "GraduationCap" },
            { step: "4", title: "Graduation", titleBn: "স্নাতক", desc: "Students graduate university and return to empower their coastal communities.", descBn: "শিক্ষার্থীরা বিশ্ববিদ্যালয় থেকে স্নাতক হয় এবং তাদের উপকূলীয় সম্প্রদায়কে ক্ষমতায়ন করতে ফিরে আসে।", icon: "Award" }
          ].map((item, idx) => {
            const Icon = Icons[item.icon];
            return (
              <div key={idx} className="relative bg-slate-50 rounded-md p-8 border border-slate-100 hover:border-brandYellow transition-colors group">
                <div className="absolute -top-4 -right-4 text-7xl font-black text-slate-200 group-hover:text-brandYellow/20 transition-colors z-0 pointer-events-none">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brandBlue mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-brandBlue mb-2">{language === 'bn' ? item.titleBn : item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{language === 'bn' ? item.descBn : item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FLOATING CLASSROOMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-brandBlue rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 opacity-10">
            <Icons.Ship className="w-96 h-96 text-white" />
          </div>
          <div className="lg:w-1/2 relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              {t("Floating Digital Classrooms", "ভাসমান ডিজিটাল ক্লাসরুম")}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {t("For extremely remote riverine communities in the Sundarbans and Bhola, land-based schools are inaccessible. We have introduced solar-powered boats equipped with satellite internet, computers, and dedicated teachers that travel from island to island.", "সুন্দরবন এবং ভোলার অত্যন্ত দুর্গম নদীমাতৃক সম্প্রদায়ের জন্য, স্থলভিত্তিক স্কুলগুলো দুর্গম। আমরা ইন্টারনেট, কম্পিউটার এবং নিবেদিতপ্রাণ শিক্ষকদের নিয়ে সৌরচালিত নৌকা চালু করেছি যা এক দ্বীপ থেকে অন্য দ্বীপে ঘুরে শিক্ষা প্রদান করে।")}
            </p>
            <ul className="space-y-4">
              {[
                { text: "Solar-powered satellite internet", textBn: "সৌরচালিত স্যাটেলাইট ইন্টারনেট" },
                { text: "Onboard mini-library & laptops", textBn: "অনবোর্ড মিনি-লাইব্রেরি এবং ল্যাপটপ" },
                { text: "Reaches 5 different islands weekly", textBn: "সাপ্তাহিক ৫টি ভিন্ন দ্বীপে পৌঁছায়" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 rounded-full bg-brandYellow flex items-center justify-center shrink-0">
                    <Icons.Check className="w-4 h-4 text-brandBlue" />
                  </div>
                  <span className="font-medium">{language === 'bn' ? item.textBn : item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 relative z-10">
            <div className="rounded-md overflow-hidden border-4 border-white/20 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="/images/programs-placeholder.png" alt="Floating School" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 mt-12">
        <div className="bg-amber-50 rounded-md p-10 md:p-14 text-center border border-amber-200">
          <h2 className="text-3xl font-serif font-bold text-brandBlue mb-4">
            {t("Sponsor a Student's Future", "একজন শিক্ষার্থীর ভবিষ্যৎ স্পন্সর করুন")}
          </h2>
          <p className="text-slate-700 text-lg mb-8 max-w-xl mx-auto">
            {t("Your sponsorship can cover the tuition, books, and boarding for a talented coastal student for an entire year.", "আপনার স্পন্সরশিপ একজন মেধাবী উপকূলীয় শিক্ষার্থীর সারা বছরের টিউশন, বই এবং থাকার খরচ বহন করতে পারে।")}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-brandBlue text-white px-8 py-4 rounded-md font-bold hover:bg-brandBlue/90 transition-colors shadow-lg hover:shadow-xl">
            {t("Become a Sponsor", "স্পন্সর হোন")}
            <Icons.ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
