import { Palette } from 'lucide-react';

interface DesignSystemFABProps {
  onClick: () => void;
}

export default function DesignSystemFAB({ onClick }: DesignSystemFABProps) {
  return (
    <button
      onClick={onClick}
      title="Design System TLS v5.3"
      className="fixed bottom-24 right-6 z-30 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      style={{
        background: 'var(--gradient-primary)',
        boxShadow: '0 8px 32px rgba(85, 161, 180, 0.4)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(85, 161, 180, 0.6)';
        e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(85, 161, 180, 0.4)';
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
      }}
    >
      <Palette className="w-6 h-6 text-white" />
      
      {/* Tooltip */}
      <span 
        className="absolute right-full mr-3 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: 'var(--neutral-900)',
          color: 'white',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          fontFamily: 'var(--font-body)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        Design System v5.3
        <span
          style={{
            content: '',
            position: 'absolute',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderLeft: '4px solid var(--neutral-900)',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
          }}
        />
      </span>
    </button>
  );
}
