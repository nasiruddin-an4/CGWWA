"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import { useDbData } from "@/hooks/useDbData";
import * as Icons from "lucide-react";
import Link from "next/link";

export default function NewsArticlePage({ params }) {
  const { language, t } = useLanguage();
  const { slug } = use(params);
  const { data: dbNews, loading } = useDbData('news', []);

  // Find the article by slug
  const article = dbNews.find((n) => n.slug === slug);

  if (loading) {
    return <div className="flex justify-center p-20"><Icons.Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  }

  if (!article && !loading) {
    notFound();
  }

  return (
    <div className="pb-24">

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden bg-brandBlue max-w-7xl mx-auto rounded-xl shadow-2xl border border-white/10 group">
        <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-50 transition-opacity duration-700">
          <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-b from-brandBlue/90 via-brandBlue/60 to-brandBlue/95 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-brandYellow text-slate-900 text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(245,238,49,0.3)]">
              {language === 'bn' ? article.categoryBn : article.category}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest flex items-center gap-2">
              <Icons.Calendar className="w-3.5 h-3.5 text-brandYellow" />
              {article.publishedAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-[1.25] text-white mb-6 drop-shadow-lg max-w-4xl mx-auto">
            {language === 'bn' ? article.titleBn : article.title}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium max-w-3xl mx-auto drop-shadow">
            {language === 'bn' ? article.excerptBn : article.excerpt}
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <section className="container mx-auto px-4 sm:px-8 z-20 mt-12 lg:mt-16">
        <div className="bg-white rounded-md p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100">

          {/* Author & Meta Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-8 mb-10 gap-6">

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-md bg-brandBlue/5 flex items-center justify-center border border-brandBlue/10 shadow-sm">
                <Icons.User className="w-6 h-6 text-brandBlue" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">{t("Published By", "প্রকাশক")}</p>
                <p className="font-bold text-slate-800 text-lg">{article.author}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-md hover:bg-brandYellow/10 hover:text-brandBlue hover:border-brandYellow/30 transition-colors cursor-default">
                  #{tag}
                </span>
              ))}
            </div>

          </div>

          {/* Article Body */}
          <article className="prose prose-slate prose-lg max-w-none 
            prose-headings:font-serif prose-headings:text-brandBlue prose-headings:font-bold 
            prose-p:text-slate-600 prose-p:leading-loose prose-p:mb-8
            prose-a:text-brandBlue prose-a:font-semibold hover:prose-a:text-brandYellow
            prose-strong:text-slate-800 prose-strong:font-bold
            prose-li:text-slate-600">
            {(language === 'bn' ? article.contentBn : article.content).map((para, idx) => (
              <p key={idx} className="text-lg md:text-xl text-slate-600 leading-[1.8] mb-8">{para}</p>
            ))}
          </article>

          {/* Footer Actions */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link href="/news" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-50 text-slate-700 font-bold rounded-md hover:bg-brandBlue hover:text-brandYellow transition-colors shadow-sm w-full sm:w-auto group">
              <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {t("Back to News", "সব সংবাদ দেখুন")}
            </Link>

            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-600 font-bold rounded-md hover:bg-slate-50 transition-colors shadow-sm" title="Share Article">
                <Icons.Share2 className="w-4 h-4" />
                <span className="sm:hidden text-sm">Share</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-600 font-bold rounded-md hover:bg-slate-50 transition-colors shadow-sm" title="Print Article">
                <Icons.Printer className="w-4 h-4" />
                <span className="sm:hidden text-sm">Print</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
