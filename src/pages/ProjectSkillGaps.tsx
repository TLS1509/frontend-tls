import { AlertTriangle, BookOpen, UserCheck, Link2, BarChart2 } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import Badge from '../components/ui/Badge';
import Alert from '../components/ui/Alert';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';

const critiques = [
  { nom: 'Architecture logicielle', requis: 'D4', actuel: 'D2', gap: 2 },
  { nom: 'Sécurité des données', requis: 'D3', actuel: 'D1', gap: 2 },
  { nom: 'DevOps & CI/CD', requis: 'D3', actuel: 'D2', gap: 1 },
];

const recommandations = [
  {
    type: 'parcours' as const,
    label: 'Parcours',
    texte: 'Parcours "Architecture logicielle avancée" — niveau D3→D4 · 8h',
    icon: <BookOpen size={16} />,
  },
  {
    type: 'coach' as const,
    label: 'Coach',
    texte: 'Jean-Marc Lebrun · Expert sécurité — disponible pour coaching individuel',
    icon: <UserCheck size={16} />,
  },
  {
    type: 'ressource' as const,
    label: 'Ressource',
    texte: 'Guide pratique DevOps CI/CD · 3 modules · évaluation Dreyfus incluse',
    icon: <Link2 size={16} />,
  },
];

const toutesCompetences = [
  { nom: 'Architecture logicielle', fill: 35, statut: 'gap' as const },
  { nom: 'Sécurité des données', fill: 20, statut: 'gap' as const },
  { nom: 'DevOps & CI/CD', fill: 55, statut: 'gap' as const },
  { nom: 'Communication écrite', fill: 90, statut: 'ok' as const },
  { nom: 'Gestion de projet', fill: 75, statut: 'ok' as const },
  { nom: 'Analyse de données', fill: 78, statut: 'ok' as const },
];

const niveauVariant: Record<string, 'brand' | 'warm' | 'neutral'> = {
  D1: 'neutral',
  D2: 'neutral',
  D3: 'brand',
  D4: 'warm',
  D5: 'warm',
};

export default function ProjectSkillGaps() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Projet · Analyse"
        title="Lacunes de Compétences"
        summary="Identifiez les gaps entre les compétences requises pour le projet et les niveaux actuels de l'équipe."
        tone="default"
      />

      <div className="px-6 flex flex-col gap-section max-w-page mx-auto w-full">
        <Alert variant="warning" title="3 compétences critiques manquantes pour ce projet">
          Des gaps importants ont été détectés. Des actions correctives sont recommandées avant le lancement du projet.
        </Alert>

        {/* Gaps critiques */}
        <SectionCard
          titleIcon={<AlertTriangle size={18} className="text-warning-fg" />}
          title="Gaps critiques"
          description="Compétences dont le niveau actuel de l'équipe est inférieur au niveau requis."
        >
          <ul className="flex flex-col gap-stack divide-y divide-ink-100">
            {critiques.map((c) => (
              <li key={c.nom} className="flex flex-col gap-stack-xs pt-stack first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-body-sm font-semibold text-ink-900 flex-1">{c.nom}</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-caption text-ink-500">Requis</span>
                  <Badge variant={niveauVariant[c.requis] ?? 'brand'} size="sm">{c.requis}</Badge>
                  <span className="text-caption text-ink-500">Actuel</span>
                  <Badge variant="neutral" size="sm">{c.actuel}</Badge>
                  <Badge variant="danger" size="sm">−{c.gap} niveau{c.gap > 1 ? 'x' : ''}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Recommandations IA */}
        <SectionCard
          titleIcon={<BookOpen size={18} className="text-primary-600" />}
          title="Recommandations IA"
          description="Parcours, coaches et ressources suggérés pour combler les lacunes identifiées."
          headerAction={<AITransparencyLabel variant="recommended" size="sm" />}
        >
          <ul className="flex flex-col gap-stack">
            {recommandations.map((r, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg bg-ink-50 p-3">
                <span className="shrink-0 mt-0.5 text-primary-600">{r.icon}</span>
                <div className="flex flex-col gap-tight flex-1 min-w-0">
                  <Badge variant="brand" size="sm" className="self-start">{r.label}</Badge>
                  <p className="text-body-sm text-ink-700 m-0">{r.texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Toutes les compétences */}
        <SectionCard
          titleIcon={<BarChart2 size={18} className="text-primary-600" />}
          title="Toutes les compétences"
          description="Vue d'ensemble de la couverture des compétences requises par le projet."
        >
          <div className="grid grid-cols-1 gap-stack sm:grid-cols-2">
            {toutesCompetences.map((c) => (
              <div key={c.nom} className="flex flex-col gap-stack-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-800">{c.nom}</span>
                  <Badge variant={c.statut === 'ok' ? 'success' : 'danger'} size="sm">
                    {c.statut === 'ok' ? 'Couvert' : 'Gap'}
                  </Badge>
                </div>
                <ProgressBar value={c.fill} fill={c.statut === 'ok' ? 'success' : 'danger'} size="sm" />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
