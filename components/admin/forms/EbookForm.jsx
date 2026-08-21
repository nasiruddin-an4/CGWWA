'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft, FileText, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { createEbookAction, updateEbookAction } from '@/app/actions/ebookActions';

export function EbookForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(initialData?.coverImage || '');
  
  const [pdfFile, setPdfFile] = useState(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    titleBn: initialData?.titleBn || '',
    desc: initialData?.desc || '',
    descBn: initialData?.descBn || '',
    publishedYear: initialData?.publishedYear || new Date().getFullYear().toString(),
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const editId = initialData?.id || initialData?._id;

      const payload = { data: formData };
      
      if (coverImageFile) {
        payload.coverImageBase64 = await toBase64(coverImageFile);
      }
      
      if (pdfFile) {
        payload.pdfBase64 = await toBase64(pdfFile);
      }

      let result;
      if (initialData) {
        result = await updateEbookAction(editId, payload);
      } else {
        result = await createEbookAction(payload);
      }
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to save E-Book');
      }

      router.push('/admin/ebooks');
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
          {initialData ? 'Edit E-Book' : 'Upload New E-Book'}
        </h2>
        <Link href="/admin/ebooks" className="text-slate-500 hover:text-slate-700 flex items-center gap-2 text-sm font-medium">
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
          <label className="text-sm font-bold text-slate-700">Published Year / Period</label>
          <input type="text" name="publishedYear" value={formData.publishedYear} onChange={handleChange} placeholder="e.g. 2024 - 2025" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Cover Image *</label>
          <div className="flex flex-col gap-3">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleCoverChange} 
              required={!initialData}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brandBlue/5 file:text-brandBlue hover:file:bg-brandBlue/10" 
            />
            {coverPreview && (
              <div className="w-32 h-44 relative rounded-lg overflow-hidden border border-slate-200 bg-black/5 flex items-center justify-center">
                <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">PDF File *</label>
          <div className="flex flex-col gap-3">
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handlePdfChange} 
              required={!initialData}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brandBlue/5 file:text-brandBlue hover:file:bg-brandBlue/10" 
            />
            {pdfFile && (
              <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg border border-green-100">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium truncate">{pdfFile.name}</span>
              </div>
            )}
            {!pdfFile && initialData?.pdfUrl && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">Existing PDF uploaded</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
        <Link href="/admin/ebooks" className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
          Cancel
        </Link>
        <button disabled={loading} type="submit" className="px-6 py-3 rounded-lg font-bold text-white bg-brandBlue hover:bg-brandBlue/90 transition-colors flex items-center gap-2 shadow-md">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {initialData ? 'Update E-Book' : 'Upload E-Book'}
        </button>
      </div>

    </form>
  );
}
