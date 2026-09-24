import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Flame } from 'lucide-react';
import { fireWeddingConfetti, fireGrandSalute } from '../utils/confettiHelper';
import { soundEffects } from '../utils/audioHelper';

interface FloatingReaction {
  id: string;
  emoji: string;
  x: number;
  duration: number;
}

interface CelebrationOverlayProps {
  onFireworkClick?: () => void;
}

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ onFireworkClick }) => {
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const [isOpenBar, setIsOpenBar] = useState(false);
  const [celebrationCount, setCelebrationCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('wedding_celebration_count');
      return saved ? parseInt(saved, 10) : 520;
    } catch {
      return 520;
    }
  });

  const availableEmojis = [
    { emoji: '❤️', label: 'Yêu thương' },
    { emoji: '🥂', label: 'Nâng ly' },
    { emoji: '💍', label: 'Đính ước' },
    { emoji: '💐', label: 'Hoa cưới' },
    { emoji: '🎉', label: 'Chúc mừng' },
    { emoji: '✨', label: 'Tỏa sáng' },
  ];

  const handleSendReaction = (emoji: string) => {
    soundEffects.playHeartChime();
    
    // Add multiple floating emojis with staggered positions
    const newItems: FloatingReaction[] = Array.from({ length: 3 }).map((_, i) => ({
      id: `${Date.now()}_${Math.random()}_${i}`,
      emoji,
      x: 70 + (Math.random() * 25 - 12), // near bottom right
      duration: 2.2 + Math.random() * 0.8,
    }));

    setReactions((prev) => [...prev, ...newItems]);
    setCelebrationCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('wedding_celebration_count', next.toString());
      } catch {
        // ignore
      }
      return next;
    });

    if (emoji === '🎉' || emoji === '🥂') {
      fireWeddingConfetti();
    }
  };

  const handleTriggerGrandCelebration = () => {
    soundEffects.playFireworkSparkle();
    fireGrandSalute();
    fireWeddingConfetti();
    
    // Burst many emojis
    const burstEmojis = ['❤️', '💍', '🥂', '🎉', '✨', '💐'];
    const burstItems: FloatingReaction[] = Array.from({ length: 8 }).map((_, i) => ({
      id: `grand_${Date.now()}_${i}`,
      emoji: burstEmojis[i % burstEmojis.length],
      x: 20 + Math.random() * 60,
      duration: 2.5 + Math.random() * 1,
    }));
    setReactions((prev) => [...prev, ...burstItems]);

    setCelebrationCount((prev) => {
      const next = prev + 5;
      try {
        localStorage.setItem('wedding_celebration_count', next.toString());
      } catch {
        // ignore
      }
      return next;
    });

    if (onFireworkClick) onFireworkClick();
  };

  // Clean up floating reactions after animation ends
  useEffect(() => {
    if (reactions.length === 0) return;
    const timer = setTimeout(() => {
      setReactions((prev) => prev.slice(prev.length > 15 ? 5 : 0));
    }, 2800);
    return () => clearTimeout(timer);
  }, [reactions]);

  return (
    <>
      {/* Floating Reactions Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {reactions.map((item) => (
          <div
            key={item.id}
            className="absolute bottom-16 text-3xl select-none animate-float-up opacity-0"
            style={{
              left: `${item.x}%`,
              animationDuration: `${item.duration}s`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Floating Celebration Action Widget */}
      <div className="fixed bottom-20 right-3 z-40 flex flex-col items-end gap-2">
        {/* Quick Reaction Tray (Collapsible or open) */}
        {isOpenBar && (
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-[#E8DFC8] flex flex-col gap-1.5 animate-in slide-in-from-bottom-2 fade-in">
            <div className="text-[10px] text-center font-semibold text-stone-500 uppercase tracking-wider px-1">
              Thả Tim Chúc Phúc
            </div>
            <div className="grid grid-cols-3 gap-1">
              {availableEmojis.map((item) => (
                <button
                  key={item.emoji}
                  onClick={() => handleSendReaction(item.emoji)}
                  className="w-10 h-10 rounded-xl bg-[#FAF0E6] hover:bg-[#F4E3D0] active:scale-125 transition-all text-xl flex items-center justify-center cursor-pointer shadow-2xs"
                  title={item.label}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons Group */}
        <div className="flex items-center gap-1.5">
          {/* Grand Fireworks Button */}
          <button
            onClick={handleTriggerGrandCelebration}
            className="flex items-center gap-1 px-3 py-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white text-xs font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-200/50"
            title="Bắn Pháo Hoa & Confetti Chúc Mừng"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin-slow" />
            <span className="hidden sm:inline">Pháo Hoa</span>
            <span className="text-[11px] bg-black/20 px-1.5 py-0.5 rounded-full font-mono">
              {celebrationCount}
            </span>
          </button>

          {/* Quick Reaction Toggle Button */}
          <button
            onClick={() => setIsOpenBar(!isOpenBar)}
            className="w-10 h-10 rounded-full bg-[#9B2C2C] hover:bg-[#801F1F] text-white shadow-lg flex items-center justify-center active:scale-90 transition-all cursor-pointer border-2 border-[#FFDF73]/50"
            title="Gửi tương tác chúc phúc"
          >
            <Heart className={`w-5 h-5 fill-white transition-transform ${isOpenBar ? 'scale-110' : 'animate-pulse'}`} />
          </button>
        </div>
      </div>
    </>
  );
};
