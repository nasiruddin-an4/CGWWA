import { HeartHandshake, Home, BookOpen, Stethoscope, Users, Globe2 } from 'lucide-react';

export const activitiesData = [
  {
    id: 'act-01',
    slug: 'welfare-programs',
    title: 'Welfare Programs',
    titleBn: 'কল্যাণমূলক সেবা',
    icon: 'HeartHandshake',
    shortDesc: 'Providing direct financial and material support to distressed coastal families during emergencies and off-seasons.',
    shortDescBn: 'জরুরি অবস্থা এবং অসময়ে বিপন্ন উপকূলীয় পরিবারগুলোকে প্রত্যক্ষ আর্থিক ও বস্তুগত সহায়তা প্রদান।',
    image: '/images/programs-placeholder.png',
    stats: [
      { label: 'Families Supported', value: '45,000+' },
      { label: 'Emergency Grants', value: 'BDT 8.5Cr' },
      { label: 'Districts Reached', value: '19' }
    ],
    content: [
      'The core mandate of CGFWA is to ensure the welfare of coastal communities, particularly those dependent on the sea for their livelihood.',
      'Our welfare programs are structured to provide immediate relief during crises such as cyclones, tidal surges, and fishing bans. We offer direct cash transfers, dry ration kits, and emergency shelter materials.',
      'Beyond immediate relief, we run a bereavement fund that provides long-term financial security to families who lose their primary breadwinners at sea. This includes monthly stipends and vocational training for widows to ensure they can rebuild their lives with dignity.'
    ],
    contentBn: [
      'সিজিএফডব্লিউএ-এর মূল লক্ষ্য হলো উপকূলীয় জনগোষ্ঠী, বিশেষ করে যারা জীবিকার জন্য সমুদ্রের ওপর নির্ভরশীল, তাদের কল্যাণ নিশ্চিত করা।',
      'আমাদের কল্যাণমূলক কর্মসূচিগুলো ঘূর্ণিঝড়, জলোচ্ছ্বাস এবং মাছ ধরা নিষেধাজ্ঞার মতো সংকটের সময় তাৎক্ষণিক ত্রাণ প্রদানের জন্য তৈরি। আমরা সরাসরি নগদ অর্থ হস্তান্তর, শুকনো রেশন কিট এবং জরুরি আশ্রয় সামগ্রী সরবরাহ করি।',
      'তাৎক্ষণিক ত্রাণের বাইরেও, আমরা একটি শোক তহবিল পরিচালনা করি যা সমুদ্রে প্রধান উপার্জনকারী হারানো পরিবারগুলোকে দীর্ঘমেয়াদী আর্থিক নিরাপত্তা প্রদান করে।'
    ]
  },
  {
    id: 'act-02',
    slug: 'community-development',
    title: 'Community Development',
    titleBn: 'কমিউনিটি উন্নয়ন',
    icon: 'Home',
    shortDesc: 'Building resilient infrastructure, including cyclone shelters, clean water facilities, and solar-powered community hubs.',
    shortDescBn: 'ঘূর্ণিঝড় আশ্রয়কেন্দ্র, বিশুদ্ধ পানির সুবিধা এবং সৌরচালিত কমিউনিটি হাবসহ টেকসই অবকাঠামো নির্মাণ।',
    image: '/images/programs-placeholder.png',
    stats: [
      { label: 'Shelters Built', value: '124' },
      { label: 'Water Plants', value: '86' },
      { label: 'Solar Grids', value: '215' }
    ],
    content: [
      'Sustainable coastal living requires robust infrastructure. Our community development wing focuses on building assets that protect and empower isolated island and coastal unions.',
      'We have spearheaded the construction of multi-purpose cyclone shelters that serve as primary schools during normal times and safe havens during extreme weather events. These facilities are equipped with elevated water tanks and solar panels.',
      'Furthermore, our clean water initiative has installed dozens of solar-powered desalination plants across the Sundarbans border regions, providing thousands of residents with safe drinking water and significantly reducing waterborne diseases.'
    ],
    contentBn: [
      'টেকসই উপকূলীয় জীবনযাপনের জন্য শক্তিশালী অবকাঠামো প্রয়োজন। আমাদের কমিউনিটি উন্নয়ন শাখা বিচ্ছিন্ন দ্বীপ ও উপকূলীয় ইউনিয়নগুলোকে রক্ষা এবং ক্ষমতায়ন করার জন্য সম্পদ তৈরিতে মনোযোগ দেয়।',
      'আমরা বহুমুখী ঘূর্ণিঝড় আশ্রয়কেন্দ্র নির্মাণে নেতৃত্ব দিয়েছি যা স্বাভাবিক সময়ে প্রাথমিক বিদ্যালয় এবং চরম আবহাওয়ার সময় নিরাপদ আশ্রয়স্থল হিসেবে কাজ করে।',
      'এছাড়াও, আমাদের বিশুদ্ধ পানি উদ্যোগ সুন্দরবন সীমান্ত অঞ্চল জুড়ে কয়েক ডজন সৌরচালিত ডিস্যালিনেশন প্ল্যান্ট স্থাপন করেছে, যা হাজার হাজার বাসিন্দাকে নিরাপদ পানীয় জল সরবরাহ করছে।'
    ]
  },
  {
    id: 'act-03',
    slug: 'education',
    title: 'Education & Literacy',
    titleBn: 'শিক্ষা ও সাক্ষরতা',
    icon: 'BookOpen',
    shortDesc: 'Eradicating illiteracy in remote fishing villages through merit scholarships and digital floating classrooms.',
    shortDescBn: 'মেধা বৃত্তি এবং ভাসমান ডিজিটাল ক্লাসরুমের মাধ্যমে দুর্গম জেলে পল্লীতে নিরক্ষরতা দূরীকরণ।',
    image: '/images/programs-placeholder.png',
    stats: [
      { label: 'Active Scholarships', value: '10,000+' },
      { label: 'Floating Schools', value: '12' },
      { label: 'Literacy Rate Boost', value: '+15%' }
    ],
    content: [
      'Education is the most powerful tool to break the cycle of poverty in coastal regions. CGFWA operates one of the largest coastal scholarship programs in the country.',
      'Our Coastal Education & Merit Scholarship Program (CESP) fully funds the secondary and tertiary education of thousands of children from low-income fishing families. We believe that financial hardship should never be a barrier to a child’s potential.',
      'For extremely remote riverine communities, we have introduced Floating Digital Classrooms—solar-powered boats equipped with internet, computers, and dedicated teachers that travel from island to island, bringing modern education directly to the students.'
    ],
    contentBn: [
      'উপকূলীয় অঞ্চলে দারিদ্র্যের চক্র ভাঙার সবচেয়ে শক্তিশালী হাতিয়ার হলো শিক্ষা। সিজিএফডব্লিউএ দেশের অন্যতম বৃহৎ উপকূলীয় বৃত্তি কর্মসূচি পরিচালনা করে।',
      'আমাদের কোস্টাল এডুকেশন অ্যান্ড মেরিট স্কলারশিপ প্রোগ্রাম (সিইএসপি) নিম্ন আয়ের জেলে পরিবারের হাজার হাজার শিশুর মাধ্যমিক ও উচ্চশিক্ষার সম্পূর্ণ অর্থায়ন করে।',
      'অত্যন্ত দুর্গম নদীমাতৃক সম্প্রদায়ের জন্য, আমরা ভাসমান ডিজিটাল ক্লাসরুম চালু করেছি—ইন্টারনেট, কম্পিউটার এবং নিবেদিতপ্রাণ শিক্ষকদের নিয়ে সৌরচালিত নৌকা যা এক দ্বীপ থেকে অন্য দ্বীপে ঘুরে শিক্ষার্থীদের কাছে আধুনিক শিক্ষা পৌঁছে দেয়।'
    ]
  },
  {
    id: 'act-04',
    slug: 'healthcare',
    title: 'Healthcare & Medical Fleet',
    titleBn: 'স্বাস্থ্যসেবা ও মেডিকেল সেবা',
    icon: 'Stethoscope',
    shortDesc: 'Deploying specialized mobile watercraft to deliver emergency surgery, maternal care, and free medicines to islanders.',
    shortDescBn: 'দ্বীপবাসীদের জরুরি অস্ত্রোপচার, মাতৃকালীন সেবা এবং বিনামূল্যে ওষুধ সরবরাহের জন্য বিশেষায়িত মোবাইল নৌযান মোতায়েন।',
    image: '/images/programs-placeholder.png',
    stats: [
      { label: 'Medical Boats', value: '6 Fleet' },
      { label: 'Patients Treated', value: '1.2M+' },
      { label: 'Free Surgeries', value: '4,500' }
    ],
    content: [
      'Access to specialized healthcare is a major challenge for isolated coastal communities. To bridge this gap, CGFWA operates a state-of-the-art Mobile Medical Fleet.',
      'These specialized watercraft function as floating hospitals, complete with mini-operation theaters, diagnostic labs, and maternal care units. They are staffed by senior epidemiologists, surgeons, and dedicated nursing staff.',
      'Through this fleet, we conduct regular health camps, perform free cataract and minor surgeries, distribute essential medications, and provide critical pre- and post-natal care to mothers who would otherwise have no access to modern medicine.'
    ],
    contentBn: [
      'বিচ্ছিন্ন উপকূলীয় জনগোষ্ঠীর জন্য বিশেষায়িত স্বাস্থ্যসেবা পাওয়া একটি বড় চ্যালেঞ্জ। এই ব্যবধান ঘোচাতে, সিজিএফডব্লিউএ একটি অত্যাধুনিক মোবাইল মেডিকেল ফ্লিট পরিচালনা করে।',
      'এই বিশেষায়িত নৌযানগুলো ভাসমান হাসপাতাল হিসেবে কাজ করে, যেখানে মিনি-অপারেশন থিয়েটার, ডায়াগনস্টিক ল্যাব এবং মাতৃকালীন সেবা ইউনিট রয়েছে।',
      'এই বহরের মাধ্যমে, আমরা নিয়মিত স্বাস্থ্য ক্যাম্প পরিচালনা করি, বিনামূল্যে ছানি ও ছোটখাটো অস্ত্রোপচার করি, প্রয়োজনীয় ওষুধ বিতরণ করি এবং মায়েদের জরুরি প্রাক- ও প্রসবোত্তর যত্ন প্রদান করি।'
    ]
  },
  {
    id: 'act-05',
    slug: 'women-empowerment',
    title: 'Women Empowerment',
    titleBn: 'নারী ক্ষমতায়ন',
    icon: 'Users',
    shortDesc: 'Transforming coastal women into micro-entrepreneurs through vocational training, handloom hubs, and zero-interest loans.',
    shortDescBn: 'বৃত্তিমূলক প্রশিক্ষণ, তাঁত হাব এবং শূন্য-সুদের ঋণের মাধ্যমে উপকূলীয় নারীদের ক্ষুদ্র উদ্যোক্তায় রূপান্তর।',
    image: '/images/programs-placeholder.png',
    stats: [
      { label: 'Women Trained', value: '18,500' },
      { label: 'Micro-Loans', value: 'BDT 12Cr' },
      { label: 'Vocational Hubs', value: '45' }
    ],
    content: [
      'When you empower a coastal woman, you secure the future of an entire family. Our Women Artisans & Micro-Livelihood Project (WAML) is a cornerstone of our empowerment strategy.',
      'We establish local vocational hubs where women are trained in tailoring, handloom weaving, coastal agriculture, and handicrafts. Upon completion of their training, they are provided with the necessary tools, such as sewing machines or agricultural kits, to start their own micro-businesses.',
      'Furthermore, we facilitate zero-interest micro-loans and connect their products to national markets, ensuring they achieve genuine financial independence and a sustainable livelihood independent of traditional fishing.'
    ],
    contentBn: [
      'আপনি যখন একজন উপকূলীয় নারীকে ক্ষমতায়ন করেন, তখন আপনি একটি পুরো পরিবারের ভবিষ্যত সুরক্ষিত করেন। আমাদের নারী কারিগর ও ক্ষুদ্র জীবিকা প্রকল্প (ডব্লিউএএমএল) আমাদের ক্ষমতায়ন কৌশলের একটি মূলভিত্তি।',
      'আমরা স্থানীয় বৃত্তিমূলক হাব স্থাপন করি যেখানে নারীদের সেলাই, তাঁত বোনা, উপকূলীয় কৃষি এবং হস্তশিল্পের প্রশিক্ষণ দেওয়া হয়।',
      'এছাড়াও, আমরা শূন্য-সুদের ক্ষুদ্র-ঋণের ব্যবস্থা করি এবং তাদের পণ্যগুলোকে জাতীয় বাজারের সাথে সংযুক্ত করি, যাতে তারা প্রকৃত আর্থিক স্বাধীনতা এবং ঐতিহ্যবাহী মাছ ধরার ওপর নির্ভরশীলতা ছাড়াই একটি টেকসই জীবিকা অর্জন করতে পারে।'
    ]
  },
  {
    id: 'act-06',
    slug: 'social-responsibility',
    title: 'Social Responsibility',
    titleBn: 'সামাজিক দায়িত্ববোধ',
    icon: 'Globe2',
    shortDesc: 'Fostering environmental conservation, coastal heritage preservation, and climate change awareness among youth.',
    shortDescBn: 'পরিবেশ সংরক্ষণ, উপকূলীয় ঐতিহ্য রক্ষা এবং তরুণদের মধ্যে জলবায়ু পরিবর্তন বিষয়ক সচেতনতা বৃদ্ধি।',
    image: '/images/programs-placeholder.png',
    stats: [
      { label: 'Trees Planted', value: '500k+' },
      { label: 'Youth Volunteers', value: '12,500' },
      { label: 'Awareness Camps', value: '340' }
    ],
    content: [
      'Our duty extends beyond human welfare to the preservation of the coastal ecosystem and cultural heritage. CGFWA actively campaigns for environmental conservation.',
      'We run massive mangrove afforestation drives along the coastlines to create natural barriers against tidal surges. We also organize extensive climate change awareness camps in schools, teaching the next generation how to adapt and protect their environment.',
      'In addition, we host the annual National Maritime & Coastal Heritage Cultural Festival to celebrate and preserve the unique folk traditions, music, and crafts of the coastal people, fostering a deep sense of pride and social responsibility.'
    ],
    contentBn: [
      'আমাদের দায়িত্ব মানব কল্যাণের বাইরেও উপকূলীয় বাস্তুতন্ত্র এবং সাংস্কৃতিক ঐতিহ্য সংরক্ষণের প্রসারিত। সিজিএফডব্লিউএ সক্রিয়ভাবে পরিবেশ সংরক্ষণের জন্য প্রচারণা চালায়।',
      'আমরা জলোচ্ছ্বাসের বিরুদ্ধে প্রাকৃতিক বাধা তৈরি করতে উপকূল বরাবর বিশাল ম্যানগ্রোভ বনায়ন কর্মসূচি পরিচালনা করি। আমরা স্কুলগুলোতে ব্যাপক জলবায়ু পরিবর্তন সচেতনতা ক্যাম্পের আয়োজন করি।',
      'অতিরিক্তভাবে, আমরা উপকূলীয় মানুষের অনন্য লোকজ ঐতিহ্য, সঙ্গীত এবং কারুশিল্প উদযাপন ও সংরক্ষণের জন্য বার্ষিক জাতীয় সামুদ্রিক ও উপকূলীয় ঐতিহ্য সাংস্কৃতিক উৎসবের আয়োজন করি।'
    ]
  }
];
