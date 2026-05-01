import { 
  X, 
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  RotateCw,
} from 'lucide-react';
import { useState } from 'react';

interface FlashcardsViewerProps {
  contentId: number;
  onClose: () => void;
}

interface FlashcardData {
  id: number;
  title: string;
  cards: {
    id: number;
    front: {
      title: string;
      category: string;
      icon: string;
      image: string;
    };
    back: {
      content: string;
      details?: string;
    };
  }[];
}

const getFlashcardData = (id: number): FlashcardData => {
  return {
    id,
    title: 'Flashcards d\'apprentissage',
    cards: [
      {
        id: 1,
        front: {
          title: 'Raccourcis Clavier Essentiels',
          category: 'PRODUCTIVITÉ',
          icon: '⚡',
          image: 'https://images.unsplash.com/photo-1647073069959-1a3f91c7564d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXlib2FyZCUyMHNob3J0Y3V0cyUyMHByb2R1Y3Rpdml0eXxlbnwxfHx8fDE3Njc4OTQ3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        back: {
          content: 'Ctrl+Shift+P : Ouvrir la palette de commandes • Ctrl+K : Recherche rapide • Alt+Tab : Naviguer entre fenêtres',
          details: 'Maîtriser ces raccourcis vous fera gagner des heures chaque semaine.',
        },
      },
      {
        id: 2,
        front: {
          title: 'Les 4 Piliers du Prompt',
          category: 'PROMPT ENGINEERING',
          icon: '🎯',
          image: 'https://images.unsplash.com/photo-1737641624486-7846df8528dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tcHQlMjBlbmdpbmVlcmluZyUyMGFpfGVufDF8fHx8MTc2Nzg5NzQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        back: {
          content: 'RÔLE - CONTEXTE - INSTRUCTION - FORMAT',
          details: 'Ces 4 éléments permettent de structurer un prompt clair et précis pour obtenir les meilleurs résultats de l\'IA.',
        },
      },
      {
        id: 3,
        front: {
          title: 'Organisation de Fichiers',
          category: 'ORGANISATION',
          icon: '📁',
          image: 'https://images.unsplash.com/photo-1763148306166-237bb366556c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxlJTIwb3JnYW5pemF0aW9uJTIwZm9sZGVyc3xlbnwxfHx8fDE3Njc4OTc0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        back: {
          content: 'Utilisez une nomenclature cohérente : YYYY-MM-DD_Projet_Version',
          details: 'Une bonne organisation vous fait gagner 30% de temps sur la recherche de documents.',
        },
      },
      {
        id: 4,
        front: {
          title: 'Few-Shot Learning',
          category: 'IA & APPRENTISSAGE',
          icon: '🧠',
          image: 'https://images.unsplash.com/photo-1748194449456-a6a59f63dcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBicmFpbnxlbnwxfHx8fDE3Njc4OTc0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        back: {
          content: 'Donnez 2-3 exemples à l\'IA avant votre vraie question pour de meilleurs résultats.',
          details: 'Cette technique améliore la précision des réponses de 40% en moyenne.',
        },
      },
      {
        id: 5,
        front: {
          title: 'Itération de Prompts',
          category: 'OPTIMISATION',
          icon: '🔄',
          image: 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcHRpbWl6YXRpb24lMjBpdGVyYXRpb24lMjBwcm9jZXNzfGVufDF8fHx8MTc2Nzg5NzQ2NHww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        back: {
          content: 'Testez → Analysez → Affinez → Répétez',
          details: 'L\'itération est la clé pour obtenir des prompts parfaits. Chaque version améliore le résultat.',
        },
      },
    ],
  };
};

export default function FlashcardsViewer({ 
  contentId, 
  onClose 
}: FlashcardsViewerProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);

  const data = getFlashcardData(contentId);
  const currentCard = data.cards[currentCardIndex];
  const progress = ((completedCards.length) / data.cards.length) * 100;

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
    setTimeout(() => {
      if (currentCardIndex < data.cards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1);
      }
    }, isFlipped ? 300 : 0);
  };

  const handlePreviousCard = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
    setTimeout(() => {
      if (currentCardIndex > 0) {
        setCurrentCardIndex((prev) => prev - 1);
      }
    }, isFlipped ? 300 : 0);
  };

  const handleMarkAsUnderstood = () => {
    if (!completedCards.includes(currentCardIndex)) {
      setCompletedCards([...completedCards, currentCardIndex]);
    }
    if (currentCardIndex < data.cards.length - 1) {
      handleNextCard();
    }
  };

  const handleCardThumbnailClick = (index: number) => {
    setIsFlipped(false);
    setTimeout(() => setCurrentCardIndex(index), 300);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ 
        background: 'linear-gradient(176deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)',
      }}
    >
      <div className="min-h-screen py-6 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Close button */}
          <div className="mb-4 flex justify-end">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <X className="w-6 h-6" style={{ color: 'var(--muted-foreground)' }} />
            </button>
          </div>

          {/* Progress Card */}
          <div 
            className="p-4 rounded-2xl mb-4"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '3px solid var(--primary)',
              boxShadow: '0 8px 32px rgba(85, 161, 180, 0.15)',
            }}
          >
            {/* Header with icon and counter */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                  }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    💡 {data.title}
                  </h2>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {completedCards.length} / {data.cards.length} comprises
                  </p>
                </div>
              </div>
              <div 
                style={{ 
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                }}
              >
                {currentCardIndex + 1} / {data.cards.length}
              </div>
            </div>

            {/* Progress bar */}
            <div 
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'var(--neutral-200)' }}
            >
              <div 
                className="h-full transition-all duration-500"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
                }}
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mb-4 justify-center">
            {data.cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardThumbnailClick(index)}
                className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  border: index === currentCardIndex 
                    ? '3px solid var(--primary)' 
                    : '2px solid rgba(0, 0, 0, 0.1)',
                  opacity: index === currentCardIndex ? 1 : 0.5,
                  transform: index === currentCardIndex ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <img 
                  src={card.front.image} 
                  alt=""
                  className="w-full h-full object-cover"
                />
                {completedCards.includes(index) && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(34, 197, 94, 0.9)' }}
                  >
                    <Check className="w-6 h-6 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Main Flashcard */}
          <div 
            className="relative mb-4"
            style={{ 
              perspective: '1500px',
              height: '380px',
            }}
          >
            <div 
              className="relative w-full h-full transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front of card */}
              <div 
                className="absolute inset-0 rounded-2xl cursor-pointer overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  border: '3px solid var(--primary)',
                  boxShadow: '0 8px 32px rgba(85, 161, 180, 0.2)',
                }}
                onClick={handleFlipCard}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img 
                    src={currentCard.front.image} 
                    alt={currentCard.front.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)',
                    }}
                  />
                </div>

                {/* Content overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(20px)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <span 
                      style={{ 
                        fontSize: '2rem',
                      }}
                    >
                      {currentCard.front.icon}
                    </span>
                  </div>

                  {/* Category badge */}
                  <div 
                    className="px-4 py-1.5 rounded-full mb-4"
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span 
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                        letterSpacing: 'var(--tracking-wide)',
                      }}
                    >
                      {currentCard.front.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 
                    className="text-center mb-6"
                    style={{ 
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'white',
                      fontFamily: 'var(--font-display)',
                      lineHeight: 'var(--leading-tight)',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {currentCard.front.title}
                  </h2>

                  {/* Click hint */}
                  <div 
                    className="px-4 py-2 rounded-full flex items-center gap-2"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <RotateCw className="w-4 h-4 text-white" />
                    <span 
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'white',
                      }}
                    >
                      Cliquez pour voir la réponse
                    </span>
                  </div>
                </div>
              </div>

              {/* Back of card */}
              <div 
                className="absolute inset-0 rounded-2xl cursor-pointer p-8"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                  border: '3px solid var(--primary)',
                  boxShadow: '0 8px 32px rgba(85, 161, 180, 0.2)',
                }}
                onClick={handleFlipCard}
              >
                <div className="flex flex-col justify-center items-center h-full text-white text-center">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(20px)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <span 
                      style={{ 
                        fontSize: '1.75rem',
                      }}
                    >
                      {currentCard.front.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <p 
                    className="mb-4"
                    style={{ 
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      lineHeight: 'var(--leading-relaxed)',
                      maxWidth: '600px',
                    }}
                  >
                    {currentCard.back.content}
                  </p>
                  
                  {currentCard.back.details && (
                    <p 
                      className="opacity-90"
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        lineHeight: 'var(--leading-relaxed)',
                        maxWidth: '500px',
                      }}
                    >
                      {currentCard.back.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mark as understood button (when flipped) */}
          {isFlipped && !completedCards.includes(currentCardIndex) && (
            <div className="mb-4 flex justify-center">
              <button
                onClick={handleMarkAsUnderstood}
                className="px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--success)',
                  color: 'white',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)',
                }}
              >
                <Check className="w-4 h-4" />
                Marquer comme compris
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousCard}
              disabled={currentCardIndex === 0}
              className="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                color: currentCardIndex === 0 ? 'var(--neutral-300)' : 'var(--foreground)',
                opacity: currentCardIndex === 0 ? 0.4 : 1,
                cursor: currentCardIndex === 0 ? 'not-allowed' : 'pointer',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </button>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {data.cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardThumbnailClick(index)}
                  className="transition-all duration-300"
                  style={{
                    width: index === currentCardIndex ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '100px',
                    background: index === currentCardIndex 
                      ? 'var(--primary)' 
                      : 'var(--neutral-300)',
                  }}
                />
              ))}
            </div>

            {currentCardIndex < data.cards.length - 1 ? (
              <button
                onClick={handleNextCard}
                className="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                  color: 'white',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  boxShadow: '0 4px 16px rgba(85, 161, 180, 0.3)',
                }}
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--success)',
                  color: 'white',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)',
                }}
              >
                <Check className="w-4 h-4" />
                Terminer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
