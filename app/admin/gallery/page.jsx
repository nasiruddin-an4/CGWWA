'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (data.success) setPhotos(data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this gallery item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">Gallery Management</h1>
          <p className="text-slate-500 mt-1">Manage photo gallery items.</p>
        </div>
        <Link 
          href="/admin/gallery/create" 
          className="flex items-center gap-2 bg-brandBlue text-white px-4 py-2 rounded-lg hover:bg-brandBlue/90 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((item) => (
          <div key={item._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group">
            <div className="h-40 bg-slate-100">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 text-sm truncate">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{item.category} • {item.date}</p>
              <div className="mt-3 flex items-center justify-between">
                <Link href={`/admin/gallery/edit/${item._id}`} className="text-xs text-slate-500 hover:text-brandBlue flex items-center gap-1">
                  <Edit2 className="w-3 h-3" /> Edit
                </Link>
                <button onClick={() => handleDelete(item._id)} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {photos.length === 0 && <p className="text-slate-500 col-span-3 text-center py-8">No gallery items found.</p>}
      </div>
    </div>
  );
}
