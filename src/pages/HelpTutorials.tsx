import React, { useState } from 'react';
import { HelpCircle, Play, Clock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';

const TUTORIALS = [
  {
    id: '1',
    title: 'Configurer son profil apprenant',
    description: 'Apprenez à compléter votre profil, choisir vos objectifs et personnaliser votre expérience d\'apprentissage.',
    duration: '3 min',
    level: 'Débutant',
  },
  {
    id: '2',
    title: 'Naviguer dans son parcours',
    description: 'Découvrez comment accéder à vos modules, suivre votre progression et reprendre une leçon en cours.',
    duration: '4 min',
    level: 'Débutant',
  },
  {
    id: '3',
    title: 'Utiliser le journal de bord',
    description: 'Maîtrisez le journal de bord pour consigner vos réflexions, suivre vos compétences et préparer vos sessions de coaching.',
    duration: '5 min',
    level: 'Avancé',
  },
  {
    id: '4',
    title: 'Gérer les notifications et rappels',
    description: 'Configurez vos préférences de notification pour rester informé sans être submergé.',
    duration: '2 min',
    level: 'Débutant',
  },
  {
    id: '5',
    title: 'Administrer une cohorte',
    description: 'Tutoriel destiné aux managers et RH pour créer des cohortes, affecter des parcours et suivre les progrès.',
    duration: '8 min',
    level: 'Admin',
  },
  {
    id: '6',
    title: 'Analyser les tableaux de bord coach',
    description: 'Explorez les métriques d\'engagement, les signaux d\'alerte et les outils d\'analyse à disposition des coachs.',
    duration: '6 min',
    level: 'Avancé',
  },
];

const LEVEL_VARIANTS: Record<string, 'brand' | 'warm' | 'sun' | 'neutral'> = {
  Débutant: 'brand',
  Avancé:   'warm',
  Admin:    'sun',
};

const FILTERS = [
  { id: 'all',      label: 'Tous'      },
  { id: 'Débutant', label: 'Débutant'  },
  { id: 'Avancé',   label: 'Avancé'    },
  { id: 'Admin',    label: 'Admin'     },
];

export default function HelpTutorials() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? TUTORIALS
    : TUTORIALS.filter((t) => t.level === activeFilter);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Tutoriels' }}
        title="Tutoriels vidéo"
        summary="Apprenez à utiliser toutes les fonctionnalités de la plateforme avec nos guides pas-à-pas."
        tone="default"
      />

      <div className="max-w-page mx-auto w-full px-4 flex flex-col gap-section pb-page">
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
          {filtered.map((tutorial) => (
            <Card key={tutorial.id} className="flex flex-col h-full">
              <div className="flex flex-col gap-stack flex-1">
                <div className="flex items-start justify-between gap-stack-xs">
                  <h3 className="font-display font-semibold text-h4 text-ink-900 m-0 leading-snug">
                    {tutorial.title}
                  </h3>
                  <Badge variant={LEVEL_VARIANTS[tutorial.level] ?? 'neutral'}>{tutorial.level}</Badge>
                </div>
                <p className="text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between gap-stack-xs pt-stack-xs border-t border-ink-100">
                  <span className="flex items-center gap-tight text-caption text-ink-500">
                    <Clock size={12} />
                    {tutorial.duration}
                  </span>
                  <Button variant="primary" size="sm" leadingIcon={<Play size={14} />}>
                    Démarrer
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
