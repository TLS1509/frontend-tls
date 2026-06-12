/**
 * Notifications : Phase 10 refonte (épurée + feed-first).
 *
 * Design intent :
 *   - Minimal hero (titre + compteur inline, pas de KPI row).
 *   - Feed-style notifications via NotificationCard pattern (tone-aware).
 *   - Filter chips compacts, segmented.
 *   - Page autonome ET pensée pour intégration ailleurs (Sidebar dropdown,
 *     Dashboard preview, etc.) via le pattern NotificationCard.
 *   - 100% Tailwind + DS tokens.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '../components/core/Button';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { NotificationCard } from '../components/cards/NotificationCard';
import type { NotificationTone } from '../components/cards/NotificationCard';
import {
  SkeletonGroup,
  NotificationRowSkeleton,
} from '../components/patterns/SkeletonTemplates';
import { useNotificationsStore, useFilterPrefsStore, useInAppNotificationsStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { NotificationEventType } from '../types/learning';
import { Container } from '../components/layout';
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

/* ── Event type → display type mapping (Cahier #09) ────────────────────── */

const EVENT_TO_NOTIF_TYPE: Record<NotificationEventType, NotifType> = {
  lesson_published: 'lesson',
  coaching_booked: 'coaching',
  coaching_confirmed: 'coaching',
  coaching_recap_ready: 'report',
  badge_earned: 'achievement',
  jac_pending: 'system',
  jac_approved: 'achievement',
  parcours_completed: 'completion',
  session_reminder: 'coaching',
  newsletter_weekly: 'report',
  report_weekly: 'report',
  system: 'system',
};

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "À l'instant";
  if (mins < 60) return `Il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Hier';
  return `Il y a ${days} jours`;
}

const FILTERS: { id: Filter; label: string; icon: React.ReactNode }[] = [
  { id: 'all',      label: 'Toutes',     icon: <Bell size={13} /> },
  { id: 'unread',   label: 'Non lues',   icon: <MessageSquare size={13} /> },
  { id: 'messages', label: 'Messages',   icon: <MessageSquare size={13} /> },
  { id: 'lessons',  label: 'Formations', icon: <BookOpen size={13} /> },
  { id: 'coaching', label: 'Coaching',   icon: <CalendarDays size={13} /> },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export const Notifications: React.FC = () => {
  // Filter persisted via Zustand (cross-session) : use primitive selector to avoid infinite loop
  const persistedFilter = useFilterPrefsStore((s) => s.filters['notifications']?.[0]);
  const setPersistedFilters = useFilterPrefsStore((s) => s.set);
  const [filter, setFilterRaw] = useState<Filter>((persistedFilter as Filter) || 'all');
  const setFilter = (f: Filter) => {
    setFilterRaw(f);
    setPersistedFilters('notifications', [f]);
  };
  const [loadCount, setLoadCount] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const notifStore = useInAppNotificationsStore();
  const storeNotifs = notifStore.getNotifications(MOCK_USER_ID);

  // Map InAppNotification → display Notif
  const items: Notif[] = useMemo(
    () =>
      storeNotifs.map((n) => ({
        id: n.id,
        type: EVENT_TO_NOTIF_TYPE[n.eventType] ?? 'system',
        title: n.title,
        body: n.body,
        time: formatRelativeTime(n.createdAt),
        isRead: n.isRead,
      })),
    [storeNotifs]
  );

  // Sync unread count to global store (powers Sidebar badge)
  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);
  useEffect(() => {
    const unread = storeNotifs.filter((n) => !n.isRead).length;
    setUnreadCount(unread);
  }, [storeNotifs, setUnreadCount]);

  const markAllRead = () => notifStore.markAllAsRead(MOCK_USER_ID);
  const markRead    = (id: string) => notifStore.markAsRead(MOCK_USER_ID, id);
  // deletion not in spec : keep in-app store items but mark read instead
  const deleteNotif = (id: string) => notifStore.markAsRead(MOCK_USER_ID, id);

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
    <div className="min-h-[100dvh] bg-surface">
      {/* Container compact, lisible, intégrable ailleurs (max-w-content) */}
      <Container width="content" padding={false} className="px-stack sm:px-stack-lg lg:px-section py-section flex flex-col gap-stack-lg">

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
          className="flex gap-stack-xs flex-wrap"
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
            <SkeletonGroup count={5} template={NotificationRowSkeleton} layout="list" className="gap-stack-xs" />
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
      </Container>
    </div>
  );
};

export default Notifications;
