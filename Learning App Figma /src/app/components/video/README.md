# Video Player Components - The Learning Society

## VimeoPlayer Component

Composant de lecteur vidéo unifié utilisant Vimeo avec des contrôles personnalisés.

### Fonctionnalités

✅ **Contrôles complets** :
- Play/Pause
- Volume avec slider
- Vitesses de lecture (0.5x, 0.75x, 1x, 1.25x, 1.5x, 1.75x, 2x)
- Sous-titres activables
- Mode plein écran
- Barre de progression

✅ **Design TLS** :
- Utilise les variables CSS du design system
- Glassmorphism sur les contrôles
- Animations Motion
- Responsive

### Utilisation de base

```tsx
import VimeoPlayer from '../components/video/VimeoPlayer';

<VimeoPlayer
  videoId="76979871"  // ID Vimeo (depuis l'URL vimeo.com/76979871)
  title="Titre de la vidéo"
  autoplay={false}
  showControls={true}
/>
```

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `videoId` | `string` | **requis** | ID de la vidéo Vimeo |
| `title` | `string` | `'Vidéo'` | Titre de la vidéo |
| `autoplay` | `boolean` | `false` | Lecture automatique |
| `showControls` | `boolean` | `true` | Afficher les contrôles personnalisés |
| `onFullscreenClick` | `() => void` | - | Callback au click plein écran (ouvre modal si fourni) |
| `className` | `string` | `''` | Classes CSS additionnelles |

**Note sur `onFullscreenClick`** : Si fourni, cette fonction sera appelée au lieu d'utiliser le fullscreen natif du navigateur. Utilisez-la pour ouvrir une modal (recommandé pour éviter les problèmes de permissions).

## VideoPlayerModal Component

Modal pour afficher une vidéo en mode focus/plein écran.

### Utilisation

```tsx
import { VideoPlayerModal } from '../components/video/VimeoPlayer';

const [isModalOpen, setIsModalOpen] = useState(false);

<VideoPlayerModal
  videoId="76979871"
  title="Titre de la vidéo"
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `videoId` | `string` | **requis** | ID de la vidéo Vimeo |
| `title` | `string` | **requis** | Titre de la vidéo |
| `isOpen` | `boolean` | **requis** | État d'ouverture de la modal |
| `onClose` | `() => void` | **requis** | Callback de fermeture |

## Obtenir un ID Vimeo

1. URL Vimeo : `https://vimeo.com/76979871`
2. ID Vimeo : `76979871`

## Exemples d'utilisation dans la plateforme

### 1. VideoTutorialPage (centré avec modal)

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);

// Player centré dans la page avec callback fullscreen
<div className="max-w-5xl mx-auto px-6 lg:px-12">
  <VimeoPlayer
    videoId="76979871"
    title={video.title}
    showControls={true}
    onFullscreenClick={() => setIsModalOpen(true)} // Ouvre la modal
  />
</div>

// Modal au click du bouton fullscreen
<VideoPlayerModal
  videoId="76979871"
  title={video.title}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

**Important** : Utilisez `onFullscreenClick` pour ouvrir une modal au lieu d'utiliser le fullscreen natif. Cela évite les problèmes de permissions du navigateur.

### 2. VideoViewer (dans une card)

```tsx
<div className="rounded-3xl overflow-hidden">
  <VimeoPlayer
    videoId="76979871"
    title={data.title}
    showControls={true}
  />
</div>
```

### 3. WeeklyNewsDetailPage (autoplay)

```tsx
<VimeoPlayer
  videoId="76979871"
  title={weeklyEdition.featuredVideo.title}
  autoplay
  showControls
/>
```

## Notes techniques

- Le player utilise l'API Vimeo Player pour les contrôles
- Les messages sont envoyés via `postMessage` pour contrôler le player
- Le mode plein écran utilise l'API Fullscreen native du navigateur
- Les styles utilisent les variables CSS du design system TLS

## Helpers - Gestion des URLs vidéo

Des fonctions utilitaires sont disponibles dans `/utils/videoHelpers.ts` :

### `getVideoId(url: string)`

Extrait automatiquement l'ID Vimeo depuis différents formats :

```tsx
import { getVideoId } from '../utils/videoHelpers';

// Depuis une URL Vimeo complète
const id1 = getVideoId('https://vimeo.com/76979871'); // '76979871'

// Depuis un player Vimeo
const id2 = getVideoId('https://player.vimeo.com/video/76979871'); // '76979871'

// Depuis un ID simple
const id3 = getVideoId('76979871'); // '76979871'

// Utilisation dans le composant
<VimeoPlayer videoId={getVideoId(video.url)} title={video.title} />
```

### `extractVimeoId(url: string)`

Extrait l'ID Vimeo depuis une URL :

```tsx
import { extractVimeoId } from '../utils/videoHelpers';

const id = extractVimeoId('https://vimeo.com/76979871'); // '76979871'
```

### `detectVideoPlatform(url: string)`

Détecte le type de plateforme vidéo :

```tsx
import { detectVideoPlatform } from '../utils/videoHelpers';

detectVideoPlatform('https://vimeo.com/123'); // 'vimeo'
detectVideoPlatform('https://youtube.com/watch?v=abc'); // 'youtube'
```

### Exemple d'utilisation dans les données

```tsx
import { getVideoId } from '../utils/videoHelpers';

const video = {
  id: 1,
  title: 'Ma vidéo',
  url: 'https://vimeo.com/76979871' // URL complète stockée
};

// Dans le composant
<VimeoPlayer 
  videoId={getVideoId(video.url)} 
  title={video.title} 
/>
```

## Migration depuis YouTube

⚠️ **Important** : Les vidéos doivent être hébergées sur Vimeo pour fonctionner avec ce player.

### Processus de migration :

1. **Uploadez la vidéo sur Vimeo**
   - Connectez-vous à votre compte Vimeo
   - Uploadez la vidéo
   - Récupérez l'ID (ex: `vimeo.com/76979871` → ID = `76979871`)

2. **Mettez à jour vos données**
   ```tsx
   // Avant (YouTube)
   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
   
   // Après (Vimeo)
   videoUrl: 'https://vimeo.com/76979871'
   // ou simplement
   videoUrl: '76979871'
   ```

3. **Utilisez le helper pour la compatibilité**
   ```tsx
   import { getVideoId } from '../utils/videoHelpers';
   
   <VimeoPlayer 
     videoId={getVideoId(video.videoUrl)} 
     title={video.title} 
   />
   ```

### Détection automatique

Le helper `getVideoId()` détecte automatiquement les URLs YouTube et affiche un warning dans la console :

```tsx
// Si vous avez encore une URL YouTube
videoUrl: 'https://youtube.com/watch?v=abc123'

// Le helper retourne l'ID de demo et affiche un warning
const id = getVideoId(videoUrl); 
// Console: ⚠️ YouTube URL detected: ...
// Please upload this video to Vimeo
```
