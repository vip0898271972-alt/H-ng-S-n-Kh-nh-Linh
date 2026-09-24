import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Sparkles, Navigation as NavIcon, Camera } from 'lucide-react';
import { WeddingData } from '../types';
import { fireWeddingConfetti } from '../utils/confettiHelper';

interface HeroSectionProps {
  weddingData: WeddingData;
  guestName: string;
  onScrollToRsvp: () => void;
  onOpenEnvelope: () => void;
  onOpenPhotoModal?: (tab: 'hero' | 'groom' | 'bride') => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  weddingData,
  guestName,
  onScrollToRsvp,
  onOpenPhotoModal,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(weddingData.weddingDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [weddingData.weddingDate]);

  return (
    <section id="top" className="relative pt-4 pb-10 md:pt-8 md:pb-16 text-center px-4 overflow-hidden">
      
      {/* Gentle ambient warmth */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-radial from-[#F5DEB3]/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-md mx-auto">
        
        {/* Top Tagline */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-[1px] w-8 bg-[#C59B27]/60" />
          <p className="text-[11px] font-semibold tracking-[0.25em] text-[#8C6D46] uppercase">
            SAVE OUR DATE
          </p>
          <span className="h-[1px] w-8 bg-[#C59B27]/60" />
        </div>

        {/* Personalized Guest Welcome Pill */}
        {guestName && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] border border-[#E8DFC8] text-xs text-[#8C5D39] mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#C59B27]" />
            <span>Kính gửi: <strong className="font-semibold text-[#9B2C2C]">{guestName}</strong></span>
          </div>
        )}

        {/* Couple Names */}
        <h1 className="font-serif-elegant text-4xl sm:text-5xl font-bold tracking-tight text-[#2D2825] mb-2 leading-tight">
          <span>{weddingData.groom.name}</span>
          <span className="font-serif-italic text-3xl sm:text-4xl text-[#C59B27] mx-2 font-normal">
            &amp;
          </span>
          <span>{weddingData.bride.name}</span>
        </h1>

        {/* Date line */}
        <p className="font-serif-elegant italic text-base text-[#6B5749] mb-5">
          Thứ Ba, ngày 29 tháng 09 năm 2026 · Thái Nguyên
        </p>

        {/* Main Hero Wedding Photo (Arched Card) */}
        <div className="relative mx-auto mb-6 rounded-t-full rounded-b-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-[#D4AF37]/50 bg-[#F5ECE2] max-w-[340px] aspect-[3/4] group">
          <img
            src={weddingData.heroImage}
            alt={`${weddingData.groom.name} & ${weddingData.bride.name}`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Quick Edit Camera Button */}
          {onOpenPhotoModal && (
            <button
              onClick={() => onOpenPhotoModal('hero')}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#9B2C2C] shadow-md backdrop-blur-xs transition-all active:scale-90 cursor-pointer"
              title="Đổi ảnh cưới của bạn"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}

          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 text-white text-center">
            <p className="font-serif-elegant italic text-sm text-stone-200">
              "{weddingData.quote}"
            </p>
          </div>
        </div>

        {/* Compact Countdown Timer */}
        <div className="bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 border border-[#E8DFC8] shadow-sm mb-5 max-w-[340px] mx-auto">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-widest text-[#8C6D46] font-bold">
              {timeLeft.isPast ? 'Ngày hạnh phúc đã trọn vẹn' : 'Đếm ngược ngày chung đôi'}
            </p>
            {/* Save to Calendar Button */}
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+Th%C3%A0nh+H%C3%B4n+H%E1%BB%93ng+S%C6%A1n+%26+Kh%C3%A1ng+Linh&dates=20260929T040000Z/20260929T070000Z&details=Tr%C3%A2n+tr%E1%BB%8Dng+k%C3%ADnh+m%E1%BB%9Di+qu%C3%BD+kh%C3%A1ch+t%E1%BB%9Bi+d%E1%BB%B1+L%E1%BB%85+Th%C3%A0nh+H%C3%B4n+c%E1%BB%A7a+ch%C3%BAng+t%C3%B4i!&location=X%C3%B3m+%C4%90%E1%BA%ADu+8b%2C+Minh+%C4%90%E1%BB%A9c%2C+Ph%E1%BB%95+Y%C3%AAn%2C+Th%C3%A1i+Nguy%C3%AAn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#9B2C2C] hover:underline font-semibold flex items-center gap-1"
              title="Lưu ngày cưới vào Google Calendar"
            >
              <Calendar className="w-3 h-3 text-[#9B2C2C]" />
              <span>+ Lưu vào lịch</span>
            </a>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center">
            <div className="bg-[#FAF7F2] py-2 rounded-xl border border-stone-200/70">
              <span className="block font-serif-elegant text-2xl font-bold text-[#9B2C2C] leading-none">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-stone-500 uppercase font-medium">Ngày</span>
            </div>
            <div className="bg-[#FAF7F2] py-2 rounded-xl border border-stone-200/70">
              <span className="block font-serif-elegant text-2xl font-bold text-[#9B2C2C] leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-stone-500 uppercase font-medium">Giờ</span>
            </div>
            <div className="bg-[#FAF7F2] py-2 rounded-xl border border-stone-200/70">
              <span className="block font-serif-elegant text-2xl font-bold text-[#9B2C2C] leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-stone-500 uppercase font-medium">Phút</span>
            </div>
            <div className="bg-[#FAF7F2] py-2 rounded-xl border border-stone-200/70">
              <span className="block font-serif-elegant text-2xl font-bold text-[#9B2C2C] leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-stone-500 uppercase font-medium">Giây</span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center justify-center gap-2.5 max-w-[340px] mx-auto">
          <button
            onClick={() => {
              onScrollToRsvp();
              fireWeddingConfetti();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-gradient-to-r from-[#9B2C2C] via-[#B91C1C] to-[#9B2C2C] hover:from-[#801F1F] hover:to-[#9B2C2C] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer border border-[#FFDF73]/40"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Gửi Lời Chúc / RSVP</span>
          </button>

          <a
            href={weddingData.venueReception.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-white hover:bg-stone-50 text-[#8C6D46] border border-[#D4AF37]/50 text-xs font-bold shadow-xs active:scale-95 transition-all"
          >
            <NavIcon className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Chỉ Đường</span>
          </a>
        </div>

      </div>
    </section>
  );
};
