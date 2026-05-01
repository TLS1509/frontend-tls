import { useState, ReactNode } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface InfoBoxProps {
  id: string;
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  variant?: 'info' | 'warning' | 'success' | 'primary';
}

export function InfoBox({ 
  id, 
  title, 
  icon: Icon, 
  iconColor, 
  children, 
  isOpen = false, 
  onToggle,
  variant = 'primary'
}: InfoBoxProps) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  const open = onToggle ? isOpen : internalOpen;

  // Colors based on variant
  const variantColors = {
    info: {
      bg: 'var(--info-50)',
      border: 'var(--info-300)',
      text: 'var(--info)',
    },
    warning: {
      bg: 'var(--warning-50)',
      border: 'var(--warning-300)',
      text: 'var(--warning)',
    },
    success: {
      bg: 'var(--success-50)',
      border: 'var(--success-300)',
      text: 'var(--success)',
    },
    primary: {
      bg: 'var(--primary-lighter)',
      border: 'var(--primary-300)',
      text: 'var(--primary)',
    },
  };

  const colors = variantColors[variant];

  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      <button
        onClick={handleToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4)',
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: 'var(--radius-lg)',
          cursor: 'pointer',
          transition: 'all var(--duration-base) ease',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: colors.text,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {Icon && (
            <Icon 
              className="h-4 w-4" 
              style={{ color: iconColor || colors.text }} 
            />
          )}
          {title}
        </div>
        <ChevronDown 
          className="h-4 w-4"
          style={{
            color: colors.text,
            transition: 'transform var(--duration-base) ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </button>
      
      {open && (
        <div 
          style={{
            marginTop: 'var(--space-3)',
            padding: 'var(--space-5)',
            background: 'white',
            border: `1px solid ${colors.border}`,
            borderRadius: 'var(--radius-lg)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--foreground)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
