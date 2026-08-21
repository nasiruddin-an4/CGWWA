'use client';

import React, { useEffect, useState } from 'react';
import { Newspaper, Calendar, Image as ImageIcon, Activity, Users, BookOpen, Download, Loader2, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoints = [
      { key: 'news', url: '/api/admin/news' },
      { key: 'events', url: '/api/admin/events' },
      { key: 'gallery', url: '/api/admin/gallery' },
      { key: 'activities', url: '/api/admin/activities' },
      { key: 'programs', url: '/api/admin/programs' },
      { key: 'downloads', url: '/api/admin/downloads' },
    ];

    Promise.all(
      endpoints.map(ep =>
        fetch(ep.url).then(r => r.json()).then(d => ({ key: ep.key, count: d.data?.length || 0 }))
          .catch(() => ({ key: ep.key, count: '--' }))
      )
    ).then(results => {
      const c = {};
      results.forEach(r => c[r.key] = r.count);
      setCounts(c);
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: 'News Articles', key: 'news', href: '/admin/news', icon: Newspaper, gradient: 'from-blue-500 to-cyan-400', shadow: 'shadow-blue-500/20' },
    { label: 'Events', key: 'events', href: '/admin/events', icon: Calendar, gradient: 'from-emerald-500 to-teal-400', shadow: 'shadow-emerald-500/20' },
    { label: 'Gallery Photos', key: 'gallery', href: '/admin/gallery', icon: ImageIcon, gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/20' },
    { label: 'Activities', key: 'activities', href: '/admin/activities', icon: Activity, gradient: 'from-orange-500 to-amber-400', shadow: 'shadow-orange-500/20' },
    { label: 'Programs', key: 'programs', href: '/admin/programs', icon: BookOpen, gradient: 'from-brandBlue to-blue-600', shadow: 'shadow-brandBlue/20' },
    { label: 'Downloads', key: 'downloads', href: '/admin/downloads', icon: Download, gradient: 'from-rose-500 to-red-400', shadow: 'shadow-rose-500/20' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Welcome Header */}
      <div className="relative bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brandBlue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-brandBlue font-serif tracking-tight">Welcome back to the Command Center</h1>
          <p className="text-slate-500 mt-2 text-lg max-w-2xl">
            You have full control over the Coast Guard Family Welfare Association website. From here, you can manage content, publish news, and oversee all activities.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <Loader2 className="w-10 h-10 animate-spin text-brandBlue mb-4" />
          <p className="text-slate-500 font-medium animate-pulse">Calculating website metrics...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                href={card.href}
                key={card.key}
                className={`group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Background decorative element */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-[0.03] rounded-bl-full group-hover:scale-150 transition-transform duration-500`} />

                <div className="flex justify-between items-start relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${card.gradient} shadow-lg ${card.shadow} text-white group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="p-2 bg-slate-50 rounded-full group-hover:bg-brandBlue/5 transition-colors">
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brandBlue transition-colors group-hover:-rotate-45" />
                  </div>
                </div>

                <div className="mt-6 relative z-10">
                  <div className="flex items-end gap-3">
                    <h3 className="text-4xl font-bold text-slate-900 tracking-tight font-serif">
                      {counts[card.key] ?? '--'}
                    </h3>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full mb-1">
                      <TrendingUp className="w-3 h-3" /> Active
                    </span>
                  </div>
                  <p className="text-slate-500 font-medium mt-1">{card.label}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick Actions / Tips */}
      <div className="bg-gradient-to-r from-slate-900 to-brandBlue rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://res.cloudinary.com/armmzmyq/image/upload/v1787248375/cgfwa/compressed_1787248375040_CHQ07299_wovle1.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold font-serif mb-2">Need to update content?</h2>
          <p className="text-blue-100/80 mb-6 leading-relaxed">
            Select a module from the grid above or use the sidebar navigation. Changes you make in this dashboard are saved securely in the database and reflect immediately on the live public website.
          </p>
          <div className="flex gap-4">
            <Link href="/admin/news/create" className="px-5 py-2.5 bg-brandYellow text-slate-900 text-sm font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-brandYellow/20">
              Publish New Article
            </Link>
            <Link href="/admin/gallery" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors backdrop-blur-sm border border-white/10">
              Upload Photos
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
