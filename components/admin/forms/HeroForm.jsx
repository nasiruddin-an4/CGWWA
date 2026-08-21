'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function HeroForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    titleBn: initialData?.titleBn || '',
    desc: initialData?.desc || '',
    descBn: initialData?.descBn || '',
    link: initialData?.link || '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const editId = initialData?.id || initialData?._id;
      const url = initialData ? `/api/admin/hero/${editId}` : '/api/admin/hero';
      const method = initialData ? 'PUT' : 'POST';

      const formDataObj = new FormData();
      formDataObj.append('data', JSON.stringify(formData));
      
      if (imageFile) {
        formDataObj.append('image', imageFile);
      }

      const res = await fetch(url, {
        method,
        body: formDataObj,
      });

      const result = await res.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to save hero banner');
      }

      router.push('/admin/hero');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 font-serif">
          {initialData ? 'Edit Hero Banner' : 'Add Hero Banner'}
        </h2>
        <Link href="/admin/hero" className="text-slate-500 hover:text-slate-700 flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to List
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Title (English) *</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Title (Bengali)</label>
          <input type="text" name="titleBn" value={formData.titleBn} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Description (English) *</label>
          <textarea required name="desc" value={formData.desc} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all resize-none"></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Description (Bengali)</label>
          <textarea name="descBn" value={formData.descBn} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all resize-none"></textarea>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-slate-700">Button Link</label>
          <input type="text" name="link" value={formData.link} onChange={handleChange} placeholder="/about or https://..." className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-slate-700">Background Image *</label>
          <div className="flex flex-col gap-3">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              required={!initialData}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brandBlue/5 file:text-brandBlue hover:file:bg-brandBlue/10" 
            />
            {imagePreview && (
              <div className="w-full aspect-[21/9] relative rounded-lg overflow-hidden border border-slate-200 md:w-1/2 bg-black/10">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
        <Link href="/admin/hero" className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
          Cancel
        </Link>
        <button disabled={loading} type="submit" className="px-6 py-3 rounded-lg font-bold text-white bg-brandBlue hover:bg-brandBlue/90 transition-colors flex items-center gap-2 shadow-md">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {initialData ? 'Update Banner' : 'Save Banner'}
        </button>
      </div>

    </form>
  );
}
