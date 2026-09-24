import React from 'react';
import { Camera, HeartHandshake, Wine, Clock } from 'lucide-react';
import { ScheduleItem } from '../types';

interface ScheduleSectionProps {
  schedule: ScheduleItem[];
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ schedule }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Camera':
        return <Camera className="w-4 h-4 text-[#9B2C2C]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 text-[#9B2C2C]" />;
      case 'Wine':
        return <Wine className="w-4 h-4 text-[#9B2C2C]" />;
      default:
        return <Clock className="w-4 h-4 text-[#9B2C2C]" />;
    }
  };

  return (
    <section id="lich-trinh" className="py-10 px-4 bg-[#FAF7F2] border-t border-[#E8DFC8]/60">
      <div className="max-w-md mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D46] font-semibold block mb-1">
            CHƯƠNG TRÌNH HÔN LỄ
          </span>
          <h2 className="font-serif-elegant text-2xl font-bold text-[#2D2825]">
            Lịch Trình Đón Tiếp
          </h2>
        </div>

        {/* Compact 3-Step Timeline */}
        <div className="space-y-2.5">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-3.5 border border-[#E8DFC8] flex items-center gap-3.5 shadow-2xs"
            >
              {/* Time pill */}
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] flex flex-col items-center justify-center shrink-0 border border-[#E8DFC8]/60">
                {getIcon(item.iconName)}
                <span className="font-mono text-[11px] font-bold text-[#9B2C2C] mt-0.5 leading-none">
                  {item.time}
                </span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif-elegant text-base font-bold text-[#2D2825] leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-stone-500 font-light mt-0.5 truncate">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
