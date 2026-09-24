# Les arbitrages n°18, 19 et 23 appliqués (24/09/2026) : bilan

Ils suivent la passe typographique du même jour ([`PASSE-TYPOGRAPHIQUE-2026-09-24.md`](PASSE-TYPOGRAPHIQUE-2026-09-24.md)).
Chloé les a tranchés sur le banc `/_arbitrages` :
- **n°19** : un seul `solid` par écran, et c'est l'action principale ;
- **n°23** : la voix suit la surface ;
- **n°18** : la gamification devient « Reconnaissances ».

Les composants que les pages avaient signalés ont été corrigés dans la foulée, en deux lots.

## Mesures
Dernier état mesuré sur un serveur dédié, dans un worktree figé au commit `cbcce6ea`, sur 149 routes (routes à paramètre comprises).

| `check-boutons` | Avant (`73106187`) | Après |
|---|---:|---:|
| Boutons visibles | 700 | 723 |
| `solid` | 24 | **86** |
| `soft` | 303 | 317 |
| `outline` | 298 | **27** |
| `ghost` | 61 | 279 |
| `link` | 14 | 14 |
| Écrans à plusieurs `solid` | 1 (la vitrine) | 1 (la vitrine) |
| Écrans avec des boutons, sans `solid` | 120 | **59** |

**Les 27 `outline` restants** sont les « Annuler » des paires Annuler / Confirmer, et les démos de la vitrine.

**Les 59 écrans sans `solid`** ont tous une raison notée par les agents : lecture ou consultation, actions portées par chaque rangée ou chaque carte, catalogues, tableaux de bord de pilotage. Un écran de pure lecture n'a pas d'action principale.

Sur le même état :
- `check-contrast` : 0 échec à 1440 ; 1 à 375, dans une démo de la vitrine.
- `check-radius` : 0 coin hors règle.
- `check-rythme` : 6 titres plats sur 451. Cinq sont sur l'affiche `/inscription` (question ouverte), un dans la vitrine.
- `check-typo` : 12 défauts.
  - 7 viennent de la vitrine (les h1 de ses démos).
  - 5 viennent de routes que la sonde appelle avec `:id = 1`, un identifiant qui n'existe pas (par exemple `/project/1`, où le vrai est `proj-001`) : leur état « introuvable » n'a pas de h1.
- `check-handmade` : cartes faites main 193 → 186, pastilles d'icône 114 → 109, boutons 19 → 16.

## n°19 : la hiérarchie du bouton
- **Composants** (`b1934052` … `1fc5c29b`) :
  - les modales ont un `solid` chacune, l'action qu'elles servent ;
  - les cartes passent en `soft`, sauf « Reprendre » sur l'accueil ;
  - les parcours pas à pas mettent « Suivant » en `solid` et « Précédent » en `ghost` ;
  - les outils passent en `ghost` ;
  - le consentement garde ses deux boutons au même poids (exigence CNIL).
- **Pages** : quatre tranches.
  - Chaque écran a au plus un `solid`. Les modales et les onglets ont été vérifiés à la main, puisque la sonde ne les voit pas.
  - `outline` ne sert plus qu'à « Annuler ».
- **Conventions posées en chemin** (à valider) :
  - Annuler = `outline` + `neutral` ;
  - une confirmation dépliée *dans* une page laisse le `solid` à la page (Confirmer en `soft`, Annuler en `ghost`) ;
  - « Retour » = `ghost` neutre, sauf sur un écran « introuvable », où il devient le `solid` ;
  - l'action d'une carte teintée = `soft` **neutre**, parce qu'en `brand` elle se lisait comme un contour ;
  - un bouton désactivé qui dit un état (« Déjà inscrit(e) », « Complet ») = `ghost` neutre ;
  - l'orange de l'ancien `variant="secondary"` disait « secondaire » : c'est désormais le niveau qui le dit, et le bouton reprend le ton de la page.
- **Outillage** :
  - `Button` expose `data-emphasis`, et `check:boutons` le lit ;
  - la prop `flush` cale un `ghost` sur le bord du texte (plus aucun calage à la main dans les pages, sauf `Positionnement`) ;
  - les modales rendent la page inerte (`useDialog`).

## n°23 : la voix
- **Voix de chaque surface** :
  - « tu » : l'apprenant dans son espace ;
  - « vous » : le pilotage, l'espace du coach, l'authentification, le compte et la facturation (le cas ambigu) ;
  - « vous » aussi pour **la Veille**, ses publications comme ses écrans (décision de Chloé le 24/09, `77022012`).
- **Composants** : `AIOverrideButton` a une prop `voix`. `FlipCard`, `ActivityFeed` et l'état vide du fil tutoient.
- **Choix à valider** :
  - l'**onboarding** est gardé en « tu ». Réserve : le chat demande encore le rôle, ce qui en fait une surface à plusieurs rôles ;
  - le **paiement de l'onboarding** est en « vous » (une transaction), donc le parcours fait tu → vous → tu ;
  - dans la famille **Compte**, `/account` et `/account/billing` vouvoient, tandis que `/profile/privacy` et les préférences de notification tutoient ;
  - la **JAC du projet** (Jalon d'Application Critique) s'adresse à l'expert qui valide, donc « vous » ;
  - **Collaboration** est en « vous ».
- Les **règles de copie** de PRODUCT.md, revalidées le 24/09, ont été appliquées au texte touché : pas de « ! », pas de tiret cadratin.

## n°18 : « Reconnaissances » (`e1c7ea57` … `1a76c8d0`)
- **Le profil a une section « Reconnaissances »** :
  - les Open Badges des **niveaux validés** au Passeport, avec qui a validé et quand ;
  - un **rythme hebdomadaire** sur quatre cases, sans compte à rebours.
  - L'aller-retour est réel : une validation faite côté coach s'y affiche.
- **Le détail d'un badge** dit ce qu'il atteste, qui l'émet, quand et sur quelles preuves. Plus d'XP ni de rareté.
- **Huit anciennes routes** redirigent vers `/profile#reconnaissances` : les six de la gamification, `/profile/badges/competences` et `/profile/open-badges`. Aucun lien de l'app n'y mène plus.
- **L'XP, la série et le classement ont quitté l'app apprenant** :
  - fins de leçon, replays, récapitulatifs, fiche compétence, onboarding ;
  - la série « avant minuit » ;
  - `Leaderboard` et `DashboardAchievements`, supprimés ;
  - cinq pages mortes, supprimées.
- **Ce qui reste, et pourquoi** :
  - la couche de données (store, types, plugin, mocks), gardée volontairement ;
  - l'export RGPD cite encore « Badges, streaks, XP », puisque ces données sont détenues ;
  - `CompletionModal` garde une prop `xpEarned` dépréciée et sans effet ;
  - `RankingCard`, `Medal` et `Achievement` restent, parce que la vitrine les importe.

## Questions ouvertes pour Chloé
1. **Open Badges** : le référentiel n'en a que pour 3 couples compétence × niveau, alors que le compte démo a 7 niveaux validés.
   - Faut-il un badge pour chaque niveau validé ?
   - Un D1 en mérite-t-il un ?
2. **Certifications de parcours et badges « plateforme »** : 2 et 5, ils ne s'affichent plus. Faut-il les garder sous une autre forme ?
3. **Le bloc « Connecter un wallet »** (Credly, Badgr) était une maquette sans action. Faut-il le rétablir ?
4. **Vues coach et manager**, laissées en l'état. Les remplacer demanderait de nouvelles données :
   - `CoachEngagement` : série, badges et XP par semaine ;
   - `AnalyticsDashboard` : classement nominatif et courbe d'XP cumulée ;
   - `CoachDashboard` : score d'engagement calculé depuis la série.
5. **Notifications** :
   - aucun réglage de « week-end silencieux » n'existe ;
   - le résumé d'activité est passé de quotidien à hebdomadaire par défaut : à confirmer.
6. **Rythme hebdomadaire** : les semaines sont glissantes, et une simple visite de leçon compte comme activité. Faut-il aussi renommer `/gamification/badge/:id` ?
7. **`PasseportJac`** affiche des certifications écrites en dur qui contredisent le Passeport (Leadership D2 contre D3 validé).
8. **Veille** : les descriptions des masterclasses ont été passées au « tu » ; celles de la Veille restent en « vous ».

## Défauts relevés, non corrigés (hors design)
- **Boutons sans action** :
  - Passeport : « Définir un objectif » (fiche compétence), « Continuer ma progression », « Voir le plan d'action complet », « Modifier les objectifs », « Voir le certificat » ;
  - « Ajouter un objectif » ouvre une modale qui n'existe pas ;
  - projets : « Nouveau projet », « Inviter » ;
  - messagerie : « Pièce jointe », « Brouillon » ;
  - coaching : « Voir le récap », « Voir fiche », « Nouvelle session » ;
  - « Nouvelle conversation », « Mettre à jour mes préférences ».
- **Comportements faux** :
  - **« Sauvegarder en brouillon » publie l'entrée** du journal ;
  - « Annuler la session » n'a pas de confirmation sur `/coaching/session` ;
  - dans `CorrectionCard`, « Assigner » mène à la même URL que « Corriger ».
- **Accessibilité** : `ModalForm`, `RatingModal` et les lecteurs en page ne rendent pas encore la page inerte. Ils peuvent appeler `rendreLeResteInerte`.
- **Textes à reprendre** :
  - coquilles : « toute l'historique », « une view complète », « La Learning Society » au lieu de « The Learning Society » ;
  - libellés en anglais dans les données (« Week 1 », « Emotional Intelligence ») ;
  - acronymes jamais développés : EDRA-R, DSAR.
