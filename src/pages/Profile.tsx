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
import { Badge } from '../components/ui/Badge';
import { SkillBar } from '../components/ui/SkillBar';
import { Tabs } from '../components/ui/Tabs';
import type { TabItem } from '../components/ui/Tabs';
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
  CheckCircle2,
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
  { icon: <Target size={18} />, value: '3/5',  label: 'Objectifs atteints' },
  { icon: <Clock3 size={18} />, value: '12h',  label: "Temps d'étude" },
  { icon: <Zap size={18} />,    value: '+450', label: 'XP gagnés' },
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
  { id: 'b1', label: 'Pionnier IA',    icon: <Bot size={36} strokeWidth={1.5} />,       earned: true,  date: '15 Jan 2024' },
  { id: 'b2', label: 'Streak Master',  icon: <Flame size={36} strokeWidth={1.5} />,     earned: true,  date: '20 Jan 2024' },
  { id: 'b3', label: 'Expert GPT',     icon: <Zap size={36} strokeWidth={1.5} />,       earned: true,  date: '25 Jan 2024' },
  { id: 'b4', label: 'Contributeur',   icon: <Star size={36} strokeWidth={1.5} />,      earned: true,  date: '1 Fév 2024' },
  { id: 'b5', label: 'Mentor',         icon: <Compass size={36} strokeWidth={1.5} />,   earned: false, progress: 60 },
  { id: 'b6', label: 'Innovateur',     icon: <Lightbulb size={36} strokeWidth={1.5} />, earned: false, progress: 40 },
];

const ACTIVITY_TONE: Record<'brand' | 'warm' | 'sun' | 'success', string> = {
  brand:   'bg-primary-50 text-primary-700 border-primary-100',
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
        icon: <Award size={36} strokeWidth={1.5} />,
        earned: true as const,
        date: new Date(ub.awardedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
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
      <PageShell width="medium" paddingX="comfortable">

        {/* ── Account family sub-nav ───────────────────────────── */}
        <AccountFamilyNav active="profile" />

        {/* ── Identity header (épuré) ──────────────────────────── */}
        <header className="flex flex-col sm:flex-row sm:items-start gap-stack-lg pb-section border-b border-ink-100">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-pill bg-ink-100 text-ink-700 flex items-center justify-center font-display font-bold text-h3">
              {USER.initials}
            </div>
            <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center min-w-7 h-7 px-1.5 rounded-pill bg-ink-900 text-white font-body font-bold text-micro border-2 border-white">
              Lv {USER.level}
            </span>
          </div>

          {/* Identity */}
          <div className="flex-1 min-w-0 flex flex-col gap-tight">
            <h1 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight tracking-tight">
              {displayName}
            </h1>
            <p className="m-0 font-body text-body-sm text-ink-600">
              {USER.role} · {USER.username}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-stack-xs font-body text-caption text-ink-700">
              <span className="inline-flex items-center gap-1.5"><Mail size={12} /> {displayEmail}</span>
              <span aria-hidden className="text-ink-300">·</span>
              <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {USER.location}</span>
              <span aria-hidden className="text-ink-300">·</span>
              <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> Membre depuis {USER.joinDate}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-stack-xs shrink-0 sm:self-start">
            <Button variant="secondary" size="sm" leadingIcon={<Edit3 size={13} />} onClick={() => navigate('/account')}>
              Modifier
            </Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="Partager">
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

          {/* ── Tab content ───────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-section">
              {/* Stats compact strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack-xs p-stack-lg rounded-2xl bg-ink-50 border border-ink-100">
                {heroStats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-tight">
                    <span className="font-display text-h3 font-bold text-ink-900 leading-none tracking-tight tabular-nums">
                      {s.value}
                    </span>
                    <span className="font-body text-caption text-ink-700">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Bio + interests */}
              <section className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-stack-lg">
                <div className="rounded-2xl border border-ink-100 bg-white p-stack-lg flex flex-col gap-stack">
                  <h2 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-tight">
                    À propos
                  </h2>
                  <p className="m-0 font-body text-body-sm text-ink-700 leading-relaxed">
                    {USER.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-stack-xs">
                    {USER.interests.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center px-2.5 py-1 rounded-pill bg-ink-50 border border-ink-200 font-body text-micro font-semibold text-ink-700"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-ink-100 bg-white p-stack-lg flex flex-col gap-stack">
                  <h2 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-tight">
                    Cette semaine
                  </h2>
                  <div className="flex flex-col gap-stack">
                    {WEEK_KPIS.map((k) => (
                      <div key={k.label} className="flex items-center gap-stack-xs">
                        <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-ink-50 text-ink-700">
                          {k.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="m-0 font-display text-body font-bold text-ink-900 leading-none">
                            {k.value}
                          </p>
                          <p className="m-0 font-body text-caption text-ink-700 mt-0.5">
                            {k.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Top compétences (preview) */}
              <section className="flex flex-col gap-stack">
                <div className="flex items-baseline justify-between gap-stack-xs">
                  <h2 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-tight">
                    Top compétences
                  </h2>
                  <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={12} />} onClick={() => setActiveTab('skills')}>
                    Voir la matrice complète
                  </Button>
                </div>
                <div className="rounded-2xl border border-ink-100 bg-white p-stack-lg flex flex-col gap-stack-lg">
                  {SKILLS.slice(0, 3).map((skill) => (
                    <SkillBar key={skill.id} label={skill.label} value={skill.value} tone={skill.tone} showValue />
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'activity' && (
            <section className="flex flex-col gap-stack">
              <div className="flex items-baseline justify-between gap-stack-xs">
                <h2 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-tight">
                  Activité récente
                </h2>
                <span className="font-body text-caption text-ink-700">
                  {ACTIVITY.length} événements
                </span>
              </div>
              <div className="rounded-2xl border border-ink-100 bg-white overflow-hidden">
                {ACTIVITY.map((a, idx) => (
                  <div
                    key={a.id}
                    className={[
                      'flex items-center gap-stack px-5 py-stack',
                      idx < ACTIVITY.length - 1 ? 'border-b border-ink-100' : '',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-pill border',
                        ACTIVITY_TONE[a.tone],
                      ].join(' ')}
                    >
                      {a.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="m-0 font-body text-body-sm font-semibold text-ink-900 truncate">
                        {a.title}
                      </p>
                      <p className="m-0 font-body text-caption text-ink-700 mt-0.5">
                        {a.date} · {a.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={12} />} className="self-center mt-stack">
                Voir toute l'historique
              </Button>
            </section>
          )}

          {activeTab === 'badges' && (
            <section className="flex flex-col gap-stack">
              <div className="flex items-baseline justify-between gap-stack-xs">
                <h2 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-tight">
                  Badges
                </h2>
                <span className="font-body text-caption text-ink-700">
                  {earnedCount}/{badges.length} débloqués
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-stack-xs">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={[
                      'relative flex flex-col items-center text-center px-2 py-5 rounded-xl border',
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
                    <p className="m-0 font-body text-caption font-semibold text-ink-900 leading-tight">
                      {badge.label}
                    </p>
                    {badge.earned ? (
                      <p className="m-0 mt-0.5 font-body text-micro text-ink-400">{badge.date}</p>
                    ) : (
                      <>
                        <p className="m-0 mt-0.5 font-body text-micro text-ink-400">{badge.progress}%</p>
                        <span
                          aria-label="Verrouillé"
                          className="absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 rounded-pill bg-white text-ink-400 border border-ink-200"
                        >
                          <Lock size={9} />
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
              <div className="flex items-baseline justify-between gap-stack-xs">
                <h2 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-tight">
                  Matrice de compétences
                </h2>
                <Badge variant="brand">5 compétences</Badge>
              </div>
              <p className="m-0 font-body text-caption text-ink-700 max-w-prose">
                Évaluation par niveau (Novice → Expert) sur 5 paliers. Survolez une ligne
                pour voir le détail de progression.
              </p>

              {/* Matrice */}
              <div className="rounded-2xl border border-ink-100 bg-white px-stack-lg pt-stack pb-stack-lg overflow-x-auto">
                <CompetencyMatrix skills={skillsForMatrix} />
              </div>

              {/* Détail SkillBar pour mobile / vue alternative */}
              <div className="rounded-2xl border border-ink-100 bg-white p-stack-lg flex flex-col gap-stack-lg">
                <div className="flex items-center gap-stack-xs">
                  <CheckCircle2 size={14} className="text-primary-600" />
                  <h3 className="m-0 font-body text-caption font-medium text-ink-700">
                    Vue détaillée
                  </h3>
                </div>
                {SKILLS.map((skill) => (
                  <SkillBar key={skill.id} label={skill.label} value={skill.value} tone={skill.tone} showValue />
                ))}
              </div>
            </section>
          )}
        </div>
      </PageShell>
    </div>
  );
};

export default Profile;
