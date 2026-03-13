import { useState, useEffect } from 'react';
import { FileCheck, Wifi, Printer } from 'lucide-react';

const STEPS = [
  { icon: <FileCheck size={28} />, label: 'Verifying Data', labelTh: 'กำลังตรวจสอบข้อมูล' },
  {
    icon: <Wifi size={28} />,
    label: 'Connecting to Printer',
    labelTh: 'กำลังเชื่อมต่อเครื่องพิมพ์',
  },
  { icon: <Printer size={28} />, label: 'Printing Coupon', labelTh: 'กำลังพิมพ์คูปอง' },
];

export default function LoadingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const step = STEPS[currentStep];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-10 md:p-12 rounded-[32px] shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full border-b-4 border-[#D40511] animate-in zoom-in duration-300">
        {/* Spinner with icon */}
        <div className="relative w-24 h-24">
          <div className="w-24 h-24 border-4 border-gray-100 rounded-full"></div>
          <div className="w-24 h-24 border-4 border-[#D40511] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[#D40511] transition-all duration-300">
            {step.icon}
          </div>
        </div>

        {/* Step info */}
        <div className="text-center space-y-1">
          <h3 className="text-lg font-black text-gray-900 uppercase italic tracking-tight">
            {step.label}
          </h3>
          <p className="text-sm text-gray-500 font-bold">{step.labelTh}</p>
        </div>

        {/* Step progress dots */}
        <div className="flex gap-2 items-center">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                i === currentStep
                  ? 'w-8 h-2 bg-[#D40511]'
                  : i < currentStep
                    ? 'w-2 h-2 bg-[#FFCC00]'
                    : 'w-2 h-2 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Subtle footer */}
        <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">
          Please do not close this window
        </p>
      </div>
    </div>
  );
}
