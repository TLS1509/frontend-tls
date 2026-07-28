/**
 * MarketingDiagnostic — hub Autodiagnostics, /website/diagnostic.
 *
 * Reconstruit le 28/07/2026 sur la BASE STRUCTURELLE ET ÉDITORIALE du
 * prototype de Pierre-Armand ("TEST WIZARD PAGE AUTODIAG", zip joint à la
 * page Notion source), ré-implémenté au design system TLS :
 *  - contenu verbatim : 2×8 questions (titres + 4 options), questions
 *    ouvertes, 4 profils avec synthèse, textes hub/gate/report ;
 *  - flow verbatim : hub → wizard AUTO-AVANCE à la sélection (retour seul) →
 *    2 questions ouvertes → résultat partiel (score ring % + profil +
 *    synthèse) + formulaire lead (prénom/nom/email/fonction/taille) →
 *    rapport complet (restitution des 8 réponses + réponses libres).
 *
 * Écarts documentés vs prototype :
 *  - "Open Badges 2.0 certifiés et vérifiables" (SBO Q8-D) → "Open Badges
 *    vérifiables" (FACTS-CANON F6 : jamais "2.0", pas de "certifié" non
 *    sourcé) ;
 *  - créneaux Calendly SIMULÉS (toast factice) → vrai CTA vers
 *    /website/contact (pas de fausse réservation sur le site réel) ;
 *  - le lead part réellement via submitForm (Web3Forms) avec le récap
 *    complet — le rapport PDF auto (n8n) reste V2.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Gauge,
  Layers,
  Lock,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { submitForm } from './utils/submitForm';

// ─── Banques de questions (contenu Pierre-Armand, verbatim) ──────────────────

type TestKey = 'sbo' | 'ia';
type Question = { title: string; options: [string, string, string, string] };
type Profil = { max: number; name: string; synthesis: string };

const BANKS: Record<TestKey, {
  label: string;
  cible: string;
  pitch: string;
  bullets: [string, string, string];
  icon: React.ReactNode;
  openQuestions: [string, string];
  profiles: Profil[];
  questions: Question[];
  accent: { badge: string; bar: string; optSelected: string; text: string; ring: string; border: string };
}> = {
  sbo: {
    label: 'SBO Readiness',
    cible: 'DRH · Responsables L&D',
    pitch:
      "Où en est votre organisation dans la cartographie des compétences réelles, la fin des fiches de poste figées et la gestion de l'atrophie des savoir-faire ?",
    bullets: [
      'Cartographie Dreyfus des compétences',
      'Fraîcheur & obsolescence des acquis',
      'Reconnaissance & certification',
    ],
    icon: <Layers size={22} />,
    openQuestions: [
      "Quelle est aujourd'hui votre principale frustration concernant la gestion des compétences et le développement de vos talents ?",
      'Si vous deviez résoudre un seul enjeu prioritaire RH/Compétences dans les 12 prochains mois, quel serait-il ?',
    ],
    profiles: [
      { max: 30, name: 'Niveau 1 : Modèle Figé', synthesis: "Votre gestion des compétences repose encore sur des outils statiques (fiches de poste, tableurs) déconnectés de la réalité du terrain. La priorité est d'amorcer une cartographie vivante des compétences." },
      { max: 60, name: 'Niveau 2 : Sensibilisé', synthesis: "Des initiatives ponctuelles existent, mais elles restent isolées et peu outillées. Le passage à l'échelle nécessite une structuration autour de référentiels partagés et actualisés." },
      { max: 85, name: 'Niveau 3 : Skill-Oriented en Transition', synthesis: "Votre organisation a engagé une vraie transformation vers le pilotage par les compétences. Il reste à fiabiliser la fraîcheur des données et à généraliser l'approche à l'ensemble des métiers." },
      { max: 100, name: 'Niveau 4 : Native SBO Organization', synthesis: 'Votre organisation pilote nativement par les compétences : cartographie vivante, évaluation par preuves et reconnaissance certifiée. Vous êtes en position de référence sur ce sujet.' },
    ],
    questions: [
      { title: 'Modélisation des Métiers', options: ['Fiches de poste figées Word/PDF', 'Référentiels L&D mis à jour 1x/an', 'Cartographies partagées mais déconnectées des projets', '100% SBO, briques vivantes rattachées aux missions'] },
      { title: 'Évaluation de la Maîtrise', options: ['Entretien annuel déclaratif', 'Quiz e-learning théoriques', 'Auto-évaluations régulières', "Échelle d'observation Dreyfus 1 à 5 basée sur preuves"] },
      { title: 'Fraîcheur des Données', options: ['Annuelle / Bisannuelle', 'Ponctuelle post-formation', 'Trimestrielle au volontariat', 'Temps réel (veille, parcours, projets)'] },
      { title: "Gestion de l'Obsolescence", options: ['Acquis à vie', "Supposée s'estomper sans outil", 'Réévaluation manuelle managers', "Dégradation automatique après 90j d'inactivité + alerte"] },
      { title: 'Granularité du Référentiel', options: ['Liste générique transversale', 'Hard vs Soft skills classique', 'Référentiel par fiche de poste', '3 domaines : Hard, Soft, Out skills (IA)'] },
      { title: 'Alignement Projets & Skill Gaps', options: ['Réseau / Feeling / Intitulé', 'Consultation CV interne', 'Recherche mots-clés base talents', 'Heatmap 360° en temps réel des skill gaps'] },
      { title: 'Mécanisme de Formation', options: ['Stages ponctuels plusieurs jours', 'Catalogue e-learning vidéo passif', 'Blended learning théorie + quiz', 'Work-Integrated Learning (Micro-veille + EDRA)'] },
      { title: 'Reconnaissance & Valorisation', options: ['Intitulé de poste / Fiche de paie uniquement', 'Attestation de présence PDF', 'Badge interne non standard', 'Open Badges vérifiables'] },
    ],
    accent: {
      badge: 'bg-primary-100 text-primary-800',
      bar: 'bg-primary-600',
      optSelected: 'border-primary-700 bg-primary-50 text-ink-900',
      text: 'text-primary-700',
      ring: 'stroke-primary-600',
      border: 'border-primary-200',
    },
  },
  ia: {
    label: 'IA Readiness',
    cible: 'CODIR · Direction des Opérations',
    pitch:
      "Mesurez l'usage réel de l'IA dans vos équipes, l'augmentation de vos processus métiers et le niveau d'ancrage terrain au-delà des effets d'annonce.",
    bullets: [
      'Adoption réelle vs. Shadow IA',
      'Processus métiers augmentés',
      'Ancrage terrain & mesure du ROI',
    ],
    icon: <Bot size={22} />,
    openQuestions: [
      "Quel est actuellement le principal frein qui empêche vos équipes d'intégrer pleinement l'IA dans leur travail quotidien ?",
      "Quel métier ou processus de votre entreprise bénéficierait le plus d'une augmentation par l'IA dans les prochains mois ?",
    ],
    profiles: [
      { max: 30, name: 'Niveau 1 : Shadow IA & Passivité', synthesis: "L'IA est utilisée de façon individuelle et non encadrée, sans réécriture des processus. Le risque est une adoption fragmentée sans valeur mesurable pour l'organisation." },
      { max: 60, name: 'Niveau 2 : Expérimentation Aérienne', synthesis: "Des usages émergent mais restent superficiels, sans ancrage dans les processus métiers réels. Il est temps de structurer la formation et de mesurer les premiers cas d'usage." },
      { max: 85, name: 'Niveau 3 : Adoption Structurée', synthesis: "L'IA est intégrée à des processus identifiés, avec un accompagnement des équipes. La prochaine étape est de généraliser la mesure de valeur et l'ancrage terrain durable." },
      { max: 100, name: "Niveau 4 : Entreprise Augmentée par l'IA", synthesis: "Votre organisation a transformé ses processus métiers grâce à l'IA, avec une adoption large, mesurée et ancrée dans le travail réel des équipes. Vous êtes en position de référence sur ce sujet." },
    ],
    questions: [
      { title: "Taux d'Adoption Réelle", options: ['Shadow AI individuel non encadré', 'Quelques paires moteurs', 'Licences distribuées, tests fréquents', '100% des équipes sur tâches identifiées'] },
      { title: 'Reconstitution des Processus Métiers', options: ['Aucun process réécrit', 'Recherche / Correction de texte basique', 'Processus clés identifiés avec prompts', "Fiches de process révisées avec l'IA à chaque étape (Out-skills)"] },
      { title: 'Acculturation & Formation IA', options: ['Aucune formation', 'Webinaires de sensibilisation générale', 'Formations ponctuelles au prompt engineering', 'Accompagnement continu : veille + tuteurs IA intégrés'] },
      { title: 'Qualité & Hallucinations', options: ['Confiance aveugle ou méfiance totale', 'Consigne orale de relecture', 'Relecture humaine systématique', 'Validation double : curation IA + experts pédagogiques'] },
      { title: 'Veille & Innovation IA', options: ['Veille perso individuelle', 'Canal Slack/Teams informel', 'Newsletter mensuelle DSI', 'Flux Continuous Intelligence distribué par compétences'] },
      { title: 'Posture des Managers', options: ['Neutres ou réticents', 'Encourageants mais sans méthode', "Suivi des cas d'usage et outils", "Animation d'ateliers pratiques (12 pers max) + validation terrain"] },
      { title: 'Ancrage dans le travail', options: ['Livrés à eux-mêmes post-formation', 'Exercices fictifs en atelier', 'Application sur projet réel sous 1 mois', 'Méthode AFEST / EDRA avec coaching 1-1'] },
      { title: 'ROI & Mesure de la Valeur', options: ['Aucun suivi', 'Nombre de licences ou connexions', 'Enquêtes de satisfaction / ressenti', 'Mesure du niveau de compétence (Dreyfus) + gain process'] },
    ],
    accent: {
      badge: 'bg-secondary-100 text-secondary-800',
      bar: 'bg-secondary-600',
      optSelected: 'border-secondary-700 bg-secondary-50 text-ink-900',
      text: 'text-secondary-700',
      ring: 'stroke-secondary-600',
      border: 'border-secondary-200',
    },
  },
};

const LETTRES = ['A', 'B', 'C', 'D'] as const;
const TAILLES = ['1 à 49 salariés', '50 à 249 salariés', '250 à 999 salariés', '1000 salariés et plus'];

// ─── Score ring (SVG, DS tokens, reduced-motion safe) ────────────────────────

const RING_R = 60;
const RING_C = 2 * Math.PI * RING_R;

const ScoreRing: React.FC<{ score: number; ringClass: string }> = ({ score, ringClass }) => {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? score : 0);
  const [offset, setOffset] = useState(reduced ? RING_C - (score / 100) * RING_C : RING_C);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setDisplay(score);
      setOffset(RING_C - (score / 100) * RING_C);
      return;
    }
    setOffset(RING_C);
    const id = requestAnimationFrame(() => setOffset(RING_C - (score / 100) * RING_C));
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 900, 1);
      setDisplay(Math.round(p * score));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [score, reduced]);

  return (
    <div className="relative h-36 w-36 shrink-0" role="img" aria-label={`Score : ${score} sur 100`}>
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={RING_R} fill="none" strokeWidth="10" className="stroke-ink-100" />
        <circle
          cx="70"
          cy="70"
          r={RING_R}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className={`${ringClass} transition-[stroke-dashoffset] duration-glacial ease-emphasis`}
          strokeDasharray={RING_C}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-baseline justify-center pt-12">
        <span className="font-display text-h1 font-extrabold text-ink-900 leading-none">{display}</span>
        <span className="font-body text-body-sm font-bold text-ink-500">%</span>
      </div>
    </div>
  );
};

// ─── Composant page ──────────────────────────────────────────────────────────

type Phase = 'hub' | 'wizard' | 'open' | 'result' | 'report';

type Lead = { firstName: string; lastName: string; email: string; role: string; companySize: string };

export const MarketingDiagnostic: React.FC = () => {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('hub');
  const [testKey, setTestKey] = useState<TestKey>('sbo');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>([]);
  const [openAnswers, setOpenAnswers] = useState<[string, string]>(['', '']);
  const [lead, setLead] = useState<Lead>({ firstName: '', lastName: '', email: '', role: '', companySize: '' });
  const [leadError, setLeadError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const advanceTimer = useRef<number | null>(null);

  const bank = BANKS[testKey];
  const total = bank.questions.length;
  const scoreBrut = answers.reduce<number>((s, v) => s + (v ?? 0), 0);
  const score = Math.round((scoreBrut / (total * 3)) * 100);
  const profile = useMemo(
    () => bank.profiles.find((p) => score <= p.max) ?? bank.profiles[bank.profiles.length - 1],
    [bank, score],
  );

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  const go = (p: Phase) => {
    setPhase(p);
    window.scrollTo({ top: 0 });
  };

  const startDiagnostic = (k: TestKey) => {
    setTestKey(k);
    setAnswers(BANKS[k].questions.map(() => null));
    setOpenAnswers(['', '']);
    setQIndex(0);
    setLeadError(null);
    go('wizard');
  };

  // Auto-avance : sélectionner une option enchaîne la question suivante
  // (pattern du prototype PAD, délai 260 ms pour le feedback visuel).
  const selectOption = (optIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      if (qIndex === total - 1) go('open');
      else setQIndex((i) => i + 1);
    }, reduced ? 0 : 260);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim());
    if (!lead.firstName.trim() || !lead.lastName.trim() || !emailOk || !lead.role.trim() || !lead.companySize) {
      setLeadError('Merci de compléter tous les champs obligatoires.');
      return;
    }
    setLeadError(null);
    setSending(true);
    const recap = bank.questions
      .map((q, i) => {
        const a = answers[i];
        return `${i + 1}. ${q.title} → ${a !== null ? `${LETTRES[a]} (${a} pt${a > 1 ? 's' : ''}) — ${q.options[a]}` : '—'}`;
      })
      .join('\n');
    await submitForm({
      name: `${lead.firstName} ${lead.lastName}`,
      email: lead.email,
      org: `${lead.role} · ${lead.companySize}`,
      subject: `Autodiagnostic ${bank.label} — ${lead.lastName}`,
      message: `Score : ${score}/100 (${profile.name})\n\n${recap}\n\nQ ouverte 1 (${bank.openQuestions[0]}) :\n${openAnswers[0] || 'Non renseigné.'}\n\nQ ouverte 2 (${bank.openQuestions[1]}) :\n${openAnswers[1] || 'Non renseigné.'}`,
      _source: `diagnostic-${testKey}`,
    });
    setSending(false);
    go('report');
  };

  const resetAll = () => {
    setAnswers([]);
    setOpenAnswers(['', '']);
    setQIndex(0);
    setLead({ firstName: '', lastName: '', email: '', role: '', companySize: '' });
    setLeadError(null);
    go('hub');
  };

  const reveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
      };

  const inputCls =
    'h-12 w-full rounded-pill border border-ink-200 bg-white px-5 font-body text-body text-ink-900 placeholder:text-ink-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

  return (
    <div className="bg-white">
      <SEOHead
        title="Autodiagnostics SBO & IA · The Learning Society"
        description="Évaluez la maturité de votre organisation en 3 minutes : diagnostic SBO Readiness ou IA Readiness, 8 questions, 2 questions ouvertes, un rapport personnalisé."
        canonical="/website/diagnostic"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white min-h-[70dvh]">
        <div
          aria-hidden
          className="absolute -top-28 right-[-8%] h-[420px] w-[420px] rounded-pill bg-primary-200/40 blur-3xl pointer-events-none"
        />
        <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24">

          {/* ── Écran 0 : hub ─────────────────────────────────────────────── */}
          {phase === 'hub' && (
            <motion.div {...reveal} className="flex flex-col gap-section-lg">
              <div className="flex max-w-3xl flex-col gap-stack-lg">
                <p className="inline-flex w-fit items-center gap-2 rounded-pill bg-primary-100 px-4 py-1.5 font-body text-caption font-bold text-primary-800 m-0">
                  <Gauge size={14} />
                  Auto-diagnostic gratuit
                </p>
                <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.25rem,5vw,3.75rem)]">
                  Évaluez la maturité de votre organisation{' '}
                  <span className="text-primary-700">en 3 minutes.</span>
                </h1>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                  Choisissez le diagnostic adapté à votre enjeu. 8 questions,
                  2 questions ouvertes, un rapport personnalisé.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
                {(Object.keys(BANKS) as TestKey[]).map((k) => {
                  const b = BANKS[k];
                  return (
                    <div
                      key={k}
                      className={`flex h-full flex-col justify-between gap-stack-lg rounded-2xl border bg-white p-stack-lg shadow-card ${b.accent.border}`}
                    >
                      <div className="flex flex-col gap-stack">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${b.accent.badge}`}>
                            {b.icon}
                          </span>
                          <span className="font-body text-caption font-bold text-ink-500">{b.cible}</span>
                        </div>
                        <h2 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight">{b.label}</h2>
                        <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{b.pitch}</p>
                        <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
                          {b.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-center gap-stack-xs">
                              <CheckCircle2 size={15} className={`${b.accent.text} shrink-0`} />
                              <span className="font-body text-body-sm text-ink-700">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <MagneticButton strength={10}>
                        <Button onClick={() => startDiagnostic(k)} variant="primary" size="lg" fullWidth trailingIcon={<ArrowRight size={18} />}>
                          {k === 'sbo' ? 'Démarrer le diagnostic SBO' : 'Démarrer le diagnostic IA'}
                        </Button>
                      </MagneticButton>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Wizard Q1-Q8 (auto-avance) ────────────────────────────────── */}
          {phase === 'wizard' && (
            <motion.div {...reveal} key={`q-${qIndex}`} className="mx-auto flex w-full max-w-content flex-col gap-stack-lg">
              <div className="flex items-center justify-between gap-stack">
                <span className={`inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 font-body text-caption font-bold ${bank.accent.badge}`}>
                  {bank.icon}
                  Diagnostic {bank.label}
                </span>
                <span className="font-body text-caption font-bold text-ink-500">
                  Question {qIndex + 1} / {total}
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={qIndex + 1}
                aria-valuemin={1}
                aria-valuemax={total}
                aria-label={`Progression : question ${qIndex + 1} sur ${total}`}
                className="h-1.5 w-full overflow-hidden rounded-pill bg-ink-100"
              >
                <div
                  className={`h-full rounded-pill transition-all duration-base ${bank.accent.bar}`}
                  style={{ width: `${Math.round(((qIndex + 1) / total) * 100)}%` }}
                />
              </div>

              <h2 className="font-display text-h3 font-extrabold text-ink-900 m-0 leading-tight [text-wrap:balance]">
                {qIndex + 1}. {bank.questions[qIndex].title}
              </h2>

              <div className="flex flex-col gap-stack-xs" role="radiogroup" aria-label="Choisir une réponse">
                {bank.questions[qIndex].options.map((opt, vi) => {
                  const selected = answers[qIndex] === vi;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => selectOption(vi)}
                      className={`flex min-h-touch items-start gap-stack rounded-2xl border-2 p-stack text-left transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                        selected
                          ? bank.accent.optSelected
                          : 'border-ink-200 bg-white text-ink-800 hover:bg-ink-50'
                      }`}
                    >
                      <span
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-pill font-body text-caption font-extrabold ${
                          selected ? `${bank.accent.badge}` : 'bg-ink-100 text-ink-600'
                        }`}
                      >
                        {LETTRES[vi]}
                      </span>
                      <span className="font-body text-body leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-stack-xs">
                <Button
                  onClick={() => (qIndex === 0 ? resetAll() : setQIndex((i) => i - 1))}
                  variant="ghost"
                  size="md"
                  leadingIcon={<ArrowLeft size={16} />}
                >
                  Retour
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Questions ouvertes ────────────────────────────────────────── */}
          {phase === 'open' && (
            <motion.div {...reveal} className="mx-auto flex w-full max-w-content flex-col gap-stack-lg">
              <span className={`inline-flex w-fit items-center gap-2 rounded-pill px-3.5 py-1.5 font-body text-caption font-bold ${bank.accent.badge}`}>
                {bank.icon}
                Diagnostic {bank.label}
              </span>
              <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight [text-wrap:balance]">
                Deux dernières questions, en toute liberté.
              </h2>
              <p className="font-body text-body text-ink-600 m-0">
                Facultatif : vos réponses enrichissent votre rapport
                personnalisé.
              </p>
              {bank.openQuestions.map((q, i) => (
                <div key={q} className="flex flex-col gap-stack-xs">
                  <label htmlFor={`open-${i}`} className="font-body text-body font-bold text-ink-900">
                    {q}
                  </label>
                  <textarea
                    id={`open-${i}`}
                    rows={3}
                    value={openAnswers[i]}
                    onChange={(e) =>
                      setOpenAnswers((prev) => (i === 0 ? [e.target.value, prev[1]] : [prev[0], e.target.value]))
                    }
                    className="h-auto min-h-[96px] w-full rounded-2xl border border-ink-200 bg-white p-stack font-body text-body text-ink-900 placeholder:text-ink-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    placeholder="Votre réponse (facultatif)…"
                  />
                </div>
              ))}
              <div className="flex items-center justify-between gap-stack pt-stack-xs">
                <Button
                  onClick={() => {
                    setQIndex(total - 1);
                    go('wizard');
                  }}
                  variant="ghost"
                  size="md"
                  leadingIcon={<ArrowLeft size={16} />}
                >
                  Retour
                </Button>
                <Button onClick={() => go('result')} variant="primary" size="md" trailingIcon={<ArrowRight size={16} />}>
                  Voir mon résultat
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Résultat partiel + formulaire lead ────────────────────────── */}
          {phase === 'result' && (
            <motion.div {...reveal} className="mx-auto flex w-full max-w-medium flex-col gap-section-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-stack-lg">
                <ScoreRing score={score} ringClass={bank.accent.ring} />
                <div className="flex flex-col gap-stack-xs">
                  <span className={`inline-flex w-fit items-center gap-2 rounded-pill px-3.5 py-1.5 font-body text-caption font-bold ${bank.accent.badge}`}>
                    {bank.icon}
                    Diagnostic {bank.label}
                  </span>
                  <h2 className={`font-display text-h2 font-extrabold m-0 leading-tight ${bank.accent.text}`}>
                    {profile.name}
                  </h2>
                  <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-xl">
                    {profile.synthesis}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-stack-lg rounded-2xl bg-primary-50 p-stack-lg sm:p-section">
                <div className="flex items-start gap-stack">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                    <Lock size={20} />
                  </span>
                  <div className="flex flex-col gap-stack-xs">
                    <h3 className="font-display text-h4 font-extrabold text-ink-900 m-0 leading-tight">
                      Débloquez votre rapport d'analyse complet.
                    </h3>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                      Recevez l'analyse détaillée de vos 8 réponses, les
                      recommandations sur-mesure pour votre organisation et
                      l'accès à un débriefing offert.
                    </p>
                  </div>
                </div>

                <form onSubmit={submitLead} className="flex flex-col gap-stack" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lead-firstname" className="font-body text-body-sm font-bold text-ink-900">Prénom *</label>
                      <input id="lead-firstname" type="text" required value={lead.firstName}
                        onChange={(e) => setLead((l) => ({ ...l, firstName: e.target.value }))} className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lead-lastname" className="font-body text-body-sm font-bold text-ink-900">Nom *</label>
                      <input id="lead-lastname" type="text" required value={lead.lastName}
                        onChange={(e) => setLead((l) => ({ ...l, lastName: e.target.value }))} className={inputCls} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lead-email" className="font-body text-body-sm font-bold text-ink-900">Email professionnel *</label>
                    <input id="lead-email" type="email" required value={lead.email}
                      onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))} className={inputCls} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lead-role" className="font-body text-body-sm font-bold text-ink-900">Fonction *</label>
                      <input id="lead-role" type="text" required value={lead.role}
                        onChange={(e) => setLead((l) => ({ ...l, role: e.target.value }))} className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lead-size" className="font-body text-body-sm font-bold text-ink-900">Taille d'entreprise *</label>
                      <div className="relative">
                        <select
                          id="lead-size"
                          required
                          value={lead.companySize}
                          onChange={(e) => setLead((l) => ({ ...l, companySize: e.target.value }))}
                          className="h-auto min-h-[48px] w-full appearance-none rounded-pill border border-ink-200 bg-white px-5 py-2.5 pr-11 font-body text-body text-ink-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        >
                          <option value="">Sélectionnez…</option>
                          {TAILLES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-500" />
                      </div>
                    </div>
                  </div>
                  {leadError && (
                    <p role="alert" className="font-body text-body-sm font-bold text-danger-strong m-0">{leadError}</p>
                  )}
                  <div className="pt-stack-xs">
                    <Button type="submit" variant="primary" size="lg" fullWidth disabled={sending} trailingIcon={<ArrowRight size={18} />}>
                      {sending ? 'Envoi en cours…' : 'Débloquer mon rapport complet'}
                    </Button>
                  </div>
                  <p className="font-body text-caption text-ink-500 m-0">
                    Vos données servent uniquement à vous adresser votre rapport
                    et à vous recontacter à ce sujet.
                  </p>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── Rapport complet ───────────────────────────────────────────── */}
          {phase === 'report' && (
            <motion.div {...reveal} className="mx-auto flex w-full max-w-medium flex-col gap-section-lg">
              <div className="flex flex-col gap-stack-xs">
                <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight [text-wrap:balance]">
                  Merci {lead.firstName}, votre rapport est débloqué.
                </h2>
                <p className="font-body text-body-lg text-ink-600 m-0">
                  Voici la restitution complète de votre diagnostic {bank.label}.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-stack-lg rounded-2xl bg-white p-stack-lg ring-1 ring-ink-200">
                <ScoreRing score={score} ringClass={bank.accent.ring} />
                <div className="flex flex-col gap-stack-xs">
                  <h3 className={`font-display text-h3 font-extrabold m-0 leading-tight ${bank.accent.text}`}>
                    {profile.name}
                  </h3>
                  <p className="font-body text-body text-ink-700 leading-relaxed m-0 max-w-xl">{profile.synthesis}</p>
                </div>
              </div>

              <div className="flex flex-col gap-stack">
                <h3 className="font-display text-h4 font-bold text-ink-900 m-0">Récapitulatif de vos réponses</h3>
                <ol className="flex flex-col m-0 p-0 list-none">
                  {bank.questions.map((q, i) => {
                    const a = answers[i];
                    if (a === null || a === undefined) return null;
                    return (
                      <li key={q.title} className="flex flex-col gap-1 border-t border-ink-200/70 py-stack first:border-t-0">
                        <span className="font-body text-body-sm font-bold text-ink-900">
                          {i + 1}. {q.title}
                        </span>
                        <span className="flex items-baseline gap-stack-xs font-body text-body-sm text-ink-600">
                          <span className={`shrink-0 rounded-pill px-2 py-0.5 font-body text-micro font-extrabold ${bank.accent.badge}`}>
                            {LETTRES[a]} · {a} pt{a > 1 ? 's' : ''}
                          </span>
                          {q.options[a]}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="flex flex-col gap-stack">
                <h3 className="font-display text-h4 font-bold text-ink-900 m-0">Vos réponses libres</h3>
                {bank.openQuestions.map((q, i) => (
                  <div key={q} className="flex flex-col gap-1 border-t border-ink-200/70 py-stack first:border-t-0">
                    <span className="font-body text-body-sm font-bold text-ink-900">{q}</span>
                    <span className="font-body text-body-sm text-ink-600">{openAnswers[i] || 'Non renseigné.'}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-stack rounded-2xl bg-primary-50 p-stack-lg">
                <h3 className="font-display text-h4 font-bold text-ink-900 m-0">Envie d'aller plus loin ?</h3>
                <p className="font-body text-body text-ink-700 leading-relaxed m-0">
                  Réservez 15 minutes avec l'un de nos experts pour décrypter
                  vos résultats et identifier vos priorités d'action.
                </p>
                <div className="flex flex-wrap gap-stack-xs">
                  <MagneticButton strength={12}>
                    <Button to="/website/contact" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Réserver un débriefing de 15 min
                    </Button>
                  </MagneticButton>
                  <Button onClick={resetAll} variant="ghost" size="lg" trailingIcon={<RefreshCw size={16} />}>
                    Refaire un diagnostic
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Pont vers l'écosystème (hub uniquement) */}
      {phase === 'hub' && (
        <section className="bg-white border-t border-ink-100">
          <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
            <FadeInWhenVisible>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
                <p className="font-body text-body text-ink-600 m-0 max-w-xl">
                  Le diagnostic est la première étape de la méthode STRIDE :
                  l'Audit Flash approfondit ce que le score révèle.
                </p>
                <Button to="/website/accompagnement" variant="ghost" size="md" trailingIcon={<ArrowRight size={16} />}>
                  Découvrir l'accompagnement STRIDE
                </Button>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      )}
    </div>
  );
};

export default MarketingDiagnostic;
