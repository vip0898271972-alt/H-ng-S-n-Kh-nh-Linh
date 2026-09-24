import React, { useState } from 'react';
import { Sparkles, Heart, ChevronRight, X, Volume2 } from 'lucide-react';
import { WeddingData } from '../types';
import { fireWeddingConfetti } from '../utils/confettiHelper';

interface EnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  weddingData: WeddingData;
  onOpenLetter: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  isOpen,
  onClose,
  guestName,
  weddingData,
  onOpenLetter,
}) => {
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

  if (!isOpen) return null;

  const handleBreakSeal = () => {
    setIsSealBroken(true);
    
    // Play subtle soft chime
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25); // A5
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // audio ignore
    }

    setTimeout(() => {
      setIsEnvelopeOpened(true);
      onOpenLetter();
      fireWeddingConfetti();
    }, 700);
  };

  const handleEnterWedding = () => {
    onClose();
  };

  const groomInitial = weddingData.groom.name.trim().split(' ').pop()?.charAt(0) || 'S';
  const brideInitial = weddingData.bride.name.trim().split(' ').pop()?.charAt(0) || 'L';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-500 animate-in fade-in">
      {/* Skip Button */}
      <button
        onClick={handleEnterWedding}
        className="absolute top-6 right-6 z-50 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer"
      >
        <span>Vào trang thiệp</span>
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="relative w-full max-w-lg mx-auto flex flex-col items-center [perspective:1000px]">
        
        {/* Envelope Outer Shell */}
        <div className="relative w-full aspect-[4/3] max-w-[480px] bg-gradient-to-br from-[#F5EFE6] via-[#EFE5D5] to-[#E3D3BE] rounded-2xl shadow-2xl border-2 border-[#D8C7B0] overflow-hidden flex flex-col items-center justify-center p-6 text-center transition-all duration-700">
          
          {/* Real Gold Foil Filigree Corners */}
          <div className="absolute top-3.5 left-3.5 w-14 h-14 border-t-2 border-l-2 border-[#C59B27] rounded-tl-xl pointer-events-none opacity-80" />
          <div className="absolute top-3.5 right-3.5 w-14 h-14 border-t-2 border-r-2 border-[#C59B27] rounded-tr-xl pointer-events-none opacity-80" />
          <div className="absolute bottom-3.5 left-3.5 w-14 h-14 border-b-2 border-l-2 border-[#C59B27] rounded-bl-xl pointer-events-none opacity-80" />
          <div className="absolute bottom-3.5 right-3.5 w-14 h-14 border-b-2 border-r-2 border-[#C59B27] rounded-br-xl pointer-events-none opacity-80" />

          {/* Envelope 3D Fold Geometric Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <svg viewBox="0 0 480 360" className="w-full h-full">
              <polygon points="0,0 240,185 480,0" fill="#E8D9C5" stroke="#9E805E" strokeWidth="1.5" />
              <polygon points="0,360 240,185 480,360" fill="none" stroke="#9E805E" strokeWidth="1.5" />
              <polygon points="0,0 240,185 0,360" fill="none" stroke="#9E805E" strokeWidth="1" opacity="0.5" />
              <polygon points="480,0 240,185 480,360" fill="none" stroke="#9E805E" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>

          {!isEnvelopeOpened ? (
            /* SEALED STATE */
            <div className="relative z-10 flex flex-col items-center justify-center space-y-4 max-w-sm">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#8C6D46] font-semibold">
                TRÂN TRỌNG KÍNH BÁO
              </span>

              <h2 className="font-serif-elegant text-3xl sm:text-4xl text-[#2D2825] font-bold leading-tight">
                {weddingData.groom.name}
                <span className="font-script text-3xl text-[#C59B27] mx-2">&amp;</span>
                {weddingData.bride.name}
              </h2>

              <div className="py-2.5 px-5 rounded-xl bg-white/80 backdrop-blur-xs border border-[#E8DFC8] shadow-xs text-xs text-[#5B3E2B] max-w-xs w-full">
                <span className="font-medium block text-stone-500 text-[10px] tracking-widest uppercase">Trân trọng kính gửi</span>
                <span className="font-serif-elegant text-lg font-bold text-[#9B2C2C] italic block truncate">
                  {guestName || 'Quý Khách & Người Thương'}
                </span>
              </div>

              {/* Royal Wax Seal with Pulse & Glow */}
              <div className="pt-2 flex flex-col items-center">
                <div className="relative group">
                  {/* Glowing halo */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-amber-500 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse" />
                  
                  <button
                    onClick={handleBreakSeal}
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br from-[#B91C1C] via-[#881337] to-[#4C0519] shadow-2xl flex items-center justify-center border-2 border-[#FFDF73] cursor-pointer transition-all duration-500 ${
                      isSealBroken ? 'scale-150 rotate-45 opacity-0' : 'hover:scale-110 active:scale-95'
                    }`}
                    aria-label="Chạm để mở niêm phong thiệp cưới"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-serif-elegant font-bold text-xl text-[#FFF3CC] tracking-tighter drop-shadow-sm">
                        {groomInitial}&amp;{brideInitial}
                      </span>
                      <span className="text-[8px] tracking-widest text-[#FFDF73] uppercase -mt-0.5">
                        WEDDING
                      </span>
                    </div>

                    {/* Wax Stamp Inner Rim */}
                    <span className="absolute inset-1.5 rounded-full border border-amber-200/40 pointer-events-none" />
                  </button>
                </div>

                <p className="mt-3 text-xs text-stone-600 font-medium flex items-center justify-center gap-1.5 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Chạm vào con dấu sáp để mở thiệp</span>
                </p>
              </div>
            </div>
          ) : (
            /* UNFOLDED INVITATION CARD STATE */
            <div className="relative z-10 flex flex-col items-center justify-center space-y-4 max-w-sm animate-in zoom-in-90 duration-700">
              <div className="w-12 h-12 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#9B2C2C] border border-[#D4AF37]/50 shadow-md">
                <Heart className="w-6 h-6 fill-current animate-pulse-subtle" />
              </div>

              <div className="text-center space-y-1">
                <p className="text-[11px] tracking-widest uppercase text-[#8C6D46] font-semibold">
                  THƯ MỜI CHÍNH THỨC
                </p>
                <h3 className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#2D2825]">
                  Hân Hạnh Đón Tiếp
                </h3>
                <p className="font-serif-elegant italic text-lg text-[#9B2C2C] font-semibold">
                  {guestName || 'Quý Khách Quý'}
                </p>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-light px-4">
                "Hạnh phúc trọn vẹn nhất là khi khoảnh khắc thiêng liêng nhất của cuộc đời được sẻ chia cùng những người thân yêu nhất."
              </p>

              <div className="pt-2">
                <button
                  onClick={handleEnterWedding}
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#851D1D] via-[#A82828] to-[#851D1D] text-white text-xs font-semibold tracking-wider uppercase shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer border border-[#FFDF73]/40"
                >
                  <Sparkles className="w-4 h-4 text-[#FFDF73]" />
                  <span>Khám Phá Lễ Cưới &amp; Chúc Phúc</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
