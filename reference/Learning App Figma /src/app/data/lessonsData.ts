import { 
  Lightbulb,
  Brain,
  BookOpen,
  PenTool,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Rocket,
} from 'lucide-react';

export interface LessonQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface LessonSubsection {
  title: string;
  content: string;
}

export interface LessonSection {
  id: string;
  title: string;
  icon: any;
  content?: string;
  subsections?: LessonSubsection[];
  questions?: LessonQuestion[];
  introduction?: string;
  reflectionQuestions?: string[];
  exercise?: string;
  instructions?: string;
  duration?: string;
}

export interface Lesson {
  id: number;
  title: string;
  stepTitle: string;
  duration: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  sections: LessonSection[];
}

export const lessonsData: Lesson[] = [
  // ============================================================
  // LEÇON 1.1 - Enjeux de la maîtrise du prompt
  // ============================================================
  {
    id: 1,
    title: 'Enjeux de la maîtrise du prompt',
    stepTitle: 'Les Fondamentaux du Prompt : Anatomie et Composants',
    duration: '15 min',
    type: 'video',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        icon: Sparkles,
        content: `Bienvenue dans cette première leçon du parcours "Enjeux de la maîtrise du prompt" !

Cette leçon vous guidera à travers les concepts fondamentaux qui transformeront votre façon d'interagir avec l'IA. Vous découvrirez pourquoi certains formateurs obtiennent des résultats exceptionnels avec l'IA, tandis que d'autres peinent à obtenir des réponses pertinentes.

**Ce que vous allez apprendre :**
• Comprendre l'impact d'un prompt bien formulé sur votre productivité
• Découvrir comment la précision améliore la qualité des réponses de l'IA
• Apprendre à vous libérer du temps pour des tâches à forte valeur ajoutée
• Devenir un formateur "augmenté" par l'IA

**Durée estimée :** 15 minutes

**Structure de la leçon :**
Cette leçon comprend 5 sections principales : Engager, 4 découvertes clés, un quiz de validation, une section de réflexion, et un exercice pratique d'application.

Prêt à commencer ? Cliquez sur "Section suivante" pour débuter !`,
      },
      {
        id: 'engager',
        title: 'Engager',
        icon: Lightbulb,
        content: `Pourquoi certains formateurs obtiennent-ils des merveilles de l'IA, tandis que d'autres sont déçus par des résultats génériques ? La réponse n'est pas dans l'outil lui-même, mais la manière dont vous dialoguez avec lui. La maîtrise du prompt, c'est-à-dire la façon de formuler vos demandes à l'IA, fait toute la différence dans la qualité des réponses obtenues.

En tant que formateur ou ingénieur pédagogique, vous avez tout à gagner à affiner votre art du dialogue avec l'IA. Un prompt bien conçu peut transformer une réponse moyenne en un contenu exploitable et pertinent du premier coup. Cette leçon vous montrera pourquoi investir du temps dans l'amélioration de vos prompts est un multiplicateur de succès dans votre pratique professionnelle.`,
      },
      {
        id: 'decouvrir-1',
        title: 'D1 : Multiplicateur de Productivité',
        icon: TrendingUp,
        content: `Un prompt formulé de manière optimale réduit drastiquement le temps passé en essais-erreurs. Imaginez deux formateurs : l'un passe sa journée à poser plusieurs questions approximatives à l'IA pour enfin obtenir ce qu'il veut, l'autre obtient quasiment du premier coup une réponse utilisable grâce à un prompt clair et précis. En maîtrisant l'art du prompt, vous diminuez le nombre d'allers-retours nécessaires avec l'IA. Chaque demande devient plus efficace, ce qui vous fait gagner un temps précieux sur la création de supports de formation ou d'exercices.

Cette productivité accrue signifie que vous pouvez itérer plus rapidement et explorer davantage d'idées en moins de temps. Au lieu de reformuler sans cesse vos questions, vous consacrez ce temps économisé à peaufiner le contenu ou à planifier d'autres activités pédagogiques. 

Un bon prompt agit comme un multiplicateur de productivité : moins de temps perdu à clarifier la demande signifie plus de temps pour enrichir le résultat ou travailler sur d'autres tâches.`,
      },
      {
        id: 'decouvrir-2',
        title: 'D2 : Précision et Qualité',
        icon: Target,
        content: `La qualité du contenu généré par l'IA est proportionnelle à la précision de votre prompt. Un prompt bien conçu fournit à l'IA des indications claires sur ce que vous attendez, ce qui aboutit à des réponses plus pertinentes, détaillées et directement exploitables. 

Exemple, si votre public cible est un groupe de managers novices et que votre objectif pédagogique est de leur apprendre la gestion du temps, un prompt précis intégrera ces éléments. Ainsi, la réponse de l'IA sera adaptée au niveau des managers novices et collera exactement à l'objectif visé, sans digressions inutiles.

Lorsque votre demande est précise, vous obtenez un contenu de meilleure qualité sur lequel vous n'avez que peu de retouches à faire. Au lieu d'une réponse générique qui nécessite beaucoup de modifications, vous recevez un texte ciblé, avec le ton et les informations adéquats. La précision dans le prompt guide l'IA comme un laser vers ce qui compte vraiment, ce qui se traduit par un gain de qualité appréciable dans les productions finales.`,
      },
      {
        id: 'decouvrir-3',
        title: 'D3 : Valeur Ajoutée Humaine',
        icon: Users,
        content: `En automatisant partiellement la production de contenu grâce à de bons prompts, vous vous libérez du temps pour des tâches à plus forte valeur ajoutée humaine. Pensez à toutes ces heures passées à rédiger manuellement des descriptions de cours, des questionnaires ou des exemples : une IA bien guidée peut désormais en générer l'ébauche rapidement. Le temps ainsi dégagé peut être réinvesti dans ce que l'humain fait de mieux : le coaching des apprenants, l'animation de discussions, la personnalisation de l'accompagnement, la réflexion stratégique sur le dispositif de formation, etc.

Au lieu de vous épuiser sur des tâches répétitives de rédaction, vous pouvez vous concentrer sur l'innovation pédagogique et l'interaction humaine. La maîtrise du prompt vous libère de la routine pour vous permettre de jouer pleinement votre rôle de formateur-coach. En déléguant à l'IA la première ébauche du contenu, vous intervenez là où votre expertise est indispensable : ajuster, valider, approfondir et ajouter les anecdotes ou l'âme humaine qui feront la différence auprès de vos apprenants.`,
      },
      {
        id: 'decouvrir-4',
        title: 'D4 : Formateur Augmenté',
        icon: Rocket,
        content: `La maîtrise des prompts (le prompt engineering) devient une compétence clé qui transforme le formateur en véritable architecte de l'apprentissage. Plutôt que de simplement dispenser un cours, le formateur « augmenté » conçoit et orchestre l'expérience d'apprentissage avec l'aide de l'IA. En maîtrisant les prompts, vous pouvez générer rapidement des études de cas, des quiz, des métaphores adaptées à votre audience, et ce autant de fois que nécessaire, quasiment à la demande.

Cette capacité à mobiliser l'IA pour produire des ressources pédagogiques fait de vous un professionnel décuplant son impact. Vous n'êtes plus seulement un créateur de contenu, vous devenez un chef d'orchestre qui s'appuie sur l'IA pour amplifier et enrichir vos formations. Le résultat : des apprenants qui bénéficient de contenus plus variés, actualisés et engageants, tandis que vous gagnez en efficacité et en créativité dans votre préparation. Le formateur de demain est un formateur augmenté par l'IA, et la clé pour le devenir est la maîtrise du prompt.`,
      },
      {
        id: 'quiz',
        title: 'Quiz',
        icon: BookOpen,
        questions: [
          {
            question: 'Quel est le principal avantage d\'un prompt bien maîtrisé pour un formateur ?',
            options: [
              'Il permet d\'obtenir rapidement des réponses de l\'IA proches du besoin réel.',
              'Il évite complètement de devoir relire le contenu généré.',
              'Il garantit que l\'IA ne fera plus aucune erreur.',
              'Il supprime le besoin de l\'intervention humaine dans la formation.',
            ],
            correctAnswer: 0,
          },
          {
            question: 'En quoi un prompt efficace agit-il comme un multiplicateur de productivité ?',
            options: [
              'Il oblige l\'IA à travailler plus vite.',
              'Il réduit le nombre de tentatives nécessaires pour obtenir une bonne réponse.',
              'Il augmente la créativité de l\'IA.',
              'Il prolonge la durée de la réponse de l\'IA.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Que se passe-t-il lorsqu\'un prompt est formulé de manière vague ?',
            options: [
              'L\'IA demande automatiquement des précisions.',
              'L\'IA fournit quand même une réponse parfaitement ciblée.',
              'L\'IA donne une réponse générique qui peut manquer de pertinence.',
              'L\'IA refuse de répondre dans la plupart des cas.',
            ],
            correctAnswer: 2,
          },
          {
            question: 'Lequel des éléments suivants contribue le PLUS à améliorer la qualité de la réponse de l\'IA ?',
            options: [
              'Allonger le prompt avec beaucoup de questions annexes.',
              'Fournir un contexte et des détails précis dans le prompt.',
              'Utiliser un langage familier et désinvolte.',
              'Poser plusieurs questions en même temps dans un seul prompt.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Pourquoi la précision du prompt permet-elle d\'obtenir un contenu exploitable plus rapidement ?',
            options: [
              'Parce que l\'IA apprécie les utilisateurs exigeants.',
              'Parce qu\'un prompt précis oriente l\'IA exactement sur ce qu\'il faut produire.',
              'Parce qu\'un prompt précis accélère la vitesse de calcul de l\'IA.',
              'Parce qu\'un prompt précis augmente la taille de la fenêtre de mémoire de l\'IA.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Parmi ces tâches, laquelle est typiquement à plus forte valeur ajoutée humaine par rapport à la génération de contenu automatisée ?',
            options: [
              'Générer une liste de questions de révision de base.',
              'Corriger et adapter le ton d\'un contenu pour un public spécifique.',
              'Convertir un texte en tableau de données.',
              'Traduire automatiquement un document en anglais.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Comment le fait de déléguer certaines ébauches de contenu à l\'IA peut-il bénéficier au formateur ?',
            options: [
              'Le formateur peut se concentrer sur l\'accompagnement personnalisé des apprenants.',
              'Le formateur n\'a plus besoin de planifier ses cours à l\'avance.',
              'Le formateur peut laisser l\'IA gérer l\'animation de la classe à sa place.',
              'Le formateur n\'a plus besoin de mettre à jour ses connaissances métier.',
            ],
            correctAnswer: 0,
          },
          {
            question: 'Que signifie pour un formateur de devenir « formateur augmenté » grâce à l\'IA ?',
            options: [
              'Qu\'il enseigne exclusivement à des robots.',
              'Qu\'il utilise l\'IA comme outil pour enrichir et étendre ses capacités pédagogiques.',
              'Qu\'il travaille deux fois plus pour maîtriser la technologie.',
              'Qu\'il remplace complètement son expertise humaine par l\'IA.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Laquelle de ces situations illustre le mieux un usage efficace de l\'IA par un formateur ?',
            options: [
              'L\'IA génère un plan de cours, et le formateur l\'utilise tel quel sans aucune relecture.',
              'L\'IA génère des quiz standardisés pendant que le formateur personnalise l\'accompagnement en classe.',
              'Le formateur passe plus de temps à corriger les erreurs de l\'IA qu\'à préparer son cours.',
              'Le formateur interdit à l\'IA toute intervention dans son processus de création.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Quel est l\'effet d\'un prompt bien structuré sur la relation entre le formateur et la création de contenu ?',
            options: [
              'Il n\'y a aucun effet notable.',
              'Il permet au formateur de créer du contenu de meilleure qualité plus rapidement.',
              'Il rend le formateur dépendant de l\'IA pour la moindre tâche.',
              'Il complique inutilement la façon de poser des questions à l\'IA.',
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 'reflechir',
        title: 'Réfléchir',
        icon: Brain,
        introduction: `La maîtrise du prompt est essentielle pour les formateurs et ingénieurs pédagogiques. Cette compétence libère du temps pour des tâches à plus forte valeur ajoutée humaine, transformant le formateur en un architecte de l'apprentissage augmenté par l'IA.

Réfléchissez : comment cette synergie homme-machine peut-elle redéfinir votre rôle et maximiser votre impact pédagogique au quotidien ?`,
        reflectionQuestions: [
          'Quel type de tâche chronophage dans votre quotidien de formateur pourrait bénéficier le plus d\'un gain de temps grâce à une meilleure utilisation des prompts ? Identifiez une tâche précise et imaginez l\'impact si l\'IA pouvait vous en décharger partiellement.',
          'Si vous parvenez à libérer du temps en automatisant certaines productions de contenu, comment souhaiteriez-vous réinvestir ce temps auprès de vos apprenants ou dans la conception pédagogique ? Donnez un exemple concret de valeur ajoutée que ce temps libéré vous permettrait d\'apporter.',
          'Outre le gain de temps, quel autre avantage clé entrevoyez-vous dans la maîtrise du prompt pour votre pratique professionnelle ?',
        ],
      },
      {
        id: 'appliquer',
        title: 'Appliquer',
        icon: PenTool,
        introduction: `Maintenant que vous avez compris les enjeux de la maîtrise du prompt, il est temps de mettre en pratique vos nouvelles connaissances !

Cette section vous propose un exercice concret pour expérimenter directement l'impact d'un prompt bien formulé. Vous allez choisir une tâche de votre quotidien de formateur et créer un prompt pour l'automatiser partiellement.

**Objectif de l'exercice :**
Prendre conscience de l'importance de la précision dans la formulation de vos demandes à l'IA, et observer concrètement la différence entre un prompt vague et un prompt précis.

**Durée estimée :** 5 minutes`,
        instructions: `**Instructions pas à pas :**

1. **Identifiez une tâche répétitive** : Pensez à une tâche concrète que vous réalisez souvent dans le cadre de vos formations (par exemple : rédiger la description d'une session de formation, créer une liste de questions pour un quiz, générer des exemples pratiques, etc.).

2. **Formulez votre prompt** : Rédigez une requête à l'IA pour cette tâche en étant le plus précis possible, sans pour autant utiliser de méthode structurée formelle. Essayez d'être clair et détaillé.

3. **Testez avec l'IA** : Soumettez votre prompt à l'IA via votre outil favori (ChatGPT, Claude, Gemini, etc.).

4. **Évaluez le résultat** : Analysez la réponse obtenue :
   • La réponse est-elle pertinente et directement exploitable ?
   • Correspond-elle à ce que vous attendiez ?
   • Y a-t-il des éléments manquants ou superflus ?

5. **Réfléchissez aux améliorations** : Notez quelles améliorations vous pourriez apporter à votre prompt initial pour obtenir un résultat encore meilleur.`,
        duration: '5 minutes',
      },
    ],
  },

  // ============================================================
  // LEÇON 1.2 - Dialoguer avec l'IA: Concepts théoriques
  // ============================================================
  {
    id: 2,
    title: 'Dialoguer avec l\'IA: Concepts théoriques',
    moduleTitle: 'Les Fondamentaux du Prompt : Anatomie et Composants',
    duration: '15 min',
    type: 'video',
    sections: [
      {
        id: 'engager',
        title: 'Engager',
        icon: Lightbulb,
        content: `Vous avez sûrement déjà posé une question à une IA en quelques mots, sans trop réfléchir. Et si cette simple question pouvait devenir un véritable outil de précision ? Apprendre à dialoguer avec l'IA, c'est transformer des requêtes basiques en instructions claires et efficaces pour faire de l'IA votre meilleure assistante pédagogique.

Un bon dialogue commence par une bonne question : en maîtrisant l'art du prompt, vous allez découvrir comment orienter l'IA pour obtenir des réponses bien plus pertinentes, ciblées et utiles pour vos formations.`,
      },
      {
        id: 'decouvrir',
        title: 'Découvrir',
        icon: Brain,
        subsections: [
          {
            title: 'D1 : Qu\'est-ce qu\'un prompt ?',
            content: `Un prompt, c'est tout simplement la consigne ou la question que vous donnez à l'IA pour qu'elle génère une réponse. Posez-vous la question en ces termes : si vous consultiez un expert humain, comment formuleriez-vous votre demande ? Une question floue à un expert humain donnerait lieu à une réponse tout aussi floue ou incomplète. Il en va de même avec l'IA. Si votre prompt manque de clarté ou de détails, l'IA aura du mal à deviner précisément ce que vous attendez et risque de répondre à côté de votre véritable intention.

En comparant l'IA à un expert ultra-rapide, on comprend que le rôle de votre question est crucial : elle doit contenir suffisamment d'informations pour guider cet « expert » vers la bonne réponse. Un prompt efficace définit donc clairement le sujet, l'objectif et le type de réponse souhaitée, afin que l'IA puisse mobiliser les bonnes connaissances et fournir une réponse pertinente du premier coup.`,
          },
          {
            title: 'D2 : Le principe GIGO (Garbage In, Garbage Out)',
            content: `« Garbage In, Garbage Out » se traduit par « Des entrées nulles, des sorties nulles ». Pour l'IA, cela signifie que si vous fournissez une consigne médiocre ou trop floue (garbage in), vous obtiendrez une réponse médiocre ou inutilisable (garbage out). L'IA n'est pas capable de deviner vos intentions cachées ou de combler les énormes vides d'une question mal posée. Elle prend votre prompt tel quel et fait de son mieux avec ce qu'elle a.

Un prompt vague du type « Parle-moi de la gestion du temps » aboutira généralement à une réponse très générique, qui compile des banalités sur le sujet sans focus précis. Ce n'est pas que l'IA « veut » être vague, c'est qu'elle n'a pas reçu assez de directives spécifiques. À l'inverse, un prompt détaillé (par exemple « Donne-moi 3 techniques avancées de gestion du temps pour un public de managers déjà formés aux bases, avec un exemple concret pour chaque ») donnera une réponse beaucoup plus ciblée et actionnable. GIGO nous rappelle donc que la qualité de la sortie de l'IA dépend directement de la qualité de ce qu'on lui fournit en entrée.`,
          },
          {
            title: 'D3 : L\'IA, un Co-Pilote Exécutant',
            content: `Considérez l'IA comme votre co-pilote dans la création de contenu. Elle est extrêmement rapide pour exécuter des tâches. Mais elle n'a ni le jugement critique, ni l'expérience terrain, ni la compréhension fine des enjeux humains que vous, formateur, possédez. Dans ce duo, l'IA est l'exécutant ultra-rapide et infatigable, tandis que vous êtes le pilote qui donne la direction, qui tranche les décisions et qui garantit la pertinence pédagogique.

Concrètement, cela signifie que l'IA peut vous fournir en quelques secondes une base de travail, une première ébauche, ou dix variantes d'un exercice. De votre côté, c'est vous qui choisissez la meilleure option, corrigez les erreurs éventuelles, adaptez au contexte réel de vos apprenants et validez que le ton et le contenu sont appropriés. L'IA ne se fatigue pas et ne prend rien pour acquis : elle exécute ce qu'on lui demande. À vous d'apporter l'expertise métier, la créativité contextualisée et l'œil humain critique. Ensemble, vous pouvez aller plus loin, plus vite, à condition de bien définir les rôles de chacun.`,
          },
          {
            title: 'D4 : La Synergie Humain-Machine',
            content: `Lorsque vous combinez votre expertise humaine avec l'efficacité de l'IA, vous obtenez une synergie puissante. Votre connaissance du terrain et du public, ajoutée à la capacité de l'IA à générer rapidement du contenu, aboutissent à un résultat supérieur à ce que chacun pourrait produire séparément. L'IA amplifie votre impact, et vos directives donnent du sens et de la finesse aux propositions de l'IA.

La co-construction est donc le maître-mot : vous orientez, l'IA exécute, puis vous affinez. En travaillant ainsi main dans la main, vous demeurez pleinement responsable du contenu final (car c'est vous qui l'approuvez et l'ajustez), tout en profitant d'un gain de temps et d'idées nouvelles apportées par la machine. Cette synergie requiert confiance et esprit critique : confiance dans l'outil pour la production initiale, et esprit critique pour relire et ajuster ce qui est proposé. Le résultat, ce sont des tâches réalisées plus rapidement, mais toujours avec votre patte professionnelle.`,
          },
        ],
      },
      {
        id: 'quiz',
        title: 'Quiz',
        icon: BookOpen,
        questions: [
          {
            question: 'Que représente le « prompt » dans l\'utilisation d\'une IA ?',
            options: [
              'Le modèle d\'intelligence artificielle lui-même.',
              'La réponse générée par l\'IA à une question.',
              'La consigne ou question que l\'on donne à l\'IA.',
              'Un programme informatique additionnel à installer.',
            ],
            correctAnswer: 2,
          },
          {
            question: 'Quelle est la meilleure traduction de l\'adage « Garbage In, Garbage Out » dans le contexte des IA ?',
            options: [
              'Si l\'IA ne comprend pas la question, elle ne répondra pas.',
              'Des données d\'entrée de mauvaise qualité produisent une sortie de mauvaise qualité.',
              'Plus une question est longue, meilleure sera la réponse.',
              'Une IA génère toujours des réponses imprévisibles à partir de bonnes questions.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Pourquoi une question vague donne-t-elle une réponse souvent peu exploitable de la part de l\'IA ?',
            options: [
              'Parce que l\'IA se braque et refuse de répondre en détail.',
              'Parce que l\'IA n\'a pas assez de directives pour cibler la réponse.',
              'Parce que l\'IA est programmée pour ignorer les détails implicites.',
              'Parce que l\'IA attend toujours des questions parfaites pour bien répondre.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Dans le duo formateur-IA décrit dans cette leçon, quel rôle incombe principalement au formateur humain ?',
            options: [
              'Générer du contenu brut le plus rapidement possible.',
              'Fournir l\'expertise métier, vérifier et valider le contenu généré.',
              'Corriger le code informatique de l\'IA.',
              'Exécuter les tâches répétitives à la place de l\'IA.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Lequel de ces énoncés correspond à une bonne pratique de co-pilotage avec l\'IA ?',
            options: [
              'Laisser l\'IA tout faire et utiliser les réponses telles quelles les yeux fermés.',
              'Guider l\'IA avec un prompt clair, puis ajuster manuellement la réponse si nécessaire.',
              'Ne jamais utiliser l\'IA pour la génération de contenu réel, seulement pour des tests.',
              'Interrompre l\'IA à mi-chemin de sa réponse pour donner plus d\'instructions.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Parmi ces tâches, laquelle est mieux réalisée par l\'humain que par l\'IA dans une collaboration ?',
            options: [
              'Générer 10 idées de thèmes de formation en 1 minute.',
              'Vérifier que le contenu proposé correspond bien aux besoins spécifiques des apprenants.',
              'Traduire un texte de cours en plusieurs langues instantanément.',
              'Lister les étapes d\'une procédure standard connue.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'La synergie humain-machine signifie que :',
            options: [
              'Le formateur et l\'IA travaillent ensemble pour produire un résultat meilleur que ce qu\'ils feraient séparément.',
              'L\'IA remplace progressivement le formateur dans toutes ses tâches.',
              'Le formateur doit systématiquement vérifier chaque mot produit par l\'IA.',
              'L\'IA décide des objectifs pédagogiques à la place du formateur.',
            ],
            correctAnswer: 0,
          },
          {
            question: 'Qu\'est-ce qui caractérise un prompt bien formulé ?',
            options: [
              'Il est très bref, même s\'il manque de détails.',
              'Il précise clairement la demande et le contexte pour orienter l\'IA.',
              'Il utilise des termes vagues pour laisser l\'IA interpréter librement.',
              'Il pose plusieurs questions différentes à la fois pour gagner du temps.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Avant de suivre cette leçon, quelle était une pratique courante chez de nombreux débutants face à l\'IA ?',
            options: [
              'Structurer systématiquement leurs demandes avec un cadre précis.',
              'Poser des questions très générales et espérer une bonne réponse.',
              'Utiliser du vocabulaire technique compliqué dans leurs prompts.',
              'Lire le manuel de l\'IA avant chaque question.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Lorsque l\'IA et le formateur co-créent un contenu, qui est en dernier lieu responsable de la qualité du résultat final ?',
            options: [
              'L\'IA, car c\'est elle qui a généré la majorité du contenu.',
              'Le formateur humain, car c\'est lui qui valide et utilise le contenu dans son contexte pédagogique.',
              'Les deux à parts égales, sans distinction.',
              'Aucune responsabilité n\'est clairement définie dans ce cas.',
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 'reflechir',
        title: 'Réfléchir',
        icon: Brain,
        introduction: `Dialoguer efficacement avec l'IA demande de la considérer comme un partenaire. Vous restez responsable de la qualité, de l'exactitude et de la pertinence du contenu co-construit. Cela implique de développer un esprit critique et de nouvelles compétences pour piloter l'IA, transformant une utilisation basique en une collaboration stratégique. Nous vous invitons à réfléchir à l'équilibre éthique et efficace de cette collaboration homme-machine, où vous tiendrez le rôle de chef d'orchestre.`,
        reflectionQuestions: [
          'Avant ce cours, aviez-vous plutôt tendance à formuler des requêtes très simples (par ex. « Donne-moi des idées pour un cours de management ») ou tentiez-vous déjà de structurer vos prompts avec plus de détails ? Comment évaluez-vous rétrospectivement l\'efficacité de votre approche initiale ?',
          'Le fait que l\'IA co-construise avec vous du contenu pédagogique modifie-t-il votre sentiment de responsabilité vis-à-vis de ce contenu ? Par exemple, vous sentez-vous autant responsable de la qualité et de l\'exactitude du résultat final que si vous l\'aviez rédigé entièrement vous-même ? Expliquez votre point de vue.',
          'Selon vous, quels sont les plus grands défis à relever pour communiquer efficacement avec une IA dans un contexte pédagogique ?',
        ],
      },
      {
        id: 'appliquer',
        title: 'Appliquer',
        icon: PenTool,
        exercise: `Ouvrez l'outil d'IA de votre choix et saisissez une question volontairement très vague, par exemple : « Parle-moi de la gestion du temps. » 

Observez la réponse que l'IA fournit. Analysez ensuite cette réponse : en quoi est-elle générique ou peu exploitable telle quelle pour un formateur ? 

Identifiez ce qui manque dans votre prompt initial et notez quelles améliorations vous pourriez apporter. 

Cet exercice doit vous faire prendre conscience concrètement de l'importance de formuler des prompts détaillés : plus votre question initiale sera ciblée, plus la réponse de l'IA gagnera en pertinence.`,
        duration: '5 minutes',
      },
    ],
  },

  // ============================================================
  // LEÇON 1.3 - La méthode simple pour bien prompter
  // ============================================================
  {
    id: 3,
    title: 'La méthode simple pour bien prompter',
    moduleTitle: 'Les Fondamentaux du Prompt : Anatomie et Composants',
    duration: '15 min',
    type: 'video',
    sections: [
      {
        id: 'engager',
        title: 'Engager',
        icon: Lightbulb,
        content: `Le secret d'un bon usage de l'IA ne réside pas dans un don intuitif, mais bien dans une méthode structurée. Si jusqu'à présent vous avez fonctionné au feeling pour poser vos questions, il est temps de découvrir une approche plus rigoureuse. Cette leçon va vous donner une méthode simple pour passer d'une simple conversation avec l'IA à un véritable dialogue professionnel qui produit exactement ce dont vous avez besoin.

En adoptant cette méthode, vous gagnerez en clarté et en cohérence. Plus besoin de tâtonner : en suivant quelques étapes clés, vous saurez formuler des prompts complets et précis. Préparez-vous à transformer vos essais aléatoires en une démarche systématique qui garantit des résultats de bien meilleure qualité.`,
      },
      {
        id: 'decouvrir',
        title: 'Découvrir',
        icon: Brain,
        subsections: [
          {
            title: 'D1 : Les 5 ingrédients d\'un prompt efficace',
            content: `Tout bon prompt comporte un certain nombre d'éléments essentiels qui assurent son efficacité. On peut les voir comme les ingrédients d'une recette réussie. Les cinq principaux ingrédients d'un prompt efficace sont les suivants :

**Clarté** : Le prompt doit être formulé de manière compréhensible et sans ambiguïtés. Évitez le jargon inutile ou les phrases trop complexes. Plus c'est clair pour l'IA (et pour vous en relisant), mieux c'est.

**Contexte** : Situez la demande dans un contexte précis. Mentionnez le public visé, le domaine, ou toute contrainte pertinente (durée, niveau attendu, etc.). Cela aide l'IA à adapter sa réponse à la situation.

**Intention / Tâche** : Indiquez clairement ce que vous attendez de l'IA. S'agit-il de générer une liste, d'expliquer un concept, de comparer deux méthodes, de créer un quiz ? Le verbe d'action est important (par exemple : expliquer, lister, comparer, proposer, etc.).

**Format** : Précisez la forme sous laquelle vous voulez la réponse. Est-ce un texte libre, une liste à puces, un tableau, un script de dialogue, une image ? En fixant le format, vous guidez la présentation de la réponse.

**Ton** : Si c'est pertinent, indiquez le ton ou le style souhaité (par exemple, un ton formel et académique, ou au contraire simple et accessible, voire ludique). Le ton doit être adapté à votre public et à l'usage du contenu.

En combinant ces cinq éléments, vous maximisez vos chances d'obtenir de l'IA une réponse utile et bien ajustée à votre besoin. Un prompt efficace agit comme un briefing complet donné à l'IA, un peu comme vous brieferiez un collègue sur ce que vous attendez de lui.`,
          },
          {
            title: 'D2 : Introduction au Framework RCTF',
            content: `Pour vous aider à structurer systématiquement vos prompts, il existe un cadre simple à mémoriser : le framework RCTF. Ces quatre lettres signifient **Rôle, Contexte, Tâche, Format**. Il s'agit de la trame de base qui garantit que vous n'oublierez aucune information critique en formulant votre demande.

**Rôle (R)** – Indiquez à l'IA quel rôle elle doit jouer ou quel type d'expert elle doit incarner. Par exemple : « Vous êtes un formateur expert en management » ou « Tu es un développeur web senior spécialisé en e-learning ». En spécifiant le rôle, vous orientez l'IA vers un registre de connaissances et un style pertinent.

**Contexte (C)** – Fournissez les détails contextuels de la tâche. Où, quand, pour qui, avec quelles contraintes ? Par exemple : « dans le cadre d'une formation de 2h pour des managers débutants » ou « en utilisant les données de l'année 2023 ». Le contexte encadre la demande et évite les réponses hors-sujet.

**Tâche (T)** – Formulez clairement l'action attendue de l'IA. C'est le cœur de votre demande, exprimé souvent par un verbe d'action précis. Par exemple : « génère une liste de 5 activités de team-building » ou « compare deux approches pédagogiques… ». La tâche dit à l'IA quoi faire exactement.

**Format (F)** – Indiquez le format de réponse souhaité. Cela peut être une liste à puces, un tableau, un plan en étapes, un paragraphe argumentatif, etc. Par exemple : « … sous la forme d'un tableau comparatif avec deux colonnes (Approche A vs Approche B) » ou « … et présente la réponse sous forme de liste numérotée ».

Le framework RCTF vous donne une structure mentale à suivre. Avant d'envoyer votre prompt, vérifiez que vous avez bien renseigné chaque élément : Quel rôle j'attribue à l'IA ? Ai-je donné le contexte nécessaire ? Quelle tâche précise je demande ? Quel format de réponse j'attends ? En utilisant RCTF, vous n'oublierez plus ces composantes clés.`,
          },
          {
            title: 'D3 : Détail des 4 piliers',
            content: `Chacun des piliers du RCTF influence la réponse finale de l'IA d'une manière particulière :

**Rôle** : Le rôle choisi influence le style d'écriture et le niveau de détail technique de la réponse. Par exemple, un « expert juridique » utilisera un langage plus formel et précis sur le plan légal, tandis qu'un « vulgarisateur scientifique » prendra un ton plus simple et pédagogique. Oublier de préciser le rôle, c'est prendre le risque d'une réponse générique, sans saveur particulière.

**Contexte** : Le contexte donné assure la pertinence de la réponse. Il limite l'IA à une situation donnée, ce qui évite d'obtenir des informations qui ne s'appliquent pas à votre cas. Par exemple, en précisant « pour un public d'adolescents en difficulté scolaire », vous obtiendrez une réponse adaptée à ce public, ce qui serait très différent d'une réponse pour des cadres en entreprise sur le même sujet.

**Tâche** : La tâche définie détermine ce que l'IA va produire. C'est votre objectif concret. Si vous précisez bien l'action (expliquer, lister, comparer, rédiger un plan, etc.), l'IA saura exactement quel type de contenu générer. Si vous restez vague sur la tâche (« Parle de X »), la réponse risque de partir dans une direction non souhaitée ou de manquer de focalisation.

**Format** : Le format demandé influe sur la présentation et la facilité d'exploitation de la réponse. En exigeant par exemple un tableau ou une liste, vous vous assurez que la réponse sera structurée comme vous le voulez. Cela vous fait gagner du temps, car vous n'aurez pas à formater le texte vous-même. Sans format précisé, l'IA choisira d'elle-même la forme – peut-être un long paragraphe – qui ne sera pas forcément la plus pratique pour vous.

En soignant chacun de ces piliers, vous fabriquez un prompt robuste qui couvre tous les aspects nécessaires. C'est la garantie d'obtenir une réponse plus cohérente, plus ciblée et plus immédiatement exploitable.`,
          },
          {
            title: 'D4 : Analyse de l\'Exemple RCTF',
            content: `Prenons un exemple pour voir comment se combinent concrètement R, C, T, F dans un prompt complet. Imaginons que vous souhaitez que l'IA vous propose une activité brise-glace pour un atelier de formation.

**Exemple de prompt structuré (RCTF) :**

**Rôle** : "Tu es un ingénieur pédagogique senior spécialisé en formation d'entreprise."

**Contexte** : "Tu interviens dans une session de formation de 30 minutes destinée à de nouveaux managers dans une entreprise tech, en présentiel."

**Tâche** : "Propose une activité de brise-glace engageante pour débuter la session, qui soit adaptée à ce contexte."

**Format** : "Présente ta proposition sous la forme d'une liste numérotée décrivant les étapes de l'activité, avec une brève explication pour chaque étape."

Dans ce prompt structuré, on distingue clairement les 4 éléments. Le rôle (ingénieur pédagogique senior) assure que l'IA répond avec l'expertise d'un professionnel de la formation. Le contexte (nouveaux managers, session de 30 minutes en entreprise tech, présentiel) cadre la proposition d'activité pour qu'elle soit pertinente à la fois en durée, en public et en milieu professionnel. La tâche (proposer une activité de brise-glace engageante) est explicitement formulée, on sait exactement ce qui est attendu. Enfin, le format (liste numérotée avec explications) garantit que la réponse sera facile à lire et à utiliser tel quel dans vos supports.

En décomposant ainsi l'exemple, on voit bien comment chaque partie du prompt contribue au résultat final. Omettre l'un des piliers affaiblit nettement la réponse : sans rôle, l'IA ne sait pas quel ton/expertise adopter ; sans contexte, l'activité proposée pourrait ne pas convenir à des nouveaux managers ou dépasser 30 minutes ; sans tâche claire, l'IA pourrait divaguer sur l'importance des icebreakers au lieu d'en proposer un ; sans format, vous auriez peut-être un paragraphe confus au lieu d'une liste bien nette. D'où l'importance de chaque composant !`,
          },
        ],
      },
      {
        id: 'quiz',
        title: 'Quiz',
        icon: BookOpen,
        questions: [
          {
            question: 'Parmi les éléments suivants, lequel n\'est pas un des « 5 ingrédients » d\'un prompt efficace mentionnés dans cette leçon ?',
            options: [
              'Clarté',
              'Contexte',
              'Format',
              'Confidentialité',
            ],
            correctAnswer: 3,
          },
          {
            question: 'Que signifient les lettres du framework RCTF ?',
            options: [
              'Requête – Contexte – Thème – Formalisme',
              'Rôle – Contexte – Tâche – Format',
              'Ressource – Cible – Ton – Feedback',
              'Rigueur – Cohérence – Temps – Fiabilité',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Quel pilier du RCTF précise ce que l\'IA doit faire exactement (l\'action à réaliser) ?',
            options: [
              'Rôle',
              'Contexte',
              'Tâche',
              'Format',
            ],
            correctAnswer: 2,
          },
          {
            question: 'Dans un prompt RCTF, quelle est la fonction de la composante « Format » ?',
            options: [
              'Fournir des informations de contexte supplémentaires à l\'IA.',
              'Indiquer sous quelle forme la réponse doit être présentée.',
              'Déterminer la longueur maximale de la réponse de l\'IA.',
              'Spécifier le ton (formel, informel) de la réponse.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Si un formateur oublie de préciser le Rôle dans son prompt :',
            options: [
              'L\'IA refusera de répondre car le prompt est incomplet.',
              'La réponse risque d\'être générique, sans style expert particulier.',
              'L\'IA inventera d\'elle-même un rôle approprié.',
              'La qualité de la réponse ne sera affectée d\'aucune manière.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Lequel de ces prompts est le mieux structuré selon RCTF ?',
            options: [
              '« Explique-moi le e-learning. »',
              '« Tu es un expert en e-learning. Donne-moi un texte. »',
              '« Tu es un formateur digital. Dans le cadre d\'un cours en ligne pour débutants, dresse la liste des 3 avantages principaux du e-learning, sous forme de puces. »',
              '« Rôle: expert en e-learning; Tâche: avantages; Format: liste. »',
            ],
            correctAnswer: 2,
          },
          {
            question: 'Dans l\'exemple de prompt RCTF donné, quelle partie correspond à la Tâche ?',
            options: [
              '« Tu es un ingénieur pédagogique senior... »',
              '« ...session de formation de 30 minutes destinée à de nouveaux managers... »',
              '« Propose une activité de brise-glace engageante pour débuter la session... »',
              '« Présente ta proposition sous la forme d\'une liste numérotée... »',
            ],
            correctAnswer: 2,
          },
          {
            question: 'Toujours dans l\'exemple, pourquoi le Contexte (nouveaux managers, 30 minutes, etc.) est-il important ?',
            options: [
              'Il limite la proposition de l\'IA à quelque chose d\'adapté à la durée et au public.',
              'Il n\'est pas vraiment important, c\'est juste du détail cosmétique.',
              'Il sert uniquement à allonger le prompt mais n\'influence pas la réponse.',
              'Il rend le prompt plus impressionnant aux yeux de l\'IA.',
            ],
            correctAnswer: 0,
          },
          {
            question: 'Quel est l\'effet de demander un Format particulier (par exemple une liste ou un tableau) sur la réponse de l\'IA ?',
            options: [
              'Cela n\'a d\'effet que si la réponse de l\'IA dépasse un certain nombre de mots.',
              'Cela assure que la réponse sera structurée d\'une manière précise et utilisable directement.',
              'Cela contraint l\'IA à réduire la qualité du contenu au profit de la forme.',
              'Cela énerve souvent l\'IA qui préfère choisir son propre format de réponse.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Parmi ces affirmations, laquelle résume le mieux l\'intérêt d\'utiliser la méthode RCTF ?',
            options: [
              'Elle garantit que l\'IA répondra correctement à 100 % sans aucune correction nécessaire.',
              'Elle force l\'IA à révéler son processus interne.',
              'Elle aide le formateur à n\'oublier aucun élément clé dans sa demande, pour obtenir une réponse riche et ciblée.',
              'Elle permet de communiquer avec n\'importe quelle IA dans n\'importe quelle langue automatiquement.',
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 'reflechir',
        title: 'Réfléchir',
        icon: Brain,
        introduction: `La méthode RCTF structure votre pensée au moment de questionner l'IA. En la découvrant, vous réalisez peut-être qu'il y avait des dimensions entières que vous omettiez dans vos demandes initiales. Certes, tout structurer peut sembler laborieux au début, mais les bénéfices en efficacité et en précision sont rapidement au rendez-vous. Il est utile de réfléchir à quel pilier vous négligez le plus souvent et pourquoi, afin de corriger le tir. De plus, se demander comment cette façon de formuler peut s'intégrer dans votre flux de travail quotidien vous aidera à l'adopter durablement.`,
        reflectionQuestions: [
          'Parmi les quatre piliers du RCTF (Rôle, Contexte, Tâche, Format), lequel vous semble le plus facile à oublier ou à négliger lorsque l\'on débute dans la rédaction de prompts ? Pourquoi pensez-vous que ce pilier passe souvent à la trappe, et quelles pourraient être les conséquences de son oubli sur la réponse de l\'IA ?',
          'En quoi le fait de spécifier le Format attendu de la réponse vous fait-il gagner du temps lors de la conception de vos supports de formation ? Donnez un exemple concret.',
          'Rappelez-vous un prompt peu efficace que vous avez peut-être utilisé dans le passé. En vous appuyant sur la méthode RCTF, comment pourriez-vous le réécrire aujourd\'hui pour obtenir un bien meilleur résultat ?',
        ],
      },
      {
        id: 'appliquer',
        title: 'Appliquer',
        icon: PenTool,
        exercise: `Reprenez un prompt très basique (et peu clair) que vous avez déjà utilisé ou que vous imaginez utiliser, par exemple : « Fais-moi une présentation sur la formation en ligne. »

Appliquez la méthode RCTF pour le restructurer entièrement. Notez le nouveau prompt structuré ainsi créé, puis comparez mentalement la différence : en quoi le second prompt est-il susceptible de fournir une réponse plus précise et plus exploitable que le premier ?`,
        duration: '5 minutes',
      },
    ],
  },

  // ============================================================
  // LEÇON 1.4 - Le Rôle (Persona) : La Clé de l'Expertise
  // ============================================================
  {
    id: 4,
    title: 'Le Rôle (Persona) : La Clé de l\'Expertise',
    moduleTitle: 'Devenir prompt designer',
    duration: '15 min',
    type: 'video',
    sections: [
      {
        id: 'engager',
        title: 'Engager',
        icon: Lightbulb,
        content: `Le premier pilier de la méthode RCTF, c'est le Rôle que vous assignez à l'IA. Et ce n'est pas un détail cosmétique : demander à l'IA d'agir comme un « expert en andragogie » ou comme un « développeur web » peut complètement changer la nature de la réponse. En quelque sorte, le rôle sert de filtre d'expertise pour l'IA. Avec le bon persona, l'IA puisera dans les connaissances et le style d'un domaine spécifique, ce qui donne des réponses plus pertinentes et ciblées.

Imaginez que l'IA soit un caméléon intellectuel : elle peut prendre la couleur (le style, le jargon, la perspective) de l'expert que vous lui désignez. Cette leçon va vous montrer comment exploiter cette capacité pour orienter l'IA exactement vers l'angle d'expertise que vous souhaitez, afin d'obtenir des réponses taillées sur mesure pour vos besoins pédagogiques.`,
      },
      {
        id: 'decouvrir',
        title: 'Découvrir',
        icon: Brain,
        subsections: [
          {
            title: 'D1 : Le Rôle comme Filtre de Connaissance',
            content: `Le Rôle (le « R » de RCTF) agit comme un filtre à travers lequel l'IA va puiser ses connaissances et formuler sa réponse. Quand vous spécifiez un rôle, vous dites en quelque sorte à l'IA : « Réponds-moi comme si tu étais tel expert ». Par exemple, si vous commencez votre prompt par « Tu es un expert en andragogie », l'IA va immédiatement adapter son registre de langage, mobiliser ses connaissances en éducation des adultes et structurer sa réponse d'une manière conforme à ce qu'un expert en andragogie dirait. Le rôle défini oriente l'IA vers un sous-ensemble pertinent de son vaste savoir.

Sans ce filtre, l'IA reste un généraliste : sa réponse pourrait mélanger des éléments de divers domaines, ou manquer de profondeur spécialisée. En revanche, avec un rôle précis, vous concentrez l'attention sur un domaine particulier. C'est comme consulter le bon spécialiste pour une question donnée : vous n'auriez pas une réponse identique en posant la même question à un professeur de littérature et à un data scientist. De même, l'IA « teintera » sa réponse différemment selon le rôle que vous lui assignez.

**Illustration** : Visualisez l'IA comme une silhouette neutre entourée d'une énorme bibliothèque. Sans indication de rôle, elle prend au hasard des livres sur les étagères pour répondre. Maintenant, placez une étiquette « Expert en Andragogie » sur cette silhouette : elle ne va plus qu'à la section "Éducation des Adultes" de la bibliothèque. L'image pourrait montrer le robot parcourant uniquement une étagère dédiée (par exemple "Andragogie"), symbolisant que le rôle choisi lui fait filtrer ses sources vers un domaine de connaissance spécifique.`,
          },
          {
            title: 'D2 : L\'Impact sur le Ton',
            content: `Le rôle que vous attribuez à l'IA influence également le ton et le style de la réponse. Un même contenu pourra être formulé de manière très différente selon le persona adoptée. Par exemple, si l'IA « se prend pour » un professeur d'université, elle utilisera un ton formel, un vocabulaire académique et peut-être un style un peu théorique. Si en revanche vous lui dites d'être un animateur de formation pour adolescents, le ton sera plus décontracté, avec des exemples concrets et un langage accessible.

En contraignant ainsi le ton via le rôle, vous rendez la réponse plus adaptée au public que vous visez. Par exemple, « Vous êtes un coach sportif motivant » donnera une réponse énergique et encourageante, alors que « Vous êtes un auditeur financier » produira un texte beaucoup plus carré et prudent. Le rôle agit donc comme un cadre qui guide non seulement les connaissances mobilisées, mais aussi la manière de les exprimer.

**Illustration** : On peut représenter deux bulles de dialogue contenant une explication du même sujet, l'une émanant d'un "Professeur d'université" (langage soutenu, phrases longues, termes techniques), l'autre d'un "Formateur jeunesse" (ton amical, phrases courtes, argot léger). Le contraste visuel entre les deux bulles montre comment le rôle influence immédiatement le style de communication de l'IA.`,
          },
          {
            title: 'D3 : Types de Personas utiles pour le formateur/ID',
            content: `En tant que formateur ou ingénieur pédagogique, vous pouvez exploiter une variété de personas pour obtenir des résultats différents selon vos besoins. Voici quelques rôles particulièrement utiles à envisager :

**Ingénieur Pédagogique Senior** : Idéal pour obtenir des conseils méthodologiques pointus, des structures de cours solides, ou des analyses pédagogiques de haut niveau. L'IA répondra avec le recul et l'expertise d'un professionnel chevronné de la formation.

**Évaluateur certifié** : Utile si vous avez besoin de générer des questions d'évaluation, des QCM ou des quiz conformes à de bonnes pratiques d'évaluation. L'IA, dans ce rôle, insistera sur la clarté des objectifs évalués et proposera des questions bien calibrées.

**Concepteur de jeux pédagogiques (Game Designer)** : Si vous cherchez des idées ludiques pour vos formations (gamification, serious games), ce persona orientera l'IA vers des réponses créatives intégrant du jeu et de l'interactivité.

**Expert sectoriel pointu** : Par exemple, "Expert en droit du travail pour les PME" ou "Spécialiste de la formation en milieu hospitalier". Ce rôle très précis est utile lorsque votre contenu doit coller à un secteur ou une discipline spécifique, avec son jargon et ses contraintes propres.

Ces personas ne sont pas exhaustifs, mais ils montrent que vous pouvez adapter le rôle en fonction du contenu souhaité. N'hésitez pas à être créatif et très spécifique dans la définition du rôle : plus il est détaillé, plus la réponse sera ciblée.`,
          },
          {
            title: 'D4 : La Précision du Rôle',
            content: `Plus un rôle est défini avec précision, meilleure sera la pertinence de la réponse. Dire « Sois un expert » est beaucoup trop vague : expert en quoi ? À l'inverse, spécifier « Tu es un expert en droit du travail spécialisé dans les petites entreprises » donne à l'IA un cadre très étroit et clair. Elle puisera alors préférentiellement dans les connaissances juridiques liées aux PME, et utilisera un langage approprié à ce contexte (par exemple, elle évitera le jargon juridique trop lourd si elle "sait" qu'elle s'adresse à des dirigeants de petites entreprises).

Un rôle généraliste peut conduire l'IA à rester en surface, alors qu'un rôle pointu l'incite à aller dans le détail pertinent. Par ailleurs, un rôle précis limite le risque que l'IA introduise des biais ou des informations hors-sujet, car vous l'avez confinée dans un périmètre de compétences particulier. Enfin, cela vous permet de contrôler le point de vue de la réponse : un "Expert en marketing digital" n'aura pas le même point de vue sur un sujet qu'un "Chercheur en sciences de l'éducation". À vous de choisir la casquette qui servira le mieux votre objectif.`,
          },
        ],
      },
      {
        id: 'quiz',
        title: 'Quiz',
        icon: BookOpen,
        questions: [
          {
            question: 'Quel est le principal effet de préciser un Rôle à l\'IA dans votre prompt ?',
            options: [
              'Cela change l\'algorithme interne de l\'IA.',
              'Cela oriente l\'IA vers un style de réponse et des connaissances propres à un type d\'expert.',
              'Cela augmente la vitesse de réponse de l\'IA.',
              'Cela n\'a pas vraiment d\'effet sur la réponse de l\'IA.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Si vous préparez une simulation d\'entretien de recrutement avec l\'IA, quel rôle serait le plus pertinent à lui donner ?',
            options: [
              'Expert en cuisine française.',
              'Spécialiste en ressources humaines (recruteur).',
              'Ingénieur Pédagogique.',
              'Comptable débutant.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Le rôle influence fortement :',
            options: [
              'Le format de la réponse (tableau, liste, etc.).',
              'Le public qui lira la réponse de l\'IA.',
              'Le ton, le vocabulaire et l\'angle d\'approche de la réponse.',
              'La quantité de tokens utilisés par l\'IA.',
            ],
            correctAnswer: 2,
          },
          {
            question: 'Que risque-t-il de se passer si vous ne spécifiez aucun rôle dans votre prompt ?',
            options: [
              'L\'IA ne répondra pas du tout, faute d\'instructions.',
              'L\'IA choisira automatiquement le meilleur expert à imiter.',
              'La réponse pourrait être très générique ou mélanger des informations de divers domaines.',
              'La réponse sera systématiquement fausse.',
            ],
            correctAnswer: 2,
          },
          {
            question: 'Lequel de ces rôles n\'est probablement pas très utile pour un formateur souhaitant exploiter l\'IA ?',
            options: [
              'Formateur/Ingénieur Pédagogique Senior.',
              'Expert du sujet enseigné (par ex. biologie, droit, informatique…).',
              'Game Designer pédagogique.',
              'Touriste inexpérimenté.',
            ],
            correctAnswer: 3,
          },
          {
            question: 'Pourquoi un rôle du type « Expert en droit du travail pour les PME » est-il préférable à un simple « Expert en droit » pour une question sur les petites entreprises ?',
            options: [
              'Parce que cela fera répondre l\'IA plus longuement.',
              'Parce que cela restreint l\'IA à un domaine très pertinent, évitant des généralités sur le droit qui ne concerneraient pas les PME.',
              'Parce que l\'IA ne connaît pas le droit en général.',
              'Ce n\'est pas préférable, mieux vaut rester large pour avoir plus d\'idées.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Le rôle de "Évaluateur certifié" est particulièrement utile pour :',
            options: [
              'Obtenir des explications théoriques approfondies.',
              'Générer des évaluations et quiz bien construits pour vos apprenants.',
              'Faire de la traduction de documents.',
              'Avoir un style d\'écriture humoristique.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Si vous demandez à l\'IA d\'adopter le rôle d\'un développeur web, à quoi pouvez-vous vous attendre dans la réponse ?',
            options: [
              'À ce que la réponse soit rédigée en code informatique uniquement.',
              'À un ton et un contenu orientés "technique", potentiellement avec du jargon informatique.',
              'À ce que l\'IA refuse de répondre car vous n\'êtes pas vous-même développeur.',
              'À ce que le format de la réponse soit automatiquement un programme exécutable.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Comment le fait de choisir un rôle spécifique peut-il aider à atténuer les biais de l\'IA dans la réponse ?',
            options: [
              'En choisissant un rôle, on peut complètement éliminer toute erreur de l\'IA.',
              'En ciblant un domaine particulier, on évite que l\'IA ne parte dans des considérations hors-sujet ou stéréotypées d\'autres domaines.',
              'Le choix du rôle n\'a aucun lien avec les biais de l\'IA.',
              'En indiquant un rôle, l\'IA devient consciente de ses biais et les corrige.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Que devriez-vous considérer en priorité pour choisir le bon rôle à donner à l\'IA ?',
            options: [
              'Le sujet sur lequel porte votre requête et le point de vue expert qui serait le plus pertinent pour y répondre.',
              'Vos propres goûts personnels en matière de style d\'écriture.',
              'Le premier métier qui vous passe par la tête pour varier les plaisirs.',
              'Le rôle qui, selon vous, donnera la réponse la plus longue possible.',
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'reflechir',
        title: 'Réfléchir',
        icon: Brain,
        introduction: `Spécifier un rôle pour l'IA permet de choisir une perspective experte, de maîtriser d'éventuels biais et de stimuler la créativité. C'est un outil puissant pour améliorer la qualité des réponses de l'IA, à utiliser avec discernement.

Réflexion : Comment la définition précise des rôles pour l'IA peut-elle transformer votre approche professionnelle et la qualité de vos interactions avec ces technologies ?`,
        reflectionQuestions: [
          'Pour créer une simulation d\'entretien de recrutement réaliste avec l\'IA, quel Rôle précis lui donneriez-vous et pourquoi ? Justifiez en quoi ce choix de persona améliorerait la qualité de la simulation.',
          'Comment le fait de définir un rôle pour l\'IA vous aide-t-il à mieux contrôler le biais potentiel de ses réponses ? Donnez un exemple de biais que vous aimeriez éviter et expliquez quel rôle vous choisiriez dans un prompt pour orienter l\'IA dans la bonne direction.',
          'Pensez à un projet ou un contenu pédagogique sur lequel vous travaillez ou envisagez de travailler. Identifiez un rôle d\'IA qui pourrait vous aider à avancer sur ce projet. Comment ce choix de rôle pourrait-il enrichir votre travail ?',
        ],
      },
      {
        id: 'appliquer',
        title: 'Appliquer',
        icon: PenTool,
        exercise: `Prenez une tâche pédagogique que vous connaissez bien. Rédigez deux prompts différents pour cette même tâche, en ne changeant que le rôle assigné à l'IA. 

Pour chacun des deux prompts, gardez le reste de la demande identique. 

Exécutez-les et comparez : en quoi les réponses diffèrent-elles ? Quel rôle a produit les objectifs les plus pertinents ou les plus innovants selon vous ?`,
        duration: '5 minutes',
      },
    ],
  },

  // ============================================================
  // LEÇON 1.5 - Le Contexte : Fournir le cadre de référence
  // ============================================================
  {
    id: 5,
    title: 'Le Contexte : Fournir le cadre de référence',
    moduleTitle: 'Devenir prompt designer',
    duration: '15 min',
    type: 'text',
    sections: [
      {
        id: 'engager',
        title: 'Engager',
        icon: Lightbulb,
        content: `Après le rôle, le deuxième pilier crucial est le Contexte. Pensez-y comme la carte que vous fournissez à l'IA pour l'orienter. Avez-vous déjà reçu de l'IA une réponse trop générale, qui semblait ignorer les spécificités de votre secteur ou de votre situation ? C'est souvent parce que vous ne lui aviez pas donné assez de contexte ! Sans ces repères, l'IA ne peut pas deviner les particularités de votre domaine ni les contraintes de votre demande.

Le contexte, c'est tout ce qui entoure votre demande : le public visé, la durée, le niveau d'expertise attendu, le type de projet, les contraintes éventuelles, etc. En fournissant ce cadre de référence, vous évitez de vous retrouver avec une réponse "hors sol" et vous guidez l'IA pour qu'elle reste pertinente et en phase avec votre réalité professionnelle.`,
      },
      {
        id: 'decouvrir',
        title: 'Découvrir',
        icon: Brain,
        subsections: [
          {
            title: 'D1 : Le Contexte comme Environnement',
            content: `Le Contexte (le « C » de RCTF) désigne l'ensemble des informations sur l'environnement et les contraintes de votre demande. Il s'agit de situer la tâche à réaliser dans un cadre concret. Par exemple, cela peut inclure :

• **La durée ou l'ampleur** : « formation de 2 heures », « module e-learning de 30 minutes », « programme de 3 jours »...
• **Le public cible** : « managers débutants », « étudiants en licence », « techniciens expérimentés »...
• **Les objectifs finaux** : « en vue d'une certification X », « pour préparer une conférence »...
• **Le contexte physique ou modalité** : « en présentiel », « à distance », « en situation de travail réelle »...
• **Toute contrainte particulière** : « budget limité », « cadre réglementé strict (loi XYZ) », « forte contrainte de temps, planning serré »...

En gros, le contexte répond aux questions : où et dans quelles conditions s'inscrit la demande ? En donnant ces détails, vous créez un environnement fictif que l'IA va respecter dans sa réponse. Par exemple, si vous précisez « pour un public de nouveaux managers dans la restauration rapide », l'IA adaptera spontanément son propos à un tel public (peut-être en étant très concret et orienté terrain, compte tenu du profil visé).

Le contexte fourni sert de bornes et de repères : il oriente la réponse comme des rails orientent un train.`,
          },
          {
            title: 'D2 : Contraste Rôle vs. Contexte',
            content: `Il est important de bien distinguer le rôle et le contexte : ce sont deux ingrédients différents. Le **Rôle** définit qui parle (l'IA se fait passer pour tel ou tel expert), tandis que le **Contexte** définit dans quelle situation on se trouve. On peut dire que le rôle est du côté de l'IA (sa casquette d'expert), alors que le contexte est du côté du projet ou de la mission à accomplir.

Prenons un cas concret : vous voulez que l'IA rédige un tutoriel technique pour des débutants en informatique. Vous pourriez définir le **rôle** comme « expert en informatique pédagogue » (ainsi l'IA répond comme un formateur informatique) et le **contexte** comme « tutoriel de 1h pour des adultes débutant en programmation, dans un contexte de formation continue en entreprise ».

Si vous ne mettiez que le rôle, l'IA aurait le bon ton expertise pédagogique, mais ne connaîtrait pas le niveau du public ni le format (1h en formation continue) : elle risquerait de proposer quelque chose d'inadapté (trop difficile ou trop long par exemple). Si vous ne mettiez que le contexte sans rôle, l'IA saurait de quel public on parle et la durée, mais peut-être répondrait sur un ton plus quelconque, sans s'adapter en style comme un "expert pédagogue" l'aurait fait.

Rôle et contexte sont complémentaires : le rôle donne la perspective experte et le ton, le contexte apporte la pertinence et l'ancrage pratique. L'un ne remplace pas l'autre, et ensemble ils posent les bases d'une réponse de qualité.`,
          },
          {
            title: 'D3 : Le Contexte Textuel Direct',
            content: `La façon la plus simple d'inclure du contexte dans un prompt, c'est de l'écrire noir sur blanc dans votre consigne. Par exemple, après avoir indiqué le rôle, vous pouvez ajouter quelque chose comme : « **Contexte** : formation express de 2h, en présentiel, pour des employés d'un fast-food prenant un poste de manager, mettant l'accent sur la gestion du stress en situation de rush. » 

En intégrant ces informations directement dans le texte du prompt, vous donnez à l'IA toutes les clés pour comprendre le cadre de sa réponse.

Il est souvent efficace de présenter le contexte comme une liste de faits ou de contraintes au sein du prompt, ou en une phrase bien fournie. L'important est que toutes les informations cruciales y soient. Soyez précis mais concis : inutile d'écrire un roman, car trop de contexte pourrait embrouiller l'IA. Si certains détails contextuels vous semblent fondamentaux (comme des normes à respecter, ou un événement déclencheur), mentionnez-les également.

En résumé, la méthode de base pour le contexte est : on inclut directement dans le prompt tout ce qui pourrait influencer la réponse attendue, un peu comme on brieferait un collègue sur le projet avant de lui demander de produire quelque chose.`,
          },
          {
            title: 'D4 : Introduction au Contexte par Données (RAG)',
            content: `En plus du texte que vous écrivez, il est également possible de fournir du contexte à l'IA via des données ou des documents externes. C'est ce qu'on appelle la méthode **RAG (Retrieval-Augmented Generation)**. L'idée est de donner accès à l'IA à des ressources spécifiques (vos documents de cours, un article de loi, un guide interne, etc.) afin qu'elle s'en serve pour formuler la réponse.

Si vous voulez que l'IA rédige un quiz en s'appuyant exactement sur le contenu d'un module e-learning que vos apprenants ont lu, vous pourriez intégrer ou attacher des extraits de ce manuel dans votre prompt. L'IA utilisera alors ces données comme contexte pour construire ses réponses, vous garantissant qu'elle ne sortira pas du cadre de vos sources. Cela évite qu'elle invente des informations ou qu'elle reste trop générique, car vous la nourrissez avec votre matière première.

À notre niveau d'utilisation courante (comme avec ChatGPT standard), intégrer un document signifie souvent le copier-coller (en partie, selon la limite de mémoire) dans le prompt. Les solutions avancées permettent d'uploader des fichiers ou d'avoir une base de connaissances que l'IA peut consulter.

Sans entrer dans les détails techniques, retenez que fournir du contexte par les données est une astuce puissante pour garder le contrôle du contenu. C'est particulièrement utile dans des domaines pointus ou réglementés où vous voulez que l'IA s'aligne exactement sur vos informations fiables plutôt que sur sa connaissance générale (qui pourrait dater ou être approximative).`,
          },
        ],
      },
      {
        id: 'quiz',
        title: 'Quiz',
        icon: BookOpen,
        questions: [
          {
            question: 'Le Contexte dans un prompt sert principalement à :',
            options: [
              'Indiquer le style d\'écriture attendu.',
              'Fournir les informations d\'environnement et les contraintes pour cadrer la réponse de l\'IA.',
              'Donner le rôle exact que l\'IA doit jouer.',
              'Allonger le prompt pour occuper la mémoire de l\'IA.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Laquelle des informations suivantes est un exemple typique d\'information de Contexte et non de rôle ?',
            options: [
              '« Vous êtes un expert en cybersécurité. »',
              '« Le public est composé d\'étudiants en première année d\'université. »',
              '« Adopte un ton humoristique. »',
              '« Réponds en espagnol d\'Amérique latine. »',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Si l\'on veut que l\'IA génère un contenu adapté à des infirmiers en hôpital, quelle information de contexte serait la plus pertinente ?',
            options: [
              'Préciser que l\'IA est un médecin chef.',
              'Indiquer que le contenu s\'inscrit « dans le cadre d\'une formation continue pour des infirmiers en milieu hospitalier ».',
              'Demander un format de réponse en forme de dossier médical.',
              'Exiger un ton extrêmement technique et scientifique.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Pourquoi est-il important d\'inclure le contexte lorsque l\'on travaille sur un sujet très réglementé (par ex. la sécurité au travail) ?',
            options: [
              'Pour que l\'IA écrive plus de texte que d\'habitude.',
              'Pour que l\'IA sache quelles règles ou normes spécifiques respecter dans sa réponse.',
              'Pour remplacer le rôle, qui devient inutile dans ce cas.',
              'Ce n\'est pas nécessaire, l\'IA connaît déjà toutes les réglementations à jour.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'La méthode RAG (Retrieval-Augmented Generation) consiste à :',
            options: [
              'Demander à l\'IA de se relire elle-même et d\'augmenter le nombre de mots.',
              'Utiliser un rôle humoristique pour détendre l\'atmosphère avant la génération.',
              'Fournir à l\'IA des documents ou données spécifiques afin qu\'elle les utilise comme contexte pour sa réponse.',
              'Réinitialiser complètement la mémoire de l\'IA avant chaque nouvelle question.',
            ],
            correctAnswer: 2,
          },
          {
            question: 'Parmi ces choix, qu\'est-ce qui relève du Contexte dans un prompt ?',
            options: [
              '« sous la forme d\'une liste à puces »',
              '« formation en présentiel de 4 heures, niveau débutant »',
              '« Vous êtes un consultant en management »',
              '« rédige 3 paragraphes maximum »',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Quelle différence y a-t-il entre spécifier un rôle et spécifier le contexte ?',
            options: [
              'Le rôle donne le qui (l\'expert simulé), le contexte donne le quoi/où/quand (la situation et les contraintes).',
              'Il n\'y a aucune différence, c\'est synonyme.',
              'Le rôle est plus important, on peut se passer du contexte.',
              'Le contexte dicte le style de langage, le rôle dicte le format de sortie.',
            ],
            correctAnswer: 0,
          },
          {
            question: 'Si l\'IA a produit un contenu trop général et pas assez ancré dans votre réalité professionnelle, quelle pourrait en être la cause la plus probable ?',
            options: [
              'Vous n\'avez pas demandé le bon format de réponse.',
              'Le contexte fourni était insuffisant ou inexistant, donc l\'IA est restée dans le vague.',
              'Vous auriez dû choisir un autre rôle plus spécialisé.',
              'L\'IA n\'est pas capable de gérer des demandes spécifiques.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Dans quel cas est-il judicieux d\'envisager d\'utiliser des documents externes comme contexte supplémentaire pour l\'IA ?',
            options: [
              'Lorsque la réponse attendue doit être précisément alignée sur un contenu existant (manuel, réglementation spécifique).',
              'Lorsque le prompt dépasse déjà la limite de longueur autorisée.',
              'Pour les demandes très générales, afin de fournir plus de texte à l\'IA.',
              'Jamais, il vaut mieux laisser l\'IA se baser uniquement sur sa connaissance interne.',
            ],
            correctAnswer: 0,
          },
          {
            question: 'Le contexte est particulièrement crucial pour assurer la pertinence de la réponse, tandis que le rôle l\'est pour assurer la qualité/expertise. Laquelle des situations suivantes illustre bien ce principe ?',
            options: [
              'Préciser le contexte (« formation pour commerciaux terrain ») fait que l\'IA proposera des exemples liés à la vente, tandis que préciser le rôle (« expert en vente ») garantit que les conseils seront pointus et adaptés aux commerciaux.',
              'Le contexte permet d\'avoir moins de fautes d\'orthographe, le rôle garantit zéro plagiat.',
              'Le contexte augmente la longueur de la réponse, le rôle augmente sa créativité.',
              'Le contexte rend le prompt plus poli, le rôle le rend plus directif.',
            ],
            correctAnswer: 0,
          },
        ],
      },
      {
        id: 'reflechir',
        title: 'Réfléchir',
        icon: Brain,
        introduction: `Pour des secteurs réglementés (santé, finance), fournir le contexte (lois, normes) est indispensable pour des réponses IA pertinentes et conformes, évitant les erreurs. C'est l'étape préparatoire clé, nécessitant de prioriser les informations critiques. Un équilibre est nécessaire : trop de contexte noie l'IA, pas assez la rend floue. En somme, l'IA doit savoir ce qui est essentiel sur votre situation pour vous aider efficacement.`,
        reflectionQuestions: [
          'Si vous devez créer une évaluation pour un secteur très réglementé, quelle information de contexte serait la plus critique à fournir à l\'IA dans votre prompt ?',
          'Pourquoi peut-on dire que le contexte est crucial pour la pertinence de la réponse de l\'IA, alors que le rôle l\'est pour la qualité ? Reformulez cette idée avec vos propres mots et, si possible, avec un exemple : comment l\'un et l\'autre se complètent pour atteindre une réponse à la fois pertinente et de qualité.',
          'Selon vous, y a-t-il un risque à fournir trop de contexte à l\'IA ? Quelles pourraient être les conséquences d\'un prompt surchargé d\'informations contextuelles inutiles ou trop détaillées, et comment décider des informations essentielles à inclure pour guider l\'IA sans la "noyer" ?',
        ],
      },
      {
        id: 'appliquer',
        title: 'Appliquer',
        icon: PenTool,
        exercise: `Mettez-vous en situation : vous devez créer une formation sur la "gestion des conflits" destinée à des managers dans le secteur de la restauration rapide. 

Rédigez la section **Contexte** du prompt que vous adresserez à l'IA pour l'aider à générer du contenu pertinent. 

Incluez les informations importantes telles que la nature du public, les contraintes de leur environnement de travail, et toute contrainte de durée ou d'objectif. 

Cet exercice vous entraînera à formuler un contexte clair et complet, qui servira de boussole à l'IA pour produire une réponse adaptée.`,
        duration: '5 minutes',
      },
    ],
  },

  // ============================================================
  // LEÇON 1.6 - La Tâche et le Format : Préciser la Mission et la Forme
  // ============================================================
  {
    id: 6,
    title: 'La Tâche et le Format : Préciser la Mission et la Forme',
    moduleTitle: 'Devenir prompt designer',
    duration: '20 min',
    type: 'video',
    sections: [
      {
        id: 'engager',
        title: 'Engager',
        icon: Lightbulb,
        content: `Après le rôle et le contexte, il reste deux piliers essentiels : la Tâche et le Format, c'est-à-dire le "quoi" et le "comment" de votre requête. En maîtrisant ces deux aspects, vous allez obtenir de l'IA un livrable presque prêt à l'emploi, exactement dans la forme souhaitée. Posez-vous la question : quel est le point commun entre un bon prompt et un bon brief ? Dans les deux cas, on utilise des verbes d'action précis et on indique clairement le résultat attendu !

Cette leçon va vous montrer comment contrôler à la fois ce que vous demandez (la mission précise que l'on confie à l'IA) et la manière dont la réponse doit être présentée. Vous verrez qu'en étant explicite sur ces points, vous gagnerez un temps fou lors de l'exploitation du résultat.`,
      },
      {
        id: 'decouvrir',
        title: 'Découvrir',
        icon: Brain,
        subsections: [
          {
            title: 'D1 : La Tâche – Le Verbe d\'Action Spécifique',
            content: `Le composant **Tâche** de votre prompt correspond à l'action exacte que vous voulez que l'IA réalise. Il est primordial de le formuler avec un verbe d'action clair et spécifique. C'est un peu l'instruction verbeuse qui guide l'IA. Par exemple, "Génère un résumé de…", "Analyse les différences entre…", "Compare X et Y en termes de…", "Liste quatre avantages de…", "Synthétise les idées clés de…". Ces verbes d'action (générer, analyser, comparer, lister, synthétiser, etc.) orientent l'IA vers le type de travail à effectuer.

Pourquoi est-ce si important ? Parce qu'un verbe précis enlève l'ambiguïté. Si vous dites simplement "Parle de X", l'IA ne sait pas si elle doit expliquer, narrer, argumenter, ou juste donner une opinion personnelle (générale). Tandis que "Compare X et Y selon ces critères" ou "Donne-moi un exemple de…" élimine toute hésitation sur la nature de la tâche. 

En tant que formateur, vous savez l'importance d'un bon verbe d'objectif pédagogique : ici c'est pareil, choisissez un verbe qui correspond exactement au résultat que vous souhaitez. Cela évitera d'avoir une réponse à côté de la plaque ou d'un niveau inapproprié.

En résumé, définissez clairement **quoi faire** – l'IA exécutera précisément cette mission.`,
          },
          {
            title: 'D2 : Le Format – La Contrainte de Mise en Page',
            content: `Passons au **Format**, le "F" de RCTF. C'est la partie où vous indiquez la forme que doit prendre la réponse. Voulez-vous un paragraphe argumentatif ? Une liste de bullet points ? Un tableau comparatif ? C'est ici qu'il faut le préciser. Le format joue le rôle de contrainte de mise en page ou de structure du résultat.

En dictant le format, vous guidez l'IA sur **comment** présenter ses idées. Par exemple, "présente la réponse sous forme de tableau avec deux colonnes : méthode A vs méthode B" ou « donne la réponse sous forme de liste numérotée ». C'est très utile car l'IA peut formater ses réponses de multiples façons ; si vous ne dites rien, elle choisira peut-être un format standard (souvent du texte en paragraphes) qui ne sera pas forcément le plus pratique pour vous.

Considérez le format comme le **gabarit de sortie**. En lui imposant un gabarit, vous obtenez un contenu bien organisé, facile à lire ou à réutiliser. C'est particulièrement appréciable quand on veut intégrer la réponse dans un document de formation : autant qu'elle soit déjà structurée de la bonne manière !

N'hésitez pas à être précis : par exemple "réponse attendue en 3 paragraphes courts" ou "sous forme de plan détaillé en sections et sous-sections" si c'est ce qu'il vous faut.`,
          },
          {
            title: 'D3 : Les Formats efficaces pour l\'Ingénierie Pédagogique',
            content: `Certains formats de sortie sont particulièrement utiles dans notre domaine (formation/ingénierie pédagogique) car ils permettent d'exploiter directement les réponses de l'IA. En voici quelques-uns à considérer :

**Tableau Markdown** : Demander une réponse sous forme de tableau (en Markdown par ex.) est très pratique pour comparer des informations, créer des plannings, des matrices d'objectifs, etc. Le tableau peut avoir des colonnes que vous spécifiez à l'avance (par ex. "Concept | Définition | Exemple concret").

**QCM avec distracteurs et justifications** : Vous pouvez demander à l'IA de générer des questions à choix multiple en précisant : "pour chaque question, fournis 4 options (3 fausses, 1 vraie) et indique la bonne réponse avec une explication". Vous obtenez ainsi un quiz quasi-prêt, où chaque distracteur (fausse réponse) est déjà pensé, et la justification de la bonne réponse est fournie.

**Plan structuré** : Si vous avez besoin d'une trame de cours ou d'un plan de module, demandez un plan détaillé avec des sections et sous-sections. Par exemple : "donne-moi un plan détaillé en 5 parties avec titres et sous-titres". L'IA produira une structure hiérarchisée que vous pourrez facilement reprendre.

**Fiche synthèse en bullet points** : Demander une liste de puces pour résumer un sujet ("Donne les points clés sous forme de liste à puces") permet d'obtenir une synthèse concise, idéale pour des supports visuels ou des mémos.

Ce ne sont que des exemples, mais l'idée est que vous pouvez calibrer la forme de la réponse selon ce qui vous sera le plus utile. Pensez à l'usage final du contenu généré : s'il doit aller dans une présentation, une liste ou un tableau seront plus commodes qu'un gros pavé de texte. S'il doit servir de questionnaire, le format QCM est roi, etc.`,
          },
          {
            title: 'D4 : L\'Exigence de Précision',
            content: `Exiger un format structuré précis dans votre prompt peut vous épargner 80% du travail de mise en page par la suite. En effet, si l'IA vous donne déjà un tableau bien présenté, vous n'aurez pas à extraire les données d'un paragraphe pour les mettre en tableau vous-même. De même, si elle fournit un quiz directement formaté, vous n'aurez pas à reformuler les fausses réponses ou à inventer des explications sur le bon choix : tout est là !

Plus vous êtes précis dans votre demande, moins vous aurez à intervenir après coup. Bien sûr, il faudra peut-être ajuster quelques détails, vérifier la véracité des informations (toujours), ou adapter légèrement le style. Mais la structure sera en place, ce qui représente un gain de temps considérable. Imaginez devoir transformer 2 pages de texte en une liste de points clés, fastidieux, n'est-ce pas ? Alors que dire dès le départ "donne 10 points clés sous forme de liste numérotée" vous évite ce travail.

En outre, cette précision habituera l'IA à vous donner exactement ce que vous voulez, de façon uniforme. Sur des projets longs, c'est précieux : chaque partie générée aura le format voulu et vous n'aurez pas des morceaux disparates. Finalement, "qui peut le plus peut le moins" : il vaut mieux sur-spécifier votre besoin (quitte à avoir une réponse un peu rigide que vous assouplirez) que sous-spécifier et recevoir un contenu inutilisable sans heavy-editing.`,
          },
        ],
      },
      {
        id: 'quiz',
        title: 'Quiz',
        icon: BookOpen,
        questions: [
          {
            question: 'Pour demander à l\'IA de comparer deux méthodes de formation, quelle formulation de tâche et de format serait la plus appropriée ?',
            options: [
              '« Parle des méthodes de formation A et B de manière générale. »',
              '« Compare la méthode A et la méthode B en détail, et présente la comparaison sous forme de tableau avec deux colonnes (A vs B). »',
              '« Donne-moi un avis sur A et B, n\'importe quel format fera l\'affaire. »',
              '« Écris tout ce que tu sais sur A et B. »',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Quel est le rôle du verbe d\'action dans la composante Tâche d\'un prompt ?',
            options: [
              'À décorer le prompt pour impressionner l\'IA.',
              'À indiquer précisément à l\'IA quelle action effectuer (expliquer, lister, analyser…).',
              'À limiter la longueur de la réponse de l\'IA.',
              'À définir le style (humoristique, formel) de la réponse de l\'IA.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'La composante Format d\'un prompt sert à :',
            options: [
              'Spécifier la structure ou la présentation désirée de la réponse (liste, tableau, etc.).',
              'Indiquer l\'argument principal de la réponse.',
              'Traduire la réponse dans une autre langue.',
              'Demander à l\'IA d\'ignorer certaines informations.',
            ],
            correctAnswer: 0,
          },
          {
            question: 'Lequel des formats suivants n\'est PAS explicitement cité comme utile pour un ingénieur pédagogique dans cette leçon ?',
            options: [
              'Tableau Markdown',
              'Diaporama PowerPoint automatique',
              'QCM avec distracteurs et justifications',
              'Plan détaillé structuré',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Quel avantage principal y a-t-il à demander un format spécifique (par ex. "liste à puces", "tableau") dans votre prompt ?',
            options: [
              'Cela augmente la créativité de l\'IA.',
              'Cela réduit drastiquement le travail de mise en page ou de restructuration après coup.',
              'Cela rend la réponse plus courte.',
              'Cela permet à l\'IA de comprendre le sujet plus facilement.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Si l\'IA fournit un long paragraphe alors que vous vouliez des points séparés, quelle erreur probable avez-vous commise dans votre prompt ?',
            options: [
              'Vous n\'avez pas précisé le format de réponse attendu (par exemple sous forme de liste).',
              'Vous avez utilisé un verbe d\'action trop précis.',
              'Vous avez défini un rôle inutile.',
              'Vous avez donné trop de contexte sans poser de question.',
            ],
            correctAnswer: 0,
          },
          {
            question: 'Parmi ces demandes, laquelle exprime le plus clairement une Tâche suivie d\'un Format ?',
            options: [
              '« Explique ce qu\'est la motivation des apprenants. »',
              '« Tu es un expert en pédagogie. Motivation des apprenants, développe. »',
              '« Dresse la liste des 5 facteurs de motivation des apprenants adultes et présente-les sous forme de liste à puces. »',
              '« Motivation apprenants : facteurs, etc., en tableau. »',
            ],
            correctAnswer: 2,
          },
          {
            question: 'Imaginons que vous ayez oublié de demander un format structuré et que l\'IA vous ait donné une réponse en vrac. Que pouvez-vous faire pour récupérer la situation ?',
            options: [
              'Rejeter la réponse et abandonner le projet.',
              'Réécrire votre prompt en incluant cette fois une précision de format et re-soumettre la demande à l\'IA.',
              'Forcer manuellement l\'IA à re-formater en tapant "Formate !!!"',
              'Rien, il est impossible d\'obtenir un autre format de réponse de l\'IA.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Comment le fait d\'exiger "Format : Tableau avec colonnes Question/Réponse Correcte/Justification" dans un prompt de génération de quiz vous aide-t-il concrètement ?',
            options: [
              'L\'IA va refuser car c\'est trop complexe à présenter.',
              'Vous obtiendrez directement un tableau où chaque question, sa réponse correcte et l\'explication sont organisées, vous évitant de devoir tout mettre en tableau vous-même.',
              'L\'IA va inventer moins de choses car elle est occupée à faire le tableau.',
              'Le tableau garantit que les réponses de l\'IA seront correctes à 100%.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Pourquoi dit-on qu\'un prompt bien détaillé en Tâche et Format peut éliminer "80% du travail de mise en page" pour le formateur ?',
            options: [
              'Parce que l\'IA fera systématiquement moins de fautes d\'orthographe.',
              'Parce que l\'IA livre un contenu déjà structuré comme voulu, évitant au formateur de le reformatter lui-même (par ex. transformer un texte en tableau ou en liste).',
              'Parce que le formateur n\'aura plus jamais rien à modifier du tout.',
              'Parce que l\'IA utilise 80% de mise en page et 20% de contenu seulement.',
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 'reflechir',
        title: 'Réfléchir',
        icon: Brain,
        introduction: `Préciser la tâche et le format (ex: tableau) dans vos prompts est crucial. Cela sert de cahier des charges à l'IA, garantissant un contenu directement utilisable. Le gain de temps et d'énergie est considérable (un exercice d'une heure passe à 10 minutes de relecture), permettant au formateur de se concentrer sur l'animation et l'interaction humaine. Cette exigence de précision (quel verbe, quel format ?) transforme le pilotage de l'IA en un exercice de clarté des objectifs.`,
        reflectionQuestions: [
          'Selon vous, pourquoi est-il crucial de choisir un verbe d\'action précis (comme analyser, comparer, synthétiser) lorsque vous formulez la Tâche dans un prompt ?',
          'Parmi les différents formats de sortie vus (tableau, QCM, liste, plan structuré, etc.), lequel pensez-vous utiliser le plus dans votre pratique et pourquoi ? Expliquez en quoi ce format correspond bien aux types de contenus que vous devez régulièrement produire ou exploiter.',
          'Avez-vous déjà vécu une situation où la réponse de l\'IA était difficile à exploiter parce que le format n\'était pas adapté ? Comment auriez-vous pu formuler votre demande différemment en amont pour éviter ce problème, et comment allez-vous intégrer cette leçon à l\'avenir ?',
        ],
      },
      {
        id: 'appliquer',
        title: 'Appliquer',
        icon: PenTool,
        exercise: `Rédigez un prompt qui demande explicitement un livrable structuré en deux parties. Pour fixer les idées, prenez le sujet de votre choix (par exemple les avantages comparés de la formation en présentiel versus en ligne). 

Dans ce prompt, indiquez clairement la **Tâche** : par exemple "fournis d'abord une synthèse des points communs et différences entre les deux, puis…" et le **Format** : "...présente ensuite un tableau comparatif listant d'un côté les avantages de la formation en présentiel, de l'autre ceux de la formation en ligne." 

Une fois votre prompt rédigé, observez la réponse de l'IA et vérifiez si elle respecte bien les deux parties et le format demandé. 

Cet exercice vous entraîne à combiner plusieurs exigences dans une même requête.`,
        duration: '5 minutes',
      },
    ],
  },

  // ============================================================
  // LEÇON 1.7 - Gérer la Mémoire de l'IA
  // ============================================================
  {
    id: 7,
    title: 'Gérer la Mémoire de l\'IA',
    moduleTitle: 'Devenir prompt designer',
    duration: '20 min',
    type: 'video',
    sections: [
      {
        id: 'engager',
        title: 'Engager',
        icon: Lightbulb,
        content: `Il vous est peut-être déjà arrivé de travailler longuement avec l'IA, de construire un échange riche… puis de constater soudain qu'elle semble "oublier" ce que vous aviez dit au début. Frustrant ? 

En réalité, ce n'est pas un caprice de la machine, mais une contrainte technique : l'IA a une mémoire à court terme limitée, ce qu'on appelle la fenêtre de contexte. Dans cette leçon, vous allez apprendre pourquoi l'IA oublie et, surtout, comment gérer cette mémoire limitée pour éviter de perdre le fil lors d'une longue co-création.

Comprendre la fenêtre de contexte, c'est comme comprendre que même un excellent apprenant ne peut pas retenir 8 heures de formation sans pause ni rappel. Vous allez découvrir des stratégies pour segmenter votre travail avec l'IA et lui rafraîchir la mémoire lorsque c'est nécessaire, afin de mener à bien des tâches longues sans accroc.`,
      },
      {
        id: 'decouvrir',
        title: 'Découvrir',
        icon: Brain,
        subsections: [
          {
            title: 'D1 : Définition de la Contrainte',
            content: `La **fenêtre de contexte** désigne la quantité de texte (en nombre de "tokens", unités de mots environ) que l'IA peut prendre en compte à la fois dans la conversation. Imaginez-la comme la mémoire immédiate de l'IA. Par exemple, si la fenêtre est de 4000 tokens, cela inclut votre question et sa réponse. Si votre historique d'échange dépasse ce volume, l'IA ne "voit" plus ce qui a été dit au-delà de cette limite.

Concrètement, cela signifie que l'IA n'a pas une mémoire infinie de tout ce que vous avez pu lui dire depuis le début de la session. Elle n'a pas "oublié" au sens humain, mais tout simplement, les premières instructions sont sorties de sa « zone d'attention » actuelle. Chaque fois que vous ajoutez du texte, vous consommez des tokens dans cette fenêtre. Une fois la limite atteinte, les éléments les plus anciens sortent de la fenêtre, comme un texte qu'on ferait défiler hors de l'écran.`,
          },
          {
            title: 'D2 : Conséquences de la Saturation',
            content: `Que se passe-t-il une fois que la fenêtre de contexte est "pleine" et que votre conversation continue ? Les conséquences pratiques sont que l'IA ne se souvient plus des instructions ou détails que vous aviez fournis au début. Elle risque alors de vous demander des informations que vous aviez déjà données, de contredire des éléments établis plus tôt, ou de produire des réponses moins cohérentes parce qu'elle n'a plus en tête le fil directeur initial.

Dans un projet long (par exemple, co-créer tout un module de formation de plusieurs heures), vous pourriez ainsi constater qu'au bout d'un moment, l'IA commence à diverger : un personnage changé de nom, une contrainte oubliée, un style qui redevient générique alors que vous l'avez spécifié. C'est le signal que la fenêtre de contexte a été dépassée et que les informations initiales ont été perdues de vue. Parfois, on a l'impression de repartir de zéro en cours de route : c'est exactement ça, l'IA fonctionne alors comme si elle n'avait jamais vu ce que vous avez écrit avant ce qui reste dans la fenêtre.

La conséquence extrême peut être de devoir tout recommencer ou de passer du temps à réintroduire manuellement ce qui a été oublié. Cela peut être chronophage si l'on n'y prend garde. Mais rassurez-vous, il existe des stratégies pour minimiser ce problème et garder l'IA sur les rails malgré la longueur de la conversation.`,
          },
          {
            title: 'D3 : Stratégies de Découpage',
            content: `La première méthode pour gérer la limite de la fenêtre de contexte, c'est de **découper la tâche en segments plus petits et autonomes**. Au lieu de faire une énorme demande unique ou une seule conversation fleuve, planifiez votre projet en étapes :

**1. Identifiez des sous-tâches logiques.** Par exemple, si vous créez un module de 8 heures, divisez-le en chapitres ou en sections (peut-être 8 sessions d'1 heure chacune, par exemple).

**2. Traitez chaque partie séparément avec l'IA.** Vous pouvez commencer une nouvelle session de discussion pour chaque section, ou au moins clôturer un sujet avant d'entamer le suivant.

**3. Si certaines informations doivent se répéter d'une partie à l'autre** (par exemple le public cible, ou le style global), n'hésitez pas à les rappeler au début de chaque nouvelle section de travail.

Cette approche en sous-tâches permet de rester bien en deçà de la limite mémoire à chaque fois. C'est comme écrire un livre chapitre par chapitre, plutôt que tout d'un coup. En plus de ménager la mémoire de l'IA, cela vous permet, vous, de faire des pauses et de valider étape par étape.

Une autre stratégie : si vous devez absolument traiter une longue suite, envisagez de demander à l'IA de résumer ou synthétiser périodiquement ce qui a été fait, puis de repartir de ce résumé dans un nouveau prompt. Ce résumé servira de mémo condensé qui tient dans la fenêtre et rappelle l'essentiel.

Enfin, soyez concis dans vos instructions pour « économiser de la place ». Inutile de répéter mot pour mot de longs paragraphes de contexte à chaque fois si un rappel plus bref suffit.`,
          },
          {
            title: 'D4 : Le Rappel de Contexte',
            content: `Même avec un découpage judicieux, il est souvent nécessaire de **rafraîchir la mémoire de l'IA** en cours de route. Cela consiste à réintroduire dans un nouveau prompt les éléments cruciaux du contexte initial ou des décisions déjà prises, afin de recadrer l'IA.

Par exemple, si dans un long échange vous avez établi au début que l'IA doit adopter le rôle d'un expert bien précis, n'hésitez pas, quelques prompts plus tard (ou au début d'une nouvelle session), à redire : « **Rappel : tu es toujours notre expert en X s'adressant à tel public.** » De même, pour des contraintes importantes : « **(En te basant sur le contexte précédent : formation de 2h pour novices…)** ». Ce type de phrase d'introduction remet en haut de la pile les informations que l'IA risquait d'oublier.

Vous pouvez aussi conserver un "mémo" des points clés sur le côté et les copier-coller au besoin. C'est un peu comme donner à l'IA un post-it avec les infos essentielles dont elle doit se souvenir quoi qu'il arrive.

L'idée est d'anticiper l'oubli en incorporant soi-même de petits rappels dans les instructions. Cela peut être tous les X échanges, ou à chaque grand changement de tâche. Attention à ne pas saturer inutilement en répétant tout tout le temps, mais trouvez le juste milieu : rappeler les contraintes critiques au bon moment.`,
          },
        ],
      },
      {
        id: 'quiz',
        title: 'Quiz',
        icon: BookOpen,
        questions: [
          {
            question: 'Qu\'est-ce que la "fenêtre de contexte" d\'une IA en termes simples ?',
            options: [
              'La durée pendant laquelle l\'IA fonctionne avant de s\'éteindre.',
              'La quantité limitée d\'informations (dialogue) que l\'IA peut garder à l\'esprit à un moment donné.',
              'Le temps d\'attente nécessaire entre deux questions à l\'IA.',
              'Une option de l\'interface utilisateur de l\'IA pour changer le thème visuel.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Quelle est la conséquence principale lorsque la fenêtre de contexte est dépassée pendant une longue conversation avec l\'IA ?',
            options: [
              'L\'IA arrête de répondre complètement.',
              'L\'IA oublie les premières instructions ou informations de la conversation, pouvant entraîner des incohérences.',
              'L\'IA se met à répondre de plus en plus lentement.',
              'L\'IA se met à donner des réponses aléatoires sans rapport.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Comment pouvez-vous suspecter que l\'IA a "oublié" certaines de vos consignes initiales au cours d\'un échange ?',
            options: [
              'Elle commence à vous poser des questions personnelles.',
              'Elle produit une réponse qui contredit ou ignore des éléments que vous aviez fournis auparavant.',
              'Elle devient soudainement très concise.',
              'Elle change de langue de réponse sans raison.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Laquelle de ces méthodes est efficace pour éviter de dépasser la limite de la fenêtre de contexte dans un projet volumineux ?',
            options: [
              'Diviser le projet en plusieurs sous-tâches et traiter chacune séparément avec l\'IA.',
              'Écrire toutes vos instructions en majuscules pour que l\'IA les retienne mieux.',
              'Utiliser un langage très vague pour économiser des mots.',
              'Recommencer la conversation entière à chaque nouvelle question même si c\'est la suite logique.',
            ],
            correctAnswer: 0,
          },
          {
            question: 'Que signifie l\'approche "diviser pour régner" dans le contexte de l\'utilisation de l\'IA ?',
            options: [
              'Utiliser plusieurs IA en parallèle pour un même projet.',
              'Segmenter une tâche complexe en segments plus petits gérables afin de rester dans les limites de mémoire de l\'IA.',
              'Alterner entre différents rôles dans un même prompt.',
              'Faire travailler l\'IA seulement 20% du temps et le reste du temps réfléchir par soi-même.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Pourquoi est-il recommandé d\'être concis dans ses instructions lors d\'une longue collaboration avec l\'IA ?',
            options: [
              'Parce que l\'IA n\'aime pas lire les longues consignes.',
              'Pour économiser de l\'espace dans la fenêtre de contexte et pouvoir en dire plus avant de la saturer.',
              'Pour que l\'IA réponde plus vite (moins elle lit, plus vite elle écrit).',
              'Parce que les détails contextuels n\'ont pas d\'importance pour l\'IA.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Quelle stratégie peut-on utiliser si on a besoin de se rappeler des points importants établis plus tôt dans la conversation ?',
            options: [
              'Toujours menacer l\'IA de redémarrage si elle se trompe.',
              'Copie-coller les éléments clés de contexte ou d\'instructions dans un nouveau prompt pour les réintroduire.',
              'Ignorer le problème, il n\'y a rien à faire.',
              'Augmenter la taille de la fenêtre de contexte manuellement dans les paramètres (option inexistante).',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Que peut-on faire si l\'IA commence à perdre le fil sur un projet de grande envergure ?',
            options: [
              'Faire une pause et revenir plus tard, car le problème vient sûrement de la surcharge mentale de l\'utilisateur.',
              'Résumer les points clés couverts jusqu\'à présent et fournir ce résumé à l\'IA comme nouveau point de départ.',
              'Passer à un autre projet plus petit.',
              'Continuer quand même en espérant qu\'elle se "rappelle" par miracle.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Imaginons que vous travaillez sur un module de formation en 10 chapitres avec l\'aide de l\'IA. Quelle est la meilleure pratique pour éviter les problèmes liés à la fenêtre de contexte ?',
            options: [
              'Tout écrire en une seule fois, puis faire corriger l\'IA chapitre par chapitre.',
              'Traiter chapitre par chapitre, en commençant éventuellement une nouvelle session d\'IA pour chaque chapitre, et en rappelant les informations importantes au début de chacun.',
              'Ne poser que des questions très courtes sur chaque chapitre mais garder la même session.',
              'Utiliser un seul prompt géant contenant les 10 chapitres d\'un coup.',
            ],
            correctAnswer: 1,
          },
          {
            question: 'Au bout d\'une longue séance de co-création, vous remarquez que l\'IA n\'emploie plus le ton d\'"expert amical" que vous aviez défini initialement. Que faire ?',
            options: [
              'La gronder et lui dire qu\'elle a tort.',
              'La rappeler gentiment à l\'ordre en réitérant le Rôle ou le ton souhaité dans un nouveau message (par exemple : "Rappel : adopte bien le ton amical de notre expert comme mentionné plus tôt.").',
              'Changer d\'IA, celle-ci est manifestement défaillante.',
              'Continuer sans rien dire, cela reviendra probablement tout seul.',
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 'reflechir',
        title: 'Réfléchir',
        icon: Brain,
        introduction: `Gérer l'IA sur un projet long, c'est comme gérer l'attention des apprenants : il faut structurer, découper en étapes et faire des synthèses régulières. La "fenêtre de contexte" limitée de l'IA n'est pas un obstacle, mais une contrainte bénéfique qui impose de la discipline (segmentation, bilan intermédiaire).

Même si la technologie évolue, la compétence de segmentation et de synthèse acquise en gérant la mémoire de l'IA reste universellement utile.`,
        reflectionQuestions: [
          'Si vous deviez co-créer un module de 8 heures avec l\'IA, comment découperiez-vous la tâche pour éviter de saturer la mémoire de l\'IA ?',
          'Quels seraient pour vous les indices qu\'il est temps de faire une pause ou de rappeler du contexte à l\'IA pendant un long projet ? Donnez un ou deux signes concrets qui vous alerteraient que l\'IA commence à perdre le fil, et expliquez comment vous réagiriez à ce moment-là.',
          'Parmi les stratégies évoquées, laquelle vous semble la plus importante à mettre en œuvre dans votre pratique et pourquoi ?',
        ],
      },
      {
        id: 'appliquer',
        title: 'Appliquer',
        icon: PenTool,
        exercise: `Imaginez que vous devez créer un parcours de formation complet de 6 heures sur un sujet de votre choix avec l'aide de l'IA. 

Établissez un plan de découpage en sous-tâches pour gérer efficacement la mémoire de l'IA. Pour chaque sous-tâche identifiée, notez :
• Quel serait l'objectif précis de cette étape
• Quelles informations de contexte vous rappelleriez au début
• À quel moment vous feriez une synthèse ou un résumé

Cet exercice vous prépare à gérer des projets longs avec l'IA en anticipant les moments critiques où la mémoire pourrait saturer, et en planifiant vos interventions de rappel de contexte de manière stratégique.`,
        duration: '5 minutes',
      },
    ],
  },
];

export function getLessonById(id: number): Lesson | undefined {
  return lessonsData.find(lesson => lesson.id === id);
}
