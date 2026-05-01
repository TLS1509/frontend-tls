import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCheck,
  Clock3,
  MessageSquare,
  Settings2,
  Sparkles,
  Trophy,
} from 'lucide-react';
import '../styles/static-pages.css';

type NotifType = 'info' | 'warm' | 'success';

interface Notif {
  id: string;
  title: string;
  body: string;
  type: NotifType;
  time: string;
  read: boolean;
}

const NOTIF_STYLE: Record<NotifType, { accent: string; bg: string; border: string; icon: React.ReactNode }> = {
  info: {
    accent: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    border: 'rgba(85, 161, 180, 0.25)',
    icon: <BookOpen size={16} />,
  },
  warm: {
    accent: 'var(--tls-orange-600)',
    bg: 'rgba(237,132,58,0.08)',
    border: 'rgba(237,132,58,0.28)',
    icon: <CalendarDays size={16} />,
  },
  success: {
    accent: 'var(--tls-success-fg)',
    bg: 'rgba(74, 140, 110, 0.08)',
    border: 'rgba(74, 140, 110, 0.25)',
    icon: <Trophy size={16} />,
  },
};

const INITIAL: Notif[] = [
  { id: 'n1', title: 'Nouveau module disponible', body: 'Le parcours Leadership contient 2 nouvelles leçons.', type: 'info',    time: 'il y a 2h',  read: false },
  { id: 'n2', title: 'Rappel coaching',           body: 'Votre session est planifiée demain à 14h.',           type: 'warm',    time: 'il y a 5h',  read: false },
  { id: 'n3', title: 'Objectif atteint 🎉',        body: 'Vous avez complété 5 jours consécutifs d\'apprentissage.', type: 'success', time: 'il y a 1j', read: true  },
];

type Filter = 'all' | 'formations' | 'messages' | 'coaching';

const FILTERS: { id: Filter; label: string; icon: React.ReactNode }[] = [
  { id: 'all',        label: 'Toutes',     icon: <Sparkles size={13} /> },
  { id: 'formations', label: 'Formations', icon: <BookOpen size={13} /> },
  { id: 'messages',   label: 'Messages',   icon: <MessageSquare size={13} /> },
  { id: 'coaching',   label: 'Coaching',   icon: <CalendarDays size={13} /> },
];

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('all');
  const [items, setItems] = useState<Notif[]>(INITIAL);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="tls-page">
      {/* Hero */}
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Bell size={12} /> Centre de notifications</span>
        <h1>Notifications</h1>
        <p className="tls-editorial-summary">
          Retrouvez les événements importants de votre activité d'apprentissage.
          {unread > 0 && (
            <span style={{ marginLeft: 'var(--s-2)', display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)', padding: '2px 10px', borderRadius: 'var(--r-pill)', background: 'var(--tls-primary-600)', color: '#fff', fontSize: 'var(--t-micro)', fontWeight: 700 }}>
              {unread} non lu{unread > 1 ? 'es' : 'e'}
            </span>
          )}
        </p>
      </section>

      {/* Toolbar: action + filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
        <Button size="sm" variant="secondary" onClick={markAllRead}>
          <CheckCheck size={14} /> Tout marquer comme lu
        </Button>
        <div role="tablist" aria-label="Filtrer par catégorie" style={{ display: 'flex', gap: 'var(--s-2)' }}>
          {FILTERS.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={filter === id}
              onClick={() => setFilter(id)}
              className={`tls-filter-pill${filter === id ? ' tls-filter-pill--active' : ''}`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification cards */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
        {items.map((item) => {
          const s = NOTIF_STYLE[item.type];
          return (
            <div
              key={item.id}
              className="tls-notification-card"
              style={{
                padding: 'var(--s-5)',
                borderLeft: `4px solid ${s.accent}`,
                opacity: item.read ? 0.75 : 1,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--s-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--r-lg)',
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: s.accent,
                      flexShrink: 0,
                    }}>
                      {s.icon}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                        {item.title}
                        {!item.read && (
                          <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.accent, flexShrink: 0, display: 'inline-block' }} />
                        )}
                      </h3>
                      <p style={{ margin: '2px 0 0', fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--s-2)', borderTop: '1px solid var(--border)' }}>
                  <span className="tls-micro">
                    <Clock3 size={12} /> {item.time}
                  </span>
                  <div style={{ display: 'inline-flex', gap: 'var(--s-2)' }}>
                    {!item.read && (
                      <Button size="sm" variant="secondary" onClick={() => markRead(item.id)}>
                        <Bell size={13} /> Marquer comme lue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick settings CTA */}
      <div style={{
        borderRadius: 'var(--r-2xl)',
        border: '1px solid var(--border)',
        background: 'linear-gradient(135deg, var(--tls-primary-50) 0%, var(--surface) 100%)',
        padding: 'var(--s-6)',
        boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.9)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--s-4)',
        flexWrap: 'wrap',
      }}>
        <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', flexShrink: 0 }}>
          <Settings2 size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h3 style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)' }}>
            Paramètres de notifications
          </h3>
          <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
            Ajustez vos canaux et fréquences pour réduire le bruit.
          </p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/settings')}>
          Configurer
        </Button>
      </div>
    </div>
  );
};
