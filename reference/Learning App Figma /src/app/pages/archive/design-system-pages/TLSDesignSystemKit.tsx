import { useState } from 'react';
import {
  Palette, Type, Box, Sliders, Sparkles, AlertCircle, Check, AlertTriangle,
  Info, X, ChevronRight, Eye, EyeOff, ArrowLeft, Star, Zap, Lock, Globe,
  BookOpen, Award, TrendingUp, Users, Clock, Layout, Layers, Square, Circle
} from 'lucide-react';

// ──────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────
interface Props {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

type Section = 'colors' | 'typography' | 'buttons' | 'cards' | 'forms' | 'badges' | 'alerts' | 'gradients' | 'spacing';

// ──────────────────────────────────────────────
// SECTION NAV
// ──────────────────────────────────────────────
const sections: { id: Section; label: string; icon: typeof Palette }[] = [
  { id: 'colors',     label: 'Couleurs',        icon: Palette },
  { id: 'typography', label: 'Typographie',      icon: Type },
  { id: 'buttons',    label: 'Boutons',          icon: Box },
  { id: 'cards',      label: 'Cartes',           icon: Layers },
  { id: 'forms',      label: 'Formulaires',      icon: Sliders },
  { id: 'badges',     label: 'Badges & Tags',    icon: Star },
  { id: 'alerts',     label: 'Alertes',          icon: AlertCircle },
  { id: 'gradients',  label: 'Règles Gradients', icon: Sparkles },
  { id: 'spacing',    label: 'Espacements',      icon: Layout },
];

// ──────────────────────────────────────────────
// COLORS DATA
// ──────────────────────────────────────────────
const colorTokens = [
  {
    group: 'Brand Primary — Bleu',
    tokens: [
      { name: '--primary',          hex: '#55A1B4', label: 'Primary Base' },
      { name: '--primary-light',    hex: '#7BC4D4', label: 'Primary Light' },
      { name: '--primary-lighter',  hex: '#E8F4F7', label: 'Primary Lighter' },
      { name: '--primary-hover',    hex: '#4A8FA1', label: 'Primary Hover' },
      { name: '--primary-700',      hex: '#3D7786', label: 'Primary 700' },
      { name: '--primary-900',      hex: '#1F3E45', label: 'Primary 900' },
    ],
  },
  {
    group: 'Brand Secondary — Orange',
    tokens: [
      { name: '--secondary',        hex: '#ED843A', label: 'Secondary Base' },
      { name: '--secondary-light',  hex: '#F5A868', label: 'Secondary Light' },
      { name: '--secondary-lighter',hex: '#FFF4E6', label: 'Secondary Lighter' },
      { name: '--secondary-hover',  hex: '#C06920', label: 'Secondary Hover' },
      { name: '--secondary-700',    hex: '#8F5017', label: 'Secondary 700' },
      { name: '--secondary-900',    hex: '#3B2109', label: 'Secondary 900' },
    ],
  },
  {
    group: 'Accent — Jaune',
    tokens: [
      { name: '--accent',           hex: '#F8B044', label: 'Accent Base' },
      { name: '--accent-light',     hex: '#FFC977', label: 'Accent Light' },
      { name: '--accent-lighter',   hex: '#FFF9EE', label: 'Accent Lighter' },
      { name: '--accent-hover',     hex: '#C68D36', label: 'Accent Hover' },
      { name: '--accent-700',       hex: '#AE7B30', label: 'Accent 700' },
      { name: '--accent-900',       hex: '#7C5822', label: 'Accent 900' },
    ],
  },
  {
    group: 'Sémantique — États',
    tokens: [
      { name: '--success',          hex: '#4A8C6E', label: 'Success' },
      { name: '--success-100',      hex: '#D6EDE5', label: 'Success Light' },
      { name: '--destructive',      hex: '#A93226', label: 'Destructive' },
      { name: '--destructive-100',  hex: '#FAE1DF', label: 'Destructive Light' },
      { name: '--warning',          hex: '#F8B044', label: 'Warning' },
      { name: '--info',             hex: '#2E8F98', label: 'Info' },
    ],
  },
  {
    group: 'Neutrals',
    tokens: [
      { name: '--neutral-50',       hex: '#F5F8F8', label: 'Neutral 50' },
      { name: '--neutral-200',      hex: '#E0E8EA', label: 'Neutral 200' },
      { name: '--neutral-400',      hex: '#9AABB0', label: 'Neutral 400' },
      { name: '--neutral-600',      hex: '#535B62', label: 'Neutral 600' },
      { name: '--neutral-800',      hex: '#2A3538', label: 'Neutral 800' },
      { name: '--neutral-dark',     hex: '#252B37', label: 'Neutral Dark' },
    ],
  },
];

// ──────────────────────────────────────────────
// COMPONENT: Color Swatch
// ──────────────────────────────────────────────
function ColorSwatch({ name, hex, label }: { name: string; hex: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isLight = ['#F5F8F8', '#E8F4F7', '#FFF4E6', '#FFF9EE', '#E0E8EA', '#D6EDE5', '#FAE1DF', '#FDDCC7'].includes(hex);

  return (
    <button
      onClick={handleCopy}
      title={`Copier ${name}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 0,
      }}
    >
      <div style={{
        width: '100%',
        height: '64px',
        borderRadius: 'var(--radius-lg)',
        background: `var(${name})`,
        border: isLight ? '1px solid var(--border)' : 'none',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 'var(--space-2)',
        transition: 'transform var(--duration-fast) var(--ease-out)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {copied && (
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: isLight ? 'var(--foreground)' : 'white',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 'var(--radius-sm)',
            padding: '2px 6px',
          }}>Copié!</span>
        )}
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: 0 }}>{label}</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--neutral-500)', margin: '2px 0 0', fontWeight: 'var(--font-regular)' }}>{name}</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--neutral-400)', margin: '1px 0 0', fontWeight: 'var(--font-regular)' }}>{hex}</p>
      </div>
    </button>
  );
}

// ──────────────────────────────────────────────
// COMPONENT: Section Title
// ──────────────────────────────────────────────
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-3xl)',
        fontWeight: 'var(--font-bold)',
        color: 'var(--foreground)',
        margin: 0,
        lineHeight: 'var(--leading-tight)',
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--neutral-500)',
          margin: 'var(--space-2) 0 0',
          fontWeight: 'var(--font-regular)',
        }}>{subtitle}</p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// COMPONENT: Token Tag
// ──────────────────────────────────────────────
function TokenTag({ value }: { value: string }) {
  return (
    <code style={{
      fontFamily: 'monospace',
      fontSize: 'var(--text-xs)',
      background: 'var(--primary-50)',
      color: 'var(--primary-700)',
      borderRadius: 'var(--radius-sm)',
      padding: '2px 8px',
      border: '1px solid var(--primary-200)',
    }}>{value}</code>
  );
}

// ──────────────────────────────────────────────
// COMPONENT: Rule Pill
// ──────────────────────────────────────────────
function RulePill({ type, label }: { type: 'allowed' | 'forbidden' | 'context'; label: string }) {
  const styles = {
    allowed:   { bg: 'var(--success-100)',      color: 'var(--success-600)',      border: 'var(--success-200)' },
    forbidden: { bg: 'var(--destructive-100)',  color: 'var(--destructive-600)',  border: 'var(--destructive-200)' },
    context:   { bg: 'var(--accent-lighter)',   color: 'var(--accent-700)',       border: 'var(--accent-200)' },
  }[type];

  return (
    <span style={{
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--font-semibold)',
      background: styles.bg,
      color: styles.color,
      border: `1px solid ${styles.border}`,
      borderRadius: 'var(--radius-full)',
      padding: '3px 10px',
      display: 'inline-block',
    }}>{label}</span>
  );
}

// ──────────────────────────────────────────────
// SECTIONS
// ──────────────────────────────────────────────

function ColorsSection() {
  return (
    <div>
      <SectionTitle title="Couleurs" subtitle="Toutes les variables CSS du design system TLS — utiliser uniquement ces tokens." />
      {colorTokens.map((group) => (
        <div key={group.group} style={{ marginBottom: 'var(--space-10)' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-semibold)',
            color: 'var(--foreground)',
            margin: '0 0 var(--space-4)',
          }}>{group.group}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 'var(--space-4)' }}>
            {group.tokens.map((token) => (
              <ColorSwatch key={token.name} {...token} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypographySection() {
  return (
    <div>
      <SectionTitle title="Typographie" subtitle="Uniquement --font-display (League Spartan) et --font-body (Nunito) sont autorisés." />

      {/* Font Families */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
        {/* Display */}
        <div style={{
          background: 'var(--primary-50)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          border: '1px solid var(--primary-200)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <TokenTag value="--font-display" />
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--primary)',
            margin: '0 0 var(--space-2)',
            lineHeight: 'var(--leading-tight)',
          }}>League Spartan</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)' }}>
            Titres, headings, display — weights 100→900
          </p>
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {['Black 900', 'Bold 700', 'SemiBold 600', 'Medium 500', 'Regular 400', 'Light 300'].map((w, i) => {
              const weights = [900, 700, 600, 500, 400, 300];
              return (
                <span key={w} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: weights[i], color: 'var(--foreground)' }}>
                  {w} — Aa Bb Cc 0123
                </span>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div style={{
          background: 'var(--secondary-lighter)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          border: '1px solid var(--secondary-100)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <TokenTag value="--font-body" />
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--secondary)',
            margin: '0 0 var(--space-2)',
            lineHeight: 'var(--leading-tight)',
          }}>Nunito</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)' }}>
            Corps de texte, labels, UI — weights 200→900
          </p>
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {['Black 900', 'Bold 700', 'SemiBold 600', 'Medium 500', 'Regular 400', 'Light 300'].map((w, i) => {
              const weights = [900, 700, 600, 500, 400, 300];
              return (
                <span key={w} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', fontWeight: weights[i], color: 'var(--foreground)' }}>
                  {w} — Aa Bb Cc 0123
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Type Scale */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', marginBottom: 'var(--space-4)' }}>
        Échelle typographique
      </h3>
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        marginBottom: 'var(--space-10)',
      }}>
        {[
          { var: '--text-6xl', size: '3.75rem/60px', label: 'Hero / Display' },
          { var: '--text-5xl', size: '3rem/48px', label: 'Page Hero' },
          { var: '--text-4xl', size: '2.25rem/36px', label: 'Section Hero' },
          { var: '--text-3xl', size: '1.875rem/30px', label: 'Page Title H1' },
          { var: '--text-2xl', size: '1.5rem/24px', label: 'Section Title H2' },
          { var: '--text-xl',  size: '1.25rem/20px', label: 'Card Title H3' },
          { var: '--text-lg',  size: '1.125rem/18px', label: 'Subheading H4' },
          { var: '--text-base',size: '1rem/16px',    label: 'Body Default' },
          { var: '--text-sm',  size: '0.875rem/14px', label: 'Label / Caption' },
          { var: '--text-xs',  size: '0.75rem/12px',  label: 'Micro / Tags' },
        ].map((item, idx) => (
          <div key={item.var} style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr 180px',
            alignItems: 'center',
            padding: 'var(--space-3) var(--space-6)',
            borderBottom: idx < 9 ? '1px solid var(--border)' : 'none',
            background: idx % 2 === 0 ? 'white' : 'var(--neutral-50)',
          }}>
            <TokenTag value={item.var} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: `var(${item.var})`, fontWeight: 'var(--font-semibold)', color: 'var(--foreground)' }}>
              Aa — {item.label}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-400)', textAlign: 'right', fontWeight: 'var(--font-regular)' }}>
              {item.size}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ButtonsSection() {
  const [loading, setLoading] = useState(false);

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-semibold)',
    cursor: 'pointer',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    transition: 'all var(--duration-fast) var(--ease-in-out)',
    whiteSpace: 'nowrap' as const,
  };

  const sizes = {
    sm:  { padding: 'var(--space-2) var(--space-4)',  fontSize: 'var(--text-sm)',   height: '36px' },
    md:  { padding: 'var(--space-3) var(--space-6)',  fontSize: 'var(--text-base)', height: '44px' },
    lg:  { padding: 'var(--space-4) var(--space-8)',  fontSize: 'var(--text-lg)',  height: '52px' },
  };

  type BtnVariant = {
    label: string;
    style: React.CSSProperties;
    rule: string;
  };

  const variants: BtnVariant[] = [
    {
      label: 'Primary',
      rule: 'Gradient mono-couleur bleu OK',
      style: { background: 'var(--gradient-primary)', color: 'white', boxShadow: '0 4px 12px rgba(85,161,180,0.3)' },
    },
    {
      label: 'Secondary',
      rule: 'Gradient orange→orange+foncé OK',
      style: { background: 'var(--gradient-secondary)', color: 'white', boxShadow: '0 4px 12px rgba(237,132,58,0.3)' },
    },
    {
      label: 'Warm (Orange+Jaune)',
      rule: 'Exception orange+jaune autorisée',
      style: { background: 'var(--gradient-warm)', color: 'white', boxShadow: '0 4px 12px rgba(237,132,58,0.3)' },
    },
    {
      label: 'Success',
      rule: 'Couleur sémantique --success',
      style: { background: 'var(--success)', color: 'var(--success-foreground)', boxShadow: '0 4px 12px rgba(74,140,110,0.3)' },
    },
    {
      label: 'Destructive',
      rule: 'Couleur sémantique --destructive',
      style: { background: 'var(--destructive)', color: 'var(--destructive-foreground)', boxShadow: '0 4px 12px rgba(169,50,38,0.3)' },
    },
    {
      label: 'Outline Primary',
      rule: 'Transparent + border --primary',
      style: { background: 'transparent', color: 'var(--primary)', border: '2px solid var(--primary)' },
    },
    {
      label: 'Outline Secondary',
      rule: 'Transparent + border --secondary',
      style: { background: 'transparent', color: 'var(--secondary)', border: '2px solid var(--secondary)' },
    },
    {
      label: 'Ghost',
      rule: 'Background transparent teinté',
      style: { background: 'rgba(85, 161, 180, 0.08)', color: 'var(--primary)' },
    },
    {
      label: 'Glass',
      rule: 'Glassmorphism — backdrop-filter',
      style: {
        background: 'rgba(255,255,255,0.7)',
        color: 'var(--primary)',
        border: '1px solid rgba(255,255,255,0.8)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 8px rgba(85,161,180,0.15)',
      },
    },
    {
      label: 'Muted',
      rule: 'Neutre — var(--muted)',
      style: { background: 'var(--muted)', color: 'var(--muted-foreground)' },
    },
    {
      label: 'Disabled',
      rule: 'opacity: 0.5 + cursor not-allowed',
      style: { background: 'var(--gradient-primary)', color: 'white', opacity: 0.5, cursor: 'not-allowed' },
    },
    {
      label: 'Loading',
      rule: 'Spinner + opacity 0.7',
      style: { background: 'var(--gradient-primary)', color: 'white', opacity: 0.8, cursor: 'not-allowed' },
    },
  ];

  return (
    <div>
      <SectionTitle title="Boutons" subtitle="Toutes les variantes utilisent des CSS variables. Les gradients multi-couleurs sont interdits sauf orange+jaune." />

      {/* All variants at md size */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>
        Variantes (taille MD — 44px)
      </h3>
      <div style={{
        background: 'var(--neutral-50)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        border: '1px solid var(--border)',
        marginBottom: 'var(--space-8)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          {variants.map((v) => (
            <div key={v.label} style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              alignItems: 'flex-start',
            }}>
              <button style={{ ...btnBase, ...sizes.md, ...v.style }}>
                {v.label === 'Loading' && (
                  <span style={{
                    width: '16px', height: '16px',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                )}
                {v.label}
              </button>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)' }}>
                {v.rule}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>
        Tailles
      </h3>
      <div style={{
        background: 'var(--neutral-50)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        flexWrap: 'wrap' as const,
        marginBottom: 'var(--space-8)',
      }}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
            <button style={{ ...btnBase, ...sizes[s], background: 'var(--gradient-primary)', color: 'white' }}>
              Bouton {s.toUpperCase()}
            </button>
            <code style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--neutral-400)' }}>
              {s === 'sm' ? 'h-36px, text-sm' : s === 'md' ? 'h-44px, text-base' : 'h-52px, text-lg'}
            </code>
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function CardsSection() {
  return (
    <div>
      <SectionTitle title="Cartes" subtitle="Styles glass, solid, outlined et elevated — tous via CSS variables." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>

        {/* Solid White */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--neutral-500)', marginBottom: 'var(--space-2)' }}>
            Card Standard — Solid White
          </p>
          <div style={{
            background: 'var(--card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--card-padding-x) var(--card-padding-y)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={20} style={{ color: 'var(--primary)' } as React.CSSProperties} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: 0 }}>Titre de la carte</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)' }}>Sous-titre descriptif</p>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: '0 0 var(--space-4)', lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-regular)' }}>
              Contenu de la carte. Utilise `var(--card)` pour le background, `var(--border)` pour la bordure, `var(--shadow-sm)` pour l'ombre.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--primary)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: 0,
              }}>
                Action <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Glass */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--neutral-500)', marginBottom: 'var(--space-2)' }}>
            Glass Card — Glassmorphism
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--card-padding-x) var(--card-padding-y)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(85, 161, 180, 0.12), 0 1px 4px rgba(0,0,0,0.06)',
            background2: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(232,244,247,0.6) 100%)',
          } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: 'rgba(85,161,180,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(85,161,180,0.2)' }}>
                <Sparkles size={20} style={{ color: 'var(--primary)' } as React.CSSProperties} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: 0 }}>Glass Card</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)' }}>Effet glassmorphism</p>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: '0 0 var(--space-4)', lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-regular)' }}>
              `rgba(255,255,255,0.72)` + `backdrop-filter: blur(20px)` + `border: 1px solid rgba(255,255,255,0.8)`
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)',
                color: 'white', background: 'var(--primary)', border: 'none', cursor: 'pointer',
                padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)',
              }}>Action</button>
            </div>
          </div>
        </div>

        {/* Elevated */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--neutral-500)', marginBottom: 'var(--space-2)' }}>
            Card Elevated — Shadow forte
          </p>
          <div style={{
            background: 'var(--card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--card-padding-x) var(--card-padding-y)',
            boxShadow: 'var(--shadow-lg)',
            border: 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: 'var(--secondary-lighter)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={20} style={{ color: 'var(--secondary)' } as React.CSSProperties} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: 0 }}>Card Elevated</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)' }}>var(--shadow-lg)</p>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: 0, lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-regular)' }}>
              Pas de border, ombre forte. Idéal pour modal, popover, card principale.
            </p>
          </div>
        </div>

        {/* Colored Border */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--neutral-500)', marginBottom: 'var(--space-2)' }}>
            Card Accent Border — Bord coloré
          </p>
          <div style={{
            background: 'var(--card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--card-padding-x) var(--card-padding-y)',
            border: '2px solid var(--primary)',
            boxShadow: '0 4px 16px rgba(85,161,180,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={20} style={{ color: 'white' } as React.CSSProperties} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: 0 }}>Card Accent</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)' }}>border: 2px solid var(--primary)</p>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: 0, lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-regular)' }}>
              Utilisé pour la card "en cours" ou "sélectionnée". La couleur de border suit la sémantique.
            </p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>
        Stat Cards — KPI
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-10)' }}>
        {[
          { label: 'Cours complétés', value: '12', sub: '+3 ce mois', icon: BookOpen, color: 'var(--primary)', bg: 'var(--primary-50)', trend: '+25%' },
          { label: 'Streak actuel', value: '7j', sub: 'Record: 21j', icon: Zap, color: 'var(--secondary)', bg: 'var(--secondary-lighter)', trend: '🔥' },
          { label: 'Points XP', value: '2 450', sub: 'Niveau 8', icon: Award, color: 'var(--accent-600)', bg: 'var(--accent-lighter)', trend: '+120' },
          { label: 'Coachings', value: '3', sub: 'Ce trimestre', icon: Users, color: 'var(--success)', bg: 'var(--success-100)', trend: '+1' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: 'var(--card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-lg)', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={18} style={{ color: stat.color } as React.CSSProperties} />
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--success)', background: 'var(--success-100)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                {stat.trend}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: stat.color, margin: '0 0 var(--space-1)' }}>
              {stat.value}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-1)' }}>
              {stat.label}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-400)', margin: 0, fontWeight: 'var(--font-regular)' }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormsSection() {
  const [showPwd, setShowPwd] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [errVal, setErrVal] = useState('Jean Dupont');
  const [selectVal, setSelectVal] = useState('');

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-semibold)',
    color: 'var(--foreground)',
    display: 'block',
    marginBottom: 'var(--space-1-5)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '44px',
    padding: '0 var(--space-4)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-regular)',
    color: 'var(--foreground)',
    background: 'var(--input-background)',
    border: '1px solid var(--input-border)',
    borderRadius: 'var(--radius-lg)',
    outline: 'none',
    transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
    boxSizing: 'border-box' as const,
  };

  return (
    <div>
      <SectionTitle title="Formulaires" subtitle="Inputs, textareas, selects — via var(--input-background), var(--input-border), var(--ring)." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-6)' }}>

        {/* Default Input */}
        <div>
          <label style={labelStyle}>Champ texte standard</label>
          <input
            type="text"
            placeholder="Entrez votre texte..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(85,161,180,0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--input-border)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-400)', margin: 'var(--space-1) 0 0', fontWeight: 'var(--font-regular)' }}>
            Focus: border var(--primary) + ring rgba(primary, 0.15)
          </p>
        </div>

        {/* Error Input */}
        <div>
          <label style={labelStyle}>Champ en erreur</label>
          <input
            type="text"
            value={errVal}
            onChange={(e) => setErrVal(e.target.value)}
            style={{ ...inputStyle, borderColor: 'var(--destructive)', boxShadow: '0 0 0 3px rgba(169,50,38,0.12)' }}
          />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--destructive)', margin: 'var(--space-1) 0 0', fontWeight: 'var(--font-medium)' }}>
            Ce champ contient une erreur.
          </p>
        </div>

        {/* Password */}
        <div>
          <label style={labelStyle}>Mot de passe</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="••••••••"
              style={{ ...inputStyle, paddingRight: 'var(--space-12)' }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(85,161,180,0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--input-border)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={() => setShowPwd(!showPwd)}
              style={{
                position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-400)',
                display: 'flex', alignItems: 'center', padding: 0,
              }}
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Select */}
        <div>
          <label style={labelStyle}>Sélection</label>
          <select
            value={selectVal}
            onChange={(e) => setSelectVal(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as const }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(85,161,180,0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--input-border)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">Choisissez une option...</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </div>

        {/* Textarea */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Zone de texte</label>
          <textarea
            placeholder="Décrivez votre réflexion..."
            rows={4}
            style={{
              ...inputStyle,
              height: 'auto',
              padding: 'var(--space-3) var(--space-4)',
              resize: 'vertical' as const,
              lineHeight: 'var(--leading-relaxed)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(85,161,180,0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--input-border)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Checkbox & Radio */}
        <div>
          <label style={{ ...labelStyle, marginBottom: 'var(--space-3)' }}>Checkbox</label>
          {['Option 1', 'Option 2 (cochée)', 'Option 3'].map((opt, i) => (
            <label key={opt} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)',
              cursor: 'pointer', fontWeight: 'var(--font-regular)',
            }}>
              <span style={{
                width: '18px', height: '18px', borderRadius: 'var(--radius-sm)',
                border: i === 1 ? '2px solid var(--primary)' : '2px solid var(--border)',
                background: i === 1 ? 'var(--primary)' : 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {i === 1 && <Check size={12} color="white" />}
              </span>
              {opt}
            </label>
          ))}
        </div>

        {/* Progress bars */}
        <div>
          <label style={{ ...labelStyle, marginBottom: 'var(--space-3)' }}>Progress Bars (gradients autorisés)</label>
          {[
            { label: 'Progression cours', value: 68, gradient: 'var(--gradient-primary)' },
            { label: 'Objectif mensuel', value: 45, gradient: 'var(--gradient-warm)' },
            { label: 'Complétion profil', value: 90, gradient: 'linear-gradient(90deg, var(--success-400), var(--success-500))' },
          ].map((p) => (
            <div key={p.label} style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-500)', fontWeight: 'var(--font-medium)' }}>{p.label}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--foreground)' }}>{p.value}%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--neutral-200)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${p.value}%`,
                  background: p.gradient,
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.5s var(--ease-out)',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BadgesSection() {
  return (
    <div>
      <SectionTitle title="Badges & Tags" subtitle="Indicateurs sémantiques utilisant les couleurs du design system." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-8)' }}>

        {/* Status Badges */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>Badges statut</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-2)' }}>
            {[
              { label: 'Nouveau', bg: 'var(--primary-50)', color: 'var(--primary-700)', border: 'var(--primary-200)' },
              { label: 'En cours', bg: 'var(--secondary-lighter)', color: 'var(--secondary-700)', border: 'var(--secondary-100)' },
              { label: 'Complété', bg: 'var(--success-100)', color: 'var(--success-700)', border: 'var(--success-200)' },
              { label: 'Erreur', bg: 'var(--destructive-100)', color: 'var(--destructive-600)', border: 'var(--destructive-200)' },
              { label: 'Attention', bg: 'var(--accent-lighter)', color: 'var(--accent-700)', border: 'var(--accent-200)' },
              { label: 'Info', bg: 'var(--info-50)', color: 'var(--info-600)', border: 'var(--info-200)' },
              { label: 'Verrouillé', bg: 'var(--neutral-100)', color: 'var(--neutral-600)', border: 'var(--neutral-300)' },
            ].map((b) => (
              <span key={b.label} style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-semibold)',
                background: b.bg,
                color: b.color,
                border: `1px solid ${b.border}`,
                borderRadius: 'var(--radius-full)',
                padding: 'var(--space-1) var(--space-3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
              }}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Solid Badges */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>Badges solid (pill)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-2)' }}>
            {[
              { label: 'Primary',     bg: 'var(--primary)',     color: 'var(--primary-foreground)' },
              { label: 'Secondary',   bg: 'var(--secondary)',   color: 'var(--secondary-foreground)' },
              { label: 'Accent',      bg: 'var(--accent)',      color: 'var(--accent-foreground)' },
              { label: 'Success',     bg: 'var(--success)',     color: 'var(--success-foreground)' },
              { label: 'Destructive', bg: 'var(--destructive)', color: 'var(--destructive-foreground)' },
              { label: 'Neutral',     bg: 'var(--neutral-700)', color: 'white' },
            ].map((b) => (
              <span key={b.label} style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-semibold)',
                background: b.bg,
                color: b.color,
                borderRadius: 'var(--radius-full)',
                padding: 'var(--space-1) var(--space-3)',
              }}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Gamification Badges */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>Badges gamification</h3>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            {[
              { emoji: '🏆', label: 'Champion', color: 'var(--accent)', bg: 'var(--accent-lighter)', border: 'var(--accent-200)' },
              { emoji: '⚡', label: 'Streak 7j', color: 'var(--secondary)', bg: 'var(--secondary-lighter)', border: 'var(--secondary-100)' },
              { emoji: '🎯', label: 'Précision', color: 'var(--primary)', bg: 'var(--primary-50)', border: 'var(--primary-200)' },
              { emoji: '🌟', label: 'Expert', color: 'var(--success)', bg: 'var(--success-100)', border: 'var(--success-200)' },
            ].map((b) => (
              <div key={b.label} style={{
                background: b.bg,
                border: `1px solid ${b.border}`,
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                width: '80px',
              }}>
                <span style={{ fontSize: '28px' }}>{b.emoji}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: b.color, textAlign: 'center' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step indicators */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>Indicateurs d'étapes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {[
              { step: 1, label: 'Complété', state: 'done' },
              { step: 2, label: 'En cours', state: 'active' },
              { step: 3, label: 'À venir', state: 'pending' },
            ].map((s) => (
              <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: 'var(--radius-full)',
                  background: s.state === 'done' ? 'var(--success)' : s.state === 'active' ? 'var(--primary)' : 'var(--neutral-200)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {s.state === 'done'
                    ? <Check size={16} color="white" />
                    : <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: s.state === 'active' ? 'white' : 'var(--neutral-400)' }}>{s.step}</span>
                  }
                </div>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)',
                  color: s.state === 'pending' ? 'var(--neutral-400)' : 'var(--foreground)',
                }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertsSection() {
  const [visible, setVisible] = useState({ success: true, warning: true, error: true, info: true });

  const alertTypes = [
    {
      key: 'success' as const,
      icon: Check,
      title: 'Succès !',
      message: 'Votre cours a été complété avec succès. Continuez sur votre lancée !',
      bg: 'var(--success-100)',
      border: 'var(--success-200)',
      iconBg: 'var(--success)',
      titleColor: 'var(--success-700)',
      textColor: 'var(--success-600)',
      tokenBg: '--success-100',
      tokenBorder: '--success-200',
    },
    {
      key: 'warning' as const,
      icon: AlertTriangle,
      title: 'Attention',
      message: 'Votre session de coaching expire dans 24 heures. Pensez à la reprogrammer.',
      bg: 'var(--accent-lighter)',
      border: 'var(--accent-200)',
      iconBg: 'var(--accent)',
      titleColor: 'var(--accent-700)',
      textColor: 'var(--accent-600)',
      tokenBg: '--accent-lighter',
      tokenBorder: '--accent-200',
    },
    {
      key: 'error' as const,
      icon: X,
      title: 'Erreur',
      message: 'Une erreur est survenue lors du chargement. Veuillez réessayer.',
      bg: 'var(--destructive-100)',
      border: 'var(--destructive-200)',
      iconBg: 'var(--destructive)',
      titleColor: 'var(--destructive-600)',
      textColor: 'var(--destructive-500)',
      tokenBg: '--destructive-100',
      tokenBorder: '--destructive-200',
    },
    {
      key: 'info' as const,
      icon: Info,
      title: 'Information',
      message: 'Nouveau module disponible : "Leadership & Influence". Découvrez-le maintenant.',
      bg: 'var(--primary-50)',
      border: 'var(--primary-200)',
      iconBg: 'var(--primary)',
      titleColor: 'var(--primary-700)',
      textColor: 'var(--primary-600)',
      tokenBg: '--primary-50',
      tokenBorder: '--primary-200',
    },
  ];

  return (
    <div>
      <SectionTitle title="Alertes & Notifications" subtitle="Toasts, bannières et alertes inline — via variables sémantiques." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {alertTypes.map((a) => (
          visible[a.key] && (
            <div key={a.key} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-3)',
              background: a.bg,
              border: `1px solid ${a.border}`,
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-4) var(--space-5)',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: 'var(--radius-lg)',
                background: a.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <a.icon size={16} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: a.titleColor, margin: '0 0 var(--space-1)' }}>
                  {a.title}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: a.textColor, margin: '0 0 var(--space-2)', fontWeight: 'var(--font-regular)', lineHeight: 'var(--leading-relaxed)' }}>
                  {a.message}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <TokenTag value={a.tokenBg} />
                  <TokenTag value={a.tokenBorder} />
                </div>
              </div>
              <button
                onClick={() => setVisible(prev => ({ ...prev, [a.key]: false }))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: a.titleColor, padding: 0, opacity: 0.6 }}
              >
                <X size={16} />
              </button>
            </div>
          )
        ))}
        {!Object.values(visible).some(Boolean) && (
          <button
            onClick={() => setVisible({ success: true, warning: true, error: true, info: true })}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)',
              color: 'var(--primary)', background: 'var(--primary-50)', border: '1px solid var(--primary-200)',
              borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-6)', cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            Réafficher les alertes
          </button>
        )}
      </div>
    </div>
  );
}

function GradientsSection() {
  return (
    <div>
      <SectionTitle title="Règles des Gradients" subtitle="Convention stricte TLS — multi-couleurs interdits pour les composants UI." />

      {/* Rules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
        {[
          {
            title: '✅ Autorisé toujours',
            rule: 'forbidden' as const,
            items: [
              'Gradient mono-couleur pour boutons',
              'Orange + Jaune (exception validée)',
              'Gradient pour progress bars & sliders',
              'Gradient pour textes (text-gradient)',
              'Gradient pour backgrounds de page',
              'Gradient pour sections hero',
            ],
            bg: 'var(--success-100)',
            border: 'var(--success-200)',
            dot: 'var(--success)',
          },
          {
            title: '❌ Interdit — Composants UI',
            rule: 'forbidden' as const,
            items: [
              'Multi-couleurs sur boutons (ex: bleu→orange)',
              'Multi-couleurs sur cards ou panels',
              'Multi-couleurs sur badges/tags/chips',
              'Multi-couleurs sur formulaires',
              'Multi-couleurs sur headers',
              'Multi-couleurs sur toute navigation',
            ],
            bg: 'var(--destructive-100)',
            border: 'var(--destructive-200)',
            dot: 'var(--destructive)',
          },
          {
            title: '⚠️ Contexte requis',
            rule: 'context' as const,
            items: [
              'Hero section pleine largeur',
              'Landing page / onboarding',
              'Texte de titre spectaculaire',
              'Bannière principale de page',
              'Background de page auth',
              'Illustration décorative',
            ],
            bg: 'var(--accent-lighter)',
            border: 'var(--accent-200)',
            dot: 'var(--accent)',
          },
        ].map((col) => (
          <div key={col.title} style={{
            background: col.bg,
            border: `1px solid ${col.border}`,
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
          }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>
              {col.title}
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {col.items.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: col.dot, marginTop: '6px', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', lineHeight: 'var(--leading-snug)', fontWeight: 'var(--font-regular)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Gradient Showcase */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>
        Variables gradients disponibles
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {[
          { name: '--gradient-primary',   label: 'Gradient Primary (bouton OK)',  allowed: true },
          { name: '--gradient-secondary', label: 'Gradient Secondary (bouton OK)', allowed: true },
          { name: '--gradient-warm',      label: 'Gradient Warm Orange+Jaune (exception OK)', allowed: true },
          { name: '--gradient-tls',       label: 'Gradient TLS Multicolore (hero/page BG only)', allowed: false },
          { name: '--gradient-tls-text',  label: 'Gradient TLS Texte (text uniquement)', allowed: false },
          { name: '--gradient-tls-mesh',  label: 'Gradient Mesh (fond de page uniquement)', allowed: false },
        ].map((g) => (
          <div key={g.name} style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: `2px solid ${g.allowed ? 'var(--success-200)' : 'var(--destructive-200)'}`,
          }}>
            <div style={{ height: '64px', background: `var(${g.name})` }} />
            <div style={{ padding: 'var(--space-3)', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
                <code style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--neutral-500)' }}>{g.name}</code>
                <RulePill type={g.allowed ? 'allowed' : 'forbidden'} label={g.allowed ? 'UI ✓' : 'Contexte'} />
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)' }}>{g.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Text Gradient Demo */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>
        Gradient texte — usage autorisé
      </h3>
      <div style={{
        background: 'var(--neutral-50)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-8)',
        border: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--font-black)',
          background: 'var(--gradient-tls-text)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 var(--space-2)',
          lineHeight: 'var(--leading-tight)',
        }}>
          The Learning Society
        </p>
        <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', color: 'var(--neutral-400)' }}>
          background: var(--gradient-tls-text) + webkit-background-clip: text
        </code>
      </div>
    </div>
  );
}

function SpacingSection() {
  const spaces = [
    { name: '--space-1',   value: '0.25rem', px: '4px' },
    { name: '--space-2',   value: '0.5rem',  px: '8px' },
    { name: '--space-3',   value: '0.75rem', px: '12px' },
    { name: '--space-4',   value: '1rem',    px: '16px' },
    { name: '--space-5',   value: '1.25rem', px: '20px' },
    { name: '--space-6',   value: '1.5rem',  px: '24px' },
    { name: '--space-8',   value: '2rem',    px: '32px' },
    { name: '--space-10',  value: '2.5rem',  px: '40px' },
    { name: '--space-12',  value: '3rem',    px: '48px' },
    { name: '--space-16',  value: '4rem',    px: '64px' },
    { name: '--space-20',  value: '5rem',    px: '80px' },
  ];

  const radii = [
    { name: '--radius-sm',   value: '6px',    label: 'SM — Tags, chips' },
    { name: '--radius-md',   value: '8px',    label: 'MD — Input, bouton SM' },
    { name: '--radius-lg',   value: '10px',   label: 'LG — Bouton MD, icône' },
    { name: '--radius-xl',   value: '16px',   label: 'XL — Card, panel' },
    { name: '--radius-2xl',  value: '24px',   label: '2XL — Card large, modal' },
    { name: '--radius-full', value: '9999px', label: 'Full — Badge, pill' },
  ];

  return (
    <div>
      <SectionTitle title="Espacements & Rayons" subtitle="Toutes les valeurs de spacing et border-radius via variables CSS." />

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>
        Espacements — --space-*
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-10)' }}>
        {spaces.map((s) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <TokenTag value={s.name} />
            <div style={{
              height: '20px',
              width: s.px,
              background: 'var(--gradient-primary)',
              borderRadius: '2px',
              minWidth: '4px',
              flexShrink: 0,
            }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)', fontWeight: 'var(--font-regular)' }}>
              {s.value} — {s.px}
            </span>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>
        Border Radius — --radius-*
      </h3>
      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' as const }}>
        {radii.map((r) => (
          <div key={r.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{
              width: '64px', height: '64px',
              background: 'var(--primary-50)',
              border: '2px solid var(--primary)',
              borderRadius: `var(${r.name})`,
            }} />
            <TokenTag value={r.name} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--neutral-400)', textAlign: 'center', maxWidth: '100px', fontWeight: 'var(--font-regular)' }}>
              {r.value}<br/>{r.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN PAGE
// ──────────────────────────────────────────────
export default function TLSDesignSystemKit({ onNavigate }: Props) {
  const [activeSection, setActiveSection] = useState<Section>('colors');

  const renderSection = () => {
    switch (activeSection) {
      case 'colors':     return <ColorsSection />;
      case 'typography': return <TypographySection />;
      case 'buttons':    return <ButtonsSection />;
      case 'cards':      return <CardsSection />;
      case 'forms':      return <FormsSection />;
      case 'badges':     return <BadgesSection />;
      case 'alerts':     return <AlertsSection />;
      case 'gradients':  return <GradientsSection />;
      case 'spacing':    return <SpacingSection />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'var(--neutral-50)',
      fontFamily: 'var(--font-body)',
      overflow: 'hidden',
    }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: '240px',
        flexShrink: 0,
        background: 'var(--card)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Logo / Header */}
        <div style={{
          padding: 'var(--space-6)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--primary)',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 var(--space-1)',
            textTransform: 'uppercase' as const,
            letterSpacing: 'var(--tracking-widest)',
          }}>The Learning Society</p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-black)',
            color: 'white',
            margin: 0,
          }}>Design System</p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(255,255,255,0.6)',
            margin: 'var(--space-1) 0 0',
            fontWeight: 'var(--font-regular)',
          }}>v5.2 — CSS Variables Kit</p>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: 'var(--space-4)', overflow: 'auto' }}>
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  width: '100%',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  border: 'none',
                  background: isActive ? 'var(--primary-50)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--neutral-600)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? 'var(--font-bold)' : 'var(--font-medium)',
                  cursor: 'pointer',
                  textAlign: 'left' as const,
                  transition: 'all var(--duration-fast) var(--ease-out)',
                  marginBottom: 'var(--space-1)',
                  borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                }}
              >
                <s.icon size={16} style={{ flexShrink: 0 }} />
                {s.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {onNavigate && (
          <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => onNavigate('dashboard')}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-2)', width: '100%',
                padding: 'var(--space-2) var(--space-3)', background: 'none', border: 'none',
                color: 'var(--neutral-500)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                cursor: 'pointer', borderRadius: 'var(--radius-md)', fontWeight: 'var(--font-medium)',
              }}
            >
              <ArrowLeft size={14} />
              Retour à l'app
            </button>
          </div>
        )}
      </aside>

      {/* ── Main Content ── */}
      <main style={{
        flex: 1,
        overflow: 'auto',
        padding: 'var(--space-10)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Top bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-10)',
            paddingBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--border)',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--neutral-400)',
                margin: '0 0 var(--space-1)',
                fontWeight: 'var(--font-medium)',
                textTransform: 'uppercase' as const,
                letterSpacing: 'var(--tracking-wider)',
              }}>
                TLS Design System Kit
              </p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-black)',
                color: 'var(--foreground)',
                margin: 0,
                lineHeight: 'var(--leading-tight)',
              }}>
                {sections.find(s => s.id === activeSection)?.label}
              </h1>
            </div>
            <div style={{
              background: 'var(--primary-50)',
              border: '1px solid var(--primary-200)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-3) var(--space-5)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--primary-700)', fontWeight: 'var(--font-semibold)' }}>
                globals.css v5.2
              </span>
            </div>
          </div>

          {/* Section content */}
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
