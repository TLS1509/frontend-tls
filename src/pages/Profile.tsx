/**
 * Profile Page : Phase 10 rework v3 (épuré + tabs + CompetencyMatrix).
 *
 * Mix de la version épurée (white surface, borders fins, pas de glass) avec
 * la richesse fonctionnelle de la version pré-Phase 10 : tabs de navigation
 * (Vue d'ensemble / Activité / Badges / Compétences) avec contenu adapté.
 *
 * Composants DS utilisés :
 *  - Tabs (variant underline) : navigation 4 sections
 *  - SkillBar : overview (top compétences)
 *  - CompetencyMatrix : onglet Compétences (5 skills × 5 niveaux)
 *  - Badge + Button core
 *  - SectionHeader (light usage, no decorations)
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGamificationStore } from '../stores/persistence';
import { getBadgeDefById } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import { Button } from '../components/core/Button';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { IconChip } from '../components/ui/IconChip';
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
  Lock,
  Trophy,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  Flame,
  Target,
  Clock3,
  Users,
  Bot,
  Star,
  Compass,
  Lightbulb,
} from 'lucide-react';

/* ─── Mock data ──────────────────────────────────────────────────────────── */

type TabId = 'overview' | 'activity' | 'badges' | 'skills';

const USER = {
  name: 'Alexandre Padennery',
  username: '@admin1509',
  email: 'padennery@me.com',
  role: 'Formateur Expert IA',
  location: 'Paris, France',
  joinDate: 'Janvier 2024',
  initials: 'AP',
  level: 12,
  bio: "Passionné par l'IA générative et la pédagogie innovante. Je crée des expériences d'apprentissage qui transforment la formation professionnelle.",
  interests: ['IA Générative', 'Pédagogie', 'Prompt Engineering', 'Formation', 'Innovation'],
};

const HERO_STATS = [
  { value: '12',    label: 'Cours terminés' },
  { value: '86h',   label: "Temps d'apprentissage" },
  { value: '7j',    label: 'Streak en cours' },
  { value: '2 450', label: 'Points XP' },
];

const WEEK_KPIS = [
  { icon: <Target />, value: '3/5',  label: 'Objectifs atteints' },
  { icon: <Clock3 />, value: '12h',  label: "Temps d'étude" },
  { icon: <Zap />,    value: '+450', label: 'XP gagnés' },
];

const SKILLS: { id: string; label: string; value: number; tone: 'brand' | 'warm' | 'sun' }[] = [
  { id: 's1', label: 'Prompt Engineering',   value: 95, tone: 'brand' },
  { id: 's2', label: 'IA Générative',        value: 88, tone: 'brand' },
  { id: 's3', label: 'Pédagogie',            value: 92, tone: 'warm'  },
  { id: 's4', label: 'Design Thinking',      value: 78, tone: 'sun'   },
  { id: 's5', label: 'Veille Technologique', value: 85, tone: 'warm'  },
];

const ACTIVITY = [
  { id: 'a1', title: 'Formation GPT-4 Avancé terminée',     date: "Aujourd'hui",   meta: "4h30 d'étude", icon: <BookOpen size={14} />, tone: 'success' as const },
  { id: 'a2', title: 'Badge « Expert GPT » débloqué',       date: 'Hier',          meta: '+150 XP',       icon: <Award size={14} />,    tone: 'sun'     as const },
  { id: 'a3', title: 'Série de 7 jours maintenue',          date: 'Il y a 2 jours', meta: 'Personal best', icon: <Flame size={14} />,    tone: 'warm'    as const },
  { id: 'a4', title: 'Session coaching avec Sophie Martin', date: 'Il y a 3 jours', meta: '45 min',        icon: <Users size={14} />,    tone: 'brand'   as const },
];

const BADGES = [
  { id: 'b1', label: 'Pionnier IA',    icon: <Bot size={32} strokeWidth={1.5} />,       earned: true,  date: '15 Jan 2024' },
  { id: 'b2', label: 'Streak Master',  icon: <Flame size={32} strokeWidth={1.5} />,     earned: true,  date: '20 Jan 2024' },
  { id: 'b3', label: 'Expert GPT',     icon: <Zap size={32} strokeWidth={1.5} />,       earned: true,  date: '25 Jan 2024' },
  { id: 'b4', label: 'Contributeur',   icon: <Star size={32} strokeWidth={1.5} />,      earned: true,  date: '1 Fév 2024' },
  { id: 'b5', label: 'Mentor',         icon: <Compass size={32} strokeWidth={1.5} />,   earned: false, progress: 60 },
  { id: 'b6', label: 'Innovateur',     icon: <Lightbulb size={32} strokeWidth={1.5} />, earned: false, progress: 40 },
];

const ACTIVITY_TONE: Record<'brand' | 'warm' | 'sun' | 'success', string> = {
  brand:   'bg-primary-50 text-primary-800 border-primary-100',
  warm:    'bg-secondary-50 text-secondary-700 border-secondary-100',
  sun:     'bg-accent-50 text-accent-700 border-accent-100',
  success: 'bg-success-bg text-success-fg border-success-border',
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const gamifStore = useGamificationStore();
  const totalXP = gamifStore.getTotalXP(MOCK_USER_ID);
  const streak = gamifStore.getStreak(MOCK_USER_ID);
  const earnedBadges = gamifStore.getBadges(MOCK_USER_ID);

  const displayName = user?.name ?? USER.name;
  const displayEmail = user?.email ?? USER.email;

  // Map earned badges from store to display format
  const badges = useMemo(() => {
    const earned = earnedBadges.map((ub) => {
      const def = getBadgeDefById(ub.badgeId);
      return {
        id: ub.badgeId,
        label: def?.name ?? ub.badgeId,
        icon: <Award size={32} strokeWidth={1.5} />,
        earned: true as const,
        date: new Date(ub.earnedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
    });
    // Append locked badges from BADGES for display completeness
    const lockedBadges = BADGES.filter((b) => !b.earned && !earned.some((e) => e.id === b.id));
    return [...earned, ...lockedBadges];
  }, [earnedBadges]);

  const earnedCount = badges.filter((b) => b.earned).length;

  // Dynamic hero stats from store
  const heroStats = useMemo(() => [
    HERO_STATS[0],
    HERO_STATS[1],
    { value: `${streak.currentStreak}j`, label: 'Streak en cours' },
    { value: totalXP.toLocaleString('fr-FR'), label: 'Points XP' },
  ], [streak.currentStreak, totalXP]);

  const TABS: TabItem[] = [
    { id: 'overview', icon: <Trophy size={14} />,     label: "Vue d'ensemble" },
    { id: 'activity', icon: <TrendingUp size={14} />, label: 'Activité' },
    { id: 'badges',   icon: <Award size={14} />,      label: 'Badges',     badge: earnedCount },
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
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-pill bg-ink-100 text-ink-700 flex items-center justify-center font-display font-bold text-h3" aria-hidden="true">
              {USER.initials}
            </div>
            <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center min-w-7 h-7 px-1.5 rounded-pill bg-ink-900 text-white font-body font-bold text-micro border-2 border-white">
              Lv {USER.level}
            </span>
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

          {/* Actions */}
          <div className="flex gap-stack-xs shrink-0 sm:self-start">
            <Button emphasis="soft" tone="warm" size="sm" leadingIcon={<Edit3 size={14} />} onClick={() => navigate('/account')}>
              Modifier
            </Button>
            <Button emphasis="outline" iconOnly aria-label="Partager">
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack p-stack-lg rounded-xl bg-ink-50 border border-ink-100">
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
                  <div className="rounded-xl border border-ink-100 bg-white p-stack-lg flex flex-col gap-stack flex-1">
                    <p className="font-body text-body text-ink-700 max-w-prose">
                      {USER.bio}
                    </p>
                    <MetaPillGroup
                      items={USER.interests.map((interest) => ({ text: interest }))}
                    />
                  </div>
                </section>

                <section className="flex flex-col gap-stack min-w-0">
                  <SectionHeader title="Cette semaine" />
                  <div className="rounded-xl border border-ink-100 bg-white p-stack-lg flex flex-col gap-stack flex-1">
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
                  </div>
                </section>
              </div>

              {/* Top compétences (preview) */}
              <section className="flex flex-col gap-stack">
                <SectionHeader
                  title="Top compétences"
                  action={
                    <Button emphasis="outline" size="sm" trailingIcon={<ArrowRight size={14} />} onClick={() => setActiveTab('skills')}>
                      Voir la matrice complète
                    </Button>
                  }
                />
                <div className="rounded-xl border border-ink-100 bg-white p-stack-lg flex flex-col gap-stack-lg">
                  {SKILLS.slice(0, 3).map((skill) => (
                    <SkillBar key={skill.id} label={skill.label} value={skill.value} tone={skill.tone} showValue />
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'activity' && (
            <section className="flex flex-col gap-stack">
              {/* Le compte est une donnée : la méta de l'en-tête. */}
              <SectionHeader title="Activité récente" meta={`${ACTIVITY.length} événements`} />
              <div className="rounded-xl border border-ink-100 bg-white overflow-hidden">
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
              </div>
              {/* Sur le bord gauche de la liste qu'il prolonge (il était
                  centré) ; à 24 du contenu. */}
              <Button emphasis="outline" size="sm" trailingIcon={<ArrowRight size={14} />} className="self-start mt-stack-xs">
                Voir toute l'historique
              </Button>
            </section>
          )}

          {activeTab === 'badges' && (
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Badges" meta={`${earnedCount}/${badges.length} débloqués`} />
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-stack-xs">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={[
                      'relative flex flex-col items-center text-center px-2 py-stack-md rounded-lg border',
                      badge.earned
                        ? 'bg-white border-ink-100 hover:border-ink-200 transition-colors'
                        : 'bg-ink-50 border-ink-100',
                    ].join(' ')}
                  >
                    <span
                      aria-hidden
                      className={[
                        'inline-flex items-center justify-center mb-stack-xs',
                        badge.earned ? 'text-primary-600' : 'opacity-30',
                      ].join(' ')}
                    >
                      {badge.icon}
                    </span>
                    {/* Nom → date 4 ; la date est une légende 13 (l'étiquette
                        11 est le registre des seuls Badge). */}
                    <p className="font-body text-caption font-semibold text-ink-900">
                      {badge.label}
                    </p>
                    {badge.earned ? (
                      <p className="mt-stack-3xs font-body text-caption text-ink-600">{badge.date}</p>
                    ) : (
                      <>
                        <p className="mt-stack-3xs font-body text-caption text-ink-600 tabular-nums">{badge.progress}%</p>
                        <span
                          aria-label="Verrouillé"
                          className="absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 rounded-pill bg-white text-ink-600 border border-ink-200"
                        >
                          <Lock size={14} />
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'skills' && (
            <section className="flex flex-col gap-stack">
              {/* L'explication est une phrase à lire : le sous-titre (16,
                  ink-700) — elle était en légende 13. Le compte, une donnée :
                  la méta, plus un Badge. */}
              <SectionHeader
                title="Matrice de compétences"
                subtitle="Évaluation par niveau (Novice → Expert) sur 5 paliers. Survolez une ligne pour voir le détail de progression."
                meta="5 compétences"
              />

              {/* Matrice — padding symétrique (24). `CompetencyMatrix` pose une
                  marge haute de 24 sur sa racine (piège n°12) ; la page la
                  compensait par un padding haut réduit (16 + 24 en haut, 24 en
                  bas). On l'annule ici, en attendant que le composant la
                  retire. */}
              <div className="rounded-xl border border-ink-100 bg-white p-stack-lg overflow-x-auto [&>*]:mt-0">
                <CompetencyMatrix skills={skillsForMatrix} />
              </div>

              {/* Détail SkillBar pour mobile / vue alternative — un titre de
                  bloc (h3 20) : il était un h3 à 13 px, graisse 500. */}
              <div className="rounded-xl border border-ink-100 bg-white p-stack-lg flex flex-col gap-stack-lg">
                <h3 className="font-display text-h3 text-ink-900">
                  Vue détaillée
                </h3>
                {SKILLS.map((skill) => (
                  <SkillBar key={skill.id} label={skill.label} value={skill.value} tone={skill.tone} showValue />
                ))}
              </div>
            </section>
          )}
        </div>
        </div>
      </PageShell>
    </div>
  );
};

export default Profile;
