import React, { useState } from 'react';
import { Heart, CheckCircle2, User, Phone, Send, Sparkles } from 'lucide-react';
import { GuestRsvp } from '../types';
import { fireWeddingConfetti } from '../utils/confettiHelper';

interface RsvpSectionProps {
  onAddRsvp: (rsvp: Omit<GuestRsvp, 'id' | 'createdAt'>) => void;
  guestNameInitial?: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  onAddRsvp,
  guestNameInitial = '',
}) => {
  const [formData, setFormData] = useState({
    guestName: guestNameInitial,
    phone: '',
    side: 'groom' as 'groom' | 'bride' | 'both',
    status: 'attending' as 'attending' | 'not_attending',
    guestsCount: 1,
    diet: 'Bình thường',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim()) return;

    onAddRsvp({
      guestName: formData.guestName,
      phone: formData.phone,
      side: formData.side,
      status: formData.status,
      guestsCount: formData.guestsCount,
      diet: formData.diet,
      message: formData.message,
    });

    setIsSubmitted(true);
    fireWeddingConfetti();
  };

  return (
    <section id="rsvp" className="py-12 px-4 bg-white border-t border-[#E8DFC8]/60">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D46] font-semibold block mb-1">
            XÁC NHẬN THAM DỰ
          </span>
          <h2 className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#2D2825]">
            Sổ Đón Tiếp (RSVP)
          </h2>
          <p className="text-xs text-stone-500 font-light mt-1">
            Xin quý khách vui lòng xác nhận trước ngày <strong>22/09/2026</strong> để gia đình tiện sắp xếp chu đáo nhất.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#FAF7F2] rounded-3xl p-5 border border-[#E8DFC8] shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-3 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif-elegant text-xl font-bold text-[#2D2825]">
                Đã Gửi Thành Công!
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {formData.status === 'attending'
                  ? `Cảm ơn ${formData.guestName}! Hồng Sơn & Kháng Linh rất mong đợi được đón tiếp bạn vào ngày 29/09.`
                  : `Cảm ơn ${formData.guestName} đã gửi phản hồi và lời chúc tốt đẹp tới hai vợ chồng.`}
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#9B2C2C] underline cursor-pointer"
              >
                Gửi phản hồi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Attendance radio buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'attending' })}
                  className={`py-2.5 px-3 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                    formData.status === 'attending'
                      ? 'bg-[#9B2C2C] text-white border-[#9B2C2C] shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  🎉 Sẽ tham dự
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'not_attending' })}
                  className={`py-2.5 px-3 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                    formData.status === 'not_attending'
                      ? 'bg-stone-800 text-white border-stone-800 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  💌 Bận, gửi lời chúc
                </button>
              </div>

              {/* Guest name */}
              <div>
                <label className="block text-stone-600 font-semibold mb-1">
                  Tên của bạn / Đại diện gia đình *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    placeholder="Ví dụ: Anh Tuấn, Cô Lan..."
                    className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-[#9B2C2C] text-stone-800"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-stone-600 font-semibold mb-1">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại..."
                    className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-[#9B2C2C] text-stone-800"
                  />
                </div>
              </div>

              {/* Side */}
              <div>
                <label className="block text-stone-600 font-semibold mb-1">
                  Khách mời của ai?
                </label>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { id: 'groom', label: 'Nhà Trai (Sơn)' },
                    { id: 'bride', label: 'Nhà Gái (Linh)' },
                    { id: 'both', label: 'Khách chung' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, side: s.id as any })}
                      className={`py-2 px-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                        formData.side === s.id
                          ? 'bg-[#FAF0E6] text-[#9B2C2C] border-[#C59B27] font-semibold'
                          : 'bg-white text-stone-600 border-stone-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-stone-600 font-semibold mb-1">
                  Lời chúc gửi đến cô dâu &amp; chú rể
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Chúc Sơn & Linh trăm năm hạnh phúc, răng long đầu bạc..."
                  className="w-full p-2.5 bg-white rounded-xl border border-stone-200 focus:outline-none focus:border-[#9B2C2C] text-stone-800 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9B2C2C] to-[#C53030] hover:from-[#801F1F] hover:to-[#9B2C2C] text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Xác Nhận Tham Dự</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
