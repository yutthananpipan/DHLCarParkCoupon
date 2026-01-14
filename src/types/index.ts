export type ScreenType = 'login' | 'welcome' | 'reasons' | 'visitor-input' | 'success';

export interface Reason {
  id: string;
  label: string;
  icon: React.ReactNode;
  desc: string;
}

export interface MockUser {
  name: string;
  nameEn: string;
  id: string;
  supervisor: string;
  supervisorEn: string;
}
