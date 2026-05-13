import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { Target, CheckCircle2, Clock3, FolderKanban, Sparkles, Award } from 'lucide-react';

const KPI: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center text-center gap-1 px-5 py-4 rounded-xl border border-ink-200 bg-white shadow-xs hover:-translate-y-0.5 hover:shadow-sm hover:border-primary-300 transition-all">
    <strong className="font-display text-h2 font-extrabold tracking-tight text-primary-700 leading-none">
      {value}
    </strong>
    <span className="text-caption text-ink-500">{label}</span>
  </div>
);

export const Project: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <Award size={12} />, label: 'Projet certifiant' }}
        title="Projet Final"
        summary="Vue dédiée au projet de fin de parcours, avec livrables, preuves et soumission."
        meta={[
          { icon: <Clock3 size={12} />, label: '80 min estimés' },
          { icon: <Sparkles size={12} />, label: '5 étapes' },
        ]}
      />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <KPI value="1/5" label="Étapes complétées" />
        <KPI value="2" label="Livrables ajoutés" />
        <KPI value="48h" label="Feedback estimé" />
      </section>

      <EditorialLayout
        main={
          <SectionCard
            title="Plan de leadership appliqué"
            titleIcon={<Target size={18} className="text-primary-600" />}
            description="Objectifs, livrables, feedbacks et progression du projet."
            actions={
              <>
                <Button>Commencer le projet</Button>
                <Button variant="secondary" onClick={() => navigate('/learning-paths/1')}>
                  Voir le brief
                </Button>
              </>
            }
          >
            <div className="rounded-lg border border-dashed border-ink-300 min-h-[220px] flex items-center justify-center text-center text-ink-500 text-body-sm bg-ink-50/40">
              Zone projet : brief, contexte et livrable attendu
            </div>
            <div className="rounded-xl border border-accent-200 bg-gradient-to-br from-accent-50 to-white p-4">
              <p className="m-0 text-body-sm text-ink-700 leading-relaxed">
                Pour valider, documentez votre contexte, vos prompts, vos tests et votre plan de déploiement.
              </p>
            </div>
          </SectionCard>
        }
        aside={
          <SectionCard title="Checklist" titleIcon={<FolderKanban size={15} className="text-primary-600" />}>
            <ul className="m-0 p-0 list-none flex flex-col gap-2 text-caption text-ink-500">
              <li className="inline-flex items-center gap-1.5 text-success-fg">
                <CheckCircle2 size={12} /> Cadrage terminé
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock3 size={12} /> Prototype en cours
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock3 size={12} /> Feedback coach planifié
              </li>
            </ul>
          </SectionCard>
        }
      />
    </div>
  );
};

export default Project;
