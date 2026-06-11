# 📚 STRUCTURE DES PAGES PARCOURS / COURS / LEÇONS

## 🗺️ NAVIGATION ACTUELLE

```
PARCOURS (liste)
│
├─ ParcoursPageUpgraded.tsx
│   │
│   ├─ Parcours 1: "Maîtriser l'IA" (progress: 68%)
│   │   └─ Bouton "Continuer" → onNavigate('course-viewer', id: 1)
│   │
│   ├─ Parcours 2: "Prompt Designer" (progress: 22%)
│   │   └─ Bouton "Continuer" → onNavigate('course-viewer', id: 2)
│   │
│   └─ Parcours 3: "Contenus Pédagogiques" (progress: 0%)
│       └─ Bouton "Commencer" → Modal Positionnement
│           └─ Après positionnement → onNavigate('course-detail')
│
│
├─ COURS (détails du cours + liste des leçons)
│   │
│   └─ CourseDetailPageUpdated.tsx
│       │
│       ├─ Vue d'ensemble:
│       │   ├─ Titre, description, badge
│       │   ├─ Objectifs d'apprentissage
│       │   └─ Progression globale
│       │
│       ├─ Structure par Steps:
│       │   ├─ Step 1: "Les Fondamentaux" (3 leçons)
│       │   │   ├─ Leçon 1: "Enjeux" (type: experience)
│       │   │   ├─ Leçon 2: "Concepts" (type: demonstration)
│       │   │   └─ Leçon 3: "Méthode" (type: reflection)
│       │   │
│       │   └─ Step 2: "Prompt Designer" (5 leçons)
│       │       ├─ Leçon 4: "Le Rôle" (type: demonstration)
│       │       ├─ Leçon 5: "Le Contexte" (type: reflection)
│       │       └─ ... (3 autres leçons)
│       │
│       ├─ Contenu complémentaire (par Step):
│       │   ├─ Flashcards
│       │   ├─ Astuces
│       │   ├─ Guides PDF
│       │   └─ Vidéos tutoriels
│       │
│       └─ CLIC SUR LEÇON → Affiche LessonViewer (overlay)
│
│
└─ LEÇON (structure EDRAC d'une leçon)
    │
    └─ LessonViewer.tsx (Affiché en overlay/modal)
        │
        ├─ 1. Introduction
        ├─ 2. Engagement
        ├─ 3. Découvrir (3 slides)
        ├─ 4. Quiz
        ├─ 5. Réfléchir
        ├─ 6. Appliquer
        └─ 7. Conclusion
```

---

## 🚨 PROBLÈME ACTUEL

### **Dans App.tsx:**
```typescript
case 'course-viewer':
  return <CourseDetailPageUpdated />; // ✅

case 'course-detail':
  return <CourseDetailPageUpdated />; // ✅ MÊME PAGE!
```

**Les deux routes pointent vers la même page!**

---

## ✅ SOLUTION PROPOSÉE

### **Option A: Garder la structure actuelle (simple)**

**2 niveaux:**
1. **Parcours** → ParcoursPageUpgraded (liste)
2. **Cours** → CourseDetailPageUpdated (cours + leçons EDRAC)

**Slugs:**
```
parcours              → ParcoursPageUpgraded
course-viewer         → CourseDetailPageUpdated (avec leçons en overlay)
course-detail         → CourseDetailPageUpdated (alias)
```

**Navigation:**
- `course-viewer` ET `course-detail` → Même page
- Leçon viewer = Overlay/Modal dans CourseDetailPageUpdated

---

### **Option B: Séparer explicitement (3 niveaux)**

**3 niveaux:**
1. **Parcours** → ParcoursPageUpgraded (liste)
2. **Cours** → CourseDetailPageUpdated (détails + liste leçons)
3. **Leçon** → LessonViewer (page pleine ou route séparée)

**Slugs proposés:**
```
parcours              → ParcoursPageUpgraded (liste des parcours)
course-detail         → CourseDetailPageUpdated (vue d'ensemble cours)
lesson-viewer         → LessonViewer (leçon EDRAC - nouvelle route)
```

**Changements nécessaires:**
1. Créer route `lesson-viewer` dans App.tsx
2. CourseDetailPageUpdated appelle `onNavigate('lesson-viewer', lessonId)` au lieu d'overlay
3. Supprimer l'alias `course-viewer` (garder seulement `course-detail`)

---

## 📋 NOMENCLATURE CLAIRE

### **Noms de pages recommandés:**

```
NIVEAU 1: Liste des parcours
└─ parcours

NIVEAU 2: Détails d'un cours (vue d'ensemble + liste des leçons)
└─ course-detail

NIVEAU 3: Viewer d'une leçon (structure EDRAC)
└─ lesson-viewer

NIVEAU 3bis: Viewers de contenu complémentaire
├─ flashcards-viewer
├─ astuces-viewer
├─ complementary-content-viewer
└─ video-tutorial
```

---

## 🎯 RECOMMANDATION

**Utiliser Option A** (structure actuelle) avec clarification:

### **App.tsx:**
```typescript
// Supprimer l'alias course-viewer, garder seulement course-detail
case 'course-detail':
  return <CourseDetailPageUpdated 
    onNavigate={handleNavigate} 
    onLogout={handleLogout}
    courseId={selectedCourseId}
  />;

// Optionnel: Ajouter route explicite pour lesson-viewer
case 'lesson-viewer':
  return <LessonViewer
    lessonId={selectedLessonId}
    onNavigate={handleNavigate}
    onLogout={handleLogout}
  />;
```

### **ParcoursPageUpgraded.tsx:**
```typescript
// Ligne 326: Changer course-viewer → course-detail
onNavigate('course-detail', parcours.id);

// Ligne 417: Déjà bon
onNavigate('course-detail');
```

---

## 📊 RÉSUMÉ ACTUEL (APRÈS NETTOYAGE)

| Slug | Fichier | Description | Status |
|------|---------|-------------|--------|
| `parcours` | ParcoursPageUpgraded.tsx | Liste des parcours | ✅ OK |
| `course-detail` | CourseDetailPageUpdated.tsx | Détails cours + leçons | ✅ OK |
| (overlay) | LessonViewer.tsx | Leçon EDRAC | ✅ OK |
| `flashcards-viewer` | FlashcardsViewer.tsx | Flashcards | ✅ OK |
| `astuces-viewer` | AstucesViewer.tsx | Astuces | ✅ OK |

**Pages supprimées:**
- ❌ `course-viewer` (doublon, archivé)

---

**Dernière mise à jour:** 2026-04-30 (Nettoyage effectué)
