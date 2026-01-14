import { LogOut } from 'lucide-react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onLogout: () => void;
}

export default function Header({ currentScreen, onLogout }: HeaderProps) {
  return (
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
            onClick={onLogout}
            className="flex items-center gap-2 text-white/90 hover:text-[#FFCC00] hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
          >
            <span className="hidden md:inline text-sm font-medium">ออกจากระบบ</span>
            <LogOut size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
