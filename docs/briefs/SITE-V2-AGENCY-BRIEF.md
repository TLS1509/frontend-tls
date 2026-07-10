# Site V2 — Brief agency-grade & prompt Fable 5

> **But de ce document** : préparer en amont le maximum pour lancer un one-shot Fable 5 réussi (site vitrine cinématique, orienté motion), en maîtrisant la consommation de crédits. Trois parties : (1) Fable 5 mode d'emploi + crédits, (2) le brief créatif, (3) le prompt prêt à coller.
>
> Créé le 2026-07-07. Source de vérité design = `CLAUDE.md`, `DESIGN.md`, `src/index.css`, `src/components/marketing/motion/`.

---

## PARTIE 1 — Fable 5 : mode d'emploi & maîtrise des crédits

### Ce qu'est Fable 5 (faits vérifiés, doc Anthropic 2026-06-09)

| Point | Détail |
|---|---|
| Positionnement | Modèle le **plus capable** d'Anthropic, pour le raisonnement exigeant et l'agentique long-horizon |
| Contexte / sortie | **1M tokens** de contexte, **jusqu'à 128k** tokens de sortie par requête |
| Prix | **10 $ / M tokens en entrée**, **50 $ / M tokens en sortie** → le modèle **le plus cher** du catalogue |
| Crédits (⚠️) | Jusqu'au **7 juillet 2026** : inclus dans Pro/Max/Team jusqu'à 50 % des limites hebdo. **À partir du 8 juillet** : ne tire plus des abonnements, facturé **au pay-per-use** (crédits, tarifs API ci-dessus) — **même pour les abonnés Pro** |
| Thinking | **Adaptive thinking toujours actif** (impossible à désactiver). On règle la profondeur via le **paramètre `effort`** |
| Refus | Classifieurs de sécurité intégrés : peut renvoyer `stop_reason: "refusal"` (HTTP 200, pas une erreur). **Tu n'es pas facturé** pour un refus avant génération. Requêtes cyber/bio parfois re-routées vers Opus 4.8 (pas au tarif Fable) |

### Les 9 leviers pour réduire la consommation de crédits

Appliqués à **notre** cas (générer le site) :

1. **Le bon modèle pour la tâche.** Fable 5 = réservé au one-shot créatif à forte valeur (le hero cinématique complet). Le reste (brouillons, itérations mineures, corrections) → Sonnet 5 / Opus 4.8. C'est le levier n°1.
2. **Brouiller cheap, escalader expensive.** Ce brief + le prompt ont été rédigés en Sonnet. On n'apporte à Fable que l'étape finale à haute valeur.
3. **Prompt serré et structuré.** Objectif + contexte + inputs + contraintes + **format de sortie exact**, tout en amont → Fable réussit au premier coup, pas de régénération coûteuse. (C'est tout l'objet de la Partie 3.)
4. **Trimmer le contexte.** N'injecter que ce qui sert : tokens du DS, liste d'assets, anti-patterns, la direction choisie. Pas le repo entier.
5. **Format de sortie demandé d'emblée.** On précise « un seul composant React `.tsx` complet, prêt à compiler » → pas de tour de rattrapage « maintenant mets-le en un fichier ».
6. **Batcher dans une seule session.** Toute l'itération sur le hero dans une conversation continue (réutilise le contexte en cache) plutôt que rouvrir des chats.
7. **Agent en laisse courte.** Si on lance Fable en agent, borner : un livrable, des fichiers nommés, un point d'arrêt clair. Pas de run ouvert qui sur-explore.
8. **Régler `effort`.** Adaptive thinking est toujours ON ; baisser `effort` sur les passes simples, le monter seulement pour le hero.
9. **Vérifier le solde avant un gros run.** Regarder les crédits restants avant de lancer, pour ne pas couper au milieu (redémarrage = coûteux).

### Notre plan crédit-conscient (recommandé)

- **Étape A (gratuit / Sonnet-Opus, déjà fait) :** ce brief, le prompt, les assets préparés, les 4 directions prototypées.
- **Étape B (Fable 5, UN seul run ciblé) :** coller le prompt de la Partie 3 → obtenir le hero + 1-2 sections signature en un fichier compilable. C'est là que la capacité de Fable justifie le coût.
- **Étape C (retour Sonnet/Opus) :** brancher le résultat, corriger la compilation, tester, propager aux autres sections. Pas besoin de Fable pour ça.

> **Garde-fou** : un seul appel Fable bien préparé coûte typiquement quelques dizaines de milliers de tokens de sortie (le hero fait ~800-1500 lignes). À 50 $/M en sortie, un hero de ~30k tokens ≈ 1,50 $. Le vrai risque crédit, c'est **l'itération non préparée** (10 allers-retours) — d'où ce brief.

Sources : [Anthropic — Introducing Claude Fable 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5) · [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5) · [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) · [9 ways to reduce Fable 5 credit usage](https://www.aiagentslibrary.com/blog/save-claude-fable-5-credits/) · [Pricing / July 7 switch](https://www.digitalapplied.com/blog/claude-fable-5-usage-credits-july-7-pricing-guide-2026)

---

## PARTIE 2 — Brief créatif : site vitrine agency-grade, orienté motion

### 2.1 Le job du site (une phrase)

Faire comprendre en 5 secondes que **The Learning Society augmente les formateurs et les organisations avec l'IA, sans perdre l'humain au centre**, puis diriger vers l'une des deux portes : *je représente une entreprise* (Accompagnement) ou *je veux me former* (Learning App).

### 2.2 Positionnement & contraintes d'honnêteté (non négociables)

- Marque : **The Learning Society** (TLS). Deux co-fondateurs **uniquement** : Chloé Mimault, Pierre-Armand Dennery.
- Trois offres canoniques : **formation certifiante** (Formateur Augmenté par l'IA, 7 modules, en partenariat C-Campus), **Learning App adaptative**, **Accompagnement / Conseil** (méthode STRIDE).
- **Interdits absolus** : aucune métrique inventée (adoption %, complétion %, ROI…), aucun nom de client, **jamais** CPF, **jamais** Qualiopi (TLS non certifié), pas de « L'Académie ». Éligibilité : **OPCO oui, CPF non**. Open Badge **sans** « 2.0 » côté formation C-Campus.
- Registre : **« vous »** partout sur le public. Pas d'em dash dans la copie.

### 2.3 North-star direction : « Cinematic Editorial »

Synthèse des 4 prototypes explorés (`_v2-cinematic-a`, `-b`, `_v2-jardin`, `_v2-chemin`). La direction retenue pour le brief :

> **Une peinture vivante en ouverture, une retenue éditoriale dans le rythme, un seul moment produit interactif.**

- **Hero** = vidéo peinte plein cadre (le **Bosch teal** `bosch-jardin-terrestre-teal-15s.mp4` OU le **paysage-chemin** `paysage-chemin-rotonde-teal-6s.mp4`), traitée comme un tableau : poussée caméra lente (scale sur **une seule couche**, lié au scroll), titre révélé une fois. **Zéro washout** : lisibilité par vignette/panneau ciblé, jamais un voile uniforme.
- **Rythme éditorial** : peu d'éléments animés à la fois, séquence > simultané. Beaucoup d'espace, une couleur saturée qui ponctue (teal ou l'ambre).
- **Un moment produit vivant** : le `InteractiveAppMockup` (4 onglets réels Parcours/Coaching/Journal/Veille) comme preuve tangible, respiration lente au repos.
- **Boucle Apprendre → Pratiquer → Valider** en paliers scroll-déclenchés (pattern `StickyScrollStory`), discrète, jamais scroll-jackée.

### 2.4 Vocabulaire de motion (autorisé / interdit)

**Autorisé** (primitives déjà dans `src/components/marketing/motion/`) :
- `FadeInWhenVisible`, `Stagger` / `StaggerItem` (entrées séquencées, direction/amplitude variées).
- `MagneticButton` (CTAs, strength 12-16 primaire / 8 secondaire).
- `KineticHeadline` (titre mot-à-mot, **une fois** au load).
- Scroll-tied `scale`/`opacity`/`blur` sur **une seule couche** (poussée caméra).
- `StickyScrollStory` (paliers, scroll natif jamais bloqué).
- `InteractiveAppMockup` (démo produit).
- Motion ambiant lent (respiration ±8px, 3s+), micro-interactions hover/press.

**Interdit** (le user a explicitement rejeté le 1er ; les autres = règles projet) :
- ❌ **Parallax** (couches à vitesses divergentes) — « bugué et daté ».
- ❌ **Scroll-jacking** (piéger le scroll natif).
- ❌ Gradient text (`bg-clip-text`), ghost-card (border + shadow ≥16px), eyebrow uppercase sur *chaque* section, numérotation déco 01/02/03, `rounded-full` sur boutons.
- ❌ Tout ce qui bloque le LCP (le texte + CTA doivent être interactifs immédiatement, pas après une séquence de 2s).
- ❌ **`prefers-reduced-motion` non géré** : chaque animation a un état statique de repli (poster pour les vidéos).

### 2.5 Système visuel (tokens réels — `src/index.css`)

- **Couleurs** : primary teal `#55A1B4` (500) + 600/700/800/900 ; secondary warm `#ED843A` (500) ; accent sun `#F8B044` (400) ; neutres ink.
- **Type** : `font-display` = League Spartan (titres) ; `font-body` = Nunito (corps). League Spartan **n'a pas d'italique** (utiliser Nunito italic si besoin).
- **Espacement sémantique** : `gap-stack`, `gap-stack-lg`, `gap-section`, `py-page` (jamais `gap-4/6/8` arbitraire).
- **Radius** : `rounded-pill` (boutons), `rounded-2xl` (cards). Jamais `rounded-full`.
- **Ombres** : `shadow-card` / `shadow-card-hover` / `shadow-card-lift` (warm-tinted).

### 2.6 Assets locaux disponibles (`public/videos`, `public/images/bg-frames`)

| Fichier | Nature | Dim | Usage suggéré |
|---|---|---|---|
| `bosch-jardin-terrestre-teal-15s.mp4` | Peinture Bosch teal, dérive lente | 1920×1080 | Hero « Jardin vivant » |
| `paysage-chemin-rotonde-teal-6s.mp4` | Paysage peint, chemin→rotonde | 1366×768 | Hero « Le Chemin » (métaphore parcours) |
| `aquarelle-hero-loop.mp4` | Boucle aquarelle seamless (ping-pong, sans blanc) | 1920×1048 | Fond hero doux / seam |
| `aquarelle-nuages-dore-ambre-8s.mp4` | Nuage aquarelle ambre | 1920×1048 | Seam / fond de section basse opacité |
| `*-poster.jpg` (bg-frames) | Posters statiques | — | `<video poster>` + fallback reduced-motion |

### 2.7 Structure de page cible (ordre)

1. **Hero cinématique** (vidéo peinte + titre + 2 CTAs).
2. **Conviction** — une affirmation centrée, une couleur, zéro ornement.
3. **Trois offres** — formation / Learning App / accompagnement (entrée staggered).
4. **Moment produit** — `InteractiveAppMockup` vivant.
5. **Boucle Apprendre → Pratiquer → Valider** (paliers sticky).
6. **Preuve honnête** — cas réels sans métriques inventées (ou retirer si rien de publiable).
7. **CTA final** — une seule action forte.

### 2.8 Critères de réussite (definition of done)

- `npx tsc --noEmit` = 0 erreur.
- 60fps au scroll (n'anime que `transform`/`opacity`).
- `prefers-reduced-motion` testé (états statiques).
- Contraste AA sur tout texte (≥4.5:1).
- Zéro anti-pattern §2.4. Aucune violation d'honnêteté §2.2.
- Mobile 375px + desktop 1440px propres.

---

## PARTIE 3 — Prompt Fable 5 (prêt à coller)

> **Mode d'emploi.** Coller le bloc ci-dessous tel quel dans un run Fable 5 **unique** (idéalement en agent borné sur le repo, ou en chat avec le fichier hero attendu). Il est auto-suffisant et cadré pour un one-shot (pas d'allers-retours = crédits maîtrisés). Pour changer de direction, modifier **une seule ligne** (le `HERO ASSET` au § Direction).

```
Tu es directeur artistique + ingénieur frontend senior dans un studio réputé
pour des sites agency-grade cinématiques. Livre du code de PRODUCTION, pas un
prototype. Stack : React 19 + TypeScript + Tailwind CSS v4 (CSS-first) +
framer-motion. Projet : site vitrine de The Learning Society (TLS), EdTech FR.

╔═ LIVRABLE (format exact, une seule fois) ═══════════════════════════════════╗
Un SEUL composant React complet dans un fichier :
  src/pages/marketing/_prototypes/HomeCinematicEditorialV2.tsx
Export nommé + default `HomeCinematicEditorialV2`. Doit compiler tel quel
(`npx tsc --noEmit` = 0 erreur nouvelle). Ne touche à AUCUN autre fichier ni au
routing (je le branche moi-même). Portée : hero + sections 2, 3 et 4 du plan
ci-dessous (pas toute la page). Termine par une note de 5 lignes max : ce que
tu as construit et pourquoi c'est distinctement « Cinematic Editorial ».
╚═════════════════════════════════════════════════════════════════════════════╝

DIRECTION — « Cinematic Editorial » :
Une peinture vivante en ouverture, une retenue éditoriale dans le rythme, un
seul moment produit interactif. Références de niveau : Apple product pages,
Anthropic, Stripe. Pas de SaaS générique.
HERO ASSET (change cette ligne pour switcher de direction) :
  video = "/videos/paysage-chemin-rotonde-teal-6s.mp4"
  poster = "/images/bg-frames/paysage-chemin-rotonde-poster.jpg"

CONTEXTE À RÉUTILISER (ne rien inventer d'autre) :
- Primitives motion existantes, importe-les depuis
  "../../../components/marketing/motion" — lis leurs props avant usage :
  FadeInWhenVisible, Stagger, StaggerItem, MagneticButton, KineticHeadline,
  StickyScrollStory, InteractiveAppMockup. GradientText est INTERDIT.
- Bouton polymorphe : import { Button } from
  "../../../components/core/Button"; usage <Button to="/website/accompagnement"
  variant="primary">…</Button> (rend un <Link>, NE PAS emballer dans <Link>).
- Tokens (classes Tailwind mappées, jamais d'arbitraire var()) :
  couleurs primary-500..900 (teal #55A1B4), secondary-500 (orange #ED843A),
  accent-400 (jaune #F8B044), neutres ink. Type : font-display (League Spartan,
  PAS d'italique dispo), font-body (Nunito). Espacement : gap-stack,
  gap-stack-lg, gap-section, py-page (jamais gap-4/6/8). rounded-pill (boutons),
  rounded-2xl (cards), JAMAIS rounded-full. Ombres shadow-card / -hover / -lift.

COPY (verbatim, aucune métrique/client inventé) :
- H1 : « Vos formateurs, augmentés par l'IA. » (accentue « augmentés par l'IA »
  en accent-400 ou secondary-600).
- Sous-titre : « The Learning Society aide organisations et professionnels à
  maîtriser l'IA en formation : une formation certifiante, une Learning App
  adaptative et un accompagnement sur mesure. Sans perdre l'humain au centre. »
- CTA primaire : « Je représente une entreprise » → /website/accompagnement
- CTA secondaire : « Me former » → /website/learning-app
- Les 3 offres : formation certifiante (Formateur Augmenté par l'IA, 7 modules,
  partenariat C-Campus) · Learning App adaptative · Accompagnement (méthode
  STRIDE). Décris-les sobrement, sans chiffre inventé.

SECTIONS À LIVRER :
1. HERO — vidéo plein cadre (autoPlay muted loop playsInline, poster). UNE seule
   couche animée : scale 1→~1.06 lié au scroll de la section (useScroll +
   useTransform), poussée caméra, PAS de parallax. Titre = révélation mot-à-mot
   UNE fois au load (KineticHeadline ou équivalent). Lisibilité SANS washout :
   vignette radiale ou panneau latéral ciblé derrière le texte, la vidéo reste
   riche ailleurs. Vérifie AA.
2. CONVICTION — une affirmation centrée, fond neutre, une seule couleur, zéro
   ornement. Entrée séquentielle.
3. TROIS OFFRES — entrée staggered (directions/amplitudes variées, pas un fade
   uniforme). Cards shadow-card, hover -translate-y + shadow-card-hover.
4. MOMENT PRODUIT — <InteractiveAppMockup /> comme pièce centrale (pas une
   vignette), avec une respiration lente au repos (±8px, 3s+, gated).

CONTRAINTES DURES (le non-respect invalide le livrable) :
- INTERDIT : parallax (couches à vitesses divergentes), scroll-jacking,
  gradient text (bg-clip-text), ghost-card (border + box-shadow flou ≥16px sur
  le même élément), eyebrow uppercase tracké sur chaque section (une fois max),
  numérotation déco 01/02/03, rounded-full sur boutons, hex en dur, bg-[var()].
- OBLIGATOIRE : chaque animation gate sur useReducedMotion() avec état statique
  de repli (les vidéos montrent le poster). N'anime que transform/opacity.
  Le texte + CTAs sont visibles/interactifs immédiatement (pas après la
  séquence d'entrée). Registre « vous ». Aucun em dash dans la copie.
- style={{}} inline autorisé UNIQUEMENT pour les valeurs de scroll (scale) et
  les gradients complexes sans équivalent Tailwind.

Travaille avec goût : la retenue et le rythme priment sur la densité d'effets.
Un seul moment fort par section. Quand tu hésites, choisis la sobriété.
```

### Après le run Fable (retour Sonnet/Opus, gratuit vs abo)

1. `npx tsc --noEmit` → corriger toute erreur d'import/prop.
2. Brancher une route cachée `_v2-cinematic-editorial` dans `App.tsx`.
3. Vérifier en preview : vidéo joue, pas de washout, texte AA, reduced-motion OK, 60fps.
4. Comparer aux 4 directions existantes, trancher, puis propager (sections 5-7).

---

## PARTIE 4 — Prompts Higgsfield : génération vidéo « éclipse → lumière » (4 DA à tester, 10/07/2026)

Contexte : le H1 de la Home est *« L'IA n'éclipse pas vos formateurs. Elle les met en
lumière. »* (accent-400 sur la 2e phrase). Les essais code-only (glow radial) et
watercolour (crossfade, radial-glow sur l'aquarelle existante) sont déjà en place
(`/website/_eclipse-trials`). Ce qui manque : une vraie vidéo générée, cinématique,
scène de ciel nocturne avec une planète/lune dorée qui tourne et une lumière qui
perce — mais **jamais en rendu sci-fi/3D générique**. C'est précisément ce qui a fait
échouer les 4 candidats Pexels testés (rendu solaire 3D texturé, VFX spatial, lens
flare rouge/vert) : tous lisibles comme stock-footage documentaire, pas comme la
peinture éditoriale du reste du site.

### Contraintes communes aux 4 DA (à répéter dans chaque prompt Higgsfield)

**Palette — tokens réels, pas de hex approximatif :**
- Ciel nocturne : teal très sombre, proche de `primary-900` **#1F3E45**, PAS un noir pur
  neutre (le hero vidéo actuel utilise déjà `rgba(15,42,48)` pour sa vignette — même
  famille de couleur, pour que la vidéo générée s'intègre sans à-plat).
- Planète / lune : or chaud, `accent-400` **#F8B044** — jamais gris/blanc lunaire classique.
- Rayons de lumière / halo horizon : dégradé `secondary-500` **#ED843A** (orange chaud)
  → `accent-400` **#F8B044** (or), jamais un blanc pur qui écraserait la palette.
- Aucune couleur froide additionnelle (pas de violet, pas de rose, pas de vert) —
  seulement teal sombre + orange + or, l'exacte palette TLS.

**Texture / rendu — pour éviter l'écueil Pexels :**
- Peint / illustré, PAS photoréaliste 3D. Penser aquarelle numérique ou matte painting,
  pas rendu CGI type jeu vidéo ou documentaire spatial.
- Pas de texture de surface détaillée sur la planète (pas de cratères, pas de taches
  solaires, pas de relief — une sphère lisse, presque un disque plat stylisé).
- Grain subtil autorisé (cohérent avec le grain déjà utilisé sur `SkillMapSection`).

**Mouvement — règle du tutoriel Media Vault (transcript lu en entier) :**
- Mouvement lent, continu, **sans zoom in/out** (« l'animation doit être lisse avec
  une vraie profondeur de mouvement, pas de zoom » — c'est le site qui gère le zoom
  au scroll séparément si besoin, jamais la vidéo elle-même).
- Boucle de 8-10s, 16:9, 1920×1080 minimum (idéalement le rendu le plus haut dispo
  côté Higgsfield/Cinema Studio).
- Aucun texte, logo ou overlay généré dans la vidéo — tout ça se fait en CSS/React
  par-dessus, jamais baked-in (cf. règle du tutoriel : « n'ajoutez pas d'overlay »).

---

### DA 1 — « Aube minérale » (la plus proche du glow déjà en prod)

Une sphère dorée immobile en haut-tiers du cadre, une brume chaude qui respire
doucement autour, aucun mouvement de caméra. La plus sobre des 4 — extension directe
du glow radial déjà codé.

```
Cinematic night sky scene, very dark deep teal background (not pure black, closer to
a muted dark teal-green, hex #1F3E45 tonal family). A smooth, matte, warm golden
sphere (hex #F8B044, no craters, no surface texture, almost a flat glowing disc)
sits in the upper third of the frame. A soft warm haze breathes gently around it,
gradient from deep teal at the edges to warm orange (#ED843A) close to the sphere.
Faint, soft light rays extend slowly outward from behind the sphere, warm gold to
soft orange gradient, low opacity, painterly not photorealistic. Style: digital
watercolour / matte painting, not 3D render, not photoreal, no visible surface
texture on the sphere, no lens flare, no stars, no CGI look. Camera is completely
static, no zoom in or out, no pan. Motion is only in the haze and light rays,
breathing slowly. Calm, premium, editorial mood — restrained, not dramatic sci-fi.
Loopable, 8-10 seconds, 16:9, 1920x1080 or higher.
```

### DA 2 — « Éclipse qui se lève » (reprend le schéma déjà prototypé, en vrai vidéo)

Un disque sombre couvre partiellement la sphère dorée puis glisse lentement pour la
révéler — littéralement l'éclipse qui se lève. Reprend le concept du prototype
schématique déjà codé (`eclipse-schema-diagram.mp4`) mais en rendu peint/cinématique.

```
Cinematic night sky scene, very dark deep teal background (#1F3E45 tonal family,
not pure black). A smooth matte golden sphere (#F8B044, no surface texture, flat
glowing disc) is partially covered by a dark near-black circular silhouette
(slightly darker than the background, #141f22). Over the duration of the clip, the
dark silhouette slides slowly and smoothly to one side, gradually revealing more of
the golden sphere and its warm light. As it uncovers, soft warm light rays (orange
#ED843A to gold #F8B044 gradient) grow gently outward. Style: digital watercolour /
matte painting, not 3D render, not photoreal, no craters, no lens flare, no stars.
Camera is static, no zoom in or out. The only motion is the sliding silhouette and
the growing soft light. Calm, deliberate pacing - this should read as a slow reveal,
not a dramatic event. Loopable if possible (silhouette can slide back at the very
end), 8-10 seconds, 16:9, 1920x1080 or higher.
```

### DA 3 — « Aurore TLS » (la plus safe — évite complètement le "planète 3D")

Pas de sphère du tout : un ruban de lumière façon aurore boréale, peint, qui ondule
doucement dans un ciel sombre. Évite entièrement l'écueil "rendu planète CGI" identifié
sur Pexels, en gardant la même palette et la même émotion (lumière qui émerge du noir).

```
Cinematic night sky scene, very dark deep teal background (#1F3E45 tonal family).
Soft painterly ribbons of light drift slowly across the upper half of the frame,
like a gentle aurora - colors flowing gradually between warm orange (#ED843A) and
warm gold (#F8B044), never cool colors (no green, no purple, no blue in the light
itself - only the dark teal background is cool). The light ribbons move slowly and
organically, like watercolour bleeding across paper, not like sharp digital aurora
photography. A small, soft, out-of-focus warm golden glow sits low in the frame,
barely a suggestion of a light source rather than a defined sphere. Style: digital
watercolour / matte painting, painterly and soft-edged throughout, absolutely no
photorealistic 3D rendering, no stars, no lens flare, no CGI look. Camera static,
no zoom, no pan. Calm, slow, meditative movement only in the light ribbons.
Loopable, 8-10 seconds, 16:9, 1920x1080 or higher.
```

### DA 4 — « Horizon doré » (la plus littéralement "aube/aurore")

Composition façon lever de soleil : la sphère est basse dans le cadre, proche d'une
ligne d'horizon suggérée, le ciel se dégrade du sombre en haut vers le chaud en bas.
La plus proche de "l'aube" au sens propre du terme, moins abstraite que la DA3, moins
frontale que la DA1/DA2.

```
Cinematic scene, wide static shot. Sky gradient from very dark deep teal at the top
(#1F3E45 tonal family) down through warm orange (#ED843A) to warm gold (#F8B044)
near a soft, undefined horizon line low in the frame - like a stylized dawn, not a
literal landscape (no ground, no landscape detail, just the gradient sky and light).
A smooth matte golden sphere (#F8B044, no craters, no surface texture) sits low near
the horizon, partially soft-glowing into the gradient below it. Gentle warm light
rays fan out slowly from the sphere upward into the dark teal sky. Style: digital
watercolour / matte painting, painterly, soft-edged, not 3D render, not photoreal,
no stars, no lens flare, no CGI look. Camera completely static, no zoom, no pan -
only the light and haze move, slowly and continuously. Calm, warm, hopeful mood.
Loopable, 8-10 seconds, 16:9, 1920x1080 or higher.
```

### Comment les tester (avant de payer Higgsfield)

1. Générer les 4 DA une par une (ou 2-3 variations de la DA qui te parle le plus en
   premier, pour ne pas cramer tes crédits sur les 4 d'un coup).
2. Chaque clip → l'ajouter dans `/website/_eclipse-trials` (déjà construit, il suffit
   d'ajouter une entrée dans `VARIANTS` avec le fichier téléchargé) pour comparer avec
   le H1 réel dessus, à égalité avec les essais déjà en place.
3. Trancher une seule DA avant de regénérer quoi que ce soit — ne pas mélanger 2 DA
   sur la même page.
4. Si aucune des 4 ne convainc à la génération, le glow radial déjà en prod
   (`eclipse-radial-glow-hero.mp4`, gratuit, déjà codé) reste la valeur de repli.

---

## Annexe — Rappel des 4 directions déjà prototypées

| Route | Direction | Asset | Registre |
|---|---|---|---|
| `/website/_v2-cinematic-a` | Cinematic Reveal | watercolour loop | Générique de film |
| `/website/_v2-cinematic-b` | Interface Choreography | mockup produit | Tech précise |
| `/website/_v2-jardin` | Jardin vivant | Bosch teal | Art-forward |
| `/website/_v2-chemin` | Le Chemin | paysage-rotonde | Éditorial chaud |

« Cinematic Editorial » (ce brief) = synthèse : hero peint (Jardin/Chemin) + moment produit (B) + retenue de rythme.

---

## Annexe — Décisions tagline (10/07/2026)

Brainstorm multi-rounds (A→H) sur le H1 de la home. Deux lignes validées, une seule en prod pour l'instant :

| Ligne | Statut | Où | Notes |
|---|---|---|---|
| **E** — « L'IA n'éclipse pas vos formateurs. Elle les met en lumière. » | ✅ **En prod** | H1 Home (`MarketingHome.tsx`) | Analogie lumière/éclipse. Le mot « lumière » tombe en `accent-400` (or) — copie et couleur se renforcent. Rime avec le bandeau Conviction juste en dessous sans répéter les mêmes mots. |
| **G** — « Le formateur reste au centre. L'IA lui rend du temps. » | 🟡 **Validée, en banque** | Aucun (pas encore placée) | Réutilise le mot « rend du temps » du bandeau Conviction — trop proche pour remplacer ce bandeau sans perdre les 2 précisions qu'il porte (personnaliser/mesurer). Décision explicite (10/07/2026) : rester sur la direction lumière/éclipse pour l'instant, ne pas diluer avec une 2e image (formateur au centre) tant que E n'est pas déployée ailleurs sur le site. À ressortir pour : un post LinkedIn, une variante A/B du H1, ou une autre page si le thème lumière ne s'y prête pas. |

Si une future session de motion (cf. Partie 3) explore une vidéo hero sur le thème lumière/éclipse, c'est E qui doit la piloter — pas G.
