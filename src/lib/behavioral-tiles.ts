/**
 * Behavioral tile labels for the onboarding questionnaire.
 *
 * Each competency maps to 4 behavioral statements that represent
 * Dreyfus levels 1–4. The Dreyfus scale is internal data only —
 * labels like "Novice" or "Expert" are never shown to the user.
 *
 * Level 5 (Maître) is an edge case handled by D4 in the questionnaire stub.
 * A fifth tile can be unlocked in V2 when the Mistral integration is live.
 *
 * CDC #03 §UJ #1a — Individual learner path.
 */

import type { DreyfusLevel } from '../types/learning';

/** 4 behavioral tile labels, ordered D1 → D4. */
export type BehavioralTileSet = [string, string, string, string];

export const BEHAVIORAL_TILES: Record<string, BehavioralTileSet> = {
  leadership: [
    'Je découvre ce que ça implique',
    "J'ai piloté quelques équipes ou projets",
    'Je dirige avec aisance et impact',
    "J'accompagne d'autres leaders",
  ],
  strategy: [
    "J'apprends à définir des priorités",
    'Je construis des stratégies simples',
    'Je pilote la vision long terme',
    "J'inspire la stratégie d'une organisation",
  ],
  negotiation: [
    'Je découvre comment négocier',
    'Je réussis dans des cas simples',
    'Je négocie des accords complexes',
    "Je forme d'autres à la négociation",
  ],
  conflict_resolution: [
    "J'évite souvent les conflits",
    'Je désamorce certaines tensions',
    'Je gère les conflits avec aisance',
    "J'aide les équipes à dépasser les crises",
  ],
  feedback_culture: [
    'Je reçois le feedback difficilement',
    'Je donne et reçois un feedback basique',
    "J'intègre le feedback en continu",
    'Je crée une culture du feedback',
  ],
  communication: [
    "Je dois travailler mon expression",
    'Je communique clairement en face-à-face',
    "Je fédère des audiences variées",
    "Je forme d'autres à communiquer",
  ],
  active_listening: [
    "J'ai du mal à reformuler ce que j'entends",
    "Je pratique l'écoute dans des cas simples",
    "J'écoute activement même sous pression",
    "J'enseigne l'écoute active à mon équipe",
  ],
  public_speaking: [
    "Je suis peu à l'aise à l'oral",
    'Je prends la parole sur des sujets familiers',
    "Je convaincs des audiences exigeantes",
    "Je coache d'autres pour prendre la parole",
  ],
  storytelling: [
    "Je ne pense pas encore en récits",
    "J'utilise quelques exemples simples",
    "Je capte et retiens l'attention facilement",
    "Je forme d'autres à l'art du récit",
  ],
  ai_strategy: [
    "Je découvre l'IA en entreprise",
    "J'identifie quelques cas d'usage basiques",
    'Je pilote des projets IA à valeur réelle',
    "Je définis la stratégie IA de mon org",
  ],
  prompt_engineering: [
    'Je commence à explorer les LLM',
    'Je formule des prompts simples et efficaces',
    'Je maîtrise les techniques avancées',
    'Je forme des équipes au prompting',
  ],
  data: [
    'Je lis difficilement les données',
    "J'exploite des rapports standards",
    'Je pilote les décisions par la data',
    "J'oriente la stratégie data de mon org",
  ],
  tech_tools: [
    "J'utilise peu d'outils numériques",
    'Je maîtrise les outils courants',
    "J'adopte rapidement tout nouvel outil",
    "J'accompagne mon équipe sur les outils",
  ],
  critical_thinking: [
    "J'accepte souvent les infos sans questionner",
    'Je remets parfois en question les sources',
    "J'analyse rigoureusement toute information",
    "J'enseigne l'esprit critique à mon équipe",
  ],
  project_mgmt: [
    "J'ai du mal à tenir mes délais",
    "Je gère des projets simples seul·e",
    'Je mène des projets complexes à terme',
    'Je structure la gestion de projet de mon org',
  ],
  agile_methodology: [
    "Je ne connais pas Agile",
    "J'utilise quelques pratiques Agile",
    "Je pilote des équipes Agile efficacement",
    "Je suis référent·e Agile de mon organisation",
  ],
  analyse: [
    "J'ai du mal à décomposer les problèmes",
    'Je résous des problèmes bien définis',
    "J'analyse des situations complexes",
    "J'enseigne la démarche analytique",
  ],
  cooperation: [
    "Je préfère travailler seul·e",
    "Je collabore efficacement en équipe",
    'Je facilite les décisions collectives',
    'Je construis des dynamiques de coopération',
  ],
  adaptability: [
    "J'ai du mal à changer de cap rapidement",
    "Je m'adapte aux changements anticipés",
    "Je m'adapte même aux imprévus majeurs",
    "J'aide les autres à embrasser le changement",
  ],
  coaching_posture: [
    'Je donne souvent des conseils directs',
    "J'écoute avant de conseiller",
    "J'accompagne sans imposer naturellement",
    "Je forme d'autres à la posture coach",
  ],
  empathy: [
    "J'ai du mal à me mettre à la place des autres",
    "Je comprends les émotions des autres",
    "J'adapte ma posture à chaque profil",
    "Je crée des environnements empathiques",
  ],
  skills_assessment: [
    "Je ne connais pas les modèles d'éval",
    'Je connais le Dreyfus et quelques outils',
    "J'évalue avec précision les compétences",
    "Je conçois des référentiels d'évaluation",
  ],
  learning_mindset: [
    "J'ai du mal à apprendre par moi-même",
    "J'apprends en suivant des cours structurés",
    "J'apprends de façon autonome et curieuse",
    "J'inspire les autres à se former en continu",
  ],
};

/** Fallback for unmapped competencies. */
export const DEFAULT_TILES: BehavioralTileSet = [
  'Je découvre le sujet',
  "J'ai quelques expériences",
  'Je pratique avec aisance',
  "J'accompagne les autres",
];

/** Returns 4 behavioral tile labels for a given competency id. */
export function getBehavioralTiles(competenceId: string): BehavioralTileSet {
  return BEHAVIORAL_TILES[competenceId] ?? DEFAULT_TILES;
}

/** Converts a 0-based tile index to a DreyfusLevel (1-4). */
export function tileIndexToLevel(index: number): DreyfusLevel {
  return Math.min(Math.max(index + 1, 1), 4) as DreyfusLevel;
}
