/**
 * Profile Page
 *
 * Vue utilisateur — hero avec avatar, stats, onglets (overview / activité / badges / compétences).
 * Design system TLS : glassmorphism hero, tls-kpi-icon stats, tone-colored activity items.
 */

import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Badge, Button, ProgressBar } from '../components';
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

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Tab = 'overview' | 'activity' | 'badges' | 'skills';

/* ─── Static data ────────────────────────────────────────────────────────── */
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

const STATS = [
  { icon: <BookOpen size={20} />, value: '12', label: 'Cours terminés',  iconBg: 'var(--tls-primary-50)',       iconColor: 'var(--tls-primary-600)',  numColor: 'var(--tls-primary-700)' },
  { icon: <Clock3 size={20} />,   value: '86h', label: 'Temps appris',   iconBg: 'var(--tls-orange-50)',        iconColor: 'var(--tls-orange-600)',   numColor: 'var(--tls-orange-600)' },
  { icon: <Flame size={20} />,    value: '7j',  label: 'Série actuelle', iconBg: 'var(--tls-orange-50)',        iconColor: 'var(--tls-orange-600)',   numColor: 'var(--tls-orange-600)' },
  { icon: <Trophy size={20} />,   value: '2 450', label: 'Points XP',   iconBg: 'var(--tls-yellow-50)',        iconColor: 'var(--tls-yellow-600)',   numColor: 'var(--tls-yellow-600)' },
];

const BADGES = [
  { id: 'b1', label: 'Pionnier IA',   emoji: '🤖', variant: 'brand'   as const, earned: true,  date: '15 Jan 2024' },
  { id: 'b2', label: 'Streak Master', emoji: '🔥', variant: 'warm'    as const, earned: true,  date: '20 Jan 2024' },
  { id: 'b3', label: 'Expert GPT',    emoji: '⚡', variant: 'sun'     as const, earned: true,  date: '25 Jan 2024' },
  { id: 'b4', label: 'Contributeur',  emoji: '🌟', variant: 'info'    as const, earned: true,  date: '1 Fév 2024' },
  { id: 'b5', label: 'Mentor',        emoji: '👨‍🏫', variant: 'neutral' as const, earned: false, progress: 60 },
  { id: 'b6', label: 'Innovateur',    emoji: '💡', variant: 'neutral' as const, earned: false, progress: 40 },
];

const ACTIVITY_STYLES = {
  success: { bg: 'var(--tls-success-bg)',  color: 'var(--tls-success-fg)',   border: 'rgba(157, 190, 186, 0.4)' },
  sun:     { bg: 'var(--tls-yellow-100)',  color: 'var(--tls-yellow-600)',   border: 'var(--tls-yellow-300)' },
  warm:    { bg: 'var(--tls-orange-100)',  color: 'var(--tls-orange-600)',   border: 'var(--tls-orange-200)' },
  info:    { bg: 'var(--tls-primary-50)',  color: 'var(--tls-primary-600)',  border: 'var(--tls-primary-200)' },
} as const;

type ActivityVariant = keyof typeof ACTIVITY_STYLES;

const ACTIVITY: { id: string; icon: React.ReactNode; title: string; date: string; variant: ActivityVariant; badgeLabel: string }[] = [
  { id: 'a1', icon: <BookOpen size={16} />, title: 'Formation GPT-4 Avancé terminée',         date: "Aujourd'hui",   variant: 'success', badgeLabel: 'Terminé' },
  { id: 'a2', icon: <Award size={16} />,    title: 'Badge "Expert GPT" débloqué',              date: 'Hier',          variant: 'sun',     badgeLabel: 'Nouveau' },
  { id: 'a3', icon: <Flame size={16} />,    title: 'Série de 7 jours maintenue',               date: 'Il y a 2 jours', variant: 'warm',   badgeLabel: 'Actif' },
  { id: 'a4', icon: <Users size={16} />,    title: 'Session coaching avec Sophie Martin',      date: 'Il y a 3 jours', variant: 'info',   badgeLabel: 'Info' },
];

const SKILLS = [
  { id: 's1', label: 'Prompt Engineering',    value: 95, fill: 'brand'    as const },
  { id: 's2', label: 'IA Générative',          value: 88, fill: 'brand'    as const },
  { id: 's3', label: 'Pédagogie',              value: 92, fill: 'warm'     as const },
  { id: 's4', label: 'Design Thinking',        value: 78, fill: 'gradient' as const },
  { id: 's5', label: 'Veille Technologique',   value: 85, fill: 'warm'     as const },
];

const TABS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'overview',  icon: <Trophy size={14} />,    label: "Vue d'ensemble" },
  { id: 'activity',  icon: <TrendingUp size={14} />, label: 'Activité récente' },
  { id: 'badges',    icon: <Award size={14} />,      label: 'Badges' },
  { id: 'skills',    icon: <Zap size={14} />,        label: 'Compétences' },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const displayUser = {
    name: user?.name ?? USER_MOCK.name,
    email: user?.email ?? USER_MOCK.email,
    roles: user?.roles ?? ['Apprenant', 'Formateur'],
  };

  const colorMap: Record<string, string> = { brand: 'default', warm: 'orange', sun: 'yellow', gradient: 'success' };

  const skillsForMatrix = useMemo(
    () =>
      SKILLS.map((skill) => ({
        name: skill.label,
        level: Math.max(1, Math.round(skill.value / 20)),
        color: colorMap[skill.fill] ?? 'default',
      })),
    [],
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-body)' }}>

      {/* ─ Glass Hero — Elevated with better visual hierarchy ───────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--tls-primary-500) 0%, var(--tls-orange-500) 100%)',
        color: 'var(--text-inverse)',
        padding: 'var(--s-10) var(--s-8) var(--s-6)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative dual-radial glow overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
          background: 'radial-gradient(circle at 28% 30%, var(--tls-primary-400) 0%, transparent 50%), radial-gradient(circle at 82% 75%, var(--tls-yellow-300) 0%, transparent 50%)',
        }} />
        {/* Soft glow blobs */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '-30%', left: '-8%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, var(--tls-primary-300) 0%, transparent 70%)', pointerEvents: 'none', opacity: 0.15 }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-20%', right: '5%',  width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, var(--tls-yellow-300) 0%, transparent 70%)', pointerEvents: 'none', opacity: 0.15 }} />

        {/* Profile glass card — Enhanced with elevated styling */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'var(--glass-blur-standard)',
          WebkitBackdropFilter: 'var(--glass-blur-standard)',
          border: '1px solid rgba(255,255,255,0.85)',
          borderRadius: 'var(--r-2xl)',
          boxShadow: 'var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.98)',
          padding: 'var(--s-10)',
          maxWidth: 'var(--container-wide)',
          margin: '0 auto var(--s-4)',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: 'var(--s-6)', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Avatar — Elevated styling */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 104, height: 104,
                borderRadius: 'var(--r-2xl)',
                background: 'linear-gradient(135deg, var(--tls-primary-400) 0%, var(--tls-orange-500) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--shadow-xl), 0 20px 40px rgba(85,161,180,0.25)',
                overflow: 'hidden',
                position: 'relative',
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.02em', zIndex: 1 }}>
                  {USER_MOCK.avatar}
                </span>
                {/* Camera hover overlay */}
                <button style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(4px)',
                  border: 'none', cursor: 'pointer',
                  opacity: 0, transition: 'opacity var(--dur-2)',
                  zIndex: 2,
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0'; }}
                >
                  <Camera size={22} color="#fff" />
                </button>
              </div>
              {/* Level badge — Elevated with better prominence */}
              <div style={{
                position: 'absolute', bottom: -8, right: -8,
                width: 40, height: 40,
                borderRadius: 'var(--r-lg)',
                background: 'linear-gradient(135deg, var(--tls-orange-500) 0%, var(--tls-yellow-500) 100%)',
                border: '4px solid #fff',
                boxShadow: 'var(--shadow-lg), 0 8px 20px rgba(237,132,58,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.75rem' }}>12</span>
              </div>
            </div>

            {/* Name + meta — Enhanced visual hierarchy */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-2)', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, color: 'var(--text-inverse)', margin: 0, letterSpacing: '-0.02em' }}>
                  {displayUser.name}
                </h1>
                <Badge variant="sun" style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}>Niveau 12</Badge>
              </div>
              <p style={{ fontSize: 'var(--t-caption)', color: 'rgba(255,255,255,0.85)', margin: '0 0 var(--s-3)', fontWeight: 500 }}>
                {USER_MOCK.role} · {USER_MOCK.username}
              </p>

              {/* Meta chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)', marginBottom: 'var(--s-4)' }}>
                {[
                  { icon: <Mail size={12} />, label: displayUser.email },
                  { icon: <MapPin size={12} />, label: USER_MOCK.location },
                  { icon: <Calendar size={12} />, label: `Membre depuis ${USER_MOCK.joinDate}` },
                ].map(({ icon, label }) => (
                  <span key={label} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)',
                    padding: 'var(--s-1) var(--s-2-5)',
                    borderRadius: 'var(--r-pill)',
                    background: 'var(--surface-muted)', border: '1px solid var(--border)',
                    color: 'var(--text-muted)', fontSize: 'var(--t-micro)', fontWeight: 500,
                  }}>
                    {icon} {label}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 var(--s-4)', maxWidth: 560 }}>
                {USER_MOCK.bio}
              </p>

              {/* Interests */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-1)' }}>
                {USER_MOCK.interests.map((interest) => (
                  <span key={interest} style={{
                    padding: 'var(--s-1) var(--s-2-5)', borderRadius: 'var(--r-pill)',
                    background: 'var(--tls-primary-50)', color: 'var(--tls-primary-700)',
                    fontSize: 'var(--t-micro)', fontWeight: 600,
                    border: '1px solid rgba(85,161,180,0.18)',
                  }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 'var(--s-2)', flexShrink: 0, alignItems: 'flex-start' }}>
              <Button variant="secondary" size="sm"><Edit3 size={13} /> Modifier</Button>
              <Button variant="ghost" size="sm"><Settings size={14} /></Button>
              <Button variant="ghost" size="sm"><Share2 size={14} /></Button>
            </div>
          </div>

          {/* Stats row — tls-kpi-icon pattern */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s-3)',
            marginTop: 'var(--s-6)', paddingTop: 'var(--s-6)', borderTop: '1px solid var(--border)',
          }}>
            {STATS.map(({ icon, value, label, iconBg, iconColor, numColor }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s-1-5)', textAlign: 'center' }}>
                <div className="tls-kpi-icon" style={{ background: iconBg, color: iconColor, marginBottom: 'var(--s-1)' }}>
                  {icon}
                </div>
                <span style={{ fontSize: 'var(--t-h3)', fontWeight: 800, color: numColor, lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {value}
                </span>
                <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─ Tab bar ──────────────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 var(--s-8)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div role="tablist" aria-label="Sections du profil" style={{
          display: 'flex', gap: 0, maxWidth: 'var(--container-wide)', margin: '0 auto',
        }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 'var(--s-2)',
                  padding: 'var(--s-4) var(--s-5)',
                  border: 'none', background: 'transparent',
                  color: isActive ? 'var(--tls-primary-700)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 'var(--t-caption)',
                  cursor: 'pointer',
                  borderBottom: isActive ? '2px solid var(--tls-primary-500)' : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'all var(--dur-2)',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─ Tab content ──────────────────────────────────────────────────── */}
      <main style={{ padding: 'var(--s-8)', maxWidth: 'var(--container-wide)', margin: '0 auto' }}>

        {/* ─ Overview ── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
            {/* Top row: info + badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-5)' }}>
              {/* Info card */}
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-2xl)', padding: 'var(--s-6)',
                boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s-4)' }}>
                  <h3 style={{ fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                    Informations
                  </h3>
                  <Button size="sm" variant="ghost"><Edit3 size={13} /> Modifier</Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
                  {[
                    { icon: <UserRound size={15} />,  label: displayUser.name },
                    { icon: <Mail size={15} />,        label: displayUser.email },
                    { icon: <ShieldCheck size={15} />, label: `ID ${user?.id ?? '1'}` },
                    { icon: <TrendingUp size={15} />,  label: 'Top 5% apprenants IA' },
                    { icon: <Trophy size={15} />,      label: '2 450 points XP' },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{
                      display: 'flex', alignItems: 'center', gap: 'var(--s-3)',
                      padding: 'var(--s-2) var(--s-3)', borderRadius: 'var(--r-lg)',
                      background: 'var(--surface-muted)',
                    }}>
                      <span style={{ color: 'var(--tls-primary-500)', flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text)' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles & Badges card */}
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-2xl)', padding: 'var(--s-6)',
                boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}>
                <h3 style={{ fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-4)' }}>
                  Rôles &amp; Badges
                </h3>
                <div style={{ marginBottom: 'var(--s-4)' }}>
                  <p style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 var(--s-2)' }}>
                    Rôles
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)' }}>
                    {displayUser.roles.map((role: string) => (
                      <Badge key={role} variant="neutral">{role}</Badge>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 'var(--s-4)' }}>
                  <p style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 var(--s-2)' }}>
                    Badges récents
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)' }}>
                    <Badge variant="success"><Award size={12} /> Expert GPT</Badge>
                    <Badge variant="warm"><Star size={12} /> Pionnier IA</Badge>
                    <Badge variant="info"><CheckCircle2 size={12} /> Streak Master</Badge>
                  </div>
                </div>
                {/* Focus recommandé */}
                <div style={{
                  background: 'linear-gradient(135deg, var(--tls-primary-50) 0%, rgba(255,255,255,0.7) 100%)',
                  border: '1px solid rgba(85,161,180,0.18)',
                  borderRadius: 'var(--r-xl)', padding: 'var(--s-4)',
                }}>
                  <p style={{ margin: '0 0 var(--s-1)', fontWeight: 700, fontSize: 'var(--t-caption)', color: 'var(--text)' }}>
                    🎯 Focus recommandé
                  </p>
                  <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Priorité aux modules IA Générative et Prompt Engineering pour atteindre le palier Expert.
                  </p>
                </div>
              </div>
            </div>

            {/* Week progression card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(85,161,180,0.08) 0%, rgba(248,176,68,0.05) 100%)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-2xl)', padding: 'var(--s-6)',
              boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}>
              <h3 style={{ fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-5)' }}>
                Progression cette semaine
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s-4)' }}>
                {[
                  { icon: <Target size={24} />, value: '3/5', label: 'Objectifs atteints', iconColor: 'var(--tls-primary-600)', bg: 'var(--surface)' },
                  { icon: <Clock3 size={24} />,  value: '12h', label: "Temps d'étude",      iconColor: 'var(--tls-orange-600)',  bg: 'var(--surface)' },
                  { icon: <Zap size={24} />,      value: '+450', label: 'Points XP gagnés',  iconColor: 'var(--tls-yellow-600)',  bg: 'var(--surface)' },
                ].map(({ icon, value, label, iconColor, bg }) => (
                  <div key={label} style={{
                    background: bg, border: '1px solid var(--border)',
                    borderRadius: 'var(--r-xl)', padding: 'var(--s-5)',
                    textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s-2)',
                    boxShadow: 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.95)',
                  }}>
                    <div style={{ color: iconColor }}>{icon}</div>
                    <span style={{ fontSize: 'var(--t-h3)', fontWeight: 800, color: iconColor, lineHeight: 1, letterSpacing: '-0.02em' }}>
                      {value}
                    </span>
                    <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─ Activity ── */}
        {activeTab === 'activity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
            {ACTIVITY.map((item) => {
              const s = ACTIVITY_STYLES[item.variant];
              return (
                <div key={item.id} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-xl)', padding: 'var(--s-4) var(--s-5)',
                  display: 'flex', alignItems: 'center', gap: 'var(--s-4)',
                  boxShadow: 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.9)',
                  transition: 'transform var(--dur-2), box-shadow var(--dur-2)',
                }}>
                  {/* Tone-colored icon bubble */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--r-lg)',
                    background: s.bg, border: `1px solid ${s.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: s.color, flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 2px', fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>
                      {item.title}
                    </p>
                    <p style={{ margin: 0, fontSize: 'var(--t-micro)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                      <Clock3 size={11} /> {item.date}
                    </p>
                  </div>
                  <Badge variant={item.variant}>{item.badgeLabel}</Badge>
                </div>
              );
            })}
          </div>
        )}

        {/* ─ Badges ── */}
        {activeTab === 'badges' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s-4)' }}>
            {BADGES.map((badge) => (
              <div key={badge.id} style={{
                background: badge.earned
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))'
                  : 'var(--surface-muted)',
                border: badge.earned ? '1px solid rgba(85,161,180,0.18)' : '1px dashed var(--border)',
                borderRadius: 'var(--r-2xl)', padding: 'var(--s-6)',
                textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s-3)',
                opacity: badge.earned ? 1 : 0.65,
                boxShadow: badge.earned ? 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.95)' : 'none',
                transition: 'all var(--dur-2)',
              }}>
                <span style={{ fontSize: '2.5rem' }}>{badge.emoji}</span>
                <div>
                  <p style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--text)' }}>
                    {badge.label}
                  </p>
                  {badge.earned ? (
                    <>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                      <p style={{ margin: 'var(--s-2) 0 0', fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>
                        {badge.date}
                      </p>
                    </>
                  ) : (
                    <>
                      <Badge variant="neutral">En cours</Badge>
                      <div style={{ width: '100%', marginTop: 'var(--s-3)' }}>
                        <ProgressBar value={badge.progress!} size="sm" fill="brand" valueLabel={false} />
                        <p style={{ margin: 'var(--s-1) 0 0', fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>
                          {badge.progress}% accompli
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─ Skills ── */}
        {activeTab === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
            {/* Competency Matrix — visual overview of skill levels */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)', padding: 'var(--s-5)',
              boxShadow: 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}>
              <h3 style={{ fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-1)' }}>
                Matrice de compétences
              </h3>
              <p style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', margin: 0 }}>
                Survol d'une compétence pour plus de détails
              </p>
              <CompetencyMatrix
                skills={skillsForMatrix}
                onSkillHover={(skill) => skill && console.log(skill.name)}
              />
            </div>

            {/* Existing progress bars */}
            {SKILLS.map((skill) => (
              <div key={skill.id} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)', padding: 'var(--s-5)',
                boxShadow: 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s-3)' }}>
                  <span style={{ fontSize: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--text)' }}>
                    {skill.label}
                  </span>
                  <span style={{
                    fontSize: 'var(--t-body-sm)', fontWeight: 800,
                    color: skill.value >= 90 ? 'var(--tls-primary-700)' : 'var(--tls-orange-600)',
                  }}>
                    {skill.value}%
                  </span>
                </div>
                <ProgressBar value={skill.value} size="md" fill={skill.fill} valueLabel={false} />
                <p style={{ margin: 'var(--s-2) 0 0', fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>
                  {skill.value >= 90 ? '🏆 Niveau expert' : skill.value >= 75 ? '📈 Progression avancée' : '📚 En développement'}
                </p>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};
