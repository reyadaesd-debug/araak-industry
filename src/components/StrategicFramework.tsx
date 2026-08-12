import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Target, Compass, Sparkles, ShieldCheck, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface StrategicFrameworkProps {
  lang: Language;
}

export const StrategicFramework: React.FC<StrategicFrameworkProps> = ({ lang }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const flowSteps = [
    { num: '01', title: t.flow1, desc: lang === 'ar' ? 'فهم احتياجات المقاولين والمشاريع' : 'Understanding contractor & project needs' },
    { num: '02', title: t.flow2, desc: lang === 'ar' ? 'إنتاج 500 طن/وردية بتقنية متطورة' : '500 Tons/shift advanced manufacturing' },
    { num: '03', title: t.flow3, desc: lang === 'ar' ? 'مقاطع مجلفنة بدقة وباعتمادات ISO' : 'ISO certified precision galvanized profiles' },
    { num: '04', title: t.flow4, desc: lang === 'ar' ? 'نجاح المشروع والتوريد الموثوق' : 'Project success & reliable supply' },
  ];

  return (
    <section id="strategy" className="py-24 bg-[#0B1519] relative overflow-hidden border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.strategySubTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-serif">
            {t.strategyTitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-4 rounded-full" />
        </div>

        {/* Vision & Mission Unified Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Vision */}
          <div className="glass-panel p-8 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 flex items-center justify-center">
                <Compass className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">{t.visionLabel}</h3>
            </div>
            <p className="text-slate-200 text-lg leading-relaxed font-medium">
              "{t.visionText}"
            </p>
          </div>

          {/* Mission */}
          <div className="glass-panel p-8 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A4F63]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#C5A059]" />
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">{t.missionLabel}</h3>
            </div>
            <p className="text-slate-200 text-lg leading-relaxed font-medium">
              "{t.missionText}"
            </p>
          </div>

        </div>

        {/* Values Badges */}
        <div className="mb-16">
          <h4 className="text-center text-sm font-bold text-[#C5A059] uppercase tracking-wider mb-6 font-mono">
            {t.valuesLabel}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-[#C5A059]/20 text-center hover:border-[#C5A059] transition-all">
              <ShieldCheck className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
              <span className="text-base font-bold text-white">{t.val1}</span>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-[#C5A059]/20 text-center hover:border-[#C5A059] transition-all">
              <ShieldCheck className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
              <span className="text-base font-bold text-white">{t.val2}</span>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-[#C5A059]/20 text-center hover:border-[#C5A059] transition-all">
              <Sparkles className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
              <span className="text-base font-bold text-white">{t.val3}</span>
            </div>
            <div className="glass-panel p-4 rounded-xl border border-[#C5A059]/20 text-center hover:border-[#C5A059] transition-all">
              <ShieldCheck className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
              <span className="text-base font-bold text-white">{t.val4}</span>
            </div>
          </div>
        </div>

        {/* Value Creation Flow Experience */}
        <div className="glass-panel p-8 rounded-2xl border border-[#C5A059]/30">
          <h4 className="text-center text-lg font-bold text-white mb-8">
            {lang === 'ar' ? 'مسار صناعة القيمة للمشاريع' : 'The Industrial Value Creation Path'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {flowSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 text-center relative group hover:border-[#C5A059] transition-all">
                  <span className="text-2xl font-black text-[#C5A059]/40 font-mono block mb-1">
                    {step.num}
                  </span>
                  <h5 className="text-base font-bold text-white mb-1 group-hover:text-[#C5A059] transition-colors">
                    {step.title}
                  </h5>
                  <p className="text-xs text-slate-300 leading-tight">
                    {step.desc}
                  </p>
                </div>
                {idx < flowSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-[#C5A059]">
                    {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
