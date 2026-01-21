import { User as UserIcon, ChevronRight } from 'lucide-react';
import { DHLLogo } from '../DHLLogo';

interface LoginScreenProps {
  readonly employeeId: string;
  readonly setEmployeeId: (id: string) => void;
  readonly onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginScreen({ employeeId, setEmployeeId, onLogin }: LoginScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-[#FFCC00] min-h-screen">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden min-h-[500px]">
        {/* Left Visual Area */}
        <div className="hidden md:flex bg-[#D40511] text-white flex-col justify-center p-12 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #000, #000 10px, transparent 10px, transparent 20px)',
            }}
          ></div>
          <div className="relative z-10">
            <div className="bg-[#FFCC00] p-4 mb-8 shadow-xl transform -skew-x-12 inline-block">
              <DHLLogo className="h-8 lg:h-10" />
            </div>
            <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tighter leading-none">
              Smart
              <br />
              Parking
            </h2>
            <p className="text-lg text-white/80 font-bold leading-relaxed max-w-xs">
              ระบบขออนุมัติคูปองจอดรถ
              <br />
              เวอร์ชัน 4.0 ทันสมัยและรวดเร็ว
            </p>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FFCC00] rounded-full opacity-10 blur-2xl"></div>
        </div>

        {/* Login Form Area */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="md:hidden mb-10 flex justify-center">
            <DHLLogo className="h-8" />
          </div>

          <div className="w-full max-w-sm mx-auto space-y-8">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">
                Sign In
              </h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">
                Employee Authentication
              </p>
            </div>

            <form onSubmit={onLogin} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="employeeId"
                  className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
                >
                  Employee ID
                </label>
                <div className="relative group">
                  <input
                    id="employeeId"
                    type="number"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#FFCC00] focus:bg-white outline-none transition-all text-xl font-black tracking-[0.2em] pl-14 shadow-inner"
                    placeholder="000000"
                    autoFocus
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D40511] transition-colors">
                    <UserIcon size={22} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!employeeId}
                className="w-full bg-[#D40511] hover:bg-black disabled:bg-gray-100 disabled:text-gray-300 text-[#FFCC00] text-lg font-black py-4 rounded-xl shadow-lg hover:shadow-none transition-all flex items-center justify-center gap-3 uppercase italic tracking-widest"
              >
                Login
                <ChevronRight size={20} />
              </button>
            </form>

            <div className="pt-6 text-center border-t border-gray-50">
              <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">
                All System Corporation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
