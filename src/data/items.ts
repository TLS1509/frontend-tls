/**
 * Mock Learning Space items — Cahier #01 + #01bis (Phase 16.1.1).
 *
 * 9 item types MVP (Cahier #01 § Vue d'Ensemble) :
 *   astuces · flashcard · ressource · guide · video_conc · video_geste
 *   · micro_learning · mission · masterclass
 *
 * Chaque item :
 *   - thématique (catégorie)
 *   - durée
 *   - niveau Dreyfus visé (1–5)
 *   - compétences associées (refs to COMPETENCES)
 *   - statut publication
 *   - tier gating + pré-requis (optionnel)
 *
 * À remplacer par API en V1. Sert au Learning Space FO (Phase 16.1.4).
 */

import type {
  DreyfusLevel,
  ItemType,
  Prerequisites,
  SubscriptionTier,
} from '../types/learning';

export type ItemStatus = 'draft' | 'awaiting_moderation' | 'published';

export interface LearningSpaceItem {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  /** Catégorie thématique (ex: "Leadership", "IA & Tech") */
  theme: string;
  /** Durée affichée (ex: "5 min", "1h 30") */
  duration: string;
  /** Niveau Dreyfus visé pour la (les) compétence(s) associée(s) */
  dreyfusLevel: DreyfusLevel;
  /** Compétences touchées par cet item (refs to COMPETENCES.id) */
  competenceIds: string[];
  /** Points XP gagnés à la complétion (Cahier #05 gamification) */
  xpReward?: number;
  status: ItemStatus;
  /** Abonnements qui débloquent l'item. Vide = accessible à tous (Plan Gratuit inclus). */
  tierGate?: SubscriptionTier[];
  /** Pré-requis Type A (items) + Type B (compétence min Dreyfus) */
  prerequisites?: Prerequisites;
  /** Tags libres pour la recherche */
  tags?: string[];
}

export const MOCK_LEARNING_SPACE_ITEMS: LearningSpaceItem[] = [
  // ─── Astuces (micro-conseil rapide) ───────────────────────────────────────
  {
    id: 'item-astuces-1',
    type: 'astuces',
    title: '5 phrases pour désamorcer un conflit',
    description: 'Boîte à outils linguistique pour réorienter une conversation tendue.',
    theme: 'Communication',
    duration: '3 min',
    dreyfusLevel: 2,
    competenceIds: ['communication', 'empathy'],
    xpReward: 10,
    status: 'published',
    tags: ['conflit', 'communication', 'quick-win'],
  },
  {
    id: 'item-astuces-2',
    type: 'astuces',
    title: 'Le bon prompt en 3 étapes',
    description: 'Méthode rapide pour formuler une demande efficace à une IA générative.',
    theme: 'IA & Tech',
    duration: '4 min',
    dreyfusLevel: 1,
    competenceIds: ['ai_tools'],
    xpReward: 10,
    status: 'published',
    tags: ['ia', 'prompt'],
  },

  // ─── Flashcards ───────────────────────────────────────────────────────────
  {
    id: 'item-flashcard-1',
    type: 'flashcard',
    title: '10 concepts clés du leadership',
    description: 'Cartes recto-verso pour mémoriser les fondamentaux.',
    theme: 'Leadership',
    duration: '8 min',
    dreyfusLevel: 1,
    competenceIds: ['leadership'],
    xpReward: 20,
    status: 'published',
    tags: ['leadership', 'mémorisation'],
  },

  // ─── Ressources (PDF, lien, doc) ──────────────────────────────────────────
  {
    id: 'item-ressource-1',
    type: 'ressource',
    title: 'Template : Plan de communication',
    description: 'Modèle Notion prêt à remplir pour structurer un plan de com.',
    theme: 'Communication',
    duration: '15 min',
    dreyfusLevel: 2,
    competenceIds: ['communication', 'project_mgmt'],
    xpReward: 30,
    status: 'published',
    tags: ['template', 'plan'],
  },
  {
    id: 'item-ressource-2',
    type: 'ressource',
    title: 'Glossaire IA générative',
    description: 'Référentiel des termes clés (LLM, RAG, agents, fine-tuning).',
    theme: 'IA & Tech',
    duration: '10 min',
    dreyfusLevel: 1,
    competenceIds: ['ai_tools'],
    xpReward: 15,
    status: 'published',
    tags: ['ia', 'glossaire'],
  },

  // ─── Guides (tutoriels structurés) ────────────────────────────────────────
  {
    id: 'item-guide-1',
    type: 'guide',
    title: 'Conduire son premier entretien individuel',
    description: 'Guide pas-à-pas pour préparer, mener et conclure un 1-on-1.',
    theme: 'Leadership',
    duration: '20 min',
    dreyfusLevel: 2,
    competenceIds: ['leadership', 'communication'],
    xpReward: 40,
    status: 'published',
    prerequisites: {
      itemIds: ['item-astuces-1'], // doit avoir lu les astuces communication
    },
    tags: ['1-on-1', 'manager'],
  },

  // ─── Vidéo conceptuelle ───────────────────────────────────────────────────
  {
    id: 'item-video-conc-1',
    type: 'video_conc',
    title: 'Qu\'est-ce que l\'intelligence collective ?',
    description: 'Décryptage des mécanismes qui rendent un groupe plus intelligent que ses membres.',
    theme: 'Coopération',
    duration: '12 min',
    dreyfusLevel: 2,
    competenceIds: ['cooperation', 'leadership'],
    xpReward: 25,
    status: 'published',
    tags: ['vidéo', 'théorie'],
  },

  // ─── Vidéo geste (démo "comment faire") ───────────────────────────────────
  {
    id: 'item-video-geste-1',
    type: 'video_geste',
    title: 'Animer un brainstorming en 30 min',
    description: 'Démo filmée d\'une session de créativité guidée.',
    theme: 'Créativité',
    duration: '18 min',
    dreyfusLevel: 3,
    competenceIds: ['creativity', 'cooperation'],
    xpReward: 35,
    status: 'published',
    tags: ['atelier', 'créativité'],
    prerequisites: {
      competencyMinLevel: [{ competenceId: 'cooperation', minLevel: 2 }],
    },
  },

  // ─── Micro-learning (mini-leçon) ──────────────────────────────────────────
  {
    id: 'item-micro-1',
    type: 'micro_learning',
    title: 'Donner un feedback en SBI',
    description: 'Mini-leçon : situation-comportement-impact, le format qui marche.',
    theme: 'Leadership',
    duration: '7 min',
    dreyfusLevel: 2,
    competenceIds: ['leadership', 'communication'],
    xpReward: 25,
    status: 'published',
    tags: ['feedback', 'manager'],
  },

  // ─── Mission apprenante (Cahier #09) ──────────────────────────────────────
  {
    id: 'item-mission-1',
    type: 'mission',
    title: 'Mission : Identifier 3 leviers de motivation dans ton équipe',
    description: 'Mission terrain de 7 jours, restitution en journal.',
    theme: 'Leadership',
    duration: '7 jours',
    dreyfusLevel: 3,
    competenceIds: ['leadership', 'empathy'],
    xpReward: 100,
    status: 'published',
    tierGate: ['plan_2', 'plan_3', 'enterprise_premium', 'enterprise_custom'],
    prerequisites: {
      competencyMinLevel: [{ competenceId: 'leadership', minLevel: 2 }],
    },
    tags: ['mission', 'terrain'],
  },

  // ─── Masterclass (Cahier #08) ─────────────────────────────────────────────
  {
    id: 'item-masterclass-1',
    type: 'masterclass',
    title: 'Masterclass : Leadership en contexte d\'incertitude',
    description: 'Session live de 90 min avec un expert TLS.',
    theme: 'Leadership',
    duration: '1h 30',
    dreyfusLevel: 4,
    competenceIds: ['leadership', 'adaptability'],
    xpReward: 150,
    status: 'published',
    tierGate: ['plan_3', 'enterprise_premium', 'enterprise_custom'],
    prerequisites: {
      competencyMinLevel: [{ competenceId: 'leadership', minLevel: 3 }],
    },
    tags: ['masterclass', 'live'],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getItemById(id: string): LearningSpaceItem | undefined {
  return MOCK_LEARNING_SPACE_ITEMS.find((item) => item.id === id);
}

export function getItemsByType(type: ItemType): LearningSpaceItem[] {
  return MOCK_LEARNING_SPACE_ITEMS.filter((item) => item.type === type);
}

export function getItemsByCompetence(competenceId: string): LearningSpaceItem[] {
  return MOCK_LEARNING_SPACE_ITEMS.filter((item) =>
    item.competenceIds.includes(competenceId),
  );
}

/** Libellé FR par type, pour les filtres + cards Learning Space. */
export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  astuces: 'Astuces',
  flashcard: 'Flashcards',
  ressource: 'Ressources',
  guide: 'Guides',
  video_conc: 'Vidéos concept',
  video_geste: 'Vidéos pratiques',
  micro_learning: 'Micro-learning',
  mission: 'Missions',
  masterclass: 'Masterclass',
};
