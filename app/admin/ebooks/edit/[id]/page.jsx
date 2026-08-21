'use client';

import React, { useEffect, useState, use } from 'react';
import { EbookForm } from '@/components/admin/forms/EbookForm';
import { Loader2 } from 'lucide-react';

export default function EditEbookPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEbook = async () => {
      try {
        const res = await fetch('/api/admin/ebooks');
        const data = await res.json();
        if (data.success) {
          const item = data.data.find(b => b._id === id);
          if (item) setInitialData(item);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEbook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brandBlue" />
      </div>
    );
  }

  if (!initialData) {
    return <div className="text-center py-12 text-slate-500">E-Book not found.</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <EbookForm initialData={initialData} />
    </div>
  );
}
