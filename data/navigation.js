
export const navigationMenu = [
  {
    id: 'about',
    title: 'About Us',
    titleBn: 'আমাদের সম্পর্কে',
    path: '/about',
    icon: 'Info',
  },
  {
    id: 'leadership',
    title: 'Leadership & Community',
    titleBn: 'নেতৃত্ব ও কমিউনিটি',
    path: '/leadership',
    icon: 'Award',
    children: [
      {
        id: 'president-committee',
        title: 'President Committee',
        titleBn: 'প্রেসিডেন্ট কমিটি',
        path: '/leadership/president-committee',
      },
      {
        id: 'central-committee',
        title: 'Central Committee',
        titleBn: 'কেন্দ্রীয় কমিটি',
        path: '/leadership/central-committee',
      },
      {
        id: 'chairman-committee',
        title: 'Chairman Committee',
        titleBn: 'চেয়ারম্যান কমিটি',
        path: '/leadership/chairman-committee',
      },
      {
        id: 'cgfwa-zones',
        title: 'CGFWA Zones',
        titleBn: 'সিজিএফডব্লিউএ জোনসমূহ',
        path: '/leadership/cgfwa-zones',
      },
    ],
  },
  {
    id: 'activities',
    title: 'Activities',
    titleBn: 'কার্যক্রমসমূহ',
    path: '/activities',
    icon: 'Briefcase',
    children: [
      {
        id: 'welfare-program',
        title: 'Welfare Program',
        titleBn: 'কল্যাণমূলক কর্মসূচি',
        path: '/activities/welfare-program',
      },
      {
        id: 'training-program',
        title: 'Training Program',
        titleBn: 'প্রশিক্ষণ কর্মসূচি',
        path: '/activities/training-program',
      },
      {
        id: 'community-program',
        title: 'Community Program',
        titleBn: 'কমিউনিটি কর্মসূচি',
        path: '/activities/community-program',
      },
    ],
  },
  {
    id: 'gallery',
    title: 'Gallery',
    titleBn: 'গ্যালারি',
    path: '/gallery',
    icon: 'Image',
    children: [
      {
        id: 'gallery-photos',
        title: 'Photo Gallery',
        titleBn: 'ছবি গ্যালারি',
        path: '/gallery/photos',
      },
    ],
  },
];
