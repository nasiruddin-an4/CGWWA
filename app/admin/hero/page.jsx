'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Loader2, MonitorPlay } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminHeroPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/admin/hero');
      const data = await res.json();
      if (data.success) {
        setBanners(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this hero banner.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    
    try {
      const res = await fetch(`/api/admin/hero/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchBanners();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif tracking-tight flex items-center gap-3">
            <MonitorPlay className="w-8 h-8 text-brandBlue" />
            Manage Hero Section
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Create, update, and reorder hero banners on the homepage.</p>
        </div>
        <Link 
          href="/admin/hero/create" 
          className="group flex items-center justify-center gap-2 bg-brandBlue text-white px-5 py-3 rounded-xl hover:bg-brandBlue/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Add New Banner</span>
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50">
            <Loader2 className="w-10 h-10 animate-spin text-brandBlue mb-4" />
            <p className="text-slate-500 font-medium animate-pulse">Loading database records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Banner Content</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Link</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {banners.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <MonitorPlay className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-slate-900 font-bold text-lg mb-1">No banners found</h3>
                        <p className="text-slate-500 text-sm">Get started by creating a new banner.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  banners.map((item) => (
                    <tr key={item._id} className="group hover:bg-brandBlue/[0.02] transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm relative group-hover:shadow-md transition-shadow">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-brandBlue transition-colors">{item.title}</div>
                            <div className="text-xs text-slate-400 mt-1 line-clamp-1">{item.desc}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium tracking-wide">
                          {item.link || 'None'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/admin/hero/edit/${item._id}`} 
                            className="p-2 text-slate-400 hover:text-brandBlue hover:bg-brandBlue/10 rounded-lg transition-all"
                            title="Edit Banner"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Banner"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
