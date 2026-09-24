import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode, Heart } from 'lucide-react';
import { BankAccountInfo } from '../types';

interface GiftBoxSectionProps {
  groomBank: BankAccountInfo;
  brideBank: BankAccountInfo;
}

export const GiftBoxSection: React.FC<GiftBoxSectionProps> = ({
  groomBank,
  brideBank,
}) => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copied, setCopied] = useState<string | null>(null);

  const copyAccount = (acc: string, id: string) => {
    navigator.clipboard.writeText(acc);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentBank = activeTab === 'groom' ? groomBank : brideBank;

  return (
    <section id="mung-cuoi" className="py-12 px-4 bg-[#FAF7F2] border-t border-[#E8DFC8]/60">
      <div className="max-w-md mx-auto text-center">
        
        {/* Header */}
        <div className="w-10 h-10 rounded-full bg-[#FAF0E6] text-[#9B2C2C] flex items-center justify-center mx-auto mb-2 shadow-2xs">
          <Gift className="w-5 h-5" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D46] font-semibold block mb-1">
          HỘP MỪNG CƯỚI
        </span>
        <h2 className="font-serif-elegant text-2xl sm:text-3xl font-bold text-[#2D2825]">
          Gửi Quà Chúc Phúc
        </h2>
        <p className="text-xs text-stone-500 font-light mt-1 mb-5">
          Sự hiện diện và lời chúc phúc của quý khách là món quà quý giá nhất dành cho chúng mình.
        </p>

        {/* Tab switcher */}
        <div className="flex rounded-full bg-white p-1 border border-[#E8DFC8] mb-5 shadow-2xs">
          <button
            onClick={() => setActiveTab('groom')}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'groom'
                ? 'bg-[#9B2C2C] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Mừng Chú Rể ({groomBank.owner})
          </button>
          <button
            onClick={() => setActiveTab('bride')}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'bride'
                ? 'bg-[#9B2C2C] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Mừng Cô Dâu ({brideBank.owner})
          </button>
        </div>

        {/* Bank Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DFC8] shadow-sm flex flex-col items-center">
          {/* QR Code Container */}
          <div className="w-44 h-44 bg-[#FAF7F2] p-2.5 rounded-2xl border border-[#E8DFC8] mb-4 shadow-2xs flex items-center justify-center">
            {currentBank.qrUrl ? (
              <img
                src={currentBank.qrUrl}
                alt={`Mã QR mừng cưới ${currentBank.owner}`}
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            ) : (
              <QrCode className="w-12 h-12 text-stone-400" />
            )}
          </div>

          {/* Details */}
          <div className="w-full bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8DFC8]/60 text-xs text-stone-700 space-y-1 mb-4 text-left">
            <div className="flex justify-between items-center">
              <span className="text-stone-400 text-[10px] uppercase">Ngân hàng</span>
              <strong className="font-semibold">{currentBank.bankName}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-400 text-[10px] uppercase">Chủ tài khoản</span>
              <strong className="font-semibold text-stone-900">{currentBank.owner}</strong>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-stone-200/50">
              <span className="text-stone-400 text-[10px] uppercase">Số tài khoản</span>
              <span className="font-mono text-sm font-bold text-[#9B2C2C]">
                {currentBank.accountNumber}
              </span>
            </div>
          </div>

          {/* Copy button */}
          <button
            onClick={() => copyAccount(currentBank.accountNumber, activeTab)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#FAF0E6] hover:bg-[#F4E3D0] text-[#9B2C2C] text-xs font-semibold border border-[#E8DFC8] active:scale-95 transition-all cursor-pointer"
          >
            {copied === activeTab ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Đã chép số tài khoản!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép số tài khoản</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
