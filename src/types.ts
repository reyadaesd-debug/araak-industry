export type Language = 'ar' | 'en';

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  category: 'ceiling' | 'partition' | 'accessories';
  categoryTitleAr: string;
  categoryTitleEn: string;
  titleAr: string;
  titleEn: string;
  code: string;
  descriptionAr: string;
  descriptionEn: string;
  applicationsAr: string[];
  applicationsEn: string[];
  dimensionsAr: string;
  dimensionsEn: string;
  thicknessRange: string;
  materialAr: string;
  materialEn: string;
  finishAr: string;
  finishEn: string;
  specs: ProductSpec[];
  imageUrl: string;
  diagramUrl?: string;
  verified: boolean;
}

export interface Certification {
  id: string;
  titleAr: string;
  titleEn: string;
  issuerAr: string;
  issuerEn: string;
  badge: string;
  imageUrl: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface Project {
  id: string;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  regionKey: 'neom' | 'riyadh' | 'qassim' | 'hail' | 'alula' | 'jeddah' | 'makkah' | 'farasan';
  coords: { x: number; y: number }; // Percentage coords on Saudi map
  lat: number;
  lng: number;
  sector: 'residential' | 'commercial' | 'healthcare' | 'government' | 'infrastructure' | 'entertainment';
  sectorTitleAr: string;
  sectorTitleEn: string;
  scopeAr: string;
  scopeEn: string;
  year: string;
  imageUrl: string;
  galleryUrls?: string[];
  steelProfilesUsedAr: string[];
  steelProfilesUsedEn: string[];
}

export interface SectorItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageUrl: string;
  recommendedProductsAr: string[];
  recommendedProductsEn: string[];
}

export interface GalleryItem {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'lines' | 'workers' | 'machines' | 'coils' | 'products' | 'qc' | 'warehouse' | 'shipping' | 'projects';
  imageUrl: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export interface RFQData {
  clientType: 'contractor' | 'developer' | 'distributor' | 'government' | 'enterprise';
  selectedProducts: { productId: string; quantity: string; specsNote?: string }[];
  city: string;
  projectName: string;
  deliveryDate: string;
  clientName: string;
  phone: string;
  email: string;
  companyName: string;
  boqFileName?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
