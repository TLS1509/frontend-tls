/**
 * ComplementaryContentViewer : ressources complémentaires d'une leçon.
 *
 * Phase 14.2b refactor :
 *  - Header → <ViewerHeader> tone-aware (remplace ViewerOverlay)
 *  - Tone hérité de LessonContext (fallback "primary")
 *  - Pas de footer nav (liste statique, pas de séquence paginée)
 *
 * Route : /lesson/:id/complementary
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { MetaPill, type MetaPillTone } from '../components/ui/MetaPill';
import { ExternalLink, BookOpen, Video, FileText, Wrench, Clock, ArrowRight } from 'lucide-react';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { Container } from '../components/layout';
import { useLessonContext } from '../lib/lesson-context';
import { TONE_BG_700 } from '../lib/tone-classes';
import type { PageTone } from '../lib/tone-classes';

interface ComplementaryResource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'tool' | 'guide';
  duration?: string;
  url?: string;
  tags: string[];
}

const RESOURCES: ComplementaryResource[] = [
  {
    id: 1,
    title: 'Deep Work : focus et concentration',
    description: "Un guide complet sur la création d'un environnement propice au travail profond et à la concentration.",
    type: 'article',
    duration: '8 min de lecture',
    url: '#',
    tags: ['productivité', 'focus'],
  },
  {
    id: 2,
    title: "Théorie de l'autodétermination (Deci & Ryan)",
    description: 'Regardez cette conférence sur les fondements de la motivation intrinsèque en milieu professionnel.',
    type: 'video',
    duration: '24 min',
    url: '#',
    tags: ['psychologie', 'motivation'],
  },
  {
    id: 3,
    title: "Template : plan de motivation d'équipe",
    description: "Un template réutilisable pour planifier et suivre les initiatives de motivation en équipe.",
    type: 'guide',
    url: '#',
    tags: ['template', 'équipe'],
  },
  {
    id: 4,
    title: 'Outil : diagnostic SCARF interactif',
    description: "Outil d'auto-diagnostic pour évaluer les dimensions SCARF dans votre environnement de travail.",
    type: 'tool',
    duration: '5-10 min',
    url: '#',
    tags: ['outil', 'scarf'],
  },
];

const RELATED_TOPICS = [
  "Engagement d'équipe",
  'Management positif',
  'Intelligence émotionnelle',
  'Psychologie du travail',
];

const TONE_GRADIENT_BG: Record<PageTone, string> = {
  primary: 'bg-gradient-to-b from-primary-50 via-white to-white',
  warm:    'bg-gradient-to-b from-secondary-50 via-white to-white',
  sun:     'bg-gradient-to-b from-accent-50 via-white to-white',
};

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'article': return <FileText size={18} />;
    case 'video':   return <Video size={18} />;
    case 'tool':    return <Wrench size={18} />;
    case 'guide':   return <BookOpen size={18} />;
    default:        return <ExternalLink size={18} />;
  }
};

const getResourceBadge = (type: string) => {
  switch (type) {
    case 'article': return 'Article';
    case 'video':   return 'Vidéo';
    case 'tool':    return 'Outil';
    case 'guide':   return 'Guide';
    default:        return 'Ressource';
  }
};

/* Le type est une DONNÉE : MetaPill (arbitrage n°14), plus Badge. */
const TYPE_PILL_TONE: Record<string, MetaPillTone> = {
  article: 'brand',
  video:   'warm',
  tool:    'sun',
  guide:   'success',
};

export const ComplementaryContentViewer: React.FC = () => {
  const navigate = useNavigate();
  const lessonCtx = useLessonContext();
  const tone: PageTone = lessonCtx?.tone ?? 'primary';

  const handleClose = () => {
    if (lessonCtx) {
      navigate(`/learning-paths/${lessonCtx.parcoursId}/lessons/${lessonCtx.lesson.id}`);
    } else {
      navigate(-1);
    }
  };

  const stats = [
    { label: 'Articles', count: RESOURCES.filter(r => r.type === 'article').length },
    { label: 'Vidéos',   count: RESOURCES.filter(r => r.type === 'video').length },
    { label: 'Guides',   count: RESOURCES.filter(r => r.type === 'guide').length },
    { label: 'Outils',   count: RESOURCES.filter(r => r.type === 'tool').length },
  ].filter(st => st.count > 0);

  /* Passe typographique du 24/09. Le titre était dit trois fois (surtitre de
     la barre, titre de la barre, h1 à 20 px avec une pastille dégradée) : la
     barre garde une ligne de méta, le contenu un h1 36 et son chapô. Les
     quatre ressources sont des rangées dans UNE carte (arbitrage n°5), leur
     titre un h3 20 (il était en 16/600, un titre qui s'ignore), leur type une
     MetaPill et leurs mots-clés une légende (tous deux en Badge capitales),
     leur description en ink-700 (elle était au cran 500). */
  return (
    <div
      className={['fixed inset-0 z-modal overflow-y-auto', TONE_GRADIENT_BG[tone]].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="complementaires-titre"
    >
      <ViewerHeader
        tone={tone}
        eyebrow="Ressources complémentaires"
        subtitle={lessonCtx ? lessonCtx.lesson.title : `${RESOURCES.length} ressources`}
        onClose={handleClose}
      />

      {/* 48 au-dessus de l'en-tête, 32 entre lui et la liste : l'en-tête se
          lit avec ce qu'il ouvre (rapport 1,5), pas avec la barre. */}
      <div className="pt-page pb-section md:pb-section-lg px-4 sm:px-6 lg:px-10">
        <Container width="medium" padding={false} className="flex flex-col gap-section">

          {/* ── En-tête de l'écran ──────────────────────────────── */}
          <header className="flex flex-col gap-stack-sm">
            <h1 id="complementaires-titre" className="font-display text-h1 text-ink-900">
              Pour aller plus loin
            </h1>
            <p className="font-body text-body-lg text-ink-700 max-w-prose">
              {RESOURCES.length} ressources pour approfondir la leçon : articles, vidéos, guides et outils.
            </p>
          </header>

          {/* ── Les ressources : le titre (h2) au-dessus des deux colonnes,
              pour que la liste et son encart partent de la même ligne. ── */}
          <div className="flex flex-col gap-stack">
          <h2 id="complementaires-liste" className="font-display text-h2 text-ink-900">Les ressources</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-section items-start">

            {/* Resources list */}
            <section aria-labelledby="complementaires-liste">
              <Card as="ul" className="flex flex-col gap-0 p-0 divide-y divide-ink-100">
                {RESOURCES.map((resource) => (
                  <li key={resource.id} className="flex gap-stack p-stack-lg">
                    {/* Pastille 40 au rayon 10 (arbitrage n°3) ; elle faisait 56. */}
                    <div
                      className={[
                        'w-10 h-10 rounded-md flex items-center justify-center shrink-0',
                        TONE_BG_700[tone],
                      ].join(' ')}
                    >
                      <span className="text-white">{getResourceIcon(resource.type)}</span>
                    </div>

                    {/* Titre → 8 → texte → 12 → méta → 20 → action. Le titre se
                        centre sur la pastille : (40 − 26) / 2 = 7. */}
                    <div className="flex-1 min-w-0 flex flex-col mt-[7px]">
                      <h3 className="font-display text-h3 text-ink-900">
                        {resource.title}
                      </h3>

                      <p className="mt-stack-xs font-body text-body text-ink-700 max-w-prose">
                        {resource.description}
                      </p>

                      <div className="mt-stack-sm flex gap-x-stack-xs gap-y-stack-3xs items-center flex-wrap">
                        <MetaPill text={getResourceBadge(resource.type)} tone={TYPE_PILL_TONE[resource.type] ?? 'neutral'} />
                        {resource.duration && (
                          <MetaPill icon={<Clock size={14} />} text={resource.duration} tone="neutral" />
                        )}
                        <span className="font-body text-caption text-ink-600">
                          {resource.tags.join(' · ')}
                        </span>
                      </div>

                      <div className="mt-stack-md">
                        <Button
                          emphasis="outline"
                          size="sm"
                          trailingIcon={<ExternalLink size={14} />}
                          onClick={(e) => { e.stopPropagation(); window.open(resource.url, '_blank'); }}
                        >
                          Accéder à la ressource
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </Card>
            </section>

            {/* Sidebar — deux petits blocs d'appoint : un libellé de groupe
                (13/600 ink-600) plutôt qu'un h4 en 16/600, et des rangées
                séparées par un filet plutôt que des tuiles grises à libellé au
                cran 500. */}
            <aside className="flex flex-col gap-stack" aria-label="Autour de ces ressources">

              {/* Quick Stats */}
              <Card className="flex flex-col gap-stack-xs">
                <p className="font-body text-caption font-semibold text-ink-600">
                  Ressources disponibles
                </p>
                <dl className="divide-y divide-ink-100">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex justify-between items-baseline py-stack-xs">
                      <dt className="font-body text-body text-ink-700">{stat.label}</dt>
                      <dd className="font-body text-body font-semibold text-ink-900 tabular-nums">{stat.count}</dd>
                    </div>
                  ))}
                </dl>
              </Card>

              {/* Related Topics */}
              <Card className="flex flex-col gap-stack-sm">
                <p className="font-body text-caption font-semibold text-ink-600">
                  Sujets connexes
                </p>
                <div className="flex flex-col gap-stack-xs">
                  {RELATED_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {}}
                      className="w-full min-h-touch px-3 py-stack-xs border border-ink-100 rounded-lg bg-white text-ink-900 cursor-pointer font-body text-body text-left transition-colors duration-base hover:bg-ink-50 flex justify-between items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                      <span>{topic}</span>
                      <ArrowRight size={14} className="text-ink-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </Card>
            </aside>
          </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ComplementaryContentViewer;
