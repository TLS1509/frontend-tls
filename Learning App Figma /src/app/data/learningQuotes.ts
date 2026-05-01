// ========================================
// 📚 BASE DE DONNÉES DE CITATIONS INSPIRANTES
// Thème : Apprenance, Formation, Apprentissage Continu
// ========================================

export interface Quote {
  id: number;
  text: string;
  author: string;
  authorTitle: string;
  category: 'apprenance' | 'pedagogie' | 'innovation' | 'neurosciences' | 'philosophie';
  source?: string;
  year?: number;
}

// ========================================
// 🎓 CITATIONS - APPRENANCE & FORMATION
// ========================================

export const learningQuotes: Quote[] = [
  // ========== APPRENANCE ==========
  {
    id: 1,
    text: "L'apprenance est l'attitude d'un individu qui se tient prêt à apprendre en toutes circonstances.",
    author: "Philippe Carré",
    authorTitle: "Chercheur en sciences de l'éducation, Paris Nanterre",
    category: "apprenance",
    year: 2005
  },
  {
    id: 2,
    text: "Apprendre à apprendre est la compétence la plus importante du 21ème siècle.",
    author: "Philippe Carré",
    authorTitle: "Professeur en sciences de l'éducation",
    category: "apprenance",
    year: 2005
  },
  {
    id: 3,
    text: "L'adulte n'apprend que s'il trouve du sens à ce qu'il apprend.",
    author: "Malcolm Knowles",
    authorTitle: "Théoricien de l'andragogie",
    category: "apprenance",
    year: 1980
  },

  // ========== NEUROSCIENCES & APPRENTISSAGE ==========
  {
    id: 4,
    text: "Notre cerveau est plastique : il se transforme à chaque nouvel apprentissage.",
    author: "Stanislas Dehaene",
    authorTitle: "Neuroscientifique, Collège de France",
    category: "neurosciences",
    year: 2018
  },
  {
    id: 5,
    text: "L'erreur est le signal qui indique à notre cerveau qu'il doit ajuster ses prédictions.",
    author: "Stanislas Dehaene",
    authorTitle: "Professeur au Collège de France",
    category: "neurosciences",
    year: 2018
  },
  {
    id: 6,
    text: "L'attention est le mécanisme qui permet de sélectionner l'information et de moduler son traitement.",
    author: "Stanislas Dehaene",
    authorTitle: "Neuroscientifique",
    category: "neurosciences",
    year: 2013
  },
  {
    id: 7,
    text: "La répétition espacée est l'une des stratégies d'apprentissage les plus efficaces.",
    author: "Hermann Ebbinghaus",
    authorTitle: "Psychologue pionnier de l'étude de la mémoire",
    category: "neurosciences",
    year: 1885
  },

  // ========== INGÉNIERIE PÉDAGOGIQUE ==========
  {
    id: 8,
    text: "On retient 10% de ce qu'on lit, 20% de ce qu'on entend, 30% de ce qu'on voit, 50% de ce qu'on voit et entend, 80% de ce qu'on dit, 90% de ce qu'on fait.",
    author: "Edgar Dale",
    authorTitle: "Pédagogue, Concepteur du Cône de l'Expérience",
    category: "pedagogie",
    year: 1946
  },
  {
    id: 9,
    text: "Pour chaque heure de formation, prévoyez trois heures d'application pratique.",
    author: "Robert Pike",
    authorTitle: "Expert en formation d'adultes",
    category: "pedagogie",
    year: 1989
  },
  {
    id: 10,
    text: "L'apprentissage collaboratif permet de construire du sens ensemble.",
    author: "Lev Vygotsky",
    authorTitle: "Psychologue du développement",
    category: "pedagogie",
    year: 1934
  },
  {
    id: 11,
    text: "La zone proximale de développement est l'espace entre ce que l'apprenant peut faire seul et ce qu'il peut faire avec de l'aide.",
    author: "Lev Vygotsky",
    authorTitle: "Psychologue",
    category: "pedagogie",
    year: 1978
  },
  {
    id: 12,
    text: "Un objectif pédagogique doit être observable, mesurable et atteignable.",
    author: "Benjamin Bloom",
    authorTitle: "Psychologue en éducation",
    category: "pedagogie",
    year: 1956
  },

  // ========== INNOVATION PÉDAGOGIQUE ==========
  {
    id: 13,
    text: "Le meilleur apprentissage se fait quand l'apprenant est acteur de sa formation.",
    author: "John Dewey",
    authorTitle: "Philosophe et pédagogue",
    category: "innovation",
    year: 1916
  },
  {
    id: 14,
    text: "L'éducation n'est pas le remplissage d'un vase, mais l'allumage d'un feu.",
    author: "William Butler Yeats",
    authorTitle: "Poète et philosophe",
    category: "philosophie",
    year: 1923
  },
  {
    id: 15,
    text: "On n'apprend pas en écoutant le professeur, mais en résolvant des problèmes.",
    author: "Seymour Papert",
    authorTitle: "Mathématicien et pionnier de l'IA",
    category: "innovation",
    year: 1980
  },
  {
    id: 16,
    text: "Le feedback est le petit-déjeuner des champions de l'apprentissage.",
    author: "Ken Blanchard",
    authorTitle: "Expert en management et formation",
    category: "pedagogie",
    year: 1982
  },
  {
    id: 17,
    text: "L'apprentissage commence là où finit la zone de confort.",
    author: "Carol Dweck",
    authorTitle: "Psychologue, Stanford University",
    category: "apprenance",
    year: 2006
  },
  {
    id: 18,
    text: "L'état d'esprit de croissance transforme l'échec en opportunité d'apprentissage.",
    author: "Carol Dweck",
    authorTitle: "Professeure de psychologie",
    category: "apprenance",
    year: 2006
  },

  // ========== FORMATION CONTINUE ==========
  {
    id: 19,
    text: "L'apprentissage tout au long de la vie n'est pas une option, c'est une nécessité.",
    author: "Peter Drucker",
    authorTitle: "Théoricien du management",
    category: "apprenance",
    year: 1999
  },
  {
    id: 20,
    text: "Dans un monde en changement permanent, les apprenants hériteront de la terre, tandis que les savants resteront équipés pour un monde qui n'existe plus.",
    author: "Eric Hoffer",
    authorTitle: "Philosophe",
    category: "philosophie",
    year: 1973
  },
  {
    id: 21,
    text: "La formation ne s'arrête jamais. C'est un processus continu, pas un événement.",
    author: "Elliott Masie",
    authorTitle: "Expert en e-learning",
    category: "apprenance",
    year: 2005
  },

  // ========== MÉTACOGNITION ==========
  {
    id: 22,
    text: "Apprendre à apprendre est plus important qu'apprendre.",
    author: "Alvin Toffler",
    authorTitle: "Futurologue",
    category: "apprenance",
    year: 1970
  },
  {
    id: 23,
    text: "La métacognition, c'est penser sur sa propre pensée pour mieux apprendre.",
    author: "John Flavell",
    authorTitle: "Psychologue du développement",
    category: "neurosciences",
    year: 1979
  },
  {
    id: 24,
    text: "Celui qui pose une question reste ignorant cinq minutes. Celui qui ne pose pas de question reste ignorant toute sa vie.",
    author: "Proverbe chinois",
    authorTitle: "Sagesse populaire",
    category: "philosophie",
  },

  // ========== DIGITAL LEARNING ==========
  {
    id: 25,
    text: "La technologie ne remplace pas les enseignants, elle les libère pour se concentrer sur l'humain.",
    author: "Salman Khan",
    authorTitle: "Fondateur de Khan Academy",
    category: "innovation",
    year: 2011
  },
  {
    id: 26,
    text: "L'adaptive learning personnalise le parcours d'apprentissage de chaque apprenant.",
    author: "José Ferreira",
    authorTitle: "Expert en EdTech",
    category: "innovation",
    year: 2015
  },
  {
    id: 27,
    text: "Le blended learning combine le meilleur du présentiel et du distanciel.",
    author: "Clayton Christensen",
    authorTitle: "Théoricien de l'innovation",
    category: "innovation",
    year: 2013
  },

  // ========== MOTIVATION & ENGAGEMENT ==========
  {
    id: 28,
    text: "La motivation intrinsèque est le carburant le plus puissant de l'apprentissage.",
    author: "Daniel Pink",
    authorTitle: "Auteur et chercheur en motivation",
    category: "apprenance",
    year: 2009
  },
  {
    id: 29,
    text: "L'autonomie, la maîtrise et le sens sont les trois piliers de la motivation.",
    author: "Daniel Pink",
    authorTitle: "Expert en sciences comportementales",
    category: "apprenance",
    year: 2009
  },
  {
    id: 30,
    text: "Le flow, cet état optimal d'engagement, se produit quand le défi correspond aux compétences.",
    author: "Mihaly Csikszentmihalyi",
    authorTitle: "Psychologue",
    category: "apprenance",
    year: 1990
  },

  // ========== EXPERTS FRANCOPHONES ==========
  {
    id: 31,
    text: "Former, c'est permettre à l'autre de se transformer.",
    author: "André de Peretti",
    authorTitle: "Pédagogue français",
    category: "pedagogie",
    year: 1998
  },
  {
    id: 32,
    text: "L'expérience ne crée pas automatiquement de l'apprentissage. C'est la réflexion sur l'expérience qui crée l'apprentissage.",
    author: "David Kolb",
    authorTitle: "Théoricien de l'apprentissage expérientiel",
    category: "pedagogie",
    year: 1984
  },
  {
    id: 33,
    text: "Le formateur n'est plus celui qui sait, mais celui qui accompagne l'apprenant dans sa découverte.",
    author: "Marcel Lebrun",
    authorTitle: "Expert en pédagogie universitaire",
    category: "innovation",
    year: 2015
  },
  {
    id: 34,
    text: "La classe inversée remet l'apprenant au centre du dispositif pédagogique.",
    author: "Marcel Lebrun",
    authorTitle: "Professeur en technologies de l'éducation",
    category: "innovation",
    year: 2015
  },
  {
    id: 35,
    text: "L'évaluation formative guide l'apprentissage, l'évaluation sommative le sanctionne.",
    author: "Michael Scriven",
    authorTitle: "Philosophe et évaluateur",
    category: "pedagogie",
    year: 1967
  },

  // ========== RETRIEVAL PRACTICE & STRATÉGIES D'APPRENTISSAGE ==========
  {
    id: 36,
    text: "Tester ses connaissances régulièrement est plus efficace que relire pour apprendre.",
    author: "Henry Roediger",
    authorTitle: "Psychologue, Washington University",
    category: "neurosciences",
    year: 2014
  },
  {
    id: 37,
    text: "Espacer les sessions d'apprentissage améliore la rétention à long terme.",
    author: "Robert Bjork",
    authorTitle: "Psychologue, UCLA",
    category: "neurosciences",
    year: 1994
  },
  {
    id: 38,
    text: "Les difficultés désirables renforcent l'apprentissage à long terme.",
    author: "Robert Bjork",
    authorTitle: "Professeur de psychologie, UCLA",
    category: "neurosciences",
    year: 1994
  },

  // ========== AUTO-EFFICACITÉ & MOTIVATION ==========
  {
    id: 39,
    text: "Nos croyances sur nos capacités influencent davantage nos résultats que nos capacités réelles.",
    author: "Albert Bandura",
    authorTitle: "Psychologue, Théorie sociocognitive",
    category: "apprenance",
    year: 1997
  },
  {
    id: 40,
    text: "Le sentiment d'efficacité personnelle détermine nos choix et notre persévérance.",
    author: "Albert Bandura",
    authorTitle: "Professeur de psychologie, Stanford",
    category: "apprenance",
    year: 1997
  },
  {
    id: 41,
    text: "Le grit, cette combinaison de passion et de persévérance, prédit mieux la réussite que le talent.",
    author: "Angela Duckworth",
    authorTitle: "Psychologue, University of Pennsylvania",
    category: "apprenance",
    year: 2016
  },

  // ========== FEEDBACK & VISIBLE LEARNING ==========
  {
    id: 42,
    text: "Le feedback a un effet considérable, l'un des plus puissants leviers d'apprentissage.",
    author: "John Hattie",
    authorTitle: "Chercheur en éducation, Université de Melbourne",
    category: "pedagogie",
    year: 2008
  },
  {
    id: 43,
    text: "Rendre l'apprentissage visible permet aux apprenants de devenir leurs propres enseignants.",
    author: "John Hattie",
    authorTitle: "Professeur en sciences de l'éducation",
    category: "pedagogie",
    year: 2008
  },

  // ========== NEUROSCIENCES APPLIQUÉES ==========
  {
    id: 44,
    text: "L'apprentissage produit des changements dans le cerveau, et ces changements sont mémorisés.",
    author: "Eric Kandel",
    authorTitle: "Neuroscientifique, Prix Nobel de Médecine 2000",
    category: "neurosciences",
    year: 2006
  },
  {
    id: 45,
    text: "L'inhibition cognitive permet de désapprendre les erreurs pour réapprendre correctement.",
    author: "Grégoire Borst",
    authorTitle: "Neuroscientifique, Université Paris Cité",
    category: "neurosciences",
    year: 2018
  },

  // ========== APPRENTISSAGE MULTIMÉDIA ==========
  {
    id: 46,
    text: "Les gens apprennent mieux avec des mots et des images qu'avec des mots seuls.",
    author: "Richard Mayer",
    authorTitle: "Psychologue cognitif, UC Santa Barbara",
    category: "innovation",
    year: 2001
  },

  // ========== DIDACTIQUE PROFESSIONNELLE ==========
  {
    id: 47,
    text: "On n'apprend pas simplement en faisant, mais en réfléchissant sur ce qu'on fait.",
    author: "Pierre Pastré",
    authorTitle: "Didacticien, CNAM",
    category: "pedagogie",
    year: 2011
  },
  {
    id: 48,
    text: "L'analyse de l'activité révèle les compétences cachées qu'il faut expliciter pour enseigner.",
    author: "Pierre Pastré",
    authorTitle: "Spécialiste en didactique professionnelle",
    category: "pedagogie",
    year: 2011
  },

  // ========== CHARGE COGNITIVE ==========
  {
    id: 49,
    text: "L'apprentissage ne se produit que si on alloue des ressources attentionnelles.",
    author: "André Tricot",
    authorTitle: "Psychologue cognitif, Université de Toulouse",
    category: "neurosciences",
    year: 2017
  },
  {
    id: 50,
    text: "L'apprentissage par découverte pure est moins efficace que l'enseignement guidé.",
    author: "Paul Kirschner",
    authorTitle: "Professeur en psychologie de l'éducation",
    category: "pedagogie",
    year: 2015
  },
];

// ========================================
// 🎯 HELPER FUNCTIONS
// ========================================

/**
 * Récupère une citation aléatoire
 */
export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * learningQuotes.length);
  return learningQuotes[randomIndex];
};

/**
 * Récupère une citation par catégorie
 */
export const getQuoteByCategory = (category: Quote['category']): Quote => {
  const filteredQuotes = learningQuotes.filter(q => q.category === category);
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  return filteredQuotes[randomIndex];
};

/**
 * Récupère la citation du jour (basée sur la date)
 */
export const getDailyQuote = (): Quote => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const index = dayOfYear % learningQuotes.length;
  return learningQuotes[index];
};

/**
 * Récupère une citation inspirante (hors neurosciences techniques)
 */
export const getInspirationalQuote = (): Quote => {
  const inspirationalCategories: Quote['category'][] = ['apprenance', 'philosophie', 'innovation'];
  const filteredQuotes = learningQuotes.filter(q => inspirationalCategories.includes(q.category));
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  return filteredQuotes[randomIndex];
};
