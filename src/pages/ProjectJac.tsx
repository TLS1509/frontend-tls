import { Award, CheckCircle, Clock, Calendar, Lock, Star } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import Button from '../components/core/Button';
import Badge from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AchievementBadge } from '../components/ui/AchievementBadge';

type JalonStatut = 'completed' | 'in-progress' | 'upcoming';

const jalons: {
  titre: string;
  statut: JalonStatut;
  date: string;
  competences: string[];
  avancement: number;
}[] = [
  {
    titre: 'Jalon 1 — Diagnostic initial',
    statut: 'completed',
    date: '15 mars 2026',
    competences: ['Analyse de données', 'Communication écrite'],
    avancement: 100,
  },
  {
    titre: 'Jalon 2 — Prototype fonctionnel',
    statut: 'completed',
    date: '10 avril 2026',
    competences: ['Architecture logicielle', 'Tests'],
    avancement: 100,
  },
  {
    titre: 'Jalon 3 — Validation utilisateurs',
    statut: 'in-progress',
    date: '30 mai 2026',
    competences: ['Recherche UX', 'Facilitation'],
    avancement: 60,
  },
  {
    titre: 'Jalon 4 — Livraison finale',
    statut: 'upcoming',
    date: '15 juillet 2026',
    competences: ['Gestion de projet', 'Documentation'],
    avancement: 0,
  },
];

const statutVariant: Record<JalonStatut, 'success' | 'brand' | 'neutral'> = {
  completed: 'success',
  'in-progress': 'brand',
  upcoming: 'neutral',
};

const statutLabel: Record<JalonStatut, string> = {
  completed: 'Complété',
  'in-progress': 'En cours',
  upcoming: 'À venir',
};

const statutIcon: Record<JalonStatut, React.ReactNode> = {
  completed: <CheckCircle size={16} className="text-success-base" />,
  'in-progress': <Clock size={16} className="text-primary-600" />,
  upcoming: <Lock size={16} className="text-ink-400" />,
};

const certifications = [
  {
    titre: 'Certif. Gestion de Projet Agile',
    description: 'Maîtrise des jalons 1 et 2 · Niveau D3 minimum · Évaluation pair et coach',
    color: 'primary' as const,
  },
  {
    titre: 'Expert UX Research',
    description: 'Complétion du jalon 3 · Dossier de preuves · Session de jury',
    color: 'warm' as const,
  },
];

export default function ProjectJac() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Projet · JAC"
        title="Jalons de Certification JAC"
        summary="Suivez les jalons de validation des acquis de compétences et accédez aux certifications disponibles dans le cadre du projet."
        tone="default"
      />

      <div className="px-6 flex flex-col gap-section max-w-page mx-auto w-full">
        {/* Jalons */}
        <SectionCard
          titleIcon={<Calendar size={18} className="text-primary-600" />}
          title="Jalons"
          description="Progression sur les étapes clés de validation du projet."
        >
          <ul className="flex flex-col gap-stack divide-y divide-ink-100">
            {jalons.map((j) => (
              <li key={j.titre} className="flex flex-col gap-stack-xs pt-stack first:pt-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    {statutIcon[j.statut]}
                    <span className="text-body-sm font-semibold text-ink-900">{j.titre}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={statutVariant[j.statut]} size="sm">{statutLabel[j.statut]}</Badge>
                    <span className="text-caption text-ink-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {j.date}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {j.competences.map((c) => (
                    <Badge key={c} variant="brand" size="sm">{c}</Badge>
                  ))}
                </div>
                {j.avancement > 0 && (
                  <ProgressBar
                    value={j.avancement}
                    fill={j.statut === 'completed' ? 'success' : 'brand'}
                    size="sm"
                  />
                )}
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Certifications disponibles */}
        <SectionCard
          titleIcon={<Award size={18} className="text-primary-600" />}
          title="Certifications disponibles"
          description="Certifications accessibles sur la base des jalons validés et des preuves de compétences."
        >
          <div className="grid grid-cols-1 gap-stack sm:grid-cols-2">
            {certifications.map((cert) => (
              <div
                key={cert.titre}
                className="flex flex-col gap-stack rounded-xl border border-ink-100 bg-ink-50 p-4"
              >
                <AchievementBadge
                  title={cert.titre}
                  description={cert.description}
                  icon={<Star />}
                  color={cert.color}
                  size="md"
                />
                <Button variant="ghost" size="sm" fullWidth>
                  Demander la validation
                </Button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
