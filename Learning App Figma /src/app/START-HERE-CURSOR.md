# 🚀 START HERE - Import dans Cursor

## ⚡ Quick Start en 3 Étapes

### 1️⃣ Télécharger le Projet

Dans Figma Make → Menu (☰) → **Download project** → Extrayez le ZIP

### 2️⃣ Ouvrir dans Cursor

Cursor → **File → Open Folder** → Sélectionnez le dossier `the-learning-society`

### 3️⃣ Installer & Lancer

```bash
npm install
npm run dev
```

Ouvrez `http://localhost:5173` → Cliquez sur le bouton bleu (règle) → **Page de specs interactive** 🎉

---

## 📚 Documentation Complète

| Fichier                                | Description                                        |
| -------------------------------------- | -------------------------------------------------- |
| **`/CURSOR-IMPORT-GUIDE.md`**          | 📦 Guide complet d'import et utilisation Cursor AI |
| **`/.cursorrules`**                    | 🤖 Règles automatiques pour Cursor AI              |
| **`/docs/DEV-SPECS-HANDOFF.md`**       | 📐 Specs pour handoff WordPress                    |
| **`/docs/CSS-SNIPPETS-COPY-PASTE.md`** | 📋 Code CSS prêt à copier                          |
| **`/docs/PIXEL-MEASUREMENTS.md`**      | 📏 Mesures exactes en pixels                       |
| **`/docs/COMPONENT-STATES-VISUAL.md`** | 👁️ États visuels des composants                    |
| **`/docs/WORDPRESS-CHECKLIST.md`**     | ✅ Checklist implémentation WP                     |
| **`/docs/EXPORT-HTML-PURE.md`**        | 📤 Export HTML/CSS/JS pur (sans React)             |

---

## 🎯 Votre Workflow avec Cursor

### Pour Développer (React)

1. Lisez `/CURSOR-IMPORT-GUIDE.md`
2. Cursor AI respectera automatiquement `/.cursorrules`
3. Demandez : _"Crée un nouveau composant ProfileCard en suivant le design system TLS"_

### Pour WordPress (HTML/CSS/JS)

1. Lisez `/docs/EXPORT-HTML-PURE.md`
2. Demandez à Cursor : _"Exporte tous les composants en HTML pur"_
3. Importez les fichiers dans votre thème WordPress

---

## 🤖 Test Rapide Cursor AI

Ouvrez Cursor AI (Cmd+L) et demandez :

```
"Quelles sont les règles de ce projet ?"
```

Cursor devrait mentionner :

- ✅ Variables CSS obligatoires
- ✅ Règles sur les gradients
- ✅ Glassmorphism pattern
- ✅ Typography avec League Spartan + Nunito

**Si oui → Vous êtes prêt ! 🎉**  
**Si non → Vérifiez que `/.cursorrules` existe**

---

## 💬 Exemples de Prompts Cursor AI

### ✅ Bon Prompt

```
Crée un composant NotificationBadge qui suit le pattern glassmorphism.
Utilise les variables CSS du design system.
Référence /docs/CSS-SNIPPETS-COPY-PASTE.md pour le style glass.
```

### ❌ Mauvais Prompt

```
Fais un badge avec un gradient bleu-orange-jaune
```

→ Viole les règles des gradients

---

## 🎨 Design System en 30 Secondes

### Variables à Toujours Utiliser

```css
/* Couleurs */
var(--primary)           /* Bleu TLS */
var(--secondary)         /* Orange TLS */
var(--accent)            /* Jaune TLS */

/* Spacing */
var(--space-3)   /* 12px */
var(--space-4)   /* 16px */
var(--space-6)   /* 24px */

/* Typography */
var(--font-display)      /* League Spartan - Headings */
var(--font-body)         /* Nunito - Body text */
var(--text-base)         /* 16px */
var(--text-2xl)          /* 24px */

/* Border Radius */
var(--radius-2xl)        /* 24px - Cards */
var(--radius-full)       /* Pill shape */
```

### Règle #1: Gradients

- ❌ **INTERDITS** sur boutons, cards, badges
- ✅ **AUTORISÉS** sur textes, backgrounds de pages, progress bars

### Règle #2: Glassmorphism

Toujours inclure `-webkit-backdrop-filter` pour Safari :

```tsx
backdropFilter: 'blur(20px)',
WebkitBackdropFilter: 'blur(20px)',
```

---

## 🔥 Accès Rapide

### Dans l'App React

Cliquez sur le **bouton flottant bleu** (icône règle) en bas à droite du dashboard → Page de specs avec **tous les composants interactifs**

### Fichiers Clés

- Variables CSS : `/styles/globals.css`
- Dashboard : `/pages/DashboardPageUpgraded.tsx`
- Patterns : `/components/patterns/CardPatterns.tsx`
- Specs Page : `/pages/DashboardDevSpecsPage.tsx`

---

## ❓ FAQ

**Q: Cursor AI ne respecte pas les variables CSS ?**  
R: Demandez : _"Relis .cursorrules et utilise UNIQUEMENT var(--...) de globals.css"_

**Q: Je veux exporter en HTML pur ?**  
R: Lisez `/docs/EXPORT-HTML-PURE.md`

**Q: Comment voir les exemples visuels ?**  
R: Lancez `npm run dev` → Cliquez sur le bouton bleu (règle)

---

## 🎯 Prochaines Étapes

1. ✅ Lisez `/CURSOR-IMPORT-GUIDE.md` (5 min)
2. ✅ Testez Cursor AI avec l'exercice TestCard
3. ✅ Explorez la page de specs interactive
4. ✅ Commencez à coder ! 🚀

---

**Bon développement ! 💪**

---

**Projet**: The Learning Society  
**Version**: 1.0  
**Stack**: React + TypeScript + Tailwind CSS v4