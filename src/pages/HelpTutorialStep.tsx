import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { PageShell } from '../components/layout';
import { useHelpcenterStore } from '../stores/persistence';

const STATUS_CONFIG: Record<StepStatus, { badge: string; variant: 'success' | 'brand' | 'neutral' }> = {
  completed: { badge: 'Terminé',  variant: 'success' },
  current:   { badge: 'En cours', variant: 'brand'   },
  upcoming:  { badge: 'À venir',  variant: 'neutral'  },
};

type StepStatus = 'completed' | 'current' | 'upcoming';

/* L'étape affichée suit l'URL (2026-09-24). La page était entièrement codée
   en dur — tutoriel « Paramétrer mon profil », étape 3 sur 5 — quels que
   soient les paramètres : /help/tutorials/1/step/1 montrait l'étape 3 d'un
   tutoriel absent de la liste. Elle lit maintenant le tutoriel dans le store
   d'aide (par id, `tuto-01`, ou par rang, `1`) et l'étape `stepId` (base 1). */
export default function HelpTutorialStep() {
  const { id = '', stepId = '1' } = useParams<{ id: string; stepId: string }>();
  const navigate = useNavigate();
  const tutorials = useHelpcenterStore().getTutorials();
  const tutorial =
    tutorials.find((t) => t.id === id) ?? tutorials.find((t) => String(t.order) === id);

  if (!tutorial || tutorial.sections.length === 0) {
    return (
      <PageShell width="content">
        <PageHero
          eyebrow="Centre d'aide"
          title="Tutoriel introuvable"
          summary="Ce tutoriel n'existe pas ou a été déplacé."
          tone="flat"
        />
        {/* Le tutoriel manque : le retour à la liste est la seule issue,
            donc l'action principale de l'écran (arbitrage n°19). */}
        <div>
          <Button emphasis="solid" tone="brand" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help/tutorials')}>
            Tous les tutoriels
          </Button>
        </div>
      </PageShell>
    );
  }

  const total = tutorial.sections.length;
  const parsed = Number.parseInt(stepId, 10);
  const current = Math.min(Math.max(Number.isNaN(parsed) ? 1 : parsed, 1), total);
  const section = tutorial.sections[current - 1];
  const fillPercent = Math.round((current / total) * 100);
  const goTo = (step: number) => navigate(`/help/tutorials/${tutorial.id}/step/${step}`);

  /* Passe typographique du 2026-09-24 :
     - une colonne de lecture (768), le retour au-dessus du titre ;
     - la progression est celle de l'en-tête (« Étape 1 sur 3 » et sa barre) :
       elle vivait dans un bloc à part, en légende ink-500 et pourcentage teal ;
     - l'étape est une section : son titre h2 à 28 (dessiné en 20), le numéro
       centré sur sa première ligne, le texte à la largeur de lecture — sans
       carte autour d'un titre et d'un paragraphe ;
     - l'emplacement gris de 560 px « Illustration de l'étape » est retiré :
       une étape n'a pas d'image (seulement `imageAlt`), et un cadre vide
       n'est pas un contenu ;
     - le plan : rangées dans une carte, une seule marque par état (le barré
       doublait « Terminé »), le texte en encre et plus en teal. */
  return (
    <PageShell width="content">
      <PageHero
        backLink={{ label: 'Tous les tutoriels', onClick: () => navigate('/help/tutorials') }}
        eyebrow="Centre d'aide · Tutoriel"
        title={tutorial.title}
        tone="flat"
        progress={fillPercent}
        progressLabel={`Étape ${current} sur ${total}`}
      />

      {/* L'étape et sa navigation : un bloc (32 px). */}
      <div className="flex flex-col gap-section">
        <section className="flex flex-col gap-stack-sm" aria-labelledby="etape-titre">
          <h2 id="etape-titre" className="flex items-start gap-stack-sm font-display text-h2 text-ink-900 text-balance">
            {/* Une ligne de haut : la pastille (32) se centre sur la première
                ligne du titre (36). */}
            <span className="shrink-0 inline-flex items-center h-lh" aria-hidden="true">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-pill bg-primary-700 text-white font-body font-bold text-body tabular-nums">
                {current}
              </span>
            </span>
            <span className="min-w-0">{section.title}</span>
          </h2>
          <p className="text-body-lg text-ink-700 max-w-prose">
            {section.text}
          </p>
        </section>

        {/* Un pas à pas : avancer est l'aplat, reculer un ghost neutre — le
            motif des lecteurs (arbitrage n°19). */}
        <div className="flex flex-wrap items-center justify-between gap-stack">
          <Button
            emphasis="ghost"
            tone="neutral"
            leadingIcon={<ArrowLeft size={16} />}
            disabled={current === 1}
            onClick={() => goTo(current - 1)}
          >
            Étape précédente
          </Button>
          {current < total ? (
            <Button emphasis="solid" tone="brand" trailingIcon={<ArrowRight size={16} />} onClick={() => goTo(current + 1)}>
              Étape suivante
            </Button>
          ) : (
            <Button emphasis="solid" tone="brand" trailingIcon={<ArrowRight size={16} />} onClick={() => navigate('/help/tutorials')}>
              Terminer le tutoriel
            </Button>
          )}
        </div>
      </div>

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Plan du tutoriel" meta={`${total} étapes`} />
        <Card className="p-0 overflow-hidden">
          <ol className="flex flex-col divide-y divide-ink-100">
            {tutorial.sections.map((sec, index) => {
              const step = {
                id: index + 1,
                title: sec.title,
                status: (index + 1 < current ? 'completed' : index + 1 === current ? 'current' : 'upcoming') as StepStatus,
              };
              const config = STATUS_CONFIG[step.status];
              return (
                <li
                  key={step.id}
                  aria-current={step.status === 'current' ? 'step' : undefined}
                  className={[
                    'flex items-center gap-stack px-stack-md sm:px-stack-lg py-stack',
                    step.status === 'current' ? 'bg-primary-50' : '',
                  ].join(' ')}
                >
                  <span className="shrink-0 inline-flex" aria-hidden="true">
                    {step.status === 'completed'
                      ? <CheckCircle size={18} className="text-success-fg" />
                      : step.status === 'current'
                      ? <ChevronRight size={18} className="text-primary-700" />
                      : <Circle size={18} className="text-ink-400" />
                    }
                  </span>
                  <span
                    className={[
                      'flex-1 text-body',
                      step.status === 'current' ? 'font-semibold text-ink-900'
                      : step.status === 'completed' ? 'text-ink-700'
                      : 'text-ink-900',
                    ].join(' ')}
                  >
                    {step.id}. {step.title}
                  </span>
                  <Badge variant={config.variant}>{config.badge}</Badge>
                </li>
              );
            })}
          </ol>
        </Card>
      </section>
    </PageShell>
  );
}
