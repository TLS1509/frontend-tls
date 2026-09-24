import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { useHelpcenterStore } from '../stores/persistence';
import { PageShell } from '../components/layout';

export default function HelpTutorials() {
  const navigate = useNavigate();
  const store = useHelpcenterStore();
  const tutorials = store.getTutorials();

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const m = Math.round(seconds / 60);
    return `${m} min`;
  };

  /* Passe typographique du 2026-09-24 : une seule coque (l'en-tête collait au
     haut de la fenêtre) ; le filtre « Tous », seul et sans alternative, est
     retiré ; la grille a son titre de section (la page sautait du h1 aux h3
     des cartes) ; le nombre d'étapes et la durée sont une ligne de méta sous
     le titre (« 3 ÉTAPES » était un Badge qui serrait le titre sur deux
     lignes) ; la description passe à ink-700 et l'action à 24 du contenu. */
  return (
    <PageShell width="page">
      <PageHero
        eyebrow="Centre d'aide"
        title="Tutoriels"
        summary="Apprenez à utiliser toutes les fonctionnalités de la plateforme avec nos guides pas à pas."
        tone="flat"
      />

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Tous les tutoriels" meta={`${tutorials.length} tutoriels`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
          {tutorials.map((tutorial) => {
            const duration = formatDuration(tutorial.videoDurationSeconds);
            const stepCount = tutorial.sections.length;
            return (
              <Card key={tutorial.id} className="flex flex-col gap-stack-lg h-full">
                <div className="flex flex-col gap-stack-xs flex-1">
                  <div className="flex flex-col gap-stack-3xs">
                    <h3 className="font-display text-h3 text-ink-900">
                      {tutorial.title}
                    </h3>
                    <p className="text-caption text-ink-600">
                      {stepCount} étapes{duration ? ` · ${duration}` : ''}
                    </p>
                  </div>
                  <p className="text-body text-ink-700">
                    {tutorial.description}
                  </p>
                </div>
                <div>
                  <Button
                    emphasis="soft"
                    size="sm"
                    leadingIcon={<Play size={14} />}
                    aria-label={`Démarrer le tutoriel : ${tutorial.title}`}
                    onClick={() => navigate(`/help/tutorials/${tutorial.id}/step/1`)}
                  >
                    Démarrer
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
