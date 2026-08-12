import React, { useState, useEffect } from 'react';
import { Language, Product } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsBar } from './components/MetricsBar';
import { AboutSection } from './components/AboutSection';
import { ProductsSection } from './components/ProductsSection';
import { QualityCertificationsSection } from './components/QualityCertificationsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PartnersSection } from './components/PartnersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SmartRFQBuilder } from './components/SmartRFQBuilder';
import { AIAdvisorDrawer } from './components/AIAdvisorDrawer';
import { Bot } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [rfqOpen, setRfqOpen] = useState(false);
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);
  const [preselectedProductForRfq, setPreselectedProductForRfq] = useState<Product | null>(null);

  // Sync document language and direction (RTL vs LTR)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleOpenRfqForProduct = (product: Product) => {
    setPreselectedProductForRfq(product);
    setRfqOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070E11] text-slate-100 font-sans selection:bg-[#C5A059] selection:text-slate-950">
      
      {/* Navbar */}
      <Navbar
        lang={lang}
        onLanguageToggle={toggleLanguage}
        onOpenRfq={() => {
          setPreselectedProductForRfq(null);
          setRfqOpen(true);
        }}
        onOpenAiAdvisor={() => setAiAdvisorOpen(true)}
      />

      {/* Main Streamlined Corporate Sections */}
      <main>
        <HeroSection
          lang={lang}
          onOpenRfq={() => {
            setPreselectedProductForRfq(null);
            setRfqOpen(true);
          }}
          onOpenAiAdvisor={() => setAiAdvisorOpen(true)}
        />

        <MetricsBar lang={lang} />

        <AboutSection lang={lang} />

        <ProductsSection
          lang={lang}
          onSelectProductForRfq={handleOpenRfqForProduct}
        />

        <QualityCertificationsSection lang={lang} />

        <ProjectsSection lang={lang} />

        <PartnersSection lang={lang} />

        <ContactSection lang={lang} />
      </main>

      {/* Footer & Mobile Dock */}
      <Footer
        lang={lang}
        onOpenRfq={() => {
          setPreselectedProductForRfq(null);
          setRfqOpen(true);
        }}
        onOpenAiAdvisor={() => setAiAdvisorOpen(true)}
      />

      {/* Floating Glass AI Advisor Launcher Button (Desktop & Tablet) */}
      {!aiAdvisorOpen && (
        <button
          onClick={() => setAiAdvisorOpen(true)}
          className="hidden lg:flex fixed bottom-6 left-6 z-40 px-4 py-3 rounded-2xl bg-[#0B1519]/90 border border-[#C5A059]/50 text-white shadow-2xl shadow-black hover:scale-105 active:scale-95 transition-all items-center gap-3 backdrop-blur-md group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 flex items-center justify-center group-hover:border-[#C5A059]">
            <Bot className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div className="text-right">
            <span className="text-xs font-bold block text-white">
              {lang === 'ar' ? 'مستشار اراك الذكي' : 'ARAAK Industrial Advisor'}
            </span>
            <span className="text-[10px] text-[#C5A059] font-mono block">
              {lang === 'ar' ? 'استشارة فنية فورية' : 'AI Technical Support'}
            </span>
          </div>
        </button>
      )}

      {/* Smart RFQ Builder Modal */}
      {rfqOpen && (
        <SmartRFQBuilder
          lang={lang}
          preselectedProduct={preselectedProductForRfq}
          onClose={() => setRfqOpen(false)}
        />
      )}

      {/* AI Industrial Advisor Drawer */}
      {aiAdvisorOpen && (
        <AIAdvisorDrawer
          lang={lang}
          onClose={() => setAiAdvisorOpen(false)}
          onOpenRfq={() => {
            setAiAdvisorOpen(false);
            setRfqOpen(true);
          }}
        />
      )}

    </div>
  );
}
