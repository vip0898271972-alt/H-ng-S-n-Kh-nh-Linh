import React, { useState } from 'react';
import { X, Copy, Check, Share2, Sparkles, UserCheck } from 'lucide-react';
import { fireWeddingConfetti } from '../utils/confettiHelper';

interface PersonalizedInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupleNames: string;
}

export const PersonalizedInviteModal: React.FC<PersonalizedInviteModalProps> = ({
  isOpen,
  onClose,
  coupleNames,
}) => {
  const [customName, setCustomName] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const generatedUrl = customName.trim()
    ? `${currentUrl}?to=${encodeURIComponent(customName.trim())}`
    : currentUrl;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    fireWeddingConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const sampleNames = ['Gia Đình Bác Ba', 'Vợ chồng anh Tuấn', 'Bạn thân Ngọc Ánh', 'Anh Hoàng & Người thương'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-sm w-full p-5 border border-[#E8DFC8] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 bg-white border border-stone-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#9B2C2C]">
          <Sparkles className="w-4 h-4 text-[#C59B27]" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Tính Năng VIP</span>
        </div>

        <h3 className="font-serif-elegant text-xl font-bold text-[#2D2825] mb-1">
          Tạo Thiệp Mời Kèm Tên Khách
        </h3>
        <p className="text-xs text-stone-500 mb-4 font-light">
          Nhập tên khách mời để thiệp tự động hiện tên người đó ở bì thư hoàng gia và trang đầu!
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Tên khách mời muốn gửi:
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="VD: Anh Tuấn, Gia đình Bác Ba, ..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8C7B0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9B2C2C]"
            />
          </div>

          {/* Quick sample chips */}
          <div className="flex flex-wrap gap-1.5">
            {sampleNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCustomName(name)}
                className="text-[10px] px-2 py-1 rounded-md bg-white border border-stone-200 text-stone-600 hover:border-[#9B2C2C] hover:text-[#9B2C2C]"
              >
                + {name}
              </button>
            ))}
          </div>

          {/* Preview box */}
          <div className="p-3 rounded-xl bg-white border border-[#E8DFC8] text-center space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">
              Xem trước thiệp mời
            </span>
            <p className="font-serif-elegant text-base font-bold text-[#9B2C2C]">
              {coupleNames}
            </p>
            <p className="text-xs text-stone-600">
              Trân trọng kính mời:{' '}
              <strong className="text-[#2D2825] underline decoration-[#C59B27]">
                {customName.trim() || '(Tên khách mời)'}
              </strong>
            </p>
          </div>

          {/* Link output & Copy Button */}
          <div className="pt-1 space-y-2">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2C2C] to-[#BA1A1A] hover:from-[#801F1F] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Đã sao chép link thành công!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Sao chép link gửi Zalo / Messenger</span>
                </>
              )}
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                type="button"
                onClick={() => {
                  try {
                    navigator.share({
                      title: `Thiệp Cưới: ${coupleNames}`,
                      text: customName.trim()
                        ? `Trân trọng kính mời ${customName.trim()} tham dự Lễ Thành Hôn của chúng tôi!`
                        : `Trân trọng kính mời bạn tham dự Lễ Thành Hôn của chúng tôi!`,
                      url: generatedUrl,
                    });
                  } catch {
                    // ignore
                  }
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-[#9B2C2C]" />
                <span>Chia sẻ trực tiếp qua ứng dụng</span>
              </button>
            )}

            <p className="text-[10px] text-stone-400 text-center italic">
              * Đã tích hợp ảnh bìa, bản quyền chính thức &amp; thông điệp thiệp mời khi gửi Zalo / Facebook.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
