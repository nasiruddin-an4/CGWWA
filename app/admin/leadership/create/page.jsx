'use client';

import React, { Suspense } from 'react';
import { LeadershipForm } from '@/components/admin/forms/LeadershipForm';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function CreateLeadershipFormContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'central_committee';

  return <LeadershipForm collection={type} />;
}

export default function CreateLeadershipPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>}>
        <CreateLeadershipFormContent />
      </Suspense>
    </div>
  );
}
