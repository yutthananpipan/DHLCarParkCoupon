import { Printer } from 'lucide-react';
import { MockUser, Reason } from '../../types';

interface SuccessScreenProps {
  mockUser: MockUser;
  selectedReason: Reason | null;
  visitorName: string;
  onBackToHome: () => void;
}

export default function SuccessScreen({
  mockUser,
  selectedReason,
  visitorName,
  onBackToHome,
}: SuccessScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)] animate-in zoom-in duration-300">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#D40511]"></div>

        <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mb-8 mx-auto animate-bounce">
          <Printer size={56} className="text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3">กำลังพิมพ์คูปอง</h2>
        <p className="text-gray-500 mb-10 text-lg">
          ระบบได้รับข้อมูลเรียบร้อยแล้ว
          <br />
          กรุณารับคูปองที่เครื่องพิมพ์
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 w-full mb-8 border border-gray-100 text-left space-y-3">
          <div className="flex justify-between items-center text-sm md:text-base border-b border-gray-200 pb-2">
            <span className="text-gray-500">พนักงาน</span>
            <span className="font-bold text-gray-800">{mockUser.name}</span>
          </div>
          <div className="flex justify-between items-center text-sm md:text-base border-b border-gray-200 pb-2">
            <span className="text-gray-500">ประเภท</span>
            <span className="font-bold text-[#D40511] flex items-center gap-2">
              {selectedReason?.icon} {selectedReason?.label}
            </span>
          </div>
          {visitorName && (
            <div className="flex justify-between items-center text-sm md:text-base pt-1">
              <span className="text-gray-500">ผู้มาติดต่อ</span>
              <span className="font-bold text-gray-800">{visitorName}</span>
            </div>
          )}
        </div>

        <button
          onClick={onBackToHome}
          className="text-gray-500 font-semibold hover:text-[#D40511] transition-colors py-2 px-4 rounded-lg hover:bg-red-50"
        >
          กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
  );
}
