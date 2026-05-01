/**
 * Components & Design Tokens Showcase
 *
 * Source of truth: /src/design-system/spec.json — The Learning Society Design System v1.0.0
 *
 * This page mirrors the Claude Design export:
 *   - All 21 components grouped by category (Core / Patterns / Learning / Navigation)
 *   - Every variant, size, state rendered live
 *   - Every design token (colors, typography, spacing, radius, shadows, motion, gradients)
 *     with its CSS variable + value, copy-able for bug reports
 *   - Real-time search across components, tokens, CSS classes
 *   - Category filter
 *
 * Naming convention: React component name  ↔  CSS class base (from spec.cssBase)
 *   e.g. <Button> → .btn        <Alert> → .alert        <CompetenceBadge> → .comp-badge
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  // Core
  Button,
  Card,
  CardEyebrow,
  CardTitle,
  CardDesc,
  CardFooter,
  Input,
  Field,
  Checkbox,
  Radio,
  Switch,
  // Identity
  Badge,
  Avatar,
  // Feedback
  EmptyState,
  Skeleton,
  Search,
  // Learning
  StatCard,
  ProgressBar,
  // Navigation
  Sidebar,
  SidebarGroup,
  NavItem,
  // Content & Display
  ActivityItem,
  SectionTitle,
} from '../components';

/* ============================================================================
 * TYPES
 * ============================================================================ */

type Category = 'Core' | 'Patterns' | 'Learning' | 'Navigation' | 'Content';

interface ComponentEntry {
  name: string;              // React name: Button
  codeName: string;          // File: Button.tsx
  cssBase: string;           // .btn
  category: Category;
  description: string;
  keywords: string[];        // extra searchable terms
  render: () => React.ReactNode;
}

interface TokenEntry {
  name: string;
  cssVar: string;
  value: string;
  group: string;
  type: 'color' | 'typography' | 'spacing' | 'radius' | 'shadow' | 'motion' | 'gradient' | 'role';
}

/* ============================================================================
 * SHARED ICONS (demo content)
 * ============================================================================ */

const I = {
  arrow: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  heart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  book: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  trophy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" /></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.86 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  trash: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>,
  edit: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
};

/* ============================================================================
 * PAGE TEMPLATES — recently designed full-page patterns
 * ============================================================================ */

interface PageTemplate {
  id: string;
  name: string;
  description: string;
  path: string;
  family: string;
  color: string;
  bg: string;
  tags: string[];
  icon: string;
}

const PAGE_TEMPLATES: PageTemplate[] = [
  /* ── Core ── */
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Vue d\'ensemble avec KPI row, parcours en cours, activité récente, prompts IA et quick-actions 4-col.',
    path: '/dashboard',
    family: 'Core',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['KPI', 'cards', 'quick-actions', 'activity feed'],
    icon: '📊',
  },
  {
    id: 'learning-paths',
    name: 'Parcours',
    description: 'Grid de tiles parcours avec filtres pills, barre de recherche, ProgressBar et badge de niveau.',
    path: '/learning-paths',
    family: 'Core',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['grid', 'filter pills', 'search', 'ProgressBar'],
    icon: '📚',
  },
  {
    id: 'learning-path-detail',
    name: 'Détail Parcours',
    description: 'Header hero, étapes avec accordéon, ressources complémentaires et CTA "Commencer".',
    path: '/learning-paths/1',
    family: 'Core',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['hero', 'steps', 'accordion', 'CTA'],
    icon: '🎯',
  },
  /* ── Journal ── */
  {
    id: 'journal',
    name: 'Journal de bord',
    description: 'Liste d\'entrées avec filter pills par type (Réflexion, Apprentissage, Coaching, Insight), barre de recherche et cartes d\'entrées colorées.',
    path: '/journal',
    family: 'Journal',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['filter pills', 'search', 'cards', 'type system'],
    icon: '📓',
  },
  {
    id: 'journal-new-entry',
    name: 'Nouvelle entrée journal',
    description: '4 type selector cards (Réflexion Libre, Apprentissage, Session Coaching, Moment Eurêka), question de réflexion contextuelle, textarea avec compteur de mots.',
    path: '/journal/new-entry',
    family: 'Journal',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['type selector', 'form', 'sticky header', 'word count'],
    icon: '✍️',
  },
  {
    id: 'journal-detail',
    name: 'Entrée journal — détail',
    description: 'Lecteur d\'entrée avec 3 sections structurées (Observation/Analyse/Actions), checklist engagements, navigation prev/next, CTA teal gradient.',
    path: '/journal/detail/1',
    family: 'Journal',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['reader', 'structured sections', 'checklist', 'navigation'],
    icon: '📝',
  },
  {
    id: 'journal-free-entry',
    name: 'Entrée libre journal',
    description: 'Éditeur épuré avec titre, catégorie pills, mood selector, textarea + compteur mots, tags dynamiques, sidebar aide-mémoire avec prompts cliquables.',
    path: '/journal/free-entry',
    family: 'Journal',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['editor', 'mood selector', 'dynamic tags', 'sticky header', 'sidebar'],
    icon: '🗒️',
  },
  /* ── Veille ── */
  {
    id: 'veille',
    name: 'Veille Hub',
    description: 'Hub éditorial avec filtres pills (Tout/Actus/Tutoriels/Dossiers/Magazine), recherche, quick-access 4 formats, feed d\'articles avec bookmark.',
    path: '/veille',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['filter pills', 'search', 'feed', 'bookmark', 'quick-access'],
    icon: '🗞️',
  },
  {
    id: 'veille-article',
    name: 'Article — Actu de la semaine',
    description: 'Lecteur article avec breadcrumb, badge ACTU teal, hero gradient, callout "Points essentiels", 3 sections corps, like/save/share, contenus liés.',
    path: '/veille/article/1',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['reader', 'breadcrumb', 'callout teal', 'actions', 'related'],
    icon: '📰',
  },
  {
    id: 'veille-content',
    name: 'Étude de Marché',
    description: 'Layout 2 colonnes (sommaire sticky + contenu), callout orange Résumé Exécutif, grille 2×2 Points clés, grands chiffres Données & Analyses, CTA téléchargement.',
    path: '/veille/content',
    family: 'Veille',
    color: 'var(--tls-orange-600)',
    bg: 'rgba(237,132,58,0.07)',
    tags: ['two-column', 'sidebar', 'callout orange', 'data viz', 'download CTA'],
    icon: '📂',
  },
  {
    id: 'veille-dossier',
    name: 'Dossier thématique',
    description: 'Breadcrumb + actions télécharger/bookmark/share, hero teal gradient, icône BarChart orange + tag "DOSSIER", callout Résumé Exécutif orange, sommaire sticky sidebar, sections numérotées, Points clés 2×2, grands chiffres Données & Analyses, conclusion teal gradient, CTA download orange.',
    path: '/veille/dossier/1',
    family: 'Veille',
    color: 'var(--tls-orange-600)',
    bg: 'rgba(237,132,58,0.07)',
    tags: ['two-column', 'sidebar', 'callout orange', 'key points 2x2', 'data viz', 'download CTA'],
    icon: '📋',
  },
  {
    id: 'veille-video-tutorial',
    name: 'Tutoriel Vidéo',
    description: 'Player 16:9 sombre avec barre de progression orange, chapitres listés sur fond teal, actions like/save/share, meta durée + vues.',
    path: '/veille/video-tutorial/1',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['video player', 'chapters', 'social actions', 'progress bar'],
    icon: '🎬',
  },
  {
    id: 'veille-weekly-newsletter',
    name: 'Actus de la semaine',
    description: 'Badge SEMAINE #08, grand titre teal, bloc éditorial avec guillemets, vidéo split-card, grille 3 cartes "À la une", liste articles bookmark, subscribe footer teal.',
    path: '/veille/weekly-newsletter',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['editorial', 'quote block', 'split card', '3-col grid', 'newsletter'],
    icon: '📬',
  },
  {
    id: 'veille-weekly-news-detail',
    name: 'Article newsletter — détail',
    description: 'Breadcrumb Veille > Actus, badges catégorie + À la une, hero teal, callout "L\'essentiel", 3 sections, source card, like/save/share, articles liés.',
    path: '/veille/weekly-news/1',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['reader', 'breadcrumb', 'callout', 'source card', 'related'],
    icon: '🧾',
  },
  {
    id: 'veille-magazine',
    name: 'Magazine TLS',
    description: 'Hero plein écran sombre avec titre en overlay, Synthèse Exécutive card blanche, Sommaire du magazine avec header orange et liste numérotée teal/orange.',
    path: '/veille/magazine',
    family: 'Veille',
    color: 'var(--tls-orange-500)',
    bg: 'rgba(237,132,58,0.07)',
    tags: ['dark hero', 'full-bleed', 'sommaire', 'two-column'],
    icon: '📚',
  },
  {
    id: 'veille-magazine-article',
    name: 'Article magazine — détail',
    description: 'Lien retour texte + icônes bookmark/share, pill catégorie teal outline, grand titre bold, avatar auteur + durée, intro paragraphe, callout "À retenir" bordure gauche teal + puces ChevronRight, 4 sections éditoriales, citation teal italique, conclusion, footer hashtags.',
    path: '/veille/magazine-article/1',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['reader', 'editorial', 'outline pill', 'callout teal', 'quote', 'hashtags'],
    icon: '📰',
  },
  /* ── Coaching ── */
  {
    id: 'coaching',
    name: 'Coaching 1-to-1',
    description: 'Layout 2 colonnes : session à venir (teal + orange CTA) + historique sessions, coach card sticky avec avatar, spécialités pills, liens contact.',
    path: '/coaching',
    family: 'Coaching',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['two-column', 'sticky card', 'session history', 'action chips'],
    icon: '🎓',
  },
  {
    id: 'pre-coaching-questionnaire',
    name: 'Préparez votre session',
    description: '3 étapes verticales — icône cercle 48px + carte blanche avec question bold + textarea gris. Bouton Envoyer désactivé jusqu\'à saisie.',
    path: '/coaching/pre-questionnaire',
    family: 'Coaching',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['multi-step', 'vertical timeline', 'textarea', 'form validation'],
    icon: '🧠',
  },
];

/* ============================================================================
 * COMPONENT SHOWCASE ENTRIES — 21 components
 * ============================================================================ */

const COMPONENTS: ComponentEntry[] = [
  /* ---- CORE ------------------------------------------------------------- */
  {
    name: 'Button',
    codeName: 'Button.tsx',
    cssBase: '.btn',
    category: 'Core',
    description: 'Single action trigger. Pill shape, clear hierarchy. One primary per screen.',
    keywords: ['cta', 'action', 'primary', 'warm', 'ghost', 'destructive', 'link'],
    render: () => (
      <div className="vstack">
        <div className="hstack">
          <Button variant="primary">Primary</Button>
          <Button variant="warm">Warm</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="brand-ghost">Brand ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="hstack">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra large</Button>
        </div>
        <div className="hstack">
          <Button leadingIcon={I.plus}>With leading icon</Button>
          <Button trailingIcon={I.arrow} variant="warm">Continue</Button>
          <Button iconOnly aria-label="Add" variant="secondary">{I.plus}</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    ),
  },
  {
    name: 'Input',
    codeName: 'Input.tsx',
    cssBase: '.input / .field / .check / .radio / .switch',
    category: 'Core',
    description: 'Form field. Label always above. Includes Checkbox, Radio, Switch sub-components.',
    keywords: ['form', 'text', 'checkbox', 'radio', 'switch', 'textarea'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 480 }}>
        <Field label="Nom complet" hint="Tel qu'il apparaîtra sur votre certificat" id="demo-name">
          <Input id="demo-name" placeholder="Jeanne Dupont" />
        </Field>
        <Field label="Email" error="Adresse email invalide" id="demo-email" required>
          <Input id="demo-email" type="email" status="error" placeholder="nom@exemple.fr" />
        </Field>
        <Field label="Validation OK" id="demo-ok">
          <Input id="demo-ok" status="success" defaultValue="jeanne@tls.fr" />
        </Field>
        <Field label="Message" id="demo-msg">
          <Input id="demo-msg" multiline rows={3} placeholder="Écrivez ici…" />
        </Field>
        <div className="hstack" style={{ alignItems: 'center' }}>
          <Checkbox label="Me tenir informée" defaultChecked />
          <Radio name="demo-r" label="Option A" defaultChecked />
          <Radio name="demo-r" label="Option B" />
          <Switch label="Notifications" defaultChecked />
        </div>
        <div className="hstack">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      </div>
    ),
  },
  {
    name: 'Card',
    codeName: 'Card.tsx',
    cssBase: '.card',
    category: 'Core',
    description: 'Main content unit. 4 variants: default, feature (elevated), interactive (hover lift), glass.',
    keywords: ['container', 'surface', 'feature', 'interactive', 'glass'],
    render: () => (
      <div className="grid-2">
        <Card>
          <CardEyebrow>DEFAULT</CardEyebrow>
          <CardTitle>Card par défaut</CardTitle>
          <CardDesc>Bordure fine, pas d'ombre. Contenu groupé lisiblement.</CardDesc>
        </Card>
        <Card variant="feature">
          <CardEyebrow>FEATURE</CardEyebrow>
          <CardTitle>Carte mise en avant</CardTitle>
          <CardDesc>Ombre douce, padding généreux, pas de bordure.</CardDesc>
          <CardFooter>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)' }}>il y a 3 min</span>
            <Button size="sm" variant="ghost">Voir</Button>
          </CardFooter>
        </Card>
        <Card variant="interactive" role="button" tabIndex={0}>
          <CardEyebrow>INTERACTIVE</CardEyebrow>
          <CardTitle>Hover pour voir</CardTitle>
          <CardDesc>translateY(-2px) + shadow-md au hover.</CardDesc>
        </Card>
        <div style={{ padding: 'var(--s-4)', background: 'var(--g-warm-soft)', borderRadius: 'var(--r-xl)' }}>
          <Card variant="glass">
            <CardEyebrow>GLASS</CardEyebrow>
            <CardTitle>Glass (sur fond teinté uniquement)</CardTitle>
            <CardDesc>Utiliser seulement sur un fond coloré ou gradient.</CardDesc>
          </Card>
        </div>
      </div>
    ),
  },
  {
    name: 'Badge',
    codeName: 'Badge.tsx',
    cssBase: '.badge',
    category: 'Core',
    description: 'Compact status tag. Uppercase 11px, 1–2 words max. 7 semantic variants + dot modifier.',
    keywords: ['status', 'label', 'tag', 'brand', 'warm', 'sun', 'success', 'danger', 'info'],
    render: () => (
      <div className="hstack">
        <Badge variant="brand">Brand</Badge>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="warm">Warm</Badge>
        <Badge variant="sun">Sun</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success" dot>Active</Badge>
        <Badge variant="danger" dot>Offline</Badge>
      </div>
    ),
  },
  {
    name: 'Avatar',
    codeName: 'Avatar.tsx',
    cssBase: '.avatar',
    category: 'Core',
    description: 'User representation: image or initials. Stable hash-based tint. Status dot + AvatarGroup.',
    keywords: ['user', 'profile', 'initials', 'image', 'status', 'online', 'group'],
    render: () => (
      <div className="vstack">
        <div className="hstack" style={{ alignItems: 'center' }}>
          <Avatar size="xs" name="Jeanne Dupont" />
          <Avatar size="sm" name="Paul Martin" />
          <Avatar name="Claire Bernard" />
          <Avatar size="lg" name="Ahmed Ali" />
          <Avatar size="xl" name="Sofia Garcia" />
        </div>
        <div className="hstack" style={{ alignItems: 'center' }}>
          <Avatar name="Brand" tint="brand" />
          <Avatar name="Warm" tint="warm" />
          <Avatar name="Sun" tint="sun" />
          <Avatar name="Ink" tint="ink" />
          <Avatar name="JD" status="online" />
          <Avatar name="PM" status="busy" />
          <Avatar name="AW" status="away" />
        </div>
      </div>
    ),
  },

  /* ---- PATTERNS --------------------------------------------------------- */
  {
    name: 'EmptyState',
    codeName: 'EmptyState.tsx',
    cssBase: '.empty',
    category: 'Patterns',
    description: 'First contact / no results / server error. Always actionable — never a dead end.',
    keywords: ['empty', 'no results', 'placeholder', 'illustration'],
    render: () => (
      <div className="grid-2">
        <EmptyState
          title="Aucun résultat"
          description="Essayez d'ajuster vos filtres ou le terme de recherche."
          actions={<Button variant="primary">Réinitialiser les filtres</Button>}
        />
        <EmptyState
          tone="warm"
          title="Commencez votre premier parcours"
          description="Explorez la bibliothèque et sélectionnez un parcours adapté à vos objectifs."
          actions={<Button variant="warm">Explorer</Button>}
        />
      </div>
    ),
  },
  {
    name: 'Skeleton',
    codeName: 'Skeleton.tsx',
    cssBase: '.skeleton',
    category: 'Patterns',
    description: 'Placeholder shimmer matching expected content shape. Use for 1–3s loads.',
    keywords: ['loading', 'placeholder', 'shimmer'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 420 }}>
        <div className="hstack" style={{ alignItems: 'center' }}>
          <Skeleton variant="circle" width={40} height={40} />
          <div className="vstack" style={{ flex: 1, gap: 8 }}>
            <Skeleton variant="title" />
            <Skeleton variant="text" width="80%" />
          </div>
        </div>
        <Skeleton variant="block" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </div>
    ),
  },
  {
    name: 'Search',
    codeName: 'Search.tsx',
    cssBase: '.search',
    category: 'Patterns',
    description: 'Search bar with optional shortcut hint. Sizes: default, lg.',
    keywords: ['find', 'query', 'filter'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 520 }}>
        <Search placeholder="Rechercher un parcours…" shortcut="⌘K" />
        <Search size="lg" placeholder="Rechercher partout…" shortcut="⌘K" />
      </div>
    ),
  },

  /* ---- LEARNING --------------------------------------------------------- */
  {
    name: 'StatCard',
    codeName: 'StatCard.tsx',
    cssBase: '.stat-card',
    category: 'Learning',
    description: 'Prominent metric. Display number + micro label + optional delta. 4 surface variants.',
    keywords: ['metric', 'kpi', 'stat', 'dashboard'],
    render: () => (
      <div className="grid-2">
        <StatCard label="PARCOURS COMPLÉTÉS" value={12} sub="/24" delta="+3 ce mois" deltaDirection="up" />
        <StatCard variant="elevated" label="HEURES D'APPRENTISSAGE" value="48" sub="h" />
        <StatCard variant="warm" label="SÉRIE" value={7} sub="jours" delta="Record personnel" deltaDirection="up" />
        <StatCard variant="brand" label="PROGRESSION MOYENNE" value={78} sub="%" />
      </div>
    ),
  },
  {
    name: 'ProgressBar',
    codeName: 'ProgressBar.tsx',
    cssBase: '.progress',
    category: 'Learning',
    description: 'Linear progress tracking. Sizes sm/md/lg. Fills: brand, warm, gradient.',
    keywords: ['progress', 'linear', 'bar', 'percentage'],
    render: () => (
      <div className="vstack">
        <ProgressBar label="Module 3 · Design systems" value={72} />
        <ProgressBar label="Série hebdo" value={40} fill="warm" />
        <ProgressBar label="Gradient fill" value={60} fill="gradient" size="lg" />
        <ProgressBar value={25} size="sm" valueLabel={false} />
      </div>
    ),
  },

  /* ---- CONTENT & DISPLAY ------------------------------------------------ */
  {
    name: 'ActivityItem',
    codeName: 'ActivityItem.tsx',
    cssBase: '.tls-activity-item',
    category: 'Content',
    description: 'Ligne d\'activité pour les fils d\'actualités. Icône + titre + description + timestamp.',
    keywords: ['activity', 'feed', 'timeline', 'history', 'notification'],
    render: () => (
      <div className="vstack">
        <ActivityItem icon={I.check} title="Leçon terminée" description="Introduction au Prompt Engineering" timestamp="Il y a 2h" />
        <ActivityItem icon={I.trophy} title="Badge débloqué" description="Pionnier IA — Premier badge gagné !" timestamp="Hier" />
        <ActivityItem icon={I.heart} title="Série maintenue" description="7 jours consécutifs d'apprentissage" timestamp="Aujourd'hui" />
      </div>
    ),
  },
  {
    name: 'SectionTitle',
    codeName: 'SectionTitle.tsx',
    cssBase: '.tls-section-title',
    category: 'Content',
    description: 'En-tête de section de page. Titre + sous-titre optionnel. Assure la cohérence des titres de section à travers l\'app.',
    keywords: ['heading', 'section', 'title', 'subtitle', 'header'],
    render: () => (
      <div className="vstack">
        <SectionTitle title="Actions rapides" subtitle="Accédez directement à vos fonctionnalités" />
        <SectionTitle title="Fil d'actualité" />
      </div>
    ),
  },

  /* ---- NAVIGATION ------------------------------------------------------- */
  {
    name: 'Sidebar',
    codeName: 'Sidebar.tsx',
    cssBase: '.sidebar / .nav-item',
    category: 'Navigation',
    description: 'Primary app navigation. Grouped sections, active state with 3px left bar.',
    keywords: ['sidebar', 'nav', 'menu', 'shell'],
    render: () => (
      <div style={{ height: 380, background: 'var(--surface-muted)', borderRadius: 'var(--r-xl)', padding: 12, display: 'flex' }}>
        <Sidebar
          brand={<><span style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--tls-primary-500)' }} /> <span>TLS</span></>}
          user={<><Avatar size="sm" name="Jeanne Dupont" /><div><p style={{ margin: 0, fontWeight: 600, fontSize: 'var(--t-caption)' }}>Jeanne D.</p><p style={{ margin: 0, fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>Apprenante</p></div></>}
        >
          <SidebarGroup label="Principal">
            <NavItem icon={I.home} label="Tableau de bord" active />
            <NavItem icon={I.book} label="Parcours" count={3} />
            <NavItem icon={I.trophy} label="Récompenses" />
          </SidebarGroup>
          <SidebarGroup label="Paramètres">
            <NavItem icon={I.settings} label="Préférences" />
          </SidebarGroup>
        </Sidebar>
      </div>
    ),
  },
];

/* ============================================================================
 * TOKEN DEFINITIONS — parsed from /src/design-system/spec.json
 * ============================================================================ */

const buildColorScale = (group: string, prefix: string, values: Array<[string, string]>): TokenEntry[] =>
  values.map(([step, hex]) => ({
    name: `${prefix} ${step}`,
    cssVar: `--tls-${prefix.toLowerCase()}-${step}`,
    value: hex,
    group,
    type: 'color',
  }));

const COLOR_TOKENS: TokenEntry[] = [
  ...buildColorScale('Primary (Teal)', 'primary', [
    ['50', '#E8F4F7'], ['100', '#DCEBEF'], ['200', '#B9D7DF'], ['300', '#96C3CF'],
    ['400', '#73AFBF'], ['500', '#55A1B4'], ['600', '#4A8FA1'], ['700', '#3D7786'],
    ['800', '#2F5F6A'], ['900', '#1F3E45'],
  ]),
  ...buildColorScale('Orange (Warm)', 'orange', [
    ['50', '#FFF3EB'], ['100', '#FDDCC7'], ['200', '#FCBB93'], ['300', '#F59A5F'],
    ['400', '#F18A4C'], ['500', '#ED843A'], ['600', '#C06920'], ['700', '#8F5017'],
    ['800', '#5E3710'], ['900', '#3B2109'],
  ]),
  ...buildColorScale('Yellow (Sun)', 'yellow', [
    ['50', '#FFF9EE'], ['100', '#FFECC8'], ['200', '#FFD791'], ['300', '#FFC15A'],
    ['400', '#F8B044'], ['500', '#DF9E3D'], ['600', '#C68D36'], ['700', '#AE7B30'],
    ['800', '#956A29'], ['900', '#7C5822'],
  ]),
  ...buildColorScale('Ink (Neutrals)', 'ink', [
    ['0', '#FFFFFF'], ['25', '#FAFBFC'], ['50', '#F5F8F8'], ['100', '#EEF2F4'],
    ['200', '#E0E6E9'], ['300', '#C8D2D6'], ['400', '#9AA8AE'], ['500', '#6B7981'],
    ['600', '#535B62'], ['700', '#3A474B'], ['800', '#2A3538'], ['900', '#252B37'],
    ['950', '#12181C'],
  ]),
];

const SEMANTIC_TOKENS: TokenEntry[] = [
  { name: 'Success base', cssVar: '--tls-success-base', value: '#9DBEBA', group: 'Semantic', type: 'color' },
  { name: 'Success bg', cssVar: '--tls-success-bg', value: '#E8F2F0', group: 'Semantic', type: 'color' },
  { name: 'Success fg', cssVar: '--tls-success-fg', value: '#335A56', group: 'Semantic', type: 'color' },
  { name: 'Warning base', cssVar: '--tls-warning-base', value: '#F8B044', group: 'Semantic', type: 'color' },
  { name: 'Warning bg', cssVar: '--tls-warning-bg', value: '#FFF9EE', group: 'Semantic', type: 'color' },
  { name: 'Warning fg', cssVar: '--tls-warning-fg', value: '#7C5822', group: 'Semantic', type: 'color' },
  { name: 'Danger base', cssVar: '--tls-danger-base', value: '#F28559', group: 'Semantic', type: 'color' },
  { name: 'Danger bg', cssVar: '--tls-danger-bg', value: '#FEF4F0', group: 'Semantic', type: 'color' },
  { name: 'Danger fg', cssVar: '--tls-danger-fg', value: '#8F2A0E', group: 'Semantic', type: 'color' },
  { name: 'Info base', cssVar: '--tls-info-base', value: '#55A1B4', group: 'Semantic', type: 'color' },
  { name: 'Info bg', cssVar: '--tls-info-bg', value: '#E8F4F7', group: 'Semantic', type: 'color' },
  { name: 'Info fg', cssVar: '--tls-info-fg', value: '#1F3E45', group: 'Semantic', type: 'color' },
];

const ROLE_TOKENS: TokenEntry[] = [
  { name: 'bg', cssVar: '--bg', value: '#FAFBFC', group: 'Roles', type: 'role' },
  { name: 'surface', cssVar: '--surface', value: '#FFFFFF', group: 'Roles', type: 'role' },
  { name: 'surface-muted', cssVar: '--surface-muted', value: '#F5F8F8', group: 'Roles', type: 'role' },
  { name: 'surface-sunken', cssVar: '--surface-sunken', value: '#EEF2F4', group: 'Roles', type: 'role' },
  { name: 'border', cssVar: '--border', value: 'rgba(37,43,55,0.08)', group: 'Roles', type: 'role' },
  { name: 'border-strong', cssVar: '--border-strong', value: 'rgba(37,43,55,0.14)', group: 'Roles', type: 'role' },
  { name: 'text', cssVar: '--text', value: '#252B37', group: 'Roles', type: 'role' },
  { name: 'text-muted', cssVar: '--text-muted', value: '#535B62', group: 'Roles', type: 'role' },
  { name: 'text-soft', cssVar: '--text-soft', value: '#6B7981', group: 'Roles', type: 'role' },
  { name: 'text-inverse', cssVar: '--text-inverse', value: '#FFFFFF', group: 'Roles', type: 'role' },
];

const TYPOGRAPHY_TOKENS: TokenEntry[] = [
  { name: 'display 2xl', cssVar: '--t-display-2xl', value: 'clamp(3.5rem, 6vw + 1rem, 6.5rem)', group: 'Display', type: 'typography' },
  { name: 'display xl', cssVar: '--t-display-xl', value: 'clamp(2.75rem, 4vw + 1rem, 4.5rem)', group: 'Display', type: 'typography' },
  { name: 'display lg', cssVar: '--t-display-lg', value: 'clamp(2.25rem, 2.5vw + 1rem, 3.25rem)', group: 'Display', type: 'typography' },
  { name: 'h1', cssVar: '--t-h1', value: '2.25rem · 36px', group: 'Headings', type: 'typography' },
  { name: 'h2', cssVar: '--t-h2', value: '1.75rem · 28px', group: 'Headings', type: 'typography' },
  { name: 'h3', cssVar: '--t-h3', value: '1.375rem · 22px', group: 'Headings', type: 'typography' },
  { name: 'h4', cssVar: '--t-h4', value: '1.125rem · 18px', group: 'Headings', type: 'typography' },
  { name: 'body-lg', cssVar: '--t-body-lg', value: '1.125rem · 18px', group: 'Body', type: 'typography' },
  { name: 'body', cssVar: '--t-body', value: '1rem · 16px', group: 'Body', type: 'typography' },
  { name: 'body-sm', cssVar: '--t-body-sm', value: '0.9375rem · 15px', group: 'Body', type: 'typography' },
  { name: 'caption', cssVar: '--t-caption', value: '0.8125rem · 13px', group: 'Body', type: 'typography' },
  { name: 'micro', cssVar: '--t-micro', value: '0.6875rem · 11px', group: 'Body', type: 'typography' },
];

const SPACING_TOKENS: TokenEntry[] = [
  ['--s-0', '0'], ['--s-1', '4px'], ['--s-2', '8px'], ['--s-3', '12px'],
  ['--s-4', '16px'], ['--s-5', '20px'], ['--s-6', '24px'], ['--s-8', '32px'],
  ['--s-10', '40px'], ['--s-12', '48px'], ['--s-16', '64px'], ['--s-20', '80px'],
  ['--s-24', '96px'], ['--s-32', '128px'],
].map(([cssVar, value]) => ({
  name: cssVar.replace('--s-', 'space-'),
  cssVar,
  value,
  group: 'Spacing (4pt base)',
  type: 'spacing',
}));

const RADIUS_TOKENS: TokenEntry[] = [
  ['--r-xs', '4px'], ['--r-sm', '6px'], ['--r-md', '10px'], ['--r-lg', '14px'],
  ['--r-xl', '20px'], ['--r-2xl', '28px'], ['--r-pill', '999px'],
].map(([cssVar, value]) => ({
  name: cssVar.replace('--r-', 'radius-'),
  cssVar,
  value,
  group: 'Border radius',
  type: 'radius',
}));

const SHADOW_TOKENS: TokenEntry[] = [
  { name: 'shadow-xs', cssVar: '--shadow-xs', value: '0 1px 2px rgba(18,24,28,.04)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-sm', cssVar: '--shadow-sm', value: '0 1px 2px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.04)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-md', cssVar: '--shadow-md', value: '0 4px 12px -2px rgba(0,0,0,.08)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-lg', cssVar: '--shadow-lg', value: '0 16px 40px -12px rgba(0,0,0,.14)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-xl', cssVar: '--shadow-xl', value: '0 28px 72px -20px rgba(0,0,0,.22)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-brand', cssVar: '--shadow-brand', value: '0 10px 30px -10px rgba(85,161,180,.45)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-warm', cssVar: '--shadow-warm', value: '0 10px 30px -10px rgba(237,132,58,.35)', group: 'Elevation', type: 'shadow' },
];

const MOTION_TOKENS: TokenEntry[] = [
  { name: 'ease-standard', cssVar: '--ease-standard', value: 'cubic-bezier(0.2, 0, 0, 1)', group: 'Easing', type: 'motion' },
  { name: 'ease-emphasized', cssVar: '--ease-emphasized', value: 'cubic-bezier(0.2, 0, 0, 1.15)', group: 'Easing', type: 'motion' },
  { name: 'ease-entrance', cssVar: '--ease-entrance', value: 'cubic-bezier(0, 0, 0.2, 1)', group: 'Easing', type: 'motion' },
  { name: 'ease-exit', cssVar: '--ease-exit', value: 'cubic-bezier(0.4, 0, 1, 1)', group: 'Easing', type: 'motion' },
  { name: 'dur-1', cssVar: '--dur-1', value: '120ms', group: 'Duration', type: 'motion' },
  { name: 'dur-2', cssVar: '--dur-2', value: '180ms', group: 'Duration', type: 'motion' },
  { name: 'dur-3', cssVar: '--dur-3', value: '240ms', group: 'Duration', type: 'motion' },
  { name: 'dur-4', cssVar: '--dur-4', value: '320ms', group: 'Duration', type: 'motion' },
];

const GRADIENT_TOKENS: TokenEntry[] = [
  { name: 'Warm', cssVar: '--g-warm', value: 'linear-gradient(135deg, #F8B044, #ED843A)', group: 'Gradients', type: 'gradient' },
  { name: 'Warm soft', cssVar: '--g-warm-soft', value: 'linear-gradient(180deg, #FFF3EB, #FFE6D6)', group: 'Gradients', type: 'gradient' },
  { name: 'Cool', cssVar: '--g-cool', value: 'linear-gradient(135deg, #55A1B4, #3D7786)', group: 'Gradients', type: 'gradient' },
  { name: 'Cool deep', cssVar: '--g-cool-deep', value: 'linear-gradient(135deg, #2F5F6A, #1F3E45)', group: 'Gradients', type: 'gradient' },
  { name: 'Cool soft', cssVar: '--g-cool-soft', value: 'linear-gradient(180deg, #E8F4F7, #DCEBEF)', group: 'Gradients', type: 'gradient' },
];

const ALL_TOKENS: TokenEntry[] = [
  ...COLOR_TOKENS,
  ...SEMANTIC_TOKENS,
  ...ROLE_TOKENS,
  ...TYPOGRAPHY_TOKENS,
  ...SPACING_TOKENS,
  ...RADIUS_TOKENS,
  ...SHADOW_TOKENS,
  ...MOTION_TOKENS,
  ...GRADIENT_TOKENS,
];

/* ============================================================================
 * COPY TO CLIPBOARD UTIL
 * ============================================================================ */

const copyToClipboard = async (text: string, onDone?: () => void) => {
  try {
    await navigator.clipboard.writeText(text);
    onDone?.();
  } catch {
    // Silent fail — not critical
  }
};

const CopyChip: React.FC<{ text: string; label?: React.ReactNode }> = ({ text, label }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy-chip"
      onClick={() => copyToClipboard(text, () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      })}
      title="Cliquer pour copier"
    >
      <code>{label ?? text}</code>
      <span className="copy-chip__state">{copied ? '✓ copié' : '⧉'}</span>
    </button>
  );
};

/* ============================================================================
 * TOKEN SWATCH RENDERERS
 * ============================================================================ */

const Swatch: React.FC<{ t: TokenEntry }> = ({ t }) => {
  if (t.type === 'color' || t.type === 'role') {
    return (
      <div className="token-card">
        <div
          className="token-card__swatch"
          style={{
            background: t.type === 'role' && t.cssVar.startsWith('--border')
              ? `linear-gradient(45deg, transparent 49%, ${t.value} 49%, ${t.value} 51%, transparent 51%)`
              : t.value,
            border: t.cssVar.includes('surface') || t.value === '#FFFFFF' ? '1px solid var(--border)' : undefined,
          }}
        />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'gradient') {
    return (
      <div className="token-card">
        <div className="token-card__swatch" style={{ background: t.value }} />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value" title={t.value}>{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'shadow') {
    return (
      <div className="token-card">
        <div
          className="token-card__swatch token-card__swatch--shadow"
          style={{ boxShadow: t.value }}
        />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value" title={t.value}>{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'spacing') {
    const px = parseInt(t.value, 10) || 0;
    return (
      <div className="token-card">
        <div className="token-card__swatch token-card__swatch--spacing">
          <span style={{ width: Math.max(px, 2), height: 16, background: 'var(--tls-primary-400)', borderRadius: 2 }} />
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'radius') {
    return (
      <div className="token-card">
        <div
          className="token-card__swatch token-card__swatch--radius"
          style={{ borderRadius: t.value }}
        />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'typography') {
    const isDisplay = t.group === 'Display';
    const fontSize = isDisplay ? '2rem' : t.value.split(' ')[0];
    return (
      <div className="token-card token-card--wide">
        <div
          className="token-card__typography"
          style={{
            fontFamily: t.name.startsWith('display') || t.name.startsWith('h')
              ? 'League Spartan, sans-serif'
              : 'Nunito, sans-serif',
            fontSize,
            fontWeight: t.name.startsWith('h') || t.name.startsWith('display') ? 600 : 400,
          }}
        >
          Aa Éé Öö 1234
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'motion') {
    return (
      <div className="token-card">
        <div className="token-card__swatch token-card__swatch--motion">
          <span className="motion-dot" style={{ animationTimingFunction: t.value.includes('cubic') ? t.value : undefined, animationDuration: t.value.includes('ms') ? t.value : undefined }} />
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value" title={t.value}>{t.value}</p>
        </div>
      </div>
    );
  }

  return null;
};

/* ============================================================================
 * MAIN PAGE
 * ============================================================================ */

type Filter = 'all' | Category | 'Tokens' | 'Pages';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'Core', label: 'Core' },
  { id: 'Patterns', label: 'Patterns' },
  { id: 'Learning', label: 'Learning' },
  { id: 'Content', label: 'Content' },
  { id: 'Navigation', label: 'Navigation' },
  { id: 'Tokens', label: 'Tokens' },
  { id: 'Pages', label: 'Pages & Templates' },
];

const Components: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const q = query.trim().toLowerCase();

  const filteredComponents = useMemo(() => {
    if (filter === 'Tokens' || filter === 'Pages') return [];
    return COMPONENTS.filter((c) => {
      if (filter !== 'all' && c.category !== filter) return false;
      if (!q) return true;
      const haystack = [
        c.name, c.codeName, c.cssBase, c.description, c.category, ...c.keywords,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, filter]);

  const filteredTokens = useMemo(() => {
    if (filter !== 'all' && filter !== 'Tokens') return [];
    return ALL_TOKENS.filter((t) => {
      if (!q) return true;
      const haystack = [t.name, t.cssVar, t.value, t.group, t.type].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, filter]);

  const filteredPages = useMemo(() => {
    if (filter !== 'all' && filter !== 'Pages') return [];
    return PAGE_TEMPLATES.filter((p) => {
      if (!q) return true;
      const haystack = [p.name, p.description, p.family, ...p.tags].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, filter]);

  const pagesByFamily = useMemo(() => {
    const order = ['Core', 'Journal', 'Veille', 'Coaching'];
    const map = new Map<string, PageTemplate[]>();
    filteredPages.forEach((p) => {
      if (!map.has(p.family)) map.set(p.family, []);
      map.get(p.family)!.push(p);
    });
    return order
      .map((fam) => [fam, map.get(fam) ?? []] as const)
      .filter(([, list]) => list.length > 0);
  }, [filteredPages]);

  const tokensByGroup = useMemo(() => {
    const map = new Map<string, TokenEntry[]>();
    filteredTokens.forEach((t) => {
      if (!map.has(t.group)) map.set(t.group, []);
      map.get(t.group)!.push(t);
    });
    return Array.from(map.entries());
  }, [filteredTokens]);

  const componentsByCategory = useMemo(() => {
    const order: Category[] = ['Core', 'Patterns', 'Learning', 'Content', 'Navigation'];
    return order
      .map((cat) => [cat, filteredComponents.filter((c) => c.category === cat)] as const)
      .filter(([, list]) => list.length > 0);
  }, [filteredComponents]);

  return (
    <div className="ds-showcase">
      {/* -------------------------------- HERO -------------------------------- */}
      <header className="ds-hero">
        <p className="ds-hero__eyebrow">Design System · v1.0.0 · 2026-04-24</p>
        <h1 className="ds-hero__title">The Learning Society — Components</h1>
        <p className="ds-hero__desc">
          Source of truth: <code>src/components/</code>. {COMPONENTS.length} composants React
          + tous les tokens du système. Tout est copiable — cliquez sur une puce pour
          copier le nom de code ou la variable CSS.
        </p>
        <div className="ds-hero__stats">
          <div><strong>{COMPONENTS.length}</strong><span>composants</span></div>
          <div><strong>{ALL_TOKENS.length}</strong><span>tokens</span></div>
          <div><strong>5</strong><span>catégories</span></div>
          <div><strong>3</strong><span>fontes</span></div>
        </div>
      </header>

      {/* -------------------------------- CONTROLS ---------------------------- */}
      <div className="ds-controls">
        <Search
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
          placeholder="Rechercher un composant, un token, une classe CSS…"
        />
        <div className="ds-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`ds-filter${filter === f.id ? ' ds-filter--active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------------- RESULTS ----------------------------- */}
      {filteredComponents.length === 0 && filteredTokens.length === 0 && filteredPages.length === 0 ? (
        <EmptyState
          title="Aucun résultat"
          description={`Rien ne correspond à « ${query} ». Essayez un autre terme.`}
          actions={<Button variant="primary" onClick={() => { setQuery(''); setFilter('all'); }}>Réinitialiser</Button>}
        />
      ) : (
        <>
          {/* ---- Components by category ---- */}
          {componentsByCategory.map(([cat, list]) => (
            <section key={cat} className="ds-section">
              <div className="ds-section__head">
                <h2 className="ds-section__title">{cat}</h2>
                <span className="ds-section__count">{list.length} composant{list.length > 1 ? 's' : ''}</span>
              </div>
              <div className="ds-component-list">
                {list.map((c) => (
                  <article key={c.name} className="ds-component">
                    <header className="ds-component__head">
                      <div>
                        <h3 className="ds-component__name">{c.name}</h3>
                        <p className="ds-component__desc">{c.description}</p>
                      </div>
                      <div className="ds-component__chips">
                        <CopyChip text={c.codeName} label={`‹${c.codeName}›`} />
                        <CopyChip text={c.cssBase} label={c.cssBase} />
                        <span className="ds-component__cat">{c.category}</span>
                      </div>
                    </header>
                    <div className="ds-component__preview">{c.render()}</div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {/* ---- Pages & Templates ---- */}
          {pagesByFamily.map(([family, pages]) => (
            <section key={family} className="ds-section">
              <div className="ds-section__head">
                <h2 className="ds-section__title">Pages · {family}</h2>
                <span className="ds-section__count">{pages.length} template{pages.length > 1 ? 's' : ''}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--s-4)' }}>
                {pages.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--r-xl)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Color header */}
                    <div
                      style={{
                        background: p.bg,
                        borderBottom: '1px solid var(--border)',
                        padding: 'var(--s-5) var(--s-5) var(--s-4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--s-3)',
                      }}
                    >
                      <span style={{ fontSize: '28px', lineHeight: 1 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '2px' }}>
                          {p.family}
                        </div>
                        <div style={{ fontSize: 'var(--t-body)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>
                          {p.name}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: 'var(--s-4) var(--s-5)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                      <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                        {p.description}
                      </p>

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '2px 8px',
                              borderRadius: '999px',
                              background: 'var(--surface-muted)',
                              border: '1px solid var(--border)',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: 'var(--text-muted)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Navigate button */}
                      <button
                        type="button"
                        onClick={() => navigate(p.path)}
                        style={{
                          marginTop: 'auto',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '9px 18px',
                          borderRadius: '999px',
                          background: p.color,
                          border: 'none',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: 'var(--t-sm)',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          transition: 'opacity 0.15s',
                          width: '100%',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        Ouvrir la page →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* ---- Tokens ---- */}
          {filteredTokens.length > 0 && (
            <section className="ds-section">
              <div className="ds-section__head">
                <h2 className="ds-section__title">Design Tokens</h2>
                <span className="ds-section__count">{filteredTokens.length} token{filteredTokens.length > 1 ? 's' : ''}</span>
              </div>
              {tokensByGroup.map(([group, list]) => (
                <div key={group} className="ds-token-group">
                  <h3 className="ds-token-group__title">{group}</h3>
                  <div className={`ds-token-grid ds-token-grid--${list[0].type}`}>
                    {list.map((t) => (
                      <Swatch key={t.cssVar} t={t} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}

      {/* -------------------------------- INLINE STYLES ----------------------- */}
      <style>{PAGE_STYLES}</style>
    </div>
  );
};

/* ============================================================================
 * PAGE-SPECIFIC STYLES
 * Not part of the design system proper — just glue for the showcase layout.
 * ============================================================================ */

const PAGE_STYLES = `
  .ds-showcase {
    max-width: 1240px;
    margin: 0 auto;
    padding: var(--s-8) var(--s-6);
    display: flex;
    flex-direction: column;
    gap: var(--s-10);
  }
  .ds-hero {
    padding: var(--s-10) var(--s-8);
    border-radius: var(--r-2xl);
    background: var(--g-cool-soft, linear-gradient(180deg, #E8F4F7, #DCEBEF));
    display: flex; flex-direction: column; gap: var(--s-3);
  }
  .ds-hero__eyebrow {
    font-size: var(--t-micro); font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; color: var(--tls-primary-800); margin: 0;
  }
  .ds-hero__title {
    font-family: 'League Spartan', sans-serif;
    font-size: var(--t-display-lg); line-height: 1.05; margin: 0;
    color: var(--tls-primary-900);
  }
  .ds-hero__desc { margin: 0; color: var(--tls-primary-800); font-size: var(--t-body-lg); max-width: 70ch; }
  .ds-hero__desc code {
    font-family: 'JetBrains Mono', monospace; font-size: .95em;
    background: rgba(255,255,255,0.55); padding: 1px 6px; border-radius: var(--r-sm);
  }
  .ds-hero__stats { display: flex; gap: var(--s-8); margin-top: var(--s-5); flex-wrap: wrap; }
  .ds-hero__stats > div { display: flex; flex-direction: column; }
  .ds-hero__stats strong {
    font-family: 'League Spartan', sans-serif; font-size: 2.25rem; line-height: 1;
    color: var(--tls-primary-800);
  }
  .ds-hero__stats span {
    font-size: var(--t-micro); text-transform: uppercase; letter-spacing: .06em;
    color: var(--tls-primary-700); margin-top: 4px;
  }

  .ds-controls {
    position: sticky; top: 0; z-index: 10;
    padding: var(--s-4) var(--s-2);
    background: rgba(255,255,255,0.85);
    backdrop-filter: var(--glass-blur, saturate(180%) blur(20px));
    border-radius: var(--r-xl);
    display: flex; flex-direction: column; gap: var(--s-3);
    border: 1px solid var(--border);
  }
  .ds-filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .ds-filter {
    border: 1px solid var(--border);
    background: var(--surface);
    padding: 6px 12px;
    border-radius: var(--r-pill);
    font-size: var(--t-caption);
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    transition: all var(--dur-2) var(--ease-standard);
  }
  .ds-filter:hover { color: var(--text); border-color: var(--border-strong); }
  .ds-filter--active {
    background: var(--tls-primary-600); color: #fff; border-color: var(--tls-primary-600);
  }

  .ds-section { display: flex; flex-direction: column; gap: var(--s-5); }
  .ds-section__head {
    display: flex; align-items: baseline; justify-content: space-between;
    padding-bottom: var(--s-3); border-bottom: 1px solid var(--border);
  }
  .ds-section__title {
    font-family: 'League Spartan', sans-serif; font-size: var(--t-h1);
    margin: 0; color: var(--text);
  }
  .ds-section__count {
    font-size: var(--t-caption); color: var(--text-muted); font-weight: 500;
  }

  .ds-component-list { display: flex; flex-direction: column; gap: var(--s-6); }
  .ds-component {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    padding: var(--s-6);
    display: flex; flex-direction: column; gap: var(--s-5);
  }
  .ds-component__head {
    display: flex; gap: var(--s-5); justify-content: space-between;
    flex-wrap: wrap; align-items: flex-start;
  }
  .ds-component__name {
    font-family: 'League Spartan', sans-serif; font-size: var(--t-h3);
    margin: 0; color: var(--text);
  }
  .ds-component__desc {
    margin: 4px 0 0; color: var(--text-muted); font-size: var(--t-body-sm);
    max-width: 70ch;
  }
  .ds-component__chips { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
  .ds-component__cat {
    font-size: var(--t-micro); font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; color: var(--tls-primary-700);
    background: var(--tls-primary-50); padding: 3px 8px; border-radius: var(--r-sm);
  }

  .ds-component__preview {
    padding: var(--s-6);
    background: var(--surface-muted);
    border-radius: var(--r-lg);
    border: 1px solid var(--border);
  }

  /* Shared utility helpers used inside component previews */
  .hstack { display: flex; gap: var(--s-3); flex-wrap: wrap; align-items: flex-start; }
  .vstack { display: flex; flex-direction: column; gap: var(--s-4); }
  .grid-2 {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: var(--s-4);
  }

  /* Copy chip */
  .copy-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--surface-muted);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 3px 8px;
    font-family: 'JetBrains Mono', monospace; font-size: var(--t-caption);
    color: var(--text); cursor: pointer;
    transition: all var(--dur-2) var(--ease-standard);
  }
  .copy-chip:hover { border-color: var(--tls-primary-300); color: var(--tls-primary-800); }
  .copy-chip__state { font-size: 10px; color: var(--text-soft); }
  .copy-chip code { font: inherit; background: none; padding: 0; }

  /* Token grids */
  .ds-token-group { display: flex; flex-direction: column; gap: var(--s-3); margin-top: var(--s-5); }
  .ds-token-group__title {
    font-family: 'League Spartan', sans-serif;
    font-size: var(--t-h4); margin: 0; color: var(--text);
  }
  .ds-token-grid {
    display: grid; gap: var(--s-3);
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  .ds-token-grid--typography { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
  .ds-token-grid--gradient { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }

  .token-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    padding: var(--s-3);
    display: flex; flex-direction: column; gap: var(--s-2);
  }
  .token-card--wide { grid-column: span 1; }
  .token-card__swatch {
    height: 72px; border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
  }
  .token-card__swatch--shadow { background: var(--surface); }
  .token-card__swatch--spacing { background: var(--surface-muted); }
  .token-card__swatch--radius {
    background: var(--tls-primary-100); width: 64px; height: 64px; margin: 8px auto;
  }
  .token-card__swatch--motion { background: var(--surface-muted); position: relative; overflow: hidden; }
  .token-card__swatch--motion .motion-dot {
    width: 10px; height: 10px; background: var(--tls-primary-600); border-radius: 50%;
    animation: motion-slide 1800ms infinite alternate;
  }
  @keyframes motion-slide { from { transform: translateX(-30px); } to { transform: translateX(30px); } }
  .token-card__typography {
    padding: var(--s-4); background: var(--surface-muted); border-radius: var(--r-md);
    color: var(--text);
    display: flex; align-items: center; justify-content: center;
    min-height: 72px;
  }
  .token-card__meta { display: flex; flex-direction: column; gap: 3px; }
  .token-card__name {
    margin: 0; font-size: var(--t-caption); font-weight: 600; color: var(--text);
  }
  .token-card__value {
    margin: 0; font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: var(--text-muted);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
`;

export { Components };
