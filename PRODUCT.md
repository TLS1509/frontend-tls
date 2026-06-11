# Product

## Register

product

## North Star

**Augmented Mastery.** L'apprenant-praticien est protagoniste de chaque écran. L'IA et le coach augmentent sa pratique sans s'y substituer. Manager et CLO pilotent un portfolio de protagonistes — jamais un tableau de chiffres.

Le north star se décline en 4 maîtrises selon le rôle. Chaque rôle a son UI propre ; aucun écran ne sert deux rôles à la fois.

| Rôle | Forme de maîtrise | Surface dominante |
|---|---|---|
| Apprenant | Maîtrise de ses compétences (Dreyfus Novice → Maître) | Dashboard apprenant, Passeport, lesson player, journal |
| Coach | Maîtrise de l'accompagnement (correction itérative, validation JAC) | Coach hub, queue de corrections, calendrier 1-1 |
| Manager / Team Lead | Maîtrise du portfolio d'équipe (flux de cohort, timing d'intervention) | Manager dashboard, validation queue crédits, alertes |
| CLO / DRH | Maîtrise stratégique des capabilités organisationnelles | Enterprise dashboard, analytics, heatmap org, prédictif |

## Mechanism

**Practice comme verbe.** Chaque écran cadre une pratique active, pas une consommation passive de contenu. Le vocabulaire produit reflète cette grammaire.

- ✅ « Reprends ta réflexion », « Valide la pratique », « Soumets le JAC », « Continue la mission »
- ❌ « Continue le module », « Visionne la leçon », « Termine le quiz », « Complète ton parcours »

La pratique est un événement actif validé (FAST post-mission, JAC compétence, EDRA-R, projet SBO). Le contenu est l'instrument qui prépare la pratique ou qui la débriefe. Le contenu sans pratique = zéro preuve de compétence (cf. cahier 02 : JAC = validation factuelle, pas case cochée ; cahier 05 : JAC = ZÉRO XP justement pour empêcher le content-farming).

## Doctrine

**L'IA augmente la pratique humaine, ne la remplace pas.**

Conséquences design directes, non négociables :

- Toute output IA porte un label « IA » visible (cf. cahier 13bis AI Act — Transparency Rule)
- Un bouton override accompagne chaque recommandation IA destinée à un humain décideur (coach, manager)
- L'IA est rendue comme instrument calibré : sources citées, score de confiance affiché, rationale accessible — jamais comme magic copilot
- Le chatbot répond strictement depuis le contenu curé TLS (pas de web search, pas d'invention — cf. cahier 12) ; sous threshold de confidence, il oriente vers le coach humain
- L'auto-tagging automatique est interdit (cf. 12bis) ; l'IA suggère, Pierre/Admin valide
- Bias monitoring obligatoire sur toute décision IA (logging rationale, override tracking, fairness metrics — cf. 13bis)

## Users

**Protagonistes — ceux qui pratiquent (80 % des surfaces, 100 % du temps passé)**

- **Apprenant Entreprise** — knowledge worker, technicien, manager middle-level upskillé par son employeur. Pratique sur projets réels de son organisation. Apporte une expertise antérieure. ~2-3 sessions par semaine, 15-40 min chacune, en pleine journée de travail. N'est pas un étudiant ; refuse tout ce qui infantilise.
- **Apprenant Individuel** (edge B2C) — auto-financé Stripe direct. Surface mineure mais supportée. Mêmes besoins fonctionnels, pas de manager au-dessus.

**Augmentateurs — ceux qui servent la pratique**

- **Coach** (interne entreprise ou marketplace TLS) — valide les JACs, anime les sessions 1-1 (Google Meet + Outlook sync), corrige les soumissions de manière itérative, supervise le journal apprenant **uniquement sur opt-in granulaire** (cf. cahier 07).
- **Expert TLS / Marketplace** (V1+) — domain specialist accessible cross-companies, livraison via la plateforme avec commission.
- **IA Mistral** — instrument transparent. 10 features button-triggered ou transparentes réparties MVP → V2 (positionnement auto-généré, recommandations adaptive paths, matching missions, churn alerts, org intelligence, project auto-config). Self-hosted, budget tokens ~$1500/mois en V2. Pas de chatbot conversationnel always-on.

**Pilotes — ceux qui pilotent le portfolio**

- **Manager / Team Lead** — supervise une cohort de 5-50 apprenants, valide les dépenses crédits (toggle approval par team), intervient sur blocages détectés par alertes engagement.
- **Company Admin** — déploie la plateforme dans son entreprise, gère équipes et roles, configure le credit pool, accède aux dashboards entreprise.
- **CLO / DRH / Directeur L&D** — buyer principal. Vue stratégique 3-year. Évalue le ROI mesurable, les allocations budget formation, la maturité SBO de son organisation. Achète sur démo + références ; renouvelle sur preuves chiffrées.

**Système — qui maintient la plateforme**

- **Admin Platform** (Pierre + équipe core) — taxonomy H.S.O, expert pool, animation client, configuration BO WordPress, audit trail GDPR.

## Cadence Reality

L'usage typique d'un apprenant entreprise n'est PAS quotidien. C'est :

- **2-3 sessions par semaine**, 15-40 minutes chacune
- **En pleine journée de travail** (pas du loisir, pas du soir, pas du weekend)
- **Sur fenêtres opportunistes** (avant une réunion, début de journée, après un sprint)
- **Avec discontinuités acceptées** : congés, sprints projet, vacances scolaires, périodes de charge

Conséquences design non-négociables :

- **Pas de streak quotidien punitif type Duolingo.** Le streak TLS est hebdomadaire et tolère 1-2 jours off (cf. cahier 05 : seuils 3j / 7j / 30j configurables, pas 365j-no-break).
- **Le dashboard apprenant ouvre sur l'ACTION du jour, pas sur l'historique.** Le journal de la semaine est secondaire, pas hero.
- **Les notifications sont silencieuses le weekend par défaut** (configurable par apprenant). Pas de relance dimanche 22h.
- **La pause-reprise est first-class.** Le système doit retrouver l'apprenant exactement où il était : brouillon journal sauvegardé, position dans le lesson player, étape de mission en cours. Zéro re-onboarding après absence.
- **L'atrophie 90j (cahier 05 Badges Compétences)** signale la décroissance Dreyfus sans dramatiser. Pas d'alerte rouge ; un fade calme + une suggestion de re-pratique.

## Product Purpose

The Learning Society est le système d'exploitation pour les Organisations Skills-Based (SBO). **Pas une plateforme de formation.** L'infrastructure qui permet à une entreprise de transitionner d'un modèle « job-based » (rôles rigides, diplômes, ancienneté) vers un modèle « skills-based » (capacités réelles, validées par evidence, dynamiquement allouées).

Boucle structurante : **Learn → Do → Match.**

- **Learn** — parcours adaptatifs personnalisés par IA, calibrés sur le Passeport individuel (positionnement Mistral conversationnel + niveaux Dreyfus 1-5 + référentiel H.S.O).
- **Do** — Projects SBO et Missions Apprenantes (AFEST). Travail client réel validé par JAC (Jalon d'Application Critique). Preuve de compétence, pas case complétée.
- **Match** — le Passeport devient source de vérité organisationnelle. IA matche talents-projets, prédit skill gaps, alerte atrophie, recommande trajectoires.

Le moat = **fusion IA + ingénierie pédagogique**.

- Pure-tech (Cornerstone, Docebo, SAP SuccessFactors) — manquent la méthodologie.
- Pure-consulting (Mercer, Deloitte, McKinsey) — manquent la plateforme.
- Pure-AI-matching (Skill Muse, Degreed, EightFold, Gloat) — manquent le SBO operating model.

TLS combine les trois et embed le consulting IP (méthodologie STRIDE — S'orienter / Tester / Réaliser / Intégrer / Déployer / Évoluer ; templates SBO ; référentiel H.S.O) dans la plateforme elle-même. Le Wiki public Notion expose une partie de cette IP sans login — anti-Cornerstone closed, anti-McKinsey paywalled.

Vision 2031 (cf. Notion Roadmap 5 ans) : « The Operating System for Skills-Based Organizations ». ARR cible 5-6 M€ en Phase 3 via SaaS + Marketplace experts + Data licensing + Partnerships.

## Brand Personality — internal alignment

**Stratégique. Augmenté. Humain.**

Triplet d'adjectifs internes pour aligner design + produit + commerce sur trois axes. **Pas un tagline marketing.** La tagline publique est en cours de refresh par l'équipe brand séparément (direction probable : angle « maîtriser l'IA avant qu'elle ne vous remplace » ou similaire — benchmark à venir). La tagline actuelle « La formation augmentée par l'IA » n'est PAS un asset à préserver.

Le triplet sert exclusivement à trancher les arbitrages internes :

- **Stratégique** — chaque feature porte un outcome business mesurable. Pas de contenu pour le contenu, pas de feature pour la démo. Si une feature ne ferme pas un gap dans le moat (Passeport / STRIDE / Match), elle ne va pas en V1.
- **Augmenté** — l'IA est partout en arrière-plan, jamais en spectacle. L'humain (apprenant, coach, manager) reste sujet du verbe. L'IA est instrument calibré, transparente, surchargeable. Anti-magic-AI.
- **Humain** — l'apprenant est protagoniste. Le ton est warm, jamais corporate. L'erreur n'est jamais punitive. La cadence respecte la vraie vie de travail.

## Voice

Tutoiement / vouvoiement décidé par la nature de la surface, pas par la position dans le funnel.

- **tu** — apprenant seul dans son espace personnel : dashboard apprenant, lesson player, Passeport personnel, journal, messaging coach (vue apprenant), notifications in-app learner.
- **vous** — adresse à un professionnel en contexte de travail : coach hub, manager / team lead / company admin / CLO views, admin platform BO, marketing public, auth pages (multi-rôle), emails transactionnels coach/manager/admin, wiki Notion public, footer/légal.
- **Fallback ambigu** → défaut **vous**. Le tutoiement est gagné par l'intimité de l'écran, jamais imposé par défaut.

Règles de copy obligatoires :

- Pas de point d'exclamation produit (sauf erreur destructive confirmée)
- Pas d'em dashes (—) en UX copy ; commas, colons, periods uniquement
- Pas d'hyperbole marketing (« incroyable », « révolutionnaire »)
- Pas de « ! » sur badge unlock — le badge s'affiche calmement
- Acronymes TLS écrits en clair la première fois sur une surface (JAC, FAST, EDRA, STRIDE, H.S.O, RIEC, DSAR, RTBF)

## Anti-references

**LMS Enterprise** (Cornerstone, Docebo, SAP SuccessFactors, Workday Learning) — tableaux gris, drop-down hell, energy compliance-checkbox, 2008 UI. Le design TLS doit lire comme l'opposé d'une feuille de présence.

**Cours-libraries** (LinkedIn Learning, Coursera Business, Udemy Business) — algorithm rabbit holes, pas de workflow, pas d'evidence de compétence, pas d'intelligence organisationnelle. TLS est workflow-first, contenu-as-instrument.

**AI SaaS froid** (Notion AI dark, ChatGPT Enterprise dark) — purple-cyan gradients en dark mode, framing « neural » / « copilot » / « magic », **mascotte chatbot avec persona souriante**. TLS rejette ces tropes.

À l'inverse, TLS revendique comme signatures positives : **glassmorphisme intentionnel** (jamais décoratif — sur surfaces qui overlap du contenu), **icône Sparkles fonctionnelle** (marqueur de feature IA, jamais twinkle décoratif), **animation anthropomorphique du logo TLS** (logo comme signe vivant pendant l'inférence, à la Claude — pas mascotte), **dégradés ambient diffus** (lumière côtière en fin d'après-midi). Voir DESIGN-IMPECCABLE.md §13 Visual Vocabulary.

**« Skill intelligence » corporate** (Microsoft Viva Learning, Cornerstone Skills Graph, SAP SF Talent Hub) — beige corporate, marketing integration-first. TLS est experience-first ; les intégrations sont le moat, pas la vitrine.

**Consumer gamification B2B** (Duolingo Business, Babbel for Business) — streaks punitifs, leagues, mascottes. Le CLO ne présente pas ça à son comex. Anti-mascotte explicite.

**AI-matching startups** (Skill Muse, Degreed, EightFold, Gloat) — bubble charts décoratifs, force-directed graphs, network diagrams as decoration. Matching tech sans SBO operating model en dessous.

**Consulting pur** (Mercer, McKinsey L&D practice, Deloitte Human Capital) — beautiful slides, no product. TLS bake le consulting IP dans le produit ; les templates SBO sont la plateforme.

**Generic « AI for L&D » decks** — rocket icons, neural network illustrations, blue/purple gradients « intelligence », hero-metric tiles (« 87 % d'adoption ! »). Retenue éditoriale à la place.

## Design Principles

**1. L'apprenant est protagoniste — toujours.** Chaque écran apprenant doit pouvoir répondre à « quelle est mon action maintenant ? » en moins de 3 secondes. La hiérarchie visuelle place l'action du jour en hero, l'historique en secondaire, les analytics en tertiaire (ou dans une vue dédiée). Aucun écran ne sert deux rôles à la fois.

**2. L'IA est instrument transparent, jamais spectacle.** Label « IA » visible, source citée, score de confiance affiché, bouton override accessible. Le chatbot n'invente jamais ; sous-threshold de confidence il oriente vers le coach humain. Aucune surface produit n'utilise un purple-gradient « intelligence » ou un sparkle iconography.

**3. Une altitude par viewport.** Strategic (CLO/manager) ou Operational (coach/apprenant) — jamais les deux dans la même surface. Mixer les altitudes tue la vitesse de décision et produit le design schizophrène cockpit-en-haut-négligé-en-bas.

**4. Pratique validée > complétion de contenu.** La hiérarchie visuelle privilégie le JAC, le FAST, l'EDRA, le projet validé. Les progress bars de cours sont secondaires. Le Passeport est la source de vérité, pas le taux de complétion.

**5. Cadence hebdomadaire respectée.** Pas de streak punitif quotidien. Pas de notification weekend par défaut. Le dashboard ouvre sur l'action du jour. La pause-reprise est first-class. L'atrophie est signalée calmement, jamais en rouge alerte.

**6. Warmth as moat.** Le default catégorie est froid (LMS Enterprise) ou cold-clever (AI SaaS). TLS gagne en étant warm ET rigoureux. Le warmth n'est pas décoratif — c'est le positionnement même. Chaque token de palette, chaque pairing typo, chaque copy choice signale le respect de l'humain qui pratique.

## Accessibility & Inclusion

WCAG 2.1 AA minimum sur 100 % des surfaces. AAA cibles sur :

- Surfaces apprenantes critiques : lesson player, assessment, journal, Passeport personnel
- Surfaces CLO critiques : analytics dashboards, validation queues, heatmaps org

Touch target 44 px minimum sur tout interactif (utility Tailwind `min-h-touch` déjà mappée). `prefers-reduced-motion` honoré sur chaque animation, y compris primitives framer-motion du site marketing. Couleur jamais seul vecteur de sens — icône + label sur chaque état sémantique (success/danger/warning/info). Français primary ; i18n-ready pour EN, ES, potentiellement DE (expansion européenne phase 3).

Compliance GDPR + AI Act intégrée au design (cf. cahier 13bis) : consent management, DSAR self-service, RTBF (suppression compte), AI transparency label sur chaque output IA, override mechanism sur recommandations IA destinées aux humains, bias monitoring sur décisions matching.
