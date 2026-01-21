import { User as UserIcon, Car, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { MockUser, ScreenType } from '../../types';
import ContactModal from '../ContactModal';

interface WelcomeScreenProps {
  readonly mockUser: MockUser;
  readonly onNavigate: (screen: ScreenType) => void;
}

export default function WelcomeScreen({ mockUser, onNavigate }: WelcomeScreenProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg border border-gray-50 relative overflow-hidden h-full flex flex-col justify-between text-center lg:text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] rounded-bl-[80px] -mr-8 -mt-8 opacity-10"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-[#D40511] p-5 rounded-2xl mb-6 shadow-md inline-block">
                  <UserIcon size={40} className="text-[#FFCC00]" />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Welcome
                </p>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-2">
                  {mockUser.name}
                </h2>
                <p className="text-gray-500 font-bold text-lg mb-8">{mockUser.nameEn}</p>
              </div>

              <div className="w-full space-y-3">
                <div className="flex justify-between items-center bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    ID NO.
                  </span>
                  <span className="text-xl font-black text-gray-900">{mockUser.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Action Panel */}
        <div className="lg:col-span-3">
          <div className="bg-[#FFCC00] rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg h-full flex flex-col justify-center items-center text-center relative overflow-hidden border-2 border-white">
            <div className="relative z-10 max-w-xl w-full space-y-10">
              <div className="space-y-4">
                <div className="w-20 h-2 bg-[#D40511] mx-auto rounded-full mb-6"></div>
                <h3 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-tight">
                  Ready?
                </h3>
                <p className="text-gray-800 font-bold text-lg lg:text-xl">
                  คลิกปุ่มด้านล่างเพื่อเริ่มขอคูปอง
                </p>
              </div>

              <div className="space-y-5">
                <button
                  onClick={() => onNavigate('reasons')}
                  className="w-full group bg-[#D40511] hover:bg-black text-[#FFCC00] p-1 rounded-2xl shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-center gap-3 md:gap-5 py-4 px-6 md:py-6 md:px-8 rounded-xl border border-transparent group-hover:border-[#FFCC00]/20">
                    <Car size={28} className="md:w-10 md:h-10" />
                    <span className="text-lg md:text-2xl lg:text-3xl font-black uppercase italic tracking-widest">
                      GET COUPON
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="flex items-center gap-2 mx-auto text-gray-900 font-black uppercase tracking-widest text-[10px] opacity-60 hover:opacity-100 transition-opacity"
                >
                  <AlertCircle size={14} />
                  แจ้งแก้ไขข้อมูล
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        employeeName={mockUser.name}
        employeeId={mockUser.id}
      />
    </div>
  );
}
