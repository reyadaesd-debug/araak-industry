import React, { useState } from 'react';
import { Language, Product } from '../types';
import { PRODUCTS } from '../data/companyData';
import { translations } from '../data/translations';
import { Layers, FileText, Download, Check, X, Shield, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProductsSectionProps {
  lang: Language;
  onSelectProductForRfq: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  lang,
  onSelectProductForRfq,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ceiling' | 'partition' | 'accessories'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-[#070E11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.productsSubTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-serif">
            {t.productsTitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.catAll}
          </button>
          <button
            onClick={() => setActiveCategory('ceiling')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'ceiling'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            01 {t.catCeiling}
          </button>
          <button
            onClick={() => setActiveCategory('partition')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'partition'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            02 {t.catPartition}
          </button>
          <button
            onClick={() => setActiveCategory('accessories')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'accessories'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            03 {t.catAccessories}
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="glass-panel rounded-2xl overflow-hidden border border-[#C5A059]/20 glass-panel-hover flex flex-col justify-between group cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img
                    src={product.imageUrl}
                    alt={lang === 'ar' ? product.titleAr : product.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#C5A059] border border-[#C5A059]/30">
                    {product.code}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs text-slate-300">
                    <span className="font-semibold text-slate-200">
                      {lang === 'ar' ? product.categoryTitleAr : product.categoryTitleEn}
                    </span>
                    <span className="bg-[#1A4F63] px-2 py-0.5 rounded text-[11px] font-bold text-[#C5A059]">
                      {product.thicknessRange}
                    </span>
                  </div>
                </div>

                {/* Product Body */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#C5A059] transition-colors">
                    {lang === 'ar' ? product.titleAr : product.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-normal">
                    {lang === 'ar' ? product.descriptionAr : product.descriptionEn}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {(lang === 'ar' ? product.applicationsAr : product.applicationsEn).map((app, aIdx) => (
                      <span key={aIdx} className="text-[11px] px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-[#C5A059] group-hover:underline flex items-center gap-1">
                  <span>{t.viewDetails}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="In Production" />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Product Drawer / Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#C5A059]/40 shadow-2xl p-6 sm:p-8 relative space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-5 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-64">
                <img
                  src={selectedProduct.imageUrl}
                  alt={lang === 'ar' ? selectedProduct.titleAr : selectedProduct.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="inline-block px-2.5 py-1 rounded bg-[#1A4F63] text-xs font-mono text-[#C5A059]">
                  {selectedProduct.code}
                </div>
                <h3 className="text-2xl font-bold text-white font-serif">
                  {lang === 'ar' ? selectedProduct.titleAr : selectedProduct.titleEn}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {lang === 'ar' ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}
                </p>

                <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">{lang === 'ar' ? 'السماكات:' : 'Thickness Range:'}</span>
                    <span className="font-bold text-[#C5A059]">{selectedProduct.thicknessRange}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">{lang === 'ar' ? 'الأبعاد القياسية:' : 'Dimensions:'}</span>
                    <span className="font-bold text-white">
                      {lang === 'ar' ? selectedProduct.dimensionsAr : selectedProduct.dimensionsEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C5A059]" />
                <span>{lang === 'ar' ? 'المواصفات الفنية المعتمدة' : 'Verified Technical Specifications'}</span>
              </h4>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
                <table className="w-full text-xs text-slate-200 text-right">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">{lang === 'ar' ? 'المعيار / الخاصية' : 'Property / Specification'}</th>
                      <th className="p-3">{lang === 'ar' ? 'القيمة / المطابقة' : 'Value / Compliance'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="p-3 text-slate-400">{lang === 'ar' ? 'المادة الخام' : 'Raw Material'}</td>
                      <td className="p-3 font-semibold text-white">
                        {lang === 'ar' ? selectedProduct.materialAr : selectedProduct.materialEn}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400">{lang === 'ar' ? 'التشطيب السطحي' : 'Surface Finish'}</td>
                      <td className="p-3 font-semibold text-white">
                        {lang === 'ar' ? selectedProduct.finishAr : selectedProduct.finishEn}
                      </td>
                    </tr>
                    {selectedProduct.specs.map((spec, sIdx) => (
                      <tr key={sIdx}>
                        <td className="p-3 text-slate-400">{spec.name}</td>
                        <td className="p-3 font-semibold text-[#C5A059]">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => {
                  alert(lang === 'ar' ? 'تم بدء تحميل كراسة المواصفات Datasheet الخاص بـ ' + selectedProduct.titleAr : 'Downloading datasheet for ' + selectedProduct.titleEn);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C5A059]" />
                <span>{t.downloadDatasheet}</span>
              </button>

              <button
                onClick={() => {
                  const prod = selectedProduct;
                  setSelectedProduct(null);
                  onSelectProductForRfq(prod);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-[#C5A059]/20"
              >
                <FileText className="w-4 h-4" />
                <span>{t.requestQuoteForProduct}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
