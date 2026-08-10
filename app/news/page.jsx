"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { newsArticles } from "@/data/news";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import Link from "next/link";

export default function NewsPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Education", "Healthcare", "Relief & Welfare", "Community", "Official Notice", "Environment"];

  const filteredNews = newsArticles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      <PageHeader
        title="News & Press Releases"
        titleBn="সংবাদ ও প্রেস বিজ্ঞপ্তি"
        subtitle="Official updates, field reports, and press releases from CGFWA headquarters."
        subtitleBn="সিজিএফডব্লিউএ হেডকোয়ার্টার্স থেকে প্রকাশিত সংবাদ, ফিল্ড রিপোর্ট ও প্রেস নোটিশ।"
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-md p-4 sm:p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-brandBlue text-brandYellow shadow-md"
                  : "bg-slate-50 text-slate-500 hover:text-brandBlue hover:bg-slate-100"
              }`}
            >
              {cat === "All" ? t("All News", "সকল সংবাদ") : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Search news...", "সংবাদ খুঁজুন...")}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-4 focus:ring-brandYellow/20 focus:border-brandYellow transition-all"
          />
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="bg-white rounded-md p-16 text-center border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">
            {t("No news articles found matching your query.", "আপনার অনুসন্ধানের সাথে মিল রেখে কোনো সংবাদ পাওয়া যায়নি।")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <Link
              href={`/news/${article.slug}`}
              key={article.id}
              className="bg-white rounded-md border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden group"
            >
              <div className="relative h-56 overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>

              <div className="p-6 pt-8 flex-1 flex flex-col justify-between space-y-6 relative">
                
                {/* Floating Date Badge */}
                <div className="absolute -top-6 right-6 bg-brandYellow text-slate-900 rounded-md px-4 py-2 text-center shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                   <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 border-b border-slate-900/10 pb-1 mb-1">
                     {article.publishedAt.split(' ')[1]}
                   </div>
                   <div className="text-xl font-black leading-none">
                     {article.publishedAt.split(' ')[0]}
                   </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-brandBlue tracking-widest uppercase">
                    {language === "bn" ? article.categoryBn : article.category}
                  </span>
                  <h3 className="font-serif font-bold text-slate-800 text-xl leading-snug group-hover:text-brandBlue transition-colors duration-300">
                    {language === "bn" ? article.titleBn : article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {language === "bn" ? article.excerptBn : article.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-300" />
                    {article.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brandBlue group-hover:text-brandYellow transition-colors">
                    {t("Read Story", "বিস্তারিত")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}