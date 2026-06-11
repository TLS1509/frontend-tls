# 🎨 Color Tokens V2.1 - START HERE

**Version:** 2.1.0 | **Status:** Ready to Use  
**Dernière mise à jour:** 22/02/2026

---

## ⚡ Quick Start (2 minutes)

### 1. Importer le fichier (30 secondes)

```tsx
// App.tsx ou src/index.tsx
import './styles/globals.css';
import './styles/globals-v2-additive-clean.css';  // ← AJOUTER CETTE LIGNE
```

### 2. Tester visuellement (1 minute)

**Créer:** `/components/tests/ColorFinalTest.tsx`

```tsx
export function ColorFinalTest() {
  const colors = [
    { name: 'Primary', hex: '#55A1B4', token: '--primary' },
    { name: 'Accent/Warning', hex: '#F8B044', token: '--accent' },
    { name: 'Success', hex: '#2A9D8F', token: '--success' },
    { name: 'Error', hex: '#EF4444', token: '--error' },
    { name: 'Destructive', hex: '#E76F51', token: '--destructive' },
  ];
  
  return (
    <div style={{ padding: '2rem', display: 'flex', gap: '1rem' }}>
      {colors.map(({ name, hex, token }) => (
        <div key={token}>
          <div style={{
            width: '100px',
            height: '100px',
            background: `var(${token})`,
            borderRadius: '0.5rem',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            {hex}
          </div>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{name}</p>
        </div>
      ))}
    </div>
  );
}
```

**Ajouter dans Dashboard ou DesignSystem:**
```tsx
import { ColorFinalTest } from './components/tests/ColorFinalTest';

// Temporairement en haut de page
<ColorFinalTest />
```

### 3. Vérifier (30 secondes)

Lancer l'app et vérifier que les 5 carrés de couleur s'affichent correctement:
- ✅ Bleu #55A1B4
- ✅ Jaune #F8B044
- ✅ Teal #2A9D8F
- ✅ Rouge #EF4444
- ✅ Coral #E76F51

---

## 📋 Convention Finale TLS

### 5 Couleurs → 6 Palettes

| Votre Couleur | Token Palette | Token Sémantique |
|---------------|---------------|------------------|
| **#55A1B4** Bleu | `--color-primary-500` | `--primary` |
| **#F8B044** Jaune | `--color-accent-400` | `--accent`, `--warning` |
| **#2A9D8F** Teal | `--color-success-500` | `--success` |
| **#EF4444** Rouge | `--color-error-500` | `--error` |
| **#E76F51** Coral | `--color-secondary-600` | `--destructive` |

### Palettes Disponibles (6)

```css
--color-primary-*     /* Bleu TLS (50-900) */
--color-secondary-*   /* Orange + Coral destructive (50-900) */
--color-accent-*      /* Jaune TLS (50-900) */
--color-neutral-*     /* Grays (50-900) */
--color-success-*     /* Teal (50-900) */
--color-error-*       /* Rouge (50-900) */
```

### ❌ Pas de Familles Séparées

```css
/* ❌ SUPPRIMÉ */
--color-teal-*     /* → Utiliser --color-success-* */
--color-coral-*    /* → #E76F51 est --color-secondary-600 */
--color-warning-*  /* → Alias vers --color-accent-* */
--color-info-*     /* → Alias vers --color-primary-* */
```

---

## 💡 Usage Recommandé

### Composants Standards → Tokens Sémantiques

```tsx
// ✅ BON
<Button style={{ background: 'var(--primary)' }} />
<Alert variant="success" style={{ background: 'var(--success)' }} />
<Alert variant="warning" style={{ background: 'var(--warning)' }} />
<Button variant="destructive" style={{ background: 'var(--destructive)' }} />
```

### Variantes Custom → Palette

```tsx
// ✅ BON
<Badge style={{
  background: 'var(--color-success-50)',  /* Light teal */
  color: 'var(--color-success-700)'       /* Dark teal */
}} />

<div style={{
  borderLeft: '4px solid var(--color-primary-500)'
}} />
```

### ❌ À Éviter

```tsx
// ❌ Hardcodé
<Button style={{ background: '#55A1B4' }} />

// ❌ Palette pour composants standards (utiliser sémantique)
<Button style={{ background: 'var(--color-primary-500)' }} />
// → Utiliser var(--primary) à la place
```

---

## 🔄 Migration Rapide

### Rechercher Hardcodé

```bash
grep -r "#55A1B4" /components  # → var(--primary)
grep -r "#F8B044" /components  # → var(--accent)
grep -r "#2A9D8F" /components  # → var(--success)
grep -r "#EF4444" /components  # → var(--error)
grep -r "#E76F51" /components  # → var(--destructive)
```

### Remplacements Standards

```tsx
// Hardcodé → Sémantique
- background: '#55A1B4'
+ background: 'var(--primary)'

- color: '#F8B044'
+ color: 'var(--accent)'

- borderColor: '#2A9D8F'
+ borderColor: 'var(--success)'

- color: '#EF4444'
+ color: 'var(--error)'

- background: '#E76F51'
+ background: 'var(--destructive)'
```

---

## 📚 Documentation Complète

### Plans & Guides
- **START HERE** (ce fichier) - Quick start 2 min
- `/docs/COLOR-TOKENS-MIGRATION-FINAL.md` - Plan migration 4 phases
- `/docs/COLOR-SEMANTIC-MAPPING-FINAL.md` - Détail vos 5 couleurs
- `/docs/COLOR-TOKENS-QUICK-REFERENCE.md` - Référence rapide

### Fichiers CSS
- `/styles/globals.css` - Ancien système (gardé)
- `/styles/globals-v2-additive-clean.css` - Nouveau système (additionnel)

---

## ✅ Checklist Démarrage

### Phase 1 - Setup (MAINTENANT)
- [ ] Import `globals-v2-additive-clean.css` dans App
- [ ] Composant `ColorFinalTest` créé
- [ ] Test visuel 5 couleurs OK
- [ ] Aucune régression app

### Phase 2 - Migration (2-3 semaines)
- [ ] Semaine 1: OptimizedSidebar, BackgroundBlobs, Buttons (8 composants)
- [ ] Semaine 2: SectionHeader, Badge, Modals (10 composants)
- [ ] Semaine 3: Reste

### Phase 3 - Cleanup (après migration)
- [ ] Merger fichiers CSS
- [ ] Supprimer anciens tokens (optionnel)
- [ ] Documentation finale

---

## 🎯 Prochaine Action

**MAINTENANT (5 min):**

1. Ajouter import dans App.tsx ✅
2. Créer ColorFinalTest ✅
3. Lancer app et vérifier ✅

**Ensuite:**

4. Lire `/docs/COLOR-TOKENS-MIGRATION-FINAL.md`
5. Commencer migration Semaine 1

---

## 🚨 Questions Fréquentes

**Q: Pourquoi #E76F51 n'a pas sa propre palette?**  
R: C'est un orange/coral chaud, logiquement une variante de secondary. Intégré en shade 600 pour éviter duplication.

**Q: Puis-je utiliser les anciens tokens (--primary-50, etc.)?**  
R: Oui, ils fonctionnent toujours. Migration progressive possible.

**Q: Warning et Info sont des aliases?**  
R: Oui. Warning → Accent (jaune), Info → Primary-600 (bleu). Pas de palettes séparées.

**Q: Ça va casser mon app?**  
R: Non. Approche 100% additive. Anciens et nouveaux tokens coexistent.

**Q: Quand supprimer anciens tokens?**  
R: Phase 4, APRÈS avoir migré 100% du code. Optionnel.

---

_Quick Start V2.1.0 | Convention TLS Finale | 22/02/2026_
