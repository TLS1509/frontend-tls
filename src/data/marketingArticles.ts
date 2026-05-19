/**
 * Articles du Mag' — contenu importé depuis thelearningsociety.fr/mag
 *
 * Sources canoniques : 10 articles publiés sur le site live.
 * Les intros, headings et citations sont des extraits fidèles.
 * Dates de publication estimées (le site live ne les expose pas).
 *
 * Pour pointer vers l'article complet, utiliser `liveUrl`.
 */

export type ArticleCategory =
  | 'IA'
  | 'Pédagogie'
  | 'Innovation'
  | 'Outils'
  | "Retours d'expérience";

export type ArticleSection = {
  heading: string;
  subheadings?: string[];
};

export type Article = {
  slug: string;
  title: string;
  /** Sous-titre court pour le hero de l'article. */
  subtitle: string;
  category: ArticleCategory;
  date: string;
  readTime: string;
  featured: boolean;
  /** Court résumé pour les cards de la grille (1-2 phrases). */
  summary: string;
  /** Paragraphe d'intro pour le hero de l'article (3-5 phrases). */
  intro: string;
  /** Headings H2/H3 dans l'ordre. */
  sections: ArticleSection[];
  /** Citations clés pull-out (3 max). */
  quotes: string[];
  /** Paragraphe de conclusion. */
  conclusion: string;
  /** URL canonique sur le site live (lecture complète). */
  liveUrl: string;
  /** Gradient Tailwind pour le cover de la card. */
  cover: string;
};

export const ARTICLES: Article[] = [
  {
    slug: 'referentiel-5-piliers',
    title: 'Le Référentiel des 5 Piliers',
    subtitle: 'La nouvelle matrice de compétences des professionnels L&D',
    category: 'Pédagogie',
    date: 'Mai 2026',
    readTime: '11 min',
    featured: true,
    summary:
      "Comment la fonction formation glisse de l'improvisation digitale vers une véritable gouvernance algorithmique. Notre référentiel structurant pour les L&D en 2026.",
    intro:
      "En 2026, la fonction formation a franchi un point d'inflexion. Ce basculement marque la fin d'une ère de bricolage numérique pour entrer dans celle de la gouvernance algorithmique stratégique. Ce référentiel constitue une matrice de compétences transverse destinée aux responsables de département, administrateurs LMS, concepteurs et tuteurs. L'enjeu n'est plus seulement de savoir « faire de la formation », mais de devenir un architecte de la performance humaine assistée par la technologie.",
    sections: [
      { heading: 'Un socle commun pour la filière' },
      { heading: "Pilier 1 : L'Ingénierie de la Montée en Compétences" },
      { heading: 'Pilier 2 : La Maîtrise Technologique (IA Skills)' },
      { heading: 'Pilier 3 : La Gouvernance (Legal & Ethics Skills)' },
      { heading: 'Pilier 4 : La Culture de la Donnée (Data Skills)' },
      { heading: "Pilier 5 : L'Intelligence Émotionnelle (Soft Skills)" },
      { heading: 'Vers une organisation apprenante' },
    ],
    quotes: [
      "Ce basculement marque la fin d'une ère de bricolage numérique pour entrer dans celle de la gouvernance algorithmique.",
      'Plus la technologie progresse, plus les compétences purement humaines deviennent stratégiques.',
      "L'IA peut transmettre un savoir, mais elle ne peut pas inspirer un changement de comportement profond.",
    ],
    conclusion:
      "Ce référentiel n'est pas une simple liste de tâches, c'est la nouvelle grammaire des métiers du L&D. En maîtrisant ces cinq dimensions, le professionnel de la formation devient le pilote stratégique de l'entreprise, capable de transformer l'incertitude technologique en opportunité de croissance humaine.",
    liveUrl:
      'https://thelearningsociety.fr/le-referentiel-des-5-piliers-la-nouvelle-matrice-de-competences-des-professionnels-ld/',
    cover: 'from-primary-200 via-primary-100 to-accent-100',
  },
  {
    slug: 'syndrome-reponse-facile',
    title: "L'IA et le syndrome de la réponse facile",
    subtitle: 'Et si nous apprenions enfin à douter ?',
    category: 'IA',
    date: 'Avril 2026',
    readTime: '6 min',
    featured: false,
    summary:
      "Pourquoi la facilité apparente des outils IA peut nuire à l'apprentissage profond — et comment y remédier en redessinant tes activités pédagogiques.",
    intro:
      "Dans nos organisations, l'IA délivre des solutions immédiates : scripts de vente, modules managériaux générés en quelques secondes. Mais dans nos entreprises, la réponse immédiate est souvent le tombeau de la compétence réelle. Comment refonder l'apprentissage à l'heure où une machine sait tout, plus vite que nous ?",
    sections: [
      { heading: 'La béquille ou le muscle : le dilemme du transfert pédagogique' },
      { heading: "Le retour de la Maïeutique : l'art de l'accouchement professionnel" },
      { heading: "De l'information à la performance : le défi du 21ème siècle" },
      { heading: 'Vers une Agora Numérique en entreprise' },
    ],
    quotes: [
      "Le véritable danger en entreprise n'est pas que la machine remplace l'expert, mais que l'expert finisse par ne plus décider que par la machine.",
      "La valeur d'un talent en 2026 ne réside plus dans ce qu'il sait (Google et l'IA le savent mieux que lui), mais dans sa capacité à naviguer dans l'incertitude.",
      "On ne retient jamais mieux qu'une solution que l'on a dû extraire de sa propre réflexion.",
    ],
    conclusion:
      "Le défi pour les L&D en 2026 : choisir entre utiliser l'IA pour livrer des réponses ou enseigner à leurs équipes à mieux questionner. Ancrer l'apprentissage dans une pratique active, exigeante, enracinée dans l'incertitude véritable.",
    liveUrl:
      'https://thelearningsociety.fr/lia-et-le-syndrome-de-la-reponse-facile-et-si-nous-apprenions-enfin-a-douter/',
    cover: 'from-secondary-200 via-secondary-100 to-accent-100',
  },
  {
    slug: 'digital-twin-apprenant',
    title: "Le « Digital Twin » de l'apprenant",
    subtitle: 'Et si on arrêtait de piloter la formation dans le rétroviseur ?',
    category: 'Innovation',
    date: 'Avril 2026',
    readTime: '8 min',
    featured: false,
    summary:
      "Vers une modélisation fine du profil apprenant pour des formations vraiment adaptatives. Enjeux, limites et perspectives concrètes.",
    intro:
      "L'analyse de besoins en formation ressemble trop souvent à une autopsie — on intervient une fois que les écarts de compétences ont déjà causé des dégâts. En 2026, l'ingénierie de formation change de braquet. Chez The Learning Society, on affine une méthode pour nos clients : utiliser l'IA non pour rédiger des quiz, mais pour simuler le futur. Voici comment passer d'une formation réactive à une ingénierie de précision.",
    sections: [
      { heading: "1. L'ingestion prédictive : cartographier les compétences avant qu'elles n'existent" },
      { heading: "2. Le crash-test pédagogique : simuler l'apprenant pour anticiper les freins" },
      { heading: '3. L\'extraction opérationnelle : générer un cahier des charges prêt à l\'emploi' },
      { heading: 'Ce que cela change pour vous' },
    ],
    quotes: [
      "L'analyse de besoins en formation ressemble trop souvent à une autopsie.",
      "On n'attend pas que l'écart de performance se creuse ; on spécifie les briques pédagogiques.",
      "L'IA simule le futur, c'est le responsable formation qui décide de la direction.",
    ],
    conclusion:
      "L'analyse de besoins doit fonctionner comme un phare, pas comme de la paperasse administrative. Mobiliser l'IA pour anticiper les scénarios futurs permet aux professionnels d'évoluer de preneurs d'ordres vers des architectes de capacités. The Learning Society reste convaincue que si l'IA éclaire le champ des possibles, c'est le responsable formation qui détient l'autorité stratégique.",
    liveUrl:
      'https://thelearningsociety.fr/le-digital-twin-de-lapprenant-et-si-on-arretait-de-piloter-la-formation-dans-le-retroviseur/',
    cover: 'from-accent-200 via-accent-100 to-primary-100',
  },
  {
    slug: 'dream-team-capot',
    title: 'Sous le capot de la « Dream Team »',
    subtitle: 'Le guide pratique pour configurer vos Assistants IA',
    category: 'Outils',
    date: 'Avril 2026',
    readTime: '12 min',
    featured: false,
    summary:
      "Comment nous construisons nos équipes pédagogiques hybrides humain × IA chez The Learning Society. Méthodes, rituels et apprentissages.",
    intro:
      "Nous avons précédemment introduit le concept d'« escouade » — une approche architecturale qui dépasse l'interface chat traditionnelle pour permettre l'ingénierie augmentée. Cet article ouvre notre laboratoire : nous révélons comment nous avons configuré et déployé notre « Dream Team » interne. La vérité, c'est que le succès ne réside pas dans l'outil, mais dans la façon de le façonner pour en faire un collaborateur fiable.",
    sections: [
      { heading: "L'Assistant n'est pas un agent (pour le moment)" },
      { heading: 'Notre stack technique : Mistral et Gemini au cœur du réacteur' },
      {
        heading: 'La Méthode de Configuration : Le protocole en 4 couches',
        subheadings: [
          'Couche 1 : La Fiche de Poste (Le « Qui »)',
          'Couche 2 : Le « Frame » (Le Périmètre)',
          'Couche 3 : Le COT — Chain of Thought (Le « Comment »)',
          'Couche 4 : Le Savoir (Le « Quoi »)',
        ],
      },
      {
        heading: 'Le Workflow en « Relais » : piloter l\'escouade au quotidien',
        subheadings: ['Le rôle pivot du Producteur', 'La boucle de contrôle', 'Reprenez le pilotage'],
      },
    ],
    quotes: [
      "À ce jour, les technologies agentiques sont encore trop instables et présentent des risques d'erreurs ou d'hallucinations trop élevés.",
      "L'Ingénieur Pédagogique est le garant du flux.",
      "La Dream Team n'est pas là pour vous remplacer, mais pour vous redonner du temps de cerveau disponible.",
    ],
    conclusion:
      "Quelle que soit la plateforme utilisée (Mistral, Gemini, ChatGPT ou Claude), le facteur critique reste l'établissement d'une structure rigoureuse autour des assistants IA. C'est ce cadre qui garantit un déploiement sûr, professionnel et efficace dans des environnements exigeants.",
    liveUrl:
      'https://thelearningsociety.fr/sous-le-capot-de-la-dream-team-le-guide-pratique-pour-configurer-vos-assistants-ia/',
    cover: 'from-secondary-200 via-secondary-100 to-primary-100',
  },
  {
    slug: 'ere-chat-terminee',
    title: "Pourquoi l'ère du « Chat » est terminée",
    subtitle: 'Et pourquoi vous devez passer aux Assistants',
    category: 'Innovation',
    date: 'Mars 2026',
    readTime: '9 min',
    featured: false,
    summary:
      "Le chat conversationnel n'est plus le format dominant de l'IA en formation. Voici les interfaces et workflows qui le remplacent dès 2026.",
    intro:
      "En 2026, l'ère de l'improvisation est terminée. Ceux qui traitent encore l'intelligence artificielle comme une simple interface de chat — où les questions reçoivent des réponses réactives — passent à côté de la vraie révolution d'efficacité. Le passage du « Chat » généraliste aux Assistants personnalisés représente la frontière entre approche amateur et ingénierie augmentée. Comprendre ce qu'est vraiment un Assistant, et pourquoi il devient essentiel, est devenu fondamental.",
    sections: [
      { heading: "Qu'est-ce qu'un Assistant et pourquoi est-ce un « Game Changer » ?" },
      {
        heading: "Gros plan sur la « Dream Team » d'Assistants pour les ingénieurs pédagogiques",
        subheadings: [
          "🏗️ Assistant n°1 : L'Architecte (Le Stratège)",
          '🎨 Assistant n°2 : Le Concepteur (Le Pédagogue)',
          '🎬 Assistant n°3 : Le Producteur (Le Fabricant)',
          "🔍 Assistant n°4 : L'Auditeur (Le Gardien de la Qualité)",
        ],
      },
      { heading: 'Votre nouveau rôle : Chef d\'Orchestre' },
    ],
    quotes: [
      'Un Assistant contient dans ses instructions profondes vos cadres de référence.',
      'La forme est au service du fond : clarté, concision, impact.',
      "L'IP qui réussit en 2026 est celui qui sait s'entourer.",
    ],
    conclusion:
      "Le concepteur pédagogique qui réussit en 2026 réussit par l'orchestration plutôt que par l'effort individuel — en déléguant les tâches spécialisées à des assistants IA configurés, tout en gardant la supervision humaine finale.",
    liveUrl:
      'https://thelearningsociety.fr/pourquoi-lere-du-chat-est-terminee-et-pourquoi-vous-devez-passer-aux-assistants/',
    cover: 'from-primary-200 via-accent-100 to-secondary-100',
  },
  {
    slug: 'qualiopi-sans-charge-mentale',
    title: 'Qualiopi sans la charge mentale',
    subtitle: "Transformer la contrainte administrative en levier de performance grâce à l'IA",
    category: 'Outils',
    date: 'Mars 2026',
    readTime: '8 min',
    featured: false,
    summary:
      "Automatiser la conformité Qualiopi avec l'IA : reporting, traçabilité, indicateurs. La compliance qui ne te bouffe plus tes vendredis soirs.",
    intro:
      "Dans un environnement compétitif où la certification Qualiopi est vitale, une réalité reste largement sous-dite : le processus est vécu comme une lourde charge administrative, chronophage, génératrice de tension mentale critique pour les équipes qualité. Entre suivi documentaire, collecte éparpillée des preuves et anticipation d'audit, le stress est constant. L'émergence d'agents IA personnalisés change la donne.",
    sections: [
      { heading: 'I. Le constat : pourquoi Qualiopi épuise vos équipes' },
      {
        heading: "II. La solution : l'agent IA comme partenaire de conformité",
        subheadings: [
          '1. Centralisation et étiquetage intelligent (la preuve instantanée)',
          "2. Le contrôle continu (l'audit permanent)",
          '3. L\'amélioration continue automatisée (indicateurs 30 à 32)',
        ],
      },
      { heading: 'III. L\'architecture technique : une technologie robuste et sécurisée' },
      { heading: 'Passez de la théorie à la pratique' },
    ],
    quotes: [
      'Le processus est vécu comme une lourde charge administrative, chronophage, génératrice de tension mentale critique.',
      "L'agent identifie et étiquette automatiquement les indicateurs pertinents, garantissant une traçabilité parfaite.",
      "Aucune donnée pédagogique, stratégique ou personnelle n'est utilisée pour entraîner des modèles tiers.",
    ],
    conclusion:
      "L'agent IA Qualiopi transforme la conformité d'un centre de coûts en avantage concurrentiel : en déléguant les tâches administratives répétitives à un assistant numérique, les responsables qualité peuvent se concentrer sur l'excellence pédagogique et la croissance business.",
    liveUrl:
      'https://thelearningsociety.fr/lagent-ia-qualiopi-votre-assistant-numerique-anti-charge-mentale/',
    cover: 'from-accent-200 via-primary-100 to-secondary-100',
  },
  {
    slug: 'fin-des-qcm',
    title: 'La fin des QCM',
    subtitle: "L'IA et l'ère de l'évaluation conversationnelle",
    category: 'Pédagogie',
    date: 'Février 2026',
    readTime: '7 min',
    featured: false,
    summary:
      "Les QCM résistent depuis 60 ans. L'IA générative leur donne le coup de grâce. Voici par quoi les remplacer pour vraiment évaluer la compétence.",
    intro:
      "Les méthodes traditionnelles d'évaluation par QCM ne mesurent plus la compétence réelle. En 2026, évaluer un professionnel en lui faisant cocher A-B-C relève d'une pratique obsolète. L'IA va transformer les examens en dialogue pédagogique continu — pas simplement automatiser des formats existants. Voici comment passer d'une logique de notation à une logique d'évaluation structurée du raisonnement.",
    sections: [
      { heading: 'Le syndrome de la case cochée' },
      { heading: 'De la case à cocher au dialogue socratique' },
      { heading: 'Les 3 piliers de la « Nouvelle Évaluation »' },
      { heading: 'Le « Comment » : bâtir un agent d\'évaluation sans hallucinations' },
      { heading: "L'IA n'est pas un juge, c'est un assistant de diagnostic" },
      { heading: 'La certification comme un voyage, pas une destination' },
    ],
    quotes: [
      "L'IA remplace la question fermée par une relance ouverte. Elle n'attend plus une réponse brute, elle analyse votre cheminement logique.",
      'On ne note plus un résultat, on évalue une structure mentale.',
      "Le formateur ne disparaît pas : il monte en gamme.",
    ],
    conclusion:
      "La certification du futur opère comme une évaluation continue, intégrée — non comme un examen high-stakes ponctuel. Les apprenants se certifient en continu pendant leur parcours, l'évaluation devient compagne de l'apprentissage et non événement culminant stressant.",
    liveUrl:
      'https://thelearningsociety.fr/la-fin-des-qcm-lia-et-lere-de-levaluation-conversationnelle/',
    cover: 'from-primary-200 via-primary-100 to-secondary-100',
  },
  {
    slug: 'ia-et-ingenierie-pedagogique',
    title: 'IA et ingénierie pédagogique',
    subtitle: "Pourquoi l'acculturation théorique ne suffit plus (et comment passer à l'action)",
    category: "Retours d'expérience",
    date: 'Février 2026',
    readTime: '9 min',
    featured: false,
    summary:
      "Refonder l'ingénierie pédagogique à l'ère de l'IA générative. Méthodologie, outillage et gestes professionnels du concepteur augmenté.",
    intro:
      "Scène typique en département formation : les discussions sur la stratégie IA déclenchent des réactions « oscillant entre scepticisme, préoccupations éthiques (privacy, RGPD) et anxiétés tacites sur l'avenir des métiers ». La réponse managériale classique — rassurer les équipes, promettre de longs plans de formation — se retourne souvent contre elle dans le contexte de l'IA générative. Voici une méthodologie alternative : remplacer l'acculturation soft par une mise en pratique immédiate et intensive. Le « Wait and See » n'est plus une option viable.",
    sections: [
      {
        heading: 'I. Le constat : les limites de la « pédagogie de la réassurance »',
        subheadings: [
          '1. Le paradoxe de la protection',
          "2. La déstabilisation de l'expert",
          '3. La paralysie par l\'analyse',
        ],
      },
      { heading: "II. L'approche pédagogique : l'action comme vecteur d'apprentissage" },
      {
        heading: 'III. Mise en œuvre : le dispositif « Atelier de Production Flash »',
        subheadings: [
          '1. Les prérequis : technique et facilitation (J-7)',
          '2. La consigne et la contrainte (H-0)',
          '3. La phase de production (H+0h30 à H+3h00)',
          '4. Le Debriefing : analyse de la pratique',
        ],
      },
    ],
    quotes: [
      "À force de répéter que « l'IA ne remplacera pas l'humain », on ancre l'idée que le risque est réel et imminent.",
      "L'apprentissage par l'expérience est le meilleur remède contre l'anxiété face à la nouveauté.",
      "L'expertise pédagogique est plus nécessaire que jamais pour vérifier, structurer, éditer et « humaniser » le contenu généré.",
    ],
    conclusion:
      "En permettant une immersion rapide, guidée par l'expertise et balisée par des garde-fous, les organisations donnent à leurs équipes les moyens de regagner leur agency professionnelle. La vraie proposition de valeur émerge quand le temps gagné sur la production est redirigé vers la stratégie pédagogique et l'accompagnement humain — c'est le futur de la fonction L&D.",
    liveUrl:
      'https://thelearningsociety.fr/ia-et-ingenierie-pedagogique-pourquoi-lacculturation-theorique-ne-suffit-plus-et-comment-passer-a-laction/',
    cover: 'from-secondary-200 via-accent-100 to-primary-100',
  },
  {
    slug: 'workflow-learning',
    title: 'Workflow Learning',
    subtitle: "Vers une redéfinition de l'unité de temps et de lieu en formation",
    category: 'Innovation',
    date: 'Janvier 2026',
    readTime: '6 min',
    featured: false,
    summary:
      "Apprendre dans le flux du travail : la prochaine frontière du L&D. Comment l'IA rend enfin possible la formation « just-in-time » à grande échelle.",
    intro:
      "Micro-learning, mobile learning, on-demand learning — au-delà du vocabulaire, ces concepts signalent un basculement fondamental dans l'approche de la formation. On quitte le modèle « Just-in-Case » (stocker du savoir au cas où) pour entrer dans le « Just-in-Time » (du savoir mobilisable pour agir maintenant). Le Workflow Learning déplace la formation d'un entrepôt de connaissances vers un processus aligné sur les besoins réels du travail.",
    sections: [
      { heading: 'Du stock au flux : la rupture logistique de la formation' },
      { heading: "L'approche validée par les sciences cognitives" },
      { heading: 'Du « Savoir » au « Savoir-Agir » : l\'avènement du Performance Support' },
      { heading: 'Le risque de la fragmentation : ne pas perdre la « Big Picture »' },
      { heading: "Le Responsable Formation, architecte de l'écosystème" },
    ],
    quotes: [
      "En ne fournissant que les informations nécessaires à l'instant T, le Just-in-Time respecte les capacités de traitement du cerveau.",
      "On n'apprend plus la carte de la ville par cœur (Formation), on utilise un GPS (Performance Support).",
      "Il ne s'agit pas de remplacer la salle de classe, mais d'hybrider intelligemment les dispositifs.",
    ],
    conclusion:
      "Le basculement attendu d'ici 2026 consiste à intégrer la formation formelle de manière fluide dans le travail quotidien, plutôt qu'à l'éliminer. La formation se transforme d'un événement séparé en infrastructure de support invisible — les professionnels L&D doivent désormais architecturer des environnements rendant les ressources accessibles avec un minimum de friction.",
    liveUrl:
      'https://thelearningsociety.fr/workflow-learning-vers-une-redefinition-de-lunite-de-temps-et-de-lieu-en-formation/',
    cover: 'from-accent-200 via-secondary-100 to-primary-100',
  },
  {
    slug: '5-leviers-ia-ld',
    title: "5 leviers d'IA qui transforment stratégiquement les métiers L&D",
    subtitle: "Le panorama 2026 de la transformation du secteur",
    category: 'IA',
    date: 'Janvier 2026',
    readTime: '10 min',
    featured: false,
    summary:
      "Une analyse stratégique des 5 leviers IA qui redessinent le rôle des L&D en 2026 : de la conception au pilotage de l'impact apprenant.",
    intro:
      "L'horizon 2026 marque un tournant décisif pour la formation professionnelle. Le secteur sort de la phase expérimentale avec l'IA, qui devient désormais une infrastructure cognitive fondamentale. Le véritable défi n'est plus technologique mais stratégique : comment maximiser le capital humain quand l'IA gère la transmission du savoir factuel ? Les professionnels RH doivent passer d'une logique de production de contenu (centre de coût) à une orchestration de la valeur (actif stratégique).",
    sections: [
      { heading: 'Les Cinq Mutations Structurelles du L&D' },
      { heading: "L'Ingénierie Pédagogique 4.0 : de l'artisanat à l'architecture du contenu" },
      { heading: "L'Apprentissage Éphémère : intégration dans le flux de travail" },
      { heading: 'Le Management L&D comme Science de la Décision : pilotage par la donnée augmentée' },
      { heading: 'Le Triumvirat Formateur-Apprenant-IA : revalorisation des soft skills' },
      { heading: "La GPEC par Anticipation IA : un levier d'avantage concurrentiel" },
    ],
    quotes: [
      "L'Intelligence Artificielle est désormais le moteur conceptuel de la fonction formation.",
      'Le Formateur devient un Facilitateur de Réflexion Critique.',
      'En 2026, la réussite du L&D se mesurera à sa capacité à articuler ces cinq cadres.',
    ],
    conclusion:
      "La transformation du secteur L&D n'est pas facultative mais inévitable. Les organisations qui réussiront seront celles capables d'intégrer l'IA comme outil tout en restant centrées sur l'humain, assurant ainsi la résilience compétentielle future.",
    liveUrl:
      'https://thelearningsociety.fr/5-leviers-dia-qui-transforment-strategiquement-les-metiers-ld-dici-2026/',
    cover: 'from-primary-200 via-secondary-100 to-accent-100',
  },
];

export const findArticle = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);

export const getRelatedArticles = (slug: string, max = 3): Article[] => {
  const current = findArticle(slug);
  if (!current) return ARTICLES.slice(0, max);
  return ARTICLES.filter((a) => a.slug !== slug && a.category === current.category)
    .concat(ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category))
    .slice(0, max);
};
