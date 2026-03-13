import { ArrowLeft, Printer } from 'lucide-react';
import { Reason, ScreenType } from '../../types';

interface QuantityScreenProps {
  readonly quantity: number;
  readonly onQuantityChange: (qty: number) => void;
  readonly selectedReason: Reason | null;
  readonly onConfirm: () => void;
  readonly onNavigate: (screen: ScreenType) => void;
  readonly stepLabel: string;
}

const QUANTITY_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function QuantityScreen({
  quantity,
  onQuantityChange,
  selectedReason,
  onConfirm,
  onNavigate,
  stepLabel,
}: QuantityScreenProps) {
  const backScreen: ScreenType = selectedReason?.id === 'outing' ? 'reasons' : 'detail-input';

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 flex flex-col justify-center min-h-[60vh] animate-in slide-in-from-right-12 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate(backScreen)}
            className="p-3 bg-white shadow-md text-gray-400 hover:text-[#D40511] rounded-2xl transition-all hover:scale-105 active:scale-95 border border-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-xl font-black text-gray-900 uppercase italic tracking-tighter">
              Quantity of Coupons
            </h2>
            <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest mt-0.5">
              กรุณาระบุจำนวนบัตรยกเว้นค่าจอดรถ
            </p>
          </div>
        </div>
        <div className="bg-[#FFCC00] px-5 py-2 rounded-full border-2 border-[#D40511] shadow-sm font-black text-gray-900 uppercase italic tracking-widest text-[10px]">
          {stepLabel}
        </div>
      </div>

      <div className="bg-[#FFCC00] p-8 md:p-10 rounded-[40px] shadow-xl border-4 border-white relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          <p className="text-center font-black text-gray-900 text-sm uppercase italic tracking-widest">
            Select Quantity / เลือกจำนวน
          </p>

          {/* Visual Grid Buttons */}
          <div className="grid grid-cols-5 gap-3">
            {QUANTITY_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => onQuantityChange(n)}
                className={`aspect-square rounded-2xl font-black text-2xl md:text-3xl transition-all duration-200 ${
                  quantity === n
                    ? 'bg-[#D40511] text-white shadow-lg scale-110 ring-4 ring-[#D40511]/30'
                    : 'bg-white text-gray-700 hover:bg-white/80 shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Selected Summary */}
          <div className="bg-white/50 rounded-2xl p-4 flex items-center justify-between">
            <span className="font-bold text-gray-700 text-sm uppercase tracking-wide">
              Selected
            </span>
            <span className="font-black text-[#D40511] text-3xl italic">
              {quantity}{' '}
              <span className="text-base text-gray-500 not-italic">
                coupon{quantity > 1 ? 's' : ''}
              </span>
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onNavigate(backScreen)}
              className="flex-1 px-6 py-4 bg-white/60 hover:bg-white text-gray-800 font-black uppercase italic rounded-2xl transition-all hover:scale-105 active:scale-95 tracking-tight flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-4 bg-[#D40511] hover:bg-black text-white font-black uppercase italic rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg tracking-tight flex items-center justify-center gap-2"
            >
              Confirm & Print
              <Printer size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
