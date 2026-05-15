import type {
  SboProject,
  SboProjectTask,
  Jac,
  ProjectAssignment,
  PasseportEnrichment,
  ProjectTemplate,
  ProjectTeamMember,
} from '../types/projects';

// ─── Mock IDs ────────────────────────────────────────────────────────────────

export const MOCK_PROJECT_USER_ID = 'user-demo';
export const MOCK_PROJECT_COMPANY_ID = 'company-demo';
export const MOCK_EXPERT_ID = 'expert-jm';

// ─── Projects ────────────────────────────────────────────────────────────────

export const MOCK_PROJECTS: SboProject[] = [
  {
    id: 'proj-001',
    companyId: 'company-demo',
    type: 'upskilling',
    title: 'Montée en compétences Python & Data',
    description:
      'Projet Upskilling visant à amener 3 collaborateurs du niveau Dreyfus 2 au niveau 3+ en développement Python et analyse de données, via des livrables réels sur la stack data interne.',
    status: 'active',
    startDate: '2026-05-01',
    endDate: '2026-07-15',
    expertId: 'expert-jm',
    expertName: 'Jean-Marc Lebrun',
    expertInitials: 'JM',
    budget: 12000,
    passeportEnrichmentCount: 4,
    skillProfile: [
      { competencyId: 'comp-python', competencyName: 'Développement Python', dreyfusLevelRequired: 3, count: 3 },
      { competencyId: 'comp-data', competencyName: 'Analyse de données', dreyfusLevelRequired: 3, count: 2 },
      { competencyId: 'comp-testing', competencyName: 'Tests logiciels', dreyfusLevelRequired: 2, count: 3 },
    ],
    createdBy: 'consultant-pa',
    createdAt: '2026-04-20T09:00:00Z',
    updatedAt: '2026-05-12T14:30:00Z',
  },
  {
    id: 'proj-002',
    companyId: 'company-demo',
    type: 'stride',
    title: 'Déploiement IA Support Client — STRIDE',
    description:
      'Projet STRIDE pour déployer un assistant IA pour le service support client. Méthode STRIDE en 6 phases : Stratégie, Transformation, Réalisation, Implémentation, Déploiement, Évaluation.',
    status: 'planned',
    startDate: '2026-06-01',
    endDate: '2026-09-30',
    expertId: 'expert-sr',
    expertName: 'Sophie Renard',
    expertInitials: 'SR',
    budget: 28000,
    passeportEnrichmentCount: 8,
    skillProfile: [
      { competencyId: 'comp-ai', competencyName: 'IA & LLM', dreyfusLevelRequired: 3, count: 2 },
      { competencyId: 'comp-python', competencyName: 'Développement Python', dreyfusLevelRequired: 3, count: 2 },
      { competencyId: 'comp-arch', competencyName: 'Architecture logicielle', dreyfusLevelRequired: 4, count: 1 },
      { competencyId: 'comp-pm', competencyName: 'Gestion de projet', dreyfusLevelRequired: 3, count: 1 },
    ],
    createdBy: 'consultant-pa',
    createdAt: '2026-05-10T11:00:00Z',
    updatedAt: '2026-05-10T11:00:00Z',
  },
];

// ─── Tasks ───────────────────────────────────────────────────────────────────

export const MOCK_TASKS: SboProjectTask[] = [
  // proj-001 tasks
  {
    id: 'task-001',
    projectId: 'proj-001',
    title: 'Exploration & nettoyage du dataset marché',
    description:
      'Explorer le dataset de ventes Q1-Q2 2026, identifier et corriger les anomalies, produire un rapport de qualité des données. Le livrable final est un notebook Python documenté avec les transformations appliquées.',
    dreyfusLevelRequired: 3,
    competencyIds: ['comp-python', 'comp-data'],
    deliverableSpec: { description: 'Notebook Python nettoyé + rapport qualité données', format: 'code' },
    successCriteria: [
      { criterion: 'Toutes les valeurs nulles traitées', checked: true },
      { criterion: 'Documentation des transformations', checked: true },
      { criterion: 'Tests unitaires sur les fonctions de nettoyage', checked: false },
      { criterion: 'Rapport qualité inclus', checked: false },
    ],
    assignedTo: 'user-demo',
    assignedToName: 'Ahmed Saïd',
    assignedToInitials: 'AS',
    estimatedHours: 16,
    status: 'in_progress',
    dueDate: '2026-05-30',
    createdAt: '2026-05-01T09:00:00Z',
    updatedAt: '2026-05-12T10:00:00Z',
  },
  {
    id: 'task-002',
    projectId: 'proj-001',
    title: 'Pipeline de visualisation des tendances',
    description:
      'Construire un pipeline automatisé produisant 5 visualisations clés (tendances mensuelles, segmentation géographique, top produits, anomalies, forecast). Utiliser matplotlib/seaborn.',
    dreyfusLevelRequired: 3,
    competencyIds: ['comp-python', 'comp-data'],
    deliverableSpec: { description: 'Script Python + 5 visualisations PNG exportées', format: 'code' },
    successCriteria: [
      { criterion: '5 graphiques requis produits', checked: false },
      { criterion: 'Pipeline réutilisable (fonctions paramétrables)', checked: false },
      { criterion: 'Commentaires dans le code', checked: false },
    ],
    assignedTo: 'user-demo',
    assignedToName: 'Ahmed Saïd',
    assignedToInitials: 'AS',
    estimatedHours: 12,
    status: 'not_started',
    dueDate: '2026-06-15',
    createdAt: '2026-05-01T09:00:00Z',
    updatedAt: '2026-05-01T09:00:00Z',
  },
  {
    id: 'task-003',
    projectId: 'proj-001',
    title: 'Suite de tests automatisés sur le pipeline',
    description:
      'Écrire une suite de tests pytest couvrant les fonctions critiques du pipeline de nettoyage et de visualisation. Objectif : couverture ≥ 80%.',
    dreyfusLevelRequired: 2,
    competencyIds: ['comp-testing', 'comp-python'],
    deliverableSpec: { description: 'Fichiers test_*.py + rapport de couverture HTML', format: 'code' },
    successCriteria: [
      { criterion: 'Coverage ≥ 80%', checked: false },
      { criterion: 'Tests unitaires + tests d\'intégration', checked: false },
      { criterion: 'CI passe au vert', checked: false },
    ],
    assignedTo: 'collab-lr',
    assignedToName: 'Lucie Renaud',
    assignedToInitials: 'LR',
    estimatedHours: 8,
    status: 'not_started',
    dueDate: '2026-06-20',
    createdAt: '2026-05-01T09:00:00Z',
    updatedAt: '2026-05-01T09:00:00Z',
  },
  {
    id: 'task-004',
    projectId: 'proj-001',
    title: 'API REST d\'exposition des données agrégées',
    description:
      'Développer une API FastAPI exposant les agrégats calculés (moyennes, tendances, segments). Endpoints : GET /trends, GET /segments, GET /anomalies.',
    dreyfusLevelRequired: 3,
    competencyIds: ['comp-python'],
    deliverableSpec: { description: 'API FastAPI déployée localement + documentation OpenAPI', format: 'url' },
    successCriteria: [
      { criterion: '3 endpoints fonctionnels', checked: true },
      { criterion: 'Documentation OpenAPI générée', checked: true },
      { criterion: 'Authentification token basique', checked: true },
      { criterion: 'Tests d\'intégration API', checked: false },
    ],
    assignedTo: 'collab-tb',
    assignedToName: 'Thomas Blanc',
    assignedToInitials: 'TB',
    estimatedHours: 20,
    status: 'submitted',
    dueDate: '2026-05-25',
    submissionDate: '2026-05-20T16:45:00Z',
    deliverableUrl: 'https://github.com/company-demo/data-api/pull/12',
    submissionNotes: 'PR ouverte, tous les endpoints passent les tests locaux. Authentification par Bearer token implémentée.',
    createdAt: '2026-05-01T09:00:00Z',
    updatedAt: '2026-05-20T16:45:00Z',
  },
];

// ─── JACs ────────────────────────────────────────────────────────────────────

export const MOCK_JACS: Jac[] = [
  {
    id: 'jac-001',
    taskId: 'task-004',
    competencyId: 'comp-python',
    competencyName: 'Développement Python',
    collaboratorId: 'collab-tb',
    collaboratorName: 'Thomas Blanc',
    collaboratorInitials: 'TB',
    expertId: 'expert-jm',
    expertName: 'Jean-Marc Lebrun',
    expertInitials: 'JM',
    dreyfusLevelAchieved: 3,
    status: 'approved',
    expertFeedback:
      'Très bon travail. L\'architecture de l\'API est propre et respecte les principes REST. La gestion des erreurs est complète. Le niveau Dreyfus 3 est clairement atteint : Thomas démontre une application autonome sur un cas réel.',
    rubricScores: [
      { criterion: 'Application autonome sans aide externe', score: 3 },
      { criterion: 'Gestion des cas d\'erreur', score: 3 },
      { criterion: 'Qualité et lisibilité du code', score: 3 },
      { criterion: 'Documentation et tests', score: 2, comment: 'Tests d\'intégration partiels' },
    ],
    validatedAt: '2026-05-22T10:30:00Z',
    createdAt: '2026-05-20T17:00:00Z',
  },
  {
    id: 'jac-002',
    taskId: 'task-001',
    competencyId: 'comp-data',
    competencyName: 'Analyse de données',
    collaboratorId: 'user-demo',
    collaboratorName: 'Ahmed Saïd',
    collaboratorInitials: 'AS',
    expertId: 'expert-jm',
    expertName: 'Jean-Marc Lebrun',
    expertInitials: 'JM',
    status: 'pending',
    createdAt: '2026-05-12T11:00:00Z',
  },
];

// ─── Assignments ─────────────────────────────────────────────────────────────

export const MOCK_ASSIGNMENTS: ProjectAssignment[] = [
  {
    id: 'assign-001',
    taskId: 'task-001',
    assigneeType: 'collaborator',
    assigneeId: 'user-demo',
    assigneeName: 'Ahmed Saïd',
    assigneeInitials: 'AS',
    role: 'primary_executor',
    status: 'in_progress',
    createdAt: '2026-05-01T09:00:00Z',
  },
  {
    id: 'assign-002',
    taskId: 'task-001',
    assigneeType: 'expert',
    assigneeId: 'expert-jm',
    assigneeName: 'Jean-Marc Lebrun',
    assigneeInitials: 'JM',
    role: 'mentor',
    status: 'in_progress',
    createdAt: '2026-05-01T09:00:00Z',
  },
  {
    id: 'assign-003',
    taskId: 'task-004',
    assigneeType: 'collaborator',
    assigneeId: 'collab-tb',
    assigneeName: 'Thomas Blanc',
    assigneeInitials: 'TB',
    role: 'primary_executor',
    status: 'completed',
    createdAt: '2026-05-01T09:00:00Z',
  },
];

// ─── PasseportEnrichments ─────────────────────────────────────────────────────

export const MOCK_ENRICHMENTS: PasseportEnrichment[] = [
  {
    id: 'enrich-001',
    collaboratorId: 'collab-tb',
    collaboratorName: 'Thomas Blanc',
    collaboratorInitials: 'TB',
    competencyId: 'comp-python',
    competencyName: 'Développement Python',
    oldDreyfusLevel: 2,
    newDreyfusLevel: 3,
    sourceType: 'jac',
    sourceId: 'jac-001',
    projectId: 'proj-001',
    verifiedBy: 'expert-jm',
    verifiedByName: 'Jean-Marc Lebrun',
    verifiedAt: '2026-05-22T10:30:00Z',
    createdAt: '2026-05-22T10:31:00Z',
  },
];

// ─── Team members ─────────────────────────────────────────────────────────────

export const MOCK_TEAM_MEMBERS: ProjectTeamMember[] = [
  {
    userId: 'user-demo',
    name: 'Ahmed Saïd',
    initials: 'AS',
    role: 'collaborateur',
    currentDreyfusLevels: {
      'comp-python': 2,
      'comp-data': 2,
      'comp-testing': 2,
    },
    assignedTaskIds: ['task-001', 'task-002'],
    jacCount: 1,
    jacValidated: 0,
  },
  {
    userId: 'collab-tb',
    name: 'Thomas Blanc',
    initials: 'TB',
    role: 'collaborateur',
    currentDreyfusLevels: {
      'comp-python': 3,
      'comp-data': 2,
      'comp-testing': 2,
    },
    assignedTaskIds: ['task-004'],
    jacCount: 1,
    jacValidated: 1,
  },
  {
    userId: 'collab-lr',
    name: 'Lucie Renaud',
    initials: 'LR',
    role: 'collaborateur',
    currentDreyfusLevels: {
      'comp-python': 2,
      'comp-testing': 2,
    },
    assignedTaskIds: ['task-003'],
    jacCount: 0,
    jacValidated: 0,
  },
  {
    userId: 'manager-demo',
    name: 'Claire Martin',
    initials: 'CM',
    role: 'manager',
    currentDreyfusLevels: {
      'comp-pm': 4,
    },
    assignedTaskIds: [],
    jacCount: 0,
    jacValidated: 0,
  },
];

// ─── Templates ───────────────────────────────────────────────────────────────

export const MOCK_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'tpl-001',
    name: 'Upskilling Python Data — Standard',
    description:
      'Template pour montée en compétence Python + Data Science. 3 collaborateurs, 10 semaines. Jalons : exploration données, visualisation, API, tests.',
    type: 'upskilling',
    durationWeeksDefault: 10,
    durationWeeksMin: 8,
    durationWeeksMax: 14,
    teamSizeDefault: 3,
    teamSizeMin: 2,
    teamSizeMax: 6,
    skillProfileRequired: [
      { competencyId: 'comp-python', competencyName: 'Développement Python', dreyfusLevelRequired: 3, count: 3 },
      { competencyId: 'comp-data', competencyName: 'Analyse de données', dreyfusLevelRequired: 3, count: 2 },
    ],
    jacCheckpoints: [
      'JAC 1 : Exploration & nettoyage — Dreyfus 3 en Analyse de données',
      'JAC 2 : API REST — Dreyfus 3 en Python',
      'JAC 3 : Rapport final — Dreyfus 3 validé globalement',
    ],
    status: 'active',
    clonedCount: 4,
    createdBy: 'admin-tls',
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 'tpl-002',
    name: 'STRIDE IA Deployment — Standard',
    description:
      'Template STRIDE pour déploiement IA en entreprise. 6 phases : Stratégie → Transformation → Réalisation → Implémentation → Déploiement → Évaluation.',
    type: 'stride',
    durationWeeksDefault: 16,
    durationWeeksMin: 12,
    durationWeeksMax: 24,
    teamSizeDefault: 4,
    teamSizeMin: 3,
    teamSizeMax: 8,
    skillProfileRequired: [
      { competencyId: 'comp-ai', competencyName: 'IA & LLM', dreyfusLevelRequired: 3, count: 2 },
      { competencyId: 'comp-arch', competencyName: 'Architecture logicielle', dreyfusLevelRequired: 4, count: 1 },
    ],
    jacCheckpoints: [
      'JAC Phase Stratégie : Vision IA définie + business case',
      'JAC Phase Réalisation : PoC fonctionnel validé',
      'JAC Phase Déploiement : IA en production avec monitoring',
    ],
    status: 'active',
    clonedCount: 2,
    createdBy: 'admin-tls',
    createdAt: '2026-02-10T09:00:00Z',
    updatedAt: '2026-05-01T10:00:00Z',
  },
];
