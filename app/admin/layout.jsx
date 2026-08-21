'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Newspaper, Calendar, Image as ImageIcon, Activity, Users, Building2, BookOpen, Library, Download, LogOut, Loader2, Settings, ShieldCheck, ChevronRight, ChevronDown, UserCircle, ExternalLink, MonitorPlay, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { CoastGuardLogo } from '@/components/CoastGuardLogo';
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Hero Section', href: '/admin/hero', icon: MonitorPlay },
    { name: 'Manage News', href: '/admin/news', icon: Newspaper },
    { name: 'Manage Events', href: '/admin/events', icon: Calendar },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Activities', href: '/admin/activities', icon: Activity },
    { name: 'Leadership', href: '/admin/leadership', icon: Users },
    { name: 'Programs', href: '/admin/programs', icon: BookOpen },
    { name: 'Manage E-Books', href: '/admin/ebooks', icon: Library },
    { name: 'Downloads', href: '/admin/downloads', icon: Download },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error(err);
      setIsLoggingOut(false);
    }
  };

  const currentNav = navItems.find(item => pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin'));

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans selection:bg-brandBlue/20">

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Premium Design */}
      <aside className={`w-[280px] bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white flex flex-col shrink-0 fixed inset-y-0 left-0 lg:relative z-50 lg:z-20 h-full transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shadow-2xl`}>
        {/* Subtle decorative overlays */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-brandBlue/20 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-32 h-32 bg-brandYellow/5 blur-3xl pointer-events-none" />

        <div className="p-8 relative z-10 flex items-center gap-4 border-b border-white/5">
          <div className="w-12 h-12 bg-white/10 rounded-2xl p-2 backdrop-blur-md shadow-inner border border-white/10 flex items-center justify-center">
            <CoastGuardLogo className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <div>
            <h2 className="font-bold text-lg tracking-tight text-white leading-tight">Admin Portal</h2>
            <div className="flex items-center gap-1.5 text-brandYellow/90 text-[10px] font-bold uppercase tracking-wider mt-1">
              <ShieldCheck className="w-3 h-3" /> Secure Access
            </div>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-1/2 -translate-y-1/2 right-4 p-2 text-white/70 hover:text-white bg-white/5 rounded-lg border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto relative z-10 custom-scrollbar">
          <div className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 mt-2">Menu</div>

          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative ${isActive
                  ? 'bg-brandBlue/20 text-brandYellow font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brandYellow rounded-r-full shadow-[0_0_10px_rgba(245,238,49,0.5)]" />
                )}
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110 group-hover:text-white'}`} />
                <span className="text-sm tracking-wide">{item.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] relative">

        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200 z-10 sticky top-0 shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400 font-medium">Dashboard</span>
            {currentNav && currentNav.name !== 'Dashboard' && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span className="font-bold text-brandBlue">{currentNav.name}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-brandBlue bg-brandBlue/5 hover:bg-brandBlue/10 rounded-full transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </Link>

            <div className="w-px h-6 bg-slate-200 mx-2" />


            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-full border border-slate-200 hover:border-brandBlue/30 hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-brandBlue/20"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brandBlue to-brandBlue/70 flex items-center justify-center text-white shadow-sm">
                  <UserCircle className="w-5 h-5" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-bold text-slate-700 leading-none">Admin User</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">Admin User</p>
                      <p className="text-xs text-slate-500 mt-0.5">admin@cgfwa.com</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLogout();
                        }}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm disabled:opacity-50"
                      >
                        {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 p-4 flex lg:hidden items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="p-2 -ml-2 text-slate-500 hover:text-brandBlue hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <CoastGuardLogo className="w-8 h-8 object-contain hidden sm:block" />
            <span className="font-bold text-brandBlue">Admin</span>
          </div>
          <button onClick={handleLogout} className="text-slate-500 hover:text-red-500 p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-10 relative">
          {/* Subtle background glow for main area */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-[120px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
