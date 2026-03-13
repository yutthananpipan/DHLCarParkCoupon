import { ArrowLeft, CheckCircle } from 'lucide-react';
import { ScreenType } from '../../types';

interface GmncScreenProps {
  readonly onConfirm: () => void;
  readonly onNavigate: (screen: ScreenType) => void;
}

export default function GmncScreen({ onConfirm, onNavigate }: GmncScreenProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 flex flex-col justify-center min-h-[60vh] animate-in slide-in-from-right-12 duration-500">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => onNavigate('reasons')}
          className="p-3 bg-white shadow-md text-gray-400 hover:text-[#D40511] rounded-2xl transition-all hover:scale-105 active:scale-95 border border-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-xl font-black text-gray-900 uppercase italic tracking-tighter">
            GMNC Team
          </h2>
          <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest mt-0.5">
            Commercial GMNC
          </p>
        </div>
      </div>

      <div className="bg-[#FFCC00] p-8 md:p-10 rounded-[40px] shadow-xl border-4 border-white space-y-6">
        <div className="bg-white/60 rounded-3xl p-6 space-y-4 text-center">
          <p className="font-black text-gray-900 text-lg leading-snug">
            ยินดีต้อนรับทีม Commercial GMNC
          </p>
          <p className="font-bold text-gray-700 text-sm leading-relaxed">
            Coupon จะถูกปริ้นเพียงครั้งละ 1 ใบ สำหรับการใช้งานวันต่อวัน
            <br />
            หากต้องการนำรถเข้าจอดค้างคืน กรุณาติดต่อ Admin
          </p>

          <div className="border-t border-gray-300 pt-4">
            <p className="font-black text-gray-900 text-sm leading-snug">
              Welcome Commercial GMNC Team.
            </p>
            <p className="font-bold text-gray-600 text-xs leading-relaxed mt-1">
              The coupon will be printed only 1 piece at a time for day by day usage.
              <br />
              In case you want to park your car overnight, please contact Admin.
            </p>
          </div>
        </div>

        <p className="text-center font-black text-gray-900 text-sm uppercase italic tracking-tight">
          กรุณา Confirm ว่าท่านคือสมาชิกทีม Commercial GMNC
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('reasons')}
            className="flex-1 px-6 py-4 bg-white/60 hover:bg-white text-gray-800 font-black uppercase italic rounded-2xl transition-all hover:scale-105 active:scale-95 tracking-tight flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-4 bg-[#D40511] hover:bg-black text-white font-black uppercase italic rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg tracking-tight flex items-center justify-center gap-2"
          >
            Confirm
            <CheckCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
