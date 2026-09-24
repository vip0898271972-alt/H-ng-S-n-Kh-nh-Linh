import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Link, Check, Sparkles, Trash2, Image as ImageIcon } from 'lucide-react';
import { WeddingData, GalleryImage } from '../types';
import { compressImageFile } from '../utils/imageCompressor';
import { fireWeddingConfetti } from '../utils/confettiHelper';

interface PhotoCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  weddingData: WeddingData;
  onUpdateWeddingData: (updated: WeddingData) => void;
  initialActiveTab?: 'hero' | 'groom' | 'bride' | 'gallery';
}

export const PhotoCustomizerModal: React.FC<PhotoCustomizerModalProps> = ({
  isOpen,
  onClose,
  weddingData,
  onUpdateWeddingData,
  initialActiveTab = 'hero',
}) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'groom' | 'bride' | 'gallery'>(initialActiveTab);
  
  const [heroImage, setHeroImage] = useState(weddingData.heroImage);
  const [groomAvatar, setGroomAvatar] = useState(weddingData.groom.avatar);
  const [brideAvatar, setBrideAvatar] = useState(weddingData.bride.avatar);
  const [gallery, setGallery] = useState<GalleryImage[]>(weddingData.gallery);

  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const compressedBase64 = await compressImageFile(file, 1200, 1600, 0.85);

      if (activeTab === 'hero') {
        setHeroImage(compressedBase64);
      } else if (activeTab === 'groom') {
        setGroomAvatar(compressedBase64);
      } else if (activeTab === 'bride') {
        setBrideAvatar(compressedBase64);
      } else if (activeTab === 'gallery') {
        const newImg: GalleryImage = {
          id: `gal_${Date.now()}`,
          url: compressedBase64,
          caption: 'Khoảnh khắc yêu thương',
        };
        setGallery([newImg, ...gallery]);
      }

      setSuccessMsg('Đã chọn ảnh thành công!');
      setTimeout(() => setSuccessMsg(''), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    const cleanUrl = urlInput.trim();

    if (activeTab === 'hero') {
      setHeroImage(cleanUrl);
    } else if (activeTab === 'groom') {
      setGroomAvatar(cleanUrl);
    } else if (activeTab === 'bride') {
      setBrideAvatar(cleanUrl);
    } else if (activeTab === 'gallery') {
      const newImg: GalleryImage = {
        id: `gal_${Date.now()}`,
        url: cleanUrl,
        caption: 'Khoảnh khắc yêu thương',
      };
      setGallery([newImg, ...gallery]);
    }

    setUrlInput('');
    setSuccessMsg('Đã cập nhật link ảnh!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleSaveAll = () => {
    const updated: WeddingData = {
      ...weddingData,
      heroImage,
      groom: {
        ...weddingData.groom,
        avatar: groomAvatar,
      },
      bride: {
        ...weddingData.bride,
        avatar: brideAvatar,
      },
      gallery,
    };

    onUpdateWeddingData(updated);
    fireWeddingConfetti();
    onClose();
  };

  const getCurrentPreview = () => {
    if (activeTab === 'hero') return heroImage;
    if (activeTab === 'groom') return groomAvatar;
    if (activeTab === 'bride') return brideAvatar;
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-[#FAF7F2] rounded-3xl w-full max-w-sm border border-[#E8DFC8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-4 py-3.5 bg-white border-b border-[#E8DFC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF0E6] text-[#9B2C2C] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-elegant font-bold text-sm text-[#2D2825]">
                Đổi Ảnh Cưới Của Bạn
              </h3>
              <p className="text-[10px] text-stone-500">
                Hiển thị trực tiếp ảnh thật lên thiệp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="p-3 bg-[#F4EDE4] border-b border-[#E8DFC8] flex gap-1">
          {[
            { id: 'hero', label: 'Ảnh Cổng' },
            { id: 'groom', label: 'Chú Rể' },
            { id: 'bride', label: 'Cô Dâu' },
            { id: 'gallery', label: 'Album' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#9B2C2C] text-white shadow-xs'
                  : 'bg-white/80 text-stone-600 hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          
          {successMsg && (
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab !== 'gallery' ? (
            <div className="flex flex-col items-center">
              {/* Preview Thumbnail */}
              <div
                className={`overflow-hidden border-2 border-[#D4AF37] bg-white shadow-md mb-3 ${
                  activeTab === 'hero'
                    ? 'w-32 h-44 rounded-2xl'
                    : 'w-28 h-28 rounded-full'
                }`}
              >
                <img
                  src={getCurrentPreview() || ''}
                  alt="Ảnh xem trước"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span className="text-xs font-semibold text-stone-800 mb-1">
                {activeTab === 'hero' && 'Ảnh Bìa Cổng Chính (Đứng)'}
                {activeTab === 'groom' && 'Ảnh Chân Dung Chú Rể Hồng Sơn'}
                {activeTab === 'bride' && 'Ảnh Chân Dung Cô Dâu Kháng Linh'}
              </span>
              <p className="text-[10px] text-stone-500 text-center mb-3">
                Chạm vào nút bên dưới để chọn ảnh từ máy của bạn
              </p>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#9B2C2C] hover:bg-[#801F1F] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer mb-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Đang nén ảnh...' : 'Chọn Ảnh Từ Điện Thoại / Máy'}</span>
              </button>

              {/* Paste URL option */}
              <div className="w-full pt-2 border-t border-stone-200">
                <label className="block text-[10px] uppercase font-semibold text-stone-400 mb-1 text-left">
                  Hoặc dán link ảnh trực tiếp
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#9B2C2C]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-3 py-1.5 bg-stone-800 text-white rounded-lg text-xs font-semibold hover:bg-stone-900 transition-colors"
                  >
                    Dán
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Gallery Management */
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                disabled={isProcessing}
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#9B2C2C] hover:bg-[#801F1F] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Thêm Ảnh Vào Album Từ Máy</span>
              </button>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {gallery.map((item, idx) => (
                  <div key={item.id || idx} className="relative group rounded-xl overflow-hidden aspect-square border border-stone-200 bg-stone-100">
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 p-1 rounded-md bg-red-600 text-white opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-3 bg-white border-t border-[#E8DFC8] flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50 transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#9B2C2C] to-[#C53030] text-white text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lưu &amp; Cập Nhật</span>
          </button>
        </div>
      </div>
    </div>
  );
};
