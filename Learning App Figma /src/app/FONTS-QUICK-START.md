# 🚀 FONTS - Quick Start

## ✅ Google Fonts Installées

**League Spartan** (Headings) + **Nunito** (Body) sont maintenant disponibles !

Chargées dynamiquement via `WebFontLoader` dans `App.tsx`.

---

## 🎯 Utilisation Simple

### Headings (League Spartan)

```tsx
<h1 style={{ fontFamily: 'var(--font-display)' }}>
  Mon Titre
</h1>
```

### Body Text (Nunito)

```tsx
<p style={{ fontFamily: 'var(--font-body)' }}>
  Mon paragraphe
</p>
```

### Avec Poids

```tsx
// Bold heading
<h2 style={{ 
  fontFamily: 'var(--font-display)',
  fontWeight: 'var(--font-bold)'
}}>
  Titre Bold
</h2>

// Semibold button
<button style={{ 
  fontFamily: 'var(--font-body)',
  fontWeight: 'var(--font-semibold)'
}}>
  Bouton
</button>
```

---

## 📖 Variables Disponibles

### Families
- `var(--font-display)` → League Spartan
- `var(--font-body)` → Nunito

### Weights
- `var(--font-light)` → 300
- `var(--font-regular)` → 400
- `var(--font-medium)` → 500
- `var(--font-semibold)` → 600
- `var(--font-bold)` → 700
- `var(--font-extrabold)` → 800

### Sizes
- `var(--text-xs)` → 12px
- `var(--text-sm)` → 14px
- `var(--text-base)` → 16px
- `var(--text-lg)` → 18px
- `var(--text-xl)` → 20px
- `var(--text-2xl)` → 24px
- `var(--text-3xl)` → 30px
- `var(--text-4xl)` → 36px
- `var(--text-5xl)` → 48px

---

## 🧪 Tester

Pour vérifier visuellement que les fonts se chargent :

```tsx
// Dans App.tsx (temporairement)
import FontsTestPage from './pages/FontsTestPage';

export default function App() {
  return <FontsTestPage />;
}
```

---

## 📚 Plus d'Infos

- [FONTS-INSTALLATION-SUCCESS.md](./FONTS-INSTALLATION-SUCCESS.md) - Installation complète
- [FONTS-GUIDE.md](./FONTS-GUIDE.md) - Documentation détaillée

---

**THE LEARNING SOCIETY** 🔤
