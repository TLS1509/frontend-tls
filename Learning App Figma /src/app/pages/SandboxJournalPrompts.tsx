import { useState } from 'react';
import { 
  MessageCircle,
  MessagesSquare,
  MessageSquare,
  Sparkles,
  BookOpen,
  Target,
  Send,
  PenLine,
  Lightbulb,
  ArrowLeft
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { ButtonEnhanced } from '../components/ui/button-enhanced';

interface SandboxJournalPromptsProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'account') => void;
  onLogout: () => void;
}

export default function SandboxJournalPrompts({ onNavigate, onLogout }: SandboxJournalPromptsProps) {
  const [activePrompt1, setActivePrompt1] = useState<number | null>(null);
  const [activePrompt2, setActivePrompt2] = useState<number | null>(null);
  const [activePrompt3, setActivePrompt3] = useState<number | null>(null);
  const [activePrompt4, setActivePrompt4] = useState<number | null>(null);
  
  const [journalInputs1, setJournalInputs1] = useState<{ [key: number]: string }>({});
  const [journalInputs2, setJournalInputs2] = useState<{ [key: number]: string }>({});
  const [journalInputs3, setJournalInputs3] = useState<{ [key: number]: string }>({});
  const [journalInputs4, setJournalInputs4] = useState<{ [key: number]: string }>({});

  const handleSubmit = (section: number, promptIndex: number) => {
    console.log(`Submitting from section ${section}, prompt ${promptIndex}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />

      <div className="flex h-screen">
        <OptimizedSidebar
          currentPage="dashboard"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 mb-6 transition-all duration-300"
                style={{
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--text-sm)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted-foreground)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au Dashboard
              </button>
              
              <h1 
                className="mb-3"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                🎨 Sandbox - Prompts Journal
              </h1>
              <p style={{ 
                fontSize: 'var(--text-lg)',
                color: 'var(--muted-foreground)',
              }}>
                Explorez 4 designs différents pour encourager l'écriture dans le journal de bord
              </p>
            </div>

            <div className="space-y-16">
              {/* ========== SUGGESTION 1: iMessage Classique ========== */}
              <section>
                <div className="mb-6">
                  <h2 
                    className="mb-2"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    💬 Suggestion 1 : Style iMessage Classique
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                    Alternance gauche/droite avec bulles de conversation
                  </p>
                </div>

                <div 
                  className="p-8 rounded-3xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <h3 
                    className="mb-6 flex items-center gap-2"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <MessageCircle className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    Conversation avec vous-même
                  </h3>

                  <div className="space-y-4 max-w-3xl">
                    {/* Bubble 1 - Assistant (gauche) */}
                    <div className="flex items-end gap-3">
                      <div 
                        className="px-5 py-4 rounded-3xl rounded-bl-md max-w-md cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(85, 161, 180, 0.2)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                        }}
                        onClick={() => setActivePrompt1(activePrompt1 === 1 ? null : 1)}
                      >
                        <p style={{ 
                          fontSize: 'var(--text-base)',
                          color: 'var(--foreground)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}>
                          💭 Qu'est-ce qui vous a marqué aujourd'hui ?
                        </p>
                      </div>
                    </div>

                    {activePrompt1 === 1 && (
                      <div className="ml-3 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                        <textarea
                          value={journalInputs1[1] || ''}
                          onChange={(e) => setJournalInputs1(prev => ({ ...prev, 1: e.target.value }))}
                          placeholder="Écrivez votre réflexion..."
                          rows={3}
                          className="w-full p-3 rounded-xl resize-none"
                          style={{
                            fontSize: 'var(--text-base)',
                            color: 'var(--foreground)',
                            background: 'white',
                            border: '1px solid var(--border)',
                            outline: 'none',
                          }}
                        />
                        <div className="flex justify-end mt-2">
                          <ButtonEnhanced
                            variant="primary"
                            size="sm"
                            icon={<Send className="w-3 h-3" />}
                            iconPosition="right"
                            onClick={() => handleSubmit(1, 1)}
                          >
                            Enregistrer
                          </ButtonEnhanced>
                        </div>
                      </div>
                    )}

                    {/* Bubble 2 - User (droite) */}
                    <div className="flex items-end gap-3 justify-end">
                      <div 
                        className="px-5 py-4 rounded-3xl rounded-br-md max-w-md cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, var(--primary), rgba(85, 161, 180, 0.8))',
                          boxShadow: '0 4px 16px rgba(85, 161, 180, 0.25)',
                        }}
                        onClick={() => setActivePrompt1(activePrompt1 === 2 ? null : 2)}
                      >
                        <p style={{ 
                          fontSize: 'var(--text-base)',
                          color: 'white',
                          lineHeight: 'var(--leading-relaxed)',
                        }}>
                          ✨ Quelle découverte avez-vous faite cette semaine ?
                        </p>
                      </div>
                    </div>

                    {activePrompt1 === 2 && (
                      <div className="mr-3 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                        <textarea
                          value={journalInputs1[2] || ''}
                          onChange={(e) => setJournalInputs1(prev => ({ ...prev, 2: e.target.value }))}
                          placeholder="Partagez votre découverte..."
                          rows={3}
                          className="w-full p-3 rounded-xl resize-none"
                          style={{
                            fontSize: 'var(--text-base)',
                            color: 'var(--foreground)',
                            background: 'white',
                            border: '1px solid var(--border)',
                            outline: 'none',
                          }}
                        />
                        <div className="flex justify-end mt-2">
                          <ButtonEnhanced
                            variant="primary"
                            size="sm"
                            icon={<Send className="w-3 h-3" />}
                            iconPosition="right"
                            onClick={() => handleSubmit(1, 2)}
                          >
                            Enregistrer
                          </ButtonEnhanced>
                        </div>
                      </div>
                    )}

                    {/* Bubble 3 - Assistant (gauche) */}
                    <div className="flex items-end gap-3">
                      <div 
                        className="px-5 py-4 rounded-3xl rounded-bl-md max-w-md cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(248, 176, 68, 0.2)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                        }}
                        onClick={() => setActivePrompt1(activePrompt1 === 3 ? null : 3)}
                      >
                        <p style={{ 
                          fontSize: 'var(--text-base)',
                          color: 'var(--foreground)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}>
                          🎯 Comment allez-vous mettre en pratique ce que vous avez appris ?
                        </p>
                      </div>
                    </div>

                    {activePrompt1 === 3 && (
                      <div className="ml-3 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                        <textarea
                          value={journalInputs1[3] || ''}
                          onChange={(e) => setJournalInputs1(prev => ({ ...prev, 3: e.target.value }))}
                          placeholder="Définissez vos actions..."
                          rows={3}
                          className="w-full p-3 rounded-xl resize-none"
                          style={{
                            fontSize: 'var(--text-base)',
                            color: 'var(--foreground)',
                            background: 'white',
                            border: '1px solid var(--border)',
                            outline: 'none',
                          }}
                        />
                        <div className="flex justify-end mt-2">
                          <ButtonEnhanced
                            variant="accent"
                            size="sm"
                            icon={<Send className="w-3 h-3" />}
                            iconPosition="right"
                            onClick={() => handleSubmit(1, 3)}
                          >
                            Enregistrer
                          </ButtonEnhanced>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* ========== SUGGESTION 2: Bulles Empilées 3D ========== */}
              <section>
                <div className="mb-6">
                  <h2 
                    className="mb-2"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    🎲 Suggestion 2 : Bulles Empilées avec Effet 3D
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                    Cartes décalées avec rotation au survol
                  </p>
                </div>

                <div 
                  className="p-8 rounded-3xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <h3 
                    className="mb-6 flex items-center gap-2"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <MessagesSquare className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    Prompts du jour
                  </h3>

                  <div className="relative max-w-2xl">
                    {/* Bubble 1 */}
                    <div 
                      className="mb-4 px-6 py-5 rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:rotate-1 relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(85, 161, 180, 0.15)',
                        boxShadow: '0 8px 24px rgba(85, 161, 180, 0.12), 0 2px 8px rgba(0, 0, 0, 0.05)',
                      }}
                      onClick={() => setActivePrompt2(activePrompt2 === 1 ? null : 1)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: 'var(--primary)' }}
                        >
                          <Sparkles className="w-5 h-5" style={{ color: 'white' }} />
                        </div>
                        <span style={{ 
                          fontSize: 'var(--text-xs)',
                          color: 'var(--primary)',
                          fontWeight: 'var(--font-weight-semibold)',
                          textTransform: 'uppercase',
                          letterSpacing: 'var(--tracking-wider)',
                        }}>
                          Réflexion libre
                        </span>
                      </div>
                      <p style={{ 
                        fontSize: 'var(--text-lg)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--leading-relaxed)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}>
                        💭 Qu'est-ce qui vous a marqué aujourd'hui ?
                      </p>
                      
                      {activePrompt2 === 1 && (
                        <div className="mt-4">
                          <textarea
                            value={journalInputs2[1] || ''}
                            onChange={(e) => setJournalInputs2(prev => ({ ...prev, 1: e.target.value }))}
                            placeholder="Écrivez votre réflexion..."
                            rows={3}
                            className="w-full p-3 rounded-xl resize-none"
                            style={{
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              background: 'white',
                              border: '1px solid var(--border)',
                              outline: 'none',
                            }}
                          />
                          <div className="flex justify-end mt-2">
                            <ButtonEnhanced
                              variant="primary"
                              size="sm"
                              icon={<Send className="w-3 h-3" />}
                              iconPosition="right"
                              onClick={() => handleSubmit(2, 1)}
                            >
                              Enregistrer
                            </ButtonEnhanced>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bubble 2 */}
                    <div 
                      className="mb-4 px-6 py-5 rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:-rotate-1 relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.1), rgba(237, 132, 58, 0.05))',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(237, 132, 58, 0.2)',
                        boxShadow: '0 8px 24px rgba(237, 132, 58, 0.12), 0 2px 8px rgba(0, 0, 0, 0.05)',
                        marginLeft: '40px',
                      }}
                      onClick={() => setActivePrompt2(activePrompt2 === 2 ? null : 2)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: 'var(--secondary)' }}
                        >
                          <BookOpen className="w-5 h-5" style={{ color: 'white' }} />
                        </div>
                        <span style={{ 
                          fontSize: 'var(--text-xs)',
                          color: 'var(--secondary)',
                          fontWeight: 'var(--font-weight-semibold)',
                          textTransform: 'uppercase',
                          letterSpacing: 'var(--tracking-wider)',
                        }}>
                          Apprentissage
                        </span>
                      </div>
                      <p style={{ 
                        fontSize: 'var(--text-lg)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--leading-relaxed)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}>
                        ✨ Quelle découverte avez-vous faite cette semaine ?
                      </p>
                      
                      {activePrompt2 === 2 && (
                        <div className="mt-4">
                          <textarea
                            value={journalInputs2[2] || ''}
                            onChange={(e) => setJournalInputs2(prev => ({ ...prev, 2: e.target.value }))}
                            placeholder="Partagez votre découverte..."
                            rows={3}
                            className="w-full p-3 rounded-xl resize-none"
                            style={{
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              background: 'white',
                              border: '1px solid var(--border)',
                              outline: 'none',
                            }}
                          />
                          <div className="flex justify-end mt-2">
                            <ButtonEnhanced
                              variant="secondary"
                              size="sm"
                              icon={<Send className="w-3 h-3" />}
                              iconPosition="right"
                              onClick={() => handleSubmit(2, 2)}
                            >
                              Enregistrer
                            </ButtonEnhanced>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bubble 3 */}
                    <div 
                      className="px-6 py-5 rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:rotate-1 relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1), rgba(248, 176, 68, 0.05))',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(248, 176, 68, 0.2)',
                        boxShadow: '0 8px 24px rgba(248, 176, 68, 0.12), 0 2px 8px rgba(0, 0, 0, 0.05)',
                        marginLeft: '20px',
                      }}
                      onClick={() => setActivePrompt2(activePrompt2 === 3 ? null : 3)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: 'var(--accent)' }}
                        >
                          <Target className="w-5 h-5" style={{ color: 'white' }} />
                        </div>
                        <span style={{ 
                          fontSize: 'var(--text-xs)',
                          color: 'var(--accent)',
                          fontWeight: 'var(--font-weight-semibold)',
                          textTransform: 'uppercase',
                          letterSpacing: 'var(--tracking-wider)',
                        }}>
                          Action
                        </span>
                      </div>
                      <p style={{ 
                        fontSize: 'var(--text-lg)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--leading-relaxed)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}>
                        🎯 Comment allez-vous mettre en pratique ce que vous avez appris ?
                      </p>
                      
                      {activePrompt2 === 3 && (
                        <div className="mt-4">
                          <textarea
                            value={journalInputs2[3] || ''}
                            onChange={(e) => setJournalInputs2(prev => ({ ...prev, 3: e.target.value }))}
                            placeholder="Définissez vos actions..."
                            rows={3}
                            className="w-full p-3 rounded-xl resize-none"
                            style={{
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              background: 'white',
                              border: '1px solid var(--border)',
                              outline: 'none',
                            }}
                          />
                          <div className="flex justify-end mt-2">
                            <ButtonEnhanced
                              variant="accent"
                              size="sm"
                              icon={<Send className="w-3 h-3" />}
                              iconPosition="right"
                              onClick={() => handleSubmit(2, 3)}
                            >
                              Enregistrer
                            </ButtonEnhanced>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* ========== SUGGESTION 3: Chat Moderne avec Avatar ========== */}
              <section>
                <div className="mb-6">
                  <h2 
                    className="mb-2"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    👤 Suggestion 3 : Style Chat Moderne avec Avatar
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                    Avatars colorés avec sous-titres explicatifs
                  </p>
                </div>

                <div 
                  className="p-8 rounded-3xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <h3 
                    className="mb-6 flex items-center gap-2"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <MessageSquare className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    Questions de réflexion
                  </h3>

                  <div className="space-y-5 max-w-3xl">
                    {/* Message 1 */}
                    <div className="flex gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, var(--primary), rgba(85, 161, 180, 0.7))',
                          boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                        }}
                      >
                        <Sparkles className="w-6 h-6" style={{ color: 'white' }} />
                      </div>
                      <div className="flex-1">
                        <div 
                          className="px-5 py-4 rounded-3xl rounded-tl-md cursor-pointer transition-all duration-300 hover:shadow-xl group"
                          style={{
                            background: 'white',
                            border: '1px solid rgba(85, 161, 180, 0.15)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                          }}
                          onClick={() => setActivePrompt3(activePrompt3 === 1 ? null : 1)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(85, 161, 180, 0.15)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <p 
                            className="mb-2"
                            style={{ 
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              lineHeight: 'var(--leading-relaxed)',
                              fontWeight: 'var(--font-weight-medium)',
                            }}
                          >
                            💭 Qu'est-ce qui vous a marqué aujourd'hui ?
                          </p>
                          <p style={{ 
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                          }}>
                            Cliquez pour partager vos réflexions
                          </p>
                        </div>
                        
                        {activePrompt3 === 1 && (
                          <div className="mt-3 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                            <textarea
                              value={journalInputs3[1] || ''}
                              onChange={(e) => setJournalInputs3(prev => ({ ...prev, 1: e.target.value }))}
                              placeholder="Écrivez votre réflexion..."
                              rows={3}
                              className="w-full p-3 rounded-xl resize-none"
                              style={{
                                fontSize: 'var(--text-base)',
                                color: 'var(--foreground)',
                                background: 'white',
                                border: '1px solid var(--border)',
                                outline: 'none',
                              }}
                            />
                            <div className="flex justify-end mt-2">
                              <ButtonEnhanced
                                variant="primary"
                                size="sm"
                                icon={<Send className="w-3 h-3" />}
                                iconPosition="right"
                                onClick={() => handleSubmit(3, 1)}
                              >
                                Enregistrer
                              </ButtonEnhanced>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message 2 */}
                    <div className="flex gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, var(--secondary), rgba(237, 132, 58, 0.7))',
                          boxShadow: '0 4px 12px rgba(237, 132, 58, 0.3)',
                        }}
                      >
                        <BookOpen className="w-6 h-6" style={{ color: 'white' }} />
                      </div>
                      <div className="flex-1">
                        <div 
                          className="px-5 py-4 rounded-3xl rounded-tl-md cursor-pointer transition-all duration-300 hover:shadow-xl"
                          style={{
                            background: 'white',
                            border: '1px solid rgba(237, 132, 58, 0.15)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                          }}
                          onClick={() => setActivePrompt3(activePrompt3 === 2 ? null : 2)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--secondary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(237, 132, 58, 0.15)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <p 
                            className="mb-2"
                            style={{ 
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              lineHeight: 'var(--leading-relaxed)',
                              fontWeight: 'var(--font-weight-medium)',
                            }}
                          >
                            ✨ Quelle découverte avez-vous faite cette semaine ?
                          </p>
                          <p style={{ 
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                          }}>
                            Cliquez pour documenter vos apprentissages
                          </p>
                        </div>
                        
                        {activePrompt3 === 2 && (
                          <div className="mt-3 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                            <textarea
                              value={journalInputs3[2] || ''}
                              onChange={(e) => setJournalInputs3(prev => ({ ...prev, 2: e.target.value }))}
                              placeholder="Partagez votre découverte..."
                              rows={3}
                              className="w-full p-3 rounded-xl resize-none"
                              style={{
                                fontSize: 'var(--text-base)',
                                color: 'var(--foreground)',
                                background: 'white',
                                border: '1px solid var(--border)',
                                outline: 'none',
                              }}
                            />
                            <div className="flex justify-end mt-2">
                              <ButtonEnhanced
                                variant="secondary"
                                size="sm"
                                icon={<Send className="w-3 h-3" />}
                                iconPosition="right"
                                onClick={() => handleSubmit(3, 2)}
                              >
                                Enregistrer
                              </ButtonEnhanced>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message 3 */}
                    <div className="flex gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, var(--accent), rgba(248, 176, 68, 0.7))',
                          boxShadow: '0 4px 12px rgba(248, 176, 68, 0.3)',
                        }}
                      >
                        <Target className="w-6 h-6" style={{ color: 'white' }} />
                      </div>
                      <div className="flex-1">
                        <div 
                          className="px-5 py-4 rounded-3xl rounded-tl-md cursor-pointer transition-all duration-300 hover:shadow-xl"
                          style={{
                            background: 'white',
                            border: '1px solid rgba(248, 176, 68, 0.15)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                          }}
                          onClick={() => setActivePrompt3(activePrompt3 === 3 ? null : 3)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(248, 176, 68, 0.15)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <p 
                            className="mb-2"
                            style={{ 
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              lineHeight: 'var(--leading-relaxed)',
                              fontWeight: 'var(--font-weight-medium)',
                            }}
                          >
                            🎯 Comment allez-vous mettre en pratique ce que vous avez appris ?
                          </p>
                          <p style={{ 
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                          }}>
                            Cliquez pour définir vos actions
                          </p>
                        </div>
                        
                        {activePrompt3 === 3 && (
                          <div className="mt-3 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                            <textarea
                              value={journalInputs3[3] || ''}
                              onChange={(e) => setJournalInputs3(prev => ({ ...prev, 3: e.target.value }))}
                              placeholder="Définissez vos actions..."
                              rows={3}
                              className="w-full p-3 rounded-xl resize-none"
                              style={{
                                fontSize: 'var(--text-base)',
                                color: 'var(--foreground)',
                                background: 'white',
                                border: '1px solid var(--border)',
                                outline: 'none',
                              }}
                            />
                            <div className="flex justify-end mt-2">
                              <ButtonEnhanced
                                variant="accent"
                                size="sm"
                                icon={<Send className="w-3 h-3" />}
                                iconPosition="right"
                                onClick={() => handleSubmit(3, 3)}
                              >
                                Enregistrer
                              </ButtonEnhanced>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========== SUGGESTION 4: Bulles Flottantes Minimalistes ========== */}
              <section>
                <div className="mb-6">
                  <h2 
                    className="mb-2 flex items-center gap-2"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    🌟 Suggestion 4 : Bulles Flottantes Minimalistes 
                    <span 
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ 
                        background: 'var(--primary)',
                        color: 'white',
                        fontWeight: 'var(--font-weight-semibold)',
                      }}
                    >
                      ACTIF
                    </span>
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                    Design épuré et élégant avec alternance naturelle - Implémenté dans le Dashboard
                  </p>
                </div>

                <div 
                  className="p-8 rounded-3xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <h3 
                    className="mb-6 flex items-center gap-2"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <MessageCircle className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    Conversation réflexive
                  </h3>

                  <div className="space-y-3 max-w-2xl">
                    {/* Bubble 1 - Compact et élégant */}
                    <div>
                      <div 
                        className="inline-block px-6 py-4 rounded-full cursor-pointer transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1.5px solid rgba(85, 161, 180, 0.2)',
                          boxShadow: '0 4px 20px rgba(85, 161, 180, 0.1)',
                        }}
                        onClick={() => setActivePrompt4(activePrompt4 === 1 ? null : 1)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(85, 161, 180, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(85, 161, 180, 0.1)';
                        }}
                      >
                        <p style={{ 
                          fontSize: 'var(--text-base)',
                          color: 'var(--foreground)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}>
                          💭 Qu'est-ce qui vous a marqué aujourd'hui ?
                        </p>
                      </div>
                      
                      {activePrompt4 === 1 && (
                        <div className="mt-3 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                          <textarea
                            value={journalInputs4[1] || ''}
                            onChange={(e) => setJournalInputs4(prev => ({ ...prev, 1: e.target.value }))}
                            placeholder="Partagez votre réflexion..."
                            rows={3}
                            className="w-full p-3 rounded-xl resize-none"
                            style={{
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              background: 'white',
                              border: '1px solid var(--border)',
                              outline: 'none',
                            }}
                          />
                          <div className="flex justify-end mt-2">
                            <ButtonEnhanced
                              variant="primary"
                              size="sm"
                              icon={<Send className="w-3 h-3" />}
                              iconPosition="right"
                              onClick={() => handleSubmit(4, 1)}
                            >
                              Enregistrer
                            </ButtonEnhanced>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bubble 2 - Décalée à droite */}
                    <div className="flex justify-end">
                      <div>
                        <div 
                          className="inline-block px-6 py-4 rounded-full cursor-pointer transition-all duration-300"
                          style={{
                            background: 'linear-gradient(135deg, var(--secondary), rgba(237, 132, 58, 0.85))',
                            boxShadow: '0 4px 20px rgba(237, 132, 58, 0.15)',
                          }}
                          onClick={() => setActivePrompt4(activePrompt4 === 2 ? null : 2)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(237, 132, 58, 0.25)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(237, 132, 58, 0.15)';
                          }}
                        >
                          <p style={{ 
                            fontSize: 'var(--text-base)',
                            color: 'white',
                            fontWeight: 'var(--font-weight-medium)',
                          }}>
                            ✨ Quelle découverte avez-vous faite cette semaine ?
                          </p>
                        </div>
                        
                        {activePrompt4 === 2 && (
                          <div className="mt-3 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                            <textarea
                              value={journalInputs4[2] || ''}
                              onChange={(e) => setJournalInputs4(prev => ({ ...prev, 2: e.target.value }))}
                              placeholder="Partagez votre découverte..."
                              rows={3}
                              className="w-full p-3 rounded-xl resize-none"
                              style={{
                                fontSize: 'var(--text-base)',
                                color: 'var(--foreground)',
                                background: 'white',
                                border: '1px solid var(--border)',
                                outline: 'none',
                              }}
                            />
                            <div className="flex justify-end mt-2">
                              <ButtonEnhanced
                                variant="secondary"
                                size="sm"
                                icon={<Send className="w-3 h-3" />}
                                iconPosition="right"
                                onClick={() => handleSubmit(4, 2)}
                              >
                                Enregistrer
                              </ButtonEnhanced>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bubble 3 - Retour à gauche */}
                    <div>
                      <div 
                        className="inline-block px-6 py-4 rounded-full cursor-pointer transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.15), rgba(248, 176, 68, 0.08))',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1.5px solid rgba(248, 176, 68, 0.3)',
                          boxShadow: '0 4px 20px rgba(248, 176, 68, 0.12)',
                        }}
                        onClick={() => setActivePrompt4(activePrompt4 === 3 ? null : 3)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(248, 176, 68, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(248, 176, 68, 0.12)';
                        }}
                      >
                        <p style={{ 
                          fontSize: 'var(--text-base)',
                          color: 'var(--foreground)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}>
                          🎯 Comment allez-vous mettre en pratique ce que vous avez appris ?
                        </p>
                      </div>
                      
                      {activePrompt4 === 3 && (
                        <div className="mt-3 p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                          <textarea
                            value={journalInputs4[3] || ''}
                            onChange={(e) => setJournalInputs4(prev => ({ ...prev, 3: e.target.value }))}
                            placeholder="Définissez vos actions..."
                            rows={3}
                            className="w-full p-3 rounded-xl resize-none"
                            style={{
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              background: 'white',
                              border: '1px solid var(--border)',
                              outline: 'none',
                            }}
                          />
                          <div className="flex justify-end mt-2">
                            <ButtonEnhanced
                              variant="accent"
                              size="sm"
                              icon={<Send className="w-3 h-3" />}
                              iconPosition="right"
                              onClick={() => handleSubmit(4, 3)}
                            >
                              Enregistrer
                            </ButtonEnhanced>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Info */}
            <div 
              className="mt-16 p-6 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1), rgba(248, 176, 68, 0.1))',
                border: '1px solid rgba(85, 161, 180, 0.2)',
              }}
            >
              <p style={{ 
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
                fontWeight: 'var(--font-weight-medium)',
              }}>
                💡 La <strong>Suggestion 4</strong> est actuellement active dans le Dashboard
              </p>
              <p 
                className="mt-2"
                style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Testez chaque design pour voir celui qui encourage le plus l'écriture de journal
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
