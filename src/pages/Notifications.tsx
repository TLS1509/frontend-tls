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
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { MetaPill } from '../components/ui/MetaPill';
import { NotificationCard } from '../components/cards/NotificationCard';
import type { NotificationTone } from '../components/cards/NotificationCard';
import {
  SkeletonGroup,
  NotificationRowSkeleton,
} from '../components/patterns/SkeletonTemplates';
import { useNotificationsStore, useFilterPrefsStore, useInAppNotificationsStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { NotificationEventType } from '../types/learning';
import { PageShell } from '../components/layout';
import {
  Bell,
  BellDot,
  BookOpen,
  CalendarDays,
  CheckCheck,
  ChevronDown,
  FileText,
  MessageSquare,
  Award,
  CheckCircle2,
  Trophy,
  Settings2,
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
  correction:  { tone: 'success', icon: <FileText size={14} />,     label: 'Correction' },
  achievement: { tone: 'sun',     icon: <Award size={14} />,        label: 'Badge' },
  lesson:      { tone: 'brand',   icon: <BookOpen size={14} />,     label: 'Leçon' },
  completion:  { tone: 'success', icon: <CheckCircle2 size={14} />, label: 'Terminé' },
  report:      { tone: 'warm',    icon: <FileText size={14} />,     label: 'Rapport' },
  coaching:    { tone: 'warm',    icon: <CalendarDays size={14} />, label: 'Coaching' },
  message:     { tone: 'brand',   icon: <MessageSquare size={14} />,label: 'Message' },
  system:      { tone: 'neutral', icon: <Bell size={14} />,         label: 'Système' },
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
  { id: 'all',      label: 'Toutes',     icon: <Bell size={14} /> },
  { id: 'unread',   label: 'Non lues',   icon: <BellDot size={14} /> },
  { id: 'messages', label: 'Messages',   icon: <MessageSquare size={14} /> },
  { id: 'lessons',  label: 'Formations', icon: <BookOpen size={14} /> },
  { id: 'coaching', label: 'Coaching',   icon: <CalendarDays size={14} /> },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
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
    /* 32 entre l'en-tête et le contenu (la fourchette de la doctrine : 32 à
       48) ; il était à 24. */
    <PageShell width="content" gap="section">

        {/* ── Header épuré ─────────────────────────────────────────────
            Le titre de la page au pas d'un h1 (36) : il était à 20, le pas
            d'un titre de carte, à côté d'une pastille d'icône décorative. Le
            compte est une méta (13, ink-600 ; ink-500 avant), à 12 du titre. */}
        <header className="flex flex-wrap items-start justify-between gap-stack">
          <div className="flex flex-col gap-stack-sm min-w-0">
            <h1 className="font-display text-h1 text-ink-900">
              Notifications
            </h1>
            <p className="font-body text-caption text-ink-600 tabular-nums">
              {unread > 0
                ? `${unread} non lue${unread > 1 ? 's' : ''} · ${items.length} au total`
                : `${items.length} notification${items.length > 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Un fil qu'on lit : pas d'aplat (arbitrage n°19). « Tout marquer
              comme lu » et les préférences sont des outils, `ghost` neutre. */}
          <div className="flex items-center gap-stack-xs pt-1">
            {unread > 0 && (
              <Button
                size="sm"
                emphasis="ghost"
                tone="neutral"
                leadingIcon={<CheckCheck size={14} />}
                onClick={markAllRead}
              >
                Tout marquer comme lu
              </Button>
            )}
            {/* L'icône est le contenu d'un bouton à icône seule : passée en
                `leadingIcon`, elle se décalait et le cercle paraissait coupé. */}
            <Button
              size="sm"
              emphasis="ghost"
              tone="neutral"
              iconOnly
              aria-label="Préférences de notifications"
              onClick={() => navigate('/notifications/preferences')}
            >
              <Settings2 size={16} />
            </Button>
          </div>
        </header>

        {/* Filtres et liste forment un ensemble : 16 entre eux. */}
        <div className="flex flex-col gap-stack">
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
                  ? 'Tu es à jour.'
                  : 'Aucune notification dans cette catégorie pour le moment.'
              }
            />
          ) : (
            // Une collection de notifications se lit en rangées dans UNE carte
            // (arbitrage n°5 du 23/09) : la carte porte le coin et le clippe,
            // les rangées n'ont que leur séparateur.
            <Card className="p-0 overflow-hidden">
            <ul className="flex flex-col divide-y divide-ink-100">
              {displayed.map((item) => {
                const cfg = TYPE_CONFIG[item.type];

                // Build meta inline (grade or badge name → tiny chip)
                // Une note ou un badge sont des données : MetaPill (les
                // pastilles faites main étaient en 13/600) ; le type, une
                // légende ink-600 (ink-500 avant).
                const meta =
                  item.grade ? (
                    <MetaPill icon={<Trophy />} text={String(item.grade)} tone="neutral" />
                  ) : item.badgeName ? (
                    <MetaPill icon={<Award />} text={item.badgeName} tone="sun" />
                  ) : (
                    <span className="text-ink-600">{cfg.label}</span>
                  );

                return (
                  <li key={item.id}>
                  <NotificationCard
                    variant="row"
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
                  </li>
                );
              })}
            </ul>
            </Card>
          )}

          {/* Sur le bord gauche de la liste qu'il prolonge (il était centré). */}
          {hasMore && (
            <div className="pt-stack flex">
              {/* Charger plus est un outil de la liste, comme une pagination :
                  `ghost` neutre (l'orange y disait « secondaire »). */}
              <Button
                emphasis="ghost" tone="neutral"
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
    </PageShell>
  );
};

export default Notifications;
