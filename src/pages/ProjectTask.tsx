import { CalendarDays, Eye, MessageCircle, FileText, BookOpen, Package } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import Card from '../components/core/Card';
import Button from '../components/core/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import FormGroup from '../components/core/FormGroup';
import { Input } from '../components/core/Input';

const competencesRequises = [
  { nom: 'Analyse de données', actuel: 72, requis: 85 },
  { nom: 'Visualisation', actuel: 60, requis: 80 },
  { nom: 'Statistiques', actuel: 50, requis: 70 },
];

const livrables = [
  { nom: "Rapport d'analyse marché", statut: 'in-progress' as const, date: '20 mai 2026' },
  { nom: 'Dashboard de synthèse', statut: 'upcoming' as const, date: '5 juin 2026' },
];

const commentaires = [
  {
    auteur: 'Marie Dupont',
    texte: "Premier lot de données reçu. J'ai démarré l'exploration des tendances Q1-Q2 2026.",
    date: '11 mai 2026',
  },
  {
    auteur: 'Ahmed Saïd',
    texte: 'Je travaille sur la segmentation géographique. Quelques anomalies dans le dataset — je signale ça en réunion.',
    date: '12 mai 2026',
  },
];

const statutVariant: Record<string, 'success' | 'brand' | 'neutral'> = {
  completed: 'success',
  'in-progress': 'brand',
  upcoming: 'neutral',
};

const statutLabel: Record<string, string> = {
  completed: 'Livré',
  'in-progress': 'En cours',
  upcoming: 'À faire',
};

export default function ProjectTask() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Projet · Tâche"
        title="Analyse de Données Marché"
        summary="Exploration et modélisation des données de marché pour orienter la stratégie produit du trimestre."
        tone="default"
      />

      <div className="px-6 flex flex-col gap-section max-w-page mx-auto w-full">
        {/* Card header tâche */}
        <Card className="p-5 flex flex-col gap-stack">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" size="md">En cours</Badge>
            <div className="flex items-center gap-1.5 text-caption text-ink-500">
              <CalendarDays size={14} />
              <span>Début : 5 mai 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-caption text-ink-500">
              <CalendarDays size={14} />
              <span>Fin : 30 mai 2026</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-stack-xs">
            <span className="text-caption text-ink-500 font-medium">Assigné à</span>
            <div className="flex items-center gap-1.5">
              <Avatar name="Ahmed Saïd" initials="AS" size="sm" />
              <span className="text-body-sm font-semibold text-ink-800">Ahmed Saïd</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-caption text-ink-500 font-medium">Compétences requises</span>
            <Badge variant="brand" size="sm">Analyse de données</Badge>
            <Badge variant="brand" size="sm">Visualisation</Badge>
            <Badge variant="brand" size="sm">Statistiques</Badge>
          </div>
        </Card>

        {/* Description */}
        <SectionCard
          titleIcon={<FileText size={18} className="text-primary-600" />}
          title="Description"
        >
          <p className="text-body text-ink-700 m-0 leading-relaxed">
            Cette tâche consiste à explorer l'ensemble des données de marché collectées sur les marchés européens
            pour la période Q4 2025 – Q1 2026. L'objectif est d'identifier les tendances émergentes, les segments
            porteurs et les anomalies potentielles. Les résultats alimenteront directement la roadmap produit et
            les décisions d'investissement du trimestre suivant.
          </p>
        </SectionCard>

        {/* Compétences mobilisées */}
        <SectionCard
          titleIcon={<BookOpen size={18} className="text-primary-600" />}
          title="Compétences mobilisées"
          description="Comparaison entre le niveau actuel du membre assigné et le niveau requis pour la tâche."
        >
          <ul className="flex flex-col gap-stack-lg divide-y divide-ink-100">
            {competencesRequises.map((c) => (
              <li key={c.nom} className="flex flex-col gap-stack-xs pt-stack-xs first:pt-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-sm font-semibold text-ink-900">{c.nom}</span>
                  <span className="text-caption text-ink-400">{c.actuel} / {c.requis}</span>
                </div>
                <div className="flex flex-col gap-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-caption text-ink-400 w-14 shrink-0">Actuel</span>
                    <ProgressBar value={c.actuel} fill="brand" size="sm" className="flex-1" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-caption text-ink-400 w-14 shrink-0">Requis</span>
                    <ProgressBar value={c.requis} fill="danger" size="xs" className="flex-1" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Livrables */}
        <SectionCard
          titleIcon={<Package size={18} className="text-primary-600" />}
          title="Livrables"
          description="Documents et artefacts attendus pour cette tâche."
        >
          <ul className="flex flex-col gap-stack divide-y divide-ink-100">
            {livrables.map((l) => (
              <li key={l.nom} className="flex items-center justify-between gap-4 pt-stack first:pt-0">
                <div className="flex flex-col gap-tight flex-1 min-w-0">
                  <span className="text-body-sm font-semibold text-ink-900 truncate">{l.nom}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={statutVariant[l.statut]} size="sm">{statutLabel[l.statut]}</Badge>
                    <span className="text-caption text-ink-400 flex items-center gap-1">
                      <CalendarDays size={12} />
                      {l.date}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" leadingIcon={<Eye size={14} />} className="shrink-0">
                  Voir
                </Button>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Commentaires */}
        <SectionCard
          titleIcon={<MessageCircle size={18} className="text-primary-600" />}
          title="Commentaires"
          description="Échanges et mises à jour de l'équipe sur cette tâche."
        >
          <div className="flex flex-col gap-stack">
            <ul className="flex flex-col gap-stack divide-y divide-ink-100">
              {commentaires.map((c, i) => (
                <li key={i} className="flex items-start gap-3 pt-stack first:pt-0">
                  <Avatar name={c.auteur} size="sm" />
                  <div className="flex flex-col gap-tight flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-body-sm font-semibold text-ink-900">{c.auteur}</span>
                      <span className="text-caption text-ink-400">{c.date}</span>
                    </div>
                    <p className="text-body-sm text-ink-700 m-0">{c.texte}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-stack-xs border-t border-ink-100 pt-stack">
              <FormGroup label="Ajouter un commentaire">
                <Input
                  as="textarea"
                  rows={3}
                  placeholder="Partagez une mise à jour ou une question…"
                />
              </FormGroup>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" leadingIcon={<MessageCircle size={14} />}>
                  Commenter
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
