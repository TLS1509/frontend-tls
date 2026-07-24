# MODULE 3 : INTERACTION DESIGN & MICRO-INTERACTIONS

**Durée : 60 minutes · 55 slides**

> **Version corrigée du 2026-07-23.** Un des modules les plus solides du parcours :
> le framework, les états, le timing, la performance et l'accessibilité sont
> justes. Corrections : trois statistiques fabriquées à retirer, une prévalence à
> nuancer, et le cadrage de la gamification à aligner sur la position éthique TLS.
> Journal en fin de document.

**Objectifs**
- Maîtriser le framework Trigger-Rules-Feedback
- Concevoir des états cohérents (survol, clic, focus, désactivé…)
- Concevoir des interactions de gamification responsables

---

## PARTIE 1 · Le framework des micro-interactions (slides 1-12)

Une micro-interaction, c'est le moment où le système répond à l'utilisateur :
un bouton qui charge, un interrupteur qui bascule, une pastille de notification.
Elle dit « j'ai vu ton action, voici ce qui se passe ».

**Le framework TRF — Trigger, Rules, Feedback** (Dan Saffer, *Microinteractions*,
2013) :
- **Trigger** (déclencheur) : l'utilisateur clique, survole, fait défiler ; ou le
  système déclenche (minuteur) ; ou une donnée arrive (notification)
- **Rules** (règles) : la logique conditionnelle — si clic, alors désactiver,
  afficher un indicateur, envoyer la requête
- **Feedback** (retour) : ce que l'utilisateur voit — changement de couleur,
  animation, coche

**Durées** : instantané 100 ms (états de bouton, survol), rapide 300 ms
(apparitions), perceptible 500-1000 ms (transitions de page, modales). Règle : ne
pas faire attendre.

**Courbes d'accélération** : `ease-out` (départ rapide, fin lente) est la plus
naturelle pour une entrée ; `ease-in-out` avec parcimonie.

> ⚠️ **Trois statistiques retirées.** La version précédente affirmait
> « micro-interactions = +32 % de qualité perçue (Apple research) »,
> « gamification = +48 % de rétention (study 2025) » et « animations mal faites =
> −18 % de performance perçue ». **Aucune source** ne les soutient — l'« Apple
> research » et la « study 2025 » sont fantômes. Le principe (une micro-interaction
> soignée améliore l'expérience) tient sans ces chiffres.

**Accessibilité** : respecter `prefers-reduced-motion`. Les animations peuvent
provoquer des nausées chez les personnes sensibles au mouvement.

> ⚠️ **Prévalence nuancée.** « 10 % des utilisateurs ont des troubles
> vestibulaires » : la prévalence varie beaucoup selon la définition (jusqu'à
> ~35 % des plus de 40 ans ont une dysfonction vestibulaire ; la sensibilité
> symptomatique au mouvement est plus basse). Reformuler : « une part
> significative d'utilisateurs (estimations de 5 à 35 % selon la définition) ».
> Le principe `prefers-reduced-motion` reste, lui, non négociable.

---

## PARTIE 2 · Les états des composants (slides 13-30)

Tout élément interactif a plusieurs états, et chacun communique sans un mot :

| État | Rôle |
|---|---|
| **Défaut** | Prêt pour l'interaction |
| **Survol** | Souris au-dessus (bureau uniquement) |
| **Actif** | Pendant le clic |
| **Focus** | Navigation clavier — **indicateur visible obligatoire (WCAG)** |
| **Désactivé** | Non interactif, curseur `not-allowed`, toujours visible |
| **Chargement** | En cours, bouton désactivé pour éviter le double-clic |
| **Erreur / Succès** | Retour du résultat, jamais la couleur seule |

**Points de conception clés** :
- Au survol : décaler la couleur, agrandir légèrement (1,02-1,05), ajouter une
  ombre — **jamais déplacer** l'élément (l'utilisateur perd son repère)
- Focus : `outline` d'au moins 2 px, contraste ≥ 3:1 avec le fond
- Désactivé : montrer *pourquoi* (info-bulle « complétez le formulaire »)
- Erreur : validation en temps réel, message clair, **jamais la couleur seule**
  (icône + couleur + texte)
- Squelettes de chargement plutôt que page blanche : l'utilisateur perçoit la
  forme du contenu et attend mieux

---

## PARTIE 3 · Les interactions de gamification (slides 31-40)

Barres de progression, badges, séries, points, classements : ces mécaniques
soutiennent l'engagement. La partie technique (animations de barre, de badge, de
série, montée de niveau) est bien traitée dans la version d'origine — à conserver.

### ⚠️ Le cadrage éthique, à mettre au premier plan

La version précédente décrivait la série de connexion comme un levier de **FOMO**
(« l'utilisateur revient par peur de perdre sa série ») et parlait de
« psychological design » pour « faire revenir ». C'est exactement la frontière à
tenir.

**La position TLS — anti-dark-patterns — doit primer** :

- ✅ **Récompenses qui ont du sens** — un badge à 50 % d'un cours, pas une
  notification toutes les minutes
- ✅ **Désactivable** — l'utilisateur peut couper les notifications
- ✅ **Contextuel** — les jalons, pas chaque action
- ✅ **Respectueux** — soutenir la motivation, **pas la manipuler**

⚠️ **La différence entre gamification et manipulation** : la première aide
l'apprenant à atteindre *son* objectif ; la seconde l'exploite pour maximiser un
temps d'usage. Une série qui culpabilise (« ne perdez pas vos 5 jours ! ») est du
côté de la manipulation. Ce module doit enseigner la première, pas la seconde —
c'est cohérent avec le module 8 (mastery vs exploitation) et avec la doctrine TLS.

> 💡 **Ce point rejoint la règle Prompt Buddy « pas de spectacle IA »** : on ne
> conçoit pas pour capter, on conçoit pour servir. Même principe, autre surface.

---

## PARTIE 4 · Performance, cas et outils (slides 41-55)

**Performance** : une animation = une intention. Éviter les animations
simultanées (jank), viser 60 fps, utiliser l'accélération GPU (`will-change`,
`transform`, `opacity`). Toujours tester sur un vrai mobile.

**Cas** : Stripe (transitions douces, validation instantanée), Figma (sélection en
50 ms, glisser accéléré GPU), Apple (décalages minimaux, parallaxe discrète).

**Outils** : Figma (Smart Animate), Framer, CSS (le plus performant en production),
Web Animations API pour le contrôle fin.

**Accessibilité, checklist finale** :
- ☑ `prefers-reduced-motion` respecté
- ☑ états annoncés aux lecteurs d'écran (`aria-live`)
- ☑ l'animation ne porte jamais l'information *seule* (texte présent aussi)
- ☑ pas de clignotement > 3 fois par seconde (risque de crise)
- ☑ la couleur n'est jamais le seul indicateur (icône + couleur)

---

## Synthèse

TRF · tous les états définis · micro-interactions à ~300 ms en `ease-out` ·
gamification **au service de l'apprenant** · performance 60 fps · accessibilité
non négociable.

**Lecture** : *Microinteractions*, Dan Saffer.

---

## 📋 Journal des corrections — 2026-07-23

| # | Problème d'origine | Correction |
|---|---|---|
| 1 | « Micro-interactions = +32 % de qualité perçue (**Apple research**) » | Supprimé — aucune source publique |
| 2 | « Gamification = +48 % de rétention (**study 2025**) » | Supprimé — étude fantôme |
| 3 | « Animations mal faites = −18 % de performance perçue » | Supprimé — inventé |
| 4 | « 10 % des utilisateurs ont des troubles vestibulaires » | Nuancé : 5 à 35 % selon la définition ; principe `prefers-reduced-motion` conservé |
| 5 | Série de connexion cadrée en **FOMO** / « psychological design pour faire revenir » | Recadré sur la position éthique TLS (mastery, pas exploitation) ; distinction gamification / manipulation explicitée |

**Conservé** : le framework TRF (Saffer) · tous les états de composants et leurs
règles de conception · le timing 100-300 ms et les courbes d'accélération · la
partie performance (60 fps, GPU, `will-change`) · l'accessibilité
(`prefers-reduced-motion`, ARIA) · les cas Stripe/Figma/Apple · les exercices. Le
fond était excellent.
