import { User as UserIcon, Car, AlertCircle, Info } from 'lucide-react';
import { MockUser, ScreenType } from '../../types';

interface WelcomeScreenProps {
  readonly mockUser: MockUser;
  readonly onNavigate: (screen: ScreenType) => void;
}

export default function WelcomeScreen({ mockUser, onNavigate }: WelcomeScreenProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-50 relative overflow-hidden h-full text-center lg:text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFCC00] rounded-bl-[60px] -mr-6 -mt-6 opacity-10"></div>

            <div className="relative z-10">
              <div className="bg-[#D40511] p-4 rounded-2xl mb-6 shadow-md inline-block">
                <UserIcon size={32} className="text-[#FFCC00]" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Authenticated User
              </p>
              <h2 className="text-2xl font-black text-gray-900 leading-tight mb-1">
                {mockUser.name}
              </h2>
              <p className="text-gray-500 font-bold text-base mb-6">{mockUser.nameEn}</p>

              <div className="w-full space-y-2">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    ID NO.
                  </span>
                  <span className="text-lg font-black text-gray-900">{mockUser.id}</span>
                </div>

                <div className="bg-blue-50/50 rounded-xl p-4 border-l-4 border-[#D40511] flex items-start gap-3 text-left">
                  <Info size={18} className="text-[#D40511] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      Supervisor
                    </p>
                    <p className="font-black text-gray-800 text-xs leading-tight">
                      {mockUser.supervisor}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Action Panel */}
        <div className="lg:col-span-2">
          <div className="bg-[#FFCC00] rounded-3xl p-8 md:p-12 shadow-lg h-full flex flex-col justify-center items-center text-center relative overflow-hidden border-2 border-white">
            <div className="relative z-10 max-w-md w-full space-y-8">
              <div className="space-y-2">
                <div className="w-16 h-2 bg-[#D40511] mx-auto rounded-full mb-4"></div>
                <h3 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
                  Ready?
                </h3>
                <p className="text-gray-800 font-bold text-base">
                  คลิกปุ่มด้านล่างเพื่อเริ่มขอคูปอง
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => onNavigate('reasons')}
                  className="w-full group bg-[#D40511] hover:bg-black text-[#FFCC00] p-1 rounded-2xl shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center gap-4 py-5 px-6 rounded-xl border border-transparent group-hover:border-[#FFCC00]/20">
                    <Car size={32} />
                    <span className="text-2xl font-black uppercase italic tracking-widest">
                      GET COUPON
                    </span>
                  </div>
                </button>
                <button className="flex items-center gap-2 mx-auto text-gray-900 font-black uppercase tracking-widest text-[9px] opacity-60 hover:opacity-100 transition-opacity">
                  <AlertCircle size={14} />
                  แจ้งแก้ไขข้อมูล
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
