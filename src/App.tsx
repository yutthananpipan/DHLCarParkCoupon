import { useState, useEffect } from 'react';
import { ScreenType, Reason } from './types';
import { mockUser, reasons } from './constants';
import { apiFetch, API_ENDPOINTS } from './config/api';
import Header from './components/Header';
import LoadingOverlay from './components/LoadingOverlay';
import LoginScreen from './components/screens/LoginScreen';
import WelcomeScreen from './components/screens/WelcomeScreen';
import ReasonScreen from './components/screens/ReasonScreen';
import VisitorScreen from './components/screens/VisitorScreen';
import SuccessScreen from './components/screens/SuccessScreen';

const STORAGE_KEY = 'dhl-employee-id';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
  const [visitorName, setVisitorName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check for saved login on mount
  useEffect(() => {
    const savedEmployeeId = localStorage.getItem(STORAGE_KEY);
    if (savedEmployeeId) {
      setEmployeeId(savedEmployeeId);
      setCurrentScreen('welcome');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!employeeId) return;
    setIsLoading(true);

    try {
      // Call backend API for login
      const data = await apiFetch<{ success: boolean; employeeId: string }>(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          method: 'POST',
          body: JSON.stringify({ employeeId }),
        }
      );

      if (data.success) {
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, employeeId);
        setCurrentScreen('welcome');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to local login if backend is not available
      localStorage.setItem(STORAGE_KEY, employeeId);
      setCurrentScreen('welcome');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
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
      <footer className="py-8 text-center text-gray-500 text-[8px] font-black uppercase tracking-[0.4em] pointer-events-none italic">
        Powered by All System Corporation Co.,Ltd.
      </footer>
    </div>
  );
}
