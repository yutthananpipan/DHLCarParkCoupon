import { Printer } from 'lucide-react';
import { MockUser, Reason } from '../../types';

interface SuccessScreenProps {
  readonly mockUser: MockUser;
  readonly selectedReason: Reason | null;
  readonly visitorName: string;
  readonly onBackToHome: () => void;
}

export default function SuccessScreen({
  mockUser,
  selectedReason,
  visitorName,
  onBackToHome,
}: SuccessScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-100px)] animate-in zoom-in duration-500">
      <div className="bg-white p-10 md:p-16 rounded-[48px] shadow-2xl max-w-xl w-full text-center border-b-[10px] border-[#FFCC00] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 bg-[#D40511]"></div>

        <div className="w-24 h-24 bg-[#FFCC00] rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg rotate-3 animate-pulse">
          <Printer size={48} className="text-[#D40511]" />
        </div>

        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase italic tracking-tighter">
          SUCCESS!
        </h2>
        <p className="text-gray-400 mb-8 text-base font-bold leading-relaxed">
          ระบบได้รับข้อมูลเรียบร้อยแล้ว
          <br />
          <span className="text-[#D40511]">โปรดรับคูปองที่เครื่องพิมพ์ WIFI</span>
        </p>

        <div className="bg-gray-50 rounded-3xl p-6 w-full mb-8 border-2 border-dashed border-gray-100 text-left space-y-4 shadow-inner">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
              Employee
            </span>
            <span className="font-black text-gray-800 text-sm uppercase">{mockUser.nameEn}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
              Category
            </span>
            <span className="font-black text-[#D40511] text-sm uppercase italic">
              {selectedReason?.label}
            </span>
          </div>
          {visitorName && (
            <div className="flex justify-between items-center pt-1">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Visitor
              </span>
              <span className="font-black text-gray-800 text-sm uppercase tracking-tight">
                {visitorName}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onBackToHome}
          className="bg-gray-900 text-[#FFCC00] font-black py-4 px-10 rounded-2xl hover:bg-[#D40511] transition-all uppercase italic tracking-[0.2em] text-[10px] shadow-md"
        >
          Back to Dashboard
        </button>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">
            All System Corporation Co.,Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}
