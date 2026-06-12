/**
 * Mock référentiel compétences H.S.O. (Hard / Soft / Out skills).
 * Source de vérité MVP côté FO — à remplacer par BDD/API + import CSV en V1.
 *
 * Cahier #02 Passeport Compétences :
 *   - domaine racine H.S.O. (Hard / Soft / Out)
 *   - subdomain (ex: "Communication" sous "Soft")
 *   - level_category (Base / Avancée / Spécialisée)
 *   - 5 niveaux Dreyfus FR : Novice / Apprenant / Compétent / Expert / Maître
 *
 * Phase 16.2 chantier #4 : ~45 compétences axées formation pro + IA.
 * IDs historiques (leadership, communication, analyse, tech_tools, creativity,
 * cooperation, etc.) préservés pour rétro-compat avec MOCK_LEARNER_COMPETENCIES.
 */

import type {
  Competence,
  CompetenceDomain,
  DreyfusLabel,
  DreyfusLevel,
  DreyfusLevelDef,
} from '../types/learning';

/** Libellés FR canoniques des 5 niveaux Dreyfus (Cahier #02). */
export const DREYFUS_LABELS: Record<DreyfusLevel, DreyfusLabel> = {
  1: 'Novice',
  2: 'Apprenant',
  3: 'Compétent',
  4: 'Expert',
  5: 'Maître',
};

/**
 * Définitions complètes des 5 niveaux Dreyfus (Cahier #02 § DreyfusLevel).
 * Criteria = ce que l'apprenant DOIT démontrer pour valider ce niveau.
 * Indicators = signaux observables concrets.
 */
export const DREYFUS_LEVEL_DEFS: DreyfusLevelDef[] = [
  {
    level: 1,
    label: 'Novice',
    criteria: "Suit des règles et procédures explicites sans les adapter. Nécessite un guidage constant pour chaque étape.",
    indicators: [
      "Applique les instructions à la lettre",
      "Pose des questions fréquentes sur le 'comment faire'",
      "Ne prend pas d'initiative hors du cadre donné",
      "Besoin de validation après chaque action",
    ],
  },
  {
    level: 2,
    label: 'Apprenant',
    criteria: "Reconnaît les contextes récurrents et commence à adapter les procédures selon l'expérience acquise.",
    indicators: [
      "Gère les situations standard de façon autonome",
      "Identifie les cas hors-norme et demande de l'aide",
      "Commence à relier les règles aux intentions derrière elles",
      "Peut expliquer les étapes suivies a posteriori",
    ],
  },
  {
    level: 3,
    label: 'Compétent',
    criteria: "Planifie et priorise en autonomie. Assume la responsabilité de ses choix et gère la complexité courante.",
    indicators: [
      "Définit ses propres objectifs et séquences d'action",
      "Fait des choix délibérés face à plusieurs options",
      "Gère des situations imprévues sans aide systématique",
      "Peut former un novice sur les étapes de base",
    ],
  },
  {
    level: 4,
    label: 'Expert',
    criteria: "Perçoit les situations de façon intuitive et holistique. Adapte sa pratique en temps réel selon le contexte.",
    indicators: [
      "Diagnostique rapidement sans décomposer chaque étape",
      "Voit des patterns là où d'autres voient de la complexité",
      "Identifie les exceptions aux règles et sait quand les contourner",
      "Contribue à améliorer les pratiques de l'équipe",
    ],
  },
  {
    level: 5,
    label: 'Maître',
    criteria: "Redéfinit les pratiques du domaine. Crée de nouvelles approches, forme les experts et innove systématiquement.",
    indicators: [
      "Invente de nouvelles méthodes ou référentiels",
      "Influence la pratique au-delà de son équipe",
      "Accompagne les experts vers leur propre maîtrise",
      "Identifie les limites du domaine et les repousse",
    ],
  },
];

/** Helper : récupère la définition d'un niveau Dreyfus. */
export const getDreyfusLevelDef = (level: DreyfusLevel): DreyfusLevelDef =>
  DREYFUS_LEVEL_DEFS.find((d) => d.level === level)!;

/** Display label for a H.S.O. domain (Cahier #02 — "Hard / Soft / Out skills"). */
export const domainLabel = (domain: CompetenceDomain): string => {
  switch (domain) {
    case 'Soft': return 'Soft skills';
    case 'Hard': return 'Hard skills';
    case 'Out':  return 'Out skills';
  }
};

export const COMPETENCES: Competence[] = [
  // ─── Soft skills (savoir-être, relationnel, leadership) ───────────────────
  { id: 'leadership', label: 'Leadership & Management', domain: 'Soft', subdomain: 'Leadership', levelCategory: 'Avancée', description: 'Diriger, décider, influencer une équipe vers un objectif.' },
  { id: 'communication', label: 'Communication & Influence', domain: 'Soft', subdomain: 'Communication', levelCategory: 'Base', description: 'Transmettre clairement et embarquer ses interlocuteurs.' },
  { id: 'empathy', label: 'Empathie & Intelligence émotionnelle', domain: 'Soft', subdomain: 'Relationnel', levelCategory: 'Base', description: 'Comprendre et adapter sa posture aux autres.' },
  { id: 'cooperation', label: 'Coopération & Équipe', domain: 'Soft', subdomain: 'Relationnel', levelCategory: 'Base', description: 'Travailler efficacement en équipe et en transverse.' },
  { id: 'negotiation', label: 'Négociation & Influence', domain: 'Soft', subdomain: 'Communication', levelCategory: 'Avancée', description: 'Construire des accords gagnants-gagnants.' },
  { id: 'creativity', label: 'Créativité & Innovation', domain: 'Soft', subdomain: 'Créativité', levelCategory: 'Avancée', description: "Générer des idées nouvelles et lever les blocages." },
  { id: 'adaptability', label: 'Adaptabilité & Résilience', domain: 'Soft', subdomain: 'Posture', levelCategory: 'Base', description: "Naviguer dans l'incertitude et rebondir." },
  { id: 'critical_thinking', label: 'Esprit critique', domain: 'Soft', subdomain: 'Cognition', levelCategory: 'Avancée', description: 'Questionner les évidences et argumenter avec rigueur.' },
  { id: 'feedback_culture', label: 'Culture du feedback', domain: 'Soft', subdomain: 'Communication', levelCategory: 'Avancée', description: 'Donner et recevoir un feedback constructif, régulier et actionnable.' },
  { id: 'coaching_posture', label: 'Posture de coach', domain: 'Soft', subdomain: 'Pédagogie', levelCategory: 'Avancée', description: 'Accompagner sans imposer — questions ouvertes, écoute, miroir.' },
  { id: 'active_listening', label: 'Écoute active', domain: 'Soft', subdomain: 'Communication', levelCategory: 'Base', description: 'Reformuler, valider la compréhension, capter le non-dit.' },
  { id: 'public_speaking', label: 'Prise de parole en public', domain: 'Soft', subdomain: 'Communication', levelCategory: 'Avancée', description: 'Structurer un message, gérer le trac, embarquer une audience.' },
  { id: 'conflict_resolution', label: 'Gestion de conflits', domain: 'Soft', subdomain: 'Relationnel', levelCategory: 'Avancée', description: 'Désamorcer les tensions et construire des accords durables.' },
  { id: 'storytelling', label: 'Storytelling pédagogique', domain: 'Soft', subdomain: 'Communication', levelCategory: 'Avancée', description: "Raconter pour faire comprendre et retenir — narration, métaphores, exemples." },
  { id: 'learning_mindset', label: 'Posture apprenante', domain: 'Soft', subdomain: 'Posture', levelCategory: 'Base', description: 'Curiosité, humilité, autonomie dans son propre apprentissage.' },

  // ─── Hard skills (méthodologie, métier, expertise formation pro + IA) ────
  { id: 'strategy', label: 'Stratégie & Vision', domain: 'Hard', subdomain: 'Stratégie', levelCategory: 'Spécialisée', description: 'Définir une direction long terme et arbitrer les priorités.' },
  { id: 'analyse', label: 'Analyse & Décision', domain: 'Hard', subdomain: 'Analyse', levelCategory: 'Avancée', description: 'Collecter, structurer et interpréter des données pour décider.' },
  { id: 'finance', label: 'Finance & Business Acumen', domain: 'Hard', subdomain: 'Finance', levelCategory: 'Spécialisée', description: 'Comprendre les leviers économiques et financiers.' },
  { id: 'project_mgmt', label: 'Gestion de projet', domain: 'Hard', subdomain: 'Pilotage', levelCategory: 'Avancée', description: 'Planifier, exécuter et clôturer un projet dans les délais.' },
  { id: 'product', label: 'Stratégie produit', domain: 'Hard', subdomain: 'Produit', levelCategory: 'Spécialisée', description: 'Concevoir, prioriser et lancer un produit ou service.' },
  { id: 'data', label: 'Data & Analytics', domain: 'Hard', subdomain: 'Data', levelCategory: 'Spécialisée', description: 'Exploiter les données pour piloter la performance.' },
  { id: 'pedagogical_engineering', label: 'Ingénierie pédagogique', domain: 'Hard', subdomain: 'Formation', levelCategory: 'Spécialisée', description: 'Concevoir des parcours pédagogiques alignés aux objectifs d\'apprentissage.' },
  { id: 'curriculum_design', label: 'Curriculum & syllabus', domain: 'Hard', subdomain: 'Formation', levelCategory: 'Avancée', description: 'Architecturer un programme : objectifs, séquences, évaluations, jalons.' },
  { id: 'andragogy', label: 'Andragogie (apprenants adultes)', domain: 'Hard', subdomain: 'Formation', levelCategory: 'Avancée', description: 'Appliquer les principes d\'apprentissage adulte (Knowles, autonomie, expérience).' },
  { id: 'skills_assessment', label: 'Évaluation des compétences', domain: 'Hard', subdomain: 'Formation', levelCategory: 'Avancée', description: 'Modèle Dreyfus, rubriques, JAC, validation par les pairs.' },
  { id: 'learning_evaluation', label: 'Évaluation de la formation (Kirkpatrick)', domain: 'Hard', subdomain: 'Formation', levelCategory: 'Spécialisée', description: 'Mesurer impact, transfert, retour sur attentes (4 niveaux Kirkpatrick).' },
  { id: 'agile_methodology', label: 'Méthodologies Agile', domain: 'Hard', subdomain: 'Méthode', levelCategory: 'Avancée', description: 'Scrum, Kanban, sprints, cérémonies, amélioration continue.' },
  { id: 'ai_strategy', label: 'Stratégie IA en entreprise', domain: 'Hard', subdomain: 'IA', levelCategory: 'Spécialisée', description: 'Identifier les cas d\'usage IA à valeur, gouvernance, ROI.' },
  { id: 'prompt_engineering', label: 'Prompt engineering', domain: 'Hard', subdomain: 'IA', levelCategory: 'Avancée', description: 'Structurer des prompts efficaces — contexte, contraintes, chain-of-thought.' },
  { id: 'ai_ethics', label: 'Éthique & IA responsable', domain: 'Hard', subdomain: 'IA', levelCategory: 'Avancée', description: 'Biais, RGPD, transparence, droits d\'auteur, hallucinations.' },

  // ─── Out skills (outils, plateformes, exécution opérationnelle) ──────────
  { id: 'tech_tools', label: 'Tech & Outils numériques', domain: 'Out', subdomain: 'Outils', levelCategory: 'Base', description: 'Maîtriser les outils digitaux du quotidien pro.' },
  { id: 'ai_tools', label: 'IA générative & prompting', domain: 'Out', subdomain: 'IA', levelCategory: 'Avancée', description: 'Utiliser ChatGPT/Claude/Gemini au quotidien pro.' },
  { id: 'collaboration_tools', label: 'Outils collaboratifs', domain: 'Out', subdomain: 'Outils', levelCategory: 'Base', description: 'Slack, Notion, Miro, Figma & co.' },
  { id: 'data_tools', label: 'Outils Data (BI, SQL, tableurs)', domain: 'Out', subdomain: 'Data', levelCategory: 'Avancée', description: 'Manipuler la donnée avec les bons outils.' },
  { id: 'automation', label: 'Automatisation & No-code', domain: 'Out', subdomain: 'Automatisation', levelCategory: 'Avancée', description: 'Zapier, Make, scripts, agents IA.' },
  { id: 'design_tools', label: 'Outils Design & Visuel', domain: 'Out', subdomain: 'Design', levelCategory: 'Base', description: 'Figma, Canva, Photoshop, génération d\'images.' },
  { id: 'lms_mastery', label: 'Maîtrise LMS', domain: 'Out', subdomain: 'Formation', levelCategory: 'Avancée', description: 'Moodle, 360Learning, TalentLMS — configurer parcours, suivre apprenants.' },
  { id: 'authoring_tools', label: 'Outils auteur e-learning', domain: 'Out', subdomain: 'Formation', levelCategory: 'Avancée', description: 'Articulate Storyline, Rise, Genially, H5P — créer modules interactifs.' },
  { id: 'video_production', label: 'Production vidéo pédagogique', domain: 'Out', subdomain: 'Média', levelCategory: 'Avancée', description: 'Loom, Descript, CapCut — capsules courtes, voix off, sous-titres.' },
  { id: 'screencast_tools', label: 'Screencast & tutoriels', domain: 'Out', subdomain: 'Média', levelCategory: 'Base', description: 'Loom, Tella, Camtasia — montrer un workflow étape par étape.' },
  { id: 'webinar_tools', label: 'Webinars & classes virtuelles', domain: 'Out', subdomain: 'Média', levelCategory: 'Base', description: 'Zoom, Livestorm, Riverside — animation interactive distancielle.' },
  { id: 'ai_assistants', label: 'Assistants IA conversationnels', domain: 'Out', subdomain: 'IA', levelCategory: 'Base', description: 'ChatGPT, Claude, Gemini — usage quotidien & cas pédagogiques.' },
  { id: 'ai_image_gen', label: 'Génération d\'images IA', domain: 'Out', subdomain: 'IA', levelCategory: 'Avancée', description: 'Midjourney, DALL-E, Stable Diffusion — visuels pédagogiques.' },
  { id: 'ai_coding_tools', label: 'IA coding assistants', domain: 'Out', subdomain: 'IA', levelCategory: 'Spécialisée', description: 'GitHub Copilot, Cursor, Claude Code — pair programming.' },
  { id: 'analytics_tools', label: 'Analytics & tableaux de bord', domain: 'Out', subdomain: 'Data', levelCategory: 'Avancée', description: 'Mixpanel, Amplitude, Looker, Metabase — KPIs apprentissage.' },
];

/** Lookup helper. Retourne undefined si l'ID n'existe pas. */
export const getCompetenceById = (id: string): Competence | undefined =>
  COMPETENCES.find((c) => c.id === id);

/** Filtrer par domaine H.S.O. */
export const getCompetencesByDomain = (domain: CompetenceDomain): Competence[] =>
  COMPETENCES.filter((c) => c.domain === domain);
