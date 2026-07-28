/**
 * Dossiers — contenus de fond, longs et sourcés (≠ articles courts du Blog).
 * Le Dossier est le format « thought leadership » de TLS : chapitré, avec
 * bibliographie. Source de la matière : dossier de recherche SBO (Drive) +
 * bibliographie 80 sources (Deloitte, WEF, MIT Sloan, Workday, Josh Bersin…).
 *
 * RÈGLE HONNÊTETÉ : toute donnée chiffrée est attribuée à sa source (recherche
 * institutionnelle sur la SBO en général). AUCUNE n'est présentée comme un
 * résultat client TLS. Voir docs/_canon/FACTS-CANON.md (C7).
 *
 * Prose volontairement concise à ce stade (structure + données sourcées) ;
 * l'affinage copywriting viendra dans une passe dédiée.
 */

import type { ArticleSection } from './marketingArticles';

export type DossierBodyBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'pullquote'; text: string }
  | { type: 'stat'; value: string; label: string; source: string };

export type DossierSource = {
  ref: string;
  title: string;
  org: string;
  year: string;
  url: string;
};

export type Dossier = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  sourceCount: number;
  featured: boolean;
  summary: string;
  intro: string;
  sections: ArticleSection[];
  body: DossierBodyBlock[];
  /** Points clés / takeaways (optionnel) — affichés en grille avant la bibliographie. */
  keyFindings?: { text: string; source?: string }[];
  sources: DossierSource[];
  /** Tailwind gradient classes for the cover, on-lane (light + warm). */
  cover: string;
};

export const DOSSIERS: Dossier[] = [
  {
    slug: 'organisation-par-les-competences-sbo',
    title: "L'organisation par les compétences",
    subtitle:
      "Pourquoi les entreprises passent du modèle des postes (Job-Based) au modèle des compétences réelles (Skills-Based), et comment amorcer la transition.",
    date: 'Juin 2026',
    readTime: '24 min',
    sourceCount: 18,
    featured: true,
    summary:
      "Un dossier de fond sur la Skills-Based Organization (SBO) : le constat, les preuves issues de la recherche (Deloitte, WEF, MIT Sloan), ce qui change pour l'organisation et les collaborateurs, et le rôle pivot du passeport de compétences.",
    intro:
      "La compétence est en train de remplacer le poste comme unité de base de l'organisation du travail. Ce dossier fait le point sur ce que recouvre réellement le modèle « Skills-Based Organization » (SBO), sur les données qui le documentent, et sur les conditions concrètes d'une transition, sans hype, en citant les sources.",
    sections: [
      { heading: "Du poste à la compétence : de quoi parle-t-on ?" },
      { heading: 'Pourquoi maintenant ?' },
      { heading: "Ce que la recherche documente" },
      { heading: "Ce qui change pour les collaborateurs" },
      { heading: 'Le passeport de compétences, pièce centrale' },
      { heading: "Amorcer : apprendre, faire, replacer" },
      { heading: 'Limites et conditions de réussite' },
    ],
    body: [
      { type: 'h2', text: "Du poste à la compétence : de quoi parle-t-on ?" },
      {
        type: 'p',
        text: "Une organisation « Skills-Based » fonde ses décisions de gestion des talents sur les compétences réelles des personnes, et non sur les postes occupés, les diplômes ou l'ancienneté. Le poste cesse d'être l'unité de référence ; il est décomposé en projets, missions et tâches, auxquels on alloue des compétences.",
      },
      {
        type: 'p',
        text: "Ce déplacement a une généalogie : il prolonge des travaux anciens sur la compétence au travail (Guy Le Boterf en France, David McClelland aux États-Unis) et la formalisation des niveaux de maîtrise par le modèle de Dreyfus. La nouveauté, en 2026, est l'industrialisation rendue possible par les données et l'IA.",
      },
      {
        type: 'pullquote',
        text: "Le poste décrit ce qu'une personne occupe. La compétence décrit ce qu'elle sait faire. Seule la seconde se déploie d'un projet à l'autre.",
      },
      { type: 'h2', text: 'Pourquoi maintenant ?' },
      {
        type: 'p',
        text: "Deux forces convergent. D'abord l'obsolescence accélérée des compétences : le World Economic Forum estime, dans son Future of Jobs Report 2025, qu'une part majeure des actifs devra se requalifier d'ici la fin de la décennie. Ensuite l'IA, qui rebat les cartes des tâches automatisables et fait de la « maîtrise des compétences » un sujet d'infrastructure, plus seulement de RH.",
      },
      {
        type: 'stat',
        value: '≈ 60 %',
        label: "des actifs auront besoin d'une requalification d'ici 2027",
        source: 'WEF · Future of Jobs Report 2025',
      },
      { type: 'h2', text: 'Ce que la recherche documente' },
      {
        type: 'p',
        text: "Les bénéfices avancés pour les organisations qui adoptent une approche par les compétences sont documentés par plusieurs travaux (Deloitte, MIT Sloan Management Review). Ils portent sur l'agilité d'allocation, l'innovation et la capacité d'anticipation. Ces chiffres décrivent la SBO en général : ce ne sont pas des résultats The Learning Society.",
      },
      {
        type: 'stat',
        value: '+52 %',
        label: "de probabilité d'innover",
        source: 'Deloitte · The Skills-Based Organization',
      },
      {
        type: 'stat',
        value: '+57 %',
        label: "de capacité à anticiper le changement",
        source: 'Deloitte · The Skills-Based Organization',
      },
      {
        type: 'p',
        text: "Du côté de la mobilité interne, les approches skills-first sont associées à une meilleure allocation des personnes aux missions et à une rétention accrue des profils clés. La littérature professionnelle (Josh Bersin, Workday, LinkedIn Learning) converge sur ce point, tout en soulignant que les gains dépendent fortement de la qualité de la donnée compétences.",
      },
      { type: 'h2', text: 'Ce qui change pour les collaborateurs' },
      {
        type: 'p',
        text: "Pour les personnes, le modèle promet une reconnaissance fondée sur l'impact réel plutôt que sur la position hiérarchique, des trajectoires plus lisibles (mobilité horizontale et diagonale) et une employabilité rendue visible. Le véhicule de cette visibilité est le passeport de compétences.",
      },
      {
        type: 'ul',
        items: [
          "Reconnaissance par la preuve : la compétence est validée sur un livrable réel, pas auto-déclarée.",
          "Mobilité : un profil « prouvé » peut être proposé à tout projet qui requiert cette compétence.",
          "Portabilité : le passeport suit la personne (en France, un passeport de compétences officiel existe via la Caisse des Dépôts).",
        ],
      },
      { type: 'h2', text: 'Le passeport de compétences, pièce centrale' },
      {
        type: 'p',
        text: "Le passeport est la couche de données qui rend le modèle opérant : une cartographie vivante, par personne et par équipe, des compétences et de leur niveau de maîtrise (échelle de Dreyfus, du novice au maître). Il s'enrichit automatiquement au fil des formations, des projets et des validations, ce qui en fait, avec le temps, un actif stratégique difficile à reconstituer.",
      },
      {
        type: 'pullquote',
        text: "Plus une organisation alimente sa cartographie de compétences, plus celle-ci devient précieuse, et coûteuse à abandonner.",
      },
      { type: 'h2', text: 'Amorcer : apprendre, faire, replacer' },
      {
        type: 'p',
        text: "La transition ne se décrète pas. Elle s'amorce par une boucle simple : on apprend (Learn), on applique sur un projet réel qui sert l'entreprise (Do), et la preuve ainsi produite permet de replacer la bonne personne sur le bon projet ensuite (Match). C'est la séquence que The Learning Society opérationnalise : la formation cesse d'être un événement isolé pour devenir un flux continu, mesurable.",
      },
      { type: 'h2', text: 'Limites et conditions de réussite' },
      {
        type: 'p',
        text: "La recherche est lucide sur les obstacles (Josh Bersin parle d'une « réalité enthousiasmante mais sobre ») : qualité et gouvernance de la donnée compétences, conduite du changement managérial, risque de bureaucratiser la compétence. Le modèle crée de la valeur quand il reste au service des personnes : l'IA pour augmenter l'expertise humaine, pas pour la remplacer.",
      },
    ],
    sources: [
      { ref: 'R01', title: 'The Skills-Based Organization', org: 'Deloitte Insights', year: '2025', url: 'https://www.deloitte.com/us/en/insights/topics/talent/organizational-skill-based-hiring.html' },
      { ref: 'A01', title: 'Unlocking the Potential of a Skills-Based Organization', org: 'MIT Sloan Management Review', year: '2023', url: 'https://sloanreview.mit.edu/sponsors-content/unlocking-the-potential-of-a-skills-based-organization/' },
      { ref: 'A02', title: 'The Why, What, and How of Skills-Based Talent Practices', org: 'MIT Sloan Management Review', year: '2023', url: 'https://sloanreview.mit.edu/article/the-why-what-and-how-of-skills-based-talent-practices/' },
      { ref: 'R03', title: 'Future of Jobs Report 2025', org: 'World Economic Forum', year: '2025', url: 'https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf' },
      { ref: 'R04', title: 'Workplace Learning Report 2025', org: 'LinkedIn Learning', year: '2025', url: 'https://learnexperts.ai/blog/linkedin-workplace-learning-report/' },
      { ref: 'R06', title: 'Global State of Skills 2025', org: 'Workday', year: '2025', url: 'https://www.enterprisetimes.co.uk/2025/03/05/organisations-are-solving-the-talent-gap-with-a-skills-based-approach/' },
      { ref: 'P03', title: "It's Time to Build Skills-Based Organizations", org: 'Josh Bersin', year: '2022', url: 'https://joshbersin.com/2022/10/its-time-to-build-skills-based-organizations/' },
      { ref: 'P01', title: 'Building a Skills-Based Organization: The Sober Reality', org: 'Josh Bersin', year: '2023', url: 'https://joshbersin.com/2023/07/building-a-skills-based-organization-the-exciting-but-sober-reality/' },
      { ref: 'L02', title: 'The Skills-Based Organization (Wiley)', org: 'Volini & Griffiths', year: '2023', url: 'https://www.amazon.fr/Skills-Based-Organization-Reimagining-Workforce-Management/dp/1394174985' },
      { ref: 'L03', title: 'Work Without Jobs (MIT Press)', org: 'Jesuthasan & Boudreau', year: '2022', url: 'https://www.amazon.fr/Work-Without-Jobs-Reinvent-Organization/dp/0262047152' },
      { ref: 'L04', title: 'La compétence au travail', org: 'Guy Le Boterf', year: '2018', url: 'https://www.amazon.fr/Comp%C3%A9tence-travail-Guy-Le-Boterf/dp/2416008104' },
      { ref: 'A04', title: 'The Five-Stage Model of Adult Skill Acquisition', org: 'Stuart E. Dreyfus', year: '2004', url: 'https://www.kaizenko.com/the-dreyfus-model-of-skills-acquisition/' },
      { ref: 'A06', title: 'Testing for Competence Rather Than Intelligence', org: 'David McClelland', year: '1973', url: 'https://doi.org/10.1037/h0034092' },
      { ref: 'F01', title: 'Passeport de Compétences : Espace public', org: 'Caisse des Dépôts', year: '2023+', url: 'https://competences.moncompteformation.gouv.fr/espace-public/' },
      { ref: 'F02', title: 'Passeport de Compétences : Guide officiel 2025', org: 'Ministère du Travail', year: '2025', url: 'https://travail-emploi.gouv.fr/sites/travail-emploi/files/2025-01/Passeport%20competences-2025.pdf' },
      { ref: 'C01', title: 'Unilever : Flex Experiences (talent marketplace)', org: 'Diginomica', year: '2024', url: 'https://diginomica.com/workday-rising-emea-rolls-royce-linkedin-unilever-skills-based-organization' },
      { ref: 'C04', title: 'Schneider Electric : Open Talent Market', org: 'CIO Online', year: '2024', url: 'https://www.cio-online.com/actualites/lire-schneider-electric-branche-une-plateforme-d-ia-sur-son-suivi-d-evolution-de-carriere' },
      { ref: 'R12', title: 'Future of Jobs 2025 : Digest', org: 'World Economic Forum', year: '2025', url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/' },
    ],
    keyFindings: [
      {
        text: "Le poste cède la place à la compétence comme unité d'allocation du travail : on raisonne en projets et missions, plus en fiches de poste.",
        source: 'Deloitte · MIT Sloan',
      },
      {
        text: "Les organisations skills-based sont nettement plus susceptibles d'innover (+52 %) et d'anticiper le changement (+57 %).",
        source: 'Deloitte',
      },
      {
        text: "Le passeport de compétences est le pivot : il s'enrichit au fil des projets et devient un actif difficile à reconstituer.",
        source: 'Analyse TLS',
      },
      {
        text: "La réussite tient moins à l'outil qu'à la qualité de la donnée compétences et à la conduite du changement managérial.",
        source: 'Josh Bersin',
      },
    ],
    cover: 'from-secondary-100 via-accent-50 to-primary-100',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Les agents IA en formation
  // Source : Drive « Dossiers de veille », version fact-checkée juillet 2026.
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'agents-ia-en-formation',
    title: 'Les agents IA en formation',
    subtitle:
      "Au-delà du chatbot : des systèmes qui raisonnent, utilisent des outils et enchaînent des actions. Ce qu'ils savent faire, ce qu'ils ne savent pas encore, et comment les encadrer.",
    date: 'Juillet 2026',
    readTime: '9 min',
    sourceCount: 4,
    featured: false,
    summary:
      "Un agent IA perçoit une demande, planifie des étapes, agit via des outils et observe le résultat. La promesse est réelle, la fiabilité en production ne l'est pas encore : ce dossier sépare ce qui fonctionne aujourd'hui de ce que le discours marketing survend.",
    intro:
      "Un agent IA ne se contente pas de répondre : il perçoit une demande, planifie des étapes, agit via des outils (recherche, calcul, envoi), observe le résultat et recommence. C'est une promesse réelle, à condition de ne pas confondre la démo et la fiabilité de production.",
    sections: [
      { heading: "Anatomie d'un agent" },
      { heading: 'Cas d’usage réalistes en formation' },
      { heading: "L'autonomie, sans l'hype" },
      { heading: 'Garde-fous' },
    ],
    body: [
      { type: 'h2', text: "Anatomie d'un agent" },
      {
        type: 'p',
        text: "Un agent combine un modèle de langage (le « cerveau »), des outils qu'il peut appeler (API, recherche, base de connaissances), une mémoire (le contexte de la tâche) et une boucle raisonner → agir → observer. Deux travaux fondent cette mécanique : ReAct, qui montre qu'entrelacer raisonnement et action améliore la résolution de tâches (Yao et al., 2023), et Toolformer, qui apprend à un modèle quand et comment appeler un outil (Schick et al., 2023).",
      },
      {
        type: 'p',
        text: "La différence avec un chatbot tient en un mot : l'action. Un chatbot répond — un tour de question-réponse, sans effet sur le monde et sans plan à étapes. Un agent enchaîne des étapes vers un but, appelle des outils, observe et ajuste selon les résultats.",
      },
      { type: 'h2', text: 'Cas d’usage réalistes en formation' },
      {
        type: 'ul',
        items: [
          "Assistant administratif — préparer convocations, relances et synthèses de suivi, que le formateur valide.",
          "Tuteur augmenté — répondre aux questions des apprenants en s'appuyant sur le corpus du cours, avec renvoi à l'humain sur les cas difficiles.",
          'Veille et curation — rechercher, trier et résumer des ressources sur un sujet donné.',
          "Aide à la production — générer un premier jet (quiz, cas, plan) que le concepteur reprend.",
        ],
      },
      {
        type: 'pullquote',
        text: "L'agent dégrossit, l'humain décide. C'est ce partage qui rend la valeur réelle et évite les déboires.",
      },
      { type: 'h2', text: "L'autonomie, sans l'hype" },
      {
        type: 'p',
        text: "Le discours à tempérer est celui d'agents autonomes qui raisonneraient, planifieraient et exécuteraient des tâches complexes de bout en bout sans intervention humaine. La réalité mesurée est plus modeste : les agents actuels restent fragiles sur les tâches longues. Ils accumulent les erreurs au fil des étapes, peinent à se corriger seuls et hallucinent (Wang et al., 2024 ; Kasneci et al., 2023).",
      },
      {
        type: 'p',
        text: "Ils brillent en assistants supervisés, pas en pilotes automatiques. La règle qui en découle est simple : plus la tâche est longue et à enjeu, plus le contrôle humain doit être présent.",
      },
      { type: 'h2', text: 'Garde-fous' },
      {
        type: 'ul',
        items: [
          "Vérification — un agent qui agit peut agir faux : valider les sorties et les actions sensibles.",
          "Données et sécurité — un agent qui accède à des outils accède à des données : périmètre, permissions, RGPD.",
          'Coûts — chaque étape appelle le modèle ; une boucle mal bornée coûte cher, prévoir des limites.',
          "Dépendance — garder la compétence humaine : un agent tombe en panne, change ou dérive.",
        ],
      },
      {
        type: 'p',
        text: "Cinq réflexes pour démarrer : commencer petit sur une tâche bornée et supervisée, garder l'humain dans la boucle sur les décisions, borner les actions, les accès et les coûts, vérifier systématiquement les sorties, et mesurer la valeur réelle avant de généraliser.",
      },
    ],
    keyFindings: [
      {
        text: "Un agent se distingue d'un chatbot par l'action : il enchaîne des étapes vers un but, appelle des outils et observe le résultat.",
        source: 'Yao et al. · Schick et al.',
      },
      {
        text: "Les agents restent fragiles sur les tâches longues : accumulation d'erreurs, auto-correction difficile, hallucinations.",
        source: 'Wang et al. 2024',
      },
      {
        text: "La valeur réelle vient du partage des rôles : l'agent dégrossit, l'humain décide.",
        source: 'Analyse TLS',
      },
      {
        text: "Plus la tâche est longue et à enjeu, plus le contrôle humain doit être présent.",
        source: 'Kasneci et al. 2023',
      },
    ],
    sources: [
      { ref: 'A01', title: 'ReAct: Synergizing Reasoning and Acting in Language Models', org: 'Yao, S. et al. · ICLR', year: '2023', url: 'https://arxiv.org/abs/2210.03629' },
      { ref: 'A02', title: 'Toolformer: Language Models Can Teach Themselves to Use Tools', org: 'Schick, T. et al. · NeurIPS', year: '2023', url: 'https://arxiv.org/abs/2302.04761' },
      { ref: 'A03', title: 'A Survey on Large Language Model based Autonomous Agents', org: 'Wang, L. et al. · Frontiers of Computer Science', year: '2024', url: 'https://arxiv.org/abs/2308.11432' },
      { ref: 'A04', title: 'ChatGPT for good? On opportunities and challenges of large language models for education', org: 'Kasneci, E. et al. · Learning and Individual Differences', year: '2023', url: 'https://doi.org/10.1016/j.lindif.2023.102274' },
    ],
    cover: 'from-primary-100 via-primary-50 to-accent-50',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. L'IA générative, alliée des formateurs créateurs
  // Source : Drive « Dossiers de veille », version fact-checkée juillet 2026.
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'ia-generative-formateurs-createurs',
    title: "L'IA générative, alliée des formateurs créateurs",
    subtitle:
      "Produire slides, visuels, vidéos, voix et flashcards en une fraction du temps, sans relayer de mythe et en sachant qui possède ce qu'on génère.",
    date: 'Juillet 2026',
    readTime: '10 min',
    sourceCount: 7,
    featured: false,
    summary:
      "Panorama honnête des outils de production par média, démontage du mythe des « 60 000 fois » et point de droit d'auteur adossé aux textes réels (CPI, CJUE, US Copyright Office) : ce que vous avez le droit d'utiliser, et ce qui vous appartient.",
    intro:
      "En quelques mois, l'IA générative a mis à portée de tout formateur ce qui demandait hier un studio : un support illustré, une vidéo avec avatar, une voix off, une série de flashcards. Le gain de temps est réel, à condition de ne pas confondre vite et juste, et de savoir ce qu'on a le droit d'utiliser.",
    sections: [
      { heading: "Ce que l'IA sait produire" },
      { heading: 'Le mythe à ne pas relayer' },
      { heading: "À qui appartient ce que l'IA génère ?" },
      { heading: 'Garde-fous' },
    ],
    body: [
      { type: 'h2', text: "Ce que l'IA sait produire" },
      {
        type: 'p',
        text: "Le panorama par type de média est aujourd'hui bien couvert. Texte et slides : ChatGPT et Claude pour les plans, supports et storyboards, Gamma et Tome pour la mise en forme. Image : Midjourney et DALL·E pour les illustrations et schémas. Vidéo et avatar : Synthesia et HeyGen pour les modules parlés et tutoriels. Voix : ElevenLabs pour la narration. Montage : Descript pour l'édition « par le texte ».",
      },
      {
        type: 'pullquote',
        text: "Ces outils accélèrent la production, ils ne garantissent pas la justesse. Tout ce qui sort passe par une relecture pédagogique et factuelle avant d'arriver devant des apprenants.",
      },
      { type: 'h2', text: 'Le mythe à ne pas relayer' },
      {
        type: 'p',
        text: "L'idée reçue est tenace : « le cerveau traite les images 60 000 fois plus vite que le texte », attribuée à une étude de l'université du Minnesota. Ce chiffre est apocryphe. Il provient d'une brochure promotionnelle de 3M datée de 1997, sans aucune source, et l'auteur de l'« étude Minnesota » régulièrement citée a confirmé que son travail ne portait pas sur la vitesse de traitement visuel.",
      },
      {
        type: 'p',
        text: "Ce qui est vrai, en revanche : associer des mots et des images pertinentes aide réellement à apprendre. C'est le double codage décrit par Paivio et le principe multimédia formalisé par Mayer. On soigne ses visuels pour cette raison-là, pas pour un ratio inventé.",
      },
      { type: 'h2', text: "À qui appartient ce que l'IA génère ?" },
      {
        type: 'p',
        text: "La règle de fond est que le droit d'auteur protège une création humaine. En droit français, une œuvre n'est protégée que si elle porte l'empreinte de la personnalité de son auteur (CPI, art. L.111-1), un critère d'originalité que la Cour de justice de l'Union européenne formule comme une « création intellectuelle propre à son auteur » (arrêt Infopaq, 2009). Aux États-Unis, l'US Copyright Office a tranché en mars 2023 : seul le fruit d'une créativité humaine est enregistrable, un contenu purement généré par IA à partir d'un prompt ne l'est pas.",
      },
      {
        type: 'p',
        text: "Le cas Zarya of the Dawn, une bande dessinée illustrée avec Midjourney, l'illustre concrètement : le texte et l'agencement, humains, sont protégés ; les images générées ne le sont pas. En pratique, votre apport — scénarisation, sélection, montage, adaptation — vous appartient, tandis que les éléments bruts sortis de l'IA ont un statut fragile. Vérifiez aussi les conditions d'utilisation de chaque outil, qui varient, et n'y déposez rien de confidentiel.",
      },
      { type: 'h2', text: 'Garde-fous' },
      {
        type: 'ul',
        items: [
          "Vérifier — l'IA hallucine : contrôler faits, chiffres et sources avant diffusion.",
          'Données — pas de données personnelles ou sensibles dans un outil grand public (RGPD).',
          "Droits — vérifier les licences des outils et le statut des contenus produits, créditer quand c'est dû.",
          "Accessibilité — sous-titres, contraste, alternatives textuelles : l'IA facilite, elle n'exonère pas.",
        ],
      },
    ],
    keyFindings: [
      {
        text: "Le « 60 000 fois plus vite » est apocryphe : il vient d'une brochure 3M de 1997, sans source.",
        source: 'Quinn · Levine',
      },
      {
        text: "Ce qui marche vraiment : associer mots et images pertinentes (double codage, principe multimédia).",
        source: 'Paivio · Mayer',
      },
      {
        text: "Le droit d'auteur protège la création humaine : votre apport vous appartient, la sortie brute de l'IA a un statut fragile.",
        source: 'CPI · CJUE · US Copyright Office',
      },
      {
        text: "Les outils accélèrent la production, jamais la justesse : la relecture pédagogique reste obligatoire.",
        source: 'Analyse TLS',
      },
    ],
    sources: [
      { ref: 'M01', title: 'Images processed 60K faster? No! (démontage du « 60 000× »)', org: 'Quinn, C. · Learnlets', year: '2020', url: 'https://blog.learnlets.com/2020/01/images-processed-60k-faster/' },
      { ref: 'M02', title: 'The 60,000 Times Question Remains Unanswered', org: 'Levine, A. (CogDog)', year: '2012', url: 'https://cogdogblog.com/2012/07/60000-times-question/' },
      { ref: 'A01', title: 'Multimedia Learning (2e éd.)', org: 'Mayer, R. E. · Cambridge University Press', year: '2009', url: 'https://doi.org/10.1017/CBO9780511811678' },
      { ref: 'L01', title: 'Mental Representations: A Dual Coding Approach', org: 'Paivio, A. · Oxford University Press', year: '1986', url: 'https://global.oup.com/academic/product/mental-representations-9780195066661' },
      { ref: 'D01', title: 'Code de la propriété intellectuelle, art. L.111-1', org: 'Légifrance', year: '—', url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006278868' },
      { ref: 'D02', title: 'Infopaq International, C-5/08 — « création intellectuelle propre à son auteur »', org: 'CJUE', year: '2009', url: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:62008CJ0005' },
      { ref: 'D03', title: 'Copyright Registration Guidance: Works Containing Material Generated by AI', org: 'U.S. Copyright Office', year: '2023', url: 'https://www.federalregister.gov/documents/2023/03/16/2023-05321/copyright-registration-guidance-works-containing-material-generated-by-artificial-intelligence' },
    ],
    cover: 'from-secondary-100 via-secondary-50 to-accent-50',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Personnalisation avancée & risque de standardisation
  // Source : Drive « Dossiers de veille », version fact-checkée juillet 2026.
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'personnalisation-avancee-standardisation',
    title: 'Personnalisation avancée & risque de standardisation',
    subtitle:
      "L'IA promet à chacun son parcours. Mais trop bien personnaliser peut, paradoxalement, uniformiser et enfermer. Ce que la recherche dit des promesses et des risques.",
    date: 'Juillet 2026',
    readTime: '10 min',
    sourceCount: 6,
    featured: false,
    summary:
      "Personnaliser aide, à condition de le faire sur les acquis et non sur un « style d'apprentissage ». Ce dossier documente le paradoxe d'une personnalisation de masse qui produit de l'uniforme, et les trois vigilances à tenir : biais, qualité des données, transparence.",
    intro:
      "Depuis Bloom, un rêve traverse la pédagogie : offrir à chaque apprenant l'équivalent d'un précepteur. L'IA rend ce rêve techniquement possible à grande échelle. Reste une question inconfortable : une personnalisation pilotée par algorithme libère-t-elle l'apprenant, ou le range-t-elle dans une case ?",
    sections: [
      { heading: 'La promesse, réelle mais mesurée' },
      { heading: 'Le paradoxe de la standardisation' },
      { heading: 'Les risques réels' },
      { heading: 'Le principe : augmenter, pas remplacer' },
    ],
    body: [
      { type: 'h2', text: 'La promesse, réelle mais mesurée' },
      {
        type: 'p',
        text: "L'intuition fondatrice est le « problème des deux sigmas » de Bloom : le suivi individuel rapproche l'apprenant de sa pleine réussite (Bloom, 1984). Les systèmes adaptatifs s'en approchent sérieusement, sans le pulvériser — les effets mesurés des tuteurs intelligents sont modérés à forts. Le point clé : personnaliser utilement, c'est ajuster à ce que l'apprenant maîtrise, pas à une étiquette.",
      },
      {
        type: 'p',
        text: "L'idée reçue à écarter est celle des « styles d'apprentissage » : trier les apprenants par style — visuel, auditif — et leur servir « leur » format n'améliore pas l'apprentissage (Pashler et al., 2008). Les gens diffèrent, oui, mais par leur niveau de préparation, leurs acquis et leurs objectifs, pas par un canal sensoriel préféré. C'est là-dessus qu'une IA doit adapter.",
      },
      { type: 'h2', text: 'Le paradoxe de la standardisation' },
      {
        type: 'p',
        text: "Quand des milliers de parcours sont générés par le même moteur, avec les mêmes règles et les mêmes contenus sources, la variété de surface cache une homogénéité de fond : tout le monde reçoit des variantes du même moule. La « personnalisation » devient une industrialisation, l'inverse de son intention.",
      },
      {
        type: 'pullquote',
        text: "Apprendre, c'est aussi rencontrer ce qu'on n'aurait pas choisi.",
      },
      {
        type: 'p',
        text: "À cela s'ajoute l'effet tunnel : à toujours proposer à l'apprenant ce que l'algorithme juge optimal pour lui, on appauvrit son exposition. C'est l'analogue pédagogique de la bulle de filtres décrite par Eli Pariser. Différencier vraiment suppose de laisser de la place à l'inattendu, à l'humain, au hors-piste.",
      },
      { type: 'h2', text: 'Les risques réels' },
      {
        type: 'ul',
        items: [
          "Biais algorithmiques — un modèle reproduit, et parfois amplifie, les biais de ses données. La revue de Baker & Hawn (2022) documente des écarts de performance des algorithmes selon les groupes d'apprenants.",
          "« Garbage in, garbage out » — un système d'adaptation ne vaut que ses données : des traces incomplètes ou biaisées produisent des décisions injustes.",
          "Données et transparence — les traces d'apprentissage sont sensibles : finalité claire, conformité RGPD, et un apprenant informé qui peut contester.",
        ],
      },
      { type: 'h2', text: 'Le principe : augmenter, pas remplacer' },
      {
        type: 'p',
        text: "La bonne posture n'est pas « l'IA décide » mais « l'IA propose, l'humain arbitre ». L'algorithme exécute — diagnostic, adaptation, feedback à l'échelle — et le formateur garde le jugement, en veillant à ce que la personnalisation n'enferme pas. Une diversité délibérée, qui expose à d'autres angles, d'autres formats, d'autres pairs, est le meilleur antidote à la standardisation masquée.",
      },
    ],
    keyFindings: [
      {
        text: "Adapter sur les acquis et le niveau de préparation, jamais sur un « style d'apprentissage » : la recherche a réfuté ce tri.",
        source: 'Pashler et al. 2008',
      },
      {
        text: "Une personnalisation de masse générée par un moteur unique produit de l'uniformité déguisée en variété.",
        source: 'Analyse TLS',
      },
      {
        text: "Les algorithmes éducatifs présentent des écarts de performance documentés selon les groupes d'apprenants.",
        source: 'Baker & Hawn 2022',
      },
      {
        text: "L'antidote à l'effet tunnel est une diversité délibérée : exposer à d'autres angles, formats et pairs.",
        source: 'Pariser',
      },
    ],
    sources: [
      { ref: 'A01', title: 'The 2 Sigma Problem', org: 'Bloom, B. S. · Educational Researcher', year: '1984', url: 'https://doi.org/10.3102/0013189X013006004' },
      { ref: 'M01', title: 'Learning Styles: Concepts and Evidence', org: 'Pashler, H. et al. · Psychological Science in the Public Interest', year: '2008', url: 'https://journals.sagepub.com/doi/10.1111/j.1539-6053.2009.01038.x' },
      { ref: 'A02', title: 'Algorithmic Bias in Education', org: 'Baker, R. S. & Hawn, A. · IJAIED', year: '2022', url: 'https://link.springer.com/article/10.1007/s40593-021-00285-9' },
      { ref: 'L01', title: 'The Filter Bubble', org: 'Pariser, E. · Penguin Press', year: '2011', url: 'https://www.ted.com/talks/eli_pariser_beware_online_filter_bubbles' },
      { ref: 'P01', title: 'Amazon scraps secret AI recruiting tool that showed bias against women', org: 'Reuters', year: '2018', url: 'https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G' },
      { ref: 'D01', title: 'Intelligence artificielle : les recommandations', org: 'CNIL', year: '2025', url: 'https://www.cnil.fr/fr/intelligence-artificielle' },
    ],
    cover: 'from-accent-100 via-secondary-50 to-primary-100',
  },
];

export const findDossier = (slug: string): Dossier | undefined =>
  DOSSIERS.find((d) => d.slug === slug);
