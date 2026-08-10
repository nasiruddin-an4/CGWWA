'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ImageGallery } from '@/components/ImageGallery';

export default function GalleryPage() {
  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      <PageHeader
        title="Institutional Media & Photo Archives"
        titleBn="ছবি ও ভিডিও গ্যালারি"
        subtitle="Visual documentation of coastal welfare drives, emergency relief distributions, and community development projects."
        subtitleBn="উপকূলীয় চিকিৎসা বহর, মেধা উপবৃত্তি বিতরণ ও সাইক্লোন পরবর্তী সাহায্য কার্যক্রমের আলোকচিত্র।" />
      

      <ImageGallery />
    </div>);

};