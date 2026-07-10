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

## Annexe — Rappel des 4 directions déjà prototypées

| Route | Direction | Asset | Registre |
|---|---|---|---|
| `/website/_v2-cinematic-a` | Cinematic Reveal | watercolour loop | Générique de film |
| `/website/_v2-cinematic-b` | Interface Choreography | mockup produit | Tech précise |
| `/website/_v2-jardin` | Jardin vivant | Bosch teal | Art-forward |
| `/website/_v2-chemin` | Le Chemin | paysage-rotonde | Éditorial chaud |

« Cinematic Editorial » (ce brief) = synthèse : hero peint (Jardin/Chemin) + moment produit (B) + retenue de rythme.
