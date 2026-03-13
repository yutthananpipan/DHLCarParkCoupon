import { ArrowLeft } from 'lucide-react';
import { Reason, ScreenType } from '../../types';

interface ReasonScreenProps {
  readonly reasons: Reason[];
  readonly onSelectReason: (reason: Reason) => void;
  readonly onNavigate: (screen: ScreenType) => void;
}

export default function ReasonScreen({ reasons, onSelectReason, onNavigate }: ReasonScreenProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('welcome')}
            className="p-3 bg-white shadow-md text-gray-400 hover:text-[#D40511] rounded-2xl transition-all hover:scale-105 active:scale-95 border border-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">
              Select Reason
            </h2>
            <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest mt-0.5">
              โปรดเลือกเหตุผลในการขอรับคูปอง
            </p>
          </div>
        </div>

        <div className="bg-[#FFCC00] px-5 py-2 rounded-full border-2 border-[#D40511] shadow-sm font-black text-gray-900 uppercase italic tracking-widest text-[10px]">
          Step 01
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {reasons.map((reason, index) => (
          <button
            key={reason.id}
            onClick={() => onSelectReason(reason)}
            className="group relative bg-white p-6 md:p-8 rounded-[32px] shadow-sm border-4 border-[#FFCC00] hover:bg-[#FFCC00] hover:border-[#D40511] hover:shadow-xl transition-all flex flex-col items-center justify-center gap-4 active:scale-95"
          >
            {/* Number Badge */}
            <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#D40511] text-[#FFCC00] flex items-center justify-center font-black text-xs shadow-sm group-hover:bg-gray-900 transition-colors">
              {index + 1}
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#FFCC00]/10 text-gray-500 flex items-center justify-center group-hover:bg-[#D40511] group-hover:text-white transition-all transform group-hover:rotate-6 duration-300 shadow-sm border border-[#FFCC00]/20">
              {reason.icon}
            </div>
            <div className="text-center space-y-1">
              <p className="font-black text-gray-800 text-lg uppercase italic group-hover:text-gray-900 transition-colors tracking-tight">
                {reason.label}
              </p>
              <p className="text-[10px] font-bold text-gray-400 group-hover:text-gray-700 uppercase tracking-tight">
                {reason.desc}
              </p>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#D40511] rounded-full group-hover:w-12 transition-all duration-300"></div>
          </button>
        ))}
      </div>
    </div>
  );
}
