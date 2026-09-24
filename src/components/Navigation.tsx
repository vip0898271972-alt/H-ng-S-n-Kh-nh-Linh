import React, { useState } from 'react';
import { Menu, X, MailOpen, Heart, Volume2, VolumeX, Camera, UserPlus } from 'lucide-react';
import { WeddingData } from '../types';

interface NavigationProps {
  weddingData: WeddingData;
  onOpenEnvelope: () => void;
  onScrollToRsvp: () => void;
  onOpenPhotoModal?: () => void;
  onOpenPersonalizedModal?: () => void;
  isPlaying?: boolean;
  onToggleMusic?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  weddingData,
  onOpenEnvelope,
  onScrollToRsvp,
  onOpenPhotoModal,
  onOpenPersonalizedModal,
  isPlaying,
  onToggleMusic,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Lời Ngỏ', href: '#loi-ngo' },
    { label: 'Cặp Đôi', href: '#cap-doi' },
    { label: 'Thời Gian & Địa Điểm', href: '#dia-diem' },
    { label: 'Album Ảnh', href: '#album-anh' },
    { label: 'Mừng Cưới', href: '#mung-cuoi' },
    { label: 'Sổ Lưu Bút', href: '#so-luu-but' },
  ];

  const groomShortName = weddingData.groom.name.split(' ').pop() || 'Sơn';
  const brideShortName = weddingData.bride.name.split(' ').pop() || 'Linh';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]/60 shadow-2xs">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Brand Monogram */}
        <a
          href="#top"
          className="font-serif-elegant text-lg sm:text-xl font-bold tracking-tight text-[#2D2825] hover:text-[#9B2C2C] transition-colors flex items-center gap-1.5"
        >
          <span className="text-[#9B2C2C]">{groomShortName}</span>
          <span className="text-[#C59B27] font-serif-italic font-normal">&amp;</span>
          <span className="text-[#9B2C2C]">{brideShortName}</span>
          <span className="text-[11px] font-sans font-normal text-stone-500 ml-1 hidden sm:inline">| 29.09.2026</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#5B4A3F]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#9B2C2C] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Music Toggle */}
          {onToggleMusic && (
            <button
              onClick={onToggleMusic}
              title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
              className="p-1.5 rounded-full text-stone-600 hover:text-[#9B2C2C] hover:bg-stone-100 transition-colors"
            >
              {isPlaying ? <Volume2 className="w-4 h-4 text-[#9B2C2C]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>
          )}

          {/* Personalized VIP Invite Generator */}
          {onOpenPersonalizedModal && (
            <button
              onClick={onOpenPersonalizedModal}
              title="Tạo link thiệp kèm tên từng khách mời"
              className="p-1.5 rounded-full text-[#8C6D46] hover:text-[#9B2C2C] hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Tạo link thiệp mời cá nhân hóa"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          )}

          {/* Re-open envelope button */}
          <button
            onClick={onOpenEnvelope}
            title="Mở lại phong bì thiệp cưới"
            className="p-1.5 rounded-full text-[#5B4A3F] hover:text-[#9B2C2C] hover:bg-stone-100 transition-colors"
            aria-label="Mở phong bì thiệp"
          >
            <MailOpen className="w-4 h-4" />
          </button>

          {/* Quick Photo Customizer Button */}
          {onOpenPhotoModal && (
            <button
              onClick={onOpenPhotoModal}
              title="Đổi ảnh cưới của bạn"
              className="p-1.5 rounded-full text-[#5B4A3F] hover:text-[#9B2C2C] hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Đổi ảnh cưới"
            >
              <Camera className="w-4 h-4 text-[#8C6D46]" />
            </button>
          )}

          {/* Primary RSVP CTA */}
          <button
            onClick={onScrollToRsvp}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#9B2C2C] to-[#BA1A1A] hover:from-[#801F1F] hover:to-[#9B2C2C] rounded-full transition-all shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <Heart className="w-3 h-3 fill-white" />
            <span>RSVP</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#5B4A3F] hover:bg-stone-100 cursor-pointer"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drop drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFC8] bg-[#FAF7F2] px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#4A3728] hover:text-[#9B2C2C] border-b border-stone-200/50"
            >
              {link.label}
            </a>
          ))}
          {onOpenPersonalizedModal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPersonalizedModal();
              }}
              className="w-full text-left py-2 text-sm font-semibold text-[#9B2C2C] flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tạo Link Thiệp Kèm Tên Bạn Bè</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};

