# 📦 Guide d'Import dans Cursor - The Learning Society

## 🎯 Objectif

Ce guide vous explique comment **exporter ce projet depuis Figma Make** et **l'importer dans Cursor** pour continuer le développement avec l'AI de Cursor.

---

## 📥 Étape 1: Télécharger le Projet depuis Figma Make

### Option A: Téléchargement Complet (Recommandé)

1. Dans Figma Make, cliquez sur le menu hamburger (☰) en haut
2. Sélectionnez **"Download project"** ou **"Export code"**
3. Téléchargez le fichier ZIP complet
4. Extrayez le ZIP dans un dossier de votre choix (ex: `~/Projects/the-learning-society`)

### Option B: Copie Manuelle

Si le téléchargement automatique n'est pas disponible :

1. Créez un nouveau dossier : `the-learning-society`
2. Copiez tous les fichiers suivants :

```
the-learning-society/
├── .cursorrules                    ← IMPORTANT !
├── App.tsx
├── package.json
├── vite.config.ts
├── index.html
├── tsconfig.json
├── components/
│   ├── patterns/CardPatterns.tsx
│   ├── ui/...
│   └── ...
├── pages/
│   ├── DashboardPageUpgraded.tsx
│   ├── DashboardDevSpecsPage.tsx
│   └── ...
├── styles/
│   └── globals.css                 ← CRUCIAL !
├── docs/
│   ├── DEV-SPECS-HANDOFF.md
│   ├── CSS-SNIPPETS-COPY-PASTE.md
│   ├── COMPONENT-STATES-VISUAL.md
│   ├── PIXEL-MEASUREMENTS.md
│   └── WORDPRESS-CHECKLIST.md
└── data/
    └── ...
```

---

## 🚀 Étape 2: Ouvrir dans Cursor

1. Ouvrez **Cursor**
2. Menu → **File → Open Folder**
3. Sélectionnez le dossier `the-learning-society`
4. Le projet s'ouvre dans Cursor

---

## ⚙️ Étape 3: Installation des Dépendances

Ouvrez le terminal dans Cursor (`` Ctrl+` `` ou `` Cmd+` ``) :

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de dev
npm run dev
```

Le projet devrait se lancer sur `http://localhost:5173`

---

## 🤖 Étape 4: Configurer l'AI de Cursor

### Fichier `.cursorrules` 

Le fichier `.cursorrules` à la racine du projet contient **TOUTES les règles du design system** que l'AI de Cursor doit respecter.

**Cursor AI lira automatiquement ce fichier !**

### Vérifier que Cursor utilise les règles :

1. Ouvrez Cursor AI (Cmd+L ou Ctrl+L)
2. Demandez : *"Quelles sont les règles de ce projet ?"*
3. Cursor devrait mentionner les variables CSS, gradients, glassmorphism, etc.

---

## 💬 Étape 5: Parler à Cursor AI

### ✅ Bonnes Demandes

**Exemples de prompts efficaces :**

```
"Crée un nouveau composant NotificationCard qui suit le pattern glassmorphism 
et utilise les variables CSS du design system"

"Ajoute une nouvelle section dans DashboardPageUpgraded avec 
3 cards en grid qui suivent le style Action Card"

"Modifie le hero section pour ajouter un 4ème stat pill avec l'icône Trophy"

"Crée une page ProfilePage qui respecte le design system TLS"
```

### ❌ Mauvaises Demandes (AI pourrait ne pas respecter le design system)

```
"Crée un bouton bleu"  ← Trop vague, AI pourrait hard-code la couleur

"Ajoute du padding de 20px"  ← AI ne devrait pas hard-code, utiliser var(--space-5)

"Fais un dégradé coloré sur la card"  ← Viole la règle des gradients
```

---

## 📚 Étape 6: Utiliser la Documentation

Quand vous demandez à Cursor AI de créer un composant, **référencez les docs** :

### Exemple de prompt complet :

```
Crée un nouveau composant CoachCard qui affiche les infos d'un coach.

Utilise le pattern glassmorphism de /docs/CSS-SNIPPETS-COPY-PASTE.md
et suis les mesures exactes de /docs/PIXEL-MEASUREMENTS.md.

Le composant doit avoir :
- Photo du coach (cercle 80px)
- Nom (var(--font-display), var(--text-xl))
- Spécialité (var(--font-body), var(--text-sm), var(--muted-foreground))
- Badge de disponibilité (comme les stat pills)
- Bouton "Réserver" (style continue-button)

Respecte les règles de .cursorrules
```

### Cursor AI pourra :
1. ✅ Lire `.cursorrules` pour les règles globales
2. ✅ Lire `/docs/CSS-SNIPPETS-COPY-PASTE.md` pour copier le CSS exact
3. ✅ Lire `/docs/PIXEL-MEASUREMENTS.md` pour les dimensions
4. ✅ Générer un composant pixel-perfect

---

## 🎨 Étape 7: Référencer le Design System

### Variables Disponibles

Tous les tokens sont dans `/styles/globals.css`. Cursor AI peut les lire.

**Exemples de variables à utiliser :**

```css
/* Colors */
var(--primary)            /* #55A1B4 */
var(--secondary)          /* #ED843A */
var(--accent)             /* #F8B044 */
var(--foreground)         /* #252B37 */
var(--muted-foreground)   /* #6b7280 */

/* Spacing */
var(--space-2)   /* 8px */
var(--space-3)   /* 12px */
var(--space-4)   /* 16px */
var(--space-6)   /* 24px */
var(--space-8)   /* 32px */

/* Typography */
var(--font-display)       /* League Spartan */
var(--font-body)          /* Nunito */
var(--text-xs)            /* 12px */
var(--text-sm)            /* 14px */
var(--text-base)          /* 16px */
var(--text-lg)            /* 18px */
var(--text-xl)            /* 20px */
var(--text-2xl)           /* 24px */

/* Border Radius */
var(--radius-xl)    /* 16px */
var(--radius-2xl)   /* 24px */
var(--radius-3xl)   /* 32px */
var(--radius-full)  /* 9999px */
```

---

## 🛠️ Étape 8: Workflows Courants avec Cursor AI

### Workflow 1: Créer une Nouvelle Page

**Prompt :**
```
Crée une nouvelle page MessagingPage.tsx dans /pages.

La page doit avoir :
- Layout avec OptimizedSidebar
- Hero section avec glassmorphism
- Liste de conversations (cards glassmorphism)
- Zone de chat active

Utilise les patterns de DashboardPageUpgraded.tsx
et respecte .cursorrules
```

Cursor AI va :
1. Créer le fichier `/pages/MessagingPage.tsx`
2. Copier la structure du dashboard
3. Appliquer les styles glassmorphism
4. Utiliser les variables CSS
5. Respecter les règles des gradients

### Workflow 2: Modifier un Composant Existant

**Prompt :**
```
Dans /components/patterns/CardPatterns.tsx, 
ajoute un nouveau composant CoachCard avec les mêmes patterns 
que ActionCard mais avec une photo en plus.

Respecte les mesures de /docs/PIXEL-MEASUREMENTS.md
```

Cursor AI va :
1. Ouvrir le fichier existant
2. Analyser les patterns actuels
3. Créer le nouveau composant dans le même style
4. Utiliser les mêmes variables CSS

### Workflow 3: Débugger un Style

**Prompt :**
```
Le hover state de la card ne fonctionne pas correctement.
Vérifie que les transitions suivent les règles de .cursorrules
```

Cursor AI va :
1. Vérifier les transitions
2. S'assurer que `cubic-bezier(0, 0, 0.2, 1)` est utilisé
3. Vérifier les durées (200ms ou 300ms)
4. Corriger si nécessaire

---

## 🔍 Étape 9: Explorer les Exemples

### Pages de Référence

Ouvrez ces fichiers dans Cursor pour voir des exemples :

1. **`/pages/DashboardPageUpgraded.tsx`**  
   → Layout complet, grids, glassmorphism, animations

2. **`/pages/DashboardDevSpecsPage.tsx`**  
   → Tous les composants avec états interactifs

3. **`/components/patterns/CardPatterns.tsx`**  
   → ActionCard, JournalPromptCard, ActivityCard patterns

4. **`/components/DashboardHeroV3Simple.tsx`**  
   → Hero section avec stats pills

### Demander à Cursor AI :

```
"Montre-moi comment ActionCard est implémenté"

"Explique le pattern glassmorphism utilisé dans ce projet"

"Quelles sont les animations utilisées dans Continue Learning Card ?"
```

---

## 🎯 Étape 10: Tester en Live

### Ouvrir la Page de Specs

1. Lancez `npm run dev`
2. Ouvrez `http://localhost:5173`
3. Cliquez sur le bouton flottant bleu (icône règle) en bas à droite
4. Vous verrez **tous les composants avec leurs états interactifs**

**Survolez les composants pour voir :**
- Hover states
- Transitions
- Glassmorphism
- Shadows
- Scales

---

## 🚨 Problèmes Courants

### 1. Cursor AI ne respecte pas les variables CSS

**Solution :**
```
"Cursor, relis .cursorrules et assure-toi d'utiliser UNIQUEMENT 
les variables CSS de /styles/globals.css. Jamais de valeurs hard-coded."
```

### 2. Cursor AI crée des gradients multicolores

**Solution :**
```
"STOP. Relis la section GRADIENTS de .cursorrules. 
Les gradients multicolores sont INTERDITS sur les composants UI.
Utilise uniquement des gradients pour les textes ou background de pages."
```

### 3. Cursor AI utilise des classes Tailwind pour fonts

**Solution :**
```
"Ne jamais utiliser text-2xl, font-bold, etc. en className.
Utilise uniquement les variables CSS :
font-size: var(--text-2xl)
font-weight: var(--font-weight-bold)
dans style={{ ... }}"
```

### 4. Cursor AI oublie `-webkit-backdrop-filter`

**Solution :**
```
"Ajoute toujours -webkit-backdrop-filter en plus de backdrop-filter
pour le support Safari. C'est dans .cursorrules."
```

---

## 💡 Tips Avancés

### 1. Créer un Composant Réutilisable

Demandez à Cursor :
```
"Crée un nouveau fichier /components/ui/glass-button.tsx 
avec un bouton glassmorphism réutilisable qui accepte :
- variant (primary, secondary, accent)
- size (sm, md, lg)
- children (React.ReactNode)

Utilise les patterns de .cursorrules"
```

### 2. Générer une Page Complète

```
"Crée une page complète SettingsPage.tsx avec :
- Sidebar
- Hero avec titre 'Paramètres'
- Sections en accordion (glassmorphism)
- Bouton Save en bas

Base-toi sur DashboardPageUpgraded.tsx
et respecte pixel-perfect /docs/PIXEL-MEASUREMENTS.md"
```

### 3. Refactorer un Composant

```
"Refactore le composant ContinueLearningCard pour :
1. Utiliser les variables CSS partout
2. Extraire les animations dans un fichier séparé
3. Ajouter des props TypeScript typées
4. Respecter .cursorrules"
```

---

## 📊 Commandes Cursor AI Utiles

### Cmd+K (Mac) / Ctrl+K (Windows)
→ Edit code inline (sélectionnez du code et demandez des modifications)

### Cmd+L (Mac) / Ctrl+L (Windows)
→ Chat avec Cursor AI (pose des questions)

### @fichier dans le chat
→ Référencer un fichier spécifique
```
"@.cursorrules Quelles sont les règles sur les gradients ?"
"@globals.css Quelles variables spacing sont disponibles ?"
```

### @docs dans le chat
→ Référencer la documentation
```
"@docs/CSS-SNIPPETS-COPY-PASTE.md Donne-moi le CSS de glass-card"
```

---

## ✅ Checklist Finale

Avant de commencer à coder avec Cursor AI :

- [ ] Projet téléchargé et extrait
- [ ] `npm install` exécuté avec succès
- [ ] `npm run dev` fonctionne
- [ ] `.cursorrules` présent à la racine
- [ ] Cursor AI lit les règles (test avec "Quelles sont les règles ?")
- [ ] Documentation lue (`/docs/*.md`)
- [ ] Page de specs explorée (`http://localhost:5173` → bouton bleu)
- [ ] Exemples de composants ouverts dans Cursor

---

## 🎓 Exercice de Test

Pour vérifier que tout fonctionne, demandez à Cursor AI :

```
Crée un nouveau composant TestCard.tsx dans /components/test/
qui affiche une card glassmorphism avec :
- Titre "Test Réussi"
- Description "Le design system fonctionne"
- Icône CheckCircle2
- Bouton "Fermer"

Respecte .cursorrules et utilise les patterns de CardPatterns.tsx
```

Si Cursor AI :
✅ Utilise `var(--...)` partout
✅ Applique le glassmorphism correct
✅ Utilise les bons spacing/radius
✅ Ne hard-code aucune valeur

→ **Vous êtes prêt à développer !** 🚀

---

## 📞 Support

Si vous êtes bloqué :

1. **Relire `.cursorrules`** → Toutes les règles y sont
2. **Consulter `/docs/CSS-SNIPPETS-COPY-PASTE.md`** → Code prêt à copier
3. **Ouvrir la page de specs** → Exemples visuels interactifs
4. **Demander à Cursor AI** : *"Explique-moi comment respecter le design system TLS"*

---

**Bon développement avec Cursor ! 🎨🚀**

---

**Version**: 1.0  
**Projet**: The Learning Society  
**Stack**: React + TypeScript + Tailwind CSS v4
