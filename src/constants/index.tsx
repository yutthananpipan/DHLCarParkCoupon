import { Users, GraduationCap, Briefcase, Globe, Plane, MoreHorizontal } from 'lucide-react';
import { Reason, MockUser } from '../types';

export const mockUser: MockUser = {
  name: 'คุณชยธร สุกิน',
  nameEn: 'Mr. Chayaton Sukin',
  id: '724163',
  supervisor: 'คุณสราญพร คุรุจัญญา',
  supervisorEn: 'Saranporn Kurujanya',
};

export const reasons: Reason[] = [
  { id: 'visitors', label: 'Visitors', icon: <Users size={32} />, desc: 'ผู้มาติดต่อ' },
  {
    id: 'training',
    label: 'Training',
    icon: <GraduationCap size={32} />,
    desc: 'อบรม/สัมมนา',
  },
  { id: 'meeting', label: 'Meeting', icon: <Briefcase size={32} />, desc: 'ประชุม' },
  { id: 'gmnc', label: 'GMNC', icon: <Globe size={32} />, desc: 'GMNC' },
  { id: 'outing', label: 'Outing', icon: <Plane size={32} />, desc: 'ปฏิบัติงานภายนอก' },
  { id: 'other', label: 'Other', icon: <MoreHorizontal size={32} />, desc: 'อื่นๆ' },
];
