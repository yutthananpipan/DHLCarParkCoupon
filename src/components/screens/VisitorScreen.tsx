import { ArrowLeft, CheckCircle } from 'lucide-react';
import { ScreenType } from '../../types';

interface VisitorScreenProps {
  visitorName: string;
  setVisitorName: (name: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onNavigate: (screen: ScreenType) => void;
}

export default function VisitorScreen({
  visitorName,
  setVisitorName,
  onSubmit,
  onNavigate,
}: VisitorScreenProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 flex flex-col justify-center min-h-[60vh] animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => onNavigate('reasons')}
          className="p-2 -ml-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={28} />
        </button>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">ข้อมูลผู้มาติดต่อ</h2>
          <p className="text-gray-500">Visitor / Vendor Details</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-gray-100">
        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label className="block text-base md:text-lg font-bold text-gray-700 mb-3">
              ชื่อร้านค้า / ผู้มาติดต่อ (Name of Vendor)
            </label>
            <input
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#D40511] focus:ring-4 focus:ring-red-50 outline-none transition-all text-lg"
              placeholder="ระบุชื่อผู้มาติดต่อ..."
              autoFocus
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!visitorName}
              className="w-full bg-[#D40511] hover:bg-[#b0040e] disabled:bg-gray-200 disabled:text-gray-400 text-white text-lg md:text-xl font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            >
              ยืนยันการขอคูปอง
              <CheckCircle size={24} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
