import { User as UserIcon, ChevronRight } from 'lucide-react';

interface LoginScreenProps {
  readonly employeeId: string;
  readonly setEmployeeId: (id: string) => void;
  readonly onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginScreen({ employeeId, setEmployeeId, onLogin }: LoginScreenProps) {
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // BUG-03 fix: filter non-digit characters
    const filtered = e.target.value.replace(/\D/g, '');
    setEmployeeId(filtered);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-[#FFCC00] min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-[32px] shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
        {/* BUG-02 fix: Mobile brand header (visible only on mobile) */}
        <div className="md:hidden bg-[#D40511] text-white p-6 text-center relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #000, #000 10px, transparent 10px, transparent 20px)',
            }}
          ></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none">
              Car Park Coupon
            </h2>
            <p className="text-sm text-white/80 font-bold mt-2">ระบบขออนุมัติคูปองจอดรถ</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 flex-1">
          {/* Left Visual Area — desktop only */}
          <div className="hidden md:flex bg-[#D40511] text-white flex-col justify-center p-12 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-5"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #000, #000 10px, transparent 10px, transparent 20px)',
              }}
            ></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tighter leading-none">
                  Car Park
                  <br />
                  Coupon
                </h2>
                <p className="text-lg text-white/80 font-bold leading-relaxed max-w-xs">
                  ระบบขออนุมัติคูปองจอดรถ
                  <br />
                  ยกระดับการจัดการ ยกระดับการบริการ
                </p>
              </div>
              {/* AllSystem logo placeholder */}
              <div className="mt-12 border-2 border-dashed border-white/30 rounded-xl px-6 py-4 inline-flex items-center justify-center opacity-50">
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest">
                  AllSystem Logo
                </span>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FFCC00] rounded-full opacity-10 blur-2xl"></div>
          </div>

          {/* Login Form Area */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
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
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={employeeId}
                      onChange={handleIdChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#FFCC00] focus:bg-white outline-none transition-all text-xl font-black tracking-[0.2em] pl-14 shadow-inner"
                      placeholder="Enter your ID here"
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
                  className="w-full bg-[#D40511] hover:bg-[#b0040e] disabled:bg-gray-100 disabled:text-gray-300 text-[#FFCC00] text-lg font-black py-4 rounded-xl shadow-lg hover:shadow-none transition-all flex items-center justify-center gap-3 uppercase italic tracking-widest"
                >
                  Login
                  <ChevronRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
