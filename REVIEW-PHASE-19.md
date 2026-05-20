# Phase 19 — Review Checklist

Document vivant. Mis à jour après chaque phase (19.1, 19.2, ...). Coche ce que tu as vérifié, signale-moi ce qui cloche.

**Dev server** : http://localhost:5173 (déjà lancé)

---

## 🟢 Phase 19.0 — Notion preliminary sync ✅

### Notion : Design System DB

À vérifier dans la DB [Design System - TLS](https://www.notion.so/thelearningsociety/fc727adea430439bb45590fd908ba134) :

- [ ] **3 nouvelles entries existent et sont Approved + Tailwind ✅** :
  - [FlipCard](https://www.notion.so/366cdd696db6811988e9cfe86c2d1ea5) — Layer patterns, Tone-aware ✅, Has variants ✅
  - [StatusBadge](https://www.notion.so/366cdd696db681e39ea1de11ffdd1b02) — Layer ui (re-export Badge.tsx)
  - [TrendingBadge](https://www.notion.so/366cdd696db68142adc1c414b29f4eb7) — Layer ui (re-export Badge.tsx)

- [ ] **14 doublons marqués Deprecated** avec note `⛔ Doublon — voir entrée canonique …` :
  - GoalProgress, Medal, ProgressRing, JournalEntryCard, LessonCard, MagazineCard, ProjectCard, PromptCard, RankingCard, StepCard, VideoCard, BookingModal, CelebrationModal, VideoPlayerModal
  - Vue [Deprecated](https://www.notion.so/fc727adea430439bb45590fd908ba134?v=ecc12479-c86e-4df2-9b8b-77fb3ecacd89) pour les voir d'un coup.

- [ ] **2 stales DS marquées Deprecated** :
  - [AvatarGroup](https://www.notion.so/35fcdd696db681b4957ee47c5ef709a8) — note "jamais implémenté"
  - [MessageThreadCard](https://www.notion.so/35ecdd696db681e182d2ce44841afe57) — note "fichier supprimé"

### Notion : Écrans DB

À vérifier dans la DB [📱 Écrans Learning App](https://www.notion.so/thelearningsociety/c60f30c775c8473fa15a8446f96142d4) :

- [ ] **5 entries renommées `[STALE]` + Disponible décoché** (à trasher manuellement quand tu valides) :
  - [STALE] VeilleActus, [STALE] VeilleContent, [STALE] VeilleDossiers, [STALE] VeilleTutoriels
  - [STALE] LearningPaths (doublon)
  - → Visible dans la vue "Default view" filtrée sur Disponible=false ou via recherche `[STALE]`

### Docs locaux

- [ ] [`AUDIT-PHASE-19-NOTION-DELTA.md`](AUDIT-PHASE-19-NOTION-DELTA.md) lu — comprendre le delta initial
- [ ] [`AUDIT-PHASE-19.md`](AUDIT-PHASE-19.md) lu — comprendre la matrice scorée 142 pages et la séquence recommandée

---

## 🟢 Phase 19.1 — Foundations (ErrorPage + a11y) ✅ commit [`7adb4ec`](https://github.com/anthropics/...)

### Preview app (manuel)

**URL principale** : http://localhost:5173/components

1. **ErrorPage showcase**
   - [ ] Aller sur http://localhost:5173/components
   - [ ] Chercher "ErrorPage" dans la barre de recherche du showcase (ou scroller jusqu'à section **Feedback > Error & fallback**)
   - [ ] **2 démos visibles** :
     - 404 (tone default) : gradient primary→secondary, suggestions grid 3 tuiles (Dashboard/Parcours/Support), bouton "Retour au tableau de bord"
     - 500 (tone danger) : gradient danger→secondary, eyebrow "Système • Incident", callout diagnostic, 2 boutons (Réessayer + Tableau de bord)
   - [ ] **Hover** sur les tuiles suggestions → border devient primary, légère élévation (translate -1px)
   - [ ] **Tab** sur les tuiles + boutons → outline focus visible (2px primary)
   - [ ] **Mobile** (resize 375px) : tuiles passent en 1 colonne, code reste lisible

2. **Modal close button a11y**
   - [ ] Toujours sur /components, chercher "Modal" et ouvrir une démo (ex. SuccessModal, ConfirmModal)
   - [ ] **Tab** jusqu'au bouton X (close)
   - [ ] **Focus visible** : outline 2px primary autour du X
   - Avant : pas d'outline ; Après : outline visible

3. **Tag remove button a11y**
   - [ ] Chercher "Tag" sur /components, trouver une démo avec X (onRemove)
   - [ ] **Tab** jusqu'au X
   - [ ] **Focus visible** : outline 2px primary autour du X

4. **Vérification globale**
   - [ ] Console DevTools : 0 erreur, 0 warning React
   - [ ] Page Components scrollable normalement (pas de layout cassé par mes changements)

### Notion

- [ ] [Entry ErrorPage créée](https://www.notion.so/366cdd696db681a1adddf475b22a6ceb) :
  - Type : Pattern · Layer : patterns · Migration : Tailwind ✅ · Tone-aware ✅ · Status : Approved
  - Notes mentionne Phase 19.1, usedBy = Error404/Error500 (à mettre à jour Phase 19.2)

### Code (git diff [`7adb4ec`](#))

- [ ] [`src/components/patterns/ErrorPage.tsx`](src/components/patterns/ErrorPage.tsx) — nouveau pattern (~173 LOC)
- [ ] [`src/components/ui/Modal.tsx`](src/components/ui/Modal.tsx:82) — focus-visible ajouté sur close button
- [ ] [`src/components/ui/Tag.tsx`](src/components/ui/Tag.tsx:66) — focus-visible ajouté sur remove button
- [ ] [`src/pages/Components.tsx`](src/pages/Components.tsx) — import ErrorPage + entry showcase
- [ ] [`CLAUDE.md`](CLAUDE.md) — section Phase 19 + convention a11y + liste 25 composites à corriger

### Docs

- [ ] [`AUDIT-PHASE-19.md`](AUDIT-PHASE-19.md) — top 5 flows à attaquer, recommandation séquence
- [ ] [`AUDIT-PHASE-19-NOTION-DELTA.md`](AUDIT-PHASE-19-NOTION-DELTA.md) — rapport delta Notion

---

## 🟢 Phase 19.2 — Error pages refactor + motion + Auth a11y ✅

**Découverte importante** : les 6 pages Auth utilisaient **déjà** AuthShell + sous-composants (audit Tier 2-3 incorrect). Donc 19.2 scope réduit à Error pages + motion + a11y check Auth.

### Preview app (manuel, ~5 min)

**1. Error404 desktop** (animation entrée + magnetic hover)
- 👉 http://localhost:5173/error/404
- [ ] **Eyebrow** "🧭 NAVIGATION PERDUE" apparaît en fade-up
- [ ] **"404"** gros code gradient teal→peach apparaît avec scale 0.85→1
- [ ] **"Oups, page non trouvée"** title fade-up
- [ ] **4 cartes suggestions** apparaissent en stagger (60ms chacune)
- [ ] **Hover sur une carte** → la carte se déplace légèrement vers le curseur (magnetic spring, ~8px max)
- [ ] **Tab** sur les cartes → outline focus 2px primary visible
- [ ] **AmbientBlobs** très subtils en background (3 cercles flous teal/yellow/orange)
- [ ] **Console** DevTools : 0 erreur

**2. Error500 desktop** (tone danger)
- 👉 http://localhost:5173/error/500
- [ ] **Eyebrow** "SYSTÈME • INCIDENT" en danger color
- [ ] **"500"** gradient coral→orange
- [ ] **Icon AlertTriangle** apparaît avec spring + scale + rotation, puis **flotte légèrement en boucle** (~±6px sur 3.2s)
- [ ] **Callout "Diagnostic rapide"** visible avec border accent
- [ ] **2 boutons** "Réessayer" + "Tableau de bord" en bas
- [ ] **Console** : 0 erreur

**3. Mobile 375px**
- 👉 Redimensionne fenêtre à 375px (DevTools mobile)
- [ ] 404 : cartes suggestions passent en 1 colonne, titre reste lisible
- [ ] 500 : layout vertical, boutons stack si pas la place
- [ ] Pas de débordement horizontal

**4. Reduced motion** (a11y critique)
- 👉 macOS : Réglages système > Accessibilité > Affichage > Réduire les animations (ON)
- 👉 Recharge /error/404
- [ ] **Aucune animation entrée** (pas de fade-up, pas de stagger)
- [ ] **Pas de magnetic hover** (carte reste statique au survol)
- [ ] **Pas d'icon float** (500)
- [ ] AmbientBlobs animées CSS (`float` keyframes) — celles-ci ne respectent pas useReducedMotion mais sont juste décoratives et lentes

**5. Auth a11y check** (3 min)
- 👉 http://localhost:5173/auth/login
- [ ] **Tab** dans le formulaire : email → password → "Se souvenir" → "Se connecter"
- [ ] Chaque interactif a un **focus visible** (outline blanc 2px sur fond glass dark)
- [ ] Tous les boutons font ≥ 44px (Cmd+I DevTools → Computed → Height ≥ 48px)
- [ ] Mobile 375px : layout fonctionne

### Notion

**Design System DB**
- [ ] [ErrorPage](https://www.notion.so/366cdd696db681a1adddf475b22a6ceb) — notes mises à jour (motion + animated prop + usedBy)

**Écrans DB** — 8 entries `Statut design: Validé`
- [ ] [Login](https://www.notion.so/35ecdd696db681828d4cf768f8ed90ba)
- [ ] [Signup](https://www.notion.so/35ecdd696db681fbab55fcc4f1311b89)
- [ ] [ForgotPassword](https://www.notion.so/35ecdd696db681d09791ed5ccc2cd62a)
- [ ] [ResetPassword](https://www.notion.so/35ecdd696db681408456c0d0b753ced7)
- [ ] [VerifyEmail](https://www.notion.so/35ecdd696db6814e8560e65b916ab765)
- [ ] [MagicLink](https://www.notion.so/35ecdd696db68165a844c531f3bf02ce)
- [ ] [Error404](https://www.notion.so/35ecdd696db681a39849cc3f67f18b5f)
- [ ] [Error500](https://www.notion.so/35ecdd696db681f08ed7dfaa15aa9bb9)

### Code

- [ ] [`src/components/patterns/ErrorPage.tsx`](src/components/patterns/ErrorPage.tsx) — étendu avec framer-motion + prop `animated` + `SuggestionCard` magnetic + variants
- [ ] [`src/pages/Error404.tsx`](src/pages/Error404.tsx) — réduit de 98 → 60 LOC, utilise ErrorPage tone=default animated=expressive
- [ ] [`src/pages/Error500.tsx`](src/pages/Error500.tsx) — réduit de 70 → 47 LOC, utilise ErrorPage tone=danger animated=expressive

### Score audit après 19.2

| Page | Avant | Après | Δ |
|------|------:|------:|---|
| Error404 | 2.4 | ~4.6 | +2.2 |
| Error500 | 2.4 | ~4.6 | +2.2 |
| Login | (audit incorrect → 2.4) | ~4.4 | re-baseline |
| Signup | (audit incorrect → 2.6) | ~4.4 | re-baseline |
| Forgot/Reset/Verify/MagicLink | (audit incorrect → 2.4-2.6) | ~4.4 | re-baseline |

---

### Patch 19.2.1 — Hover border tone-matched icon (ErrorPage SuggestionCard)

- [ ] **http://localhost:5173/error/404** — hover sur chaque carte :
  - "Tableau de bord" (icône teal) → border **primary** au hover
  - "Parcours disponibles" (icône jaune) → border **accent (jaune)** au hover ✅
  - "Veille & Ressources" (icône orange) → border **secondary (orange)** au hover ✅
  - "Support & Questions" (icône teal) → border **primary** au hover
- [ ] Le shadow au hover match aussi (shadow-sun-sm / shadow-warm-sm / shadow-brand-sm)
- **Note** : la Card DS (`src/components/core/Card.tsx`) avait **déjà** ce comportement via `TONE_INTERACTIVE_HOVER` quand utilisée avec `variant="interactive"` + `tone`. C'est SuggestionCard du pattern ErrorPage qui n'en bénéficiait pas (custom motion.button). Maintenant aligné.

---

## 🔜 Phase 19.3 — Onboarding flow (à venir)

**Scope prévu** :
- Aligner Onboarding/Questionnaire/Tutorial/Success/Positionnement sur un pattern de progression cohérent
- Identifier le Stepper canonique ou créer si manquant
- ProgressDots / Stepper unifié sur les 5 écrans

---

## Comment utiliser ce doc

**Après chaque phase**, je :
1. Mets à jour ce fichier avec une nouvelle section `## 🟢 Phase 19.X — [titre]`
2. Liste les **points concrets à vérifier** : preview URL, élément précis à inspecter, comportement attendu
3. Liste les **liens Notion** (entries DB modifiées/créées)
4. Liste les **fichiers code** modifiés (avec ligne précise quand pertinent)

**Toi tu** :
1. Coches au fur et à mesure
2. M'indiques tout problème via "🔴 [phase] — [item] : [description]"
3. Valides la phase pour qu'on enchaîne sur la suivante

**Niveau d'effort** : ~5-10 min par phase pour le review utilisateur.

---

## Conventions checklist

- [ ] = à faire / à vérifier
- ✅ = item validé
- 🔴 = problème détecté
- 🟡 = mineur / cosmétique
- 🟢 = OK
