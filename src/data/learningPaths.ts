/**
 * Shared mock data — Learning Paths
 *
 * Used by: LearningPathDetail, LessonPlayer
 * Will be replaced by API calls in production.
 */

import type {
  Prerequisites,
  ProgressionMode,
  ParcoursScope,
  SubscriptionTier,
} from '../types/learning';

export type Tone = 'primary' | 'warm' | 'sun';
export type ResourceKind = 'guide' | 'video' | 'template' | 'podcast' | 'exercise';

export interface Lecon {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  /** Cahier #01 — pré-requis Type A/B (optional, MVP) */
  prerequisites?: Prerequisites;
}

export interface Etape {
  id: string;
  number: number;
  title: string;
  duration: string;
  lecons: Lecon[];
  completed: boolean;
  unlocked: boolean;
  progress: { completed: number; total: number; percentage: number };
  /** Cahier #01 — description courte (optionnel) */
  description?: string;
  /** Cahier #01 — compétences touchées par cette étape (refs to COMPETENCES) */
  competenceIds?: string[];
  /** Cahier #01 — mode progression pour passer à l'étape suivante (défaut: STRICT) */
  progression_mode?: ProgressionMode;
}

export interface ComplementaryItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  kind: ResourceKind;
  tone: Tone;
  /** Cahier #01 — pré-requis Type A/B (optional) */
  prerequisites?: Prerequisites;
}

export interface FinalProject {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  locked: boolean;
}

export interface Parcours {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  duration: string;
  category: string;
  etapes: Etape[];
  complementaryContent?: ComplementaryItem[];
  finalProject?: FinalProject;
  progress: { completed: number; total: number; percentage: number };
  backUrl: string;
  /** Cahier #01 — scope multi-tenant (Global ou Company-specific). Défaut: Global. */
  scope?: ParcoursScope;
  /** Cahier #01 — companyId si scope='Company' */
  companyId?: string;
  /** Cahier #01 — mode progression étape→étape. Défaut: 'STRICT'. */
  progressionMode?: ProgressionMode;
  /** Cahier #01 — abonnements qui débloquent ce parcours. Vide/undefined = accessible à tous. */
  tierGate?: SubscriptionTier[];
  /**
   * Cahier #01 — compétences DU parcours = agrégation des etapes[].competenceIds.
   * Calculée à la volée via `getParcoursCompetenceIds(parcoursId)`.
   * Sert à auto-générer le questionnaire de positionnement (1 Q / compétence).
   */
}

export const MOCK_PARCOURS_DATA: Record<string, Parcours> = {
  '1': {
    id: '1',
    title: 'Fondamentaux du Leadership',
    description:
      'Apprenez les principes essentiels du leadership moderne et développez vos compétences de management.',
    instructor: 'Marie Dubois',
    level: 'débutant',
    duration: '6 semaines',
    category: 'Leadership',
    backUrl: '/learning-paths',
    etapes: [
      {
        id: 'etape-1-1',
        number: 1,
        title: 'Introduction au Leadership',
        duration: '2 semaines',
        unlocked: true,
        completed: true,
        progression_mode: 'STRICT' as const,
        lecons: [
          { id: 'lecon-1-1-1', number: 1, title: 'Introduction au Leadership', description: 'Découvrez les fondamentaux et les différents styles de leadership', duration: '45 min', completed: true },
          { id: 'lecon-1-1-2', number: 2, title: 'Présence et Authenticité', description: 'Développez votre présence authentique en tant que leader', duration: '1h', completed: true },
          { id: 'lecon-1-1-3', number: 3, title: 'Vision et Stratégie', description: 'Articulez votre vision et créez une stratégie inspirante', duration: '1h 15min', completed: true },
        ],
        progress: { completed: 3, total: 3, percentage: 100 },
      },
      {
        id: 'etape-1-2',
        number: 2,
        title: 'Communication et Motivation',
        duration: '2 semaines',
        unlocked: true,
        completed: false,
        progression_mode: 'FLEXIBLE' as const,
        lecons: [
          { id: 'lecon-1-2-1', number: 1, title: 'Motivation et Engagement', description: 'Comprenez les mécanismes de motivation et d\'engagement d\'une équipe performante.', duration: '50 min', completed: true },
          { id: 'lecon-1-2-2', number: 2, title: 'Communication Efficace', description: 'Maîtrisez les techniques de communication de leader à fort impact.', duration: '1h', completed: false },
          { id: 'lecon-1-2-3', number: 3, title: 'Gestion des Conflits', description: 'Résolvez les conflits de manière constructive pour renforcer la cohésion.', duration: '55 min', completed: false },
        ],
        progress: { completed: 1, total: 3, percentage: 33 },
      },
      {
        id: 'etape-1-3',
        number: 3,
        title: 'Développement et Culture',
        duration: '2 semaines',
        unlocked: false,
        completed: false,
        progression_mode: 'FREE' as const,
        lecons: [
          { id: 'lecon-1-3-1', number: 1, title: 'Délégation et Autonomisation', description: 'Apprenez à déléguer efficacement et développer vos collaborateurs.', duration: '50 min', completed: false },
          { id: 'lecon-1-3-2', number: 2, title: 'Feedback et Développement', description: 'Donnez un feedback constructif et facilitez la croissance professionnelle.', duration: '1h 10min', completed: false },
          { id: 'lecon-1-3-3', number: 3, title: 'Culture et Valeurs', description: 'Créez une culture organisationnelle forte et alignée sur vos valeurs.', duration: '1h 15min', completed: false },
        ],
        progress: { completed: 0, total: 3, percentage: 0 },
      },
    ],
    finalProject: {
      id: 'project-1',
      title: 'Projet Final : Plan de Leadership',
      description: 'Développez un plan d\'action concret pour appliquer vos apprentissages dans votre contexte professionnel.',
      ctaText: 'Commencer le projet',
      locked: false,
    },
    complementaryContent: [
      { id: 'comp-1-1', title: 'Guide : Les 5 Styles de Leadership', description: 'Un guide complet explorant les différents styles de leadership et comment les appliquer.', duration: '15 min', kind: 'guide', tone: 'primary' },
      { id: 'comp-1-2', title: 'Vidéo : Présence Leadership', description: 'Une interview d\'experts sur la présence et l\'impact du leader.', duration: '12 min', kind: 'video', tone: 'warm' },
      { id: 'comp-1-3', title: 'Template : Plan de Vision', description: 'Un modèle pour créer votre déclaration de vision personnelle.', duration: '8 min', kind: 'template', tone: 'sun' },
      { id: 'comp-1-4', title: 'Podcast : Leaders Inspirants', description: 'Écoutez des histoires de leaders qui ont transformé leurs organisations.', duration: '25 min', kind: 'podcast', tone: 'primary' },
      { id: 'comp-1-5', title: 'Exercice : Feedback 360', description: 'Un outil interactif pour recevoir du feedback de vos pairs.', duration: '20 min', kind: 'exercise', tone: 'warm' },
    ],
    progress: { completed: 4, total: 9, percentage: 44 },
  },
  '2': {
    id: '2',
    title: 'Communication Efficace',
    description: 'Maîtrisez les techniques de communication interpersonnelle pour améliorer vos relations professionnelles.',
    instructor: 'Jean Martin',
    level: 'intermédiaire',
    duration: '4 semaines',
    category: 'Soft Skills',
    backUrl: '/learning-paths',
    etapes: [
      {
        id: 'etape-2-1',
        number: 1,
        title: 'Fondamentaux de la Communication',
        duration: '1 semaine',
        unlocked: true,
        completed: true,
        progression_mode: 'STRICT' as const,
        lecons: [
          { id: 'lecon-2-1-1', number: 1, title: 'Les Fondamentaux de la Communication', description: 'Comprendre le modèle de communication et ses composantes essentielles.', duration: '45 min', completed: true },
          { id: 'lecon-2-1-2', number: 2, title: 'Écoute Active', description: 'Développez l\'écoute active et empathique pour mieux comprendre vos interlocuteurs.', duration: '1h', completed: true },
        ],
        progress: { completed: 2, total: 2, percentage: 100 },
      },
      {
        id: 'etape-2-2',
        number: 2,
        title: 'Expression et Assertion',
        duration: '1 semaine',
        unlocked: true,
        completed: true,
        progression_mode: 'STRICT' as const,
        lecons: [
          { id: 'lecon-2-2-1', number: 1, title: 'Expression Claire', description: 'Exprimez-vous avec clarté et impact dans vos interactions professionnelles.', duration: '1h', completed: true },
          { id: 'lecon-2-2-2', number: 2, title: 'Langage Non-Verbal', description: 'Maîtrisez votre langage corporel pour renforcer vos messages.', duration: '50 min', completed: true },
          { id: 'lecon-2-2-3', number: 3, title: 'Communication Assertive', description: 'Affirmez-vous sans agressivité dans toutes les situations professionnelles.', duration: '55 min', completed: true },
        ],
        progress: { completed: 3, total: 3, percentage: 100 },
      },
      {
        id: 'etape-2-3',
        number: 3,
        title: 'Feedback et Résolution',
        duration: '1 semaine',
        unlocked: true,
        completed: true,
        progression_mode: 'FREE' as const,
        lecons: [
          { id: 'lecon-2-3-1', number: 1, title: 'Gestion des Objections', description: 'Répondez aux préoccupations de manière constructive et positive.', duration: '1h', completed: true },
          { id: 'lecon-2-3-2', number: 2, title: 'Feedback Constructif', description: 'Donnez et recevez du feedback efficacement pour progresser ensemble.', duration: '55 min', completed: true },
          { id: 'lecon-2-3-3', number: 3, title: 'Synthèse et Pratique', description: 'Appliquez vos apprentissages dans des situations professionnelles réelles.', duration: '1h 15min', completed: true },
        ],
        progress: { completed: 3, total: 3, percentage: 100 },
      },
    ],
    finalProject: {
      id: 'project-2',
      title: 'Projet Final : Communication Appliquée',
      description: 'Créez un plan d\'amélioration de communication pour une situation réelle de votre quotidien professionnel.',
      ctaText: 'Commencer le projet',
      locked: false,
    },
    complementaryContent: [
      { id: 'comp-2-1', title: 'Guide : Langage Corporel', description: 'Un guide détaillé sur l\'importance du langage corporel en communication.', duration: '18 min', kind: 'guide', tone: 'warm' },
      { id: 'comp-2-2', title: 'Vidéo : Écoute Active', description: 'Démonstration pratique des techniques d\'écoute active.', duration: '14 min', kind: 'video', tone: 'primary' },
      { id: 'comp-2-3', title: 'Quiz : Styles de Communication', description: 'Testez vos connaissances sur les différents styles de communication.', duration: '10 min', kind: 'exercise', tone: 'sun' },
      { id: 'comp-2-4', title: 'Podcast : Conversations Difficiles', description: 'Comment gérer les conversations délicates avec confiance et bienveillance.', duration: '22 min', kind: 'podcast', tone: 'warm' },
    ],
    progress: { completed: 8, total: 8, percentage: 100 },
  },
  '3': {
    id: '3',
    title: 'Gestion de Projet Agile',
    description: 'Découvrez les méthodologies agiles et apprenez à piloter vos projets de manière flexible et efficace.',
    instructor: 'Pierre Leclerc',
    level: 'intermédiaire',
    duration: '8 semaines',
    category: 'Project Management',
    backUrl: '/learning-paths',
    etapes: [
      {
        id: 'etape-3-1', number: 1, title: 'Fondamentaux Agile & Scrum', duration: '2 semaines', unlocked: true, completed: true,
        lecons: [
          { id: 'lecon-3-1-1', number: 1, title: 'Introduction à l\'Agile', description: 'Les valeurs et principes du Manifeste Agile.', duration: '45 min', completed: true },
          { id: 'lecon-3-1-2', number: 2, title: 'Le Framework Scrum', description: 'Rôles, artefacts et cérémonies Scrum.', duration: '1h', completed: true },
          { id: 'lecon-3-1-3', number: 3, title: 'Kanban et Lean', description: 'Optimisation du flux de travail avec Kanban.', duration: '50 min', completed: true },
        ],
        progress: { completed: 3, total: 3, percentage: 100 },
      },
      {
        id: 'etape-3-2', number: 2, title: 'Planification et Estimation', duration: '3 semaines', unlocked: true, completed: false,
        lecons: [
          { id: 'lecon-3-2-1', number: 1, title: 'Backlog et User Stories', description: 'Rédiger des user stories efficaces.', duration: '55 min', completed: false },
          { id: 'lecon-3-2-2', number: 2, title: 'Estimation Agile', description: 'Techniques de planning poker et points de story.', duration: '1h', completed: false },
          { id: 'lecon-3-2-3', number: 3, title: 'Sprint Planning', description: 'Organiser et lancer un sprint réussi.', duration: '1h 10min', completed: false },
        ],
        progress: { completed: 0, total: 3, percentage: 0 },
      },
      {
        id: 'etape-3-3', number: 3, title: 'Pilotage et Rétrospectives', duration: '3 semaines', unlocked: false, completed: false,
        lecons: [
          { id: 'lecon-3-3-1', number: 1, title: 'Suivi de la vélocité', description: 'Mesurer et améliorer la vélocité de l\'équipe.', duration: '45 min', completed: false },
          { id: 'lecon-3-3-2', number: 2, title: 'Rétrospective efficace', description: 'Animer des rétrospectives pour améliorer en continu.', duration: '1h', completed: false },
        ],
        progress: { completed: 0, total: 2, percentage: 0 },
      },
    ],
    finalProject: { id: 'project-3', title: 'Projet Final : Sprint Complet', description: 'Planifiez et simulez un sprint complet en équipe virtuelle.', ctaText: 'Lancer le projet', locked: true },
    complementaryContent: [
      { id: 'comp-3-1', title: 'Guide : Scrum en pratique', description: 'Un guide complet pour implémenter Scrum dans votre équipe.', duration: '20 min', kind: 'guide', tone: 'warm' },
      { id: 'comp-3-2', title: 'Template : Tableau Kanban', description: 'Un template prêt à l\'emploi pour gérer votre backlog.', duration: '5 min', kind: 'template', tone: 'primary' },
    ],
    progress: { completed: 3, total: 8, percentage: 38 },
  },
  '4': {
    id: '4',
    title: 'Intelligence Émotionnelle en Entreprise',
    description: 'Développez votre intelligence émotionnelle pour mieux gérer le stress et les relations interpersonnelles.',
    instructor: 'Sophie Bernard',
    level: 'avancé',
    duration: '6 semaines',
    category: 'Soft Skills',
    backUrl: '/learning-paths',
    etapes: [
      {
        id: 'etape-4-1', number: 1, title: 'Comprendre les Émotions', duration: '2 semaines', unlocked: true, completed: false,
        lecons: [
          { id: 'lecon-4-1-1', number: 1, title: 'Les 4 composantes de l\'IE', description: 'Conscience de soi, maîtrise de soi, empathie, compétences sociales.', duration: '50 min', completed: false },
          { id: 'lecon-4-1-2', number: 2, title: 'Identifier ses émotions', description: 'Techniques pour reconnaître et nommer ses états émotionnels.', duration: '45 min', completed: false },
        ],
        progress: { completed: 0, total: 2, percentage: 0 },
      },
      {
        id: 'etape-4-2', number: 2, title: 'Régulation et Leadership', duration: '4 semaines', unlocked: false, completed: false,
        lecons: [
          { id: 'lecon-4-2-1', number: 1, title: 'Gérer le stress professionnel', description: 'Stratégies de régulation émotionnelle pour les managers.', duration: '1h', completed: false },
          { id: 'lecon-4-2-2', number: 2, title: 'Empathie au travail', description: 'Développer l\'empathie pour renforcer la cohésion d\'équipe.', duration: '55 min', completed: false },
        ],
        progress: { completed: 0, total: 2, percentage: 0 },
      },
    ],
    finalProject: { id: 'project-4', title: 'Plan de Développement Émotionnel', description: 'Créez votre plan personnalisé de développement en IE.', ctaText: 'Démarrer le plan', locked: true },
    complementaryContent: [
      { id: 'comp-4-1', title: 'Podcast : L\'IE en leadership', description: 'Interviews de leaders sur leur intelligence émotionnelle.', duration: '28 min', kind: 'podcast', tone: 'sun' },
    ],
    progress: { completed: 0, total: 4, percentage: 0 },
  },
  '5': {
    id: '5',
    title: 'Prise de Décision Stratégique',
    description: 'Apprenez un cadre structuré pour prendre des décisions stratégiques complexes et assurer leur mise en œuvre.',
    instructor: 'Marc Rousseau',
    level: 'avancé',
    duration: '8 semaines',
    category: 'Strategic Thinking',
    backUrl: '/learning-paths',
    etapes: [
      {
        id: 'etape-5-1', number: 1, title: 'Cadres de décision', duration: '3 semaines', unlocked: true, completed: false,
        lecons: [
          { id: 'lecon-5-1-1', number: 1, title: 'Biais cognitifs et décision', description: 'Identifier et contourner les biais dans la prise de décision.', duration: '1h', completed: false },
          { id: 'lecon-5-1-2', number: 2, title: 'Analyse SWOT avancée', description: 'Utiliser le SWOT pour des décisions stratégiques complexes.', duration: '50 min', completed: false },
          { id: 'lecon-5-1-3', number: 3, title: 'Matrice de décision', description: 'Pondérer et comparer des options stratégiques.', duration: '45 min', completed: false },
        ],
        progress: { completed: 0, total: 3, percentage: 0 },
      },
      {
        id: 'etape-5-2', number: 2, title: 'Mise en œuvre stratégique', duration: '5 semaines', unlocked: false, completed: false,
        lecons: [
          { id: 'lecon-5-2-1', number: 1, title: 'De la décision à l\'action', description: 'Transformer les décisions en plans d\'action concrets.', duration: '1h 10min', completed: false },
          { id: 'lecon-5-2-2', number: 2, title: 'Gestion du changement', description: 'Accompagner les équipes dans la mise en œuvre.', duration: '1h', completed: false },
        ],
        progress: { completed: 0, total: 2, percentage: 0 },
      },
    ],
    finalProject: { id: 'project-5', title: 'Cas Pratique Stratégique', description: 'Analysez un cas réel et proposez un plan de décision structuré.', ctaText: 'Accéder au cas', locked: true },
    complementaryContent: [
      { id: 'comp-5-1', title: 'Guide : Frameworks de décision', description: 'Panorama des 10 meilleurs frameworks de prise de décision.', duration: '22 min', kind: 'guide', tone: 'primary' },
      { id: 'comp-5-2', title: 'Exercice : Simulation décisionnelle', description: 'Mettez-vous dans la peau d\'un décideur stratégique.', duration: '30 min', kind: 'exercise', tone: 'warm' },
    ],
    progress: { completed: 0, total: 5, percentage: 0 },
  },
  '6': {
    id: '6',
    title: 'Transformation Digitale et Innovation',
    description: 'Explorez comment piloter la transformation digitale et créer une culture d\'innovation durable.',
    instructor: 'Isabelle Fontaine',
    level: 'avancé',
    duration: '10 semaines',
    category: 'Digital',
    backUrl: '/learning-paths',
    etapes: [
      {
        id: 'etape-6-1', number: 1, title: 'Digital & Stratégie', duration: '3 semaines', unlocked: true, completed: true,
        lecons: [
          { id: 'lecon-6-1-1', number: 1, title: 'Enjeux de la transformation digitale', description: 'Comprendre les forces qui transforment les organisations.', duration: '1h', completed: true },
          { id: 'lecon-6-1-2', number: 2, title: 'Construire une feuille de route digitale', description: 'Méthode pour créer votre roadmap de transformation.', duration: '1h 15min', completed: true },
        ],
        progress: { completed: 2, total: 2, percentage: 100 },
      },
      {
        id: 'etape-6-2', number: 2, title: 'Culture de l\'Innovation', duration: '4 semaines', unlocked: true, completed: false,
        lecons: [
          { id: 'lecon-6-2-1', number: 1, title: 'Design Thinking', description: 'Appliquer le design thinking pour innover en équipe.', duration: '1h 20min', completed: false },
          { id: 'lecon-6-2-2', number: 2, title: 'Créer un lab d\'innovation', description: 'Structurer et animer un espace dédié à l\'innovation.', duration: '55 min', completed: false },
        ],
        progress: { completed: 0, total: 2, percentage: 0 },
      },
      {
        id: 'etape-6-3', number: 3, title: 'Pilotage et Mesure', duration: '3 semaines', unlocked: false, completed: false,
        lecons: [
          { id: 'lecon-6-3-1', number: 1, title: 'KPIs de transformation', description: 'Définir et suivre les indicateurs clés du changement digital.', duration: '50 min', completed: false },
          { id: 'lecon-6-3-2', number: 2, title: 'Communication du changement', description: 'Mobiliser les parties prenantes autour de la transformation.', duration: '45 min', completed: false },
        ],
        progress: { completed: 0, total: 2, percentage: 0 },
      },
    ],
    finalProject: { id: 'project-6', title: 'Plan de Transformation Digitale', description: 'Rédigez un plan de transformation digitale pour votre organisation.', ctaText: 'Créer mon plan', locked: false },
    complementaryContent: [
      { id: 'comp-6-1', title: 'Guide : Les 7 piliers du digital', description: 'Les dimensions clés pour réussir sa transformation.', duration: '18 min', kind: 'guide', tone: 'primary' },
      { id: 'comp-6-2', title: 'Vidéo : Cas de transformation réussie', description: 'Étude de cas d\'une transformation digitale exemplaire.', duration: '15 min', kind: 'video', tone: 'warm' },
      { id: 'comp-6-3', title: 'Template : Roadmap digitale', description: 'Modèle prêt à utiliser pour votre feuille de route.', duration: '10 min', kind: 'template', tone: 'sun' },
    ],
    progress: { completed: 2, total: 6, percentage: 33 },
  },
  'bootcamp': {
    id: 'bootcamp',
    title: 'UX/UI Design System Bootcamp',
    description: 'Master design systems by building the Learning App frontend, then apply to SBO, Site, Logo, and Procreate. Learn design tokens, React components, animations, and WCAG AA accessibility in 12 weeks.',
    instructor: 'Design System Mastery Team',
    level: 'avancé',
    duration: '12 semaines',
    category: 'Design Systems & Frontend',
    backUrl: '/learning-paths',
    etapes: [
      {
        id: 'bootcamp-etape-1',
        number: 1,
        title: 'Semaine 1: Fondamentaux du Design System',
        duration: '1 semaine',
        unlocked: true,
        completed: false,
        progression_mode: 'STRICT' as const,
        description: 'Maîtrisez les tokens de design, l\'architecture Figma et la méthodologie Design System',
        competenceIds: ['design_systems', 'figma_mastery'],
        lecons: [
          { id: 'bootcamp-lecon-1-1', number: 1, title: 'Design System Fundamentals', description: 'Comprendre tokens, composants et la méthodologie Design System (Figma → CSS → React)', duration: '2h', completed: false },
          { id: 'bootcamp-lecon-1-2', number: 2, title: 'Figma Design System Setup', description: 'Créer variables Figma, text styles et component bindings', duration: '1h', completed: false },
          { id: 'bootcamp-lecon-1-3', number: 3, title: 'Information Architecture Mapping', description: 'Mapper les utilisateurs, flows et 20 écrans MVP de la Learning App', duration: '5h', completed: false },
          { id: 'bootcamp-lecon-1-4', number: 4, title: 'Interaction Patterns & Component Specs', description: 'Documenter les patterns (forms, modals, scroll-reveals, micro-interactions)', duration: '4h', completed: false },
          { id: 'bootcamp-lecon-1-5', number: 5, title: 'Wireframing 5 Critical Screens', description: 'Créer wireframes pour Dashboard, Passeport, Lesson Player, Coaching, Journal', duration: '6h', completed: false },
          { id: 'bootcamp-lecon-1-6', number: 6, title: 'Design Polish (Direction C)', description: 'Appliquer l\'esthétique Direction C (Illustrated Glass, warm, premium)', duration: '3h', completed: false },
          { id: 'bootcamp-lecon-1-7', number: 7, title: 'Week 1 Review & Component Specs', description: 'Réviser et documenter les spécifications des composants', duration: '2h', completed: false },
        ],
        progress: { completed: 0, total: 7, percentage: 0 },
      },
      {
        id: 'bootcamp-etape-2',
        number: 2,
        title: 'Semaines 2-3: Design Polish & Interactive Prototype',
        duration: '2 semaines',
        unlocked: false,
        completed: false,
        progression_mode: 'STRICT' as const,
        description: 'Créer 10 écrans haute-fidélité en Figma avec prototype cliquable',
        competenceIds: ['figma_mastery', 'wcag_accessibility'],
        lecons: [
          { id: 'bootcamp-lecon-2-1', number: 1, title: 'High-Fidelity Design Sprint', description: 'Conception haute-fidélité de tous les 10 écrans MVP (Dashboard, Passeport, Lesson Player, etc.)', duration: '5h', completed: false },
          { id: 'bootcamp-lecon-2-2', number: 2, title: 'Interactive Prototype in Figma', description: 'Créer prototype cliquable avec flows utilisateur complètes', duration: '6h', completed: false },
          { id: 'bootcamp-lecon-2-3', number: 3, title: 'Responsive Design (Mobile/Tablet/Desktop)', description: 'Adapter les designs pour tous les breakpoints (375px, 768px, 1024px+)', duration: '4h', completed: false },
          { id: 'bootcamp-lecon-2-4', number: 4, title: 'Accessibility Audit (WCAG AA)', description: 'Vérifier contraste, focus indicators, form labels, keyboard nav', duration: '4h', completed: false },
        ],
        progress: { completed: 0, total: 4, percentage: 0 },
      },
      {
        id: 'bootcamp-etape-3',
        number: 3,
        title: 'Semaine 4: React Build - Tier 1 Components',
        duration: '1 semaine',
        unlocked: false,
        completed: false,
        progression_mode: 'FLEXIBLE' as const,
        description: 'Construire la bibliothèque de composants réutilisables et 3 écrans live',
        competenceIds: ['react_architecture'],
        lecons: [
          { id: 'bootcamp-lecon-3-1', number: 1, title: 'React Component Architecture', description: 'Structurer src/components/ avec common/, learning-app/, marketing-site/', duration: '5h', completed: false },
          { id: 'bootcamp-lecon-3-2', number: 2, title: 'Build Component Library', description: 'Créer Button, Card, Input, Modal, Badge, ProgressBar composants', duration: '5h', completed: false },
          { id: 'bootcamp-lecon-3-3', number: 3, title: 'Dashboard & Passeport Screens', description: 'Implémenter Dashboard (hero, stats, recommandations) et Passeport (grille, color-coding)', duration: '5h', completed: false },
        ],
        progress: { completed: 0, total: 3, percentage: 0 },
      },
      {
        id: 'bootcamp-etape-4',
        number: 4,
        title: 'Semaines 5-6: React Build Tier 2 + Animations + Launch',
        duration: '2 semaines',
        unlocked: false,
        completed: false,
        progression_mode: 'FLEXIBLE' as const,
        description: '8-10 écrans live, animations Framer Motion, WCAG AA, performance',
        competenceIds: ['react_architecture', 'animations', 'wcag_accessibility'],
        lecons: [
          { id: 'bootcamp-lecon-4-1', number: 1, title: 'Lesson Player & Coaching Components', description: 'Vidéo player, sidebar, reflection textarea, forms 3-step', duration: '5h', completed: false },
          { id: 'bootcamp-lecon-4-2', number: 2, title: 'Remaining Screens (Journal, Veille, Leaderboard, Profile)', description: 'Compléter les 8-10 écrans avec formes et interactions', duration: '5h', completed: false },
          { id: 'bootcamp-lecon-4-3', number: 3, title: 'Framer Motion Animations & Micro-Interactions', description: 'Ajouter scroll-reveals, button hover, card animations avec spring physics', duration: '5h', completed: false },
          { id: 'bootcamp-lecon-4-4', number: 4, title: 'Loading/Error/Empty States', description: 'Créer skeleton loaders, error messages, empty state CTAs', duration: '4h', completed: false },
          { id: 'bootcamp-lecon-4-5', number: 5, title: 'QA & Accessibility Testing (WCAG AA)', description: 'Tester keyboard nav, screen reader, contraste, touch targets (44px min)', duration: '6h', completed: false },
          { id: 'bootcamp-lecon-4-6', number: 6, title: 'Performance Audit & Final Polish', description: 'Lighthouse 90+, Core Web Vitals, refactor optimisations', duration: '3h', completed: false },
          { id: 'bootcamp-lecon-4-7', number: 7, title: 'Learning App MVP - SHIP!', description: 'Documentation finale, déploiement, lancement learning app MVP', duration: '2h', completed: false },
        ],
        progress: { completed: 0, total: 7, percentage: 0 },
      },
      {
        id: 'bootcamp-etape-5',
        number: 5,
        title: 'Semaines 7-8: Phase 2A - SBO Section (Parallel Build)',
        duration: '2 semaines',
        unlocked: false,
        completed: false,
        progression_mode: 'FLEXIBLE' as const,
        description: 'Appliquer les composants Learning App pour refondre la section SBO',
        competenceIds: ['react_architecture', 'design_systems'],
        lecons: [
          { id: 'bootcamp-lecon-5-1', number: 1, title: 'SBO Design: Hero, Stats, Services, Timeline', description: 'Concevoir 5 écrans SBO en Figma (réutiliser tokens + composants)', duration: '5h', completed: false },
          { id: 'bootcamp-lecon-5-2', number: 2, title: 'SBO Build: Component Reuse Strategy', description: 'Importer Button, Card, Badge du Learning App, créer ServiceCard, StatCard, TimelineNode', duration: '5h', completed: false },
          { id: 'bootcamp-lecon-5-3', number: 3, title: 'SBO Animations & Responsive Design', description: 'Ajouter scroll-reveals, timeline line draw animation, responsive collapse', duration: '4h', completed: false },
          { id: 'bootcamp-lecon-5-4', number: 4, title: 'SBO Final Polish & QA', description: 'Tester WCAG AA, performance, copie « vous » register, intégration site', duration: '3h', completed: false },
        ],
        progress: { completed: 0, total: 4, percentage: 0 },
      },
      {
        id: 'bootcamp-etape-6',
        number: 6,
        title: 'Semaines 9-12: Phase 2B-E - Site Refonte + Procreate + Logo Animations',
        duration: '4 semaines',
        unlocked: false,
        completed: false,
        progression_mode: 'FREE' as const,
        description: 'Refonte site complet, assets Procreate, logo animations, Figma mastery',
        competenceIds: ['design_systems', 'react_architecture', 'animations', 'procreate_illustrations'],
        lecons: [
          { id: 'bootcamp-lecon-6-1', number: 1, title: 'Site Refonte: Design & Component Audit', description: 'Analyser Home, Formation, Blog et refondre avec composants partagés', duration: '4h', completed: false },
          { id: 'bootcamp-lecon-6-2', number: 2, title: 'Site Build: Pages avec Shared Components', description: 'Formation page (LessonCard pattern), Blog (Card pattern), Contact (Input+Button)', duration: '8h', completed: false },
          { id: 'bootcamp-lecon-6-3', number: 3, title: 'Procreate: Hero Gradient & Assets', description: 'Créer gradient hero chaud (watercolor), blobs doux, STRIDE diagram, Passeport spiral', duration: '10h', completed: false },
          { id: 'bootcamp-lecon-6-4', number: 4, title: 'Logo Animations: 3 Variants (Breathing, Color-Flow, Morphing)', description: 'Implémenter avec Framer Motion, spring physics, 60fps', duration: '4h', completed: false },
          { id: 'bootcamp-lecon-6-5', number: 5, title: 'Figma Design System: Mastery & Parity Audit', description: 'Variables complètes, text style bindings, component instances, token audit', duration: '6h', completed: false },
          { id: 'bootcamp-lecon-6-6', number: 6, title: 'Final Integration & Launch', description: 'Assets Procreate → Figma, Logo animations → site, QA globale, déploiement', duration: '8h', completed: false },
          { id: 'bootcamp-lecon-6-7', number: 7, title: 'Retrospective & Mastery Milestone', description: 'Documenter learnings, célébrer 12 semaines, valider competences acquises', duration: '2h', completed: false },
        ],
        progress: { completed: 0, total: 7, percentage: 0 },
      },
    ],
    finalProject: {
      id: 'bootcamp-project',
      title: 'Projet Final: Design System Produit (Learning App + SBO + Site)',
      description: 'Livrer un design system complet et une Learning App frontend production-ready, appliqué à 5 projects (Learning App, SBO, Site, Logo, Procreate).',
      ctaText: 'Commencer le projet',
      locked: false,
    },
    complementaryContent: [
      { id: 'bootcamp-comp-1', title: 'Guide: Design Tokens 101', description: 'Comprendre la hiérarchie et la flow des tokens (Figma → CSS → Tailwind)', duration: '20 min', kind: 'guide', tone: 'primary' },
      { id: 'bootcamp-comp-2', title: 'Figma Tutorial: Variables & Text Styles', description: 'Configurer variables et text style bindings dans Figma', duration: '18 min', kind: 'video', tone: 'warm' },
      { id: 'bootcamp-comp-3', title: 'Template: Component Library Template', description: 'Modèle React pour structures réutilisables des composants', duration: '15 min', kind: 'template', tone: 'sun' },
      { id: 'bootcamp-comp-4', title: 'Podcast: Design System Leaders', description: 'Interviews d\'experts en design systems (Apple, Shopify, Vercel)', duration: '35 min', kind: 'podcast', tone: 'warm' },
      { id: 'bootcamp-comp-5', title: 'Exercice: Build Your First Component', description: 'Atelier pratique: créer un Button component avec Figma + React', duration: '45 min', kind: 'exercise', tone: 'primary' },
    ],
    progress: { completed: 0, total: 34, percentage: 0 },
  },
};

/** Resolve tone from level */
export const getToneFromLevel = (level: Parcours['level']): Tone => {
  if (level === 'intermédiaire') return 'warm';
  if (level === 'avancé') return 'sun';
  return 'primary';
};

/** Find a lesson by ID across all parcours */
export interface LessonContext {
  parcours: Parcours;
  step: Etape;
  stepIndex: number;
  lesson: Lecon;
  lessonIndex: number;
  prevLesson: { pathId: string; lessonId: string; title: string } | null;
  nextLesson: { pathId: string; lessonId: string; title: string } | null;
}

/** Return the id of the first lesson of a parcours (or null if path/data missing). */
export function getFirstLessonId(pathId: string): string | null {
  const parcours = MOCK_PARCOURS_DATA[pathId];
  if (!parcours) return null;
  const firstStep = parcours.etapes[0];
  if (!firstStep || firstStep.lecons.length === 0) return null;
  return firstStep.lecons[0].id;
}

export function resolveLessonContext(pathId: string, lessonId: string): LessonContext | null {
  const parcours = MOCK_PARCOURS_DATA[pathId];
  if (!parcours) return null;

  for (let si = 0; si < parcours.etapes.length; si++) {
    const step = parcours.etapes[si];
    for (let li = 0; li < step.lecons.length; li++) {
      const lesson = step.lecons[li];
      if (lesson.id !== lessonId) continue;

      // Previous lesson (look backwards within step, then prev step)
      let prevLesson: LessonContext['prevLesson'] = null;
      if (li > 0) {
        const pl = step.lecons[li - 1];
        prevLesson = { pathId, lessonId: pl.id, title: pl.title };
      } else if (si > 0) {
        const ps = parcours.etapes[si - 1];
        const pl = ps.lecons[ps.lecons.length - 1];
        prevLesson = { pathId, lessonId: pl.id, title: pl.title };
      }

      // Next lesson (look forward within step, then next step)
      let nextLesson: LessonContext['nextLesson'] = null;
      if (li < step.lecons.length - 1) {
        const nl = step.lecons[li + 1];
        nextLesson = { pathId, lessonId: nl.id, title: nl.title };
      } else if (si < parcours.etapes.length - 1) {
        const ns = parcours.etapes[si + 1];
        if (ns.unlocked) {
          const nl = ns.lecons[0];
          nextLesson = { pathId, lessonId: nl.id, title: nl.title };
        }
      }

      return { parcours, step, stepIndex: si, lesson, lessonIndex: li, prevLesson, nextLesson };
    }
  }
  return null;
}

// ─── Cahier #01 metadata sidecar (Phase 16.1.1) ─────────────────────────────
//
// Mapping parcoursId → metadata pour les nouveaux champs de Cahier #01.
// Sidecar plutôt que d'enrichir chaque MOCK_PARCOURS_DATA pour limiter le diff.
// `getXxx(parcoursId)` retourne une valeur par défaut si absent.

interface ParcoursMeta {
  progressionMode: ProgressionMode;
  tierGate: SubscriptionTier[];
  scope: ParcoursScope;
  /**
   * Compétences agrégées du parcours (depuis ses étapes).
   * Sert à l'auto-gen du questionnaire de positionnement (1 Q par compétence).
   */
  competenceIds: string[];
}

const PARCOURS_META: Record<string, ParcoursMeta> = {
  '1': {
    progressionMode: 'STRICT',
    tierGate: ['plan_1', 'plan_2', 'plan_3', 'enterprise_standard', 'enterprise_premium', 'enterprise_custom'],
    scope: 'Global',
    competenceIds: ['leadership', 'communication', 'strategy'],
  },
  '2': {
    progressionMode: 'FLEXIBLE',
    tierGate: ['plan_1', 'plan_2', 'plan_3', 'enterprise_standard', 'enterprise_premium', 'enterprise_custom'],
    scope: 'Global',
    competenceIds: ['communication', 'empathy', 'negotiation'],
  },
  '3': {
    progressionMode: 'STRICT',
    tierGate: ['plan_2', 'plan_3', 'enterprise_premium', 'enterprise_custom'],
    scope: 'Global',
    competenceIds: ['analyse', 'data', 'critical_thinking'],
  },
  '4': {
    progressionMode: 'FREE',
    tierGate: [], // accessible à tous (y compris Plan Gratuit)
    scope: 'Global',
    competenceIds: ['ai_tools', 'tech_tools', 'automation'],
  },
  '5': {
    progressionMode: 'STRICT',
    tierGate: ['plan_1', 'plan_2', 'plan_3', 'enterprise_standard', 'enterprise_premium', 'enterprise_custom'],
    scope: 'Global',
    competenceIds: ['product', 'strategy', 'data'],
  },
  '6': {
    progressionMode: 'FLEXIBLE',
    tierGate: ['plan_2', 'plan_3', 'enterprise_premium', 'enterprise_custom'],
    scope: 'Global',
    competenceIds: ['creativity', 'adaptability', 'cooperation'],
  },
  'bootcamp': {
    progressionMode: 'STRICT',
    tierGate: [],
    scope: 'Global',
    competenceIds: ['design_systems', 'figma_mastery', 'react_architecture', 'animations', 'wcag_accessibility', 'procreate_illustrations'],
  },
};

const DEFAULT_META: ParcoursMeta = {
  progressionMode: 'STRICT',
  tierGate: [],
  scope: 'Global',
  competenceIds: [],
};

export function getParcoursProgressionMode(parcoursId: string): ProgressionMode {
  return PARCOURS_META[parcoursId]?.progressionMode ?? DEFAULT_META.progressionMode;
}

export function getParcoursTierGate(parcoursId: string): SubscriptionTier[] {
  return PARCOURS_META[parcoursId]?.tierGate ?? DEFAULT_META.tierGate;
}

export function getParcoursScope(parcoursId: string): ParcoursScope {
  return PARCOURS_META[parcoursId]?.scope ?? DEFAULT_META.scope;
}

/**
 * Compétences du parcours = agrégation des étapes (ou fallback sidecar PARCOURS_META).
 * Utilisé par PositionnementModal pour auto-générer 1 question par compétence.
 */
export function getParcoursCompetenceIds(parcoursId: string): string[] {
  const parcours = MOCK_PARCOURS_DATA[parcoursId];
  if (!parcours) return [];

  // Agrégation depuis etapes[].competenceIds si défini
  const fromEtapes = new Set<string>();
  parcours.etapes.forEach((etape) => {
    etape.competenceIds?.forEach((id) => fromEtapes.add(id));
  });

  if (fromEtapes.size > 0) return Array.from(fromEtapes);

  // Fallback sur sidecar
  return PARCOURS_META[parcoursId]?.competenceIds ?? [];
}
