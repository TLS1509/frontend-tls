# COPY V2 — The Learning Society
> Copywriting · Anti-slop audit · SEO strategy  
> Rédigé le 2026-06-09 — source : Notion audit, PRODUCT.md, pages actuelles

---

## 0 — Audit anti-slop : violations communes à corriger en code

**Applicable à TOUTES les pages marketing** avant production.

| Violation | Criticité | Pages concernées | Fix |
|-----------|-----------|-----------------|-----|
| Tiny uppercase tracked eyebrow sur CHAQUE section | 🔴 Bloquant | Toutes | Supprimer ou convertir en H2 fort. Max 1 kicker par page. |
| `GradientText` sur les headings | 🔴 Bloquant | Formation, Accompagnement, Learning App, Contact, Équipe, Méthode | Remplacer par `text-primary-700` ou `text-ink-900` solide |
| Métriques non vérifiées (40+ missions, 97% satisfaction) | 🟡 Urgent | Accompagnement | Supprimer ou marquer clairement "données internes 2025–2026" |
| Témoignages illustratifs présentés visuellement comme vrais | 🟡 Urgent | Accompagnement, Équipe | Supprimer pour la V1 live, ou afficher "Prochainement" |
| Équipe entièrement fictive | 🟡 Urgent | Équipe | Ne pas mettre en production avec du fake |
| STRIDE acronyme illustratif | 🟡 Urgent | Méthode | Remplacer par le vrai STRIDE TLS |
| Badge "Beta · En développement actif" | ℹ️ Info | Learning App | Retirer quand la beta est terminée |

**Règle absolue : le site doit refléter la réalité TLS — pas la réalité idéale.**  
Mieux vaut une page plus courte avec un seul vrai chiffre qu'une page longue avec des données inventées.

---

## 1 — Page : Accueil

### SEO Metadata

| Champ | Valeur |
|-------|--------|
| **Title tag** | `Formateur Augmenté · Formation et plateforme IA pour les professionnels de la formation — The Learning Society` |
| **Meta description** | `Formez-vous à l'IA pédagogique avec une certification Qualiopi. Découvrez la méthode STRIDE, la Learning App et l'accompagnement sur mesure — sans bullshit IA.` |
| **H1 recommandé** | Voir options ci-dessous |
| **Slug** | `/` ou `/marketing` |
| **Keywords cibles (H1/H2)** | formateur augmenté · formation IA formateurs · ingénierie pédagogique IA · plateforme formation IA |

### H1 — 3 options (choisir une)

**Option A — Direct/compétences (recommandée)**  
`Maîtrisez l'IA dans vos formations.`  
Sous-titre : Certification Qualiopi · Parcours adaptatif · Accompagnement humain.  
*Pourquoi :* direct, bénéfice clair, ancre sur le vrai besoin ("maîtriser" pas "découvrir").

**Option B — Urgence/positionnement**  
`L'IA entre dans vos formations. Autant que ce soit vous qui décidiez comment.`  
Sous-titre : Parcours certifiant · Coaching 1-1 · Méthode STRIDE.  
*Pourquoi :* adresse l'anxiété sans peur-clickbait. Marque une posture.

**Option C — Accroche Notion audit**  
`Formez-vous, concevez, déployez.`  
Sous-titre : L'IA devient votre allié formation — pas votre remplaçant.  
*Pourquoi :* les 3 verbes couvrent les 3 offres TLS en une ligne.

### Copy section par section

**CTA principal :** `Voir la formation` → `Découvrir le parcours Formateur Augmenté`  
**CTA secondaire :** `Prendre rendez-vous` → garder (direct, honnête)

---

#### Section "3 offres" (actuellement 3 cards identiques avec icon+titre+texte)

Au lieu du grid de cards :

```
Apprendre               Concevoir               Déployer
─────────────────────────────────────────────────────────
Formation certifiante   Studio · Conseil        Learning App
Formateur Augmenté      Accompagnement          Plateforme adaptative
7 modules · 23h         Sur mesure              Accès anticipé
249€ → 890€             Sur devis               Gratuit (bêta)
[Voir le programme]     [Demander un devis]     [Rejoindre la bêta]
```

Titre de section H2 : `Trois façons de travailler avec nous.` (pas d'eyebrow)

---

#### Section "Pourquoi TLS" / Doctrine

H2 : `On ne forme pas à l'IA. On vous aide à l'intégrer dans votre métier.`

Corps :  
> Les outils IA changent chaque mois. Les principes pédagogiques, eux, restent. On vous apprend à choisir et à cadrer ces outils — pas à suivre les tendances.  
> Notre approche part du Dreyfus : novice à expert, par la pratique. Pas par la consommation passive de contenu.

CTA : `La méthode STRIDE →`

---

#### Section social proof (honnête)

**Ne pas afficher de métriques non vérifiées.** Alternatives honnêtes :

- Si vous avez des chiffres réels : `[N] formateurs certifiés · Qualiopi · Open Badge 2.0`
- Si pas encore : une citation de la fondatrice/fondateur (authentique, signée)
- Ou : supprimer cette section pour la V1 et l'ajouter quand les données sont là

H2 : `Ce que disent ceux qui sont passés par là.`  
*(Section visible seulement quand des témoignages réels sont disponibles)*

---

#### Section "La Learning App"

H2 : `Une plateforme conçue pour que la formation colle à votre réalité.`  
Corps : `Parcours adaptatifs · Journal réflexif · Coaching augmenté · Passeport de compétences.`  
CTA : `Accès anticipé gratuit →`

---

#### Final CTA

H2 : `La prochaine promo commence bientôt.`  
Sous-titre : `7 modules. 23 heures. Une certification qui compte.`  
CTA primaire : `Réserver ma place`  
CTA secondaire : `Poser une question →`

---

### Anti-slop status (accueil)

| Critère | Status | Note |
|---------|--------|------|
| GradientText sur H1 | ❌ À corriger | Les 3 proposals (Preserve/Editorial/Bold) varient — vérifier |
| Eyebrow sur chaque section | ❌ À corriger | Preserve en a sur certaines sections |
| Métriques vérifiées | ⚠️ Conditionnel | Ne pas afficher sans chiffres réels |
| Témoignages réels | ❌ Ne pas publier | Marquer PLACEHOLDER dans le code |
| Hero type ≤ 6rem | ✅ Preserve/Editorial | Bold peut dépasser — vérifier |

---

## 2 — Page : Formation — Formateur Augmenté

### SEO Metadata

| Champ | Valeur |
|-------|--------|
| **Title tag** | `Formation Formateur Augmenté · Certification Qualiopi · 7 modules · The Learning Society` |
| **Meta description** | `Parcours certifiant de 23h sur 8 semaines pour intégrer l'IA dans vos pratiques de formation. Qualiopi · CPF · Open Badge 2.0. À partir de 249€.` |
| **H1** | `Deviens Formateur Augmenté.` ✅ (conserver) |
| **Keywords** | formateur augmenté certification · formation IA formateurs Qualiopi · parcours formateur IA CPF |

### Copy actuelle — ce qui est bon

- H1 : `Deviens Formateur Augmenté.` — direct, clair, marque une posture. Conserver.
- Sous-titre avec les 3 facts (7 modules, 23h, 8 semaines, C-Campus) — très bon, conserver.
- CTA pricing : `Réserver ma place` — fort.
- FAQ : `Toutes tes questions, sans détour.` — bon ton.

### Copy à améliorer

**Eyebrows à supprimer / reconvertir :**

| Eyebrow actuel | Remplacer par H2 |
|----------------|-----------------|
| `LE PROGRAMME` | `7 modules pour bâtir ta pratique IA.` |
| `PUBLIC CIBLE DU PARCOURS` | `Ce parcours est fait pour toi si...` |
| `COMPÉTENCES CLÉS DÉVELOPPÉES` | `Ce que tu sauras faire à la fin.` |
| `TARIFICATION` | `Trois niveaux d'engagement.` |
| `QUESTIONS FRÉQUENTES` | Conserver en H2 sans eyebrow |

**Section modules — améliorer les descriptions :**

Les descriptions actuelles sont correctes. Point de vigilance : éviter les adjectifs vides.  
Exemple à améliorer :  
- Actuel : "Comprendre le paysage IA actuel et ses implications pédagogiques"  
- Amélioré : "Cartographier les outils IA existants et savoir lesquels valent ton temps"

**Section public cible — simplifier :**

Actuel : blocs avec icônes et descriptions larges  
Proposé : 4 bullets sans icône redondante

```
Ce parcours est fait pour toi si tu es :
• Formateur indépendant qui veut rester pertinent face à l'IA
• Ingénieur pédagogique en organisme de formation (OF)
• Responsable formation en entreprise (CLO, DRH, RFF)
• Consultant qui intègre déjà du conseil formation dans son offre
```

**Section tarification — rendre l'option recommandée plus claire :**

Actuel : 3 plans, le Certifiant est "highlighted" mais sans argument fort  
Proposé : ajouter sous le prix recommandé :

> `Le plus choisi. Inclut la session de validation avec C-Campus et l'Open Badge 2.0.`

**Garantie / risque reversal :**  
Ajouter (si c'est vrai) : `Satisfait ou remboursé sous 14 jours — aucune question.`  
*(Ne pas ajouter si la politique de remboursement n'existe pas)*

### CTA améliorés

| Position | CTA actuel | CTA proposé |
|----------|-----------|-------------|
| Hero | `Rejoindre la prochaine promo` | `Réserver ma place →` |
| Après tarification | `Démarrer` | `Choisir ce plan` (par plan) |
| Final | `Prêt·e à rejoindre la prochaine promo ?` | `La prochaine promo démarre bientôt.` + `Réserver ma place` |

---

## 3 — Page : Accompagnement / Studio

### SEO Metadata

| Champ | Valeur |
|-------|--------|
| **Title tag** | `Accompagnement IA Formation · Audit, Conception, Déploiement sur mesure — The Learning Society` |
| **Meta description** | `Audit stratégie IA, conception pédagogique augmentée, déploiement Qualiopi-compatible. Co-construction sur mesure pour OF et entreprises.` |
| **H1** | `On co-construit ta stratégie IA.` ✅ (conserver) |
| **Keywords** | accompagnement IA formation · conseil ingénierie pédagogique IA · déploiement IA organisme formation |

### Copy actuelle — ce qui est bon

- H1 : `On co-construit ta stratégie IA.` — fort, direct, tutoiement cohérent.
- Sous-titre : `Des experts en pédagogie et en IA, sans bullshit. On audit, on conçoit, on déploie, on mesure.` — excellent, conserver.
- Les 6 services sont bien nommés.
- Le process 3 phases (Diagnostic / Co-construction / Déploiement) est clair.

### Métriques — point critique

⚠️ Les métriques actuelles (`40+ missions livrées`, `6 sem time-to-market`, `97% satisfaction`, `12+ secteurs`) **ne doivent pas être publiées si elles ne sont pas vérifiables**.

Options :
1. **Remplacer par des faits vérifiables** — ex. "Qualiopi-compatible · Secteurs public et privé · Depuis [année]"
2. **Supprimer la section metrics** pour la V1 live et l'ajouter quand les données sont audit-ready
3. **Conserver** avec une note interne que ces chiffres doivent être validés avant mise en ligne

### Eyebrows à corriger

| Eyebrow actuel | H2 proposé |
|----------------|-----------|
| `6 DOMAINES D'EXPERTISE` | `Six domaines, une seule logique : apprendre vraiment.` |
| `MÉTHODE` | Supprimer — `Notre processus` en H2 suffit |
| `ILS NOUS ONT FAIT CONFIANCE` | Supprimer jusqu'à avoir de vrais témoignages |
| `PRÊT·E À CO-CONSTRUIRE ?` | H2 : `Ton projet commence par une conversation.` |

### Témoignages

**Ne pas publier les témoignages illustratifs.** Pour la V1 :

H2 : `On construit la confiance avec ce qu'on livre, pas avec ce qu'on dit de nous.`  
Corps : `[Section à compléter avec de vrais retours clients — avec accord écrit]`  
Ou simplement : supprimer cette section pour la V1.

### Copy formulaire de contact

Titre : `Décris-nous ton projet.`  
Intro : `On répond en moins de 48h. Pas de pitch de vente — une vraie conversation sur ton contexte.`

Labels des champs :
- Nom → `Ton nom`
- Email → `Ton email pro`
- Organisation → `Ton OF ou ton entreprise`
- Besoin → `En deux phrases, ce que tu cherches`

CTA : `Envoyer ma demande →`  
Micro-copy : `On ne revend pas tes données. On ne te fait pas un devis par défaut.`

---

## 4 — Page : Learning App

### SEO Metadata

| Champ | Valeur |
|-------|--------|
| **Title tag** | `Learning App — Plateforme de formation IA adaptative · The Learning Society` |
| **Meta description** | `Parcours adaptatifs Dreyfus, journal réflexif, coaching augmenté, Open Badges. La plateforme formation qui mesure vraiment la progression. Accès anticipé gratuit.` |
| **H1** | `Une plateforme. Tout un écosystème.` — correct mais peut être plus précis |
| **H1 alternatif** | `La plateforme de formation qui mesure ta progression, pas tes clics.` |
| **Keywords** | plateforme formation IA · learning app formation · parcours adaptatif Dreyfus · formation en ligne formateurs |

### Copy actuelle — ce qui est bon

- Stats (120+ modules, 40+ formateurs, 200h contenu, 30min session) : si réelles, garder. Sinon marquer PLACEHOLDER.
- Les 3 features principales sont bien structurées.
- Les 3 use cases (Formateur / Apprenant / Responsable L&D) sont utiles.

### Eyebrows à corriger

| Eyebrow actuel | H2 proposé |
|----------------|-----------|
| `TROIS PILIERS` | `Ce qui distingue une vraie plateforme pédagogique.` |
| `ET BEAUCOUP PLUS` | `Tout ce qui complète l'expérience.` |
| `POUR QUI ?` | `La plateforme s'adapte à ton rôle.` |
| `PRÊT·E À REJOINDRE LA BÊTA ?` | `Rejoins la bêta — accès gratuit, nombre de places limité.` |

### Badge bêta

Le badge `Beta · En développement actif · accès progressif par invitation` est honnête — bien.  
Ajuster le CTA : `Rejoindre la liste d'attente →` → `Demander un accès anticipé →`

### Copy améliorée : section "3 piliers"

**Titre de section :** `L'apprentissage n'est pas linéaire. La plateforme non plus.`

**Pilier 1 — Parcours adaptatifs**  
H3 : `Un parcours qui s'ajuste à où tu en es.`  
Corps : `Basé sur le modèle de Dreyfus, chaque apprenant commence à son niveau et progresse à son rythme. Pas de contenu générique — des étapes calibrées.`

**Pilier 2 — Journal réflexif**  
H3 : `L'apprentissage se consolide par la réflexion. Pas par la consommation.`  
Corps : `Chaque session génère une invitation à noter, structurer, relier. Le journal est ton espace, pas un tableau de bord pour ton manager.`

**Pilier 3 — Coaching humain augmenté**  
H3 : `Un coach humain. L'IA pour préparer, pas pour remplacer.`  
Corps : `Chaque parcours certifiant inclut des sessions 1-1. L'IA analyse ta progression entre les sessions ; le coach s'adapte.`

### Copy features tiles (8 tiles)

Remplacer les titres génériques :

| Actuel | Proposé |
|--------|---------|
| Gamification | `Progression visible, pas gamifiée pour gamifier` |
| Flashcards IA | `Mémorisation active, pas passive` |
| Veille intégrée | `La veille pédagogique, filtrée et annotée` |
| Open Badges | `Open Badge 2.0 — certifiable sur LinkedIn` |
| Contenus variés | `Vidéo, article, quiz, cas pratique — au bon moment` |
| Communauté | `Une communauté de pratique, pas un forum` |
| Chatbot pédago | `Un assistant pédago — pas un ChatGPT généraliste` |
| Analytics | `Des métriques sur la compétence, pas sur le temps de connexion` |

---

## 5 — Page : Contact

### SEO Metadata

| Champ | Valeur |
|-------|--------|
| **Title tag** | `Contact · The Learning Society — Formation IA pour formateurs` |
| **Meta description** | `Une question sur la formation, un projet d'accompagnement ou un accès à la Learning App ? On répond en moins de 48h.` |
| **H1** | `On adore les conversations qui démarrent bien.` → Trop idiomatique, risque de sonner "startup" |
| **H1 proposé** | `Parle-nous de ton projet.` |
| **Keywords** | contact formation IA formateurs · devis accompagnement formation IA |

### Copy à corriger

L'eyebrow actuel : `On adore les conversations qui démarrent` (avec icône MessageSquare)  
→ C'est en fait l'eyebrow de la page. Le H1 devrait être différent.

H1 proposé : `Parle-nous de ton projet.`  
Sous-titre : `Formation, accompagnement ou accès à la plateforme — on répond en moins de 48h.`

**GradientText sur le H1** : à corriger → `text-ink-900` ou `text-primary-700`.

**Suppression de l'eyebrow tracked**.

**Aside "Quick links"** : garder, très utile. Titres à ajuster :
- `Formation Formateur Augmenté` → `Formation certifiante · dès 249€`
- `Accompagnement sur mesure` → `Conseil & Studio · sur devis`  
- `Learning App — accès anticipé` → `Plateforme bêta · accès gratuit`

---

## 6 — Page : Équipe

### Note préliminaire critique

⚠️ **La page Équipe contient une équipe entièrement fictive** (Alex Renaudin, Sarah Chen, Karim Benazi, Léa Marchetti, Marc Daviau, Marie Lefebvre). **Cette page ne doit pas être publiée en l'état.**

Options pour la V1 :
1. **Fondatrice/fondateur uniquement** — si Chloé Mimault ou les fondateurs réels veulent apparaître, mettre leur vraie bio, photo réelle, et expertise réelle.
2. **Page "équipe" désactivée** pour la V1, avec redirection vers Contact.
3. **Page épurée "Notre approche"** — sans membres individuels, juste les valeurs et la mission.

### SEO Metadata (pour quand la vraie équipe est prête)

| Champ | Valeur |
|-------|--------|
| **Title tag** | `L'équipe The Learning Society — Experts pédagogie & IA formation` |
| **Meta description** | `Découvrez l'équipe The Learning Society : experts en ingénierie pédagogique, IA appliquée à la formation et accompagnement professionnel.` |
| **Keywords** | équipe formation IA · experts ingénierie pédagogique |

### Copy template (pour quand l'équipe réelle est disponible)

H1 : `Des pédagogues qui pratiquent ce qu'ils enseignent.`  
Sous-titre : `Pas de théorie abstraite sur l'IA — des professionnels qui ont déployé, raté, ajusté, et recommencé.`

H2 (section valeurs) : `Ce qui guide nos décisions.`  
*(Valeurs à définir avec la vraie équipe — ne pas inventer)*

---

## 7 — Page : Méthode STRIDE

### Note préliminaire

⚠️ **Le contenu STRIDE est déclaré illustratif dans le code** (`// ⚠️ PLACEHOLDER — Acronyme STRIDE illustratif`). Ne pas publier avant d'avoir le vrai contenu.

Si STRIDE est une vraie méthode TLS, la définir avec les vrais auteurs. Si c'est un acronyme interne, obtenir la définition validée.

### SEO Metadata

| Champ | Valeur |
|-------|--------|
| **Title tag** | `Méthode STRIDE · Ingénierie pédagogique augmentée par l'IA — The Learning Society` |
| **Meta description** | `STRIDE : la méthode d'ingénierie pédagogique augmentée par l'IA. De la conception à l'évaluation, un processus reproductible et Qualiopi-compatible.` |
| **Keywords** | méthode STRIDE formation · ingénierie pédagogique IA · modèle conception pédagogique |

### Copy H1 + intro (conserver la structure, remplacer le contenu placeholder)

H1 : `STRIDE : concevoir des formations IA-augmentées, étape par étape.`  
Sous-titre : `Notre méthode d'ingénierie pédagogique — de l'analyse du besoin à l'évaluation de l'impact.`

Section intro : `On ne fait pas confiance aux modèles génériques. STRIDE est né de nos missions terrain — pour rendre la conception pédagogique augmentée par l'IA reproductible et mesurable.`

*(Le reste du contenu dépend de la vraie définition de STRIDE — à compléter)*

---

## 8 — SEO Strategy

### Positionnement SEO global

**Angle différenciateur :** TLS n'est pas une plateforme e-learning générique. C'est le seul acteur français qui combine :
- Formation certifiante pour formateurs (pas pour "tout le monde")
- Méthode pédagogique propriétaire (STRIDE + Dreyfus)
- Plateforme Learning App intégrée
- Accompagnement conseil

→ **Niche à posséder :** "formation IA pour les professionnels de la formation" (un segment très peu couvert en France)

### Clusters de mots-clés

**Cluster 1 — Formateur Augmenté (branded)**
- `formateur augmenté` — volume faible, intention forte, à posséder
- `formation IA formateurs` — volume moyen, compétition modérée
- `devenir formateur IA` — longue traîne
- `certifier formation IA` — transactionnel

**Cluster 2 — Ingénierie pédagogique IA**
- `ingénierie pédagogique IA` — volume faible, expert
- `concevoir formation IA` — longue traîne
- `STRIDE méthode pédagogique` — branded + informatif
- `modèle Dreyfus formation` — informatif

**Cluster 3 — Plateforme formation**
- `plateforme formation IA` — volume fort, compétitif
- `learning app formation professionnelle` — longue traîne
- `parcours adaptatif formation` — longue traîne
- `Open Badge formateur` — informatif + transactionnel

**Cluster 4 — Accompagnement / Conseil**
- `accompagnement IA formation entreprise` — B2B
- `déployer IA organisme formation` — B2B OF
- `audit formation IA` — B2B
- `Qualiopi formation IA` — confiance

### Architecture de contenu recommandée

```
/ (Accueil)
├── /formation → Formateur Augmenté
├── /accompagnement → Studio & Conseil
├── /learning-app → Plateforme
├── /methode → STRIDE
├── /magazine → Blog/Veille (contenu SEO)
│   ├── /magazine/guide-ia-formation
│   ├── /magazine/modele-dreyfus-explication
│   ├── /magazine/qualiopi-ia-compatible
│   └── /magazine/open-badge-formateurs
└── /contact
```

### Plan de publication Magazine (6 articles prioritaires)

| # | Titre | Cluster | Intent | Priorité |
|---|-------|---------|--------|----------|
| 1 | `Comment intégrer l'IA dans vos formations sans perdre en qualité pédagogique` | Ingénierie péda IA | Informatif/SEO | 🔴 P1 |
| 2 | `Le modèle de Dreyfus appliqué à la formation IA : guide complet` | Dreyfus + IA | Informatif/SEO | 🔴 P1 |
| 3 | `Formation Formateur Augmenté : FAQ complète sur la certification` | Formateur Augmenté | Transactionnel | 🔴 P1 |
| 4 | `Méthode STRIDE : concevoir une formation IA-augmentée étape par étape` | STRIDE | Branded/SEO | 🟡 P2 |
| 5 | `Qualiopi et IA : comment rester conforme en intégrant l'intelligence artificielle` | Qualiopi IA | B2B/Confiance | 🟡 P2 |
| 6 | `Open Badge 2.0 pour les formateurs : ce que ça change vraiment` | Open Badge | Informatif | 🟡 P2 |

### On-page SEO checklist (par page)

- [ ] Title tag 50–65 caractères, mot-clé principal en tête
- [ ] Meta description 145–160 caractères, CTA inclu
- [ ] H1 unique par page, mot-clé naturellement intégré
- [ ] H2 structurent le plan de page, pas de doubles H1
- [ ] Images : alt text descriptif (pas "image1.jpg")
- [ ] URL slugs : `/formation` pas `/formation-formateur-augmente-phase-p25-qualiopi`
- [ ] Open Graph : `og:title`, `og:description`, `og:image` (1200x630)
- [ ] Canonical tag sur toutes les pages
- [ ] JSON-LD : `Organization`, `Course` (Formation), `WebSite`
- [ ] Données structurées `Course` sur la page Formation (eligible à rich snippets)

### Schema.org recommandé (Formation page)

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Formateur Augmenté",
  "description": "Parcours certifiant 7 modules, 23h, pour intégrer l'IA dans les pratiques de formation",
  "provider": {
    "@type": "Organization",
    "name": "The Learning Society",
    "sameAs": "https://thelearningsociety.fr"
  },
  "coursePrerequisites": "Expérience en formation professionnelle",
  "educationalCredentialAwarded": "Open Badge 2.0 · Certification C-Campus",
  "offers": {
    "@type": "Offer",
    "price": "249",
    "priceCurrency": "EUR"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "blended",
    "inLanguage": "fr",
    "duration": "P8W"
  }
}
```

---

## 9 — Récapitulatif priorités d'action

### Urgent (avant toute mise en production)

1. **Supprimer/remplacer les témoignages illustratifs** sur Accompagnement et Équipe
2. **Supprimer ou vérifier les métriques** (40+ missions, 97% satisfaction) sur Accompagnement
3. **Désactiver la page Équipe** ou la remplacer par du vrai contenu
4. **Remplacer le contenu STRIDE** par la vraie définition
5. **Supprimer GradientText** de tous les headings (remplacer par `text-ink-900`)
6. **Supprimer les eyebrows trackés** de toutes les sections (sauf 1 kicker max par page)

### Court terme (avant optimisation SEO)

7. Écrire les 3 premiers articles Magazine (P1 ci-dessus)
8. Ajouter le schema.org Course sur la page Formation
9. Ajouter les og:image sur toutes les pages
10. Finaliser le H1 accueil (choisir parmi Options A/B/C)

### Moyen terme (après validation V1)

11. Plan de publication Magazine : 1 article/2 semaines
12. Backlinks : partenariats OF, C-Campus, réseaux formateurs
13. Page témoignages (quand vrais témoignages disponibles avec accord écrit)
14. Fiche Google Business Profile TLS

---

*Document maintenu par Chloé Mimault · The Learning Society*  
*Mettre à jour à chaque publication ou modification de page*
