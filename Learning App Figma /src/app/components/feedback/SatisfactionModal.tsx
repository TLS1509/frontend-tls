import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface SatisfactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  title?: string;
  type?: 'lesson' | 'step' | 'parcours';
}

const RATINGS = [
  {
    value: 1,
    emoji: '😠',
    label: 'Très insatisfait',
    color: 'var(--destructive)',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    selectedBg: 'rgba(239, 68, 68, 0.15)',
    selectedBorder: 'var(--destructive)',
  },
  {
    value: 2,
    emoji: '😕',
    label: 'Insatisfait',
    color: 'var(--secondary)',
    bgColor: 'rgba(237, 132, 58, 0.1)',
    borderColor: 'rgba(237, 132, 58, 0.3)',
    selectedBg: 'rgba(237, 132, 58, 0.15)',
    selectedBorder: 'var(--secondary)',
  },
  {
    value: 3,
    emoji: '😐',
    label: 'Neutre',
    color: 'var(--accent)',
    bgColor: 'rgba(248, 176, 68, 0.1)',
    borderColor: 'rgba(248, 176, 68, 0.3)',
    selectedBg: 'rgba(248, 176, 68, 0.15)',
    selectedBorder: 'var(--accent)',
  },
  {
    value: 4,
    emoji: '🙂',
    label: 'Satisfait',
    color: 'var(--muted-foreground)',
    bgColor: 'rgba(0, 0, 0, 0.03)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    selectedBg: 'rgba(0, 0, 0, 0.05)',
    selectedBorder: 'var(--muted-foreground)',
  },
  {
    value: 5,
    emoji: '😄',
    label: 'Très satisfait',
    color: 'var(--primary)',
    bgColor: 'rgba(85, 161, 180, 0.1)',
    borderColor: 'rgba(85, 161, 180, 0.3)',
    selectedBg: 'rgba(85, 161, 180, 0.15)',
    selectedBorder: 'var(--primary)',
  },
];

export function SatisfactionModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title = 'Comment était cette leçon ?',
  type = 'lesson'
}: SatisfactionModalProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedRating) {
      onSubmit(selectedRating, comment);
      // Reset
      setSelectedRating(null);
      setComment('');
      onClose();
    }
  };

  const selectedRatingData = RATINGS.find(r => r.value === selectedRating);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 'var(--space-4)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-8)',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'var(--space-6)',
            right: 'var(--space-6)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--muted-foreground)',
            padding: 'var(--space-2)',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--duration-base) ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--muted)';
            e.currentTarget.style.color = 'var(--foreground)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--muted-foreground)';
          }}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            textAlign: 'center',
            marginBottom: 'var(--space-3)',
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'var(--muted-foreground)',
            textAlign: 'center',
            marginBottom: 'var(--space-8)',
          }}
        >
          Choisissez l'emoji qui correspond à votre ressenti
        </p>

        {/* Ratings Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {RATINGS.map((rating) => {
            const isSelected = selectedRating === rating.value;
            return (
              <button
                key={rating.value}
                onClick={() => setSelectedRating(rating.value)}
                style={{
                  background: isSelected ? rating.selectedBg : 'white',
                  border: `2px solid ${isSelected ? rating.selectedBorder : rating.borderColor}`,
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6) var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = rating.bgColor;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Emoji */}
                <span style={{ fontSize: '48px', lineHeight: 1 }}>
                  {rating.emoji}
                </span>

                {/* Number */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: isSelected ? rating.color : 'var(--muted-foreground)',
                  }}
                >
                  {rating.value}
                </span>
              </button>
            );
          })}
        </div>

        {/* Labels below emojis */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {RATINGS.map((rating) => {
            const isSelected = selectedRating === rating.value;
            return (
              <div
                key={`label-${rating.value}`}
                style={{
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                    color: isSelected ? rating.color : 'var(--muted-foreground)',
                  }}
                >
                  {rating.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Rating Badge */}
        {selectedRatingData && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'var(--space-6)',
            }}
          >
            <div
              style={{
                background: selectedRatingData.selectedBg,
                border: `2px solid ${selectedRatingData.selectedBorder}`,
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-3) var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              <span style={{ fontSize: '24px', lineHeight: 1 }}>
                {selectedRatingData.emoji}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: selectedRatingData.color,
                }}
              >
                {selectedRatingData.label}
              </span>
            </div>
          </div>
        )}

        {/* Comment Section */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              display: 'block',
              marginBottom: 'var(--space-3)',
            }}
          >
            Commentaire{' '}
            <span
              style={{
                fontWeight: 'var(--font-weight-normal)',
                color: 'var(--muted-foreground)',
              }}
            >
              (optionnel)
            </span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Qu'avez-vous pensé de cette leçon ?"
            rows={4}
            style={{
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--foreground)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${selectedRatingData ? selectedRatingData.borderColor : 'var(--input-border)'}`,
              background: selectedRatingData ? selectedRatingData.selectedBg : 'white',
              resize: 'vertical',
              transition: 'all var(--duration-base) ease',
            }}
            onFocus={(e) => {
              if (selectedRatingData) {
                e.currentTarget.style.borderColor = selectedRatingData.selectedBorder;
              }
            }}
            onBlur={(e) => {
              if (selectedRatingData) {
                e.currentTarget.style.borderColor = selectedRatingData.borderColor;
              }
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedRating}
          style={{
            width: '100%',
            background: selectedRatingData ? selectedRatingData.color : 'var(--muted)',
            color: 'white',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-xl)',
            border: 'none',
            cursor: selectedRating ? 'pointer' : 'not-allowed',
            opacity: selectedRating ? 1 : 0.5,
            transition: 'all var(--duration-base) ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            boxShadow: selectedRating ? `0 4px 16px ${selectedRatingData?.bgColor}` : 'none',
          }}
          onMouseEnter={(e) => {
            if (selectedRating) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 24px ${selectedRatingData?.bgColor}`;
            }
          }}
          onMouseLeave={(e) => {
            if (selectedRating) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 16px ${selectedRatingData?.bgColor}`;
            }
          }}
        >
          <Send className="w-5 h-5" />
          Envoyer mon avis
        </button>
      </div>
    </div>
  );
}
