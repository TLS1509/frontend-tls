# 📋 Nomenclature des Pages - The Learning Society

## ✅ **PAGES RENOMMÉES ET NETTOYÉES**

### 🎯 **STRUCTURE VEILLE (6 pages)**

#### **Pages principales:**
- `veille` → **VeillePage.tsx** — Hub principal Veille
- `veille-magazine` → **MagazinePage.tsx** — Liste des magazines
- `veille-newsletter` → **WeeklyNewsletterPage.tsx** — Newsletter hebdo
- `veille-videos` → **VideoReelsPage.tsx** — Vidéos courtes

#### **Pages détails:**
- `veille-article` → **ArticleDetailPage.tsx** — Template article (magazine + newsletter)
- `veille-newsletter-detail` → **WeeklyNewsDetailPage.tsx** — Détail newsletter complète
- `veille-content` → **VeilleContentPage.tsx** — Tutos vidéo / Rapports PDF
- `veille-dossier` → **DossierPage.tsx** — Dossier thématique complet

---

## 🗂️ **TOUTES LES PAGES PAR CATÉGORIE**

### **🔐 AUTH (5 pages)**
```
login
signup
forgot-password
reset-password
pm-pro-login
```

### **🏠 MAIN (10 pages)**
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
```

### **📰 VEILLE (8 pages)**
```
veille-magazine
veille-newsletter
veille-videos
veille-article
veille-newsletter-detail
veille-content
veille-dossier
```

### **📔 JOURNAL (4 pages)**
```
journal-new
journal-detail
journal-free-entry
sandbox-journal-prompts
```

### **📚 COURSE & LEARNING (10 pages)**
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

### **👥 COACHING & ONBOARDING (4 pages)**
```
coaching-booking-flow
onboarding
pre-coaching-questionnaire
pre-coaching-questionnaire-response
```

### **🏢 ENTREPRISE (1 page)**
```
entreprise
```

### **❓ HELP & ERRORS (3 pages)**
```
help-chatbot
error-404
error-500
```

### **🧪 DEMO & TEST (11 pages)**
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

## 🎨 **PAGE TEMPLATE RÉUTILISABLE**

### **ArticleDetailPage.tsx** (veille-article)
Template pour afficher un article de **Magazine** OU **Newsletter**

**Props:**
```typescript
{
  source: 'magazine' | 'newsletter' | 'dossier',
  articleId: number,
  sourceId?: number,
  onNavigate: (page: string) => void,
  onBack: () => void,
  onLogout: () => void
}
```

**Usage:**
- **Magazine:** `source="magazine"` + `sourceId={magazineId}` + `articleId={articleId}`
- **Newsletter:** `source="newsletter"` + `articleId={newsArticleId}`
- ⚠️ **Dossier:** Type déclaré mais **NON IMPLÉMENTÉ** (utiliser DossierPage à la place)

**Fonctionnalités:**
- ✅ Progression de lecture circulaire
- ✅ Scroll tracking
- ✅ Bookmark/Save
- ✅ Share
- ✅ Articles similaires
- ✅ Tags et catégories

---

## ❌ **PAGES SUPPRIMÉES (doublons)**

- ~~`MagazineArticlePage.tsx`~~ → Remplacé par ArticleDetailPage
- ~~`NewsletterPage.tsx`~~ → Remplacé par WeeklyNewsletterPage

---

## 📊 **RÉSUMÉ**

**Total pages actives:** 56
- Auth: 5
- Main: 10
- Veille: 8
- Journal: 4
- Course & Learning: 10
- Coaching & Onboarding: 4
- Entreprise: 1
- Help & Errors: 3
- Demo & Test: 11

**Pages template:** 1 (ArticleDetailPage)

**Pages supprimées:** 2 (doublons)

---

## 🎯 **POUR FIGMA MAKE**

### **Slugs principaux à créer:**
```
dashboard
profile
account
notifications
messages
parcours
coaching
veille
veille-magazine
veille-newsletter
veille-article
journal
positioning-demo
entreprise
```

### **Slugs secondaires:**
```
veille-videos
veille-content
veille-dossier
journal-new
journal-detail
course-viewer
lesson-viewer
project
```

---

**Dernière mise à jour:** 2026-04-30
