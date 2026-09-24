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
  BookOpen,
  FolderKanban,
  Target,
  MessageCircle,
} from 'lucide-react';
import { MessageBubble } from '../components/ui/MessageBubble';
import { Search as SearchInput } from '../components/ui/Search';
import { FilterBar } from '../components/forms/FilterBar';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/core/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { MetaPill } from '../components/ui/MetaPill';
import { Kbd } from '../components/ui/Kbd';

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

/* Glyphes Lucide, plus des émojis (un tell listé par la doctrine). */
const CONTEXT_ICONS: Record<ContextType, React.ReactNode> = {
  lesson: <BookOpen size={14} aria-hidden="true" />,
  project: <FolderKanban size={14} aria-hidden="true" />,
  coaching: <Target size={14} aria-hidden="true" />,
  general: <MessageCircle size={14} aria-hidden="true" />,
};

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'all',     label: 'Tous' },
  { id: 'coach',   label: 'Coach' },
  { id: 'support', label: 'Support' },
  { id: 'starred', label: '⭐ Favoris' },
];

export const Messages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  // Sous 768 px, la liste et le fil ne tiennent pas côte à côte (le fil était
  // comprimé à ~15 px, le champ de saisie hors écran) : on affiche l'un OU
  // l'autre, et le mobile s'ouvre sur la liste plutôt que sur un fil.
  const [selectedId, setSelectedId]       = useState<string | null>(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches ? '1' : null,
  );
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
      <div className={`${currentConversation ? 'hidden md:flex' : 'flex'} w-full md:w-[360px] md:min-w-[280px] shrink-0 flex-col md:border-r border-ink-200 bg-white overflow-hidden`}>

        {/* Header */}
        <div className="px-stack-md pt-stack-md pb-stack border-b border-ink-200 bg-white">
          {/* Le titre de la page : un h1 à 36, comme le grand titre d'une
              messagerie. La page n'en avait aucun ; « Messages » était un h2
              à 20, serré par `tracking-tight`. Le compteur est une étiquette
              (11/700). */}
          <div className="flex items-center justify-between mb-stack">
            <div className="flex items-center gap-stack-xs">
              <h1 className="font-display text-h1 text-ink-900">
                Messages
              </h1>
              {totalUnread > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-pill bg-primary-700 text-white font-body text-micro font-bold px-1.5 tabular-nums">
                  {totalUnread}
                </span>
              )}
            </div>
            <Button emphasis="soft" iconOnly aria-label="Nouveau message">
              <MessageSquarePlus size={16} />
            </Button>
          </div>

          {/* Search bar */}
          <SearchInput
            size="sm"
            variant="default"
            placeholder="Rechercher une conversation…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            wrapperClassName="mb-stack-sm"
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
        <div className="flex-1 overflow-y-auto p-stack-xs flex flex-col gap-stack-3xs">
          {filteredConversations.length === 0 ? (
            <EmptyState
              icon={<MessageSquare size={28} />}
              title="Aucune conversation"
              description={searchQuery ? 'Aucun résultat pour cette recherche.' : 'Aucune conversation dans cette catégorie.'}
            />
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = conv.id === selectedId;
              // La rangée n'est plus un <button> englobant : l'étoile y était un
              // <button> imbriqué (HTML invalide, erreur React « cannot be a
              // descendant of <button> », audit du 23/09). Deux boutons frères :
              // la zone nom/aperçu ouvre la conversation, l'étoile bascule le
              // favori. L'étoile est posée en absolu, et le bouton principal lui
              // réserve sa place à droite (`pr-11`).
              return (
                <div
                  key={conv.id}
                  data-selected={isSelected}
                  className={[
                    'relative rounded-lg border transition-all duration-100',
                    isSelected
                      ? 'bg-primary-50 shadow-xs border-primary-200'
                      : 'bg-transparent hover:bg-ink-50 border-transparent',
                  ].join(' ')}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectConversation(conv.id)}
                    aria-current={isSelected ? 'true' : undefined}
                    className="flex items-start gap-stack-sm w-full p-stack-sm pr-11 rounded-lg bg-transparent border-0 text-left cursor-pointer font-body focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    {/* Avatar */}
                    <Avatar
                      name={conv.participantName}
                      initials={conv.participantInitials}
                      size="md"
                      tint={conv.participantRole === 'coach' ? 'brand' : conv.participantRole === 'support' ? 'warm' : 'ink'}
                    />

                    {/* Content — nom (16/600 ; 700 est le poids des titres,
                        le compteur dit déjà « non lu ») → contexte → aperçu →
                        heure, à 4 d'écart. Le contexte et l'heure passent de
                        11 px à la légende 13 ; l'aperçu lu, d'ink-500 (la
                        couleur des placeholders) à ink-600. */}
                    <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                      <div className="flex items-center gap-stack-xs">
                        <span className="font-body text-body font-semibold flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-ink-900">
                          {conv.participantName}
                        </span>
                        {conv.unreadCount > 0 && (
                          <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-pill bg-primary-700 text-white font-body text-micro font-bold px-1 shrink-0 tabular-nums">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>

                      {conv.context && (
                        <p className="flex items-center gap-stack-3xs font-body text-caption text-primary-800 font-semibold">
                          {CONTEXT_ICONS[conv.context.type]}
                          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{conv.context.title}</span>
                        </p>
                      )}

                      <p className={`font-body text-caption overflow-hidden text-ellipsis whitespace-nowrap ${conv.unreadCount > 0 ? 'text-ink-900 font-semibold' : 'text-ink-600'}`}>
                        {conv.lastMessage}
                      </p>
                      <span className="font-body text-caption text-ink-600 flex items-center gap-stack-3xs">
                        <Clock3 size={14} aria-hidden="true" /> {conv.lastMessageTime}
                      </span>
                    </div>
                  </button>

                  {/* Libellé fixe + `aria-pressed` : l'état se lit sur le
                      « enfoncé », pas dans le nom (APG Button, bouton bascule —
                      un nom qui change en même temps que l'état se contredit :
                      « Retirer des favoris, enfoncé »). 32 × 32, au-dessus des
                      24 px de WCAG 2.5.8. Positionné par un <span> : le cran
                      `sm` de Button porte déjà `relative` (pour sa cible
                      tactile), et deux `position` sur un élément, c'est l'ordre
                      d'émission de Tailwind qui tranche. */}
                  <span className="absolute top-1.5 right-1.5 inline-flex">
                    <Button
                      emphasis="ghost"
                      tone="neutral"
                      size="sm"
                      iconOnly
                      aria-label="Marquer comme favori"
                      aria-pressed={conv.isStarred}
                      onClick={(e) => handleToggleStar(e, conv.id)}
                    >
                      <Star
                        size={14}
                        aria-hidden
                        className={conv.isStarred ? 'text-accent-400 fill-accent-400' : 'text-ink-300 fill-transparent'}
                      />
                    </Button>
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Panel: Message thread */}
      {currentConversation ? (
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

          {/* Thread header */}
          <div className="px-stack-md py-stack border-b border-ink-200 bg-white flex items-center gap-stack-xs">
            <Button emphasis="soft" tone="warm" iconOnly aria-label="Retour" className="shrink-0" onClick={() => setSelectedId(null)}>
              <ArrowLeft size={14} />
            </Button>

            {/* L'avatar du système (initiales en 600 ; elles étaient en 800,
                à 13 px écrits en dur). Le nom de l'interlocuteur est le titre
                du fil, pas une section de la page : 16/600, comme le titre
                d'un lecteur (`ViewerHeader`) — c'était un h3 à 16/700 sous un
                h1 absent. Son rôle est une légende ink-600, sans émoji ; le
                contexte, une donnée (MetaPill). */}
            <Avatar
              name={currentConversation.participantName}
              initials={currentConversation.participantInitials}
              size="md"
              tint={currentConversation.participantRole === 'coach' ? 'brand' : currentConversation.participantRole === 'support' ? 'warm' : 'ink'}
            />

            <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
              <p className="font-body text-body font-semibold text-ink-900 truncate">
                {currentConversation.participantName}
              </p>
              <p className="font-body text-caption text-ink-600">
                {currentConversation.participantRole === 'coach' ? 'Coach IA' : 'Support'}
              </p>
            </div>

            {currentConversation.context?.title && (
              <MetaPill
                icon={CONTEXT_ICONS[currentConversation.context.type]}
                text={currentConversation.context.title}
                tone="primary"
                className="shrink-0 hidden sm:inline-flex"
              />
            )}
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-stack-lg bg-ink-50 flex flex-col gap-stack-xs">
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
                          {/* Rangée 14, retrait 12 → rayon concentrique 2 : `rounded-xs` (4). */}
                          <div className={`w-[30px] h-[30px] rounded-xs flex items-center justify-center shrink-0 ${isUser ? 'bg-white/20' : 'bg-primary-50'}`}>
                            {att.type === 'image'
                              ? <ImageIcon size={14} className={isUser ? 'text-white' : 'text-primary-500'} />
                              : <File size={14} className={isUser ? 'text-white' : 'text-primary-500'} />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-body text-caption font-semibold overflow-hidden text-ellipsis whitespace-nowrap ${isUser ? 'text-white' : 'text-ink-900'}`}>
                              {att.name}
                            </p>
                            {/* La taille est une légende 13 (elle était à 11) ; en
                                blanc plein sur la bulle sombre : la transparence
                                faisait tomber le contraste. */}
                            {att.size && (
                              <p className={`font-body text-caption tabular-nums ${isUser ? 'text-white' : 'text-ink-600'}`}>
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
          <div className="px-stack-md py-stack border-t border-ink-200 bg-white">
            <div className="flex items-end gap-stack-xs">
              <Button emphasis="soft" tone="warm" iconOnly aria-label="Pièce jointe" className="shrink-0">
                <Paperclip size={14} />
              </Button>

              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez votre message… (Entrée pour envoyer)"
                rows={1}
                aria-label="Votre message"
                className="flex-1 px-stack-sm py-2 rounded-lg border border-ink-400 bg-ink-50 text-ink-900 font-body text-body resize-none outline-none h-auto min-h-11 max-h-[120px] transition-colors focus:border-primary-700 focus:bg-white placeholder:text-ink-500"
              />

              <Button
                emphasis="soft"
                iconOnly
                aria-label="Envoyer"
                className="shrink-0"
                disabled={!messageInput.trim()}
                onClick={handleSend}
              >
                <Send size={14} />
              </Button>
            </div>

            {/* Aide sous un champ : légende 13 ink-600 (elle était à 11 px),
                les touches en `Kbd`. */}
            <p className="mt-stack-xs font-body text-caption text-ink-600 text-center">
              <Kbd size="sm">Entrée</Kbd> pour envoyer &nbsp;·&nbsp;
              <Kbd size="sm">Shift+Entrée</Kbd> pour un saut de ligne
            </p>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="hidden md:flex flex-1 items-center justify-center bg-ink-50">
          <div className="text-center max-w-xs px-stack-lg">
            <div className="w-[72px] h-[72px] rounded-pill bg-primary-50 border border-primary-100 flex items-center justify-center mx-auto mb-stack text-primary-400">
              <MessageSquarePlus size={28} />
            </div>
            {/* Un message d'attente, pas une section : l'intitulé garde la
                taille d'un titre de bloc sans entrer dans le plan de la page ;
                la phrase passe en corps ink-700 (légende ink-500 avant). */}
            <p className="mb-stack-xs font-display text-h3 text-ink-900 text-balance">
              Sélectionnez une conversation
            </p>
            <p className="mb-stack font-body text-body text-ink-700">
              Choisissez un fil dans la liste pour démarrer ou continuer la conversation.
            </p>
            <Button emphasis="soft" tone="warm" fullWidth leadingIcon={<Pencil size={14} />}>
              Nouveau message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
