import { ArrowLeft, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { DetailInputConfig, ScreenType } from '../../types';

interface DetailInputScreenProps {
  readonly config: DetailInputConfig;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onNext: () => void;
  readonly onNavigate: (screen: ScreenType) => void;
  readonly stepLabel: string;
}

interface CustomSelectProps {
  readonly options: string[];
  readonly value: string;
  readonly onChange: (value: string) => void;
}

function CustomSelect({ options, value, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-6 py-4 pr-14 bg-white rounded-2xl shadow-lg text-xl font-black text-left transition-all border-2 relative ${
          isOpen ? 'border-[#D40511] shadow-xl' : 'border-transparent hover:border-gray-200'
        }`}
      >
        {value || options[0]}
        <div
          className={`absolute right-5 top-1/2 transition-transform duration-200 ${
            isOpen ? 'text-[#D40511]' : 'text-gray-400'
          }`}
          style={{ transform: `translateY(-50%) rotate(${isOpen ? 180 : 0}deg)` }}
        >
          <ChevronDown size={24} />
        </div>
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <>
          {/* Mobile backdrop for better UX */}
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)} />

          <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200 max-h-[60vh] overflow-y-auto">
            {options.map((opt, index) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full px-6 py-5 md:py-4 text-left font-black text-lg flex items-center justify-between transition-all active:scale-[0.98] ${
                  opt === value
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                } ${index < options.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 ${
                      opt === value ? 'bg-[#D40511] text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </span>
                  {opt}
                </span>
                {opt === value && <Check size={20} className="text-[#FFCC00] shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
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

  // BUG-04 fix: trim whitespace for validation
  const isValid = value.trim().length > 0;

  const handleNext = () => {
    setTouched(true);
    if (!isValid) return;
    // Store trimmed value
    onChange(value.trim());
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

      <div className="bg-[#FFCC00] p-8 md:p-10 rounded-[40px] shadow-xl border-4 border-white relative overflow-visible">
        <div className="space-y-6 relative z-10">
          {config.type === 'text' ? (
            <input
              type="text"
              inputMode="text"
              autoCapitalize="words"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              className={`w-full px-6 py-4 bg-white border-2 ${
                touched && !isValid
                  ? 'border-[#D40511]'
                  : 'border-transparent focus:border-gray-300'
              } rounded-2xl outline-none focus:outline-none focus:ring-0 transition-all text-xl font-black shadow-lg placeholder:text-gray-300`}
              placeholder={config.placeholder ?? ''}
              autoFocus
            />
          ) : (
            <CustomSelect options={config.options ?? []} value={value} onChange={onChange} />
          )}

          {touched && !isValid && (
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
            {/* BUG-05 fix: always red, darker on hover (not black) */}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-4 bg-[#D40511] hover:bg-[#b0040e] text-white font-black uppercase italic rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg tracking-tight flex items-center justify-center gap-2"
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
