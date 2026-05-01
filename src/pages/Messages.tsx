import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import {
  MessageSquare,
  Search,
  Send,
  Sparkles,
  Clock3,
  Pencil,
  CheckCheck,
  Users,
  LifeBuoy,
} from 'lucide-react';
import '../styles/static-pages.css';

type ThreadCategory = 'all' | 'coaching' | 'equipe' | 'support';

interface Thread {
  id: string;
  from: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  category: Exclude<ThreadCategory, 'all'>;
}

const THREADS: Thread[] = [
  {
    id: 'm1',
    from: 'Coach Alice',
    initials: 'CA',
    avatarBg: 'var(--tls-primary-50)',
    avatarColor: 'var(--tls-primary-700)',
    subject: 'Préparation session leadership',
    preview: 'Peux-tu préparer 3 situations concrètes pour notre prochain RDV ?',
    time: 'il y a 12 min',
    unread: true,
    category: 'coaching',
  },
  {
    id: 'm2',
    from: 'Équipe Product',
    initials: 'EP',
    avatarBg: 'rgba(237,132,58,0.12)',
    avatarColor: 'var(--tls-orange-700)',
    subject: 'Retours parcours module 2',
    preview: 'Merci pour le feedback — nous avons intégré tes suggestions.',
    time: 'il y a 2h',
    unread: true,
    category: 'equipe',
  },
  {
    id: 'm3',
    from: 'Support TLS',
    initials: 'ST',
    avatarBg: 'rgba(74,140,110,0.1)',
    avatarColor: 'var(--tls-success-fg)',
    subject: 'Configuration profil complète',
    preview: 'Votre profil est maintenant finalisé. Bonne continuation !',
    time: 'hier',
    unread: false,
    category: 'support',
  },
];

const FILTERS: { id: ThreadCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'all',      label: 'Tous',     icon: <Sparkles size={13} /> },
  { id: 'coaching', label: 'Coaching', icon: <MessageSquare size={13} /> },
  { id: 'equipe',   label: 'Équipe',   icon: <Users size={13} /> },
  { id: 'support',  label: 'Support',  icon: <LifeBuoy size={13} /> },
];

export const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<ThreadCategory>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const visible = THREADS.filter((t) => {
    if (filter !== 'all' && t.category !== filter) return false;
    if (query && !t.subject.toLowerCase().includes(query.toLowerCase()) && !t.from.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const selectedThread = THREADS.find((t) => t.id === selected) ?? null;
  const unreadCount = THREADS.filter((t) => t.unread).length;

  return (
    <div className="tls-page">
      {/* Hero */}
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><MessageSquare size={12} /> Messagerie</span>
        <h1>Messages</h1>
        <p className="tls-editorial-summary">
          Vos conversations coaching, équipe et support réunies en un seul espace.
          {unreadCount > 0 && (
            <span style={{ marginLeft: 'var(--s-2)', display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)', padding: '2px 10px', borderRadius: 'var(--r-pill)', background: 'var(--tls-primary-600)', color: '#fff', fontSize: 'var(--t-micro)', fontWeight: 700 }}>
              {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
            </span>
          )}
        </p>
      </section>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
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
        <Button size="sm" variant="secondary" style={{ marginLeft: 'auto' }}>
          <Pencil size={13} /> Nouveau message
        </Button>
      </div>

      {/* Two-column layout */}
      <section className="tls-content-layout">
        {/* Thread list */}
        <div className="tls-content-main">
          <Card className="tls-section-card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Search */}
            <div style={{ padding: 'var(--s-4) var(--s-4) 0' }}>
              <label className="tls-journal-search">
                <Search size={14} />
                <input
                  type="search"
                  placeholder="Rechercher une conversation…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>

            {/* Threads */}
            <div style={{ padding: 'var(--s-3)' }}>
              {visible.length === 0 ? (
                <div style={{ padding: 'var(--s-8)', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <MessageSquare size={28} style={{ opacity: 0.3, marginBottom: 'var(--s-2)' }} />
                  <p style={{ margin: 0, fontSize: 'var(--t-caption)' }}>Aucune conversation trouvée</p>
                </div>
              ) : (
                visible.map((thread) => (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setSelected(thread.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--s-3)',
                      width: '100%',
                      padding: 'var(--s-3) var(--s-3)',
                      borderRadius: 'var(--r-xl)',
                      border: 'none',
                      background: selected === thread.id ? 'var(--tls-primary-50)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background var(--dur-1)',
                      marginBottom: 'var(--s-1)',
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: thread.avatarBg,
                      color: thread.avatarColor,
                      border: `1.5px solid ${thread.avatarBg === 'var(--tls-primary-50)' ? 'rgba(85,161,180,0.25)' : 'transparent'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}>
                      {thread.initials}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--s-2)', marginBottom: 'var(--s-1)' }}>
                        <span style={{ fontSize: 'var(--t-body-sm)', fontWeight: thread.unread ? 700 : 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {thread.from}
                        </span>
                        <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                          <Clock3 size={11} />
                          {thread.time}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-body-sm)', fontWeight: thread.unread ? 700 : 500, color: thread.unread ? 'var(--text)' : 'var(--text-muted)' }}>
                        {thread.subject}
                      </p>
                      <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {thread.preview}
                      </p>
                    </div>

                    {/* Unread dot */}
                    {thread.unread && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tls-primary-500)', flexShrink: 0, marginTop: 'var(--s-1)' }} />
                    )}
                  </button>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Conversation panel */}
        <aside className="tls-content-aside tls-editorial-sticky">
          {selectedThread ? (
            <Card className="tls-section-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', paddingBottom: 'var(--s-4)', borderBottom: '1px solid var(--border)' }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: selectedThread.avatarBg,
                  color: selectedThread.avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 800,
                  flexShrink: 0,
                }}>
                  {selectedThread.initials}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)' }}>
                    {selectedThread.from}
                  </h4>
                  <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                    {selectedThread.subject}
                  </p>
                </div>
              </div>

              {/* Message bubble */}
              <div style={{
                padding: 'var(--s-4)',
                background: 'var(--tls-primary-50)',
                borderRadius: 'var(--r-xl)',
                border: '1px solid rgba(85,161,180,0.15)',
              }}>
                <p style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-body-sm)', color: 'var(--text)', lineHeight: 1.6 }}>
                  {selectedThread.preview}
                </p>
                <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                  <Clock3 size={11} /> {selectedThread.time}
                </span>
              </div>

              {/* Read status */}
              {!selectedThread.unread && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-micro)', color: 'var(--tls-success-fg)' }}>
                  <CheckCheck size={14} /> Lu
                </div>
              )}

              {/* Reply CTA */}
              <Button variant="secondary">
                <Send size={14} /> Répondre
              </Button>
            </Card>
          ) : (
            <Card className="tls-section-card" style={{ textAlign: 'center' }}>
              {/* Empty state */}
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--tls-primary-50)',
                border: '1.5px solid rgba(85,161,180,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--s-4)',
                color: 'var(--tls-primary-400)',
              }}>
                <MessageSquare size={28} />
              </div>
              <h4 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)' }}>
                Conversation active
              </h4>
              <p style={{ margin: '0 0 var(--s-4)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Sélectionnez un fil à gauche pour afficher le détail de la conversation.
              </p>
              <div style={{ padding: 'var(--s-3) var(--s-4)', background: 'var(--tls-primary-50)', border: '1px solid rgba(85,161,180,0.15)', borderRadius: 'var(--r-lg)', textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--tls-primary-700)', lineHeight: 1.5 }}>
                  💡 Regroupez les demandes par sujet pour accélérer les réponses en équipe.
                </p>
              </div>
              <Button
                variant="secondary"
                style={{ marginTop: 'var(--s-4)', width: '100%' }}
                onClick={() => navigate('/collaboration')}
              >
                <Users size={14} /> Espace collaboration
              </Button>
            </Card>
          )}
        </aside>
      </section>
    </div>
  );
};
