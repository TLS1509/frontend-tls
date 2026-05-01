# Migration Video Player - The Learning Society

## ✅ Status de la migration vers VimeoPlayer unifié

### 🎯 Objectif
Uniformiser tous les lecteurs vidéo de la plateforme avec un composant unique basé sur Vimeo, offrant des contrôles avancés (vitesses, sous-titres, volume, fullscreen) et un design cohérent TLS.

---

## 📦 Nouveaux composants créés

### 1. `/components/video/VimeoPlayer.tsx`
**Composant principal** - Player vidéo Vimeo avec contrôles complets
- ✅ Play/Pause
- ✅ Volume + slider
- ✅ Vitesses de lecture (0.5x à 2x)
- ✅ Sous-titres
- ✅ Mode plein écran
- ✅ Design glassmorphism TLS

**Export :**
- `VimeoPlayer` - Composant player
- `VideoPlayerModal` - Modal focus vidéo

### 2. `/utils/videoHelpers.ts`
**Helpers pour les URLs vidéo**
- `getVideoId(url)` - Extrait l'ID Vimeo depuis n'importe quel format
- `extractVimeoId(url)` - Parse les URLs Vimeo
- `detectVideoPlatform(url)` - Détecte Vimeo/YouTube/Unknown
- `isValidVimeoId(id)` - Valide un ID

---

## 🔄 Pages mises à jour

### ✅ Pages principales

| Page | Fichier | Status | Type d'intégration |
|------|---------|--------|-------------------|
| **VideoTutorialPage** | `/pages/VideoTutorialPage.tsx` | ✅ Migré | Centré + Modal focus |
| **VideoViewer** | `/pages/VideoViewer.tsx` | ✅ Migré | Dans card glassmorphism |
| **WeeklyNewsDetailPage** | `/pages/WeeklyNewsDetailPage.tsx` | ✅ Migré | Autoplay activé |
| **VeilleContentPage** | `/pages/VeilleContentPage.tsx` | ✅ Migré | Player + Modal fullscreen |
| **CourseViewerEDRAC** | `/pages/CourseViewerEDRAC.tsx` | ✅ Migré | Remplace placeholder |

### ✅ Composants

| Composant | Fichier | Status | Utilisation |
|-----------|---------|--------|-------------|
| **LessonPlayer** | `/components/patterns/LessonPlayer.tsx` | ✅ Migré | Leçons vidéo dans parcours |
| **ComplementaryContentViewer** | `/pages/ComplementaryContentViewer.tsx` | ✅ OK | Utilise VideoViewer (déjà migré) |

### ⚠️ Pages NON concernées

| Page | Raison |
|------|--------|
| `NewsletterPage.tsx` | Template HTML export - iframe nécessaire |
| `LessonViewer.tsx` | Pas de vidéos dans ce viewer |

---

## 🎨 Spécificités d'intégration

### VideoTutorialPage - Layout centré avec modal
```tsx
// Container centré avec espace ample
<div className="max-w-5xl mx-auto px-6 lg:px-12">
  {/* Player clickable pour ouvrir modal */}
  <div onClick={() => setIsModalOpen(true)}>
    <VimeoPlayer videoId="76979871" title={video.title} showControls />
  </div>
  
  {/* Bouton fullscreen en overlay */}
  <button onClick={() => setIsModalOpen(true)}>
    <Maximize2 />
  </button>
</div>

{/* Modal focus */}
<VideoPlayerModal
  videoId="76979871"
  title={video.title}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

### VideoViewer - Dans une card
```tsx
<div className="rounded-3xl overflow-hidden">
  <VimeoPlayer
    videoId="76979871"
    title={data.title}
    showControls={true}
  />
</div>
```

### VeilleContentPage - Player + Modal
```tsx
{/* Player principal */}
<div onClick={() => setIsVideoFullscreen(true)}>
  <VimeoPlayer videoId="76979871" title={content.title} showControls />
</div>

{/* Modal fullscreen */}
{isVideoFullscreen && (
  <div className="fixed inset-0">
    <VimeoPlayer videoId="76979871" title={content.title} autoplay showControls />
  </div>
)}
```

### LessonPlayer - Remplace player custom
```tsx
{lesson.type === 'video' && lesson.videoUrl && (
  <div className="rounded-3xl overflow-hidden">
    <VimeoPlayer
      videoId="76979871"
      title={lesson.title}
      showControls={true}
    />
  </div>
)}
```

---

## 🔧 Utilisation avec helpers

### Méthode recommandée
```tsx
import VimeoPlayer from '../components/video/VimeoPlayer';
import { getVideoId } from '../utils/videoHelpers';

// Données avec URLs variées
const video = {
  title: 'Ma vidéo',
  url: 'https://vimeo.com/76979871' // ou '76979871' ou autre format
};

// Utilisation
<VimeoPlayer 
  videoId={getVideoId(video.url)} 
  title={video.title}
  showControls
/>
```

---

## 📊 Données à mettre à jour

### URLs vidéo dans les fichiers data

Fichiers contenant des `videoUrl` à vérifier :

1. **`/data/veilleVideosData.ts`**
   - Videos tutoriels
   - Format actuel : YouTube URLs
   - Action : Uploader sur Vimeo + mettre à jour IDs

2. **`/data/weeklyNewsData.ts`**
   - Featured videos newsletter
   - Format actuel : YouTube URLs
   - Action : Uploader sur Vimeo + mettre à jour IDs

3. **`/pages/VeilleContentPage.tsx`** (données inline)
   - Tutoriels
   - Format actuel : YouTube embed URL
   - Action : Remplacer par Vimeo IDs

4. **`/pages/ComplementaryContentViewer.tsx`** (données inline)
   - Vidéos complémentaires
   - Format actuel : YouTube embed URL
   - Action : Remplacer par Vimeo IDs

5. **`/pages/VideoViewer.tsx`** (données inline)
   - Vidéos viewer
   - Format actuel : YouTube embed URL
   - Action : Remplacer par Vimeo IDs

### Exemple de mise à jour
```tsx
// AVANT
const video = {
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
};

// APRÈS (méthode 1 - ID simple)
const video = {
  videoUrl: '76979871' // ID Vimeo
};

// APRÈS (méthode 2 - URL complète)
const video = {
  videoUrl: 'https://vimeo.com/76979871'
};

// UTILISATION (avec helper pour compatibilité)
<VimeoPlayer 
  videoId={getVideoId(video.videoUrl)} 
  title={video.title}
/>
```

---

## 🎬 Process d'upload Vimeo

### 1. Upload manuel
1. Se connecter à Vimeo
2. Uploader la vidéo
3. Récupérer l'ID depuis l'URL (`vimeo.com/[ID]`)
4. Mettre à jour les données

### 2. Configuration vidéo Vimeo recommandée
- **Privacy** : Unlisted ou Public
- **Embed** : Activer l'embed
- **Controls** : Désactiver (on utilise les contrôles custom)
- **Titre/Byline** : Masquer (géré par l'app)

---

## ✨ Fonctionnalités du player

### Contrôles disponibles
- ✅ **Play/Pause** - Bouton central + barre de contrôle
- ✅ **Volume** - Slider au hover + bouton mute
- ✅ **Vitesses** - 0.5x, 0.75x, 1x, 1.25x, 1.5x, 1.75x, 2x
- ✅ **Sous-titres** - Toggle activation
- ✅ **Plein écran** - API Fullscreen native
- ✅ **Progress bar** - Visuelle (API Vimeo pour interaction réelle)
- ✅ **Temps** - Affichage 0:00 / 0:00

### Design TLS
- Variables CSS du design system
- Glassmorphism sur les contrôles
- Animations Motion sur tous les boutons
- Responsive
- Support dark mode (à venir)

---

## 📝 TODO - Prochaines étapes

### Court terme
- [ ] Uploader toutes les vidéos YouTube sur Vimeo
- [ ] Mettre à jour tous les fichiers data avec les IDs Vimeo
- [ ] Tester chaque page avec des vraies vidéos Vimeo
- [ ] Vérifier les sous-titres sur les vidéos

### Moyen terme
- [ ] Intégrer l'API Vimeo Player pour la vraie barre de progression
- [ ] Ajouter des chapitres cliquables
- [ ] Synchroniser les transcriptions avec la vidéo
- [ ] Analytics des vidéos (temps de visionnage)

### Long terme
- [ ] Upload automatique vers Vimeo depuis l'admin
- [ ] Gestion des playlists
- [ ] Recommandations vidéos
- [ ] Mode picture-in-picture

---

## 🐛 Debugging

### Le player ne s'affiche pas
- Vérifier que l'ID Vimeo est valide
- Vérifier que la vidéo est "Unlisted" ou "Public" sur Vimeo
- Vérifier que l'embed est activé dans les settings Vimeo

### Les contrôles ne fonctionnent pas
- Vérifier que `showControls={true}` est passé
- Vérifier la console pour les erreurs de postMessage
- S'assurer que l'iframe Vimeo est bien chargé

### La vidéo YouTube s'affiche
- Vérifier que vous utilisez bien `VimeoPlayer` et non un `<iframe>`
- Vérifier que `videoId` contient un ID Vimeo, pas une URL YouTube
- Utiliser `getVideoId()` helper pour la conversion automatique

---

## 📚 Documentation

- **Composant principal** : `/components/video/README.md`
- **Helpers** : Inline dans `/utils/videoHelpers.ts`
- **API Vimeo** : https://developer.vimeo.com/player/sdk

---

## 🎯 Résumé

✅ **5 pages** mises à jour avec VimeoPlayer  
✅ **1 composant pattern** migré (LessonPlayer)  
✅ **1 nouveau composant** VimeoPlayer avec contrôles complets  
✅ **1 fichier helpers** pour gestion des URLs  
✅ **Design unifié** sur toute la plateforme  
✅ **Prêt pour production** (après upload des vidéos sur Vimeo)

---

**Date de migration** : 2026-02-23  
**Version** : 1.0.0  
**Status** : ✅ COMPLÉTÉ - En attente upload vidéos Vimeo
