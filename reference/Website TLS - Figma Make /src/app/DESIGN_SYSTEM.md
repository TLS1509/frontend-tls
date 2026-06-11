# Design System - The Learning Society

Ce document décrit le design system configuré dans `/styles/globals.css`. Tous les composants doivent utiliser ces variables CSS.

## 🎨 Couleurs

### Couleurs Principales
- `--primary`: #55A1B4 (Bleu TLS)
- `--primary-foreground`: #ffffff
- `--secondary`: #F8B044 (Orange)
- `--secondary-foreground`: #1a1a1a
- `--accent`: #FFF4E6 (Crème)
- `--accent-foreground`: #1a1a1a

### Couleurs Charts
- `--chart-1`: #55A1B4
- `--chart-2`: #F8B044
- `--chart-3`: #EB7724
- `--chart-4`: #7BC4D4
- `--chart-5`: #FFCB77

### Couleurs Système
- `--background`: #ffffff
- `--foreground`: #1a1a1a
- `--muted`: #f5f5f5
- `--muted-foreground`: #6b7280
- `--destructive`: #d4183d
- `--destructive-foreground`: #ffffff
- `--border`: rgba(0, 0, 0, 0.1)
- `--ring`: #55A1B4

### Couleurs UI
- `--card`: #ffffff
- `--card-foreground`: #1a1a1a
- `--input-background`: #f3f3f5
- `--switch-background`: #cbced4

## 📐 Typographie

### Échelle de Texte
Utilisez les variables CSS suivantes via `font-size: var(--text-*)`:

- `--text-xs`: 0.75rem (12px)
- `--text-sm`: 0.875rem (14px)
- `--text-base`: 1rem (16px)
- `--text-lg`: 1.125rem (18px)
- `--text-xl`: 1.25rem (20px)
- `--text-2xl`: 1.5rem (24px)
- `--text-3xl`: 1.875rem (30px)
- `--text-4xl`: 2.25rem (36px)
- `--text-5xl`: 3rem (48px)
- `--text-6xl`: 3.75rem (60px)
- `--text-7xl`: 4.5rem (72px)

### Poids de Police
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

### Typographie par Défaut
Les éléments HTML sans classes Tailwind ont automatiquement ces styles :

- `h1`: var(--text-2xl), weight medium
- `h2`: var(--text-xl), weight medium
- `h3`: var(--text-lg), weight medium
- `h4`: var(--text-base), weight medium
- `p`: var(--text-base), weight normal
- `button`: var(--text-base), weight medium
- `label`: var(--text-base), weight medium
- `input`: var(--text-base), weight normal

## 📏 Espacement

- `--spacing-xs`: 0.25rem (4px)
- `--spacing-sm`: 0.5rem (8px)
- `--spacing-md`: 1rem (16px)
- `--spacing-lg`: 1.5rem (24px)
- `--spacing-xl`: 2rem (32px)
- `--spacing-2xl`: 3rem (48px)
- `--spacing-3xl`: 4rem (64px)

## 🔲 Border Radius

- `--radius-sm`: 0.375rem (6px)
- `--radius-md`: 0.5rem (8px)
- `--radius-lg`: 0.625rem (10px)
- `--radius-xl`: 0.875rem (14px)
- `--radius-2xl`: 1rem (16px)
- `--radius-full`: 9999px (cercle)

## 🎯 Utilisation

### ❌ À ÉVITER
```tsx
// NE PAS utiliser les classes Tailwind pour la typographie
<h1 className="text-4xl font-bold">Titre</h1>
<p className="text-lg">Texte</p>
```

### ✅ RECOMMANDÉ
```tsx
// Laisser la typographie par défaut définie dans globals.css
<h1>Titre</h1>
<p>Texte</p>

// OU utiliser des variables CSS personnalisées si nécessaire
<div style={{ fontSize: 'var(--text-4xl)' }}>Titre</div>
```

### ✅ Couleurs Tailwind (OK)
```tsx
// Les classes Tailwind de couleur sont OK car elles utilisent le design system
<div className="bg-primary text-primary-foreground">
<Button variant="secondary">Action</Button>
```

## 📦 Composants UI

Tous les composants dans `/components/ui/` sont configurés pour utiliser automatiquement :
- Les couleurs du design system (via Tailwind)
- Les border-radius (via --radius)
- Les spacing appropriés

## 🌙 Mode Sombre

Le mode sombre est déjà configuré avec des variantes pour toutes les couleurs. Activez-le en ajoutant la classe `dark` au body ou à un conteneur parent.

## 🔄 Mise à Jour du Design System

Pour modifier le design system, éditez **uniquement** `/styles/globals.css` :
1. Modifiez les variables CSS dans `:root`
2. Tous les composants utilisant ces variables seront automatiquement mis à jour
3. Ne modifiez pas les composants individuels pour changer les couleurs/typographie
