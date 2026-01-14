import { ArrowLeft } from 'lucide-react';
import { Reason, ScreenType } from '../../types';

interface ReasonScreenProps {
  reasons: Reason[];
  onSelectReason: (reason: Reason) => void;
  onNavigate: (screen: ScreenType) => void;
}

export default function ReasonScreen({ reasons, onSelectReason, onNavigate }: ReasonScreenProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-300">
      <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('welcome')}
            className="p-2 -ml-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={28} />
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">ระบุเหตุผล</h2>
            <p className="text-gray-500">Select reason for request</p>
          </div>
        </div>

        {/* Step Indicator (Optional visual aid) */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <span className="text-[#D40511]">1. เลือกเหตุผล</span>
          <div className="w-8 h-[1px] bg-gray-300"></div>
          <span>2. ยืนยัน</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {reasons.map((reason) => (
          <button
            key={reason.id}
            onClick={() => onSelectReason(reason)}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-[#D40511] hover:shadow-xl transition-all group flex flex-col items-center justify-center gap-4 aspect-square md:aspect-[4/3]"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-50 text-[#D40511] flex items-center justify-center group-hover:bg-[#D40511] group-hover:text-white transition-all transform group-hover:scale-110 duration-300">
              {reason.icon}
            </div>
            <div className="text-center space-y-1">
              <p className="font-bold text-gray-800 text-lg md:text-xl group-hover:text-[#D40511]">
                {reason.label}
              </p>
              <p className="text-sm text-gray-500">{reason.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
