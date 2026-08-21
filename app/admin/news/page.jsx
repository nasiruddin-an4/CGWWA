'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Loader2, Search, Filter, Newspaper, MoreVertical } from 'lucide-react';
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/admin/news');
      const data = await res.json();
      if (data.success) {
        setNews(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this news article.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchNews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif tracking-tight flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-brandBlue" />
            Manage News
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Create, update, and organize official press releases.</p>
        </div>
        <Link 
          href="/admin/news/create" 
          className="group flex items-center justify-center gap-2 bg-brandBlue text-white px-5 py-3 rounded-xl hover:bg-brandBlue/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Publish News</span>
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search articles by title or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-brandBlue transition-all text-sm font-semibold w-full sm:w-auto justify-center">
          <Filter className="w-4 h-4" />
          Filters
        </button>
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
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Article Info</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Category</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider">Published Date</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredNews.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                          <Newspaper className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-slate-900 font-bold text-lg mb-1">No articles found</h3>
                        <p className="text-slate-500 text-sm">We couldn't find anything matching your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredNews.map((item) => (
                    <tr key={item._id} className="group hover:bg-brandBlue/[0.02] transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm relative group-hover:shadow-md transition-shadow">
                            <img 
                              src={item.featuredImage || 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248375/cgfwa/compressed_1787248375040_CHQ07299_wovle1.jpg'} 
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-brandBlue transition-colors">{item.title}</div>
                            <div className="text-xs text-slate-400 mt-1 line-clamp-1">{item.titleBn}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold tracking-wide">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-medium text-slate-700">{item.publishedAt}</div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/admin/news/edit/${item._id}`} 
                            className="p-2 text-slate-400 hover:text-brandBlue hover:bg-brandBlue/10 rounded-lg transition-all"
                            title="Edit Article"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Article"
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
