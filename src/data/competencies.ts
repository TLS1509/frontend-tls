/**
 * Mock référentiel compétences H.S.O. (Humain / Savoirs / Organisation).
 * Source de vérité MVP côté FO — à remplacer par BDD/API en V1.
 *
 * Cahier #02 Passeport Compétences :
 *   - domaine racine H.S.O.
 *   - subdomain (ex: "Communication" sous "Humain")
 *   - level_category (Base / Avancée / Spécialisée)
 *   - 5 niveaux Dreyfus FR : Novice / Apprenant / Compétent / Expert / Maître
 *
 * Initial set = ~20 compétences extensible vers 80+.
 */

import type {
  Competence,
  CompetenceDomain,
  DreyfusLabel,
  DreyfusLevel,
} from '../types/learning';

/** Libellés FR canoniques des 5 niveaux Dreyfus (Cahier #02). */
export const DREYFUS_LABELS: Record<DreyfusLevel, DreyfusLabel> = {
  1: 'Novice',
  2: 'Apprenant',
  3: 'Compétent',
  4: 'Expert',
  5: 'Maître',
};

export const COMPETENCES: Competence[] = [
  // ─── Humain (savoir-être, relationnel, leadership) ────────────────────────
  { id: 'leadership', label: 'Leadership & Management', domain: 'Humain', subdomain: 'Leadership', levelCategory: 'Avancée', description: 'Diriger, décider, influencer une équipe vers un objectif.' },
  { id: 'communication', label: 'Communication & Influence', domain: 'Humain', subdomain: 'Communication', levelCategory: 'Base', description: 'Transmettre clairement et embarquer ses interlocuteurs.' },
  { id: 'empathy', label: 'Empathie & Intelligence émotionnelle', domain: 'Humain', subdomain: 'Relationnel', levelCategory: 'Base', description: 'Comprendre et adapter sa posture aux autres.' },
  { id: 'cooperation', label: 'Coopération & Équipe', domain: 'Humain', subdomain: 'Relationnel', levelCategory: 'Base', description: 'Travailler efficacement en équipe et en transverse.' },
  { id: 'negotiation', label: 'Négociation & Influence', domain: 'Humain', subdomain: 'Communication', levelCategory: 'Avancée', description: 'Construire des accords gagnants-gagnants.' },
  { id: 'creativity', label: 'Créativité & Innovation', domain: 'Humain', subdomain: 'Créativité', levelCategory: 'Avancée', description: "Générer des idées nouvelles et lever les blocages." },
  { id: 'adaptability', label: 'Adaptabilité & Résilience', domain: 'Humain', subdomain: 'Posture', levelCategory: 'Base', description: "Naviguer dans l'incertitude et rebondir." },
  { id: 'critical_thinking', label: 'Esprit critique', domain: 'Humain', subdomain: 'Cognition', levelCategory: 'Avancée', description: 'Questionner les évidences et argumenter avec rigueur.' },

  // ─── Savoirs (connaissances métier, expertise) ────────────────────────────
  { id: 'strategy', label: 'Stratégie & Vision', domain: 'Savoirs', subdomain: 'Stratégie', levelCategory: 'Spécialisée', description: 'Définir une direction long terme et arbitrer les priorités.' },
  { id: 'analyse', label: 'Analyse & Décision', domain: 'Savoirs', subdomain: 'Analyse', levelCategory: 'Avancée', description: 'Collecter, structurer et interpréter des données pour décider.' },
  { id: 'finance', label: 'Finance & Business Acumen', domain: 'Savoirs', subdomain: 'Finance', levelCategory: 'Spécialisée', description: 'Comprendre les leviers économiques et financiers.' },
  { id: 'project_mgmt', label: 'Gestion de projet', domain: 'Savoirs', subdomain: 'Pilotage', levelCategory: 'Avancée', description: 'Planifier, exécuter et clôturer un projet dans les délais.' },
  { id: 'product', label: 'Stratégie produit', domain: 'Savoirs', subdomain: 'Produit', levelCategory: 'Spécialisée', description: 'Concevoir, prioriser et lancer un produit ou service.' },
  { id: 'data', label: 'Data & Analytics', domain: 'Savoirs', subdomain: 'Data', levelCategory: 'Spécialisée', description: 'Exploiter les données pour piloter la performance.' },

  // ─── Organisation (outils, process, méthodes opérationnelles) ─────────────
  { id: 'tech_tools', label: 'Tech & Outils numériques', domain: 'Organisation', subdomain: 'Outils', levelCategory: 'Base', description: 'Maîtriser les outils digitaux du quotidien pro.' },
  { id: 'ai_tools', label: 'IA générative & prompting', domain: 'Organisation', subdomain: 'IA', levelCategory: 'Avancée', description: 'Utiliser les IA génératives au quotidien.' },
  { id: 'collaboration_tools', label: 'Outils collaboratifs', domain: 'Organisation', subdomain: 'Outils', levelCategory: 'Base', description: 'Slack, Notion, Miro, Figma & co.' },
  { id: 'data_tools', label: 'Outils Data (BI, SQL, tableurs)', domain: 'Organisation', subdomain: 'Data', levelCategory: 'Avancée', description: 'Manipuler la donnée avec les bons outils.' },
  { id: 'automation', label: 'Automatisation & No-code', domain: 'Organisation', subdomain: 'Automatisation', levelCategory: 'Avancée', description: 'Zapier, Make, scripts, agents IA.' },
  { id: 'design_tools', label: 'Outils Design & Visuel', domain: 'Organisation', subdomain: 'Design', levelCategory: 'Base', description: 'Figma, Canva, Photoshop, génération d\'images.' },
];

/** Lookup helper. Retourne undefined si l'ID n'existe pas. */
export const getCompetenceById = (id: string): Competence | undefined =>
  COMPETENCES.find((c) => c.id === id);

/** Filtrer par domaine H.S.O. */
export const getCompetencesByDomain = (domain: CompetenceDomain): Competence[] =>
  COMPETENCES.filter((c) => c.domain === domain);
