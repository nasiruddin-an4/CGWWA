'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export function EventForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    titleBn: initialData?.titleBn || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    status: initialData?.status || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    location: initialData?.location || '',
    locationBn: initialData?.locationBn || '',
    district: initialData?.district || '',
    chiefGuest: initialData?.chiefGuest || '',
    description: initialData?.description || '',
    descriptionBn: initialData?.descriptionBn || '',
  });

  const [agenda, setAgenda] = useState(initialData?.agenda || []);

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

  const handleAgendaChange = (index, field, value) => {
    const newAgenda = [...agenda];
    newAgenda[index][field] = value;
    setAgenda(newAgenda);
  };

  const addAgendaItem = () => {
    setAgenda([...agenda, { time: '', activity: '' }]);
  };

  const removeAgendaItem = (index) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = { ...formData, agenda };

    try {
      const editId = initialData?.id || initialData?._id;
      const url = initialData ? `/api/admin/events/${editId}` : '/api/admin/events';
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
        throw new Error(result.message || 'Failed to save event');
      }

      router.push('/admin/events');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 font-serif">
          {initialData ? 'Edit Event' : 'Create Event'}
        </h2>
        <Link href="/admin/events" className="text-slate-500 hover:text-slate-700 flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to List
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Title (English) *</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Title (Bengali)</label>
          <input type="text" name="titleBn" value={formData.titleBn} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Slug *</label>
          <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Category *</label>
          <input required type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Health Camp" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Status *</label>
          <select required name="status" value={formData.status} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all">
            <option value="">Select Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Event Image *</label>
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

      {/* Date & Location */}
      <h3 className="text-lg font-bold text-brandBlue border-b pb-2 pt-4">Date & Location</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Date *</label>
          <input required type="text" name="date" value={formData.date} onChange={handleChange} placeholder="e.g. October 15, 2026" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Time *</label>
          <input required type="text" name="time" value={formData.time} onChange={handleChange} placeholder="e.g. 10:00 AM - 04:00 PM" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Location (English) *</label>
          <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Location (Bengali)</label>
          <input type="text" name="locationBn" value={formData.locationBn} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">District *</label>
          <input required type="text" name="district" value={formData.district} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Chief Guest</label>
          <input type="text" name="chiefGuest" value={formData.chiefGuest} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>
      </div>

      {/* Descriptions */}
      <div className="grid grid-cols-1 gap-6 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Description (English) *</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Description (Bengali)</label>
          <textarea name="descriptionBn" value={formData.descriptionBn} onChange={handleChange} rows="4" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
        </div>
      </div>

      {/* Agenda */}
      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-lg font-bold text-brandBlue">Event Agenda</h3>
          <button type="button" onClick={addAgendaItem} className="flex items-center gap-2 text-sm text-brandBlue bg-brandBlue/10 hover:bg-brandBlue/20 px-3 py-1.5 rounded-md font-bold transition-colors">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
        
        {agenda.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start p-4 bg-slate-50 border border-slate-100 rounded-lg">
            <div className="flex-1 space-y-2">
              <input type="text" placeholder="Time (e.g. 10:00 AM)" value={item.time} onChange={(e) => handleAgendaChange(idx, 'time', e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm" />
            </div>
            <div className="flex-[2] space-y-2">
              <input type="text" placeholder="Activity (e.g. Opening Ceremony)" value={item.activity} onChange={(e) => handleAgendaChange(idx, 'activity', e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm" />
            </div>
            <button type="button" onClick={() => removeAgendaItem(idx)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-md transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
        <Link href="/admin/events" className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
          Cancel
        </Link>
        <button disabled={loading} type="submit" className="px-6 py-3 rounded-lg font-bold text-white bg-brandBlue hover:bg-brandBlue/90 transition-colors flex items-center gap-2 shadow-md">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {initialData ? 'Update Event' : 'Save Event'}
        </button>
      </div>

    </form>
  );
}
