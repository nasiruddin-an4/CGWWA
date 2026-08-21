'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, Facebook, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { organizationInfo } from '@/data/organization';
import { useLanguage } from '@/context/LanguageContext';
import { CoastGuardLogo } from './CoastGuardLogo';

export const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-brandBlue text-slate-300 border-t border-white/10 relative overflow-hidden text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <CoastGuardLogo className="w-16 h-20 shrink-0 drop-shadow-md" />
              <h3 className="font-bold text-white text-lg leading-snug">
                {t('CGFWA Bangladesh', 'সিজিএফডব্লিউএ বাংলাদেশ')}
              </h3>
            </div>
            <p className="text-[#8E9299] text-sm leading-relaxed pr-4">
              {t(
                'Coast Guard Family Welfare Association is dedicated to the welfare and wellness of the coast guard members and their families.',
                'কোস্ট গার্ড পরিবার কল্যাণ সমিতি কোস্ট গার্ড সদস্য এবং তাদের পরিবারের কল্যাণ ও সুস্থতার জন্য নিবেদিত।'
              )}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-white text-xs uppercase tracking-widest mb-4 border-l-2 border-brandYellow pl-2.5">
              {t('Headquarters Contact', 'হেডকোয়ার্টার্স যোগাযোগ')}
            </h4>
            <ul className="space-y-3 text-xs text-[#8E9299]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brandYellow brightness-150 shrink-0 mt-0.5" />
                <span>
                  {t(organizationInfo.headquarters.address, organizationInfo.headquarters.addressBn)}
                  , {organizationInfo.headquarters.city}-{organizationInfo.headquarters.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brandYellow brightness-150 shrink-0" />
                <span>{organizationInfo.headquarters.phone.join(' / ')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brandYellow brightness-150 shrink-0" />
                <span>{organizationInfo.headquarters.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-white text-xs uppercase tracking-widest mb-4 border-l-2 border-brandYellow pl-2.5">
              {t('Connect With Us', 'আমাদের সাথে যুক্ত হোন')}
            </h4>
            <div className="flex items-center gap-3 mb-6">
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-brandYellow hover:text-brandBlue text-slate-300 transition-all shadow-sm" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-brandYellow hover:text-brandBlue text-slate-300 transition-all shadow-sm" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-brandYellow hover:text-brandBlue text-slate-300 transition-all shadow-sm" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-brandYellow hover:text-brandBlue text-slate-300 transition-all shadow-sm" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="p-3 rounded-md bg-brandYellow/20 border border-brandYellow/40 flex items-center justify-between">
              <span className="text-white font-medium text-xs">{t('24/7 Helpline', '২৪/৭ হেল্পলাইন')}</span>
              <a href="tel:16122" className="font-bold text-brandYellow brightness-150 text-sm hover:underline">16122</a>
            </div>
          </div>
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E9299]">
          <p>© {new Date().getFullYear()} {t(organizationInfo.name, organizationInfo.nameBn)}. {t('All Rights Reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}</p>
          <div className="flex items-center gap-4 text-[#8E9299]">
            <Link href="/contact" className="hover:text-white">{t('Terms of Service', 'ব্যবহারের শর্তাবলী')}</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white">{t('Privacy Policy', 'গোপনীয়তা নীতি')}</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white">{t('Citizen Right to Info', 'তথ্য অধিকার')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
