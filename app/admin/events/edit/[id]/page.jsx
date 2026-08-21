'use client';

import React, { use } from 'react';
import { EventForm } from '@/components/admin/forms/EventForm';
import { useDbData } from '@/hooks/useDbData';
import { Loader2 } from 'lucide-react';

export default function EditEventPage({ params }) {
  const { id } = use(params);
  const { data: events, loading } = useDbData('events', []);

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  }

  const eventItem = events.find(e => e.id === id);

  if (!eventItem && !loading) {
    return <div className="p-10 text-center text-slate-500 font-bold">Event not found!</div>;
  }

  return (
    <div className="space-y-6">
      <EventForm initialData={eventItem} />
    </div>
  );
}
