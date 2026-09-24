import React from 'react';
import { Heart, ArrowUp, ShieldCheck } from 'lucide-react';
import { WeddingData } from '../types';

interface FooterProps {
  weddingData: WeddingData;
}

export const Footer: React.FC<FooterProps> = ({ weddingData }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-[#E8DFC8]/70 bg-[#F4EDE4] text-center text-xs text-stone-600 pb-24">
      <div className="max-w-md mx-auto px-4 space-y-3.5">
        
        {/* Monogram / Couple Name */}
        <h3 className="font-serif-elegant text-2xl font-bold text-[#2D2825]">
          {weddingData.groom.name} &amp; {weddingData.bride.name}
        </h3>

        <p className="font-serif-elegant italic text-xs text-[#8C6D46] max-w-xs mx-auto leading-relaxed">
          Trân trọng cảm ơn quý khách và bạn bè đã luôn đồng hành, yêu thương và chúc phúc cho gia đình chúng tôi!
        </p>

        <div className="flex items-center justify-center gap-2 text-stone-500 text-[11px] pt-1 font-medium">
          <span>Thái Nguyên · 29/09/2026</span>
          <span>·</span>
          <span className="flex items-center gap-1 text-[#9B2C2C]">
            <Heart className="w-3 h-3 fill-[#9B2C2C]" /> Trăm Năm Hạnh Phúc
          </span>
        </div>

        {/* Official Copyright & Legal Notice */}
        <div className="pt-3 border-t border-[#E8DFC8]/60 text-[11px] text-stone-500 space-y-1 font-light">
          <div className="flex items-center justify-center gap-1.5 font-medium text-stone-700">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9B2C2C]" />
            <span>Thiệp Cưới Điện Tử Chính Thức</span>
          </div>
          <p className="text-[10px] text-stone-400">
            © 2026 Bản quyền thuộc về Đỗ Hồng Sơn &amp; Triệu Thị Lê (Kháng Linh).
          </p>
          <p className="text-[10px] text-stone-400">
            Mọi hình ảnh và nội dung thiệp mời đã được đăng ký và bảo hộ bản quyền.
          </p>
        </div>

        {/* Back to Top */}
        <div className="pt-2">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-50 text-stone-600 text-xs font-medium shadow-2xs border border-stone-200 cursor-pointer active:scale-95 transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Về đầu trang</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

