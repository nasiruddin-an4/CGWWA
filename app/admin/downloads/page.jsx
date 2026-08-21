'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, Download as DownloadIcon } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/downloads');
      const data = await res.json();
      if (data.success) setDownloads(data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this download.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    await fetch(`/api/admin/downloads/${id}`, { method: 'DELETE' });
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-brandBlue" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-serif">Downloads Management</h1>
        <p className="text-slate-500 mt-1">Manage downloadable documents, forms, and publications.</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-sm font-semibold text-slate-900">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-900">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-900">File Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {downloads.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No downloads found.</td></tr>
            ) : (
              downloads.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 text-sm">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.fileType} ({item.fileSize})</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(item._id)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
