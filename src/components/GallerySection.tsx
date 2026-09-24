import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryImage } from '../types';

interface GallerySectionProps {
  gallery: GalleryImage[];
  onOpenPhotoModal?: (tab: 'gallery') => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery, onOpenPhotoModal }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveImageIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + gallery.length) % gallery.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % gallery.length);
    }
  };

  return (
    <section id="album-anh" className="py-12 px-4 bg-white border-t border-[#E8DFC8]/60">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D46] font-semibold block mb-1">
            KHOẢNH KHẮC HẠNH PHÚC
          </span>
          <h2 className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#2D2825]">
            Album Ảnh Cưới
          </h2>
          <p className="text-xs text-stone-500 font-light mt-1">
            Chạm vào ảnh để xem trọn vẹn từng khoảnh khắc ngọt ngào
          </p>
        </div>

        {/* 2-Column Responsive Photo Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {gallery.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => handleOpenLightbox(idx)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer bg-[#F5EDE4] border border-[#E8DFC8] shadow-2xs group ${
                idx === 0
                  ? 'col-span-2 aspect-[4/3] sm:aspect-[16/10]'
                  : 'aspect-[3/4]'
              }`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 text-white text-[11px] font-medium">
                <span>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={handleCloseLightbox}
        >
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Đóng xem ảnh"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="max-w-md max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[activeImageIndex].url}
              alt={gallery[activeImageIndex].caption}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
              referrerPolicy="no-referrer"
            />
            <p className="text-white/80 text-xs sm:text-sm font-serif-elegant mt-3 text-center px-4">
              {gallery[activeImageIndex].caption}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Ảnh kế tiếp"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
