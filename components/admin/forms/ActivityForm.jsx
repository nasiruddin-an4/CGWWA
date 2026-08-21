'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export function ActivityForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  
  const [eventPhotoFiles, setEventPhotoFiles] = useState({});
  const [eventPhotoPreviews, setEventPhotoPreviews] = useState({});

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    titleBn: initialData?.titleBn || '',
    slug: initialData?.slug || '',
    icon: initialData?.icon || 'Star',
    shortDesc: initialData?.shortDesc || '',
    shortDescBn: initialData?.shortDescBn || '',
  });

  const [events, setEvents] = useState(initialData?.events || []);

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

  const addEvent = () => {
    setEvents([...events, {
      eventSlug: '',
      title: '',
      titleBn: '',
      desc: '',
      descBn: '',
      photos: [],
      videos: ''
    }]);
  };

  const handleEventPhotoChange = (idx, e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setEventPhotoFiles(prev => ({ ...prev, [idx]: files }));
      const previews = files.map(file => URL.createObjectURL(file));
      setEventPhotoPreviews(prev => ({ ...prev, [idx]: previews }));
    }
  };

  const removeExistingPhoto = (eventIdx, photoIdx) => {
    const newEvents = [...events];
    const currentPhotos = Array.isArray(newEvents[eventIdx].photos) ? newEvents[eventIdx].photos : [];
    newEvents[eventIdx].photos = currentPhotos.filter((_, i) => i !== photoIdx);
    setEvents(newEvents);
  };

  const handleEventChange = (index, field, value) => {
    const newEvents = [...events];
    newEvents[index][field] = value;
    setEvents(newEvents);
  };

  const removeEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index));
    
    // clean up files
    const newFiles = { ...eventPhotoFiles };
    delete newFiles[index];
    setEventPhotoFiles(newFiles);
    
    const newPreviews = { ...eventPhotoPreviews };
    delete newPreviews[index];
    setEventPhotoPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Process events
    const processedEvents = events.map(ev => {
      const photosArray = Array.isArray(ev.photos) ? ev.photos : (ev.photos ? ev.photos.split(',').map(s => s.trim()).filter(Boolean) : []);
      const videosArray = Array.isArray(ev.videos) ? ev.videos : (ev.videos ? ev.videos.split(',').map(s => s.trim()).filter(Boolean) : []);
      
      return {
        ...ev,
        photos: photosArray,
        videos: videosArray
      };
    });

    const payload = { ...formData, events: processedEvents };

    try {
      const editId = initialData?.id || initialData?._id;
      const url = initialData ? `/api/admin/activities/${editId}` : '/api/admin/activities';
      const method = initialData ? 'PUT' : 'POST';

      const formDataObj = new FormData();
      formDataObj.append('data', JSON.stringify(payload));
      
      if (imageFile) {
        formDataObj.append('image', imageFile);
      }

      Object.keys(eventPhotoFiles).forEach(idx => {
        eventPhotoFiles[idx].forEach(file => {
          formDataObj.append(`event_${idx}_photos`, file);
        });
      });

      const res = await fetch(url, {
        method,
        body: formDataObj,
      });

      const result = await res.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to save activity');
      }

      router.push('/admin/activities');
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
          {initialData ? 'Edit Activity Category' : 'Add Activity Category'}
        </h2>
        <Link href="/admin/activities" className="text-slate-500 hover:text-slate-700 flex items-center gap-2 text-sm font-medium">
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
          <label className="text-sm font-bold text-slate-700">Category Title (English) *</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Category Title (Bengali)</label>
          <input type="text" name="titleBn" value={formData.titleBn} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Category Slug *</label>
          <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Lucide Icon Name *</label>
          <input required type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="e.g. Heart" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-slate-700">Cover Image *</label>
          <div className="flex flex-col gap-3">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              required={!initialData}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brandBlue/5 file:text-brandBlue hover:file:bg-brandBlue/10" 
            />
            {imagePreview && (
              <div className="w-full h-40 relative rounded-lg overflow-hidden border border-slate-200 md:w-1/2">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Short Desc (English) *</label>
          <textarea required name="shortDesc" value={formData.shortDesc} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none resize-none"></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Short Desc (Bengali)</label>
          <textarea name="shortDescBn" value={formData.shortDescBn} onChange={handleChange} rows="3" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none resize-none"></textarea>
        </div>
      </div>

      {/* Sub-Events */}
      <div className="pt-8 space-y-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-brandBlue">Sub-Events</h3>
            <p className="text-xs text-slate-500 mt-1">Events that belong to this activity category.</p>
          </div>
          <button type="button" onClick={addEvent} className="flex items-center gap-2 text-sm text-brandBlue bg-brandBlue/10 hover:bg-brandBlue/20 px-4 py-2 rounded-md font-bold transition-colors">
            <Plus className="w-4 h-4" /> Add Sub-Event
          </button>
        </div>

        {events.map((ev, idx) => (
          <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-xl relative space-y-4">
            <button type="button" onClick={() => removeEvent(idx)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
            <h4 className="font-bold text-slate-700 text-sm mb-4">Event #{idx + 1}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Event Slug *</label>
                <input required type="text" value={ev.eventSlug} onChange={(e) => handleEventChange(idx, 'eventSlug', e.target.value)} placeholder="e.g. 2026-distribution" className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm" />
              </div>
              <div className="hidden md:block"></div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Title (English) *</label>
                <input required type="text" value={ev.title} onChange={(e) => handleEventChange(idx, 'title', e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Title (Bengali)</label>
                <input type="text" value={ev.titleBn} onChange={(e) => handleEventChange(idx, 'titleBn', e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Desc (English) *</label>
                <textarea required value={ev.desc} onChange={(e) => handleEventChange(idx, 'desc', e.target.value)} rows="3" className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm resize-none"></textarea>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Desc (Bengali)</label>
                <textarea value={ev.descBn} onChange={(e) => handleEventChange(idx, 'descBn', e.target.value)} rows="3" className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm resize-none"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Photos *</label>
                <div className="p-3 border border-slate-200 rounded-md bg-white">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={(e) => handleEventPhotoChange(idx, e)}
                    className="w-full text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brandBlue/5 file:text-brandBlue hover:file:bg-brandBlue/10 outline-none"
                  />
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {/* Existing Photos */}
                    {Array.isArray(ev.photos) && ev.photos.map((src, pIdx) => (
                      <div key={`old-${pIdx}`} className="relative group w-16 h-16 rounded-md overflow-hidden border border-slate-200">
                        <img src={src} className="w-full h-full object-cover" alt="Existing" />
                        <button type="button" onClick={() => removeExistingPhoto(idx, pIdx)} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    {/* New Previews */}
                    {eventPhotoPreviews[idx] && eventPhotoPreviews[idx].map((src, pIdx) => (
                      <div key={`new-${pIdx}`} className="relative w-16 h-16 rounded-md overflow-hidden border-2 border-brandBlue/50">
                        <img src={src} className="w-full h-full object-cover" alt="New" />
                        <div className="absolute bottom-0 left-0 right-0 bg-brandBlue text-white text-[10px] text-center font-bold">NEW</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Videos (Comma separated URLs)</label>
                <textarea value={Array.isArray(ev.videos) ? ev.videos.join(', ') : ev.videos} onChange={(e) => handleEventChange(idx, 'videos', e.target.value)} rows="2" className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm resize-none"></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
        <Link href="/admin/activities" className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
          Cancel
        </Link>
        <button disabled={loading} type="submit" className="px-6 py-3 rounded-lg font-bold text-white bg-brandBlue hover:bg-brandBlue/90 transition-colors flex items-center gap-2 shadow-md">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {initialData ? 'Update Activity' : 'Save Activity'}
        </button>
      </div>

    </form>
  );
}
