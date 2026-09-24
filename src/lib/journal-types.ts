import {
  Compass,
  PenLine,
  BookOpen,
  Target,
  Lightbulb,
  ClipboardList,
  FileText,
  type LucideIcon,
} from 'lucide-react';

/**
 * Les types d'entrée du journal — UNE table, deux surfaces.
 *
 * Avant le 2026-09-16, `Journal.tsx` et `JournalBubbleCard.tsx` déclaraient
 * chacun la leur. Deux tables tenues à la main, donc deux tables divergentes :
 * **quatre types sur sept portaient deux icônes différentes**, et l'écart se
 * voyait dans un seul écran, la tuile de choix et la carte de la liste étant
 * côte à côte.
 *
 *   type            la page            la carte
 *   ─────────────────────────────────────────────
 *   guided          Compass            GraduationCap
 *   free            PenLine            PenSquare
 *   coaching        Target             Zap
 *   compte-rendu    BarChart2          FileText
 *
 * L'icône choisie à la création n'était donc pas celle affichée dans la liste.
 * Or le journal est un espace de RETOUR, pas de découverte : « reconnaître
 * plutôt que se rappeler » est l'heuristique qu'il devrait le mieux servir.
 *
 * ⚠️ Les arbitrages ne suivent pas une règle mécanique, ils suivent le sens :
 * - `guided` → **Compass**. `GraduationCap` dit « école », c'est le territoire
 *   de `learning` ; une entrée guidée est une question qui oriente.
 * - `free` → **PenLine**, le plus léger des deux stylos, pour l'écriture libre.
 * - `coaching` → **Target**. `Zap` dit « énergie, rapidité » ; le coaching est
 *   un travail d'objectif.
 * - `compte-rendu` → **FileText**, contre la page cette fois : un compte rendu
 *   EST un document, alors que `BarChart2` promet des statistiques qu'il n'y a
 *   pas.
 *
 * ⚠️ `BookOpen` est réservé au type `learning`. Il servait AUSSI d'icône au
 * bouton « Lire » de la carte, dans le même écran — la même image désignait un
 * type de contenu et une action. Le bouton n'a plus d'icône : le mot suffit.
 *
 * ⚠️ Ce vocabulaire d'interface n'est PAS celui du domaine.
 * `JournalEntryType` (src/types/learning.ts) dit `reflexion-libre |
 * apprentissage | pratique-pro | session-coaching | moment-eureka`. Cinq noms
 * contre sept, et aucun ne correspond. Cette table ne prétend pas réconcilier
 * les deux : elle unifie ce que les deux surfaces d'interface partagent déjà.
 * La réconciliation domaine ↔ interface reste ouverte.
 */
export type JournalTypeKey =
  | 'guided'
  | 'free'
  | 'learning'
  | 'coaching'
  | 'insight'
  | 'questionnaire'
  | 'compte-rendu';

export interface JournalTypeMeta {
  label: string;
  Icon: LucideIcon;
  /** Pastille de type, sur la carte. */
  badge: string;
  /** Surface de la bulle. */
  surface: string;
  /** Queue de la bulle — doit suivre la surface, sinon le raccord se voit. */
  tail: string;
}

export const JOURNAL_TYPES: Record<JournalTypeKey, JournalTypeMeta> = {
  guided: {
    label: 'Guidé',
    Icon: Compass,
    badge: 'bg-primary-100 text-primary-800 border border-primary-200',
    surface: 'bg-primary-50/70 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
    tail: 'bg-primary-50/70 border-primary-100',
  },
  free: {
    label: 'Libre',
    Icon: PenLine,
    badge: 'bg-ink-100 text-ink-700 border border-ink-200',
    surface: 'bg-white border-ink-200 hover:border-ink-300',
    tail: 'bg-white border-ink-200',
  },
  learning: {
    label: 'Apprentissage',
    Icon: BookOpen,
    badge: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
    surface: 'bg-secondary-50/70 border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
    tail: 'bg-secondary-50/70 border-secondary-100',
  },
  coaching: {
    label: 'Coaching',
    Icon: Target,
    badge: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
    surface: 'bg-secondary-50/70 border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
    tail: 'bg-secondary-50/70 border-secondary-100',
  },
  insight: {
    label: 'Insight',
    Icon: Lightbulb,
    badge: 'bg-accent-100 text-accent-800 border border-accent-200',
    surface: 'bg-accent-50/70 border-accent-100 hover:border-accent-200 hover:bg-accent-50',
    tail: 'bg-accent-50/70 border-accent-100',
  },
  questionnaire: {
    label: 'Questionnaire',
    Icon: ClipboardList,
    badge: 'bg-primary-100 text-primary-800 border border-primary-200',
    surface: 'bg-primary-50/70 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
    tail: 'bg-primary-50/70 border-primary-100',
  },
  'compte-rendu': {
    label: 'Compte rendu',
    Icon: FileText,
    badge: 'bg-success-bg text-success-fg border border-success-base/30',
    surface: 'bg-primary-50/70 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
    tail: 'bg-primary-50/70 border-primary-100',
  },
};

/** L'ordre d'apparition, filtres comme tuiles de choix. */
export const JOURNAL_TYPE_ORDER: JournalTypeKey[] = [
  'guided',
  'free',
  'learning',
  'coaching',
  'insight',
  'questionnaire',
  'compte-rendu',
];
