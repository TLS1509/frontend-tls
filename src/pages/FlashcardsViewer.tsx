/**
 * FlashcardsViewer Page
 *
 * Interactive flashcard carousel for spaced repetition learning.
 * Features:
 * - Card flip animation (front/back)
 * - Progress tracking
 * - Navigation between cards
 * - Difficulty marking
 *
 * Uses TLS design system components and tokens.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { X, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, RotateCw, Clock } from 'lucide-react';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    front: 'Qu\'est-ce que la motivation intrinsèque?',
    back: 'La motivation intrinsèque est la capacité à agir motivé par des récompenses internes (intérêt, satisfaction) plutôt que externes (argent, punition).',
    difficulty: 'easy',
  },
  {
    id: 2,
    front: 'Quels sont les 3 besoins fondamentaux de la SDT?',
    back: 'Autonomie, Compétence, et Relatedness (sentiment d\'appartenance). Ces trois besoins sont essentiels pour nourrir la motivation intrinsèque.',
    difficulty: 'medium',
  },
  {
    id: 3,
    front: 'Quel est le modèle SCARF?',
    back: 'SCARF est un modèle de neurosciences sociales identifiant 5 facteurs d\'engagement: Status, Certainty, Autonomy, Relatedness, Fairness.',
    difficulty: 'hard',
  },
  {
    id: 4,
    front: 'Comment créer des conditions favorisant l\'autonomie?',
    back: 'Offrir des choix, clarifier les objectifs, réduire le micromanagement, et valoriser l\'initiative personnelle des collaborateurs.',
    difficulty: 'medium',
  },
];

export const FlashcardsViewer: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [marked, setMarked] = useState<Set<number>>(new Set());

  const currentCard = FLASHCARDS[currentIndex];
  const isMarked = marked.has(currentCard.id);

  const handleNext = () => {
    if (currentIndex < FLASHCARDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMark = (difficulty: 'easy' | 'medium' | 'hard') => {
    const newMarked = new Set(marked);
    if (isMarked) {
      newMarked.delete(currentCard.id);
    } else {
      newMarked.add(currentCard.id);
    }
    setMarked(newMarked);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const progress = ((currentIndex + 1) / FLASHCARDS.length) * 100;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        padding: 'var(--s-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--s-6)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 var(--s-2) 0', fontSize: 'var(--t-h2)', fontWeight: 600 }}>Flashcards: Motivation et Engagement</h1>
          <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>Révision par répétition espacée</p>
        </div>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <X size={20} />
        </Button>
      </div>

      {/* Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
          <span>Carte {currentIndex + 1} sur {FLASHCARDS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          style={{
            height: 8,
            background: 'var(--surface-muted)',
            borderRadius: 'var(--r-full)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--tls-primary-500)',
              transition: 'width var(--dur-3)',
            }}
          />
        </div>
      </div>

      {/* Main Flashcard */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            width: '100%',
            maxWidth: 600,
            aspectRatio: '16 / 9',
            background: isFlipped ? 'var(--tls-orange-50)' : 'var(--tls-primary-50)',
            border: `2px solid ${isFlipped ? 'var(--tls-orange-200)' : 'var(--tls-primary-200)'}`,
            borderRadius: 'var(--r-2xl)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--s-6)',
            cursor: 'pointer',
            transition: 'all var(--dur-2)',
            position: 'relative',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-lg)';
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-sm)';
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          }}
        >
          <div style={{ position: 'absolute', top: 'var(--s-3)', left: 'var(--s-3)' }}>
            <Badge variant={isFlipped ? 'warm' : 'brand'}>{isFlipped ? 'Réponse' : 'Question'}</Badge>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 'var(--t-h4)',
              fontWeight: 600,
              color: 'var(--text)',
              lineHeight: 1.6,
            }}
          >
            {isFlipped ? currentCard.back : currentCard.front}
          </p>

          <p
            style={{
              position: 'absolute',
              bottom: 'var(--s-3)',
              right: 'var(--s-3)',
              margin: 0,
              fontSize: 'var(--t-caption)',
              color: 'var(--text-muted)',
            }}
          >
            <RotateCw size={14} style={{ display: 'inline', marginRight: 'var(--s-1)' }} />
            Cliquez pour retourner
          </p>
        </div>
      </div>

      {/* Card Metadata */}
      {currentCard.difficulty && (
        <div style={{ textAlign: 'center' }}>
          <MetaPill
            icon={<Clock size={12} />}
            text={
              currentCard.difficulty === 'easy'
                ? 'Facile'
                : currentCard.difficulty === 'medium'
                  ? 'Moyen'
                  : 'Difficile'
            }
            tone={currentCard.difficulty === 'easy' ? 'sun' : currentCard.difficulty === 'medium' ? 'warm' : 'brand'}
            size="sm"
          />
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 'var(--s-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="ghost"
          onClick={() => handleMark('easy')}
          style={{
            color: isMarked ? 'var(--tls-primary-500)' : 'var(--text-muted)',
            borderColor: isMarked ? 'var(--tls-primary-500)' : 'var(--border-subtle)',
          }}
        >
          <ThumbsUp size={16} />
          Je maîtrise
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleMark('hard')}
          style={{
            color: isMarked ? 'var(--tls-orange-500)' : 'var(--text-muted)',
            borderColor: isMarked ? 'var(--tls-orange-500)' : 'var(--border-subtle)',
          }}
        >
          <ThumbsDown size={16} />
          À revoir
        </Button>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 'var(--s-3)', justifyContent: 'center' }}>
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            opacity: currentIndex === 0 ? 0.5 : 1,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronLeft size={16} /> Précédent
        </Button>

        <Button variant="secondary" onClick={handleReset}>
          <RotateCw size={16} /> Recommencer
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentIndex === FLASHCARDS.length - 1}
          style={{
            opacity: currentIndex === FLASHCARDS.length - 1 ? 0.5 : 1,
            cursor: currentIndex === FLASHCARDS.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Suivant <ChevronRight size={16} />
        </Button>
      </div>

      {/* Completion Message */}
      {currentIndex === FLASHCARDS.length - 1 && (
        <Card style={{ background: 'var(--tls-primary-50)', border: '1px solid var(--tls-primary-200)' }}>
          <div style={{ textAlign: 'center', padding: 'var(--s-4)' }}>
            <p style={{ margin: '0 0 var(--s-2) 0', fontSize: 'var(--t-body)', fontWeight: 600 }}>
              🎉 Vous avez atteint la dernière carte!
            </p>
            <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>
              Recommencez pour consolider vos connaissances.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FlashcardsViewer;
