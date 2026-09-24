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
import { useLessonProgressStore, usePasseportStore } from '../stores/persistence';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, buttonClasses } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Badge } from '../components/ui/Badge';
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
  ChevronLeft,
  ArrowUpRight,
  ImageIcon,
  Play,
  Cpu,
  Globe,
  Link2,
  AlertTriangle,
} from 'lucide-react';
import { resolveLessonContext, getToneFromLevel, getLessonCompetenceIds } from '../data/learningPaths';
import { PAGE_TONE_TO_BUTTON } from '../lib/tone-classes';
import { getCompetenceById } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import { BehavioralTileGrid } from '../components/patterns/BehavioralTileGrid';

/* L'apparence d'un bouton `soft` neutre pour les sélecteurs de fichier des
   blocs média à brancher : le <label> porte l'interaction, la pastille n'en
   est que le dessin (`buttonClasses`). Elle imitait à la main un `outline`
   (filet ink-300 à 1,47:1), niveau réservé à Annuler (arbitrage n°19). */
const CHOISIR_UN_FICHIER = buttonClasses({ emphasis: 'soft', tone: 'neutral', size: 'sm' });

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
  /* ─── Prose ────────────────────────────────────────────────────────────────
     Ajoutés le 2026-09-14 avec la tranche verticale UXUI-M04. L'union ne portait
     que du média et des mises en page ; un module réel est d'abord du texte, et
     il n'y avait aucun moyen de l'écrire autrement qu'en le tassant dans les
     champs structurés (`description`, `points`, `keyPoints`).

     Discipline de tokens, valable pour les cinq : **aucun `leading-*`, aucun
     `font-bold`, aucun `tracking-*`**. Les pas typographiques les portent déjà
     (`--text-h3--line-height`, `--text-h3--font-weight`, `--text-h3--letter-spacing`).
     Les réécrire ici, ce serait alimenter les deux familles que
     `check-handmade.mjs` compte : « interligne écrasant un pas typographique »
     (494 au 14/09) et « graisse écrasant un pas de titre » (21). */
  | {
      type: 'paragraph';
      text: string;
      /** Chapeau de section — un cran au-dessus du corps. Un seul par section. */
      lead?: boolean;
    }
  | {
      /** Titre intra-section. Le rythme vertical vient de la règle `@layer base`
       *  de `index.css` (`margin-block-start: 0.75em`), pas d'un `mt-*` ici. */
      type: 'heading';
      level: 2 | 3 | 4;
      text: string;
    }
  | {
      type: 'list';
      items: string[];
      ordered?: boolean;
    }
  | {
      /** League Spartan n'a aucune face Italic — l'italique passe par
       *  `font-body italic` (Nunito), jamais par `font-display italic`. */
      type: 'quote';
      text: string;
      source?: string;
    }
  | {
      type: 'callout';
      tone: 'primary' | 'warm' | 'sun' | 'neutral';
      title?: string;
      text: string;
    }
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
      src?: string;
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
    }
  | {
      type: 'embed';
      url?: string;
      title?: string;
      caption?: string;
      provider?: 'youtube' | 'vimeo' | 'loom' | 'canva' | 'google-doc' | 'google-slides' | 'figma' | 'other';
      aspectRatio?: '16/9' | '4/3' | '1/1';
    }
  | {
      type: 'split';
      left: ContentBlock[];
      right: ContentBlock[];
      ratio?: '1/1' | '2/1' | '1/2';
      caption?: string;
    }
  | {
      type: 'bento';
      title?: string;
      cells: {
        size?: 'sm' | 'md' | 'full';
        blocks: ContentBlock[];
        tone?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'dark';
        label?: string;
      }[];
      caption?: string;
    }
  | {
      type: 'table';
      title?: string;
      headers: string[];
      rows: (string | number)[][];
      caption?: string;
      highlightCol?: number;
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
    steps?: { title?: string; blocks: ContentBlock[] }[];
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
  /* ─── UXUI-M04 · Design Systems & Component Libraries ──────────────────────
     Tranche verticale du 2026-09-14 : premier module réel du corpus
     (`docs/learning/modules-corriges-2026-07-23/3-UX-UI-Product-Management/UXUI-M04-Design-Systems.md`)
     porté dans le player, pour juger le design sur du texte qui n'a pas été
     calibré pour lui.

     ⚠️ Ce que la tranche apprend sur le mapping. `INTEGRATION-CORPUS-FORMATIONS.md`
     prévoyait « un module = une Étape, une section EDRACT = une Leçon ». La forme
     de `LessonData` dit l'inverse : elle porte les huit temps EDRACT d'un coup,
     donc **un module = une Leçon**. Mapping à corriger avant de convertir les 33
     autres.

     Le quiz suit la contrainte du back-office (`tls_learning_items`, type
     `lecon`) : exactement 7 questions × 4 options. */
  'uxui-m04': {
    title: 'Design Systems & Component Libraries',
    duration: '65 min',
    intro: {
      heading: 'Ce que tu as construit sans le nommer',
      description:
        "Tu as déjà un design system. Ce module lui donne son vocabulaire — tokens en trois couches, anatomie d'un composant, Atomic Design — et te rend lisible le piège central : le drift, quand un même concept finit par avoir deux valeurs.",
      objectives: [
        'Construire un design system extensible (tokens, composants, documentation)',
        'Créer une bibliothèque de composants avec variantes',
        "Documenter un composant (props, usage, accessibilité)",
      ],
      blocks: [
        {
          type: 'quote',
          text: 'A living, breathing system of components and standards that serves as the single source of truth.',
          source: 'Formulation InVision, authentique',
        },
        {
          type: 'callout',
          tone: 'sun',
          title: 'Trois statistiques ont été retirées de ce module',
          text: "« Sans design system = 60 % du temps en redesign », « design system mature = +300 % de vitesse (Figma study 2025) » et « l'incohérence coûte 18 K€/mois » sont fabriquées : aucune étude Figma 2025 ne documente ce chiffre, les deux autres n'ont pas de source. Les bénéfices se défendent sans chiffre inventé — et c'est la première leçon du module.",
        },
      ],
    },
    engagement: {
      heading: 'Une décision de design ne descend que dans les composants',
      pillars: [
        {
          title: 'Le rayon qui n’est pas descendu',
          description:
            "Le 09/09, le rayon des cartes passe à 14 px dans Card.tsx. Le même jour, 82 cartes faites main restent à 20 ou 24. Deux rayons de carte coexistent, et personne ne le voit.",
          tags: ['R1', 'Card.tsx', '14 px'],
        },
        {
          title: 'Le filet qui n’est pas descendu',
          description:
            "Le 10/09, le filet des boutons doux est fermé au cran 600 — conforme au seuil de 3:1. Les CTA faits main ne l'ont jamais su.",
          tags: ['contraste', 'SC 1.4.11'],
        },
        {
          title: 'Chaque élément fait main est une décision future qui n’arrivera pas',
          description:
            "C'est la raison d'être des trois garde-fous. Ils ne jugent pas : ils disent où regarder quand une décision vient d'être prise.",
          tags: ['check-handmade', 'garde-fou'],
        },
      ],
      blocks: [
        {
          type: 'paragraph',
          lead: true,
          text: "La question de ce module n'est pas « as-tu un design system ? » — tu en as un. Elle est : est-ce qu'une décision prise à un endroit arrive partout ?",
        },
        {
          type: 'table',
          title: 'Le compteur, mesuré le 2026-09-14 sur 387 fichiers de produit',
          headers: ['Famille', 'Faits main', 'Devrait passer par'],
          rows: [
            ['carte', 264, '<Card>'],
            ['pastille d’icône', 179, 'aucun — à créer si le motif se confirme'],
            ['ligne de méta', 93, '<MetaPill> / <MetaPillGroup>'],
            ['badge d’état', 52, '<Badge>'],
            ['bouton', 11, '<Button>'],
            ['champ de saisie', 8, '<Input>'],
          ],
          caption:
            'node scripts/check-handmade.mjs — un chiffre n’est pas un défaut : sur 110 cartes mesurées le 10/09, deux seulement étaient l’équivalent exact d’une <Card>.',
        },
      ],
    },
    decouvrir: {
      heading: 'Tokens, composants, documentation',
      bad: {
        label: 'Sans système',
        title: 'La valeur écrite à la main',
        description:
          "Chaque page redessine son bouton. Le hex vit dans le composant. Le même concept finit par avoir deux valeurs — et l'écran ment sans qu'aucune erreur ne s'affiche.",
        points: [
          'background: #55A1B4 écrit en dur dans la feuille du composant',
          'Un correctif doit être répété à chaque endroit — donc il ne l’est pas',
          'Deux définitions d’un même token : celle qui gagne dépend de la cascade',
          'Aucun moyen de savoir ce qui s’applique sans ouvrir le navigateur',
        ],
      },
      good: {
        label: 'Avec système',
        title: 'La valeur nommée une seule fois',
        description:
          "Un concept, une valeur, un endroit. Toute redéfinition est un alias sur la source unique. Un correctif se propage à toutes les instances.",
        points: [
          'Couche 1 — primitives : --blue-500: #55A1B4',
          'Couche 2 — sémantique : --color-brand-primary: var(--blue-500)',
          'Couche 3 — composant : --btn-primary-bg: var(--color-brand-primary)',
          'Une seule définition par token, dans @theme — jamais une seconde valeur',
        ],
      },
      steps: [
        {
          title: 'L’anatomie d’un composant',
          blocks: [
            {
              type: 'paragraph',
              text: "Un composant, c'est une partie visuelle, des variantes et des propriétés. Le bouton est l'exemple canonique parce qu'il porte les quatre axes d'un coup.",
            },
            {
              type: 'list',
              items: [
                'Anatomie — libellé, fond, bordure (optionnelle), icône (optionnelle)',
                'Variantes — type (primaire, secondaire, fantôme, danger) × taille (S/M/L) × état × largeur',
                'Props — label, type, size, icon, onClick, disabled, loading',
              ],
            },
            {
              type: 'callout',
              tone: 'primary',
              title: 'La règle d’écriture des variantes',
              text: "Des maps TypeScript de classes complètes et statiques, jamais de concaténation. Tailwind ne compile que le littéral : une classe construite avec ${x} n'existera pas dans le CSS produit.",
            },
          ],
        },
        {
          title: 'La structure en couches du design system TLS',
          blocks: [
            {
              type: 'bento',
              title: 'Quatre couches',
              cells: [
                {
                  size: 'md',
                  tone: 'primary',
                  label: 'Noyau',
                  blocks: [
                    {
                      type: 'paragraph',
                      text: 'Bouton, champ, case à cocher, bouton radio, interrupteur, menu déroulant, pastille, icône.',
                    },
                  ],
                },
                {
                  size: 'sm',
                  tone: 'neutral',
                  label: 'Composite',
                  blocks: [
                    {
                      type: 'paragraph',
                      text: 'Carte, modale, notification, fil d’Ariane, onglets, accordéon, pagination.',
                    },
                  ],
                },
                {
                  size: 'sm',
                  tone: 'secondary',
                  label: 'Fonctionnelle',
                  blocks: [
                    {
                      type: 'paragraph',
                      text: 'Navigation latérale, en-tête, grille de dashboard, carte de cours, lecteur de leçon.',
                    },
                  ],
                },
                {
                  size: 'md',
                  tone: 'accent',
                  label: 'Patterns',
                  blocks: [
                    {
                      type: 'paragraph',
                      text: 'Mises en page de formulaires, états vides, états de chargement, pages d’erreur, parcours d’intégration.',
                    },
                  ],
                },
              ],
            },
            {
              type: 'callout',
              tone: 'warm',
              title: 'Le compte a été recorrigé deux fois',
              text: "La version d'origine disait « 87 composants documentés dans Storybook ». Le DS TLS n'utilise pas Storybook — le showcase est src/pages/Components.tsx. La passe du 23/07 avait posé « > 90 » ; recompté le 14/09 : 212 fichiers et ≈ 254 composants exportés, dont 85 en ui/ et 89 en patterns/. Le « > 90 » sous-estimait d'un facteur 2,5.",
            },
          ],
        },
        {
          title: 'Atomic Design, et ce qu’il ne dit pas',
          blocks: [
            {
              type: 'paragraph',
              text: "Brad Frost : atomes → molécules → organismes → gabarits → pages. C'est du canon, et c'est une manière de ranger, pas une manière de décider.",
            },
            {
              type: 'paragraph',
              text: "Ce que la hiérarchie ne dit pas, c'est quand un élément fait main mérite de devenir un composant. Le détecteur repère par signature — un rayon, une surface, un padding — pas par nom. Il dit où regarder ; c'est un humain qui tranche entre migrer l'élément et étendre le composant.",
            },
            {
              type: 'heading',
              level: 3,
              text: 'Documenter un composant',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Usage — quand l’employer, et quand ne pas',
                'Anatomie et variantes',
                'À faire / à éviter',
                'Props typées',
                'Notes d’accessibilité',
                'Lien Figma et implémentation',
              ],
            },
            {
              type: 'callout',
              tone: 'sun',
              title: 'La note d’accessibilité du bouton était incomplète',
              text: "Elle disait « contraste ≥ 4,5:1 » sans réserve. Or le teal de marque #55A1B4 mesure 2,94:1 sur blanc — il échoue AA, et même le seuil grand texte. Le token de texte doit pointer vers #3D7786 (primary-700, 5,02:1). Un module qui enseigne l'accessibilité doit être exemplaire sur ce point précis.",
            },
          ],
        },
      ],
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          text: 'Qu’est-ce qui définit un design system ?',
          options: [
            { id: 'a', label: 'Une bibliothèque de composants dans Figma' },
            { id: 'b', label: 'Une source de vérité unique : tokens, composants, règles d’usage et code' },
            { id: 'c', label: 'Un guide de style PDF partagé à l’équipe' },
            { id: 'd', label: 'Un thème CSS réutilisable entre projets' },
          ],
          correct: 'b',
        },
        {
          id: 'q2',
          text: 'Dans quel ordre vont les trois couches de tokens ?',
          options: [
            { id: 'a', label: 'Composant → sémantique → primitive' },
            { id: 'b', label: 'Sémantique → primitive → composant' },
            { id: 'c', label: 'Primitive → sémantique → composant' },
            { id: 'd', label: 'Il n’y a pas d’ordre, les trois sont équivalentes' },
          ],
          correct: 'c',
        },
        {
          id: 'q3',
          text: 'Atomic Design — quel est l’ordre de Brad Frost ?',
          options: [
            { id: 'a', label: 'Atomes → molécules → organismes → gabarits → pages' },
            { id: 'b', label: 'Atomes → organismes → molécules → pages → gabarits' },
            { id: 'c', label: 'Molécules → atomes → gabarits → organismes → pages' },
            { id: 'd', label: 'Pages → gabarits → organismes → molécules → atomes' },
          ],
          correct: 'a',
        },
        {
          id: 'q4',
          text: 'Combien de composants compte le design system TLS (mesuré le 2026-09-14) ?',
          options: [
            { id: 'a', label: '87, documentés dans Storybook' },
            { id: 'b', label: 'Un peu plus de 90' },
            { id: 'c', label: '≈ 254 composants sur 212 fichiers' },
            { id: 'd', label: 'Environ 500' },
          ],
          correct: 'c',
        },
        {
          id: 'q5',
          text: 'Où est documenté le design system TLS ?',
          options: [
            { id: 'a', label: 'Dans Storybook' },
            { id: 'b', label: 'Dans le showcase interne src/pages/Components.tsx' },
            { id: 'c', label: 'Dans un fichier tailwind.config.js' },
            { id: 'd', label: 'Uniquement dans Figma' },
          ],
          correct: 'b',
        },
        {
          id: 'q6',
          text: 'Le teal de marque #55A1B4 sur blanc, pour du texte : quel est le verdict WCAG ?',
          options: [
            { id: 'a', label: '4,6:1 — il passe AA' },
            { id: 'b', label: '3,2:1 — il passe en grand texte seulement' },
            { id: 'c', label: '2,94:1 — il échoue AA et même le seuil grand texte' },
            { id: 'd', label: 'Le ratio dépend de la police, il n’est pas calculable' },
          ],
          correct: 'c',
        },
        {
          id: 'q7',
          text: 'Un token est déjà défini dans @theme. Tu as besoin de le redéclarer ailleurs. Que fais-tu ?',
          options: [
            { id: 'a', label: 'Je recopie la valeur — c’est la même, donc c’est sans risque' },
            { id: 'b', label: 'J’écris un alias : var(--la-vraie-source)' },
            { id: 'c', label: 'J’ajoute une troisième valeur pour ce cas particulier' },
            { id: 'd', label: 'Je supprime la définition d’origine' },
          ],
          correct: 'b',
        },
      ],
    },
    reflechir: {
      heading: 'Ce que ça change dans ton propre code',
      questions: [
        'Où, dans ton repo, un même concept a-t-il deux valeurs aujourd’hui ? Qu’est-ce qui t’a permis de le voir — ou pas ?',
        'Parmi les 264 cartes faites main, laquelle mérite de devenir une <Card> et laquelle demande plutôt d’étendre le composant ? À quoi le reconnais-tu ?',
        'Une décision de design que tu as prise ces trois derniers mois : est-elle descendue partout ? Comment le sais-tu ?',
      ],
      blocks: [
        {
          type: 'callout',
          tone: 'neutral',
          title: 'La mesure, pas la lecture',
          text: "getComputedStyle() dit ce qui s'applique ; le code lu dit ce qu'on croit avoir écrit. Quand les deux divergent, c'est la cascade qui a tranché — et c'est presque toujours là que vit le drift.",
        },
      ],
    },
    appliquer: {
      heading: 'Ton chantier réel — R2, les rayons à 24 px',
      instruction:
        "Prends 10 des 89 fichiers qui portent un rounded-2xl (grep -rl \"rounded-2xl\" src/). Pour chacun, une seule question — celle que Card.tsx a déjà écrite : cet objet porte-t-il une bordure de 1 px ? Si oui, la courbe de 24 px est trop longue pour un trait fin et le coin paraît mou : candidat à rounded-lg. Si non — surface pleine, dégradé, verre, ombre portée — c'est l'autre registre, celui qui fait flotter l'objet, et 24 px peut être juste. Classe chaque cas, corrige-en un, vérifie au navigateur.",
      blocks: [
        {
          type: 'callout',
          tone: 'warm',
          title: 'Le piège',
          text: "Un sed sur les 157 occurrences. Tu casserais toutes les surfaces sans bordure, qui ont raison d'être à 24. La discipline est la même que pour le contraste : un verdict par élément, mesuré.",
        },
        {
          type: 'paragraph',
          text: "Le livrable n'est pas le diff : c'est R2 tranchée par écrit dans le commentaire de Card.tsx, au même endroit et dans la même forme que R1 et R3. Une décision qui n'est pas écrite ne descend pas — c'est tout le propos de ce module.",
        },
      ],
    },
    conclusion: {
      heading: 'Ce que tu retiens',
      keyPoints: [
        'Un design system est une source de vérité unique — tokens, composants, documentation, code',
        'Trois couches de tokens : primitive → sémantique → composant. Jamais un hex en dur',
        'Atomic Design range ; il ne décide pas quand un élément fait main devient un composant',
        'Une redéfinition est un alias, jamais une seconde valeur',
        'La valeur d’un design system se démontre sans chiffre fabriqué',
      ],
      nextSteps: [
        'Trancher R2 et l’écrire dans Card.tsx',
        'Relancer les trois garde-fous après la décision, pas avant',
        'Documenter une variante de composant que tu viens de créer',
      ],
      blocks: [
        {
          type: 'quote',
          text: 'Single source of truth — un concept, une valeur, un endroit.',
          source: 'Le mantra du module',
        },
      ],
    },
    transfert: {
      heading: 'Cette semaine',
      intro:
        "Le transfert d'un module de design system ne se joue pas sur ce que tu retiens, mais sur ce qui descend. Choisis un scénario et engage-toi dessus.",
      scenarios: [
        {
          title: 'Après chaque décision de design',
          context:
            'Lancer les trois garde-fous — check-handmade, check-token-coverage, check-showcase-coverage — et lire la famille concernée avant de fermer la décision.',
        },
        {
          title: 'Avant de créer un composant',
          context:
            'Vérifier le type réel et ses champs dans le catalogue du back-office plutôt que d’inventer une forme côté front.',
        },
        {
          title: 'Quand une valeur semble dupliquée',
          context:
            'Mesurer au navigateur laquelle gagne, puis transformer le doublon en alias — jamais ajouter une troisième valeur.',
        },
      ],
      commitmentPrompt:
        'Quelle décision de design vas-tu écrire cette semaine — et où exactement ?',
      blocks: [
        {
          type: 'callout',
          tone: 'primary',
          title: 'Rappel espacé',
          text: 'J+2 : relire les trois couches de tokens. J+7 : relancer check-handmade et comparer le compteur des cartes à celui du 14/09 (264).',
        },
      ],
    },
  },
  'lecon-1-2-1': {
    title: 'Motivation et Engagement',
    duration: '50 min',
    intro: {
      heading: 'Bienvenue dans cette leçon',
      description: 'Cette leçon explore les mécanismes de la motivation intrinsèque et extrinsèque, et te donne les outils pour créer les conditions d\'un engagement durable dans ton équipe.',
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
      heading: 'Analyse ton équipe',
      questions: [
        'Quels sont les 3 principaux facteurs de motivation dans ton équipe actuellement ?',
        'Y a-t-il des collaborateurs dont tu ne connais pas bien les motivations profondes ? Comment pourrais-tu le découvrir ?',
        'Comment créer plus d\'opportunités de progrès visible pour ton équipe cette semaine ?',
      ],
    },
    appliquer: {
      heading: 'Crée ton plan d\'action',
      instruction: 'Définis un objectif précis lié à la motivation de ton équipe et identifie 3 actions concrètes que tu peux mettre en place dès cette semaine.',
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
        'Planifie un 1:1 avec chaque membre de ton équipe pour découvrir ses motivations',
        'Identifie une tâche actuelle que tu peux rendre plus autonome',
        'Passe à la section Transfert pour ancrer ces apprentissages dans ton contexte réel',
        'Crée un rituel hebdomadaire de reconnaissance des contributions',
      ],
    },
    transfert: {
      heading: 'Transférer dans ton contexte',
      intro: 'Le transfert est la phase la plus importante : comment vas-tu appliquer ces apprentissages dans ta situation professionnelle réelle, dès cette semaine ?',
      scenarios: [
        {
          title: 'Avec ton équipe',
          context: 'Choisis un collaborateur dont tu ne connais pas bien les motivations profondes. Planifie un entretien informel de 15 min cette semaine pour découvrir ce qui le motive vraiment.',
        },
        {
          title: 'Dans ton management quotidien',
          context: 'Identifie une tâche que tu attribues de façon directive. Reformule la consigne pour laisser le collaborateur choisir comment l\'accomplir (autonomie sur les moyens).',
        },
        {
          title: 'Sur le long terme',
          context: 'Mets en place un rituel mensuel de reconnaissance explicite : non monétaire. Partage un impact concret que chaque personne a eu sur les résultats de l\'équipe.',
        },
      ],
      commitmentPrompt: 'Décris une situation précise où tu vas appliquer ces apprentissages cette semaine. Sois spécifique : qui, quand, comment.',
    },
  },

  'bootcamp-lecon-1-1': {
    title: 'Design System Fundamentals',
    duration: '2h',
    intro: {
      heading: 'Bienvenue dans le Bootcamp',
      description: 'Cette première leçon pose les fondations conceptuelles de ton parcours de 12 semaines. Tu vas comprendre ce qu\'est un Design System, pourquoi c\'est le fil conducteur de tout ce qu\'on construit ensemble, et créer ton premier artefact concret : un token spreadsheet.',
      objectives: [
        'Comprendre la structure d\'un design system : tokens, composants, documentation',
        'Identifier le flux Figma → CSS custom properties → Tailwind utilities dans le projet TLS',
        'Créer ton premier token spreadsheet (couleurs, typo, spacing)',
        'Te situer dans UX-UI-BOOTCAMP.md et le plan Semaine 1',
      ],
      blocks: [
        {
          type: 'image' as const,
          alt: 'Aperçu du Design System TLS',
          caption: 'Capture : vue d\'ensemble du DS dans Figma',
          aspectRatio: '16/9' as const,
        },
        {
          type: 'video' as const,
          caption: 'Vidéo d\'introduction au bootcamp (2 min)',
          aspectRatio: '16/9' as const,
        },
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
          'Composants React typés avec props claires : <Button emphasis="soft" size="md" />',
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
            { num: 4, label: 'Composant React', desc: '<Button emphasis="soft" />', color: 'primary' },
          ],
        },
      ],
      steps: [
        {
          title: 'Photo — capture d\'écran ou illustration',
          blocks: [
            {
              type: 'image' as const,
              alt: 'Exemple d\'image dans une étape',
              caption: 'Upload une capture Figma, une photo ou une illustration',
              aspectRatio: '16/9' as const,
            },
          ],
        },
        {
          title: 'Vidéo — tutoriel ou démo screen-record',
          blocks: [
            {
              type: 'video' as const,
              caption: 'Upload une vidéo MP4 ou WebM (screen-record, tutoriel…)',
              aspectRatio: '16/9' as const,
            },
          ],
        },
        {
          title: 'Animation — GIF ou micro-interaction',
          blocks: [
            {
              type: 'gif' as const,
              alt: 'Animation ou micro-interaction',
              caption: 'Upload un GIF animé pour illustrer une interaction',
            },
          ],
        },
        {
          title: 'Embed — Canva / Google Slides / Figma',
          blocks: [
            {
              type: 'embed' as const,
              provider: 'canva' as const,
              caption: 'Colle l\'URL de partage — l\'embed se charge automatiquement',
              aspectRatio: '16/9' as const,
            },
          ],
        },
        {
          title: 'Graphique — données et métriques',
          blocks: [
            {
              type: 'chart' as const,
              chartType: 'bar' as const,
              title: 'Adoption des design tokens par couche',
              data: [
                { label: 'Couleurs', value: 98 },
                { label: 'Typographie', value: 85 },
                { label: 'Espacement', value: 72 },
                { label: 'Rayons', value: 90 },
                { label: 'Ombres', value: 61 },
              ],
            },
            {
              type: 'chart' as const,
              chartType: 'donut' as const,
              title: 'Répartition des composants DS',
              data: [
                { label: 'Atoms (Button, Badge…)', value: 18 },
                { label: 'Composites (Card, Modal…)', value: 24 },
                { label: 'Patterns (Section, Hero…)', value: 14 },
                { label: 'Pages', value: 4 },
              ],
            },
          ],
        },
        {
          title: 'Split screen — comparaison côte à côte',
          blocks: [
            {
              type: 'split' as const,
              ratio: '1/1' as const,
              caption: 'Avant / Après migration Tailwind',
              left: [
                {
                  type: 'image' as const,
                  alt: 'Avant — classes BEM',
                  caption: '❌ Avant — classes BEM inline',
                  aspectRatio: '4/3' as const,
                },
                {
                  type: 'schema' as const,
                  items: [
                    { label: '.btn--primary', desc: 'hardcodé dans tls-components.css', color: 'neutral' },
                    { label: 'style={{ color: "#55A1B4" }}', desc: 'inline style interdit', color: 'neutral' },
                  ],
                  layout: 'vertical' as const,
                },
              ],
              right: [
                {
                  type: 'image' as const,
                  alt: 'Après — Tailwind tokens',
                  caption: '✅ Après — Tailwind tokens',
                  aspectRatio: '4/3' as const,
                },
                {
                  type: 'schema' as const,
                  items: [
                    { label: 'bg-primary-600', desc: 'token mappé dans @theme', color: 'primary' },
                    { label: 'text-white rounded-pill', desc: 'utilities vérifiées au build', color: 'primary' },
                  ],
                  layout: 'vertical' as const,
                },
              ],
            },
          ],
        },
        {
          title: 'Bento grid — vue d\'ensemble système',
          blocks: [
            {
              type: 'bento' as const,
              title: 'Design System TLS — architecture en un coup d\'œil',
              caption: 'Chaque cellule = une couche du système',
              cells: [
                {
                  size: 'full' as const,
                  tone: 'primary' as const,
                  label: '🎨 Tokens (source de vérité)',
                  blocks: [
                    {
                      type: 'schema' as const,
                      items: [
                        { label: 'Couleurs', desc: 'primary-50…900 · secondary · accent · ink · semantic', color: 'primary' },
                        { label: 'Typographie', desc: 'text-h1…micro · font-display · font-body', color: 'primary' },
                        { label: 'Spacing', desc: 'gap-stack · gap-section · gap-page (7 tokens)', color: 'primary' },
                      ],
                      layout: 'flow' as const,
                    },
                  ],
                },
                {
                  size: 'md' as const,
                  tone: 'secondary' as const,
                  label: '🧩 Composants (51 UI)',
                  blocks: [
                    {
                      type: 'schema' as const,
                      items: [
                        { label: 'Atoms', desc: 'Button, Badge, Avatar, Input…' },
                        { label: 'Composites', desc: 'Card, Modal, Toast, Alert…' },
                        { label: 'Patterns', desc: 'SectionHeader, EditorialHero…' },
                      ],
                      layout: 'vertical' as const,
                    },
                  ],
                },
                {
                  size: 'sm' as const,
                  tone: 'accent' as const,
                  label: '✅ Coverage',
                  blocks: [
                    {
                      type: 'chart' as const,
                      chartType: 'donut' as const,
                      data: [
                        { label: 'Tailwind', value: 92 },
                        { label: 'BEM restant', value: 8 },
                      ],
                    },
                  ],
                },
                {
                  size: 'sm' as const,
                  tone: 'neutral' as const,
                  label: '📐 Figma',
                  blocks: [
                    {
                      type: 'schema' as const,
                      items: [
                        { label: '153 variables', desc: 'bindées aux composants', num: 1 },
                        { label: '98% coverage', desc: 'fills token-driven', num: 2 },
                      ],
                      layout: 'vertical' as const,
                    },
                  ],
                },
                {
                  size: 'md' as const,
                  tone: 'dark' as const,
                  label: '🚀 Pipeline',
                  blocks: [
                    {
                      type: 'schema' as const,
                      items: [
                        { num: 1, label: 'Figma Variables', desc: 'source design', color: 'primary' },
                        { num: 2, label: 'CSS @theme', desc: 'src/index.css', color: 'primary' },
                        { num: 3, label: 'Tailwind utilities', desc: 'bg-primary-500', color: 'primary' },
                      ],
                      layout: 'horizontal' as const,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: 'Tableau — référence tokens',
          blocks: [
            {
              type: 'table' as const,
              title: 'Référence rapide — tokens couleur TLS',
              highlightCol: 1,
              caption: 'Source de vérité : src/index.css @theme block',
              headers: ['Token', 'Classe Tailwind', 'Hex', 'Usage principal'],
              rows: [
                ['primary-500', 'bg-primary-500', '#55A1B4', 'Liens, icônes actives, CTA secondaire'],
                ['primary-600', 'bg-primary-600', '#4A8FA1', 'Bouton primary rest'],
                ['primary-700', 'bg-primary-700', '#3D7786', 'Bouton primary hover'],
                ['secondary-500', 'bg-secondary-500', '#ED843A', 'CTA warm, badges secondary'],
                ['accent-400', 'bg-accent-400', '#F8B044', 'Warning, progress dots, étoiles'],
                ['ink-900', 'bg-ink-900', '#1a1a1a', 'Texte principal'],
                ['ink-500', 'text-ink-500', '#6B7280', 'Texte secondaire / captions'],
                ['success-base', 'bg-success-base', '#9DBEBA', 'États succès (muted teal)'],
                ['danger-base', 'bg-danger-base', '#F28559', 'Erreurs (soft coral)'],
              ],
            },
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
      heading: 'Analyse le Design System TLS existant',
      questions: [
        'Ouvre src/styles/ dans le projet. Quels fichiers de tokens trouves-tu ? Quelle est la différence entre --color-primary-500 et --color-ink-900 dans leur usage ?',
        'Navigue dans src/components/core/Button.tsx. Comment le composant utilise-t-il les tokens ? Que se passerait-il visuellement si tu changeais --color-primary-500 ?',
        'En 2-3 phrases : qu\'est-ce qui changerait dans ton workflow si la parité Figma↔code était à 100% dans le projet TLS ?',
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
      heading: 'Créer ton token spreadsheet',
      instruction: 'Ouvre un nouveau fichier (Notion, Google Sheets, ou un .md dans docs/). Crée 3 colonnes : Token Name | Valeur | Usage. Liste au minimum 10 tokens du projet TLS (ouvre src/styles/tokens.css ou équivalent). Inclus : 3 couleurs primary, 2 couleurs ink, 2 tokens de typo, 2 tokens de spacing, 1 token de shadow. Ce spreadsheet est ta référence pour toute la Semaine 1.',
    },
    conclusion: {
      heading: 'Fondamentaux posés : prêt pour la suite',
      keyPoints: [
        'Un design system = tokens + composants + documentation. Les trois doivent être alignés pour fonctionner.',
        'Le flux TLS : Figma variables → CSS custom properties (--color-*) → Tailwind utilities (text-primary-500)',
        'Les tokens sont le DNA du design : changer un token = changer l\'apparence partout, en une seule modification',
        'Ton token spreadsheet est le premier artefact du bootcamp : il sera réutilisé toute la Semaine 1',
      ],
      nextSteps: [
        'Compléter ton token spreadsheet (min. 10 tokens) avant la Leçon 2',
        'Lire docs/learning/UX-UI-BOOTCAMP.md : section Semaine 1 en entier',
        'Leçon 2 : Figma Design System Setup : créer les variables dans Figma et binder aux composants',
      ],
    },
    transfert: {
      heading: 'Appliquer dans le projet TLS maintenant',
      intro: 'Ce que tu viens d\'apprendre existe déjà dans le code. Le transfert commence aujourd\'hui : pas la semaine prochaine. Voici 3 actions concrètes dans le vrai projet.',
      scenarios: [
        {
          title: 'Dans src/styles/tokens.css',
          context: 'Ouvre le fichier de tokens TLS. Localise --color-primary-500. Change temporairement sa valeur (ex: rouge #e53e3e), observe l\'impact en live sur une page, puis rétablis-la (git checkout). C\'est la preuve vivante qu\'un token = un impact global.',
        },
        {
          title: 'Dans Figma TLS (fichier LccBZ1...)',
          context: 'Ouvre le fichier Figma TLS. Cherche la page Foundations. Compare les variables Figma avec tes tokens CSS. Note les écarts dans ton token spreadsheet : cette liste devient ton backlog Semaine 1 pour la parité Figma↔code.',
        },
        {
          title: 'Avant la Leçon 2',
          context: 'Arrive avec ton token spreadsheet complété (10+ tokens) et les écarts Figma↔code identifiés. La Leçon 2 part directement de ce travail pour configurer les variables Figma et les binder aux composants existants.',
        },
      ],
      commitmentPrompt: 'Décris en une phrase le premier changement concret que tu vas explorer dans tokens.css ou Figma après cette leçon : et pourquoi ce choix.',
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
    description: 'Cette leçon te guidera à travers les concepts fondamentaux du module.',
    objectives: [
      'Comprendre les concepts fondamentaux présentés dans cette leçon',
      'Identifier les opportunités d\'application dans ton contexte professionnel',
      'Mettre en pratique avec les exercices proposés',
      'Consolider tes apprentissages avec les ressources complémentaires',
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
    heading: 'Prends le temps de réfléchir',
    questions: [
      'Quels aspects de cette leçon résonnent le plus avec ton expérience actuelle ?',
      'Comment vas-tu appliquer ces concepts dès la semaine prochaine ?',
      'Quels obstacles anticipes-tu et comment les surmonter ?',
    ],
  },
  appliquer: {
    heading: 'Crée ton plan d\'action',
    instruction: 'Définis un objectif SMART et 3 actions concrètes à mettre en œuvre dans les prochains jours.',
  },
  conclusion: {
    heading: 'Récapitulatif et prochaines étapes',
    keyPoints: [
      'La pratique régulière est plus efficace que les sessions intensives espacées',
      'Connecte chaque concept à une situation réelle que tu as vécue',
      'Le partage avec tes pairs accélère l\'ancrage mémoriel',
    ],
    nextSteps: [
      'Identifie une situation concrète où appliquer ce que tu as appris',
      'Partage 1 insight avec un collègue de confiance',
      'Passe à la prochaine leçon pour approfondir le sujet',
    ],
  },
  transfert: {
    heading: 'Transférer dans ton contexte',
    intro: 'La maîtrise s\'acquiert en dehors de la formation. Comment vas-tu appliquer ces apprentissages dans ta situation réelle ?',
    scenarios: [
      {
        title: 'Application immédiate',
        context: 'Identifie une situation concrète cette semaine où tu pourras mettre en pratique ce que tu viens d\'apprendre.',
      },
      {
        title: 'Partage avec un pair',
        context: 'Explique un concept clé de cette leçon à un collègue. Enseigner accélère l\'ancrage mémoriel (effet protégé).',
      },
      {
        title: 'Itération',
        context: 'Note ce qui a fonctionné et ce qui n\'a pas marché lors de ta première application. Ajuste et recommence.',
      },
    ],
    commitmentPrompt: 'Décris précisément comment et où tu vas appliquer ces apprentissages dans les 7 prochains jours.',
  },
};

/* ─── Section title shared class ────────────────────────────────────────── */

/* Titre de section : h2 28 à son pas (interligne du token — il était forcé à
   1,15 — et 700 du token, sans `font-bold` à côté). 16 px avant le contenu
   qu'il introduit. Premier enfant de la carte : la marge de base des titres
   ne s'y applique pas. */
const SECTION_TITLE = 'font-display text-h2 text-ink-900 text-balance mb-stack';

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
  const addQuizAttempt = useLessonProgressStore((s) => s.addQuizAttempt);
  const addEvidence = usePasseportStore((s) => s.addEvidence);

  const [currentIndex, setCurrentIndex] = useState(persistedEntry?.lastSection ?? 0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(
    new Set(persistedEntry?.completed ?? [0])
  );

  // Persist on every change
  useEffect(() => {
    setSectionInStore(lessonId, currentIndex, SECTIONS.length);
  }, [lessonId, currentIndex, setSectionInStore]);

  // Reset step navigation when lesson changes
  useEffect(() => {
    setDecouvrirStep(0);
  }, [lessonId]);

  const [reflections, setReflections] = useState<Record<string, string>>(
    persistedEntry?.reflections ?? {}
  );
  const [actionPlan, setActionPlan] = useState(
    persistedEntry?.actionPlan ?? { objectif: '', action1: '', action2: '', action3: '' }
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [uploadedSrcs, setUploadedSrcs] = useState<Record<string, string>>({});
  const [embeddedUrls, setEmbeddedUrls] = useState<Record<string, string>>({});
  const [embedInputs, setEmbedInputs] = useState<Record<string, string>>({});
  const [decouvrirStep, setDecouvrirStep] = useState(0);

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

  /* Fermer ramène au détail du parcours, jamais à la leçon suivante : le ✕
     avançait l'apprenant quand il voulait sortir (audit du 23/09). La position
     n'a rien à faire ici, elle est déjà persistée à chaque changement de
     section (`setSectionInStore`, plus haut) : on la retrouve en revenant. */
  const handleClose = () => {
    navigate(`/learning-paths/${pathId}`);
  };

  /* ── Section renderers ──────────────────────────────────────────────── */

  /* L'introduction est la couverture de la leçon : son titre est le h1 de
     l'écran (36), la description son chapô (18 ink-700 ; elle était à 16 au
     cran 500). Les objectifs sont une section (h2 28, sans icône) et une
     liste : plus des tuiles grises pleines qui ressemblaient à des boutons. */
  const renderIntroduction = () => (
    <div className="flex flex-col gap-section">
      <header className="flex flex-col gap-stack-sm">
        <h1 className="font-display text-h1 text-ink-900 text-balance">{displayTitle}</h1>
        <p className="font-body text-body-lg text-ink-700">
          {lessonData.intro.description}
        </p>
      </header>
      <section className="flex flex-col gap-stack">
        <h2 className="font-display text-h2 text-ink-900">
          Objectifs d&apos;apprentissage
        </h2>
        <ul className="flex flex-col gap-stack-sm">
          {lessonData.intro.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-stack-sm">
              {/* Target (goal), not a check — these are objectives to reach,
                  not items already done. Calée sur la 1re ligne : (26 − 18) / 2. */}
              <Target size={18} className="text-primary-700 shrink-0 mt-1" aria-hidden="true" />
              <span className="font-body text-body text-ink-900">{obj}</span>
            </li>
          ))}
        </ul>
      </section>
      {lessonData.intro.blocks?.map((block, i) => renderContentBlock(block, i))}
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
        {/* Deux encadrés au même dessin : l'état (Badge) → 12 → titre h3 →
            8 → texte ink-700 (il était au cran 500) → 12 → les points, 8 entre
            eux, chaque icône calée sur la première ligne du point. */}
        <div className="rounded-lg p-stack-lg mb-stack flex flex-col gap-stack-sm bg-danger-base/[0.06] border-2 border-danger-base/25">
          <Badge variant="danger" className="self-start">
            <XCircle size={14} aria-hidden="true" /> {d.bad.label}
          </Badge>
          <div className="flex flex-col gap-stack-xs">
            <h3 className="font-display text-h3 text-ink-900">{d.bad.title}</h3>
            <p className="font-body text-body text-ink-700">{d.bad.description}</p>
          </div>
          <ul className="flex flex-col gap-stack-xs">
            {d.bad.points.map((p, i) => (
              <li key={i} className="flex items-start gap-stack-xs">
                <AlertTriangle size={16} className="text-danger-fg shrink-0 mt-[5px]" aria-hidden="true" />
                <span className="font-body text-body text-ink-900">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg p-stack-lg flex flex-col gap-stack-sm bg-success-base/[0.08] border-2 border-success-base/30">
          <Badge variant="success" className="self-start">
            <CheckCircle2 size={14} aria-hidden="true" /> {d.good.label}
          </Badge>
          <div className="flex flex-col gap-stack-xs">
            <h3 className="font-display text-h3 text-ink-900">{d.good.title}</h3>
            <p className="font-body text-body text-ink-700">{d.good.description}</p>
          </div>
          <ul className="flex flex-col gap-stack-xs">
            {d.good.points.map((p, i) => (
              <li key={i} className="flex items-start gap-stack-xs">
                <CheckCircle2 size={16} className="text-success-fg shrink-0 mt-[5px]" aria-hidden="true" />
                <span className="font-body text-body text-ink-900">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        {d.blocks?.map((block, i) => renderContentBlock(block, i))}

        {d.steps && d.steps.length > 0 && (() => {
          const step = d.steps![decouvrirStep];
          const total = d.steps!.length;
          const progress = Math.round(((decouvrirStep + 1) / total) * 100);
          return (
            <div className="mt-stack-lg border border-ink-200 rounded-xl overflow-hidden">
              {/* Progress bar */}
              <div className="h-1 bg-ink-100">
                <div
                  className="h-full bg-accent-400 transition-all duration-300 ease-standard"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Step header: count + dots */}
              <div className="flex items-center justify-between px-stack pt-3 pb-2">
                <span className="font-body text-caption text-ink-600">
                  Étape {decouvrirStep + 1} / {total}
                </span>
                <div className="flex items-center gap-stack-2xs">
                  {d.steps!.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setDecouvrirStep(i)}
                      aria-label={`Étape ${i + 1}`}
                      className={`rounded-pill transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                        i === decouvrirStep
                          ? 'w-4 h-1.5 bg-accent-400'
                          : i < decouvrirStep
                          ? 'w-1.5 h-1.5 bg-success-base'
                          : 'w-1.5 h-1.5 bg-ink-200 hover:bg-ink-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* Step content */}
              <div className="px-stack-md pb-2">
                {step.blocks.map((block, i) => renderContentBlock(block, i))}
              </div>
              {/* Prev / Next — un pas à pas DANS la section : il laisse l'aplat
                  à l'écran, la flèche « Section suivante » (arbitrage n°19,
                  comme la confirmation dépliée d'AIOverrideButton). « Suivant »
                  en `soft`, « Précédent » en `ghost` neutre. Les deux étaient
                  faits main : un aplat primary-700 que la sonde ne voyait pas,
                  et un filet ink-200 à 1,2:1. */}
              <div className="flex items-center justify-between px-stack py-3 border-t border-ink-100">
                <Button
                  emphasis="ghost"
                  tone="neutral"
                  size="sm"
                  leadingIcon={<ChevronLeft />}
                  onClick={() => setDecouvrirStep((s) => Math.max(0, s - 1))}
                  disabled={decouvrirStep === 0}
                >
                  Précédent
                </Button>
                <Button
                  emphasis="soft"
                  size="sm"
                  trailingIcon={<ChevronRight />}
                  onClick={() => setDecouvrirStep((s) => Math.min(total - 1, s + 1))}
                  disabled={decouvrirStep === total - 1}
                >
                  Suivant
                </Button>
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  const renderQuiz = () => {
    const quizQuestions = lessonData.quiz.questions.map(q => ({
      question: q.text,
      options: q.options.map(o => o.label),
      correct: q.options.findIndex(o => o.id === q.correct),
    }));
    /* La section a son titre, comme les autres ; la carte du quiz part du
       même bord gauche (le composant ne se centre plus lui-même). */
    return (
      <div>
      <h2 className={SECTION_TITLE}>Quiz</h2>
      <QuizComponent
        questions={quizQuestions}
        onComplete={(results) => {
          // Les résultats partaient dans un console.log jusqu'au 2026-07-23 : l'apprenant
          // était testé, rien n'était conservé. C'est ce qui empêchait le Passeport
          // (cahier 02) de se remplir depuis les leçons et le cahier 10 d'avoir de la
          // matière. On persiste le détail par question, pas seulement le score —
          // c'est le détail qui permet remédiation, répétition espacée et preuve.
          addQuizAttempt(
            lessonId,
            {
              completedAt: Date.now(),
              correct: results.correct,
              total: results.total,
              answers: results.answers,
            },
            SECTIONS.length
          );
          // Branche le quiz sur le Passeport : preuve LÉGÈRE (performance à un instant T).
          // Un quiz est auto-corrigé → il n'affirme AUCUN niveau (`assertedLevel` vide) et
          // ne rapporte AUCUN XP. Émise une fois par compétence de l'étape, et seulement
          // pour celles qui existent vraiment au référentiel — une étape qui référence une
          // compétence inconnue n'en crée pas une fantôme.
          const competenceIds = ctx?.step.competenceIds ?? getLessonCompetenceIds(lessonId);
          const lessonTitle = ctx?.lesson.title ?? lessonId;
          const now = new Date().toISOString();
          competenceIds.forEach((competenceId) => {
            const competence = getCompetenceById(competenceId);
            if (!competence) return;
            addEvidence({
              userId: MOCK_USER_ID,
              competenceId,
              competenceName: competence.label,
              regime: 'light',
              sourceType: 'quiz',
              sourceId: `lesson:${lessonId}:quiz`,
              sourceLabel: `Quiz · ${lessonTitle}`,
              score: { correct: results.correct, total: results.total },
              occurredAt: now,
            });
          });
        }}
      />
      </div>
    );
  };

  const renderReflechir = () => (
    <div>
      <h2 className={SECTION_TITLE}>{lessonData.reflechir.heading}</h2>
      {/* Chaque question est le LIBELLÉ de son champ (16/600, relié au champ),
          plus un h3 en Nunito : un titre qui s'ignore. */}
      {lessonData.reflechir.questions.map((question, i) => (
        <div key={i} className="bg-ink-50 rounded-lg p-stack-md mb-stack flex flex-col gap-stack-xs">
          <label htmlFor={`reflexion-q${i}`} className="font-body text-body font-semibold text-ink-900">{question}</label>
          <textarea
            id={`reflexion-q${i}`}
            className="w-full h-auto min-h-[96px] p-stack font-body text-body text-ink-900 bg-white border border-ink-200 rounded-lg resize-y transition-colors duration-150 focus:outline-none focus:border-primary-400 focus:ring-3 focus:ring-primary-100 focus:shadow-none"
            value={reflections[`q${i}`] ?? ''}
            onChange={(e) => {
              const key = `q${i}`;
              setReflections((prev) => ({ ...prev, [key]: e.target.value }));
              setReflectionInStore(lessonId, key, e.target.value);
            }}
            placeholder="Écris ta réflexion ici…"
          />
        </div>
      ))}
      {lessonData.reflechir.blocks?.map((block, i) => renderContentBlock(block, i))}
    </div>
  );

  const renderAppliquer = () => (
    <div>
      <h2 className={SECTION_TITLE}>{lessonData.appliquer.heading}</h2>
      <div className="bg-primary-50 rounded-lg p-stack-lg mb-stack-lg border border-primary-200">
        <p className="m-0 font-body text-body text-ink-900">
          {lessonData.appliquer.instruction}
        </p>
      </div>
      <div className="flex flex-col gap-stack">
        {[
          { key: 'objectif' as const, label: 'Objectif', placeholder: 'Ex. : améliorer l\'engagement de mon équipe de 20 % en 30 jours' },
          { key: 'action1' as const, label: 'Action 1', placeholder: 'Première action concrète à mettre en place dès demain' },
          { key: 'action2' as const, label: 'Action 2', placeholder: 'Deuxième action complémentaire cette semaine' },
          { key: 'action3' as const, label: 'Action 3', placeholder: 'Troisième action pour ancrer le changement' },
        ].map(({ key, label, placeholder }) => (
          /* Le champ du système (passe typographique du 24/09) : libellé 16/600
             relié au champ, 52 px de haut (échelle 36 · 44 · 52, arbitrage
             n°22). Les champs faits main faisaient 58 px, libellé à 13. */
          <Input
            key={key}
            size="lg"
            label={label}
            value={actionPlan[key]}
            onChange={(e) => {
              const next = { ...actionPlan, [key]: e.target.value };
              setActionPlan(next);
              setActionPlanInStore(lessonId, next);
            }}
            placeholder={placeholder}
          />
        ))}
      </div>
      {lessonData.appliquer.blocks?.map((block, i) => renderContentBlock(block, i))}
    </div>
  );

  const renderConclusion = () => (
    <div>
      <h2 className={SECTION_TITLE}>{lessonData.conclusion.heading}</h2>
      {/* Deux blocs (h3 20, l'icône calée sur la ligne du titre), 32 entre
          eux. Les « prochaines étapes » ne sont pas des liens : plus de survol
          qui glissait et changeait de filet comme sur un bouton. */}
      <div className="flex flex-col gap-stack mb-section">
        <h3 className="flex items-center gap-stack-xs font-display text-h3 text-ink-900">
          <CheckCircle2 size={18} className="text-success-fg shrink-0" aria-hidden="true" />
          Points clés à retenir
        </h3>
        <ol className="flex flex-col gap-stack-sm">
          {lessonData.conclusion.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-stack-sm p-stack bg-ink-50 rounded-lg">
              <span className="w-7 h-7 rounded-pill bg-success-vivid text-white font-body text-caption font-bold tabular-nums flex items-center justify-center shrink-0 -mt-px">
                {i + 1}
              </span>
              <span className="font-body text-body text-ink-900">{point}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-stack">
        <h3 className="flex items-center gap-stack-xs font-display text-h3 text-ink-900">
          <Zap size={18} className="text-primary-700 shrink-0" aria-hidden="true" />
          Prochaines étapes
        </h3>
        <ul className="flex flex-col gap-stack-sm">
          {lessonData.conclusion.nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-stack-xs p-stack bg-white rounded-lg border border-ink-200">
              <ChevronRight size={18} className="text-primary-700 shrink-0 mt-1" aria-hidden="true" />
              <span className="font-body text-body text-ink-900">{step}</span>
            </li>
          ))}
        </ul>
      </div>
      {lessonData.conclusion.blocks?.map((block, i) => renderContentBlock(block, i))}
    </div>
  );

  const renderTransfert = () => {
    const { transfert: t } = lessonData;
    return (
      <div>
        <h2 className={SECTION_TITLE}>{t.heading}</h2>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-stack-lg mb-stack-lg">
          <p className="m-0 font-body text-body text-ink-700">{t.intro}</p>
        </div>
        <div className="flex flex-col gap-stack mb-section">
          {/* Scénarios : titre h3 → 8 → contexte ink-700 (il était au cran de
              la méta) ; la pastille se cale sur la ligne du titre. Pas de
              survol : ce ne sont pas des liens. */}
          {t.scenarios.map((scenario, i) => (
            <div key={i} className="flex gap-stack p-stack-lg bg-white border border-ink-200 rounded-lg">
              <div className="w-8 h-8 rounded-pill bg-primary-700 text-white font-body text-caption font-bold tabular-nums flex items-center justify-center shrink-0 -mt-[3px]">
                {i + 1}
              </div>
              <div className="flex flex-col gap-stack-xs">
                <h3 className="font-display text-h3 text-ink-900">{scenario.title}</h3>
                <p className="font-body text-body text-ink-700">{scenario.context}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          {/* Libellé de champ 16/600 (il était à 13) ; la consigne en ink-700
              (elle était au cran des placeholders), reliée au champ. */}
          <label htmlFor="engagement-transfert" className="block font-body text-body font-semibold text-ink-900 mb-stack-3xs">
            Mon engagement de transfert
          </label>
          <p id="engagement-transfert-consigne" className="font-body text-body text-ink-700 mb-stack-sm">{t.commitmentPrompt}</p>
          <textarea
            id="engagement-transfert"
            aria-describedby="engagement-transfert-consigne"
            className="w-full min-h-[120px] p-stack font-body text-body text-ink-900 bg-white border border-ink-200 rounded-lg resize-y transition-colors duration-150 focus:outline-none focus:border-primary-400 focus:ring-3 focus:ring-primary-100 focus:shadow-none"
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
    primary:   { card: 'bg-primary-50 border-primary-200',   num: 'bg-primary-700 text-white' },
    secondary: { card: 'bg-secondary-50 border-secondary-500/30', num: 'bg-secondary-700 text-white' },
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

  const renderContentBlock = (block: ContentBlock, index: number | string, compact = false): React.ReactNode => {
    const key = `cb-${index}`;
    const mb = compact ? 'mb-stack-xs' : 'mb-stack-lg';

    switch (block.type) {

      /* ─── Prose ───────────────────────────────────────────────────────────
         Voir le commentaire de l'union : pas de `leading-*`, pas de `font-bold`,
         pas de `tracking-*` — les tokens `text-*` les portent. */

      case 'paragraph':
        return (
          <p
            key={key}
            className={`${mb} max-w-prose font-body ${
              block.lead ? 'text-body-lg text-ink-700' : 'text-body text-ink-900'
            }`}
          >
            {block.text}
          </p>
        );

      case 'heading': {
        // mb serré volontairement : un titre appartient à ce qui le SUIT. L'air
        // au-dessus vient de la règle `h2,h3,h4 { margin-block-start: 0.75em }`
        // de `@layer base` — et c'est pourquoi on ne pose surtout pas `m-0` ici.
        const HEADING_CLASSES: Record<2 | 3 | 4, string> = {
          2: 'font-display text-h2 text-ink-900 text-balance',
          3: 'font-display text-h3 text-ink-900 text-balance',
          4: 'font-display text-h3 text-ink-900 text-balance',
        };
        const cls = `mb-stack-xs max-w-prose ${HEADING_CLASSES[block.level]}`;
        if (block.level === 2) return <h2 key={key} className={cls}>{block.text}</h2>;
        if (block.level === 3) return <h3 key={key} className={cls}>{block.text}</h3>;
        return <h4 key={key} className={cls}>{block.text}</h4>;
      }

      case 'list': {
        const items = block.items.map((item, i) => (
          <li key={i} className="pl-1">{item}</li>
        ));
        const listClasses =
          'max-w-prose font-body text-body text-ink-900 flex flex-col gap-stack-xs pl-stack-md marker:text-primary-700';
        return (
          <div key={key} className={mb}>
            {block.ordered ? (
              <ol className={`${listClasses} list-decimal marker:font-semibold`}>{items}</ol>
            ) : (
              <ul className={`${listClasses} list-disc`}>{items}</ul>
            )}
          </div>
        );
      }

      case 'quote':
        return (
          <figure key={key} className={`${mb} max-w-prose border-l-2 border-primary-600 pl-stack`}>
            {/* `font-body italic` : League Spartan n'a pas d'italique réel. */}
            <blockquote className="font-body italic text-body-lg text-ink-700">
              {block.text}
            </blockquote>
            {block.source && (
              <figcaption className="mt-stack-xs font-body text-caption text-ink-600 not-italic">
                — {block.source}
              </figcaption>
            )}
          </figure>
        );

      case 'callout': {
        // `rounded-lg` (14 px) et non `rounded-xl` : surface AVEC bordure, donc
        // la décision R1 s'applique — au-delà, un trait de 1 px ne tient pas la
        // courbe et le coin paraît mou. Les `rounded-xl` des blocs média
        // au-dessus sont antérieurs à R1.
        const CALLOUT_TONES: Record<string, string> = {
          primary: 'bg-primary-50 border-primary-200',
          warm:    'bg-secondary-50 border-secondary-500/25',
          sun:     'bg-accent-50 border-accent-400/35',
          neutral: 'bg-ink-50 border-ink-200',
        };
        /* Une couleur de marque ne porte du texte qu'au cran 800. */
        const CALLOUT_TITLE: Record<string, string> = {
          primary: 'text-primary-800',
          warm:    'text-secondary-800',
          sun:     'text-accent-800',
          neutral: 'text-ink-900',
        };
        return (
          <div
            key={key}
            className={`${mb} max-w-prose border rounded-lg p-stack-lg flex flex-col gap-stack-xs ${CALLOUT_TONES[block.tone]}`}
          >
            {block.title && (
              <p className={`font-body text-body font-semibold ${CALLOUT_TITLE[block.tone]}`}>
                {block.title}
              </p>
            )}
            <p className="font-body text-body text-ink-900">{block.text}</p>
          </div>
        );
      }

      case 'image': {
        const ASPECT: Record<string, string> = {
          '16/9': 'aspect-video', '4/3': 'aspect-[4/3]',
          '1/1': 'aspect-square', '3/2': 'aspect-[3/2]',
        };
        const arClass = ASPECT[block.aspectRatio ?? '16/9'];
        const resolvedSrc = uploadedSrcs[index] ?? block.src;
        return (
          <div key={key} className={mb}>
            {resolvedSrc ? (
              <div className={`w-full ${arClass} overflow-hidden rounded-xl`}>
                <img src={resolvedSrc} alt={block.alt} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-full ${arClass} rounded-xl border-2 border-dashed border-ink-300 bg-ink-100 flex flex-col items-center justify-center gap-stack-xs`}>
                <ImageIcon size={32} className="text-ink-400" />
                <span className="font-body text-body text-ink-500 text-center px-stack">
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
                  <span className={CHOISIR_UN_FICHIER}>
                    <ImageIcon size={14} /> Choisir un fichier
                  </span>
                </label>
              </div>
            )}
            {block.caption && (
              <p className="mt-stack-xs font-body text-caption text-ink-600 text-center italic">{block.caption}</p>
            )}
          </div>
        );
      }

      case 'video': {
        const arClass = (block.aspectRatio ?? '16/9') === '16/9' ? 'aspect-video' : 'aspect-[4/3]';
        const resolvedSrc = uploadedSrcs[index] ?? block.src;
        return (
          <div key={key} className={mb}>
            {resolvedSrc ? (
              <div className={`w-full ${arClass} overflow-hidden rounded-xl bg-ink-900`}>
                <video src={resolvedSrc} poster={block.poster} controls className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-full ${arClass} rounded-xl border-2 border-dashed border-ink-300 bg-ink-900/5 flex flex-col items-center justify-center gap-stack`}>
                <div className="w-14 h-14 rounded-pill bg-ink-200 flex items-center justify-center">
                  <Play size={24} className="text-ink-600 ml-1" />
                </div>
                <span className="font-body text-body text-ink-500">Vidéo à brancher</span>
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
                  <span className={CHOISIR_UN_FICHIER}>
                    <Play size={14} /> Choisir une vidéo
                  </span>
                </label>
              </div>
            )}
            {block.caption && (
              <p className="mt-stack-xs font-body text-caption text-ink-600 text-center italic">{block.caption}</p>
            )}
          </div>
        );
      }

      case 'gif': {
        const resolvedSrc = uploadedSrcs[index] ?? block.src;
        return (
          <div key={key} className={mb}>
            {resolvedSrc ? (
              <img src={resolvedSrc} alt={block.alt} loading="lazy" className="w-full rounded-xl" />
            ) : (
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-ink-300 bg-ink-100 flex flex-col items-center justify-center gap-stack-xs">
                <ImageIcon size={32} className="text-ink-400" />
                <span className="font-body text-body text-ink-500">GIF à connecter</span>
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
                  <span className={CHOISIR_UN_FICHIER}>
                    <ImageIcon size={14} /> Choisir un GIF
                  </span>
                </label>
              </div>
            )}
            {block.caption && (
              <p className="mt-stack-xs font-body text-caption text-ink-600 text-center italic">{block.caption}</p>
            )}
          </div>
        );
      }

      case 'chart': {
        if (block.chartType === 'bar') {
          const max = Math.max(...block.data.map(d => d.value), 1);
          return (
            <div key={key} className={`bg-white border border-ink-100 rounded-xl ${compact ? 'p-3' : 'p-stack-md'} ${mb}`}>
              {block.title && <h4 className={`mb-3 font-display text-ink-900 ${compact ? 'text-body font-bold' : 'text-h3'}`}>{block.title}</h4>}
              <div className="flex flex-col gap-stack-xs">
                {block.data.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-body text-body text-ink-700">{item.label}</span>
                      <span className="font-body text-caption font-semibold text-ink-900 tabular-nums">{item.value}</span>
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
          const svgSize = compact ? 80 : 120;
          return (
            <div key={key} className={`bg-white border border-ink-100 rounded-xl ${compact ? 'p-3' : 'p-stack-md'} ${mb}`}>
              {block.title && <h4 className={`mb-3 font-display text-ink-900 ${compact ? 'text-body font-bold' : 'text-h3'}`}>{block.title}</h4>}
              <div className={`flex flex-col ${compact ? 'gap-stack-xs' : 'sm:flex-row items-center gap-stack-lg'}`}>
                <svg width={svgSize} height={svgSize} viewBox="0 0 100 100" className="shrink-0 mx-auto" aria-hidden="true">
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
                <div className="flex flex-col gap-stack-xs flex-1">
                  {block.data.map((item, i) => (
                    <div key={i} className="flex items-center gap-stack-xs">
                      <span className="w-3 h-3 rounded-pill shrink-0"
                        style={{ background: item.color ?? CHART_PALETTE[i % CHART_PALETTE.length] }} />
                      <span className="font-body text-body text-ink-700 flex-1">{item.label}</span>
                      <span className="font-body text-caption font-semibold text-ink-900 tabular-nums">{item.value}</span>
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
            <div key={key} className={`bg-white border border-ink-100 rounded-xl ${compact ? 'p-3' : 'p-stack-md'} ${mb} overflow-hidden`}>
              {block.title && <h4 className={`mb-3 font-display text-ink-900 ${compact ? 'text-body font-bold' : 'text-h3'}`}>{block.title}</h4>}
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
                <polyline points={pts} fill="none" stroke="var(--color-primary-500)"
                  strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                {vals.map((v, i) => {
                  const x = px + (i / Math.max(vals.length - 1, 1)) * (W - 2 * px);
                  const y = py + ((maxV - v) / range) * (H - 2 * py);
                  return <circle key={i} cx={x} cy={y} r="4" fill="var(--color-primary-500)" />;
                })}
              </svg>
              <div className="flex mt-stack-xs">
                {block.data.map((item, i) => (
                  <span key={i} className="font-body text-caption text-ink-600 text-center flex-1 truncate px-1">{item.label}</span>
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
        const itemPad = compact ? 'p-stack-xs' : 'p-3';
        const labelCls = compact ? 'font-body text-caption font-semibold text-ink-900' : 'font-body text-body font-semibold text-ink-900';
        const descCls = 'font-body text-caption text-ink-600';

        if (layout === 'horizontal') {
          return (
            <div key={key} className={mb}>
              {block.title && <h4 className={`mb-3 font-display text-ink-900 ${compact ? 'text-body font-bold' : 'text-h3'}`}>{block.title}</h4>}
              <div className="flex flex-wrap items-stretch gap-stack-2xs">
                {block.items.map((item, i) => {
                  const { card, num } = getColors(item.color);
                  return (
                    <React.Fragment key={i}>
                      <div className={`flex flex-col gap-tight ${itemPad} rounded-lg border flex-1 min-w-[72px] ${card}`}>
                        {item.num !== undefined && (
                          <span className={`w-5 h-5 rounded-pill flex items-center justify-center font-body text-caption font-bold tabular-nums shrink-0 ${num}`}>
                            {item.num}
                          </span>
                        )}
                        <span className={labelCls}>{item.label}</span>
                        <span className={descCls}>{item.desc}</span>
                      </div>
                      {i < block.items.length - 1 && (
                        <div className="flex items-center shrink-0">
                          <ChevronRight size={14} className="text-ink-400" />
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
            <div key={key} className={mb}>
              {block.title && <h4 className={`mb-3 font-display text-ink-900 ${compact ? 'text-body font-bold' : 'text-h3'}`}>{block.title}</h4>}
              <div className={`grid gap-stack-xs ${compact ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
                {block.items.map((item, i) => {
                  const { card, num } = getColors(item.color);
                  return (
                    <div key={i} className={`flex flex-col gap-tight ${itemPad} rounded-lg border ${card}`}>
                      {item.num !== undefined && (
                        <span className={`w-5 h-5 rounded-pill flex items-center justify-center font-body text-caption font-bold tabular-nums mb-0.5 ${num}`}>
                          {item.num}
                        </span>
                      )}
                      <span className={labelCls}>{item.label}</span>
                      <span className={descCls}>{item.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // vertical (default)
        return (
          <div key={key} className={`flex flex-col ${compact ? 'gap-stack-2xs' : 'gap-stack-xs'} ${mb}`}>
            {block.title && <h4 className={`font-display text-ink-900 ${compact ? 'text-body font-bold' : 'text-h3'}`}>{block.title}</h4>}
            {block.items.map((item, i) => {
              const { card, num } = getColors(item.color);
              return (
                <div key={i} className={`flex items-start gap-stack-xs ${itemPad} rounded-lg border ${card}`}>
                  {item.num !== undefined && (
                    <span className={`w-6 h-6 rounded-pill flex items-center justify-center font-body text-caption font-bold tabular-nums shrink-0 mt-0.5 ${num}`}>
                      {item.num}
                    </span>
                  )}
                  <div>
                    <p className={`m-0 ${labelCls}`}>{item.label}</p>
                    <p className="mt-0.5 font-body text-caption text-ink-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      case 'interactive': {
        return (
          <div key={key} className={`bg-primary-50 border border-primary-200 rounded-xl ${compact ? 'p-3' : 'p-stack-lg'} ${mb} flex items-start gap-stack-xs`}>
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
              <Cpu size={20} className="text-primary-600" />
            </div>
            <div className="flex-1">
              {block.title && <h4 className="mb-stack-xs font-display text-h3 text-ink-900">{block.title}</h4>}
              {block.description && (
                <p className="mb-stack-sm font-body text-body text-ink-700">{block.description}</p>
              )}
              <Badge variant="brand">
                <Cpu size={14} aria-hidden /> Module interactif · Bientôt disponible
              </Badge>
            </div>
          </div>
        );
      }

      case 'annotation': {
        const annotValue = reflections[block.journalKey] ?? '';
        return (
          <div key={key} className={`bg-secondary-50 border border-secondary-500/30 rounded-xl ${compact ? 'p-3' : 'p-stack-md'} ${mb}`}>
            <div className="flex items-center gap-stack-xs mb-3">
              <BookOpen size={16} className="text-secondary-600 shrink-0" />
              <span className="font-body text-caption font-semibold text-secondary-800">Lié au Journal</span>
            </div>
            <p className="m-0 mb-3 font-body text-body font-semibold text-ink-900">{block.prompt}</p>
            <textarea
              className="w-full h-auto min-h-[96px] p-stack font-body text-body text-ink-900 bg-white border border-secondary-500/30 rounded-lg resize-y transition-colors duration-150 focus:outline-none focus:border-secondary-500 focus:ring-3 focus:ring-secondary-50 focus:shadow-none"
              value={annotValue}
              onChange={(e) => {
                setReflections((prev) => ({ ...prev, [block.journalKey]: e.target.value }));
                setReflectionInStore(lessonId, block.journalKey, e.target.value);
              }}
              placeholder={block.placeholder ?? 'Écris ta réflexion ici…'}
            />
          </div>
        );
      }

      case 'embed': {
        const PROVIDER_LABELS: Record<string, string> = {
          'youtube': 'YouTube', 'vimeo': 'Vimeo', 'loom': 'Loom',
          'canva': 'Canva', 'google-doc': 'Google Doc',
          'google-slides': 'Google Slides', 'figma': 'Figma', 'other': 'Lien externe',
        };
        const ASPECT: Record<string, string> = {
          '16/9': 'aspect-video', '4/3': 'aspect-[4/3]', '1/1': 'aspect-square',
        };
        const arClass = ASPECT[block.aspectRatio ?? '16/9'];

        const normalizeEmbedUrl = (raw: string): string => {
          try {
            const url = new URL(raw.trim());
            // YouTube watch → embed
            if (url.hostname.includes('youtube.com') && url.searchParams.has('v')) {
              return `https://www.youtube.com/embed/${url.searchParams.get('v')}?rel=0`;
            }
            // YouTube short link youtu.be/ID
            if (url.hostname === 'youtu.be') {
              return `https://www.youtube.com/embed${url.pathname}?rel=0`;
            }
            // Vimeo vimeo.com/ID → player
            if (url.hostname === 'vimeo.com') {
              return `https://player.vimeo.com/video${url.pathname}`;
            }
            // Loom share → embed
            if (url.hostname.includes('loom.com') && url.pathname.startsWith('/share/')) {
              return raw.replace('/share/', '/embed/');
            }
            // Google Slides: /edit → /embed
            if (url.hostname === 'docs.google.com' && url.pathname.includes('/presentation/')) {
              return raw.replace(/\/edit.*$/, '/embed?start=false&loop=false&delayms=3000');
            }
            // Google Docs: /edit → /preview
            if (url.hostname === 'docs.google.com' && url.pathname.includes('/document/')) {
              return raw.replace(/\/edit.*$/, '/preview');
            }
            // Canva: add ?embed if missing
            if (url.hostname.includes('canva.com') && !url.searchParams.has('embed')) {
              return raw + (raw.includes('?') ? '&' : '?') + 'embed';
            }
            // Figma: wrap in embed URL
            if (url.hostname.includes('figma.com') && !url.pathname.startsWith('/embed')) {
              return `https://www.figma.com/embed?embed_host=astra&url=${encodeURIComponent(raw)}`;
            }
          } catch { /* invalid URL, return as-is */ }
          return raw.trim();
        };

        const resolvedUrl = embeddedUrls[index] ?? block.url;

        return (
          <div key={key} className={mb}>
            {block.title && (
              <h4 className={`mb-3 font-display text-ink-900 ${compact ? 'text-body font-bold' : 'text-h3'}`}>{block.title}</h4>
            )}
            {resolvedUrl ? (
              <div className={`w-full ${arClass} rounded-xl overflow-hidden border border-ink-200 shadow-sm`}>
                <iframe
                  src={resolvedUrl}
                  title={block.title ?? 'Contenu embarqué'}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-ink-300 bg-ink-50 p-stack-lg">
                <div className="flex items-center gap-stack-xs mb-stack">
                  <Globe size={18} className="text-ink-600 shrink-0" />
                  <span className="font-body text-body font-semibold text-ink-700">
                    {block.provider ? PROVIDER_LABELS[block.provider] : 'Embed externe'}
                  </span>
                  <span className="ml-auto font-body text-caption text-ink-600">YouTube · Vimeo · Loom · Canva · Slides · Figma</span>
                </div>
                {/* « Charger » est l'action de ce panneau : `soft`, pas un
                    second aplat à côté de la flèche « Section suivante »
                    (arbitrage n°19) ; il était fait main, en primary-700. Le
                    champ passe à 36 px, la hauteur du bouton `sm` voisin
                    (échelle commune, arbitrage n°22). */}
                <div className="flex gap-stack-xs">
                  <input
                    type="url"
                    className="flex-1 h-9 px-3 font-body text-body text-ink-900 bg-white border border-ink-200 rounded-lg focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                    placeholder="YouTube, Vimeo, Loom, Canva, Google Slides, Figma…"
                    value={embedInputs[index] ?? ''}
                    onChange={(e) => setEmbedInputs((prev) => ({ ...prev, [index]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && embedInputs[index]) {
                        setEmbeddedUrls((prev) => ({ ...prev, [index]: normalizeEmbedUrl(embedInputs[index]) }));
                      }
                    }}
                  />
                  <Button
                    emphasis="soft"
                    size="sm"
                    leadingIcon={<Link2 />}
                    className="shrink-0"
                    onClick={() => {
                      if (embedInputs[index]) {
                        setEmbeddedUrls((prev) => ({ ...prev, [index]: normalizeEmbedUrl(embedInputs[index]) }));
                      }
                    }}
                  >
                    Charger
                  </Button>
                </div>
                {resolvedUrl === undefined && embeddedUrls[index] && (
                  <p className="m-0 mt-stack-xs font-body text-caption text-danger-fg">URL invalide ou non supportée</p>
                )}
              </div>
            )}
            {block.caption && (
              <p className="mt-stack-xs font-body text-caption text-ink-600 text-center italic">{block.caption}</p>
            )}
            {resolvedUrl && (
              <div className="flex justify-end mt-1">
                <button
                  onClick={() => {
                    setEmbeddedUrls((prev) => { const n = { ...prev }; delete n[index]; return n; });
                    setEmbedInputs((prev) => ({ ...prev, [index]: '' }));
                  }}
                  className="font-body text-caption text-ink-600 hover:text-ink-600 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
                >
                  Changer l'URL
                </button>
              </div>
            )}
          </div>
        );
      }

      case 'split': {
        const RATIO: Record<string, string> = {
          '1/1': 'grid-cols-2',
          '2/1': 'grid-cols-[2fr_1fr]',
          '1/2': 'grid-cols-[1fr_2fr]',
        };
        return (
          <div key={key} className={mb}>
            <div className={`grid ${RATIO[block.ratio ?? '1/1']} gap-stack items-start`}>
              <div className="flex flex-col">
                {block.left.map((b, i) => renderContentBlock(b, `${key}-L${i}`, compact))}
              </div>
              <div className="flex flex-col">
                {block.right.map((b, i) => renderContentBlock(b, `${key}-R${i}`, compact))}
              </div>
            </div>
            {block.caption && (
              <p className="mt-stack-xs font-body text-caption text-ink-600 text-center italic">{block.caption}</p>
            )}
          </div>
        );
      }

      case 'bento': {
        const CELL_SPAN: Record<string, string> = {
          sm:   'col-span-1',
          md:   'col-span-2',
          full: 'col-span-3',
        };
        const CELL_TONE: Record<string, { bg: string; label: string }> = {
          primary:   { bg: 'bg-primary-50 border-primary-200',        label: 'text-primary-800' },
          secondary: { bg: 'bg-secondary-50 border-secondary-500/20', label: 'text-secondary-800' },
          accent:    { bg: 'bg-accent-50 border-accent-400/30',       label: 'text-accent-800' },
          neutral:   { bg: 'bg-ink-50 border-ink-200',                label: 'text-ink-600' },
          dark:      { bg: 'bg-ink-900 border-ink-800',               label: 'text-ink-300' },
        };
        return (
          <div key={key} className={mb}>
            {block.title && (
              <h4 className="mb-3 font-display text-h3 text-ink-900">{block.title}</h4>
            )}
            <div className="grid grid-cols-3 gap-stack-xs auto-rows-min">
              {block.cells.map((cell, ci) => {
                const tone = CELL_TONE[cell.tone ?? 'neutral'];
                return (
                  <div
                    key={ci}
                    className={`${CELL_SPAN[cell.size ?? 'sm']} ${tone.bg} border rounded-xl p-3 flex flex-col gap-tight min-w-0`}
                  >
                    {cell.label && (
                      <span className={`font-body text-caption font-semibold mb-1 ${tone.label}`}>{cell.label}</span>
                    )}
                    {cell.blocks.map((b, bi) => renderContentBlock(b, `${key}-C${ci}-${bi}`, true))}
                  </div>
                );
              })}
            </div>
            {block.caption && (
              <p className="mt-stack-xs font-body text-caption text-ink-600 text-center italic">{block.caption}</p>
            )}
          </div>
        );
      }

      case 'table': {
        return (
          <div key={key} className="mb-stack-lg overflow-x-auto rounded-xl border border-ink-200">
            {block.title && (
              <div className="px-stack py-3 bg-ink-50 border-b border-ink-200">
                <h4 className="font-display text-h3 text-ink-900">{block.title}</h4>
              </div>
            )}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-ink-50 border-b border-ink-200">
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      className={`px-stack py-3 text-left font-body text-caption font-semibold whitespace-nowrap ${
                        block.highlightCol === i ? 'text-primary-800 bg-primary-50' : 'text-ink-700'
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-ink-100 last:border-0 hover:bg-ink-50 transition-colors duration-100">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-stack py-3 font-body text-body ${
                          ci === 0 ? 'font-semibold text-ink-900' : 'text-ink-700'
                        } ${block.highlightCol === ci ? 'font-semibold text-primary-800' : ''}`}
                      >
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {block.caption && (
              <div className="px-stack py-stack-xs bg-ink-50 border-t border-ink-200">
                <p className="font-body text-caption text-ink-600 italic">{block.caption}</p>
              </div>
            )}
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
        {/* HEADER — `ViewerHeader`, comme les autres lecteurs (passe
            typographique du 24/09). La barre faite main mettait le titre en
            League Spartan 16/700, l'étape au-dessus en capitales 11 px, le
            compteur au cran 500 et « Retour » au cran 500 à 13 px ; elle a
            désormais un titre 16/600 et une seule ligne de méta à 13 px
            (l'étape · la durée). */}
        <ViewerHeader
          tone={tone}
          onBack={() => navigate(-1)}
          backLabel="Retour"
          title={displayTitle}
          eyebrow={ctx?.step?.title}
          subtitle={displayDuration}
          current={currentIndex + 1}
          total={SECTIONS.length}
          progress={progress}
          onClose={handleClose}
          sticky={false}
          className="shrink-0"
        />

        {/* SECTION NAV — compact pills */}
        <nav
          className="shrink-0 bg-white/95 backdrop-blur-glass-light border-b border-ink-100 relative"
          aria-label="Sections de la leçon"
        >
          {/* Fade masks for scroll affordance on mobile */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/95 to-transparent z-10" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/95 to-transparent z-10" aria-hidden="true" />
          <div className="lp-section-scroll flex gap-stack-2xs overflow-x-auto px-stack py-stack-xs sm:justify-center">
            {SECTIONS.map((section, index) => {
              const isActive = index === currentIndex;
              const isDone = completedSections.has(index) && !isActive;
              const Icon = section.icon;
              return (
                /* Onglets de section à 13 px (ils étaient en étiquette 11 px) :
                   600 pour la section courante, 500 pour les autres. */
                <button
                  key={section.id}
                  className={[
                    'inline-flex items-center gap-stack-2xs px-3 py-1.5 rounded-lg border-none font-body text-caption cursor-pointer transition-all duration-200 whitespace-nowrap relative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    isActive
                      ? 'bg-primary-700 text-white font-semibold shadow-sm'
                      : 'bg-ink-50 text-ink-700 font-medium hover:bg-ink-100',
                  ].join(' ')}
                  onClick={() => goTo(index)}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <Icon size={14} />
                  <span>{section.title}</span>
                  {isDone && (
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-pill bg-success-base" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* CONTENT — scrollable, padded bottom for progress dots */}
        {/* pb-24 sous md : la barre du bas y porte aussi les flèches. */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center px-stack sm:px-stack-lg lg:px-section pt-stack-lg pb-24 md:pb-16">
          {/* Carte de contenu au canon carte (rayon 20, filet, sans ombre — S2).
              Texte courant plafonné à 65-75 caractères : dans 820 px utiles, les
              paragraphes montaient à 133 caractères par ligne (audit du 23/09),
              sur la surface où PRODUCT.md vise l'AAA. */}
          {/* Le h1 de l'écran : l'introduction l'affiche (c'est la couverture
              de la leçon) ; les autres sections s'ouvrent sur leur h2, et le
              titre de la leçon, déjà dans la barre, reste le h1 du plan du
              document sans se répéter à l'écran. */}
          {currentSection.id !== 'introduction' && (
            <h1 className="sr-only">{displayTitle}</h1>
          )}
          <div
            className="lp-card-anim bg-white rounded-xl border border-ink-200 p-stack-lg sm:p-section-lg w-full max-w-[900px] [&_p]:max-w-prose [&_li]:max-w-prose [&_h3]:max-w-prose"
            key={currentSection.id}
          >
            {SECTION_RENDERERS[currentSection.id]()}
          </div>
        </div>

        {/* SIDE ARROWS — fixed, vertically centered. Masquées sous md : à 375 px
            elles couvraient la colonne de texte (x 12-56 et 319-363 pour un texte
            de 40 à 327) ; sur mobile elles vivent dans la barre du bas. */}
        {/* `max-md:hidden` et non `hidden md:flex` : le `inline-flex` de Button
            et `hidden` sont deux display de même spécificité, c'est l'ordre
            d'émission qui trancherait. Une variante passe toujours après. */}
        {/* Avancer est l'action principale du lecteur : la flèche suivante est
            le `solid` de l'écran, au ton du parcours ; la précédente un `ghost`
            neutre (arbitrage n°19, comme « Suivant » / « Précédent » de
            LessonNavigation). Les deux étaient la même pastille givrée. */}
        <Button
          iconOnly
          emphasis="ghost"
          tone="neutral"
          onClick={handlePrev}
          disabled={isFirst}
          className="max-md:hidden fixed left-3 top-1/2 -translate-y-1/2 z-[51]"
          aria-label="Section précédente"
        >
          <ChevronLeft />
        </Button>
        <Button
          iconOnly
          emphasis="solid"
          tone={PAGE_TONE_TO_BUTTON[tone]}
          onClick={handleNext}
          className="max-md:hidden fixed right-3 top-1/2 -translate-y-1/2 z-[51]"
          aria-label={isLast ? 'Valider la leçon' : 'Section suivante'}
        >
          <ChevronRight />
        </Button>

        {/* BOTTOM PROGRESS — fixed, centered */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[51] flex items-center gap-stack-2xs px-3 py-stack-xs bg-white/80 backdrop-blur-sm rounded-pill shadow-sm border border-ink-100">
          <Button
            iconOnly
            emphasis="ghost"
            tone="neutral"
            onClick={handlePrev}
            disabled={isFirst}
            className="md:hidden -my-stack-xs -ml-2"
            aria-label="Section précédente"
          >
            <ChevronLeft />
          </Button>
          {/* Le point garde son dessin (8 px, 20 px pour le courant), mais le
              bouton qui le porte fait 24 px de haut et au moins 24 de large :
              WCAG 2.2, SC 2.5.8. Un pseudo-élément débordant n'aurait pas suffi,
              les cibles de deux points voisins (14 px d'axe à axe) se seraient
              chevauchées. Le pas passe donc à 24 px, sans espacement en plus. */}
          <div className="flex items-center">
            {SECTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Aller à ${SECTIONS[i].title}`}
                aria-current={i === currentIndex ? 'step' : undefined}
                className="group inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-pill cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary-500"
              >
                <span
                  aria-hidden="true"
                  className={[
                    'block rounded-pill transition-all duration-200',
                    i === currentIndex
                      ? 'w-5 h-2 bg-accent-400'
                      : completedSections.has(i)
                      ? 'w-2 h-2 bg-accent-400/50 group-hover:bg-accent-400/80'
                      : 'w-2 h-2 bg-ink-300 group-hover:bg-ink-400',
                  ].join(' ')}
                />
              </button>
            ))}
          </div>
          <Button
            iconOnly
            emphasis="solid"
            tone={PAGE_TONE_TO_BUTTON[tone]}
            onClick={handleNext}
            className="md:hidden -my-stack-xs -mr-2"
            aria-label={isLast ? 'Valider la leçon' : 'Section suivante'}
          >
            <ChevronRight />
          </Button>
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
          subtitle={`Leçon validée · ${displayDuration}`}
        />
      </div>
    </>
  );
};
