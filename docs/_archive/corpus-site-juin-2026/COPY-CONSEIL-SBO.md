# Contenu SBO — Page Conseil (`/conseil`)

> **Objectif :** ajouter un volet "Transition SBO" à la page Accompagnement, en complément des segments L&D et OF existants.
> **Statut :** DRAFT IA — à valider par Chloé avant intégration
> **Contraintes :** vous register (page publique), zéro métrique TLS inventée, sources citées, pricing gelé
> **Source données :** dossier SBO TLS (Drive) + bibliographie 80+ sources vérifiées

---

## Diagnostic sur la page actuelle

La page `/conseil` (HTML + React `MarketingAccompagnement.tsx`) cible actuellement :
- Département L&D (interne)
- Organisme de Formation (OF externe)

Elle ne mentionne pas SBO/skills-based, alors que le dossier Drive positionne TLS comme acteur de la transformation SBO pour les ETI françaises.

**Problème :** absence totale de contenu SBO sur la page conseil = absence de trafic B2B sur ce sujet + positionnement incomplet.

**Opportunité :** ajouter une section dédiée "Transition SBO" qui parle aux DRH et responsables L&D ETI, avec les données sourcées.

⚠️ **Note séparée :** la version React actuelle (`MarketingAccompagnement.tsx`) utilise le registre `tu` (ex. "On co-construit ta stratégie IA") alors que MARQUE-VOIX impose `vous` sur toutes les pages publiques. À corriger lors de la prochaine passe de refonte.

---

## Tag de section

```
Transition SBO
```

---

## H2

**Option A (recommandé) — chiffre en ancre :**
> Construire votre organisation autour des compétences.
> 55 % des organisations sont déjà en transition. Seulement 2 % ont adopté à grande échelle.
> C'est exactement là que se trouve la fenêtre.

**Option B — problème d'abord :**
> Votre SIRH dit que 80 % de vos équipes maîtrisent Excel.
> Combien savent réellement ce dont vous avez besoin pour les projets de demain ?

---

## Sous-titre de section

Les organisations qui ont adopté des approches skills-based constatent **+107 % d'efficacité dans le placement des talents** et **+98 % de rétention des hauts potentiels** (Deloitte 2025, 1 400 dirigeants, 10 pays). Le modèle existe. L'exécution, elle, est rare.

---

## Stats strip — 4 données de preuve (sourcées)

| Chiffre | Libellé | Source |
|---|---|---|
| +107 % | Efficacité placement talents | Deloitte, 2025 |
| 39 % | Compétences obsolètes d'ici 2030 | WEF FoJ, 2025 |
| 55 % | Organisations en transition SBO | Workday, 2025 |
| 2 % | Ont adopté à grande échelle | Gartner, cité Deloitte 2026 |

> Ces 4 chiffres ont tous une source primaire vérifiée. Ne pas les modifier sans revérifier la source.

---

## 4 services SBO (cartes)

### 1. Audit de maturité SBO
**Tag :** Diagnostic
**Corps :** Cartographie de votre maturité sur 5 dimensions : gouvernance des compétences, référentiel opérationnel, outils (LMS/SIRH), culture de l'apprentissage, capacité de mobilité interne. Livrable en 4 à 6 semaines.

### 2. Architecture des compétences
**Tag :** Conception
**Corps :** Construction ou refonte de votre référentiel de compétences, aligné sur vos projets business. De la carte au graphe de compétences exploitable par vos équipes RH et L&D.

### 3. Skill Graph & Passeport
**Tag :** Technologie
**Corps :** Déploiement du Skill Graph dans la Learning App TLS : suivi de progression par compétence, passeport vérifiable, matching talents-projets. Connexion possible avec votre SIRH.

### 4. Accompagnement L&D SBO
**Tag :** Formation
**Corps :** Former vos responsables L&D aux approches skills-based : analytics d'apprentissage, ingénierie de parcours adaptatifs, pilotage par les compétences plutôt que par le catalogue.

---

## Timeline (Jalons indicatifs)

| Jalons | Livrable |
|---|---|
| J+30 | SBO Readiness Assessment — rapport de maturité + recommandations |
| J+45 | Architecture des compétences — référentiel opérationnel pour périmètre pilote |
| J+60 | Skill Graph déployé — premiers passeports alimentés, dashboard L&D actif |

> Ces jalons sont indicatifs et issus du dossier stratégique TLS (Drive). À valider avec Pierre-Armand avant publication.

---

## Bloc de conviction

> Seuls **2 % des responsables RH** déclarent avoir déployé des approches skills-based à l'échelle de leurs processus (Gartner). La majorité des organisations convergent vers ce modèle sans avoir encore structuré la transition.
>
> C'est précisément là qu'intervient TLS : pas comme un cabinet qui livre un rapport, mais comme un partenaire qui reste jusqu'à ce que la transformation soit opérationnelle.

---

## CTA final

**Bouton primaire :** Demander un audit de maturité SBO
**Lien :** `#contact-form` ou `/contact`

**Mention sous CTA :**
Réponse sous 48h ouvrées. Sans engagement.

---

## Mots à éviter (MARQUE-VOIX + blacklist)

- ~~Unlock, Empower, Transform~~
- ~~Révolution, disruption, game-changer~~
- ~~Vous allez transformer votre entreprise~~ (trop générique)
- ~~CPF~~ (interdit FACTS-CANON F10)
- ~~Académie~~ (n'existe pas)
- Em-tiret ( — ) : interdit en body copy

---

## Intégration React prévue

Voir section "SBO" dans `src/pages/marketing/MarketingAccompagnement.tsx`.
Position suggérée : après la section services existante, avant le processus 3 phases.

---

## Sources de référence (bibliographie complète dans Drive)

- Deloitte (2025) : The Skills-Based Organization — 10 pays, 1 400 dirigeants
- WEF Future of Jobs Report (2025) : 1 000+ employeurs, 14 millions de travailleurs
- Workday Global State of Skills (2025) : 2 300 dirigeants, 22 pays
- iMocha (2026) : Skills-Based Hiring Statistics
- Gartner (cité par Deloitte 2026) : 2 % adoption à grande échelle
- France Compétences RUF (2026) : marché 29 Md€
