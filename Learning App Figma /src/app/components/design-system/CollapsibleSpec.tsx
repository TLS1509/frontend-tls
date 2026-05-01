import { useState } from 'react';
import { ChevronDown, Ruler } from 'lucide-react';

interface SpecSection {
  title: string;
  items: { label: string; value: string }[];
}

interface CollapsibleSpecProps {
  id: string;
  sections: SpecSection[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export function CollapsibleSpec({ id, sections, isOpen = false, onToggle }: CollapsibleSpecProps) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  const open = onToggle ? isOpen : internalOpen;

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
          background: 'var(--primary-lighter)',
          border: '1px solid var(--primary-300)',
          borderRadius: 'var(--radius-lg)',
          cursor: 'pointer',
          transition: 'all var(--duration-base) ease',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--primary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Ruler className="h-4 w-4" style={{ color: 'var(--primary)' }} />
          Spécifications Techniques
        </div>
        <ChevronDown 
          className="h-4 w-4"
          style={{
            color: 'var(--primary)',
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
            border: '1px solid var(--primary-200)',
            borderRadius: 'var(--radius-lg)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--foreground)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
            {sections.map((section, idx) => (
              <div key={idx}>
                <h4 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: 'var(--font-weight-semibold)', 
                    color: 'var(--primary)', 
                    marginBottom: 'var(--space-1-5)' 
                  }}
                >
                  {section.title}
                </h4>
                <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx}>
                      <strong>{item.label}:</strong> {item.value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
