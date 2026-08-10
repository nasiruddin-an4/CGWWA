'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { downloadsList } from '@/data/downloads';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, Download, Calendar, Search, HardDrive } from 'lucide-react';

export default function DownloadsPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Annual Reports', 'Forms & Applications', 'Notices & Circulars', 'Guidelines & Acts', 'Publications & Journals'];

  const filteredDownloads = downloadsList.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      <PageHeader
        title="Publications & Download Center"
        titleBn="প্রকাশনা ও ডাউনলোড সেন্টার"
        subtitle="Access official forms, scholarship applications, circulars, and annual reports."
        subtitleBn="অনুমোদিত আবেদন ফরম, শিক্ষাবৃত্তি নির্দেশিকা, গ্যাজেট নোটিশ ও বার্ষিক রিপোর্ট।" />
      

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-md p-4 sm:p-6 border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) =>
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
            selectedCategory === cat ?
            'bg-brandYellow text-white shadow-xs' :
            'bg-[#F8F9FA] text-[#8E9299] hover:text-brandBlue hover:bg-slate-200/60'}`
            }>
            
              {cat === 'All' ? t('All Documents', 'সকল নথি') : cat}
            </button>
          )}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-[#8E9299] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search documents...', 'নথি খুঁজুন...')}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FA] border border-[#E5E7EB] rounded-full text-xs text-brandBlue focus:outline-none focus:ring-2 focus:ring-brandYellow/30" />
          
        </div>
      </div>

      {/* Downloads List */}
      <div className="space-y-4">
        {filteredDownloads.map((item) =>
        <div
          key={item.id}
          className="bg-white rounded-md border border-[#E5E7EB] p-5 shadow-xs hover:border-brandYellow transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-brandYellow/10 border border-brandYellow/20 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-brandBlue" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-brandBlue text-white text-[10px] font-bold uppercase tracking-wider font-mono">
                    {item.refNo}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                    {language === 'bn' ? item.categoryBn : item.category}
                  </span>
                </div>

                <h3 className="font-serif font-semibold text-brandBlue text-base leading-snug">
                  {language === 'bn' ? item.titleBn : item.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-[#8E9299] pt-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-brandBlue" />
                    {item.publishDate}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <HardDrive className="w-3.5 h-3.5 text-brandBlue" />
                    {item.fileType} • {item.fileSize}
                  </span>
                </div>
              </div>
            </div>

            <button
            onClick={() => alert(`Downloading: ${item.title}`)}
            className="px-4 py-2.5 rounded-full bg-brandYellow text-white text-xs font-semibold hover:bg-[#00523c] transition-colors flex items-center gap-2 shrink-0 self-end sm:self-center shadow-xs cursor-pointer">
            
              <Download className="w-4 h-4" />
              <span>{t('Download PDF', 'ডাউনলোড')}</span>
            </button>
          </div>
        )}
      </div>
    </div>);

};