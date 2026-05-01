import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User,
  Sparkles,
  BookOpen,
  MessageCircle,
  HelpCircle,
  Zap,
  X,
} from 'lucide-react';

interface HelpChatbotPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function HelpChatbotPage({ onNavigate, onLogout }: HelpChatbotPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      suggestions: [
        "Comment démarrer un parcours ?",
        "Réserver une session de coaching",
        "Consulter mes badges",
        "Suivre ma progression"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('parcours') || lowerMessage.includes('démarrer')) {
      return {
        content: "Pour démarrer un parcours, rendez-vous dans la section 'Parcours' depuis le menu. Vous y trouverez tous les parcours disponibles avec leur description et progression. Cliquez sur un parcours pour voir les étapes et leçons !",
        suggestions: [
          "Voir mes parcours en cours",
          "Explorer les nouveaux parcours",
          "Comment compléter une leçon ?"
        ]
      };
    }

    if (lowerMessage.includes('coaching') || lowerMessage.includes('réserver')) {
      return {
        content: "Pour réserver une session de coaching, allez dans la section 'Coaching'. Vous pourrez y voir les créneaux disponibles des coachs et réserver celui qui vous convient. N'oubliez pas de préparer vos questions !",
        suggestions: [
          "Voir les coachs disponibles",
          "Mes sessions à venir",
          "Annuler une réservation"
        ]
      };
    }

    if (lowerMessage.includes('badge') || lowerMessage.includes('progression')) {
      return {
        content: "Vous pouvez consulter tous vos badges et votre progression dans votre profil ! Chaque badge est débloqué en accomplissant des objectifs spécifiques. Continuez à apprendre pour en gagner davantage ! 🏆",
        suggestions: [
          "Voir mon profil",
          "Comment gagner des badges ?",
          "Mes statistiques d'apprentissage"
        ]
      };
    }

    if (lowerMessage.includes('compte') || lowerMessage.includes('profil')) {
      return {
        content: "Votre profil contient toutes vos informations personnelles, vos badges, votre progression et vos statistiques. Vous pouvez le consulter en cliquant sur votre avatar en haut à droite.",
        suggestions: [
          "Modifier mes informations",
          "Changer mon mot de passe",
          "Paramètres de notification"
        ]
      };
    }

    return {
      content: "Je suis là pour vous aider ! Voici quelques sujets sur lesquels je peux vous renseigner : les parcours de formation, le système de coaching, vos badges et progression, ou encore les fonctionnalités de la plateforme.",
      suggestions: [
        "Comment démarrer un parcours ?",
        "Réserver une session de coaching",
        "Consulter mes badges",
        "Explorer les fonctionnalités"
      ]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        background: 'var(--background)',
      }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-30 border-b"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--glass-white)',
                  border: '1px solid var(--border)',
                }}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
              </button>
              
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'var(--gradient-primary)',
                    boxShadow: '0 4px 16px rgba(85, 161, 180, 0.3)',
                  }}
                >
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Assistant TLS
                  </h1>
                  <p 
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    Toujours disponible pour vous aider
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                >
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div className={`max-w-2xl ${message.type === 'user' ? 'text-right' : ''}`}>
                <div
                  className="inline-block px-4 py-3 rounded-2xl"
                  style={{
                    background: message.type === 'user' 
                      ? 'var(--gradient-primary)' 
                      : 'var(--glass-white)',
                    color: message.type === 'user' ? 'white' : 'var(--foreground)',
                    border: message.type === 'bot' ? '1px solid var(--border)' : 'none',
                    boxShadow: message.type === 'user' 
                      ? '0 4px 16px rgba(85, 161, 180, 0.2)'
                      : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
                    {message.content}
                  </p>
                </div>

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          background: 'var(--glass-white)',
                          border: '1px solid var(--border)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--primary)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <p 
                  className="mt-1 px-1"
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.type === 'user' && (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'var(--gradient-accent)',
                  }}
                >
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'var(--gradient-primary)',
                }}
              >
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div
                className="px-4 py-3 rounded-2xl"
                style={{
                  background: 'var(--glass-white)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div 
          className="sticky bottom-0 border-t pt-4"
          style={{
            background: 'var(--background)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex gap-3 items-end">
            <div 
              className="flex-1 flex gap-2 items-center px-4 py-3 rounded-2xl"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question..."
                className="flex-1 bg-transparent outline-none"
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--foreground)',
                }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: inputValue.trim() ? 'var(--gradient-primary)' : 'var(--muted)',
                }}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleSendMessage("Comment démarrer un parcours ?")}
              className="px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
                fontSize: 'var(--text-sm)',
                color: 'var(--foreground)',
              }}
            >
              <BookOpen className="w-4 h-4" />
              Parcours
            </button>
            <button
              onClick={() => handleSendMessage("Réserver une session de coaching")}
              className="px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
                fontSize: 'var(--text-sm)',
                color: 'var(--foreground)',
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Coaching
            </button>
            <button
              onClick={() => handleSendMessage("Consulter mes badges")}
              className="px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--border)',
                fontSize: 'var(--text-sm)',
                color: 'var(--foreground)',
              }}
            >
              <Sparkles className="w-4 h-4" />
              Badges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
