# 🔄 MIGRATION COULEURS TEAL/CORAL → SUCCESS/DESTRUCTIVE

**Date** : 01/04/2026  
**Design System** : TLS v5.3  
**Objectif** : Remplacer toutes les références aux anciennes couleurs Teal (#9dbeba) et Coral (#f49a76) par les nouvelles couleurs sémantiques SUCCESS (#4A8C6E) et DESTRUCTIVE (#A93226)

---

## 📋 FICHIERS À MODIFIER

### ✅ 6 fichiers identifiés contenant des références à teal/coral

1. `/pages/DashboardPageUpgraded.tsx` - 1 occurrence
2. `/pages/DesignSystemRealPage.tsx` - 9 occurrences
3. `/pages/JournalDetailPage.tsx` - 4 occurrences
4. `/pages/JournalPageUpgraded.tsx` - 18 occurrences
5. `/pages/ArticleDetailPage.tsx` - 1 occurrence
6. `/pages/DashboardDevSpecsPage.tsx` - 1 occurrence

**Total** : 34 occurrences à modifier

---

## 🔧 PLAN DE MIGRATION

### **1. DashboardPageUpgraded.tsx** (1 modification)

#### Ligne 241
**AVANT :**
```tsx
<ActionCard
  icon={Sparkles}
  iconColor="var(--teal)"
  title="Veille"
  description="Découvrir du contenu"
  onClick={() => onNavigate('veille')}
/>
```

**APRÈS :**
```tsx
<ActionCard
  icon={Sparkles}
  iconColor="var(--primary)"  // Utiliser primary au lieu de teal pour cohérence
  title="Veille"
  description="Découvrir du contenu"
  onClick={() => onNavigate('veille')}
/>
```

**Justification** : L'icône Veille devrait utiliser la couleur primary (bleu TLS) pour rester cohérente avec la navigation principale.

---

### **2. DesignSystemRealPage.tsx** (9 modifications)

#### ❌ À SUPPRIMER : Lignes 73-74 dans colorPalette

**AVANT :**
```tsx
{ name: 'Teal', var: '--teal', desc: 'Bleu-Vert #9dbeba (Nouveau)' },
{ name: 'Coral', var: '--coral', desc: 'Orange Saumon #f49a76 (Nouveau)' },
```

**APRÈS :**
```tsx
// Supprimer ces 2 lignes et les remplacer par :
{ name: 'Success', var: '--success', desc: 'Vert harmonieux #4A8C6E' },
{ name: 'Destructive', var: '--destructive', desc: 'Rouge sémantique #A93226' },
{ name: 'Error', var: '--error', desc: 'Alias de Destructive' },
```

#### ✏️ Lignes 1352, 1361, 1408, 1417, 1442, 1449, 1700

**Ces lignes sont dans la section de démonstration du Design System.**

**Stratégie** :
- Remplacer `#f49a76` (coral) → `var(--warning)` ou `var(--secondary)` selon le contexte
- Remplacer `#9dbeba` (teal) → `var(--success)`
- Remplacer `var(--teal)` → `var(--success)`
- Remplacer `var(--coral)` → `var(--destructive)` ou `var(--warning)`

**Détail ligne par ligne** :

**Ligne 1352** - Badge Intermédiaire
```tsx
// AVANT
border: '2px solid #f49a76',

// APRÈS
border: '2px solid var(--warning)',  // Orange pour niveau intermédiaire
```

**Ligne 1361** - Texte Badge
```tsx
// AVANT
color: '#f49a76',

// APRÈS
color: 'var(--warning)',
```

**Ligne 1408** - Badge Expert
```tsx
// AVANT
border: '2px solid #9dbeba',

// APRÈS
border: '2px solid var(--success)',  // Vert pour expert/succès
```

**Ligne 1417** - Texte Badge Expert
```tsx
// AVANT
color: '#9dbeba',

// APRÈS
color: 'var(--success)',
```

**Ligne 1442** - Icône info
```tsx
// AVANT
<Sparkles size={16} style={{ color: 'var(--teal)', flexShrink: 0 }} />

// APRÈS
<Sparkles size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />
```

**Ligne 1449** - Description palette
```tsx
// AVANT
<strong style={{ color: 'var(--coral)' }}>Coral</strong> (intermédiaire) et <strong style={{ color: 'var(--teal)' }}>Teal</strong> (expert)

// APRÈS
<strong style={{ color: 'var(--warning)' }}>Jaune/Orange</strong> (intermédiaire) et <strong style={{ color: 'var(--success)' }}>Vert</strong> (expert)
```

**Ligne 1700** - Description niveaux
```tsx
// AVANT
💡 <strong>Niveaux de compétences :</strong> Débutant (Teal #9dbeba) → Novice (Coral #f49a76) → Intermédiaire (Jaune) → Avancé (Orange) → Expert (Bleu TLS)

// APRÈS
💡 <strong>Niveaux de compétences :</strong> Débutant (Bleu clair) → Novice (Jaune) → Intermédiaire (Orange) → Avancé (Orange foncé) → Expert (Vert succès)
```

---

### **3. JournalDetailPage.tsx** (4 modifications)

#### ❌ Type "coaching" - Lignes 48-49

**AVANT :**
```tsx
coaching: {
  icon: Target,
  label: 'Coaching',
  color: 'var(--coral)',
  bgColor: 'var(--coral-lighter)',
},
```

**APRÈS :**
```tsx
coaching: {
  icon: Target,
  label: 'Coaching',
  color: 'var(--secondary)',        // Orange TLS pour coaching
  bgColor: 'var(--secondary-lighter)',
},
```

**Justification** : Coaching = Orange (secondary) dans la charte TLS

#### ❌ Type "insight" - Lignes 54-55

**AVANT :**
```tsx
insight: {
  icon: Lightbulb,
  label: 'Insight',
  color: 'var(--teal)',
  bgColor: 'var(--teal-lighter)',
},
```

**APRÈS :**
```tsx
insight: {
  icon: Lightbulb,
  label: 'Insight',
  color: 'var(--success)',        // Vert pour insight/succès
  bgColor: 'var(--success-50)',   // Fond très clair
},
```

**Justification** : Insight = Succès/Réussite → Vert harmonieux

---

### **4. JournalPageUpgraded.tsx** (18 modifications)

#### ❌ Configuration entryTypes - Lignes 64-72

**AVANT :**
```tsx
coaching: {
  icon: Target,
  label: 'Coaching',
  color: 'var(--coral)',
  bgColor: 'var(--coral-lighter)',
  emoji: '🎯',
},
insight: {
  icon: Lightbulb,
  label: 'Insight',
  color: 'var(--teal)',
  bgColor: 'var(--teal-lighter)',
  emoji: '💡',
},
```

**APRÈS :**
```tsx
coaching: {
  icon: Target,
  label: 'Coaching',
  color: 'var(--secondary)',
  bgColor: 'var(--secondary-lighter)',
  emoji: '🎯',
},
insight: {
  icon: Lightbulb,
  label: 'Insight',
  color: 'var(--success)',
  bgColor: 'var(--success-50)',
  emoji: '💡',
},
```

#### ✏️ Filtres & Boutons - Lignes 384, 409, 421, 438, 463, 475

**Ligne 384** - Border bouton coaching
```tsx
// AVANT
border: activeFilters.type?.includes('coaching') ? '1.5px solid var(--coral)' : '1px solid rgba(255, 255, 255, 0.5)',

// APRÈS
border: activeFilters.type?.includes('coaching') ? '1.5px solid var(--secondary)' : '1px solid rgba(255, 255, 255, 0.5)',
```

**Ligne 409** - Icône coaching
```tsx
// AVANT
<Target className="w-4 h-4" style={{ color: 'var(--coral)', strokeWidth: 2 }} />

// APRÈS
<Target className="w-4 h-4" style={{ color: 'var(--secondary)', strokeWidth: 2 }} />
```

**Ligne 421** - Badge count coaching
```tsx
// AVANT
color: 'var(--coral)',

// APRÈS
color: 'var(--secondary)',
```

**Ligne 438** - Border bouton insight
```tsx
// AVANT
border: activeFilters.type?.includes('insight') ? '1.5px solid var(--teal)' : '1px solid rgba(255, 255, 255, 0.5)',

// APRÈS
border: activeFilters.type?.includes('insight') ? '1.5px solid var(--success)' : '1px solid rgba(255, 255, 255, 0.5)',
```

**Ligne 463** - Icône insight
```tsx
// AVANT
<Lightbulb className="w-4 h-4" style={{ color: 'var(--teal)', strokeWidth: 2 }} />

// APRÈS
<Lightbulb className="w-4 h-4" style={{ color: 'var(--success)', strokeWidth: 2 }} />
```

**Ligne 475** - Badge count insight
```tsx
// AVANT
color: 'var(--teal)',

// APRÈS
color: 'var(--success)',
```

#### ✏️ Color maps - Lignes 537-538, 555-556

**Ligne 537-538** - Color map pour glow
```tsx
// AVANT
const colorMap = {
  'var(--primary)': 'rgba(85, 161, 180, 0.12)',
  'var(--secondary)': 'rgba(237, 132, 58, 0.12)',
  'var(--accent)': 'rgba(248, 176, 68, 0.12)',
  'var(--coral)': 'rgba(244, 154, 118, 0.12)',
  'var(--teal)': 'rgba(157, 190, 186, 0.12)',
};

// APRÈS
const colorMap = {
  'var(--primary)': 'rgba(85, 161, 180, 0.12)',
  'var(--secondary)': 'rgba(237, 132, 58, 0.12)',
  'var(--accent)': 'rgba(248, 176, 68, 0.12)',
  'var(--success)': 'rgba(74, 140, 110, 0.12)',    // SUCCESS #4A8C6E
  'var(--warning)': 'rgba(248, 176, 68, 0.12)',    // Même que accent
};
```

**Ligne 555-556** - Gradient glow radial
```tsx
// AVANT
template.color === 'var(--coral)' ? 'rgba(244, 154, 118, 0.15)' :
template.color === 'var(--teal)' ? 'rgba(157, 190, 186, 0.15)' :

// APRÈS
template.color === 'var(--success)' ? 'rgba(74, 140, 110, 0.15)' :
template.color === 'var(--warning)' ? 'rgba(248, 176, 68, 0.15)' :
```

---

### **5. ArticleDetailPage.tsx** (1 modification)

#### Ligne 244 - Progress bar gradient

**AVANT :**
```tsx
background: source === 'newsletter' 
  ? 'linear-gradient(90deg, var(--primary), var(--teal))'
  : 'linear-gradient(90deg, var(--primary), var(--secondary))',
```

**APRÈS :**
```tsx
background: source === 'newsletter' 
  ? 'var(--gradient-progress)'  // Utiliser le gradient officiel
  : 'linear-gradient(90deg, var(--primary), var(--secondary))',
```

**Justification** : Utiliser le gradient de progress bar officiel du design system

---

### **6. DashboardDevSpecsPage.tsx** (1 modification)

#### Ligne 633 - Exemple ColorSwatch

**AVANT :**
```tsx
<ColorSwatch name="Teal (Success)" variable="--teal" hex="#9dbeba" />
<ColorSwatch name="Teal Lighter" variable="--teal-lighter" hex="#e8f2f0" />
```

**APRÈS :**
```tsx
<ColorSwatch name="Success" variable="--success" hex="#4A8C6E" />
<ColorSwatch name="Success Light" variable="--success-50" hex="#F0F7F4" />
<ColorSwatch name="Destructive" variable="--destructive" hex="#A93226" />
<ColorSwatch name="Destructive Light" variable="--destructive-50" hex="#FDF3F2" />
```

---

## 📊 RÉSUMÉ DES REMPLACEMENTS

### Mappage des couleurs

| Ancien | Nouveau | Contexte d'usage |
|--------|---------|------------------|
| `var(--teal)` | `var(--success)` | Insight, Expert, Succès |
| `var(--teal-lighter)` | `var(--success-50)` | Backgrounds clairs |
| `#9dbeba` | `var(--success)` ou `#4A8C6E` | Hard-coded à remplacer |
| `var(--coral)` | `var(--secondary)` | Coaching (contexte orange) |
| `var(--coral)` | `var(--warning)` | Avertissements, niveaux intermédiaires |
| `var(--coral-lighter)` | `var(--secondary-lighter)` | Backgrounds orange |
| `#f49a76` | `var(--warning)` ou `var(--secondary)` | Hard-coded à remplacer |

### Valeurs RGBA à mettre à jour

| Ancien RGBA | Nouveau RGBA | Variable CSS |
|-------------|--------------|--------------|
| `rgba(157, 190, 186, 0.12)` | `rgba(74, 140, 110, 0.12)` | `--success` avec alpha |
| `rgba(244, 154, 118, 0.12)` | `rgba(237, 132, 58, 0.12)` | `--secondary` avec alpha |
| `rgba(157, 190, 186, 0.15)` | `rgba(74, 140, 110, 0.15)` | `--success` avec alpha |
| `rgba(244, 154, 118, 0.15)` | `rgba(237, 132, 58, 0.15)` | `--secondary` avec alpha |

---

## ✅ CHECKLIST DE MIGRATION

### Étape 1 : Backup
- [ ] Créer une branche Git : `git checkout -b migration/couleurs-success-destructive`
- [ ] Commit de l'état actuel

### Étape 2 : Modifications fichiers
- [ ] `/pages/DashboardPageUpgraded.tsx` (1 modification)
- [ ] `/pages/DesignSystemRealPage.tsx` (9 modifications)
- [ ] `/pages/JournalDetailPage.tsx` (4 modifications)
- [ ] `/pages/JournalPageUpgraded.tsx` (18 modifications)
- [ ] `/pages/ArticleDetailPage.tsx` (1 modification)
- [ ] `/pages/DashboardDevSpecsPage.tsx` (1 modification)

### Étape 3 : Vérification
- [ ] Compiler l'application sans erreurs
- [ ] Tester visuellement chaque page modifiée
- [ ] Vérifier la cohérence des couleurs
- [ ] Valider l'accessibilité (contraste)

### Étape 4 : Tests
- [ ] Dashboard : Vérifier ActionCard Veille
- [ ] Design System Page : Vérifier tous les exemples de couleurs
- [ ] Journal : Vérifier filtres Coaching/Insight
- [ ] Journal Detail : Vérifier badges de type
- [ ] Article Detail : Vérifier progress bar
- [ ] Dev Specs : Vérifier ColorSwatch

### Étape 5 : Documentation
- [ ] Mettre à jour la documentation du design system
- [ ] Ajouter note de migration dans CHANGELOG
- [ ] Archiver ce document de migration

---

## 🎯 OBJECTIF FINAL

**Après migration :**
- ✅ Aucune référence à `--teal`, `--coral`, `#9dbeba`, `#f49a76`
- ✅ Toutes les couleurs utilisent les tokens officiels SUCCESS/DESTRUCTIVE
- ✅ Cohérence visuelle avec le design system TLS v5.3
- ✅ Accessibilité maintenue (contraste WCAG AA)

---

**Date de validation** : 01/04/2026  
**Design System Version** : TLS v5.3  
**Status** : 📋 **Prêt pour migration**
