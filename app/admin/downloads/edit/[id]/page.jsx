'use client';

import React, { use } from 'react';
import { DownloadForm } from '@/components/admin/forms/DownloadForm';
import { useDbData } from '@/hooks/useDbData';
import { Loader2 } from 'lucide-react';

export default function EditDownloadPage({ params }) {
  const { id } = use(params);
  const { data: downloads, loading } = useDbData('downloads', []);

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  }

  const doc = downloads.find(d => d.id === id);

  if (!doc && !loading) {
    return <div className="p-10 text-center text-slate-500 font-bold">Document not found!</div>;
  }

  return (
    <div className="space-y-6">
      <DownloadForm initialData={doc} />
    </div>
  );
}
