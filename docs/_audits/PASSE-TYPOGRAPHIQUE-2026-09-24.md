# La passe typographique du 24/09/2026 : bilan

Chloé a demandé que tout ce qui est texte soit retravaillé, pour la hiérarchie et pour l'harmonie avec les composants :
- les tailles, les graisses et les interlignes ;
- le paragraphe et l'alignement ;
- les espacements et les gaps.

Point de départ : les arbitrages n°20 (texte courant à 16 px partout), n°21 (titres 28 puis 20) et n°22 (hauteurs communes 36 / 44 / 52), tranchés le matin même sur `/_arbitrages`.

La cible est écrite dans `.claude/rules/doctrine-design.md`, section « Typographie, texte et rythme — la cible ».

## Ce qui a été fait (143 commits, de `7a2989cb` à `5f7ba0cb`)
| Temps | Qui | Quoi |
|---|---|---|
| Tokens | — | `text-h3` = 20/26 (l'ancien h4) ; `h4` et `body-sm` retirés ; 1 023 usages renommés |
| Composants | 4 agents | Collections et cartes, contrôles, conteneurs et en-têtes, navigation, lecteurs et graphiques |
| Pages | 4 agents, par tranche | Apprendre (27 pages), Progresser (34), Coaching et formats en direct (41), Pilotage et entrées (41) |
| Suites | 3 agents | Les ~50 défauts de composants relevés par les pages : en-têtes et lecture ; contrôles, données et sondes ; cartes, graphiques et modales |
| Vitrine | 1 agent (+ un 2ᵉ passage en cours) | Fiches, exemples et échelle de la page `/components` |

## Mesures avant → après
Méthode :
- chaque état est mesuré sur **son propre serveur, dans un worktree figé à son commit** (avant la passe `334ba87f`, après les composants `22159bbc`, après les pages `73106187`, fin `5f7ba0cb`) ;
- 148 routes de l'app, routes à paramètre comprises (`--params`) ;
- les **mêmes versions de sondes** pour les quatre colonnes.

| Mesure | Avant | Composants | Pages | **Fin** |
|---|---:|---:|---:|---:|
| Texte sur l'échelle | 63,1 % | 95,5 % | 100 % | **100 %** |
| Tailles de texte distinctes | 28 | 20 | 13 | **13** |
| Combinaisons taille × graisse × famille | 77 | 53 | 35 | **35** |
| Graisse 800 et plus dans l'app | 0,4 % | 0,4 % | 0 | **0** |
| Défauts typographiques (`check-typo`) | 5 477 | 928 | 19 | **19** |
| Titres de section sous 1,5:1 (`check-rythme`) | 135 / 257 | 127 / 253 | 76 / 467 | **75 / 467** |
| Textes sous AA (`check-contrast`, 1440) | 174 | 120 | 12 | **7** |
| Coins imbriqués hors règle (`check-radius`) | 38 | 30 | 4 | **1** |
| Cartes faites main (`check-handmade`) | 240 | 243 | 193 | **193** |

**Avec les sondes corrigées pendant la passe**, sur le même état final (logotype exempté, occlusion prise en compte, carte reconnue quand son padding est porté par un enfant) :
- 11 défauts typographiques ;
- 70 titres plats sur 416, dont 65 dans la vitrine et 5 sur `/inscription` ;
- **0 texte sous AA à 1440**, 1 à 375 (dans une démo de la vitrine) ;
- 1 coin hors règle (un cadre de démo de la vitrine).

Sur les écrans produit, il reste :
- 3 routes sans h1 : `/gamification/badge/1`, `/journal/detail/1`, `/project/1/skill-gaps`. Probablement l'état « introuvable » de leur paramètre ; à vérifier ;
- 2 sauts h1 → h3, sur `/project/1/jac` et `/project/1/passeport` ;
- les titres de l'affiche `/inscription` (voir les questions ouvertes).

Captures avant et après de six écrans : elles sont dans le scratchpad de la session et ne sont pas versionnées. Pour les régénérer : `npm run capture -- --out <dossier> --route <r>`, sur les deux commits.

## Outillage né de la passe
- `check:typo` : l'échelle, les graisses, les familles et les niveaux de titre, tels qu'ils sont **rendus**.
- `check:rythme` : l'espace au-dessus d'un titre de section doit valoir au moins 1,5 fois l'espace en dessous. Les titres de carte sont ignorés.
- `check:boutons` : un seul `solid` par écran (arbitrage n°19). `Button` expose son niveau rendu en `data-emphasis`.
- `--params` sur les quatre sondes au rendu.
- `check-contrast` : test d'occlusion, logotype exempté (`data-logotype`), revérification au pixel à l'écran (la capture pleine page étirait les éléments `100dvh`).
- Piège documenté : un worktree de mesure a besoin de `.env`, sinon chaque route redirige vers la page de connexion (`CLAUDE.md`).
- Nouveau piège Tailwind n°17 : `hidden sm:inline-flex` sur un composant ne masque rien.

## Décisions prises en chemin, à valider par Chloé
Les agents ont choisi la solution la plus sobre fidèle à la doctrine. Elles sont appliquées ; chacune se défait commit par commit.
1. **Les titres de section n'ont plus de pastille d'icône.**
   - Le titre part du même bord gauche que le h1 et que son contenu.
   - Appliqué dans les tranches coaching et pilotage ; la pastille reste possible dans `SectionHeader` (via `IconChip`).
2. **Une `SectionCard` qui servait de section devient un h2 posé au-dessus d'une carte.**
   - 15 pages de pilotage, et le Passeport.
   - Les encarts des colonnes latérales gardent un titre de carte à 20.
3. **`PageHero tone="flat"`** sur les pages où un cadre coloré décalait le h1 (jusqu'à 33 px) : Passeport, détail de compétence, détail de badge, coaching.
4. **Blocs redondants fondus dans la méta de l'en-tête.** Aucune information n'est perdue, mais le brief interdisait de supprimer des sections :
   - les tuiles COACH / DATE / FORMAT d'une session ;
   - la carte du coach dans la messagerie ;
   - le badge « 3 stagnations critiques », qui contredisait la tuile (2) ;
   - le bandeau « Vous · Auteur » du journal ;
   - des doublons de rôle et de pourcentage ;
   - un « Ajouter » en double sur les webhooks ;
   - l'emplacement « Illustration de l'étape » du tutoriel ;
   - les codes internes « CAT-01 » de l'aide.
5. **Titres ajoutés** là où une collection n'en avait pas : « Tous les parcours », « Toutes les ressources », « Dernières publications », « Mes entrées », « Résultats ». Les titres anglais sont traduits : « Ma cohorte », « Indicateurs détaillés ».
6. **Données corrigées** :
   - `SkillBar` (« 4 % » pour un niveau) ;
   - Dreyfus lu sur son échelle (« 3,8 / 5 ») ;
   - l'édition hebdo « #08 » devient « #17 » ;
   - les humeurs du journal étaient décalées d'un cran ;
   - la barre de statut d'une correction montrait le mauvais état.
7. **La leçon** : h1 visible dans l'introduction (la couverture), masqué dans les autres sections. **Flashcards et astuces** : h1 centré sur l'axe de la carte, deux lignes au plus.
8. **Auth** :
   - h1 à 36 ;
   - carte à 20 ;
   - halos au cran 700 ;
   - voile de la carte ramené de 10 à 5 % de blanc (le blanc repasse AA sur le haut du dégradé).
9. **Badge `large`** passe à 11 px (un état n'a qu'un registre).
10. **Pastilles `Chip` au-dessus de 28 px** : rayon 14 au lieu de la pilule (règle du seuil).

## Questions ouvertes (Chloé)
- **`/inscription`** : affiche du site ou écran de l'app ? Elle reste une affiche, sur la couche `text-section` du système.
- **Le pied de page d'`AuthShell`** dit « Formation IA » : c'est la tagline que PRODUCT.md dit de ne pas préserver.
- **`StatCard`** : quand la place manque, le delta passe sous la valeur. Sur `/enterprise/dashboard`, une tuile sur quatre le fait, et les libellés de la rangée se désalignent.
- **Corrections** : faut-il dire « Terminé / Échoué » ou « Corrigé / Refusé » (le mot de `CorrectionCard`) ?
- **Données incohérentes laissées en l'état** :
  - trois noms pour la même offre, et des dates passées ;
  - le badge « RGPD conforme » de l'export, contredit par la note du bas ;
  - l'icône `Sparkles` sur la formule « Gratuit · sans IA » ;
  - le filtre par sujet de `/help`, qui ne filtre rien ;
  - la section vide « Propositions d'alternatives » du Passeport ;
  - le bouton « Continuer ma progression », sans action ;
  - des libellés anglais dans les données (« Week 1 », « Emotional Intelligence »).

## Reste à faire (hors typographie)
- **HTML invalide** : des blocs dans un `<button>` dans une quinzaine de pages (`DashboardAchievements`, `BadgeDetail`, `JournalNewEntry`, `LearningPathDetail`, `Passeport`, les accordéons d'aide…) ; un `<button>` dans un `<button>` dans `SelectCheckboxCategory` ; un `div role="button"` qui contient un `Button` dans `VeilleCardFeed`.
- **`FlipCard`** : les deux faces portent `aria-label="Retourner la flashcard"`, donc un lecteur d'écran ne lit jamais la question ni la réponse.
- **Débordements et formes** :
  - `StepTutorial` : « Suivant » déborde de 12 px à 375 ;
  - `IconFeatureCard` : bulle faite main, pincée à 375 ;
  - `QuizComponent` : carte à 14 au lieu de 20, et titre du résultat dessiné à 20 ;
  - `DreyfusSlider` : crans et libellés décalés ;
  - le pied de page de l'app reste sous la barre du bas à 375.
- **Graphiques** : LineChart, AreaChart et ComposedChart gardent les décimales anglaises de Recharts ; RadarChart et HeatmapChart estiment encore la largeur de leurs libellés.
- **Code mort** : `src/pages/Recherche.tsx` (aucune route) et `src/pages/ComponentsLayout.tsx` (importé nulle part). Une tâche est proposée.

## Suite
Les arbitrages **n°19** (un seul `solid` par écran) et **n°23** (« vous » pour le pilotage, le coach, l'auth) sont en cours, composants puis pages. Le n°18 (« Reconnaissances » : plus d'XP, de série quotidienne ni de classement) suit. Relevé de départ de `check:boutons` : 700 boutons visibles, dont 24 `solid` ; 120 écrans sans aucun `solid`.
