'use client';

import React, { use, useEffect, useState } from 'react';
import { HeroForm } from '@/components/admin/forms/HeroForm';
import { Loader2 } from 'lucide-react';

export default function EditHeroPage({ params }) {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/hero')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          const banner = result.data.find(b => b._id === id || b.id === id);
          setData(banner);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-brandBlue" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-xl font-bold text-slate-700">Banner not found!</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <HeroForm initialData={data} />
    </div>
  );
}
