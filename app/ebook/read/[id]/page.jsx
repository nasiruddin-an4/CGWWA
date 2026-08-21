'use client';

import React, { useState, useEffect, use } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useDbData } from '@/hooks/useDbData';
import Link from 'next/link';

const PdfViewer = dynamic(() => import('@/components/ebook/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-full">
      <Loader2 className="w-12 h-12 text-brandBlue animate-spin mb-4" />
      <p className="text-slate-500 font-medium">Initializing Digital Reader...</p>
    </div>
  )
});

export default function ReadEbookPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const { data: ebooks, loading: dbLoading } = useDbData('ebooks', []);
  const [ebook, setEbook] = useState(null);

  useEffect(() => {
    if (!dbLoading && ebooks.length > 0) {
      const found = ebooks.find(e => e._id === id);
      setEbook(found);
    }
  }, [dbLoading, ebooks, id]);

  if (dbLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <Loader2 className="w-12 h-12 text-brandBlue animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading database records...</p>
      </div>
    );
  }

  if (!ebook || !ebook.pdfUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">E-Book Not Found</h2>
        <p className="text-slate-500 mb-8">The requested digital publication could not be found or has no PDF attached.</p>
        <Link href="/ebook" className="px-6 py-3 bg-brandBlue text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#1a365d] transition-colors">
          <ArrowLeft size={18} /> Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <PdfViewer ebook={ebook} />
    </div>
  );
}
