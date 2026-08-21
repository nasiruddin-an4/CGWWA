'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Edit2, Plus, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function AdminLeadershipPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/leadership')
      .then(res => res.json())
      .then(d => { if (d.success) setData(d.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;
  if (!data) return <p className="text-slate-500 text-center py-8">Failed to load leadership data.</p>;

  const handleDelete = async (type, id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this member.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    try {
      await fetch(`/api/admin/leadership/${type}/${id}`, { method: 'DELETE' });
      // Refresh page
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const CommitteeTable = ({ title, type, members }) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">{title} ({members.length})</h3>
        <Link href={`/admin/leadership/create?type=${type}`} className="text-xs text-brandBlue hover:text-brandBlue/80 flex items-center gap-1 font-bold">
          <Plus className="w-3 h-3" /> Add
        </Link>
      </div>
      <div className="divide-y divide-slate-100">
        {members.map((m) => (
          <div key={m._id} className="flex items-center gap-4 px-6 py-3">
            <img src={m.photo} alt={m.name} className="w-10 h-10 rounded-full object-cover bg-slate-100" />
            <div>
              <p className="font-medium text-sm text-slate-900">{m.name}</p>
              <p className="text-xs text-slate-500">{m.designation}</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Link href={`/admin/leadership/edit/${type}/${m._id}`} className="text-slate-400 hover:text-brandBlue transition-colors">
                <Edit2 className="w-4 h-4" />
              </Link>
              <button onClick={() => handleDelete(type, m._id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">Leadership Management</h1>
          <p className="text-slate-500 mt-1">View and manage organizational leadership data.</p>
        </div>
      </div>

      {/* President */}
      {data.president && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center gap-6">
          <img src={data.president.photo} alt={data.president.name} className="w-20 h-20 rounded-full object-cover bg-slate-100" />
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{data.president.name}</h3>
            <p className="text-sm text-brandBlue font-semibold">{data.president.designation}</p>
          </div>
          <div className="ml-auto">
            <Link href={`/admin/leadership/edit/leadership/president`} className="text-slate-400 hover:text-brandBlue transition-colors flex items-center gap-2 text-sm font-bold bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
              <Edit2 className="w-4 h-4" /> Edit President
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommitteeTable title="Central Committee" type="central_committee" members={data.centralCommittee || []} />
        <CommitteeTable title="Zone Chairmen" type="zone_chairmen" members={data.zoneChairmen || []} />
        <CommitteeTable title="Dhaka Committee" type="dhaka_committee" members={data.dhakaCommittee || []} />
        <CommitteeTable title="Ladies Club Dhaka Committee" type="lc_dhaka_committee" members={data.lcDhakaCommittee || []} />
      </div>
    </div>
  );
}
