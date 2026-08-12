import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, ArrowLeft, FileText, Bot, ShieldCheck, Factory, Award, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';
import steelCoilsImg from '../assets/images/araak_steel_coils_1786556897527.jpg';
import ceilingFramingImg from '../assets/images/araak_ceiling_framing_1786557067611.jpg';
import drywallStudsImg from '../assets/images/araak_drywall_studs_1786557083679.jpg';

interface HeroSectionProps {
  lang: Language;
  onOpenRfq: () => void;
  onOpenAiAdvisor: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenRfq,
  onOpenAiAdvisor,
}) => {
  const [activeTab, setActiveTab] = useState<'ceiling' | 'drywall'>('ceiling');
  const t = translations[lang];
  const isRtl = lang === 'ar';

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#070E11]">
      {/* Cinematic High-Res Industrial Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.factoryHall}
          alt="ARAAK Industry Roll Forming & Steel Production"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow transition-transform duration-1000 opacity-40"
        />
        {/* Dark Cinematic Vignette & Gradient Overlays for Superior Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070E11] via-[#070E11]/90 to-[#070E11]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070E11] via-transparent to-[#070E11]/80" />
        <div className="absolute inset-0 industrial-grid-bg opacity-20" />
      </div>

      {/* Decorative Ambient Lighting Spheres */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#1A4F63]/25 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#C5A059]/15 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Cinematic Text & Call to Actions Column */}
          <div className="lg:col-span-7 space-y-7 text-right dir-rtl">
            
            {/* National Manufacturer Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0B1519]/90 border border-[#C5A059]/50 backdrop-blur-md shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs font-bold text-slate-100 tracking-wide">
                {lang === 'ar'
                  ? 'مصنّع وطني سعودي معتمد • طاقة تشغيلية 500 طن/وردية'
                  : 'Certified Saudi Manufacturer • 500 Tons/Shift Capacity'}
              </span>
            </div>

            {/* Cinematic Title & Tagline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white leading-none font-serif tracking-tight">
                {lang === 'ar' ? 'اراك الصناعية' : 'ARAAK INDUSTRY'}
              </h1>
              <div className="text-2xl sm:text-4xl xl:text-5xl font-extrabold gold-gradient-text leading-tight">
                {t.heroHeadline1} {t.heroHeadline2}
              </div>
            </div>

            {/* Supporting Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {t.heroSub}
            </p>

            {/* High-Impact Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenRfq}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#E5C158] text-slate-950 font-extrabold text-sm sm:text-base shadow-2xl shadow-[#C5A059]/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-3 cursor-pointer group"
              >
                <FileText className="w-5 h-5 text-slate-950" />
                <span>{t.btnRfq}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 text-slate-950 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <a
                href="#products"
                className="px-6 py-4 rounded-xl bg-[#0B1519]/80 border border-slate-700 hover:border-[#C5A059] text-white font-bold text-sm sm:text-base shadow-xl backdrop-blur-md hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-5 h-5 text-[#C5A059]" />
                <span>{t.btnExploreProducts}</span>
              </a>

              <button
                onClick={onOpenAiAdvisor}
                className="px-5 py-4 rounded-xl bg-[#1A4F63]/60 border border-[#C5A059]/40 hover:border-[#C5A059] text-slate-200 hover:text-white text-sm font-semibold backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-5 h-5 text-[#C5A059]" />
                <span>{t.btnTalkAdvisor}</span>
              </button>
            </div>

            {/* Trust Checkmarks */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{lang === 'ar' ? 'حديد مجلفن Z120-Z275' : 'Z120-Z275 Galvanized'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{lang === 'ar' ? 'مطابق لشهادات ISO' : 'ISO Certified Standard'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{lang === 'ar' ? 'اعتماد الهيئة السعودية' : 'SCA Approved Vendor'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{lang === 'ar' ? 'كود البناء KSA' : 'Saudi Building Code'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Steel System Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-6 rounded-3xl border border-[#C5A059]/40 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
              
              {/* Header inside Card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1A4F63] border border-[#C5A059]/50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {lang === 'ar' ? 'أنظمة اراك المعدنية المعتمدة' : 'ARAAK Metal Framing Systems'}
                    </h3>
                    <p className="text-[11px] text-[#C5A059] font-mono">
                      {lang === 'ar' ? 'صناعة سعودية فائقة الدقة' : 'High-Precision Saudi Roll Forming'}
                    </p>
                  </div>
                </div>
              </div>

              {/* System Selector Tabs */}
              <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('ceiling')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'ceiling'
                      ? 'bg-[#1A4F63] text-white border border-[#C5A059]/50 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'أنظمة الأسقف المستعارة' : 'Ceiling Framing'}
                </button>
                <button
                  onClick={() => setActiveTab('drywall')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'drywall'
                      ? 'bg-[#1A4F63] text-white border border-[#C5A059]/50 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? 'أنظمة القواطع الجدارية' : 'Drywall Studs & Tracks'}
                </button>
              </div>

              {/* Dynamic Image & Spec Showcase */}
              <div className="mt-4 relative h-56 rounded-xl overflow-hidden border border-[#C5A059]/40 shadow-inner group-hover:border-[#C5A059] transition-all">
                <img
                  key={activeTab}
                  src={activeTab === 'ceiling' ? ceilingFramingImg : drywallStudsImg}
                  alt={
                    activeTab === 'ceiling'
                      ? 'أنظمة الأسقف المستعارة - مقاطع أوميقا وزاوية وبحرية'
                      : 'أنظمة القواطع الجدارية - أوميقا وسي ستد ويوتراك'
                  }
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105 animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-slate-950/85 backdrop-blur-md border border-[#C5A059]/40 text-xs">
                  <span className="font-bold text-[#C5A059] block">
                    {activeTab === 'ceiling'
                      ? (lang === 'ar' ? 'أنظمة الأسقف المستعارة (Furring, Main Channel & Wall Angle)' : 'Furring, Main Channel & Wall Angle Systems')
                      : (lang === 'ar' ? 'أنظمة القواطع الجدارية (C-Stud & U-Track Systems)' : 'C-Stud & U-Track Drywall Partition Systems')}
                  </span>
                  <span className="text-slate-300 text-[11px] block mt-0.5">
                    {activeTab === 'ceiling'
                      ? (lang === 'ar' ? 'مقاطع فورنج، ماين تشانل وزاوية حائط • سمك 0.35-0.80 مم • جلفنة Z275' : 'Furring & Main Channels • 0.35-0.80mm • Z275 Galvanized')
                      : (lang === 'ar' ? 'مقاطع سي ستد ويوتراك للقواطع الجدارية • سمك 0.40-1.20 مم • جلفنة Z275' : 'C-Stud & U-Track Studs • 0.40-1.20mm • Z275 Galvanized')}
                  </span>
                </div>
              </div>

              {/* Quick Specs Sheet */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">{lang === 'ar' ? 'الإنتاجية اليومية:' : 'Daily Capacity:'}</span>
                  <span className="font-extrabold text-white text-xs">500 {lang === 'ar' ? 'طن / وردية' : 'Tons / Shift'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">{lang === 'ar' ? 'التسليم للمشروع:' : 'Delivery Time:'}</span>
                  <span className="font-extrabold text-[#C5A059] text-xs">{lang === 'ar' ? 'خلال 24-48 ساعة' : 'Within 24-48 Hrs'}</span>
                </div>
              </div>

              {/* Quick Request Button inside Card */}
              <button
                onClick={onOpenRfq}
                className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#1A4F63] to-[#0D303D] border border-[#C5A059]/60 text-white font-bold text-xs hover:border-[#C5A059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <span>{lang === 'ar' ? 'طلب تسعيرة لهذا النظام' : 'Request Quotation for System'}</span>
              </button>

            </div>
          </div>

        </div>

        {/* Floating Glass Metrics Ribbon overlaying bottom of Hero */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-2xl border border-[#C5A059]/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A4F63]/50 border border-[#C5A059]/40 flex items-center justify-center shrink-0">
              <Factory className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <span className="text-2xl font-black text-white block leading-none">500</span>
              <span className="text-[11px] text-slate-300 font-medium">
                {lang === 'ar' ? 'طن / طاقة وردية' : 'Tons Shift Capacity'}
              </span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#C5A059]/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A4F63]/50 border border-[#C5A059]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <span className="text-2xl font-black text-[#C5A059] block leading-none">Z275</span>
              <span className="text-[11px] text-slate-300 font-medium">
                {lang === 'ar' ? 'جلفنة صاج نقية' : 'Pure Zinc Coating'}
              </span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#C5A059]/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A4F63]/50 border border-[#C5A059]/40 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <span className="text-2xl font-black text-white block leading-none">ISO</span>
              <span className="text-[11px] text-slate-300 font-medium">
                {lang === 'ar' ? '9001 • 14001 • 45001' : 'Certifications Approved'}
              </span>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#C5A059]/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A4F63]/50 border border-[#C5A059]/40 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <span className="text-2xl font-black text-white block leading-none">100%</span>
              <span className="text-[11px] text-slate-300 font-medium">
                {lang === 'ar' ? 'مطابق لكود KSA' : 'SBC Building Code'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

