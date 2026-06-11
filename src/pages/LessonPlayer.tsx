/**
 * LessonPlayer : EDRAC Fullscreen Lesson Viewer
 *
 * Fullscreen overlay reproduisant le pattern LessonViewer de la Learning App WIP.
 * Sections séquentielles : Introduction → Engagement → Découvrir → Quiz → Réfléchir → Appliquer → Conclusion
 *
 * Route : /learning-paths/:pathId/lessons/:lessonId
 *
 * Design system : TLS tokens + Card component
 */

import React, { useEffect, useState } from 'react';
import { useLessonProgressStore } from '../stores/persistence';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { SessionFeedbackModal } from '../components/modals';
import { QuizComponent } from '../components/ui/QuizComponent';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { LessonNavigation } from '../components/patterns/LessonNavigation';
import { Container } from '../components/layout';
import {
  Clock3,
  BookOpen,
  Target,
  Search,
  HelpCircle,
  Lightbulb,
  Zap,
  GraduationCap,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ArrowUpRight,
  ImageIcon,
  Play,
  Cpu,
} from 'lucide-react';
import { resolveLessonContext, getToneFromLevel } from '../data/learningPaths';
import { BehavioralTileGrid } from '../components/patterns/BehavioralTileGrid';

/* ─── Section definitions (EDRAC model) ─────────────────────────────────── */

const SECTIONS = [
  { id: 'introduction', title: 'Introduction', icon: BookOpen },
  { id: 'engagement',   title: 'Engagement',   icon: Target },
  { id: 'decouvrir',    title: 'Découvrir',     icon: Search },
  { id: 'quiz',         title: 'Quiz',          icon: HelpCircle },
  { id: 'reflechir',    title: 'Réfléchir',     icon: Lightbulb },
  { id: 'appliquer',    title: 'Appliquer',     icon: Zap },
  { id: 'conclusion',   title: 'Conclusion',    icon: GraduationCap },
  { id: 'transfert',    title: 'Transfert',     icon: ArrowUpRight },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

/* ─── ContentBlock : typed rich content for any section ─────────────────── */

type ContentBlock =
  | {
      type: 'image';
      src?: string;
      alt: string;
      caption?: string;
      aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
    }
  | {
      type: 'video';
      src?: string;
      poster?: string;
      caption?: string;
      aspectRatio?: '16/9' | '4/3';
    }
  | {
      type: 'gif';
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: 'chart';
      chartType: 'bar' | 'line' | 'donut';
      title?: string;
      data: { label: string; value: number; color?: string }[];
    }
  | {
      type: 'schema';
      title?: string;
      items: { num?: number; label: string; desc: string; color?: string }[];
      layout?: 'vertical' | 'horizontal' | 'flow';
    }
  | {
      type: 'interactive';
      id: string;
      title?: string;
      description?: string;
    }
  | {
      type: 'annotation';
      prompt: string;
      journalKey: string;
      placeholder?: string;
    };

/* ─── Lesson content data (extended per lessonId) ────────────────────────── */

interface LessonData {
  title: string;
  duration: string;
  intro: {
    heading: string;
    description: string;
    objectives: string[];
    blocks?: ContentBlock[];
  };
  engagement: {
    heading: string;
    pillars: { title: string; description: string; tags: string[] }[];
    blocks?: ContentBlock[];
  };
  decouvrir: {
    heading: string;
    bad: { label: string; title: string; description: string; points: string[] };
    good: { label: string; title: string; description: string; points: string[] };
    blocks?: ContentBlock[];
  };
  quiz: {
    questions: {
      id: string;
      text: string;
      options: { id: string; label: string }[];
      correct: string;
    }[];
  };
  reflechir: {
    heading: string;
    questions: string[];
    blocks?: ContentBlock[];
  };
  appliquer: {
    heading: string;
    instruction: string;
    blocks?: ContentBlock[];
  };
  conclusion: {
    heading: string;
    keyPoints: string[];
    nextSteps: string[];
    blocks?: ContentBlock[];
  };
  transfert: {
    heading: string;
    intro: string;
    scenarios: { title: string; context: string }[];
    commitmentPrompt: string;
    blocks?: ContentBlock[];
  };
}

const LESSON_DATA: Record<string, LessonData> = {
  'lecon-1-2-1': {
    title: 'Motivation et Engagement',
    duration: '50 min',
    intro: {
      heading: 'Bienvenue dans cette leçon',
      description: 'Cette leçon explore les mécanismes de la motivation intrinsèque et extrinsèque, et vous donne les outils pour créer les conditions d\'un engagement durable dans votre équipe.',
      objectives: [
        'Comprendre les mécanismes psychologiques de la motivation intrinsèque et extrinsèque',
        'Identifier les leviers d\'engagement adaptés à chaque profil de collaborateur',
        'Appliquer le modèle SCARF pour analyser les réactions émotionnelles en équipe',
        'Créer des conditions favorisant la motivation autonome',
      ],
    },
    engagement: {
      heading: 'Les 4 leviers de l\'engagement',
      pillars: [
        { title: 'Sens & Mission', description: 'Connecter le travail à un impact plus grand que soi', tags: ['Vision', 'Valeurs', 'Impact'] },
        { title: 'Autonomie', description: 'Donner le contrôle sur les moyens et les méthodes', tags: ['Ownership', 'Confiance', 'Flexibilité'] },
        { title: 'Progrès visible', description: 'Rendre le développement tangible et célébré', tags: ['Feedback', 'Milestones', 'Apprentissage'] },
        { title: 'Reconnaissance', description: 'Valoriser les contributions de manière sincère', tags: ['Gratitude', 'Visibilité', 'Célébration'] },
      ],
    },
    decouvrir: {
      heading: 'Comment motiver efficacement ?',
      bad: {
        label: 'À éviter',
        title: 'Motivation par la pression (inefficace)',
        description: 'Utiliser principalement les menaces, les primes conditionnelles ou la compétition interne pour motiver.',
        points: ['Résultats à court terme uniquement', 'Crée de l\'anxiété et du désengagement', 'Détruit la confiance et la créativité'],
      },
      good: {
        label: 'Recommandé',
        title: 'Motivation par le sens (durable)',
        description: 'Construire un environnement où chaque personne comprend son impact et a les ressources pour progresser.',
        points: ['Engagement durable et authentique', 'Favorise l\'initiative et l\'innovation', 'Réduit le turnover et l\'absentéisme', 'Construit une culture de confiance'],
      },
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          text: 'Quel type de motivation produit les résultats les plus durables ?',
          options: [
            { id: 'a', label: 'A. La motivation extrinsèque (primes, sanctions)' },
            { id: 'b', label: 'B. La motivation intrinsèque (sens, plaisir, autonomie)' },
            { id: 'c', label: 'C. La compétition entre collègues' },
            { id: 'd', label: 'D. Les objectifs imposés par la hiérarchie' },
          ],
          correct: 'b',
        },
        {
          id: 'q2',
          text: 'Le modèle SCARF identifie 5 domaines sociaux. Lequel de ces éléments ne fait PAS partie du modèle ?',
          options: [
            { id: 'a', label: 'A. Status (statut social)' },
            { id: 'b', label: 'B. Certainty (certitude)' },
            { id: 'c', label: 'C. Remuneration (rémunération)' },
            { id: 'd', label: 'D. Fairness (équité)' },
          ],
          correct: 'c',
        },
      ],
    },
    reflechir: {
      heading: 'Analysez votre équipe',
      questions: [
        'Quels sont les 3 principaux facteurs de motivation dans votre équipe actuellement ?',
        'Y a-t-il des collaborateurs dont vous ne connaissez pas bien les motivations profondes ? Comment pourriez-vous le découvrir ?',
        'Comment créer plus d\'opportunités de progrès visible pour votre équipe cette semaine ?',
      ],
    },
    appliquer: {
      heading: 'Créez votre plan d\'action',
      instruction: 'Définissez un objectif précis lié à la motivation de votre équipe et identifiez 3 actions concrètes que vous pouvez mettre en place dès cette semaine.',
    },
    conclusion: {
      heading: 'Récapitulatif et prochaines étapes',
      keyPoints: [
        'La motivation intrinsèque est plus puissante et durable que la motivation extrinsèque',
        'Le modèle SCARF permet de comprendre les réactions comportementales en équipe',
        'L\'engagement durable passe par le sens, l\'autonomie, le progrès et la reconnaissance',
        'Chaque collaborateur a un profil motivationnel unique : il faut s\'adapter',
      ],
      nextSteps: [
        'Planifiez un 1:1 avec chaque membre de votre équipe pour découvrir ses motivations',
        'Identifiez une tâche actuelle que vous pouvez rendre plus autonome',
        'Passez à la section Transfert pour ancrer ces apprentissages dans votre contexte réel',
        'Créez un rituel hebdomadaire de reconnaissance des contributions',
      ],
    },
    transfert: {
      heading: 'Transférer dans votre contexte',
      intro: 'Le transfert est la phase la plus importante : comment allez-vous appliquer ces apprentissages dans votre situation professionnelle réelle, dès cette semaine ?',
      scenarios: [
        {
          title: 'Avec votre équipe',
          context: 'Choisissez un collaborateur dont vous ne connaissez pas bien les motivations profondes. Planifiez un entretien informel de 15 min cette semaine pour découvrir ce qui le motive vraiment.',
        },
        {
          title: 'Dans votre management quotidien',
          context: 'Identifiez une tâche que vous attribuez de façon directive. Reformulez la consigne pour laisser le collaborateur choisir comment l\'accomplir (autonomie sur les moyens).',
        },
        {
          title: 'Sur le long terme',
          context: 'Mettez en place un rituel mensuel de reconnaissance explicite : non monétaire. Partagez un impact concret que chaque personne a eu sur les résultats de l\'équipe.',
        },
      ],
      commitmentPrompt: 'Décrivez une situation précise où vous allez appliquer ces apprentissages cette semaine. Soyez spécifique : qui, quand, comment.',
    },
  },

  'bootcamp-lecon-1-1': {
    title: 'Design System Fundamentals',
    duration: '2h',
    intro: {
      heading: 'Bienvenue dans le Bootcamp',
      description: 'Cette première leçon pose les fondations conceptuelles de votre parcours de 12 semaines. Vous allez comprendre ce qu\'est un Design System, pourquoi c\'est le fil conducteur de tout ce qu\'on construit ensemble, et créer votre premier artefact concret : un token spreadsheet.',
      objectives: [
        'Comprendre la structure d\'un design system : tokens, composants, documentation',
        'Identifier le flux Figma → CSS custom properties → Tailwind utilities dans le projet TLS',
        'Créer votre premier token spreadsheet (couleurs, typo, spacing)',
        'Vous situer dans UX-UI-BOOTCAMP.md et le plan Semaine 1',
      ],
    },
    engagement: {
      heading: 'Pourquoi les Design Systems changent tout',
      pillars: [
        {
          title: 'Cohérence visuelle',
          description: 'Un seul source of truth pour tous les choix visuels. Plus jamais deux boutons légèrement différents sur deux pages.',
          tags: ['Tokens', 'Source of truth', 'Parité Figma↔code'],
        },
        {
          title: 'Vitesse de build',
          description: 'Composer des écrans avec des blocs réutilisables plutôt que recoder chaque fois. Figma et React alignés = zéro friction.',
          tags: ['Composants', 'Réutilisabilité', 'Autonomie'],
        },
        {
          title: 'Maintenance durable',
          description: 'Changer la couleur primaire en 1 ligne CSS au lieu de 200. Le design system absorbe la dette technique.',
          tags: ['Scalabilité', 'Refactoring', 'Zéro duplication'],
        },
      ],
    },
    decouvrir: {
      heading: 'Design System : chaos vs système',
      bad: {
        label: 'Sans système',
        title: 'Le CSS spaghetti (coût élevé)',
        description: 'Chaque composant est codé à la main, couleurs hardcodées partout, marges inconsistantes, aucun contrat entre Figma et le code.',
        points: [
          '3 variantes de bouton bleu légèrement différentes dans l\'app',
          'Changer la couleur primaire = 150 fichiers à modifier à la main',
          'Nouveau dev = 2 semaines avant de comprendre les conventions de style',
        ],
      },
      good: {
        label: 'Avec système',
        title: 'Design tokens + composants (maintenable)',
        description: 'Figma variables → CSS custom properties → Tailwind utilities. Un changement de token se propage partout instantanément.',
        points: [
          '--color-primary-500 change en 1 ligne et c\'est mis à jour sur toutes les pages',
          'Composants React typés avec props claires : <Button variant="primary" size="md" />',
          'Figma et le code partagent le même vocabulaire : zéro traduction manuelle',
          'Open Badge, Passeport, Learning App : un seul design system pour tous',
        ],
      },
      blocks: [
        {
          type: 'schema' as const,
          title: 'Le flux Design System TLS',
          layout: 'horizontal' as const,
          items: [
            { num: 1, label: 'Figma variables', desc: 'Source of truth visuelle', color: 'primary' },
            { num: 2, label: 'CSS custom props', desc: '--color-primary-500', color: 'secondary' },
            { num: 3, label: 'Tailwind utilities', desc: 'text-primary-500', color: 'accent' },
            { num: 4, label: 'Composant React', desc: '<Button variant="primary" />', color: 'primary' },
          ],
        },
      ],
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          text: 'Qu\'est-ce qu\'un design token ?',
          options: [
            { id: 'a', label: 'A. Une couleur hexadécimale hardcodée dans le CSS' },
            { id: 'b', label: 'B. Une variable nommée qui stocke une valeur de design (couleur, taille, ombre)' },
            { id: 'c', label: 'C. Un composant React réutilisable' },
            { id: 'd', label: 'D. Un plugin Figma pour exporter les styles' },
          ],
          correct: 'b',
        },
        {
          id: 'q2',
          text: 'Dans le flux Design System TLS, quel est l\'ordre correct ?',
          options: [
            { id: 'a', label: 'A. React → CSS → Figma' },
            { id: 'b', label: 'B. Figma → React → CSS custom properties' },
            { id: 'c', label: 'C. Figma variables → CSS custom properties → Tailwind utilities' },
            { id: 'd', label: 'D. CSS → Tailwind config → Figma auto-sync' },
          ],
          correct: 'c',
        },
      ],
    },
    reflechir: {
      heading: 'Analysez le Design System TLS existant',
      questions: [
        'Ouvrez src/styles/ dans le projet. Quels fichiers de tokens trouvez-vous ? Quelle est la différence entre --color-primary-500 et --color-ink-900 dans leur usage ?',
        'Naviguez dans src/components/core/Button.tsx. Comment le composant utilise-t-il les tokens ? Que se passerait-il visuellement si vous changiez --color-primary-500 ?',
        'En 2-3 phrases : qu\'est-ce qui changerait dans votre workflow si la parité Figma↔code était à 100% dans le projet TLS ?',
      ],
      blocks: [
        {
          type: 'image' as const,
          alt: 'Comparaison Figma variables vs CSS tokens',
          caption: 'Capture à faire : Figma panel Variables vs fichier tokens.css côte à côte',
          aspectRatio: '16/9' as const,
        },
      ],
    },
    appliquer: {
      heading: 'Créer votre token spreadsheet',
      instruction: 'Ouvrez un nouveau fichier (Notion, Google Sheets, ou un .md dans docs/). Créez 3 colonnes : Token Name | Valeur | Usage. Listez minimum 10 tokens du projet TLS (ouvrez src/styles/tokens.css ou équivalent). Incluez : 3 couleurs primary, 2 couleurs ink, 2 tokens de typo, 2 tokens de spacing, 1 token de shadow. Ce spreadsheet est votre référence pour toute la Semaine 1.',
    },
    conclusion: {
      heading: 'Fondamentaux posés : prêt pour la suite',
      keyPoints: [
        'Un design system = tokens + composants + documentation. Les trois doivent être alignés pour fonctionner.',
        'Le flux TLS : Figma variables → CSS custom properties (--color-*) → Tailwind utilities (text-primary-500)',
        'Les tokens sont le DNA du design : changer un token = changer l\'apparence partout, en une seule modification',
        'Votre token spreadsheet est le premier artefact du bootcamp : il sera réutilisé toute la Semaine 1',
      ],
      nextSteps: [
        'Compléter votre token spreadsheet (min. 10 tokens) avant la Leçon 2',
        'Lire docs/learning/UX-UI-BOOTCAMP.md : section Semaine 1 en entier',
        'Leçon 2 : Figma Design System Setup : créer les variables dans Figma et binder aux composants',
      ],
    },
    transfert: {
      heading: 'Appliquer dans le projet TLS maintenant',
      intro: 'Ce que vous venez d\'apprendre existe déjà dans le code. Le transfert commence aujourd\'hui : pas la semaine prochaine. Voici 3 actions concrètes dans le vrai projet.',
      scenarios: [
        {
          title: 'Dans src/styles/tokens.css',
          context: 'Ouvrez le fichier de tokens TLS. Localisez --color-primary-500. Changez temporairement sa valeur (ex: rouge #e53e3e), observez l\'impact en live sur une page, puis rétablissez (git checkout). C\'est la preuve vivante qu\'un token = un impact global.',
        },
        {
          title: 'Dans Figma TLS (fichier LccBZ1...)',
          context: 'Ouvrez le fichier Figma TLS. Cherchez la page Foundations. Comparez les variables Figma avec vos tokens CSS. Notez les écarts dans votre token spreadsheet : cette liste devient votre backlog Semaine 1 pour la parité Figma↔code.',
        },
        {
          title: 'Avant la Leçon 2',
          context: 'Arrivez avec votre token spreadsheet complété (10+ tokens) et les écarts Figma↔code identifiés. La Leçon 2 part directement de ce travail pour configurer les variables Figma et les binder aux composants existants.',
        },
      ],
      commitmentPrompt: 'Décrivez en une phrase le premier changement concret que vous allez explorer dans tokens.css ou Figma après cette leçon : et pourquoi ce choix.',
      blocks: [
        {
          type: 'annotation' as const,
          prompt: 'Quel token vas-tu explorer en premier dans le projet TLS ? Pourquoi ce choix ?',
          journalKey: 'bootcamp-1-1-premier-token',
          placeholder: 'Ex: Je vais explorer --color-primary-500 parce que...',
        },
      ],
    },
  },
};

const DEFAULT_LESSON_DATA: LessonData = {
  title: 'Leçon',
  duration: '45 min',
  intro: {
    heading: 'Bienvenue dans cette leçon',
    description: 'Cette leçon vous guidera à travers les concepts fondamentaux du module.',
    objectives: [
      'Comprendre les concepts fondamentaux présentés dans cette leçon',
      'Identifier les opportunités d\'application dans votre contexte professionnel',
      'Mettre en pratique avec les exercices proposés',
      'Consolider vos apprentissages avec les ressources complémentaires',
    ],
  },
  engagement: {
    heading: 'Les piliers du module',
    pillars: [
      { title: 'Concept 1', description: 'Introduction au premier pilier fondamental', tags: ['Fondamentaux', 'Théorie'] },
      { title: 'Concept 2', description: 'Application pratique du second pilier', tags: ['Pratique', 'Outils'] },
      { title: 'Concept 3', description: 'Mise en situation du troisième pilier', tags: ['Mise en situation', 'Cas réels'] },
    ],
  },
  decouvrir: {
    heading: 'Bonne pratique vs mauvaise pratique',
    bad: {
      label: 'À éviter',
      title: 'Approche standard (limitée)',
      description: 'Approche sans structure ni méthode éprouvée.',
      points: ['Résultats imprévisibles', 'Inefficace sur le long terme', 'Démotivant pour l\'équipe'],
    },
    good: {
      label: 'Recommandé',
      title: 'Approche optimisée (efficace)',
      description: 'Approche structurée basée sur les meilleures pratiques du domaine.',
      points: ['Résultats reproductibles', 'Scalable et durable', 'Valorisant pour toutes les parties'],
    },
  },
  quiz: {
    questions: [
      {
        id: 'q1',
        text: 'Quel est le concept clé de cette leçon ?',
        options: [
          { id: 'a', label: 'A. La répétition sans réflexion' },
          { id: 'b', label: 'B. La pratique délibérée avec feedback' },
          { id: 'c', label: 'C. L\'apprentissage passif' },
          { id: 'd', label: 'D. La mémorisation pure' },
        ],
        correct: 'b',
      },
    ],
  },
  reflechir: {
    heading: 'Prenez le temps de réfléchir',
    questions: [
      'Quels aspects de cette leçon résonnent le plus avec votre expérience actuelle ?',
      'Comment allez-vous appliquer ces concepts dès la semaine prochaine ?',
      'Quels obstacles anticipez-vous et comment les surmonter ?',
    ],
  },
  appliquer: {
    heading: 'Créez votre plan d\'action',
    instruction: 'Définissez un objectif SMART et 3 actions concrètes à mettre en œuvre dans les prochains jours.',
  },
  conclusion: {
    heading: 'Récapitulatif et prochaines étapes',
    keyPoints: [
      'La pratique régulière est plus efficace que les sessions intensives espacées',
      'Connectez chaque concept à une situation réelle que vous avez vécue',
      'Le partage avec vos pairs accélère l\'ancrage mémoriel',
    ],
    nextSteps: [
      'Identifiez une situation concrète où appliquer ce que vous avez appris',
      'Partagez 1 insight avec un collègue de confiance',
      'Passez à la prochaine leçon pour approfondir le sujet',
    ],
  },
  transfert: {
    heading: 'Transférer dans votre contexte',
    intro: 'La maîtrise s\'acquiert en dehors de la formation. Comment allez-vous appliquer ces apprentissages dans votre situation réelle ?',
    scenarios: [
      {
        title: 'Application immédiate',
        context: 'Identifiez une situation concrète cette semaine où vous pourrez mettre en pratique ce que vous venez d\'apprendre.',
      },
      {
        title: 'Partage avec un pair',
        context: 'Expliquez un concept clé de cette leçon à un collègue. Enseigner accélère l\'ancrage mémoriel (effet protégé).',
      },
      {
        title: 'Itération',
        context: 'Notez ce qui a fonctionné et ce qui n\'a pas marché lors de votre première application. Ajustez et recommencez.',
      },
    ],
    commitmentPrompt: 'Décrivez précisément comment et où vous allez appliquer ces apprentissages dans les 7 prochains jours.',
  },
};

/* ─── Section title shared class ────────────────────────────────────────── */

const SECTION_TITLE = 'font-display text-h2 font-bold text-ink-900 m-0 mb-6 leading-[1.15]';

/* ─── Component ──────────────────────────────────────────────────────────── */

export const LessonPlayer: React.FC = () => {
  const { pathId = '1', lessonId = 'lecon-1-2-1' } = useParams<{ pathId: string; lessonId: string }>();
  const navigate = useNavigate();

  // Restore persisted state on mount (Zustand persist via localStorage)
  const persistedEntry = useLessonProgressStore((s) => s.lessons[lessonId]);
  const setSectionInStore = useLessonProgressStore((s) => s.setSection);
  const completeSectionInStore = useLessonProgressStore((s) => s.completeSection);
  const setReflectionInStore = useLessonProgressStore((s) => s.setReflection);
  const setActionPlanInStore = useLessonProgressStore((s) => s.setActionPlan);

  const [currentIndex, setCurrentIndex] = useState(persistedEntry?.lastSection ?? 0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(
    new Set(persistedEntry?.completed ?? [0])
  );

  // Persist on every change
  useEffect(() => {
    setSectionInStore(lessonId, currentIndex, SECTIONS.length);
  }, [lessonId, currentIndex, setSectionInStore]);

  const [reflections, setReflections] = useState<Record<string, string>>(
    persistedEntry?.reflections ?? {}
  );
  const [actionPlan, setActionPlan] = useState(
    persistedEntry?.actionPlan ?? { objectif: '', action1: '', action2: '', action3: '' }
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [uploadedSrcs, setUploadedSrcs] = useState<Record<number, string>>({});

  const ctx = resolveLessonContext(pathId, lessonId);
  const lessonData = LESSON_DATA[lessonId] ?? DEFAULT_LESSON_DATA;
  const tone = ctx ? getToneFromLevel(ctx.parcours.level) : 'primary';

  const currentSection = SECTIONS[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === SECTIONS.length - 1;
  const progress = Math.round(((currentIndex + 1) / SECTIONS.length) * 100);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setCompletedSections((prev) => {
      const next = new Set(prev);
      next.add(currentIndex);
      return next;
    });
    completeSectionInStore(lessonId, currentIndex);
  };

  const handleNext = () => {
    if (!isLast) {
      goTo(currentIndex + 1);
    } else {
      setCompletedSections((prev) => new Set(prev).add(currentIndex));
      setShowFeedback(true);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleClose = () => {
    // If a next lesson exists in this parcours, go straight to it; otherwise back to the path hub.
    if (ctx?.nextLesson) {
      navigate(`/learning-paths/${ctx.nextLesson.pathId}/lessons/${ctx.nextLesson.lessonId}`);
    } else {
      navigate(`/learning-paths/${pathId}`);
    }
  };

  /* ── Section renderers ──────────────────────────────────────────────── */

  const renderIntroduction = () => (
    <div>
      <h2 className={SECTION_TITLE}>{lessonData.intro.heading}</h2>
      <p className="font-body text-body text-ink-500 leading-relaxed mb-6">
        {lessonData.intro.description}
      </p>
      <div className="flex items-center gap-2 mb-5">
        <Target size={20} className="text-primary-500" />
        <h3 className="m-0 font-display text-h4 font-bold text-ink-900">
          Objectifs d&apos;apprentissage
        </h3>
      </div>
      <div className="flex flex-col gap-3 mt-8">
        {lessonData.intro.objectives.map((obj, i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-ink-50 rounded-lg">
            <CheckCircle2 size={18} className="text-success-base shrink-0" />
            <span className="font-body text-body">{obj}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEngagement = () => (
    <div>
      <BehavioralTileGrid
        heading={lessonData.engagement.heading}
        tiles={lessonData.engagement.pillars}
      />
      {lessonData.engagement.blocks?.map((block, i) => renderContentBlock(block, i))}
    </div>
  );

  const renderDecouvrir = () => {
    const { decouvrir: d } = lessonData;
    return (
      <div>
        <h2 className={SECTION_TITLE}>{d.heading}</h2>
        <div className="rounded-xl p-6 mb-5 bg-danger-base/[0.06] border-2 border-danger-base/25">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 bg-danger-base text-white px-3 py-1 rounded-lg text-caption font-bold">
              <XCircle size={14} /> {d.bad.label}
            </span>
          </div>
          <h3 className="m-0 mb-1 font-display text-h4 font-bold text-ink-900">{d.bad.title}</h3>
          <p className="m-0 mb-4 font-body text-body-sm text-ink-500">{d.bad.description}</p>
          {d.bad.points.map((p, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚠️</span>
              <span className="font-body text-body-sm">{p}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-6 bg-success-base/[0.08] border-2 border-success-base/30">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 bg-success-base text-white px-3 py-1 rounded-lg text-caption font-bold">
              <CheckCircle2 size={14} /> {d.good.label}
            </span>
          </div>
          <h3 className="m-0 mb-1 font-display text-h4 font-bold text-ink-900">{d.good.title}</h3>
          <p className="m-0 mb-4 font-body text-body-sm text-ink-500">{d.good.description}</p>
          {d.good.points.map((p, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} className="text-success-base shrink-0" />
              <span className="font-body text-body-sm">{p}</span>
            </div>
          ))}
        </div>
        {d.blocks?.map((block, i) => renderContentBlock(block, i))}
      </div>
    );
  };

  const renderQuiz = () => {
    const quizQuestions = lessonData.quiz.questions.map(q => ({
      question: q.text,
      options: q.options.map(o => o.label),
      correct: q.options.findIndex(o => o.id === q.correct),
    }));
    return (
      <QuizComponent
        questions={quizQuestions}
        onComplete={(results) => console.log('Quiz done', results)}
      />
    );
  };

  const renderReflechir = () => (
    <div>
      <h2 className={SECTION_TITLE}>{lessonData.reflechir.heading}</h2>
      {lessonData.reflechir.questions.map((question, i) => (
        <div key={i} className="bg-ink-50 rounded-xl p-5 mb-5">
          <h3 className="m-0 font-body text-body font-semibold text-ink-900">{question}</h3>
          <textarea
            className="w-full h-auto min-h-[96px] p-4 mt-3 font-body text-body-sm text-ink-900 bg-white border border-ink-200 rounded-lg resize-y transition-colors duration-150 focus:outline-none focus:border-primary-400 focus:ring-3 focus:ring-primary-100 focus:shadow-none"
            value={reflections[`q${i}`] ?? ''}
            onChange={(e) => {
              const key = `q${i}`;
              setReflections((prev) => ({ ...prev, [key]: e.target.value }));
              setReflectionInStore(lessonId, key, e.target.value);
            }}
            placeholder="Écrivez votre réflexion ici…"
          />
        </div>
      ))}
      {lessonData.reflechir.blocks?.map((block, i) => renderContentBlock(block, i))}
    </div>
  );

  const renderAppliquer = () => (
    <div>
      <h2 className={SECTION_TITLE}>{lessonData.appliquer.heading}</h2>
      <div className="bg-primary-50 rounded-xl p-5 mb-6 border border-primary-200">
        <p className="m-0 font-body text-body text-ink-900 leading-relaxed">
          {lessonData.appliquer.instruction}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {[
          { key: 'objectif' as const, label: 'Objectif', placeholder: 'Ex: Améliorer l\'engagement de mon équipe de 20% en 30 jours' },
          { key: 'action1' as const, label: 'Action 1', placeholder: 'Première action concrète à mettre en place dès demain' },
          { key: 'action2' as const, label: 'Action 2', placeholder: 'Deuxième action complémentaire cette semaine' },
          { key: 'action3' as const, label: 'Action 3', placeholder: 'Troisième action pour ancrer le changement' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block font-body text-caption font-semibold text-ink-900 mb-2">{label}</label>
            <input
              type="text"
              className="w-full h-auto p-4 rounded-lg border border-ink-200 font-body text-body-sm text-ink-900 bg-white transition-colors duration-150 focus:outline-none focus:border-primary-400 focus:ring-3 focus:ring-primary-100 focus:shadow-none"
              value={actionPlan[key]}
              onChange={(e) => {
                const next = { ...actionPlan, [key]: e.target.value };
                setActionPlan(next);
                setActionPlanInStore(lessonId, next);
              }}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
      {lessonData.appliquer.blocks?.map((block, i) => renderContentBlock(block, i))}
    </div>
  );

  const renderConclusion = () => (
    <div>
      <h2 className={SECTION_TITLE}>{lessonData.conclusion.heading}</h2>
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 size={18} className="text-success-base" />
        <h3 className="m-0 font-display text-h4 font-bold text-ink-900">Points clés à retenir</h3>
      </div>
      <div className="mb-8">
        {lessonData.conclusion.keyPoints.map((point, i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-ink-50 rounded-lg mb-3">
            <div className="w-7 h-7 rounded-full bg-success-base text-white font-display text-caption font-bold flex items-center justify-center shrink-0">
              {i + 1}
            </div>
            <span className="font-body text-body-sm">{point}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Zap size={18} className="text-primary-500" />
        <h3 className="m-0 font-display text-h4 font-bold text-ink-900">Prochaines étapes</h3>
      </div>
      {lessonData.conclusion.nextSteps.map((step, i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-ink-200 mb-3 transition-all duration-200 hover:translate-x-1 hover:border-primary-400">
          <ChevronRight size={18} className="text-primary-500 shrink-0" />
          <span className="font-body text-body-sm">{step}</span>
        </div>
      ))}
      {lessonData.conclusion.blocks?.map((block, i) => renderContentBlock(block, i))}
    </div>
  );

  const renderTransfert = () => {
    const { transfert: t } = lessonData;
    return (
      <div>
        <h2 className={SECTION_TITLE}>{t.heading}</h2>
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mb-6">
          <p className="m-0 font-body text-body text-ink-700 leading-relaxed">{t.intro}</p>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          {t.scenarios.map((scenario, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white border border-ink-200 rounded-xl hover:border-primary-300 transition-colors duration-200">
              <div className="w-8 h-8 rounded-full bg-primary-500 text-white font-display text-caption font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <h3 className="m-0 mb-1.5 font-display text-h4 font-bold text-ink-900">{scenario.title}</h3>
                <p className="m-0 font-body text-body-sm text-ink-600 leading-relaxed">{scenario.context}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <label className="block font-body text-caption font-semibold text-ink-900 mb-2">
            Mon engagement de transfert
          </label>
          <p className="font-body text-body-sm text-ink-500 mb-3">{t.commitmentPrompt}</p>
          <textarea
            className="w-full min-h-[120px] p-4 font-body text-body-sm text-ink-900 bg-white border border-ink-200 rounded-lg resize-y transition-colors duration-150 focus:outline-none focus:border-primary-400 focus:ring-3 focus:ring-primary-100 focus:shadow-none"
            value={reflections['transfert'] ?? ''}
            onChange={(e) => {
              setReflections((prev) => ({ ...prev, transfert: e.target.value }));
              setReflectionInStore(lessonId, 'transfert', e.target.value);
            }}
            placeholder="Je vais appliquer ces apprentissages en…"
          />
        </div>
        {t.blocks?.map((block, i) => renderContentBlock(block, i))}
      </div>
    );
  };

  /* ── ContentBlock renderer ────────────────────────────────────────────── */

  const SCHEMA_COLOR_MAP: Record<string, { card: string; num: string }> = {
    primary:   { card: 'bg-primary-50 border-primary-200',   num: 'bg-primary-500 text-white' },
    secondary: { card: 'bg-secondary-50 border-secondary-500/30', num: 'bg-secondary-500 text-white' },
    accent:    { card: 'bg-accent-50 border-accent-400/50',  num: 'bg-accent-400 text-ink-900' },
    neutral:   { card: 'bg-ink-50 border-ink-200',           num: 'bg-ink-300 text-ink-700' },
  };

  const CHART_PALETTE = [
    'var(--color-primary-500)',
    'var(--color-secondary-500)',
    'var(--color-accent-400)',
    'var(--color-success-base)',
    'var(--color-info-base)',
  ];

  const renderContentBlock = (block: ContentBlock, index: number): React.ReactNode => {
    const key = `cb-${index}`;

    switch (block.type) {

      case 'image': {
        const ASPECT: Record<string, string> = {
          '16/9': 'aspect-video', '4/3': 'aspect-[4/3]',
          '1/1': 'aspect-square', '3/2': 'aspect-[3/2]',
        };
        const arClass = ASPECT[block.aspectRatio ?? '16/9'];
        const resolvedSrc = uploadedSrcs[index] ?? block.src;
        return (
          <div key={key} className="mb-6">
            {resolvedSrc ? (
              <div className={`w-full ${arClass} overflow-hidden rounded-xl`}>
                <img src={resolvedSrc} alt={block.alt} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-full ${arClass} rounded-xl border-2 border-dashed border-ink-300 bg-ink-100 flex flex-col items-center justify-center gap-3`}>
                <ImageIcon size={32} className="text-ink-400" />
                <span className="font-body text-body-sm text-ink-500 text-center px-4">
                  Image à connecter · Unsplash / Backoffice
                </span>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setUploadedSrcs((prev) => ({ ...prev, [index]: URL.createObjectURL(file) }));
                    }}
                  />
                  <span className="inline-flex items-center gap-1.5 bg-white border border-ink-300 text-ink-700 hover:bg-ink-50 transition-colors duration-150 px-3 py-1.5 rounded-lg font-body text-caption font-semibold">
                    <ImageIcon size={13} /> Choisir un fichier
                  </span>
                </label>
              </div>
            )}
            {block.caption && (
              <p className="m-0 mt-2 font-body text-caption text-ink-500 text-center italic">{block.caption}</p>
            )}
          </div>
        );
      }

      case 'video': {
        const arClass = (block.aspectRatio ?? '16/9') === '16/9' ? 'aspect-video' : 'aspect-[4/3]';
        const resolvedSrc = uploadedSrcs[index] ?? block.src;
        return (
          <div key={key} className="mb-6">
            {resolvedSrc ? (
              <div className={`w-full ${arClass} overflow-hidden rounded-xl bg-ink-900`}>
                <video src={resolvedSrc} poster={block.poster} controls className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-full ${arClass} rounded-xl border-2 border-dashed border-ink-300 bg-ink-900/5 flex flex-col items-center justify-center gap-4`}>
                <div className="w-14 h-14 rounded-full bg-ink-200 flex items-center justify-center">
                  <Play size={24} className="text-ink-600 ml-1" />
                </div>
                <span className="font-body text-body-sm text-ink-500">Vidéo à brancher</span>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setUploadedSrcs((prev) => ({ ...prev, [index]: URL.createObjectURL(file) }));
                    }}
                  />
                  <span className="inline-flex items-center gap-1.5 bg-white border border-ink-300 text-ink-700 hover:bg-ink-50 transition-colors duration-150 px-3 py-1.5 rounded-lg font-body text-caption font-semibold">
                    <Play size={13} /> Choisir une vidéo
                  </span>
                </label>
              </div>
            )}
            {block.caption && (
              <p className="m-0 mt-2 font-body text-caption text-ink-500 text-center italic">{block.caption}</p>
            )}
          </div>
        );
      }

      case 'gif': {
        const resolvedSrc = uploadedSrcs[index] ?? block.src;
        return (
          <div key={key} className="mb-6">
            {resolvedSrc ? (
              <img src={resolvedSrc} alt={block.alt} loading="lazy" className="w-full rounded-xl" />
            ) : (
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-ink-300 bg-ink-100 flex flex-col items-center justify-center gap-3">
                <ImageIcon size={32} className="text-ink-400" />
                <span className="font-body text-body-sm text-ink-500">GIF à connecter</span>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/gif,image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setUploadedSrcs((prev) => ({ ...prev, [index]: URL.createObjectURL(file) }));
                    }}
                  />
                  <span className="inline-flex items-center gap-1.5 bg-white border border-ink-300 text-ink-700 hover:bg-ink-50 transition-colors duration-150 px-3 py-1.5 rounded-lg font-body text-caption font-semibold">
                    <ImageIcon size={13} /> Choisir un GIF
                  </span>
                </label>
              </div>
            )}
            {block.caption && (
              <p className="m-0 mt-2 font-body text-caption text-ink-500 text-center italic">{block.caption}</p>
            )}
          </div>
        );
      }

      case 'chart': {
        if (block.chartType === 'bar') {
          const max = Math.max(...block.data.map(d => d.value), 1);
          return (
            <div key={key} className="bg-white border border-ink-100 rounded-xl p-5 mb-6">
              {block.title && <h4 className="m-0 mb-4 font-display text-h4 font-bold text-ink-900">{block.title}</h4>}
              <div className="flex flex-col gap-3">
                {block.data.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-body text-body-sm text-ink-700">{item.label}</span>
                      <span className="font-body text-caption font-semibold text-ink-900">{item.value}</span>
                    </div>
                    <div className="h-2.5 bg-ink-100 rounded-pill overflow-hidden">
                      <div
                        className="h-full rounded-pill bg-primary-500 transition-all duration-slow"
                        style={{ width: `${Math.round((item.value / max) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (block.chartType === 'donut') {
          const r = 38; const circumference = 2 * Math.PI * r;
          const total = block.data.reduce((s, d) => s + d.value, 0) || 1;
          let accumulated = 0;
          return (
            <div key={key} className="bg-white border border-ink-100 rounded-xl p-5 mb-6">
              {block.title && <h4 className="m-0 mb-4 font-display text-h4 font-bold text-ink-900">{block.title}</h4>}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <svg width="120" height="120" viewBox="0 0 100 100" className="shrink-0" aria-hidden="true">
                  <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-ink-100)" strokeWidth="10" />
                  {block.data.map((item, i) => {
                    const segLen = (item.value / total) * circumference;
                    const offset = circumference - accumulated;
                    accumulated += segLen;
                    return (
                      <circle key={i} cx="50" cy="50" r={r} fill="none"
                        stroke={item.color ?? CHART_PALETTE[i % CHART_PALETTE.length]}
                        strokeWidth="10"
                        strokeDasharray={`${segLen} ${circumference}`}
                        strokeDashoffset={offset}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }}
                      />
                    );
                  })}
                </svg>
                <div className="flex flex-col gap-2 flex-1">
                  {block.data.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: item.color ?? CHART_PALETTE[i % CHART_PALETTE.length] }} />
                      <span className="font-body text-body-sm text-ink-700 flex-1">{item.label}</span>
                      <span className="font-body text-caption font-semibold text-ink-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        if (block.chartType === 'line') {
          const vals = block.data.map(d => d.value);
          const minV = Math.min(...vals); const maxV = Math.max(...vals);
          const range = maxV - minV || 1;
          const W = 300; const H = 80; const px = 10; const py = 10;
          const pts = vals.map((v, i) => {
            const x = px + (i / Math.max(vals.length - 1, 1)) * (W - 2 * px);
            const y = py + ((maxV - v) / range) * (H - 2 * py);
            return `${x},${y}`;
          }).join(' ');
          return (
            <div key={key} className="bg-white border border-ink-100 rounded-xl p-5 mb-6 overflow-hidden">
              {block.title && <h4 className="m-0 mb-4 font-display text-h4 font-bold text-ink-900">{block.title}</h4>}
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
                <polyline points={pts} fill="none" stroke="var(--color-primary-500)"
                  strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                {vals.map((v, i) => {
                  const x = px + (i / Math.max(vals.length - 1, 1)) * (W - 2 * px);
                  const y = py + ((maxV - v) / range) * (H - 2 * py);
                  return <circle key={i} cx={x} cy={y} r="4" fill="var(--color-primary-500)" />;
                })}
              </svg>
              <div className="flex mt-2">
                {block.data.map((item, i) => (
                  <span key={i} className="font-body text-micro text-ink-500 text-center flex-1 truncate px-1">{item.label}</span>
                ))}
              </div>
            </div>
          );
        }
        return null;
      }

      case 'schema': {
        const layout = block.layout ?? 'vertical';
        const getColors = (c?: string) => SCHEMA_COLOR_MAP[c ?? 'primary'] ?? SCHEMA_COLOR_MAP['primary'];

        if (layout === 'horizontal') {
          return (
            <div key={key} className="mb-6">
              {block.title && <h4 className="m-0 mb-4 font-display text-h4 font-bold text-ink-900">{block.title}</h4>}
              <div className="flex flex-wrap items-stretch gap-2">
                {block.items.map((item, i) => {
                  const { card, num } = getColors(item.color);
                  return (
                    <React.Fragment key={i}>
                      <div className={`flex flex-col gap-1 p-3 rounded-xl border flex-1 min-w-[90px] ${card}`}>
                        {item.num !== undefined && (
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-display text-micro font-bold shrink-0 ${num}`}>
                            {item.num}
                          </span>
                        )}
                        <span className="font-body text-body-sm font-semibold text-ink-900 leading-tight">{item.label}</span>
                        <span className="font-body text-caption text-ink-500 leading-tight">{item.desc}</span>
                      </div>
                      {i < block.items.length - 1 && (
                        <div className="flex items-center shrink-0">
                          <ChevronRight size={16} className="text-ink-400" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        }

        if (layout === 'flow') {
          return (
            <div key={key} className="mb-6">
              {block.title && <h4 className="m-0 mb-4 font-display text-h4 font-bold text-ink-900">{block.title}</h4>}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {block.items.map((item, i) => {
                  const { card, num } = getColors(item.color);
                  return (
                    <div key={i} className={`flex flex-col gap-1.5 p-4 rounded-xl border ${card}`}>
                      {item.num !== undefined && (
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-display text-micro font-bold mb-0.5 ${num}`}>
                          {item.num}
                        </span>
                      )}
                      <span className="font-body text-body-sm font-semibold text-ink-900">{item.label}</span>
                      <span className="font-body text-caption text-ink-500 leading-tight">{item.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // vertical (default)
        return (
          <div key={key} className="flex flex-col gap-3 mb-6">
            {block.title && <h4 className="m-0 font-display text-h4 font-bold text-ink-900">{block.title}</h4>}
            {block.items.map((item, i) => {
              const { card, num } = getColors(item.color);
              return (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${card}`}>
                  {item.num !== undefined && (
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-display text-caption font-bold shrink-0 mt-0.5 ${num}`}>
                      {item.num}
                    </span>
                  )}
                  <div>
                    <p className="m-0 font-body text-body-sm font-semibold text-ink-900">{item.label}</p>
                    <p className="m-0 mt-0.5 font-body text-caption text-ink-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      case 'interactive': {
        return (
          <div key={key} className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
              <Cpu size={20} className="text-primary-600" />
            </div>
            <div className="flex-1">
              {block.title && <h4 className="m-0 mb-1 font-display text-h4 font-bold text-ink-900">{block.title}</h4>}
              {block.description && (
                <p className="m-0 mb-3 font-body text-body-sm text-ink-600">{block.description}</p>
              )}
              <span className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-700 px-3 py-1 rounded-pill font-body text-caption font-semibold">
                <Cpu size={12} /> Module interactif · Bientôt disponible
              </span>
            </div>
          </div>
        );
      }

      case 'annotation': {
        const annotValue = reflections[block.journalKey] ?? '';
        return (
          <div key={key} className="bg-secondary-50 border border-secondary-500/30 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-secondary-600 shrink-0" />
              <span className="font-body text-caption font-semibold text-secondary-600">Lié au Journal</span>
            </div>
            <p className="m-0 mb-3 font-body text-body-sm font-semibold text-ink-900">{block.prompt}</p>
            <textarea
              className="w-full h-auto min-h-[96px] p-4 font-body text-body-sm text-ink-900 bg-white border border-secondary-500/30 rounded-lg resize-y transition-colors duration-150 focus:outline-none focus:border-secondary-500 focus:ring-3 focus:ring-secondary-50 focus:shadow-none"
              value={annotValue}
              onChange={(e) => {
                setReflections((prev) => ({ ...prev, [block.journalKey]: e.target.value }));
                setReflectionInStore(lessonId, block.journalKey, e.target.value);
              }}
              placeholder={block.placeholder ?? 'Écrivez votre réflexion ici…'}
            />
          </div>
        );
      }

      default:
        return null;
    }
  };

  const SECTION_RENDERERS: Record<SectionId, () => React.ReactNode> = {
    introduction: renderIntroduction,
    engagement: renderEngagement,
    decouvrir: renderDecouvrir,
    quiz: renderQuiz,
    reflechir: renderReflechir,
    appliquer: renderAppliquer,
    conclusion: renderConclusion,
    transfert: renderTransfert,
  };

  const displayTitle = ctx?.lesson.title ?? lessonData.title;
  const displayDuration = ctx?.lesson.duration ?? lessonData.duration;

  return (
    <>
      <style>{`
        @keyframes lpFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lp-card-anim { animation: lpFadeUp 250ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .lp-section-scroll { scrollbar-width: none; }
        .lp-section-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div
        className="fixed inset-0 z-modal bg-white/[0.98] backdrop-blur-glass-heavy flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={`Leçon : ${displayTitle}`}
      >
        {/* HEADER */}
        <ViewerHeader
          tone={tone}
          eyebrow={ctx?.step ? ctx.step.title : 'Leçon'}
          title={displayTitle}
          subtitle={(
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={12} /> {displayDuration}
            </span>
          )}
          current={currentIndex + 1}
          total={SECTIONS.length}
          progress={progress}
          onBack={() => navigate(-1)}
          onClose={handleClose}
        />

        {/* SECTION NAV : Sticky, centered */}
        <nav
          className="sticky top-0 z-sticky bg-white/95 backdrop-blur-glass-light border-b border-ink-100"
          aria-label="Sections de la leçon"
        >
          <Container width="page" className="py-3">
            <div className="lp-section-scroll flex gap-2 overflow-x-auto pb-0.5 justify-center">
              {SECTIONS.map((section, index) => {
                const isActive = index === currentIndex;
                const isDone = completedSections.has(index) && !isActive;
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    className={[
                      'inline-flex items-center gap-2 px-4 py-2 rounded-xl border-none font-body text-caption cursor-pointer transition-all duration-200 whitespace-nowrap relative tracking-[-0.01em]',
                      isActive
                        ? 'bg-primary-500 text-white font-bold shadow-sm'
                        : 'bg-primary-50 text-ink-900 font-medium hover:bg-primary-100',
                    ].join(' ')}
                    onClick={() => goTo(index)}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <Icon size={14} />
                    <span>{section.title}</span>
                    {isActive && (
                      <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                        <div className="w-[7px] h-[7px] rounded-full bg-white" />
                      </div>
                    )}
                    {isDone && (
                      <span
                        className="absolute top-1 right-1 w-2 h-2 rounded-full bg-success-base"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Container>
        </nav>

        {/* CONTENT : Centered, scrollable internally */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
          <div
            className="lp-card-anim bg-white rounded-2xl p-8 sm:p-12 shadow-md w-full max-w-[900px]"
            key={currentSection.id}
          >
            {SECTION_RENDERERS[currentSection.id]()}
          </div>
        </div>

        {/* BOTTOM NAV : Centered, fixed at bottom */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 flex justify-center border-t border-ink-100 bg-white/50 backdrop-blur-glass-light">
          <div className="bg-white rounded-2xl p-5 shadow-sm w-full max-w-[900px]">
            <LessonNavigation
              tone={tone}
              current={currentIndex + 1}
              total={SECTIONS.length}
              onPrev={handlePrev}
              onNext={handleNext}
              onFinish={handleNext}
              onDotSelect={(idx) => goTo(idx)}
              finishLabel="Terminer la leçon"
            />
          </div>
        </div>

        {/* ─ Session Feedback Modal ─────────────────────────────────── */}
        <SessionFeedbackModal
          isOpen={showFeedback}
          onClose={() => {
            setShowFeedback(false);
            navigate(`/learning-paths/${pathId}`);
          }}
          onSubmit={(_rating, _comment) => {
            setShowFeedback(false);
            navigate(`/learning-paths/${pathId}`);
          }}
          title={displayTitle}
          subtitle={`Leçon complétée · ${displayDuration}`}
        />
      </div>
    </>
  );
};
