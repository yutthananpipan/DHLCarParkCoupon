import React, { useState } from 'react';
import { 
  User, 
  LogOut, 
  ChevronRight, 
  Car, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Globe, 
  Plane, 
  MoreHorizontal, 
  CheckCircle,
  ArrowLeft,
  Printer
} from 'lucide-react';

type ScreenType = 'login' | 'welcome' | 'reasons' | 'visitor-input' | 'success';

interface Reason {
  id: string;
  label: string;
  icon: React.ReactNode;
  desc: string;
}

interface MockUser {
  name: string;
  nameEn: string;
  id: string;
  supervisor: string;
  supervisorEn: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
  const [visitorName, setVisitorName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mock User Data
  const mockUser: MockUser = {
    name: "คุณชยธร สุกิน",
    nameEn: "Mr. Chayaton Sukin",
    id: "724163",
    supervisor: "คุณสราญพร คุรุจัญญา",
    supervisorEn: "Saranporn Kurujanya"
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!employeeId) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen('welcome');
    }, 800);
  };

  const handleLogout = () => {
    setEmployeeId('');
    setSelectedReason(null);
    setVisitorName('');
    setCurrentScreen('login');
  };

  const handleReasonSelect = (reason: Reason) => {
    setSelectedReason(reason);
    if (reason.id === 'visitors') {
      setCurrentScreen('visitor-input');
    } else {
      processRequest();
    }
  };

  const submitVisitor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!visitorName) return;
    processRequest();
  };

  const processRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen('success');
    }, 1500);
  };

  const reasons: Reason[] = [
    { id: 'visitors', label: 'Visitors', icon: <Users size={32} />, desc: 'ผู้มาติดต่อ' },
    { id: 'training', label: 'Training', icon: <GraduationCap size={32} />, desc: 'อบรม/สัมมนา' },
    { id: 'meeting', label: 'Meeting', icon: <Briefcase size={32} />, desc: 'ประชุม' },
    { id: 'gmnc', label: 'GMNC', icon: <Globe size={32} />, desc: 'GMNC' },
    { id: 'outing', label: 'Outing', icon: <Plane size={32} />, desc: 'ปฏิบัติงานภายนอก' },
    { id: 'other', label: 'Other', icon: <MoreHorizontal size={32} />, desc: 'อื่นๆ' },
  ];

  // --- Shared Components ---

  const Header = () => (
    <header className="bg-[#D40511] shadow-md sticky top-0 z-30 w-full">
      <div className="max-w-5xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="bg-[#FFCC00] text-[#D40511] font-black italic px-3 py-1 text-xl md:text-2xl skew-x-[-10deg] shadow-sm">
            DHL
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-base md:text-lg leading-tight">Car Park Coupon</span>
             <span className="text-xs text-white/80 hidden sm:block">Automated Request System</span>
          </div>
        </div>
        {currentScreen !== 'login' && (
           <button 
             onClick={handleLogout} 
             className="flex items-center gap-2 text-white/90 hover:text-[#FFCC00] hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
           >
             <span className="hidden md:inline text-sm font-medium">ออกจากระบบ</span>
             <LogOut size={20} />
           </button>
        )}
      </div>
    </header>
  );

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300 max-w-sm w-full">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-100 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-[#D40511] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800">กำลังประมวลผล</h3>
          <p className="text-gray-500 text-sm">Please wait a moment...</p>
        </div>
      </div>
    </div>
  );

  // --- Screens ---

  const LoginScreen = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-200 w-full min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px]">
        {/* Left Side: Brand (Visible on Tablet/Desktop) */}
        <div className="hidden md:flex bg-[#D40511] text-white flex-col justify-center p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#b0040e] opacity-50" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
          <div className="relative z-10">
            <div className="bg-[#FFCC00] text-[#D40511] font-black italic text-7xl inline-block px-4 py-2 mb-6 shadow-lg transform -skew-x-12">
              DHL
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              ระบบขออนุญาตบัตรจอดรถอัตโนมัติ<br/>
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">ลงชื่อเข้าใช้</h1>
            <p className="text-gray-500 mb-8 text-center md:text-left text-sm md:text-base">กรุณาระบุรหัสพนักงานเพื่อดำเนินการต่อ</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">รหัสพนักงาน (Employee ID)</label>
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

  const WelcomeScreen = () => (
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#D40511] leading-tight mb-1">{mockUser.name}</h2>
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
                      {mockUser.supervisor}<br/>
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
                onClick={() => setCurrentScreen('reasons')}
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

  const ReasonScreen = () => (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-300">
      <div className="mb-6 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentScreen('welcome')} className="p-2 -ml-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={28} />
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">ระบุเหตุผล</h2>
            <p className="text-gray-500">Select reason for request</p>
          </div>
        </div>
        
        {/* Step Indicator (Optional visual aid) */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <span className="text-[#D40511]">1. เลือกเหตุผล</span>
          <div className="w-8 h-[1px] bg-gray-300"></div>
          <span>2. ยืนยัน</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {reasons.map((reason) => (
          <button
            key={reason.id}
            onClick={() => handleReasonSelect(reason)}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-[#D40511] hover:shadow-xl transition-all group flex flex-col items-center justify-center gap-4 aspect-square md:aspect-[4/3]"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-50 text-[#D40511] flex items-center justify-center group-hover:bg-[#D40511] group-hover:text-white transition-all transform group-hover:scale-110 duration-300">
              {reason.icon}
            </div>
            <div className="text-center space-y-1">
              <p className="font-bold text-gray-800 text-lg md:text-xl group-hover:text-[#D40511]">{reason.label}</p>
              <p className="text-sm text-gray-500">{reason.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const VisitorScreen = () => (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 flex flex-col justify-center min-h-[60vh] animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="mb-8 flex items-center gap-3">
        <button onClick={() => setCurrentScreen('reasons')} className="p-2 -ml-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} />
        </button>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">ข้อมูลผู้มาติดต่อ</h2>
          <p className="text-gray-500">Visitor / Vendor Details</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-gray-100">
        <form onSubmit={submitVisitor} className="space-y-8">
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

  const SuccessScreen = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)] animate-in zoom-in duration-300">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#D40511]"></div>
        
        <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mb-8 mx-auto animate-bounce">
          <Printer size={56} className="text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-3">กำลังพิมพ์คูปอง</h2>
        <p className="text-gray-500 mb-10 text-lg">
          ระบบได้รับข้อมูลเรียบร้อยแล้ว<br/>
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
          onClick={() => {
            setVisitorName('');
            setSelectedReason(null);
            setCurrentScreen('welcome');
          }}
          className="text-gray-500 font-semibold hover:text-[#D40511] transition-colors py-2 px-4 rounded-lg hover:bg-red-50"
        >
          กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900">
      {isLoading && <LoadingOverlay />}
      
      {/* Conditionally render header based on screen to keep login clean */}
      {currentScreen !== 'login' && <Header />}

      <main className="flex-1 flex flex-col w-full">
        {currentScreen === 'login' && <LoginScreen />}
        {currentScreen === 'welcome' && <WelcomeScreen />}
        {currentScreen === 'reasons' && <ReasonScreen />}
        {currentScreen === 'visitor-input' && <VisitorScreen />}
        {currentScreen === 'success' && <SuccessScreen />}
      </main>
    </div>
  );
}
