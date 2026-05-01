import { useState } from 'react';
import { X, Send, ThumbsUp, ThumbsDown, Meh, Star } from 'lucide-react';
import { ButtonEnhanced } from '../ui/button-enhanced';
import { useToast } from '../ui/notification-toast';

interface RatingSystemProps {
  type: 'lesson' | 'course' | 'coaching' | 'content';
  itemId: string;
  itemTitle: string;
  onSubmit: (rating: RatingData) => void;
  onClose: () => void;
}

export interface RatingData {
  itemId: string;
  itemType: 'lesson' | 'course' | 'coaching' | 'content';
  npsScore: number | null; // 0-10
  satisfactionScore: number | null; // 1-5 stars
  comment: string;
  wouldRecommend: boolean | null;
  timestamp: Date;
}

// NPS Categories
const getNPSCategory = (score: number): { label: string; color: string; emoji: string } => {
  if (score >= 9) return { label: 'Promoteur', color: 'var(--success-600)', emoji: '😍' };
  if (score >= 7) return { label: 'Passif', color: 'var(--warning-600)', emoji: '😐' };
  return { label: 'Détracteur', color: 'var(--error-600)', emoji: '😞' };
};

export function RatingSystem({ type, itemId, itemTitle, onSubmit, onClose }: RatingSystemProps) {
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [satisfactionScore, setSatisfactionScore] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [step, setStep] = useState<'nps' | 'satisfaction' | 'comment'>('nps');

  const { success } = useToast();

  const handleSubmit = () => {
    if (npsScore === null) return;

    const ratingData: RatingData = {
      itemId,
      itemType: type,
      npsScore,
      satisfactionScore,
      comment: comment.trim(),
      wouldRecommend,
      timestamp: new Date(),
    };

    onSubmit(ratingData);
    success('Merci pour votre retour !', 'Votre évaluation a été enregistrée');
    onClose();
  };

  const canSubmit = npsScore !== null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg p-8 rounded-3xl relative"
        style={{
          background: 'white',
          boxShadow: 'var(--shadow-2xl)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg transition-all hover:bg-opacity-80"
          style={{
            background: 'var(--neutral-100)',
            color: 'var(--foreground)',
          }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
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
            Comment évaluez-vous ce contenu ?
          </h2>
          <p 
            style={{ 
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            {itemTitle}
          </p>
        </div>

        {/* ========== STEP 1: NPS SCORE (0-10) ========== */}
        {step === 'nps' && (
          <div>
            <label 
              className="mb-4 block"
              style={{ 
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Sur une échelle de 0 à 10, quelle est la probabilité que vous recommandiez ce contenu à un collègue ?
            </label>

            {/* NPS Scale */}
            <div className="mb-4">
              <div className="grid grid-cols-11 gap-2">
                {[...Array(11)].map((_, i) => {
                  const isSelected = npsScore === i;
                  const category = getNPSCategory(i);

                  return (
                    <button
                      key={i}
                      onClick={() => setNpsScore(i)}
                      className="aspect-square rounded-xl transition-all duration-300 flex items-center justify-center"
                      style={{
                        background: isSelected ? category.color : 'var(--neutral-100)',
                        color: isSelected ? 'white' : 'var(--foreground)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-bold)',
                        border: `2px solid ${isSelected ? category.color : 'transparent'}`,
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>

              {/* Labels */}
              <div className="flex items-center justify-between mt-3">
                <p 
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Pas probable
                </p>
                <p 
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  10
                </p>
                <p 
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Très probable
                </p>
              </div>
            </div>

            {/* Category indicator */}
            {npsScore !== null && (
              <div 
                className="p-4 rounded-xl mb-6 text-center"
                style={{
                  background: `${getNPSCategory(npsScore).color}15`,
                }}
              >
                <p 
                  style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: getNPSCategory(npsScore).color,
                  }}
                >
                  {getNPSCategory(npsScore).emoji} {getNPSCategory(npsScore).label}
                </p>
              </div>
            )}

            {/* Next button */}
            <div className="flex justify-end gap-3">
              <ButtonEnhanced
                variant="ghost"
                size="md"
                onClick={handleSubmit}
              >
                Passer
              </ButtonEnhanced>
              
              <ButtonEnhanced
                variant="primary"
                size="md"
                onClick={() => setStep('satisfaction')}
                disabled={npsScore === null}
              >
                Continuer
              </ButtonEnhanced>
            </div>
          </div>
        )}

        {/* ========== STEP 2: SATISFACTION (1-5 stars) ========== */}
        {step === 'satisfaction' && (
          <div>
            <label 
              className="mb-4 block"
              style={{ 
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Évaluez votre satisfaction globale
            </label>

            {/* Star rating */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => {
                const isSelected = satisfactionScore !== null && star <= satisfactionScore;
                const isHovered = false; // Could add hover state

                return (
                  <button
                    key={star}
                    onClick={() => setSatisfactionScore(star)}
                    className="transition-all duration-300"
                    style={{
                      transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                    }}
                  >
                    <Star 
                      className="w-12 h-12" 
                      style={{ 
                        color: '#F8B044',
                        fill: isSelected ? '#F8B044' : 'transparent',
                        stroke: '#F8B044',
                        strokeWidth: 2,
                      }} 
                    />
                  </button>
                );
              })}
            </div>

            {/* Labels */}
            {satisfactionScore !== null && (
              <p 
                className="text-center mb-6"
                style={{ 
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {satisfactionScore === 1 && '😞 Très insatisfait'}
                {satisfactionScore === 2 && '😐 Insatisfait'}
                {satisfactionScore === 3 && '😊 Neutre'}
                {satisfactionScore === 4 && '😃 Satisfait'}
                {satisfactionScore === 5 && '😍 Très satisfait'}
              </p>
            )}

            {/* Recommendation */}
            <div className="mb-6">
              <label 
                className="mb-3 block"
                style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                }}
              >
                Recommanderiez-vous ce contenu ?
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setWouldRecommend(true)}
                  className="flex-1 p-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  style={{
                    background: wouldRecommend === true ? 'var(--success-100)' : 'var(--neutral-100)',
                    border: `2px solid ${wouldRecommend === true ? 'var(--success-600)' : 'transparent'}`,
                    color: wouldRecommend === true ? 'var(--success-600)' : 'var(--foreground)',
                  }}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span 
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    Oui
                  </span>
                </button>

                <button
                  onClick={() => setWouldRecommend(false)}
                  className="flex-1 p-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  style={{
                    background: wouldRecommend === false ? 'var(--error-100)' : 'var(--neutral-100)',
                    border: `2px solid ${wouldRecommend === false ? 'var(--error-600)' : 'transparent'}`,
                    color: wouldRecommend === false ? 'var(--error-600)' : 'var(--foreground)',
                  }}
                >
                  <ThumbsDown className="w-5 h-5" />
                  <span 
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    Non
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between gap-3">
              <ButtonEnhanced
                variant="ghost"
                size="md"
                onClick={() => setStep('nps')}
              >
                Retour
              </ButtonEnhanced>

              <div className="flex gap-3">
                <ButtonEnhanced
                  variant="ghost"
                  size="md"
                  onClick={handleSubmit}
                >
                  Passer
                </ButtonEnhanced>
                
                <ButtonEnhanced
                  variant="primary"
                  size="md"
                  onClick={() => setStep('comment')}
                >
                  Continuer
                </ButtonEnhanced>
              </div>
            </div>
          </div>
        )}

        {/* ========== STEP 3: COMMENT (optional) ========== */}
        {step === 'comment' && (
          <div>
            <label 
              className="mb-3 block"
              style={{ 
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Commentaire (optionnel)
            </label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre avis..."
              rows={5}
              className="w-full p-4 rounded-xl mb-6 transition-all"
              style={{
                background: 'var(--input-background)',
                border: '2px solid var(--input-border)',
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
                resize: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 4px rgba(85, 161, 180, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--input-border)';
                e.target.style.boxShadow = 'none';
              }}
            />

            {/* Summary */}
            <div 
              className="p-4 rounded-xl mb-6"
              style={{
                background: 'var(--neutral-50)',
              }}
            >
              <p 
                className="mb-2"
                style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                }}
              >
                Récapitulatif de votre évaluation :
              </p>
              <div className="space-y-1">
                <p 
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  • Score NPS : <strong style={{ color: 'var(--foreground)' }}>{npsScore}/10</strong> ({getNPSCategory(npsScore!).label})
                </p>
                {satisfactionScore && (
                  <p 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    • Satisfaction : <strong style={{ color: 'var(--foreground)' }}>{satisfactionScore}/5 ⭐</strong>
                  </p>
                )}
                {wouldRecommend !== null && (
                  <p 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    • Recommandation : <strong style={{ color: 'var(--foreground)' }}>{wouldRecommend ? 'Oui 👍' : 'Non 👎'}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between gap-3">
              <ButtonEnhanced
                variant="ghost"
                size="md"
                onClick={() => setStep('satisfaction')}
              >
                Retour
              </ButtonEnhanced>

              <ButtonEnhanced
                variant="primary"
                size="lg"
                icon={<Send className="w-5 h-5" />}
                onClick={handleSubmit}
                disabled={!canSubmit}
              >
                Envoyer
              </ButtonEnhanced>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Simple Quick Rating (pour des ratings rapides inline)
interface QuickRatingProps {
  value: number | null;
  onChange: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export function QuickRating({ value, onChange, max = 5, size = 'md', readonly = false }: QuickRatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1;
        const isSelected = value !== null && starValue <= value;

        return (
          <button
            key={i}
            onClick={() => !readonly && onChange(starValue)}
            disabled={readonly}
            className="transition-all duration-200"
            style={{
              cursor: readonly ? 'default' : 'pointer',
              transform: isSelected ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <Star 
              className={sizes[size]} 
              style={{ 
                color: '#F8B044',
                fill: isSelected ? '#F8B044' : 'transparent',
                stroke: '#F8B044',
                strokeWidth: 2,
              }} 
            />
          </button>
        );
      })}
    </div>
  );
}

// ✅ NPS Score Display (read-only)
interface NPSScoreDisplayProps {
  score: number;
  showCategory?: boolean;
}

export function NPSScoreDisplay({ score, showCategory = true }: NPSScoreDisplayProps) {
  const category = getNPSCategory(score);

  return (
    <div className="flex items-center gap-3">
      <div 
        className="px-4 py-2 rounded-xl"
        style={{
          background: `${category.color}15`,
        }}
      >
        <p 
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: category.color,
          }}
        >
          {score}/10
        </p>
      </div>

      {showCategory && (
        <div>
          <p 
            style={{ 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-bold)',
              color: category.color,
            }}
          >
            {category.emoji} {category.label}
          </p>
        </div>
      )}
    </div>
  );
}
