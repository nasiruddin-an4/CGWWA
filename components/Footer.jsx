'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { organizationInfo } from '@/data/organization';
import { useLanguage } from '@/context/LanguageContext';
import { CoastGuardLogo } from './CoastGuardLogo';

export const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-brandBlue text-slate-300 border-t border-white/10 relative overflow-hidden text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CoastGuardLogo className="w-12 h-14 shrink-0 drop-shadow-md" />
              <div>
                <h3 className="font-semibold text-white text-base tracking-tight">
                  {t('CGFWA Bangladesh', 'সিজিএফডব্লিউএ বাংলাদেশ')}
                </h3>
                <span className="text-[11px] text-slate-400 block font-mono">
                  Reg: {organizationInfo.registrationNo}
                </span>
              </div>
            </div>
            <p className="text-[#8E9299] text-xs leading-relaxed">
              {t(organizationInfo.tagline, organizationInfo.taglineBn)}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-brandYellow brightness-150" />
                {t('Gov Advisory Partner', 'সরকারি পরামর্শক পর্ষদ')}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-white text-xs uppercase tracking-widest mb-4 border-l-2 border-brandYellow pl-2.5">
              {t('Institutional Navigation', 'প্রতিষ্ঠানের লিংকসমূহ')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8E9299]">
              <li><Link href="/about" className="hover:text-white transition-colors">{t('About CGFWA', 'সংস্থার সংক্ষিপ্ত পরিচিতি')}</Link></li>
              <li><Link href="/about/history" className="hover:text-white transition-colors">{t('History & Founding Charter', 'ইতিহাস ও সনদ')}</Link></li>
              <li><Link href="/leadership" className="hover:text-white transition-colors">{t('Board of Governors', 'পরিচালনা পর্ষদ')}</Link></li>
              <li><Link href="/activities" className="hover:text-white transition-colors">{t('Welfare & Community Services', 'সমাজকল্যাণ সেবাসমূহ')}</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">{t('Flagship Projects (18 Active)', 'চলমান ১৮টি প্রকল্প')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-white text-xs uppercase tracking-widest mb-4 border-l-2 border-brandYellow pl-2.5">
              {t('Publications & Citizen Charter', 'প্রকাশনা ও নাগরিক চার্টার')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8E9299]">
              <li><Link href="/downloads" className="hover:text-white transition-colors">{t('Annual Audited Reports', 'বার্ষিক নিরীক্ষিত প্রতিবেদন')}</Link></li>
              <li><Link href="/downloads" className="hover:text-white transition-colors">{t('Scholarship Application Forms', 'শিক্ষা বৃত্তির ফরম')}</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">{t('Press Releases & Notices', 'প্রেস বিজ্ঞপ্তি ও নোটিশ')}</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">{t('National Events Calendar', 'জাতীয় ইভেন্ট সময়সূচি')}</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">{t('Media & Photo Archives', 'মিডিয়া ও ছবি গ্যালারি')}</Link></li>
            </ul>
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
              <li className="pt-2">
                <div className="p-3 rounded-md bg-brandYellow/20 border border-brandYellow/40 flex items-center justify-between">
                  <span className="text-white font-medium text-xs">{t('24/7 Helpline', '২৪/৭ হেল্পলাইন')}</span>
                  <a href="tel:16122" className="font-bold text-brandYellow brightness-150 text-sm hover:underline">16122</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E9299]">
          <p>© {new Date().getFullYear()} Bangladesh Coastal & Community Welfare Association. {t('All Rights Reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}</p>
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
