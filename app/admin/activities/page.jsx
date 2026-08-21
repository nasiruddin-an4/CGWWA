'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/activities');
      const data = await res.json();
      if (data.success) setActivities(data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this activity category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    await fetch(`/api/admin/activities/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">Activities Management</h1>
          <p className="text-slate-500 mt-1">Manage activities and their sub-events.</p>
        </div>
        <Link 
          href="/admin/activities/create" 
          className="flex items-center gap-2 bg-brandBlue text-white px-4 py-2 rounded-lg hover:bg-brandBlue/90 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Activity</span>
        </Link>
      </div>
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item._id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{item.shortDesc}</p>
                <p className="text-xs text-brandBlue mt-2 font-semibold">{item.events?.length || 0} sub-events</p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <Link href={`/admin/activities/edit/${item._id}`} className="text-xs text-slate-500 hover:text-brandBlue flex items-center gap-1">
                  <Edit2 className="w-3 h-3" /> Edit
                </Link>
                <button onClick={() => handleDelete(item._id)} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
            {item.events?.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                {item.events.map((evt, i) => (
                  <div key={i} className="text-xs bg-slate-50 p-3 rounded-lg">
                    <span className="font-semibold text-slate-700">{evt.title}</span>
                    <span className="text-slate-400 ml-2">({evt.photos?.length || 0} photos)</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {activities.length === 0 && <p className="text-slate-500 text-center py-8">No activities found.</p>}
      </div>
    </div>
  );
}
