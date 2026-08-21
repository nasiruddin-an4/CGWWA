'use client';

import React from 'react';
import { HeroForm } from '@/components/admin/forms/HeroForm';

export default function CreateHeroPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <HeroForm />
    </div>
  );
}
