export interface JournalEntry {
  id: number;
  type: string;
  templateType: 'guided' | 'free' | 'learning' | 'coaching' | 'insight';
  title: string;
  date: string;
  description: string;
  excerpt: string;
  content: string; // Full content
  hasResponses: boolean;
  mood?: 'excited' | 'happy' | 'calm' | 'thoughtful';
  wordCount: number;
  tags: string[];
  questions?: { question: string; answer: string }[]; // For guided entries
}

export const journalEntries: JournalEntry[] = [
  {
    id: 1,
    type: 'reflection',
    templateType: 'guided',
    title: 'La méthode simple pour bien prompter',
    date: '20/12/2025 à 11:30',
    description: 'Vous avez répondu aux questions de réflexion de cette leçon.',
    excerpt: 'J\'ai découvert l\'importance de structurer mes prompts en contexte, tâche et format...',
    content: `Cette leçon m'a ouvert les yeux sur l'importance de la structure dans mes prompts. Avant, je formulais mes demandes de manière intuitive, sans vraiment réfléchir à l'architecture de mes requêtes.

Maintenant, je comprends qu'un bon prompt suit une structure claire : contexte, tâche précise, et format attendu. Cette méthodologie change complètement la qualité des réponses que j'obtiens de l'IA.

Ce qui m'a le plus marqué, c'est la différence de qualité entre un prompt vague et un prompt structuré. Les exemples concrets donnés dans la leçon m'ont permis de voir immédiatement l'impact.

Je vais appliquer cette méthode dans mes prochaines formations et la transmettre à mes apprenants. C'est un game-changer pour quiconque utilise l'IA dans sa pratique professionnelle.`,
    hasResponses: true,
    wordCount: 245,
    tags: ['Prompts', 'IA Générative', 'Pédagogie'],
    questions: [
      {
        question: 'Qu\'avez-vous appris de plus important dans cette leçon ?',
        answer: 'L\'importance de structurer mes prompts en trois parties : contexte, tâche, et format. Cette structure simple mais puissante améliore considérablement la qualité des réponses.',
      },
      {
        question: 'Comment allez-vous appliquer cela dans votre pratique ?',
        answer: 'Je vais créer des templates de prompts pour mes cas d\'usage récurrents et enseigner cette méthodologie à mes apprenants dès les premières sessions.',
      },
      {
        question: 'Quelle difficulté anticipez-vous ?',
        answer: 'La difficulté sera de prendre le temps de bien formuler au lieu de se précipiter. Il faudra développer ce réflexe de structuration.',
      },
    ],
  },
  {
    id: 2,
    type: 'reflection',
    templateType: 'guided',
    title: 'Enjeux de la maîtrise du prompt',
    date: '01/11/2025 à 19:07',
    description: 'Vous avez répondu aux questions de réflexion de cette leçon.',
    excerpt: 'La qualité des prompts détermine directement la pertinence des réponses de l\'IA...',
    content: `Cette leçon m'a fait prendre conscience que la qualité des prompts n'est pas qu'une question technique, mais un véritable enjeu professionnel.

Dans mon métier de formateur, la capacité à bien prompter devient une compétence clé. C'est la différence entre un outil utile et un véritable assistant pédagogique.

Les enjeux sont multiples : gain de temps, pertinence des contenus générés, mais aussi éthique et transparence vis-à-vis des apprenants. Je dois être capable d'expliquer comment j'utilise l'IA.

Cette réflexion m'amène à repenser ma relation avec l'IA : non pas comme un simple outil, mais comme un partenaire de travail qu'il faut savoir diriger efficacement.`,
    hasResponses: true,
    wordCount: 189,
    tags: ['Prompts', 'Réflexion'],
    questions: [
      {
        question: 'Quels sont les principaux enjeux identifiés ?',
        answer: 'Efficacité professionnelle, qualité des contenus, dimension éthique, et transmission de cette compétence aux apprenants.',
      },
      {
        question: 'Comment cela change votre vision de l\'IA ?',
        answer: 'Je passe d\'une vision "outil" à une vision "partenaire de travail" qu\'il faut savoir diriger avec précision.',
      },
    ],
  },
  {
    id: 3,
    type: 'free',
    templateType: 'free',
    title: 'Mes réflexions sur l\'usage éthique de l\'IA',
    date: '28/12/2025 à 14:22',
    description: 'Réflexion libre sur les enjeux éthiques dans ma pratique quotidienne.',
    excerpt: 'Aujourd\'hui, je me suis interrogé sur ma responsabilité en tant que formateur utilisant l\'IA. Comment garantir la transparence auprès de mes apprenants ?',
    content: `Aujourd'hui, je me suis posé une question fondamentale : quelle est ma responsabilité éthique en tant que formateur utilisant l'IA ?

Cette question m'est venue après une discussion avec un apprenant qui m'a demandé si j'utilisais l'IA pour créer mes supports. J'ai répondu honnêtement : oui, mais toujours avec validation et adaptation humaine.

Cela m'a amené à réfléchir à la transparence. Dois-je systématiquement mentionner quand un contenu a été co-créé avec l'IA ? Jusqu'où va mon devoir d'information ?

Je pense que la réponse est oui : la transparence est essentielle. Non pas pour me justifier, mais pour éduquer mes apprenants à une utilisation consciente et responsable de ces outils.

Au-delà de la simple utilisation, il y a la question de la dépendance. Est-ce que je développe encore mes propres réflexions ou est-ce que je délègue trop à l'IA ? C'est un équilibre délicat à maintenir.

Ma conclusion du jour : l'IA est un amplificateur. Elle amplifie ma créativité si je reste maître du processus, mais peut amplifier ma paresse si je m'en remets trop à elle. La vigilance éthique commence par l'auto-observation.`,
    hasResponses: false,
    mood: 'thoughtful',
    wordCount: 423,
    tags: ['Réflexion', 'Question', 'Pédagogie'],
  },
  {
    id: 4,
    type: 'learning',
    templateType: 'learning',
    title: 'Découverte de Claude 3.5 et ses capacités',
    date: '15/12/2025 à 10:15',
    description: 'Notes d\'apprentissage suite à l\'exploration des nouveaux modèles IA.',
    excerpt: 'Claude 3.5 propose des réponses plus structurées et nuancées. J\'ai testé différents styles de prompts et les résultats sont impressionnants...',
    content: `Aujourd'hui, j'ai passé plusieurs heures à explorer Claude 3.5 Sonnet et je suis impressionné par les progrès.

**Ce que j'ai testé :**
J'ai comparé les mêmes prompts sur différents modèles : GPT-4, Claude 3 Opus, et Claude 3.5 Sonnet. Les différences sont notables.

**Observations principales :**

1. **Structure des réponses** : Claude 3.5 organise naturellement ses réponses de manière très structurée, avec des titres clairs et une hiérarchie logique. C'est parfait pour mes supports de formation.

2. **Nuance et contexte** : Le modèle est excellent pour saisir les nuances. Quand je lui demande d'adapter un contenu pour différents publics, il comprend vraiment les subtilités.

3. **Longueur et densité** : Les réponses sont plus concises sans perdre en profondeur. Moins de remplissage, plus de substance.

**Tests de prompts :**
J'ai testé différents styles :
- Prompts directs vs contextualisés
- Format conversationnel vs instructions précises
- Demandes simples vs multi-étapes

Claude 3.5 excelle particulièrement avec les prompts multi-étapes. Il garde le fil et peut construire des raisonnements complexes.

**Applications pour ma pratique :**
- Création de scénarios pédagogiques
- Adaptation de contenus selon les niveaux
- Génération d'exercices pratiques
- Feedback sur mes propres productions

**Limites identifiées :**
Comme tous les modèles, il peut parfois "halluciner" des informations. La vérification reste indispensable, surtout pour les données factuelles.

**Prochaines étapes :**
Tester sur des cas d'usage réels de formation et comparer la qualité avec mes créations "100% humaines".`,
    hasResponses: false,
    mood: 'excited',
    wordCount: 567,
    tags: ['IA Générative', 'Apprentissage', 'Insight'],
  },
  {
    id: 5,
    type: 'coaching',
    templateType: 'coaching',
    title: 'Session avec Marie - Objectifs de formation IA',
    date: '10/12/2025 à 16:45',
    description: 'Insights et actions suite à la session de coaching.',
    excerpt: 'Marie a identifié 3 objectifs clairs pour intégrer l\'IA dans ses formations. Nous avons défini un plan d\'action sur 3 mois avec des jalons précis...',
    content: `Session de coaching très productive avec Marie aujourd'hui. Elle est formatrice en marketing digital et veut intégrer l'IA dans sa pratique.

**Contexte :**
Marie se sent dépassée par la vitesse d'évolution de l'IA. Elle a essayé ChatGPT mais sans méthodologie, les résultats étaient décevants. Elle cherche une approche structurée.

**Objectifs identifiés :**

1. **Maîtriser les fondamentaux du prompting** (Mois 1)
   - Comprendre la structure contexte/tâche/format
   - Créer 10 prompts templates pour ses cas d'usage
   - Tester et itérer quotidiennement

2. **Intégrer l'IA dans la création de contenus** (Mois 2)
   - Utiliser l'IA pour brainstorming créatif
   - Co-créer des études de cas avec l'IA
   - Développer son propre style de collaboration IA

3. **Former ses clients à l'IA** (Mois 3)
   - Créer un module "IA pour marketeurs"
   - Tester le module avec 5 beta-testeurs
   - Affiner et lancer commercialement

**Plan d'action concret :**
- Semaine 1-2 : Formation intensive sur le prompting
- Semaine 3-4 : Pratique quotidienne documentée
- Mois 2 : Création de contenus en co-création IA
- Mois 3 : Développement du module de formation

**Insights de la session :**
Marie a réalisé que sa résistance venait surtout de la peur de perdre sa créativité. On a redéfini l'IA comme un amplificateur de créativité, pas un remplaçant.

**Prochaine session :**
Dans 3 semaines, on débriefera ses premiers prompts templates et on ajustera la méthodologie.`,
    hasResponses: false,
    mood: 'happy',
    wordCount: 312,
    tags: ['Coaching', 'Objectifs', 'Action'],
  },
  {
    id: 6,
    type: 'insight',
    templateType: 'insight',
    title: '💡 L\'IA comme co-créateur pédagogique',
    date: '05/12/2025 à 09:33',
    description: 'Moment Eurêka sur une nouvelle approche pédagogique.',
    excerpt: 'Et si je ne voyais plus l\'IA comme un simple outil, mais comme un véritable partenaire de co-création pédagogique ? Cette perspective change tout !',
    content: `Révélation ce matin pendant ma douche (c'est toujours là que les meilleures idées arrivent !) :

**L'insight :**
Et si je cessais de voir l'IA comme un "outil" pour la considérer comme un véritable "partenaire de co-création pédagogique" ?

**Ce que ça change :**

Avec un outil, on a une relation utilitaire : j'ai besoin → j'utilise → je jette.

Avec un partenaire, la relation devient dialogique :
- Je propose une direction
- Le partenaire enrichit, questionne, propose
- On itère ensemble
- Le résultat final est une véritable co-création

**Application concrète :**
Au lieu de demander "Génère-moi un exercice sur X", je vais commencer par :
1. Expliquer mon intention pédagogique
2. Partager le contexte des apprenants
3. Demander des suggestions
4. Discuter des options
5. Affiner collaborativement

**Exemple réel :**
Hier, j'ai passé 20 minutes en "dialogue" avec Claude pour créer un cas pratique. Le résultat est bien meilleur que mes tentatives en one-shot prompt.

**Impact sur ma pratique :**
Cette vision change ma posture : je ne suis plus un simple "utilisateur" mais un "co-créateur". Cela valorise mon expertise pédagogique tout en tirant parti de la capacité de l'IA.

C'est exactement ce que je cherchais : une relation équilibrée où l'humain garde le lead tout en bénéficiant d'une intelligence augmentée.`,
    hasResponses: false,
    mood: 'excited',
    wordCount: 198,
    tags: ['Insight', 'Pédagogie', 'Innovation'],
  },
  {
    id: 7,
    type: 'learning',
    templateType: 'learning',
    title: 'Techniques avancées de prompt engineering',
    date: '25/11/2025 à 18:30',
    description: 'Synthèse des techniques apprises dans le module avancé.',
    excerpt: 'Chain-of-thought, few-shot learning, role prompting... Tant de techniques à maîtriser ! Je commence à voir des patterns dans la construction de prompts efficaces.',
    content: `Module intense aujourd'hui sur les techniques avancées de prompt engineering. Je synthétise mes apprentissages :

**1. Chain-of-Thought (CoT) Prompting**
Demander à l'IA de "réfléchir étape par étape" améliore drastiquement la qualité du raisonnement. 

Exemple concret :
❌ Mauvais : "Calcule le ROI de cette formation"
✅ Bon : "Calcule le ROI de cette formation en détaillant chaque étape de ton raisonnement"

**2. Few-Shot Learning**
Donner 2-3 exemples avant la vraie requête pour montrer le format attendu.

J'ai testé sur la création d'exercices : en donnant 2 exemples du style que je veux, les exercices générés sont parfaitement alignés.

**3. Role Prompting**
Définir un rôle précis : "Tu es un expert en pédagogie pour adultes avec 15 ans d'expérience..."

Incroyable comme cela change le ton et la profondeur des réponses !

**4. Prompts Multi-étapes**
Décomposer une tâche complexe en plusieurs prompts séquentiels plutôt qu'un seul prompt monolithique.

**5. Temperature et Paramètres**
J'ai enfin compris l'impact de la temperature :
- Basse (0.2-0.5) : réponses précises et cohérentes
- Haute (0.8-1.0) : créativité et diversité

**Patterns identifiés :**
Je commence à voir des patterns récurrents dans mes prompts efficaces :
- Toujours donner le contexte en premier
- Être explicite sur le format de sortie
- Utiliser des contraintes claires
- Demander de la réflexion pour les tâches complexes

**Prochaines expérimentations :**
Je vais créer une bibliothèque personnelle de "prompt patterns" pour mes cas d'usage récurrents. L'idée est d'avoir des templates prêts à l'emploi que je personnalise selon le besoin.

**Réflexion :**
Le prompt engineering n'est pas une science exacte, c'est un art qui se perfectionne avec la pratique. Chaque modèle a ses spécificités, il faut expérimenter.`,
    hasResponses: false,
    mood: 'calm',
    wordCount: 445,
    tags: ['Prompts', 'Apprentissage', 'IA Générative'],
  },
  {
    id: 8,
    type: 'free',
    templateType: 'free',
    title: 'Réflexion sur mon évolution depuis 3 mois',
    date: '18/11/2025 à 21:10',
    description: 'Introspection sur mon parcours d\'apprentissage.',
    excerpt: 'Il y a 3 mois, j\'étais intimidé par l\'IA. Aujourd\'hui, je l\'utilise quotidiennement et je forme d\'autres personnes. Quelle transformation !',
    content: `Moment d'introspection ce soir. Il y a exactement 3 mois, je me suis lancé dans ce parcours d'apprentissage sur l'IA. Le bilan est édifiant.

**Point de départ (il y a 3 mois) :**
- Intimidé par la technologie
- Conviction que "l'IA allait remplacer les formateurs"
- Utilisation sporadique et frustrante de ChatGPT
- Résultats décevants, impression de perdre mon temps

**Aujourd'hui :**
- Utilisation quotidienne et confiante de l'IA
- Vision claire : l'IA est un amplificateur, pas un remplaçant
- Maîtrise des bases du prompt engineering
- Je forme désormais d'autres formateurs !

**Ce qui a changé :**

1. **Ma posture mentale** : de la peur à la curiosité
2. **Mes compétences** : de l'utilisateur naïf au praticien éclairé
3. **Mes résultats** : de la frustration à l'efficacité
4. **Mon impact** : de l'apprenant au formateur

**Les moments clés :**
- Le déclic sur la structure des prompts (contexte/tâche/format)
- Ma première "vraie" conversation productive avec Claude
- Le feedback positif de mes premiers apprenants
- La création de mon premier module de formation sur l'IA

**Ce que j'ai appris sur moi :**
J'apprends mieux par la pratique que par la théorie. Les 10 premières heures d'expérimentation m'ont plus appris que des heures de lecture.

Je suis plus créatif quand je collabore (même avec une IA) que seul face à ma page blanche.

**Perspective pour les 3 prochains mois :**
- Approfondir les techniques avancées
- Développer ma bibliothèque de prompts templates
- Former au moins 20 professionnels
- Créer un retour d'expérience structuré

**Gratitude :**
Merci à moi d'avoir osé sortir de ma zone de confort. C'est peut-être narcissique, mais je suis fier du chemin parcouru.`,
    hasResponses: false,
    mood: 'happy',
    wordCount: 389,
    tags: ['Réflexion', 'Succès', 'Objectifs'],
  },
  {
    id: 9,
    type: 'coaching',
    templateType: 'coaching',
    title: 'Débriefing session groupe - Prompt Mastery',
    date: '12/11/2025 à 15:20',
    description: 'Retours et apprentissages de la session collective.',
    excerpt: 'Session intense avec 5 participants. Les échanges ont fait émerger des cas d\'usage que je n\'avais pas envisagés. L\'intelligence collective au service de l\'IA !',
    content: `Première session de coaching collectif aujourd'hui : 5 participants, 2h30 d'échanges intenses. L'intelligence collective à son meilleur !

**Profils des participants :**
- Sophie : formatrice en communication
- Marc : consultant en transformation digitale  
- Léa : coach professionnelle
- Thomas : responsable formation entreprise
- Nadia : créatrice de contenu e-learning

**Format de la session :**
1. Tour de table des problématiques (30min)
2. Démonstration live de prompting (45min)
3. Atelier pratique en duo (60min)
4. Débriefing collectif (15min)

**Cas d'usage émergés :**

1. **Sophie** : Utiliser l'IA pour créer des mises en situation réalistes
   → J'ai découvert qu'on peut générer des dialogues clients/vendeurs très réalistes !

2. **Marc** : Préparer des diagnostics organisationnels
   → L'IA peut poser les bonnes questions et structurer l'analyse

3. **Léa** : Générer des questions de coaching puissantes
   → Fascinant de voir comment l'IA peut challenger les réflexions

4. **Thomas** : Créer des parcours de formation personnalisés
   → L'adaptabilité de l'IA selon les profils est impressionnante

5. **Nadia** : Scénariser des modules e-learning engageants
   → L'IA excelle dans la création de storytelling pédagogique

**L'insight collectif :**
Un moment magique quand Marc a dit : "En fait, l'IA ne remplace pas notre expertise, elle la révèle et l'amplifie."

Tout le groupe a eu un déclic. On est passé d'une posture défensive ("l'IA va nous remplacer") à une posture d'opportunité ("l'IA va nous libérer du temps pour nous concentrer sur l'humain").

**Apprentissages pour moi :**
- La dynamique de groupe démultiplie l'apprentissage
- Les cas d'usage concrets parlent plus que la théorie
- Chaque métier a ses spécificités de prompting

**Suite :**
On se retrouve dans 3 semaines avec un challenge : chacun doit venir avec 3 prompts templates pour son métier à partager au groupe.`,
    hasResponses: false,
    mood: 'excited',
    wordCount: 276,
    tags: ['Coaching', 'Insight', 'Pédagogie'],
  },
  {
    id: 10,
    type: 'insight',
    templateType: 'insight',
    title: '⚡ Simplifier plutôt que complexifier',
    date: '08/11/2025 à 07:45',
    description: 'Prise de conscience sur la simplicité des prompts.',
    excerpt: 'Révélation du matin : les meilleurs prompts ne sont pas les plus complexes, mais les plus clairs et directs. Less is more !',
    content: `Révélation en prenant mon café ce matin :

**L'insight :**
J'ai passé des semaines à apprendre des techniques avancées de prompting. Chain-of-thought, few-shot learning, role prompting, etc.

Et ce matin, j'ai réalisé que mes meilleurs résultats viennent souvent des prompts les plus SIMPLES.

**L'erreur :**
Je complexifiais mes prompts en pensant que plus c'était sophistiqué, meilleurs seraient les résultats.

Résultat : des prompts de 300 mots, avec 5 contraintes, 3 exemples, un role précis... et des réponses moyennes.

**La révélation :**
Les meilleurs prompts sont :
- CLAIRS : une intention évidente
- DIRECTS : sans détours inutiles
- PRÉCIS : juste ce qu'il faut de contexte

**Exemple concret :**

❌ Prompt complexe (280 mots) :
"Tu es un expert en pédagogie pour adultes avec 15 ans d'expérience dans la formation professionnelle. Tu as une expertise particulière en andragogie et en ingénierie pédagogique. Je souhaite que tu m'aides à créer un exercice pratique pour une formation sur le prompt engineering. Le public cible est constitué de formateurs professionnels ayant entre 5 et 15 ans d'expérience. Ils ont un niveau débutant en IA mais sont technophiles. L'exercice doit être engageant, concret, et permettre une mise en pratique immédiate. Voici 3 exemples du type d'exercice que j'apprécie : [exemples]. Peux-tu créer un exercice similaire mais sur le thème de la structuration des prompts ?"

✅ Prompt simple (45 mots) :
"Crée un exercice pratique de 15 minutes sur la structuration des prompts pour des formateurs débutants en IA. L'exercice doit être concret avec un cas réel à résoudre."

**Résultat :** Le prompt simple donne des résultats MEILLEURS !

**Pourquoi ça marche :**
Moins de contraintes = plus de créativité de l'IA
Plus de clarté = moins d'ambiguïté
Aller à l'essentiel = focus sur ce qui compte

**Nouvelle règle personnelle :**
Toujours commencer simple. Complexifier SEULEMENT si le résultat n'est pas satisfaisant.

Less is more. CQFD.`,
    hasResponses: false,
    mood: 'excited',
    wordCount: 156,
    tags: ['Insight', 'Prompts', 'Réflexion'],
  },
];
