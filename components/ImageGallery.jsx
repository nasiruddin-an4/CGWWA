'use client';

import { useState } from 'react';
import { X, ZoomIn, Calendar, MapPin } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { useDbData } from '@/hooks/useDbData';

export const ImageGallery = () => {
  const { language, t } = useLanguage();
  const { data: photos } = useDbData('gallery_photos', []);
  const { data: videos } = useDbData('gallery_videos', []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    'All',
    'Education & Youth',
    'Healthcare Camps',
    'Women Empowerment',
    'Disaster Relief',
    'Official Ceremonies',
  ];

  const filteredPhotos = photos.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-md border border-slate-200">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              activeTab === 'photos'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('Photo Gallery', 'ছবি গ্যালারি')} ({photos.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              activeTab === 'videos'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('Video Gallery', 'ভিডিও গ্যালারি')} ({videos.length})
          </button>
        </div>

        {activeTab === 'photos' && (
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-emerald-400 border border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeTab === 'photos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 text-slate-900 shadow-lg"><ZoomIn className="w-5 h-5 text-emerald-800" /></div>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm group-hover:text-emerald-800 line-clamp-2">{language === 'bn' ? item.titleBn : item.title}</h4>
                  {item.description && <p className="text-xs text-slate-500 line-clamp-2 mt-1">{language === 'bn' ? item.descriptionBn : item.description}</p>}
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-600" />{item.location}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((vid) => (
            <div key={vid.id} className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm">
              <div className="relative aspect-video bg-slate-950">
                <iframe src={vid.url} title={vid.title} className="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-slate-900 text-base mb-1">{language === 'bn' ? vid.titleBn : vid.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">{language === 'bn' ? vid.descriptionBn : vid.description}</p>
                <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2">
                  <span>{vid.location}</span><span>{vid.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 text-white rounded-md overflow-hidden shadow-2xl border border-slate-800">
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] bg-slate-950 flex items-center justify-center">
              <img src={selectedItem.url} alt={selectedItem.title} className="max-h-[70vh] w-auto max-w-full object-contain" />
            </div>
            <div className="p-6 bg-slate-900">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 inline-block mb-2">{selectedItem.category}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{language === 'bn' ? selectedItem.titleBn : selectedItem.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{language === 'bn' ? selectedItem.descriptionBn : selectedItem.description}</p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-400" />{selectedItem.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-400" />{selectedItem.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
