import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  icon?: React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  allowMultiple?: boolean;
}

export function FAQAccordion({ items, variant = 'primary', allowMultiple = false }: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes(prev => 
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          borderColor: 'rgba(237, 132, 58, 0.2)',
          hoverBg: 'rgba(237, 132, 58, 0.05)',
          activeBg: 'rgba(237, 132, 58, 0.08)',
          iconColor: 'var(--secondary)',
        };
      case 'accent':
        return {
          borderColor: 'rgba(248, 176, 68, 0.2)',
          hoverBg: 'rgba(248, 176, 68, 0.05)',
          activeBg: 'rgba(248, 176, 68, 0.08)',
          iconColor: 'var(--accent)',
        };
      case 'neutral':
        return {
          borderColor: 'rgba(0, 0, 0, 0.1)',
          hoverBg: 'rgba(0, 0, 0, 0.02)',
          activeBg: 'rgba(0, 0, 0, 0.04)',
          iconColor: 'var(--muted-foreground)',
        };
      case 'primary':
      default:
        return {
          borderColor: 'rgba(85, 161, 180, 0.2)',
          hoverBg: 'rgba(85, 161, 180, 0.05)',
          activeBg: 'rgba(85, 161, 180, 0.08)',
          iconColor: 'var(--primary)',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}
    >
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        
        return (
          <div
            key={index}
            style={{
              borderRadius: 'var(--radius-lg)',
              border: `1px solid ${variantStyles.borderColor}`,
              background: isOpen ? variantStyles.activeBg : 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              overflow: 'hidden',
              transition: 'all var(--duration-base) ease',
            }}
          >
            {/* Question Header */}
            <button
              onClick={() => toggleItem(index)}
              style={{
                width: '100%',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all var(--duration-base) ease',
              }}
              onMouseEnter={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.background = variantStyles.hoverBg;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Icon (optional) */}
              {item.icon && (
                <div
                  style={{
                    flexShrink: 0,
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    background: variantStyles.hoverBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: variantStyles.iconColor,
                  }}
                >
                  {item.icon}
                </div>
              )}

              {/* Question Text */}
              <div
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                }}
              >
                {item.question}
              </div>

              {/* Chevron */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  flexShrink: 0,
                  color: variantStyles.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            {/* Answer Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  style={{
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: 'var(--space-4)',
                      paddingTop: 0,
                      paddingLeft: item.icon ? 'calc(var(--space-4) + 36px + var(--space-3))' : 'var(--space-4)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
