import React, { useState } from 'react';
import { Language, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/companyData';
import { translations } from '../data/translations';
import { Maximize2, X, Camera, Info, Layers } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface FactoryGalleryProps {
  lang: Language;
}

export const FactoryGallery: React.FC<FactoryGalleryProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [comparePos, setComparePos] = useState(50);

  const t = translations[lang];

  const filteredGallery = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-[#0B1519] relative overflow-hidden border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.gallerySubTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-serif">
            {t.galleryTitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.galAll}
          </button>
          <button
            onClick={() => setActiveCategory('lines')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'lines'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.galLines}
          </button>
          <button
            onClick={() => setActiveCategory('workers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'workers'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.galWorkers}
          </button>
          <button
            onClick={() => setActiveCategory('machines')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'machines'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.galMachines}
          </button>
          <button
            onClick={() => setActiveCategory('coils')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'coils'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.galCoils}
          </button>
          <button
            onClick={() => setActiveCategory('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'products'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.galProducts}
          </button>
          <button
            onClick={() => setActiveCategory('qc')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'qc'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.galQc}
          </button>
        </div>

        {/* Comparison Feature Banner */}
        <div className="mb-12 glass-panel p-6 rounded-2xl border border-[#C5A059]/30">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#C5A059] uppercase font-mono">
            <Layers className="w-4 h-4" />
            <span>{lang === 'ar' ? 'مقارنة التحول: الخامة ↔ المنتج النهائي' : 'Transformation Comparison: Raw Coil ↔ Finished Profile'}</span>
          </div>

          <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            {/* Background 1: Finished */}
            <div className="absolute inset-0">
              <img
                src={IMAGES.steelProfiles}
                alt="Finished Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-slate-950/80 px-2.5 py-1 rounded text-xs font-bold text-[#C5A059]">
                {lang === 'ar' ? 'المقطع المعدني النهائب' : 'Finished Profile'}
              </div>
            </div>

            {/* Foreground 2: Raw Coil */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - comparePos}% 0 0)` }}
            >
              <img
                src={IMAGES.steelCoils}
                alt="Raw Coil Stock"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded text-xs font-bold text-slate-200">
                {lang === 'ar' ? 'كويل الحديد المجلفن' : 'Raw Steel Coil'}
              </div>
            </div>

            {/* Slider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#C5A059] cursor-ew-resize z-20"
              style={{ left: `${comparePos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#C5A059] text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg">
                ↔
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={comparePos}
              onChange={(e) => setComparePos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
            />
          </div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="glass-panel rounded-2xl overflow-hidden border border-[#C5A059]/20 glass-panel-hover group cursor-pointer relative h-64"
            >
              <img
                src={item.imageUrl}
                alt={lang === 'ar' ? item.titleAr : item.titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 p-2">
                <p className="text-xs font-bold text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </p>
              </div>

              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-950/80 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Gallery Disclaimer Note */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>{t.galleryNote}</span>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="glass-panel w-full max-w-4xl rounded-2xl border border-[#C5A059]/40 p-6 relative space-y-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-[480px] rounded-xl overflow-hidden bg-slate-950">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.titleAr}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200">
              <p className="font-bold text-sm text-[#C5A059]">
                {lang === 'ar' ? selectedImage.titleAr : selectedImage.titleEn}
              </p>
              <p className="mt-1 text-slate-300">
                {lang === 'ar' ? selectedImage.descriptionAr : selectedImage.descriptionEn}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
