/**
 * ComplementaryContentViewer Page
 *
 * Displays supplementary learning materials related to a lesson.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { ExternalLink, BookOpen, Video, FileText, Wrench, Clock, ArrowRight } from 'lucide-react';
import { ViewerOverlay } from '../components/patterns/ViewerOverlay';

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

export const ComplementaryContentViewer: React.FC = () => {
  const navigate = useNavigate();
  const [, setExpandedId] = useState<number | null>(null);

  return (
    <ViewerOverlay
      title="Contenus complémentaires"
      subtitle="Ressources pour approfondir votre apprentissage"
      tone="brand"
      onClose={() => navigate(-1)}
    >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section">

      {/* Main 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mb-6">

        {/* Resources list */}
        <div className="flex flex-col gap-4">
          {RESOURCES.map((resource) => (
            <Card
              key={resource.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              onClick={() => setExpandedId((id) => id === resource.id ? null : resource.id)}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-ink-50 text-primary-500 flex items-center justify-center shrink-0">
                  {getResourceIcon(resource.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="font-display text-body font-semibold text-ink-900 m-0 flex-1">
                      {resource.title}
                    </h3>
                    <Badge variant="brand">{getResourceBadge(resource.type)}</Badge>
                  </div>

                  <p className="font-body text-body-sm text-ink-500 m-0 mb-2 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="flex gap-3 items-center flex-wrap">
                    {resource.duration && (
                      <MetaPill icon={<Clock size={12} />} text={resource.duration} tone="brand" size="sm" />
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="neutral">{tag}</Badge>
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
        <div className="flex flex-col gap-4">

          {/* Quick Stats */}
          <Card>
            <h4 className="font-display text-body font-semibold text-ink-900 m-0 mb-3">
              Ressources disponibles
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Articles', count: 2 },
                { label: 'Vidéos',   count: 1 },
                { label: 'Outils',   count: 1 },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center p-2 bg-ink-50 rounded-md">
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
            <div className="flex flex-col gap-2">
              {RELATED_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {}}
                  className="w-full px-2 py-2 border border-ink-100 rounded-md bg-white text-ink-900 cursor-pointer font-body text-body-sm text-left transition-colors duration-200 hover:bg-ink-50"
                >
                  <div className="flex justify-between items-center">
                    <span>{topic}</span>
                    <ArrowRight size={14} className="text-ink-400 shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
    </ViewerOverlay>
  );
};

export default ComplementaryContentViewer;
