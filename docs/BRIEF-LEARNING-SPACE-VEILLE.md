# Brief UX/DS — LearningSpace & Veille
*Rédigé le 2026-06-29 — issu de l'audit DS + session de design exploration*

---

## 1. Contexte & problème de design

Le LearningSpace n'est **pas un LMS séquentiel** — c'est un **hub de micro-contenus** (9 types d'items) que l'apprenant explore librement.

Problème actuel : tous les items sont affichés avec le **même pattern card**, alors que leurs modes de consommation sont radicalement différents.

| Item type | Mode de consommation | Durée type | Paradigme UX |
|-----------|----------------------|-----------|--------------|
| Astuces | Fast Scan — tip card swipeable | 3–8 min | Deepstash / Blinkist |
| Flashcards | Fast Scan — flip cards | 8–15 min | Anki / Duolingo |
| Ressource | Deep Read — article/PDF | 10–30 min | Medium / Substack |
| Guide | Deep Read — doc structuré | 20–45 min | Notion / Linear |
| Vidéo conc. | Immersive Watch — player | 5–20 min | MasterClass / YouTube |
| Vidéo geste | Immersive Watch — demo | 5–15 min | MasterClass / YouTube |
| Micro-learning | Fast Scan ou Deep Read | 5–15 min | Headspace / Ahead |
| Mission | Immersive Do — projet | Plurijours | Linear / Notion |
| Masterclass | Immersive Do — cours complet | 1–4h | MasterClass / Coursera |

---

## 2. Screenshots app — état actuel (2026-06-29)

### LearningSpace (`/learning-space`)
> Grid 3 colonnes, cards uniformes, filtres type + thème + niveau + durée, SearchBar intégrée.
> — 11 ressources mockées, badges completion (vert -top-2 -left-2), progress bars 3px.

**État code** :
- `LearningItemCard` → `src/components/learning/LearningItemCard.tsx`
- `LearningSpace` → `src/pages/LearningSpace.tsx`
- 9 types → 5 tones (brand/warm/sun/success/danger)
- Props clés : `isCompleted?`, `progress?`, `denialReason?`, `denialMessage?`
- Navigation via `resolveItemRoute()` (astuces→AstucesViewer, flashcard→FlashcardsViewer, etc.)

**Gaps UX identifiés** :
- [ ] Toutes les cards ont le même layout → pas de signal clair sur le mode de consommation
- [ ] Pas de regroupement visuel par mode (Fast/Deep/Watch/Do)
- [ ] Pas de "Featured" item ou spot éditorial
- [ ] Le DURATION_PILL est prominent mais isolé → manque d'affordance (« c'est quoi ce type d'item ? »)

### Veille (`/veille`)
> Liste verticale, 4 filtres type chips (Actus/Tutoriels/Dossiers/Magazine), VeilleFormatShortcutCards en haut.
> — Feed chronologique, bookmark sidebar-less.

**État code** :
- `VeilleCardFeed` → `src/components/patterns/VeilleCardFeed.tsx`
- `VeilleFormatShortcutCards` → `src/components/patterns/VeilleFormatShortcutCards.tsx`
- `VeilleHeroFilterChips` → `src/components/patterns/VeilleHeroFilterChips.tsx`
- 4 types : `actu | tutoriel | dossier | magazine`
- Navigation : `resolveItemRoute()` vers `/veille/weekly-news`, `/veille/video-tutorial`, `/veille/dossier`, `/veille/magazine-article`

**Gaps UX identifiés** :
- [ ] VeilleFormatShortcutCards + filtres chips = information dupliquée
- [ ] Pas de distinction visuelle assez forte entre `tutoriel` (vidéo) et `actu` (texte)
- [ ] Pas de "Nouveauté" pill ou date-relative prominente

---

## 3. Audit DS — Composants existants

### ✅ En sync code ↔ Figma (3 composants Veille)
| Composant | Fichier | Figma |
|-----------|---------|-------|
| `VeilleCard` | `patterns/VeilleCardFeed.tsx` | Présent (Composites) |
| `VeilleCardListItem` | idem | Présent |
| `FeaturedSpotlight` | `patterns/VeilleCardFeed.tsx` | Présent |

### ❌ Absents du Figma (4 composants Learning — P1 à créer)
| Composant | Fichier code | Page Figma cible |
|-----------|-------------|-----------------|
| `LearningItemCard` | `learning/LearningItemCard.tsx` | Components v2 — Composites |
| `LessonCard` | `learning/LessonCard.tsx` | Components v2 — Composites |
| `AstucesCard` | `learning/AstucesCard.tsx` | Components v2 — Atoms |
| `ResourceListItem` | `learning/ResourceListItem.tsx` | Components v2 — Atoms |

### Tokens DS utilisés (Learning/Veille)
```
Tones : brand (primary-500/50) · warm (secondary-500/50) · sun (accent-400/50)
         success (success-base/bg) · danger (danger-base/bg)
Shadows : shadow-card (resting) · shadow-card-hover · shadow-card-lift
Spacing : gap-tight · gap-stack · gap-section · gap-stack-xs
Pills : DURATION_PILL = bg-ink-100 border-ink-200 text-ink-700 font-semibold (prominent)
        META_PILL = bg-ink-50 border-ink-100 text-ink-500 (subtle)
```

---

## 4. Brief UX — Les 4 modes de consommation

### MODE A · Fast Scan
**Items** : Astuces, Flashcards, Micro-learning

**Pattern cible** : viewer immersif, une unité de contenu par écran, navigation swipe/next, barre de progression par items (dots ou trait), completion automatique à la fin.

**UX signals** :
- Durée ≤ 15 min → badge "< 15 min" prominent dans la card
- CTA = "Commencer" (pas "Accéder")
- Card tone = **sun** (Astuces) ou **brand** (Flashcards)

**Template viewer** :
```
[TopBar : Titre article / ✕ / icône bookmark]
─────── Progress trail (dots ou trait) ──────
[Corps : 1 tip ou carte → full screen]
[Bottom : "Suivant →" pill ou swipe affordance]
[Final : CompletionModal]
```

**Références** :
- Deepstash — tip card avec progress trait : https://mobbin.com/screens/e551091c-18db-4c70-a2bd-f0c997737592
- Deepstash — article reader avec progress : https://mobbin.com/screens/becd706c-f363-4588-a58a-819082661a5f
- Blinkist — "Mark as finished" + section counter : https://mobbin.com/screens/93e6cd0e-69f7-4f2c-ab34-32d9db33c752
- Ahead — lecture centré minimaliste : https://mobbin.com/screens/1976237c-5a3d-4baa-b214-71a3d969d47f

---

### MODE B · Deep Read
**Items** : Ressource, Guide

**Pattern cible** : reader avec sticky header contextuel (titre + progress bar fine) visible dès 100px de scroll, TOC sidebar optionnel (desktop), barre de scroll reading progress en haut.

**UX signals** :
- Durée 10–45 min → "20 min de lecture" pill dans la card
- CTA = "Lire" (pas "Accéder")
- Card tone = **brand** (Ressource) ou **success** (Guide)

**Template viewer** :
```
[StickyHeader : eyebrow + titre tronqué + progress % + bookmark]
[Hero : cover image + titre complet + meta (auteur, date, durée)]
[Corps : article prose max-w-prose]
[Sidebar sticky desktop : TOC avec dot actif]
[Footer : "Marquer comme lu" CTA + suggestions liées]
```

**Références** :
- Finimize — reader dense avec progress strip : https://mobbin.com/screens/81c60d37-3208-4373-b587-2bd63e6d7aac
- Moonly — article avec meta en sticky header : https://mobbin.com/screens/c5a84f7f-5c5e-484e-a3d7-7e73abd25b47
- Finimize — page finale avec CTA portfolio : https://mobbin.com/screens/f1032692-eae7-4e98-bac8-829014f95b4c

---

### MODE C · Immersive Watch
**Items** : Vidéo concrète, Vidéo geste, Tutoriel Veille

**Pattern cible** : player en haut (16:9), tabs sous le player (Description / Chapitres / Transcript / Notes), liste des chapitres avec timestamps, prev/next bottom.

**UX signals** :
- Durée affichée en mm:ss dans la card
- Badge "Vidéo" avec Play icon distinctif
- Card tone = **brand** (vidéo_conc) ou **warm** (vidéo_geste)

**Template viewer** :
```
[VideoPlayer 16:9 sticky]
[Tabs : Description · Chapitres · Transcript · Notes]
[Panel actif : liste chapitres avec durée · ou transcript cliquable]
[Bottom nav : ← Précédent  |  Suivant →]
```

**Références** :
- Udemy — player + liste lectures + tabs : https://mobbin.com/screens/a352c540-e583-451e-a143-cf4ea3be1862
- MasterClass — curriculum accordion avec lock : https://mobbin.com/screens/dc876b5d-ccf2-4c0b-b726-0474487c5981
- MasterClass — session list avec statuts : https://mobbin.com/screens/8cbbf48e-d05f-41da-a5e6-82c02e6be1df
- Coursera — transcript cliquable + notes + prev/next : https://mobbin.com/screens/d167e236-9aec-4856-8c79-27389df500a2

---

### MODE D · Immersive Do
**Items** : Mission, Masterclass

**Pattern cible** : vue projet/cours avec étapes séquentielles, checklist de livrables, statuts (à faire / en cours / soumis / validé), CTA de soumission.

**UX signals** :
- Durée = "3 jours" ou "2 semaines" → bucket "Plurijours" dans les filtres
- Badge "Mission" ou "Masterclass" avec icon Users/Star
- Card tone = **warm** (Mission) ou **sun** (Masterclass)

**Template viewer** :
```
[PageHero : titre mission + objectifs + tone warm/sun]
[Section : contexte + attendus]
[Section : étapes accordéon avec statuts]
[Section : livrables checklist]
[CTA : "Soumettre ma mission"]
[Aside sticky : coach assigné + ressources liées]
```

**Références** :
- MasterClass — curriculum avec lock + "Unlocks in 25 days" : https://mobbin.com/screens/8cbbf48e-d05f-41da-a5e6-82c02e6be1df
- Magnolia — chapter list avec durée : https://mobbin.com/screens/5ac11b6b-3b4b-4235-b93a-1cf06867956b

---

## 5. Patterns transversaux P1

### P1.1 · CompletionModal
Déclenché à la fin de chaque item consommé (tous modes). Pattern : overlay glass, confetti subtil, stat (items complétés), suggestion du prochain item.

**Références** :
- Plata Card — "Lesson complete!" + next card : https://mobbin.com/screens/48490884-add4-49f3-adca-8fbb4663150e
- Uptime — "Nice one!" + "Up next in 4…" countdown autoplay : https://mobbin.com/screens/67b21ea2-2651-4876-8411-6233d6d68e54
- Breeze — "Bravo! More to explore" cards 2 colonnes : https://mobbin.com/screens/26f32851-5604-42b7-9bef-ba3a36fb3b4a
- Mindvalley — badge + rating 5 étoiles + "Next lesson" : https://mobbin.com/screens/fbcb49ad-2063-483f-9de2-1dd5e4dd637b

**Spécifications TLS** :
```tsx
// Trigger : après dernière carte astuces OU fin vidéo OU "Marquer comme lu"
<CompletionModal
  title="Terminé !"
  itemTitle={item.title}
  xpEarned={50}
  nextItem={suggestedNext}    // optionnel
  onClose={() => navigate('/learning-space')}
  onNext={() => navigate(resolveItemRoute(nextItem))}
/>
```

### P1.2 · Context strip sticky (Deep Read)
Bande de 48px qui apparaît après 100px de scroll. Contient : titre tronqué à 1 ligne + reading progress % + bookmark icon.

```tsx
// Composant à créer : patterns/ReaderContextStrip.tsx
interface ReaderContextStripProps {
  title: string;
  progress: number;      // 0-100 via IntersectionObserver sur paragraphes
  bookmarked: boolean;
  onBookmark: () => void;
}
```

### P1.3 · LearningItemCard — modes visuels différenciés

La card actuelle est bonne mais manque de **signal de mode de consommation**. Deux améliorations minimales :

**Option A (conservative)** — ajouter un badge "MODE" sous le type badge :
```tsx
// Mapping type → mode label
const MODE_LABEL: Record<ItemType, string> = {
  astuces: 'Flash',
  flashcard: 'Flash',
  ressource: 'Lecture',
  guide: 'Lecture',
  video_conc: 'Vidéo',
  video_geste: 'Vidéo',
  micro_learning: 'Flash',
  mission: 'Projet',
  masterclass: 'Cours',
};
```

**Option B (structural)** — Aspect ratio différent par mode :
- Fast Scan cards : hauteur fixe ~220px, layout compact, police plus grande sur le titre
- Deep Read cards : layout actuel (pas de changement)
- Watch cards : thumbnail 16:9 en haut (si une image est dispo), sinon fond coloré avec Play
- Do cards : badge "Plurijours" prominent + barre de niveau requis

---

## 6. Audit Figma — Ce qu'il faut créer

### Ordre de création (bottom-up)

**Sprint 1 · Atoms (P0)** :
1. `AstucesCard` — component Figma sur page Atoms. Variants : `default / hover / locked`. Fills bindés aux Variables.
2. `ResourceListItem` — component Figma sur page Atoms. Variants : `default / hover / locked`.

**Sprint 2 · Composites (P1)** :
3. `LearningItemCard` — ComponentSet sur page Composites.
   - Property `type` : 9 values (astuces/flashcard/ressource/guide/video_conc/video_geste/micro_learning/mission/masterclass)
   - Property `state` : 3 values (accessible/completed/locked)
   - Fills bindés aux tones via Variables (primary-500, secondary-500, accent-400, success-base, danger-base)
4. `LessonCard` — ComponentSet sur page Composites.
   - Property `tone` : 3 values (primary/warm/sun)
   - Property `status` : 3 values (locked/available/in-progress/completed)

**Sprint 3 · Patterns (P2)** :
5. `CompletionModal` — Frame de documentation sur page Composites (état : draft)
6. `ReaderContextStrip` — Frame de documentation sur page Composites (état : draft)

---

## 7. Roadmap implémentation — 5 sprints

### Sprint 1 · Viewers Fast Scan (MODE A) — ~2 jours
**Objectif** : améliorer AstucesViewer et FlashcardsViewer pour le pattern card-by-card.

**Pages concernées** :
- `src/pages/AstucesViewer.tsx` → ajouter progress dots + transition slide
- `src/pages/FlashcardsViewer.tsx` → flip animation + counter "X/Y"
- `src/pages/ComplementaryContentViewer.tsx` → layout reader pour micro_learning

**Composants à créer/modifier** :
- `patterns/ViewerProgressTrail.tsx` (dots ou trait, avec count actuel/total)
- `modals/CompletionModal.tsx` (base → utilisé dans tous les viewers ensuite)

**Tokens** : `duration-slow` pour les transitions, `ease-emphasis` pour le flip

---

### Sprint 2 · Reader Deep Read (MODE B) — ~1.5 jours
**Objectif** : ajouter le sticky header contextuel sur les pages reader longues.

**Pages concernées** :
- `src/pages/veille/MagazineArticle.tsx`
- `src/pages/veille/WeeklyNewsDetail.tsx`
- `src/pages/veille/DossierDetail.tsx` (si existe)

**Composants à créer** :
- `patterns/ReaderContextStrip.tsx` — sticky à z-sticky, backdrop-blur-glass-medium

**Wiring** : `useScrollProgress` hook custom (IntersectionObserver sur les paragraphes) → nourrit la progress bar dans la strip.

---

### Sprint 3 · Viewer Vidéo (MODE C) — ~2 jours
**Objectif** : améliorer VideoTutorial et VideoReels avec le pattern Udemy/MasterClass.

**Pages concernées** :
- `src/pages/veille/VideoTutorial.tsx`
- `src/pages/veille/VideoReels.tsx`
- Nouveau : `src/pages/veille/VideoViewer.tsx` (viewer générique)

**Composants à créer/modifier** :
- `patterns/VideoChapterList.tsx` — liste accordéon des chapitres avec statuts
- Tabs : Description / Chapitres / Transcript (réutilise Tabs.tsx existant)

---

### Sprint 4 · Mission/Masterclass (MODE D) — ~1 jour
**Objectif** : améliorer les pages projet/masterclass pour un pattern "cours structuré".

**Pages concernées** :
- `src/pages/Masterclass.tsx` (si route active)
- `src/pages/ProjectDetail.tsx` ou vue mission

**Composants à créer/modifier** :
- `EtapeAccordion` (existant dans patterns/) → adapter pour statuts mission
- Aside sticky desktop : `CoachCard` assigné + `ResourceListItem` liste ressources

---

### Sprint 5 · LearningSpace hub + Veille polish — ~1 jour
**Objectif** : ajouter signal de mode dans les cards de la grille, polish Veille.

**LearningSpace** :
- Ajouter `MODE_LABEL` dans `LearningItemCard` (Option A conservative)
- Envisager regroupement optionnel par mode (accordéon "Fast / Lecture / Vidéo / Projet") si test UX valide

**Veille** :
- Supprimer duplication VeilleFormatShortcutCards (déplacer dans sidebar desktop ou onglets)
- Ajouter badge "Nouveau" (< 7 jours) sur les items récents
- Ajouter estimated reading time plus visible

---

## 8. Points d'attention spécifiques

### A · Ne pas briser `resolveItemRoute()`
La navigation type → route est la pièce centrale du LearningSpace. Toute modification de routes doit conserver la logique :
```ts
// src/pages/LearningSpace.tsx
function resolveItemRoute(item: { type: ItemType; id: string }): string { ... }
```
→ Si on ajoute un nouveau viewer, ajouter le case ici.

### B · CompletionModal ↔ stores Zustand
La completion doit écrire dans `useLessonProgressStore` pour que `isCompleted` soit cohérent dans la grille après navigation retour. Pattern existant :
```ts
// Déjà wired dans LessonPlayer — copier la logique
useLessonProgressStore.getState().markCompleted(lessonId);
```

### C · Tokens Figma à binder dans les composants créés
Toujours utiliser `vs(varId)` pour les fills (pas de RGB hardcodé). IDs stables :
- `p500` → `VariableID:1080:8` (primary-500, teal)
- `s500` → `VariableID:1081:7` (secondary-500, orange)
- `a400` → `VariableID:1081:16` (accent-400, yellow)
- `success` → `VariableID:1083:23` (success-base, muted teal-green)

### D · Responsive — mobile first
Le LearningSpace passe en 1 colonne sur mobile. Les viewers (Mode A/B/C) doivent être full-screen sur mobile (pas de sidebar). Pattern :
```tsx
// Desktop : grid 2/3 colonnes
// Mobile : full-width stack
<div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
```

### E · Framer-motion dans les viewers
Les viewers (AstucesViewer, FlashcardsViewer) utilisent framer-motion pour les transitions. **Toujours** respecter `useReducedMotion()` :
```tsx
const prefersReduced = useReducedMotion();
const variants = prefersReduced
  ? { enter: {}, exit: {} }
  : { enter: { x: 300, opacity: 0 }, exit: { x: -300, opacity: 0 } };
```

---

## 9. Recherches Mobbin — Liens directs par pattern

### Fast Scan (Mode A)
| App | Pattern | Lien |
|-----|---------|------|
| Deepstash | Progress trail + tip card | https://mobbin.com/screens/e551091c-18db-4c70-a2bd-f0c997737592 |
| Deepstash | "Tap to reveal" card flip | https://mobbin.com/screens/dd9df113-cd8d-47e4-a0ef-11a38f224671 |
| Deepstash | Article reader avec progress bar | https://mobbin.com/screens/becd706c-f363-4588-a58a-819082661a5f |
| Blinkist | Section counter + "Mark as finished" | https://mobbin.com/screens/93e6cd0e-69f7-4f2c-ab34-32d9db33c752 |
| Ahead | Minimaliste centré — une phrase par écran | https://mobbin.com/screens/1976237c-5a3d-4baa-b214-71a3d969d47f |

### Deep Read (Mode B)
| App | Pattern | Lien |
|-----|---------|------|
| Finimize | Article dense — sticky strip avec progress | https://mobbin.com/screens/81c60d37-3208-4373-b587-2bd63e6d7aac |
| Moonly | Article avec illustration + meta header | https://mobbin.com/screens/c5a84f7f-5c5e-484e-a3d7-7e73abd25b47 |
| Finimize | Page finale + CTA action | https://mobbin.com/screens/f1032692-eae7-4e98-bac8-829014f95b4c |

### Immersive Watch (Mode C)
| App | Pattern | Lien |
|-----|---------|------|
| Udemy | Player + liste lectures + tabs (Lectures/Downloads/More) | https://mobbin.com/screens/a352c540-e583-451e-a143-cf4ea3be1862 |
| MasterClass | Curriculum accordion avec section headings | https://mobbin.com/screens/dc876b5d-ccf2-4c0b-b726-0474487c5981 |
| MasterClass | Session list avec lock + "Unlocks in 25 days" | https://mobbin.com/screens/8cbbf48e-d05f-41da-a5e6-82c02e6be1df |
| Coursera | Transcript + Notes + Prev/Next nav | https://mobbin.com/screens/d167e236-9aec-4856-8c79-27389df500a2 |
| Magnolia | Chapters list avec durée et thumbnail | https://mobbin.com/screens/5ac11b6b-3b4b-4235-b93a-1cf06867956b |

### Completion Modals (transversal)
| App | Pattern | Lien |
|-----|---------|------|
| Plata Card | "Lesson complete!" + next card | https://mobbin.com/screens/48490884-add4-49f3-adca-8fbb4663150e |
| Uptime | "Nice one!" + up next countdown 4s | https://mobbin.com/screens/67b21ea2-2651-4876-8411-6233d6d68e54 |
| Breeze | "Bravo!" + 2 suggestions grid | https://mobbin.com/screens/26f32851-5604-42b7-9bef-ba3a36fb3b4a |
| Mindvalley | Badge earned + star rating + next | https://mobbin.com/screens/fbcb49ad-2063-483f-9de2-1dd5e4dd637b |

### Hub Discovery (LearningSpace grid)
| App | Pattern | Lien |
|-----|---------|------|
| Nibble | Grid avec filter chips + cards illustrées | https://mobbin.com/screens/fe07382d-4705-4d49-a021-2bb6d0b87d4a |
| Nibble | Grid avec category selector | https://mobbin.com/screens/ada05788-b040-4123-8744-b937ec869f40 |

---

## 10. Décisions d'architecture à prendre

Avant de commencer le Sprint 1, répondre à ces 3 questions :

1. **CompletionModal — déclenchement auto ou manuel ?**
   - Auto : dès le dernier item → meilleure UX but peut surprendre
   - Manuel : "Marquer comme terminé" CTA → plus prévisible
   - → *Recommandation : auto pour Fast Scan (cards), manuel pour Deep Read*

2. **LearningItemCard — différenciation par mode dès Sprint 5 ?**
   - Option A (conservative) : badge MODE_LABEL textuel sous le type badge → ~30min d'implémentation
   - Option B (structural) : thumbnail 16:9 pour les vidéos, compact pour Fast Scan → ~2h d'implémentation
   - → *Recommandation : commencer par Option A, mesurer si assez clair*

3. **Regroupement par mode dans la grille ?**
   - Oui : 4 sections accordéon (Flash / Lecture / Vidéo / Projet) — meilleure affordance
   - Non : grille plate avec filtres (actuel) — plus simple mais moins guidant
   - → *Recommandation : tester les deux via un toggle "Vue par mode / Vue libre"*

---

*Prochaine étape immédiate* : créer les 4 composants Figma manquants (Sprints A/B ci-dessus) pour avoir un DS complet avant d'implémenter les viewers.
