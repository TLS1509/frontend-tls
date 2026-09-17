# Brief — audit du design system, niveau agence

**Écrit le 2026-09-17** · À coller tel quel en ouverture de session. Il suppose
le dépôt `frontend-tls` et l'accès Figma.

---

## Le prompt

> Charge les skills `design:design-system`, `impeccable` et
> `web-design-guidelines`. Lis `CLAUDE.md` en entier avant toute chose, puis
> `DESIGN.md`.
>
> **Ce que je veux** : un audit du design system TLS au niveau qu'on attendrait
> d'une agence — pas une liste de griefs, un relevé mesuré qui dit où le système
> ne tient pas sa promesse, et ce qui le rendrait tenable. Tu couvres **trois
> surfaces, et tu vérifies chacune de première main** :
>
> 1. **La codebase** — `src/`, les tokens de `src/index.css` (bloc `@theme`),
>    les composants de `core/` `ui/` `patterns/` `learning/` `cards/` `layout/`.
> 2. **Les docs locales** — `CLAUDE.md`, `DESIGN.md`, `docs/_canon/`, et la
>    vitrine `src/pages/Components.tsx`, qui est de la doc exécutable.
> 3. **Figma** — fichier `LccBZ1GKWQVwVzPtsSzk5Y`, bibliothèque publiée
>    « Design System - TLS ». Charge la skill `figma:figma-use` avant tout appel
>    à `use_figma`.
>
> **Le cœur de la mission** : les fondations et les composants ont beaucoup
> bougé entre le 9 et le 17 septembre. Je veux savoir **ce qui n'a pas suivi**.
> Le détail de ce qui a changé est plus bas — pars de là, ne le redécouvre pas.
>
> **La méthode, non négociable** :
> - **Mesure au navigateur avant d'affirmer.** Lance le serveur de dev, ouvre
>   les pages, lis les valeurs calculées. Une valeur lue dans le code n'est pas
>   une valeur rendue — le navigateur plafonne, la cascade arbitre, les classes
>   invalides ne génèrent rien.
> - **Un chiffre annoncé par un doc se recompte.** La moitié des compteurs de
>   `DESIGN.md` étaient à zéro dans le code tout en étant annoncés en attente.
> - **Un seuil sans mesure est une opinion.** Si tu trouves une constante qui
>   n'est justifiée nulle part, dis-le au lieu de la propager.
> - **Cite tes sources Figma par node ID.** Aucun pourcentage de conformité sans
>   inspection nœud par nœud — c'est une règle écrite du dépôt.
>
> **Livrable** : un doc dans `docs/_audits/`, indexé dans `docs/INDEX.md`,
> avec pour chaque écart : la surface, la valeur mesurée, la valeur attendue, le
> node ID ou le `fichier:ligne`, et le coût de la correction. Trie par ce qui se
> voit le plus, pas par ce qui se corrige le plus vite. Termine par **trois
> recommandations maximum** — je préfère trois arbitrages tranchés qu'une liste
> de vingt.
>
> **Gate** : `npm run build` plus les trois garde-fous
> (`check-handmade.mjs`, `check-token-coverage.mjs`, `check-showcase-coverage.mjs`),
> avant ET après.

---

## Ce qui a bougé entre le 9 et le 17 septembre

À vérifier en priorité — c'est là que la dérive est la plus probable.

| Décision | État | Où ça peut avoir manqué |
|---|---|---|
| **Rayon de la carte** : 14 (09/09) → **20** (16/09) | tranché | cartes faites main, Figma, vitrine |
| **Échelle étagée** : étiquette pilule · interactif 14 · conteneur 20 | tranché 16/09 | tout ce qui porte un rayon |
| **Règle du seuil** : sous 28 px la pilule, au-dessus l'échelle | tranché 14/09 | — |
| **Famille champ** à 14 px | tranché 14/09 | champs faits main |
| **Padding ≥ rayon** (le coin ne pince que s'il est occupé) | tranché 17/09 | **rien ne l'a reçue** |
| **Survol unifié** (`CARD_HOVER`, filet + fond, ni ombre ni soulèvement) | tranché 16/09 | cartes faites main |
| **Échelle d'espacement** : 7 → **10 crans** (`stack-3xs` 4, `stack-sm` 12) | 16/09 | docs, Figma *(corrigé le 17)* |
| **Famille badge** : 9 → 6 enveloppes, `TrendingBadge`/`Pill`/`Tag` supprimés | 10/09 | Figma porte encore `TrendingBadge` |
| **Nav AA** : 4 échecs de contraste corrigés | 16/09 | — |
| **Carte utilisateur Sidebar** 24 → 14, deux états | 17/09 | Claude Design n'en dit rien |

## Les écarts déjà relevés, non corrigés

Ne les recherche pas, vérifie-les et chiffre-les.

- **Figma** — `Button` `1109:58` avait `md` à **40 px** quand le code dit 44
  (`h-touch`). L'`AppSidebar` `2244:45` utilise des **emojis** là où le code est
  passé à Lucide, et dit « Mes parcours » quand le code dit « Parcours ».
  `TrendingBadge` figure encore dans `project/api/components/`.
- **Famille bulle, incohérente** — `PromptCard` 24 sans filet ·
  `JournalChatCompose` 24 avec filet · `JournalBubbleCard` 20 avec filet ·
  une bulle faite main dans `Dashboard.tsx`. C'est la seule famille sans
  décision écrite. ⚠️ `JournalBubbleCard` est à `rounded-xl` + `p-5`, soit
  padding = rayon exactement — c'est la seule qui ne pince pas.
- **`p-5` (20 px) n'est pas dans l'échelle** d'espacement, qui s'arrête à 16
  puis saute à 24. Deux composants s'en servent. Faut-il un onzième cran ?
- **9 serrages d'interligne** sur du corps de texte que la passe n'a pas vus
  (classes multi-lignes) — `Components.tsx`, `Profile.tsx`,
  `ProfileBadgesCompetences.tsx`, `AccountFamilyNav.tsx`,
  `InteractiveAppMockup.tsx`.
- **Padding de carte** — le canon est 24, la dérogation dense 16. Mesuré : 16
  reste très employé hors composant. Ces cartes sont-elles vraiment denses, ou
  le canon devrait-il être 16 ?
- **`AuthPrimaryButton`** porte encore `hover:-translate-y-px`, le soulèvement
  retiré de `Button.tsx` le 09/09. Et la question reste ouverte : que fait-il que
  `<Button onDark>` ne ferait pas ?

## Les pièges qui ont déjà coûté cher

À lire avant de toucher au styling — ils sont tous documentés dans `CLAUDE.md`,
section « Pièges », mais ces quatre-là sont les plus coûteux.

1. **Un renommage de classe Tailwind doit porter un lookahead négatif
   `(?![\d.])`.** `\b` est une frontière de mot et matche *à l'intérieur* des
   fractions : `gap-2.5` devient `gap-stack-xs.5`, une classe que Tailwind ne
   compile pas — la gouttière tombe à 0 **sans aucune erreur de build**.
2. **Les couleurs à opacité modifiée se sérialisent en `oklab()`.** Toute sonde
   de contraste doit lire via un canvas 1×1, jamais par regex sur `rgba(...)`.
   Le faux résultat est plausible, donc rien ne signale l'erreur.
3. **`git checkout --theirs` prend le fichier entier** de l'autre branche et
   jette les changements non conflictuels du nôtre. Résoudre zone par zone.
4. **Les codes de décision R1–R4 ont désigné deux choses** selon le fichier.
   Ne jamais citer un « R » sans dire en une clause ce qu'il désigne.

## Ce que « niveau agence » veut dire ici

Le dépôt a une doctrine explicite contre l'« AI slop » : pas de barres d'accent
en `border-left`, pas d'eyebrow au-dessus de chaque section, pas de card-soup.
Registre visé : **classe, premium, minimaliste — éditorial plutôt qu'app**.
Hairline plutôt qu'ombre. Le soin dans la matière, pas dans le mouvement.

C'est une plateforme **EdTech skill-based**, apprenante et adulte. Ni jouet, ni
tableau de bord d'entreprise.
