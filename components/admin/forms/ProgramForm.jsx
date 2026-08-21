'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export function ProgramForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');

  const joinArray = (arr, sep = '\n') => (Array.isArray(arr) ? arr.join(sep) : '');
  const splitString = (str, sep = '\n') => str.split(sep).map(s => s.trim()).filter(Boolean);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    titleBn: initialData?.titleBn || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    status: initialData?.status || '',
    iconName: initialData?.iconName || 'Heart',
    shortDesc: initialData?.shortDesc || '',
    shortDescBn: initialData?.shortDescBn || '',
    beneficiariesTarget: initialData?.beneficiariesTarget || '',
    fullDesc: joinArray(initialData?.fullDesc, '\n\n'),
    fullDescBn: joinArray(initialData?.fullDescBn, '\n\n'),
    keyObjectives: joinArray(initialData?.keyObjectives, '\n'),
    keyObjectivesBn: joinArray(initialData?.keyObjectivesBn, '\n'),
    districtsInvolved: initialData?.districtsInvolved?.join(', ') || '',
  });

  const [impactHighlights, setImpactHighlights] = useState(initialData?.impactHighlights || []);

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

  const handleImpactChange = (index, field, value) => {
    const newImpacts = [...impactHighlights];
    newImpacts[index][field] = value;
    setImpactHighlights(newImpacts);
  };

  const addImpactItem = () => {
    setImpactHighlights([...impactHighlights, { label: '', value: '' }]);
  };

  const removeImpactItem = (index) => {
    setImpactHighlights(impactHighlights.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      fullDesc: splitString(formData.fullDesc, '\n\n'),
      fullDescBn: splitString(formData.fullDescBn, '\n\n'),
      keyObjectives: splitString(formData.keyObjectives, '\n'),
      keyObjectivesBn: splitString(formData.keyObjectivesBn, '\n'),
      districtsInvolved: formData.districtsInvolved.split(',').map(d => d.trim()).filter(Boolean),
      impactHighlights,
    };

    try {
      const editId = initialData?.id || initialData?._id;
      const url = initialData ? `/api/admin/programs/${editId}` : '/api/admin/programs';
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
        throw new Error(result.message || 'Failed to save program');
      }

      router.push('/admin/programs');
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
          {initialData ? 'Edit Program' : 'Create Program'}
        </h2>
        <Link href="/admin/programs" className="text-slate-500 hover:text-slate-700 flex items-center gap-2 text-sm font-medium">
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
          <input required type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Healthcare" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Status *</label>
          <select required name="status" value={formData.status} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all">
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Planning">Planning</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Beneficiaries Target</label>
          <input type="text" name="beneficiariesTarget" value={formData.beneficiariesTarget} onChange={handleChange} placeholder="e.g. 5,000+ Families" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Icon Name (Lucide React)</label>
          <input type="text" name="iconName" value={formData.iconName} onChange={handleChange} placeholder="e.g. Heart, Shield, Activity" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Program Image *</label>
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
        <label className="text-sm font-bold text-slate-700">Districts Involved (Comma separated)</label>
        <input type="text" name="districtsInvolved" value={formData.districtsInvolved} onChange={handleChange} placeholder="e.g. Dhaka, Chittagong, Khulna" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all" />
      </div>

      {/* Short Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Short Description (English) *</label>
          <textarea required name="shortDesc" value={formData.shortDesc} onChange={handleChange} rows="2" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Short Description (Bengali)</label>
          <textarea name="shortDescBn" value={formData.shortDescBn} onChange={handleChange} rows="2" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue outline-none transition-all resize-none"></textarea>
        </div>
      </div>

      {/* Full Descriptions */}
      <div className="grid grid-cols-1 gap-6 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Full Description (English) - Double newline for paragraphs</label>
          <textarea name="fullDesc" value={formData.fullDesc} onChange={handleChange} rows="5" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all resize-none"></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Full Description (Bengali)</label>
          <textarea name="fullDescBn" value={formData.fullDescBn} onChange={handleChange} rows="5" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all resize-none"></textarea>
        </div>
      </div>

      {/* Objectives */}
      <div className="grid grid-cols-1 gap-6 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Key Objectives (English) - One per line</label>
          <textarea name="keyObjectives" value={formData.keyObjectives} onChange={handleChange} rows="4" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all resize-none"></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Key Objectives (Bengali) - One per line</label>
          <textarea name="keyObjectivesBn" value={formData.keyObjectivesBn} onChange={handleChange} rows="4" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue/20 outline-none transition-all resize-none"></textarea>
        </div>
      </div>

      {/* Impact Highlights */}
      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-lg font-bold text-brandBlue">Impact Highlights</h3>
          <button type="button" onClick={addImpactItem} className="flex items-center gap-2 text-sm text-brandBlue bg-brandBlue/10 hover:bg-brandBlue/20 px-3 py-1.5 rounded-md font-bold transition-colors">
            <Plus className="w-4 h-4" /> Add Highlight
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {impactHighlights.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <div className="flex-1 space-y-3">
                <input type="text" placeholder="Label (e.g. People Helped)" value={item.label} onChange={(e) => handleImpactChange(idx, 'label', e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm" />
                <input type="text" placeholder="Value (e.g. 5,000+)" value={item.value} onChange={(e) => handleImpactChange(idx, 'value', e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-md focus:ring-2 focus:ring-brandBlue/20 outline-none text-sm font-bold text-brandBlue" />
              </div>
              <button type="button" onClick={() => removeImpactItem(idx)} className="p-2.5 mt-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
        <Link href="/admin/programs" className="px-6 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
          Cancel
        </Link>
        <button disabled={loading} type="submit" className="px-6 py-3 rounded-lg font-bold text-white bg-brandBlue hover:bg-brandBlue/90 transition-colors flex items-center gap-2 shadow-md">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {initialData ? 'Update Program' : 'Save Program'}
        </button>
      </div>

    </form>
  );
}
