import { useState, useEffect } from 'react';
import { ScreenType, Reason, DetailInputConfig } from './types';
import { mockUser, reasons } from './constants';
import { apiFetch, API_ENDPOINTS } from './config/api';
import packageJson from '../package.json';
import Header from './components/Header';
import LoadingOverlay from './components/LoadingOverlay';
import LoginScreen from './components/screens/LoginScreen';
import WelcomeScreen from './components/screens/WelcomeScreen';
import ReasonScreen from './components/screens/ReasonScreen';
import DetailInputScreen from './components/screens/DetailInputScreen';
import QuantityScreen from './components/screens/QuantityScreen';
import GmncScreen from './components/screens/GmncScreen';
import SuccessScreen from './components/screens/SuccessScreen';

const STORAGE_KEY = 'dhl-employee-id';

const DETAIL_CONFIGS: Record<string, DetailInputConfig> = {
  visitors: {
    titleEn: 'Please Specify Name of Vendor',
    titleTh: 'กรุณาระบุชื่อร้านค้าผู้มาติดต่อ',
    type: 'text',
    placeholder: 'บริษัท / ชื่อผู้ติดต่อ...',
  },
  training: {
    titleEn: 'Please Specify Training Subject',
    titleTh: 'กรุณาระบุหัวข้อฝึกอบรม',
    type: 'select',
    options: ['CIS', 'CIM', 'AMAZON', 'OTHERS'],
  },
  meeting: {
    titleEn: 'Please Specify Meeting Subject',
    titleTh: 'กรุณาระบุหัวข้อประชุม',
    type: 'text',
    placeholder: 'หัวข้อการประชุม...',
  },
  other: {
    titleEn: 'Please Enter Reason for Coupon',
    titleTh: 'กรุณาระบุเหตุผลของท่าน',
    type: 'text',
    placeholder: 'ระบุเหตุผล...',
  },
};

function getStepLabel(reasonId: string, screen: ScreenType): string {
  if (screen === 'detail-input') return 'Step 02';
  if (screen === 'quantity-input') {
    return reasonId === 'outing' ? 'Step 02' : 'Step 03';
  }
  return 'Step 02';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
  const [detailInputConfig, setDetailInputConfig] = useState<DetailInputConfig | null>(null);
  const [detailValue, setDetailValue] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      const data = await apiFetch<{ success: boolean; employeeId: string }>(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          method: 'POST',
          body: JSON.stringify({ employeeId }),
        }
      );

      if (data.success) {
        localStorage.setItem(STORAGE_KEY, employeeId);
        setCurrentScreen('welcome');
      }
    } catch (error) {
      console.error('Login error:', error);
      localStorage.setItem(STORAGE_KEY, employeeId);
      setCurrentScreen('welcome');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEmployeeId('');
    setSelectedReason(null);
    setDetailValue('');
    setQuantity(1);
    setCurrentScreen('login');
  };

  const handleReasonSelect = (reason: Reason) => {
    setSelectedReason(reason);
    setDetailValue('');
    setQuantity(1);

    switch (reason.id) {
      case 'visitors':
      case 'training':
      case 'meeting':
      case 'other': {
        const config = DETAIL_CONFIGS[reason.id];
        setDetailInputConfig(config);
        // Pre-select first option for dropdowns
        if (config.type === 'select' && config.options?.length) {
          setDetailValue(config.options[0]);
        }
        setCurrentScreen('detail-input');
        break;
      }
      case 'gmnc':
        setCurrentScreen('gmnc-confirm');
        break;
      case 'outing':
        setCurrentScreen('quantity-input');
        break;
    }
  };

  const handleDetailNext = () => {
    setCurrentScreen('quantity-input');
  };

  const handleGmncConfirm = () => {
    setQuantity(1);
    processRequest(1);
  };

  const processRequest = async (qty?: number) => {
    setIsLoading(true);

    try {
      const printData = {
        employeeId,
        reason: selectedReason?.label ?? 'Unknown',
        detail: detailValue || undefined,
        quantity: qty ?? quantity,
        timestamp: new Date().toISOString(),
      };

      const [printResponse] = await Promise.all([
        apiFetch<{ success: boolean; message: string }>(API_ENDPOINTS.PRINTER.PRINT, {
          method: 'POST',
          body: JSON.stringify(printData),
        }),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ]);

      console.log('Print job sent successfully:', printResponse);
    } catch (error) {
      console.error('Print error:', error);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } finally {
      setIsLoading(false);
      setCurrentScreen('success');
    }
  };

  const handleBackToHome = () => {
    setDetailValue('');
    setQuantity(1);
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
            selectedReason={selectedReason}
            onSelectReason={handleReasonSelect}
            onNavigate={setCurrentScreen}
          />
        )}
        {currentScreen === 'detail-input' && detailInputConfig && (
          <DetailInputScreen
            config={detailInputConfig}
            value={detailValue}
            onChange={setDetailValue}
            onNext={handleDetailNext}
            onNavigate={setCurrentScreen}
            stepLabel={getStepLabel(selectedReason?.id ?? '', 'detail-input')}
          />
        )}
        {currentScreen === 'quantity-input' && (
          <QuantityScreen
            quantity={quantity}
            onQuantityChange={setQuantity}
            selectedReason={selectedReason}
            onConfirm={() => processRequest()}
            onNavigate={setCurrentScreen}
            stepLabel={getStepLabel(selectedReason?.id ?? '', 'quantity-input')}
          />
        )}
        {currentScreen === 'gmnc-confirm' && (
          <GmncScreen onConfirm={handleGmncConfirm} onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'success' && (
          <SuccessScreen
            mockUser={mockUser}
            selectedReason={selectedReason}
            detailValue={detailValue}
            quantity={quantity}
            onBackToHome={handleBackToHome}
          />
        )}
      </main>
      <footer className="py-8 text-center text-gray-500 space-y-1">
        <p className="text-[8px] font-black uppercase tracking-[0.4em] italic">
          Powered by All System Corporation Co.,Ltd.
        </p>
        <p className="text-[7px] font-bold uppercase tracking-widest opacity-60">
          Version {packageJson.version}
        </p>
      </footer>
    </div>
  );
}
