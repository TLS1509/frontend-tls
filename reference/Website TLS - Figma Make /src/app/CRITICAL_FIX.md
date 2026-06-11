# 🚨 SOLUTION CRITIQUE - Erreur Plugin React

## Le problème persiste ?

Si l'erreur `@vitejs/plugin-react@6.0.1` continue d'apparaître, c'est parce que **node_modules contient encore l'ancienne version** du plugin.

---

## ✅ SOLUTION DÉFINITIVE

### Fichiers créés pour résoudre le problème :

1. **`/vite.config.js`** (prioritaire sur .ts)
   - Configuration JavaScript pure
   - Sans plugin React
   - Utilise esbuild directement

2. **`/.pnpmrc`** 
   - Configuration pnpm pour éviter les conflits

3. **`/vite.config.ts.backup`**
   - Backup de l'ancien fichier TypeScript

---

## 🔧 Actions OBLIGATOIRES

### Le système DOIT supprimer et réinstaller node_modules :

```bash
# 1. SUPPRIMER complètement node_modules
rm -rf node_modules

# 2. SUPPRIMER le lock file
rm pnpm-lock.yaml
# ou
rm package-lock.json
# ou  
rm yarn.lock

# 3. SUPPRIMER le cache
rm -rf .vite
rm -rf node_modules/.vite

# 4. RÉINSTALLER (sans @vitejs/plugin-react)
pnpm install
# ou
npm install
# ou
yarn install

# 5. DÉMARRER avec force
pnpm dev
# ou
npm run dev
```

---

## 🎯 Pourquoi vite.config.js au lieu de .ts ?

**Vite charge les fichiers de config dans cet ordre :**
1. `vite.config.js` ← **Prioritaire**
2. `vite.config.mjs`
3. `vite.config.ts`
4. `vite.config.mts`

En créant `vite.config.js`, nous **court-circuitons** complètement le chargement du fichier .ts qui pourrait avoir des problèmes de cache.

---

## 📋 Vérification

Après la réinstallation, vérifiez que :

```bash
# Le plugin React NE DOIT PAS être présent
ls node_modules/@vitejs/

# Si vous voyez "plugin-react", c'est qu'il reste installé
# Dans ce cas, supprimez-le manuellement :
rm -rf node_modules/@vitejs/plugin-react
```

---

## 🔍 Si l'erreur PERSISTE ENCORE

### Solution nucléaire :

```bash
# 1. Supprimer TOUT
rm -rf node_modules
rm -rf .vite
rm -rf dist
rm -rf .cache
rm pnpm-lock.yaml package-lock.json yarn.lock

# 2. Vérifier package.json
# Il NE DOIT PAS contenir @vitejs/plugin-react

# 3. Nettoyer le cache global pnpm
pnpm store prune

# 4. Réinstaller from scratch
pnpm install --no-frozen-lockfile --force

# 5. Démarrer
pnpm dev
```

---

## 🎨 Design System

Tous vos fichiers CSS et composants sont **intacts** :
- ✅ `/styles/globals.css`
- ✅ `/docs/TLS_*.md`
- ✅ `/standalone-pages/*.html`
- ✅ Tous les composants React

---

## 💡 Explication technique

**Le problème :**
- Le système Figma Make utilise probablement une configuration interne qui charge `@vitejs/plugin-react@6.0.1`
- Cette version essaie d'accéder à `vite/internal` qui n'existe pas dans Vite 6.3.5
- Même si on supprime le plugin de package.json, il reste en cache

**La solution :**
- Utiliser `vite.config.js` (JavaScript) pour court-circuiter le cache TypeScript
- Configurer esbuild pour compiler JSX directement
- Ne pas utiliser de plugin React du tout

---

## ⚠️ IMPORTANT

Si vous êtes sur **Figma Make / Fondry**, il se peut que l'environnement ait des configurations pré-installées qui forcent l'utilisation du plugin React. Dans ce cas :

1. Contactez le support Figma Make
2. Demandez-leur de mettre à jour `@vitejs/plugin-react` vers une version compatible
3. Ou demandez-leur de désactiver le plugin React pour votre projet

---

**Document créé pour résoudre définitivement l'erreur**  
*The Learning Society - Janvier 2026*

✨ Le fichier `vite.config.js` devrait maintenant avoir priorité !
