import React, { useState } from 'react';
import { MapPin, Navigation as NavIcon, Copy, Check, Calendar, Clock, Phone, Car } from 'lucide-react';
import { VenueInfo } from '../types';

interface VenuesSectionProps {
  venueCeremony: VenueInfo;
  venueReception: VenueInfo;
}

export const VenuesSection: React.FC<VenuesSectionProps> = ({ venueReception }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(venueReception.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="dia-diem" className="py-12 px-4 bg-[#FAF7F2]">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D46] font-semibold block mb-1">
            THỜI GIAN &amp; ĐỊA ĐIỂM
          </span>
          <h2 className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#2D2825]">
            Lễ Thành Hôn &amp; Khai Tiệc
          </h2>
        </div>

        {/* Elegant Invitation Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DFC8] shadow-md relative overflow-hidden">
          
          {/* Gold decorative corner line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#9B2C2C] via-[#C59B27] to-[#9B2C2C]" />

          {/* Time & Date Box */}
          <div className="text-center pb-4 mb-4 border-b border-stone-100">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FAF0E6] text-[#9B2C2C] text-[11px] font-bold tracking-wider uppercase mb-2">
              THỨ BA · 29.09.2026
            </span>
            <div className="font-serif-elegant text-3xl font-bold text-[#9B2C2C] leading-none mb-1">
              11:00 TRƯA
            </div>
            <p className="text-xs text-stone-500 font-medium">
              (Nhằm ngày 19 tháng 08 năm Bính Ngọ - Âm lịch)
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              Đón khách chụp hình lưu niệm từ 10:00 sáng
            </p>
          </div>

          {/* Venue Info */}
          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-3 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8DFC8]/60">
              <MapPin className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block">
                  ĐỊA ĐIỂM TỔ CHỨC
                </span>
                <strong className="block font-serif-elegant text-lg text-[#2D2825]">
                  Tư Gia Nhà Trai
                </strong>
                <p className="text-xs text-stone-600 mt-0.5 font-medium leading-relaxed">
                  Xóm Đậu 8b, Xã Minh Đức, Thành phố Phổ Yên, Tỉnh Thái Nguyên
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] text-amber-900">
              <Car className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Có chỗ đỗ xe ô tô rộng rãi, biển chỉ dẫn đón tiếp tại đầu xóm.</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <a
              href={venueReception.googleMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9B2C2C] to-[#C53030] hover:from-[#801F1F] hover:to-[#9B2C2C] text-white text-xs font-bold tracking-wide shadow-md active:scale-95 transition-all"
            >
              <NavIcon className="w-4 h-4 fill-white" />
              <span>Mở Chỉ Đường Google Maps</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={copyAddress}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Đã Chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Chép Địa Chỉ</span>
                  </>
                )}
              </button>

              <a
                href="tel:0389755587"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FAF0E6] hover:bg-[#F4E3D0] text-[#9B2C2C] border border-[#E8DFC8] text-xs font-semibold active:scale-95 transition-all"
                title="Gọi hỗ trợ chỉ đường: 0389755587"
              >
                <Phone className="w-3.5 h-3.5 text-[#9B2C2C]" />
                <span>Gọi Chỉ Đường</span>
              </a>
            </div>

            {/* Direct hotline reminder */}
            <p className="text-[11px] text-center text-stone-500 pt-1">
              Hotline đón tiếp &amp; chỉ đường: <a href="tel:0389755587" className="font-bold text-[#9B2C2C] hover:underline">0389 755 587</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
