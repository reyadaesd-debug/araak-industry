import React from 'react';
import { Language } from '../types';
import { PARTNERS } from '../data/companyData';
import { translations } from '../data/translations';
import { ShieldCheck } from 'lucide-react';

interface PartnersSectionProps {
  lang: Language;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-20 bg-[#070E11] relative overflow-hidden border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.partnersSubTitle}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 font-serif">
            {t.partnersTitle}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-3 rounded-full" />
        </div>

        {/* Partners Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-[#C5A059]/20 text-center glass-panel-hover flex flex-col items-center justify-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#1A4F63]/50 border border-[#C5A059]/30 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-[#C5A059] transition-colors">
                {lang === 'ar' ? partner.nameAr : partner.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {lang === 'ar' ? partner.roleAr : partner.roleEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
