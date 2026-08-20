'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export const CoastGuardLogo = ({ className = 'w-10 h-12' }) => {
  const { language } = useLanguage();
  
  const logoSrc = language === 'bn' 
    ? 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248643/cgfwa/FinalCGFWALogoBangla_jvh5qp.png' 
    : 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248712/cgfwa/englishLogo_yztxt4.png';

  return (
    <div className={`relative ${className} shrink-0`}>
      <Image
        src={logoSrc}
        alt="CGFWA Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};
