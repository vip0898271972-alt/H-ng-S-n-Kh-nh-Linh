import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { WeddingData } from '../types';

interface FooterProps {
  weddingData: WeddingData;
}

export const Footer: React.FC<FooterProps> = ({ weddingData }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 border-t border-[#E8DFC8]/60 bg-[#F4EDE4] text-center text-xs text-stone-600 pb-20">
      <div className="max-w-md mx-auto px-4 space-y-3">
        
        {/* Monogram / Couple Name */}
        <h3 className="font-serif-elegant text-2xl font-bold text-[#2D2825]">
          {weddingData.groom.name} &amp; {weddingData.bride.name}
        </h3>

        <p className="font-serif-elegant italic text-xs text-[#8C6D46] max-w-xs mx-auto leading-relaxed">
          Trân trọng cảm ơn quý khách và bạn bè đã luôn đồng hành, yêu thương và chúc phúc cho gia đình chúng tôi!
        </p>

        <div className="flex items-center justify-center gap-2 text-stone-500 text-[11px] pt-1">
          <span>Thái Nguyên · 29/09/2026</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-[#9B2C2C] fill-[#9B2C2C]" /> Trăm Năm Hạnh Phúc
          </span>
        </div>

        {/* Back to Top */}
        <div className="pt-2">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 text-xs shadow-2xs border border-stone-200 cursor-pointer"
          >
            <ArrowUp className="w-3 h-3" />
            <span>Về đầu trang</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
