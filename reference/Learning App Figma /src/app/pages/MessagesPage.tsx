import { useState } from 'react';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Archive,
  Trash2,
  Star,
  Circle,
  CheckCheck,
  Image as ImageIcon,
  File,
  X,
  Filter,
  MessageSquarePlus,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'coach' | 'user' | 'system';
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: {
    type: 'image' | 'file';
    name: string;
    url: string;
    size?: string;
  }[];
}

interface Conversation {
  id: string;
  participantName: string;
  participantRole: 'coach' | 'support' | 'admin';
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isStarred: boolean;
  messages: Message[];
  context?: {
    type: 'lesson' | 'project' | 'coaching' | 'general';
    title?: string;
  };
}

interface MessagesPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export default function MessagesPage({ onNavigate }: MessagesPageProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'coach' | 'support' | 'starred'>('all');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  // Mock data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participantName: 'Sophie Martin',
      participantRole: 'coach',
      participantAvatar: '👩‍🏫',
      lastMessage: "Excellent travail sur votre projet final ! J'ai quelques suggestions...",
      lastMessageTime: 'Il y a 5 min',
      unreadCount: 2,
      isStarred: true,
      context: {
        type: 'project',
        title: 'Projet Final - Chatbot IA',
      },
      messages: [
        {
          id: 'm1',
          senderId: 'coach1',
          senderName: 'Sophie Martin',
          senderRole: 'coach',
          senderAvatar: '👩‍🏫',
          content: "Bonjour ! J'ai examiné votre projet final sur le chatbot IA. C'est un excellent travail ! 🎉",
          timestamp: 'Aujourd\'hui à 14:30',
          isRead: true,
        },
        {
          id: 'm2',
          senderId: 'user1',
          senderName: 'Vous',
          senderRole: 'user',
          content: "Merci beaucoup ! J'ai passé beaucoup de temps sur l'architecture conversationnelle.",
          timestamp: 'Aujourd\'hui à 14:32',
          isRead: true,
        },
        {
          id: 'm3',
          senderId: 'coach1',
          senderName: 'Sophie Martin',
          senderRole: 'coach',
          senderAvatar: '👩‍🏫',
          content: "Excellent travail sur votre projet final ! J'ai quelques suggestions pour améliorer la gestion du contexte dans les conversations longues. Souhaitez-vous qu'on en discute lors de notre prochain coaching ?",
          timestamp: 'Aujourd\'hui à 14:50',
          isRead: false,
          attachments: [
            {
              type: 'file',
              name: 'Feedback_Projet_Final.pdf',
              url: '#',
              size: '245 KB',
            }
          ]
        },
        {
          id: 'm4',
          senderId: 'coach1',
          senderName: 'Sophie Martin',
          senderRole: 'coach',
          senderAvatar: '👩‍🏫',
          content: "Voici également quelques ressources complémentaires sur les modèles de langage avancés.",
          timestamp: 'Aujourd\'hui à 14:51',
          isRead: false,
        },
      ],
    },
    {
      id: '2',
      participantName: 'Marc Dubois',
      participantRole: 'coach',
      participantAvatar: '👨‍💼',
      lastMessage: "La correction de votre exercice sur les prompts est disponible",
      lastMessageTime: 'Il y a 2h',
      unreadCount: 1,
      isStarred: false,
      context: {
        type: 'lesson',
        title: 'Leçon 3 - Prompt Engineering Avancé',
      },
      messages: [
        {
          id: 'm5',
          senderId: 'coach2',
          senderName: 'Marc Dubois',
          senderRole: 'coach',
          senderAvatar: '👨‍💼',
          content: "Bonjour ! La correction de votre exercice sur les prompts est maintenant disponible. Vous avez obtenu 18/20 - très bon travail !",
          timestamp: 'Aujourd\'hui à 13:15',
          isRead: false,
        },
      ],
    },
    {
      id: '3',
      participantName: 'Support TLS',
      participantRole: 'support',
      participantAvatar: '💬',
      lastMessage: "Votre problème de connexion a été résolu",
      lastMessageTime: 'Hier',
      unreadCount: 0,
      isStarred: false,
      messages: [
        {
          id: 'm6',
          senderId: 'support1',
          senderName: 'Support TLS',
          senderRole: 'system',
          content: "Bonjour, votre problème de connexion a été résolu. N'hésitez pas si vous avez d'autres questions !",
          timestamp: 'Hier à 16:45',
          isRead: true,
        },
      ],
    },
  ]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'starred' && conv.isStarred) ||
                         (filterType === 'coach' && conv.participantRole === 'coach') ||
                         (filterType === 'support' && conv.participantRole === 'support');
    return matchesSearch && matchesFilter;
  });

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'user1',
      senderName: 'Vous',
      senderRole: 'user',
      content: messageInput,
      timestamp: 'À l\'instant',
      isRead: true,
    };

    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { 
            ...conv, 
            messages: [...conv.messages, newMessage],
            lastMessage: messageInput,
            lastMessageTime: 'À l\'instant',
          }
        : conv
    ));

    setMessageInput('');
  };

  const handleToggleStar = (convId: string) => {
    setConversations(prev => prev.map(conv =>
      conv.id === convId ? { ...conv, isStarred: !conv.isStarred } : conv
    ));
  };

  const handleMarkAsRead = (convId: string) => {
    setConversations(prev => prev.map(conv =>
      conv.id === convId ? { ...conv, unreadCount: 0 } : conv
    ));
  };

  return (
    <div className="flex h-screen" style={{ background: 'var(--background)' }}>
      <OptimizedSidebar 
        currentPage="messages" 
        onNavigate={onNavigate}
        userName="Jean Dupont"
        userEmail="jean.dupont@example.com"
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List - Left Panel */}
        {/* Mobile: Hidden when conversation selected, Desktop: Always visible */}
        <div 
          className={`w-full md:w-96 border-r flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}
          style={{
            borderColor: 'var(--glass-border)',
            background: 'var(--surface)',
          }}
        >
          {/* Header */}
          <div 
            className="p-6 border-b"
            style={{
              borderColor: 'var(--glass-border)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h1 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Messages
              </h1>
              <Button
                size="sm"
                onClick={() => setShowNewMessageModal(true)}
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                }}
              >
                <MessageSquarePlus className="w-4 h-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'var(--muted-foreground)' }}
              />
              <Input
                placeholder="Rechercher une conversation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{
                  fontSize: 'var(--text-sm)',
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'Tout' },
                { value: 'coach', label: 'Coach' },
                { value: 'support', label: 'Support' },
                { value: 'starred', label: '⭐' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterType(filter.value as any)}
                  className="px-3 py-1.5 rounded-lg transition-all duration-200"
                  style={{
                    background: filterType === filter.value ? 'var(--primary)' : 'var(--neutral-100)',
                    color: filterType === filter.value ? 'white' : 'var(--foreground)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setSelectedConversation(conv.id);
                  handleMarkAsRead(conv.id);
                }}
                className="p-4 border-b cursor-pointer transition-all duration-200 hover:bg-opacity-50 relative"
                style={{
                  background: selectedConversation === conv.id ? 'var(--primary-lighter)' : 'transparent',
                  borderColor: 'var(--glass-border)',
                  borderLeft: selectedConversation === conv.id ? '3px solid var(--primary)' : '3px solid transparent',
                }}
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{
                      background: conv.participantRole === 'coach' 
                        ? 'var(--primary-lighter)' 
                        : 'var(--neutral-100)',
                    }}
                  >
                    {conv.participantAvatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="line-clamp-1"
                          style={{
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                          }}
                        >
                          {conv.participantName}
                        </h3>
                        {conv.context && (
                          <p 
                            className="line-clamp-1"
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--primary)',
                            }}
                          >
                            {conv.context.title}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStar(conv.id);
                        }}
                        className="flex-shrink-0"
                      >
                        <Star 
                          className="w-4 h-4"
                          style={{ 
                            color: conv.isStarred ? 'var(--accent)' : 'var(--muted-foreground)',
                            fill: conv.isStarred ? 'var(--accent)' : 'none',
                          }}
                        />
                      </button>
                    </div>

                    <p 
                      className="line-clamp-2 mb-1"
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: conv.unreadCount > 0 ? 'var(--foreground)' : 'var(--muted-foreground)',
                        fontWeight: conv.unreadCount > 0 ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                      }}
                    >
                      {conv.lastMessage}
                    </p>

                    <div className="flex items-center justify-between">
                      <span 
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {conv.lastMessageTime}
                      </span>
                      {conv.unreadCount > 0 && (
                        <span 
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background: 'var(--primary)',
                            color: 'white',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-bold)',
                          }}
                        >
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages View - Right Panel */}
        {/* Mobile: Full width when conversation selected, Desktop: Always visible */}
        {currentConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Conversation Header */}
            <div 
              className="p-4 border-b flex items-center justify-between"
              style={{
                borderColor: 'var(--glass-border)',
                background: 'var(--surface)',
              }}
            >
              <div className="flex items-center gap-3">
                {/* Mobile: Back button */}
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden p-2 rounded-xl hover:bg-opacity-80 transition-all"
                  style={{
                    background: 'var(--neutral-100)',
                  }}
                >
                  <ArrowLeft className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                </button>
                
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{
                    background: currentConversation.participantRole === 'coach' 
                      ? 'var(--primary-lighter)' 
                      : 'var(--neutral-100)',
                  }}
                >
                  {currentConversation.participantAvatar}
                </div>
                <div>
                  <h2 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {currentConversation.participantName}
                  </h2>
                  <p 
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {currentConversation.participantRole === 'coach' ? 'Coach IA' : 'Support'}
                  </p>
                </div>
              </div>

              {currentConversation.context && (
                <div 
                  className="px-4 py-2 rounded-xl"
                  style={{
                    background: 'var(--primary-lighter)',
                  }}
                >
                  <p 
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--primary)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    📚 {currentConversation.context.title}
                  </p>
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-6 space-y-4"
              style={{
                background: 'var(--neutral-50)',
              }}
            >
              {currentConversation.messages.map((message) => {
                const isUser = message.senderRole === 'user';
                
                return (
                  <div
                    key={message.id}
                    className="flex gap-3"
                    style={{
                      flexDirection: isUser ? 'row-reverse' : 'row',
                    }}
                  >
                    {!isUser && (
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                        style={{
                          background: 'var(--primary-lighter)',
                        }}
                      >
                        {message.senderAvatar}
                      </div>
                    )}

                    <div 
                      className="max-w-[70%]"
                      style={{
                        alignItems: isUser ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {!isUser && (
                        <p 
                          className="mb-1 px-1"
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            fontWeight: 'var(--font-weight-medium)',
                          }}
                        >
                          {message.senderName}
                        </p>
                      )}

                      <div
                        className="p-4 rounded-2xl"
                        style={{
                          background: isUser ? 'var(--primary)' : 'white',
                          color: isUser ? 'white' : 'var(--foreground)',
                          borderBottomRightRadius: isUser ? '4px' : '16px',
                          borderBottomLeftRadius: isUser ? '16px' : '4px',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <p 
                          style={{
                            fontSize: 'var(--text-sm)',
                            lineHeight: 'var(--leading-relaxed)',
                          }}
                        >
                          {message.content}
                        </p>

                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl flex items-center gap-3"
                                style={{
                                  background: isUser ? 'rgba(255, 255, 255, 0.2)' : 'var(--neutral-100)',
                                }}
                              >
                                <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{
                                    background: isUser ? 'rgba(255, 255, 255, 0.3)' : 'var(--primary-lighter)',
                                  }}
                                >
                                  {attachment.type === 'image' ? (
                                    <ImageIcon className="w-4 h-4" style={{ color: isUser ? 'white' : 'var(--primary)' }} />
                                  ) : (
                                    <File className="w-4 h-4" style={{ color: isUser ? 'white' : 'var(--primary)' }} />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p 
                                    className="line-clamp-1"
                                    style={{
                                      fontSize: 'var(--text-xs)',
                                      fontWeight: 'var(--font-weight-medium)',
                                      color: isUser ? 'white' : 'var(--foreground)',
                                    }}
                                  >
                                    {attachment.name}
                                  </p>
                                  {attachment.size && (
                                    <p 
                                      style={{
                                        fontSize: 'var(--text-xs)',
                                        color: isUser ? 'rgba(255, 255, 255, 0.8)' : 'var(--muted-foreground)',
                                      }}
                                    >
                                      {attachment.size}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <p 
                        className="mt-1 px-1"
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--muted-foreground)',
                          textAlign: isUser ? 'right' : 'left',
                        }}
                      >
                        {message.timestamp}
                        {isUser && (
                          <CheckCheck className="inline-block w-3 h-3 ml-1" style={{ color: 'var(--primary)' }} />
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div 
              className="p-4 border-t"
              style={{
                borderColor: 'var(--glass-border)',
                background: 'var(--surface)',
              }}
            >
              <div className="flex gap-2 items-end">
                <button
                  className="p-2 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'var(--neutral-100)',
                  }}
                >
                  <Paperclip className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                </button>

                <div className="flex-1">
                  <Textarea
                    placeholder="Écrivez votre message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    rows={1}
                    style={{
                      fontSize: 'var(--text-sm)',
                      resize: 'none',
                      minHeight: '44px',
                      maxHeight: '120px',
                    }}
                  />
                </div>

                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="px-4 py-2.5"
                  style={{
                    background: messageInput.trim() ? 'var(--primary)' : 'var(--neutral-200)',
                    color: 'white',
                  }}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              <p 
                className="mt-2 text-center"
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Appuyez sur <kbd className="px-1.5 py-0.5 rounded" style={{ background: 'var(--neutral-100)' }}>Entrée</kbd> pour envoyer, <kbd className="px-1.5 py-0.5 rounded" style={{ background: 'var(--neutral-100)' }}>Shift + Entrée</kbd> pour un saut de ligne
              </p>
            </div>
          </div>
        ) : (
          <div 
            className="flex-1 flex items-center justify-center"
            style={{
              background: 'var(--neutral-50)',
            }}
          >
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: 'var(--primary-lighter)',
                }}
              >
                <MessageSquarePlus className="w-10 h-10" style={{ color: 'var(--primary)' }} />
              </div>
              <h3 
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Sélectionnez une conversation
              </h3>
              <p 
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Choisissez une conversation pour commencer à échanger
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}