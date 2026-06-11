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
];

export const findDossier = (slug: string): Dossier | undefined =>
  DOSSIERS.find((d) => d.slug === slug);
