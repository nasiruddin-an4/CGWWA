'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function NewsForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.featuredImage || '');

  // Helper to join array into newline separated string for textarea
  const joinArray = (arr) => (Array.isArray(arr) ? arr.join('\n\n') : '');
  // Helper to split string into array by newline
  const splitString = (str) => str.split('\n').map(s => s.trim()).filter(Boolean);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    titleBn: initialData?.titleBn || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    categoryBn: initialData?.categoryBn || '',
    publishedAt: initialData?.publishedAt || '',
    author: initialData?.author || '',
    excerpt: initialData?.excerpt || '',
    excerptBn: initialData?.excerptBn || '',
    tags: initialData?.tags?.join(', ') || '',
    content: joinArray(initialData?.content),
    contentBn: joinArray(initialData?.contentBn),
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

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      content: splitString(formData.content),
      contentBn: splitString(formData.contentBn),
    };

    try {
      const editId = initialData?.id || initialData?._id;
      const url = initialData ? `/api/admin/news/${editId}` : '/api/admin/news';
      const method = initialData ? 'PUT' : 'POST';

      const formDataObj = new FormData();
      formDataObj.append('data', JSON.stringify(payload));
      
      if (imageFile) {
        formDataObj.append('image', imageFile);
      }

      const res = await fetch(url, {
        method,
        body: formDataObj,
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to save news article');
      }

      router.push('/admin/news');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">

      <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 font-serif">
          {initialData ? 'Edit News Article' : 'Create News Article'}
        </h2>
        <Link href="/admin/news" className="text-slate-500 hover:text-slate-700 flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to List
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Title English */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Title (English) *</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        {/* Title Bengali */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Title (Bengali)</label>
          <input type="text" name="titleBn" value={formData.titleBn} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Slug (URL-friendly) *</label>
          <input required type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. new-welfare-program" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        {/* Published At */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Published Date *</label>
          <input required type="text" name="publishedAt" value={formData.publishedAt} onChange={handleChange} placeholder="e.g. August 24, 2026" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        {/* Category English */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Category (English) *</label>
          <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        {/* Category Bengali */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Category (Bengali)</label>
          <input type="text" name="categoryBn" value={formData.categoryBn} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        {/* Author */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Author</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        {/* Featured Image */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Featured Image *</label>
          <div className="flex flex-col gap-3">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              required={!initialData}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brandBlue/5 file:text-brandBlue hover:file:bg-brandBlue/10" 
            />
            {imagePreview && (
              <div className="w-full h-32 relative rounded-lg overflow-hidden border border-slate-200">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">Tags (Comma separated)</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. Welfare, Health, Community" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Excerpt (English) *</label>
          <textarea required name="excerpt" value={formData.excerpt} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Excerpt (Bengali)</label>
          <textarea name="excerptBn" value={formData.excerptBn} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Full Content (English) - Double newlines for paragraphs</label>
          <textarea required name="content" value={formData.content} onChange={handleChange} rows="8" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Full Content (Bengali)</label>
          <textarea name="contentBn" value={formData.contentBn} onChange={handleChange} rows="8" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
        <Link href="/admin/news" className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
          Cancel
        </Link>
        <button disabled={loading} type="submit" className="px-6 py-3 rounded-lg font-bold text-white bg-brandBlue hover:bg-brandBlue/90 transition-colors flex items-center gap-2 shadow-md">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {initialData ? 'Update Article' : 'Save Article'}
        </button>
      </div>

    </form>
  );
}
