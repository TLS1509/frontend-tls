# Sitemap — Site V1 The Learning Society

> 🛑 **Le chantier est en pause depuis le 31/08/2026 — lire ceci avant de se servir du reste.**
> La session 5 de la réunion de rentrée a arbitré : les agents IA passent devant, **la Learning
> App et le site vitrine sont mis en pause**. Réponse Q1, verbatim : « *le planning de lancement
> de la learning app **et du nouveau site vitrine** doivent être modifiés après validation du
> planning du projet Agent IA* ». Réponse Q65 : les projets « site vitrine statique » et
> « site vitrine ressources » sont créés, validés, **puis mis en pause**.
>
> **Ce fichier reste juste sur ce qu'il documente — l'état du code.** Ce qui a changé sous lui,
> c'est l'offre que ce code met en vitrine. Voir §1 bis : le catalogue arrêté le 31/08 **gèle
> une page en production** et **ajoute cinq offres qui n'ont aucune page**. Rien n'est à recoder
> tant que le planning n'est pas revu ; tout est à savoir avant d'y toucher.
>
> ⚠️ **La décision du 31/08 sur le site a été prise sur un inventaire périmé.** La page de
> préparation « Pages Front-Office — Lancement vs Décembre » liste les routes en `/marketing/*`
> et met une page **Formation** en *Must* — or les routes sont en `/website/*` depuis le 03/07
> et Formation a été retirée le même jour. Les « 8 pages must » comptées ce jour-là ne décrivent
> pas ce site. **Ne pas s'en servir pour replanifier sans la corriger d'abord.**
>
> *(Mise à jour du 2026-09-16, au tri du projet Notion.)*

---

> **Source de vérité de l'arborescence.** Établi le 2026-07-28 en croisant le sitemap validé
> (Notion « Vision Stratégique & Messages Clés » §6), les décisions de la réunion du 28/07
> ([RECAP](propositions-PAD/RECAP-REUNION-2026-07-28.md)) et **les routes réellement déclarées
> dans `src/App.tsx`**. En cas d'écart, c'est le code qui fait foi — ce fichier le documente.
>
> ⚠️ **Corrigé le 29/07 — cet avertissement est devenu faux.** La base Notion
> [« Website pages »](https://app.notion.com/p/1accdd696db680dfb6e7d4ab472d5062) a été
> **reconstruite le 28/07 en fin de journée**, après l'écriture de ce fichier : 41 fiches,
> une par page, avec statut, niveau, lot, copy implémentée (miroir du code), copy validée,
> points à trancher, **composition & « à revoir en phase design »**, et maillage. C'est
> aujourd'hui le **plan de charge le plus complet du chantier** — s'y référer, pas
> l'ignorer. Ce qui reste vrai : le repo fait foi pour le build, et les fiches datent du
> 28/07 (certains défauts qu'elles signalent ont été corrigés depuis — voir §3).

---

## 1. Arborescence

```
/website                                    Accueil
│
├── /learning-app                           Learning App  ─────┐
│      └── #bibliotheque                    Bibliothèque de compétences (ancre, pas une route)
│
├── Accompagnement (dropdown, pas de page hub)
│   ├── /studio                             Studio IA & Pédagogie
│   ├── /upskilling                         Upskilling sur-mesure
│   └── /accompagnement                     Déploiement IA & SBO (méthode STRIDE)
│          └── /methode                     Méthode TLS  (sous-page, accès depuis STRIDE seul)
│
├── Ressources (dropdown, pas de page hub)
│   ├── /diagnostic                         Autodiagnostics SBO & IA
│   ├── /vigie                              La Vigie IA (newsletter)
│   └── /resources                          Magazine & Ressources (hub)
│       ├── /resources/:slug                Article           (template)
│       ├── /dossiers/:slug                 Dossier           (template)
│       ├── /guides/:slug                   Guide             (template)
│       ├── /videos/:slug                   Vidéo             (template, en veille V1)
│       └── /webinaires/:slug               Webinaire         (template, en veille V1)
│
├── /contact                                Contact  ← point de conversion de tout le site
├── /waitlist                               Accès anticipé
├── /equipe                                 Les Fondateurs  (accès footer, pas nav)
│
└── Légales (footer)
    ├── /mentions-legales
    ├── /politique-confidentialite
    ├── /cgv-cgu
    └── /charte-ia
```

**Redirections réelles** — un `<Navigate replace>`, donc une seule URL survit :

| Ancienne route | Redirige vers | Raison |
|---|---|---|
| `/website/formation` | `/website/learning-app` | Page Formation retirée du V1 (03/07 puis confirmé 28/07) |
| `/website/magazine` | `/website/resources` | Hub unique pour tous les formats |
| `/website/dossiers` | `/website/resources` | idem |
| `/website/temoignages` | `/website` | Cas clients retirés du V1 (cas fictifs vs FACTS-CANON) |

✅ **Deux alias se faisaient passer pour des redirections — corrigé dans le code le 16/09.**
`/website/ressources` et `/website/magazine/:slug` ne redirigeaient pas : elles rendaient **le
même composant** que leur équivalent canonique. Deux URLs servaient la même page, sur le hub
**et sur chaque article**. Le tableau ci-dessus les documentait à tort comme des redirections
depuis le 28/07 ; elles en sont devenues.

`<Navigate to="…">` prenant un chemin statique, la route à `:slug` passe par un petit composant
`SlugRedirect` (`src/App.tsx`) qui relit le paramètre — sans lui, le visiteur retombait sur le
hub et perdait l'article qu'il venait lire.

*Vérifié au navigateur : `/website/ressources` arrive sur `/website/resources`, et
`/website/magazine/ai-act-article-4-obligation-formation-ia` sur `/website/resources/…` avec le
bon article rendu.*

---

## 1 bis. Ce que le catalogue du 31/08 fait à cette arborescence

L'arbre du §1 décrit fidèlement `src/App.tsx`. **Il ne décrit plus l'offre.** La réunion de
rentrée a réécrit le catalogue, et l'écart avec le site est structurel, pas cosmétique.

### Les trois piliers ont changé de nom et de contenu

Le mot **« conseil » est abandonné** — session 3, verbatim : « *Pour ce qui est du conseil,
Method Stride et tout ça, en fait c'est pas bon, on n'arrivera pas à le vendre […] on va
l'appeler plutôt studio, ce qui nous donne le truc de l'artisan qui vient le faire pour toi.* »

| Avant (site actuel) | Après (31/08) |
|---|---|
| Learning App · Accompagnement & Conseil · Prestations expertes | **1 — Tech, SaaS & Marketplace** · **2 — Upskilling & Formation** · **3 — Studio & Intégration** |

### Une page en production vend une offre gelée

🛑 **`/website/accompagnement` (STRIDE).** Le catalogue classe **STRIDE / SBO Global
(30 000 € HT) « Gelée pour 2027, cible 2028 »**. La page est pourtant en nav principale, avec
Audit Flash, livrables et CTA de vente — et elle est listée dans `public/sitemap.xml`.

✅ **Appliqué dans le code le 16/09.** La page garde la thèse, les six étapes et « à qui la
méthode s'adresse ». Sont partis : la section **Audit Flash** (produit daté et chiffré), la
section **« Ce que vous obtenez »** (livrables contractuels + « un an d'accès offert à la
Learning App », qui portait en prime l'incohérence des 6 mois annoncés ailleurs), et les deux
CTA **« Réserver un Audit Flash STRIDE »**.

La traînée a suivi, parce qu'une page ne ment jamais toute seule : **six autres pages**
vendaient encore STRIDE. Nav et footer (où la méthode a quitté la colonne « Offres » pour
« Ressources »), accueil, Studio, Méthode, détail d'article et de dossier, diagnostic, et le
**formulaire de contact — dont « Accompagnement STRIDE » était le sujet pré-sélectionné par
défaut**, ce qui orientait vers l'offre gelée chaque demande entrante.

L'offre Studio réellement vendable devient le **Pack Sprint OS & Agents IA** — elle n'a toujours
pas de page.

⚠️ **Conséquence à arbitrer en phase design :** une fois dépouillée de son offre, cette page
raconte à peu près ce que raconte `/website/methode`. Fusionner, ou garder une page courte en
nav et une page longue en N2 ?

### Cinq offres validées n'ont aucune page

Aucune n'est une route aujourd'hui — c'est pour ça qu'elles ne figurent pas dans l'arbre du §1.
Chacune a désormais une fiche dans la base Notion « Website pages ».

| Offre | Prix | Pilier | Route proposée |
|---|---|---|---|
| **Pack Sprint OS & Agents IA** — 4 mois + 1 an de veille | **7 500 € HT min.** — lancement janvier 2027 | 3 | `/website/pack-sprint` |
| **Bootcamp IP Augmenté** — 4 demi-journées de 3h30, présentiel | **3 200 € HT** | 2 | `/website/bootcamp` |
| **Pack Flash Leçons** — 4 webinaires de 1h30, distanciel | **3 000 € HT** | 2 | `/website/flash-lecons` |
| **Marketplace Notion** — templates & agents | 250 à 1 500 € HT / licence | 1 | `/website/marketplace` — ⚠️ publication sur le site **non acquise** |
| **Coaching à la carte** | 150 € HT / heure | 1 | `/website/coaching` |

**Deux règles commerciales** n'apparaissent nulle part sur le site : **ticket minimum 3 000 € HT**
sur le sur-mesure, et **acompte de 50 % à la signature** avant démarrage des travaux Studio
(pas en formation).

### 🔴 Trois incohérences de prix à lever avant toute publication

1. **50 % d'acompte, ou 30/40/30 ?** La session 3 dit « acompte 50 % à la signature ». La réponse
   Q47, reprise en QS26, pose **30 % au démarrage / 40 % à 70 % des jalons / solde à la livraison**
   et réécrit l'OKR 4.3 dessus. Deux règles de paiement coexistent.
2. **Pass Solo : 30 €/mois ou 300 €/an ?** Deux sources, deux chiffres — et 300 ≠ 12 × 30.
3. **Accès Learning App inclus : 6 mois, 12 mois, ou selon l'offre ?** « 6 mois » sur les
   bootcamps, « 1 an » sur l'upskilling, « 6 mois à 1 an » dans la Prez. Trois périmètres.

### Et le statut du produit lui-même a changé

La Learning App est désormais un **outil d'ancrage offert** — session 3 : « *La Learning App ne
doit servir que comme outil d'ancrage offert. Tout ce qui est vente par abonnement, on s'en tape,
c'est du bonus.* » Objectif ~40 k€ sur l'année : **ce n'est plus un pilier de revenus**, et
`/website/learning-app` est encore écrite comme une offre SaaS de plein exercice.

⚠️ **Ne pas sur-corriger** : le MVP est en ligne depuis janvier et quatre clients bêta
l'utilisent. Ce qui est en pause, c'est le lancement de la version scalable — fonctionnellement
elle change très peu. La page ne vend pas un produit fantôme ; c'est son cadrage commercial qui
est faux.

---

## 2. Statut par page

| Page | Route | Copy source | Design | Statut V1 |
|---|---|---|---|---|
| Accueil | `/website` | PAD-page-homepage | refondu 28/07 | ✅ |
| Learning App | `/learning-app` | PAD-page-learning-app | refondu 28/07 | ✅ |
| Bibliothèque de compétences | ancre | PAD-page-bibliotheque-competences | refondu 28/07 | ✅ |
| Studio IA & Pédagogie | `/studio` | PAD-page-studio-ia-pedagogie | créé 28/07 | ✅ |
| Upskilling | `/upskilling` | PAD-page-upskilling | refondu 28/07 | ✅ |
| Déploiement IA & SBO (STRIDE) | `/accompagnement` | PAD-page-accompagnement-stride | refondu 28/07 | ✅ ⚠️ libellé nav non tranché |
| Méthode TLS | `/methode` | PAD-page-methode-tls | refondu 28/07 | ✅ |
| Autodiagnostics | `/diagnostic` | PAD-page-autodiagnostic + prototype PAD | refondu 28/07 | ✅ |
| La Vigie IA | `/vigie` | Stratégie Contenu B2B §5 (structure éditoriale réelle) | créé 28/07 | ✅ |
| Les Fondateurs | `/equipe` | PAD-page-fondateurs | refondu 28/07 | ✅ |
| Magazine & Ressources | `/resources` | PAD-blog-magazine-strategie | **antérieur (03/07)** | 🟡 contenu à arbitrer |
| Contact | `/contact` | aucune (réunion : garder l'existante) | **antérieur**, claims purgés 28/07 | 🟡 |
| Accès anticipé | `/waitlist` | aucune | **antérieur** | 🟡 promesse à aligner |
| Légales ×4 | — | — | **antérieur** | 🟡 jamais repassées au pivot |

> ⚠️ **La colonne « Statut V1 » ne parle que du code, jamais de l'offre** *(précision du 16/09)*.
> Un ✅ veut dire « la page est construite et sa copy est posée », pas « ce qu'elle raconte est
> encore vrai ». Six lignes sont ✅ **et** périmées sur le fond depuis le 31/08 : Accueil (les
> trois piliers), Learning App (statut commercial), Studio (monte au rang de pilier 3), Upskilling
> (deux offres manquantes), STRIDE (offre gelée), Méthode TLS (doublon à venir). Détail au §1 bis.
>
> **Les 4 pages légales sont bloquées par un tiers.** L'étape 3.4 du plan Agents dit que les
> documents RGPD chez l'avocat bloquent « *l'ouverture des formulaires du site* » — et **l'avocat
> n'est pas identifié**. Ce 🟡 ne dépend donc pas du chantier site.

---

## 3. Templates de contenu — ce que la stratégie exige vs ce qui existe

Le [doc de cadrage Magazine](propositions-PAD/PAD-blog-magazine-strategie.md) §3 définit
**4 formats d'articles**, pas 5 types de contenus. Correspondance :

| Format stratégie | Volume | Template qui le sert | État |
|---|---|---|---|
| Guides piliers (evergreen) | 2 000+ mots, chapitré, sourcé | **Dossier** | ✅ 1 contenu réel |
| Décryptages méthodologiques | 1 200-1 500 mots | **Article** | ✅ 15 contenus |
| Playbooks / grilles pratiques | 800-1 000 mots, checklists, téléchargeables | **Guide** (PDF, gate email) | ⚠️ placeholders |
| Interviews & cas clients | 1 000-1 200 mots | **Article** (variante) | ❌ aucun contenu |

**Vidéos et Webinaires ne figurent pas dans la stratégie éditoriale validée.** Leurs templates
existent et fonctionnent, mais sans contenu réel et sans rôle défini.

→ **Reco V1 : 3 templates actifs** (Article, Dossier, Guide) · **2 en veille** (Vidéo, Webinaire),
masqués tant qu'il n'y a pas de contenu réel.

### Points de conversion — 2 sur 3 branchés (corrigé le 29/07)

La stratégie §4 exige que **chaque article** porte trois points de contact :

| # | Point de contact | État |
|---|---|---|
| 1 | **CTA milieu d'article** → lancer un Autodiagnostic | ✅ `DiagnosticInlineCta` |
| 2 | **Bandeau bas d'article** → s'abonner à La Vigie IA | ✅ `VigieSignupBanner` |
| 3 | **Sticky sidebar** → demander une démo | ❌ absent |

Les deux premiers vivent dans [`components/ContentConversion.tsx`](../../src/pages/marketing/components/ContentConversion.tsx)
et sont importés par `MarketingArticleDetail.tsx` **et** `MarketingDossierDetail.tsx`.

> ⚠️ **Ce paragraphe annonçait « zéro » jusqu'au 29/07.** Il avait été écrit le 28/07 avant
> le commit `4893c9f` du même jour, qui a branché les deux CTA. Vérifié au code le 29/07.
> Même correction pour les métadonnées : la fiche Notion de `/resources` annonce « aucune
> balise SEO 🔴 » et « formulaire mort 🔴 » — **les deux sont faux aujourd'hui**. Les 19
> pages marketing portent un `SEOHead`, et le formulaire newsletter de `MarketingResources`
> est câblé sur `submitForm` avec état contrôlé.

---

## 4. `public/sitemap.xml`

Le fichier XML servi aux moteurs doit lister les pages **indexables** : ni les légales
(faible valeur SEO, tolérées), ni les routes de redirection, ni les templates `:slug`
sans contenu réel. Régénéré le 28/07 — voir §2 pour le périmètre.

**État vérifié le 16/09 : 15 URLs**, toutes en `/website/*`, conformes au §1. Les deux alias
(`/ressources`, `/magazine/:slug`) n'y sont pas — c'est bien.

**`/website/accompagnement` y reste, et c'est voulu** *(tranché le 16/09)*. La page a été
rétrogradée en page de méthode le même jour : elle ne vend plus rien, donc plus rien ne s'oppose
à son indexation — une méthode documentée est un bon contenu d'entrée. La seule question qui
resterait est celle du **doublon avec `/website/methode`**, et elle dépend de l'arbitrage de
fusion, pas du statut commercial de l'offre.

---

## 5. Cohérence Notion ↔ code

⚠️ **Ce paragraphe était faux, corrigé le 16/09 après relevé de la base ligne par ligne.**
Il annonçait des fiches pointant vers `MarketingConseil.tsx`, `MarketingFormation.tsx` et
`MarketingMagazine.tsx`, et des URLs en `/marketing/*`. **Plus rien de tout cela n'existe dans la
base** : les 46 fiches portent des URLs en `/website/*`, et aucune ne référence ces trois
fichiers. Le paragraphe avait été écrit le 28/07 dans la journée — la base a été **reconstruite
le soir même**, ce que l'avertissement de tête signalait déjà sans que le §5 en tire les
conséquences. **Deux sections du même fichier se contredisaient depuis sept semaines.**

C'est le piège à connaître : quand un document se corrige en tête sans relire sa fin, il devient
plus dangereux qu'un document franchement périmé — parce qu'il a l'air tenu à jour.

### L'état réel au 16/09

**46 fiches** (41 + 5 créées au tri), une par page, avec statut, niveau, lot, copy implémentée
(miroir du code), copy validée, écarts, composition et maillage. C'est le **plan de charge le plus
complet du chantier**, et il est utilisable.

Ce qui reste vrai, et qui ne change pas : conformément à la règle actée le 28/07
([README propositions-PAD](propositions-PAD/README.md)), **le repo est la vérité, Notion est
l'atelier.** Ce fichier est le miroir documentaire de `src/App.tsx`.

Ce qu'il faut savoir avant d'ouvrir la base :

- **Les fiches datent du 28/07** pour les 41 premières. Certains défauts qu'elles signalent ont
  été corrigés depuis (voir §3) ; leur section « à revoir en phase design » reste pertinente.
- **Sept fiches portent un encart daté du 16/09** disant ce que le pivot leur fait.
- **La colonne `Version`** a deux valeurs qui sont des échéances **toutes deux dépassées**
  (« V1 · Lot 1 — 06/08 », « V1 · Lot 2 — 03/09 »). Elle ne trie plus rien.
- ⏳ **Les identifiants Notion vont bouger.** Les actions D1 et F2 du chantier agents recréent les
  bases `Projets & Missions` et `Docs` entre le **21/09 et le 4/10** : les liens Notion de ce
  fichier sont à revérifier après cette fenêtre.

---

## 6. Refaire les pages : d'où vient la matière (méthode, 16/09/2026)

**Piège à connaître avant de commencer : la « copy validée » des fiches Notion n'est pas une
source.** Chaque fiche porte trois états du texte — copy PAD (archive), copy implémentée (miroir
du code), copy validée (la surface d'édition). La troisième a été **pré-remplie à l'identique de
la seconde** le 28/07, et **les 46 fiches ont toutes leur dernière édition au 27 ou 28 juillet** :
personne n'a écrit dedans depuis. Chaque section verte porte d'ailleurs la mention « Statut : non
relue ».

→ **Refaire une page « à partir de la copy de sa fiche » reproduirait donc le texte déjà en
ligne.** Ce n'est pas une source, c'est un miroir.

**Ce que les fiches apportent réellement, et qui n'est nulle part ailleurs :**

| Section de la fiche | Ce qu'on en tire |
|---|---|
| **⚠️ Écarts PAD → implémentée** | Les déviations volontaires et leur motif (contraintes FACTS-CANON, incohérences levées). Déjà appliquées au code — à ne pas défaire par mégarde |
| **🔴 À revoir en phase design** | **La vraie matière.** De la dette de composition, nommée page par page |
| **🔗 Maillage** | Les liens entrants et sortants attendus — ce qui casse si on retire une page |
| **🎨 Design & composition** | L'état des lieux section par section, avec le motion en place et son statut de validation |

**La méthode retenue : copy inchangée, composition refaite au design system.** Les tokens du
`@theme` de `src/index.css` font foi, les requêtes de conteneur remplacent les seuils de fenêtre
sur tout composant de contenu (voir `src/lib/grid-columns.ts`), et les règles de rayon R1/R3/R4
s'appliquent.

### Première page traitée — la séquence STRIDE

La fiche disait : « *La séquence STRIDE est la meilleure matière visuelle du site et elle est
traitée en simple liste. Six étapes ordonnées avec livrables : il y a une vraie occasion de
composition (chronologie, progression, jalons) qui n'est pas prise.* »

Ce qui a été fait :

- **Une épine dorsale** relie les six jalons et s'arrête au centre de la première et de la
  dernière pastille. C'est elle qui fait la différence entre une liste et une séquence.
- **Des ordinaux `01` → `06`** devant chaque phase : l'ordre devient explicite, au lieu d'être
  déduit de la position.
- **Requête de conteneur** (`@3xl`) à la place du seuil de fenêtre `md:` : la séquence répond
  désormais à sa propre largeur. Mesuré à 343 px de conteneur, elle retombe proprement sur deux
  colonnes sans débordement horizontal.
- **Rayon des pastilles : `rounded-2xl` → `rounded-lg`.** 56 px de côté, donc au-dessus du seuil
  des 28 px : le rayon prend l'échelle, comme la Card et le Button.
- 🔴 **Un défaut d'accessibilité corrigé au passage.** `FadeInWhenVisible` rend une `<div>` :
  enveloppée autour du `<li>`, elle produisait `<ol><div><li>`, **markup invalide** qui casse la
  sémantique de liste et neutralise les sélecteurs de position. La motion vit désormais *dans*
  le `<li>`.

⚠️ **Le même `<ol>`/`<ul>` enveloppé de `FadeInWhenVisible` existe ailleurs** — au moins la
section « Pour qui » de cette page et la liste des offres de l'accueil. À traiter page par page,
au fil de la refonte.
