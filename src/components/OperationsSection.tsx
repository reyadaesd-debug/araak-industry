import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Cpu, Layers, CheckCircle2, PackageCheck, Truck, ShieldAlert, Sparkles, RefreshCw, Activity } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface OperationsSectionProps {
  lang: Language;
}

export const OperationsSection: React.FC<OperationsSectionProps> = ({ lang }) => {
  const [activeStep, setActiveStep] = useState(0);
  const t = translations[lang];

  const steps = [
    {
      num: '01',
      title: t.opStep1,
      desc: t.opStep1Desc,
      icon: <Layers className="w-5 h-5 text-[#C5A059]" />,
      img: IMAGES.steelCoils,
    },
    {
      num: '02',
      title: t.opStep2,
      desc: t.opStep2Desc,
      icon: <Cpu className="w-5 h-5 text-[#C5A059]" />,
      img: IMAGES.factoryHall,
    },
    {
      num: '03',
      title: t.opStep3,
      desc: t.opStep3Desc,
      icon: <Activity className="w-5 h-5 text-[#C5A059]" />,
      img: IMAGES.steelProfiles,
    },
    {
      num: '04',
      title: t.opStep4,
      desc: t.opStep4Desc,
      icon: <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />,
      img: IMAGES.factoryTeam,
    },
    {
      num: '05',
      title: t.opStep5,
      desc: t.opStep5Desc,
      icon: <PackageCheck className="w-5 h-5 text-[#C5A059]" />,
      img: IMAGES.productPortfolio,
    },
    {
      num: '06',
      title: t.opStep6,
      desc: t.opStep6Desc,
      icon: <Truck className="w-5 h-5 text-[#C5A059]" />,
      img: IMAGES.housingProjects,
    },
  ];

  return (
    <section id="operations" className="py-24 bg-[#0B1519] relative overflow-hidden border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.opsSubTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-serif">
            {t.opsTitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-4 rounded-full" />
        </div>

        {/* Sticky Factory Image + Scrolling Steps Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Steps List */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveStep(idx)}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'glass-panel border-[#C5A059] shadow-xl shadow-black/60 bg-[#1A4F63]/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    activeStep === idx ? 'bg-[#C5A059] text-slate-950 border-[#C5A059]' : 'bg-slate-800 text-[#C5A059] border-slate-700'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[#C5A059]">
                        {step.num}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Dynamic Image Preview */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl h-[420px] bg-slate-950">
              <img
                src={steps[activeStep].img}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-[#C5A059]/30">
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block">
                  {lang === 'ar' ? 'مرحلة تشغيلية حقيقية' : 'Authentic Factory Operation'} • Step {steps[activeStep].num}
                </span>
                <p className="text-base font-bold text-white mt-1">
                  {steps[activeStep].title}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars at Bottom */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800">
          <div className="glass-panel p-4 rounded-xl border border-[#C5A059]/20 text-center">
            <ShieldAlert className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">{t.pillar1}</h4>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-[#C5A059]/20 text-center">
            <Sparkles className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">{t.pillar2}</h4>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-[#C5A059]/20 text-center">
            <ShieldCheck className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">{t.pillar3}</h4>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-[#C5A059]/20 text-center">
            <RefreshCw className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">{t.pillar4}</h4>
          </div>
        </div>

      </div>
    </section>
  );
};
