'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Target, Eye, BookOpen, ShieldAlert, HeartPulse, Scissors, Droplets, LifeBuoy, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function MissionVisionPage() {
  const { language, t } = useLanguage();

  const objectives = [
  {
    title: 'Educational Continuity for Coastal Children',
    titleBn: 'উপকূলীয় শিশুদের নির্বিঘ্ন শিক্ষা',
    desc: 'Ensure continuous financial stipends, textbook distribution, and digital learning support to fisherman and low-income coastal families.',
    descBn: 'জেলে ও দরিদ্র উপকূলীয় পরিবারের সন্তানদের উচ্চশিক্ষা পর্যন্ত শিক্ষাবৃত্তি ও শিক্ষা উপকরণ নিশ্চিত করা।',
    icon: <BookOpen className="w-5 h-5 text-brandBlue" />,
    badge: 'Education & Stipends',
    badgeBn: 'শিক্ষা ও উপবৃত্তি'
  },
  {
    title: 'Marine Disaster & Fishermen Safety',
    titleBn: 'সামুদ্রিক নিরাপত্তা ও জেলে কল্যাণ',
    desc: 'Equip deep-sea fishing crews with AIS GPS locator beacons, weather survival life vests, and emergency bereavement support.',
    descBn: 'গভীর সাগরের জেলেদের জীবনরক্ষাকারী লাইফ জ্যাকেট, ট্র্যাকার ও জরুরি ক্ষতিপূরণ সুবিধা প্রদান।',
    icon: <ShieldAlert className="w-5 h-5 text-brandRed" />,
    badge: 'Safety & Relief',
    badgeBn: 'নিরাপত্তা ও উদ্ধার'
  },
  {
    title: 'Mobile Estuary Healthcare Fleets',
    titleBn: 'ভাসমান স্বাস্থ্য ক্লিনিক বহর',
    desc: 'Operate specialized floating medical crafts providing doctors, maternal care, and emergency ambulance transit in isolated island unions.',
    descBn: 'বিচ্ছিন্ন উপকূলীয় চরাঞ্চলে জলযান মেডিকেল অ্যাম্বুলেন্স ও বিশেষজ্ঞ চিকিৎসকের মাধ্যমে চিকিৎসা সেবা।',
    icon: <HeartPulse className="w-5 h-5 text-brandBlue" />,
    badge: 'Mobile Medical',
    badgeBn: 'ভাসমান চিকিৎসা'
  },
  {
    title: 'Women Artisans & Livelihood Empowerment',
    titleBn: 'নারী হস্তশিল্প ও স্বাবলম্বিতা',
    desc: 'Provide sewing equipment, artisan loom training, and direct market exhibitions for coastal women self-sufficiency.',
    descBn: 'উপকূলীয় নারীদের সেলাই মেশিন প্রদান, হস্তশিল্প প্রশিক্ষণ ও উৎপাদিত পণ্যের বিপণন সহায়তা।',
    icon: <Scissors className="w-5 h-5 text-brandBlue" />,
    badge: 'Livelihoods',
    badgeBn: 'ক্ষুদ্র জীবিকা'
  },
  {
    title: 'Salinity-Free Pure Water Desalination',
    titleBn: 'লবণাক্ততামুক্ত সুপেয় খাবার পানি',
    desc: 'Install solar-powered Reverse Osmosis water purification plants in disaster-prone coastal belts of Shyamnagar, Satkhira, and Barguna.',
    descBn: 'লবণাক্ততা কবলিত দক্ষিণ-পশ্চিমাঞ্চলে সৌরচালিত পানি শোধন প্ল্যান্ট ও পানির ট্যাংক বিতরণ।',
    icon: <Droplets className="w-5 h-5 text-brandBlue" />,
    badge: 'Clean Water',
    badgeBn: 'সুপেয় পানি'
  },
  {
    title: 'Emergency Relief & Cyclone Rehabilitation',
    titleBn: 'জরুরি ঘূর্ণিঝড় ত্রাণ ও পুনর্বাসন',
    desc: 'Rapid deployment of food rations, dry clothes, shelter repair kits, and water purification units during coastal cyclones and surges.',
    descBn: 'ঘূর্ণিঝড় ও জলোচ্ছ্বাসের সময় খাদ্য সামগ্রী, শুকনা খাবার, গৃহনির্মাণ উপকরণ ও পুনর্বাসন সহায়তা।',
    icon: <LifeBuoy className="w-5 h-5 text-brandBlue" />,
    badge: 'Disaster Response',
    badgeBn: 'জরুরি সাড়া'
  }];


  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <PageHeader
        category="Strategic Direction"
        categoryBn="কৌশলগত দিকনির্দেশনা"
        title="Mission, Vision & Key Objectives"
        titleBn="আমাদের মিশন, ভিশন ও প্রধান লক্ষ্যসমূহ"
        subtitle="Guiding Principles Steering Coastal Welfare, Disaster Preparedness, and Social Equity."
        subtitleBn="উপকূলীয় জনগোষ্ঠীর নিরাপত্তা, শিক্ষা ও সামাজিক অগ্রগতির সার্বিক রূপরেখা।" />
      

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission Card */}
        <div className="bg-white rounded-md p-8 border border-slate-200/90 shadow-xs space-y-4 hover:border-brandYellow/40 transition-all">
          <div className="w-12 h-12 rounded-md bg-brandYellow/10 text-brandBlue flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <SectionHeader
            badge="CORE MANDATE"
            badgeBn="মূল ম্যান্ডেট"
            title="Our Mission"
            titleBn="আমাদের মিশন"
            className="mb-0 sm:mb-0"
          />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            {t(
              'To empower vulnerable coastal and riverine communities in Bangladesh by delivering continuous educational scholarships, emergency marine relief, mobile healthcare, vocational training for women, and solar desalination infrastructure.',
              'উপকূলীয় ও চরাঞ্চলের জনগণকে শিক্ষাবৃত্তি, জরুরি উদ্ধার সহায়তা, ভ্রাম্যমাণ স্বাস্থ্যসেবা, নারী ক্ষমতায়ন ও সুপেয় পানি সুবিধা প্রদানের মাধ্যমে স্বাবলম্বী করে তোলা।'
            )}
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-brandBlue text-white rounded-md p-8 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brandYellow/20 rounded-full blur-2xl pointer-events-none" />
          <div className="w-12 h-12 rounded-md bg-brandYellow text-white flex items-center justify-center shadow-md">
            <Eye className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <SectionHeader
              badge="LONG TERM HORIZON"
              badgeBn="দীর্ঘমেয়াদী রূপকল্প"
              title="Our Vision 2030"
              titleBn="আমাদের ভিশন ২০৩০"
              lightText={true}
              className="mb-0 sm:mb-0"
            />
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed relative z-10 font-normal">
            {t(
              'A climate-resilient, economically self-sufficient coastal Bangladesh where no child drops out of school due to poverty, no fisherman is lost at sea without emergency GPS locator beacons, and every rural household has dignified access to healthcare and clean water.',
              'এমন একটি সহনশীল ও স্বাবলম্বী উপকূলীয় বাংলাদেশ যেখানে কোনো শিশু অর্থের অভাবে শিক্ষা থেকে বঞ্চিত হবে না এবং প্রতিটি জেলে পরিবার নিরাপদ কর্ম পরিবেশ পাবে।'
            )}
          </p>
        </div>
      </div>

      {/* Key Statutory Objectives Section */}
      <section id="objectives" className="space-y-6 pt-4">
        <div className="border-b border-slate-200/80 pb-4">
          <SectionHeader
            badge="STATUTORY OBJECTIVES"
            badgeBn="সংবিধিবদ্ধ প্রধান উদ্দেশ্যসমূহ"
            title="Key Statutory Objectives of CGFWA"
            titleBn="সিজিএফডব্লিউএ-এর প্রধান লক্ষ্য ও উদ্দেশ্যসমূহ"
            subtitle="Core operational mandates defined under our founding charter, steering coastal welfare programs, emergency interventions, and sustainable community growth."
            subtitleBn="প্রতিষ্ঠানের সনদ ও সরকারি নীতিমালার আলোকে উপকূলীয় জনসেবা, জরুরি ত্রাণ ও নারী উন্নয়ন সংক্রান্ত সাংবিধানিক উদ্দেশ্যসমূহ।"
            className="mb-0 sm:mb-0"
          />
        </div>

        {/* Objectives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, i) =>
          <Card key={i} className="flex flex-col justify-between group">
            <div className="space-y-0">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-3 rounded-md bg-slate-50 border border-slate-200/80 shrink-0 group-hover:bg-brandYellow/10 group-hover:border-brandYellow/20 group-hover:text-brandBlue transition-all">
                    {obj.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-brandYellow/10 text-brandBlue border border-brandYellow/20 uppercase tracking-widest">
                    {language === 'bn' ? obj.badgeBn : obj.badge}
                  </span>
                </div>
                <CardTitle>
                  {language === 'bn' ? obj.titleBn : obj.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'bn' ? obj.descBn : obj.desc}
                </p>
              </CardContent>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 text-[11px] font-medium text-slate-400 flex items-center justify-between">
              <span className="border-t border-slate-100 pt-3 w-full flex justify-between">
                <span>{t(`Objective #${i + 1}`, `লক্ষ্য নম্বর #${i + 1}`)}</span>
                <span className="text-brandBlue font-bold">CGFWA</span>
              </span>
            </div>
          </Card>
          )}
        </div>
      </section>
    </div>);

};