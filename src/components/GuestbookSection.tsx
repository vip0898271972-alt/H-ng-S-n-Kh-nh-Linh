import React, { useState } from 'react';
import { Heart, Send, MessageCircle, Sparkles } from 'lucide-react';
import { GuestWish } from '../types';
import { fireWeddingConfetti } from '../utils/confettiHelper';

interface GuestbookSectionProps {
  wishes: GuestWish[];
  onAddWish: (wish: Omit<GuestWish, 'id' | 'likes' | 'createdAt' | 'avatarBg'>) => void;
  onLikeWish: (wishId: string) => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  wishes,
  onAddWish,
  onLikeWish,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [relationship, setRelationship] = useState('Bạn bè');
  const [message, setMessage] = useState('');
  const [justPosted, setJustPosted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    onAddWish({
      name: authorName,
      relationship,
      message,
    });

    setMessage('');
    setJustPosted(true);
    fireWeddingConfetti();
    setTimeout(() => setJustPosted(false), 3000);
  };

  return (
    <section id="so-luu-but" className="py-12 px-4 bg-[#FAF7F2] border-t border-[#E8DFC8]/60">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D46] font-semibold block mb-1">
            GỬI TRAO YÊU THƯƠNG
          </span>
          <h2 className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#2D2825]">
            Sổ Lưu Bút Chúc Phúc
          </h2>
        </div>

        {/* Wish Form */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DFC8] shadow-sm mb-6">
          {justPosted && (
            <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs flex items-center gap-2 border border-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Lời chúc của bạn đã được gửi thành công!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-stone-600 font-semibold mb-1">
                Tên của bạn *
              </label>
              <input
                type="text"
                required
                placeholder="Nhập họ tên của bạn..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-stone-800 focus:outline-none focus:border-[#9B2C2C]"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-semibold mb-1">
                Mối quan hệ
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-stone-800 focus:outline-none focus:border-[#9B2C2C]"
              >
                <option value="Bạn bè">Bạn bè</option>
                <option value="Bạn chú rể Sơn">Bạn chú rể Sơn</option>
                <option value="Bạn cô dâu Linh">Bạn cô dâu Linh</option>
                <option value="Đồng nghiệp">Đồng nghiệp</option>
                <option value="Anh em họ hàng">Anh em họ hàng</option>
                <option value="Bà con lối xóm">Bà con lối xóm</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 font-semibold mb-1">
                Lời chúc gửi đến Sơn &amp; Linh *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Viết những lời ngọt ngào nhất gửi đến Hồng Sơn & Kháng Linh..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-stone-800 focus:outline-none focus:border-[#9B2C2C] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#9B2C2C] hover:bg-[#801F1F] text-white font-semibold text-xs tracking-wide shadow-xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi Lời Chúc</span>
            </button>
          </form>
        </div>

        {/* Wishes List */}
        <div className="space-y-3">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-white rounded-2xl p-4 border border-[#E8DFC8] shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: wish.avatarBg }}
                  >
                    {wish.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2D2825] leading-tight">
                      {wish.name}
                    </h4>
                    <span className="text-[10px] text-stone-400">
                      {wish.relationship}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onLikeWish(wish.id)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#FAF7F2] text-[#9B2C2C] active:scale-90 transition-all cursor-pointer"
                >
                  <Heart className="w-3 h-3 fill-[#9B2C2C]" />
                  <span>{wish.likes}</span>
                </button>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-light pl-9">
                "{wish.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
