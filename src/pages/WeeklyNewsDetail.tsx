import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { ArrowLeft, CalendarDays, Newspaper, TrendingUp } from 'lucide-react';

export const WeeklyNewsDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col gap-6">
      <EditorialHero
        eyebrow={{ icon: <Newspaper size={12} />, label: 'Actu de la semaine' }}
        title="Actu majeure : IA générative et formation"
        summary="L'essentiel de l'actualité en une page : impact, opportunités à court terme et actions recommandées."
        meta={[
          { icon: <CalendarDays size={12} />, label: 'Semaine 17' },
          { icon: <TrendingUp size={12} />, label: 'Priorité forte' },
        ]}
      />

      <EditorialLayout
        main={
          <>
            <div className="rounded-xl border border-ink-200 bg-gradient-to-br from-primary-50 via-white to-secondary-50/30 min-h-[260px] flex items-center justify-center text-ink-400 text-body-sm shadow-xs">
              Visuel / extrait principal
            </div>

            <SectionCard
              title="Pourquoi c'est important"
              actions={
                <>
                  <Button variant="secondary" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate('/veille/weekly-newsletter')}>
                    Retour newsletter
                  </Button>
                  <Button>Lire la source</Button>
                </>
              }
            >
              <p className="m-0 text-body-sm text-ink-500 leading-relaxed">
                Résumé actionnable de l'actualité et implications concrètes pour les apprenants.
              </p>
            </SectionCard>
          </>
        }
        aside={
          <SectionCard title="Items associés">
            <RelatedItemList
              items={[
                { id: '1', title: 'Dossier complet', description: 'Approfondir le sujet' },
                { id: '2', title: 'Tutorial vidéo', description: 'Mise en pratique' },
              ]}
            />
          </SectionCard>
        }
      />
    </div>
  );
};

export default WeeklyNewsDetail;
