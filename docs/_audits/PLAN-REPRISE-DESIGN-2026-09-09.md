# Reprise du projet — état réel, arbitrages à rendre, plan d'action

> **Écrit le 2026-09-09**, après six semaines sans commit (dernier : 29/07).
> Document de reprise : ce qu'on retrouve en rouvrant le repo, ce qui reste à
> trancher, et dans quel ordre.
>
> **Méthode.** Tout ce qui est chiffré ici a été **mesuré aujourd'hui** sur le code,
> sur le site en ligne, sur les artefacts publiés ou via le pont Figma. Ce qui vient
> d'un doc antérieur est signalé. Là où un doc et le code se contredisent, c'est le
> code qui est retenu — et la contradiction est notée.
>
> **À lire avant** : [`site/BRIEF-REDESIGN-SITE-V1.md`](../site/BRIEF-REDESIGN-SITE-V1.md)
> (passation du 29/07, toujours valable) et [`_canon/FACTS-CANON.md`](../_canon/FACTS-CANON.md) §0.

---

## 0. En un écran

Le projet est **en bon état technique** et **bloqué sur une seule décision**.

| | |
|---|---|
| `npm run build` | ✅ **passe** (exit 0, 1,84 s, 3 391 modules) |
| Volume | 183 pages · 215 composants · 19 pages de site · 240 tokens |
| Travail non sauvegardé | ⚠️ **30 commits non poussés** + 3 fichiers non commités + 1 stash |
| Site en ligne | ⚠️ **toujours le WordPress pré-pivot** — cible du 06/08 manquée de 5 semaines |
| Arbitrages design ouverts | **17** (4 majeurs + 13 typographie/couleur) |
| Ce qui bloque la suite | **un seul** : la rampe d'encre (①) |

**Les trois choses à faire cette semaine**, dans l'ordre :

1. **Sauvegarder** (30 min, aucun arbitrage) — pousser les 30 commits, commiter les 3 fichiers.
2. **Retirer deux claims interdits du site en ligne** (1 h, aucun arbitrage) — publics depuis au moins le 29/07.
3. **Trancher ①** (2 h devant le banc) — c'est le seul verrou. Tout le reste en découle.

---

## 1. Ce qui ne demande aucun arbitrage, et qui est urgent

### 1.1 — Six semaines de travail vivent uniquement sur ce Mac

```
main vs origin/main :  30 commits d'avance, 0 de retard
non commité         :  DesignLab.tsx (+1 255 l.), Button.tsx, docs/INDEX.md
non suivi           :  BRIEF-REDESIGN-SITE-V1.md, tls-foundations-bench.html (523 Ko)
stash               :  stash@{0} "priority-zero pages (wip)"
```

Le fichier non commité le plus important est **`src/pages/DesignLab.tsx`, +1 255 lignes** : tout le
travail d'arbitrage (les quatre questions ①–④, le convertisseur OKLCH, les quatre rampes d'encre).
Et `BRIEF-REDESIGN-SITE-V1.md`, le document de passation lui-même, **n'est pas suivi par git** :
il n'existe qu'ici.

> **Action.** Trois commits séparés (le correctif Button, le banc, la doc), puis `git push`.
> Seule tâche de cette liste qui ne peut pas attendre : elle protège six semaines de travail.

### 1.2 — Deux claims interdits sont en ligne aujourd'hui

Vérifié en ouvrant `thelearningsociety.fr` **ce matin** — le WordPress pré-pivot est toujours servi,
inchangé depuis le constat du 29/07 :

| Ce qui est publié | Pourquoi c'est un problème |
|---|---|
| « Formation **Formateur Augmenté** […] notre **programme certifiant** » | X10 (sujet clos) **et** « certifiant » non sourcé — TLS n'est pas Qualiopi |
| « La formation augmentée par l'IA. » | `PRODUCT.md` : cette tagline **n'est pas un actif à préserver** |

> **Action.** Ne pas attendre le remplacement complet du site. Deux modifications de texte dans
> WordPress, sans toucher au React. Le risque d'intégrité court tant qu'elles sont en ligne, et
> « certifiant » est le plus exposé des deux.

### 1.3 — La cible du 06/08 est passée

Le Lot 1 visait six pages pour le 06/08. Nous sommes le **09/09**. Aujourd'hui **2 pages sur 19**
sont portées sur le système éditorial (Accueil, Accompagnement) ; 17 portent encore **64 `clamp()`
écrits en dur**.

> **Action.** Reposer une date sur ce qui est réellement fait (§7). Décision de plan de charge,
> pas de design : elle t'appartient.

---

## 2. Les quatre volets — où en est chacun

### A. La Learning App — la plus mûre, la moins bloquée

183 pages, 215 composants, stores Zustand persistés, build vert. Passeport enrichi
(`EvidenceRef`, validation humaine signée, trois régimes).

**Ouvert côté design** : les 13 décisions typo/couleur s'appliquent majoritairement ici. En
particulier le seul défaut d'accessibilité de masse :

> **`text-ink-400` : 355 usages dans `src/`.** Mesuré à 2,54:1 sur blanc — échoue AA (4,5) **et**
> la tolérance grand texte (3,0). À toutes les tailles, sur tous les fonds. C'est le plus gros
> défaut mesurable du produit, et il ne demande **aucun arbitrage esthétique**.

**Ouvert côté contenu** : les parcours seedés sont des placeholders génériques
(« Fondamentaux du Leadership »). Le corpus TLS réel n'est pas dans l'app — voir volet D.

### B. Le Design System — le showcase est fait, les fondations ne le sont pas

Le chantier ouvert le 28/07 a été **mené à son terme** : registre de données extrait
(`src/pages/components/registry.ts`), route par catégorie, ancres, recherche globale, lazy loading,
couverture complète. Ce chantier est clos.

**Ce qui ne l'est pas, c'est la couche en dessous** : les échelles. Voir §4, c'est le cœur du sujet
« agency grade ».

### C. Le site marketing — le plus en retard, et le seul bloqué

19 pages, 58 sections écrites en dur dont 6 réutilisées, **aucune image sur les 5 pages
principales**. 2 pages sur 19 portées. C'est le volet que ① bloque, et le seul avec une échéance
commerciale.

### D. Le corpus formations / bootcamp — le plus silencieux

Trois parcours EdTech conçus par toi pour toi (Neuro-Édu, Ingénierie Pédagogique, UX-UI PM,
32 modules) : te former, appliquer sur TLS, **dogfooder l'app**.

**Mesuré aujourd'hui : ce corpus n'est pas dans l'app.** `src/data/learningPaths.ts` ne contient que
les parcours génériques de démo.

Et le fact-check du corpus a été **archivé** → `docs/_archive/factcheck-corpus/CORPUS-FORMATIONS-FACT-CHECK.md`.
Il porte la liste des mythes à purger (8 s d'attention, VARK, triune brain) et des stats fabriquées :
**à relire avant tout seed**, sinon on injecte les erreurs dans la vraie data.

> Ce volet n'a **aucun arbitrage design ouvert**. Il est en attente, et c'est le seul moyen de
> tester l'app avec du contenu réel.

---

## 3. Les arbitrages à rendre

### 3.1 — Les quatre questions du banc `/_design-lab`

| # | Question | État au 31/07 | Ce que ça bloque |
|---|---|---|---|
| ① | La couleur du texte courant | 🔄 **rouverte** sur 4 rampes | **tout le reste** |
| ② | Le rayon des boutons et des cards | ✅ **tranché : 14 px** | rien — mais **non appliqué** |
| ③ | Le sens des couleurs | ⏳ ouverte | **rien** — `tone=` a 0 usage sur le site |
| ④ | Rempli ou outline ? | ⏳ ouverte, le banc penche outline | les boutons du site |

#### ① — La rampe d'encre : la question est encore trop étroite

Le banc a bien fait de rouvrir la question. Mais **il la mesure sur le site seulement** (466
déclarations). Mesuré aujourd'hui sur tout le repo :

| Où | Usages `ink-*` |
|---|---|
| Site (pages + composants marketing) | 638 — **15 %** |
| App (composants du DS) | 1 287 |
| App (pages hors marketing) | 2 421 |
| **Total** | **4 346** |

La rampe est définie **une seule fois**, dans `src/index.css` (`--color-ink-0` → `-950`).

> **① n'est pas un arbitrage de site, c'est un arbitrage de produit entier.** Changer la teinte
> repeint les 4 346 usages, dont **3 708 dans la Learning App**, qui n'a jamais demandé à devenir marron.

**La question à trancher d'abord, en amont des colonnes A/B/C/D :**

> **Le site et l'app partagent-ils la même encre, ou le site a-t-il sa propre rampe éditoriale ?**

- **Rampe partagée** — on repeint les 4 346 usages. Cohérence totale. Le contraste ne bouge pas
  (les quatre rampes conservent la clarté au centième près), donc **aucun dossier d'accessibilité
  ne se rouvre**. Mais l'app change de température sur 183 pages.
- **Rampe éditoriale séparée** — `ink-*` reste à l'app, `--color-paper-*` naît pour le site. Le site
  va franchement vers le marron sans toucher au produit. Coût : un second vocabulaire, et le risque
  de divergence silencieuse déjà documenté (`CLAUDE.md`, piège n°3).

**Ma recommandation : rampe éditoriale séparée.** La direction papier/encre/riso est une direction
**de marque**, pas de produit. L'app est un outil consulté tous les jours ; elle gagne à rester
neutre. Et ça te permet de trancher la couleur du site **cette semaine** sans ouvrir une migration
de 3 708 usages.

Le choix A/B/C/D devient alors facile et à faible enjeu :

| | Teinte | Verdict |
|---|---|---|
| A — actuel | 256–264° | les gris Tailwind par défaut |
| B — depuis `ink-900` | 264° | **à écarter** : quasi identique à A |
| C — depuis le teal TLS | 216° | un vrai gris de marque |
| D — depuis le marron | 46° | la rampe chaude, cohérente avec la DA |

Rampe **de site** : **D**. Rampe **partagée** : **C** (D teinterait l'app entière en chaud).

> **À corriger au passage.** `src/index.css:78` commente `ink-900` comme *« original teal-tinted
> dark »*. Mesuré en OKLCH : **264°**, quand le teal de marque est à **216°**. Le commentaire est
> faux depuis le début — ce gris est bleu-violet, pas teal.

#### ② — Tranché, mais pas appliqué

Décision du 31/07 : **14 px partout**, pilule réservée aux objets oblongs (tags, badges, chips).
Voir §4.2 : l'état du code n'a pas suivi.

#### ③ — À trancher en dernier, il ne bloque rien

`tone=` a **zéro usage** sur le site. Aucune migration en jeu. Le banc a déjà produit le constat :
permuter *warm* et *sun* **ne se remarque pas** (orange `#ED843A` et or `#F8B044` sont voisins en
teinte). La triade se comporte en pratique comme une **binaire** : le teal, et le chaud.

> **Recommandation : renoncer à la doctrine des trois tons, documenter la binaire.** Une règle qu'on
> ne peut pas voir n'est pas une règle. L'assumer coûte une ligne de doc et libère les compositions.

#### ④ — La mesure a déjà tranché

En **rempli**, aucune couleur de marque ne passe AA avec un label blanc :

| Fond | Contraste du blanc | AA (4,5) |
|---|---|---|
| `primary-600` | 3,66 | ❌ |
| `secondary-500` | 2,64 | ❌ |
| `accent-500` | 2,31 | ❌ |
| `accent-400` (l'or canonique) | **1,86** | ❌ le pire de la palette |

Pour passer AA en rempli il faut descendre à `primary-700` / `secondary-700` — exactement le « teal
terni » refusé. **Le rempli obligeait à choisir entre la conformité et la marque.**

En **outline**, le label est sur blanc : `primary-700` = 5,02 · `secondary-700` = 6,31 ·
`accent-700` = 4,88. Tous conformes, et l'or redevient utilisable.

> **Recommandation : outline sur le site, rempli conservé dans l'app** (485 instances installées).
> Le correctif de bordure est **déjà écrit** dans `Button.tsx` (non commité) : `400` → `600`,
> parce que 2,44 sur blanc échouait au seuil de 3,0 de WCAG 1.4.11.

### 3.2 — Les 13 décisions du panneau

Elles concernent **l'app** avant le site, et sont chaînées (**D1 bloque D2**, D8 bloque D9).

| # | Sujet | Reco du banc | Coût |
|---|---|---|---|
| 1 | Graisse h3/h4 : token 600 vs code 700 | **le token passe à 700** | 0 fichier |
| 2 | Nommer les rôles de graisse | 5 rôles | tokens à poser |
| 3 | `h4` et `body-lg` font tous deux 18 px | **garder les deux** | 0 |
| 4 | Graisse et tracking des boutons | 700 + tracking 0 sous 16 px | cosmétique |
| 5 | L'échelle `display-*` | ⚠️ **à reposer, voir §4.1** | — |
| 6 | Retirer `body-sm` (15 px) | fusionner dans `body` | **828 usages** |
| 7 | Retirer `h5` (16 px) | le retirer | 23 usages |
| 8 | `h3` : 22 → 24 px | **passer à 24** | 132 usages |
| 9 | Les 2 interlignes hors grille | h4 → 24, h3 → 32 | suit D8 |
| 10 | **`ink-400` sur 355 textes** | **en 3 lots vérifiés** | ⚠️ **le vrai sujet a11y** |
| 11 | Les 3 boutons pleins échouent | rempli profond (900) | lié à ④ |
| 12 | Rayon de racine des cards | 20 ou 24 | ⚠️ **contredit ②, voir §4.2** |
| 13 | Les 54 usages sous 11 px | tout ramener à `micro` | mécanique |

> **Une seule ligne est un vrai problème** (D10). Les autres sont de l'hygiène de système, à
> trancher **d'un bloc en une session**, pas une par une entre deux autres sujets.

### 3.3 — Un défaut de méthode à corriger d'abord

Les choix faits au banc React sont persistés en **`localStorage`** (`tls-design-lab-decisions`).

> **Une décision qui vit dans un seul navigateur n'est pas une décision.** Invisible pour l'équipe,
> perdue au premier nettoyage de cache, impossible à citer en revue.
>
> **Avant la session d'arbitrage** : ajouter au banc un bouton « exporter les décisions » produisant
> un Markdown à coller dans `DESIGN.md`. Une heure de travail qui évite de refaire l'exercice.
> Et **vérifie d'abord ton `localStorage`** : des choix du 30-31/07 y dorment peut-être encore.

---

## 4. Reprendre les fondations en « agency grade »

C'est le sujet où on s'était arrêté (fonts, couleurs, rayons). Voici ce que la mesure dit,
échelle par échelle. Le diagnostic tient en une phrase : **les échelles n'ont pas été décidées,
elles ont poussé.**

`src/index.css` déclare **240 tokens**. Ce n'est pas un problème en soi ; le problème est que
certaines échelles portent **plusieurs vocabulaires concurrents pour la même intention**.

### 4.1 — Typographie : trois façons de dire « un grand titre »

L'échelle compte **20 crans réels**. Usages mesurés aujourd'hui :

| Cran | Usages | | Cran | Usages |
|---|---:|---|---|---:|
| `text-caption` | 1 257 | | `text-h5` | 23 |
| `text-body` | 1 138 | | `text-section` | 17 |
| `text-body-sm` | 828 | | `text-feature` | 13 |
| `text-micro` | 387 | | `text-lede` | 12 |
| `text-h4` | 153 | | `text-title` | 9 |
| `text-h3` | 132 | | `text-hero` | 8 |
| `text-h2` | 86 | | `text-display-xl` | 5 |
| `text-body-lg` | 66 | | `text-display-lg` | 4 |
| `text-h1` | 36 | | `text-display-md` | 4 |
| | | | `text-stat-value` | 4 |
| | | | `text-stat-value-lg` | 2 |

**Deux échelles se superposent** : celle de l'app (`h1`→`h5`, `body*`, `caption`, `micro`) et
l'échelle éditoriale ajoutée le 29/07 (`hero`, `section`, `title`, `feature`, `lede`). Elles se
recouvrent :

> Pour un titre de page, le système propose **`h1` (36) · `hero` (8) · `display-xl` (5)**.
> Pour un titre de section : **`h2` (86) · `section` (17) · `title` (9)**.
> Trois entrées pour une intention : c'est la définition d'une échelle qui n'a pas été arbitrée.

**⚠️ Correction à la décision D5.** Le banc affirmait `display-*` = **0 usage** et recommandait de
les retirer. Mesuré aujourd'hui : **5 / 4 / 4**. Ils ont été adoptés depuis (probablement par le
système éditorial). **D5 est caduque et doit être reposée** — non plus « retirer des tokens morts »
mais « choisir lequel des trois vocabulaires survit ».

**Ce qu'« agency grade » veut dire ici** : une échelle typographique tient en **8 à 10 crans**, avec
un ratio ≥ 1,125 entre voisins. TLS en a 20, dont **9 sous les 20 usages** (queue longue) et deux
paires à ratio quasi nul (`body-sm`/`body` à ×1,07 ; `h5` = `body` = 16 px).

> **La décision structurante** : le site et l'app partagent-ils l'échelle typo, ou l'éditorial
> a-t-il la sienne ? **C'est exactement la même question que ① pose pour la couleur.** Les deux se
> tranchent ensemble, ou pas du tout.

### 4.2 — Rayons : la décision ② n'a pas atteint le code

| Token | Valeur | Usages |
|---|---|---:|
| `rounded-pill` | 999px | **418** |
| `rounded-xl` | 20px | **348** |
| `rounded-2xl` | 24px | **240** |
| `rounded-lg` | **14px** ← la valeur tranchée | 204 |
| `rounded-md` | 10px | 113 |
| `rounded-sm` | 6px | 73 |
| `rounded-xs` | 4px | 11 |
| `rounded-3xl` | ⚠️ **aucun token** → défaut Tailwind | 22 |
| `rounded-full` | ⚠️ **interdit par `CLAUDE.md`** | **204** |

Deux écarts nets avec la doctrine écrite :

1. **`rounded-full` compte 204 usages** alors que `CLAUDE.md` dit « **jamais `rounded-full`** (= 50 %,
   cercle) » pour Button/Card. À vérifier au cas par cas : sur un avatar ou un point de statut c'est
   légitime ; sur une card, non.
2. **`rounded-3xl` : 22 usages sans token.** Ils tombent sur le défaut Tailwind.

Et **la décision ② (14 px) contredit la décision D12** (qui propose 20 ou 24). Les deux vivent dans
le même banc. **À réconcilier avant d'appliquer quoi que ce soit.**

### 4.3 — Couleur : la palette de marque ne tient pas AA sur ses propres couleurs

**78 tokens de couleur**, répartis en 13 familles : `ink` (12 crans) · `primary` (11) ·
`secondary` (11) · `accent` (10) · `surface` (6) · `text` (5) · `success` (5) · `danger` (5) ·
`warning` (3) · `info` (3) · `border` (3) · `overlay` (1) · `brown` (1).

Le nombre n'est pas le problème. Les trois faits qui le sont :

1. **`ink-400` échoue partout** — 355 usages (§2.A).
2. **Aucune couleur de marque ne porte du texte blanc en AA** — c'est ④.
3. **La rampe `ink` n'est pas de TLS** — `ink-50`→`ink-800` sont les gris Tailwind par défaut,
   `ink-950` est son `slate-900`. Seul `ink-900` est une valeur maison, et elle est bleu-violet.

### 4.4 — Ce que je propose comme méthode

Le réflexe naturel serait de retrancher token par token. Ça ne marchera pas : les échelles se
recouvrent parce qu'**une question de fond n'a pas été posée**, et elle est la même pour les trois
échelles.

> **Une seule décision commande les trois : le site et l'app partagent-ils leur système, ou le site
> a-t-il un système éditorial distinct ?**
>
> - **Système partagé** → il faut *fusionner* les vocabulaires (choisir `h1` ou `hero`, pas les deux)
>   et assumer que l'app change d'apparence.
> - **Systèmes distincts** → il faut *nommer la frontière* (`--color-paper-*`, `text-editorial-*`)
>   et écrire la règle qui empêche l'un de fuir dans l'autre.
>
> **Tant que cette question n'est pas tranchée, tout retranchement de token sera repris.** C'est
> pour ça que ① bloque réellement la suite : ce n'est pas une question de couleur, c'est la
> frontière entre deux systèmes.

---

## 5. Les artefacts et les bancs — deux outils, aucun registre de décisions

Sur les 17 artefacts publiés, **un seul concerne ce projet** :

> **« Banc TLS — typo, couleur, cards »** — https://claude.ai/code/artifact/c94a764a-86e4-4413-a3f9-679824b947b7
> *(mis à jour le 30/07 · copie locale : [`_audits/tls-foundations-bench.html`](tls-foundations-bench.html))*

Relu aujourd'hui : c'est un **simulateur interactif**, pas un document de conclusions. Trois
sections — *Typographie* (les deux fontes embarquées en variable, comparaison Spartan/Nunito),
*Couleur & contraste* (verdict WCAG en direct, conscient de la taille, de la graisse et de la
fonte), *Composition de card* (eyebrow/titre/méta/action, tone et rayon). Rien n'y est recopié :
tout est calculé.

**Il existe donc deux bancs**, et c'est une source de confusion :

| | Où | Ce qu'il fait | Décisions enregistrées ? |
|---|---|---|---|
| **Banc HTML** (artefact) | claude.ai, + copie repo | simule et mesure en direct | ❌ aucune |
| **`/_design-lab`** (React) | dans l'app, non commité | porte les 13 décisions + ①–④ | ⚠️ `localStorage` seulement |

> **Aucun des deux ne produit de trace durable.** C'est le défaut de méthode du §3.3, et il explique
> pourquoi on rouvre les mêmes questions : **le banc mesure très bien et n'enregistre rien.**
>
> **Action** : le banc React devient la source (il porte les décisions), le banc HTML reste
> l'instrument de mesure partageable. Et on ajoute l'export Markdown au premier.

Les deux copies du banc HTML **diffèrent légèrement** (523 301 vs 522 991 octets) : la version
publiée a divergé de la copie du repo. Republier depuis le repo, ou l'inverse — mais choisir une source.

---

## 6. Figma — état vérifié aujourd'hui

**Le pont de lecture fonctionne.** Interrogé ce matin sur le fichier `Design System - TLS`
(`LccBZ1GKWQVwVzPtsSzk5Y`) : réponse obtenue, métadonnées lues.

**Mais il ne voit qu'une page** : `📕 Cover · Design System TLS`. Le brief du 29/07 en décrit **32**.
Le pont expose la page ouverte dans l'app desktop, et `get_variable_defs` répond *« You currently
have nothing selected »*.

> **Pour auditer Figma il faut donc que tu ouvres le fichier sur la page voulue et y sélectionnes un
> nœud.** Ce n'est pas un blocage technique, c'est une contrainte du pont. À faire au moment de la
> session d'arbitrage, pas avant.

**Ce qu'on peut affirmer sans Figma** : `src/index.css` **n'a pas été touché depuis le 29/07**
(dernier commit sur ce fichier : 29/07 14:47). Les tokens du code n'ont donc pas bougé, et la parité
mesurée le 29/07 (**0 écart** sur 42 couleurs, 7 espacements, 7 rayons) **tient toujours côté code**.
Le seul risque de dérive serait une modification faite dans Figma depuis — invérifiable d'ici.

**Deux limites à ne pas rouvrir** : Code Connect exige un siège Dev/Full sur un plan Organization,
TLS est en **Pro** — c'est mort, pas « à faire ». Et la bibliothèque ne publie que ses composants :
tout travail Figma se fait **dans le fichier DS lui-même**.

> **Quand tu mettras Figma à jour, l'ordre importe** : les décisions ①–④ et §4 changent les tokens.
> Mettre Figma à jour **avant** de trancher, c'est se garantir de le refaire.

---

## 7. Les docs de référence — mon avis sur le « cut down »

### Ce qui est réellement chargé

Quatre docs vivent à la racine. Ils n'ont pas le même statut :

| Doc | Lignes | ~tokens | Chargé quand ? |
|---|---:|---:|---|
| `CLAUDE.md` | 591 | **8 136** | **à chaque session** |
| `DESIGN.md` | 453 | 4 482 | en tâche design |
| `PRODUCT.md` | 183 | 3 182 | en tâche design |
| `DESIGN-IMPECCABLE.md` | 934 | **11 761** | **par rien** — `DESIGN.md` le dit « à ouvrir soi-même » |

> **Première correction : le coût de contexte n'est pas 27 500 tokens.** Il est de **~8 100 par
> session**, et **~15 800 en tâche design**. Le plus gros fichier des quatre n'est chargé par personne.

### Le travail de réduction a déjà été fait, et la mémoire ne le sait pas

L'audit du 25/07 mesurait `CLAUDE.md` à **2 747 lignes / 176 Ko** et visait ~450 lignes.
**Aujourd'hui il fait 591 lignes / 45 Ko** — soit **−78 %**. La passe 2 a donc été faite.

⚠️ La note en mémoire (`project_claude_md_refactor.md`) dit encore « passe 1 faite (2747→2119),
passe 2 à faire, branche non mergée ». **C'est périmé** : la branche `docs/claude-md-context-refactor`
est à **0 commit d'avance et 46 de retard** sur `main`. Le travail a été absorbé. *(Je corrige cette
mémoire.)*

### Mon avis : couper encore, mais pas là où tu crois

Le contenu de `CLAUDE.md`, section par section :

| Section | Lignes | Verdict |
|---|---:|---|
| **Pièges Tailwind v4 / cascade CSS** | **252** | ✅ **garder tel quel** — c'est exactement ce que la doctrine Anthropic demande : des gotchas non dérivables, chèrement acquis |
| Styling Tailwind — règles | 50 | ✅ garder (règles absolues, non dérivables) |
| Familles de composants | 44 | 🟡 garder les **décisions**, couper les descriptions dérivables |
| Auth components (dualité) | 38 | 🟡 table mi-dérivable — compresser |
| Référence Tailwind → tokens | 30 | ✅ garder (c'est déjà un pointeur) |
| Architecture (arborescence) | 27 | 🔴 **couper** — dérivable du filesystem |
| Build & commit | 22 | ✅ garder (le gate `npm run build` est un vrai piège) |
| TlsLogo — 6 variants | 16 | 🟡 compresser en 4 lignes |
| Conventions UI transverses | 16 | ✅ garder |
| **Créer un composant à variantes** | **15** | 🔴 **couper** — tutoriel générique, Claude 5 sait faire des maps de classes |
| Hygiène documentaire | 12 | ✅ garder |
| le reste (7 sections) | ~69 | ✅ court et dense |

**Gisement réel : ~90 lignes.** On passerait de 591 à ~500. C'est réel mais modeste.

> **`CLAUDE.md` n'est plus le problème.** Sa plus grosse section (43 %) est précisément la bonne.
> Couper davantage reviendrait à jeter les pièges — c'est-à-dire la seule chose que le modèle ne
> peut pas retrouver seul.

**Le vrai sujet est `DESIGN-IMPECCABLE.md`** : 934 lignes, le plus gros des quatre, chargé par rien,
à la racine, et qui **double la doctrine** de `DESIGN.md` sur les couleurs, la typo et l'élévation
(ses §2, §3, §4). Il ne coûte pas de contexte — il coûte de la **maintenance**, et c'est là que
naissent les contradictions (l'audit du 25/07 en avait relevé **11** dans `CLAUDE.md` seul).

**Trois options, je recommande la deuxième :**

1. **Le brancher** — le charger en tâche design. Coût : +11 761 tokens par session design, pour de
   la doctrine que `DESIGN.md` porte déjà en partie. Je le déconseille.
2. **Le scinder** ✅ — ce qui est une *décision vivante* (§13 Visual Vocabulary, §11 Do's/Don'ts)
   remonte dans `DESIGN.md` ; le reste part dans `docs/_archive/`. La racine passe de 4 docs à 3.
3. **Le laisser** — statu quo : un doc de 934 lignes que personne ne lit et que tout le monde peut
   citer. C'est ce qui produit la dérive.

### Ce que la génération Claude 5 change vraiment

L'article Anthropic dit d'arrêter le micro-management, pas d'arrêter de documenter. La ligne de
partage est nette et tes docs la respectent déjà en grande partie :

- **À couper** : ce que le modèle peut lire dans le filesystem (arborescences, listes de fichiers),
  ce qu'il sait déjà faire (patterns de code génériques), les journaux de phases terminées.
- **À garder, et à payer cher** : les **gotchas** (les 252 lignes de pièges), les **décisions** qui
  ne se dérivent d'aucun code (le tone par domaine, les interdits de marque), et les **contre-vérités
  déjà rencontrées** (« le gate n'est pas `tsc --noEmit` »).

> **Mon avis en une phrase** : ne coupe pas `CLAUDE.md` pour le plaisir de le raccourcir — il est
> passé de 2 747 à 591 lignes et le reste est dense. Coupe plutôt le **quatrième doc racine**, qui
> ne sert personne et fabrique des contradictions.

---

## 8. La séquence que je recommande

La chaîne de dépendance est courte et n'a qu'un maillon bloquant :

```
①  la frontière des systèmes  ──→  matière  ──→  un hero jugé sur pièce  ──→  3 archétypes  ──→  17 pages
```

Tout ce qui n'est pas sur cette ligne peut avancer en parallèle.

### Semaine 1 — débloquer

| Quoi | Arbitrage ? |
|---|---|
| Pousser les 30 commits, commiter les 3 fichiers | non |
| Retirer les 2 claims interdits du WordPress | non |
| Ajouter l'export des décisions au banc, vérifier le `localStorage` | non |
| Réconcilier ② et D12 (14 px vs 20/24) avant la session | non |
| **Session d'arbitrage : la frontière des systèmes (①+§4), puis ③ et ④** | **oui — 2 h** |
| Générer la matière et la **valider nue**, sans intégration | non |

### Semaine 2 — juger sur pièce

Un seul hero en code, à 1440 : matière, verre, vraie copy, une entrée orchestrée. **On juge là, pas
avant.** Si ça ne tient pas, on l'apprend sur un écran et non sur dix-sept.

### Semaines 3-4 — industrialiser

Les 3 archétypes (A ouverture · B liste · C clôture double CTA), nourris des 14 explorations Figma.
Puis les 6 pages du Lot 1 par assemblage. La séquence numérotée en quinconce (V3/V6) est le motif le
plus distinctif des explorations et **n'existe nulle part dans le code**.

### En parallèle, sans dépendance

1. **`ink-400` en 3 lots** (D10) — le seul vrai défaut d'accessibilité, 355 usages.
2. **Les 12 autres décisions de typo**, tranchées d'un bloc.
3. **Scinder `DESIGN-IMPECCABLE.md`** (§7) — 1 h, referme la dérive documentaire.
4. **Seeder Neuro-Édu** — après relecture du fact-check archivé.

---

## 9. Ce que je recommande de trancher, en une phrase chacun

| # | Recommandation |
|---|---|
| **La frontière** | **Systèmes distincts** : `--color-paper-*` + `text-editorial-*` pour le site, `ink-*` + `h1..h5` pour l'app. Une règle écrite empêche l'un de fuir dans l'autre. |
| ① | Rampe de site en **D (marron 46°)**. L'app garde `ink-*`. |
| ② | Déjà tranché (14 px) — **réconcilier avec D12**, puis appliquer : supprimer les 22 `rounded-3xl`, auditer les 204 `rounded-full`. |
| ③ | **Renoncer à la triade**, documenter la binaire teal / chaud. |
| ④ | **Outline sur le site**, rempli conservé dans l'app. |
| D5 | **Caduque** — `display-*` n'est plus mort (13 usages). Reposer la question comme un choix de vocabulaire. |
| D10 | Chantier à part entière, prioritaire, sans arbitrage esthétique. |
| Docs | Scinder `DESIGN-IMPECCABLE.md`. Couper ~90 lignes de `CLAUDE.md`, pas plus. |
| Volet D | Relire le fact-check **avant** de seeder. |

---

## 10. Annexe — les faits mesurés le 2026-09-09

| Mesure | Valeur | Comment |
|---|---|---|
| Build | exit 0, 1,84 s | `npm run build` |
| Bundle principal | 3,5 Mo (935 Ko gzip) | sortie de build |
| Pages / composants | 183 / 215 | `find src/pages -name '*.tsx'` |
| Tokens déclarés (`@theme`) | 240 | `grep -cE '^\s*--' src/index.css` |
| Commits non poussés | 30 | `git rev-list --left-right --count origin/main...main` |
| Site en ligne | WordPress pré-pivot, inchangé | ouverture de `thelearningsociety.fr` |
| Pages du site portées | **2 / 19** | tokens éditoriaux par fichier |
| `clamp()` en dur restants | 64 | `grep` sur le site |
| `text-ink-400` | **355** | `grep` sur `src/components` + `src/pages` |
| Usages `ink-*` | **4 346** (site 638 · app 3 708) | par dossier |
| Crans typographiques | **20** | tokens `--text-*` hors sous-tokens |
| `rounded-full` (interdit) | **204** | `grep` sur `src` |
| `rounded-3xl` (sans token) | 22 | `grep` sur `src` |
| `index.css` touché depuis le 29/07 | **non** | `git log -1 -- src/index.css` |
| Pont Figma | lecture OK, 1 page visible sur 32 | `get_metadata` |
| Barres d'accent décoratives | **0** | les 2 `border-l-2` sont des indicateurs de sommaire — légitimes |
| Gradient text (`bg-clip-text`) | **0** partout | interdit respecté |
| `uppercase` + `tracking` sur le site | 34 lignes, sur les pages de détail | à vérifier : eyebrow systématique ou labels courts ? |

**Corrections à porter ailleurs :**

- `src/index.css:78` — le commentaire dit *« teal-tinted »* pour `ink-900`. Mesuré à 264°, le teal
  est à 216°.
- Mémoire `project_claude_md_refactor.md` — annonce une passe 2 « à faire » et une branche non
  mergée. Les deux sont dépassés. *(corrigé le 09/09)*
- Mémoire `project_drive_formations_corpus.md` — pointe `docs/learning/CORPUS-FORMATIONS-FACT-CHECK.md`.
  Le dossier `docs/learning/` n'existe pas ; le doc est dans `docs/_archive/factcheck-corpus/`.
  *(corrigé le 09/09)*
- Décision D5 du banc — « `display-*` : 0 usage » est faux depuis leur adoption. À reposer.
