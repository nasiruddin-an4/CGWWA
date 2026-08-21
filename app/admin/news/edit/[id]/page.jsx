'use client';

import React, { use } from 'react';
import { NewsForm } from '@/components/admin/forms/NewsForm';
import { useDbData } from '@/hooks/useDbData';
import { Loader2 } from 'lucide-react';

export default function EditNewsPage({ params }) {
  const { id } = use(params);
  const { data: news, loading } = useDbData('news', []);

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  }

  const article = news.find(n => n.id === id);

  if (!article && !loading) {
    return <div className="p-10 text-center text-slate-500 font-bold">Article not found!</div>;
  }

  return (
    <div className="space-y-6">
      <NewsForm initialData={article} />
    </div>
  );
}
