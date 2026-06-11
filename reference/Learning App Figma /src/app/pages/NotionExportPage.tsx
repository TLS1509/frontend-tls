import { useState } from 'react';
import {
  Copy, Check, ArrowLeft, FileText, Download, ChevronDown,
  ChevronRight, AlertCircle, Info, ExternalLink, Loader
} from 'lucide-react';

interface Props {
  onNavigate?: (page: string) => void;
}

// ─────────────────────────────────────────────────────────────
// DOCUMENT 1 — Documentation Composants UI
// ─────────────────────────────────────────────────────────────
const DOC_COMPOSANTS_UI = `# Documentation Composants UI — TLS Design System

Design System : TLS v5.3 | Date : 01/04/2026
Composants : Tabs, Dropdown Menu, Dialog, Alert Dialog, Achievement Card, Stats Card

---

## 1. Tabs

### Props TypeScript

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| defaultValue | string | — | Tab active par défaut |
| value | string | — | Contrôle externe |
| onValueChange | function | — | Callback changement |
| orientation | horizontal ou vertical | horizontal | Orientation |
| activationMode | automatic ou manual | automatic | Mode activation |

### Variant visuel — pill

TabsList :
- background: var(--muted) — fond gris clair
- height: 40px
- padding: 4px
- border-radius: var(--radius-lg) — 10px

TabsTrigger inactif :
- color: var(--foreground)
- background: transparent
- border: 1px solid transparent
- padding: 6px 12px
- border-radius: var(--radius-md) — 8px
- transition: all 200ms ease

TabsTrigger actif :
- background: var(--card) — fond blanc
- color: var(--foreground)
- box-shadow: var(--shadow-sm)

TabsTrigger disabled :
- pointer-events: none
- opacity: 0.5

### Tokens CSS utilisés

| Token | Valeur | Usage |
|-------|--------|-------|
| --muted | #f5f5f5 | TabsList background |
| --card | #ffffff | Active tab background |
| --foreground | #252B37 | Text color |
| --ring | #55A1B4 | Focus ring |
| --radius-lg | 10px | TabsList radius |
| --radius-md | 8px | TabsTrigger radius |
| --shadow-sm | 0 1px 3px rgba(0,0,0,0.1) | Active shadow |

### Exemple d'utilisation

    import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';

    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Label 1</TabsTrigger>
        <TabsTrigger value="tab2">Label 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>Désactivé</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Contenu 1</TabsContent>
      <TabsContent value="tab2">Contenu 2</TabsContent>
    </Tabs>

Note : Le composant Tabs est disponible mais non utilisé dans les pages principales. VeillePage et CoachingPage utilisent des boutons custom pour leurs filtres.

---

## 2. Dropdown Menu

### Props TypeScript

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| open | boolean | — | Contrôle externe |
| onOpenChange | function | — | Callback |
| modal | boolean | true | Mode modal |
| align | start, center, end | center | Alignement content |
| sideOffset | number | 4 | Distance du trigger |

### États visuels

DropdownMenuContent :
- background: var(--background)
- border: 1px solid var(--border)
- border-radius: var(--radius-md)
- box-shadow: var(--shadow-md)
- padding: 4px

DropdownMenuItem default :
- color: var(--foreground)
- background: transparent
- padding: 6px 8px
- border-radius: var(--radius-sm) — 6px
- font-size: var(--text-sm) — 14px

DropdownMenuItem hover :
- background: var(--muted)

DropdownMenuItem disabled :
- pointer-events: none
- opacity: 0.5

Destructive (custom) :
- className: "text-destructive focus:bg-destructive focus:text-destructive-foreground"

### Comportement

- Ouverture : Click ou Enter/Space sur trigger
- Fermeture : Click outside, Escape, click sur item
- Positionnement : Auto via Radix Popper, évite les collisions

### Exemple complet

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><MoreVertical /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

---

## 3. Dialog & Alert Dialog

### Props TypeScript

| Prop | Type | Description |
|------|------|-------------|
| open | boolean | État d'ouverture |
| onOpenChange | function | Callback |
| modal | boolean | Mode modal — défaut true |

### Variants de taille

    <DialogContent className="max-w-sm">    // Small
    <DialogContent className="max-w-lg">    // Medium — défaut
    <DialogContent className="max-w-2xl">   // Large
    <DialogContent className="max-w-4xl">   // Extra Large

### Tokens CSS — DialogContent

| Token | Valeur | Usage |
|-------|--------|-------|
| --card | #ffffff | Background |
| --radius-lg | 10px | Border radius |
| --border | rgba(0,0,0,0.1) | Border |
| --shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | Shadow |
| --space-6 | 24px | Padding |
| --z-modal | 1050 | Z-index |

### Animations

Overlay :
- animation: fade-in 200ms ease
- background: rgba(0, 0, 0, 0.8)
- backdrop-filter: blur(4px)

Content :
- animation: scale-in 200ms ease
- from: opacity 0, scale 0.95
- to: opacity 1, scale 1

### AlertDialog vs Dialog

| Feature | Dialog | AlertDialog |
|---------|--------|-------------|
| Fermeture click outside | Oui | Non |
| Escape key | Oui | Non par défaut |
| Role ARIA | dialog | alertdialog |
| Usage | Formulaires, infos | Confirmations destructives |

---

## 4. Achievement Card

### Interface Achievement

    interface Achievement {
      id: string;
      title: string;
      description: string;
      category: 'learning' | 'social' | 'streak' | 'mastery' | 'special';
      icon: string;
      reward: { xp: number; badge?: string; };
      requirement: {
        type: 'lessons' | 'streak' | 'hours' | 'quiz-score' | 'custom';
        target: number;
        current: number;
        label: string;
      };
      unlocked: boolean;
      unlockedAt?: Date;
      rarity: 'common' | 'rare' | 'epic' | 'legendary';
    }

### Configurations de rareté

| Rareté | Couleur | Token Border | Token Glow |
|--------|---------|-------------|------------|
| Common | Gris | --neutral-300 | rgba(107,114,128,0.3) |
| Rare | Bleu TLS | --primary-300 | rgba(85,161,180,0.3) |
| Epic | Orange TLS | --secondary-300 | rgba(237,132,58,0.3) |
| Legendary | Jaune TLS | --accent-300 | rgba(248,176,68,0.4) |

### États visuels

Locked : Icône Lock grise, opacity 0.8, progress bar visible
Unlocked : Emoji icône, glow coloré selon rareté, date de déblocage
Hover : scale(1.02) translateY(-4px), transition 300ms

---

## 5. Stats Card / KPI Card

### Props TypeScript

    interface StatsCardProps {
      label: string;
      value: string | number;
      icon?: LucideIcon;
      trend?: {
        value: number;
        direction: 'up' | 'down' | 'neutral';
        label?: string;
      };
      color?: 'primary' | 'secondary' | 'accent' | 'success';
      variant?: 'default' | 'compact' | 'gradient';
    }

### Variants

| Variant | Layout | Features |
|---------|--------|----------|
| default | Vertical | Icône, valeur, label, trend |
| compact | Horizontal | Icône petite, pas de trend |
| gradient | Vertical | Background coloré, texte blanc |

### Tokens typographie

Valeur principale :
- font-family: var(--font-display) — League Spartan
- font-size: var(--text-3xl) — 30px
- font-weight: var(--font-weight-bold)

Label :
- font-family: var(--font-body) — Nunito
- font-size: var(--text-sm) — 14px
- color: var(--muted-foreground)

---

Documentation générée par Figma Make — TLS Design System v5.3 — 01/04/2026`;

// ─────────────────────────────────────────────────────────────
// DOCUMENT 2 — Audit Boutons
// ─────────────────────────────────────────────────────────────
const DOC_AUDIT_BUTTONS = `# Audit Design System — Boutons TLS

Design System : TLS v5.3 | Date : 01/04/2026
Scope : Tous les composants Button de l'application

---

## Résumé exécutif

L'application TLS dispose de deux systèmes de boutons :
1. /components/common/Button.tsx — Composant custom TLS (utilisé dans les pages)
2. /components/ui/button.tsx — Composant shadcn/ui avec CVA (utilisé dans certains modals)

---

## 1. Button — common/Button.tsx

### Variantes disponibles

| Variant | Background | Couleur texte | Shadow |
|---------|-----------|---------------|--------|
| primary | var(--gradient-primary) | white | rgba(85,161,180, 0.3) |
| secondary | gradient secondary → orange foncé | white | rgba(237,132,58, 0.3) |
| success | gradient success-600 → success-700 | white | rgba(34,197,94, 0.3) |
| destructive | gradient destructive-600 → destructive-700 | white | rgba(239,68,68, 0.3) |
| outline | transparent | var(--primary) | Aucun |
| ghost | rgba(85,161,180, 0.08) | var(--primary) | Aucun |

### Tailles

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 36px | 8px 16px | var(--text-sm) — 14px |
| md | 44px | 12px 24px | var(--text-base) — 16px |
| lg | 52px | 16px 32px | var(--text-lg) — 18px |

### Styles de base

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);               /* 8px */
    font-family: var(--font-body);     /* Nunito */
    font-weight: var(--font-weight-semibold);
    border-radius: var(--radius-lg);   /* 10px */
    border: none;
    transition: all var(--duration-fast) var(--ease-in-out);  /* 150ms */

### États interactifs

Hover Primary :
- transform: translateY(-2px)
- box-shadow: 0 8px 20px rgba(85, 161, 180, 0.4)

Hover Secondary :
- transform: translateY(-2px)
- box-shadow: 0 8px 20px rgba(237, 132, 58, 0.4)

Hover Outline :
- background: var(--primary-50)

Hover Ghost :
- background: rgba(85, 161, 180, 0.15)

Disabled :
- cursor: not-allowed
- opacity: 0.5

Loading :
- cursor: not-allowed
- Spinner: border 2px currentColor, border-top transparent, animation spin 0.6s

---

## 2. Button — ui/button.tsx (shadcn/CVA)

### Variantes CVA

| Variant | Description |
|---------|-------------|
| default | bg-primary, text blanc, hover primary-hover |
| secondary | bg-secondary, text blanc, hover secondary-hover |
| accent | bg-accent jaune, text blanc, hover accent-hover |
| destructive | bg-destructive rouge, text blanc |
| success | bg-success vert, text blanc |
| outline | border + bg transparent, hover muted |
| outline-primary | border-2 primary, bg transparent, hover primary/10 |
| outline-secondary | border-2 secondary, bg transparent, hover secondary/10 |
| outline-accent | border-2 accent, bg transparent, hover accent/10 |
| gradient-primary | background: var(--gradient-primary), text blanc |
| gradient-secondary | background: var(--gradient-secondary), text blanc |
| gradient-warm | background: var(--gradient-warm) orange+jaune, text blanc |
| glass | glassmorphism blanc, backdrop-blur, border primary |
| ghost | text muted, hover bg muted |
| link | text primary, underline on hover |

### Tailles CVA

| Size | Height | Padding | Border Radius |
|------|--------|---------|---------------|
| sm | 32px h-8 | px-3 | var(--radius-sm) — 6px |
| default | 40px h-10 | px-4 | var(--radius-md) — 8px |
| lg | 48px h-12 | px-6 | var(--radius-lg) — 10px |
| xl | 56px h-14 | px-8 | var(--radius-lg) — 10px |
| icon | 40x40px | — | var(--radius-md) |
| icon-sm | 32x32px | — | var(--radius-sm) |

---

## 3. Règles de gradients — Boutons

### Autorisé sur les boutons

| Gradient | Variable | Couleurs |
|----------|----------|---------|
| Primary | var(--gradient-primary) | Bleu → Bleu foncé — mono-couleur OK |
| Secondary | var(--gradient-secondary) | Orange → Orange foncé — mono-couleur OK |
| Warm | var(--gradient-warm) | Orange → Jaune — exception validée |
| Success | var(--success) | Vert plat ou gradient vert |
| Destructive | var(--destructive) | Rouge plat ou gradient rouge |

### Interdit sur les boutons

Les gradients multi-couleurs (bleu → orange → jaune) sont strictement interdits sur les boutons et composants UI.

| Gradient interdit | Raison |
|-------------------|--------|
| var(--gradient-tls) | Multi-couleurs — réservé hero/page |
| var(--gradient-tls-text) | Réservé au texte uniquement |
| var(--gradient-hero-tls) | Réservé aux sections hero |
| var(--gradient-tls-full) | Multi-couleurs — réservé page BG |

---

## 4. Audit — Points d'attention

### Incohérences détectées

1. Deux systèmes de boutons coexistent : common/Button.tsx et ui/button.tsx.
   Recommandation : migrer vers un seul système unifié.

2. Valeur hardcodée dans common/Button.tsx :
   // Problème :
   background: 'linear-gradient(135deg, var(--secondary), #D67231)'
   // Correction :
   background: 'var(--gradient-secondary)'

3. Shadow success non-TLS dans common/Button.tsx :
   // Problème :
   boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
   // Correction — success-500 = #4A8C6E :
   boxShadow: '0 4px 12px rgba(74, 140, 110, 0.3)'

4. Variant accent manquant dans common/Button.tsx :
   Le composant ui/button.tsx a un variant accent (jaune) absent dans common/Button.tsx.

### Conformité validée

- Tous les boutons utilisent var(--font-body) — OK
- Tous les boutons utilisent var(--font-weight-semibold) — OK
- Tous les boutons utilisent var(--radius-lg) — OK
- Les états hover utilisent translateY(-2px) de manière cohérente — OK
- Disabled = opacity 0.5 + cursor not-allowed — OK

---

## 5. Recommandations

### Priorité haute

1. Unifier les deux systèmes en un seul composant Button avec variantes CVA
2. Corriger les valeurs hardcodées (#D67231, shadow success) dans common/Button.tsx
3. Ajouter le variant accent (jaune) à common/Button.tsx

### Priorité moyenne

4. Documenter les variants d'icône (icon, icon-sm) dans common/Button.tsx
5. Ajouter les variants outline-secondary et outline-accent à common/Button.tsx
6. Standardiser les shadow colors en utilisant les variables de couleur TLS

### Priorité basse

7. Ajouter animations de loading au composant ui/button.tsx
8. Créer un Storybook ou Design System Kit pour valider visuellement toutes les variantes

---

Audit réalisé par Figma Make — TLS Design System v5.3 — 01/04/2026`;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function downloadMd(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────
// Notion API direct (fetch depuis le navigateur)
// ─────────────────────────────────────────────────────────────

function buildNotionBlocks(markdownContent: string): object[] {
  const lines = markdownContent.split('\n');
  const blocks: object[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('# ')) {
      blocks.push({ object: 'block', type: 'heading_1', heading_1: { rich_text: [{ type: 'text', text: { content: line.slice(2) } }] } });
    } else if (line.startsWith('## ')) {
      blocks.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: line.slice(3) } }] } });
    } else if (line.startsWith('### ')) {
      blocks.push({ object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: line.slice(4) } }] } });
    } else if (line.startsWith('---')) {
      blocks.push({ object: 'block', type: 'divider', divider: {} });
    } else if (line.startsWith('    ') && line.trim() !== '') {
      // code (indented 4 spaces)
      let codeLines = [line.slice(4)];
      while (i + 1 < lines.length && (lines[i + 1].startsWith('    ') || lines[i + 1] === '')) {
        i++;
        if (lines[i] === '') { if (i + 1 < lines.length && lines[i + 1].startsWith('    ')) { codeLines.push(''); } else { break; } }
        else { codeLines.push(lines[i].slice(4)); }
      }
      blocks.push({ object: 'block', type: 'code', code: { rich_text: [{ type: 'text', text: { content: codeLines.join('\n') } }], language: 'plain text' } });
    } else if (line.startsWith('| ')) {
      // table row — accumulate
      const tableLines: string[] = [line];
      while (i + 1 < lines.length && lines[i + 1].startsWith('|')) {
        i++;
        tableLines.push(lines[i]);
      }
      // skip separator rows |---|
      const rows = tableLines.filter(l => !l.match(/^\|[\s\-|]+\|$/));
      if (rows.length > 0) {
        const parseRow = (r: string) => r.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
        const [header, ...dataRows] = rows;
        const headerCells = parseRow(header);
        blocks.push({
          object: 'block', type: 'table',
          table: {
            table_width: headerCells.length,
            has_column_header: true,
            has_row_header: false,
            children: [
              { object: 'block', type: 'table_row', table_row: { cells: headerCells.map(c => [{ type: 'text', text: { content: c } }]) } },
              ...dataRows.map(r => ({ object: 'block', type: 'table_row', table_row: { cells: parseRow(r).map(c => [{ type: 'text', text: { content: c } }]) } })),
            ],
          },
        });
      }
    } else if (line.match(/^[0-9]+\. /)) {
      blocks.push({ object: 'block', type: 'numbered_list_item', numbered_list_item: { rich_text: [{ type: 'text', text: { content: line.replace(/^[0-9]+\. /, '') } }] } });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: line.slice(2) } }] } });
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      // paragraph — strip inline bold ** markers for simplicity
      const text = line.replace(/\*\*(.*?)\*\*/g, '$1');
      if (text.trim()) {
        blocks.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: text } }] } });
      }
    }
  }

  return blocks;
}

async function createNotionPage(token: string, databaseId: string, title: string, content: string): Promise<{ ok: boolean; url?: string; error?: string }> {
  const blocks = buildNotionBlocks(content);
  // Notion API max 100 blocks per request, chunk if needed
  const chunkSize = 90;
  const firstChunk = blocks.slice(0, chunkSize);

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        title: { title: [{ text: { content: title } }] },
      },
      children: firstChunk,
    }),
  });

  const data = await res.json();
  if (!res.ok) return { ok: false, error: data?.message || JSON.stringify(data) };

  const pageId = data.id;
  const pageUrl = data.url;

  // Append remaining blocks in chunks
  const remaining = blocks.slice(chunkSize);
  for (let i = 0; i < remaining.length; i += chunkSize) {
    const chunk = remaining.slice(i, i + chunkSize);
    await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ children: chunk }),
    });
  }

  return { ok: true, url: pageUrl };
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function CopyBtn({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        padding: 'var(--space-2) var(--space-3)',
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)',
        background: copied ? 'var(--success-100)' : 'var(--neutral-100)',
        color: copied ? 'var(--success-700)' : 'var(--neutral-600)',
        border: `1px solid ${copied ? 'var(--success-200)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)', cursor: 'pointer',
        transition: 'all var(--duration-fast) var(--ease-out)',
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copié' : 'Copier texte'}
    </button>
  );
}

function DocumentCard({
  doc,
  onDownload,
  onNotion,
  notionStatus,
}: {
  doc: { title: string; subtitle: string; filename: string; emoji: string; content: string; color: 'primary' | 'secondary' };
  onDownload: () => void;
  onNotion: () => void;
  notionStatus: 'idle' | 'loading' | 'success' | 'error';
}) {
  const [expanded, setExpanded] = useState(false);
  const c = doc.color === 'primary'
    ? { bg: 'var(--primary-50)', border: 'var(--primary-200)', accent: 'var(--primary)', light: 'var(--primary-100)' }
    : { bg: 'var(--secondary-lighter)', border: 'var(--secondary-100)', accent: 'var(--secondary)', light: 'var(--secondary-100)' };

  return (
    <div style={{ background: 'var(--card)', borderRadius: 'var(--radius-2xl)', border: `1px solid ${c.border}`, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      {/* Header */}
      <div style={{ padding: 'var(--space-5)', background: c.bg, borderBottom: `1px solid ${c.border}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', background: c.light, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
            {doc.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--foreground)', margin: '0 0 var(--space-1)' }}>{doc.title}</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)', lineHeight: 'var(--leading-relaxed)' }}>{doc.subtitle}</p>
          </div>
          <CopyBtn content={doc.content} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: 'var(--space-4) var(--space-5)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)' }}>

        {/* Download .md */}
        <button
          onClick={onDownload}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            padding: 'var(--space-2-5) var(--space-5)',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)',
            background: c.accent, color: 'white', border: 'none',
            borderRadius: 'var(--radius-lg)', cursor: 'pointer',
            boxShadow: `0 4px 12px ${doc.color === 'primary' ? 'rgba(85,161,180,0.3)' : 'rgba(237,132,58,0.3)'}`,
          }}
        >
          <Download size={15} />
          Télécharger .md
        </button>

        {/* Push to Notion */}
        <button
          onClick={onNotion}
          disabled={notionStatus === 'loading'}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            padding: 'var(--space-2-5) var(--space-5)',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)',
            background: notionStatus === 'success' ? 'var(--success)' : notionStatus === 'error' ? 'var(--destructive)' : 'var(--neutral-800)',
            color: 'white', border: 'none',
            borderRadius: 'var(--radius-lg)', cursor: notionStatus === 'loading' ? 'not-allowed' : 'pointer',
            opacity: notionStatus === 'loading' ? 0.7 : 1,
          }}
        >
          {notionStatus === 'loading' && <Loader size={14} style={{ animation: 'spin 0.8s linear infinite' } as React.CSSProperties} />}
          {notionStatus === 'success' && <Check size={14} />}
          {notionStatus === 'idle' || notionStatus === 'error' ? <ExternalLink size={14} /> : null}
          {notionStatus === 'idle' && 'Envoyer dans Notion'}
          {notionStatus === 'loading' && 'Envoi en cours…'}
          {notionStatus === 'success' && 'Page créée !'}
          {notionStatus === 'error' && 'Erreur — réessayer'}
        </button>

        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-400)', fontWeight: 'var(--font-regular)' }}>
          {doc.content.split('\n').length} lignes · {Math.round(doc.content.length / 1024 * 10) / 10} KB
        </span>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: c.accent, fontWeight: 'var(--font-semibold)', padding: 0 }}
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          {expanded ? 'Masquer' : 'Aperçu'}
        </button>
      </div>

      {/* Preview */}
      {expanded && (
        <div style={{ maxHeight: '360px', overflow: 'auto', background: '#1e1e2e' }}>
          <pre style={{ fontFamily: 'monospace', fontSize: '12px', color: '#cdd6f4', margin: 0, padding: 'var(--space-5)', whiteSpace: 'pre-wrap' as const, lineHeight: 1.6, wordBreak: 'break-word' as const }}>
            {doc.content}
          </pre>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function NotionExportPage({ onNavigate }: Props) {
  const [token, setToken] = useState('');
  const [dbId, setDbId] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [status1, setStatus1] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [status2, setStatus2] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [pageUrl1, setPageUrl1] = useState('');
  const [pageUrl2, setPageUrl2] = useState('');
  const [apiError, setApiError] = useState('');

  const docs = [
    {
      title: 'Documentation Composants UI',
      subtitle: 'Tabs, Dropdown Menu, Dialog, AlertDialog, Achievement Card, Stats Card — props TypeScript, états visuels, tokens CSS, exemples.',
      filename: 'TLS-Documentation-Composants-UI-v5.3.md',
      emoji: '📚',
      content: DOC_COMPOSANTS_UI,
      color: 'primary' as const,
    },
    {
      title: 'Audit Design System — Boutons',
      subtitle: 'Comparatif des deux systèmes Button, règles de gradients, incohérences détectées, recommandations prioritisées.',
      filename: 'TLS-Audit-Design-System-Buttons-v5.3.md',
      emoji: '🔍',
      content: DOC_AUDIT_BUTTONS,
      color: 'secondary' as const,
    },
  ];

  const canCallApi = token.trim().startsWith('secret_') && dbId.trim().length > 10;

  const handleNotion = async (idx: number) => {
    if (!canCallApi) return;
    const doc = docs[idx];
    const setStatus = idx === 0 ? setStatus1 : setStatus2;
    const setUrl = idx === 0 ? setPageUrl1 : setPageUrl2;
    setStatus('loading');
    setApiError('');
    const result = await createNotionPage(token.trim(), dbId.trim().replace(/-/g, ''), doc.title, doc.content);
    if (result.ok) {
      setStatus('success');
      if (result.url) setUrl(result.url);
    } else {
      setStatus('error');
      setApiError(result.error || 'Erreur inconnue');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '44px',
    padding: '0 var(--space-4)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-regular)',
    color: 'var(--foreground)',
    background: 'var(--input-background)',
    border: '1px solid var(--input-border)',
    borderRadius: 'var(--radius-lg)',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ height: '100vh', background: 'var(--neutral-50)', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'var(--font-body)' }}>

      {/* Top bar */}
      <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', padding: 'var(--space-4) var(--space-8)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexShrink: 0 }}>
        {onNavigate && (
          <button onClick={() => onNavigate('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-500)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', padding: 0 }}>
            <ArrowLeft size={16} />Retour
          </button>
        )}
        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--foreground)' }}>Export Notion</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--neutral-400)', marginLeft: 'var(--space-2)', fontWeight: 'var(--font-regular)' }}>— TLS Design System v5.3</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: canCallApi ? 'var(--success)' : 'var(--neutral-300)' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: canCallApi ? 'var(--success)' : 'var(--neutral-500)', fontWeight: 'var(--font-semibold)' }}>
            {canCallApi ? 'Notion connecté' : 'Token non configuré'}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-8)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

          {/* Page title */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-400)', fontWeight: 'var(--font-medium)', textTransform: 'uppercase' as const, letterSpacing: 'var(--tracking-wider)', margin: '0 0 var(--space-2)' }}>2 documents · Base "Docs"</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-black)', color: 'var(--foreground)', margin: 0, lineHeight: 'var(--leading-tight)' }}>Export vers Notion</h1>
          </div>

          {/* Method explanation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div style={{ background: 'var(--success-100)', border: '1px solid var(--success-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--success-700)', margin: '0 0 var(--space-1)' }}>✅ Méthode 1 — Télécharger .md</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--success-600)', margin: 0, lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-regular)' }}>
                Télécharge un vrai fichier <code>.md</code>. Puis dans Notion : <strong>Settings → Import → Markdown &amp; CSV</strong> → sélectionnez le fichier.
              </p>
            </div>
            <div style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--primary-700)', margin: '0 0 var(--space-1)' }}>⚡ Méthode 2 — API directe</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--primary-600)', margin: 0, lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-regular)' }}>
                Entrez votre token Notion + l'ID de la base "Docs" ci-dessous, et cliquez "Envoyer dans Notion" pour créer la page directement.
              </p>
            </div>
          </div>

          {/* API Config panel */}
          <div style={{ background: 'var(--card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ padding: 'var(--space-4) var(--space-5)', background: 'var(--neutral-50)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--neutral-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: '14px' }}>N</span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--foreground)' }}>Configuration Notion API</span>
              <a
                href="https://www.notion.so/my-integrations"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--primary)', fontWeight: 'var(--font-semibold)', textDecoration: 'none' }}
              >
                <ExternalLink size={12} />
                notion.so/my-integrations
              </a>
            </div>
            <div style={{ padding: 'var(--space-5)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              {/* Token */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', display: 'block', marginBottom: 'var(--space-1-5)' }}>
                  Token d'intégration
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showToken ? 'text' : 'password'}
                    placeholder="secret_xxxxxxxxxxxxxxxx"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    style={{ ...inputStyle, paddingRight: 'var(--space-10)' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(85,161,180,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button onClick={() => setShowToken(!showToken)} style={{ position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-400)', display: 'flex', alignItems: 'center', padding: 0 }}>
                    <Info size={16} />
                  </button>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-400)', margin: 'var(--space-1) 0 0', fontWeight: 'var(--font-regular)' }}>
                  Commence par <code>secret_</code>
                </p>
              </div>
              {/* Database ID */}
              <div>
                <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--foreground)', display: 'block', marginBottom: 'var(--space-1-5)' }}>
                  ID de la base "Docs"
                </label>
                <input
                  type="text"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  value={dbId}
                  onChange={e => setDbId(e.target.value)}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(85,161,180,0.15)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }}
                />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-400)', margin: 'var(--space-1) 0 0', fontWeight: 'var(--font-regular)' }}>
                  URL Notion : notion.so/…/<strong style={{ color: 'var(--primary-600)' }}>CET-ID</strong>?v=…
                </p>
              </div>
            </div>
            {!canCallApi && (
              <div style={{ padding: 'var(--space-3) var(--space-5)', background: 'var(--neutral-50)', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--neutral-500)', margin: 0, fontWeight: 'var(--font-regular)' }}>
                  💡 Sans configuration API, utilisez le bouton <strong>"Télécharger .md"</strong> puis importez via <strong>Notion → Settings → Import → Markdown &amp; CSV</strong>.
                </p>
              </div>
            )}
            {apiError && (
              <div style={{ padding: 'var(--space-3) var(--space-5)', background: 'var(--destructive-100)', borderTop: '1px solid var(--destructive-200)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--destructive)', margin: 0, fontWeight: 'var(--font-medium)' }}>
                  ❌ {apiError}
                </p>
              </div>
            )}
          </div>

          {/* Success links */}
          {(pageUrl1 || pageUrl2) && (
            <div style={{ background: 'var(--success-100)', border: '1px solid var(--success-200)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--success-700)', margin: '0 0 var(--space-2)' }}>✅ Pages créées avec succès</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {pageUrl1 && <a href={pageUrl1} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--primary)', fontWeight: 'var(--font-semibold)' }}>→ Documentation Composants UI</a>}
                {pageUrl2 && <a href={pageUrl2} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--secondary)', fontWeight: 'var(--font-semibold)' }}>→ Audit Design System Boutons</a>}
              </div>
            </div>
          )}

          {/* Documents */}
          {docs.map((doc, idx) => (
            <DocumentCard
              key={doc.filename}
              doc={doc}
              onDownload={() => downloadMd(doc.filename, doc.content)}
              onNotion={() => handleNotion(idx)}
              notionStatus={idx === 0 ? status1 : status2}
            />
          ))}

          {/* Steps for import method */}
          <div style={{ background: 'var(--card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', padding: 'var(--space-6)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--foreground)', margin: '0 0 var(--space-4)' }}>
              Comment importer le fichier .md dans Notion
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                'Cliquez "Télécharger .md" sur le document souhaité — le fichier se télécharge immédiatement',
                'Dans Notion, allez dans Settings & members → Import',
                'Choisissez "Markdown & CSV"',
                'Sélectionnez le fichier .md téléchargé — Notion crée une nouvelle page avec tout le contenu formaté',
                'Déplacez la page dans votre base "Docs" si nécessaire',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: 'var(--radius-full)', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: '3px 0 0', lineHeight: 'var(--leading-relaxed)', fontWeight: 'var(--font-regular)' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
