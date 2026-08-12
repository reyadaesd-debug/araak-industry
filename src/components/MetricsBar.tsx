import React from 'react';
import { Language } from '../types';
import { KEY_METRICS } from '../data/companyData';
import { translations } from '../data/translations';
import { TrendingUp, Factory, ShieldCheck, MapPin, Building2, Layers } from 'lucide-react';

interface MetricsBarProps {
  lang: Language;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ lang }) => {
  const t = translations[lang];

  const icons = [
    <Factory className="w-6 h-6 text-[#C5A059]" key="1" />,
    <TrendingUp className="w-6 h-6 text-[#C5A059]" key="2" />,
    <Layers className="w-6 h-6 text-[#C5A059]" key="3" />,
    <ShieldCheck className="w-6 h-6 text-[#C5A059]" key="4" />,
    <Building2 className="w-6 h-6 text-[#C5A059]" key="5" />,
    <MapPin className="w-6 h-6 text-[#C5A059]" key="6" />,
  ];

  return (
    <section className="py-16 bg-[#0B1519] relative border-y border-[#C5A059]/20 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000"
          alt="Factory Operational Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.numbersSubTitle}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 font-serif">
            {t.numbersTitle}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-3 rounded-full" />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {KEY_METRICS.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-xl border border-[#C5A059]/20 glass-panel-hover text-center flex flex-col items-center justify-between group"
            >
              <div className="p-3 rounded-xl bg-[#1A4F63]/30 border border-[#C5A059]/30 mb-3 group-hover:scale-110 transition-transform">
                {icons[idx % icons.length]}
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#C5A059] transition-colors">
                  <span>{item.value}</span>
                  <span className="text-sm font-semibold text-[#C5A059]">
                    {lang === 'ar' ? item.suffix : item.suffixEn}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-300 leading-tight">
                  {lang === 'ar' ? item.labelAr : item.labelEn}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
