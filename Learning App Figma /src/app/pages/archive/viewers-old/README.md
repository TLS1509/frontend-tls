# 📺 VIEWERS OBSOLÈTES - ARCHIVES

**Date d'archivage** : 23 janvier 2026  
**Raison** : Viewers remplacés par versions améliorées  
**Version** : V7.0

---

## 📁 CONTENU

Anciens viewers archivés lors de la consolidation v7.0.

### Fichiers Archivés (3)

| Fichier | Date Création | Version | Raison Archivage | Remplacé Par |
|---------|---------------|---------|------------------|--------------|
| **AstucesViewer.tsx** | Janvier 2026 | V1.0 | Pas de route dans App.tsx, contenu intégré ailleurs | Contenu distribué dans lessons |
| **CourseViewerEDRAC.tsx** | Janvier 2026 | V1.0 | Viewer basique sans interactions avancées | `LessonViewer.tsx` (EDRACT complet) |
| **VideoViewer.tsx** | Janvier 2026 | V1.0 | Pattern vidéo obsolète | `/components/patterns/LessonPlayer.tsx` |

---

## 📍 VIEWERS ACTUELS

Pour les viewers à jour, consultez :

👉 **[/docs/04-USER-FLOWS.md](/docs/04-USER-FLOWS.md)** - Section "Viewers Pédagogiques"

### Viewers Production (5)

| Viewer | Fichier | Status | Documentation |
|--------|---------|--------|---------------|
| **LessonViewer** | `/pages/LessonViewer.tsx` | ✅ Production | Viewer EDRACT complet avec navigation |
| **FlashcardsViewer** | `/pages/FlashcardsViewer.tsx` | ✅ Production | Flashcards 3D interactives |
| **ComplementaryContentViewer** | `/pages/ComplementaryContentViewer.tsx` | ✅ Router | Router pour contenus variés |
| **LessonPlayer** | `/components/patterns/LessonPlayer.tsx` | ✅ Pattern | Composant réutilisable vidéo/audio |

---

## 🔄 HISTORIQUE

### AstucesViewer.tsx
- **Créé** : Janvier 2026
- **Usage** : Affichage astuces pédagogiques
- **Archivé** : 23 janvier 2026
- **Raison** : Pas de route App.tsx, contenu intégré dans lessons

### CourseViewerEDRAC.tsx
- **Créé** : Janvier 2026
- **Usage** : Preview simple leçons EDRAC
- **Archivé** : 23 janvier 2026
- **Raison** : Remplacé par LessonViewer.tsx (plus complet)
- **Différences** :
  - ❌ CourseViewerEDRAC : Affichage linéaire, pas de tracking
  - ✅ LessonViewer : Navigation sections, quiz interactif, tracking

### VideoViewer.tsx
- **Créé** : Janvier 2026
- **Usage** : Player vidéo basique
- **Archivé** : 23 janvier 2026
- **Raison** : Pattern remplacé par LessonPlayer composant
- **Utilisé dans** : ComplementaryContentViewer (ligne 101)

---

## 🔙 RESTAURATION

Si vous avez besoin de restaurer un viewer :

1. **Consulter ce dossier** `/pages/archive/viewers-old/`
2. **Copier le fichier** vers `/pages/`
3. **Ajouter route** dans `App.tsx`
4. **Tester** navigation et fonctionnalités

**Note** : Les viewers actuels sont plus complets et performants.

---

**📦 Archives Viewers TLS**  
**Date** : 23 janvier 2026  
**Fichiers** : 3  
**Remplacements** : LessonViewer, LessonPlayer
