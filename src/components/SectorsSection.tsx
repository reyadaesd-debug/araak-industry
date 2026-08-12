import React from 'react';
import { Language } from '../types';
import { SECTORS } from '../data/companyData';
import { translations } from '../data/translations';
import { Building2, Layers, CheckCircle2 } from 'lucide-react';

interface SectorsSectionProps {
  lang: Language;
}

export const SectorsSection: React.FC<SectorsSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="sectors" className="py-24 bg-[#0B1519] relative overflow-hidden border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.sectorsSubTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-serif">
            {t.sectorsTitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-4 rounded-full" />
        </div>

        {/* Sectors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SECTORS.map((sector) => (
            <div
              key={sector.id}
              className="glass-panel rounded-2xl overflow-hidden border border-[#C5A059]/20 glass-panel-hover group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={sector.imageUrl}
                    alt={lang === 'ar' ? sector.titleAr : sector.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 p-2 rounded-lg bg-slate-950/80 border border-[#C5A059]/30">
                    <Building2 className="w-5 h-5 text-[#C5A059]" />
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#C5A059] transition-colors font-serif">
                    {lang === 'ar' ? sector.titleAr : sector.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {lang === 'ar' ? sector.descriptionAr : sector.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Recommended Steel Profiles Hover Reveal */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4">
                <span className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider block mb-2 font-mono">
                  {t.recommendedProfiles}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'ar' ? sector.recommendedProductsAr : sector.recommendedProductsEn).map((prod, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#1A4F63]/50 border border-[#C5A059]/30 text-slate-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                      <span>{prod}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
