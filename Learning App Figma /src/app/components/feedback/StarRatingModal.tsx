import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface StarRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  title?: string;
  subtitle?: string;
}

const RATING_LABELS = [
  { value: 1, label: 'Très mauvais' },
  { value: 2, label: 'Mauvais' },
  { value: 3, label: 'Moyen' },
  { value: 4, label: 'Très bien' },
  { value: 5, label: 'Excellent' },
];

export function StarRatingModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title = 'Votre avis compte',
  subtitle = 'Comment évaluez-vous cette leçon ?'
}: StarRatingModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
      // Reset
      setRating(0);
      setHoverRating(0);
      setComment('');
      onClose();
    }
  };

  const displayRating = hoverRating || rating;
  const selectedLabel = RATING_LABELS.find(r => r.value === displayRating);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.4)',
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
          padding: 'var(--space-10)',
          maxWidth: '512px',
          width: '100%',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.8)',
        }}
      >
        {/* Background Blur Effect */}
        <div
          style={{
            position: 'absolute',
            top: '-128px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '256px',
            height: '256px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(185, 215, 223, 1) 0%, rgba(139, 161, 167, 0.75) 17.5%, rgba(93, 108, 112, 0.5) 35%, rgba(46, 54, 56, 0.25) 52.5%, rgba(0, 0, 0, 0) 70%)',
            filter: 'blur(40px)',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'var(--space-5)',
            right: 'var(--space-5)',
            background: 'rgba(0, 0, 0, 0.05)',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--space-2)',
            borderRadius: '9999px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--duration-base) ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
          }}
        >
          <X className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
        </button>

        {/* Icon Container */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, rgb(220, 235, 239) 0%, rgb(185, 215, 223) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-5)',
          }}
        >
          <Sparkles className="w-8 h-8" style={{ color: 'var(--primary)' }} />
        </div>

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
          {subtitle}
        </p>

        {/* Star Rating */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= displayRating;
            const isSelected = star <= rating;
            
            return (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  width: '55.2px',
                  height: '55.2px',
                  transition: 'all var(--duration-base) ease',
                  filter: isSelected ? 'drop-shadow(0 0 26.684px #F8B044)' : isFilled ? 'drop-shadow(0 4px 24px rgba(248, 176, 68, 0.25))' : 'none',
                }}
                onMouseEnterCapture={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeaveCapture={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg
                  width="55.2"
                  height="55.2"
                  viewBox="0 0 55.2 55.2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.6 4.6L35.4 20.4L52.8 22.9C53.5 23 54 23.5 54.3 24.1C54.6 24.7 54.5 25.4 54.1 26L41.7 38.1L44.7 55.4C44.8 56.1 44.5 56.8 44 57.2C43.5 57.6 42.8 57.7 42.2 57.4L27.6 49.2L13 57.4C12.4 57.7 11.7 57.6 11.2 57.2C10.7 56.8 10.4 56.1 10.5 55.4L13.5 38.1L1.1 26C0.7 25.4 0.6 24.7 0.9 24.1C1.2 23.5 1.7 23 2.4 22.9L19.8 20.4L27.6 4.6Z"
                    fill={isFilled ? '#F8B044' : 'transparent'}
                    stroke={isFilled ? '#F8B044' : 'rgba(0, 0, 0, 0.1)'}
                    strokeWidth="4.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-2.3, -2.3)"
                  />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Rating Label Badge */}
        {displayRating > 0 && selectedLabel && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'var(--space-6)',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(155.283deg, rgba(248, 176, 68, 0.082) 0%, rgba(248, 176, 68, 0.145) 100%)',
                border: '2px solid rgba(248, 176, 68, 0.19)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4) var(--space-6)',
                boxShadow: '0 8px 32px rgba(248, 176, 68, 0.13)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--accent)',
                }}
              >
                {selectedLabel.label}
              </span>
            </div>
          </div>
        )}

        {/* Comment Section */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
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
            placeholder="Partagez votre expérience..."
            rows={4}
            style={{
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--foreground)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid rgba(248, 176, 68, 0.19)',
              background: 'rgba(255, 255, 255, 0.5)',
              resize: 'vertical',
              transition: 'all var(--duration-base) ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.background = 'white';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(248, 176, 68, 0.19)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          style={{
            width: '100%',
            background: rating > 0 
              ? 'linear-gradient(172.187deg, rgb(248, 176, 68) 0%, rgba(248, 176, 68, 0.8) 100%)' 
              : 'var(--muted)',
            color: 'white',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-bold)',
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-lg)',
            border: 'none',
            cursor: rating > 0 ? 'pointer' : 'not-allowed',
            opacity: rating > 0 ? 1 : 0.5,
            transition: 'all var(--duration-base) ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            boxShadow: rating > 0 ? '0 8px 24px rgba(248, 176, 68, 0.25)' : 'none',
          }}
          onMouseEnter={(e) => {
            if (rating > 0) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(248, 176, 68, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (rating > 0) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(248, 176, 68, 0.25)';
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
