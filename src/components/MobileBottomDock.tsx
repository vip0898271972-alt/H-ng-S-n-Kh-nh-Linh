import React from 'react';
import { Navigation as NavIcon, Heart, MessageSquareHeart, MailOpen, Phone } from 'lucide-react';

interface MobileBottomDockProps {
  onScrollToRsvp: () => void;
  onScrollToGuestbook: () => void;
  onOpenEnvelope: () => void;
  googleMapUrl: string;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  onScrollToRsvp,
  onScrollToGuestbook,
  onOpenEnvelope,
  googleMapUrl,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8DFC8] py-2 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-around text-[10px] text-stone-700 select-none">
      
      {/* Re-open envelope */}
      <button
        onClick={onOpenEnvelope}
        className="flex flex-col items-center gap-0.5 p-1 text-stone-600 hover:text-[#9B2C2C] active:scale-95 transition-all cursor-pointer"
      >
        <MailOpen className="w-4 h-4 text-[#8C6D46]" />
        <span>Mở Thiệp</span>
      </button>

      {/* Google Maps navigation */}
      <a
        href={googleMapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 p-1 text-stone-600 hover:text-[#9B2C2C] active:scale-95 transition-all"
      >
        <NavIcon className="w-4 h-4 text-[#C59B27]" />
        <span>Chỉ Đường</span>
      </a>

      {/* Primary RSVP Floating Pill */}
      <button
        onClick={onScrollToRsvp}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#9B2C2C] to-[#C53030] text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
      >
        <Heart className="w-3.5 h-3.5 fill-current" />
        <span>Gửi RSVP</span>
      </button>

      {/* Wishes Guestbook */}
      <button
        onClick={onScrollToGuestbook}
        className="flex flex-col items-center gap-0.5 p-1 text-stone-600 hover:text-[#9B2C2C] active:scale-95 transition-all cursor-pointer"
      >
        <MessageSquareHeart className="w-4 h-4 text-[#8C6D46]" />
        <span>Lời Chúc</span>
      </button>

      {/* Call Hotline */}
      <a
        href="tel:0389755587"
        className="flex flex-col items-center gap-0.5 p-1 text-stone-600 hover:text-[#9B2C2C] active:scale-95 transition-all"
        title="Gọi khi cần chỉ đường: 0389755587"
      >
        <Phone className="w-4 h-4 text-emerald-600" />
        <span>Gọi Điện</span>
      </a>
    </div>
  );
};
