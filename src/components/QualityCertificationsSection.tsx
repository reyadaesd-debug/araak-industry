import React, { useState } from 'react';
import { Language, Certification } from '../types';
import { CERTIFICATIONS } from '../data/companyData';
import { translations } from '../data/translations';
import { ShieldCheck, Award, Maximize2, X, CheckCircle } from 'lucide-react';

interface QualityCertificationsProps {
  lang: Language;
}

export const QualityCertificationsSection: React.FC<QualityCertificationsProps> = ({ lang }) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const t = translations[lang];

  return (
    <section id="quality" className="py-24 bg-[#070E11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.qualitySubTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-serif">
            {t.qualityTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            {t.clickCertToView}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-4 rounded-full" />
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="glass-panel p-6 rounded-2xl border border-[#C5A059]/20 glass-panel-hover flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1A4F63] border border-[#C5A059]/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#C5A059]/20 border border-[#C5A059]/40 text-xs font-mono font-bold text-[#C5A059]">
                    {cert.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#C5A059] transition-colors">
                  {lang === 'ar' ? cert.titleAr : cert.titleEn}
                </h3>

                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {lang === 'ar' ? cert.issuerAr : cert.issuerEn}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mt-3 font-normal">
                  {lang === 'ar' ? cert.descriptionAr : cert.descriptionEn}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-[#C5A059]">
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'معاينة الوثيقة' : 'Inspect Document'}</span>
                </span>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl rounded-2xl border border-[#C5A059]/40 p-6 relative space-y-4">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
              <div>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'ar' ? selectedCert.titleAr : selectedCert.titleEn}
                </h3>
                <span className="text-xs text-[#C5A059] font-mono">
                  {lang === 'ar' ? selectedCert.issuerAr : selectedCert.issuerEn}
                </span>
              </div>
            </div>

            <div className="relative h-72 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.titleAr}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-slate-950/80 border border-[#C5A059]/30 text-xs text-slate-200">
                {lang === 'ar' ? selectedCert.descriptionAr : selectedCert.descriptionEn}
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-slate-400">
              {lang === 'ar' ? 'وثيقة سارية ومعتمدة لدى كافة الجهات والهيئات السعودية' : 'Verified official certification active for Saudi industrial projects'}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
