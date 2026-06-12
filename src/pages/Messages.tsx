/**
 * Messages Page : two-pane chat interface
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Star,
  Clock3,
  Paperclip,
  File,
  Image as ImageIcon,
  Pencil,
  ArrowLeft,
  MessageSquarePlus,
} from 'lucide-react';
import { MessageBubble } from '../components/ui/MessageBubble';
import { Search as SearchInput } from '../components/ui/Search';
import { FilterBar } from '../components/forms/FilterBar';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/core/Button';
import { EmptyState } from '../components/ui/EmptyState';

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
    context: { type: 'project', title: 'Projet Final : Chatbot IA' },
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
    context: { type: 'lesson', title: 'Leçon 3 : Prompt Engineering Avancé' },
    messages: [
      {
        id: 'm5', senderId: 'coach2', senderName: 'Marc Dubois', role: 'coach',
        content: "Bonjour ! La correction de votre exercice sur les prompts est maintenant disponible. Vous avez obtenu 18/20 : très bon travail !",
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

const AVATAR_CLASSES: Record<'coach' | 'support' | 'admin', string> = {
  coach:   'bg-primary-50 text-primary-700 border border-primary-200',
  support: 'bg-success-bg text-success-fg',
  admin:   'bg-accent-50 text-accent-700',
};

const CONTEXT_ICONS: Record<ContextType, string> = {
  lesson: '📚', project: '🗂️', coaching: '🎯', general: '💬',
};

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'all',     label: 'Tous' },
  { id: 'coach',   label: 'Coach' },
  { id: 'support', label: 'Support' },
  { id: 'starred', label: '⭐ Favoris' },
];

export const Messages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId]       = useState<string | null>('1');
  const [filterType, setFilterType]       = useState<FilterType>('all');
  const [searchQuery, setSearchQuery]     = useState('');
  const [messageInput, setMessageInput]   = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter((conv) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      conv.participantName.toLowerCase().includes(q) ||
      conv.lastMessage.toLowerCase().includes(q);
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'starred' && conv.isStarred) ||
      (filterType === 'coach'   && conv.participantRole === 'coach') ||
      (filterType === 'support' && conv.participantRole === 'support');
    return matchesSearch && matchesFilter;
  });

  const currentConversation = conversations.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, unreadCount: 0 } : c));
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
      senderId: 'user', senderName: 'Vous', role: 'user',
      content: messageInput.trim(),
      timestamp: "À l'instant", isRead: true,
    };
    setConversations((prev) => prev.map((c) =>
      c.id === selectedId
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: messageInput.trim(), lastMessageTime: "À l'instant" }
        : c,
    ));
    setMessageInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="min-h-[100dvh] flex bg-ink-50 font-body overflow-hidden">

      {/* Left Panel: Conversation list */}
      <div className="w-[360px] min-w-[280px] shrink-0 flex flex-col border-r border-ink-200 bg-white overflow-hidden">

        {/* Header */}
        <div className="px-5 pt-5 pb-stack border-b border-ink-200 bg-white">
          <div className="flex items-center justify-between mb-stack">
            <div className="flex items-center gap-stack-xs">
              <h2 className="font-display text-h3 font-extrabold text-ink-900 m-0 tracking-tight">
                Messages
              </h2>
              {totalUnread > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-pill bg-primary-500 text-white font-body text-[11px] font-bold px-1.5">
                  {totalUnread}
                </span>
              )}
            </div>
            <Button variant="primary" size="sm" iconOnly aria-label="Nouveau message">
              <MessageSquarePlus size={16} />
            </Button>
          </div>

          {/* Search bar */}
          <SearchInput
            size="sm"
            variant="filled"
            placeholder="Rechercher une conversation…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            wrapperClassName="mb-3"
          />

          {/* Filter pills */}
          <FilterBar
            size="sm"
            multiSelect={false}
            showClearAll={false}
            options={FILTERS.map(({ id, label }) => ({ id, label }))}
            selected={[filterType]}
            onChange={(ids) => setFilterType((ids[0] as FilterType) ?? 'all')}
          />
        </div>

        {/* Conversation items */}
        <div className="flex-1 overflow-y-auto p-stack-xs">
          {filteredConversations.length === 0 ? (
            <EmptyState
              icon={<MessageSquare size={28} />}
              title="Aucune conversation"
              description={searchQuery ? 'Aucun résultat pour cette recherche.' : 'Aucune conversation dans cette catégorie.'}
            />
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = conv.id === selectedId;
              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => handleSelectConversation(conv.id)}
                  data-selected={isSelected}
                  className={[
                    'flex items-start gap-3 w-full p-3 rounded-xl border-l-[3px] text-left cursor-pointer mb-0.5 transition-all duration-100 font-body',
                    isSelected
                      ? 'bg-primary-50 border-l-primary-500'
                      : 'bg-transparent border-l-transparent hover:bg-ink-50',
                  ].join(' ')}
                >
                  {/* Avatar */}
                  <Avatar
                    name={conv.participantName}
                    initials={conv.participantInitials}
                    size="md"
                    tint={conv.participantRole === 'coach' ? 'brand' : conv.participantRole === 'support' ? 'warm' : 'ink'}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className={`font-body text-body-sm flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-ink-900 ${conv.unreadCount > 0 ? 'font-bold' : 'font-semibold'}`}>
                        {conv.participantName}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleToggleStar(e, conv.id)}
                        className="bg-transparent border-0 cursor-pointer p-0.5 shrink-0"
                      >
                        <Star
                          size={13}
                          className={conv.isStarred ? 'text-accent-400 fill-accent-400' : 'text-ink-300 fill-transparent'}
                        />
                      </button>
                      {conv.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-pill bg-primary-500 text-white font-body text-[10px] font-bold px-1 shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>

                    {conv.context && (
                      <p className="m-0 mb-0.5 font-body text-[11px] text-primary-600 font-semibold">
                        {CONTEXT_ICONS[conv.context.type]} {conv.context.title}
                      </p>
                    )}

                    <p className={`m-0 mb-0.5 font-body text-caption overflow-hidden text-ellipsis whitespace-nowrap ${conv.unreadCount > 0 ? 'text-ink-900 font-semibold' : 'text-ink-500 font-normal'}`}>
                      {conv.lastMessage}
                    </p>
                    <span className="font-body text-micro text-ink-400 flex items-center gap-1">
                      <Clock3 size={10} /> {conv.lastMessageTime}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Panel: Message thread */}
      {currentConversation ? (
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Thread header */}
          <div className="px-5 py-stack border-b border-ink-200 bg-white flex items-center gap-3">
            <Button variant="secondary" size="sm" iconOnly aria-label="Retour" className="shrink-0" onClick={() => setSelectedId(null)}>
              <ArrowLeft size={15} />
            </Button>

            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-extrabold shrink-0 ${AVATAR_CLASSES[currentConversation.participantRole]}`}>
              {currentConversation.participantInitials}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="m-0 font-body text-body-sm font-bold text-ink-900">
                {currentConversation.participantName}
              </h3>
              <p className="m-0 font-body text-micro text-ink-500">
                {currentConversation.participantRole === 'coach' ? '🎓 Coach IA' : '💬 Support'}
              </p>
            </div>

            {currentConversation.context && (
              <div className="px-2.5 py-1 rounded-pill bg-primary-50 border border-primary-100 shrink-0">
                <span className="font-body text-micro text-primary-700 font-semibold">
                  {CONTEXT_ICONS[currentConversation.context.type]} {currentConversation.context.title}
                </span>
              </div>
            )}
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-stack-lg bg-ink-50 flex flex-col gap-3">
            {currentConversation.messages.map((msg) => {
              const isUser = msg.role === 'user';
              const senderTint =
                currentConversation.participantRole === 'coach'
                  ? ('brand' as const)
                  : currentConversation.participantRole === 'support'
                  ? ('warm' as const)
                  : ('sun' as const);
              return (
                <MessageBubble
                  key={msg.id}
                  variant={isUser ? 'user' : 'assistant'}
                  content={msg.content}
                  timestamp={msg.timestamp}
                  context="messaging"
                  senderInitials={!isUser ? currentConversation.participantInitials : undefined}
                  senderTint={!isUser ? senderTint : undefined}
                  senderName={!isUser ? msg.senderName : undefined}
                  showReadReceipt={isUser}
                >
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-stack-xs flex flex-col gap-stack-xs">
                      {msg.attachments.map((att, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-stack-xs px-3 py-stack-xs rounded-lg ${isUser ? 'bg-white/10' : 'bg-ink-50'}`}
                        >
                          <div className={`w-[30px] h-[30px] rounded-md flex items-center justify-center shrink-0 ${isUser ? 'bg-white/20' : 'bg-primary-50'}`}>
                            {att.type === 'image'
                              ? <ImageIcon size={14} className={isUser ? 'text-white' : 'text-primary-500'} />
                              : <File size={14} className={isUser ? 'text-white' : 'text-primary-500'} />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`m-0 font-body text-caption font-semibold overflow-hidden text-ellipsis whitespace-nowrap ${isUser ? 'text-white' : 'text-ink-900'}`}>
                              {att.name}
                            </p>
                            {att.size && (
                              <p className={`m-0 font-body text-micro ${isUser ? 'text-white/70' : 'text-ink-400'}`}>
                                {att.size}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </MessageBubble>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Compose bar */}
          <div className="px-5 py-stack border-t border-ink-200 bg-white">
            <div className="flex items-end gap-stack-xs">
              <Button variant="secondary" size="sm" iconOnly aria-label="Pièce jointe" className="shrink-0">
                <Paperclip size={15} />
              </Button>

              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez votre message… (Entrée pour envoyer)"
                rows={1}
                className="flex-1 px-3 py-stack-xs rounded-lg border border-ink-200 bg-ink-50 text-ink-900 font-body text-body-sm leading-relaxed resize-none outline-none h-auto min-h-[38px] max-h-[120px] transition-colors focus:border-primary-400 focus:bg-white placeholder:text-ink-400"
              />

              <Button
                variant="primary"
                size="sm"
                iconOnly
                aria-label="Envoyer"
                className="shrink-0"
                disabled={!messageInput.trim()}
                onClick={handleSend}
              >
                <Send size={15} />
              </Button>
            </div>

            <p className="m-0 mt-stack-xs font-body text-[11px] text-ink-400 text-center">
              <kbd className="px-1.5 py-px rounded-xs bg-ink-50 border border-ink-200 text-[10px]">Entrée</kbd> pour envoyer &nbsp;·&nbsp;
              <kbd className="px-1.5 py-px rounded-xs bg-ink-50 border border-ink-200 text-[10px]">Shift+Entrée</kbd> pour un saut de ligne
            </p>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="flex-1 flex items-center justify-center bg-ink-50">
          <div className="text-center max-w-xs px-stack-lg">
            <div className="w-[72px] h-[72px] rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center mx-auto mb-stack text-primary-400">
              <MessageSquarePlus size={30} />
            </div>
            <h3 className="m-0 mb-stack-xs font-display text-h4 font-bold text-ink-900">
              Sélectionnez une conversation
            </h3>
            <p className="m-0 mb-stack font-body text-caption text-ink-500 leading-relaxed">
              Choisissez un fil dans la liste pour démarrer ou continuer la conversation.
            </p>
            <Button variant="secondary" fullWidth leadingIcon={<Pencil size={14} />}>
              Nouveau message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
