'use client';

import React, { use } from 'react';
import { ActivityForm } from '@/components/admin/forms/ActivityForm';
import { useDbData } from '@/hooks/useDbData';
import { Loader2 } from 'lucide-react';

export default function EditActivityPage({ params }) {
  const { id } = use(params);
  const { data: activities, loading } = useDbData('activities', []);

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  }

  const activity = activities.find(a => a.id === id);

  if (!activity && !loading) {
    return <div className="p-10 text-center text-slate-500 font-bold">Activity not found!</div>;
  }

  return (
    <div className="space-y-6">
      <ActivityForm initialData={activity} />
    </div>
  );
}
