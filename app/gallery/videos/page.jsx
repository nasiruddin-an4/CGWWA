"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { videoGallery } from "@/data/gallery";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "lucide-react";

export default function VideoGalleryPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories
  const categories = ["All", ...new Set(videoGallery.map((item) => item.category))];

  // Filter videos based on category
  const filteredVideos = selectedCategory === "All"
    ? videoGallery
    : videoGallery.filter((video) => video.category === selectedCategory);

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      <PageHeader
        title="Video Gallery"
        titleBn="ভিডিও গ্যালারি"
        subtitle="Watch our documentaries, event highlights, and stories from the coastal communities."
        subtitleBn="আমাদের প্রামাণ্যচিত্র, ইভেন্টের সারাংশ এবং উপকূলীয় জনগোষ্ঠীর গল্পগুলো দেখুন।"
      />

      {/* Filter Bar */}
      <div className="bg-white rounded-md p-4 sm:p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-md text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-brandBlue text-brandYellow shadow-md"
                  : "bg-slate-50 text-slate-500 hover:text-brandBlue hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="bg-white rounded-md p-16 text-center border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.Video className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">
            {t("No videos found for this category.", "এই ক্যাটাগরির জন্য কোনো ভিডিও পাওয়া যায়নি।")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-white rounded-md shadow-md hover:shadow-xl transition-shadow duration-500 overflow-hidden border border-slate-100 flex flex-col h-full"
            >
              {/* Video Embed Container */}
              <div className="relative w-full pb-[56.25%] bg-slate-900">
                <iframe
                  src={video.url}
                  title={language === "bn" ? video.titleBn : video.title}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
                {/* Category Badge overlaying the iframe (pointer-events-none so it doesn't block clicks) */}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-white/90 backdrop-blur-md text-brandBlue text-[10px] font-bold tracking-widest uppercase shadow-sm pointer-events-none">
                  {video.category}
                </span>
              </div>

              {/* Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-brandBlue text-xl mb-3 leading-snug group-hover:text-brandBlue/80 transition-colors">
                    {language === "bn" ? video.titleBn : video.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {language === "bn" ? video.descriptionBn : video.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Icons.Calendar className="w-3.5 h-3.5 text-slate-300" />
                    {video.date}
                  </span>
                  <span className="flex items-center gap-1.5 truncate ml-4">
                    <Icons.MapPin className="w-3.5 h-3.5 text-slate-300" />
                    <span className="truncate">{video.location}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
