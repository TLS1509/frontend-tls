import { useState } from 'react';
import { Send, BookMarked, PenLine, Lightbulb, Target } from 'lucide-react';
import { ButtonEnhanced } from '../ui/button-enhanced';

interface JournalPromptCardsProps {
  onSubmit: (promptId: number, question: string) => void;
}

export function JournalPromptCards({ onSubmit }: JournalPromptCardsProps) {
  const [activePrompt, setActivePrompt] = useState<number | null>(null);
  const [journalInputs, setJournalInputs] = useState<{ [key: number]: string }>({});

  const handleSubmit = (promptId: number, question: string) => {
    if (journalInputs[promptId]?.trim()) {
      onSubmit(promptId, question);
      setJournalInputs(prev => ({ ...prev, [promptId]: '' }));
      setActivePrompt(null);
    }
  };

  const prompts = [
    {
      id: 1,
      title: "Réflexion du jour",
      question: "Qu'est-ce qui vous a marqué aujourd'hui ?",
      icon: PenLine,
      color: 'var(--primary)',
      colorRgb: '85, 161, 180',
      variant: 'primary' as const,
    },
    {
      id: 2,
      title: "Découverte",
      question: "Quelle découverte avez-vous faite cette semaine ?",
      icon: Lightbulb,
      color: 'var(--accent)',
      colorRgb: '248, 176, 68',
      variant: 'accent' as const,
    },
    {
      id: 3,
      title: "Plan d'action",
      question: "Comment allez-vous mettre en pratique ce que vous avez appris ?",
      icon: Target,
      color: 'var(--secondary)',
      colorRgb: '237, 132, 58',
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="mb-12">
      <div className="mb-8">
        <h2 
          className="mb-2 flex items-center gap-2"
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
          }}
        >
          <BookMarked className="w-6 h-6" style={{ color: 'var(--primary)' }} />
          Journal de bord
        </h2>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)',
          lineHeight: 'var(--leading-relaxed)',
        }}>
          Capturez vos réflexions et insights du moment. Choisissez un prompt pour commencer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {prompts.map((prompt) => {
          const Icon = prompt.icon;
          const isActive = activePrompt === prompt.id;
          
          return (
            <div key={prompt.id} className="flex flex-col gap-4">
              {/* Question Message - Left aligned like incoming message */}
              <div className="flex items-start gap-3">
                {/* Icon Avatar */}
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${prompt.color}, rgba(${prompt.colorRgb}, 0.8))`,
                    boxShadow: `0 4px 12px rgba(${prompt.colorRgb}, 0.3)`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'white' }} />
                </div>

                {/* Question Bubble */}
                <div className="flex-1">
                  <div 
                    className="px-5 py-4"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '20px 20px 20px 4px',
                      border: `2px solid rgba(${prompt.colorRgb}, 0.2)`,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <p 
                      className="mb-1"
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: prompt.color,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {prompt.title}
                    </p>
                    <p 
                      style={{ 
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--leading-relaxed)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {prompt.question}
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Area - Right aligned like outgoing message */}
              <div className="flex justify-end">
                <div className="max-w-full">
                  {!isActive ? (
                    /* Collapsed: Click to respond */
                    <button
                      onClick={() => setActivePrompt(prompt.id)}
                      className="group px-6 py-3 transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: `linear-gradient(135deg, ${prompt.color}, rgba(${prompt.colorRgb}, 0.9))`,
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '20px 20px 4px 20px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: `0 4px 16px rgba(${prompt.colorRgb}, 0.3)`,
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                          fontFamily: 'var(--font-body)',
                        }}>
                          Répondre
                        </span>
                        <Send className="w-4 h-4" />
                      </div>
                    </button>
                  ) : (
                    /* Expanded: Text input */
                    <div 
                      className="w-full p-5 transition-all duration-300"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '20px 20px 4px 20px',
                        border: `2px solid ${prompt.color}`,
                        boxShadow: `0 8px 24px rgba(${prompt.colorRgb}, 0.2)`,
                      }}
                    >
                      <textarea
                        value={journalInputs[prompt.id] || ''}
                        onChange={(e) => setJournalInputs(prev => ({ ...prev, [prompt.id]: e.target.value }))}
                        placeholder="Écrivez votre réponse..."
                        rows={4}
                        autoFocus
                        className="w-full p-4 rounded-2xl resize-none mb-3"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-base)',
                          color: 'var(--foreground)',
                          background: 'white',
                          border: '1px solid var(--border)',
                          outline: 'none',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = prompt.color;
                          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(${prompt.colorRgb}, 0.1)`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                      <div className="flex items-center justify-between gap-3">
                        <button
                          onClick={() => setActivePrompt(null)}
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                            fontFamily: 'var(--font-body)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px 16px',
                          }}
                        >
                          Annuler
                        </button>
                        <ButtonEnhanced
                          variant={prompt.variant}
                          size="md"
                          icon={<Send className="w-4 h-4" />}
                          iconPosition="right"
                          onClick={() => handleSubmit(prompt.id, prompt.question)}
                          disabled={!journalInputs[prompt.id]?.trim()}
                        >
                          Enregistrer
                        </ButtonEnhanced>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
