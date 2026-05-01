/**
 * Notifications Page
 *
 * Rich notification types: correction, achievement, lesson, coaching, completion, report, message
 * Per-notification actions: mark read, delete
 * Multi-type filter pills, metadata display (grade, badge, progress)
 * Progressive disclosure: top 10 shown, "Load more" button
 * Design system TLS: static-pages.css tokens
 */

import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import {
  Bell,
  BellOff,
  BookOpen,
  CalendarDays,
  CheckCheck,
  Clock3,
  MessageSquare,
  Sparkles,
  Trophy,
  Award,
  FileText,
  Trash2,
  CheckCircle2,
  X,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';
import '../styles/static-pages.css';
import '../styles/feature-pages-modern.css';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type NotifType =
  | 'message'
  | 'lesson'
  | 'coaching'
  | 'achievement'
  | 'correction'
  | 'completion'
  | 'report'
  | 'system';

type Filter = 'all' | 'unread' | 'messages' | 'lessons' | 'coaching';

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  badge?: string;
  metadata?: {
    lessonTitle?: string;
    projectTitle?: string;
    grade?: string;
    badgeName?: string;
    progressPercent?: number;
  };
}

/* ─── Static data ────────────────────────────────────────────────────────── */
const INITIAL: Notif[] = [
  {
    id: 'n1',
    type: 'correction',
    title: 'Correction de projet final disponible',
    body: "Votre projet final « Chatbot IA pour la Formation » a été corrigé. Excellente intégration des concepts d'IA générative !",
    time: 'Il y a 5 min',
    isRead: false,
    badge: 'Nouveau',
    metadata: { projectTitle: 'Projet Final — Chatbot IA', grade: '18/20' },
  },
  {
    id: 'n2',
    type: 'achievement',
    title: 'Nouveau badge débloqué !',
    body: 'Félicitations ! Vous avez débloqué le badge « Expert en Prompt Engineering » en complétant toutes les leçons du module.',
    time: 'Il y a 15 min',
    isRead: false,
    badge: 'Nouveau',
    metadata: { badgeName: 'Expert en Prompt Engineering' },
  },
  {
    id: 'n3',
    type: 'lesson',
    title: 'Nouvelle leçon disponible',
    body: "La leçon « IA Générative et Créativité » est maintenant disponible dans votre parcours.",
    time: 'Il y a 1h',
    isRead: false,
    badge: 'Nouveau',
    metadata: { lessonTitle: 'Leçon 5 — IA Générative et Créativité' },
  },
  {
    id: 'n4',
    type: 'completion',
    title: 'Leçon complétée avec succès',
    body: "Vous avez terminé la leçon « Fondamentaux du Prompt Engineering » avec un score de 95 %. Continuez comme ça !",
    time: 'Il y a 2h',
    isRead: true,
    metadata: { lessonTitle: 'Leçon 3 — Fondamentaux du Prompt Engineering', grade: '95%' },
  },
  {
    id: 'n5',
    type: 'report',
    title: 'Compte-rendu de session de coaching',
    body: "Le compte-rendu de votre session de coaching du 15 décembre est disponible.",
    time: 'Hier',
    isRead: true,
    metadata: { lessonTitle: 'Session 15 déc. — Prompt Engineering' },
  },
  {
    id: 'n6',
    type: 'coaching',
    title: 'Rappel : session de coaching demain',
    body: "Votre session avec Sophie Martin est programmée demain à 14h00. Pensez à compléter le questionnaire pré-session.",
    time: 'Hier',
    isRead: true,
  },
  {
    id: 'n7',
    type: 'message',
    title: 'Nouveau message de votre coach',
    body: "Sophie Martin vous a envoyé un message concernant votre projet final.",
    time: 'Il y a 3 jours',
    isRead: true,
  },
];

/* ─── Style map ──────────────────────────────────────────────────────────── */
const TYPE_META: Record<NotifType, {
  icon: React.ReactNode;
  accent: string;
  bg: string;
  border: string;
  label: string;
}> = {
  correction: {
    icon: <FileText size={16} />,
    accent: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    border: 'rgba(85,161,180,0.25)',
    label: 'Correction',
  },
  achievement: {
    icon: <Award size={16} />,
    accent: 'var(--tls-yellow-600)',
    bg: 'rgba(234,192,74,0.12)',
    border: 'rgba(234,192,74,0.3)',
    label: 'Badge',
  },
  lesson: {
    icon: <BookOpen size={16} />,
    accent: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    border: 'rgba(85,161,180,0.2)',
    label: 'Leçon',
  },
  completion: {
    icon: <CheckCircle2 size={16} />,
    accent: 'var(--tls-success-fg)',
    bg: 'rgba(74,140,110,0.1)',
    border: 'rgba(74,140,110,0.25)',
    label: 'Terminé',
  },
  report: {
    icon: <FileText size={16} />,
    accent: 'var(--tls-orange-600)',
    bg: 'rgba(237,132,58,0.1)',
    border: 'rgba(237,132,58,0.25)',
    label: 'Rapport',
  },
  coaching: {
    icon: <CalendarDays size={16} />,
    accent: 'var(--tls-orange-600)',
    bg: 'rgba(237,132,58,0.08)',
    border: 'rgba(237,132,58,0.2)',
    label: 'Coaching',
  },
  message: {
    icon: <MessageSquare size={16} />,
    accent: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    border: 'rgba(85,161,180,0.2)',
    label: 'Message',
  },
  system: {
    icon: <Bell size={16} />,
    accent: 'var(--text-muted)',
    bg: 'var(--surface-muted)',
    border: 'var(--border)',
    label: 'Système',
  },
};

const FILTERS: { id: Filter; label: string; icon: React.ReactNode }[] = [
  { id: 'all',      label: 'Toutes',     icon: <Sparkles size={13} /> },
  { id: 'unread',   label: 'Non lues',   icon: <Bell size={13} /> },
  { id: 'messages', label: 'Messages',   icon: <MessageSquare size={13} /> },
  { id: 'lessons',  label: 'Formations', icon: <BookOpen size={13} /> },
  { id: 'coaching', label: 'Coaching',   icon: <CalendarDays size={13} /> },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [items, setItems] = useState<Notif[]>(INITIAL);
  const [loadCount, setLoadCount] = useState(10);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  const deleteNotif = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));

  const unread = items.filter((n) => !n.isRead).length;

  const visible = items.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    if (filter === 'messages') return n.type === 'message';
    if (filter === 'lessons') return n.type === 'lesson' || n.type === 'completion' || n.type === 'correction';
    if (filter === 'coaching') return n.type === 'coaching' || n.type === 'report';
    return true;
  });

  const displayed = visible.slice(0, loadCount);
  const hasMore = visible.length > loadCount;

  return (
    <div className="tls-page">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Bell size={12} /> Centre de notifications</span>
        <h1>Notifications</h1>
        <p className="tls-editorial-summary">
          Retrouvez les événements importants de votre activité d'apprentissage.
          {unread > 0 && (
            <span style={{
              marginLeft: 'var(--s-2)',
              display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)',
              padding: '2px 10px', borderRadius: 'var(--r-pill)',
              background: 'var(--tls-primary-600)', color: '#fff',
              fontSize: 'var(--t-micro)', fontWeight: 700,
            }}>
              {unread} non lue{unread > 1 ? 's' : ''}
            </span>
          )}
        </p>
      </section>

      {/* ── KPI row ───────────────────────────────────────────────── */}
      <section className="tls-kpi-row">
        {[
          { icon: <Bell size={20} />, value: items.length,                          label: 'Total',     color: 'var(--tls-primary-700)',  iconBg: 'var(--tls-primary-50)',         iconColor: 'var(--tls-primary-600)' },
          { icon: <MessageSquare size={20} />, value: unread,                       label: 'Non lues',  color: unread > 0 ? 'var(--tls-orange-600)' : 'var(--text-muted)', iconBg: unread > 0 ? 'rgba(237,132,58,0.1)' : 'var(--surface-muted)', iconColor: unread > 0 ? 'var(--tls-orange-600)' : 'var(--text-muted)' },
          { icon: <CheckCheck size={20} />, value: items.filter((n) => n.isRead).length, label: 'Traitées', color: 'var(--tls-success-fg)',  iconBg: 'rgba(74,140,110,0.1)',         iconColor: 'var(--tls-success-fg)' },
          { icon: <BellOff size={20} />, value: 0,                                  label: 'Archivées', color: 'var(--tls-yellow-700)',    iconBg: 'rgba(234,192,74,0.15)',        iconColor: 'var(--tls-yellow-700)' },
        ].map(({ icon, value, label, color, iconBg, iconColor }) => (
          <div key={label} className="tls-kpi">
            <div className="tls-kpi-icon" style={{ background: iconBg, color: iconColor }}>{icon}</div>
            <h2 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, margin: 0, color, letterSpacing: '-0.03em' }}>{value}</h2>
            <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>{label}</span>
          </div>
        ))}
      </section>

      {/* ── Toolbar ───────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
        <Button size="sm" variant="secondary" onClick={markAllRead}>
          <CheckCheck size={14} /> Tout marquer comme lu
        </Button>
        <div role="tablist" aria-label="Filtrer par catégorie" style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
          {FILTERS.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={filter === id}
              onClick={() => { setFilter(id); setLoadCount(10); }}
              className={`tls-filter-pill${filter === id ? ' tls-filter-pill--active' : ''}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Notification cards ────────────────────────────────────── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
        {visible.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 'var(--s-12)',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-2xl)',
          }}>
            <Bell size={32} style={{ color: 'var(--text-muted)', opacity: 0.3, marginBottom: 'var(--s-3)' }} />
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: 'var(--t-body-sm)' }}>
              Aucune notification dans cette catégorie
            </p>
          </div>
        ) : (
          <>
            {displayed.map((item) => {
            const s = TYPE_META[item.type];
            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderLeft: `4px solid ${item.isRead ? 'var(--border)' : s.accent}`,
                  borderRadius: 'var(--r-xl)',
                  padding: 'var(--s-5)',
                  boxShadow: item.isRead ? 'none' : 'var(--shadow-xs)',
                  opacity: item.isRead ? 0.8 : 1,
                  transition: 'all var(--dur-2)',
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--s-4)', alignItems: 'flex-start' }}>
                  {/* Icon bubble */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--r-lg)',
                    background: s.bg, border: `1px solid ${s.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: s.accent, flexShrink: 0,
                  }}>
                    {s.icon}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--s-3)', marginBottom: 'var(--s-1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
                        <h3 style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--text)' }}>
                          {item.title}
                        </h3>
                        {!item.isRead && (
                          <span style={{
                            display: 'inline-flex', padding: '1px 6px', borderRadius: 'var(--r-pill)',
                            background: s.accent, color: '#fff',
                            fontSize: '10px', fontWeight: 700,
                          }}>
                            {item.badge ?? 'Nouveau'}
                          </span>
                        )}
                      </div>
                      {/* Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', flexShrink: 0 }}>
                        {!item.isRead && (
                          <button
                            title="Marquer comme lu"
                            onClick={() => markRead(item.id)}
                            style={{
                              width: 28, height: 28, borderRadius: 'var(--r-md)',
                              background: 'transparent', border: '1px solid var(--border)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', color: 'var(--text-muted)',
                              transition: 'all var(--dur-1)',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-primary-50)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--tls-primary-600)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; }}
                          >
                            <CheckCircle2 size={13} />
                          </button>
                        )}
                        <button
                          title="Supprimer"
                          onClick={() => deleteNotif(item.id)}
                          style={{
                            width: 28, height: 28, borderRadius: 'var(--r-md)',
                            background: 'transparent', border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'var(--text-muted)',
                            transition: 'all var(--dur-1)',
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(237,132,58,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--tls-orange-600)'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <p style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      {item.body}
                    </p>

                    {/* Metadata chips */}
                    {item.metadata && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)', marginBottom: 'var(--s-2)' }}>
                        {item.metadata.projectTitle && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            padding: '2px 8px', borderRadius: 'var(--r-pill)',
                            background: 'var(--surface-muted)', border: '1px solid var(--border)',
                            fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500,
                          }}>
                            <TrendingUp size={10} /> {item.metadata.projectTitle}
                          </span>
                        )}
                        {item.metadata.lessonTitle && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            padding: '2px 8px', borderRadius: 'var(--r-pill)',
                            background: 'var(--surface-muted)', border: '1px solid var(--border)',
                            fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500,
                          }}>
                            <BookOpen size={10} /> {item.metadata.lessonTitle}
                          </span>
                        )}
                        {item.metadata.grade && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            padding: '2px 8px', borderRadius: 'var(--r-pill)',
                            background: s.bg, border: `1px solid ${s.border}`,
                            fontSize: '11px', color: s.accent, fontWeight: 700,
                          }}>
                            <Trophy size={10} /> {item.metadata.grade}
                          </span>
                        )}
                        {item.metadata.badgeName && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            padding: '2px 8px', borderRadius: 'var(--r-pill)',
                            background: 'rgba(234,192,74,0.12)', border: '1px solid rgba(234,192,74,0.3)',
                            fontSize: '11px', color: 'var(--tls-yellow-700)', fontWeight: 700,
                          }}>
                            🏆 {item.metadata.badgeName}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Time */}
                    <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock3 size={10} /> {item.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

            {/* Load more button */}
            {hasMore && (
              <div style={{ textAlign: 'center', padding: 'var(--s-4)' }}>
                <Button
                  variant="secondary"
                  onClick={() => setLoadCount((prev) => prev + 10)}
                >
                  <ChevronDown size={14} /> Charger plus ({visible.length - loadCount})
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
