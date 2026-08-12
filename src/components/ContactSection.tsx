import React, { useState } from 'react';
import { Language } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  });

  const [sent, setSent] = useState(false);
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#070E11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.contactSubTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-serif">
            {t.contactTitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-[#C5A059]/30 space-y-6">
              
              <h3 className="text-xl font-bold text-white font-serif">
                {lang === 'ar' ? 'معلومات التواصل والتوريد المباشر' : 'Direct Supply & Factory Contact'}
              </h3>

              <div className="space-y-4 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 text-[#C5A059] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block">{lang === 'ar' ? 'العنوان وموقع المقر:' : 'Location & Address:'}</span>
                    <span className="text-sm font-semibold text-white block">
                      {lang === 'ar' ? COMPANY_INFO.addressAr : COMPANY_INFO.addressEn}
                    </span>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#1A4F63] border border-[#C5A059]/40 text-[#C5A059] text-[11px] font-mono font-bold">
                        Plus Code: {COMPANY_INFO.plusCode}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 text-[#C5A059] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block">{lang === 'ar' ? 'الهاتف المباشر الموحد:' : 'Direct Phone:'}</span>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="text-sm font-bold text-[#C5A059] dir-ltr inline-block">
                      {COMPANY_INFO.phoneDisplay || COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 text-[#C5A059] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block">{lang === 'ar' ? 'المبيعات والاستفسارات الفنية:' : 'Sales Email:'}</span>
                    <a href={`mailto:${COMPANY_INFO.salesEmail}`} className="text-sm font-semibold text-white">
                      {COMPANY_INFO.salesEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 text-[#C5A059] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block">{lang === 'ar' ? 'أوقات العمل بالتصنيع:' : 'Operating Hours:'}</span>
                    <span className="text-xs text-slate-300">
                      {lang === 'ar' ? 'الأحد - الخميس: 7:30 صباحاً - 4:30 مساءً (الإنتاج 24 ساعة)' : 'Sun - Thu: 7:30 AM - 4:30 PM (24/7 Shift Production)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct Action Button */}
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(lang === 'ar' ? 'السلام عليكم، أود الاستفسار عن توريد مقاطع معدنية من مصنع اراك الصناعية' : 'Hello ARAAK Industry, I need a quote for steel profiles')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تواصل عبر واتساب المبيعات المباشر' : 'Direct WhatsApp Sales Chat'}</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-2xl border border-[#C5A059]/30">
              
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-white font-serif mb-4">
                    {lang === 'ar' ? 'إرسال رسالة مباشرة للفريق الهندسي' : 'Send Message to Engineering Sales'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">
                        {lang === 'ar' ? 'الاسم الكريم' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 block mb-1">
                        {lang === 'ar' ? 'رقم التواصل / الجوال' : 'Phone / Mobile'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">
                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 block mb-1">
                        {lang === 'ar' ? 'اسم الشركة / المشروع' : 'Company / Project'}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      {lang === 'ar' ? 'تفاصيل الطلب أو الاستفسار' : 'Inquiry / Specifications Details'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                      placeholder={lang === 'ar' ? 'يرجى كتابة كميات المقاطع أو الاستفسار الفني المطلوب...' : 'Describe requested metal profiles or specifications...'}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#E5C158] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#C5A059]/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.sendMsg}</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-bold text-white font-serif">
                    {lang === 'ar' ? 'تم استلام رسالتك بنجاح' : 'Message Sent Successfully'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {lang === 'ar' ? 'سيتواصل معك مهندس المبيعات في أقرب وقت.' : 'Our technical sales representative will respond promptly.'}
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
