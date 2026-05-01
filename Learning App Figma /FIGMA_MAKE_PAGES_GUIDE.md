# 📖 Guide: Ajouter des Pages dans Figma Make

## 🎯 Comment Figma Make détecte les pages

Figma Make détecte **automatiquement** les pages de votre application via:

1. **Le fichier `App.tsx`** - Les cases du switch
2. **Le type `PageType`** - L'union de tous les slugs possibles

**Vous N'AVEZ PAS BESOIN de configuration manuelle!** 🎉

---

## 🔍 Où Figma Make trouve les pages

### **Fichier: `/src/app/App.tsx`**

```typescript
// 1️⃣ DÉCLARER LE TYPE PageType
type PageType =
  | 'dashboard'
  | 'profile'
  | 'veille-magazine'
  | 'veille-newsletter'
  // ... tous vos slugs
  ;

// 2️⃣ AJOUTER LE CASE DANS LE SWITCH
const renderPage = () => {
  switch (currentPage) {
    case 'dashboard':
      return <DashboardPageUpgraded onNavigate={handleNavigate} onLogout={handleLogout} />;
    
    case 'veille-magazine':
      return <MagazinePage onNavigate={handleNavigate} onLogout={handleLogout} />;
    
    // ... etc
  }
};
```

---

## ✅ Les pages apparaissent automatiquement dans:

### **1. Le sélecteur de pages Figma Make (en haut)**
- Toutes les pages du `PageType` apparaissent dans le dropdown
- Format: Liste alphabétique des slugs

### **2. Navigation via URL (si configuré)**
- `#/dashboard`
- `#/veille-magazine`
- `#/profile`

---

## 📋 **LISTE COMPLÈTE DES PAGES ACTUELLES**

### **Pages Principales (11)**
```
dashboard
parcours
coaching
veille
journal
profile
account
notifications
messages
leaderboard
entreprise
```

### **Veille (8)**
```
veille-magazine
veille-newsletter
veille-videos
veille-article
veille-newsletter-detail
veille-content
veille-dossier
```

### **Journal (4)**
```
journal-new
journal-detail
journal-free-entry
sandbox-journal-prompts
```

### **Parcours (10)**
```
course-viewer
course-detail
lesson-viewer
video-viewer
video-tutorial
flashcards-viewer
astuces-viewer
complementary-content-viewer
project
learning-space
```

### **Coaching (4)**
```
coaching-booking-flow
onboarding
pre-coaching-questionnaire
pre-coaching-questionnaire-response
```

### **Auth (5)**
```
login
signup
forgot-password
reset-password
pm-pro-login
```

### **Help & Errors (3)**
```
help-chatbot
error-404
error-500
```

### **Demo & Test (11)**
```
dev-specs
positioning-demo
dashboard-hero-demo
celebrations-demo
notification-system-demo
page-header-demo
color-tokens-test
fonts-test
colored-glow-demo
emoji-style-demo
jaune-comparison
notion-export
```

---

## 🆕 Pour AJOUTER une nouvelle page:

### **Étape 1: Créer le fichier de page**
```bash
/src/app/pages/MaNouvellePage.tsx
```

### **Étape 2: Ajouter l'import dans App.tsx**
```typescript
import MaNouvellePage from './pages/MaNouvellePage';
```

### **Étape 3: Ajouter au type PageType**
```typescript
type PageType =
  | 'dashboard'
  | 'ma-nouvelle-page'  // ← AJOUTER ICI
  | 'profile'
  // ...
  ;
```

### **Étape 4: Ajouter le case dans renderPage()**
```typescript
case 'ma-nouvelle-page':
  return <MaNouvellePage 
    onNavigate={handleNavigate} 
    onLogout={handleLogout} 
  />;
```

### **✅ C'est tout!** 
La page apparaît automatiquement dans le sélecteur Figma Make!

---

## 🔗 Navigation entre pages

### **Depuis un composant:**
```typescript
interface MyPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function MyPage({ onNavigate, onLogout }: MyPageProps) {
  return (
    <button onClick={() => onNavigate('veille-magazine')}>
      Aller au Magazine
    </button>
  );
}
```

### **Avec paramètres (IDs, types, etc.):**
```typescript
// Dans App.tsx
const handleNavigate = (
  page: string, 
  courseId?: string, 
  entryType?: string, 
  newsArticleId?: number
) => {
  setCurrentPage(page as PageType);
  if (courseId) setSelectedCourseId(courseId);
  if (entryType) setSelectedEntryType(entryType);
  if (newsArticleId !== undefined) setSelectedNewsArticleId(newsArticleId);
};

// Depuis une page:
onNavigate('veille-article', undefined, undefined, 1042);
// → ArticleDetailPage avec newsArticleId=1042
```

---

## 🎨 Conventions de nommage des slugs

### **Format recommandé:**
```
categorie-sous-categorie-action
```

### **Exemples:**
```
✅ veille-magazine          (catégorie-type)
✅ veille-article           (catégorie-page)
✅ journal-new              (catégorie-action)
✅ journal-detail           (catégorie-page)
✅ course-viewer            (catégorie-fonction)
✅ pre-coaching-questionnaire  (préfixe-catégorie-type)
```

### **À éviter:**
```
❌ magazineArticlePage      (camelCase)
❌ Magazine_Article         (underscores)
❌ mag-art                  (abréviations)
❌ page1                    (noms génériques)
```

---

## 🚀 Navigation interne automatique

Certaines pages gèrent leurs sous-pages **SANS** utiliser le routing global:

### **Exemple: VeillePage**
```typescript
// VeillePage affiche directement ses sous-composants:
if (showNewsletterView) {
  return <WeeklyNewsletterPage />;
}

if (selectedMagazineId) {
  return <MagazinePage magazineId={selectedMagazineId} />;
}

// → PAS besoin de onNavigate() !
```

**Avantage:** Navigation plus rapide, état préservé  
**Inconvénient:** Pas dans l'historique du navigateur

---

## 📊 Statistiques actuelles

- **Total pages:** 56
- **Pages accessibles via sélecteur Figma:** 56
- **Profondeur max:** 3 niveaux
- **Pages avec paramètres dynamiques:** 8

---

## 🛠️ Debugging

### **Si une page n'apparaît pas dans le sélecteur:**

1. ✅ Vérifier qu'elle est dans `PageType`
2. ✅ Vérifier qu'elle a un `case` dans `renderPage()`
3. ✅ Rafraîchir Figma Make (⌘/Ctrl + R)
4. ✅ Vérifier la console pour erreurs

### **Si la navigation ne fonctionne pas:**

1. ✅ Vérifier que `onNavigate` est bien passé en props
2. ✅ Vérifier que le slug est exact (respecte la casse)
3. ✅ Vérifier les paramètres optionnels (courseId, etc.)
4. ✅ Check console logs

---

## 📝 Résumé

| Action | Où | Comment |
|--------|-----|---------|
| **Voir toutes les pages** | Sélecteur Figma Make | Automatique |
| **Ajouter une page** | `App.tsx` | 1. Import 2. PageType 3. Case |
| **Naviguer vers page** | Component | `onNavigate('slug')` |
| **Page avec params** | Component | `onNavigate('slug', id1, id2)` |
| **Renommer slug** | `App.tsx` | 1. PageType 2. Case 3. Navigations |

---

**Dernière mise à jour:** 2026-04-30
