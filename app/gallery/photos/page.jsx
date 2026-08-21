"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import { useDbData } from "@/hooks/useDbData";
import * as Icons from "lucide-react";

export default function PhotoGalleryPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Modal State
  const [activeEvent, setActiveEvent] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Extract unique categories
  const { data: photoGallery } = useDbData('gallery_photos', []);
  const categories = ["All", ...new Set(photoGallery.map((item) => item.category))];

  // Filter photos based on category
  const filteredPhotos = selectedCategory === "All"
    ? photoGallery
    : photoGallery.filter((photo) => photo.category === selectedCategory);

  const openModal = (eventData) => {
    setActiveEvent(eventData);
    setActiveImageIndex(0);
  };

  const closeModal = () => {
    setActiveEvent(null);
    setActiveImageIndex(0);
  };

  const activeImages = activeEvent?.images?.length > 0 
    ? activeEvent.images 
    : (activeEvent?.url ? [activeEvent.url] : []);

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
      
      <PageHeader
        title="Photo Gallery"
        titleBn="ফটো গ্যালারি"
        subtitle="Visual records of our community outreach, welfare distribution, and organizational events."
        subtitleBn="আমাদের জনকল্যাণমূলক কার্যক্রম, ত্রাণ বিতরণ ও প্রাতিষ্ঠানিক ইভেন্টসমূহের চিত্রশালা।"
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

      {/* Photos Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="bg-white rounded-md p-16 text-center border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.Image className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">
            {t("No photos found for this category.", "এই ক্যাটাগরির জন্য কোনো ছবি পাওয়া যায়নি।")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openModal(photo)}
              className="group relative bg-white rounded-md shadow-md hover:shadow-xl transition-shadow duration-500 overflow-hidden cursor-pointer border border-slate-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay (Appears on Hover) */}
                <div className="absolute inset-0 bg-brandBlue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Icons.Images className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 delay-100" />
                  <span className="absolute bottom-6 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                    {t("View Gallery", "গ্যালারি দেখুন")} ({photo.images?.length || 1})
                  </span>
                </div>
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-white/90 backdrop-blur-md text-brandBlue text-[10px] font-bold tracking-widest uppercase shadow-sm">
                  {photo.category}
                </span>
              </div>

              {/* Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-brandBlue text-lg mb-2 leading-snug group-hover:text-brandBlue/80 transition-colors">
                    {language === "bn" ? photo.titleBn : photo.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {language === "bn" ? photo.descriptionBn : photo.description}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Icons.Calendar className="w-3.5 h-3.5 text-slate-300" />
                    {photo.date}
                  </span>
                  <span className="flex items-center gap-1.5 truncate ml-4">
                    <Icons.MapPin className="w-3.5 h-3.5 text-slate-300" />
                    <span className="truncate">{photo.location}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Lightbox */}
      {activeEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm cursor-pointer"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content Wrapper */}
          <div className="relative z-10 w-full max-w-6xl bg-black rounded-md shadow-2xl overflow-hidden flex flex-col max-h-full">
            
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-20 flex justify-between items-start pointer-events-none">
              <div className="text-white max-w-2xl pointer-events-auto">
                <h3 className="text-xl sm:text-2xl font-bold font-serif mb-1">
                  {language === "bn" ? activeEvent.titleBn : activeEvent.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {activeImages.length} {t("Photos", "ছবি")} • {activeEvent.location}
                </p>
              </div>
              
              <button 
                onClick={closeModal}
                className="pointer-events-auto bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md transition-colors"
              >
                <Icons.X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Large Image */}
            <div className="relative flex-1 min-h-[40vh] md:min-h-[60vh] flex items-center justify-center bg-black group/mainimg">
              <img 
                src={activeImages[activeImageIndex]} 
                alt="Gallery" 
                className="max-w-full max-h-[70vh] object-contain transition-opacity duration-300"
              />
              
              {/* Navigation Arrows */}
              {activeImageIndex > 0 && (
                <button 
                  onClick={() => setActiveImageIndex(prev => prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-brandBlue text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/mainimg:opacity-100"
                >
                  <Icons.ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {activeImageIndex < (activeImages.length - 1) && (
                <button 
                  onClick={() => setActiveImageIndex(prev => prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-brandBlue text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/mainimg:opacity-100"
                >
                  <Icons.ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Thumbnails Strip */}
            {activeImages.length > 1 && (
              <div className="bg-slate-900 border-t border-white/10 p-4">
                <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2">
                  {activeImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden transition-all ${
                        activeImageIndex === idx 
                          ? "ring-2 ring-brandYellow ring-offset-2 ring-offset-slate-900 opacity-100" 
                          : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}

    </div>
  );
}
