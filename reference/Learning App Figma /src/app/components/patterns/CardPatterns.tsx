import React from 'react';
import { LucideIcon } from 'lucide-react';
import { 
  defaultGlassStyle, 
  glassHoverHandlersWithLift, 
  glassHoverHandlersWithScale,
  createGlassHoverWithColoredGlow,
  createGlassHoverWithColoredGlowAndScale
} from '../../utils/glassStyles';

/**
 * TLS Card Patterns - Vertical & Horizontal Cards
 * Respecte strictement les specs du Design System
 */

// ============================================
// TYPES
// ============================================

export type CardSize = 'mini' | 'small' | 'medium' | 'large' | 'xl';
export type CardOrientation = 'vertical' | 'horizontal';

interface BaseCardProps {
  icon?: LucideIcon;
  iconColor?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface VerticalCardProps extends BaseCardProps {
  size?: Exclude<CardSize, 'mini'>; // Vertical n'a pas de mini
}

interface HorizontalCardProps extends BaseCardProps {
  size?: CardSize;
}

// ============================================
// VERTICAL CARDS
// ============================================

/**
 * Vertical Card XL - Hero/Landing 400-600px
 * Icon: 80px (w-20) • Padding: 48px • Gap icon→content: 24px • Gap title→desc: 12px
 * Title: h1 36px/700 League Spartan • Desc: 18px/400 Nunito
 */
export const VerticalCardXL: React.FC<VerticalCardProps> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  description,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-2xl)', // 24px
        padding: 'var(--space-12)', // 48px
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)', // 24px icon→content
        width: '100%',
        maxWidth: '500px',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        textAlign: 'center',
        ...style,
      }}
    >
      {Icon && <Icon className="w-20 h-20" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-3)', // 12px title→desc
        width: '100%',
      }}>
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-4xl)', // 36px
          fontWeight: 'var(--font-weight-bold)', // 700
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h1>
        {description && (
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'var(--text-lg)', // 18px
            color: 'var(--muted-foreground)', 
            lineHeight: 'var(--leading-normal)', // 1.5
            margin: 0,
            padding: 0,
          }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

/**
 * Vertical Card Large - Featured 350-400px
 * Icon: 56px (w-14) • Padding: 40px • Gap icon→content: 20px • Gap title→desc: 10px
 * Title: h2 24px/600 League Spartan • Desc: 16px/400 Nunito
 * Layout: Icon et heading CENTRÉS
 */
export const VerticalCardLarge: React.FC<VerticalCardProps> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  description,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-xl)', // 16px
        padding: 'var(--space-10)', // 40px
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)', // 20px icon→content
        width: '100%',
        maxWidth: '380px',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        textAlign: 'center',
        ...style,
      }}
    >
      {Icon && <Icon className="w-14 h-14" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-2-5)', // 10px title→desc
        width: '100%',
        alignItems: 'center',
      }}>
        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-2xl)', // 24px
          fontWeight: 'var(--font-weight-semibold)', // 600
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h2>
        {description && (
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'var(--text-base)', // 16px
            color: 'var(--muted-foreground)', 
            lineHeight: 'var(--leading-normal)', // 1.5
            margin: 0,
            padding: 0,
          }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

/**
 * Vertical Card Medium - Standard 280-320px (MOST COMMON)
 * Icon: 40px (w-10) • Padding: 32px • Gap icon→content: 16px • Gap title→desc: 8px
 * Title: h3 20px/600 League Spartan • Desc: 14px/400 Nunito
 * Layout: Icon et heading CENTRÉS
 */
export const VerticalCardMedium: React.FC<VerticalCardProps> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  description,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-xl)', // 16px
        padding: 'var(--space-8)', // 32px
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)', // 16px icon→content
        width: '100%',
        maxWidth: '300px',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        textAlign: 'center',
        ...style,
      }}
    >
      {Icon && <Icon className="w-10 h-10" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-2)', // 8px title→desc
        width: '100%',
        alignItems: 'center',
      }}>
        <h3 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-xl)', // 20px
          fontWeight: 'var(--font-weight-semibold)', // 600
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h3>
        {description && (
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'var(--text-sm)', // 14px
            color: 'var(--muted-foreground)', 
            lineHeight: 'var(--leading-normal)', // 1.5
            margin: 0,
            padding: 0,
          }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

/**
 * Vertical Card Small - Compact 200-240px
 * Icon: 32px (w-8) • Padding: 20px • Gap icon→content: 12px • Gap title→desc: 6px
 * Title: h4 20px/600 League Spartan • Desc: 14px/400 Nunito
 * Layout: Icon et heading CENTRÉS
 */
export const VerticalCardSmall: React.FC<VerticalCardProps> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  description,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-lg)', // 10px
        padding: 'var(--space-5)', // 20px
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)', // 12px icon→content
        width: '100%',
        maxWidth: '220px',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        textAlign: 'center',
        ...style,
      }}
    >
      {Icon && <Icon className="w-8 h-8" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-1-5)', // 6px title→desc
        width: '100%',
        alignItems: 'center',
      }}>
        <h4 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-xl)', // 20px
          fontWeight: 'var(--font-weight-semibold)', // 600
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h4>
        {description && (
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'var(--text-sm)', // 14px
            color: 'var(--muted-foreground)', 
            lineHeight: 'var(--leading-normal)', // 1.5
            margin: 0,
            padding: 0,
          }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

// ============================================
// HORIZONTAL CARDS
// ============================================

/**
 * Horizontal Card Large - Full Width Featured
 * Icon: 56px (w-14) • Padding: 32px • Gap icon→content: 24px • Gap title→desc: 8px
 * Title: h2 24px/600 League Spartan • Desc: 16px/400 Nunito
 */
export const HorizontalCardLarge: React.FC<HorizontalCardProps> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  description,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-xl)', // 16px
        padding: 'var(--space-8)', // 32px
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--space-6)', // 24px icon→content
        width: '100%',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        ...style,
      }}
    >
      {Icon && <Icon className="w-14 h-14" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-2)', // 8px title→desc
        flex: 1,
      }}>
        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-2xl)', // 24px
          fontWeight: 'var(--font-weight-semibold)', // 600
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h2>
        {description && (
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'var(--text-base)', // 16px
            color: 'var(--muted-foreground)', 
            lineHeight: 'var(--leading-normal)', // 1.5
            margin: 0,
            padding: 0,
          }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

/**
 * Horizontal Card Medium - Standard List Item
 * Icon: 40px (w-10) • Padding: 24px • Gap icon→content: 20px • Gap title→desc: 6px
 * Title: h3 24px/600 League Spartan • Desc: 16px/400 Nunito
 */
export const HorizontalCardMedium: React.FC<HorizontalCardProps> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  description,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-lg)', // 10px
        padding: 'var(--space-6)', // 24px
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--space-5)', // 20px icon→content
        width: '100%',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        ...style,
      }}
    >
      {Icon && <Icon className="w-10 h-10" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-1-5)', // 6px title→desc
        flex: 1,
      }}>
        <h3 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-2xl)', // 24px
          fontWeight: 'var(--font-weight-semibold)', // 600
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h3>
        {description && (
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'var(--text-base)', // 16px
            color: 'var(--muted-foreground)', 
            lineHeight: 'var(--leading-normal)', // 1.5
            margin: 0,
            padding: 0,
          }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

/**
 * Horizontal Card Small - Compact List Item
 * Icon: 32px (w-8) • Padding: 16px • Gap icon→content: 16px • Gap title→desc: 4px
 * Title: h4 20px/600 League Spartan • Desc: 14px/400 Nunito
 */
export const HorizontalCardSmall: React.FC<HorizontalCardProps> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  description,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-md)', // 6px
        padding: 'var(--space-4)', // 16px
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--space-4)', // 16px icon→content
        width: '100%',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        ...style,
      }}
    >
      {Icon && <Icon className="w-8 h-8" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-1)', // 4px title→desc
        flex: 1,
      }}>
        <h4 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-xl)', // 20px
          fontWeight: 'var(--font-weight-semibold)', // 600
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h4>
        {description && (
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'var(--text-sm)', // 14px
            color: 'var(--muted-foreground)', 
            lineHeight: 'var(--leading-normal)', // 1.5
            margin: 0,
            padding: 0,
          }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

/**
 * Horizontal Card Mini - Action Item
 * Icon: 24px (w-6) • Padding: 12px • Gap icon→content: 12px
 * Title: h5 18px/600 League Spartan • No description
 */
export const HorizontalCardMini: React.FC<HorizontalCardProps> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-md)', // 6px
        padding: 'var(--space-3)', // 12px
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--space-3)', // 12px icon→content
        width: '100%',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        ...style,
      }}
    >
      {Icon && <Icon className="w-6 h-6" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />}
      
      <div style={{ flex: 1 }}>
        <h5 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-lg)', // 18px
          fontWeight: 'var(--font-weight-semibold)', // 600
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h5>
        {children}
      </div>
    </div>
  );
};

// ============================================
// ACTION CARDS (Dashboard Quick Actions)
// ============================================

/**
 * Action Card - Quick Action avec description (Default Glass) - Button Style
 * Icon: 32px (w-8) • Padding: 20px vertical, 12px horizontal • Gap icon→content: 12px • Gap title→desc: 6px
 * Title: h4 18px/600 League Spartan • Desc: 14px/400 Nunito
 * Layout: Icon et heading CENTRÉS
 * Perfect for: Dashboard quick actions grid (imite un bouton)
 */
export const ActionCard: React.FC<VerticalCardProps> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  description,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  const hoverHandlers = createGlassHoverWithColoredGlowAndScale(iconColor);

  return (
    <div
      onClick={onClick}
      className={`transition-all duration-300 ${className}`}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-2xl)', // 24px
        padding: 'var(--space-5)', // 20px - réduit
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)', // 12px icon→content - réduit
        width: '100%',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'flex-start',
        minHeight: '160px', // Hauteur minimum réduite
        ...style,
      }}
      {...hoverHandlers}
    >
      {/* Icône dans un cercle coloré */}
      {Icon && (
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: `${iconColor}20`, // 20 = 12.5% opacity en hex
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon className="w-10 h-10" style={{ color: iconColor, strokeWidth: 2 }} />
        </div>
      )}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-1)', // 4px title→desc - réduit
        width: '100%',
        alignItems: 'center',
      }}>
        <h4 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-base)', // 16px - réduit
          fontWeight: 'var(--font-weight-bold)', // 700
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h4>
        {description && (
          <p style={{ 
            fontFamily: 'var(--font-body)', // Nunito
            fontSize: 'var(--text-xs)', // 12px - réduit
            color: 'var(--muted-foreground)', 
            lineHeight: 'var(--leading-normal)', // 1.5
            margin: 0,
            padding: 0,
          }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

/**
 * Action Card Mini - Quick Action compact sans description (Default Glass)
 * Icon: 28px (w-7) • Padding: 14px • Gap icon→title: 8px
 * Title: h5 15px/600 League Spartan
 * Layout: Icon et heading CENTRÉS - Button style
 * Perfect for: Compact dashboard actions, sidebars, quick shortcuts
 */
export const ActionCardMini: React.FC<Omit<VerticalCardProps, 'description'>> = ({
  icon: Icon,
  iconColor = 'var(--primary)',
  title,
  children,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-lg)', // 10px
        padding: 'var(--space-3-5)', // 14px
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)', // 8px icon→title
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {Icon && <Icon className="w-7 h-7" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />}
      
      <h5 style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '15px',
        fontWeight: 'var(--font-weight-semibold)', // 600
        color: 'var(--foreground)', 
        lineHeight: 'var(--leading-tight)', // 1.25
        margin: 0,
        padding: 0,
        whiteSpace: 'nowrap',
      }}>
        {title}
      </h5>
      {children}
    </div>
  );
};

/**
 * Journal Prompt Card - Card verticale compacte avec Badge, Icône et Question
 * Badge: 12px texte, padding augmenté • Icon: 48px (w-12) • Padding réduit • Gap minimal
 * Question: 16px/500 Nunito
 * Layout: Badge + Icon + Question (tous centrés, ultra-compact)
 * Perfect for: Journal prompts, questionnaires
 */
interface JournalPromptCardProps {
  badge: string;
  badgeColor: string;
  badgeBg: string;
  icon: LucideIcon;
  iconColor: string;
  question: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const JournalPromptCard: React.FC<JournalPromptCardProps> = ({
  badge,
  badgeColor,
  badgeBg,
  icon: Icon,
  iconColor,
  question,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-2xl)', // 24px
        padding: 'var(--space-5)', // 20px padding uniforme
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)', // 16px gap fixe entre tous les éléments
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        cursor: onClick ? 'pointer' : 'default',
        justifyContent: 'center', // Centre le contenu verticalement
        position: 'relative',
        ...style,
      }}
    >
      {/* Badge en haut - Padding généreux */}
      <span
        style={{
          padding: 'var(--space-2-5) var(--space-5)', // 10px 20px - padding généreux
          borderRadius: 'var(--radius-full)',
          background: badgeBg,
          color: badgeColor,
          fontSize: 'var(--text-xs)', // 12px
          fontWeight: 'var(--font-weight-semibold)', // 600
          fontFamily: 'var(--font-body)',
          flexShrink: 0,
        }}
      >
        {badge}
      </span>

      {/* Icône - Aligné avec gap fixe */}
      <Icon 
        className="w-12 h-12" 
        style={{ 
          color: iconColor, 
          flexShrink: 0, 
          strokeWidth: 1.5,
        }} 
      />

      {/* Question - Aligné avec gap fixe */}
      <p
        style={{
          fontFamily: 'var(--font-body)', // Nunito
          fontSize: 'var(--text-base)', // 16px
          fontWeight: 'var(--font-weight-medium)', // 500
          color: 'var(--foreground)',
          lineHeight: 'var(--leading-normal)', // 1.5
          margin: 0,
          padding: 0,
          flexShrink: 0, // Ne rétrécit pas
        }}
      >
        {question}
      </p>
    </div>
  );
};

/**
 * Activity Card - Card ultra-compacte pour fil d'actualités minimaliste
 * Icon: 32px (w-8) • Padding: 16px • Gap icon→content: 12px
 * Title + Badge: même ligne • Meta: 13px/400 • Desc: 14px/400 Nunito
 * Layout: Icon → (Badge+Title | Meta | Description) - Ultra-compact vertical
 * Perfect for: Activity feed, notifications, recent actions
 */
interface ActivityCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  date?: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  showBadge?: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  icon: Icon,
  iconColor,
  title,
  badge,
  badgeColor = 'var(--muted-foreground)',
  date,
  description,
  onClick,
  className = '',
  style = {},
  showBadge = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        ...defaultGlassStyle,
        borderRadius: 'var(--radius-2xl)', // 24px
        padding: 'var(--space-4)', // 16px - Compact
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--space-4)', // 16px icon→content
        width: '100%',
        cursor: onClick ? 'pointer' : 'default',
        alignItems: 'flex-start',
        ...style,
      }}
    >
      {/* Icon - 32px avec strokeWidth 1.5 */}
      <Icon className="w-8 h-8" style={{ color: iconColor, flexShrink: 0, strokeWidth: 1.5 }} />

      {/* Content */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-0-5)', // 2px entre heading et meta - Très réduit
        flex: 1,
      }}>
        {/* Title uniquement - Badge retiré */}
        <h3 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-lg)', // 18px
          fontWeight: 'var(--font-weight-semibold)', // 600
          color: 'var(--foreground)', 
          lineHeight: 'var(--leading-tight)', // 1.25
          margin: 0,
          padding: 0,
        }}>
          {title}
        </h3>

        {/* Metadata - Police 12px */}
        {date && (
          <span style={{
            color: 'var(--muted-foreground)',
            fontSize: 'var(--text-xs)', // 12px
            fontFamily: 'var(--font-body)', // Nunito
            lineHeight: 1.4,
          }}>
            {date}
          </span>
        )}

        {/* Description - Nunito 16px avec gap */}
        {description && (
          <p style={{ 
            fontFamily: 'var(--font-body)', // Nunito
            fontSize: 'var(--text-base)', // 16px - Confirmé
            color: 'var(--foreground)',
            lineHeight: 'var(--leading-normal)', // 1.5
            margin: 0,
            padding: 0,
            marginTop: 'var(--space-2)', // 8px gap avec meta
          }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================
// SMART CARD WRAPPER (détecte orientation)
// ============================================

interface SmartCardProps extends BaseCardProps {
  size?: CardSize;
  orientation?: CardOrientation;
}

/**
 * Smart Card - Détecte automatiquement la meilleure card selon size et orientation
 */
export const Card: React.FC<SmartCardProps> = ({
  orientation = 'vertical',
  size = 'medium',
  ...props
}) => {
  if (orientation === 'vertical') {
    if (size === 'xl') return <VerticalCardXL {...props} />;
    if (size === 'large') return <VerticalCardLarge {...props} />;
    if (size === 'medium') return <VerticalCardMedium {...props} />;
    if (size === 'small') return <VerticalCardSmall {...props} />;
    return <VerticalCardMedium {...props} />; // Fallback
  } else {
    if (size === 'large') return <HorizontalCardLarge {...props} />;
    if (size === 'medium') return <HorizontalCardMedium {...props} />;
    if (size === 'small') return <HorizontalCardSmall {...props} />;
    if (size === 'mini') return <HorizontalCardMini {...props} />;
    return <HorizontalCardMedium {...props} />; // Fallback
  }
};
