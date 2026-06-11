# Phase 19 — Notion ↔ Code Delta Audit

**Date** : 2026-05-20
**Scope** : Préparation d'une sync préliminaire des deux DBs Notion avec le code state actuel (Phase 19 starting).
**Mode** : READ-ONLY — aucune modification Notion effectuée.

---

## Headline counts

| | Code | Notion |
|---|---:|---:|
| **Design System** (composants + patterns, hors tokens) | 132 fichiers DS | ~116 entrées uniques (130 brutes, 14 doublons) |
| **Écrans** (pages FO + marketing) | 161 fichiers `.tsx` | 145 entrées |

- **Design System DB** : 14 doublons d'item, 3 entrées vraiment manquantes côté Notion, 4 entrées stale côté Notion, 11 composants `showcaseOnly: true` (tous présents dans Notion).
- **Écrans DB** : 1 doublon (LearningPaths), 0 page FO manquante, 18 pages marketing manquantes, 4 entrées Veille stale, 4 route mismatches (mêmes 4), Phase 17 wiring ✅ 6/6.

---

## Design System DB

### Doublons (14 items, à fusionner)

Tous les doublons suivent le même schéma : une **vieille entrée** créée fin avril (URL préfixée `35ec...`) marquée souvent `Backlog`/`Partiel`, et une **entrée canonique** plus récente (URL `361c...`) marquée `Approved`/`Tailwind ✅`. Pour chaque doublon, la deuxième URL listée est celle à archiver/supprimer.

| Item | Garder | Archiver |
|---|---|---|
| GoalProgress | https://www.notion.so/361cdd696db6817bab54f79e26a7a77d (Approved / Tailwind ✅) | https://www.notion.so/35ecdd696db681f0b182f86309922398 (Partiel) |
| Medal | https://www.notion.so/361cdd696db681afa9e7e1060f72bb78 | https://www.notion.so/35ecdd696db6817aa603df5fce2e077d |
| ProgressRing | https://www.notion.so/361cdd696db68198a203d3fd2733d484 | https://www.notion.so/35ecdd696db681599163e3097a147cd8 |
| JournalEntryCard | https://www.notion.so/361cdd696db681f3a44df43ad809d82c | https://www.notion.so/35ecdd696db681119145d4afe3cfc60b |
| LessonCard | https://www.notion.so/361cdd696db681e9a740fc7ab39e0954 | https://www.notion.so/35ecdd696db681f0a931f6350529155f |
| MagazineCard | https://www.notion.so/361cdd696db681af8bcccad5e0ce05da | https://www.notion.so/35ecdd696db68176a449ee1b6dbacd7f (déjà Deprecated) |
| ProjectCard | https://www.notion.so/361cdd696db681dfa06acdaee204c3e6 | https://www.notion.so/35ecdd696db681bea6d2d72a6927cc91 |
| PromptCard | https://www.notion.so/361cdd696db6810a9c7ef01c128d4c19 | https://www.notion.so/35ecdd696db6815fbf08c00491363e1e |
| RankingCard | https://www.notion.so/361cdd696db681529ec0f8685f5d58dd | https://www.notion.so/35ecdd696db68161ba57fd455c16ed64 |
| StepCard | https://www.notion.so/361cdd696db6813792c4cdcc850e0a84 | https://www.notion.so/35ecdd696db681deb5bad464f65b4b4d |
| VideoCard | https://www.notion.so/361cdd696db68151aa86dcb03faa1af9 | https://www.notion.so/35ecdd696db681f38892cc23c942165f (déjà Deprecated) |
| BookingModal | https://www.notion.so/361cdd696db68106ad5df09a660eec26 | https://www.notion.so/35ecdd696db68137a887c9fc025893b3 |
| CelebrationModal | https://www.notion.so/361cdd696db6813e979bdcec6dd3188e | https://www.notion.so/35ecdd696db6819bb8d6f3fddb44a3ec |
| VideoPlayerModal | https://www.notion.so/361cdd696db6816c9114e4781bec2bf4 | https://www.notion.so/35ecdd696db68136bb3de74966fdf662 |

### Missing in Notion (3, à créer)

Code présent, aucune entrée Notion correspondante :

| Item | Code path | Notes |
|---|---|---|
| **FlipCard** | `src/components/patterns/FlipCard.tsx` | Pattern card flip animation. Apparaît dans Components.tsx showcase ligne 5066. |
| **StatusBadge** | `src/components/ui/StatusBadge.tsx` | Thin re-export depuis Badge.tsx (cf. CLAUDE.md). Mentionné indirectement dans entrée `Badge`, mais n'a pas d'entrée propre alors qu'il a son fichier dédié et est consommé par lessons. |
| **TrendingBadge** | `src/components/ui/TrendingBadge.tsx` | Idem — re-export depuis Badge.tsx, mais fichier dédié et usage indépendant. |

→ Soit créer 3 entrées dédiées, soit annoter l'entrée canonique `Badge` pour clarifier qu'elle couvre les 3 exports (`Badge`, `StatusBadge`, `TrendingBadge`) ; idem pour FlipCard, mais lui est vraiment standalone.

### Stale in Notion (4, à supprimer ou Deprecated)

| Item | Statut Notion | Constat code | Action |
|---|---|---|---|
| **AvatarGroup** | Backlog / Tailwind ✅ | `grep AvatarGroup src/` → 0 hit. Pas dans Avatar.tsx ni ailleurs. | Supprimer (n'a jamais été implémenté) — https://www.notion.so/35fcdd696db681b4957ee47c5ef709a8 |
| **FloatingNavButton** | Approved / Tailwind ✅ | Existe à `src/components/FloatingNavButton.tsx` mais c'est utilitaire (overlay nav), pas un composant DS partagé. À mon avis OK de garder, mais doublonne mon comptage. | Garder, OK — https://www.notion.so/35ecdd696db681418604e14b78efb002 |
| **MessageThreadCard** | Deprecated / Partiel | Aucun fichier `MessageThreadCard.tsx`. Probablement supprimé. | Supprimer ou laisser Deprecated — https://www.notion.so/35ecdd696db681e182d2ce44841afe57 |
| **NavItem** | Backlog / Partiel | Exporté depuis `Sidebar.tsx`, pas de fichier standalone. Convention OK mais Notion devrait pointer le bon code path. | Mettre à jour notes ("exporté depuis Sidebar.tsx") — https://www.notion.so/35ecdd696db681c18e24c5afe73d01cb |

### Status incoherence (Tailwind ✅ + Notes "Partiel")

Spot-check des entrées marquées Tailwind ✅ mais dont les notes ou statuts BEM laissent un doute :

- **JournalEntryCard, NotificationCard** : Notion `Migration status = Partiel` mais le code dit en commentaire `100% Tailwind + DS tokens` (header doc-block). → Mettre à jour Migration status sur la version canonique.
- **Sidebar, NavItem, AccountFamilyNav, ActionCardGrid, ActivityTimeline, AuthShell, DataTable, HeaderNav, MultiStepForm, TabsWithContent** : tous marqués `Partiel` côté patterns view, alors qu'aucune classe BEM `.tls-*` n'a été trouvée via `grep -rn` dans ces fichiers. → Audit ciblé requis avant de basculer en `Tailwind ✅`.

### showcaseOnly orphans (11 composants, pas 9)

`grep "showcaseOnly: true"` retourne 11 hits dans `Components.tsx` (et non 9 comme indiqué dans le prompt). Liste :

1. CompetenceBadge
2. MasteryBadge
3. Modal
4. CelebrationModal
5. MetaItem
6. UserInfo
7. CourseCard
8. NotificationBadge
9. SkillBar
10. PageHeader
11. MultiStepForm

**Cross-ref Notion** : les 11 ont tous une entrée dans la DB Design System. **Aucun orphan complet**. Cependant, plusieurs incohérences statut :
- `PageHeader` est marqué `Approved / Tailwind ✅` dans Notion (patterns view) mais reste flagué `showcaseOnly: true` côté code → indique soit qu'il n'est plus utilisé hors showcase (à vérifier — l'usedBy mentionne pourtant 14 pages), soit qu'on a oublié de retirer le flag. **À investiguer.**
- `MultiStepForm` (Notion: Backlog / Partiel) cohérent avec showcaseOnly.
- `Modal`, `CelebrationModal` : tous deux marqués `Approved / Tailwind ✅` dans Notion mais `showcaseOnly` côté code → idem PageHeader, drift entre Components.tsx et usage réel.

---

## Écrans DB

### Missing in Notion (0 FO, 18 marketing)

**Pages FO** : aucune (couverture 100% des pages applicatives).

**Pages marketing** : 18 entrées manquantes — la DB Écrans n'inclut pas les pages marketing du site public. Liste :

```
MarketingAccompagnement, MarketingArticleDetail, MarketingContact, MarketingEquipe,
MarketingFooter, MarketingFormation, MarketingHeader, MarketingHome,
MarketingHomeA, MarketingHomeB, MarketingHomeC, MarketingLayout,
MarketingLearningApp, MarketingLegal, MarketingMagazine, MarketingMethode,
MarketingMotionLab, MarketingTemoignages
```

→ **Décision attendue** : étend-on la DB Écrans aux pages marketing, ou crée-t-on une DB séparée "Site Marketing" ? (Le Flow `🌐 Site marketing` n'existe pas actuellement dans les 12 options Flow disponibles.)

### Stale in Notion (4 entrées Veille sans code)

Quatre entrées Veille pointent vers des routes qui n'existent **pas** dans `App.tsx` et n'ont **pas** de fichier `.tsx` correspondant. Ce sont probablement des reliques d'une refonte Veille antérieure :

| Notion item | Route Notion | Fichier code | Action |
|---|---|---|---|
| **VeilleActus** | `/veille/actus` | absent | Supprimer ou pointer vers le hub Veille `/veille` |
| **VeilleContent** | `/veille/content` | absent | Supprimer |
| **VeilleDossiers** | `/veille/dossiers` | absent | Supprimer (les dossiers sont maintenant `/veille/dossier/:id`) |
| **VeilleTutoriels** | `/veille/tutoriels` | absent | Supprimer (les tutos sont maintenant `/veille/video-tutorial/:id`) |

### Route mismatches (4 — identiques aux entrées stale ci-dessus)

Les 4 routes Notion absentes d'App.tsx correspondent exactement aux 4 entrées stale ci-dessus. Aucun autre mismatch après normalisation des paramètres (`:id`, `:step`, etc.).

### Duplicates (1)

**LearningPaths** apparaît deux fois avec la même route `/learning-paths` :
- https://www.notion.so/35ecdd696db681b7a52edbb1e1f14a79 — Statut design `Intégré` (entrée canonique récente)
- https://www.notion.so/35ecdd696db6819fa646ed8db4356221 — Statut design `À faire` (vieille entrée à supprimer)

### Phase 17 wiring (✅ 6/6)

Toutes les pages câblées en Phase 17 sont marquées `Statut design = Validé` :

| Page | Statut design | URL |
|---|---|---|
| CorrectionDetailLearner | ✅ Validé | https://www.notion.so/360cdd696db681e19042c876b301f560 |
| CoachEnterpriseDashboard | ✅ Validé | https://www.notion.so/360cdd696db681acaa87c66702b454bf |
| PurchaseCredits | ✅ Validé | https://www.notion.so/360cdd696db681aba3c1ff721d886e54 |
| MessagingThread | ✅ Validé | https://www.notion.so/360cdd696db6811db9c6feb8c704843f |
| PrivacyDeleteAccount | ✅ Validé | https://www.notion.so/360cdd696db681efb825d500eb18c1dc |
| PrivacyDsar | ✅ Validé | https://www.notion.so/360cdd696db68123859ad7cb0ba50dc7 |

→ **Rien à corriger sur Phase 17.** Le statut "Validé" reflète bien le wiring Zustand documenté dans CLAUDE.md §Phase 17.

---

## Summary & Recommended Actions

### Stats globales
- **DS DB** : 130 entrées brutes → 116 uniques. Après nettoyage attendu : ~117 (3 à créer, 14 doublons à fusionner, 3 stale à archiver). Code : 132 composants DS.
- **Écrans DB** : 145 entrées → 144 après dedup LearningPaths. 4 entrées Veille à supprimer. Code : 161 pages dont 143 FO/util + 18 marketing.

### Actions recommandées (par impact, sans en exécuter aucune)

1. **[HIGH] Fusionner 14 doublons DS** — chaque ligne de la table "Doublons" indique l'entrée à archiver (vieille URL `35ec...`) et celle à conserver (récente `361c...`). Aucun risque de perte d'info car les notes des entrées récentes sont déjà plus complètes.

2. **[HIGH] Créer 3 entrées DS manquantes** : `FlipCard`, `StatusBadge`, `TrendingBadge`. Layer : `patterns`, `ui`, `ui`. Migration status : `Tailwind ✅` (vérifié dans le code). Source : `Claude Code (local)`. Notes : pour Status/TrendingBadge, préciser "thin re-export depuis Badge.tsx (cf. CLAUDE.md)".

3. **[HIGH] Supprimer 4 entrées Écrans Veille stale** : `VeilleActus`, `VeilleContent`, `VeilleDossiers`, `VeilleTutoriels`. Aucune route correspondante ni fichier de page.

4. **[MEDIUM] Supprimer/archiver doublon LearningPaths** : conserver `35ecdd696db681b7a52edbb1e1f14a79` (Intégré), supprimer `35ecdd696db6819fa646ed8db4356221` (À faire — fantôme).

5. **[MEDIUM] Mettre à jour Migration status sur ~10 entrées patterns marquées Partiel à tort** : AccountFamilyNav, ActionCardGrid, ActivityTimeline, AuthShell, DataTable, HeaderNav, MultiStepForm, TabsWithContent, JournalEntryCard (doublon), NotificationCard. Vérifier par grep `tls-` dans chaque fichier avant de basculer Tailwind ✅.

6. **[MEDIUM] Décider du périmètre marketing dans Écrans DB** : soit créer 18 entrées (avec un nouveau Flow `🌐 Site marketing`), soit créer une DB séparée. À discuter — actuellement le coverage app FO est 100%, seul le marketing est hors scope.

7. **[LOW] Archiver 2 entrées DS stale** : `AvatarGroup` (jamais implémenté), `MessageThreadCard` (déjà Deprecated, à supprimer). Garder `FloatingNavButton` et `NavItem` mais mettre à jour leurs notes (paths).

8. **[LOW] Audit `showcaseOnly` drift** : 11 composants flaggés showcaseOnly mais dont la version Notion claim "Approved + usedBy: X pages". Vérifier code state pour `PageHeader`, `Modal`, `CelebrationModal` notamment — soit retirer le flag, soit corriger la note Notion.

### Aucune action requise
- ✅ Phase 17 wiring : 6/6 alignés.
- ✅ Couverture FO Écrans : 100% (pas une seule page FO manquante).
- ✅ Tokens : 38 entrées tokens dans DS DB, complètes vis-à-vis de `src/index.css @theme`.

---

**Sources**
- Notion DS DB : 130 entrées (Components view + Patterns view + Tokens view paginées).
- Notion Écrans DB : 145 entrées (paginées).
- Code : `find src/components -name "*.tsx"` (151) → 132 DS scope (hors marketing/motion, documentation).
- Code : `find src/pages -name "*.tsx"` (161 fichiers).
- App.tsx routes : 163 routes uniques extraites par grep.
