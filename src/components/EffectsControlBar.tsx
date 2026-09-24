import React, { useState } from 'react';
import { Sparkles, Flower2, Heart, Palette, MailOpen, QrCode, X } from 'lucide-react';
import { MusicPlayer } from './MusicPlayer';
import { fireWeddingConfetti, fireGrandSalute } from '../utils/confettiHelper';

export type WeddingTheme = 'champagne' | 'burgundy' | 'emerald';

interface EffectsControlBarProps {
  petalsEnabled: boolean;
  onTogglePetals: () => void;
  sparklesEnabled: boolean;
  onToggleSparkles: () => void;
  currentTheme: WeddingTheme;
  onSelectTheme: (theme: WeddingTheme) => void;
  onOpenEnvelope: () => void;
  autoPlayMusic: boolean;
}

export const EffectsControlBar: React.FC<EffectsControlBarProps> = ({
  petalsEnabled,
  onTogglePetals,
  sparklesEnabled,
  onToggleSparkles,
  currentTheme,
  onSelectTheme,
  onOpenEnvelope,
  autoPlayMusic,
}) => {
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showMobileQr, setShowMobileQr] = useState(false);
  const [heartCount, setHeartCount] = useState(88);

  const handleBurstHearts = () => {
    setHeartCount((prev) => prev + 1);
    fireWeddingConfetti();
  };

  const themes: { id: WeddingTheme; name: string; color: string; desc: string }[] = [
    { id: 'champagne', name: 'Hoàng Kim', color: '#D4AF37', desc: 'Champagne & Ivory' },
    { id: 'burgundy', name: 'Rượu Vang', color: '#9B2C2C', desc: 'Burgundy & Rose' },
    { id: 'emerald', name: 'Ngọc Lục', color: '#047857', desc: 'Emerald & Sage' },
  ];

  return (
    <>
      {/* Floating Bottom Center Effects Dock */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-none flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-[#E8DFC8]/90">
        
        {/* Integrated Music Player */}
        <MusicPlayer autoPlayTrigger={autoPlayMusic} />

        <div className="h-4 w-[1px] bg-stone-300 mx-0.5 hidden sm:block" />

        {/* Toggle Petals */}
        <button
          onClick={onTogglePetals}
          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
            petalsEnabled
              ? 'bg-[#FAF0E6] text-[#9B2C2C] border border-[#E8DFC8]'
              : 'text-stone-400 hover:text-stone-700'
          }`}
          title={petalsEnabled ? 'Tắt hiệu ứng hoa rơi' : 'Bật hiệu ứng hoa rơi'}
        >
          <Flower2 className={`w-3.5 h-3.5 ${petalsEnabled ? 'text-[#C59B27] animate-spin-slow' : ''}`} />
          <span className="hidden md:inline">Hoa rơi</span>
        </button>

        {/* Toggle Sparkles */}
        <button
          onClick={onToggleSparkles}
          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
            sparklesEnabled
              ? 'bg-[#FAF0E6] text-[#C59B27] border border-[#E8DFC8]'
              : 'text-stone-400 hover:text-stone-700'
          }`}
          title={sparklesEnabled ? 'Tắt bụi vàng lấp lánh' : 'Bật bụi vàng lấp lánh theo chuột'}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
          <span className="hidden md:inline">Bụi vàng</span>
        </button>

        {/* Theme Picker Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium text-[#5B3E2B] hover:bg-stone-100 transition-colors cursor-pointer"
            title="Đổi phong cách màu sắc"
          >
            <Palette className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span className="hidden sm:inline">Màu sắc</span>
          </button>

          {showThemePicker && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 min-w-[200px] space-y-2 animate-in slide-in-from-bottom-2">
              <div className="text-[10px] font-semibold tracking-wider uppercase text-stone-400 mb-1 px-1">
                Chọn Tông Màu Chủ Đạo
              </div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelectTheme(t.id);
                    setShowThemePicker(false);
                    fireGrandSalute();
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                    currentTheme === t.id
                      ? 'bg-stone-100 font-semibold text-stone-900'
                      : 'hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: t.color }}
                    />
                    <span>{t.name}</span>
                  </div>
                  <span className="text-[10px] text-stone-400">{t.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Replay Envelope */}
        <button
          onClick={onOpenEnvelope}
          className="p-1.5 rounded-full text-[#5B3E2B] hover:text-[#9B2C2C] hover:bg-stone-100 transition-colors cursor-pointer"
          title="Mở lại phong bì niêm phong"
        >
          <MailOpen className="w-4 h-4" />
        </button>

        {/* QR for Mobile Testing */}
        <button
          onClick={() => setShowMobileQr(true)}
          className="p-1.5 rounded-full text-[#5B3E2B] hover:text-[#9B2C2C] hover:bg-stone-100 transition-colors cursor-pointer"
          title="Quét QR mở trên điện thoại"
        >
          <QrCode className="w-4 h-4" />
        </button>

        {/* Super Fun "Bắn Tim Chúc Mừng" Button */}
        <button
          onClick={handleBurstHearts}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#9B2C2C] to-[#C53030] text-white text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Bắn pháo hoa & gửi tim chúc phúc đôi uyên ương"
        >
          <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
          <span className="hidden sm:inline">Bắn Tim ({heartCount})</span>
          <span className="sm:hidden">{heartCount}</span>
        </button>
      </div>

      {/* Mobile QR Modal */}
      {showMobileQr && (
        <div
          onClick={() => setShowMobileQr(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-xs w-full text-center shadow-2xl border border-stone-200 animate-in zoom-in-95"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
                Xem trên điện thoại
              </span>
              <button
                onClick={() => setShowMobileQr(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-4">
              Mở camera trên điện thoại và quét mã QR để trải nghiệm thiệp cưới với hiệu ứng vuốt chạm mượt mà!
            </p>

            <div className="w-48 h-48 mx-auto bg-stone-50 p-2 rounded-xl border border-stone-200 flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  window.location.href
                )}`}
                alt="QR Code Mobile"
                className="w-full h-full object-contain"
              />
            </div>

            <button
              onClick={() => setShowMobileQr(false)}
              className="mt-4 w-full py-2 rounded-xl bg-stone-900 text-white text-xs font-medium hover:bg-stone-800"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
};
