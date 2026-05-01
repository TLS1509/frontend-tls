/**
 * ComplementaryContentViewer Page
 *
 * Displays supplementary learning materials related to a lesson:
 * - External resources (articles, videos, tools)
 * - Further reading recommendations
 * - Related topics
 * - Quick reference guides
 *
 * Uses TLS design system components and tokens.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { X, ExternalLink, BookOpen, Video, FileText, Wrench, Clock, ArrowRight } from 'lucide-react';

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
    description: 'Un guide complet sur la création d\'un environnement propice au travail profond et à la concentration.',
    type: 'article',
    duration: '8 min de lecture',
    url: '#',
    tags: ['productivité', 'focus'],
  },
  {
    id: 2,
    title: 'Théorie de l\'autodétermination (Deci & Ryan)',
    description: 'Regardez cette conférence sur les fondements de la motivation intrinsèque en milieu professionnel.',
    type: 'video',
    duration: '24 min',
    url: '#',
    tags: ['psychologie', 'motivation'],
  },
  {
    id: 3,
    title: 'Template: Plan de motivation d\'équipe',
    description: 'Un template réutilisable pour planifier et suivre les initiatives de motivation en équipe.',
    type: 'guide',
    url: '#',
    tags: ['template', 'équipe'],
  },
  {
    id: 4,
    title: 'Outil: Diagnostic SCARF interactif',
    description: 'Outil d\'auto-diagnostic pour évaluer les dimensions SCARF dans votre environnement de travail.',
    type: 'tool',
    duration: '5-10 min',
    url: '#',
    tags: ['outil', 'scarf'],
  },
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'article':
      return <FileText size={18} />;
    case 'video':
      return <Video size={18} />;
    case 'tool':
      return <Wrench size={18} />;
    case 'guide':
      return <BookOpen size={18} />;
    default:
      return <ExternalLink size={18} />;
  }
};

const getResourceBadge = (type: string) => {
  switch (type) {
    case 'article':
      return 'Article';
    case 'video':
      return 'Vidéo';
    case 'tool':
      return 'Outil';
    case 'guide':
      return 'Guide';
    default:
      return 'Ressource';
  }
};

export const ComplementaryContentViewer: React.FC = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        padding: 'var(--s-6)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s-6)' }}>
        <div>
          <h1 style={{ margin: '0 0 var(--s-2) 0', fontSize: 'var(--t-h2)', fontWeight: 600 }}>Contenus complémentaires</h1>
          <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>
            Ressources pour approfondir votre apprentissage
          </p>
        </div>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <X size={20} />
        </Button>
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--s-6)', marginBottom: 'var(--s-6)' }}>
        {/* Resources Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          {RESOURCES.map((resource) => (
            <Card
              key={resource.id}
              style={{
                cursor: 'pointer',
                transition: 'all var(--dur-2)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-sm)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', gap: 'var(--s-4)' }}>
                {/* Icon */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 'var(--r-lg)',
                    background: 'var(--surface-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--tls-primary-500)',
                    flexShrink: 0,
                  }}
                >
                  {getResourceIcon(resource.type)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--s-2)', marginBottom: 'var(--s-2)' }}>
                    <h3 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 600, flex: 1 }}>{resource.title}</h3>
                    <Badge variant="brand">{getResourceBadge(resource.type)}</Badge>
                  </div>

                  <p style={{ margin: '0 0 var(--s-2) 0', fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {resource.description}
                  </p>

                  <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                    {resource.duration && <MetaPill icon={<Clock size={12} />} text={resource.duration} tone="brand" size="sm" />}
                    <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="brand" style={{ fontSize: 'var(--t-caption)' }}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ marginTop: 'var(--s-3)' }}>
                    <Button variant="ghost" size="sm" onClick={() => window.open(resource.url, '_blank')}>
                      Accéder à la ressource <ExternalLink size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          {/* Quick Stats */}
          <Card>
            <h4 style={{ margin: '0 0 var(--s-3) 0', fontSize: 'var(--t-body)', fontWeight: 600 }}>Ressources disponibles</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--s-2)', background: 'var(--surface-muted)', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>Articles</span>
                <span style={{ fontSize: 'var(--t-body)', fontWeight: 600, color: 'var(--text)' }}>2</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--s-2)', background: 'var(--surface-muted)', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>Vidéos</span>
                <span style={{ fontSize: 'var(--t-body)', fontWeight: 600, color: 'var(--text)' }}>1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--s-2)', background: 'var(--surface-muted)', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>Outils</span>
                <span style={{ fontSize: 'var(--t-body)', fontWeight: 600, color: 'var(--text)' }}>1</span>
              </div>
            </div>
          </Card>

          {/* Topics */}
          <Card>
            <h4 style={{ margin: '0 0 var(--s-3) 0', fontSize: 'var(--t-body)', fontWeight: 600 }}>Sujets connexes</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
              {['Engagement d\'équipe', 'Management positif', 'Intelligence émotionnelle', 'Psychologie du travail'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => {}}
                  style={{
                    padding: 'var(--s-2)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--r-md)',
                    background: 'var(--surface)',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    fontSize: 'var(--t-body-sm)',
                    transition: 'all var(--dur-2)',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{topic}</span>
                    <ArrowRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplementaryContentViewer;
