/**
 * Messages Page — two-pane chat interface
 *
 * Left panel : conversation list with search, filter pills, star toggle, unread badge
 * Right panel: full message thread (role-based bubbles) + compose bar
 * Design system TLS: no Tailwind, no framer-motion, CSS tokens only
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/core/Button';
import {
  MessageSquare,
  Search,
  Send,
  Star,
  Clock3,
  CheckCheck,
  Paperclip,
  File,
  Image as ImageIcon,
  Pencil,
  ArrowLeft,
  MessageSquarePlus,
} from 'lucide-react';
import '../styles/static-pages.css';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type FilterType = 'all' | 'coach' | 'support' | 'starred';
type MessageRole = 'user' | 'coach' | 'support';
type ContextType = 'lesson' | 'project' | 'coaching' | 'general';

interface Attachment {
  type: 'image' | 'file';
  name: string;
  size?: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: Attachment[];
}

interface Conversation {
  id: string;
  participantName: string;
  participantInitials: string;
  participantRole: 'coach' | 'support' | 'admin';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isStarred: boolean;
  context?: { type: ContextType; title?: string };
  messages: Message[];
}

/* ─── Static data ────────────────────────────────────────────────────────── */
const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    participantName: 'Sophie Martin',
    participantInitials: 'SM',
    participantRole: 'coach',
    lastMessage: "Excellent travail sur votre projet final ! J'ai quelques suggestions…",
    lastMessageTime: 'Il y a 5 min',
    unreadCount: 2,
    isStarred: true,
    context: { type: 'project', title: 'Projet Final — Chatbot IA' },
    messages: [
      {
        id: 'm1', senderId: 'coach1', senderName: 'Sophie Martin', role: 'coach',
        content: "Bonjour ! J'ai examiné votre projet final sur le chatbot IA. C'est un excellent travail ! 🎉",
        timestamp: "Aujourd'hui à 14:30", isRead: true,
      },
      {
        id: 'm2', senderId: 'user', senderName: 'Vous', role: 'user',
        content: "Merci beaucoup ! J'ai passé beaucoup de temps sur l'architecture conversationnelle.",
        timestamp: "Aujourd'hui à 14:32", isRead: true,
      },
      {
        id: 'm3', senderId: 'coach1', senderName: 'Sophie Martin', role: 'coach',
        content: "Excellent travail ! J'ai quelques suggestions pour améliorer la gestion du contexte dans les conversations longues. Souhaitez-vous qu'on en discute lors de notre prochain coaching ?",
        timestamp: "Aujourd'hui à 14:50", isRead: false,
        attachments: [{ type: 'file', name: 'Feedback_Projet_Final.pdf', size: '245 KB' }],
      },
      {
        id: 'm4', senderId: 'coach1', senderName: 'Sophie Martin', role: 'coach',
        content: "Voici également quelques ressources complémentaires sur les modèles de langage avancés.",
        timestamp: "Aujourd'hui à 14:51", isRead: false,
      },
    ],
  },
  {
    id: '2',
    participantName: 'Marc Dubois',
    participantInitials: 'MD',
    participantRole: 'coach',
    lastMessage: 'La correction de votre exercice sur les prompts est disponible',
    lastMessageTime: 'Il y a 2h',
    unreadCount: 1,
    isStarred: false,
    context: { type: 'lesson', title: 'Leçon 3 — Prompt Engineering Avancé' },
    messages: [
      {
        id: 'm5', senderId: 'coach2', senderName: 'Marc Dubois', role: 'coach',
        content: "Bonjour ! La correction de votre exercice sur les prompts est maintenant disponible. Vous avez obtenu 18/20 — très bon travail !",
        timestamp: "Aujourd'hui à 13:15", isRead: false,
      },
    ],
  },
  {
    id: '3',
    participantName: 'Support TLS',
    participantInitials: 'ST',
    participantRole: 'support',
    lastMessage: 'Votre problème de connexion a été résolu',
    lastMessageTime: 'Hier',
    unreadCount: 0,
    isStarred: false,
    messages: [
      {
        id: 'm6', senderId: 'support1', senderName: 'Support TLS', role: 'support',
        content: "Bonjour, votre problème de connexion a été résolu. N'hésitez pas si vous avez d'autres questions !",
        timestamp: 'Hier à 16:45', isRead: true,
      },
    ],
  },
  {
    id: '4',
    participantName: 'Coach Alice',
    participantInitials: 'CA',
    participantRole: 'coach',
    lastMessage: 'Peux-tu préparer 3 situations concrètes pour notre prochain RDV ?',
    lastMessageTime: 'Il y a 12 min',
    unreadCount: 1,
    isStarred: false,
    context: { type: 'coaching', title: 'Préparation session leadership' },
    messages: [
      {
        id: 'm7', senderId: 'coach3', senderName: 'Coach Alice', role: 'coach',
        content: "Bonjour ! Pour notre prochaine session, peux-tu préparer 3 situations concrètes de leadership que tu as vécues récemment ? On les analysera ensemble avec le modèle STAR.",
        timestamp: "Aujourd'hui à 09:48", isRead: false,
      },
    ],
  },
];

/* ─── Helper ─────────────────────────────────────────────────────────────── */
function getAvatarColors(role: 'coach' | 'support' | 'admin'): { bg: string; color: string } {
  if (role === 'coach') return { bg: 'var(--tls-primary-50)',    color: 'var(--tls-primary-700)' };
  if (role === 'support') return { bg: 'rgba(74,140,110,0.12)',  color: 'var(--tls-success-fg)' };
  return { bg: 'rgba(248,176,68,0.14)', color: 'var(--tls-yellow-700)' };
}

const CONTEXT_ICONS: Record<ContextType, string> = {
  lesson: '📚', project: '🗂️', coaching: '🎯', general: '💬',
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export const Messages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string | null>('1');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter((conv) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      conv.participantName.toLowerCase().includes(q) ||
      conv.lastMessage.toLowerCase().includes(q);
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'starred' && conv.isStarred) ||
      (filterType === 'coach' && conv.participantRole === 'coach') ||
      (filterType === 'support' && conv.participantRole === 'support');
    return matchesSearch && matchesFilter;
  });

  const currentConversation = conversations.find((c) => c.id === selectedId) ?? null;

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    // mark as read
    setConversations((prev) => prev.map((c) =>
      c.id === id ? { ...c, unreadCount: 0 } : c,
    ));
  };

  const handleToggleStar = (e: React.MouseEvent, convId: string) => {
    e.stopPropagation();
    setConversations((prev) => prev.map((c) =>
      c.id === convId ? { ...c, isStarred: !c.isStarred } : c,
    ));
  };

  const handleSend = () => {
    if (!messageInput.trim() || !selectedId) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: 'user',
      senderName: 'Vous',
      role: 'user',
      content: messageInput.trim(),
      timestamp: "À l'instant",
      isRead: true,
    };
    setConversations((prev) => prev.map((c) =>
      c.id === selectedId
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: messageInput.trim(), lastMessageTime: "À l'instant" }
        : c,
    ));
    setMessageInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      background: 'var(--bg)',
      fontFamily: 'var(--font-body)',
      overflow: 'hidden',
    }} className="messages-container">

      {/* ─── Left Panel: Conversation list ─────────────────────────────── */}
      <div style={{
        width: 360,
        minWidth: 280,
        flexShrink: 0,
        display: selectedId ? undefined : 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border)',
        background: 'var(--surface)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: 'var(--s-5) var(--s-5) var(--s-4)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--s-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
              <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 800, color: 'var(--text)', margin: 0, letterSpacing: '-0.02em' }}>
                Messages
              </h2>
              {totalUnread > 0 && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: 20, height: 20, borderRadius: 'var(--r-pill)',
                  background: 'var(--tls-primary-500)', color: 'var(--text-inverse)',
                  fontSize: '11px', fontWeight: 700, padding: '0 6px',
                }}>
                  {totalUnread}
                </span>
              )}
            </div>
            <button style={{
              width: 34, height: 34, borderRadius: 'var(--r-lg)',
              background: 'var(--tls-primary-500)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-inverse)', transition: 'all var(--dur-2)',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-primary-600)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-primary-500)'; }}
              title="Nouveau message"
            >
              <MessageSquarePlus size={16} />
            </button>
          </div>

          {/* Search bar */}
          <label style={{
            display: 'flex', alignItems: 'center', gap: 'var(--s-2)',
            padding: 'var(--s-2) var(--s-3)',
            borderRadius: 'var(--r-lg)',
            border: '1.5px solid var(--border)',
            background: 'var(--surface-muted)',
            marginBottom: 'var(--s-3)',
            transition: 'border-color var(--dur-1)',
          }}
            onFocusCapture={(e) => { (e.currentTarget as HTMLLabelElement).style.borderColor = 'var(--tls-primary-400)'; (e.currentTarget as HTMLLabelElement).style.background = 'var(--surface)'; }}
            onBlurCapture={(e) => { (e.currentTarget as HTMLLabelElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLLabelElement).style.background = 'var(--surface-muted)'; }}
          >
            <Search size={14} color="var(--text-muted)" />
            <input
              type="search"
              placeholder="Rechercher une conversation…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1, border: 'none', background: 'transparent', outline: 'none',
                fontSize: 'var(--t-body-sm)', color: 'var(--text)', fontFamily: 'inherit',
              }}
            />
          </label>

          {/* Filter pills */}
          <div role="tablist" style={{ display: 'flex', gap: 'var(--s-2)' }}>
            {([
              { id: 'all',     label: 'Tous' },
              { id: 'coach',   label: 'Coach' },
              { id: 'support', label: 'Support' },
              { id: 'starred', label: '⭐ Favoris' },
            ] as { id: FilterType; label: string }[]).map(({ id, label }) => {
              const active = filterType === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilterType(id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--r-pill)',
                    border: active ? 'none' : '1px solid var(--border)',
                    background: active ? 'var(--tls-primary-500)' : 'transparent',
                    color: active ? 'var(--text-inverse)' : 'var(--text-muted)',
                    fontSize: 'var(--t-micro)', fontWeight: active ? 700 : 500,
                    cursor: 'pointer', transition: 'all var(--dur-1)',
                    fontFamily: 'inherit',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--s-2)' }}>
          {filteredConversations.length === 0 ? (
            <div style={{ padding: 'var(--s-8)', textAlign: 'center', color: 'var(--text-muted)' }}>
              <MessageSquare size={28} style={{ opacity: 0.3, marginBottom: 'var(--s-2)' }} />
              <p style={{ margin: 0, fontSize: 'var(--t-caption)' }}>Aucune conversation trouvée</p>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = conv.id === selectedId;
              const { bg, color } = getAvatarColors(conv.participantRole);
              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => handleSelectConversation(conv.id)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 'var(--s-3)',
                    width: '100%', padding: 'var(--s-3)',
                    borderRadius: 'var(--r-xl)',
                    border: 'none', textAlign: 'left', cursor: 'pointer',
                    background: isSelected ? 'var(--tls-primary-50)' : 'transparent',
                    borderLeft: isSelected ? `3px solid var(--tls-primary-500)` : '3px solid transparent',
                    marginBottom: '2px', transition: 'all var(--dur-1)',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)'; }}
                  onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: bg, color,
                    border: `1.5px solid ${conv.participantRole === 'coach' ? 'var(--tls-primary-200)' : 'transparent'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 800, flexShrink: 0,
                  }}>
                    {conv.participantInitials}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', marginBottom: '2px' }}>
                      <span style={{
                        fontSize: 'var(--t-body-sm)', fontWeight: conv.unreadCount > 0 ? 700 : 600,
                        color: 'var(--text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {conv.participantName}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleToggleStar(e, conv.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}
                      >
                        <Star
                          size={13}
                          style={{
                            color: conv.isStarred ? 'var(--tls-yellow-500)' : 'var(--text-muted)',
                            fill: conv.isStarred ? 'var(--tls-yellow-500)' : 'none',
                          }}
                        />
                      </button>
                      {conv.unreadCount > 0 && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          minWidth: 18, height: 18, borderRadius: 'var(--r-pill)',
                          background: 'var(--tls-primary-500)', color: 'var(--text-inverse)',
                          fontSize: '10px', fontWeight: 700, padding: '0 5px', flexShrink: 0,
                        }}>
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>

                    {/* Context tag */}
                    {conv.context && (
                      <p style={{ margin: '0 0 2px', fontSize: '11px', color: 'var(--tls-primary-600)', fontWeight: 600 }}>
                        {CONTEXT_ICONS[conv.context.type]} {conv.context.title}
                      </p>
                    )}

                    <p style={{
                      margin: '0 0 2px', fontSize: 'var(--t-caption)',
                      color: conv.unreadCount > 0 ? 'var(--text)' : 'var(--text-muted)',
                      fontWeight: conv.unreadCount > 0 ? 600 : 400,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {conv.lastMessage}
                    </p>
                    <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock3 size={10} /> {conv.lastMessageTime}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ─── Right Panel: Message thread ───────────────────────────────── */}
      {currentConversation ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Thread header */}
          <div style={{
            padding: 'var(--s-4) var(--s-5)',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface)',
            display: 'flex', alignItems: 'center', gap: 'var(--s-3)',
          }}>
            {/* Mobile back */}
            <button
              onClick={() => setSelectedId(null)}
              style={{
                width: 32, height: 32, borderRadius: 'var(--r-lg)',
                background: 'var(--surface-muted)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-muted)', flexShrink: 0,
              }}
            >
              <ArrowLeft size={15} />
            </button>

            {/* Avatar */}
            {(() => {
              const { bg, color } = getAvatarColors(currentConversation.participantRole);
              return (
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: bg, color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 800, flexShrink: 0,
                }}>
                  {currentConversation.participantInitials}
                </div>
              );
            })()}

            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--text)' }}>
                {currentConversation.participantName}
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>
                {currentConversation.participantRole === 'coach' ? '🎓 Coach IA' : '💬 Support'}
              </p>
            </div>

            {/* Context tag in header */}
            {currentConversation.context && (
              <div style={{
                padding: '4px 10px',
                borderRadius: 'var(--r-pill)',
                background: 'var(--tls-primary-50)',
                border: '1px solid var(--tls-primary-100)',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 'var(--t-micro)', color: 'var(--tls-primary-700)', fontWeight: 600 }}>
                  {currentConversation.context && CONTEXT_ICONS[currentConversation.context.type]} {currentConversation.context.title}
                </span>
              </div>
            )}
          </div>

          {/* Messages area */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: 'var(--s-6)',
            background: 'var(--surface-muted)',
            display: 'flex', flexDirection: 'column', gap: 'var(--s-3)',
          }}>
            {currentConversation.messages.map((msg) => {
              const isUser = msg.role === 'user';
              const { bg, color } = getAvatarColors(msg.role === 'coach' ? 'coach' : 'support');
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex', alignItems: 'flex-end', gap: 'var(--s-2)',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                  }}
                >
                  {/* Coach/Support avatar */}
                  {!isUser && (
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: bg, color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: 800, flexShrink: 0,
                    }}>
                      {currentConversation.participantInitials}
                    </div>
                  )}

                  <div style={{ maxWidth: '68%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                    {!isUser && (
                      <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', fontWeight: 600, paddingLeft: 4 }}>
                        {msg.senderName}
                      </span>
                    )}

                    {/* Bubble */}
                    <div style={{
                      padding: 'var(--s-3) var(--s-4)',
                      borderRadius: 'var(--r-xl)',
                      borderBottomRightRadius: isUser ? '4px' : 'var(--r-xl)',
                      borderBottomLeftRadius: isUser ? 'var(--r-xl)' : '4px',
                      background: isUser ? 'var(--tls-primary-500)' : 'var(--surface)',
                      color: isUser ? 'var(--text-inverse)' : 'var(--text)',
                      boxShadow: isUser ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                      border: isUser ? 'none' : '1px solid var(--border)',
                    }}>
                      <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', lineHeight: 1.55 }}>
                        {msg.content}
                      </p>

                      {/* Attachments */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div style={{ marginTop: 'var(--s-2)', display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
                          {msg.attachments.map((att, i) => (
                            <div
                              key={i}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 'var(--s-2)',
                                padding: 'var(--s-2) var(--s-3)',
                                borderRadius: 'var(--r-lg)',
                                background: isUser ? 'rgba(255,255,255,0.18)' : 'var(--surface-muted)',
                              }}
                            >
                              <div style={{
                                width: 30, height: 30, borderRadius: 'var(--r-md)',
                                background: isUser ? 'rgba(255,255,255,0.25)' : 'var(--tls-primary-50)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                              }}>
                                {att.type === 'image'
                                  ? <ImageIcon size={14} style={{ color: isUser ? 'var(--text-inverse)' : 'var(--tls-primary-500)' }} />
                                  : <File size={14} style={{ color: isUser ? 'var(--text-inverse)' : 'var(--tls-primary-500)' }} />
                                }
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: isUser ? 'var(--text-inverse)' : 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {att.name}
                                </p>
                                {att.size && (
                                  <p style={{ margin: 0, fontSize: '10px', color: isUser ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)' }}>
                                    {att.size}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Timestamp + read check */}
                    <span style={{
                      fontSize: 'var(--t-micro)', color: 'var(--text-muted)',
                      display: 'flex', alignItems: 'center', gap: 4, paddingInline: 4,
                    }}>
                      {msg.timestamp}
                      {isUser && (
                        <CheckCheck size={11} style={{ color: 'var(--tls-primary-400)' }} />
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Compose bar */}
          <div style={{
            padding: 'var(--s-4) var(--s-5)',
            borderTop: '1px solid var(--border)',
            background: 'var(--surface)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--s-2)' }}>
              <button
                style={{
                  width: 36, height: 36, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)',
                  background: 'var(--surface-muted)', cursor: 'pointer', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', transition: 'all var(--dur-1)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--border)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)'; }}
                title="Pièce jointe"
              >
                <Paperclip size={15} />
              </button>

              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez votre message… (Entrée pour envoyer)"
                rows={1}
                style={{
                  flex: 1,
                  padding: 'var(--s-2) var(--s-3)',
                  borderRadius: 'var(--r-lg)',
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface-muted)',
                  color: 'var(--text)',
                  fontSize: 'var(--t-body-sm)', lineHeight: 1.55,
                  fontFamily: 'inherit',
                  resize: 'none', outline: 'none',
                  minHeight: 38, maxHeight: 120,
                  transition: 'border-color var(--dur-1)',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--tls-primary-400)'; e.currentTarget.style.background = 'var(--surface)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-muted)'; }}
              />

              <button
                onClick={handleSend}
                disabled={!messageInput.trim()}
                style={{
                  width: 36, height: 36, borderRadius: 'var(--r-lg)', border: 'none',
                  background: messageInput.trim() ? 'var(--tls-primary-500)' : 'var(--border)',
                  cursor: messageInput.trim() ? 'pointer' : 'not-allowed',
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: messageInput.trim() ? 'var(--text-inverse)' : 'var(--text-muted)',
                  transition: 'all var(--dur-1)',
                }}
                onMouseEnter={(e) => { if (messageInput.trim()) (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-primary-600)'; }}
                onMouseLeave={(e) => { if (messageInput.trim()) (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-primary-500)'; }}
                title="Envoyer (Entrée)"
              >
                <Send size={15} />
              </button>
            </div>

            <p style={{ margin: 'var(--s-2) 0 0', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
              <kbd style={{ padding: '1px 5px', borderRadius: 'var(--r-xs)', background: 'var(--surface-muted)', border: '1px solid var(--border)', fontSize: '10px' }}>Entrée</kbd> pour envoyer &nbsp;·&nbsp;
              <kbd style={{ padding: '1px 5px', borderRadius: 'var(--r-xs)', background: 'var(--surface-muted)', border: '1px solid var(--border)', fontSize: '10px' }}>Shift+Entrée</kbd> pour un saut de ligne
            </p>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--surface-muted)',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 320 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'var(--tls-primary-50)',
              border: '1.5px solid var(--tls-primary-100)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--s-4)',
              color: 'var(--tls-primary-400)',
            }}>
              <MessageSquarePlus size={30} />
            </div>
            <h3 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
              Sélectionnez une conversation
            </h3>
            <p style={{ margin: '0 0 var(--s-4)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Choisissez un fil dans la liste pour démarrer ou continuer la conversation.
            </p>
            <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <Pencil size={14} /> Nouveau message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
