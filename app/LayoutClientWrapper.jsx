'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { HeaderNavbar } from '@/components/HeaderNavbar';

import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { ScrollToTop } from '@/components/ScrollToTop';
import { WelcomePopup } from '@/components/WelcomePopup';
export default function LayoutClientWrapper({ children }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      {/* Primary Header Navbar */}
      <HeaderNavbar onOpenSearch={() => setSearchModalOpen(true)} />

      {/* Main Web Page Content */}
      <div className="flex-1 flex flex-col w-full">


        {/* Dynamic Page Content Outlet */}
        <main className={`flex-1 w-full ${!isHomePage ? 'px-4 sm:px-8 pt-24 sm:pt-28 pb-8' : ''}`}>
          {children}
        </main>
      </div>

      {/* Institutional Footer */}
      <Footer />

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)} />


      {/* Floating Scroll-To-Top Control */}
      <ScrollToTop />

      {/* Initial Load Welcome Popup */}
      <WelcomePopup />
    </div>);

}