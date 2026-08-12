import React, { useState } from 'react';
import { Language, RFQData, Product } from '../types';
import { PRODUCTS } from '../data/companyData';
import { translations } from '../data/translations';
import { FileText, CheckCircle2, ArrowRight, ArrowLeft, Upload, Send, X, Building2, Layers, MapPin, Calendar, User, Phone, Mail } from 'lucide-react';

interface SmartRFQBuilderProps {
  lang: Language;
  preselectedProduct?: Product | null;
  onClose: () => void;
}

export const SmartRFQBuilder: React.FC<SmartRFQBuilderProps> = ({
  lang,
  preselectedProduct,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [rfq, setRfq] = useState<RFQData>({
    clientType: 'contractor',
    selectedProducts: preselectedProduct ? [{ productId: preselectedProduct.id, quantity: '10 Tons' }] : [],
    city: 'الرياض',
    projectName: '',
    deliveryDate: '',
    clientName: '',
    phone: '',
    email: '',
    companyName: '',
    boqFileName: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [rfqSummaryId, setRfqSummaryId] = useState('');

  const t = translations[lang];
  const isRtl = lang === 'ar';

  const toggleProductSelection = (prodId: string) => {
    const existing = rfq.selectedProducts.find((p) => p.productId === prodId);
    if (existing) {
      setRfq({
        ...rfq,
        selectedProducts: rfq.selectedProducts.filter((p) => p.productId !== prodId),
      });
    } else {
      setRfq({
        ...rfq,
        selectedProducts: [...rfq.selectedProducts, { productId: prodId, quantity: '5 Tons' }],
      });
    }
  };

  const handleProductQtyChange = (prodId: string, qty: string) => {
    setRfq({
      ...rfq,
      selectedProducts: rfq.selectedProducts.map((p) =>
        p.productId === prodId ? { ...p, quantity: qty } : p
      ),
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRfq({ ...rfq, boqFileName: e.target.files[0].name });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rfq),
      });
      const data = await res.json();
      setRfqSummaryId(data.rfqId || `ARAAK-RFQ-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
    } catch {
      setRfqSummaryId(`ARAAK-RFQ-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="glass-panel w-full max-w-3xl rounded-2xl border border-[#C5A059]/40 p-6 sm:p-8 relative space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#1A4F63] border border-[#C5A059]/40 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-serif">{t.rfqTitle}</h3>
            <span className="text-xs text-[#C5A059] font-mono">{t.rfqSubTitle}</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            
            {/* Step Progress Indicators */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono font-bold">
              <div className={`p-2 rounded-lg border ${step >= 1 ? 'bg-[#1A4F63] border-[#C5A059] text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                1. {lang === 'ar' ? 'نوع العميل' : 'Client'}
              </div>
              <div className={`p-2 rounded-lg border ${step >= 2 ? 'bg-[#1A4F63] border-[#C5A059] text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                2. {lang === 'ar' ? 'المنتجات' : 'Products'}
              </div>
              <div className={`p-2 rounded-lg border ${step >= 3 ? 'bg-[#1A4F63] border-[#C5A059] text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                3. {lang === 'ar' ? 'الكمية والمدينة' : 'Details'}
              </div>
              <div className={`p-2 rounded-lg border ${step >= 4 ? 'bg-[#1A4F63] border-[#C5A059] text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                4. {lang === 'ar' ? 'المرفقات' : 'Submit'}
              </div>
            </div>

            {/* Step 1: Client Type */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">{t.step1ClientType}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'contractor', titleAr: 'مقاول رئيسي / فرعي', titleEn: 'Main / Sub Contractor' },
                    { id: 'developer', titleAr: 'مطور عقاري', titleEn: 'Real Estate Developer' },
                    { id: 'distributor', titleAr: 'موزع / تاجر جملة', titleEn: 'Distributor / Wholesaler' },
                    { id: 'government', titleAr: 'جهة حكومية / شبه حكومية', titleEn: 'Government Entity' },
                    { id: 'enterprise', titleAr: 'شركة / مؤسسة', titleEn: 'Enterprise Company' },
                  ].map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setRfq({ ...rfq, clientType: type.id as any })}
                      className={`p-4 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                        rfq.clientType === type.id
                          ? 'bg-[#1A4F63]/60 border-[#C5A059] text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold">
                        {lang === 'ar' ? type.titleAr : type.titleEn}
                      </span>
                      {rfq.clientType === type.id && <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Products Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">{t.step2Products}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.map((product) => {
                    const isSelected = rfq.selectedProducts.some((p) => p.productId === product.id);
                    const selectedItem = rfq.selectedProducts.find((p) => p.productId === product.id);

                    return (
                      <div
                        key={product.id}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#1A4F63]/50 border-[#C5A059]'
                            : 'bg-slate-900/60 border-slate-800'
                        }`}
                      >
                        <div
                          onClick={() => toggleProductSelection(product.id)}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <span className="text-xs font-bold text-white">
                            {lang === 'ar' ? product.titleAr : product.titleEn}
                          </span>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="rounded border-slate-700 text-[#C5A059] focus:ring-0"
                          />
                        </div>

                        {isSelected && (
                          <div className="mt-3 pt-2 border-t border-slate-800">
                            <label className="text-[10px] text-slate-400 block mb-1">
                              {lang === 'ar' ? 'الكمية المطلوبة (أطنان / أمتار / طبالين):' : 'Quantity Needed:'}
                            </label>
                            <input
                              type="text"
                              value={selectedItem?.quantity || ''}
                              onChange={(e) => handleProductQtyChange(product.id, e.target.value)}
                              placeholder="مثال: 10 طن أو 5000 متر"
                              className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white focus:border-[#C5A059] outline-none"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Quantities, City, Project */}
            {step === 3 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">{t.step3Details}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      {lang === 'ar' ? 'المدينة / موقع التوريد' : 'City / Supply Location'}
                    </label>
                    <input
                      type="text"
                      required
                      value={rfq.city}
                      onChange={(e) => setRfq({ ...rfq, city: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                      placeholder="الرياض، جدة، نيوم، العلا..."
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      {lang === 'ar' ? 'اسم المشروع' : 'Project Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={rfq.projectName}
                      onChange={(e) => setRfq({ ...rfq, projectName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                      placeholder="برج الرياض التجاري، مجمع العلا..."
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      {lang === 'ar' ? 'تاريخ التوريد المتوقع' : 'Target Delivery Date'}
                    </label>
                    <input
                      type="date"
                      value={rfq.deliveryDate}
                      onChange={(e) => setRfq({ ...rfq, deliveryDate: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      {lang === 'ar' ? 'اسم الشركة / المؤسسة' : 'Company Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={rfq.companyName}
                      onChange={(e) => setRfq({ ...rfq, companyName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                      placeholder="شركة المقاولات الوطنية"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Info & File Upload */}
            {step === 4 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">{t.step4Upload}</h4>
                
                {/* Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">{lang === 'ar' ? 'اسم المسؤول' : 'Contact Person'}</label>
                    <input
                      type="text"
                      required
                      value={rfq.clientName}
                      onChange={(e) => setRfq({ ...rfq, clientName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">{lang === 'ar' ? 'رقم الجوال' : 'Phone'}</label>
                    <input
                      type="tel"
                      required
                      value={rfq.phone}
                      onChange={(e) => setRfq({ ...rfq, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                      placeholder="+966 5X XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                    <input
                      type="email"
                      required
                      value={rfq.email}
                      onChange={(e) => setRfq({ ...rfq, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-[#C5A059] outline-none"
                    />
                  </div>
                </div>

                {/* Upload Zone */}
                <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 text-center space-y-2">
                  <Upload className="w-6 h-6 text-[#C5A059] mx-auto" />
                  <p className="text-xs text-slate-300">
                    {lang === 'ar' ? 'رفع جدول الكميات (BOQ) / مخططات / ملفات PDF / Excel' : 'Upload BOQ / Drawings / Specifications (PDF / Excel)'}
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="rfq-file"
                  />
                  <label
                    htmlFor="rfq-file"
                    className="inline-block px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer hover:bg-slate-700"
                  >
                    {rfq.boqFileName ? rfq.boqFileName : (lang === 'ar' ? 'اختر ملف' : 'Choose File')}
                  </label>
                </div>
              </div>
            )}

            {/* Modal Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold"
                >
                  {lang === 'ar' ? 'السابق' : 'Previous'}
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 font-bold text-xs flex items-center gap-2"
                >
                  <span>{lang === 'ar' ? 'التالي' : 'Next'}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#E5C158] text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#C5A059]/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.generateRfqBtn}</span>
                </button>
              )}
            </div>

          </form>
        ) : (
          /* Submission Success State */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-white font-serif">
              {lang === 'ar' ? 'تم إنشاء واستلام طلب عرض السعر بنجاح!' : 'RFQ Summary Generated Successfully!'}
            </h4>
            <div className="inline-block px-4 py-1.5 rounded-lg bg-[#1A4F63] border border-[#C5A059]/40 text-sm font-mono font-bold text-[#C5A059]">
              {rfqSummaryId}
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              {lang === 'ar'
                ? 'سيتواصل معك مهندس المبيعات المختص بمصنع اراك الصناعية لتأكيد الأبعاد والجدول الزمني بالتفصيل.'
                : 'An ARAAK Industry technical sales engineer will contact you shortly.'}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs"
            >
              {lang === 'ar' ? 'إغلاق النافذة' : 'Close Window'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
