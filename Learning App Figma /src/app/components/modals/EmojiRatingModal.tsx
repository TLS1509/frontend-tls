import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface EmojiRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback?: string) => void;
  title?: string;
  subtitle?: string;
}

const emojis = [
  { value: 1, emoji: '😞', label: 'Très insatisfait', color: '#ED843A' }, // TLS Orange
  { value: 2, emoji: '😕', label: 'Insatisfait', color: '#F8B044' }, // TLS Jaune
  { value: 3, emoji: '😐', label: 'Neutre', color: '#6B7280' }, // Neutre gris
  { value: 4, emoji: '🙂', label: 'Satisfait', color: '#74AFB8' }, // TLS Bleu moyen
  { value: 5, emoji: '😄', label: 'Très satisfait', color: '#55A1B4' }, // TLS Bleu principal
];

export function EmojiRatingModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Comment s\'est passé votre parcours ?',
  subtitle = 'Votre avis nous aide à améliorer l\'expérience',
}: EmojiRatingModalProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedRating) {
      onSubmit(selectedRating, feedback || undefined);
      onClose();
      // Reset
      setSelectedRating(null);
      setFeedback('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-10)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 'var(--space-6)',
                right: 'var(--space-6)',
                background: 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                color: 'var(--muted-foreground)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-3)',
                  letterSpacing: '-0.025em',
                }}
              >
                {title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {subtitle}
              </p>
            </div>

            {/* Emoji Rating */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-8)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.05) 0%, rgba(237, 132, 58, 0.05) 100%)',
              }}
            >
              {emojis.map((item) => {
                const isSelected = selectedRating === item.value;
                const isHovered = hoveredRating === item.value;
                
                return (
                  <motion.button
                    key={item.value}
                    onClick={() => setSelectedRating(item.value)}
                    onMouseEnter={() => setHoveredRating(item.value)}
                    onMouseLeave={() => setHoveredRating(null)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-xl)',
                      border: isSelected ? `2px solid ${item.color}` : '2px solid transparent',
                      background: isSelected || isHovered ? 'white' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all var(--duration-base) ease',
                      boxShadow: isSelected ? `0 8px 24px ${item.color}40` : 'none',
                      position: 'relative',
                    }}
                  >
                    {/* Emoji */}
                    <motion.div
                      animate={{
                        rotate: isSelected ? [0, -10, 10, -10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      style={{
                        fontSize: '48px',
                        lineHeight: 1,
                      }}
                    >
                      {item.emoji}
                    </motion.div>

                    {/* Label */}
                    <AnimatePresence>
                      {(isSelected || isHovered) && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: item.color,
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.label}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Selected Ring */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: 'absolute',
                          inset: -4,
                          borderRadius: 'var(--radius-xl)',
                          border: `2px solid ${item.color}`,
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Textarea (optional) */}
            <AnimatePresence>
              {selectedRating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  <label
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      display: 'block',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    Commentaire (optionnel)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Partagez votre expérience..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--foreground)',
                      background: 'white',
                      resize: 'none',
                      outline: 'none',
                      transition: 'border-color var(--duration-base) ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedRating}
              style={{
                width: '100%',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-xl)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                border: 'none',
                background: selectedRating 
                  ? 'var(--gradient-primary)' 
                  : 'rgba(0, 0, 0, 0.1)',
                color: selectedRating ? 'white' : 'var(--muted-foreground)',
                cursor: selectedRating ? 'pointer' : 'not-allowed',
                transition: 'all var(--duration-base) ease',
                boxShadow: selectedRating 
                  ? '0 8px 24px rgba(85, 161, 180, 0.3)' 
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (selectedRating) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(85, 161, 180, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedRating) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(85, 161, 180, 0.3)';
                }
              }}
            >
              Envoyer mon avis
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
