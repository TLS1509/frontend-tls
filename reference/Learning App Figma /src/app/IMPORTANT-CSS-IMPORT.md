# ⚠️ IMPORTANT : Import CSS Requis

## 🎯 Action Requise

Pour que la page de test Color Tokens V2 fonctionne correctement, vous devez importer **les deux fichiers CSS** dans votre point d'entrée (`index.html` ou `main.tsx`).

---

## ✅ OPTION 1 : Via index.html (Recommandé)

Si vous avez un fichier `index.html` ou `public/index.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Learning Society</title>
  
  <!-- CSS IMPORTS - ORDRE CRITIQUE -->
  <link rel="stylesheet" href="/styles/globals.css">        <!-- ← PREMIER -->
  <link rel="stylesheet" href="/styles/globals-v2.css">     <!-- ← SECOND -->
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

## ✅ OPTION 2 : Via main.tsx / index.tsx

Si vous importez les CSS via TypeScript/JavaScript :

```tsx
// src/main.tsx ou src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS IMPORTS - ORDRE CRITIQUE
import './styles/globals.css';      // ← PREMIER (legacy)
import './styles/globals-v2.css';   // ← SECOND (nouveaux tokens)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## ⚠️ ORDRE CRITIQUE

**L'ordre est CRUCIAL pour la cascade CSS :**

1. **`globals.css`** d'abord (tokens originaux)
2. **`globals-v2.css`** ensuite (nouveaux tokens + legacy aliases)

**Si inversé :** Les legacy aliases ne fonctionneront pas correctement.

---

## 🔍 Vérification

### Test rapide dans DevTools :

1. Ouvrir DevTools (F12)
2. Console → Taper :

```js
// Vérifier que les tokens sont chargés
getComputedStyle(document.documentElement).getPropertyValue('--primary-50')
// Devrait retourner une couleur (pas vide)

getComputedStyle(document.documentElement).getPropertyValue('--color-primary-50')
// Devrait retourner la même couleur
```

**Si vide/undefined :** Les CSS ne sont pas importés.

---

## 🚀 Après l'import

### Accéder à la page de test :

**Méthode 1 : Bouton Flottant**
- Ouvrir l'app (dashboard)
- Cliquer sur le bouton bleu 🎨 en bas à droite

**Méthode 2 : Navigation Directe**
- Modifier `/App.tsx` ligne 101 :
  ```tsx
  const [currentPage, setCurrentPage] = useState<Page>('color-tokens-test');
  ```

---

## 📋 Checklist Finale

- [ ] `globals.css` existe dans `/styles/`
- [ ] `globals-v2.css` existe dans `/styles/`
- [ ] Import dans `index.html` ou `main.tsx` (ordre correct)
- [ ] Bouton flottant visible sur dashboard
- [ ] Page de test accessible et colorée

---

## 🆘 Troubleshooting

### Les couleurs ne s'affichent pas

**Vérifier :**
1. Les deux CSS sont importés
2. L'ordre est correct (globals.css AVANT globals-v2.css)
3. Les chemins sont corrects (`/styles/` ou `./styles/`)

**DevTools Check :**
- Onglet "Sources" → Vérifier que les 2 CSS sont chargés
- Onglet "Elements" → `<head>` → Les 2 `<link>` ou `<style>` doivent être présents

---

**Une fois les imports configurés, la page de test sera opérationnelle ! 🎉**

_CSS Import Guide | Color Tokens V2 | 22/02/2026_
