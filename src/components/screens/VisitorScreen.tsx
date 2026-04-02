import { ArrowLeft, Printer } from 'lucide-react';
import { ScreenType } from '../../types';

interface VisitorScreenProps {
  readonly visitorName: string;
  readonly setVisitorName: (name: string) => void;
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  readonly onNavigate: (screen: ScreenType) => void;
}

export default function VisitorScreen({
  visitorName,
  setVisitorName,
  onSubmit,
  onNavigate,
}: VisitorScreenProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 flex flex-col justify-center min-h-[60vh] animate-in slide-in-from-right-12 duration-500">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => onNavigate('reasons')}
          className="p-3 bg-white shadow-md text-gray-400 hover:text-[#D40511] rounded-2xl transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">
            Visitor Info
          </h2>
          <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest">
            ขั้นตอนที่ 2: ระบุชื่อผู้มาติดต่อ
          </p>
        </div>
      </div>

      <div className="bg-[#FFCC00] p-8 md:p-12 rounded-[40px] shadow-xl border-4 border-white relative overflow-hidden">
        <form onSubmit={onSubmit} className="space-y-8 relative z-10">
          <div className="space-y-3">
            <label
              htmlFor="visitorName"
              className="block text-base font-black text-gray-900 uppercase italic tracking-tight ml-1"
            >
              Name of Vendor / ผู้มาติดต่อ
            </label>
            <input
              id="visitorName"
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              className="w-full px-6 py-4 bg-white border-2 border-transparent focus:border-[#D40511] rounded-2xl outline-none transition-all text-xl font-black shadow-lg placeholder:text-gray-100"
              placeholder="บริษัท / ชื่อผู้ติดต่อ..."
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!visitorName}
            className="w-full bg-[#D40511] hover:bg-black disabled:bg-red-300 text-[#FFCC00] text-xl font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-4 uppercase italic tracking-widest"
          >
            Confirm
            <Printer size={28} />
          </button>
        </form>
      </div>
    </div>
  );
}
