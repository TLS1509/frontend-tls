# 🔤 TYPOGRAPHIE - The Learning Society

## 📚 Google Fonts Utilisées

L'application utilise **2 Google Fonts** pour une typographie cohérente et moderne :

### 1. League Spartan (Display/Headings)

- **Usage** : Titres, headings (h1, h2, h3, h4, h5, h6)
- **Weights disponibles** : 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Variable CSS** : `--font-display`
- **Google Fonts** : [League Spartan](https://fonts.google.com/specimen/League+Spartan)

### 2. Nunito (Body)

- **Usage** : Texte de corps, paragraphes, labels, UI
- **Weights disponibles** : 200, 300, 400, 500, 600, 700, 800, 900
- **Styles** : Normal + Italic
- **Variable CSS** : `--font-body`
- **Google Fonts** : [Nunito](https://fonts.google.com/specimen/Nunito)

---

## 🎨 Variables CSS

Dans `styles/globals.css`, les fonts sont définies comme suit :

```css
:root {
  /* Typography - Font Families */
  --font-display: 'League Spartan', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Font Weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

---

## 📖 Import des Fonts

### Méthode 1 : Import CSS (Actuelle)

Dans `/styles/globals.css` :

```css
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
```

✅ **Avantages** : Simple, automatique, un seul fichier
❌ **Inconvénient** : Peut ne pas fonctionner dans certains environnements

### Méthode 2 : Composant React (Alternative)

Si la méthode 1 ne fonctionne pas, utiliser le composant `FontLoader` :

```tsx
import { FontLoader } from './components/FontLoader';

export default function App() {
  return (
    <>
      <FontLoader />
      {/* Reste de l'app */}
    </>
  );
}
```

### Méthode 3 : Inline Styles (Fallback)

Si les deux premières méthodes échouent :

```tsx
import { InlineFontStyles } from './components/FontLoader';

export default function App() {
  return (
    <>
      <InlineFontStyles />
      {/* Reste de l'app */}
    </>
  );
}
```

---

## 🎯 Utilisation dans les Composants

### Headings (League Spartan)

```tsx
<h1 style={{ fontFamily: 'var(--font-display)' }}>
  Titre Principal
</h1>

<h2 style={{ 
  fontFamily: 'var(--font-display)',
  fontWeight: 'var(--font-bold)'
}}>
  Sous-titre
</h2>
```

### Body Text (Nunito)

```tsx
<p style={{ fontFamily: 'var(--font-body)' }}>
  Texte de paragraphe avec Nunito
</p>

<span style={{ 
  fontFamily: 'var(--font-body)',
  fontWeight: 'var(--font-semibold)'
}}>
  Label en semi-bold
</span>
```

### Avec Composants Typographie

```tsx
import { Heading } from './components/typography/Heading';
import { Text } from './components/typography/Text';

<Heading level="1" weight="bold">
  Mon Titre
</Heading>

<Text size="lg" weight="medium">
  Mon texte
</Text>
```

---

## 📊 Échelle Typographique

### Font Sizes

```css
--text-xs: 12px;      /* Extra small */
--text-sm: 14px;      /* Small */
--text-base: 16px;    /* Base (défaut) */
--text-lg: 18px;      /* Large */
--text-xl: 20px;      /* Extra large */
--text-2xl: 24px;     /* 2X large */
--text-3xl: 30px;     /* 3X large */
--text-4xl: 36px;     /* 4X large */
--text-5xl: 48px;     /* 5X large */
--text-6xl: 60px;     /* 6X large */
```

### Line Heights

```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

---

## 🎨 Exemples d'Usage

### Hero Section

```tsx
<div style={{
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-5xl)',
  fontWeight: 'var(--font-extrabold)',
  lineHeight: 'var(--leading-tight)'
}}>
  Bienvenue sur The Learning Society
</div>
```

### Card Title

```tsx
<h3 style={{
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-xl)',
  fontWeight: 'var(--font-bold)',
  color: 'var(--foreground)'
}}>
  Titre de Card
</h3>
```

### Body Paragraph

```tsx
<p style={{
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  fontWeight: 'var(--font-regular)',
  lineHeight: 'var(--leading-relaxed)',
  color: 'var(--muted-foreground)'
}}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</p>
```

### Button Text

```tsx
<button style={{
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-base)',
  fontWeight: 'var(--font-semibold)',
  letterSpacing: '0.025em'
}}>
  Cliquez ici
</button>
```

---

## 🔍 Vérification du Chargement

### Dans le Browser DevTools

1. Ouvrir les **DevTools** (F12)
2. Aller dans **Network** > **Font**
3. Vérifier que les fonts se chargent :
   - `League+Spartan`
   - `Nunito`

### Test Visuel

```tsx
<div>
  <div style={{ fontFamily: 'var(--font-display)' }}>
    League Spartan - ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
  </div>
  <div style={{ fontFamily: 'var(--font-body)' }}>
    Nunito - ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
  </div>
</div>
```

Si les fonts se chargent correctement, le texte aura l'apparence distinctive de League Spartan et Nunito.

---

## ⚡ Optimisation Performance

### Preconnect (Déjà dans FontLoader)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### Font Display Swap

Les fonts utilisent `display=swap` dans l'URL Google Fonts :
- Affiche le texte immédiatement avec une font système
- Remplace par la vraie font dès qu'elle est chargée
- Pas de FOIT (Flash of Invisible Text)

### Subset (Si nécessaire)

Pour optimiser davantage, utiliser un subset :

```
&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
```

---

## 🐛 Troubleshooting

### Les fonts ne se chargent pas ?

1. **Vérifier les @import** dans `globals.css`
2. **Vérifier que `globals.css` est importé** dans `App.tsx`
3. **Tester avec FontLoader** composant
4. **Vérifier la console** pour erreurs CORS
5. **Vérifier le Network** pour voir si les requêtes sont bloquées

### Fallback si Google Fonts ne fonctionne pas

Les variables CSS incluent des fallbacks system fonts :

```css
--font-display: 'League Spartan', -apple-system, BlinkMacSystemFont, 
                'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
--font-body: 'Nunito', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
```

---

## 📋 Checklist d'Implémentation

- [x] Google Fonts importées dans `globals.css`
- [x] Variables CSS définies (`--font-display`, `--font-body`)
- [x] Composant `FontLoader` créé (alternative)
- [x] Fallbacks system fonts configurés
- [x] Toutes les pages utilisent les variables CSS
- [x] Documentation créée

---

## 🎯 Convention TLS

### Toujours utiliser les variables CSS

✅ **Correct :**
```tsx
<h1 style={{ fontFamily: 'var(--font-display)' }}>Titre</h1>
```

❌ **À éviter :**
```tsx
<h1 style={{ fontFamily: 'League Spartan' }}>Titre</h1>
```

### Poids de font recommandés

| Élément | Font Family | Weight | Variable |
|---------|-------------|--------|----------|
| H1 | League Spartan | 800 | `--font-extrabold` |
| H2 | League Spartan | 700 | `--font-bold` |
| H3 | League Spartan | 700 | `--font-bold` |
| H4 | League Spartan | 600 | `--font-semibold` |
| Body | Nunito | 400 | `--font-regular` |
| Label | Nunito | 500 | `--font-medium` |
| Button | Nunito | 600 | `--font-semibold` |
| Caption | Nunito | 400 | `--font-regular` |

---

**THE LEARNING SOCIETY** 🔤  
_Typographie cohérente avec League Spartan + Nunito_

_Documentation mise à jour : 22 février 2026_
