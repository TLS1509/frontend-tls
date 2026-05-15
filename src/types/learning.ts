/**
 * Shared types for Cahier #01 (Parcours & Learning Space) + #02 (Passeport)
 * compliance. Introduced in Phase 16.1.1.
 *
 * Backend is mocked in src/data/* — these types document the contract.
 */

// ─── Compétences (Cahier #02 Passeport H.S.O.) ───────────────────────────────

/**
 * H.S.O. = Humain / Savoirs / Organisation (Cahier #02 § Vue d'Ensemble).
 * Domaine racine d'une compétence du référentiel.
 */
export type CompetenceDomain = 'Humain' | 'Savoirs' | 'Organisation';

/** Catégorie de niveau (Cahier #02 — `level_category`) */
export type LevelCategory = 'Base' | 'Avancée' | 'Spécialisée';

/** Dreyfus 1–5 : Novice → Apprenant → Compétent → Expert → Maître (FR, Cahier #02) */
export type DreyfusLevel = 1 | 2 | 3 | 4 | 5;

/** Libellés FR des 5 niveaux Dreyfus (Cahier #02 § DreyfusLevel.label) */
export type DreyfusLabel = 'Novice' | 'Apprenant' | 'Compétent' | 'Expert' | 'Maître';

/**
 * Définition d'un niveau Dreyfus pour une compétence donnée
 * (Cahier #02 § Entité 2 DreyfusLevel).
 */
export interface DreyfusLevelDef {
  level: DreyfusLevel;
  label: DreyfusLabel;
  /** Définition du niveau (ce qu'il faut savoir faire) */
  criteria: string;
  /** Indicateurs de succès (liste) */
  indicators?: string[];
}

export interface Competence {
  id: string;
  /** Nom compétence (ex: "Prise de Décision") — Cahier #02 § Entité 1 Competence.name */
  label: string;
  /** Domaine racine H.S.O. — Cahier #02 § Competence.domain */
  domain: CompetenceDomain;
  /** Sous-domaine (ex: "Communication" sous "Humain") — Cahier #02 § Competence.subdomain */
  subdomain?: string;
  /** Catégorie de niveau — Cahier #02 § Competence.level_category */
  levelCategory?: LevelCategory;
  /** Description longue 200-500 mots (Cahier #02 § Competence.description) */
  description?: string;
  /** Définitions par niveau (Cahier #02 § DreyfusLevel). Optionnel en MVP. */
  dreyfusLevels?: DreyfusLevelDef[];
}

// ─── User roles & profile (Cahier #03 Onboarding) ────────────────────────────

/** 5 rôles standardisés plateforme (Cahier #03 § Rôles MVP) */
export type UserRole = 'apprenant' | 'coach' | 'manager' | 'admin' | 'expert';

/** Type de crédit coaching (Cahier #03 § Crédits Classic/Special) */
export type CreditType = 'classic' | 'special';

export interface UserCredits {
  /** Crédits standard — sessions coaching 1h */
  classic: number;
  /** Crédits premium — sessions expert / masterclass */
  special: number;
}

/** Profil utilisateur issu de l'onboarding (Cahier #03 § Profil Mapping) */
export interface UserProfile {
  userId: string;
  firstName: string;
  role: UserRole;
  sector: string;
  goals: string[];
  rhythm: string;
  credits: UserCredits;
  /** Plan souscrit (Cahier #11bis) */
  subscriptionTier: SubscriptionTier;
  completedAt?: string;
}

// ─── Subscription tiers (Cahier #11bis MVP) ──────────────────────────────────

/** Individual + enterprise plans (MVP juillet 2026, Cahier #11bis) */
export type SubscriptionTier =
  | 'free' // Plan Gratuit — 10% contenu, no IA, achat crédits possible
  | 'plan_1' // accès complet au contenu
  | 'plan_2' // accès complet + IA (chatbot, matching)
  | 'plan_3' // accès complet + IA + 1 crédit/mois
  | 'enterprise_standard'
  | 'enterprise_premium'
  | 'enterprise_custom';

/** Plans qui débloquent un item donné. Vide = accessible à tous. */
export type TierGate = SubscriptionTier[];

// ─── Item types (Cahier #01 + #01bis : 9 types MVP) ──────────────────────────

export type ItemType =
  | 'astuces' // micro-conseil rapide
  | 'flashcard' // carte recto-verso
  | 'ressource' // PDF, lien, document
  | 'guide' // tutoriel structuré
  | 'video_conc' // vidéo conceptuelle
  | 'video_geste' // vidéo démo / "comment faire"
  | 'micro_learning' // mini-leçon courte
  | 'mission' // mission apprenante (cf. Cahier #09)
  | 'masterclass'; // session premium (cf. Cahier #08)

// ─── Pré-requis (Cahier #01 — 2 types simples) ───────────────────────────────

/**
 * Type A : compléter un autre item avant d'accéder à celui-ci
 * Type B : avoir atteint un niveau Dreyfus min sur une compétence
 * Si tous les champs sont vides → item accessible (no blocking).
 */
export interface Prerequisites {
  /** Type A — IDs d'items à compléter au préalable */
  itemIds?: string[];
  /** Type B — niveaux Dreyfus min par compétence */
  competencyMinLevel?: { competenceId: string; minLevel: DreyfusLevel }[];
}

// ─── Progression mode (Cahier #01) ───────────────────────────────────────────

/**
 * STRICT   = Étape N+1 verrouillée tant que 100 % de N pas atteint
 * FLEXIBLE = N+1 accessible avant 100 % de N (warning soft)
 * FREE     = libre accès à toutes étapes (no gating)
 */
export type ProgressionMode = 'STRICT' | 'FLEXIBLE' | 'FREE';

// ─── Scope parcours (multi-tenant, Cahier #01 + #06) ─────────────────────────

export type ParcoursScope = 'Global' | 'Company';

// ─── Passeport Compétences (Cahier #02) ──────────────────────────────────────

/**
 * Niveau courant d'un apprenant pour une compétence donnée.
 * Agrégé dans le Passeport (snapshot "maintenant").
 */
export interface LearnerCompetency {
  userId: string;
  competenceId: string;
  /** Niveau Dreyfus actuel (1–5) */
  currentLevel: DreyfusLevel;
  /** Niveau cible (objectif) */
  targetLevel?: DreyfusLevel;
  /** Points XP accumulés sur cette compétence */
  points: number;
  /** Points XP nécessaires pour passer au niveau suivant */
  nextLevelPoints: number;
  /** Jours depuis la dernière activité sur cette compétence (atrophie) */
  daysSinceActivity: number;
  /** ISO timestamp de la dernière mise à jour */
  lastUpdated: string;
}

/**
 * Objectif de montée en niveau sur une compétence.
 * Créé par l'apprenant (ou suggéré par le coach/IA).
 */
export interface CompetencyObjective {
  id: string;
  userId: string;
  competenceId: string;
  /** Niveau Dreyfus à atteindre */
  targetLevel: DreyfusLevel;
  /** Niveau au moment de la création */
  startLevel: DreyfusLevel;
  status: 'active' | 'draft' | 'completed' | 'abandoned';
  /** ISO deadline */
  deadline: string;
  /** Jalons intermédiaires */
  milestones: Array<{
    id: string;
    label: string;
    done: boolean;
  }>;
  /** 0–100 progression % calculée côté FO */
  progressPct: number;
  createdAt: string;
}

/**
 * Événement dans la timeline du Passeport.
 * Représente une progression Dreyfus, JAC validé, mission, ou formation.
 */
export interface CompetencyProgression {
  id: string;
  userId: string;
  type: 'dreyfus-up' | 'jac' | 'mission' | 'formation';
  competenceId: string;
  /** Libellé humain pour affichage timeline */
  title: string;
  detail: string;
  /** Niveau Dreyfus si type = dreyfus-up */
  newLevel?: DreyfusLevel;
  /** ISO date de l'événement */
  occurredAt: string;
}

// ─── Positionnement (résultat utilisateur, Cahier #01) ───────────────────────

export interface PositioningAnswer {
  competenceId: string;
  level: DreyfusLevel;
}

export interface UserPositioningResult {
  userId: string;
  parcoursId: string;
  answers: PositioningAnswer[];
  /** ISO timestamp */
  completedAt: string;
}

// ─── Gamification (Cahier #05 Badges & XP) ───────────────────────────────────

/** 3 types de badges (Cahier #05 § Types Badges) */
export type BadgeType =
  | 'plateforme'  // badges engagement plateforme (streaks, milestones)
  | 'open_badge'  // IMS Open Badges v2, exportables, vérifiables
  | 'competence'; // badges liés au niveau Dreyfus d'une compétence

/** Triggers XP (Cahier #05 § Triggers XP) */
export type XPTrigger =
  | 'lesson_complete'
  | 'parcours_complete'
  | 'coaching_session'
  | 'journal_entry'
  | 'badge_earned'
  | 'quiz_perfect'
  | 'streak_milestone'
  | 'jac_validated'
  | 'dreyfus_up';

export interface XPEvent {
  id: string;
  userId: string;
  trigger: XPTrigger;
  xp: number;
  description: string;
  occurredAt: string;
}

/** Définition d'un badge (référentiel) */
export interface BadgeDef {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  /** Compétence liée (type = 'competence' uniquement) */
  competenceId?: string;
  /** Niveau Dreyfus requis (type = 'competence') */
  dreyfusLevel?: DreyfusLevel;
  xpValue: number;
  criteria: string[];
}

/** Badge gagné par un utilisateur */
export interface UserBadge {
  userId: string;
  badgeId: string;
  earnedAt: string;
  xpAwarded: number;
}

/** État du streak utilisateur */
export interface UserStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityAt: string;
  totalXP: number;
  currentLevel: number;
}

// ─── Journal de Bord Réflexif (Cahier #07) ───────────────────────────────────

/** 5 types d'entrée journal (Cahier #07 § Types d'entrée) */
export type JournalEntryType =
  | 'reflexion-libre'
  | 'apprentissage'
  | 'pratique-pro'
  | 'session-coaching'
  | 'moment-eureka';

/** Niveau de sentiment (Cahier #07 § Mood) */
export type JournalMoodLevel = 'very-sad' | 'sad' | 'neutral' | 'happy' | 'very-happy';

/**
 * Entrée de journal réflexif.
 * Peut être liée à un item d'apprentissage (lien Item↔Journal, Cahier #07).
 */
export interface JournalEntry {
  id: string;
  userId: string;
  type: JournalEntryType;
  title: string;
  body: string;
  mood: JournalMoodLevel;
  /** Réponses aux questions structurantes (EDRA-R ou génériques) */
  structuredAnswers?: Record<string, string>;
  /** Lien Item↔Journal — ID de l'item d'apprentissage déclencheur */
  linkedItemId?: string;
  /** Type d'item lié (Cahier #07 § lien Item↔Journal) */
  linkedItemType?: ItemType;
  /** Compétence liée (facultatif, enrichi au saving) */
  linkedCompetenceId?: string;
  tags?: string[];
  xpAwarded: number;
  createdAt: string;
  updatedAt: string;
}
