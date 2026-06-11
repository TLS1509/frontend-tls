/**
 * Onboarding Questionnaire builder — CDC #03 §User Journey #1a/#1b
 *
 * Generates a DYNAMIC questionnaire of 3–30 questions based on the goals
 * (learning objectives) selected by the user during Onboarding step 2.
 *
 * Mapping logic :
 *  - Each goal (Leadership / Communication / IA & Tech / Gestion de projet /
 *    Coaching / Productivité) maps to a curated list of canonical competencies.
 *  - We pick up to MAX_PER_GOAL competencies per selected goal, deduplicated
 *    across goals, then clamp the total to [MIN_QUESTIONS, MAX_QUESTIONS].
 *  - If user has no goal selected (edge case), fall back to a default set
 *    of 8 foundational H.S.O. competencies (legacy 16.2 behavior).
 *
 * The returned `OnboardingQuestion[]` is consumed by OnboardingQuestionnaire.tsx.
 */

import { getCompetenceById } from '../data/competencies';

export interface OnboardingQuestion {
  id: number;
  competenceId: string;
  q: string;
}

const MIN_QUESTIONS = 3;
const MAX_QUESTIONS = 30;
const MAX_PER_GOAL = 5; // CDC : "1-5 per goal" → up to 6 goals × 5 = 30 max

/**
 * Goal slug (from Onboarding step 2 OPTION grid) → ordered list of competency
 * ids that probe this goal. Order matters : first competencies are the most
 * representative / foundational; later are "stretch" probes if scope allows.
 *
 * NB: Goal slugs match those in `Onboarding.tsx` GOAL_OPTIONS exactly.
 */
const GOAL_TO_COMPETENCIES: Record<string, string[]> = {
  'Leadership': [
    'leadership',
    'strategy',
    'negotiation',
    'conflict_resolution',
    'feedback_culture',
  ],
  'Communication': [
    'communication',
    'active_listening',
    'public_speaking',
    'storytelling',
    'feedback_culture',
  ],
  'IA & Tech': [
    'ai_strategy',
    'prompt_engineering',
    'data',
    'tech_tools',
    'critical_thinking',
  ],
  'Gestion de projet': [
    'project_mgmt',
    'agile_methodology',
    'analyse',
    'cooperation',
    'adaptability',
  ],
  'Coaching': [
    'coaching_posture',
    'active_listening',
    'feedback_culture',
    'empathy',
    'skills_assessment',
  ],
  'Productivité': [
    'project_mgmt',
    'adaptability',
    'learning_mindset',
    'tech_tools',
    'critical_thinking',
  ],
};

/** Fallback set when user has selected no goal (defensive — UI should prevent). */
const DEFAULT_FALLBACK_COMPETENCIES = [
  'communication',
  'leadership',
  'analyse',
  'project_mgmt',
  'cooperation',
  'adaptability',
  'critical_thinking',
  'tech_tools',
];

/**
 * Per-competency probing question. Keeps wording neutral / self-reflective —
 * the user rates themselves on the Dreyfus scale.
 */
const COMPETENCY_QUESTION: Record<string, string> = {
  leadership: 'As-tu déjà piloté un projet transverse ou dirigé une équipe vers un objectif commun ?',
  strategy: 'Es-tu à l’aise pour définir une direction long terme et arbitrer les priorités ?',
  negotiation: 'Sais-tu construire des accords gagnants-gagnants dans des situations à enjeu ?',
  conflict_resolution: 'Comment évalues-tu ta capacité à désamorcer des tensions et bâtir des accords durables ?',
  feedback_culture: 'À quel point es-tu à l’aise pour donner et recevoir un feedback constructif régulièrement ?',
  communication: 'Comment évalues-tu ton aisance à communiquer clairement et à embarquer tes interlocuteurs ?',
  active_listening: 'Pratiques-tu activement l’écoute (reformulation, validation, captation du non-dit) ?',
  public_speaking: 'Es-tu à l’aise pour prendre la parole en public et embarquer une audience ?',
  storytelling: 'Sais-tu utiliser le récit (métaphores, exemples) pour faire comprendre et retenir ?',
  ai_strategy: 'Sais-tu identifier des cas d’usage IA à valeur dans un contexte business ?',
  prompt_engineering: 'Maîtrises-tu la structuration d’un prompt (contexte, contraintes, chain-of-thought) ?',
  data: 'Es-tu à l’aise pour exploiter des données afin de piloter une performance ou décision ?',
  tech_tools: 'Maîtrises-tu les outils numériques du quotidien professionnel (suite office, outils cloud, IA) ?',
  critical_thinking: 'Remets-tu en question les sources et données qu’on te fournit avec rigueur ?',
  project_mgmt: 'Réussis-tu à planifier et respecter tes échéances même en charge importante ?',
  agile_methodology: 'Maîtrises-tu les méthodes Agile (Scrum, Kanban, sprints, cérémonies) ?',
  analyse: 'Face à un problème complexe, décomposes-tu systématiquement la situation pour décider ?',
  cooperation: 'Contribues-tu activement aux décisions collectives et au travail en équipe ?',
  adaptability: 'Face à un changement d’objectif soudain, ajustes-tu rapidement tes priorités ?',
  coaching_posture: 'Es-tu à l’aise pour accompagner sans imposer (questions ouvertes, écoute, miroir) ?',
  empathy: 'Sais-tu comprendre et adapter ta posture aux autres dans des contextes variés ?',
  skills_assessment: 'Maîtrises-tu les modèles d’évaluation des compétences (Dreyfus, rubriques, JAC) ?',
  learning_mindset: 'Cultives-tu activement la curiosité, l’humilité et l’autonomie dans tes apprentissages ?',
};

/**
 * Build the questionnaire from a list of selected goals.
 *
 * @param goals Goals selected during Onboarding step 2 (e.g. ["Leadership", "IA & Tech"])
 * @returns 3-30 questions, ordered to interleave goals (first competence of
 *          each goal first, then second, etc.) so the questionnaire feels
 *          balanced rather than goal-by-goal.
 */
export function buildOnboardingQuestionnaire(goals: string[]): OnboardingQuestion[] {
  // Resolve competence ids per goal
  const perGoal: string[][] = goals.length === 0
    ? [DEFAULT_FALLBACK_COMPETENCIES]
    : goals.map((g) => (GOAL_TO_COMPETENCIES[g] ?? []).slice(0, MAX_PER_GOAL));

  // Interleave goals : take 1st of each goal, then 2nd, etc.
  const interleaved: string[] = [];
  const maxLen = Math.max(...perGoal.map((arr) => arr.length), 0);
  for (let i = 0; i < maxLen; i++) {
    for (const arr of perGoal) {
      if (arr[i]) interleaved.push(arr[i]);
    }
  }

  // Deduplicate while preserving order
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const id of interleaved) {
    if (!seen.has(id)) {
      seen.add(id);
      unique.push(id);
    }
  }

  // Clamp to [MIN, MAX] — pad with fallback if too few
  let pool = unique;
  if (pool.length < MIN_QUESTIONS) {
    for (const id of DEFAULT_FALLBACK_COMPETENCIES) {
      if (!seen.has(id)) {
        seen.add(id);
        pool.push(id);
      }
      if (pool.length >= MIN_QUESTIONS) break;
    }
  }
  pool = pool.slice(0, MAX_QUESTIONS);

  // Build questions with their wording
  return pool.map((competenceId, idx) => ({
    id: idx + 1,
    competenceId,
    q: COMPETENCY_QUESTION[competenceId]
      ?? `Comment évalues-tu ton niveau actuel en ${getCompetenceById(competenceId)?.label ?? competenceId} ?`,
  }));
}
