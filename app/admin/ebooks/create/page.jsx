'use client';

import React from 'react';
import { EbookForm } from '@/components/admin/forms/EbookForm';

export default function CreateEbookPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <EbookForm />
    </div>
  );
}
