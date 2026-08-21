'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function LeadershipForm({ initialData = null, collection }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.photo || '');

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    nameBn: initialData?.nameBn || '',
    designation: initialData?.designation || '',
    designationBn: initialData?.designationBn || '',
    photo: initialData?.photo || '',
    message: initialData?.message || '',
    messageBn: initialData?.messageBn || '',
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
      // If collection is 'leadership' (president), we just use POST to upsert
      const url = editId && collection !== 'leadership' ? `/api/admin/leadership/${collection}/${editId}` : `/api/admin/leadership/${collection}`;
      const method = editId && collection !== 'leadership' ? 'PUT' : 'POST';

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
        throw new Error(result.message || 'Failed to save member');
      }

      router.push('/admin/leadership');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (collection) {
      case 'leadership': return 'President';
      case 'central_committee': return 'Central Committee Member';
      case 'zone_chairmen': return 'Zone Chairman';
      case 'dhaka_committee': return 'Dhaka Committee Member';
      case 'lc_dhaka_committee': return 'LC Dhaka Committee Member';
      default: return 'Member';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 font-serif">
          {initialData ? `Edit ${getTitle()}` : `Add ${getTitle()}`}
        </h2>
        <Link href="/admin/leadership" className="text-slate-500 hover:text-slate-700 flex items-center gap-2 text-sm font-medium">
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
          <label className="text-sm font-bold text-slate-700">Name (English) *</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Name (Bengali)</label>
          <input type="text" name="nameBn" value={formData.nameBn} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Designation (English) *</label>
          <input required type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Designation (Bengali)</label>
          <input type="text" name="designationBn" value={formData.designationBn} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-slate-700">Photo *</label>
          <div className="flex flex-col gap-3">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              required={!initialData}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brandBlue/5 file:text-brandBlue hover:file:bg-brandBlue/10" 
            />
            {imagePreview && (
              <div className="w-40 h-40 relative rounded-lg overflow-hidden border border-slate-200">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>

      {collection === 'leadership' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Message (English)</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Message (Bengali)</label>
            <textarea name="messageBn" value={formData.messageBn} onChange={handleChange} rows="5" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
        <Link href="/admin/leadership" className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
          Cancel
        </Link>
        <button disabled={loading} type="submit" className="px-6 py-3 rounded-lg font-bold text-white bg-brandBlue hover:bg-brandBlue/90 transition-colors flex items-center gap-2 shadow-md">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {initialData ? 'Update Member' : 'Save Member'}
        </button>
      </div>

    </form>
  );
}
