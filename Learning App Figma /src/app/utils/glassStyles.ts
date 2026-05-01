/**
 * TLS Glassmorphism Utilities
 * Default Glass styles and hover effects for consistent application
 */

/**
 * Map des variables CSS TLS vers leurs valeurs RGB réelles
 * Utilisé pour les effets de glow coloré au hover
 */
const TLS_COLOR_MAP: Record<string, string> = {
  'var(--primary)': '85, 161, 180',      // #55A1B4 - Bleu TLS
  'var(--secondary)': '237, 132, 58',    // #ED843A - Orange TLS
  'var(--accent)': '248, 176, 68',       // #F8B044 - Jaune TLS
  'var(--success)': '123, 196, 212',     // #7BC4D4 - Bleu-vert (primary-light) TLS
  'var(--primary-light)': '123, 196, 212', // #7BC4D4 - Bleu-vert du gradient TLS
  'var(--error)': '239, 68, 68',         // #EF4444 - Rouge error
  'var(--warning)': '251, 191, 36',      // #FBBF24 - Jaune warning
  'var(--info)': '59, 130, 246',         // #3B82F6 - Bleu info
  
  // Variantes de couleurs
  'var(--primary-600)': '74, 143, 161',  // #4A8FA1
  'var(--primary-500)': '85, 161, 180',  // #55A1B4
  'var(--secondary-400)': '241, 138, 76', // #F18A4C
  'var(--accent-400)': '248, 167, 51',   // #F8A733
};

/**
 * Convertit une couleur CSS en rgba avec opacité personnalisée
 * Supporte: var(--primary), #55A1B4, rgb(85, 161, 180), rgba(...)
 */
function hexToRgba(color: string, opacity: number): string {
  // Si c'est déjà rgba, on le retourne
  if (color.startsWith('rgba')) return color;
  
  // Si c'est rgb, on le convertit en rgba
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }
  
  // Si c'est une variable CSS TLS, on utilise la map
  if (color.startsWith('var(--')) {
    const rgb = TLS_COLOR_MAP[color];
    if (rgb) {
      return `rgba(${rgb}, ${opacity})`;
    }
    // Fallback si variable non trouvée
    return `rgba(85, 161, 180, ${opacity})`; // primary
  }
  
  // Si c'est un hex, on le convertit
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  // Fallback pour autres cas
  return `rgba(85, 161, 180, ${opacity})`; // primary color
}

export const defaultGlassStyle = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset',
  transition: 'all var(--duration-normal) var(--ease-smooth)',
};

export const glassHoverHandlers = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
    e.currentTarget.style.boxShadow = '0 16px 64px 0 rgba(0, 0, 0, 0.15), 0 1px 0 0 rgba(255, 255, 255, 1) inset';
    e.currentTarget.style.backdropFilter = 'blur(30px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
    e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset';
    e.currentTarget.style.backdropFilter = 'blur(20px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
  },
};

// Variant pour hover avec lift (translateY)
export const glassHoverHandlersWithLift = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
    e.currentTarget.style.boxShadow = '0 16px 64px 0 rgba(0, 0, 0, 0.15), 0 1px 0 0 rgba(255, 255, 255, 1) inset';
    e.currentTarget.style.backdropFilter = 'blur(30px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
    e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset';
    e.currentTarget.style.backdropFilter = 'blur(20px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
  },
};

/**
 * Variant avec glow coloré basé sur la couleur de l'icône (lift + colored glow)
 * @param iconColor - Couleur CSS (hex, rgb, var())
 */
export const createGlassHoverWithColoredGlow = (iconColor: string = 'var(--primary)') => ({
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
    
    // Glow coloré ultra-subtil et très diffus basé sur la couleur de l'icône
    const glowColor = hexToRgba(iconColor, 0.08); // Réduit à 8% (au lieu de 15%)
    e.currentTarget.style.boxShadow = `0 20px 60px 0 ${glowColor}, 0 12px 32px 0 ${hexToRgba(iconColor, 0.04)}, 0 1px 0 0 rgba(255, 255, 255, 1) inset`;
    
    e.currentTarget.style.backdropFilter = 'blur(30px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
    e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset';
    e.currentTarget.style.backdropFilter = 'blur(20px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
  },
});

// Variant pour hover avec lift et scale
export const glassHoverHandlersWithScale = {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
    e.currentTarget.style.boxShadow = '0 16px 64px 0 rgba(0, 0, 0, 0.15), 0 1px 0 0 rgba(255, 255, 255, 1) inset';
    e.currentTarget.style.backdropFilter = 'blur(30px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
    e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset';
    e.currentTarget.style.backdropFilter = 'blur(20px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
  },
};

/**
 * Variant avec glow coloré et scale (lift + scale + colored glow)
 * @param iconColor - Couleur CSS (hex, rgb, var())
 */
export const createGlassHoverWithColoredGlowAndScale = (iconColor: string = 'var(--primary)') => ({
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
    
    // Glow coloré ultra-subtil et très diffus basé sur la couleur de l'icône
    const glowColor = hexToRgba(iconColor, 0.08); // Réduit à 8% (au lieu de 15%)
    e.currentTarget.style.boxShadow = `0 20px 60px 0 ${glowColor}, 0 12px 32px 0 ${hexToRgba(iconColor, 0.04)}, 0 1px 0 0 rgba(255, 255, 255, 1) inset`;
    
    e.currentTarget.style.backdropFilter = 'blur(30px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
    e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset';
    e.currentTarget.style.backdropFilter = 'blur(20px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
  },
});

// Style pour section containers (pas de hover)
export const sectionGlassStyle = {
  ...defaultGlassStyle,
  padding: 'var(--space-6)',
  borderRadius: 'var(--radius-xl)',
};

/**
 * 📝 TLS Design System - Colored Glow Hover Effects v2 (Ultra-Subtil)
 * 
 * Les handlers avec glow coloré créent un effet de shadow/glow ultra-subtil et diffus
 * au hover qui reprend la couleur de l'icône de la card.
 * 
 * Utilisation :
 * ```tsx
 * const iconColor = 'var(--primary)'; // ou '#55A1B4', 'rgb(85, 161, 180)'
 * 
 * <div {...createGlassHoverWithColoredGlow(iconColor)}>
 *   // Content
 * </div>
 * ```
 * 
 * Deux variantes disponibles :
 * - createGlassHoverWithColoredGlow(iconColor) → lift uniquement
 * - createGlassHoverWithColoredGlowAndScale(iconColor) → lift + scale
 * 
 * Le glow ultra-subtil utilise :
 * - 8% d'opacité pour la shadow principale (60px blur) - RÉDUIT de 15% → 8%
 * - 4% d'opacité pour la shadow secondaire (32px blur) - RÉDUIT de 8% → 4%
 * - Effet extrêmement subtil et diffus qui ajoute de la profondeur sans surcharge visuelle
 * 
 * Couleurs Dashboard Actions Rapides :
 * - Coaching: var(--primary) → Glow bleu #55A1B4
 * - Parcours: var(--secondary) → Glow orange #ED843A
 * - Journal: var(--accent) → Glow jaune #F8B044
 * - Veille: var(--primary-light) → Glow bleu-vert #7BC4D4 (gradient TLS)
 */
