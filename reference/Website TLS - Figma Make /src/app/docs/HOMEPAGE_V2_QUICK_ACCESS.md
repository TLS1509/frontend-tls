# Accès Rapide à HomePageV2

## 🎯 Comment accéder à la nouvelle page ?

### Option 1 : Via le Menu de Navigation (Desktop)

```
┌────────────────────────────────────────────────────────────────────┐
│  [LOGO TLS]    ACADÉMIE  AGENCE  CONSEIL  TECH  MAG'  HOME V2 TEST │
│                                                              ▲      │
│                                                              │      │
│                                                       CLIQUEZ ICI   │
└────────────────────────────────────────────────────────────────────┘
```

👉 **L'entrée "HOME V2" avec le badge jaune "TEST" se trouve à droite, juste avant le bouton "Nous contacter"**

### Option 2 : Via le Menu Mobile (Burger)

```
┌─────────────────────────────┐
│  [LOGO TLS]          [☰]   │  ← Cliquez sur le menu burger
└─────────────────────────────┘

Puis dans le menu déroulant :

┌─────────────────────────────┐
│  ACADÉMIE                   │
│  AGENCE                     │
│  CONSEIL                    │
│  TECH                       │
│  MAG'                       │
│  HOME V2  [TEST]            │  ← Cliquez ici
│                             │
│  [Nous contacter]           │
└─────────────────────────────┘
```

## 🎨 Identité Visuelle du Menu

### Badge "TEST"
- **Couleur** : Jaune accent (#F8B044)
- **Texte** : Noir (#1a1a1a)
- **Style** : Petit badge arrondi à droite du texte "HOME V2"

### État Actif
Quand vous êtes sur HomePageV2, le menu "HOME V2" sera :
- **Couleur texte** : Bleu primaire (#55A1B4)
- **Fond** : Bleu primaire très clair (#E8F4F7) en mobile

## 🔄 Navigation entre V1 et V2

### Pour revenir à la HomePage V1
Cliquez sur le logo TLS en haut à gauche

### Pour aller à la HomePage V2
Cliquez sur "HOME V2 [TEST]" dans le menu

## 📱 Responsive

### Desktop (>768px)
Menu horizontal avec tous les items visibles

### Mobile (<768px)
Menu burger (hamburger icon) avec tous les items dans un drawer

## ⚡ Raccourcis Développeur

### Navigation programmatique
```typescript
// Dans n'importe quel composant avec onNavigate
onNavigate('home-v2')
```

### URL directe (si routing activé)
```
https://thelearningsociety.fr/#home-v2
```

## 🔍 Troubleshooting

### Je ne vois pas "HOME V2" dans le menu
1. Vérifiez que `/components/Header.tsx` contient bien :
   ```typescript
   { id: 'home-v2', label: 'HOME V2', badge: 'TEST' }
   ```
2. Rafraîchissez la page (Ctrl+R ou Cmd+R)

### Le badge "TEST" n'apparaît pas
1. Vérifiez que le composant Badge est bien importé :
   ```typescript
   import { Badge } from "./ui/badge";
   ```
2. Vérifiez les styles CSS du badge dans globals.css

### La page ne se charge pas
1. Vérifiez que `/pages/HomePageV2.tsx` existe
2. Vérifiez l'import dans `/App.tsx` :
   ```typescript
   import HomePageV2 from "./pages/HomePageV2";
   ```
3. Vérifiez le case 'home-v2' dans renderPage()

## 💡 Astuces

### Comparer V1 et V2 rapidement
1. Ouvrez deux fenêtres côte à côte
2. Fenêtre 1 : HomePage V1 (via logo)
3. Fenêtre 2 : HomePage V2 (via menu)

### Tester l'accessibilité
- Naviguez avec Tab ⇥ pour voir les focus states
- Testez avec un lecteur d'écran (VoiceOver, NVDA)
- Vérifiez prefers-reduced-motion dans les DevTools

---

**Besoin d'aide ?** Consultez `/docs/HOMEPAGE_V2_INTEGRATION.md` pour la documentation complète.
