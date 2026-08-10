"use client";

import React from "react";
import { notFound } from "next/navigation";
import { flagshipPrograms } from "@/data/programs";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function ProgramDetailPage({ params }) {
  const { language, t } = useLanguage();
  const { slug } = React.use(params);
  
  // Find the program by slug
  const program = flagshipPrograms.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  const Icon = Icons[program.iconName] || Icons.FileText;

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-brandBlue max-w-7xl mx-auto rounded-md mt-8 lg:mt-12 shadow-xl border border-brandBlue/20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brandBlue/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Icon className="w-5 h-5 text-brandYellow" />
            <span className="text-sm font-bold tracking-widest uppercase text-brandYellow">
              {program.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white mb-6">
            {language === 'bn' ? program.titleBn : program.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
            {language === 'bn' ? program.shortDescBn : program.shortDesc}
          </p>
        </div>
      </section>

      {/* 2. QUICK STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-md p-6 lg:p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row justify-around items-center gap-6 mt-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brandYellow/10 flex items-center justify-center text-brandYellowDark">
              <Icons.Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase">{t("Target Beneficiaries", "লক্ষ্য সুবিধাভোগী")}</p>
              <p className="text-xl font-black text-brandBlue">{program.beneficiariesTarget}</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-200"></div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brandYellow/10 flex items-center justify-center text-brandYellowDark">
              <Icons.Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase">{t("Program Status", "প্রকল্পের অবস্থা")}</p>
              <p className="text-xl font-black text-brandBlue">{program.status}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Description */}
          <div className="lg:w-2/3 space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
                {t("Program Overview", "প্রকল্পের বিবরণ")}
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                {(language === 'bn' ? program.fullDescBn : program.fullDesc).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4 mt-12">
                {t("Key Objectives", "মূল উদ্দেশ্য")}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(language === 'bn' ? program.keyObjectivesBn : program.keyObjectives).map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-md border border-slate-100">
                    <Icons.CheckCircle2 className="w-6 h-6 text-brandYellowDark flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-brandBlue rounded-md p-8 shadow-xl text-white">
              <h3 className="text-2xl font-serif font-bold mb-6">
                {t("Impact Highlights", "প্রভাবের সারসংক্ষেপ")}
              </h3>
              <div className="space-y-6">
                {program.impactHighlights.map((highlight, idx) => (
                  <div key={idx}>
                    <p className="text-slate-300 text-sm mb-1">{highlight.label}</p>
                    <p className="text-3xl font-black text-brandYellow">{highlight.value}</p>
                    {idx < program.impactHighlights.length - 1 && <div className="h-px bg-white/10 mt-4"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-md p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Icons.MapPin className="w-5 h-5 text-brandYellowDark" />
                {t("Operating Districts", "কর্ম এলাকা")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {program.districtsInvolved.map((district, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-sm font-medium text-slate-600 shadow-sm">
                    {district}
                  </span>
                ))}
              </div>
            </div>

            <Link href="/programs" className="flex items-center justify-center gap-2 w-full bg-white text-brandBlue border-2 border-brandBlue px-6 py-4 rounded-md font-bold hover:bg-brandBlue hover:text-white transition-colors text-center">
              <Icons.ArrowLeft className="w-5 h-5" />
              {t("Back to All Programs", "সব প্রকল্পে ফিরে যান")}
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
