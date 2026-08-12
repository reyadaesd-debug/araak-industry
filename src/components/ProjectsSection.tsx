import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Language, Project } from '../types';
import { PROJECTS } from '../data/companyData';
import { translations } from '../data/translations';
import { MapPin, Building2, Calendar, Layers, X, CheckCircle2, ChevronRight, ChevronLeft, Map as MapIcon, Layers3, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  lang: Language;
}

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY.length > 5;

// Center of Saudi Arabia
const SAUDI_CENTER = { lat: 23.8859, lng: 45.0792 };

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMapMode, setActiveMapMode] = useState<'google' | 'vector'>('google');
  const [focusedLocation, setFocusedLocation] = useState<Project | null>(PROJECTS[1]); // Riyadh default

  const t = translations[lang];
  const isRtl = lang === 'ar';

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.sector === activeFilter);

  // Dynamic Google Map embed URL targeting exact latitude and longitude
  const mapEmbedUrl = focusedLocation
    ? `https://maps.google.com/maps?q=${focusedLocation.lat},${focusedLocation.lng}&z=11&output=embed`
    : `https://maps.google.com/maps?q=23.8859,45.0792&z=6&output=embed`;

  return (
    <section id="projects" className="py-24 bg-[#070E11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase font-mono">
            {t.projectsSubTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-serif">
            {t.projectsTitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => setActiveFilter('residential')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'residential'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.filterResidential}
          </button>
          <button
            onClick={() => setActiveFilter('commercial')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'commercial'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.filterCommercial}
          </button>
          <button
            onClick={() => setActiveFilter('healthcare')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'healthcare'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.filterHealthcare}
          </button>
          <button
            onClick={() => setActiveFilter('government')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'government'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.filterGovernment}
          </button>
          <button
            onClick={() => setActiveFilter('infrastructure')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'infrastructure'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.filterInfrastructure}
          </button>
          <button
            onClick={() => setActiveFilter('entertainment')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'entertainment'
                ? 'bg-[#C5A059] text-slate-950 shadow-lg shadow-[#C5A059]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {t.filterEntertainment}
          </button>
        </div>

        {/* Real Google Map Container */}
        <div className="mb-16 glass-panel p-6 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
                <span>{lang === 'ar' ? 'خريطة مواقع توريد مشاريع اراك بخرائط جوجل الفعلية' : 'ARAAK Project Supply Footprint on Google Maps'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'ar'
                  ? 'اضغط على أي مدينة للتركيز المباشر والدقيق على موقع المشروع في خرائط جوجل'
                  : 'Click any city to focus strictly on exact Google Maps coordinates and project details'}
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveMapMode('google')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMapMode === 'google'
                    ? 'bg-[#1A4F63] text-[#C5A059] border border-[#C5A059]/50 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'خرائط جوجل المباشرة' : 'Google Maps'}</span>
              </button>
              <button
                onClick={() => setActiveMapMode('vector')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMapMode === 'vector'
                    ? 'bg-[#1A4F63] text-[#C5A059] border border-[#C5A059]/50 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers3 className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'مخطط التوزيع الجغرافي' : 'Vector Map'}</span>
              </button>
            </div>
          </div>

          {/* Interactive City Selector Tabs */}
          <div className="mb-4 flex flex-wrap items-center gap-2 pb-3 border-b border-slate-800/80">
            <span className="text-xs text-[#C5A059] font-bold me-1 flex items-center gap-1">
              📍 {lang === 'ar' ? 'مدن التوريد بالمملكة:' : 'Supply Cities:'}
            </span>
            {PROJECTS.map((proj) => {
              const isSelected = focusedLocation?.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setFocusedLocation(proj);
                    setSelectedProject(proj);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#C5A059] text-slate-950 shadow-md shadow-[#C5A059]/20 font-black scale-105'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-[#1A4F63] hover:text-white border border-slate-800'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-[#C5A059]'}`} />
                  <span>{lang === 'ar' ? proj.locationAr.split('-')[0].trim() : proj.regionKey.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Map Display Box */}
          <div className="relative w-full h-[460px] rounded-xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
            {activeMapMode === 'google' ? (
              /* Official Google Map Embed focused strictly on exact lat/lng */
              <div className="relative w-full h-full">
                <iframe
                  key={focusedLocation?.id || 'saudi-map'}
                  title="Official Google Maps Location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Overlaid Active City Info Card */}
                {focusedLocation && (
                  <div className="absolute top-4 right-4 max-w-sm bg-slate-950/95 backdrop-blur-md p-4 rounded-xl border border-[#C5A059]/60 shadow-2xl z-30 text-start animate-fade-in">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1A4F63] text-[#C5A059] border border-[#C5A059]/30">
                        📍 {lang === 'ar' ? focusedLocation.sectorTitleAr : focusedLocation.sectorTitleEn}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{focusedLocation.year}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1">
                      {lang === 'ar' ? focusedLocation.titleAr : focusedLocation.titleEn}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                      {lang === 'ar' ? focusedLocation.scopeAr : focusedLocation.scopeEn}
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => setSelectedProject(focusedLocation)}
                        className="px-3 py-1.5 rounded-lg bg-[#C5A059] text-slate-950 text-xs font-bold hover:bg-[#d4b068] transition-all cursor-pointer"
                      >
                        {lang === 'ar' ? 'عرض تفاصيل المقاطع الموردة' : 'View Steel Profiles'}
                      </button>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${focusedLocation.lat},${focusedLocation.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-[#1A4F63] text-slate-300 hover:text-[#C5A059] border border-slate-800 text-xs flex items-center justify-center"
                        title={lang === 'ar' ? 'فتح بخرائط جوجل الرسمية' : 'Open in Google Maps'}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Calibrated Vector Map View */
              <div className="relative w-full h-full bg-[#0B1519] flex items-center justify-center p-4 industrial-grid-bg">
                {/* SVG Saudi Arabia Map Outline */}
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-full max-h-[420px] opacity-25 text-[#1A4F63] fill-current stroke-[#C5A059]/40 stroke-2"
                >
                  <path d="M 150 120 L 250 80 L 380 90 L 550 140 L 700 220 L 680 340 L 600 450 L 480 520 L 380 560 L 320 480 L 220 380 L 120 280 L 150 120 Z" />
                </svg>

                {/* Calibrated Pins strictly within Saudi Arabia boundaries */}
                {PROJECTS.map((proj) => {
                  const isSelected = focusedLocation?.id === proj.id;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setFocusedLocation(proj);
                        setSelectedProject(proj);
                      }}
                      style={{ left: `${proj.coords.x}%`, top: `${proj.coords.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className={`animate-ping absolute inline-flex rounded-full bg-[#C5A059] ${isSelected ? 'h-9 w-9 opacity-90' : 'h-6 w-6 opacity-60'}`} />
                        <div
                          className={`relative rounded-full bg-slate-950 border-2 shadow-2xl flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? 'w-9 h-9 border-[#C5A059] scale-125 ring-4 ring-[#C5A059]/30'
                              : 'w-7 h-7 border-[#C5A059]/70 group-hover:scale-110'
                          }`}
                        >
                          <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#C5A059]' : 'text-slate-200'}`} />
                        </div>

                        {/* Pin City Label */}
                        <div className="absolute top-full mt-1 flex flex-col items-center pointer-events-none z-30">
                          <span className="bg-slate-950/95 border border-[#C5A059]/60 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                            {lang === 'ar' ? proj.locationAr.split('-')[0].trim() : proj.regionKey.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass-panel rounded-2xl overflow-hidden border border-[#C5A059]/20 glass-panel-hover flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={lang === 'ar' ? project.titleAr : project.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#1A4F63] border border-[#C5A059]/40 text-[10px] font-bold text-[#C5A059]">
                    {project.year}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? project.locationAr : project.locationEn}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#C5A059] transition-colors font-serif">
                    {lang === 'ar' ? project.titleAr : project.titleEn}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2">
                    {lang === 'ar' ? project.scopeAr : project.scopeEn}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs font-bold text-[#C5A059]">
                <span>{lang === 'ar' ? 'عرض تفاصيل المشروع' : 'View Project Drawer'}</span>
                {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Drawer Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="glass-panel w-full max-w-3xl rounded-2xl border border-[#C5A059]/40 p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.titleAr}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-slate-200">
                <span className="bg-[#1A4F63] px-3 py-1 rounded font-bold text-[#C5A059]">
                  {lang === 'ar' ? selectedProject.sectorTitleAr : selectedProject.sectorTitleEn}
                </span>
                <span className="bg-slate-900/80 px-3 py-1 rounded font-mono">
                  {selectedProject.year}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white font-serif">
                {lang === 'ar' ? selectedProject.titleAr : selectedProject.titleEn}
              </h3>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'ar' ? selectedProject.locationAr : selectedProject.locationEn}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedProject.lat},${selectedProject.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-auto text-[11px] text-[#C5A059] hover:underline flex items-center gap-1 bg-[#1A4F63]/50 px-2.5 py-1 rounded border border-[#C5A059]/30"
                >
                  <span>{lang === 'ar' ? 'الموقع على خرائط جوجل' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                  {lang === 'ar' ? 'نطاق العمل والتوريد:' : 'Scope of Supply:'}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {lang === 'ar' ? selectedProject.scopeAr : selectedProject.scopeEn}
                </p>
              </div>
            </div>

            {/* Steel Systems Used */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-[#C5A059] uppercase font-mono tracking-wider">
                {t.profilesUsed}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(lang === 'ar' ? selectedProject.steelProfilesUsedAr : selectedProject.steelProfilesUsedEn).map((profile, pIdx) => (
                  <span
                    key={pIdx}
                    className="px-3 py-1 rounded-lg bg-[#1A4F63]/60 border border-[#C5A059]/40 text-xs font-bold text-white flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{profile}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
