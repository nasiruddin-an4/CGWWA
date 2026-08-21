'use client';

import React, { use } from 'react';
import { GalleryForm } from '@/components/admin/forms/GalleryForm';
import { useDbData } from '@/hooks/useDbData';
import { Loader2 } from 'lucide-react';

export default function EditGalleryPage({ params }) {
  const { id } = use(params);
  const { data: photos, loading } = useDbData('gallery_photos', []);

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  }

  const photo = photos.find(p => p.id === id);

  if (!photo && !loading) {
    return <div className="p-10 text-center text-slate-500 font-bold">Photo not found!</div>;
  }

  return (
    <div className="space-y-6">
      <GalleryForm initialData={photo} />
    </div>
  );
}
