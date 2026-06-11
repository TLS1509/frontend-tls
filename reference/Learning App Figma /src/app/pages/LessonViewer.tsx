import { useState } from 'react';
import { 
  X,
  CheckCircle2,
  Sparkles,
  Target,
  Search,
  HelpCircle,
  Lightbulb,
  Zap,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Clock,
  BookOpen,
} from 'lucide-react';
import { Button } from '../components/ui/button';

interface LessonViewerProps {
  lessonId?: number;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

// Sections avec sous-pages (slides)
const lessonSections = [
  { 
    id: 'introduction', 
    title: 'Introduction', 
    icon: BookOpen,
    totalSlides: 1,
  },
  { 
    id: 'engagement', 
    title: 'Engagement', 
    icon: Target,
    totalSlides: 1,
  },
  { 
    id: 'decouvrir', 
    title: 'Découvrir', 
    icon: Search,
    totalSlides: 3, // 3 pages pour Découvrir !
  },
  { 
    id: 'quiz', 
    title: 'Quiz', 
    icon: HelpCircle,
    totalSlides: 1,
  },
  { 
    id: 'reflechir', 
    title: 'Réfléchir', 
    icon: Lightbulb,
    totalSlides: 1,
  },
  { 
    id: 'appliquer', 
    title: 'Appliquer', 
    icon: Zap,
    totalSlides: 1,
  },
  { 
    id: 'conclusion', 
    title: 'Conclusion', 
    icon: GraduationCap,
    totalSlides: 1,
  },
];

export default function LessonViewer({ 
  lessonId = 1,
  onNavigate,
  onLogout,
}: LessonViewerProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set([0, 1]));
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [reflectionAnswers, setReflectionAnswers] = useState<{ [key: string]: string }>({
    q1: '',
    q2: '',
    q3: '',
  });
  const [actionPlan, setActionPlan] = useState({
    objectif: '',
    action1: '',
    action2: '',
    action3: '',
  });

  const currentSection = lessonSections[currentSectionIndex];
  const isLastSection = currentSectionIndex === lessonSections.length - 1;
  const isFirstSection = currentSectionIndex === 0;

  const handleNext = () => {
    if (!isLastSection) {
      setCompletedSections(prev => new Set(prev).add(currentSectionIndex));
      setCurrentSectionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (!isFirstSection) {
      setCurrentSectionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSectionClick = (index: number) => {
    setCurrentSectionIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    onNavigate('course-detail');
  };

  const renderContent = () => {
    switch (currentSection.id) {
      case 'introduction':
        return (
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-display)',
            }}>
              Bienvenue dans cette leçon
            </h2>
            <p style={{ 
              fontSize: 'var(--text-lg)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-6)',
            }}>
              Cette leçon vous guidera à travers les concepts fondamentaux du marketing digital. 
              Vous découvrirez les piliers essentiels et comment les mettre en pratique efficacement.
            </p>
            
            <div style={{ marginTop: 'var(--space-12)' }}>
              <h3 style={{ 
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}>
                <Target style={{ width: '1.5rem', height: '1.5rem', color: 'var(--primary)' }} />
                Objectifs d'apprentissage
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[
                  'Comprendre les 4 piliers du marketing digital',
                  'Identifier les stratégies efficaces',
                  'Éviter les erreurs courantes',
                  'Mettre en place un plan d\'action concret'
                ].map((objective, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-4)',
                      background: 'var(--neutral-50)',
                      borderRadius: 'var(--radius-lg)',
                    }}
                  >
                    <CheckCircle2 style={{ width: '1.25rem', height: '1.25rem', color: 'var(--success)', flexShrink: 0 }} />
                    <span style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                      {objective}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'engagement':
        return (
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-display)',
            }}>
              Les 4 piliers du marketing digital
            </h2>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}>
              {[
                {
                  icon: '🔍',
                  title: 'SEO & SEM',
                  description: 'Optimisation pour les moteurs de recherche et publicité payante',
                  tags: ['Google Ads', 'SEO on-page', 'Link building'],
                  color: 'var(--primary)',
                },
                {
                  icon: '📝',
                  title: 'Content Marketing',
                  description: 'Créer du contenu de valeur pour attirer et engager',
                  tags: ['Blog posts', 'vidéos', 'infographies', 'podcasts'],
                  color: 'var(--accent)',
                },
                {
                  icon: '📱',
                  title: 'Social Media',
                  description: 'Construire une communauté sur les réseaux sociaux',
                  tags: ['LinkedIn', 'Facebook', 'Instagram', 'TikTok'],
                  color: 'var(--secondary)',
                },
                {
                  icon: '📧',
                  title: 'Email Marketing',
                  description: 'Nurturer les leads et fidéliser les clients',
                  tags: ['Newsletters', 'séquences automatisées', 'nurturing'],
                  color: 'var(--primary)',
                },
              ].map((pillar, index) => (
                <div 
                  key={index}
                  style={{
                    background: 'var(--neutral-50)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-6)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ 
                    fontSize: '2.5rem',
                    marginBottom: 'var(--space-4)',
                  }}>
                    {pillar.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-3)',
                  }}>
                    {pillar.title}
                  </h3>
                  <p style={{ 
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    marginBottom: 'var(--space-4)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}>
                    {pillar.description}
                  </p>
                  <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2)',
                  }}>
                    {pillar.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        style={{
                          fontSize: 'var(--text-xs)',
                          padding: 'var(--space-1) var(--space-3)',
                          background: `${pillar.color}15`,
                          color: pillar.color,
                          borderRadius: 'var(--radius-md)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'decouvrir':
        return (
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-display)',
            }}>
              Exemples concrets de stratégies
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Stratégie à éviter */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.05)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                border: '2px solid rgba(239, 68, 68, 0.2)',
              }}>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <span style={{
                    background: 'var(--destructive)',
                    color: 'white',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-bold)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                  }}>
                    <X style={{ width: '1rem', height: '1rem' }} />
                    À éviter
                  </span>
                </div>
                
                <h3 style={{ 
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Stratégie basique (inefficace)
                </h3>
                
                <p style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  marginBottom: 'var(--space-6)',
                }}>
                  Publier sur les réseaux sociaux de temps en temps, sans plan ni objectifs clairs
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {[
                    'Pas de stratégie définie',
                    'Aucun tracking des résultats',
                    'Contenu aléatoire'
                  ].map((point, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stratégie recommandée */}
              <div style={{
                background: 'rgba(34, 197, 94, 0.05)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                border: '2px solid rgba(34, 197, 94, 0.2)',
              }}>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <span style={{
                    background: 'var(--success)',
                    color: 'white',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-bold)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                  }}>
                    <CheckCircle2 style={{ width: '1rem', height: '1rem' }} />
                    Recommandé
                  </span>
                </div>
                
                <h3 style={{ 
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Stratégie optimisée (efficace)
                </h3>
                
                <p style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  marginBottom: 'var(--space-6)',
                }}>
                  Plan de contenu mensuel aligné avec les objectifs business, tracking des KPIs, A/B testing régulier, et optimisation continue basée sur les données
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {[
                    'Objectifs clairs',
                    'Mesure du ROI',
                    'Optimisation continue',
                    'Résultats tangibles'
                  ].map((point, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                      }}
                    >
                      <CheckCircle2 style={{ width: '1.25rem', height: '1.25rem', color: 'var(--success)' }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-display)',
            }}>
              Testez vos connaissances
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {/* Question 1 */}
              <div style={{
                background: 'var(--neutral-50)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
              }}>
                <h3 style={{ 
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-6)',
                }}>
                  Question 1 : Quel est l'objectif principal du SEO ?
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {[
                    { id: 'q1a', label: 'A. Augmenter le trafic payant' },
                    { id: 'q1b', label: 'B. Améliorer le positionnement organique' },
                    { id: 'q1c', label: 'C. Créer des publicités' },
                    { id: 'q1d', label: 'D. Envoyer des emails' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, q1: option.id })}
                      style={{
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        background: selectedAnswers.q1 === option.id ? 'white' : 'white',
                        border: selectedAnswers.q1 === option.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div style={{
                background: 'var(--neutral-50)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
              }}>
                <h3 style={{ 
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-6)',
                }}>
                  Question 2 : Quelle métrique mesure le retour sur investissement ?
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {[
                    { id: 'q2a', label: 'A. Le nombre de likes' },
                    { id: 'q2b', label: 'B. Le taux d\'ouverture' },
                    { id: 'q2c', label: 'C. Le ROI' },
                    { id: 'q2d', label: 'D. Le nombre de followers' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, q2: option.id })}
                      style={{
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        background: selectedAnswers.q2 === option.id ? 'white' : 'white',
                        border: selectedAnswers.q2 === option.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'reflechir':
        return (
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-display)',
            }}>
              Analysez votre propre stratégie
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {[
                { id: 'q1', question: 'Quels canaux digitaux utilisez-vous actuellement ?' },
                { id: 'q2', question: 'Comment mesurez-vous vos résultats ?' },
                { id: 'q3', question: 'Quels sont vos principaux défis en marketing digital ?' },
              ].map((item) => (
                <div 
                  key={item.id}
                  style={{
                    background: 'var(--neutral-50)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-6)',
                  }}
                >
                  <h3 style={{ 
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-4)',
                  }}>
                    {item.question}
                  </h3>

                  <div style={{ position: 'relative' }}>
                    <textarea
                      value={reflectionAnswers[item.id as keyof typeof reflectionAnswers]}
                      onChange={(e) => setReflectionAnswers({ 
                        ...reflectionAnswers, 
                        [item.id]: e.target.value 
                      })}
                      placeholder="Écrivez votre réflexion ici..."
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                        resize: 'vertical',
                        fontFamily: 'var(--font-body)',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 'var(--space-3)',
                      right: 'var(--space-3)',
                      color: 'var(--muted-foreground)',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'appliquer':
        return (
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-display)',
            }}>
              Créez votre plan d'action
            </h2>

            {/* Instruction card */}
            <div style={{
              background: 'rgba(85, 161, 180, 0.1)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-8)',
              border: '1px solid rgba(85, 161, 180, 0.2)',
            }}>
              <p style={{ 
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
                lineHeight: 'var(--leading-relaxed)',
              }}>
                Définissez un objectif marketing SMART et identifiez 3 actions concrètes pour l'atteindre.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Objectif */}
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-3)',
                }}>
                  Objectif
                </label>
                <input
                  type="text"
                  value={actionPlan.objectif}
                  onChange={(e) => setActionPlan({ ...actionPlan, objectif: e.target.value })}
                  placeholder="Ex: Augmenter le trafic web de 30% en 3 mois"
                  style={{
                    width: '100%',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              {/* Action 1 */}
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-3)',
                }}>
                  Action1
                </label>
                <input
                  type="text"
                  value={actionPlan.action1}
                  onChange={(e) => setActionPlan({ ...actionPlan, action1: e.target.value })}
                  placeholder="Ex: Publier 2 articles de blog par semaine"
                  style={{
                    width: '100%',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              {/* Action 2 */}
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-3)',
                }}>
                  Action2
                </label>
                <input
                  type="text"
                  value={actionPlan.action2}
                  onChange={(e) => setActionPlan({ ...actionPlan, action2: e.target.value })}
                  placeholder="Ex: Lancer une campagne Google Ads"
                  style={{
                    width: '100%',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              {/* Action 3 */}
              <div>
                <label style={{ 
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-3)',
                }}>
                  Action3
                </label>
                <input
                  type="text"
                  value={actionPlan.action3}
                  onChange={(e) => setActionPlan({ ...actionPlan, action3: e.target.value })}
                  placeholder="Ex: Optimiser le SEO on-page"
                  style={{
                    width: '100%',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-display)',
            }}>
              Récapitulatif et prochaines étapes
            </h2>

            <div style={{ marginBottom: 'var(--space-10)' }}>
              <h3 style={{ 
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-5)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}>
                🎯 Points clés à retenir
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[
                  'Le marketing digital repose sur 4 piliers complémentaires',
                  'Une stratégie claire et mesurable est essentielle',
                  'L\'optimisation continue basée sur les données est la clé du succès',
                  'Chaque canal a ses spécificités et objectifs'
                ].map((point, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-4)',
                      background: 'var(--neutral-50)',
                      borderRadius: 'var(--radius-lg)',
                    }}
                  >
                    <div style={{
                      width: '1.75rem',
                      height: '1.75rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--success)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'var(--font-weight-bold)',
                      fontSize: 'var(--text-sm)',
                      flexShrink: 0,
                    }}>
                      {index + 1}
                    </div>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ 
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-5)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}>
                🚀 Prochaines étapes
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[
                  'Auditez votre présence digitale actuelle',
                  'Définissez vos objectifs SMART pour les 3 prochains mois',
                  'Choisissez 2 canaux prioritaires et créez un plan d\'action'
                ].map((step, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-4)',
                      background: 'white',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  >
                    <ChevronRight style={{ width: '1.25rem', height: '1.25rem', color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2 style={{ 
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-display)',
            }}>
              {currentSection.title}
            </h2>
            <p style={{ 
              fontSize: 'var(--text-lg)',
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--leading-relaxed)',
            }}>
              Contenu de la section en cours de développement...
            </p>
          </div>
        );
    }
  };

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.98)', // Opaque white background
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)', // Safari support
        zIndex: 9999,
        overflow: 'auto',
      }}
    >
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--space-0)',
      }}>
        {/* ========== HEADER LIKE FIGMA ========== */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '0.556px solid rgba(0, 0, 0, 0.1)',
          padding: '24px 40px',
        }}>
          {/* Title + Duration */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
            <h1 style={{ 
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#55A1B4',
              fontFamily: 'var(--font-display)',
              lineHeight: '45px',
              letterSpacing: '0.4px',
            }}>
              Les Fondamentaux du Marketing Digital
            </h1>
            
            {/* Duration */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Clock style={{ width: '16px', height: '16px', color: '#6B7280' }} />
              <span style={{
                fontSize: '14px',
                color: '#6B7280',
                fontFamily: 'var(--font-body)',
                letterSpacing: '-0.15px',
              }}>
                45 min
              </span>
            </div>
          </div>

          {/* Progress bar with GLOW */}
          <div style={{ 
            height: '8px',
            background: '#E0E8EA',
            borderRadius: '9999px',
            overflow: 'visible',
            position: 'relative',
          }}>
            <div style={{ 
              height: '8px',
              width: `${((currentSectionIndex + 1) / lessonSections.length) * 100}%`,
              background: '#55A1B4',
              borderRadius: '9999px',
              boxShadow: '0px 0px 20px 0px #55A1B4',
              transition: 'width 0.3s ease',
              position: 'absolute',
              top: 0,
              left: 0,
            }} />
          </div>
        </div>

        {/* ========== NAVIGATION BUTTONS LIKE FIGMA ========== */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          padding: '16px 40px 16px 40px',
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}>
            {lessonSections.map((section, index) => {
              const isActive = index === currentSectionIndex;
              const Icon = section.icon;
              
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    borderRadius: '16px',
                    background: isActive ? '#55A1B4' : '#EEF6F8',
                    border: 'none',
                    color: isActive ? 'white' : '#252B37',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    fontWeight: isActive ? 'bold' : '500',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '-0.15px',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    boxShadow: isActive ? '0px 8px 24px 0px rgba(0, 0, 0, 0.15)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#D9EDF2';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#EEF6F8';
                    }
                  }}
                >
                  {/* Icon */}
                  <Icon style={{ width: '16px', height: '16px' }} />
                  
                  {/* Title */}
                  <span>{section.title}</span>
                  
                  {/* Check circle icon ONLY for active button */}
                  {isActive && (
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: '2px solid white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'white',
                      }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Close button - floating top right */}
        <button 
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: '24px',
            right: '40px',
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            color: 'var(--muted-foreground)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = 'var(--foreground)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.color = 'var(--muted-foreground)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X style={{ width: '20px', height: '20px' }} />
        </button>

        {/* Content Card */}
        <div style={{
          padding: 'var(--space-12) var(--space-8)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-16)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            marginBottom: 'var(--space-8)',
            minHeight: '500px',
            maxWidth: '900px',
            width: '100%',
          }}>
            {renderContent()}
          </div>
        </div>

        {/* Navigation Bottom */}
        <div style={{
          padding: '0 var(--space-8) var(--space-12)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
            maxWidth: '900px',
            width: '100%',
          }}>
            <button
              onClick={handlePrevious}
              disabled={isFirstSection}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3) var(--space-5)',
                borderRadius: 'var(--radius-lg)',
                background: 'transparent',
                border: 'none',
                color: isFirstSection ? 'var(--neutral-300)' : 'var(--muted-foreground)',
                cursor: isFirstSection ? 'not-allowed' : 'pointer',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              <ChevronLeft style={{ width: '1.25rem', height: '1.25rem' }} />
              Précédent
            </button>

            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {lessonSections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSectionClick(index)}
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: index === currentSectionIndex ? 'var(--primary)' : 'var(--neutral-100)',
                    color: index === currentSectionIndex ? 'white' : 'var(--muted-foreground)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    transition: 'all 0.2s',
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {isLastSection ? (
              <button
                onClick={handleClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--success)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                <CheckCircle2 style={{ width: '1.25rem', height: '1.25rem' }} />
                Terminer
              </button>
            ) : (
              <button
                onClick={handleNext}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--primary)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                Suivant
                <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}