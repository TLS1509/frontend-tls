import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Barre de recherche standardisée TLS
 * Utilisée dans Journal, Veille, Parcours, etc.
 */
export function SearchBar({ value, onChange, placeholder = 'Rechercher...', className = '' }: SearchBarProps) {
  return (
    <div 
      className={`relative flex items-center ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
      <Search 
        className="absolute left-4 w-5 h-5 pointer-events-none" 
        style={{ color: 'var(--muted-foreground)' }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-transparent outline-none"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--foreground)',
          borderRadius: 'var(--radius-2xl)',
        }}
        onFocus={(e) => {
          e.currentTarget.parentElement!.style.borderColor = 'var(--primary)';
          e.currentTarget.parentElement!.style.boxShadow = '0 4px 20px 0 rgba(85, 161, 180, 0.15)';
        }}
        onBlur={(e) => {
          e.currentTarget.parentElement!.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          e.currentTarget.parentElement!.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06)';
        }}
      />
    </div>
  );
}
