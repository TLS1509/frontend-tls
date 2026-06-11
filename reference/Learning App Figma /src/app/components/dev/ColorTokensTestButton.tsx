/**
 * DEV TOOL - Bouton flottant pour accéder à la page de test Color Tokens V2
 * À retirer en production
 */

interface ColorTokensTestButtonProps {
  onClick: () => void;
}

export function ColorTokensTestButton({ onClick }: ColorTokensTestButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 'var(--space-6)',
        right: 'var(--space-6)',
        padding: '12px 20px',
        background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%)',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-sm)',
        fontWeight: '600',
        fontFamily: 'var(--font-body)',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15) inset';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
      }}
    >
      <span style={{ fontSize: '16px' }}>🎨</span>
      <span>Color Tokens V2</span>
    </button>
  );
}
