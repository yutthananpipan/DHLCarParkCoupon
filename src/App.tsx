import { useState } from 'react';
import { ScreenType, Reason } from './types';
import { mockUser, reasons } from './constants';
import Header from './components/Header';
import LoadingOverlay from './components/LoadingOverlay';
import LoginScreen from './components/screens/LoginScreen';
import WelcomeScreen from './components/screens/WelcomeScreen';
import ReasonScreen from './components/screens/ReasonScreen';
import VisitorScreen from './components/screens/VisitorScreen';
import SuccessScreen from './components/screens/SuccessScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
  const [visitorName, setVisitorName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleBackToHome = () => {
    setVisitorName('');
    setSelectedReason(null);
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-[#FFCC00] selection:text-[#D40511]">
      {isLoading && <LoadingOverlay />}

      {currentScreen !== 'login' && (
        <Header currentScreen={currentScreen} onLogout={handleLogout} />
      )}

      <main className="flex-1 flex flex-col w-full">
        {currentScreen === 'login' && (
          <LoginScreen
            employeeId={employeeId}
            setEmployeeId={setEmployeeId}
            onLogin={handleLogin}
          />
        )}
        {currentScreen === 'welcome' && (
          <WelcomeScreen mockUser={mockUser} onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'reasons' && (
          <ReasonScreen
            reasons={reasons}
            onSelectReason={handleReasonSelect}
            onNavigate={setCurrentScreen}
          />
        )}
        {currentScreen === 'visitor-input' && (
          <VisitorScreen
            visitorName={visitorName}
            setVisitorName={setVisitorName}
            onSubmit={submitVisitor}
            onNavigate={setCurrentScreen}
          />
        )}
        {currentScreen === 'success' && (
          <SuccessScreen
            mockUser={mockUser}
            selectedReason={selectedReason}
            visitorName={visitorName}
            onBackToHome={handleBackToHome}
          />
        )}
      </main>
      <footer className="py-8 text-center text-gray-200 text-[8px] font-black uppercase tracking-[0.4em] pointer-events-none italic">
        Powered by All System Corp | Simply Delivered
      </footer>
    </div>
  );
}
