'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Edit2, Trash2, MoreVertical, LayoutGrid, List as ListIcon } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/programs');
      const data = await res.json();
      if (data.success) setPrograms(data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this program.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    await fetch(`/api/admin/programs/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-serif">Programs Management</h1>
        <p className="text-slate-500 mt-1">Manage flagship welfare programs.</p>
      </div>
      <div className="space-y-4">
        {programs.map((item) => (
          <div key={item._id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-brandBlue uppercase tracking-wider">{item.category}</span>
                <h3 className="font-bold text-slate-900 mt-1">{item.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{item.shortDesc}</p>
                <span className={`inline-block mt-2 text-xs font-bold px-2 py-1 rounded ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {item.status}
                </span>
              </div>
              <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {programs.length === 0 && <p className="text-slate-500 text-center py-8">No programs found.</p>}
      </div>
    </div>
  );
}
