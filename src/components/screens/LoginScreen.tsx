import { User, ChevronRight } from 'lucide-react';

interface LoginScreenProps {
  employeeId: string;
  setEmployeeId: (id: string) => void;
  onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginScreen({ employeeId, setEmployeeId, onLogin }: LoginScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-200 w-full min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px]">
        {/* Left Side: Brand (Visible on Tablet/Desktop) */}
        <div className="hidden md:flex bg-[#D40511] text-white flex-col justify-center p-12 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full bg-[#b0040e] opacity-50"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          ></div>
          <div className="relative z-10">
            <div className="bg-[#FFCC00] text-[#D40511] font-black italic text-7xl inline-block px-4 py-2 mb-6 shadow-lg transform -skew-x-12">
              DHL
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              ระบบขออนุญาตบัตรจอดรถอัตโนมัติ
              <br />
              สะดวก รวดเร็ว ใช้งานง่าย
            </p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#FFCC00] rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center items-center md:items-start relative">
          {/* Mobile Logo */}
          <div className="md:hidden mb-8">
            <div className="bg-[#FFCC00] text-[#D40511] font-black italic text-5xl px-4 py-1 shadow-md transform -skew-x-12">
              DHL
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
              ลงชื่อเข้าใช้
            </h1>
            <p className="text-gray-500 mb-8 text-center md:text-left text-sm md:text-base">
              กรุณาระบุรหัสพนักงานเพื่อดำเนินการต่อ
            </p>

            <form onSubmit={onLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  รหัสพนักงาน (Employee ID)
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#D40511] focus:ring-4 focus:ring-red-50 outline-none transition-all text-lg font-medium tracking-widest pl-12"
                    placeholder="เช่น 724163"
                    autoFocus
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D40511] transition-colors">
                    <User size={24} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!employeeId}
                className="w-full bg-[#D40511] hover:bg-[#b0040e] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform active:scale-[0.99] transition-all flex items-center justify-center gap-3"
              >
                เข้าสู่ระบบ
                <ChevronRight size={24} />
              </button>
            </form>
          </div>

          <div className="mt-12 w-full text-center md:text-left">
            <p className="text-xs text-gray-400">Powered by All System Corporation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
