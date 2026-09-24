import React from 'react';
import { Shirt, Sparkles, Clock, Heart, Camera } from 'lucide-react';

export const DressCodeSection: React.FC = () => {
  const colorSwatches = [
    { name: 'Trắng Kem', colorHex: '#FAF6EE', border: 'border-stone-300' },
    { name: 'Be Sữa', colorHex: '#E8DFC8', border: 'border-amber-200' },
    { name: 'Vàng Champagne', colorHex: '#F5E6C8', border: 'border-amber-300' },
    { name: 'Hồng Pastel', colorHex: '#FCE7F3', border: 'border-pink-200' },
    { name: 'Xanh Sage', colorHex: '#E2EBE5', border: 'border-emerald-200' },
  ];

  const tips = [
    {
      icon: <Clock className="w-4 h-4 text-[#9B2C2C]" />,
      title: 'Đúng Giờ & Chu Đáo',
      desc: 'Quý khách vui lòng có mặt trước 15-30 phút để đón tiếp và chụp hình lưu niệm.',
    },
    {
      icon: <Shirt className="w-4 h-4 text-[#C59B27]" />,
      title: 'Trang Phục Tươi Sáng',
      desc: 'Khuyến khích tông màu trang nhã, nhẹ nhàng để toàn bộ ảnh cưới lung linh nhất.',
    },
    {
      icon: <Camera className="w-4 h-4 text-[#9B2C2C]" />,
      title: 'Góc Check-in Xịn Xò',
      desc: 'Khu vực photobooth và bàn đón tiếp luôn sẵn sàng để quý khách thỏa sức chụp ảnh kỷ niệm.',
    },
    {
      icon: <Heart className="w-4 h-4 text-[#C59B27]" />,
      title: 'Quẩy Hết Mình',
      desc: 'Hãy chuẩn bị một trái tim rộn ràng để chúc phúc và chung vui cùng đôi uyên ương!',
    },
  ];

  return (
    <section className="py-10 px-4 bg-white/60 border-t border-[#E8DFC8]/60">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D46] font-semibold block mb-1">
            GỢI Ý &amp; LƯU Ý
          </span>
          <h2 className="font-serif-elegant text-2xl font-bold text-[#2D2825]">
            Dress Code &amp; Tiệc Chung Vui
          </h2>
          <p className="text-xs text-stone-500 font-light mt-1 max-w-xs mx-auto">
            Sự hiện diện chỉn chu của bạn là món quà ý nghĩa nhất dành cho Hồng Sơn &amp; Kháng Linh
          </p>
        </div>

        {/* Color Palette Card */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFC8] shadow-2xs mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-serif-elegant font-bold text-[#2D2825] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Bảng Màu Khuyến Khích</span>
            </span>
            <span className="text-[10px] text-stone-400">Tone trang nhã</span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center">
            {colorSwatches.map((item) => (
              <div key={item.name} className="flex flex-col items-center group">
                <div
                  className={`w-11 h-11 rounded-full shadow-xs border ${item.border} transition-transform group-hover:scale-110 mb-1 flex items-center justify-center`}
                  style={{ backgroundColor: item.colorHex }}
                />
                <span className="text-[10px] text-stone-600 font-medium leading-tight">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-3 pt-2.5 border-t border-stone-200/60 text-[11px] text-stone-500 text-center italic">
            * Quý khách vui lòng hạn chế mặc trang phục màu đen toàn phần
          </div>
        </div>

        {/* 4 Elegant Tips Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-3 border border-[#E8DFC8]/70 shadow-2xs flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FAF0E6] flex items-center justify-center mb-2">
                {tip.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#2D2825] font-serif-elegant leading-snug">
                  {tip.title}
                </h3>
                <p className="text-[10px] text-stone-500 mt-0.5 leading-relaxed font-light">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
