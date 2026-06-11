# ✅ CHECKLIST DE NETTOYAGE DES GRADIENTS

**Date de démarrage :** _____________  
**Responsable :** _____________  
**Statut :** ⚠️ En attente

---

## 📋 PHASE 1 : PRÉPARATION (Lecture seule)

- [ ] **1.1** Lire le rapport complet `/GRADIENT-AUDIT-REPORT.md`
- [ ] **1.2** Valider la whitelist (14 gradients) avec l'équipe design
- [ ] **1.3** Ouvrir le CSV `/gradient-audit-table.csv` pour référence rapide
- [ ] **1.4** Créer une branche Git : `git checkout -b cleanup/gradients-whitelist`
- [ ] **1.5** Créer un backup manuel : `cp -r styles/ styles-backup/`

---

## 📋 PHASE 2 : ARCHIVAGE (Aucune modification de code)

### 2.1 Créer le fichier d'archive

- [ ] **2.1.1** Créer le dossier : `mkdir -p archive/css`
- [ ] **2.1.2** Créer le fichier : `touch archive/css/gradients-legacy.css`
- [ ] **2.1.3** Copier le header suivant :

```css
/* ========================================
   GRADIENTS ARCHIVÉS — THE LEARNING SOCIETY
   Ces gradients ne sont plus utilisés dans l'app.
   Conservés ici pour référence historique uniquement.
   NE PAS IMPORTER dans globals.css
   Date d'archivage : 11 avril 2026
   ======================================== */
```

### 2.2 Copier les gradients inutilisés

**Total : 68 gradients à archiver**

- [ ] **2.2.1** Copier **Multi-Shades (15 gradients)** depuis `globals.css` lignes ~435-453
  - [ ] primary-spectrum, primary-depth, primary-soft, primary-medium, primary-dark
  - [ ] secondary-spectrum, secondary-depth, secondary-soft, secondary-medium, secondary-vibrant
  - [ ] accent-spectrum, accent-depth, accent-soft, accent-medium, accent-rich

- [ ] **2.2.2** Copier **Legacy (8 gradients)** lignes ~427-432
  - [ ] cool, sunset, ocean, fire
  - [ ] primary-glass, primary-metallic
  - [ ] secondary-light, accent-light

- [ ] **2.2.3** Copier **TLS Directionnels (8 gradients)** lignes ~458-475
  - [ ] hero-tls, tls-full, tls-full-reverse
  - [ ] tls-vertical, tls-vertical-reverse
  - [ ] tls-diagonal, tls-diagonal-reverse
  - [ ] tls-hover

- [ ] **2.2.4** Copier **TLS Radial (2 gradients)** lignes ~477-479
  - [ ] tls-radial, tls-radial-reverse

- [ ] **2.2.5** Copier **TLS Transparent/Glass (6 gradients)** lignes ~481-489
  - [ ] tls-soft, tls-soft-light
  - [ ] tls-glass, tls-glass-warm
  - [ ] tls-overlay, tls-overlay-strong

- [ ] **2.2.6** Copier **TLS Subtle/Mesh (3 gradients)** lignes ~491-498
  - [ ] tls-subtle-reverse
  - [ ] tls-mesh (mesh complexe)
  - [ ] gradient-tls-text-warm, gradient-tls-text-hero

- [ ] **2.2.7** Copier **Background Subtle (4 gradients)** lignes ~508-511
  - [ ] bg-gradient-primary-subtle
  - [ ] bg-gradient-secondary-subtle
  - [ ] bg-gradient-accent-subtle
  - [ ] bg-gradient-neutral-subtle

- [ ] **2.2.8** Copier **Mesh Gradients (2 gradients)** lignes ~513-522
  - [ ] gradient-mesh-primary
  - [ ] gradient-mesh-warm

- [ ] **2.2.9** Copier **Circular Legacy (1 gradient)** ligne ~525
  - [ ] gradient-circular

- [ ] **2.2.10** Copier **Auth Blobs (3 gradients)** lignes ~531-542
  - [ ] auth-bg-gradient
  - [ ] auth-blob-primary
  - [ ] auth-blob-secondary

- [ ] **2.2.11** Copier **Variations Palettes TLS (15 gradients)** lignes ~550-571
  - [ ] primary-peach, primary-deep
  - [ ] secondary-peach, secondary-sunset, secondary-amber
  - [ ] accent-sunshine, accent-gold, accent-honey
  - [ ] blue-orange-soft, blue-yellow-soft, blue-blend

- [ ] **2.2.12** Sauvegarder `archive/css/gradients-legacy.css`

---

## 📋 PHASE 3 : CRÉATION DE LA WHITELIST

### 3.1 Créer le nouveau fichier gradients

- [ ] **3.1.1** Créer le fichier : `touch styles/gradients.css`
- [ ] **3.1.2** Copier le contenu de la whitelist (voir `/GRADIENT-AUDIT-REPORT.md` section "Étape 3")
- [ ] **3.1.3** Vérifier que les 14 gradients sont présents :
  - [ ] gradient-primary
  - [ ] gradient-secondary
  - [ ] gradient-warm
  - [ ] gradient-accent (**À AJOUTER**)
  - [ ] gradient-success
  - [ ] gradient-brand
  - [ ] gradient-warning
  - [ ] gradient-destructive
  - [ ] gradient-info
  - [ ] gradient-tls-text
  - [ ] gradient-tls-text-cool
  - [ ] gradient-tls-text-hero-light
  - [ ] gradient-circular-tls
  - [ ] gradient-tls
  - [ ] gradient-tls-subtle

- [ ] **3.1.4** **BONUS DECORATIVE** (optionnel) :
  - [ ] gradient-primary-radial
  - [ ] gradient-secondary-radial
  - [ ] gradient-accent-warm

- [ ] **3.1.5** Sauvegarder `styles/gradients.css`

### 3.2 Ajouter gradient-accent manquant

- [ ] **3.2.1** Dans `styles/gradients.css`, ajouter après `gradient-warm` :

```css
/* Accent Yellow — Boutons accent, icônes */
--gradient-accent: linear-gradient(135deg, #FFD791 0%, #F8B044 100%);
```

- [ ] **3.2.2** Sauvegarder le fichier

---

## 📋 PHASE 4 : NETTOYAGE DE globals.css

### 4.1 Backup et import

- [ ] **4.1.1** Ouvrir `styles/globals.css`
- [ ] **4.1.2** À la ligne ~406 (avant `/* ========== GRADIENTS ========== */`), ajouter :

```css
/* ========================================
   GRADIENTS
   Import depuis fichier séparé
   ======================================== */
@import './gradients.css';
```

- [ ] **4.1.3** Sauvegarder

### 4.2 Supprimer les sections inutilisées

⚠️ **ATTENTION : Cette étape est irréversible. Assurez-vous d'avoir archivé.**

- [ ] **4.2.1** Supprimer **CLASSIQUES** (lignes ~408-433) — SAUF :
  - [ ] **GARDER** : gradient-primary
  - [ ] **GARDER** : gradient-secondary
  - [ ] **GARDER** : gradient-warm
  - [ ] **SUPPRIMER** : cool, sunset, ocean, fire
  - [ ] **SUPPRIMER** : primary-glass, primary-metallic, secondary-light, accent-light

- [ ] **4.2.2** Supprimer **Multi-Shades** (lignes ~435-453) — TOUT

- [ ] **4.2.3** Supprimer **TLS v5.2** (lignes ~455-498) — SAUF :
  - [ ] **GARDER** : gradient-circular-tls
  - [ ] **GARDER** : gradient-tls
  - [ ] **GARDER** : gradient-tls-subtle
  - [ ] **GARDER** : gradient-tls-text
  - [ ] **GARDER** : gradient-tls-text-cool
  - [ ] **GARDER** : gradient-tls-text-hero-light
  - [ ] **SUPPRIMER** : TOUS les autres (directionnels, radial, glass, overlay, mesh)

- [ ] **4.2.4** Supprimer **Text & UI Elements** (lignes ~500-505) — SAUF :
  - [ ] **GARDER** : gradient-tls-text
  - [ ] **GARDER** : gradient-tls-text-cool
  - [ ] **GARDER** : gradient-tls-text-hero-light
  - [ ] **SUPPRIMER** : gradient-tls-text-warm, gradient-tls-text-hero

- [ ] **4.2.5** Supprimer **Background Gradients (Subtle)** (lignes ~508-511) — TOUT

- [ ] **4.2.6** Supprimer **Mesh Gradients** (lignes ~513-522) — TOUT

- [ ] **4.2.7** Supprimer **Circular Gradient (legacy)** (ligne ~525) — TOUT

- [ ] **4.2.8** Supprimer **Authentication Pages Background** (lignes ~527-542) — SAUF :
  - [ ] **GARDER** : auth-bg-gradient (renommer en gradient-circular-tls si doublon)
  - [ ] **SUPPRIMER** : auth-blob-primary, auth-blob-secondary

- [ ] **4.2.9** GARDER **Semantic Gradients** (lignes ~544-548) :
  - [ ] gradient-success
  - [ ] gradient-destructive (note : actuellement utilise couleurs primaires, à vérifier)
  - [ ] gradient-warning
  - [ ] gradient-info

- [ ] **4.2.10** Supprimer **NOUVEAUX GRADIENTS - Variations Palettes TLS** (lignes ~550-571) — TOUT

- [ ] **4.2.11** Sauvegarder `styles/globals.css`

---

## 📋 PHASE 5 : CONSOLIDATION DES DOUBLONS

### 5.1 Remplacer gradient-primary-ocean

- [ ] **5.1.1** Ouvrir `/components/DashboardHeroV2Fixed.tsx`
- [ ] **5.1.2** Ligne ~414, remplacer :

```tsx
// AVANT
background: 'var(--gradient-primary-ocean)'

// APRÈS
background: 'var(--gradient-success)'
```

- [ ] **5.1.3** Sauvegarder

### 5.2 Remplacer gradient-primary-sky

- [ ] **5.2.1** Ouvrir `/components/modals/SuccessModal.tsx`
- [ ] **5.2.2** Ligne ~81, remplacer :

```tsx
// AVANT
background: 'var(--gradient-primary-sky)'

// APRÈS
background: 'linear-gradient(135deg, rgba(232, 244, 247, 0.1) 0%, rgba(150, 195, 207, 0.08) 100%)'
```

- [ ] **5.2.3** Sauvegarder

### 5.3 Vérifier gradient-accent-radial

- [ ] **5.3.1** Rechercher usage : `grep -r "gradient-accent-radial" .`
- [ ] **5.3.2** Si 1 seul usage (imports Figma), remplacer par inline ou archiver
- [ ] **5.3.3** Documenter la décision

---

## 📋 PHASE 6 : MISE À JOUR DES PAGES SHOWCASE

### 6.1 Mettre à jour TLSDesignSystemKit.tsx

- [ ] **6.1.1** Ouvrir `/pages/TLSDesignSystemKit.tsx`
- [ ] **6.1.2** Ligne ~1261-1266, mettre à jour la liste des gradients pour afficher UNIQUEMENT la whitelist
- [ ] **6.1.3** Supprimer les exemples de gradients archivés
- [ ] **6.1.4** Ajouter note : "14 gradients autorisés (whitelist stricte)"
- [ ] **6.1.5** Sauvegarder

### 6.2 Mettre à jour DesignSystemRealPage.tsx

- [ ] **6.2.1** Ouvrir `/pages/DesignSystemRealPage.tsx`
- [ ] **6.2.2** Ligne ~1870-1874, vérifier que seuls les semantic gradients sont affichés
- [ ] **6.2.3** Ligne ~1928-1929, décider si garder radial showcase ou supprimer
- [ ] **6.2.4** Sauvegarder

### 6.3 Mettre à jour TLSColorsShowcase.tsx

- [ ] **6.3.1** Ouvrir `/components/design-system/TLSColorsShowcase.tsx`
- [ ] **6.3.2** Ligne ~327-332, mettre à jour la liste des gradients showcase
- [ ] **6.3.3** Garder uniquement : primary, secondary, warm, brand, tls
- [ ] **6.3.4** Supprimer : tls-horizontal (ou garder si showcase voulu)
- [ ] **6.3.5** Sauvegarder

### 6.4 Vérifier imports Figma

- [ ] **6.4.1** Ouvrir `/imports/DesignSystemTls.tsx`
- [ ] **6.4.2** Vérifier lignes ~456, 491, 526, 561, 596, 631, 666, 701, 736, 771
- [ ] **6.4.3** Décider si garder les références ou les remplacer
- [ ] **6.4.4** Documenter la décision

---

## 📋 PHASE 7 : TESTS DE NON-RÉGRESSION

### 7.1 Tests visuels pages principales

- [ ] **7.1.1** Tester **Dashboard** (`/dashboard`)
  - [ ] Hero section affiche gradient texte
  - [ ] Progress bars affichent gradients
  - [ ] Boutons affichent gradients

- [ ] **7.1.2** Tester **Pages Auth** (`/login`, `/signup`, `/reset-password`, `/forgot-password`)
  - [ ] Background affiche `gradient-circular-tls`

- [ ] **7.1.3** Tester **Coaching** (`/coaching`)
  - [ ] Cards affichent gradients
  - [ ] Boutons affichent gradients

- [ ] **7.1.4** Tester **Profile** (`/profile`)
  - [ ] Avatar affiche gradient-secondary
  - [ ] Progress bars affichent gradients

- [ ] **7.1.5** Tester **Modals**
  - [ ] Success modal → gradient-success
  - [ ] Warning modal → gradient-warning
  - [ ] Destructive modal → gradient-destructive
  - [ ] Info modal → gradient-info

- [ ] **7.1.6** Tester **Design System Kit** (`/design-system-kit`)
  - [ ] Section gradients affiche 14 gradients whitelist
  - [ ] Aucun gradient cassé (blanc ou vide)

- [ ] **7.1.7** Tester **Magazine** (`/magazine`)
  - [ ] Background affiche `gradient-tls-subtle`
  - [ ] Titres affichent gradients texte

- [ ] **7.1.8** Tester **Veille** (`/veille`)
  - [ ] Background affiche `gradient-tls-subtle`

### 7.2 Tests console

- [ ] **7.2.1** Ouvrir DevTools → Console
- [ ] **7.2.2** Vérifier aucune erreur CSS `var(--gradient-xxx) undefined`
- [ ] **7.2.3** Vérifier aucun warning de gradient manquant

### 7.3 Tests build

- [ ] **7.3.1** Build de production : `npm run build`
- [ ] **7.3.2** Vérifier aucune erreur de build
- [ ] **7.3.3** Lancer preview : `npm run preview`
- [ ] **7.3.4** Tester visuellement toutes les pages

---

## 📋 PHASE 8 : DOCUMENTATION ET COMMUNICATION

### 8.1 Mettre à jour la documentation

- [ ] **8.1.1** Créer `/docs/GRADIENTS-WHITELIST.md` avec la whitelist finale
- [ ] **8.1.2** Ajouter règles strictes (où autorisé, où interdit)
- [ ] **8.1.3** Ajouter exemples d'usage pour chaque gradient
- [ ] **8.1.4** Ajouter section "Migration depuis ancien système"

### 8.2 Mettre à jour le CHANGELOG

- [ ] **8.2.1** Ouvrir `/CHANGELOG.md`
- [ ] **8.2.2** Ajouter section :

```markdown
## [Version X.X.X] - 11 avril 2026

### 🎨 Design System - Gradients Cleanup

**BREAKING CHANGES:**
- Nettoyage des gradients : 90+ gradients → 14 gradients whitelist stricte
- 68 gradients archivés dans `/archive/css/gradients-legacy.css`
- Nouveau fichier `/styles/gradients.css` avec whitelist uniquement

**Gradients conservés (14) :**
- UI Primitives (5) : primary, secondary, warm, accent, brand
- Semantic (4) : success, warning, destructive, info
- Text Only (3) : tls-text, tls-text-cool, tls-text-hero-light
- Backgrounds (2) : circular-tls, tls, tls-subtle

**Gradients consolidés :**
- `gradient-primary-ocean` → `gradient-success`
- `gradient-primary-sky` → inline gradient
- `auth-bg-gradient` → `gradient-circular-tls`

**Migration :**
Consulter `/GRADIENT-AUDIT-REPORT.md` pour détails complets.
```

- [ ] **8.2.3** Sauvegarder

### 8.3 Communiquer à l'équipe

- [ ] **8.3.1** Préparer message Slack/Email avec :
  - [ ] Lien vers `/GRADIENT-AUDIT-REPORT.md`
  - [ ] Lien vers `/GRADIENTS-WHITELIST.md`
  - [ ] Résumé : 14 gradients autorisés
  - [ ] Règles strictes résumées
  - [ ] Date d'entrée en vigueur

- [ ] **8.3.2** Organiser démo rapide (10 min) pour l'équipe dev

- [ ] **8.3.3** Mettre à jour le guide onboarding

---

## 📋 PHASE 9 : FINALISATION

### 9.1 Git commit

- [ ] **9.1.1** Vérifier les fichiers modifiés : `git status`
- [ ] **9.1.2** Ajouter les fichiers :

```bash
git add styles/gradients.css
git add styles/globals.css
git add archive/css/gradients-legacy.css
git add components/DashboardHeroV2Fixed.tsx
git add components/modals/SuccessModal.tsx
git add pages/TLSDesignSystemKit.tsx
git add pages/DesignSystemRealPage.tsx
git add components/design-system/TLSColorsShowcase.tsx
git add GRADIENT-AUDIT-REPORT.md
git add gradient-audit-table.csv
git add GRADIENT-CLEANUP-CHECKLIST.md
git add CHANGELOG.md
git add docs/GRADIENTS-WHITELIST.md
```

- [ ] **9.1.3** Commit :

```bash
git commit -m "feat(design-system): gradients whitelist cleanup

- Nettoyage 90+ gradients → 14 gradients whitelist stricte
- Archivage 68 gradients inutilisés dans /archive/css/gradients-legacy.css
- Création /styles/gradients.css avec whitelist uniquement
- Ajout gradient-accent manquant
- Consolidation doublons (primary-ocean, primary-sky)
- Mise à jour pages showcase (TLSDesignSystemKit, DesignSystemRealPage)
- Documentation complète audit + whitelist

BREAKING CHANGE: 68 gradients supprimés de globals.css.
Consulter /GRADIENT-AUDIT-REPORT.md pour migration.
"
```

- [ ] **9.1.4** Push : `git push origin cleanup/gradients-whitelist`

### 9.2 Pull Request

- [ ] **9.2.1** Créer PR sur GitHub/GitLab
- [ ] **9.2.2** Titre : `feat(design-system): Gradients whitelist cleanup (90+ → 14)`
- [ ] **9.2.3** Description : Copier résumé du CHANGELOG
- [ ] **9.2.4** Assigner reviewers
- [ ] **9.2.5** Lier issue/ticket si existant

### 9.3 Code Review

- [ ] **9.3.1** Attendre approbation reviewers
- [ ] **9.3.2** Résoudre commentaires si nécessaire
- [ ] **9.3.3** Merge PR

### 9.4 Deploy

- [ ] **9.4.1** Déployer sur environnement staging
- [ ] **9.4.2** Tests visuels complets
- [ ] **9.4.3** Valider avec QA/Design
- [ ] **9.4.4** Déployer production

---

## 📋 PHASE 10 : POST-DÉPLOIEMENT

### 10.1 Monitoring

- [ ] **10.1.1** Vérifier aucune erreur Sentry/LogRocket
- [ ] **10.1.2** Vérifier métriques de performance (bundle size)
- [ ] **10.1.3** Vérifier feedback utilisateurs (support tickets)

### 10.2 Nettoyage final

- [ ] **10.2.1** Supprimer backup manuel : `rm -rf styles-backup/`
- [ ] **10.2.2** Archiver branche : `git branch -d cleanup/gradients-whitelist`

### 10.3 Célébration 🎉

- [ ] **10.3.1** Partager succès avec l'équipe
- [ ] **10.3.2** Documenter retour d'expérience
- [ ] **10.3.3** Planifier prochaines optimisations

---

## ✅ CHECKLIST FINALE

**Total tâches :** ~120 étapes  
**Estimation temps :** 4-6 heures  
**Difficulté :** ⭐⭐⭐ (Moyenne)

**Résultat attendu :**
- ✅ 14 gradients whitelist stricte
- ✅ 68 gradients archivés (récupérables)
- ✅ Code plus maintenable
- ✅ Bundle size réduit
- ✅ Documentation complète
- ✅ Équipe formée

**Date de complétion :** _____________  
**Validé par :** _____________

---

**🎯 Bon courage et bon cleanup !**
