---
target: famille carte (code + Figma)
total_score: 19
p0_count: 2
p1_count: 2
timestamp: 2026-09-16T12-08-00Z
slug: src-components-core-card-tsx
---
# Critique — famille CARTE (code + Figma)

Deux évaluations indépendantes (revue de design / preuves déterministes) + une
inspection Figma menée par le parent. Toutes les affirmations portées ici ont été
soit mesurées par une évaluation, soit revérifiées de première main.

## Santé — Nielsen, 19/40

| # | Heuristique | /4 | Enjeu |
|---|---|---|---|
| 1 | Visibilité de l'état | 3 | Le badge de complétion est documenté dans `LearningItemCard` et jamais écrit |
| 2 | Monde réel | 2 | `D1`/`D2`/`D3` bruts sans légende ; `CourseCard` en anglais |
| 3 | Contrôle et liberté | 2 | Le X de `NotificationCard` supprime sans confirmation ni annulation |
| 4 | Cohérence | 1 | 16 composants carte, 4 vocabulaires d'icônes journal, 5 rayons à l'écran |
| 5 | Prévention des erreurs | 3 | `tier` vs `prerequisite` distingués, message de refus spécifique |
| 6 | Reconnaître | 1 | `BookOpen` = type « Apprentissage » ET action « Lire », même écran |
| 7 | Flexibilité | 2 | Aucun raccourci, aucune densité alternative |
| 8 | Sobriété | 1 | 12 remplissages pleins pour 11 objets sur `/learning-space` |
| 9 | Diagnostic | 3 | Le meilleur endroit de la famille |
| 10 | Aide | 1 | Aucune légende D1-D3, `title` qui répète le texte visible |

## Verdict anti-motifs

Pas de slop de fabrication : zéro barre d'accent, zéro rayon >= 32, zéro
`rounded-full`, et la primitive a retiré ses ombres. Du slop de gouvernance :
plusieurs mains, pas de conversation.

Détecteur du skill : **non mesuré**. `detect.mjs` (620 o) est un chargeur, le
moteur `detect-antipatterns.mjs` est absent du disque. Ce n'est pas « 0
trouvaille ».

Garde-fou maison : 238 cartes faites main sur 387 fichiers produit.

## R2 — tranchée par la mesure

141 `rounded-2xl` nets (hors prose et vitrine) sur 83 fichiers. **74 fichiers
sur 83 en portent 1 ou 2** : ce n'est pas un composant à corriger, c'est une
valeur recopiée à la main. 75,2 % sont sur des conteneurs.

Rayons réellement peints, 4 pages, 209 éléments : 14 px ×100 · 999 ×73 · 24 ×27
· 20 ×5 · 10 ×4. Cinq valeurs coexistent.

Le mécanisme est nommé : `ParcoursCard.tsx:119` écrit `!p-0 !rounded-2xl !gap-0`
— la carte passe par `<Card>` puis annule son rayon ET son padding en
`!important`. `VeilleCardFeed` se contredit dans le même fichier (2xl l. 154,
246, 592 ; lg l. 346, 450).

Résultat : `/learning-paths` et `/veille` n'ont **aucune** carte à 14.

## Code <-> Figma

Nœuds inspectés : 1095:2, 1111:46, 1111:63, 1120:66, 1109:58, 1113:24, 4478:652,
4478:703 (fichier LccBZ1GKWQVwVzPtsSzk5Y).

| Composant | Figma | Code |
|---|---|---|
| Card 1111:46 | radius-xl 20 | rounded-lg 14 |
| Card/Glass 1111:63 | radius-xl 20 | 14 |
| StatCard 1120:66 | radius-xl 20 | rounded-xl 20 — accordés, hors canon |
| Button 1109:58 | radius-pill 999 | rounded-lg 14 |
| MetaPill 1113:24 | style Eyebrow/sm, Bold 700, tracking 5% | font-medium 500 |

Figma n'a aucune page « rayons ». Les 23 variantes de Card y ont la même
anatomie. `Card/Glass` montre des cartes imbriquées. Les lignes `Pill` et `Tag`
sont vides mais la note d'usage 4478:703 les liste encore.

## Problèmes prioritaires

P0 — R1 n'est pas descendue sur les deux surfaces de butinage. Mécanisme :
`!rounded-2xl` de ParcoursCard + contradiction interne de VeilleCardFeed.

P0 — Le CTA redondant. `LearningItemCard` rend un `<Button>` dans un
`role="button"` avec le même handler. 23 arrêts interactifs pour 11 objets,
9 imbrications. Le motif correct est déjà écrit dans `PromptCard.tsx:159-166`.

P1 — Cinq composants carte sans consommateur produit : CourseCard, LessonCard,
MagazineCard, JournalEntryCard, JournalTypeTile (vérifié de première main).
`registry.ts:364` enregistre déjà la fusion décidée et jamais faite.

P1 — Quatre vocabulaires d'icônes pour cinq types de journal.

P2 — `LessonCard.tsx:167` et `:174` produisent des classes de survol qui
n'existent pas (`group-hover:primary` et un littéral de gabarit). Violation de la
règle absolue n°1.

P2 — Le ton des parcours est décidé par `index % TONES.length`
(`LearningPaths.tsx:167`).

## Ce qui marche

La primitive a tenu le retrait des ombres. `SessionCard` encode une règle de
retenue émotionnelle (« jamais de saturation sur un état inactif ») qui produit
un comportement non trivial. Les états de refus sont plus soignés que les états
de succès.

## Le trou

Rien dans la famille ne célèbre l'achèvement. Pour une plateforme dont l'étoile
polaire est la maîtrise, il manque l'objet qui dit « tu sais faire ça ».
