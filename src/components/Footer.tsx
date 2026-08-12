import React from 'react';
import { Language } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { translations } from '../data/translations';
import { Phone, Mail, FileText, Bot, MessageSquare, ShieldCheck } from 'lucide-react';
import { AraakLogo } from './AraakLogo';

interface FooterProps {
  lang: Language;
  onOpenRfq: () => void;
  onOpenAiAdvisor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenRfq,
  onOpenAiAdvisor,
}) => {
  const t = translations[lang];

  return (
    <>
      {/* Main Corporate Footer */}
      <footer className="bg-[#050A0C] border-t border-[#C5A059]/20 text-slate-300 pt-16 pb-28 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Col 1: Brand & Identity */}
            <div className="lg:col-span-5 space-y-4">
              <a href="#home" className="inline-block">
                <AraakLogo height={48} showSubtitle={true} />
              </a>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {lang === 'ar'
                  ? 'مصنع سعودي متخصص في إنتاج الأنظمة والحلول المعدنية للمشاريع والقطاع التجاري، مدعوم بقدرة 500 طن/وردية واعتمادات جودة دولية.'
                  : 'Saudi manufacturer specializing in precision steel profile systems for projects and commercial sectors, yielding 500 tons/shift under ISO certified standards.'}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-[#C5A059]">
                  ISO 9001:2015
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-[#C5A059]">
                  ISO 14001
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-[#C5A059]">
                  ISO 45001
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-[#C5A059]">
                  SCA
                </span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-bold text-white font-serif">
                {lang === 'ar' ? 'روابط الوصول السريع' : 'Navigation Links'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="hover:text-[#C5A059] transition-colors">{t.navAbout}</a></li>
                <li><a href="#products" className="hover:text-[#C5A059] transition-colors">{t.navProducts}</a></li>
                <li><a href="#quality" className="hover:text-[#C5A059] transition-colors">{t.navQuality}</a></li>
                <li><a href="#projects" className="hover:text-[#C5A059] transition-colors">{t.navProjects}</a></li>
                <li><a href="#contact" className="hover:text-[#C5A059] transition-colors">{t.navContact}</a></li>
              </ul>
            </div>

            {/* Col 3: Direct Contact */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-sm font-bold text-white font-serif">
                {lang === 'ar' ? 'التوريد والمبيعات المباشرة' : 'Direct Factory Supply'}
              </h4>
              <div className="space-y-2 text-xs">
                <p className="text-slate-400 leading-relaxed">
                  {lang === 'ar' ? COMPANY_INFO.addressAr : COMPANY_INFO.addressEn}
                </p>
                <p className="text-[#C5A059] text-[11px] font-mono font-bold">
                  Plus Code: {COMPANY_INFO.plusCode}
                </p>
                <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-[#C5A059] dir-ltr block hover:underline">
                  {COMPANY_INFO.phoneDisplay || COMPANY_INFO.phone}
                </a>
                <p className="text-slate-300">
                  {COMPANY_INFO.salesEmail}
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onOpenRfq}
                  className="w-full py-2.5 rounded-lg bg-[#C5A059] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.btnRfq}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Copyright Bottom */}
          <div className="mt-12 pt-6 border-t border-slate-900 text-center text-xs text-slate-400 font-mono">
            <p>{COMPANY_INFO.copyrightAr}</p>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Action Dock (Visible only on mobile/tablet screens < lg) */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#0B1519]/90 backdrop-blur-xl border border-[#C5A059]/40 rounded-2xl p-2 shadow-2xl shadow-black flex items-center justify-around gap-1">
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2 rounded-xl bg-emerald-600/90 text-white text-[11px] font-bold flex flex-col items-center justify-center"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span>واتساب</span>
        </a>

        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-200 text-[11px] font-bold flex flex-col items-center justify-center"
        >
          <Phone className="w-4 h-4 text-[#C5A059] mb-0.5" />
          <span>اتصال</span>
        </a>

        <button
          onClick={onOpenRfq}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 text-[11px] font-extrabold flex flex-col items-center justify-center"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span>RFQ</span>
        </button>

        <button
          onClick={onOpenAiAdvisor}
          className="flex-1 py-2 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 text-white text-[11px] font-bold flex flex-col items-center justify-center"
        >
          <Bot className="w-4 h-4 text-[#C5A059] mb-0.5" />
          <span>المستشار</span>
        </button>
      </div>
    </>
  );
};
