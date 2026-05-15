/**
 * Mock Enterprise data (Cahier #06).
 * Multi-tenant company, members, cohorts, alerts, stats, projects.
 */

import type {
  Company,
  CompanyMember,
  CompanyCohort,
  ManagerAlert,
  CompanyStats,
  CompanyProject,
} from '../types/learning';

export const MOCK_COMPANY_ID = 'company-demo';

export const MOCK_COMPANY: Company = {
  id: MOCK_COMPANY_ID,
  name: 'Entreprise Demo',
  plan: 'enterprise_premium',
  maxSeats: 50,
  createdAt: '2026-01-01T00:00:00Z',
};

export const MOCK_COMPANY_MEMBERS: CompanyMember[] = [
  {
    id: 'mem-1',
    companyId: MOCK_COMPANY_ID,
    userId: 'user-claire',
    name: 'Claire Dupont',
    email: 'claire@entreprise.fr',
    role: 'admin',
    status: 'active',
    progressPercent: 82,
    lastActiveAt: '2026-05-15T08:00:00Z',
    joinedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'mem-2',
    companyId: MOCK_COMPANY_ID,
    userId: 'user-marc',
    name: 'Marc Leroy',
    email: 'marc@entreprise.fr',
    role: 'member',
    status: 'active',
    progressPercent: 67,
    lastActiveAt: '2026-05-14T17:30:00Z',
    joinedAt: '2026-01-12T00:00:00Z',
  },
  {
    id: 'mem-3',
    companyId: MOCK_COMPANY_ID,
    userId: 'user-julie',
    name: 'Julie Petit',
    email: 'julie@entreprise.fr',
    role: 'member',
    status: 'active',
    progressPercent: 45,
    lastActiveAt: '2026-05-12T10:00:00Z',
    joinedAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'mem-4',
    companyId: MOCK_COMPANY_ID,
    userId: 'user-thomas',
    name: 'Thomas Renaud',
    email: 'thomas@entreprise.fr',
    role: 'manager',
    status: 'active',
    progressPercent: 91,
    lastActiveAt: '2026-05-15T09:15:00Z',
    joinedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'mem-5',
    companyId: MOCK_COMPANY_ID,
    userId: 'user-sophie',
    name: 'Sophie Martin',
    email: 'sophie@entreprise.fr',
    role: 'viewer',
    status: 'pending',
    progressPercent: 0,
    joinedAt: '2026-05-10T00:00:00Z',
  },
];

export const MOCK_COMPANY_COHORTS: CompanyCohort[] = [
  {
    id: 'cohort-1',
    companyId: MOCK_COMPANY_ID,
    name: 'Direction Générale',
    memberCount: 6,
    avgDreyfusLevel: 3.8,
    coachName: 'Marie L.',
    createdAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'cohort-2',
    companyId: MOCK_COMPANY_ID,
    name: 'Équipe Tech',
    memberCount: 14,
    avgDreyfusLevel: 3.2,
    coachName: 'Thomas D.',
    createdAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'cohort-3',
    companyId: MOCK_COMPANY_ID,
    name: 'Équipe Commerciale',
    memberCount: 18,
    avgDreyfusLevel: 2.9,
    coachName: 'Amina B.',
    createdAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'cohort-4',
    companyId: MOCK_COMPANY_ID,
    name: 'Support & Ops',
    memberCount: 9,
    avgDreyfusLevel: 2.5,
    coachName: 'Paul M.',
    createdAt: '2026-02-01T00:00:00Z',
  },
];

export const MOCK_MANAGER_ALERTS: ManagerAlert[] = [
  {
    id: 'alert-1',
    companyId: MOCK_COMPANY_ID,
    type: 'atrophie',
    message: '3 collaborateurs inactifs depuis +90 jours',
    severity: 'warning',
    createdAt: '2026-05-10T09:00:00Z',
  },
  {
    id: 'alert-2',
    companyId: MOCK_COMPANY_ID,
    type: 'budget',
    message: 'Budget coaching à 80% de consommation',
    severity: 'warning',
    createdAt: '2026-05-12T14:00:00Z',
  },
  {
    id: 'alert-3',
    companyId: MOCK_COMPANY_ID,
    type: 'deadline',
    message: 'Certification "Leadership D4" échéance dans 14j',
    severity: 'danger',
    createdAt: '2026-05-13T08:00:00Z',
  },
];

export const MOCK_COMPANY_STATS: CompanyStats = {
  companyId: MOCK_COMPANY_ID,
  activeMembers: 47,
  engagementRate: 78,
  activeFormations: 12,
  budgetUsedPercent: 62,
  totalHours: 456,
  completionRate: 72,
  updatedAt: '2026-05-15T00:00:00Z',
};

export const MOCK_COMPANY_PROJECTS: CompanyProject[] = [
  {
    id: 'proj-1',
    companyId: MOCK_COMPANY_ID,
    title: 'Programme Leadership 2026',
    team: 'Direction',
    progressPercent: 74,
    status: 'on-track',
  },
  {
    id: 'proj-2',
    companyId: MOCK_COMPANY_ID,
    title: 'Montée en compétences Data',
    team: 'Tech',
    progressPercent: 48,
    status: 'at-risk',
  },
  {
    id: 'proj-3',
    companyId: MOCK_COMPANY_ID,
    title: 'Onboarding Q2 2026',
    team: 'RH',
    progressPercent: 90,
    status: 'on-track',
  },
];
