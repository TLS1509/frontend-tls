/**
 * Mistral conversational stub — CDC #03 §User Journey #1a (Individual)
 *
 * Simulates the back-and-forth of a Mistral LLM-driven positioning interview.
 * The real Mistral integration is deferred (Phase 16.12bis IA Features Framework);
 * this stub generates deterministic, human-feeling prompts using the same
 * questionnaire data we already have (`buildOnboardingQuestionnaire`).
 *
 * Behavior :
 *  - Opens with a personalized greeting using firstName
 *  - For each question in the dynamic 3-30 list :
 *      1. AI introduces the competence with a transition phrase
 *      2. AI asks the question
 *      3. User answers via Dreyfus level + optional free-text elaboration
 *      4. AI acknowledges with a short reflective response (varies by level)
 *  - Closes with a wrap-up message and a continue CTA
 *
 * All AI responses are pure functions — no API call, no randomness beyond
 * deterministic seed picks, so the UX is reproducible and testable.
 */

import type { OnboardingQuestion } from './onboarding-questionnaire';
import type { DreyfusLevel } from '../types/learning';

/**
 * Friendly greeting at the start of the conversation. Personalized with first name.
 */
export function buildGreeting(firstName: string, totalQuestions: number): string[] {
  const name = firstName.trim() || 'à toi';
  return [
    `Bonjour ${name} ! 👋 Je suis l'assistant IA de The Learning Society.`,
    `Je vais te poser ${totalQuestions} questions courtes pour évaluer ton niveau sur les compétences clés de ton parcours. Tu peux développer tes réponses si tu veux — ça m'aide à mieux te recommander la suite.`,
    `On y va ?`,
  ];
}

/**
 * Per-question transition phrases — introduces the competence smoothly.
 * Deterministic : same competence → same intro across renders.
 */
const TRANSITION_TEMPLATES = [
  "Parlons de **{label}**.",
  "Passons à **{label}**.",
  "Maintenant, sur **{label}** :",
  "Une compétence clé : **{label}**.",
  "Côté **{label}** :",
];

export function buildQuestionIntro(question: OnboardingQuestion, label: string): string {
  // Deterministic pick based on competence id hash
  const idx = Array.from(question.competenceId).reduce((acc, c) => acc + c.charCodeAt(0), 0)
    % TRANSITION_TEMPLATES.length;
  return TRANSITION_TEMPLATES[idx].replace('{label}', label);
}

/**
 * AI acknowledgment after the user submits a Dreyfus level. Varies tone by level
 * to feel responsive : low → encouraging, mid → recognizing, high → respectful.
 */
const ACK_BY_LEVEL: Record<DreyfusLevel, string[]> = {
  1: [
    "C'est noté. Tu découvres — c'est une excellente position pour apprendre vite.",
    "Compris : niveau Novice. On va construire ensemble à partir de là.",
    "Bien reçu. Pas de pression, c'est exactement pour ça que tu es là.",
  ],
  2: [
    "Super. Les bases sont là, on va pouvoir aller plus loin.",
    "Noté : Débutant avancé. Tu as déjà une bonne fondation.",
    "Bien. On va consolider ces bases et passer au cran au-dessus.",
  ],
  3: [
    "Excellent — Compétent. Tu sais faire en autonomie, on peut viser plus haut.",
    "Très bien. À ce niveau, on peut t'aider à affiner et à élargir.",
    "Parfait. Tu as la pratique, on va travailler la maîtrise.",
  ],
  4: [
    "Impressionnant. Maîtrise reconnue — on va te pousser vers l'expertise.",
    "Bien joué. À ce niveau, on travaille la transmission et l'innovation.",
    "Solide. On va viser la posture d'expert.",
  ],
  5: [
    "Wow, Expert ! Tu pourrais former d'autres apprenants sur cette compétence.",
    "Niveau Expert — on te proposera des défis à la hauteur, voire un rôle de mentor.",
    "Magnifique. Tu peux contribuer à enrichir notre communauté sur ce sujet.",
  ],
};

export function buildAcknowledgment(level: DreyfusLevel, hasElaboration: boolean): string {
  const pool = ACK_BY_LEVEL[level];
  const base = pool[level % pool.length]; // deterministic pick
  return hasElaboration
    ? `${base} Merci pour le détail — ça m'aide à personnaliser tes recommandations.`
    : base;
}

/**
 * Final wrap-up message before the user is redirected to the next step.
 */
export function buildClosing(firstName: string, accountTypeRequiresPayment: boolean): string[] {
  const name = firstName.trim() || 'toi';
  return [
    `C'est terminé ${name} ! 🎉 J'ai noté tous tes niveaux Dreyfus.`,
    `Ton **Passeport de compétences** est maintenant initialisé. Tu pourras le faire évoluer à tout moment depuis ton espace.`,
    accountTypeRequiresPayment
      ? `Prochaine étape : choisir ta formule pour démarrer.`
      : `Prochaine étape : un tour rapide de la plateforme.`,
  ];
}
