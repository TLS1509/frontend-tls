# SPEC — Répétition espacée (SRS) v1 · walking skeleton

**2026-07-24 · Capstone des 3 pistes (PM → UX/UI → vibe).** Cette spec applique
[`PM-C6`](../learning/application/cours/PM-C6-Ecrire-une-spec-de-feature.md) sur le vrai
chantier identifié par l'[audit](../learning/application/AUDIT-UXUI-APP-ET-SITE.md) : le
site promet « Flashcards — répétition espacée », l'app a un deck statique. On referme
l'écart avec un **walking skeleton** (le plus petit bout de bout-en-bout qui marche).

---

## 1 · Problème / job (PM-C2)
> *Quand je finis d'étudier une notion, je veux **la revoir au bon moment** (ni trop tôt,
> ni trop tard), afin de **la retenir durablement sans tout relire**.*

Substitut actuel : relire tout le deck à chaque fois (inefficace) ou ne rien revoir
(oubli). La répétition espacée est la technique d'apprentissage la mieux étayée
(Cepeda et al. 2006 ; Roediger & Karpicke 2006).

## 2 · Objectif & métrique (PM-C3, PM-C5)
- **Métrique d'entrée North Star visée** : rétention à J+30 ↑ (proxy : % de cartes
  encore « sues » au 2ᵉ passage).
- **Garde-fou anti-Goodhart** : ne pas récompenser le simple fait de cliquer. Le rating
  est **auto-déclaré**, il ne rapporte **pas d'XP** (cohérent avec le firewall
  gamification). On mesure la rétention, pas l'activité.

## 3 · User stories (PM-C6)
- *En tant qu'apprenant, je veux **dire si j'ai su une carte ou non**, afin que l'app
  **planifie la prochaine révision**.*
- *En tant qu'apprenant, je veux **voir combien de cartes sont à réviser aujourd'hui**,
  afin de savoir quoi faire sans chercher.*
- *En tant qu'apprenant, je veux **savoir quand une carte reviendra**, afin de faire
  confiance au système.*

## 4 · Parcours (avec chemins d'erreur — UX/UI C4/C5)
```
Ouvrir un deck → retourner une carte → noter « à revoir » ou « je le savais »
   ├─ « je le savais » → intervalle s'allonge (3 → 7 → 14 → 30 j) → carte suivante
   └─ « à revoir »     → intervalle retombe à 1 j → carte suivante
Chemins d'erreur : aucune carte due aujourd'hui → message « rien à réviser, reviens
demain » ; carte jamais notée → comptée « nouvelle », pas « due ».
```
États (UX/UI C5) : les 2 boutons de rating n'apparaissent **qu'après le flip** ; chacun
`min-h-touch`, `focus-visible`, tone-aware (à revoir = danger doux, su = succès) ;
retour immédiat « prochaine révision dans X j ».

## 5 · Scope
**IN (v1)** : rating su/à revoir · intervalles expansifs `[1, 3, 7, 14, 30]` j ·
compteur « à réviser aujourd'hui » · persistance (localStorage via Zustand).
**OUT (v1, explicite)** : génération IA des cartes · algorithme SM-2 complet (ease
factor) · synchro multi-appareils · notifications push. *(Dire ce qui est dehors borne
l'Effort — PM-C4.)*

## 6 · Modèle de données
```ts
type CardRating = 'again' | 'known';
interface CardReview {
  cardId: string;        // `${deckKey}:${card.id}` — clé stable
  intervalDays: number;  // intervalle courant (dans [1,3,7,14,30])
  dueAt: number;         // ms epoch : quand la carte redevient due
  lastRating: CardRating;
  reviewCount: number;
  lastReviewedAt: number;
}
// store : reviews: Record<cardId, CardReview>
```
Une carte est **due** si `review.dueAt <= now`. Une carte **jamais notée** est
« nouvelle », pas « due ».

## 7 · Critères d'acceptation (testables — VIBE-C1/C4)
- [ ] Après **« je le savais »** sur une carte neuve → prochain intervalle = **3 j**
  (dueAt ≈ now + 3 j).
- [ ] Un 2ᵉ « je le savais » → intervalle **plus long** (7 j) ; puis 14, 30 (plafonné).
- [ ] Après **« à revoir »** → intervalle **retombe à 1 j**.
- [ ] Le compteur « à réviser aujourd'hui » = nb de cartes dont `dueAt <= now`.
- [ ] La planification **survit à un refresh** (persistée).
- [ ] `npm run build` passe (le vrai gate — VIBE-C3).
- [ ] Le rating **ne rapporte aucun XP** (firewall).

## 8 · Risques & lancement
- **Risque** : intervalles trop agressifs → surcharge. Parade : démarrer conservateur
  (1-3-7-14-30), ajustable plus tard.
- **Risque** : clé de carte instable si une leçon change → clé `deckKey:id` explicite.
- **Lancement** : la feature vit dans `FlashcardsViewer` existant, aucun flag nécessaire
  pour la v1 (surface déjà présente). Mesurer le 2ᵉ-passage avant de généraliser.

---

## Traçabilité (la boucle Learn → Do → Match)
| Piste | Cours appliqué | Ce qu'il a produit ici |
|---|---|---|
| **PM** | C2/C3/C5/C6 | job, métrique+garde-fou, scope, critères d'acceptation |
| **UX/UI** | C4/C5 | parcours + chemins d'erreur, états des 2 boutons, retour immédiat |
| **Vibe** | C1/C3/C4 | walking skeleton, build gate, revue des critères |

**Implémentation** : store `useCardReviewStore` (`src/stores/persistence.ts`) + UI dans
`src/pages/FlashcardsViewer.tsx`. Voir le commit de capstone.

---

## Sources
- **Cepeda, N. J., et al. (2006).** Distributed practice in verbal recall tasks.
  *Psychological Bulletin*, 132(3). → l'espacement, l'un des effets les plus robustes.
- **Roediger, H. L., & Karpicke, J. D. (2006).** Test-enhanced learning. *Psychological
  Science*, 17(3). → la récupération active (le rating **est** une récupération).

---

*SPEC-SRS v1 rédigée le 2026-07-24. Walking skeleton — la v1 démontre la boucle, pas
l'algorithme complet.*
