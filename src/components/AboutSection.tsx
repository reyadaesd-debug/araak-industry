import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Factory, Truck, Award, ShieldCheck, Check } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const cards = [
    {
      title: t.card1Title,
      desc: t.card1Desc,
      icon: <Factory className="w-6 h-6 text-[#C5A059]" />,
      highlights: lang === 'ar' ? ['خطوط درفلة PLC رقمية', '500 طن طاقة يومية'] : ['Automated PLC Lines', '500 Ton Shift Capacity'],
    },
    {
      title: t.card2Title,
      desc: t.card2Desc,
      icon: <Truck className="w-6 h-6 text-[#C5A059]" />,
      highlights: lang === 'ar' ? ['أسطول شحن خاص', 'تغطية 28 مدينة ومنطقة'] : ['Dedicated Transport Fleet', '28 Cities & Regions Served'],
    },
    {
      title: t.card3Title,
      desc: t.card3Desc,
      icon: <Award className="w-6 h-6 text-[#C5A059]" />,
      highlights: lang === 'ar' ? ['اختبارات سمك وجلفنة', 'شهادات ISO معتمدة'] : ['Micrometer Thickness QC', 'Full ISO Certification'],
    },
    {
      title: t.card4Title,
      desc: t.card4Desc,
      icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
      highlights: lang === 'ar' ? ['تأهيل الهيئة السعودية للمقاولين', '49 مشروعاً مرجعياً'] : ['SCA Verified Vendor', '49 Reference Projects'],
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#070E11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.aboutSubTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-serif">
            {t.aboutTitle}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-4">
            {t.aboutDesc}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-6 rounded-full" />
        </div>

        {/* Content Layout: Image + 4 Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Big Factory Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-2xl min-h-[380px]">
            <img
              src={IMAGES.factoryTeam}
              alt="Inside ARAAK Industry Factory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070E11] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-[#C5A059]/30">
              <p className="text-xs font-bold text-[#C5A059] uppercase tracking-wider font-mono">
                {lang === 'ar' ? 'مصنع اراك الصناعية' : 'ARAAK INDUSTRY FACTORY'}
              </p>
              <p className="text-sm font-semibold text-white mt-0.5">
                {lang === 'ar'
                  ? 'خطوط تشكيل بالدرفلة الباردة بأعلى المعايير الهندسيّة'
                  : 'Cold Roll-Forming Production Lines Conforming to International Specs'}
              </p>
            </div>
          </div>

          {/* 4 Glass Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-[#C5A059]/20 glass-panel-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1A4F63]/40 border border-[#C5A059]/40 flex items-center justify-center mb-4 group-hover:border-[#C5A059] transition-all">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#C5A059] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2 font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
                  {card.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-[11px] font-semibold text-[#C5A059]">
                      <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
