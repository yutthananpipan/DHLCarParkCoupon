import { LogOut } from 'lucide-react';
import { ScreenType } from '../types';
import { DHLLogo } from './DHLLogo';

interface HeaderProps {
  readonly currentScreen: ScreenType;
  readonly onLogout: () => void;
}

export default function Header({ currentScreen, onLogout }: HeaderProps) {
  return (
    <header className="bg-[#FFCC00] border-b-2 border-[#D40511] sticky top-0 z-30 w-full shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-2 md:py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <DHLLogo className="h-5 md:h-6" />
          <div className="flex flex-col border-l border-black/10 pl-4">
            <span className="font-black text-gray-900 text-xs md:text-sm leading-tight tracking-tighter uppercase italic">
              Car Park Coupon
            </span>
            <span className="text-[8px] text-gray-700 font-bold uppercase hidden sm:block">
              Simply delivered.
            </span>
          </div>
        </div>
        {currentScreen !== 'login' && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/40 text-gray-900 font-bold py-1.5 px-3 rounded-lg transition-all text-xs"
          >
            <span className="hidden sm:inline uppercase tracking-widest">Logout</span>
            <LogOut size={16} className="text-[#D40511]" />
          </button>
        )}
      </div>
    </header>
  );
}
