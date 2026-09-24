/**
 * Reconnaissances — ce que l'app apprenant célèbre depuis l'arbitrage n°18
 * (tranché le 2026-09-24, option B) : plus de série, plus d'XP, plus de
 * classement. Il reste deux choses, et ce fichier les calcule :
 *
 *   1. des **Open Badges adossés à un niveau VALIDÉ** du Passeport ;
 *   2. un **rythme hebdomadaire calme** (« actif 3 semaines sur les 4
 *      dernières »), sans compte à rebours.
 *
 * Fonctions pures : la page lit les stores dans son rendu (règle d'état de
 * CLAUDE.md, pas d'instantané) et leur passe ce qu'elle a lu. Rien n'est
 * inventé ici — chaque ligne vient d'un store existant.
 */

import type {
  DreyfusLabel,
  DreyfusLevel,
  EvidenceRef,
  LearnerCompetency,
  UserBadge,
} from '../types/learning';
import { getBadgeDefById } from '../data/gamification';
import { DREYFUS_LABELS, getCompetenceById } from '../data/competencies';

/* ─── 1. Les Open Badges de niveaux validés ─────────────────────────────── */

export interface Reconnaissance {
  /** Identifiant du badge au référentiel (`BADGE_DEFS`) : la clé de sa page de détail. */
  badgeId: string;
  competenceId: string;
  /** Libellé de la compétence au référentiel H.S.O. */
  competence: string;
  niveau: DreyfusLevel;
  niveauLabel: DreyfusLabel;
  /** Date d'émission du badge (`UserBadge.earnedAt`, ISO). */
  obtenuLe: string;
  /** La validation humaine qui porte ce niveau, quand le Passeport l'a enregistrée. */
  validation?: { par: string; le: string };
}

/**
 * Les badges qu'on affiche : ceux du type `competence` (un couple compétence ×
 * niveau Dreyfus), **et seulement si le Passeport valide ce niveau**
 * (`currentLevel` ≥ niveau du badge). Un niveau auto-évalué
 * (`selfAssessedLevel`) ne porte aucun badge. Les badges « plateforme »
 * (séries, XP, premier parcours) et les certifications de parcours
 * (`open_badge`, sans niveau) ne sont adossés à aucun niveau : ils restent en
 * données, ils ne s'affichent plus.
 *
 * « Qui l'a validé et quand » : la preuve dialoguée ou certifiante
 * (`validateCompetency`) qui affirme exactement ce niveau. Sans elle, on ne
 * nomme personne — on donne la date d'émission du badge.
 */
export function reconnaissances(
  badges: UserBadge[],
  competences: LearnerCompetency[],
  preuves: EvidenceRef[],
): Reconnaissance[] {
  const lignes: Reconnaissance[] = [];
  for (const ub of badges) {
    const def = getBadgeDefById(ub.badgeId);
    if (!def || def.type !== 'competence' || !def.competenceId || !def.dreyfusLevel) continue;
    const lc = competences.find((c) => c.competenceId === def.competenceId);
    if (lc?.currentLevel == null || lc.currentLevel < def.dreyfusLevel) continue;

    const preuve = preuves
      .filter(
        (p) =>
          p.competenceId === def.competenceId &&
          p.regime !== 'light' &&
          p.assertedLevel === def.dreyfusLevel &&
          !!p.verifiedByName,
      )
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))[0];

    lignes.push({
      badgeId: def.id,
      competenceId: def.competenceId,
      competence: getCompetenceById(def.competenceId)?.label ?? def.competenceId,
      niveau: def.dreyfusLevel,
      niveauLabel: DREYFUS_LABELS[def.dreyfusLevel],
      obtenuLe: ub.earnedAt,
      validation: preuve ? { par: preuve.verifiedByName!, le: preuve.occurredAt } : undefined,
    });
  }
  // La plus récente d'abord : la date de validation si on la connaît, sinon l'émission.
  const date = (r: Reconnaissance) => r.validation?.le ?? r.obtenuLe;
  return lignes.sort((a, b) => date(b).localeCompare(date(a)));
}

/* ─── 2. Le rythme hebdomadaire ─────────────────────────────────────────── */

const SEMAINE_MS = 7 * 24 * 60 * 60 * 1000;

/** Ce qui compte comme activité : ce que l'apprenant a fait, lu dans les stores. */
export interface SourcesActivite {
  /** `useLessonProgressStore().lessons` — visites de section et passages de quiz. */
  lecons?: Record<string, { lastVisited: number; quizAttempts?: { completedAt: number }[] }>;
  /** `useCardReviewStore().reviews` — révisions de flashcards. */
  revisions?: Record<string, { lastReviewedAt: number }>;
  /** Entrées du journal. */
  entreesJournal?: { createdAt: string }[];
  /** Sessions de coaching ; seules les sessions tenues comptent. */
  sessionsCoaching?: { scheduledAt: string; status: string }[];
  /** Preuves du Passeport (révisions, quiz, validations). */
  preuves?: { occurredAt: string }[];
}

/** Tous les instants d'activité connus, en millisecondes. */
export function instantsActivite(s: SourcesActivite): number[] {
  const t: number[] = [];
  for (const l of Object.values(s.lecons ?? {})) {
    t.push(l.lastVisited);
    for (const q of l.quizAttempts ?? []) t.push(q.completedAt);
  }
  for (const r of Object.values(s.revisions ?? {})) t.push(r.lastReviewedAt);
  for (const e of s.entreesJournal ?? []) t.push(Date.parse(e.createdAt));
  for (const c of s.sessionsCoaching ?? []) if (c.status === 'completed') t.push(Date.parse(c.scheduledAt));
  for (const p of s.preuves ?? []) t.push(Date.parse(p.occurredAt));
  return t.filter((x) => Number.isFinite(x));
}

/**
 * Pour chacune des `nb` dernières périodes de sept jours, la plus ancienne
 * d'abord : y a-t-il eu au moins une activité ?
 *
 * Des périodes glissantes, pas des semaines de calendrier : un lundi matin, la
 * semaine en cours serait encore vide, et l'écran dirait « inactif » à quelqu'un
 * qui n'a simplement pas encore commencé sa semaine. Il n'y a pas de compte à
 * rebours à tenir : la dernière case se remplit quand on revient.
 */
export function semainesActives(instants: number[], maintenant = Date.now(), nb = 4): boolean[] {
  const cases = Array.from({ length: nb }, () => false);
  for (const t of instants) {
    if (t > maintenant) continue;
    const k = Math.floor((maintenant - t) / SEMAINE_MS); // 0 = les sept derniers jours
    if (k < nb) cases[nb - 1 - k] = true;
  }
  return cases;
}

/** La phrase du rythme. Aucune ne presse, aucune ne compte ce qu'on a « perdu ». */
export function phraseRythme(cases: boolean[]): string {
  const n = cases.filter(Boolean).length;
  const total = cases.length;
  if (n === 0) return `Pas d'activité ces ${total} dernières semaines : tu reprends quand tu veux.`;
  if (n === total) return `Actif chacune des ${total} dernières semaines`;
  return `Actif ${n} semaine${n > 1 ? 's' : ''} sur les ${total} dernières`;
}
