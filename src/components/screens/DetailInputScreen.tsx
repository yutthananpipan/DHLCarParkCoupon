import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { DetailInputConfig, ScreenType } from '../../types';

interface DetailInputScreenProps {
  readonly config: DetailInputConfig;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onNext: () => void;
  readonly onNavigate: (screen: ScreenType) => void;
  readonly stepLabel: string;
}

export default function DetailInputScreen({
  config,
  value,
  onChange,
  onNext,
  onNavigate,
  stepLabel,
}: DetailInputScreenProps) {
  const [touched, setTouched] = useState(false);

  const handleNext = () => {
    setTouched(true);
    if (!value) return;
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 flex flex-col justify-center min-h-[60vh] animate-in slide-in-from-right-12 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('reasons')}
            className="p-3 bg-white shadow-md text-gray-400 hover:text-[#D40511] rounded-2xl transition-all hover:scale-105 active:scale-95 border border-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-xl font-black text-gray-900 uppercase italic tracking-tighter">
              {config.titleEn}
            </h2>
            <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest mt-0.5">
              {config.titleTh}
            </p>
          </div>
        </div>
        <div className="bg-[#FFCC00] px-5 py-2 rounded-full border-2 border-[#D40511] shadow-sm font-black text-gray-900 uppercase italic tracking-widest text-[10px]">
          {stepLabel}
        </div>
      </div>

      <div className="bg-[#FFCC00] p-8 md:p-10 rounded-[40px] shadow-xl border-4 border-white relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          {config.type === 'text' ? (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              className={`w-full px-6 py-4 bg-white border-2 ${
                touched && !value ? 'border-[#D40511]' : 'border-transparent focus:border-[#D40511]'
              } rounded-2xl outline-none focus:outline-none focus:ring-0 transition-all text-xl font-black shadow-lg placeholder:text-gray-300`}
              placeholder={config.placeholder ?? ''}
              autoFocus
            />
          ) : (
            <div className="relative">
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-6 py-4 pr-14 bg-white border-2 border-transparent focus:border-[#D40511] rounded-2xl outline-none focus:outline-none focus:ring-0 transition-all text-xl font-black shadow-lg appearance-none cursor-pointer"
                autoFocus
              >
                {config.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown size={24} />
              </div>
            </div>
          )}

          {touched && !value && (
            <p className="text-[#D40511] font-bold text-sm">กรุณากรอกข้อมูลก่อนดำเนินการต่อ</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onNavigate('reasons')}
              className="flex-1 px-6 py-4 bg-white/60 hover:bg-white text-gray-800 font-black uppercase italic rounded-2xl transition-all hover:scale-105 active:scale-95 tracking-tight flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-4 bg-[#D40511] hover:bg-black text-white font-black uppercase italic rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg tracking-tight flex items-center justify-center gap-2"
            >
              Next
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
