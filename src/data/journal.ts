/**
 * Mock Journal data (Cahier #07).
 * 5 types d'entrée : reflexion-libre / apprentissage / pratique-pro / session-coaching / moment-eureka
 * Template EDRA-R : Expérience / Description / Réflexion / Action / Résultat
 */

import type { JournalEntry } from '../types/learning';
import { MOCK_USER_ID } from './passeport';

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j-1',
    userId: MOCK_USER_ID,
    type: 'apprentissage',
    title: 'Réflexion sur ma première mission',
    body: 'Aujourd\'hui j\'ai pris conscience que la communication avec les clients est essentielle. Les attentes implicites sont souvent plus importantes que les attentes explicites.',
    mood: 'happy',
    structuredAnswers: {
      experience: 'Session de feedback avec mon manager après la livraison du projet.',
      description: 'Le client était insatisfait malgré un livrable conforme au cahier des charges initial.',
      reflexion: 'Je n\'avais pas validé les attentes informelles. La communication continue aurait évité le désalignement.',
      action: 'Mettre en place des points hebdomadaires avec le client dès le début du prochain projet.',
      resultat: 'Meilleure satisfaction client et réduction des ajustements en fin de projet.',
    },
    linkedCompetenceId: 'communication',
    tags: ['communication', 'mission', 'feedback'],
    xpAwarded: 20,
    createdAt: '2026-05-12T09:30:00Z',
    updatedAt: '2026-05-12T09:45:00Z',
  },
  {
    id: 'j-2',
    userId: MOCK_USER_ID,
    type: 'pratique-pro',
    title: 'Échec sur le pitch produit',
    body: 'Je suis frustré : mon pitch n\'a pas convaincu. Je dois revoir ma structure et mieux anticiper les objections.',
    mood: 'sad',
    structuredAnswers: {
      learning: 'Un pitch doit commencer par le problème, pas par la solution.',
      challenges: 'Je me suis perdu dans les détails techniques trop tôt.',
      application: 'Utiliser le framework "Problème → Impact → Solution → Preuve" pour le prochain pitch.',
    },
    linkedCompetenceId: 'communication',
    tags: ['pitch', 'apprentissage', 'communication'],
    xpAwarded: 20,
    createdAt: '2026-05-08T14:00:00Z',
    updatedAt: '2026-05-08T14:20:00Z',
  },
  {
    id: 'j-3',
    userId: MOCK_USER_ID,
    type: 'session-coaching',
    title: 'Notes de coaching avec Sophie',
    body: 'Sophie m\'a fait remarquer que je peux structurer ma pensée différemment. Exercice de reformulation très utile.',
    mood: 'neutral',
    linkedCompetenceId: 'leadership',
    tags: ['coaching', 'leadership', 'reformulation'],
    xpAwarded: 20,
    createdAt: '2026-05-05T11:00:00Z',
    updatedAt: '2026-05-05T11:30:00Z',
  },
  {
    id: 'j-4',
    userId: MOCK_USER_ID,
    type: 'reflexion-libre',
    title: 'Victoire sur le module stratégie',
    body: 'Module terminé avec brio ! Le quiz final était difficile mais ma préparation a payé. Je comprends maintenant comment les OKR s\'articulent avec la vision long terme.',
    mood: 'very-happy',
    linkedItemId: 'item-strategy-okr',
    tags: ['stratégie', 'OKR', 'victoire'],
    xpAwarded: 20,
    createdAt: '2026-05-02T16:00:00Z',
    updatedAt: '2026-05-02T16:15:00Z',
  },
  {
    id: 'j-5',
    userId: MOCK_USER_ID,
    type: 'moment-eureka',
    title: 'L\'écoute active change tout',
    body: 'En pratiquant l\'écoute active lors de ma réunion d\'équipe, j\'ai réalisé combien mes collègues avaient des blocages non exprimés. Juste reformuler et ne pas interrompre a débloqué 30 minutes de silence.',
    mood: 'happy',
    linkedCompetenceId: 'communication',
    tags: ['écoute', 'management', 'équipe'],
    xpAwarded: 20,
    createdAt: '2026-04-28T18:30:00Z',
    updatedAt: '2026-04-28T18:45:00Z',
  },
];

// ─── Template EDRA-R ──────────────────────────────────────────────────────────

/**
 * Questions structurantes EDRA-R (Cahier #07 § Template EDRA-R).
 * Expérience / Description / Réflexion / Action / Résultat.
 * Appliqué principalement aux entrées de type 'apprentissage' et 'pratique-pro'.
 */
export const EDRA_R_QUESTIONS = [
  {
    id: 'experience',
    title: 'Expérience',
    description: 'Décrivez brièvement la situation ou l\'événement vécu',
    placeholder: 'Quelle situation avez-vous vécue ?',
  },
  {
    id: 'description',
    title: 'Description',
    description: 'Que s\'est-il passé exactement ? Faits et observations',
    placeholder: 'Décrivez les faits objectivement...',
  },
  {
    id: 'reflexion',
    title: 'Réflexion',
    description: 'Quels enseignements en tirez-vous ? Émotions, prises de conscience',
    placeholder: 'Qu\'avez-vous ressenti et compris ?',
  },
  {
    id: 'action',
    title: 'Action',
    description: 'Que ferez-vous différemment la prochaine fois ?',
    placeholder: 'Décrivez votre plan d\'action concret...',
  },
  {
    id: 'resultat',
    title: 'Résultat attendu',
    description: 'Quel impact espérez-vous obtenir ?',
    placeholder: 'Quel résultat visez-vous ?',
  },
] as const;

export const GENERIC_STRUCTURED_QUESTIONS = [
  {
    id: 'learning',
    title: 'Qu\'avez-vous appris ?',
    description: 'Identifiez les insights clés, concepts ou compétences développées',
    placeholder: 'Notez les apprentissages principaux...',
  },
  {
    id: 'challenges',
    title: 'Quels défis avez-vous rencontrés ?',
    description: 'Décrivez les obstacles, difficultés ou points de blocage',
    placeholder: 'Parlez des défis rencontrés...',
  },
  {
    id: 'application',
    title: 'Comment allez-vous appliquer cela ?',
    description: 'Planifiez les actions concrètes et les changements à mettre en œuvre',
    placeholder: 'Décrivez votre plan d\'action...',
  },
] as const;
