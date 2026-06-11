# 🔧 CORRECTIF - Erreur de Configuration Vite

## ❌ Problème identifié

L'erreur `Package subpath './internal' is not defined by "exports"` indique une **incompatibilité de version** entre Vite 6.3.5 et `@vitejs/plugin-react@6.0.1`.

## ✅ Solution appliquée (WORKAROUND)

### Pourquoi le plugin React pose problème ?

Le plugin `@vitejs/plugin-react@6.0.1` essaie d'importer depuis `vite/internal`, un subpath qui **n'est pas exporté** par Vite 6.3.5.

### Solution : Utiliser esbuild directement

Au lieu d'utiliser le plugin React incompatible, j'ai configuré Vite pour utiliser **esbuild directement** pour compiler JSX.

**Avantages :**
- ✅ Plus rapide (esbuild est ultra-rapide)
- ✅ Pas de dépendance au plugin React problématique
- ✅ Fonctionne parfaitement avec React 18+
- ✅ Support complet JSX automatic runtime

### Configuration appliquée dans `/vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [], // ⚠️ Pas de plugin React incompatible
  
  esbuild: {
    jsx: 'automatic',           // React 18+ automatic runtime
    jsxImportSource: 'react',   // Importe depuis 'react'
    jsxInject: `import React from 'react'`, // Inject React automatiquement
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      jsx: 'automatic',
    },
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

---

## 🚀 Démarrage du projet

Le projet devrait maintenant démarrer sans erreur :

```bash
# Le serveur Vite va utiliser esbuild pour compiler JSX
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

---

## 🔍 Comparaison : Plugin vs esbuild

| Fonctionnalité | @vitejs/plugin-react | esbuild (solution actuelle) |
|----------------|----------------------|----------------------------|
| **Fast Refresh** | ✅ Oui | ⚠️ Non (reload complet) |
| **JSX Compilation** | ✅ Oui | ✅ Oui |
| **Performance** | ✅ Rapide | ✅ Ultra-rapide |
| **Compatibilité** | ❌ Erreur version | ✅ Fonctionne |
| **React DevTools** | ✅ Oui | ✅ Oui |

**La seule différence** : Pas de Fast Refresh (rechargement automatique sans perdre l'état). Le navigateur va recharger complètement la page lors des modifications.

---

## 📋 Checklist de vérification

Après la réinstallation, vérifiez :

- [ ] ✅ `vite.config.ts` existe
- [ ] ✅ `tsconfig.json` existe
- [ ] ✅ `package.json` a les bonnes versions
- [ ] ✅ `index.html` existe à la racine
- [ ] ✅ `/src/main.tsx` existe
- [ ] ✅ `/styles/globals.css` est importé dans main.tsx
- [ ] ✅ `node_modules` est supprimé avant réinstallation
- [ ] ✅ Lock file est supprimé avant réinstallation

---

## 🎨 Design System intact

Tous vos fichiers de design system sont préservés :
- `/styles/globals.css` - ✅ Variables CSS TLS
- `/docs/TLS_*` - ✅ Documentation complète
- `/standalone-pages/*.html` - ✅ Pages HTML autonomes
- Tous les composants React - ✅ Intacts

**Aucune perte de code ou de configuration !**

---

## 🆘 Si le problème persiste

### 1. Vérifiez la version de Node.js
```bash
node --version
# Doit être >= 18.0.0
```

### 2. Vérifiez pnpm/npm/yarn
```bash
pnpm --version
# ou
npm --version
```

### 3. Nettoyage complet
```bash
# Supprimer tous les caches
rm -rf node_modules
rm -rf .vite
rm -rf dist
rm -rf pnpm-lock.yaml

# Réinstaller
pnpm install --no-frozen-lockfile
```

### 4. Mode legacy (dernier recours)
Si rien ne fonctionne, utilisez le mode CommonJS dans `vite.config.ts` :

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic', // Mode legacy
    })
  ],
})
```

---

## 📞 Support

Les fichiers créés/mis à jour :
1. ✅ `/vite.config.ts` - Config Vite
2. ✅ `/tsconfig.json` - Config TypeScript
3. ✅ `/tsconfig.node.json` - Config TS pour Node
4. ✅ `/package.json` - Dépendances compatibles
5. ✅ `/index.html` - Point d'entrée HTML
6. ✅ `/src/main.tsx` - Point d'entrée React

**Tous les fichiers de votre design system TLS sont intacts !** 🎨

---

**Document créé pour résoudre l'erreur Vite**  
*Correctif appliqué - Janvier 2026*

✨ **Bon développement !**