'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { language, t } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-50">
      
      {/* Left side: Premium Image Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-brandBlue overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-80 mix-blend-overlay bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('https://res.cloudinary.com/armmzmyq/image/upload/v1787248375/cgfwa/compressed_1787248375040_CHQ07299_wovle1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/90 via-brandBlue/70 to-brandYellow/40 z-10" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brandYellow/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-20 flex flex-col justify-between p-16 h-full text-white w-full">
          <div>
            <Link href="/" className="inline-block bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl hover:bg-white/20 transition-colors">
              <img src="/logo.png" alt="CGFWA Logo" className="w-16 h-16 object-contain drop-shadow-md" />
            </Link>
          </div>
          
          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
              Welcome to the <span className="text-brandYellow">Admin Portal</span>
            </h1>
            <p className="text-lg text-slate-100 leading-relaxed font-light mb-8 max-w-md">
              Securely manage your organization's data, members, news, and initiatives from this centralized command center.
            </p>
            
            <div className="flex items-center gap-3 text-sm font-medium text-white/80 bg-white/10 w-fit px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-brandYellow" />
              Secure Encrypted Connection
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white relative">
        {/* Mobile Background (only visible on small screens) */}
        <div className="lg:hidden absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: "url('https://res.cloudinary.com/armmzmyq/image/upload/v1787248375/cgfwa/compressed_1787248375040_CHQ07299_wovle1.jpg')" }}
          />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
        </div>

        <div className="max-w-md w-full relative z-10">
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="bg-slate-50 p-4 rounded-full shadow-sm border border-slate-100">
                <img src="/logo.png" alt="CGFWA Logo" className="w-16 h-16 object-contain" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-serif mb-2">
              Sign In
            </h2>
            <p className="text-slate-500 font-medium">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="w-1 h-full bg-red-500 rounded-full" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2 group">
              <label className="text-sm font-bold text-slate-700 block transition-colors group-focus-within:text-brandBlue">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brandBlue transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue focus:bg-white transition-all shadow-sm"
                  placeholder="admin@cgfwa.com"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 block transition-colors group-focus-within:text-brandBlue">Password</label>
                <Link href="#" className="text-xs font-bold text-brandBlue hover:text-brandBlue/80 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brandBlue transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brandBlue/20 focus:border-brandBlue focus:bg-white transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brandBlue hover:bg-brandBlue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandBlue transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs text-slate-400 font-medium">
              &copy; {new Date().getFullYear()} Bangladesh Coast Guard Family Welfare Association. <br className="hidden lg:block"/> All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
