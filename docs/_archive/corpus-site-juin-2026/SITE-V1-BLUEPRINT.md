# SITE-V1-BLUEPRINT.md — Plan de contenu des 6 pages
## À valider avant tout code

> Toutes les décisions de copy, section, CTA et facts sont ici.
> Zéro invention — tout tracé depuis SITE-V1-GROUNDING.md.
> Dernière mise à jour : 2026-06-10

---

## PAGE 1 — ACCUEIL (`index.html`)

**Audience :** DRH, CLO, Directeur Formation ETI (200-2 000 salariés), OF
**Registre :** vous
**Angle :** SBO-forward — le problème structurel, la boucle Learn → Do → Match, les 3 offres en entrée de flow
**Ton :** stratégique, concret, pas de hype

---

### HERO

**Headline (2 options à trancher) :**
- Option A : "Vos talents apprennent. Vos projets avancent. Vos compétences s'accumulent."
- Option B : "Former, déployer, matcher — dans un seul cycle."
- Option C : "Le système d'exploitation pour les organisations Skills-Based."

Recommandation : Option A (bénéfice d'abord, concept ensuite) ou Option C (positionnement pur).

**Sous-titre :**
"The Learning Society combine formation adaptative, projets réels et passeport de compétences dans une boucle qui s'enrichit à chaque cycle. Pour les organisations qui pilotent leurs talents par les compétences, pas par les postes."

**CTA principal :** Voir comment ça fonctionne → ancre vers section Learn→Do→Match
**CTA secondaire :** Nous contacter → `/contact.html`

**Visuel hero :** pas d'illustration (règle anti-slop). Un élément typographique fort ou la boucle Learn → Do → Match en format diagramme minimaliste.

---

### SECTION 1 — Le problème (pas de titre visible, en prose)

**Format :** texte éditorial long, une seule colonne, fond blanc ou surface légèrement teintée.

**Corps :**
"La plupart des organisations forment leurs collaborateurs. Très peu savent ce qu'ils ont réellement appris, ni où déployer ces nouvelles compétences.

Les LMS gèrent du contenu. Les cabinets de conseil livrent des rapports. Personne ne fait le lien entre formation, projet réel et allocation des talents.

C'est ce lien que nous avons construit."

**Pas d'eyebrow, pas de numéro de section.** Texte pur avec typographie marquée.

---

### SECTION 2 — La boucle Learn → Do → Match

**Format :** diagramme centré ou 3 colonnes asymétriques (LEARN / DO / MATCH) avec une flèche ou connecteur visuel entre elles. Pas de cards identiques.

**LEARN :**
"Formation adaptative au niveau Dreyfus de chaque apprenant. Parcours structuré, pas de catalogue générique."

**DO :**
"Application sur un projet réel avec coaching 1-1 et feedback expert. La compétence se prouve, elle ne se déclare pas."

**MATCH :**
"Le Passeport de Compétences, enrichi automatiquement, permet d'allouer les bons talents sur les bons projets futurs."

**Connecteur bas :**
"Plus le cycle tourne, plus le passeport devient précieux."

---

### SECTION 3 — Les 3 offres (flux de routing)

**Format :** 3 blocs alternés (pas une grille identique), chacun avec contexte + CTA spécifique.

**Bloc 1 — Formateur Augmenté** (fond teal clair)
Eyebrow : "Pour les formateurs" (1 seul dans la page)
Titre : "Maîtriser l'IA dans son vrai travail de formateur."
Texte : "7 modules à distance. Certification Open Badge via C-Campus (Qualiopi). 3 formules de 249 à 890 € HT."
CTA : "Voir la formation" → `/formation.html`

**Bloc 2 — Accompagnement SBO** (fond sombre teal ou orange secondaire)
Titre : "Piloter la transformation compétences de votre organisation."
Texte : "Audit de maturité, méthode STRIDE en 6 étapes, déploiement sur vos projets réels. Pour les ETI qui veulent avancer, pas juste savoir."
CTA : "Découvrir l'accompagnement" → `/accompagnement.html`

**Bloc 3 — Learning App** (fond neutre surface)
Titre : "La plateforme qui centralise tout."
Texte : "Parcours adaptatifs, Passeport de Compétences, coaching 1-1, journal réflexif, matching IA. En bêta — rejoignez les premiers."
CTA : "Rejoindre la bêta" → `/learning-app.html`

---

### SECTION 4 — Preuve (sans inventer)

**Format :** 2 faits contextuels + 1 credential enterprise.

Fait 1 : "Le marché français de la formation professionnelle représente 32 milliards d'euros. La quasi-totalité des acteurs occupent le quadrant généraliste."

Fait 2 : "Aucun acteur en France ne propose encore la boucle complète : former, appliquer sur un projet réel, matcher les talents sur les projets futurs."

Credential : "Notre programme Ingénieur Pédagogique Augmenté est aujourd'hui opérationnel dans un grand groupe français." [Pas de nom.]

---

### SECTION 5 — Ressources (ancre éditoriale)

**Format :** liste magazine (comme une table des matières), 3-4 articles réels du site.
Pas de grid. Chaque ligne a : titre + date + lien.

Articles réels à sourcer depuis le site live (à confirmer au build) :
- "Comment l'IA peut transformer votre pratique de formateur sans vous remplacer"
- (autres titres depuis thelearningsociety.fr/magazine)

CTA bas : "Toutes les ressources" → `/ressources.html`

---

### FOOTER

4 colonnes : TLS (logo + baseline courte) / Offres (Formation, Learning App, Accompagnement) / Ressources (Blog, Méthode STRIDE, À propos) / Contact (email + LinkedIn)
Pas d'adresse physique si non publiée. Pas de numéro si non publié.
Mentions légales + Politique de confidentialité (liens).

---

## PAGE 2 — FORMATION (`formation.html`)

**Audience :** Formateur Indépendant, Concepteur pédagogique, RF/responsable formation
**Registre :** tu
**Angle :** concret, gain de temps réel, badge reconnu, maîtrise humaine préservée
**Ton :** pair à pair, honnête, pas enthousiaste

---

### HERO

**Headline :** "7h pour intégrer l'IA dans ton vrai travail de formateur."
**Sous-titre :** "Pas un catalogue de vidéos. Un parcours en 7 modules qui part de ta pratique, avec Open Badge C-Campus à la clé."
**CTA :** Voir les formules (ancre vers pricing)
**CTA secondaire :** Commencer pour 249 € HT → lien C-Campus

---

### SECTION — Ce que tu sais faire à la sortie

**Format :** liste à 5 points, texte direct.

- Générer un scénario pédagogique avec l'IA en 20 minutes
- Évaluer et sélectionner les outils IA pertinents pour ton contexte
- Créer des évaluations de satisfaction en un temps record
- Transformer tes supports existants en microlearning
- Intégrer l'IA dans ton animation sans déshumaniser ta relation avec les apprenants

---

### SECTION — Les 7 modules (liste, pas de cards)

**Format :** liste numérotée 1-7 (ici les numéros sont légitimes : c'est un vrai parcours séquentiel)

1. Le Formateur Augmenté par l'IA : une révolution pédagogique
2. Le Prompt Engineering pour le formateur : maîtriser la communication avec l'IA
3. Choisir les bons outils d'IA en fonction de son contexte de formation
4. Découvrir l'IA dans la conception de formation
5. Utiliser l'IA pour enrichir l'animation et l'accompagnement sans déshumaniser
6. Automatisation augmentée par l'IA
7. Éthique, responsabilité et accompagnement critique des apprenants avec l'IA

Durée par module : environ 1h. Total : 7h à distance.

---

### SECTION — Formules et tarifs

**Format :** 3 colonnes (ici légitimes car 3 offres distinctes, pas décoratives)

| AUTONOME | OPEN BADGE | COACHING |
|----------|------------|---------|
| 249 € HT | 369 € HT | 890 € HT |
| 7 cours digitaux | 7 cours + Open Badge | 7 cours + Open Badge + 2 séances coaching 1-1 (2 × 1h30) |
| Accessible 72h après règlement | Certification "L'IA en formation" | Suivi personnalisé avec expert TLS |

Open Badge : délivré par C-Campus. 2 épreuves (analyse de pratique + micro-projet). Durée : 1h30-2h.

CTA principal : Commencer → lien C-Campus
Option intra : "Tu formes une équipe ? Animation intra sur-mesure disponible sur devis."

---

### SECTION — Partenaire C-Campus

"Le programme est diffusé en partenariat avec C-Campus, organisme de formation certifié Qualiopi.
C-Campus forme plus de 578 formateurs par an sur les pratiques pédagogiques, avec un taux de satisfaction de 93%."

[Attribution explicite : statistiques C-Campus, pas TLS]

---

### SECTION — FAQ (accordéon)

- "Est-ce que je dois avoir des bases en IA ?" → Non, aucun prérequis.
- "Le badge est-il reconnu par mes clients ?" → L'Open Badge est délivré par C-Campus, reconnu dans l'écosystème formation professionnelle.
- "Je peux commencer quand ?" → Accès sous 72h après règlement.
- "Y a-t-il un remboursement possible ?" → Modalités de remboursement disponibles sur la plateforme C-Campus.

---

## PAGE 3 — LEARNING APP (`learning-app.html`)

**Audience :** DRH, CLO, Directeur Formation, aussi Formateurs intéressés par la plateforme
**Registre :** vous
**Angle :** bêta ouverte, early adopters, co-construction, passeport comme actif stratégique
**Ton :** invitant, concret sur les fonctions, honnête sur le statut bêta

---

### HERO

**Headline :** "La plateforme qui fait le lien entre vos formations et vos projets réels."
**Sous-titre :** "Passeport de Compétences, parcours adaptatifs, coaching 1-1, matching IA. En bêta — rejoignez les premiers."
**CTA :** Rejoindre la bêta → `/contact.html` avec paramètre ?source=app

---

### SECTION — 5 fonctions clés (liste verticale alternée, pas de grille)

**Format :** 5 blocs éditoriaux alternés (texte gauche / visuel droit, puis inverse)

1. **Passeport de Compétences**
   "Un profil de compétences qui s'enrichit automatiquement à chaque formation suivie, chaque projet réalisé, chaque feedback reçu. Basé sur le modèle Dreyfus (5 niveaux). Vos données restent les vôtres."

2. **Parcours adaptatifs**
   "L'apprentissage s'ajuste au niveau réel de chaque apprenant, pas à un niveau déclaratif. Contenu pertinent, progression mesurable."

3. **Coaching 1-1**
   "Chaque apprenant peut réserver des séances avec un expert TLS. Le coaching est ancré dans son parcours et son projet réel, pas dans une visio générique."

4. **Journal réflexif**
   "Un espace pour noter ce qu'on a appris, comment on l'applique, ce qui reste flou. Le journal alimente le passeport."

5. **Matching IA**
   "Le passeport enrichi permet de recommander les bons talents sur les bons projets futurs. L'allocation par organigramme, c'est fini."

---

### SECTION — Credential enterprise

"Notre programme Ingénieur Pédagogique Augmenté est aujourd'hui opérationnel dans un grand groupe français depuis janvier 2026."
(Pas de nom. Preuve de déploiement sans identification.)

---

### SECTION — Tarifs bêta

**Format :** 2 options simples

Pass Solo : 30 €/mois — accès individuel complet
Pass Pro : 250 €/an — accès individuel + toutes les nouvelles fonctions en priorité

"Tarifs bêta. Les prix évolueront à la sortie de bêta. Les early adopters conservent leur tarif."

CTA : Nous contacter pour un accès → `/contact.html`

---

### SECTION — Roadmap (honnête)

"La Learning App est en construction active. Les fonctions déployées aujourd'hui sont celles du programme bêta. La roadmap complète inclut le matching IA avancé, les intégrations RH/LMS et l'analytics de compétences. Nous construisons avec nos premiers utilisateurs."

---

## PAGE 4 — ACCOMPAGNEMENT (`accompagnement.html`)

**Audience :** DRH, CLO, DAF, Directeur Formation ETI (200-2 000 salariés), OF
**Registre :** vous
**Angle :** trois missions distinctes, STRIDE comme méthode centrale, conseil = action pas rapport
**Ton :** stratégique, direct, factuel

---

### HERO

**Headline :** "Vous ne cherchez pas un rapport de plus. Vous cherchez à bouger."
**Sous-titre :** "Audit de maturité, méthode STRIDE, outils IA opérationnels. Trois missions pour transformer la gestion des compétences de votre organisation."
**CTA :** Nous contacter → `/contact.html`

---

### SECTION — Le contexte (prose)

"Les ETI de 200 à 2 000 salariés sont dans un vide. Les grands acteurs LMS sont trop chers et trop complexes. Les petits outils sont trop limités. Les cabinets de conseil livrent des rapports que personne ne met en oeuvre.

Nous livrons des résultats sur vos projets réels."

---

### SECTION — Mission 1 : Méthode STRIDE

**Format :** liste des 6 étapes (numérotée — légitimes car séquence réelle)

Titre : "La méthode STRIDE — 10 000 € HT / mission"
Sous-titre : "Une mission de conseil en 6 étapes pour devenir une organisation Skills-Based."

1. **S'orienter** — Audit de maturité SBO. Sensibilisation des équipes dirigeantes.
2. **Tester** — POC sur un parcours de formation sur-mesure. Preuve avant déploiement.
3. **Intégrer** — Branchement sur votre stack technique (LMS, CRM, RH).
4. **Réaliser** — Construction des référentiels de compétences et des agents IA.
5. **Déployer** — Lancement auprès de tous vos collaborateurs. Accompagnement au changement.
6. **Évoluer** — Analyse des données, mise à jour des compétences et des outils.

Bonus : "Pour tout contrat STRIDE, l'abonnement Learning App TLS est offert la première année."

CTA : Discuter de votre projet → `/contact.html`

---

### SECTION — Mission 2 : Solutions IA Plug & Play

Titre : "Solutions IA Plug & Play — 7 500 € HT / projet"
"Nous déployons des outils d'automatisation directement dans votre organisation.
Notion OF OS, agents chatbots IA sur-mesure, outils auteur adaptés à votre contexte.
Livraison opérationnelle, pas une roadmap."

CTA : Voir si ça correspond → `/contact.html`

---

### SECTION — Mission 3 : Upskilling L&D sur-mesure

Titre : "Upskilling L&D — 20 000 € HT / projet"
"Pour les départements formation qui veulent passer au niveau supérieur.
Masterclasses IA générative, coaching de groupe sur les skills-data, parcours certifiants Open Badges.
Sur-mesure, avec vos équipes, sur vos enjeux."

CTA : En savoir plus → `/contact.html`

---

### SECTION — Qui nous sommes (équipe réelle uniquement)

**Chloé Mimault** — Responsable technique, conception pédagogique et produit (CMT)
**Pierre-Armand Dennery** — Commercial, delivery, animation (PAD). Concepteur du programme Formateur Augmenté.

[Pas de photos si non validées. Pas de bios inventées.]

---

## PAGE 5 — RESSOURCES (`ressources.html`)

**Audience :** multi (formateurs, DRH, OF)
**Registre :** adapté au contenu
**Angle :** vraie valeur éditoriale, pas de génération de leads déguisée
**Structure :** 4 sous-sections dans une seule page — Blog / Méthode STRIDE / À propos TLS / Téléchargements

---

### HERO (minimaliste)

Titre : "Ressources"
Sous-titre court : "Articles, méthode, documents téléchargeables et présentation de The Learning Society."
Pas de CTA hero — c'est une page ressources.

---

### SOUS-SECTION 1 — Blog / Magazine

**Format :** liste magazine verticale (comme la homepage, mais complète)
Chaque article : titre + date + lien → article complet
Articles réels du site live uniquement.

CTA bas : "Toutes les publications" → lien externe magazine TLS

---

### SOUS-SECTION 2 — La méthode STRIDE

Description en prose des 6 étapes (mêmes que page accompagnement mais plus éditoriale).
"STRIDE n'est pas un acronyme d'agence. C'est une séquence de transformation qui part de l'audit et se termine par l'évolution continue des compétences."

CTA : Voir l'accompagnement STRIDE → `/accompagnement.html`

---

### SOUS-SECTION 3 — À propos de The Learning Society

"The Learning Society est fondée par Chloé Mimault et Pierre-Armand Dennery.
Notre conviction : la gestion des compétences est l'enjeu structurant de la formation professionnelle pour les dix prochaines années. Les organisations qui le comprennent maintenant auront une longueur d'avance.
Nous construisons les outils pour y arriver."

(Pas de chiffres de clients, pas de dates de création si non confirmés, pas de "depuis X ans".)

---

### SOUS-SECTION 4 — Téléchargements (si documents disponibles)

Liste de ressources téléchargeables réelles (à confirmer au build). Si aucune n'est disponible, cette section est retirée plutôt que remplie avec des placeholders.

---

## PAGE 6 — CONTACT (`contact.html`)

**Audience :** multi
**Registre :** vous
**Angle :** simple, direct, humain — pas un formulaire de génération de leads déguisé

---

### HERO

Titre : "Nous contacter"
Sous-titre : "Une question sur nos offres, un projet à explorer, une demande spécifique. Répondons-nous directement."

---

### FORMULAIRE

Champs : Prénom / Nom / Email (requis) / Organisation / Message (texte libre) / Objet (select : Formation / Accompagnement SBO / Learning App / Autre)

CTA : Envoyer votre message

Pas de promesse de réponse en X heures si non garantie.

---

### SECTION — Alternatives de contact

LinkedIn : liens vers Chloé Mimault et Pierre-Armand Dennery (si URLs validées)
Email direct (si adresse publiquement publiée sur le site actuel)

---

## DÉCISIONS OUVERTES (à trancher avant build)

1. **Hero headline homepage :** Option A, B ou C ? (voir Section HERO page 1)
2. **Photos équipe :** disponibles ou section sans photo ?
3. **Articles blog :** liste exacte des articles à sourcer depuis thelearningsociety.fr/magazine
4. **Téléchargements :** quelles ressources sont disponibles pour la page Ressources ?
5. **Email et LinkedIn :** URLs et adresse à valider pour la page Contact
6. **Visuel hero homepage :** diagramme Learn→Do→Match ou typographie seule ?

---

## CHECKLIST ANTI-SLOP (à vérifier sur chaque page au build)

- [ ] Pas de gradient text sur les headings
- [ ] Pas d'eyebrow sur chaque section (max 1 par page, délibéré)
- [ ] Pas de grille 3 cards identiques — layouts éditoriaux variés
- [ ] Pas d'em-dash (—) dans tout le copy
- [ ] Pas de métriques TLS inventées
- [ ] Pas de testimonials sans accord écrit
- [ ] Pas de "Académie" ni de "Agence" ni de "Conseil" comme nom de section
- [ ] "Contact" dans nav, jamais "Demander un devis"
- [ ] Orange non nommé
- [ ] Vouvoiement partout sauf page Formation (tu)
- [ ] Numéros de section (01/02) uniquement pour les vraies séquences (modules, étapes STRIDE)
- [ ] prefers-reduced-motion : toutes les animations désactivées ou réduites à un fade
