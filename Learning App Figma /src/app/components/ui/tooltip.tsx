import { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: string;
}

export function Tooltip({ content, children, position = 'top', maxWidth = '250px' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionStyles = () => {
    const positions = {
      top: {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '8px',
      },
      bottom: {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '8px',
      },
      left: {
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginRight: '8px',
      },
      right: {
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginLeft: '8px',
      },
    };
    return positions[position];
  };

  const getArrowStyles = () => {
    const arrows = {
      top: {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid var(--foreground)',
      },
      bottom: {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: '6px solid var(--foreground)',
      },
      left: {
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderLeft: '6px solid var(--foreground)',
      },
      right: {
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderRight: '6px solid var(--foreground)',
      },
    };
    return arrows[position];
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        tabIndex={0}
        role="button"
        aria-label="Information supplémentaire"
        className="cursor-help"
      >
        {children || (
          <Info 
            className="w-4 h-4" 
            style={{ color: 'var(--muted-foreground)' }} 
          />
        )}
      </div>
      
      {isVisible && (
        <div
          className="absolute z-50 p-3 rounded-lg shadow-lg pointer-events-none"
          style={{
            background: 'var(--foreground)',
            color: 'white',
            fontSize: 'var(--text-xs)',
            maxWidth,
            lineHeight: 'var(--leading-relaxed)',
            ...getPositionStyles(),
          }}
          role="tooltip"
        >
          {content}
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              ...getArrowStyles(),
            }}
          />
        </div>
      )}
    </div>
  );
}
