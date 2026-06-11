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
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { ExternalLink, BookOpen, Video, FileText, Wrench, Clock, ArrowRight, Library } from 'lucide-react';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { Container } from '../components/layout';
import { useLessonContext } from '../lib/lesson-context';
import { TONE_BG_500, TONE_HERO_GRADIENT } from '../lib/tone-classes';
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
    title: 'Deep Work: Focus et concentration',
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
    title: "Template: Plan de motivation d'équipe",
    description: "Un template réutilisable pour planifier et suivre les initiatives de motivation en équipe.",
    type: 'guide',
    url: '#',
    tags: ['template', 'équipe'],
  },
  {
    id: 4,
    title: 'Outil: Diagnostic SCARF interactif',
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

const TYPE_BADGE_VARIANT: Record<string, 'brand' | 'warm' | 'sun' | 'success' | 'danger' | 'info'> = {
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

  return (
    <div
      className={['fixed inset-0 z-modal overflow-y-auto', TONE_GRADIENT_BG[tone]].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label="Contenus complémentaires"
    >
      <ViewerHeader
        tone={tone}
        eyebrow="Ressources complémentaires"
        title={lessonCtx ? lessonCtx.lesson.title : 'Contenus complémentaires'}
        subtitle={`${RESOURCES.length} ressources pour approfondir`}
        onClose={handleClose}
      />

      <div className="py-stack-lg px-stack sm:px-stack-lg lg:px-section">
        <Container width="medium" padding={false} className="flex flex-col gap-stack-lg">

          {/* ── Title block ─────────────────────────────────────── */}
          <header className="flex items-center gap-stack">
            <div
              className={[
                'w-10 h-10 rounded-xl inline-flex items-center justify-center shadow-sm',
                TONE_HERO_GRADIENT[tone],
              ].join(' ')}
            >
              <Library size={20} className="text-white" />
            </div>
            <h1 className="m-0 font-display text-h3 font-bold text-ink-900 leading-tight">
              Ressources complémentaires
            </h1>
          </header>

          {/* ── Main 2-column grid ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-section">

            {/* Resources list */}
            <div className="flex flex-col gap-stack">
              {RESOURCES.map((resource) => (
                <Card
                  key={resource.id}
                  className="transition-all duration-base hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex gap-stack">
                    {/* Icon bubble */}
                    <div
                      className={[
                        'w-14 h-14 rounded-xl flex items-center justify-center shrink-0',
                        TONE_BG_500[tone],
                      ].join(' ')}
                    >
                      <span className="text-white">{getResourceIcon(resource.type)}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-stack-xs mb-stack-xs">
                        <h3 className="font-display text-body font-semibold text-ink-900 m-0 flex-1 leading-snug">
                          {resource.title}
                        </h3>
                        <Badge variant={TYPE_BADGE_VARIANT[resource.type] ?? 'neutral'}>
                          {getResourceBadge(resource.type)}
                        </Badge>
                      </div>

                      <p className="font-body text-body-sm text-ink-500 m-0 mb-stack-xs leading-relaxed">
                        {resource.description}
                      </p>

                      <div className="flex gap-3 items-center flex-wrap">
                        {resource.duration && (
                          <MetaPill icon={<Clock size={12} />} text={resource.duration} tone="brand" size="sm" />
                        )}
                        <div className="flex gap-stack-xs flex-wrap">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="info">{tag}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          trailingIcon={<ExternalLink size={14} />}
                          onClick={(e) => { e.stopPropagation(); window.open(resource.url, '_blank'); }}
                        >
                          Accéder à la ressource
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-stack">

              {/* Quick Stats */}
              <Card>
                <h4 className="font-display text-body font-semibold text-ink-900 m-0 mb-3">
                  Ressources disponibles
                </h4>
                <div className="flex flex-col gap-stack-xs">
                  {[
                    { label: 'Articles', count: RESOURCES.filter(r => r.type === 'article').length },
                    { label: 'Vidéos',   count: RESOURCES.filter(r => r.type === 'video').length },
                    { label: 'Guides',   count: RESOURCES.filter(r => r.type === 'guide').length },
                    { label: 'Outils',   count: RESOURCES.filter(r => r.type === 'tool').length },
                  ].filter(s => s.count > 0).map((stat) => (
                    <div key={stat.label} className="flex justify-between items-center p-stack-xs bg-ink-50 rounded-md">
                      <span className="font-body text-body-sm text-ink-500">{stat.label}</span>
                      <span className="font-body text-body font-semibold text-ink-900">{stat.count}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Related Topics */}
              <Card>
                <h4 className="font-display text-body font-semibold text-ink-900 m-0 mb-3">
                  Sujets connexes
                </h4>
                <div className="flex flex-col gap-stack-xs">
                  {RELATED_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {}}
                      className="w-full min-h-touch px-3 py-stack-xs border border-ink-100 rounded-md bg-white text-ink-900 cursor-pointer font-body text-body-sm text-left transition-colors duration-base hover:bg-ink-50 flex justify-between items-center"
                    >
                      <span>{topic}</span>
                      <ArrowRight size={14} className="text-ink-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ComplementaryContentViewer;
