import React from 'react';
import { Heart, Calendar } from 'lucide-react';
import { LoveMilestone } from '../types';

interface LoveStorySectionProps {
  milestones: LoveMilestone[];
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ milestones }) => {
  return (
    <section id="chuyen-tinh" className="py-16 md:py-24 border-t border-[#E8DFC8]/60 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D46] font-semibold">
            CHẶNG ĐƯỜNG ĐÃ QUA
          </span>
          <h2 className="font-serif-elegant text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2825] mt-2 mb-3">
            Câu Chuyện Tình Yêu
          </h2>
          <p className="text-sm text-stone-600 font-light leading-relaxed">
            Hành trình từ hai người xa lạ trở thành một nửa không thể thiếu trong cuộc đời nhau.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Vertical Spine Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#E8DFC8] -translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node / Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FAF7F2] border-2 border-[#C59B27] flex items-center justify-center z-10 shadow-xs">
                    <Heart className="w-3.5 h-3.5 text-[#9B2C2C] fill-[#9B2C2C]" />
                  </div>

                  {/* Content Box */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <div className="bg-[#FAF7F2] rounded-xl p-5 sm:p-6 border border-[#E8DFC8] hover:border-[#D4AF37] transition-colors shadow-xs">
                      {/* Clean unboxed metadata per Zero-Pill rule */}
                      <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium mb-1">
                        <span className="font-mono tabular-nums">{item.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.tag}</span>
                      </div>

                      <h3 className="font-serif-elegant text-xl sm:text-2xl font-bold text-[#2D2825] mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Love Note */}
        <div className="mt-16 text-center">
          <p className="font-serif-elegant italic text-lg sm:text-xl text-[#8C5D39]">
            "Và hôm nay, chúng mình chính thức cùng nhau viết tiếp chương mới..."
          </p>
        </div>
      </div>
    </section>
  );
};
