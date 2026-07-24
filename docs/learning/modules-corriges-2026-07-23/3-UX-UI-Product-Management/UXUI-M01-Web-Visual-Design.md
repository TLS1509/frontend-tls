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

**Padding (interne) vs margin (externe)** : le premier agit dans le composant, le
second entre les composants.

### L'espace, valeur de lisibilité

> ⚠️ **Chiffre retiré.** « 1 px d'espace en plus = +10 % de qualité perçue,
> Material Design » est fabriqué — Material Design ne dit pas cela.

Le principe, lui, tient sans chiffre : **un espacement généreux améliore la
lisibilité et la perception de qualité.** Règle TLS : padding minimal des cartes
20 px, des sections 48 px.

### Rayons, ombres, patterns

```
--radius-sm: 6px;   --radius-base: 8px;   --radius-lg: 12px;
--radius-xl: 16px;  --radius-2xl: 24px;   --radius-full: 9999px;
```

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

**Conservé** : toute la partie typographie (anatomie, familles, association,
hiérarchie, interlignage, longueur de ligne) · les design tokens · le système
d'espacement base 4 px · rayons, ombres, patterns · hiérarchie visuelle et
Gestalt · les analyses Coursera/Khan · la checklist · le projet. Le fond était
solide.
