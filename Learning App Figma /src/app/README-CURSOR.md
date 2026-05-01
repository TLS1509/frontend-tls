# 📖 README - Import Cursor & WordPress

> **The Learning Society** - Dashboard SaaS avec Design System TLS  
> React + TypeScript + Tailwind CSS v4 + Glassmorphism

---

## 🎯 Vous êtes ici pour...

### 🤖 Développer avec Cursor AI (React)
**👉 START ICI** : [`START-HERE-CURSOR.md`](./START-HERE-CURSOR.md)

Quick Start en 3 étapes :
1. Download project depuis Figma Make
2. Open Folder dans Cursor
3. `npm install` → `npm run dev`

**Cursor AI respectera automatiquement les règles du design system grâce à `.cursorrules` !**

---

### 📤 Exporter en HTML/CSS/JS pur (WordPress)
**👉 LIRE** : [`/docs/EXPORT-HTML-PURE.md`](./docs/EXPORT-HTML-PURE.md)

Convertir tous les composants React en fichiers HTML purs pour WordPress.

---

### 📐 Intégrer dans WordPress
**👉 LIRE** : 
- [`/docs/DEV-SPECS-HANDOFF.md`](./docs/DEV-SPECS-HANDOFF.md) - Guide complet
- [`/docs/WORDPRESS-CHECKLIST.md`](./docs/WORDPRESS-CHECKLIST.md) - Checklist phase par phase

---

### 📋 Copier du Code CSS
**👉 LIRE** : [`/docs/CSS-SNIPPETS-COPY-PASTE.md`](./docs/CSS-SNIPPETS-COPY-PASTE.md)

10 blocs CSS complets prêts à copier-coller.

---

### 📏 Mesures Pixel-Perfect
**👉 LIRE** : [`/docs/PIXEL-MEASUREMENTS.md`](./docs/PIXEL-MEASUREMENTS.md)

Toutes les dimensions exactes en pixels avec visualisation ASCII.

---

## 📚 Documentation Complète

| Fichier | Description | Quand lire |
|---------|-------------|------------|
| **[START-HERE-CURSOR.md](./START-HERE-CURSOR.md)** | ⭐ Quick Start 3 étapes | **START ICI** |
| **[CURSOR-IMPORT-GUIDE.md](./CURSOR-IMPORT-GUIDE.md)** | 📦 Guide complet import | Développement React |
| **[PACKAGE-COMPLET-CURSOR.md](./PACKAGE-COMPLET-CURSOR.md)** | 📋 Récapitulatif package | Vue d'ensemble |
| **[.cursorrules](./.cursorrules)** | 🤖 Règles Cursor AI | Auto-lu par Cursor |
| | | |
| **[/docs/EXPORT-HTML-PURE.md](./docs/EXPORT-HTML-PURE.md)** | 📤 Export HTML/CSS/JS | WordPress sans React |
| **[/docs/DEV-SPECS-HANDOFF.md](./docs/DEV-SPECS-HANDOFF.md)** | 📐 Handoff WordPress | Implémentation WP |
| **[/docs/CSS-SNIPPETS-COPY-PASTE.md](./docs/CSS-SNIPPETS-COPY-PASTE.md)** | 📋 CSS prêt à copier | Besoin de code CSS |
| **[/docs/PIXEL-MEASUREMENTS.md](./docs/PIXEL-MEASUREMENTS.md)** | 📏 Mesures exactes | Pixel-perfect |
| **[/docs/COMPONENT-STATES-VISUAL.md](./docs/COMPONENT-STATES-VISUAL.md)** | 👁️ États visuels | Comprendre hover/focus |
| **[/docs/WORDPRESS-CHECKLIST.md](./docs/WORDPRESS-CHECKLIST.md)** | ✅ Checklist WP | Intégration WordPress |

---

## 🎨 Design System

### Variables CSS
**Toutes** dans : [`/styles/globals.css`](./styles/globals.css)

```css
/* Colors */
var(--primary)           /* #55A1B4 - Bleu TLS */
var(--secondary)         /* #ED843A - Orange TLS */
var(--accent)            /* #F8B044 - Jaune TLS */

/* Spacing */
var(--space-3)           /* 12px */
var(--space-4)           /* 16px */
var(--space-6)           /* 24px */

/* Typography */
var(--font-display)      /* League Spartan - Headings */
var(--font-body)         /* Nunito - Body text */
var(--text-base)         /* 16px */
```

### Règles Strictes

#### ⚠️ GRADIENTS
- ❌ **INTERDITS** : Gradients multicolores sur boutons, cards, badges
- ✅ **AUTORISÉS** : Textes, backgrounds de pages, progress bars

#### 🪟 GLASSMORPHISM
Toujours inclure `-webkit-backdrop-filter` :
```css
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

---

## 🚀 Quick Commands

### Développement
```bash
npm install          # Installer dépendances
npm run dev          # Lancer serveur dev
```

### Accès Page de Specs
1. Lancez `npm run dev`
2. Ouvrez `http://localhost:5173`
3. Cliquez sur le **bouton bleu** (icône règle) en bas à droite
4. **Tous les composants avec états interactifs** s'affichent

---

## 🎯 Workflows

### Workflow 1: Créer un Composant avec Cursor AI
```
Prompt à Cursor AI:
"Crée un composant ProfileCard qui suit le design system TLS.
Base-toi sur /components/patterns/CardPatterns.tsx
et respecte .cursorrules"
```

Cursor AI va :
- ✅ Utiliser uniquement `var(--...)`
- ✅ Appliquer glassmorphism
- ✅ Respecter spacing, radius, fonts
- ✅ Pixel-perfect

### Workflow 2: Exporter en HTML
```
Prompt à Cursor AI:
"Lis /docs/EXPORT-HTML-PURE.md et exporte ActionCard 
en HTML/CSS/JS pur dans /html-exports/"
```

Cursor AI va créer :
- `action-card.html`
- `action-card.css`
- `action-card.js`
- `README.md`

---

## ✅ Checklist Import

- [ ] Projet téléchargé depuis Figma Make
- [ ] Ouvert dans Cursor
- [ ] `.cursorrules` présent à la racine
- [ ] `npm install` OK
- [ ] `npm run dev` fonctionne
- [ ] Bouton bleu visible dans dashboard
- [ ] Page de specs accessible
- [ ] Cursor AI lit les règles (test: "Quelles sont les règles ?")

---

## 💡 Tips

### Cursor AI ne respecte pas les règles ?
```
"Cursor, relis .cursorrules et assure-toi d'utiliser UNIQUEMENT 
les variables CSS de /styles/globals.css"
```

### Besoin d'aide sur un composant ?
```
"@components/patterns/CardPatterns.tsx 
Comment est implémenté ActionCard ?"
```

### Référencer la doc
```
"@docs/CSS-SNIPPETS-COPY-PASTE.md 
Donne-moi le CSS de glass-card"
```

---

## 🎓 Exercice de Test

Demandez à Cursor AI :
```
Crée un TestCard.tsx dans /components/test/ avec :
- Card glassmorphism
- Titre "Test Réussi ✅"
- Icône CheckCircle2
- Bouton "Fermer"

Respecte .cursorrules
```

**Si le code utilise `var(--...)` partout → Vous êtes prêt ! 🚀**

---

## 📞 Support

1. **Lisez** : [`START-HERE-CURSOR.md`](./START-HERE-CURSOR.md)
2. **Consultez** : Le fichier MD correspondant à votre besoin
3. **Demandez** : À Cursor AI : *"Explique le design system TLS"*

---

## 📦 Structure du Projet

```
the-learning-society/
├── .cursorrules                      🤖 Règles Cursor AI (AUTO-LU)
├── START-HERE-CURSOR.md              ⭐ Quick Start
├── CURSOR-IMPORT-GUIDE.md            📦 Guide complet
├── PACKAGE-COMPLET-CURSOR.md         📋 Récapitulatif
├── README-CURSOR.md                  📖 Ce fichier
│
├── docs/                             📚 Documentation
│   ├── EXPORT-HTML-PURE.md
│   ├── DEV-SPECS-HANDOFF.md
│   ├── CSS-SNIPPETS-COPY-PASTE.md
│   ├── PIXEL-MEASUREMENTS.md
│   ├── COMPONENT-STATES-VISUAL.md
│   └── WORDPRESS-CHECKLIST.md
│
├── pages/
│   └── DashboardDevSpecsPage.tsx     ⭐ Page specs interactive
│
├── styles/
│   └── globals.css                   🎨 Variables CSS
│
└── components/
    └── patterns/CardPatterns.tsx     🎴 Patterns réutilisables
```

---

## 🎉 Vous êtes prêt !

**Tout est en place pour :**
- ✅ Développer avec Cursor AI (respecte auto le design system)
- ✅ Exporter en HTML/CSS/JS pur
- ✅ Intégrer dans WordPress
- ✅ Pixel-perfect garanti

**Commencez par** : [`START-HERE-CURSOR.md`](./START-HERE-CURSOR.md)

---

**Bon développement ! 💪🎨🚀**

---

**Projet** : The Learning Society  
**Version** : 1.0  
**Stack** : React + TypeScript + Tailwind CSS v4  
**Design System** : TLS v5.2
