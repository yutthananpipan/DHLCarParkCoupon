export type ScreenType =
  | 'login'
  | 'welcome'
  | 'reasons'
  | 'detail-input'
  | 'quantity-input'
  | 'gmnc-confirm'
  | 'success';

export interface DetailInputConfig {
  titleEn: string;
  titleTh: string;
  type: 'text' | 'select';
  options?: string[];
  placeholder?: string;
}

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
