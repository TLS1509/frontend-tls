import { Users, Award, CheckCircle, TrendingUp, BookOpen, BarChart2, Target } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';

const competences = [
  { name: 'Analyse de données', fill: 78, niveau: 'D3', membres: 5 },
  { name: 'Communication écrite', fill: 90, niveau: 'D4', membres: 7 },
  { name: 'Gestion de projet', fill: 55, niveau: 'D2', membres: 4 },
  { name: 'Pensée critique', fill: 65, niveau: 'D3', membres: 6 },
  { name: 'Facilitation', fill: 40, niveau: 'D1', membres: 3 },
];

const niveauVariant: Record<string, 'brand' | 'warm' | 'sun' | 'success' | 'neutral'> = {
  D1: 'neutral',
  D2: 'info' as any,
  D3: 'brand',
  D4: 'warm',
  D5: 'success',
};

const activites = [
  { nom: 'Marie Dupont', action: 'a validé', competence: 'Analyse de données', date: '13 mai 2026', initiales: 'MD' },
  { nom: 'Thomas Roux', action: 'a progressé en', competence: 'Communication écrite', date: '12 mai 2026', initiales: 'TR' },
  { nom: 'Lucie Bernard', action: 'a atteint D3 en', competence: 'Gestion de projet', date: '11 mai 2026', initiales: 'LB' },
  { nom: 'Ahmed Saïd', action: 'a débuté', competence: 'Facilitation', date: '10 mai 2026', initiales: 'AS' },
  { nom: 'Claire Martin', action: 'a obtenu un badge en', competence: 'Pensée critique', date: '9 mai 2026', initiales: 'CM' },
];

export default function ProjectPasseportFeed() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Projet · Passeport"
        title="Feed Compétences du Projet"
        summary="Visualisez les compétences mobilisées, les niveaux Dreyfus atteints et la progression collective de votre équipe."
        tone="primary"
      />

      <div className="px-6 flex flex-col gap-section max-w-page mx-auto w-full">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-stack lg:grid-cols-4">
          <StatCard
            label="Compétences mobilisées"
            value="12"
            icon={<BookOpen size={20} />}
            tone="brand"
          />
          <StatCard
            label="Membres actifs"
            value="8"
            icon={<Users size={20} />}
            tone="neutral"
          />
          <StatCard
            label="Validations Dreyfus"
            value="34"
            icon={<CheckCircle size={20} />}
            tone="brand"
          />
          <StatCard
            label="Badges obtenus"
            value="17"
            icon={<Award size={20} />}
            tone="warm"
          />
        </div>

        {/* Compétences mobilisées */}
        <SectionCard
          titleIcon={<BarChart2 size={18} className="text-primary-600" />}
          title="Compétences mobilisées"
          description="Niveaux Dreyfus agrégés de l'équipe pour les compétences clés du projet."
        >
          <ul className="flex flex-col gap-stack-lg divide-y divide-ink-100">
            {competences.map((c) => (
              <li key={c.name} className="flex flex-col gap-stack-xs pt-stack-xs first:pt-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-sm font-semibold text-ink-900">{c.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={niveauVariant[c.niveau] ?? 'brand'} size="sm">{c.niveau}</Badge>
                    <span className="text-caption text-ink-400 flex items-center gap-1">
                      <Users size={12} />
                      {c.membres}
                    </span>
                  </div>
                </div>
                <ProgressBar value={c.fill} fill="brand" size="sm" />
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Activité récente */}
        <SectionCard
          titleIcon={<TrendingUp size={18} className="text-primary-600" />}
          title="Activité récente"
          description="Les dernières actions de progression des membres de l'équipe."
        >
          <ul className="flex flex-col gap-stack divide-y divide-ink-100">
            {activites.map((a, i) => (
              <li key={i} className="flex items-start gap-3 pt-stack first:pt-0">
                <Avatar name={a.nom} initials={a.initiales} size="sm" />
                <div className="flex flex-col gap-tight flex-1 min-w-0">
                  <p className="text-body-sm text-ink-900 m-0">
                    <span className="font-semibold">{a.nom}</span>{' '}
                    <span className="text-ink-500">{a.action}</span>{' '}
                    <span className="text-primary-700 font-medium">{a.competence}</span>
                  </p>
                  <span className="text-caption text-ink-400">{a.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
