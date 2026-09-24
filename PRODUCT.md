# Product

> **Ce document ne porte que ce qui est validé.** Resserré le 2026-09-24 sur décision
> de Chloé. Sa première version avait été **générée par IA** le 26/05/2026 (commande
> `/impeccable teach`, à partir des cahiers du CDC Notion, depuis archivé). Elle
> contenait une North Star, des personas chiffrés, une doctrine IA, une raison d'être,
> une vision 2031, un triplet de marque, des anti-références et des règles de copie —
> **rien de cela n'avait été validé**. Tout est archivé dans
> [`docs/_archive/PRODUCT-2026-05-genere-IA.md`](./docs/_archive/PRODUCT-2026-05-genere-IA.md),
> et `docs/_canon/FACTS-CANON.md` §3 range ces sujets « à reconstruire ».
>
> **Où vit ce qui fait foi.**
> - Les faits datés : [`docs/_canon/FACTS-CANON.md`](./docs/_canon/FACTS-CANON.md).
> - Les décisions : le [journal des décisions](https://app.notion.com/p/3d2cdd696db68130b58edc100798cad2) (Notion).
> - Le périmètre produit : la [Single Source of Truth](https://app.notion.com/p/3abcdd696db68091a136eaf308c3b1df)
>   (Notion ; son calendrier est périmé).
> - La doctrine de design : [`DESIGN.md`](./DESIGN.md) et `.claude/rules/doctrine-design.md`.

## Register

product

## Où en est le produit (au 24/09/2026)

- Le **lancement de la Learning App et du site vitrine est arrêté** ; leur planning
  sera révisé après le projet Agents (FACTS-CANON D12). Un MVP est en ligne depuis
  janvier et quatre clients bêta l'utilisent (C8) — ce dépôt n'est pas leur version.
- La Learning App est un **outil d'ancrage offert**, pas un pilier de revenus (D11) :
  6 mois d'accès offerts avec tout achat des piliers 2 et 3 (D19).
- **Trois piliers d'offre** : Tech, SaaS & Marketplace · Upskilling & Formation ·
  Studio & Intégration (D9). Le mot « conseil » est abandonné pour « **studio** » (D8).
  L'offre STRIDE est gelée, cible 2028 (D10) ; la méthode reste. **Pas de prix
  public** pour l'instant (D6).

## Ce qu'est le produit

Repris de la Single Source of Truth. TLS accompagne la transition des entreprises
vers la **Skills-Based Organization** (SBO) : une gestion des talents guidée par les
compétences réelles, plutôt que par les postes. La boucle :

- **Learn** : l'acquisition mesurable de compétences ;
- **Do** : leur validation en situation de travail, sur des projets réels ;
- **Match** : le Passeport de compétences et des agents IA **assigneront** le bon
  talent au bon projet. Brique spécifiée, **non livrée** : elle s'écrit au futur (D5).

Les sept fonctionnalités cœur :
1. **Passeport de compétences** : hard, soft et out-skills, validés par niveaux
   Dreyfus D1 à D5, avec l'atrophie à 90 jours.
2. **Parcours de formation**.
3. **Veille et Learning Space**.
4. **Coaching et IA** : recommandations, et matching entre humains et agents IA.
5. **Journal de bord réflexif**.
6. **Gestion des utilisateurs et des entreprises** : back-office, front-office,
   import des référentiels de compétences.
7. **Tunnel et monétisation** : commande, abonnements, paiements.

État réel, selon le journal : l'écart de production pédagogique est confirmé ; le
référentiel de compétences est à 30 % (204 compétences, dont 85 décrites en Dreyfus) ;
**aucun JAC n'existe encore** (D21).

## Voix

Le tutoiement ou le vouvoiement se décide par la nature de la surface, pas par la
place dans le parcours (FACTS-CANON D1 ; arbitrage n°23 du 24/09).

- **tu** : l'apprenant seul dans son espace personnel. Tableau de bord, lecteur de
  leçon, Passeport personnel, journal, messagerie avec le coach vue par
  l'apprenant, pages de coaching et formats en direct vus par l'apprenant,
  notifications de l'apprenant.
- **vous** : un professionnel en contexte de travail, et les surfaces éditoriales.
  Espace du coach, manager, team lead, admin entreprise, CLO, admin plateforme,
  pages d'authentification (plusieurs rôles), site public, pied de page et légal.
  Et **la Veille**, ses publications comme ses propres écrans (décidé par Chloé
  le 24/09).
- **Cas ambigu** : « vous ».

## Cadence et reconnaissance

Arbitrage n°18, 24/09, option « Reconnaissances » :
- **ni série, ni XP, ni classement nominatif** ;
- l'engagement se montre en **rythme hebdomadaire calme** (« actif 3 semaines sur
  les 4 dernières »), sans compte à rebours ;
- ce qui se célèbre, calmement, ce sont des **niveaux validés**, en Open Badges ;
- une JAC ne rapporte aucun XP, et aucun XP ne s'affiche jamais à côté d'un niveau
  Dreyfus.

## Accessibilité

Vérifié dans le code et dans `CLAUDE.md` :
- **WCAG 2.2 AA** visé sur toutes les surfaces.
- **Cibles de touche** : 24 × 24 px minimum (SC 2.5.8, le seul minimum normatif),
  44 px sur les actions principales.
- **Contrôles** : trois hauteurs, 36 · 44 · 52 (arbitrage n°22).
- `prefers-reduced-motion` est honoré.
- La couleur n'est jamais le seul vecteur de sens.

## Principes de design

Ils vivent dans [`DESIGN.md`](./DESIGN.md) §1, pour les six principes, et dans
`.claude/rules/doctrine-design.md`, pour la typographie, les rayons, le bouton et les
arbitrages. Ce document ne les recopie pas.
