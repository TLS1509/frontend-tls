# MODULE 1 : WEB DESIGN & VISUAL DESIGN

**Durée : 60 minutes · 50 slides**

> **Version corrigée du 2026-07-23.** Le fond de ce module est solide et bien
> sourcé. Les corrections portent sur une **erreur de contraste calculable,
> répétée cinq fois** (grave dans un module qui enseigne l'accessibilité) et sur
> une poignée de chiffres fabriqués. Le reste est conservé. Journal des
> corrections en fin de document.

**Objectifs**
- Maîtriser la typographie web : hiérarchie, association, accessibilité
- Appliquer la théorie des couleurs et les design tokens dans une interface
- Construire des mises en page cohérentes avec un système d'espacement

---

## PARTIE 1 · Typographie (slides 1-10)

### Pourquoi la typographie porte le design

L'essentiel d'une interface est du texte. Oliver Reichenstein l'a résumé par une
formule — **« Web Design is 95 % Typography »** (2006). C'est une **thèse
rhétorique**, pas une mesure : elle dit que soigner la typographie, c'est soigner
l'essentiel de ce que l'utilisateur lit. Ellen Lupton : *« Typography is what
language looks like. »*

### Anatomie et catégories

Ligne de base, hauteur de capitale, hauteur d'x, jambages. Quatre familles et
leurs usages :

| Famille | Exemples | Registre | Usage |
|---|---|---|---|
| **Serif** | Times, Georgia | Autorité, tradition | Édition, presse |
| **Sans-serif** | Helvetica, Inter | Modernité, clarté | Interface |
| **Monospace** | Courier, Fira Code | Technique | Outils de dev |
| **Display** | League Spartan, Poppins | Impact | Titres, hero |

### La règle TLS : deux polices maximum

❌ Cinq polices = chaos visuel. ✅ **League Spartan (titres) + Nunito (corps).**
Trois bénéfices : cohérence, performance de chargement, maintenance.

**Trois méthodes d'association** : par contraste (serif + sans-serif), par
superfamille (Roboto + Roboto Slab), ou géométrique + humaniste — c'est le choix
TLS.

### Hiérarchie typographique TLS

| Niveau | Taille | Graisse |
|---|---|---|
| H1 | 48-60 px | Black, League Spartan |
| H2 | 36-48 px | Bold, League Spartan |
| H3 | 24-30 px | SemiBold, League Spartan |
| H4 | 18-20 px | SemiBold, League Spartan |
| Corps | 16 px | Regular, Nunito |
| Petit | 14 px | Regular, Nunito |
| Légende | 12 px | Regular, Nunito |

**Interlignage** : 1,2 pour les titres (serré, impactant), 1,5 à 1,6 pour le corps
(confortable). **Longueur de ligne** : 50 à 75 caractères — au-delà, la lecture
fatigue.

### Accessibilité typographique

- **Taille minimale** : 16 px pour le corps
- **Contraste WCAG AA** : 4,5:1 en texte normal, 3:1 en grand texte (≥ 18 px gras
  ou ≥ 24 px)

⚠️ **C'est ici que se trouvait l'erreur la plus grave du module.** Voir la partie
suivante : le teal de marque `#55A1B4` **ne passe pas** le seuil AA sur du texte.

---

## PARTIE 2 · Couleur et design tokens (slides 11-25)

### Psychologie des couleurs — avec prudence

Les associations couleur/émotion sont des **conventions culturelles**, pas des
lois. À manier comme des repères, pas comme des preuves :

- **Bleu `#55A1B4`** : confiance, sérénité → actions, liens
- **Orange `#ED843A`** : énergie, action → notifications, incitations
- **Jaune `#F8B044`** : optimisme → gamification, points

> ⚠️ **Deux affirmations retirées de ce slide.** Le « bleu = 80 % des plateformes
> finance/EdTech » n'a aucune source. Et l'histoire « Facebook est bleu à cause de
> l'addiction, selon Sean Parker » est un amalgame : le bleu de Facebook vient du
> daltonisme rouge-vert de Zuckerberg (qu'il a déclaré) ; Sean Parker a parlé de la
> boucle de validation dopaminergique du produit, **jamais de la couleur**.

### La palette TLS et les tokens

```
/* Primitives — valeurs brutes */
--blue-500: #55A1B4;
--orange-500: #ED843A;
--accent-500: #F8B044;

/* Tokens — alias sémantiques */
--color-brand-primary: var(--blue-500);
--color-cta-secondary: var(--orange-500);

/* Usage */
.btn-primary { background: var(--color-brand-primary); }
```

**Pourquoi les tokens** : une source de vérité unique, une maintenance à un seul
endroit, un mode sombre par simple échange de valeurs, une palette extensible.

### ⚠️ Contraste et accessibilité — la correction centrale

**Les ratios WCAG affichés dans la version précédente étaient faux.** Recalculés
de première main (WCAG 2.1) :

| Couleur sur blanc | Le module affichait | Ratio réel | Verdict |
|---|---|---|---|
| **`#55A1B4`** (teal de marque) | « 4,6:1 ✅ AA » | **2,94:1** | ❌ échec AA *et* grand texte |
| **`#ED843A`** (orange) | « 3,2:1 ⚠️ AA grand texte » | **2,64:1** | ❌ échec même en grand texte |
| **`#F8B044`** (jaune) | « 2,1:1 ❌ échec » | **1,86:1** | ✅ conclusion juste |

**La cause de l'erreur** : le module a pris le teal **clair** de marque pour une
teinte foncée conforme. Ils ne le sont pas.

**La règle à enseigner** :
- Pour du **texte** conforme AA, descendre à **`#3D7786` (primary-700) = 5,02:1**.
- Le teal `#55A1B4` reste utilisable pour les **fonds et éléments non textuels**
  (seuil 3:1), jamais pour du texte sur blanc.

> 💡 **C'est exactement la règle qui vaut pour l'app TLS et pour Prompt Buddy** :
> le teal de marque est décoratif, pas un teal de texte. Un module qui enseigne
> l'accessibilité doit être exemplaire sur ce point précis.

**Outil de vérification** : WebAIM Contrast Checker. Toujours mesurer, jamais
supposer — c'est la leçon de cette correction.

### Gradients, neutres, couleurs de statut

Les gradients TLS (primaire, chaud, tri-couleurs) sont réservés aux **grandes
surfaces** — hero, cartes, boutons principaux — et aux titres H1/H2. Jamais sur
un petit élément (< 40 px), jamais sur du texte de corps.

**Couleurs de statut** : succès = teal, erreur = rouge `#C0152F`, avertissement =
orange, information = bleu.

**Matrice d'usage (slide 24, recalculée)**

| Élément | Clair | Sombre | Contraste sur fond |
|---|---|---|---|
| Texte principal | neutral-900 | gray-200 | 15:1 ✅ |
| **Action principale (texte)** | **primary-700** `#3D7786` | teal-300 | **5,02:1 ✅** |
| Action principale (fond seul) | blue-500 | — | 2,94:1 → décoratif, texte blanc à vérifier |

⚠️ La ligne « Primary Action 4,6:1 » de la version précédente héritait de
l'erreur. Toute la matrice a été recalculée.

### Exercice — audit couleur

Analyser une plateforme EdTech (Coursera, Udemy, Khan Academy) : palette,
tokens, **et mesurer les contrastes au WebAIM Checker** — pas les estimer. Livrable :
capture annotée + tableau. *(Les ratios concurrents cités dans la version
précédente — Coursera 4,9:1, etc. — étaient non vérifiés : à re-mesurer.)*

---

## PARTIE 3 · Mise en page et espacement (slides 26-40)

### Le système d'espacement en base 4 px

```
--space-1: 4px;    --space-2: 8px;    --space-3: 12px;
--space-4: 16px;   --space-6: 24px;   --space-8: 32px;   --space-12: 48px;
```

**Pourquoi la base 4** : tous les espacements sont des multiples de 4, ce qui
garantit l'alignement avec les grilles et reste extensible.

⚠️ **Nom des tokens, corrigé le 2026-09-14.** Les `--space-1 … --space-12`
ci-dessus **n'existent pas sous ce nom** dans le repo. La base-4 y passe par
l'échelle Tailwind (`p-3` = 12 px…) et par des tokens **sémantiques** nommés par
l'intention, pas par le chiffre — `--spacing-stack-xs` (8) · `--spacing-stack`
(16) · `--spacing-stack-lg` (24) · `--spacing-section` (32) · `--spacing-page`
(48). Le principe du module est juste ; c'est la nomenclature qui a dérivé.
Préférer toujours le token sémantique (`gap-stack`) au chiffre générique
(`gap-4`) : il dit l'intention.

**Padding (interne) vs margin (externe)** : le premier agit dans le composant, le
second entre les composants.

### L'espace, valeur de lisibilité

> ⚠️ **Chiffre retiré.** « 1 px d'espace en plus = +10 % de qualité perçue,
> Material Design » est fabriqué — Material Design ne dit pas cela.

Le principe, lui, tient sans chiffre : **un espacement généreux améliore la
lisibilité et la perception de qualité.**

⚠️ **Règle TLS corrigée le 2026-09-14.** Ce module disait « padding minimal des
cartes 20 px ». La doctrine du 2026-09-09 est plus précise, et donne sa raison :
**24 px au canon (`p-stack-lg`), 16 px (`p-stack`) en unique dérogation dense.
Pas de troisième valeur.** Ce qui décide n'est pas le padding seul mais **son
rapport au rayon** : sous ~1,4×, le contenu serre la courbe et le coin se lit
comme une coupe. Avec le rayon de carte à 14 px, 16 px ne donne que 1,14× — 24 px
donne 1,71×. `Card.tsx` tient déjà la décision (`size="md"` = 24 px par défaut).
Sections : 48 px reste juste.

### Rayons, ombres, patterns

⚠️ **Échelle corrigée le 2026-09-14.** Celle qu'affichait ce module
(`sm 6 / base 8 / lg 12 / xl 16 / 2xl 24 / full 9999`) n'est pas celle du code.
La vraie, dans le bloc `@theme` de `src/index.css` — **source de vérité** :

```
--radius-xs: 4px;   --radius-sm: 6px;    --radius-md: 10px;
--radius-lg: 14px;  --radius-xl: 20px;   --radius-2xl: 24px;
--radius-pill: 999px;
```

Trois écarts : `--radius-base` n'existe pas, `lg` vaut **14** et non 12, `xl`
vaut **20** et non 16, et la pilule s'appelle `pill`, pas `full`.

**Le rayon de référence de la carte est 14 px** (`rounded-lg`), décidé le
2026-09-09. La raison est instructive et vaut pour tout le module : la Card porte
**une bordure de 1 px**, et bordure et rayon se contredisent au-delà d'une
certaine courbe — à 24 px la courbe est longue, un trait fin ne la tient pas, le
coin paraît mou. Un grand rayon marche, mais **sans bordure et avec une ombre** —
autre registre. Le registre TLS est diurne : il *pose* ses objets, il ne les fait
pas flotter.

**Et un piège de vocabulaire** : `rounded-full` ne vaut pas 50 %. Tailwind v4 le
génère à `3.40282e38px` — l'infini d'un float. Sur un rectangle le navigateur
plafonne tout rayon à la moitié de la plus petite dimension, donc `rounded-full`
et `rounded-pill` **rendent exactement pareil**. On préfère `rounded-pill` parce
que c'est le token TLS, pas parce que le rendu diffère.

**Ombres douces** (opacité 0,04 à 0,06), jamais dures. Patterns récurrents :
carte, grille de dashboard responsive (`repeat(auto-fit, minmax(300px, 1fr))`).

### Hiérarchie visuelle et Gestalt

L'ordre d'importance se lit par **taille, graisse, couleur, position** (lecture en
F). Les principes de Gestalt : proximité, similarité, continuité, clôture.

### Exercice — wireframe

Wireframe basse fidélité d'une page « Détail d'un cours » : 3 colonnes,
espacement en base 4 px, 15 minutes.

---

## PARTIE 4 · Cas pratiques et synthèse (slides 41-50)

### Analyses

**Coursera** — une seule police (Proxima Nova), bleu primaire, hero pleine largeur,
grille 4 colonnes, sections généreuses. **Khan Academy** — Lato, teal de succès,
barre latérale fixe, gamification (progression, badges, séries).

### Anti-patterns

Trop de polices · couleurs sans raison · espacement incohérent (7, 13, 21 px) ·
texte trop petit · **contraste faible** — le défaut que ce module lui-même
contenait.

### Checklist design visuel

- ☑ Deux polices maximum
- ☑ Hiérarchie typographique définie
- ☑ Palette de 3 à 5 couleurs + neutres
- ☑ Design tokens définis
- ☑ **Contraste WCAG AA vérifié au calculateur — pas supposé**
- ☑ Espacement en base 4 px
- ☑ Rayons cohérents, ombres douces

### Quiz (10 questions) — extrait corrigé

3. Contraste minimal WCAG AA, texte normal ? → **4,5:1**
4. Espacement de base TLS ? → **4 px**
9. Longueur de ligne optimale ? → **50 à 75 caractères**
10. Police TLS pour les titres ? → **League Spartan**

> ⚠️ **Question ajoutée** : « Le teal de marque `#55A1B4` sur blanc passe-t-il le
> seuil AA pour du texte ? » → **Non : 2,94:1. Pour du texte AA, utiliser
> `#3D7786` (5,02:1).** C'était l'erreur de ce module — elle devient une question.

### Projet et évaluation

Redesign d'une page d'accueil EdTech (2 h, Figma). Critères : typographie (25),
couleurs **avec contraste validé au calculateur** (25), mise en page (20),
hiérarchie visuelle (15), finition (15). Seuil : 70/100.

---

## Ressources

- « Thinking with Type » — Ellen Lupton
- « The Elements of Typographic Style Applied to the Web »
- Refactoring UI — Adam Wathan & Steve Schoger
- WebAIM Contrast Checker · Contrast Ratio (Lea Verou)

---

## 📋 Journal des corrections — 2026-07-23

| # | Problème d'origine | Correction |
|---|---|---|
| 1 | **`#55A1B4` sur blanc = « 4,6:1 ✅ AA »** — répété slides 10, 16, 24, script, quiz | Corrigé en **2,94:1 (échec)**, recalculé de première main. Règle enseignée : `#3D7786` (5,02:1) pour le texte, `#55A1B4` décoratif |
| 2 | `#ED843A` = « 3,2:1 AA grand texte » | Corrigé en **2,64:1 (échec même en grand texte)** |
| 3 | `#F8B044` = « 2,1:1 » | Ajusté à **1,86:1** — conclusion « échec » inchangée |
| 4 | Matrice de contraste slide 24 : « Primary Action 4,6:1 » | Recalculée intégralement |
| 5 | « Bleu = 80 % des plateformes finance/EdTech » | Supprimé — non sourcé |
| 6 | « Facebook bleu → addiction selon Sean Parker » | Amalgame retiré (daltonisme de Zuckerberg / boucle dopaminergique du produit — deux choses distinctes) |
| 7 | « 1 px d'espace = +10 % de qualité perçue (Material Design) » | Chiffre supprimé, principe conservé sans chiffre |
| 8 | Contrastes concurrents (Coursera 4,9:1…) présentés comme exacts | Marqués « à re-mesurer » |
| 9 | Titre « Typo = 80 % du design » | Requalifié : le « 95 % typographie » de Reichenstein est une **thèse rhétorique**, pas une mesure |
| 10 | Quiz sans question sur l'accessibilité couleur | Question ajoutée sur le contraste du teal de marque |

## 📋 Journal des corrections — 2026-09-14 (seconde passe)

Trois valeurs avaient **dérivé du code** depuis la passe du 23/07. Ce n'est pas le
même type d'erreur que les précédentes : rien n'était inventé, c'est le produit qui
a bougé et le cours qui ne l'a pas suivi.

| # | Ce que disait le module | Mesuré dans le code, le 2026-09-14 |
|---|---|---|
| 11 | Échelle de rayons `sm 6 / base 8 / lg 12 / xl 16 / 2xl 24 / full 9999` | **`xs 4 / sm 6 / md 10 / lg 14 / xl 20 / 2xl 24 / pill 999`** (`src/index.css`, bloc `@theme`). Rayon de carte = **14 px** depuis la décision du 09/09, avec sa raison (bordure 1 px vs longueur de courbe) |
| 12 | « Padding minimal des cartes 20 px » | **24 px au canon, 16 px en dérogation dense** — et la règle réelle est le **rapport padding/rayon** (≥ ~1,4), pas une valeur absolue |
| 13 | Tokens d'espacement `--space-1 … --space-12` | Ces noms **n'existent pas** dans le repo : échelle Tailwind + tokens sémantiques `--spacing-stack*` / `-section` / `-page`. Principe base-4 conservé |

> 💡 **C'est l'exercice du module 4 à l'envers.** Là-bas, tu traques un concept qui
> a deux valeurs dans le code. Ici, c'est le *cours* qui a dérivé du code. Même
> discipline : une seule source de vérité, et c'est `src/index.css`.

---

**Conservé** : toute la partie typographie (anatomie, familles, association,
hiérarchie, interlignage, longueur de ligne) · les design tokens · le système
d'espacement base 4 px · rayons, ombres, patterns · hiérarchie visuelle et
Gestalt · les analyses Coursera/Khan · la checklist · le projet. Le fond était
solide.
