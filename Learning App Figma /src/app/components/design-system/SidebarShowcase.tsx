import { useState } from 'react';
import {
  Home, Map, Pen, Users, Sparkles, ChevronLeft, ChevronRight, ChevronDown,
  User, Settings, Bell, Palette, LogOut, Copy, Check, Monitor, Smartphone,
  PanelLeftClose, BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../common/Card';
import { SectionHeader } from '../common/SectionHeader';

// ─────────────────────────────────────────────
// MOCK SIDEBAR — version statique pour le Design System
// ─────────────────────────────────────────────
function MockSidebar({
  isCollapsed = false,
  activeItem = 'dashboard',
  dropdownOpen = false,
  viewerMode = false,
  height = 520,
}: {
  isCollapsed?: boolean;
  activeItem?: string;
  dropdownOpen?: boolean;
  viewerMode?: boolean;
  height?: number;
}) {
  const navItems = [
    { icon: Home, label: 'Tableau de bord', page: 'dashboard' },
    { icon: Map, label: 'Parcours', page: 'parcours' },
    { icon: Pen, label: 'Journal de bord', page: 'journal' },
    { icon: Users, label: 'Coaching', page: 'coaching' },
    { icon: Sparkles, label: 'Veille', page: 'veille' },
  ];

  // ── Viewer mode ─────────────────────────────
  if (viewerMode) {
    return (
      <div style={{
        width: '80px',
        height,
        background: 'transparent',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 4px 16px 0 rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        flexShrink: 0,
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '16px',
          background: 'var(--gradient-primary)',
          boxShadow: '0 8px 24px rgba(85,161,180,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Sparkles size={24} color="white" />
        </div>
        <p style={{
          marginTop: '8px', fontSize: '10px', textAlign: 'center',
          color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)',
        }}>
          Viewer Mode
        </p>
      </div>
    );
  }

  // ── Normal mode ─────────────────────────────
  const w = isCollapsed ? 96 : 280;

  return (
    <div style={{
      width: w,
      height,
      background: isCollapsed ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRight: `1px solid ${isCollapsed ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)'}`,
      boxShadow: isCollapsed
        ? '0 8px 32px 0 rgba(0,0,0,0.08), 0 1px 0 0 rgba(255,255,255,0.3) inset'
        : '0 4px 16px 0 rgba(0,0,0,0.04), 0 1px 0 0 rgba(255,255,255,0.4) inset',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflow: 'visible',
      position: 'relative',
      transition: 'all 300ms ease-out',
    }}>

      {/* ── Header ─────── */}
      <div style={{
        padding: isCollapsed ? '16px' : '24px',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        gap: '12px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: isCollapsed ? '48px' : '56px',
            height: isCollapsed ? '48px' : '56px',
            borderRadius: '16px',
            background: 'var(--gradient-primary)',
            boxShadow: '0 8px 24px rgba(85,161,180,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Sparkles size={isCollapsed ? 24 : 28} color="white" />
          </div>
          {!isCollapsed && (
            <span style={{
              color: 'var(--primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'var(--text-xl)',
              lineHeight: 1.2,
            }}>
              The Learning Society
            </span>
          )}
        </div>
        {!isCollapsed && (
          <div style={{
            width: '36px', height: '36px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--muted-foreground)',
            background: 'rgba(85,161,180,0.05)',
            cursor: 'pointer',
            flexShrink: 0,
          }}>
            <ChevronLeft size={20} />
          </div>
        )}
        {isCollapsed && (
          <div style={{
            position: 'absolute', right: '-12px', top: '50%',
            transform: 'translateY(-50%)',
            width: '24px', height: '24px', borderRadius: '50%',
            background: 'var(--gradient-primary)',
            boxShadow: '0 4px 12px rgba(85,161,180,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', zIndex: 2,
          }}>
            <ChevronRight size={14} />
          </div>
        )}
      </div>

      {/* ── Navigation ─────── */}
      <nav style={{
        flex: 1,
        padding: isCollapsed ? '12px' : '16px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        overflowY: 'auto',
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.page === activeItem;
          const isHover = item.page === 'coaching' && !isActive;
          return (
            <div
              key={item.page}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: isCollapsed ? '0' : '12px 20px',
                width: isCollapsed ? '56px' : '100%',
                height: isCollapsed ? '56px' : 'auto',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                borderRadius: '16px',
                background: isActive
                  ? 'var(--gradient-primary)'
                  : isHover
                    ? 'rgba(85,161,180,0.08)'
                    : 'transparent',
                boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                color: isActive ? 'white' : 'var(--foreground)',
                cursor: 'pointer',
                transform: isHover && !isCollapsed ? 'translateX(4px)' : 'none',
                transition: 'all 300ms ease',
                margin: isCollapsed ? '0 auto' : '0',
              }}
            >
              <Icon size={24} style={{ flexShrink: 0 }} />
              {!isCollapsed && (
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--text-base)',
                  flex: 1,
                  textAlign: 'left',
                }}>
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Footer / User ─────── */}
      <div style={{
        padding: isCollapsed ? '12px' : '16px 24px',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Dropdown */}
        {dropdownOpen && !isCollapsed && (
          <div style={{
            position: 'absolute', bottom: '100%', left: '12px', right: '12px',
            marginBottom: '8px',
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '16px',
            boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
            padding: '12px',
            zIndex: 10,
          }}>
            {[
              { icon: User, label: 'Mon Profil' },
              { icon: Settings, label: 'Paramètres' },
              { icon: Bell, label: 'Notifications', badge: 3 as number | string | undefined },
              { icon: Palette, label: 'Design System', badge: 'v5.3' as number | string | undefined },
              { icon: BarChart3, label: 'Espace Entreprise', badge: 'PRO' as number | string | undefined },
            ].map(({ icon: Icon, label, badge }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 16px', borderRadius: '12px',
                color: 'var(--foreground)', cursor: 'pointer',
              }}>
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)', flex: 1,
                }}>
                  {label}
                </span>
                {badge !== undefined && (
                  <span style={{
                    background: typeof badge === 'number' ? 'var(--secondary)' : 'var(--gradient-primary)',
                    color: 'white', borderRadius: '8px',
                    padding: '2px 8px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                  }}>
                    {badge}
                  </span>
                )}
              </div>
            ))}
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '4px 0' }} />
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 16px', borderRadius: '12px',
              color: 'var(--destructive)', cursor: 'pointer',
            }}>
              <LogOut size={18} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Déconnexion
              </span>
            </div>
          </div>
        )}

        {/* User button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: isCollapsed ? '0' : '14px 16px',
          flexDirection: isCollapsed ? 'column' : 'row',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          borderRadius: '16px',
          border: '1px solid rgba(85,161,180,0.1)',
          background: 'rgba(85,161,180,0.05)',
          cursor: 'pointer',
          margin: isCollapsed ? '0 auto' : '0',
        }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: isCollapsed ? '40px' : '44px',
              height: isCollapsed ? '40px' : '44px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              boxShadow: '0 4px 12px rgba(85,161,180,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: isCollapsed ? 'var(--text-sm)' : 'var(--text-base)',
            }}>
              A
            </div>
            <div style={{
              position: 'absolute', top: '-4px', right: '-4px',
              width: '20px', height: '20px', borderRadius: '50%',
              background: 'var(--secondary)',
              boxShadow: '0 2px 8px rgba(237,132,58,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '10px',
              fontWeight: 'var(--font-weight-bold)',
            }}>
              3
            </div>
          </div>
          {!isCollapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  color: 'var(--foreground)', fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)', fontFamily: 'var(--font-body)',
                }}>
                  Admin1509
                </p>
                <p style={{
                  margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                }}>
                  padennery@me.com
                </p>
              </div>
              <ChevronDown
                size={20}
                color="var(--muted-foreground)"
                style={{
                  flexShrink: 0,
                  transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 200ms',
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PROMPT CLAUDE DESIGN — texte à copier-coller
// ─────────────────────────────────────────────
const CLAUDE_DESIGN_PROMPT = `# PROMPT — Sidebar Navigation "The Learning Society" (TLS)

## 🎯 Objectif
Recréer le composant sidebar navigation principal de la plateforme SaaS "The Learning Society" (TLS) en respectant exactement le design system TLS v5.3.

---

## 📐 Dimensions & Structure

### Desktop Expanded (état par défaut quand ouvert)
- Largeur : 320px (w-80)
- Hauteur : 100vh (fixed left, pleine hauteur)
- Structure : 3 zones — Header (Logo) | Nav (flex-1 scrollable) | Footer (User)

### Desktop Collapsed (état par défaut au chargement)
- Largeur : 96px (lg:w-24)
- Même structure, icônes seules, textes masqués
- Click sur la sidebar collapsed → expand

### Mobile (< 1024px)
- Hamburger button fixe top-left (z-[100])
- Slide depuis la gauche : translate-x-[-100%] → translate-x-0
- Overlay backdrop blur + bg-black/50
- Largeur : 320px

---

## 🎨 Glassmorphism Effect

### État Expanded
\`\`\`css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border-right: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04), 0 1px 0 0 rgba(255, 255, 255, 0.4) inset;
\`\`\`

### État Collapsed (plus transparent = effet "floating")
\`\`\`css
background: rgba(255, 255, 255, 0.4);
backdrop-filter: blur(20px);
border-right: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(255, 255, 255, 0.3) inset;
cursor: pointer; /* Click to expand */
\`\`\`

---

## 🏠 Section HEADER (Logo)

### Expanded
- Padding : 24px (var(--space-6))
- Layout : flex row, items-center, justify-between
- Icône logo : div 56×56px, border-radius 16px, background: var(--gradient-primary), boxShadow: 0 8px 24px rgba(85,161,180,0.4), icône Sparkles 28px blanc
- Texte logo : "The Learning Society", color: var(--primary), font: var(--font-display), weight: var(--font-weight-bold), size: var(--text-xl)
- Bouton collapse : 36×36px arrondi, ChevronLeft, color: var(--muted-foreground)
- Séparateur bas : border-bottom: 1px solid rgba(255,255,255,0.2)

### Collapsed
- Padding : 16px (var(--space-4))
- Icône logo seule : 48×48px
- Bouton expand : position absolute -right-3 top-50%, cercle 24×24px, background: var(--gradient-primary), boxShadow: 0 4px 12px rgba(85,161,180,0.3), ChevronRight blanc

---

## 🧭 Section NAVIGATION (Items)

### Nav Items (ordre exact)
1. 🏠 Tableau de bord — icône: Home
2. 🗺️ Parcours — icône: Map
3. ✏️ Journal de bord — icône: Pen
4. 👥 Coaching — icône: Users
5. ✨ Veille — icône: Sparkles

### Dimensions & Layout
- Padding nav area : 16px 24px (expanded) / 12px (collapsed)
- Gap entre items : 8px
- Item expanded : px-5 py-3.5 (20px 14px), gap 16px, border-radius 16px, width 100%
- Item collapsed : 56×56px centré, border-radius 16px

### États des items

**Active (gradient)**
\`\`\`css
background: var(--gradient-primary);
box-shadow: var(--shadow-md);
color: white;
\`\`\`

**Hover**
\`\`\`css
background: rgba(85, 161, 180, 0.08);
transform: translateX(4px);
transition: all 300ms ease;
color: var(--foreground);
\`\`\`

**Default (inactif)**
\`\`\`css
background: transparent;
color: var(--foreground);
\`\`\`

### Typographie items
\`\`\`css
font-family: var(--font-body);
font-weight: var(--font-weight-medium);
font-size: var(--text-base); /* 16px */
\`\`\`

---

## 👤 Section FOOTER (User Profile)

### Bouton utilisateur (expanded)
- Padding : 16px
- Layout : flex row, gap 12px, border-radius 16px
- Border : 1px solid rgba(85,161,180,0.1)
- Background : rgba(85,161,180,0.05)
- Hover : background rgba(85,161,180,0.1), border-color var(--primary), translateY(-2px), box-shadow 0 4px 12px rgba(85,161,180,0.15)

**Avatar**
- Taille : 44×44px (40px collapsed)
- Border-radius : 50% (full)
- Background : var(--gradient-primary)
- Box-shadow : 0 4px 12px rgba(85,161,180,0.3)
- Contenu : initiale utilisateur ("A"), color white, font: var(--font-display), weight: bold

**Badge notification (sur avatar)**
- Position : absolute -top-1 -right-1
- Taille : 20×20px, border-radius 50%
- Background : var(--secondary) — orange #ED843A
- Box-shadow : 0 2px 8px rgba(237,132,58,0.4)
- Couleur : white
- Contenu : count (ex: "3"), font-size: 10px, font-weight: bold

**Infos utilisateur**
- Nom : var(--foreground), font: var(--font-body), weight: var(--font-weight-semibold), size: var(--text-base)
- Email : var(--muted-foreground), font: var(--font-body), size: var(--text-sm)
- ChevronDown : var(--muted-foreground), rotate 180deg si dropdown ouvert

### Bouton collapsed
- Avatar seul (40×40px) + badge notification visible
- layout flex-col centré

---

## 📋 DROPDOWN MENU (clic sur le bouton user)

Position : absolute, bottom: 100%, left/right: 12px, marginBottom: 8px, zIndex: 100

Style container :
\`\`\`css
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
border-radius: 16px;
box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
padding: 12px;
\`\`\`

Items du dropdown (dans l'ordre) :
1. 👤 Mon Profil → navigate('profile')
2. ⚙️ Paramètres → navigate('account')
3. 🔔 Notifications → navigate('notifications'), badge count orange
4. 🎨 Design System → dropdown interne vers Composants / Design Tokens / Onboarding, badge "v5.3" bleu
5. 📊 Espace Entreprise → si userHasEnterpriseAccess, badge "PRO" orange+jaune
6. ─ Séparateur
7. 🚪 Déconnexion → color var(--destructive)

Style des items :
\`\`\`css
padding: 12px 16px;
border-radius: 12px;
color: var(--foreground);
font-family: var(--font-body);
font-size: var(--text-base);
font-weight: var(--font-weight-medium);
/* Hover */ background: rgba(85, 161, 180, 0.08);
\`\`\`

Badges dans dropdown :
- Numérique (notifications) : background var(--secondary), white, 24×24px cercle
- Texte (v5.3, PRO) : background var(--gradient-primary), white, px-2 py-1 rounded-lg

---

## 🎭 VIEWER MODE (isViewerMode=true)

Pour les pages de contenu (LessonViewer, VideoViewer) :
- Desktop : sidebar ultra-minimale, width 80px, logo icône seule
- Mobile : drawer complet identique au mode normal
- Pas de toggle collapse/expand
- Click logo → navigate('dashboard')

---

## 💾 COMPORTEMENTS & ÉTAT

- État collapsed persisté dans localStorage ('sidebar-collapsed')
- État par défaut : collapsed = true (collapsed au premier chargement)
- classe CSS 'sidebar-collapsed' sur document.documentElement synchronisée
- Transition toutes propriétés : 300ms ease-out

---

## 🔑 TOKENS CSS TLS UTILISÉS

\`\`\`css
/* Couleurs */
--primary: #55A1B4
--secondary: #ED843A
--foreground: /* texte principal */
--muted-foreground: /* texte secondaire */
--destructive: /* rouge erreur */
--gradient-primary: /* gradient bleu TLS */
--shadow-md: /* ombre medium */

/* Typo */
--font-display: 'League Spartan'
--font-body: 'Nunito'
--font-weight-bold / --font-weight-semibold / --font-weight-medium
--text-xl / --text-base / --text-sm / --text-xs

/* Espacement */
--space-4: 16px
--space-6: 24px
\`\`\`

---

## ⚠️ RÈGLES STRICTES DU DESIGN SYSTEM TLS

1. ❌ Pas de gradient multicouleur sur les composants UI (sauf active item = gradient-primary mono)
2. ✅ Glassmorphism obligatoire : backdrop-filter blur(20px) + rgba transparency
3. ✅ Hover items : translateX(4px) + rgba(85,161,180,0.08)
4. ✅ Active state : var(--gradient-primary) + var(--shadow-md) + color white
5. ✅ Notification badge : var(--secondary) orange avec glow
6. ✅ Logo icon : var(--gradient-primary) avec glow rgba(85,161,180,0.4)
7. ✅ Border-radius nav items : 16px (rounded-2xl)
8. ✅ Transition : all 300ms ease-out sur la sidebar, 200ms ease sur les items

---

## 📦 PROPS TYPESCRIPT

\`\`\`typescript
interface OptimizedSidebarProps {
  currentPage: 'dashboard' | 'parcours' | 'coaching' | 'journal' | 'veille' |
               'entreprise-dashboard' | 'profile' | 'account' |
               'messages' | 'notifications' | 'leaderboard';
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  userHasEnterpriseAccess?: boolean;  // défaut: false
  userName?: string;                   // défaut: 'Admin1509'
  userEmail?: string;                  // défaut: 'padennery@me.com'
  userInitials?: string;               // défaut: 'A'
  notifications?: Notification[];      // défaut: []
  unreadMessagesCount?: number;        // défaut: 0
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onDeleteNotification?: (id: string) => void;
  isViewerMode?: boolean;              // défaut: false
  notificationDisplayMode?: 'avatar' | 'header' | 'logo'; // défaut: 'avatar'
}
\`\`\``;

// ─────────────────────────────────────────────
// COPY BUTTON
// ─────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '8px 16px', borderRadius: '12px',
        background: copied ? 'rgba(74,140,110,0.1)' : 'rgba(85,161,180,0.08)',
        border: `1px solid ${copied ? 'rgba(74,140,110,0.3)' : 'rgba(85,161,180,0.2)'}`,
        color: copied ? 'var(--success)' : 'var(--primary)',
        cursor: 'pointer', transition: 'all 200ms ease',
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-weight-medium)',
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copié !' : 'Copier le prompt'}
    </button>
  );
}

// ─────────────────────────────────────────────
// MAIN SHOWCASE EXPORT
// ─────────────────────────────────────────────
export function SidebarShowcase() {
  const [interactiveCollapsed, setInteractiveCollapsed] = useState(false);
  const [interactiveActive, setInteractiveActive] = useState('dashboard');
  const [interactiveDropdown, setInteractiveDropdown] = useState(false);

  const navItems = [
    { icon: Home, label: 'Tableau de bord', page: 'dashboard' },
    { icon: Map, label: 'Parcours', page: 'parcours' },
    { icon: Pen, label: 'Journal de bord', page: 'journal' },
    { icon: Users, label: 'Coaching', page: 'coaching' },
    { icon: Sparkles, label: 'Veille', page: 'veille' },
  ];

  const tokenRows = [
    { token: 'var(--gradient-primary)', usage: 'Logo icon, active nav item, expand button, avatar', color: '#55A1B4→#2A9D8F' },
    { token: 'var(--primary)', usage: 'Logo text color, hover borders', color: '#55A1B4' },
    { token: 'var(--secondary)', usage: 'Notification badge background', color: '#ED843A' },
    { token: 'var(--foreground)', usage: 'Nav items text, user name', color: '#252B37' },
    { token: 'var(--muted-foreground)', usage: 'User email, ChevronDown, toggle button', color: '#6B7280' },
    { token: 'var(--destructive)', usage: 'Logout button text', color: '#EF4444' },
    { token: 'var(--shadow-md)', usage: 'Active nav item shadow', color: '—' },
    { token: 'var(--font-display)', usage: 'Logo text, avatar initials', color: 'League Spartan' },
    { token: 'var(--font-body)', usage: 'Nav labels, user name/email, dropdown items', color: 'Nunito' },
  ];

  const propsRows = [
    { prop: 'currentPage', type: "'dashboard' | 'parcours' | ...", default: '—', desc: 'Page active → active state du nav item' },
    { prop: 'onNavigate', type: '(page: string) => void', default: '—', desc: 'Callback de navigation' },
    { prop: 'onLogout', type: '() => void', default: 'undefined', desc: 'Callback de déconnexion' },
    { prop: 'userName', type: 'string', default: "'Admin1509'", desc: 'Nom affiché dans le footer' },
    { prop: 'userEmail', type: 'string', default: "'padennery@me.com'", desc: 'Email affiché dans le footer' },
    { prop: 'userInitials', type: 'string', default: "'A'", desc: 'Initiales dans l\'avatar' },
    { prop: 'notifications', type: 'Notification[]', default: '[]', desc: 'Liste des notifications pour le badge' },
    { prop: 'userHasEnterpriseAccess', type: 'boolean', default: 'false', desc: 'Affiche le lien Espace Entreprise' },
    { prop: 'isViewerMode', type: 'boolean', default: 'false', desc: 'Mode ultra-minimal (logo seul desktop)' },
    { prop: 'notificationDisplayMode', type: "'avatar' | 'header' | 'logo'", default: "'avatar'", desc: 'Position du badge de notification' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

      {/* ── 1. DÉMO INTERACTIVE ─────────────── */}
      <Card>
        <CardHeader>
          <SectionHeader
            icon={PanelLeftClose}
            title="Sidebar TLS — Démo Interactive"
            subtitle="OptimizedSidebar · composant principal de navigation · TLS v5.3"
            iconColor="var(--primary)"
          />
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div style={{
            display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setInteractiveCollapsed(!interactiveCollapsed)}
              style={{
                padding: '8px 16px', borderRadius: '12px', cursor: 'pointer',
                background: interactiveCollapsed ? 'rgba(85,161,180,0.1)' : 'var(--gradient-primary)',
                color: interactiveCollapsed ? 'var(--primary)' : 'white',
                border: '1px solid rgba(85,161,180,0.3)',
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              {interactiveCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              {interactiveCollapsed ? 'Expanded' : 'Collapsed'}
            </button>
            <button
              onClick={() => setInteractiveDropdown(!interactiveDropdown)}
              style={{
                padding: '8px 16px', borderRadius: '12px', cursor: 'pointer',
                background: interactiveDropdown ? 'rgba(85,161,180,0.1)' : 'var(--card)',
                color: interactiveDropdown ? 'var(--primary)' : 'var(--foreground)',
                border: `1px solid ${interactiveDropdown ? 'rgba(85,161,180,0.3)' : 'var(--border)'}`,
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <ChevronDown size={14} />
              {interactiveDropdown ? 'Fermer dropdown' : 'Ouvrir dropdown'}
            </button>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
                Nav active :
              </span>
              {navItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => setInteractiveActive(item.page)}
                  style={{
                    padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
                    background: interactiveActive === item.page ? 'rgba(85,161,180,0.1)' : 'var(--card)',
                    color: interactiveActive === item.page ? 'var(--primary)' : 'var(--muted-foreground)',
                    border: `1px solid ${interactiveActive === item.page ? 'rgba(85,161,180,0.3)' : 'var(--border)'}`,
                    fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live preview */}
          <div style={{
            background: 'linear-gradient(135deg, #e8f4f7 0%, #fef9f0 50%, #f0faf8 100%)',
            borderRadius: '16px',
            padding: '0',
            display: 'flex',
            overflow: 'hidden',
            minHeight: '520px',
            border: '1px solid var(--border)',
          }}>
            <MockSidebar
              isCollapsed={interactiveCollapsed}
              activeItem={interactiveActive}
              dropdownOpen={interactiveDropdown}
              height={520}
            />
            {/* Mock content */}
            <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)',
                borderRadius: '16px', padding: '20px',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}>
                <div style={{ height: '20px', width: '200px', borderRadius: '8px', background: 'rgba(85,161,180,0.15)', marginBottom: '12px' }} />
                <div style={{ height: '12px', width: '320px', borderRadius: '6px', background: 'rgba(0,0,0,0.06)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)',
                    borderRadius: '12px', padding: '16px',
                    border: '1px solid rgba(255,255,255,0.5)',
                    height: '100px',
                  }}>
                    <div style={{ height: '16px', width: '80px', borderRadius: '6px', background: 'rgba(85,161,180,0.12)' }} />
                  </div>
                ))}
              </div>
              <p style={{
                fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)',
                fontFamily: 'var(--font-body)', textAlign: 'center', marginTop: 'auto',
              }}>
                Contenu principal de la page → Utilisez les contrôles ci-dessus pour changer l'état
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 2. ÉTATS STATIQUES ─────────────── */}
      <Card>
        <CardHeader>
          <SectionHeader
            title="États de la Sidebar"
            subtitle="Expanded · Collapsed · Dropdown ouvert · Viewer Mode"
          />
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '8px' }}>

            {/* Expanded */}
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)', color: 'var(--muted-foreground)', marginBottom: '8px', textAlign: 'center', fontWeight: 'var(--font-weight-medium)' }}>
                Expanded (320px)
              </p>
              <div style={{
                borderRadius: '16px', overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'linear-gradient(135deg, #e8f4f7 0%, #fef9f0 100%)',
              }}>
                <MockSidebar isCollapsed={false} activeItem="dashboard" height={480} />
              </div>
            </div>

            {/* Collapsed */}
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)', color: 'var(--muted-foreground)', marginBottom: '8px', textAlign: 'center', fontWeight: 'var(--font-weight-medium)' }}>
                Collapsed (96px)
              </p>
              <div style={{
                borderRadius: '16px', overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'linear-gradient(135deg, #e8f4f7 0%, #fef9f0 100%)',
              }}>
                <MockSidebar isCollapsed={true} activeItem="parcours" height={480} />
              </div>
            </div>

            {/* Dropdown open */}
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)', color: 'var(--muted-foreground)', marginBottom: '8px', textAlign: 'center', fontWeight: 'var(--font-weight-medium)' }}>
                Dropdown ouvert
              </p>
              <div style={{
                borderRadius: '16px', overflow: 'visible',
                border: '1px solid var(--border)',
                background: 'linear-gradient(135deg, #e8f4f7 0%, #fef9f0 100%)',
                position: 'relative',
              }}>
                <MockSidebar isCollapsed={false} activeItem="coaching" dropdownOpen={true} height={480} />
              </div>
            </div>

            {/* Viewer mode */}
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-body)', color: 'var(--muted-foreground)', marginBottom: '8px', textAlign: 'center', fontWeight: 'var(--font-weight-medium)' }}>
                Viewer Mode (80px)
              </p>
              <div style={{
                borderRadius: '16px', overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'linear-gradient(135deg, #e8f4f7 0%, #fef9f0 100%)',
              }}>
                <MockSidebar viewerMode={true} height={480} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 3. TOKENS CSS ─────────────── */}
      <Card>
        <CardHeader>
          <SectionHeader
            title="Tokens CSS Utilisés"
            subtitle="Variables du Design System TLS appliquées dans OptimizedSidebar"
          />
        </CardHeader>
        <CardContent>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  {['Token CSS', 'Usage', 'Valeur'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left',
                      fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tokenRows.map((row, i) => (
                  <tr key={row.token} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(85,161,180,0.02)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <code style={{
                        background: 'var(--muted)', padding: '3px 8px', borderRadius: '6px',
                        fontSize: 'var(--text-xs)', fontFamily: 'monospace',
                        color: 'var(--primary)',
                      }}>
                        {row.token}
                      </code>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                      {row.usage}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                      {row.color}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ── 4. RESPONSIVE ─────────────── */}
      <Card>
        <CardHeader>
          <SectionHeader
            title="Comportement Responsive"
            subtitle="3 breakpoints : Desktop · Tablet · Mobile"
          />
        </CardHeader>
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: Monitor,
                label: 'Desktop (≥ 1024px)',
                color: 'var(--primary)',
                bgColor: 'rgba(85,161,180,0.06)',
                borderColor: 'rgba(85,161,180,0.2)',
                items: [
                  'Position : relative (dans le flex layout)',
                  'Collapsed par défaut (96px) au 1er chargement',
                  'Persistance état dans localStorage',
                  'Bouton expand sur le bord droit (cercle gradient)',
                  'Click sidebar collapsed → expand',
                  'Transition 300ms ease-out',
                  'classe CSS sidebar-collapsed sur <html>',
                ],
              },
              {
                icon: Smartphone,
                label: 'Tablet/Mobile (< 1024px)',
                color: 'var(--secondary)',
                bgColor: 'rgba(237,132,58,0.06)',
                borderColor: 'rgba(237,132,58,0.2)',
                items: [
                  'Position : fixed inset-y-0 left-0',
                  'Masquée par défaut : translate-x-[-100%]',
                  'Bouton hamburger fixe top-6 left-6 z-[100]',
                  'Overlay backdrop-blur + bg-black/50 z-40',
                  'Largeur : 320px (w-80)',
                  'Fermeture auto après navigation',
                  'Logo complet + nav complète visibles',
                ],
              },
            ].map(({ icon: Icon, label, color, bgColor, borderColor, items }) => (
              <div key={label} style={{
                padding: '20px', borderRadius: '16px',
                background: bgColor, border: `1px solid ${borderColor}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: bgColor, border: `1px solid ${borderColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                    {label}
                  </span>
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 4px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color, marginTop: '2px', flexShrink: 0 }}>•</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 5. PROPS API ─────────────── */}
      <Card>
        <CardHeader>
          <SectionHeader
            title="Props API — OptimizedSidebar"
            subtitle="Interface TypeScript complète du composant"
          />
        </CardHeader>
        <CardContent>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  {['Prop', 'Type', 'Défaut', 'Description'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left',
                      fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {propsRows.map((row, i) => (
                  <tr key={row.prop} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(85,161,180,0.02)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <code style={{
                        background: 'var(--muted)', padding: '3px 8px', borderRadius: '6px',
                        fontSize: 'var(--text-xs)', fontFamily: 'monospace',
                        color: 'var(--primary)', fontWeight: 'bold',
                      }}>
                        {row.prop}
                      </code>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <code style={{
                        background: 'rgba(248,176,68,0.1)', padding: '3px 8px', borderRadius: '6px',
                        fontSize: 'var(--text-xs)', fontFamily: 'monospace',
                        color: 'var(--accent-600)',
                      }}>
                        {row.type}
                      </code>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <code style={{
                        fontSize: 'var(--text-xs)', fontFamily: 'monospace',
                        color: 'var(--muted-foreground)',
                      }}>
                        {row.default}
                      </code>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ── 6. PROMPT CLAUDE DESIGN ─────────────── */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <SectionHeader
              icon={Copy}
              title="Prompt Claude Design"
              subtitle="Copie ce prompt complet pour recréer la sidebar à l'identique dans n'importe quel outil IA"
              iconColor="var(--secondary)"
            />
            <CopyButton text={CLAUDE_DESIGN_PROMPT} />
          </div>
        </CardHeader>
        <CardContent>
          <div style={{
            background: 'var(--muted)', borderRadius: '12px',
            padding: '20px', maxHeight: '400px', overflowY: 'auto',
            border: '1px solid var(--border)',
          }}>
            <pre style={{
              margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.7,
              color: 'var(--foreground)',
            }}>
              {CLAUDE_DESIGN_PROMPT}
            </pre>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <CopyButton text={CLAUDE_DESIGN_PROMPT} />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
