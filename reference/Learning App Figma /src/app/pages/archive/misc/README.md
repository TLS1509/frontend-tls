# 🗂️ PAGES DIVERSES - ARCHIVES

**Date d'archivage** : 23 janvier 2026  
**Raison** : Pages obsolètes ou non utilisées  
**Version** : V7.0

---

## 📁 CONTENU

Pages diverses archivées lors de la consolidation v7.0.

### Fichiers Archivés (1+)

| Fichier | Date Création | Usage Original | Raison Archivage |
|---------|---------------|----------------|------------------|
| **ProjectPage.tsx** | Janvier 2026 | Ancienne landing page projet | Pas de route App.tsx, remplacée |

### Fichiers À Vérifier

| Fichier | Status | Action |
|---------|--------|--------|
| **PMProLoginPage.tsx** | ⚠️ À vérifier | Archiver si doublon de LoginPage.tsx confirmé |

---

## 🔄 HISTORIQUE

### ProjectPage.tsx
- **Créé** : Janvier 2026
- **Usage** : Page landing initiale du projet
- **Archivé** : 23 janvier 2026
- **Raison** : 
  - Pas de route dans App.tsx
  - Contenu obsolète
  - Remplacée par nouvelles pages core
- **Features** :
  - Hero section
  - Description projet
  - CTA actions
  - Footer

---

### PMProLoginPage.tsx (À vérifier)
- **Créé** : Janvier 2026
- **Usage** : Page login alternative (PM Pro?)
- **Status** : ⚠️ À confirmer si doublon
- **Action recommandée** :
  1. Rechercher imports : `grep -r "PMProLoginPage" /src`
  2. Si non utilisé → Archiver
  3. Si utilisé → Garder et documenter différence avec LoginPage.tsx

---

## 📍 PAGES ACTUELLES

### Landing/Marketing
- **Aucune page marketing** dans `/pages/` actuellement
- Landing components archivés dans `/components/archive/landing/`

### Auth
- **LoginPage.tsx** : Page login principale ✅
- **SignupPage.tsx** : Page inscription ✅
- **ForgotPasswordPage.tsx** : Mot de passe oublié ✅
- **ResetPasswordPage.tsx** : Reset mot de passe ✅

---

## 🔙 RESTAURATION

Si vous avez besoin de restaurer ProjectPage :

1. **Consulter** `/pages/archive/misc/ProjectPage.tsx`
2. **Évaluer** si contenu encore pertinent
3. **Adapter** au design system TLS v5.2
4. **Ajouter route** dans App.tsx si nécessaire

**Note** : Le design a beaucoup évolué depuis création (TLS v5.2 glassmorphism).

---

## 📝 NOTES

### Demo Pages
Les pages de démo/sandbox suivantes sont **actives** (utilisées en dev) :
- `SandboxJournalPrompts.tsx` ✅ Dev
- `NotificationSystemDemoPage.tsx` ✅ Demo

Ces pages ne sont **pas archivées** car utilisées pour développement/tests.

---

**📦 Archives Misc Pages TLS**  
**Date** : 23 janvier 2026  
**Fichiers** : 1 confirmé (+ 1 à vérifier)  
**Status** : ProjectPage archivée, PMProLoginPage à vérifier
