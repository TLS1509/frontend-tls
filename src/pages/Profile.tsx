/**
 * Profile Page : Phase 10 rework v3 (épuré + tabs + CompetencyMatrix).
 *
 * Mix de la version épurée (white surface, borders fins, pas de glass) avec
 * la richesse fonctionnelle de la version pré-Phase 10 : tabs de navigation
 * (Vue d'ensemble / Activité / Compétences) avec contenu adapté.
 *
 * Arbitrage n°18 (2026-09-24, option « Reconnaissances ») : plus d'XP, de
 * série ni de niveau d'XP sur le profil. La vue d'ensemble porte la section
 * « Reconnaissances » (`#reconnaissances`) — les Open Badges adossés aux
 * niveaux VALIDÉS du Passeport, puis le rythme hebdomadaire. Les six routes
 * de gamification (/gamification, /gamification/badges, /gamification/xp,
 * /gamification/streaks, /leaderboard, /dashboard/achievements) y redirigent.
 *
 * Composants DS utilisés :
 *  - Tabs (variant underline) : navigation 3 sections
 *  - SkillBar : overview (top compétences)
 *  - CompetencyMatrix : onglet Compétences (5 skills × 5 niveaux)
 *  - MetaPill + IconChip + Button core
 *  - SectionHeader (light usage, no decorations)
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  useCardReviewStore,
  useCoachingStore,
  useGamificationStore,
  useJournalStore,
  useLessonProgressStore,
  usePasseportStore,
} from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { instantsActivite, phraseRythme, reconnaissances, semainesActives } from '../lib/reconnaissances';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { MetaPill } from '../components/ui/MetaPill';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { IconChip } from '../components/ui/IconChip';
import { EmptyState } from '../components/ui/EmptyState';
import { SkillBar } from '../components/ui/SkillBar';
import { Tabs } from '../components/ui/Tabs';
import type { TabItem } from '../components/ui/Tabs';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { CompetencyMatrix } from '../components/ui/CompetencyMatrix';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import type { SkillEntry } from '../components/ui/CompetencyMatrix';
import { PageShell } from '../components/layout';
import {
  Mail,
  MapPin,
  Calendar,
  Edit3,
  Share2,
  ArrowRight,
  ChevronRight,
  UserRound,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  Target,
  Clock3,
  Users,
} from 'lucide-react';

/* ─── Mock data ──────────────────────────────────────────────────────────── */

type TabId = 'overview' | 'activity' | 'skills';

const USER = {
  name: 'Alexandre Padennery',
  username: '@admin1509',
  email: 'padennery@me.com',
  role: 'Formateur Expert IA',
  location: 'Paris, France',
  joinDate: 'Janvier 2024',
  initials: 'AP',
  bio: "Passionné par l'IA générative et la pédagogie innovante. Je crée des expériences d'apprentissage qui transforment la formation professionnelle.",
  interests: ['IA Générative', 'Pédagogie', 'Prompt Engineering', 'Formation', 'Innovation'],
};

/* La série et les points XP sont sortis du bandeau (arbitrage n°18) ; le
   troisième chiffre, les niveaux validés, se lit en direct dans le Passeport. */
const HERO_STATS = [
  { value: '12',    label: 'Cours terminés' },
  { value: '86h',   label: "Temps d'apprentissage" },
];

const WEEK_KPIS = [
  { icon: <Target />, value: '3/5',  label: 'Objectifs atteints' },
  { icon: <Clock3 />, value: '12h',  label: "Temps d'étude" },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

const SKILLS: { id: string; label: string; value: number; tone: 'brand' | 'warm' | 'sun' }[] = [
  { id: 's1', label: 'Prompt Engineering',   value: 95, tone: 'brand' },
  { id: 's2', label: 'IA Générative',        value: 88, tone: 'brand' },
  { id: 's3', label: 'Pédagogie',            value: 92, tone: 'warm'  },
  { id: 's4', label: 'Design Thinking',      value: 78, tone: 'sun'   },
  { id: 's5', label: 'Veille Technologique', value: 85, tone: 'warm'  },
];

/* Le badge « +150 XP » et la « série de 7 jours maintenue » sont sortis du fil
   (arbitrage n°18) : les reconnaissances ont leur section, datée par le
   Passeport, dans la vue d'ensemble. */
const ACTIVITY = [
  { id: 'a1', title: 'Formation GPT-4 Avancé terminée',     date: "Aujourd'hui",   meta: "4h30 d'étude", icon: <BookOpen size={14} />, tone: 'success' as const },
  { id: 'a4', title: 'Session coaching avec Sophie Martin', date: 'Il y a 3 jours', meta: '45 min',        icon: <Users size={14} />,    tone: 'brand'   as const },
];

const ACTIVITY_TONE: Record<'brand' | 'success', string> = {
  brand:   'bg-primary-50 text-primary-800 border-primary-100',
  success: 'bg-success-bg text-success-fg border-success-border',
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  /* `/profile#reconnaissances` — l'adresse des six anciennes routes de
     gamification — ouvre la vue d'ensemble, où vit la section ; `ScrollToTop`
     défile ensuite jusqu'à l'ancre. La clé suit chaque navigation, y compris
     un second lien vers la même ancre. */
  useEffect(() => {
    if (location.hash === '#reconnaissances') setActiveTab('overview');
  }, [location.key, location.hash]);

  const displayName = user?.name ?? USER.name;
  const displayEmail = user?.email ?? USER.email;

  /* ── Reconnaissances : lues dans les stores au rendu (pas d'instantané) ── */
  const passeport = usePasseportStore();
  const gamification = useGamificationStore();
  const journal = useJournalStore();
  const coaching = useCoachingStore();
  const lecons = useLessonProgressStore((s) => s.lessons);
  const revisions = useCardReviewStore((s) => s.reviews);

  const competences = passeport.getCompetencies(MOCK_USER_ID);
  const preuves = passeport.evidence[MOCK_USER_ID] ?? [];
  const openBadges = reconnaissances(gamification.getBadges(MOCK_USER_ID), competences, preuves);
  const niveauxValides = competences.filter((c) => c.currentLevel != null).length;
  const rythme = semainesActives(
    instantsActivite({
      lecons,
      revisions,
      entreesJournal: journal.getEntries(MOCK_USER_ID),
      sessionsCoaching: coaching.getSessions(MOCK_USER_ID),
      preuves,
    }),
  );

  const heroStats = [
    ...HERO_STATS,
    { value: String(niveauxValides), label: 'Niveaux validés' },
  ];

  const TABS: TabItem[] = [
    { id: 'overview', icon: <UserRound size={14} />,  label: "Vue d'ensemble" },
    { id: 'activity', icon: <TrendingUp size={14} />, label: 'Activité' },
    { id: 'skills',   icon: <Zap size={14} />,        label: 'Compétences' },
  ];

  const skillsForMatrix: SkillEntry[] = useMemo(
    () =>
      SKILLS.map((skill) => ({
        name: skill.label,
        level: Math.max(1, Math.round(skill.value / 20)),
        color: skill.tone === 'warm' ? 'warm' : skill.tone === 'sun' ? 'sun' : 'primary',
      })),
    [],
  );

  return (
    <div className="min-h-[100dvh] bg-surface">
      <PageShell width="content">

        {/* ── Account family sub-nav ───────────────────────────── */}
        <AccountFamilyNav active="profile" />

        {/* L'en-tête d'identité et les onglets forment un bloc : 32 entre eux
            (la fourchette de l'en-tête de page, 32 à 48). Ils en avaient 81 —
            padding, filet et gap cumulés — pour 48 au-dessus : le nom flottait
            entre la navigation du compte et son propre contenu. */}
        <div className="flex flex-col gap-section">

        {/* ── Identity header (épuré) ──────────────────────────── */}
        <header className="flex flex-col sm:flex-row sm:items-start gap-stack-lg">
          {/* Avatar — sans pastille « Lv 12 » : un niveau d'XP n'a plus cours
              (arbitrage n°18) ; les niveaux qui comptent sont ceux du Passeport. */}
          <div className="shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-pill bg-ink-100 text-ink-700 flex items-center justify-center font-display font-bold text-h3" aria-hidden="true">
              {USER.initials}
            </div>
          </div>

          {/* Identity — le nom est le h1 de la page : 36 (il était à 28, le pas
              d'une section). Nom → rôle 8, rôle → méta 12 ; le rôle est un
              texte secondaire (ink-700), les coordonnées une méta (ink-600). */}
          <div className="flex-1 min-w-0 flex flex-col">
            <h1 className="font-display text-h1 text-ink-900 text-balance">
              {displayName}
            </h1>
            <p className="mt-stack-xs font-body text-body text-ink-700">
              {USER.role} · {USER.username}
            </p>
            <div className="flex flex-wrap items-center gap-x-stack-sm gap-y-stack-3xs mt-stack-sm font-body text-caption text-ink-600">
              <span className="inline-flex items-center gap-stack-3xs"><Mail size={14} aria-hidden="true" /> {displayEmail}</span>
              <span aria-hidden className="text-ink-300">·</span>
              <span className="inline-flex items-center gap-stack-3xs"><MapPin size={14} aria-hidden="true" /> {USER.location}</span>
              <span aria-hidden className="text-ink-300">·</span>
              <span className="inline-flex items-center gap-stack-3xs"><Calendar size={14} aria-hidden="true" /> Membre depuis {USER.joinDate}</span>
            </div>
          </div>

          {/* Actions — une page de consultation, sans aplat (arbitrage n°19).
              Modifier est l'action de contexte de l'en-tête (`soft`, au ton de
              la page : l'orange disait « secondaire », ce que dit désormais le
              niveau) ; Partager, un outil (`ghost` neutre). */}
          <div className="flex gap-stack-xs shrink-0 sm:self-start">
            <Button emphasis="soft" size="sm" leadingIcon={<Edit3 size={14} />} onClick={() => navigate('/account')}>
              Modifier
            </Button>
            <Button emphasis="ghost" tone="neutral" iconOnly aria-label="Partager">
              <Share2 size={14} />
            </Button>
          </div>
        </header>

        {/* ── Tabs navigation ──────────────────────────────────── */}
        <div className="flex flex-col gap-section">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-stack sm:px-0">
            <Tabs
              items={TABS}
              value={activeTab}
              onChange={(id) => setActiveTab(id as TabId)}
              variant="underline"
            />
          </div>

          {/* ── Tab content ─────────────────────────────────────
              Chaque bloc est une section : son titre (h2 28) posé sur la page,
              la carte ne portant que son contenu. Les titres étaient des h2 à
              20 px, dans les cartes — la taille d'un titre de carte. */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-page">
              {/* Stats compact strip — valeur → libellé 4 ; le libellé est une
                  légende (ink-600). Le token porte la graisse et le serrage du
                  h3 : `tracking-headline` écrasait le sien. */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-stack p-stack-lg rounded-xl bg-ink-50 border border-ink-100">
                {heroStats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-stack-3xs">
                    <span className="font-display text-h3 text-ink-900 leading-none tabular-nums">
                      {s.value}
                    </span>
                    <span className="font-body text-caption text-ink-600">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Bio + semaine : deux sections côte à côte */}
              <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-page md:gap-stack-lg">
                <section className="flex flex-col gap-stack min-w-0">
                  <SectionHeader title="À propos" />
                  <Card className="flex flex-col gap-stack flex-1">
                    <p className="font-body text-body text-ink-700 max-w-prose">
                      {USER.bio}
                    </p>
                    <MetaPillGroup
                      items={USER.interests.map((interest) => ({ text: interest }))}
                    />
                  </Card>
                </section>

                <section className="flex flex-col gap-stack min-w-0">
                  <SectionHeader title="Cette semaine" />
                  <Card className="flex flex-col gap-stack flex-1">
                    {WEEK_KPIS.map((k) => (
                      <div key={k.label} className="flex items-center gap-stack-sm">
                        <IconChip size="md" tone="neutral">
                          {k.icon}
                        </IconChip>
                        <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                          <p className="font-body text-body font-semibold text-ink-900 tabular-nums">
                            {k.value}
                          </p>
                          <p className="font-body text-caption text-ink-600">
                            {k.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Card>
                </section>
              </div>

              {/* ── Reconnaissances (arbitrage n°18) ──────────────────
                  Ce qui se célèbre : un niveau VALIDÉ, en Open Badge, puis le
                  rythme des dernières semaines. Une collection du même type :
                  des rangées dans une carte (arbitrage n°5). L'ancre dégage le
                  bouton de menu mobile (52 px) quand on y arrive par un lien. */}
              <section id="reconnaissances" aria-label="Reconnaissances" className="flex flex-col gap-stack scroll-mt-16">
                <SectionHeader
                  title="Reconnaissances"
                  subtitle="Chaque Open Badge atteste un niveau validé par ton coach ou ton manager, sur preuves."
                  action={
                    <Button emphasis="ghost" size="sm" trailingIcon={<ArrowRight size={14} />} to="/passeport">
                      Voir mon Passeport
                    </Button>
                  }
                />
                <div className="flex flex-col gap-section">
                  {openBadges.length > 0 ? (
                    <Card className="p-0 gap-0 overflow-hidden">
                      <ul className="divide-y divide-ink-100">
                        {openBadges.map((r) => (
                          <li key={r.badgeId}>
                            {/* La rangée entière mène au détail du badge (preuves,
                                émetteur, date). Pastille de 32 calée sur la
                                première ligne (26) : 3 px. */}
                            <Link
                              to={`/gamification/badge/${r.badgeId}`}
                              className="flex items-start gap-stack-sm px-stack-lg py-stack transition-colors duration-base hover:bg-ink-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500"
                            >
                              <IconChip size="sm" tone="brand">
                                <Award />
                              </IconChip>
                              <span className="flex-1 min-w-0 flex flex-col gap-stack-3xs mt-[3px]">
                                <span className="flex flex-wrap items-center gap-x-stack-xs gap-y-stack-3xs">
                                  <span className="text-body font-semibold text-ink-900">{r.competence}</span>
                                  <MetaPill text={`D${r.niveau} · ${r.niveauLabel}`} tone="brand" />
                                </span>
                                <span className="text-caption text-ink-600">
                                  {r.validation
                                    ? `Validé par ${r.validation.par} le ${formatDate(r.validation.le)}`
                                    : `Open Badge obtenu le ${formatDate(r.obtenuLe)}`}
                                </span>
                              </span>
                              <ChevronRight size={16} className="shrink-0 self-center text-ink-500" aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ) : (
                    <EmptyState
                      icon={<Award size={32} />}
                      title="Pas encore d'Open Badge"
                      description="Il arrive quand ton coach ou ton manager valide un niveau dans ton Passeport."
                    />
                  )}

                  {/* Le rythme : quatre cases, sans compte à rebours, la plus
                      ancienne à gauche. Pleine au cran 700, une semaine active ;
                      grise, une semaine sans activité — pas un cadre vide, qui
                      se lisait comme une case à cocher. La phrase porte
                      l'information : les cases ne la répètent pas au lecteur
                      d'écran. */}
                  <div className="flex flex-col gap-stack-xs">
                    <h3 className="font-display text-h3 text-ink-900">Ton rythme</h3>
                    <div className="flex flex-wrap items-center gap-x-stack-sm gap-y-stack-xs">
                      <span className="inline-flex items-center gap-stack-2xs" aria-hidden="true">
                        {rythme.map((active, i) => (
                          <span
                            key={i}
                            className={[
                              'w-4 h-4 rounded-xs',
                              active ? 'bg-primary-700' : 'bg-ink-200',
                            ].join(' ')}
                          />
                        ))}
                      </span>
                      <p className="font-body text-body text-ink-900">{phraseRythme(rythme)}</p>
                    </div>
                    <p className="font-body text-caption text-ink-600 max-w-prose">
                      Une semaine compte dès qu'une leçon, une révision, une entrée de journal ou une session de coaching y a eu lieu.
                    </p>
                  </div>
                </div>
              </section>

              {/* Top compétences (preview) */}
              <section className="flex flex-col gap-stack">
                <SectionHeader
                  title="Top compétences"
                  action={
                    <Button emphasis="ghost" size="sm" trailingIcon={<ArrowRight size={14} />} onClick={() => setActiveTab('skills')}>
                      Voir la matrice complète
                    </Button>
                  }
                />
                <Card className="flex flex-col gap-stack-lg">
                  {SKILLS.slice(0, 3).map((skill) => (
                    <SkillBar key={skill.id} label={skill.label} value={skill.value} tone={skill.tone} showValue />
                  ))}
                </Card>
              </section>
            </div>
          )}

          {activeTab === 'activity' && (
            <section className="flex flex-col gap-stack">
              {/* Le compte est une donnée : la méta de l'en-tête. */}
              <SectionHeader title="Activité récente" meta={`${ACTIVITY.length} événements`} />
              <Card className="p-0 gap-0 overflow-hidden">
                {ACTIVITY.map((a, idx) => (
                  <div
                    key={a.id}
                    className={[
                      'flex items-center gap-stack px-stack-lg py-stack',
                      idx < ACTIVITY.length - 1 ? 'border-b border-ink-100' : '',
                    ].join(' ')}
                  >
                    {/* Pastille carrée proportionnelle (arbitrage n°3) : le rond
                        est réservé aux personnes. */}
                    <span
                      className={[
                        'shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-md border',
                        ACTIVITY_TONE[a.tone],
                      ].join(' ')}
                    >
                      {a.icon}
                    </span>
                    <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                      <p className="font-body text-body font-semibold text-ink-900 truncate">
                        {a.title}
                      </p>
                      <p className="font-body text-caption text-ink-600">
                        {a.date} · {a.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </Card>
              {/* Sur le bord gauche de la liste qu'il prolonge (il était
                  centré) ; à 24 du contenu. */}
              <Button emphasis="ghost" size="sm" trailingIcon={<ArrowRight size={14} />} className="self-start mt-stack-xs">
                Voir toute l'historique
              </Button>
            </section>
          )}

          {activeTab === 'skills' && (
            <section className="flex flex-col gap-stack">
              {/* L'explication est une phrase à lire : le sous-titre (16,
                  ink-700) — elle était en légende 13. Le compte, une donnée :
                  la méta, plus un Badge. */}
              <SectionHeader
                title="Matrice de compétences"
                subtitle="Évaluation par niveau (Novice → Maître) sur 5 paliers. Survole une ligne pour voir le détail de progression."
                meta="5 compétences"
              />

              {/* Matrice — padding symétrique (24). Le composant ne pose plus
                  de marge sur sa racine (piège n°12, retirée le 24/09) : plus
                  rien à annuler ici. */}
              <Card className="overflow-x-auto">
                <CompetencyMatrix skills={skillsForMatrix} />
              </Card>

              {/* Détail SkillBar pour mobile / vue alternative — un titre de
                  bloc (h3 20) : il était un h3 à 13 px, graisse 500. */}
              <Card className="flex flex-col gap-stack-lg">
                <h3 className="font-display text-h3 text-ink-900">
                  Vue détaillée
                </h3>
                {SKILLS.map((skill) => (
                  <SkillBar key={skill.id} label={skill.label} value={skill.value} tone={skill.tone} showValue />
                ))}
              </Card>
            </section>
          )}
        </div>
        </div>
      </PageShell>
    </div>
  );
};

export default Profile;
