import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { CalendarDays, CheckCircle2, Clock3 } from 'lucide-react';
import { PageShell } from '../components/layout';

/* Les réponses envoyées : une question, sa réponse. */
const REPONSES = [
  { id: '1', question: 'Objectif', reponse: 'Mieux déléguer dans mon équipe' },
  { id: '2', question: 'Obstacle principal', reponse: 'Manque de clarté sur les responsabilités' },
  { id: '3', question: 'Sujet prioritaire', reponse: 'Cadre de suivi et feedback hebdomadaire' },
];

export const PreCoachingQuestionnaireResponse: React.FC = () => {
  const navigate = useNavigate();

  return (
    /* PageShell et en-tête `flat`, comme les autres pages de l'app : l'en-tête
       était une carte teintée, et portait l'étincelle qui marque l'IA
       (DESIGN.md §10) sur une page qui n'en a pas. */
    <PageShell width="medium" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coaching · Préparation"
        title="Ton questionnaire de préparation"
        summary="Vue de restitution des réponses envoyées au coach, utilisées pour personnaliser ta prochaine session."
        meta={[
          { icon: <CalendarDays size={14} />, label: 'Session prévue mardi 14:30' },
          { icon: <Clock3 size={14} />, label: 'Soumis il y a 2h' },
        ]}
        tone="flat"
      />

      <EditorialLayout
        main={
          /* Les réponses : une section (h2 hors de la carte) et une liste de
             définitions — la question en légende 600 ink-600, la réponse en
             16 ink-900. Elles étaient rendues comme une liste de liens
             (`RelatedItemList`), qui sert aux renvois vers d'autres pages. */
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Tes réponses" meta={`${REPONSES.length} questions`} size="md" />
            <Card className="p-0">
              <dl className="flex flex-col divide-y divide-ink-100">
                {REPONSES.map((r) => (
                  <div key={r.id} className="flex flex-col gap-stack-3xs px-stack-md sm:px-stack-lg py-stack">
                    <dt className="text-caption font-semibold text-ink-600">{r.question}</dt>
                    <dd className="text-body text-ink-900 max-w-prose">{r.reponse}</dd>
                  </div>
                ))}
              </dl>
            </Card>
            {/* Une page de restitution : pas d'action principale, donc pas de
                `solid` (arbitrage n°19). Modifier, l'action des réponses, en
                `soft` au ton de la page ; le retour en `ghost` neutre. Les deux
                boutons avaient le même poids, en deux tons. */}
            <div className="flex flex-wrap items-center gap-stack-xs">
              <Button emphasis="soft" tone="brand" onClick={() => navigate('/coaching/pre-questionnaire')}>
                Modifier mes réponses
              </Button>
              <Button emphasis="ghost" tone="neutral" onClick={() => navigate('/coaching')}>Retour coaching</Button>
            </div>
          </section>
        }
        aside={
          /* Deux états franchis : le texte en 16 ink-900, la coche porte le
             vert (le texte était en vert, en légende). */
          <SectionCard title="Statut">
            <ul className="flex flex-col gap-stack-xs text-body text-ink-900">
              <li className="flex items-center gap-stack-xs"><CheckCircle2 size={16} className="shrink-0 text-success-fg" aria-hidden="true" /> Transmis au coach</li>
              <li className="flex items-center gap-stack-xs"><CheckCircle2 size={16} className="shrink-0 text-success-fg" aria-hidden="true" /> Pris en compte pour la session</li>
            </ul>
          </SectionCard>
        }
      />
    </PageShell>
  );
};

export default PreCoachingQuestionnaireResponse;
