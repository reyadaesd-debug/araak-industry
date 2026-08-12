import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Menu, X, FileText, Globe, PhoneCall } from 'lucide-react';
import { AraakLogo } from './AraakLogo';

interface NavbarProps {
  lang: Language;
  onLanguageToggle: () => void;
  onOpenRfq: () => void;
  onOpenAiAdvisor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageToggle,
  onOpenRfq,
  onOpenAiAdvisor,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.navHome },
    { href: '#about', label: t.navAbout },
    { href: '#products', label: t.navProducts },
    { href: '#quality', label: t.navQuality },
    { href: '#projects', label: t.navProjects },
    { href: '#contact', label: t.navContact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1519]/85 backdrop-blur-md border-b border-[#C5A059]/20 shadow-2xl shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a href="#home" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
            <AraakLogo height={42} showSubtitle={true} />
          </a>

          {/* Desktop Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-[#C5A059] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C5A059] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: RFQ, Language & AI */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onLanguageToggle}
              className="px-3 py-2 rounded-lg border border-slate-700 hover:border-[#C5A059]/50 bg-slate-900/60 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <button
              onClick={onOpenRfq}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#E5C158] text-slate-950 text-xs font-bold shadow-lg shadow-[#C5A059]/20 hover:shadow-[#C5A059]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>{t.btnRfq}</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onLanguageToggle}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-slate-900/80 border border-[#C5A059]/30 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1519]/95 backdrop-blur-xl border-b border-[#C5A059]/30 px-6 py-6 shadow-2xl space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-[#C5A059] py-1 border-b border-slate-800/60"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 font-bold text-sm flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{t.btnRfq}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiAdvisor();
              }}
              className="w-full py-3 rounded-lg bg-[#1A4F63] border border-[#C5A059]/40 text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#C5A059]" />
              <span>{t.btnTalkAdvisor}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
