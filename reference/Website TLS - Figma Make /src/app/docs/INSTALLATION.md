# 🚀 The Learning Society - Guide d'Installation

**Version:** 1.0.0  
**Stack:** React + TypeScript + Tailwind CSS v4 + Motion React

---

## 📋 Prérequis

- **Node.js** : v18+ recommandé
- **npm** ou **yarn** ou **pnpm**
- **Git**

---

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/thelearningsociety/website.git
cd website
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configuration

#### Google Analytics (Optionnel)

Modifier `/App.tsx` ligne 26 :

```tsx
const analytics = useAnalytics('G-XXXXXXXXXX'); // Remplacer par votre ID GA4
```

#### Variables d'environnement (Optionnel)

Créer un fichier `.env` à la racine :

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Lancer le projet

#### Mode Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

#### Mode Production

```bash
npm run build
npm run preview
```

---

## 📁 Structure du Projet

```
/
├── public/              # Assets statiques
│   └── robots.txt
├── src/
│   ├── App.tsx         # Point d'entrée
│   ├── main.tsx        # Bootstrap
│   ├── components/     # Composants React
│   │   ├── ui/        # Composants UI génériques
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── SEO.tsx
│   │   └── ...
│   ├── pages/          # Pages
│   │   ├── HomePage.tsx
│   │   ├── AcademiePage.tsx
│   │   ├── AgencePage.tsx
│   │   ├── ConseilPage.tsx
│   │   ├── TechPage.tsx
│   │   ├── MagPage.tsx
│   │   └── articles/   # Templates d'articles
│   ├── contexts/       # React Contexts
│   │   └── ThemeContext.tsx
│   ├── hooks/          # Custom Hooks
│   │   ├── useAnalytics.ts
│   │   └── usePerformance.ts
│   ├── utils/          # Utilities
│   │   └── generateSitemap.ts
│   ├── styles/         # Styles
│   │   └── globals.css # ⭐ DESIGN SYSTEM
│   └── tests/          # Tests
├── docs/               # Documentation
│   ├── DESIGN_SYSTEM.md
│   └── INSTALLATION.md
├── vitest.config.ts    # Config tests
├── tsconfig.json       # Config TypeScript
└── package.json
```

---

## 🎨 Design System

### Variables CSS

**Toutes les variables du design system sont dans `/styles/globals.css`.**

Pour modifier les couleurs, espacements, typographie, etc., éditer ce fichier.

### Exemple de personnalisation

```css
/* Dans /styles/globals.css */

:root {
  /* Changer la couleur primaire */
  --primary-500: #YOUR_COLOR;
  
  /* Changer la font principale */
  --font-display: "Your Font", sans-serif;
  
  /* Changer les espacements */
  --space-4: 20px; /* au lieu de 16px */
}
```

**Important** : Le code utilise **exclusivement les variables CSS**. Pas de valeurs hardcodées.

---

## 🧪 Tests

### Lancer les tests

```bash
npm run test
```

### Lancer les tests en mode watch

```bash
npm run test:watch
```

### Coverage

```bash
npm run test:coverage
```

---

## 📊 Analytics

Le projet intègre **Google Analytics 4** avec :

- Tracking automatique des pages
- Tracking des CTAs
- Tracking des conversions
- Tracking des formulaires
- Dashboard de monitoring (dev mode)

### Consentement RGPD

Le banner de cookies est conforme RGPD et apparaît automatiquement.

---

## 🌓 Thème Dark/Light

Le système de thème est géré par **ThemeContext**.

### Modes disponibles

- `light` : Mode clair
- `dark` : Mode sombre
- `system` : Suit les préférences système

### Toggle dans le Header

Le bouton de changement de thème est déjà intégré dans le Header.

---

## 🔍 SEO

### Metadata

Chaque page utilise le composant `<SEO>` pour gérer les meta tags.

Exemple :

```tsx
<SEO
  title="Page Title"
  description="Page description"
  keywords="keyword1, keyword2"
  ogImage="https://example.com/image.jpg"
/>
```

### Sitemap

Générer le sitemap :

```tsx
import { exportSitemap } from './utils/generateSitemap';

const sitemap = exportSitemap();
// Sauvegarder dans /public/sitemap.xml
```

### Robots.txt

Le fichier `robots.txt` est déjà configuré dans `/public/robots.txt`.

---

## 🚀 Déploiement

### Netlify

1. Connecter votre repo GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Déployer

### Vercel

```bash
npm install -g vercel
vercel
```

### WordPress (Backend Blog)

Le site est conçu pour être hébergé en static frontend avec WordPress comme CMS headless pour le blog.

Configuration recommandée :
- Frontend : Netlify/Vercel
- Backend : WordPress avec WP REST API

---

## 🐛 Debugging

### Mode Debug Analytics

En mode développement, un dashboard analytics s'affiche en bas à droite.

Cliquer sur l'icône de chart pour voir tous les événements trackés.

### Performance Monitoring

Les Core Web Vitals sont loggés dans la console en mode dev.

---

## 📝 Contribution

### Code Style

- **ESLint** : `npm run lint`
- **Prettier** : `npm run format`
- **TypeScript** : Strict mode activé

### Commit Convention

```
type(scope): message

Types: feat, fix, docs, style, refactor, test, chore
```

Exemple :
```
feat(analytics): add conversion tracking
fix(header): mobile menu not closing
docs(readme): update installation steps
```

---

## 🔐 Sécurité

### Environnement Variables

**Ne jamais commiter les fichiers `.env`**

Ajouter à `.gitignore` :
```
.env
.env.local
.env.production
```

### API Keys

Les clés API doivent être stockées dans les variables d'environnement, jamais dans le code.

---

## 📞 Support

Pour toute question :

- **Email** : tech@thelearningsociety.fr
- **GitHub Issues** : [Créer une issue](https://github.com/thelearningsociety/website/issues)
- **Documentation** : `/docs/DESIGN_SYSTEM.md`

---

## 📄 License

Copyright © 2024 The Learning Society. Tous droits réservés.

---

**The Learning Society** - Formation augmentée par l'IA 🚀
