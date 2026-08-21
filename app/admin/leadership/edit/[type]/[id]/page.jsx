'use client';

import React, { use, useState, useEffect } from 'react';
import { LeadershipForm } from '@/components/admin/forms/LeadershipForm';
import { Loader2 } from 'lucide-react';

export default function EditLeadershipPage({ params }) {
  const { type, id } = use(params);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/leadership')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  }

  // Find the specific member
  let member = null;
  if (data) {
    if (type === 'leadership' && id === 'president') {
      member = data.president;
    } else {
      // Find in the correct array based on type mapping
      let arrayName = '';
      if (type === 'central_committee') arrayName = 'centralCommittee';
      else if (type === 'zone_chairmen') arrayName = 'zoneChairmen';
      else if (type === 'dhaka_committee') arrayName = 'dhakaCommittee';
      else if (type === 'lc_dhaka_committee') arrayName = 'lcDhakaCommittee';

      if (arrayName && data[arrayName]) {
        member = data[arrayName].find(m => (m._id === id || m.id === id));
      }
    }
  }

  if (!member) {
    return <div className="p-10 text-center text-slate-500 font-bold">Member not found!</div>;
  }

  return (
    <div className="space-y-6">
      <LeadershipForm initialData={member} collection={type} />
    </div>
  );
}
