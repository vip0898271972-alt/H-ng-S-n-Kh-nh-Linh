import React, { useState } from 'react';
import { Heart, Camera } from 'lucide-react';
import { WeddingData } from '../types';
import { fireWeddingConfetti } from '../utils/confettiHelper';

interface CoupleSectionProps {
  weddingData: WeddingData;
  onOpenPhotoModal?: (tab: 'groom' | 'bride') => void;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ weddingData, onOpenPhotoModal }) => {
  const { groom, bride } = weddingData;
  const [groomLikes, setGroomLikes] = useState(128);
  const [brideLikes, setBrideLikes] = useState(156);

  const handleLikeGroom = () => {
    setGroomLikes((prev) => prev + 1);
    fireWeddingConfetti();
  };

  const handleLikeBride = () => {
    setBrideLikes((prev) => prev + 1);
    fireWeddingConfetti();
  };

  return (
    <section id="cap-doi" className="py-12 px-4 bg-white border-y border-[#E8DFC8]/60">
      <div className="max-w-md mx-auto text-center">
        
        {/* Section Header */}
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D46] font-semibold block mb-1">
          CHÚ RỂ &amp; CÔ DÂU
        </span>
        <h2 className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#2D2825] mb-2">
          Đôi Uyên Ương
        </h2>
        <p className="text-xs text-stone-500 font-light max-w-xs mx-auto mb-8">
          Hạnh phúc là khi ta tìm thấy một nửa yêu thương để cùng xây đắp tổ ấm trọn vẹn.
        </p>

        {/* 2 Compact Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          
          {/* Groom */}
          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFC8] flex flex-col items-center text-center shadow-2xs">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 border-2 border-[#D4AF37] mb-3 bg-white shadow-sm group">
              <img
                src={groom.avatar}
                alt={groom.name}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
              {onOpenPhotoModal && (
                <button
                  onClick={() => onOpenPhotoModal('groom')}
                  title="Đổi ảnh chú rể"
                  className="absolute bottom-1 right-1 p-1 rounded-full bg-white/90 text-[#9B2C2C] shadow-sm border border-stone-200 active:scale-90 transition-transform cursor-pointer"
                >
                  <Camera className="w-3 h-3" />
                </button>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold">
              CHÚ RỂ
            </span>
            <h3 className="font-serif-elegant text-xl font-bold text-[#2D2825] mt-0.5">
              {groom.name}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1 font-medium">Xóm Đậu 8b, Phổ Yên, Thái Nguyên</p>
            
            <button
              onClick={handleLikeGroom}
              className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#9B2C2C] border border-stone-200 text-[10px] font-semibold active:scale-90 transition-all cursor-pointer"
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>{groomLikes}</span>
            </button>
          </div>

          {/* Bride */}
          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFC8] flex flex-col items-center text-center shadow-2xs">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 border-2 border-[#D4AF37] mb-3 bg-white shadow-sm group">
              <img
                src={bride.avatar}
                alt={bride.name}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
              {onOpenPhotoModal && (
                <button
                  onClick={() => onOpenPhotoModal('bride')}
                  title="Đổi ảnh cô dâu"
                  className="absolute bottom-1 right-1 p-1 rounded-full bg-white/90 text-[#9B2C2C] shadow-sm border border-stone-200 active:scale-90 transition-transform cursor-pointer"
                >
                  <Camera className="w-3 h-3" />
                </button>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold">
              CÔ DÂU
            </span>
            <h3 className="font-serif-elegant text-xl font-bold text-[#2D2825] mt-0.5">
              {bride.name}
            </h3>
            <p className="text-[11px] text-stone-500 mt-1 font-medium">Thái Nguyên</p>

            <button
              onClick={handleLikeBride}
              className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#9B2C2C] border border-stone-200 text-[10px] font-semibold active:scale-90 transition-all cursor-pointer"
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>{brideLikes}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
