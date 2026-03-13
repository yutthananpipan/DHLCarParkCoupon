import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { MockUser, Reason } from '../../types';

interface SuccessScreenProps {
  readonly mockUser: MockUser;
  readonly selectedReason: Reason | null;
  readonly detailValue: string;
  readonly quantity: number;
  readonly onBackToHome: () => void;
}

function getDetailLabel(reasonId: string | undefined): string | null {
  switch (reasonId) {
    case 'visitors':
      return 'Vendor';
    case 'training':
      return 'Training Subject';
    case 'meeting':
      return 'Meeting Subject';
    case 'other':
      return 'Reason';
    default:
      return null;
  }
}

const AUTO_REDIRECT_SECONDS = 15;

export default function SuccessScreen({
  mockUser,
  selectedReason,
  detailValue,
  quantity,
  onBackToHome,
}: SuccessScreenProps) {
  const [countdown, setCountdown] = useState(AUTO_REDIRECT_SECONDS);

  const stableBackToHome = useCallback(onBackToHome, [onBackToHome]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          stableBackToHome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [stableBackToHome]);

  const detailLabel = getDetailLabel(selectedReason?.id);
  const now = new Date();
  const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-100px)] animate-in zoom-in duration-500">
      <div className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl max-w-xl w-full text-center border-b-[10px] border-[#FFCC00] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 bg-[#D40511]"></div>

        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 mx-auto ring-4 ring-green-100">
          <CheckCircle size={44} className="text-green-600" />
        </div>

        <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">
          Success!
        </h2>
        <p className="text-gray-400 mb-6 text-sm font-bold">
          ระบบได้รับข้อมูลเรียบร้อยแล้ว —{' '}
          <span className="text-[#D40511]">โปรดรับคูปองที่เครื่องพิมพ์</span>
        </p>

        {/* Receipt-style card */}
        <div className="bg-gray-50 rounded-3xl w-full mb-6 overflow-hidden border border-gray-100">
          {/* Receipt header */}
          <div className="bg-gray-900 text-white p-4">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FFCC00]">
              Coupon Receipt
            </p>
          </div>

          {/* Receipt body */}
          <div className="p-5 space-y-3 text-left">
            <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Employee
              </span>
              <span className="font-black text-gray-800 text-sm">{mockUser.nameEn}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                ID
              </span>
              <span className="font-black text-gray-800 text-sm tracking-wider">{mockUser.id}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Category
              </span>
              <span className="font-black text-[#D40511] text-sm uppercase italic">
                {selectedReason?.label}
              </span>
            </div>

            {detailLabel && detailValue && (
              <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  {detailLabel}
                </span>
                <span className="font-black text-gray-800 text-sm">{detailValue}</span>
              </div>
            )}

            <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Quantity
              </span>
              <span className="font-black text-gray-900 text-xl">
                {quantity} <span className="text-xs text-gray-400 font-bold">pcs</span>
              </span>
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Date / Time
              </span>
              <span className="font-bold text-gray-500 text-xs">
                {dateStr} — {timeStr}
              </span>
            </div>
          </div>
        </div>

        {/* Auto-redirect countdown */}
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
          <Clock size={14} />
          <p className="text-xs font-bold">
            กลับหน้าหลักอัตโนมัติใน <span className="text-[#D40511] font-black">{countdown}</span>{' '}
            วินาที
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-1 mb-6 overflow-hidden">
          <div
            className="h-full bg-[#D40511] rounded-full transition-all duration-1000 ease-linear"
            style={{
              width: `${((AUTO_REDIRECT_SECONDS - countdown) / AUTO_REDIRECT_SECONDS) * 100}%`,
            }}
          />
        </div>

        <button
          onClick={onBackToHome}
          className="bg-gray-900 text-[#FFCC00] font-black py-4 px-10 rounded-2xl hover:bg-[#D40511] transition-all uppercase italic tracking-[0.2em] text-[10px] shadow-md w-full"
        >
          Back to Dashboard
        </button>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em]">
            All System Corporation Co.,Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}
