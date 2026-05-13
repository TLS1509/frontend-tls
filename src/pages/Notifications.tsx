/**
 * Notifications — Phase 10 refonte (épurée + feed-first).
 *
 * Design intent :
 *   - Minimal hero (titre + compteur inline, pas de KPI row).
 *   - Feed-style notifications via NotificationCard pattern (tone-aware).
 *   - Filter chips compacts, segmented.
 *   - Page autonome ET pensée pour intégration ailleurs (Sidebar dropdown,
 *     Dashboard preview, etc.) via le pattern NotificationCard.
 *   - 100% Tailwind + DS tokens.
 */

import React, { useEffect, useState } from 'react';
import { Button } from '../components/core/Button';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { NotificationCard } from '../components/cards/NotificationCard';
import type { NotificationTone } from '../components/cards/NotificationCard';
import {
  SkeletonGroup,
  NotificationRowSkeleton,
} from '../components/patterns/SkeletonTemplates';
import { useNotificationsStore, useFilterPrefsStore } from '../stores/persistence';
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCheck,
  ChevronDown,
  FileText,
  MessageSquare,
  Award,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

/* ── Types ──────────────────────────────────────────────────────────────── */
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
  grade?: string;
  badgeName?: string;
}

/* ── Single source of truth for type → visual / icon / label ────────────── */

const TYPE_CONFIG: Record<
  NotifType,
  { tone: NotificationTone; icon: React.ReactNode; label: string }
> = {
  correction:  { tone: 'success', icon: <FileText size={15} />,     label: 'Correction' },
  achievement: { tone: 'sun',     icon: <Award size={15} />,        label: 'Badge' },
  lesson:      { tone: 'brand',   icon: <BookOpen size={15} />,     label: 'Leçon' },
  completion:  { tone: 'success', icon: <CheckCircle2 size={15} />, label: 'Terminé' },
  report:      { tone: 'warm',    icon: <FileText size={15} />,     label: 'Rapport' },
  coaching:    { tone: 'warm',    icon: <CalendarDays size={15} />, label: 'Coaching' },
  message:     { tone: 'brand',   icon: <MessageSquare size={15} />,label: 'Message' },
  system:      { tone: 'neutral', icon: <Bell size={15} />,         label: 'Système' },
};

/* ── Mock data ──────────────────────────────────────────────────────────── */

const INITIAL: Notif[] = [
  {
    id: 'n1',
    type: 'correction',
    title: 'Correction de projet final disponible',
    body: "Votre projet « Chatbot IA pour la Formation » a été corrigé.",
    time: 'Il y a 5 min',
    isRead: false,
    grade: '18/20',
  },
  {
    id: 'n2',
    type: 'achievement',
    title: 'Nouveau badge débloqué',
    body: "Vous avez débloqué le badge « Expert en Prompt Engineering ».",
    time: 'Il y a 15 min',
    isRead: false,
    badgeName: 'Expert en Prompt Engineering',
  },
  {
    id: 'n3',
    type: 'lesson',
    title: 'Nouvelle leçon disponible',
    body: "« IA Générative et Créativité » est désormais dans votre parcours.",
    time: 'Il y a 1h',
    isRead: false,
  },
  {
    id: 'n4',
    type: 'completion',
    title: 'Leçon complétée',
    body: "« Fondamentaux du Prompt Engineering » — score 95 %.",
    time: 'Il y a 2h',
    isRead: true,
    grade: '95 %',
  },
  {
    id: 'n5',
    type: 'report',
    title: 'Compte-rendu de coaching',
    body: "Le compte-rendu de votre session du 15 décembre est disponible.",
    time: 'Hier',
    isRead: true,
  },
  {
    id: 'n6',
    type: 'coaching',
    title: 'Rappel : session de coaching demain',
    body: "Votre session avec Sophie Martin est programmée demain à 14h.",
    time: 'Hier',
    isRead: true,
  },
  {
    id: 'n7',
    type: 'message',
    title: 'Nouveau message',
    body: "Sophie Martin vous a envoyé un message à propos de votre projet final.",
    time: 'Il y a 3 jours',
    isRead: true,
  },
];

const FILTERS: { id: Filter; label: string; icon: React.ReactNode }[] = [
  { id: 'all',      label: 'Toutes',     icon: <Bell size={13} /> },
  { id: 'unread',   label: 'Non lues',   icon: <MessageSquare size={13} /> },
  { id: 'messages', label: 'Messages',   icon: <MessageSquare size={13} /> },
  { id: 'lessons',  label: 'Formations', icon: <BookOpen size={13} /> },
  { id: 'coaching', label: 'Coaching',   icon: <CalendarDays size={13} /> },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export const Notifications: React.FC = () => {
  // Filter persisted via Zustand (cross-session) — use primitive selector to avoid infinite loop
  const persistedFilter = useFilterPrefsStore((s) => s.filters['notifications']?.[0]);
  const setPersistedFilters = useFilterPrefsStore((s) => s.set);
  const [filter, setFilterRaw] = useState<Filter>((persistedFilter as Filter) || 'all');
  const setFilter = (f: Filter) => {
    setFilterRaw(f);
    setPersistedFilters('notifications', [f]);
  };
  const [items, setItems] = useState<Notif[]>(INITIAL);
  const [loadCount, setLoadCount] = useState(10);
  // Simulated loading state for skeleton demo — replace by real fetch state when API wired
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Sync unread count to global store (powers Sidebar badge)
  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);
  useEffect(() => {
    const unread = items.filter((n) => !n.isRead).length;
    setUnreadCount(unread);
  }, [items, setUnreadCount]);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
  const markRead    = (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  const deleteNotif = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));

  const unread = items.filter((n) => !n.isRead).length;

  const visible = items.filter((n) => {
    if (filter === 'all')      return true;
    if (filter === 'unread')   return !n.isRead;
    if (filter === 'messages') return n.type === 'message';
    if (filter === 'lessons')  return n.type === 'lesson' || n.type === 'completion' || n.type === 'correction';
    if (filter === 'coaching') return n.type === 'coaching' || n.type === 'report';
    return true;
  });

  const displayed = visible.slice(0, loadCount);
  const hasMore = visible.length > loadCount;

  return (
    <div className="min-h-screen bg-surface">
      {/* Container compact, lisible, intégrable ailleurs (max-w-content) */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-section flex flex-col gap-stack-lg">

        {/* ── Header épuré ───────────────────────────────────────────── */}
        <header className="flex flex-wrap items-center justify-between gap-stack">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-pill bg-primary-100 text-primary-700 inline-flex items-center justify-center">
              <Bell size={18} />
            </div>
            <div>
              <h1 className="m-0 font-display text-h3 font-bold text-ink-900 leading-tight">
                Notifications
              </h1>
              <p className="m-0 font-body text-caption text-ink-500">
                {unread > 0
                  ? `${unread} non lue${unread > 1 ? 's' : ''} · ${items.length} au total`
                  : `${items.length} notification${items.length > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          {unread > 0 && (
            <Button
              size="sm"
              variant="ghost"
              leadingIcon={<CheckCheck size={14} />}
              onClick={markAllRead}
            >
              Tout marquer comme lu
            </Button>
          )}
        </header>

        {/* ── Filter chips ───────────────────────────────────────────── */}
        <nav
          aria-label="Filtrer les notifications"
          className="flex gap-2 flex-wrap"
        >
          {FILTERS.map(({ id, label, icon }) => (
            <FilterChip
              key={id}
              label={id === 'unread' && unread > 0 ? `${label} (${unread})` : label}
              icon={icon}
              active={filter === id}
              onClick={() => {
                setFilter(id);
                setLoadCount(10);
              }}
            />
          ))}
        </nav>

        {/* ── Feed ──────────────────────────────────────────────────── */}
        <section aria-label="Liste des notifications" className="flex flex-col">
          {isLoading ? (
            <SkeletonGroup count={5} template={NotificationRowSkeleton} layout="list" className="gap-2" />
          ) : visible.length === 0 ? (
            <EmptyState
              icon={<Bell size={28} />}
              title={filter === 'unread' ? 'Tout est lu' : 'Aucune notification'}
              description={
                filter === 'unread'
                  ? 'Vous êtes à jour. Bravo !'
                  : 'Aucune notification dans cette catégorie pour le moment.'
              }
            />
          ) : (
            <div className="flex flex-col divide-y divide-ink-100">
              {displayed.map((item) => {
                const cfg = TYPE_CONFIG[item.type];

                // Build meta inline (grade or badge name → tiny chip)
                const meta =
                  item.grade ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-ink-100 text-ink-700 font-semibold">
                      <Trophy size={10} />
                      {item.grade}
                    </span>
                  ) : item.badgeName ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-accent-100 text-accent-700 font-semibold">
                      <Award size={10} />
                      {item.badgeName}
                    </span>
                  ) : (
                    <span className="text-ink-500">{cfg.label}</span>
                  );

                return (
                  <NotificationCard
                    key={item.id}
                    tone={cfg.tone}
                    icon={cfg.icon}
                    title={item.title}
                    body={item.body}
                    time={item.time}
                    meta={meta}
                    unread={!item.isRead}
                    onMarkRead={() => markRead(item.id)}
                    onDelete={() => deleteNotif(item.id)}
                  />
                );
              })}
            </div>
          )}

          {hasMore && (
            <div className="pt-stack flex justify-center">
              <Button
                variant="secondary"
                size="sm"
                leadingIcon={<ChevronDown size={14} />}
                onClick={() => setLoadCount((prev) => prev + 10)}
              >
                Charger plus ({visible.length - loadCount})
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Notifications;
