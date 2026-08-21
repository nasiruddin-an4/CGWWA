'use client';

import React, { use } from 'react';
import { ProgramForm } from '@/components/admin/forms/ProgramForm';
import { useDbData } from '@/hooks/useDbData';
import { Loader2 } from 'lucide-react';

export default function EditProgramPage({ params }) {
  const { id } = use(params);
  const { data: programs, loading } = useDbData('programs', []);

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  }

  const program = programs.find(p => p.id === id);

  if (!program && !loading) {
    return <div className="p-10 text-center text-slate-500 font-bold">Program not found!</div>;
  }

  return (
    <div className="space-y-6">
      <ProgramForm initialData={program} />
    </div>
  );
}
