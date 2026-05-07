/**
 * Profile Page
 */

import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Badge, Button, ProgressBar, SkillBar } from '../components';
import { CompetencyMatrix } from '../components/ui/CompetencyMatrix';
import {
  Mail,
  ShieldCheck,
  UserRound,
  MapPin,
  Calendar,
  Flame,
  Trophy,
  Clock3,
  BookOpen,
  TrendingUp,
  Award,
  Star,
  Zap,
  Settings,
  CheckCircle2,
  Users,
  Edit3,
  Target,
  Camera,
  Share2,
} from 'lucide-react';

type Tab = 'overview' | 'activity' | 'badges' | 'skills';

const USER_MOCK = {
  name: 'Alexandre Padennery',
  username: '@admin1509',
  email: 'padennery@me.com',
  role: 'Formateur Expert IA',
  location: 'Paris, France',
  joinDate: 'Janvier 2024',
  bio: "Passionné par l'IA générative et la pédagogie innovante. Je crée des expériences d'apprentissage qui transforment la formation professionnelle.",
  avatar: 'AP',
  interests: ['IA Générative', 'Pédagogie', 'Prompt Engineering', 'Formation', 'Innovation'],
};

const STAT_TONES = {
  primary: { iconBg: 'bg-primary-50', iconColor: 'text-primary-600', numColor: 'text-primary-700' },
  warm:    { iconBg: 'bg-secondary-50', iconColor: 'text-secondary-600', numColor: 'text-secondary-600' },
  sun:     { iconBg: 'bg-accent-50', iconColor: 'text-accent-600', numColor: 'text-accent-700' },
} as const;

type StatTone = keyof typeof STAT_TONES;

const STATS: { icon: React.ReactNode; value: string; label: string; tone: StatTone }[] = [
  { icon: <BookOpen size={20} />, value: '12',    label: 'Cours terminés',  tone: 'primary' },
  { icon: <Clock3 size={20} />,   value: '86h',   label: 'Temps appris',    tone: 'warm' },
  { icon: <Flame size={20} />,    value: '7j',    label: 'Série actuelle',  tone: 'warm' },
  { icon: <Trophy size={20} />,   value: '2 450', label: 'Points XP',       tone: 'sun' },
];

const BADGES = [
  { id: 'b1', label: 'Pionnier IA',   emoji: '🤖', variant: 'brand'   as const, earned: true,  date: '15 Jan 2024' },
  { id: 'b2', label: 'Streak Master', emoji: '🔥', variant: 'warm'    as const, earned: true,  date: '20 Jan 2024' },
  { id: 'b3', label: 'Expert GPT',    emoji: '⚡', variant: 'sun'     as const, earned: true,  date: '25 Jan 2024' },
  { id: 'b4', label: 'Contributeur',  emoji: '🌟', variant: 'info'    as const, earned: true,  date: '1 Fév 2024' },
  { id: 'b5', label: 'Mentor',        emoji: '👨‍🏫', variant: 'neutral' as const, earned: false, progress: 60 },
  { id: 'b6', label: 'Innovateur',    emoji: '💡', variant: 'neutral' as const, earned: false, progress: 40 },
];

const ACTIVITY_TONE = {
  success: { bg: 'bg-success-bg',  color: 'text-success-fg',   border: 'border-success-base/30' },
  sun:     { bg: 'bg-accent-100',  color: 'text-accent-700',   border: 'border-accent-200' },
  warm:    { bg: 'bg-secondary-100', color: 'text-secondary-700', border: 'border-secondary-200' },
  info:    { bg: 'bg-primary-50',  color: 'text-primary-700',  border: 'border-primary-200' },
} as const;

type ActivityVariant = keyof typeof ACTIVITY_TONE;

const ACTIVITY: { id: string; icon: React.ReactNode; title: string; date: string; variant: ActivityVariant; badgeLabel: string }[] = [
  { id: 'a1', icon: <BookOpen size={16} />, title: 'Formation GPT-4 Avancé terminée', date: "Aujourd'hui",   variant: 'success', badgeLabel: 'Terminé' },
  { id: 'a2', icon: <Award size={16} />,    title: 'Badge "Expert GPT" débloqué',     date: 'Hier',          variant: 'sun',     badgeLabel: 'Nouveau' },
  { id: 'a3', icon: <Flame size={16} />,    title: 'Série de 7 jours maintenue',      date: 'Il y a 2 jours', variant: 'warm',   badgeLabel: 'Actif' },
  { id: 'a4', icon: <Users size={16} />,    title: 'Session coaching avec Sophie Martin', date: 'Il y a 3 jours', variant: 'info', badgeLabel: 'Info' },
];

const SKILLS = [
  { id: 's1', label: 'Prompt Engineering',  value: 95, fill: 'brand'    as const },
  { id: 's2', label: 'IA Générative',        value: 88, fill: 'brand'    as const },
  { id: 's3', label: 'Pédagogie',            value: 92, fill: 'warm'     as const },
  { id: 's4', label: 'Design Thinking',      value: 78, fill: 'gradient' as const },
  { id: 's5', label: 'Veille Technologique', value: 85, fill: 'warm'     as const },
];

const TABS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview', icon: <Trophy size={14} />,    label: "Vue d'ensemble" },
  { id: 'activity', icon: <TrendingUp size={14} />, label: 'Activité récente' },
  { id: 'badges',   icon: <Award size={14} />,      label: 'Badges' },
  { id: 'skills',   icon: <Zap size={14} />,        label: 'Compétences' },
];

const WEEK_KPIS = [
  { icon: <Target size={24} />, value: '3/5',  label: 'Objectifs atteints', color: 'text-primary-600' },
  { icon: <Clock3 size={24} />, value: '12h',  label: "Temps d'étude",       color: 'text-secondary-600' },
  { icon: <Zap size={24} />,    value: '+450', label: 'Points XP gagnés',    color: 'text-accent-700' },
];

const SECTION_LABEL = 'text-micro font-bold text-ink-500 uppercase tracking-wider m-0 mb-2';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const displayUser = {
    name: user?.name ?? USER_MOCK.name,
    email: user?.email ?? USER_MOCK.email,
    roles: user?.roles ?? ['Apprenant', 'Formateur'],
  };

  const skillsForMatrix = useMemo(
    () =>
      SKILLS.map((skill) => {
        const color: 'primary' | 'warm' | 'sun' | 'success' =
          skill.fill === 'warm' ? 'warm' :
          skill.fill === 'gradient' ? 'success' :
          'primary';
        return {
          name: skill.label,
          level: Math.max(1, Math.round(skill.value / 20)),
          color,
        };
      }),
    [],
  );

  return (
    <div className="min-h-screen bg-ink-50 font-body">
      {/* Hero — keeps profile.css for hero/glass-banner styling */}
      <div className="profile__hero-banner">
        <div aria-hidden="true" className="profile__hero-glow-top" />
        <div aria-hidden="true" className="profile__hero-glow-bottom" />

        <div className="profile__card">
          <div className="flex flex-wrap items-start gap-6">
            <div className="profile__avatar-wrap">
              <div className="profile__avatar">
                <span className="profile__avatar-initials">{USER_MOCK.avatar}</span>
                <button className="profile__avatar-camera" aria-label="Modifier la photo de profil">
                  <Camera size={22} />
                </button>
              </div>
              <div className="profile__level-badge">
                <span>12</span>
              </div>
            </div>

            <div className="flex-1 min-w-[200px]">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="profile__name">{displayUser.name}</h1>
                <Badge variant="brand">Niveau 12</Badge>
              </div>
              <p className="profile__role">
                {USER_MOCK.role} · {USER_MOCK.username}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { icon: <Mail size={12} />, label: displayUser.email },
                  { icon: <MapPin size={12} />, label: USER_MOCK.location },
                  { icon: <Calendar size={12} />, label: `Membre depuis ${USER_MOCK.joinDate}` },
                ].map(({ icon, label }) => (
                  <span key={label} className="profile__meta-chip">
                    {icon} {label}
                  </span>
                ))}
              </div>

              <p className="text-caption text-ink-500 leading-relaxed m-0 mb-4 max-w-[560px]">
                {USER_MOCK.bio}
              </p>

              <div className="flex flex-wrap gap-1">
                {USER_MOCK.interests.map((interest) => (
                  <span key={interest} className="profile__interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-start gap-2">
              <Button variant="secondary" size="sm">
                <Edit3 size={13} /> Modifier
              </Button>
              <Button variant="ghost" size="sm">
                <Settings size={14} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 size={14} />
              </Button>
            </div>
          </div>

          <div className="profile__stats-row">
            {STATS.map(({ icon, value, label, tone }) => {
              const t = STAT_TONES[tone];
              return (
                <div key={label} className="profile__stat">
                  <div
                    className={`tls-kpi-icon mb-1 ${t.iconBg} ${t.iconColor}`}
                  >
                    {icon}
                  </div>
                  <span className={`profile__stat-value ${t.numColor}`}>{value}</span>
                  <span className="profile__stat-label">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile__tab-bar">
        <div role="tablist" aria-label="Sections du profil" className="profile__tab-list">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className="profile__tab"
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <main className="profile__content">
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              <div className="profile__card-surface">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="m-0 text-body font-bold text-ink-900">Informations</h3>
                  <Button size="sm" variant="ghost">
                    <Edit3 size={13} /> Modifier
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: <UserRound size={15} />, label: displayUser.name },
                    { icon: <Mail size={15} />, label: displayUser.email },
                    { icon: <ShieldCheck size={15} />, label: `ID ${user?.id ?? '1'}` },
                    { icon: <TrendingUp size={15} />, label: 'Top 5% apprenants IA' },
                    { icon: <Trophy size={15} />, label: '2 450 points XP' },
                  ].map(({ icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-ink-50"
                    >
                      <span className="text-primary-500 shrink-0">{icon}</span>
                      <span className="text-caption text-ink-900">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="profile__card-surface">
                <h3 className="m-0 mb-4 text-body font-bold text-ink-900">Rôles &amp; Badges</h3>
                <div className="mb-4">
                  <p className={SECTION_LABEL}>Rôles</p>
                  <div className="flex flex-wrap gap-2">
                    {displayUser.roles.map((role: string) => (
                      <Badge key={role} variant="neutral">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <p className={SECTION_LABEL}>Badges récents</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success">
                      <Award size={12} /> Expert GPT
                    </Badge>
                    <Badge variant="warm">
                      <Star size={12} /> Pionnier IA
                    </Badge>
                    <Badge variant="info">
                      <CheckCircle2 size={12} /> Streak Master
                    </Badge>
                  </div>
                </div>
                <div className="profile__focus-box">
                  <p className="m-0 mb-1 font-bold text-caption text-ink-900">🎯 Focus recommandé</p>
                  <p className="m-0 text-caption text-ink-500 leading-relaxed">
                    Priorité aux modules IA Générative et Prompt Engineering pour atteindre le palier
                    Expert.
                  </p>
                </div>
              </div>
            </div>

            <div className="profile__week-card">
              <h3 className="m-0 mb-5 text-body font-bold text-ink-900">
                Progression cette semaine
              </h3>
              <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                {WEEK_KPIS.map(({ icon, value, label, color }) => (
                  <div key={label} className="profile__week-kpi">
                    <div className={color}>{icon}</div>
                    <span
                      className={`text-h3 font-extrabold tracking-tight leading-none ${color}`}
                    >
                      {value}
                    </span>
                    <span className="text-micro text-ink-500 font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="flex flex-col gap-3">
            {ACTIVITY.map((item) => {
              const t = ACTIVITY_TONE[item.variant];
              return (
                <div key={item.id} className="profile__activity-item">
                  <div
                    className={`profile__activity-icon ${t.bg} ${t.color} border ${t.border}`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="m-0 mb-0.5 text-body-sm font-semibold text-ink-900">
                      {item.title}
                    </p>
                    <p className="m-0 inline-flex items-center gap-1 text-micro text-ink-500">
                      <Clock3 size={11} /> {item.date}
                    </p>
                  </div>
                  <Badge variant={item.variant}>{item.badgeLabel}</Badge>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`profile__badge-card ${
                  badge.earned ? 'profile__badge-card--earned' : 'profile__badge-card--locked'
                }`}
              >
                <span className="text-[2.5rem]">{badge.emoji}</span>
                <div>
                  <p className="m-0 mb-2 text-body-sm font-bold text-ink-900">{badge.label}</p>
                  {badge.earned ? (
                    <>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                      <p className="m-0 mt-2 text-micro text-ink-500">{badge.date}</p>
                    </>
                  ) : (
                    <>
                      <Badge variant="neutral">En cours</Badge>
                      <div className="w-full mt-3">
                        <ProgressBar value={badge.progress!} size="sm" fill="brand" valueLabel={false} />
                        <p className="m-0 mt-1 text-micro text-ink-500">{badge.progress}% accompli</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="flex flex-col gap-4">
            <div className="profile__matrix-card">
              <h3 className="m-0 mb-1 text-body font-bold text-ink-900">
                Matrice de compétences
              </h3>
              <p className="m-0 text-micro text-ink-500">
                Survol d'une compétence pour plus de détails
              </p>
              <CompetencyMatrix
                skills={skillsForMatrix}
                onSkillHover={(skill) => skill && console.log(skill.name)}
              />
            </div>

            {SKILLS.map((skill) => {
              const skillTone: 'brand' | 'warm' | 'sun' =
                skill.fill === 'warm' ? 'warm' : skill.fill === 'gradient' ? 'sun' : 'brand';
              const levelLabel =
                skill.value >= 90
                  ? 'Niveau expert'
                  : skill.value >= 75
                  ? 'Progression avancée'
                  : 'En développement';
              return (
                <div key={skill.id} className="profile__skill-card">
                  <SkillBar label={skill.label} value={skill.value} tone={skillTone} showValue />
                  <p className="m-0 mt-3 text-micro text-ink-500">{levelLabel}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
