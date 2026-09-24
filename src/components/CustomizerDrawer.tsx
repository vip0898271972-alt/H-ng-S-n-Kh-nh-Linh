import React, { useState } from 'react';
import { X, Upload, Check, RefreshCw, Link as LinkIcon, Image, User, Calendar, MapPin, CreditCard, Sparkles } from 'lucide-react';
import { WeddingData } from '../types';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  weddingData: WeddingData;
  onUpdateWeddingData: (updated: WeddingData) => void;
  onResetData: () => void;
  guestName: string;
  onUpdateGuestName: (name: string) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  weddingData,
  onUpdateWeddingData,
  onResetData,
  guestName,
  onUpdateGuestName,
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'couple' | 'event' | 'bank' | 'share'>('photos');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  // Handle local image file upload and convert to base64 DataURL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'hero' | 'groom' | 'bride' | 'gallery'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      if (field === 'hero') {
        onUpdateWeddingData({ ...weddingData, heroImage: dataUrl });
      } else if (field === 'groom') {
        onUpdateWeddingData({
          ...weddingData,
          groom: { ...weddingData.groom, avatar: dataUrl },
        });
      } else if (field === 'bride') {
        onUpdateWeddingData({
          ...weddingData,
          bride: { ...weddingData.bride, avatar: dataUrl },
        });
      } else if (field === 'gallery') {
        const newImg = {
          id: `g_${Date.now()}`,
          url: dataUrl,
          caption: 'Khoảnh khắc yêu thương',
          colSpan: 1,
        };
        onUpdateWeddingData({
          ...weddingData,
          gallery: [newImg, ...weddingData.gallery],
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const copyGuestShareLink = () => {
    const url = new URL(window.location.href);
    if (guestName.trim()) {
      url.searchParams.set('to', guestName.trim());
    } else {
      url.searchParams.delete('to');
    }
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F2]">
            <div>
              <span className="text-[10px] font-semibold tracking-widest text-[#8C6D46] uppercase">
                BẢNG QUẢN TRỊ THIỆP CƯỚI
              </span>
              <h3 className="font-serif-elegant text-xl font-bold text-[#2D2825]">
                Tùy Chỉnh &amp; Thay Ảnh
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex border-b border-stone-200 bg-stone-50 px-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('photos')}
              className={`py-3 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'photos'
                  ? 'border-[#9B2C2C] text-[#9B2C2C] font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Thay Ảnh</span>
            </button>
            <button
              onClick={() => setActiveTab('couple')}
              className={`py-3 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'couple'
                  ? 'border-[#9B2C2C] text-[#9B2C2C] font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Cặp Đôi</span>
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={`py-3 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'event'
                  ? 'border-[#9B2C2C] text-[#9B2C2C] font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Ngày &amp; Giờ</span>
            </button>
            <button
              onClick={() => setActiveTab('bank')}
              className={`py-3 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'bank'
                  ? 'border-[#9B2C2C] text-[#9B2C2C] font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Ngân Hàng</span>
            </button>
            <button
              onClick={() => setActiveTab('share')}
              className={`py-3 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'share'
                  ? 'border-[#9B2C2C] text-[#9B2C2C] font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Link Mời</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* TAB 1: TẢI ẢNH CỦA BẠN LÊN */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8DFC8] text-xs text-stone-600 leading-relaxed">
                  <span className="font-semibold text-[#8C6D46] block mb-1">
                    ✨ Tải ảnh của bạn trực tiếp từ máy:
                  </span>
                  Bạn có thể chọn ảnh từ máy tính hoặc điện thoại để thay thế ảnh mẫu ngay tức khắc! Ảnh được lưu trực tiếp trên trình duyệt của bạn.
                </div>

                {/* Hero Banner Upload */}
                <div className="space-y-2 border-b pb-4">
                  <label className="block text-xs font-semibold text-stone-700">
                    1. Ảnh Bìa Trang Chủ (Hero Couple Photo)
                  </label>
                  <div className="flex items-center gap-3">
                    <img
                      src={weddingData.heroImage}
                      alt="Hero preview"
                      className="w-16 h-12 rounded-lg object-cover border border-stone-300"
                    />
                    <label className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-dashed border-stone-300 rounded-xl hover:bg-stone-50 cursor-pointer text-xs font-medium text-stone-700">
                      <Upload className="w-3.5 h-3.5 text-[#C59B27]" />
                      <span>Chọn ảnh từ máy...</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'hero')}
                      />
                    </label>
                  </div>
                </div>

                {/* Groom Avatar Upload */}
                <div className="space-y-2 border-b pb-4">
                  <label className="block text-xs font-semibold text-stone-700">
                    2. Ảnh Chân Dung Chú Rể (Groom Avatar)
                  </label>
                  <div className="flex items-center gap-3">
                    <img
                      src={weddingData.groom.avatar}
                      alt="Groom avatar"
                      className="w-12 h-12 rounded-full object-cover border border-stone-300"
                    />
                    <label className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-dashed border-stone-300 rounded-xl hover:bg-stone-50 cursor-pointer text-xs font-medium text-stone-700">
                      <Upload className="w-3.5 h-3.5 text-[#C59B27]" />
                      <span>Chọn ảnh Chú Rể...</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'groom')}
                      />
                    </label>
                  </div>
                </div>

                {/* Bride Avatar Upload */}
                <div className="space-y-2 border-b pb-4">
                  <label className="block text-xs font-semibold text-stone-700">
                    3. Ảnh Chân Dung Cô Dâu (Bride Avatar)
                  </label>
                  <div className="flex items-center gap-3">
                    <img
                      src={weddingData.bride.avatar}
                      alt="Bride avatar"
                      className="w-12 h-12 rounded-full object-cover border border-stone-300"
                    />
                    <label className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-dashed border-stone-300 rounded-xl hover:bg-stone-50 cursor-pointer text-xs font-medium text-stone-700">
                      <Upload className="w-3.5 h-3.5 text-[#C59B27]" />
                      <span>Chọn ảnh Cô Dâu...</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'bride')}
                      />
                    </label>
                  </div>
                </div>

                {/* Add Photo to Gallery */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-stone-700">
                    4. Thêm Ảnh Vào Album Kỷ Niệm (Gallery)
                  </label>
                  <label className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-[#D4AF37]/50 rounded-xl hover:bg-[#FAF7F2] cursor-pointer text-xs font-medium text-[#8C6D46]">
                    <Upload className="w-4 h-4 text-[#C59B27]" />
                    <span>Tải ảnh mới vào Album cưới...</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'gallery')}
                    />
                  </label>
                  <span className="text-[11px] text-stone-400 block text-center">
                    Hiện có {weddingData.gallery.length} ảnh trong album
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: CẶP ĐÔI */}
            {activeTab === 'couple' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Tên Chú Rể</label>
                  <input
                    type="text"
                    value={weddingData.groom.name}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        groom: { ...weddingData.groom, name: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Song Thân Chú Rể (Bố &amp; Mẹ)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Tên bố"
                      value={weddingData.groom.fatherName}
                      onChange={(e) =>
                        onUpdateWeddingData({
                          ...weddingData,
                          groom: { ...weddingData.groom, fatherName: e.target.value },
                        })
                      }
                      className="px-3 py-2 border rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Tên mẹ"
                      value={weddingData.groom.motherName}
                      onChange={(e) =>
                        onUpdateWeddingData({
                          ...weddingData,
                          groom: { ...weddingData.groom, motherName: e.target.value },
                        })
                      }
                      className="px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <label className="block text-xs font-medium text-stone-700 mb-1">Tên Cô Dâu</label>
                  <input
                    type="text"
                    value={weddingData.bride.name}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        bride: { ...weddingData.bride, name: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Song Thân Cô Dâu (Bố &amp; Mẹ)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Tên bố"
                      value={weddingData.bride.fatherName}
                      onChange={(e) =>
                        onUpdateWeddingData({
                          ...weddingData,
                          bride: { ...weddingData.bride, fatherName: e.target.value },
                        })
                      }
                      className="px-3 py-2 border rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Tên mẹ"
                      value={weddingData.bride.motherName}
                      onChange={(e) =>
                        onUpdateWeddingData({
                          ...weddingData,
                          bride: { ...weddingData.bride, motherName: e.target.value },
                        })
                      }
                      className="px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: NGÀY & GIỜ */}
            {activeTab === 'event' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Ngày &amp; Giờ Đám Cưới (Định dạng ISO)
                  </label>
                  <input
                    type="datetime-local"
                    value={weddingData.weddingDate.slice(0, 16)}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        weddingDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Tên Trung Tâm Tiệc Cưới
                  </label>
                  <input
                    type="text"
                    value={weddingData.venueReception.venueName}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        venueReception: {
                          ...weddingData.venueReception,
                          venueName: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Địa Chỉ Tiệc Cưới
                  </label>
                  <input
                    type="text"
                    value={weddingData.venueReception.address}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        venueReception: {
                          ...weddingData.venueReception,
                          address: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: NGÂN HÀNG & MÃ QR */}
            {activeTab === 'bank' && (
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="text-xs font-semibold text-stone-800 mb-2">Tài Khoản Chú Rể</h4>
                  <input
                    type="text"
                    placeholder="Tên ngân hàng"
                    value={weddingData.groomBank.bankName}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        groomBank: { ...weddingData.groomBank, bankName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border rounded text-xs mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Số tài khoản"
                    value={weddingData.groomBank.accountNumber}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        groomBank: { ...weddingData.groomBank, accountNumber: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border rounded text-xs mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Tên chủ tài khoản"
                    value={weddingData.groomBank.owner}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        groomBank: { ...weddingData.groomBank, owner: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border rounded text-xs"
                  />
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-stone-800 mb-2">Tài Khoản Cô Dâu</h4>
                  <input
                    type="text"
                    placeholder="Tên ngân hàng"
                    value={weddingData.brideBank.bankName}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        brideBank: { ...weddingData.brideBank, bankName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border rounded text-xs mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Số tài khoản"
                    value={weddingData.brideBank.accountNumber}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        brideBank: { ...weddingData.brideBank, accountNumber: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border rounded text-xs mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Tên chủ tài khoản"
                    value={weddingData.brideBank.owner}
                    onChange={(e) =>
                      onUpdateWeddingData({
                        ...weddingData,
                        brideBank: { ...weddingData.brideBank, owner: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 border rounded text-xs"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: TẠO LINK MỜI CÁ NHÂN HÓA */}
            {activeTab === 'share' && (
              <div className="space-y-4">
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFC8] text-xs text-stone-700 leading-relaxed">
                  <span className="font-semibold text-[#8C6D46] block mb-1">
                    💌 Cá nhân hóa thiệp mời cho từng khách:
                  </span>
                  Nhập tên khách mời bên dưới, sau đó bấm <strong>"Sao chép link mời"</strong>. Khi người nhận mở đường dẫn, tên của họ sẽ xuất hiện trang trọng trên phong bì sáp và lời chào mừng!
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Tên khách mời
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Anh Tuấn & Chị Mai"
                    value={guestName}
                    onChange={(e) => onUpdateGuestName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>

                <button
                  onClick={copyGuestShareLink}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#9B2C2C] hover:bg-[#801F1F] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Đã sao chép link mời vào bộ nhớ tạm!</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4" />
                      <span>Sao Chép Link Thiệp Mời Cá Nhân</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Footer with Reset */}
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
            <button
              onClick={onResetData}
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-red-600 transition-colors"
              title="Khôi phục lại dữ liệu mẫu ban đầu"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Khôi phục dữ liệu gốc</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-medium hover:bg-stone-900 transition-colors"
            >
              Đóng bảng tùy chỉnh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
