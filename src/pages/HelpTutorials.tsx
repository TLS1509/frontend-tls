import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Play, Clock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { useHelpcenterStore } from '../stores/persistence';
import { Container } from '../components/layout';

const FILTERS = [
  { id: 'all', label: 'Tous' },
];

export default function HelpTutorials() {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const store = useHelpcenterStore();
  const tutorials = store.getTutorials();

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const m = Math.round(seconds / 60);
    return `${m} min`;
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Tutoriels' }}
        title="Tutoriels"
        summary="Apprenez à utiliser toutes les fonctionnalités de la plateforme avec nos guides pas-à-pas."
        tone="default"
      />

      <Container width="page" padding={false} className="px-4 flex flex-col gap-section pb-page">
        <div className="flex flex-wrap gap-stack-xs">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.id}
              label={f.label}
              active={activeFilter === f.id}
              onClick={() => setActiveFilter(f.id)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
          {tutorials.map((tutorial) => {
            const duration = formatDuration(tutorial.videoDurationSeconds);
            const stepCount = tutorial.sections.length;
            return (
              <Card key={tutorial.id} className="flex flex-col h-full">
                <div className="flex flex-col gap-stack flex-1">
                  <div className="flex items-start justify-between gap-stack-xs">
                    <h3 className="font-display font-semibold text-h4 text-ink-900 m-0 leading-snug">
                      {tutorial.title}
                    </h3>
                    <Badge variant="brand">{stepCount} étapes</Badge>
                  </div>
                  <p className="text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center justify-between gap-stack-xs pt-stack-xs border-t border-ink-100">
                    {duration && (
                      <span className="flex items-center gap-tight text-caption text-ink-500">
                        <Clock size={12} />
                        {duration}
                      </span>
                    )}
                    <Button
                      variant="primary"
                      size="sm"
                      leadingIcon={<Play size={14} />}
                      onClick={() => navigate(`/help/tutorials/${tutorial.id}/step/1`)}
                    >
                      Démarrer
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
