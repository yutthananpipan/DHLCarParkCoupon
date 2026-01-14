import { User, CheckCircle, Car } from 'lucide-react';
import { MockUser, ScreenType } from '../../types';

interface WelcomeScreenProps {
  mockUser: MockUser;
  onNavigate: (screen: ScreenType) => void;
}

export default function WelcomeScreen({ mockUser, onNavigate }: WelcomeScreenProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column: User Profile */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] rounded-bl-full opacity-10 -mr-8 -mt-8"></div>

            <div className="flex flex-col items-center text-center lg:items-start lg:text-left mb-6">
              <div className="bg-gray-100 p-4 rounded-full mb-4 lg:mb-6 inline-block">
                <User size={48} className="text-gray-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#D40511] leading-tight mb-1">
                {mockUser.name}
              </h2>
              <p className="text-gray-600 font-medium text-lg">{mockUser.nameEn}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Employee ID</span>
                <span className="text-xl font-mono font-bold text-gray-800">{mockUser.id}</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-600 shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-blue-900 font-bold mb-1">Approver</p>
                  <p className="text-sm text-blue-800 leading-snug">
                    {mockUser.supervisor}
                    <br />
                    <span className="text-xs opacity-75">({mockUser.supervisorEn})</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 h-full flex flex-col justify-center items-center text-center space-y-8">
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">ต้องการทำรายการใดครับ?</h3>
              <p className="text-gray-500">เลือกเมนูที่ต้องการด้านล่าง</p>
            </div>

            <div className="w-full max-w-md space-y-4">
              <button
                onClick={() => onNavigate('reasons')}
                className="w-full group bg-[#D40511] hover:bg-[#b0040e] text-white p-1 rounded-2xl shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-center gap-4 py-5 px-6 rounded-xl border-2 border-transparent group-hover:border-white/20">
                  <Car size={32} />
                  <span className="text-xl font-bold">ขอคูปองจอดรถ</span>
                </div>
              </button>

              <button className="w-full bg-white border-2 border-gray-200 text-gray-600 hover:text-[#D40511] hover:border-[#D40511] font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                แจ้งแก้ไขข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
