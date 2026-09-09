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

## ⚠️ Recadrage — ce que Notion établit, et que ce plan ignorait

> **Ajouté le 2026-09-09 après lecture des docs de rentrée** (base `Docs`, documents 5, 8, 12 et 13).
> Le repo ne le sait pas : **aucun de ses fichiers n'a bougé depuis le 29/07**. Tout ce qui a été
> décidé entre le 31/08 et le 07/09 vit dans Notion.

**La décision Q1, ferme, prise le 31/08 :**

> « **Learning App : arrêt réel (option A).** Les jalons Alpha du 7/09 et Bêta du 15/09 tombent. Le
> planning de lancement de la Learning App et du nouveau site vitrine sera **révisé après validation
> du planning du projet Agents**. » — *Ce que ça débloque : libère septembre et octobre.*

La réunion de rentrée a arbitré entre deux options et **a écarté celle qui portait ce plan** :
« Option 1, learning app, full, site vitrine, on est focus que là-dessus […] Option 2, on fait l'IA
agentique. » → « **C'est l'IA agentique. […] Décision prise. Acté.** »

**Conséquences directes sur ce document :**

| Ce que le plan dit | Ce que Notion établit |
|---|---|
| « la cible du 06/08 est passée, reposer une date » | Il n'y a **pas de date à reposer** avant validation du planning Agents (fin : **31 octobre**) |
| « semaine 1 : trancher ①, générer la matière » | Le budget est de **3 demi-journées/semaine/associé**, entièrement absorbé par le projet Agents |
| « le site est le volet le plus en retard » | Le site vitrine **n'est plus un volet en retard : il est arrêté**, et c'est délibéré |
| Le projet « remise en cohérence du design system » | **Créé, validé, puis mis en pause** (Q65) |

**Ce que ce plan reste, et c'est ce qui compte :** la décision **Q61 est toujours ouverte** et
marquée *manque bloquant* — « un document Cursor d'état d'avancement sera fourni », attendu de
Chloé, jamais transmis. C'est le **manque n°1** de la liste des douze trous du document 13.
**Ce plan est ce document.** Il répond aussi au livrable du 02/09 (« document listant tous les
problèmes du design system et des pages bloquant le lancement »), en retard d'une semaine.

**Donc la bonne façon de lire ce qui suit** : non pas « le programme des six prochaines semaines »,
mais **l'état des lieux figé** de ce qui attend au dégel — avec ses arbitrages déjà instruits, pour
que la reprise ne recommence pas l'instruction. Les deux urgences du §1 (sauvegarder, retirer les
claims du site en ligne) restent, elles, entièrement valides : elles ne consomment pas le budget
Agents et le second point est un risque d'intégrité qui court.

⚠️ **Deux nuances à ne pas perdre**, tirées des mêmes documents :

- **Q30** — « la session 4 parlait du **design system du code**, pas de Notion ». Le sujet DS est
  sorti du chantier Notion, **il n'est pas annulé** : il reste un projet à part entière, en pause.
- **Q60** — « **écart de production pédagogique confirmé**, plus élevé que supposé. Le contenu
  n'est pas ailleurs qu'en Notion. » Cela **invalide** le « c'est quasiment produit, 70 % » et
  recoupe exactement le §2.D de ce plan : le corpus n'est pas dans l'app.

---

## 0. En un écran

Le projet est **en bon état technique** et **bloqué sur une seule décision**.

| | |
|---|---|
| `npm run build` | ✅ **passe** (exit 0, 1,84 s, 3 391 modules) |
| Volume | 183 pages · 215 composants · 19 pages de site · 240 tokens |
| Travail non sauvegardé | ✅ **résolu le 09/09** — 33 commits poussés sur `origin/main` |
| Site en ligne | ⚠️ **toujours le WordPress pré-pivot** — cible du 06/08 manquée de 5 semaines |
| Arbitrages design ouverts | **17 au banc** + **17 décisions de fondation** (§4) + **6 d'identité** (§5) |
| Ce qui bloque la suite | **une seule question** : site et app partagent-ils leur système ? (§4.5) |

**Les trois choses à faire cette semaine**, dans l'ordre :

1. ~~Sauvegarder~~ — ✅ **fait le 09/09**, 33 commits poussés.
2. **Retirer deux claims interdits du site en ligne** (1 h, aucun arbitrage) — publics depuis au moins le 29/07.
3. **Trancher la frontière des systèmes** (§4.5) — c'est le verrou des quatre fondations.

**Et si tu ne peux consacrer qu'une heure au design pendant le projet Agents** : les trois décisions
d'accessibilité (§4.3) ne dépendent d'aucun arbitrage esthétique, et les trois sujets d'identité
I2/I3/I4 (§5.7) ne sont bloqués par rien.

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

> **Action.** Reposer une date sur ce qui est réellement fait (§9). Décision de plan de charge,
> pas de design : elle t'appartient.

---

## 2. Les quatre volets — où en est chacun

### A. La Learning App — la plus mûre, la moins bloquée

183 pages, 215 composants, stores Zustand persistés, build vert. Passeport enrichi
(`EvidenceRef`, validation humaine signée, trois régimes).

**Ouvert côté design** : les 13 décisions typo/couleur s'appliquent majoritairement ici. En
particulier le seul défaut d'accessibilité de masse :

> **`text-ink-400` : 355 usages dans `src/`**, mesuré à 2,54:1 sur blanc. Mais ils ne sont pas
> tous fautifs. Classés en lisant le contexte de chaque occurrence : **241 vrais défauts** (213
> textes réels + 28 placeholders), **61 légitimes** (27 états désactivés, que WCAG exempte, et 34
> glyphes décoratifs), **53 hors produit** (DevPanel, showcase).
> **Le chantier porte donc sur 241 usages, pas 355** — et les 61 légitimes doivent être laissés
> tels quels : les corriger supprimerait le signal « cet élément est inactif ».

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

### D. Le corpus formations / bootcamp — la matière est prête, le modèle de données ne l'est pas

Trois parcours EdTech conçus par toi pour toi : te former, appliquer sur TLS, **dogfooder l'app**.

**Correction importante par rapport à ce que je disais ce matin : les versions corrigées sont dans
le repo**, dans [`chloe/modules-corriges-2026-07-23/`](../../chloe/modules-corriges-2026-07-23/),
suivies par git.

| Parcours | Modules | |
|---|---:|---|
| 1 · Ingénierie Pédagogique | 10 | ADDIE/SAM, objectifs, Kirkpatrick, IA générative, chiffrage |
| 2 · Neuro-Éducation | 10 | mémoire, attention, feedback, charge cognitive, transfert |
| 3 · UX-UI & Product Management | 12 | dont **M04 Design Systems**, directement applicable ici |
| 4 · Recherche & Stratégie | 2 | dont la validité scientifique des frameworks IP |

**Et le fact-check est déjà passé** : « mythes retirés, sources vérifiées avec DOI, chiffres
fabriqués supprimés », chaque module portant en fin un **journal des corrections**. Le doc de
référence est archivé (`docs/_archive/factcheck-corpus/`), mais son travail est **incorporé dans les
modules eux-mêmes**. Il n'y a donc plus de risque d'injecter les erreurs — c'était ma réserve de ce
matin, elle tombe.

**Le mapping vers l'app est direct, et c'est la bonne surprise.** Les modules sont écrits en
**EDRACT** — six sections numérotées : `01 Engagement · 02 Découvrir · 03 Réfléchir · 04 Appliquer ·
05 Consolider · 06 Transférer`. L'app attend `Parcours › Étape › Leçon`. Donc :

> **1 parcours = Neuro-Éducation · 10 étapes = les 10 modules · 6 leçons par étape = les 6 temps
> EDRACT.** Soit 60 leçons, sans rien réécrire.

**⚠️ Le verrou n'est pas le contenu, c'est le modèle de données.** Mesuré aujourd'hui :

```
interface Lecon { id · number · title · description · duration · completed · prerequisites? }
                                    ↑ aucun champ de contenu
```

Le contenu réel des leçons vit **en dur dans `LessonPlayer.tsx`** — 1 998 lignes, 19 blocs de
paragraphes littéraux. Tant que `Lecon` ne porte pas de contenu, **le corpus n'a nulle part où
aller**.

> **Ce que ça coûte réellement** : ajouter un champ de contenu à `Lecon` et rendre `LessonPlayer`
> data-driven. C'est un chantier de développement, pas de design, et **c'est le seul prérequis** au
> seed. La matière, elle, est prête depuis le 24 juillet.

**Pourquoi ce volet sert le design, et pas seulement ta formation** : aujourd'hui on juge les écrans
sur « Fondamentaux du Leadership » et « Communication Efficace ». Du vrai contenu change ce qu'on
voit — les longueurs réelles de titre, la densité réelle d'une leçon, ce que devient une card quand
son texte n'est pas calibré pour elle. **C'est le meilleur test des quatre fondations du §4.**

Et Notion le confirme sans le savoir : **Q60** — « écart de production pédagogique confirmé, plus
élevé que supposé » — parle du contenu produit **pour la plateforme**, pas de ce corpus-ci, qui
existe et est corrigé.

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

## 4. Les quatre fondations du design system

> **C'est le cœur du sujet, et la raison pour laquelle il vaut la peine de le traiter maintenant** :
> typographie, couleur, accessibilité et rayons ne sont pas quatre chantiers parmi d'autres. Ce sont
> les **quatre bases dont dépendent tous les composants**. Chaque semaine où elles restent ouvertes,
> on écrit des composants sur un socle qu'on sait devoir bouger.
>
> Tout ce qui suit est **mesuré sur `src/index.css` et sur `src/` le 2026-09-09**, jamais estimé.
> Le diagnostic commun aux quatre : **les échelles n'ont pas été décidées, elles ont poussé.**

---

### 4.1 — Typographie : trois vocabulaires pour la même intention

L'échelle compte **20 crans**. Les voici tous, avec leur ratio au cran précédent :

| Token | px | ratio | graisse | | Token | px | ratio | graisse |
|---|---:|---:|---:|---|---|---:|---:|---:|
| `display-xl` | 96 | — | 800 | | `title` | 26 | ×1,077 | 700 |
| `display-lg` | 64 | ×1,500 | 800 | | `h3` | 22 | ×1,182 | 600 |
| `display-md` | 48 | ×1,333 | 800 | | `feature` | 22 | **×1,000** | 700 |
| `hero` | 44 | ×1,091 | 800 | | `h4` | 18 | ×1,222 | 600 |
| `stat-value-lg` | 40 | ×1,100 | — | | `body-lg` | 18 | **×1,000** | — |
| `h1` | 36 | ×1,111 | 700 | | `lede` | 17 | ×1,059 | — |
| `stat-value` | 32 | ×1,125 | — | | `h5` | 16 | ×1,062 | 600 |
| `section` | 32 | **×1,000** | 800 | | `body` | 16 | **×1,000** | — |
| `h2` | 28 | ×1,143 | 700 | | `body-sm` | 15 | ×1,067 | — |
| | | | | | `caption` | 13 | ×1,154 | — |
| | | | | | `micro` | 11 | ×1,182 | — |

**Ce que ces chiffres disent, et qu'on ne voit pas à l'œil nu :**

- **Quatre collisions exactes** — `section`/`stat-value` (32), `h3`/`feature` (22), `h4`/`body-lg` (18),
  `h5`/`body` (16). Deux tokens, une taille : la taille ne hiérarchise plus rien.
- **Sur les 19 intervalles, 10 sont sous le plancher de 1,125** qu'une échelle produit demande.
- **Le haut et le bas sont propres.** 96 → 64 → 48 donne ×1,5 puis ×1,333 ; 16 → 13 → 11 donne
  ×1,154 puis ×1,182. **C'est le milieu qui est encombré : treize crans entre 16 et 48 px.**
- **Le tracking, lui, est bon** : gradué de −0,03em à −0,01em, cohérent avec la taille. Ne pas y toucher.

**La cause : deux échelles superposées.** Celle de l'app (`h1`→`h5`, `body*`, `caption`, `micro`) et
celle ajoutée le 29/07 pour l'éditorial (`hero`, `section`, `title`, `feature`, `lede`). Elles se
recouvrent au lieu de se compléter :

> Pour un titre de page, le système propose **`h1` (36 usages) · `hero` (8) · `display-xl` (5)**.
> Pour un titre de section : **`h2` (86) · `section` (17) · `title` (9)**.
> **Trois entrées pour une intention.** C'est la définition d'une échelle qui n'a pas été arbitrée.

**⚠️ Une décision du banc est caduque.** D5 affirmait `display-*` = *0 usage* et recommandait de les
retirer. Mesuré aujourd'hui : **5 / 4 / 4**. Ils ont été adoptés depuis. La question n'est plus
« retirer des tokens morts » mais **« lequel des trois vocabulaires survit »**.

**Les décisions à rendre**

| # | Question | Ma recommandation | Coût |
|---|---|---|---|
| T1 | **Une échelle ou deux ?** app et éditorial | **Deux, nommées** — `text-*` pour l'app, `text-editorial-*` pour le site, avec une règle écrite | aucun immédiat |
| T2 | Graisse `h3`/`h4` : token 600 vs code 700 | **le token passe à 700** — on suit l'usage (70 % et 67 %) | **0 fichier** |
| T3 | Les 4 collisions exactes | Écarter les tailles, ou fusionner. `h4`/`body-lg` : **garder les deux** (rôles réels) ; `h5`/`body` : **retirer `h5`** (23 usages) | 23 usages |
| T4 | `body-sm` (15 px) à ×1,067 de `body` | **fusionner dans `body`** | **828 usages** |
| T5 | `h3` : 22 → 24 px | **oui** — 22 px rate le seuil WCAG grand texte (22,4 px en Spartan) et le pas `h4`→`h3` passe de ×1,22 à ×1,33 | 132 usages |
| T6 | Les 54 usages sous 11 px | **tout ramener à `micro`** — mécanique, aucun arbitrage | 54 usages |

**Impact composants** : T2 ne touche aucun fichier (c'est le token qui s'aligne). T4 est le plus lourd
(828 usages) mais purement mécanique. T5 touche les titres de card dans toute l'app.

---

### 4.2 — Couleur : la palette de marque ne tient pas AA sur ses propres couleurs

Mesuré cran par cran, texte blanc sur le remplissage :

| | 400 | 500 | 600 | **700** | 800 | 900 |
|---|---:|---:|---:|---:|---:|---:|
| **primary** (teal) | 2,44 | 2,94 | 3,66 | **5,02 ✅** | 7,08 | 11,46 |
| **secondary** (orange) | 2,48 | 2,64 | 3,98 | **6,31 ✅** | 10,35 | 14,92 |
| **accent** (or) | **1,86** | 2,31 | 2,89 | **4,88 ✅** | 8,01 | 11,17 |

> **Aucune couleur de marque ne porte du texte blanc en AA avant le cran 700.** Et `accent-400`,
> l'or canonique de la charte, mesure **1,86** — la pire valeur de toute la palette.

C'est le nœud de l'arbitrage ④ : en rempli, il fallait choisir entre la conformité et la marque.
En outline, le label passe sur blanc et les trois couleurs deviennent utilisables à 700.

**La rampe `ink`, elle, n'est pas de TLS :**

| Token | hex | sur blanc | |
|---|---|---:|---|
| `ink-300` | `#d1d5db` | 1,47 | gris Tailwind |
| **`ink-400`** | `#9ca3af` | **2,54 ❌** | gris Tailwind — **355 usages de texte** |
| `ink-500` | `#6b7280` | 4,83 ✅ | gris Tailwind — passe de justesse, **échoue sur fond gris** |
| `ink-600` | `#4b5563` | 7,56 ✅ | gris Tailwind |
| `ink-900` | `#252B37` | 14,20 ✅ | **seule valeur maison** — mais à 264° en OKLCH, bleu-violet, pas teal |

#### Une rampe dérivée de `ink-900` — construite le 09/09

La rampe actuelle est un **emprunt** : onze crans Tailwind et une seule valeur maison,
`ink-900`, insérée au milieu sans être recalée. D'où deux défauts mesurés en OKLCH :

- **elle n'est pas monotone** — `ink-900` (L 28,9 %) est **plus clair** que `ink-800` (L 27,8 %) ;
- **ses écarts de clarté vont de +1,8 à +20,3 points**, sans aucune régularité.

La proposition part de l'inverse : **on garde la couleur de police telle quelle et on construit tout
autour d'elle**, à teinte constante (264,1°, celle de `ink-900`), avec un chroma en courbe et des
contrastes cibles étagés sur les crans de texte.

| Cran | Actuel | Proposé | avant | après | usages | Rôle |
|---|---|---|---:|---:|---:|---|
| `ink-0` → `ink-300` | — | **inchangés** | — | — | — | surfaces et bordures |
| `ink-400` | `#9ca3af` | `#8d95a6` | 2,54 | **3,01** | 355 | désactivé · bordure d'interface |
| `ink-500` | `#6b7280` | `#667082` | 4,83 | **4,99** | 834 | texte secondaire |
| `ink-600` | `#4b5563` | `#4c5466` | 7,56 | 7,59 | 444 | texte secondaire sûr |
| `ink-700` | `#374151` | `#394050` | 10,31 | 10,38 | 332 | texte appuyé |
| `ink-800` | `#1f2937` | `#2e3442` | 14,68 | **12,46** | 97 | texte fort |
| **`ink-900`** | `#252B37` | **inchangé** | 14,20 | 14,20 | **916** | **⚓ l'ancre** |
| `ink-950` | `#0f172a` | `#131820` | 17,85 | 17,81 | 0 | fond sombre |

**Quatre gains, un seul coût.**

1. **La rampe redevient monotone** — l'inversion disparaît.
2. **`ink-900` ne bouge pas d'un pixel.** Ses 916 usages ne sont pas repeints : c'est l'ancre, pas
   une variable.
3. **`ink-500` passe désormais sur les sept fonds** (4,54 au pire contre 4,39 aujourd'hui sur
   `ink-100`). Le piège « marche sur blanc, échoue sur une surface teintée » disparaît — c'était
   exactement ce qui rendait le remplacement de `ink-400` non mécanique.
4. **`ink-400` monte à 3,01**, juste au-dessus du seuil que WCAG 1.4.11 impose au contour d'un
   élément d'interface. Il devient légitime comme bordure ou icône, tout en restant trop clair pour
   du texte : **son rôle d'état désactivé est préservé, et enfin lisible comme tel.**

> **Le coût : `ink-800` passe de 14,68 à 12,46.** C'est mécanique — pour que la rampe soit monotone,
> le cran 800 doit passer sous le 900. Les 97 textes concernés restent très au-dessus de 4,5 : aucun
> ne devient non conforme.

**Six crans changent sur douze**, et les cinq surfaces claires ne bougent pas du tout.

#### La même rampe en teal — pour comparer

Le teal de marque est à **216°**, `ink-900` à **264,1°** : quarante-huit degrés d'écart. On peut donc
rejouer toute la rampe sur la teinte de la marque, à clartés identiques.

> **Le contraste ne bouge jamais de plus de 0,16 point** entre les deux teintes. C'est la propriété
> d'OKLCH : la clarté est perceptuelle, on tourne la teinte sans toucher aux ratios. **Aucun dossier
> d'accessibilité ne se rouvre, quelle que soit la variante retenue.** La question est donc
> uniquement esthétique.

| | Teinte | `ink-900` | Crans modifiés | Ce que le gris raconte |
|---|---|---|---:|---|
| **A** | 264° — celle de `ink-900` | **intact** `#252B37` | **6** | discret, neutre à l'œil |
| **B** | 216° — celle du teal | repeint `#1d2e33` | 11 | un gris **de TLS**, plus emprunté |
| **C** | 216°, chroma ×1,6 | repeint `#123037` | 11 | franchement teinté, bleu-vert sourd |

**Le vrai arbitrage n'est pas le contraste, c'est l'ancre.** En **A**, `ink-900` ne bouge pas : les
916 usages du texte principal sont intacts et le changement se limite à six crans. En **B** et
**C**, le texte principal de 183 pages est repeint — c'est un choix d'identité, pas une correction.

**Ma recommandation : A**, en cohérence avec C1. Si le site part sur une rampe éditoriale marron,
l'app n'a pas besoin de devenir teal : elle a besoin d'être cohérente et monotone, ce que A lui
donne pour six valeurs. **B** ne se justifie que si vous décidez que le gris doit porter la marque
partout — et alors il faut l'assumer sur 916 textes. **C** est à réserver à une direction qui va
jusqu'au bout de la couleur ; sur de longues pages de texte, un gris à ce chroma fatigue.

```css
--color-ink-400: #8d95a6;   /* modifié */
--color-ink-500: #667082;   /* modifié */
--color-ink-600: #4c5466;   /* modifié */
--color-ink-700: #394050;   /* modifié */
--color-ink-800: #2e3442;   /* modifié */
--color-ink-950: #131820;   /* modifié */
```

**Les décisions à rendre**

| # | Question | Ma recommandation | Coût |
|---|---|---|---|
| C1 | **La frontière** : site et app partagent-ils l'encre ? | **Rampe éditoriale séparée** — `--color-paper-*` pour le site, `ink-*` pour l'app (voir §3.1 ①) | découple les deux |
| **C7** | ~~Reconstruire la rampe, et sur quelle teinte ?~~ | ✅ **TRANCHÉ le 09/09 — variante A (264°), appliquée dans `src/index.css`.** La variante teal a été écartée : elle repeignait 916 textes pour un gain esthétique, à contraste inchangé | 6 crans, fait |
| C2 | Teinte de la rampe (A/B/C/D) | **D (marron 46°) pour le site.** Si la rampe reste partagée : **C (teal 216°)** | 638 ou 4 346 usages |
| C3 | Le remplissage des boutons de marque | **outline sur le site** (label `700` sur blanc), **rempli conservé dans l'app** | 485 boutons dans l'app |
| C4 | `ink-900` commenté « teal-tinted » dans `index.css:78` | **corriger le commentaire** — il est faux depuis le début | 1 ligne |

---

### 4.3 — Accessibilité : un seul vrai défaut, mais il est massif

Trois constats séparés, et ils n'ont pas le même poids.

**Une cause qu'on n'avait pas nommée : la rampe n'a aucun rôle documenté.** Douze crans, zéro
emploi écrit. Rien ne dit qu'un cran est fait pour une surface plutôt que pour du texte — alors les
deux se mélangent. En lisant l'usage réel, trois zones se dessinent pourtant d'elles-mêmes :

| Zone | Crans | Ce que le code en fait |
|---|---|---|
| **Surfaces et bordures** | `ink-0` → `ink-300` | 508 fonds, 774 bordures, **quasi aucun texte** |
| **La charnière** | `ink-400` | 355 textes — trop clair pour lire, trop foncé pour une bordure discrète |
| **Le texte** | `ink-500` → `ink-950` | 2 623 textes, du secondaire au principal |

`ink-400` n'a donc qu'un emploi honnête : **l'état désactivé ou grisé**, que WCAG exempte — ce que
27 usages font déjà correctement. **Écrire ces trois zones dans `DESIGN.md` coûte dix lignes et
empêche la faute de revenir.**

**🔴 Le défaut de masse — `text-ink-400`, 355 usages.** À 2,54:1 sur blanc, il échoue AA (4,5) **et**
la tolérance grand texte (3,0). À toutes les tailles, sur tous les fonds. **C'est le plus gros défaut
mesurable du produit, et il ne demande aucun arbitrage esthétique** — seulement du travail vérifié.

Le remplacement n'est pas mécanique pour autant : `ink-500` (4,83) passe sur fond clair mais **échoue
sur fond gris** (4,39), où `ink-600` est requis. Et une bonne part des sites ne sont pas classables
statiquement — la surface vient d'un ancêtre. D'où la méthode en trois lots : **les fonds gris
d'abord (`ink-600`), puis les fonds clairs (`ink-500`), puis les indéterminés au rendu.**
`ink-400` garde un emploi légitime : **l'état désactivé, que WCAG exempte.**

**🟠 Le bouton primaire de l'app** — `bg-primary-600 text-white`, label 15px/600. Mesuré **3,66:1**.
Le seuil de 3,0 ne vaut que pour le grand texte (≥24px, ou ≥18,66px en 700) : un label à 15px/600 est
du **texte normal**, donc le seuil est **4,5**. Il échoue. Corriger repeint 485 boutons — c'est ta
décision, pas une évidence technique.

**✅ Ce qui est tenu** — la bordure des variants outline est corrigée (`400` → `600`, WCAG 1.4.11) ;
`focus-visible` est la convention documentée ; la règle des 44 px sur les actions principales tient.

**Le seuil à ne pas confondre** — WCAG 2.2 AA impose **24×24 px** (SC 2.5.8), c'est le seul minimum
normatif. Les 44×44 viennent de AAA et d'Apple. La règle TLS reste : **44 px sur les actions
principales, 24 px minimum partout.**

**Les décisions à rendre**

| # | Question | Ma recommandation | Coût |
|---|---|---|---|
| A1 | `ink-400` sur 355 textes | **en 3 lots vérifiés**, dans l'ordre gris → clair → indéterminé | 355 usages |
| A2 | Le bouton primaire de l'app à 3,66 | **rempli profond `primary-900`** (11,46) plutôt qu'un `700` terni | 485 boutons |
| A3 | Écrire la doctrine « light-only » | **une ligne dans `DESIGN.md`** — le dark mode a été retiré le 28/07 pour de bonnes raisons, mais rien ne le dit | 1 ligne |

---

### 4.4 — Rayons : une décision rendue, jamais appliquée

| Token | valeur | usages | |
|---|---|---:|---|
| `rounded-pill` | 999px | **418** | la signature de marque |
| `rounded-xl` | 20px | **348** | |
| `rounded-2xl` | 24px | **240** | |
| `rounded-lg` | **14px** | 204 | ← **la valeur tranchée le 31/07** |
| `rounded-md` | 10px | 113 | |
| `rounded-sm` | 6px | 73 | |
| `rounded-xs` | 4px | 11 | |
| `rounded-full` | 50 % | **204** | ⚠️ **interdit par `CLAUDE.md`** sur Button/Card |
| `rounded-3xl` | — | 22 | ⚠️ **aucun token TLS** — tombe sur le défaut Tailwind (24px) |

**Trois problèmes distincts, à ne pas confondre :**

1. **La décision ② (14 px partout, pilule en exception) n'a pas atteint le code.** `rounded-lg` est
   quatrième en usage, derrière trois valeurs plus rondes.
2. **② contredit D12**, qui propose 20 ou 24 px. Les deux vivent dans le même banc. **À réconcilier
   avant d'appliquer quoi que ce soit** — sinon on migrera deux fois.
3. **204 `rounded-full`** alors que la règle dit « jamais » sur bouton et card. Une partie est
   légitime (avatars, pastilles de statut) ; il faut trancher au cas par cas, pas en masse.

**Les décisions à rendre**

| # | Question | Ma recommandation | Coût |
|---|---|---|---|
| R1 | **Réconcilier ② et D12** | **14 px** — cohérent avec une direction papier/encre, où l'angle franc dit l'objet imprimé | prérequis |
| R2 | Les 22 `rounded-3xl` sans token | **les supprimer** — aucun arbitrage, c'est une fuite | 22 usages |
| R3 | Les 204 `rounded-full` | **auditer** : légitime sur avatar et pastille, interdit sur bouton et card | à mesurer |
| R4 | `radius-3xl` doublon exact de `radius-2xl` | **retirer le token mort** | 1 ligne |

---

### 4.5 — Ce qui commande les quatre

Le réflexe serait de traiter les quatre axes en parallèle. Ça ne marchera pas : **trois d'entre eux
butent sur la même question non posée.**

> **Le site et l'app partagent-ils leur système, ou le site a-t-il le sien ?**
>
> - **Partagé** → il faut *fusionner* les vocabulaires (choisir `h1` **ou** `hero`, pas les deux) et
>   assumer que l'app change d'apparence en même temps que le site.
> - **Distincts** → il faut *nommer la frontière* (`--color-paper-*`, `text-editorial-*`) et écrire
>   la règle qui empêche l'un de fuir dans l'autre.

**Ma recommandation : distincts.** La direction papier/encre/riso est une direction **de marque**.
L'app est un outil de travail consulté tous les jours ; elle gagne à rester neutre. Et ça permet de
trancher la couleur et la typo du site sans ouvrir une migration de 3 708 usages dans l'app.

**Une seule des quatre fondations ne dépend pas de cette question : l'accessibilité.** A1, A2 et A3
peuvent être traités dès maintenant, quel que soit l'arbitrage. **C'est donc par là qu'il faut
commencer si tu veux avancer avant que la frontière soit tranchée.**

---

## 5. L'identité visuelle — ce qui est ouvert

> Le design system dit *comment on compose*. L'identité dit *à quoi ça ressemble et ce que ça
> raconte*. Six sujets sont ouverts, et ils ne sont pas au même stade : deux sont des **décisions à
> rendre**, deux des **chantiers à mener**, deux des **dettes à refermer**.

### 5.1 — Ce qui est acquis, et qu'on ne rediscute pas

Posé dans le brief du 29/07 comme non négociable, et toujours vrai :

**League Spartan** (display, **aucune italique** — la fonte n'a pas de face italic, `font-display
italic` produit un faux-italique synthétique ; pour de l'italique, `font-body italic`) + **Nunito**
(texte). **Teal `#55A1B4` · orange `#ED843A` · or `#F8B044`.** **Lucide** pour les icônes (295
fichiers) — jamais de SVG inline pour une icône fonctionnelle.

### 5.2 — La matière : le chantier bloqué

**Quatre directions proposées le 29/07, aucune tranchée** : le lavis humide (auréoles franches) · le
papier lui-même (bord frangé, fibres, teinté d'une seule couleur) · la risographie (deux encres
décalées, trame visible) · l'encre et le pli.

**Recommandation du brief, toujours valable** : **riso pour l'identité, papier teinté pour les
fonds** — la riso encaisse mieux le verre qu'un lavis flou.

Les règles, quelle que soit la direction retenue : deux encres jamais trois · la matière perd contre
le texte (jamais plus de 30 % de densité sous un titre) · recadrage serré sur un fragment · zéro
figuratif · une seule main pour toutes les déclinaisons.

> ⚠️ **La matière est bloquée par la couleur, pas par le temps.** L'encre commande la température du
> lavis : tant que C1/C2 (§4.2) ne sont pas rendus, générer de la matière, c'est la générer deux fois.

### 5.3 — La thèse de direction artistique, et pourquoi elle tient

**Le soin doit être dans la matière, pas dans le mouvement.** C'est la seule direction qui ne
contredit pas ce que TLS vend : un site couvert d'effets dirait l'inverse du discours, de la surface
à la place de la preuve. Et **on met le travail dans ce qu'on ne peut pas installer** — un dégradé
animé s'installe en une commande, un lavis peint non.

| Matière | Porte | Dans le triptyque |
|---|---|---|
| **Papier texturé, peint** | la main, l'irrégulier | **Humain** |
| **Verre** | la précision, l'optique | **Augmenté** |
| **Typographie et grille** | la structure, la décision | **Stratégique** |

Ce n'est pas une esthétique, c'est **le positionnement rendu visible** — et ça donne une règle de
décision : face à un élément, demander s'il relève de la main ou de l'instrument.

**Trois règles** : une seule surface peinte, une seule fois (le lavis occupe l'ouverture de
l'accueil, ailleurs un souffle) · le verre est l'exception (un seul panneau sur tout le site) · le
mouvement se mérite (une entrée orchestrée sur l'accueil, rien d'autre — la révélation au scroll sur
chaque section est le tic le plus reconnaissable des pages générées).

**Ce qui est écarté et pourquoi** : le métal liquide (froid, contredit la chaleur de la marque), le
gradient animé (le fond de startup de 2026, partout), la 3D (aucun objet à montrer). **Le verre est
gardé** parce qu'il incarne l'« Augmenté ».

⚠️ **Aucune contrainte d'effet ou d'animation n'a cours** depuis le 29/07 — l'ancien « pas de
parallax » est levé. Ce qui reste opposable est d'ordre a11y et performance, pas esthétique.

### 5.4 — Les quatre signatures visuelles — dont une débranchée

Remontées dans [`DESIGN.md`](../../DESIGN.md) §10 le 09/09 : le **verre comme signal** (jamais une
finition, teinté du tone de la surface, jamais gris neutre) · les **dégradés ambiants diffus**
(flou ≥ 60px, opacité ≤ 30 %, décentrés — « lumière côtière en fin d'après-midi ») · l'**icône
Sparkles comme marqueur fonctionnel d'IA** (jamais décorative) · l'**animation anthropomorphique du
logo** pendant l'inférence.

> ⚠️ **La quatrième signature est codée et branchée nulle part.** La prop `loading` de `TlsLogo`
> existe et fonctionne ; **aucune page ne la passe** (vérifié le 28/07, toujours vrai le 09/09).
> C'est la signature la plus distinctive du système, et elle ne s'est jamais vue. **La brancher est
> un chantier d'une heure**, pas une décision.

### 5.5 — La signature verbale et le nom de La Vigie

**La signature** (3 à 6 mots sous le logo, qui ne change pas pendant deux ans) — trois pistes
proposées, **aucune tranchée** : *Les compétences, prouvées.* · *La compétence avant le diplôme.* ·
*Former, prouver, allouer.*

⚠️ **Ne pas la confondre avec l'accroche d'accueil** (le H1), qui est « Ne formez plus pour former.
Bâtissez votre moteur de performance. » et qui vient de la fiche Notion.

**Le nom de la lettre** — « **Vigie** » est excellent et concret. « **IA** » l'abîme : ça enferme
dans un sujet qui sera banal dans dix-huit mois, et ça ne décrit pas le contenu réel (un workflow
pédagogique autopsié, une fiche Out-skill, un crash-test terrain). Nom **provisoire** selon
`FACTS-CANON` D7.

### 5.6 — Les deux dettes d'identité dans le code

| Dette | État mesuré | Action |
|---|---|---|
| **19 explorations de logo** dans `src/components/` (`LogoANode`… `V6LogoElectrique`, `TlsLogoHeritage`, `TlsLogoModernized`) | Ce sont des **propositions, pas le DS**. Elles polluent l'inventaire des composants | Les sortir dans `src/pages/_labs/logo/`, ou trancher et supprimer les 18 perdantes |
| **`TlsLogo` à 6 variants** (`color`/`light`/`primary`/`warm`/`sun`/`ink`) | Système sain et documenté. La règle « jamais de `fill="#…"` en dur, étendre la map `PALETTES` » tient | Rien — c'est un acquis |

### 5.7 — Les décisions d'identité à rendre

| # | Sujet | Nature | Bloqué par |
|---|---|---|---|
| **I1** | La matière (riso / papier / lavis / encre) | **décision** | C1-C2 (la couleur commande la température) |
| **I2** | La signature verbale — 3 pistes | **décision** | rien |
| **I3** | Le nom définitif de La Vigie | **décision** | rien |
| **I4** | Brancher l'animation du logo | **chantier ~1 h** | rien |
| **I5** | Sortir les 19 explorations de logo du DS | **chantier** | rien |
| **I6** | Un langage d'illustration ? | **à enterrer** | — le sujet est remplacé de fait par la matière (§5.2). À acter, pas à instruire |

> **Trois de ces six ne sont bloqués par rien** (I2, I3, I4) et ne coûtent presque rien. Ce sont les
> seuls sujets d'identité qu'on peut fermer pendant que le projet Agents tourne.

---

## 6. Les artefacts et les bancs — deux outils, aucun registre de décisions

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

## 7. Figma — état vérifié aujourd'hui

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

## 8. Les docs de référence — mon avis sur le « cut down »

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

## 9. La séquence que je recommande

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
3. ~~Scinder `DESIGN-IMPECCABLE.md`~~ — ✅ **fait le 09/09** : archivé, §10 et §11 de `DESIGN.md` reprennent ses décisions vivantes.
4. **Seeder Neuro-Édu** — après relecture du fact-check archivé.

---

## 10. Ce que je recommande de trancher, en une phrase chacun

| # | Recommandation |
|---|---|
| **La frontière** | **Systèmes distincts** : `--color-paper-*` + `text-editorial-*` pour le site, `ink-*` + `h1..h5` pour l'app. Une règle écrite empêche l'un de fuir dans l'autre. |
| ① | Rampe de site en **D (marron 46°)**. L'app garde `ink-*`. |
| ② | Déjà tranché (14 px) — **réconcilier avec D12**, puis appliquer : supprimer les 22 `rounded-3xl`, auditer les 204 `rounded-full`. |
| ③ | **Renoncer à la triade**, documenter la binaire teal / chaud. |
| ④ | **Outline sur le site**, rempli conservé dans l'app. |
| D5 | **Caduque** — `display-*` n'est plus mort (13 usages). Reposer la question comme un choix de vocabulaire. |
| D10 | Chantier à part entière, prioritaire, sans arbitrage esthétique. |
| Docs | ✅ `DESIGN-IMPECCABLE.md` **archivé le 09/09**. Couper ~90 lignes de `CLAUDE.md`, pas plus. |
| Volet D | Le fact-check est **déjà incorporé** aux modules. Le verrou est le modèle de données (`Lecon` ne porte pas de contenu), pas la matière. |

### Les fondations, décision par décision (§4)

| # | Recommandation | Coût |
|---|---|---|
| T1 | **Deux échelles typo nommées**, pas une fusionnée | aucun immédiat |
| T2 | Le token `h3`/`h4` passe à **700** — on suit l'usage (70 % / 67 %) | **0 fichier** |
| T3 | Écarter les 4 collisions. `h4`/`body-lg` : garder les deux · `h5` : retirer | 23 usages |
| T4 | Fusionner `body-sm` dans `body` (×1,067, sous le plancher) | 828 usages |
| T5 | `h3` : 22 → **24 px** — seuil WCAG grand texte + ratio ×1,33 | 132 usages |
| T6 | Les 54 usages sous 11 px → `micro`. Mécanique | 54 usages |
| C1 | **La frontière** (ci-dessus) | — |
| C2 | Rampe de site en **D**. Partagée → **C** | 638 / 4 346 |
| C3 | **Outline sur le site**, rempli dans l'app | 485 boutons |
| C4 | ✅ **fait le 09/09** — le commentaire « teal-tinted » est corrigé dans `index.css` et `design-tokens.css` | 2 lignes |
| **A1** | **`ink-400` en 3 lots** : fonds gris (`ink-600`) → clairs (`ink-500`) → indéterminés au rendu | **355 usages** |
| A2 | Bouton primaire de l'app → `primary-900` (11,46) plutôt qu'un `700` terni | 485 boutons |
| A3 | Écrire la doctrine **light-only** | 1 ligne |
| R1 | Réconcilier ② et D12 → **14 px** | prérequis |
| R2 | Supprimer les 22 `rounded-3xl` (aucun token) | 22 usages |
| R3 | Auditer les 204 `rounded-full` : légitime sur avatar, interdit sur bouton et card | à mesurer |
| R4 | Retirer `radius-3xl`, doublon exact de `radius-2xl` | 1 ligne |

### L'identité, décision par décision (§5)

| # | Recommandation | Bloqué par |
|---|---|---|
| I1 | **Riso pour l'identité, papier teinté pour les fonds** | C1-C2 |
| I2 | Trancher la signature verbale (3 pistes) | **rien** |
| I3 | Trancher le nom de La Vigie — garder « Vigie », retirer « IA » | **rien** |
| I4 | **Brancher l'animation du logo** — la signature la plus distinctive, jamais vue | **rien** |
| I5 | Sortir les 19 explorations de logo du DS | rien |
| I6 | **Enterrer** le « langage d'illustration » : la matière le remplace | — |

> **Si tu ne prends qu'une heure** : A1 à A3 ne dépendent d'aucun arbitrage esthétique, et I2, I3, I4
> ne sont bloqués par rien. Ce sont les seuls sujets qu'on peut fermer pendant le projet Agents.

---

## 11. Annexe — les faits mesurés le 2026-09-09

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
