import { Users, UserCheck, TrendingUp, Mail, UserPlus } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import Button from '../components/core/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import StatCard from '../components/ui/StatCard';

const membres = [
  {
    nom: 'Marie Dupont',
    role: 'Chef de projet',
    dreyfus: 'D4',
    competences: ['Gestion de projet', 'Communication', 'Analyse'],
  },
  {
    nom: 'Thomas Roux',
    role: 'Développeur',
    dreyfus: 'D3',
    competences: ['Architecture', 'DevOps', 'Tests'],
  },
  {
    nom: 'Lucie Bernard',
    role: 'Designer UX',
    dreyfus: 'D3',
    competences: ['Recherche UX', 'Prototypage', 'Tests utilisateurs'],
  },
  {
    nom: 'Ahmed Saïd',
    role: 'Data Analyst',
    dreyfus: 'D2',
    competences: ['SQL', 'Visualisation', 'Statistiques'],
  },
  {
    nom: 'Claire Martin',
    role: 'Product Owner',
    dreyfus: 'D4',
    competences: ['Backlog', 'Roadmap', 'Stakeholders'],
  },
  {
    nom: 'Nicolas Petit',
    role: 'Dev Frontend',
    dreyfus: 'D2',
    competences: ['React', 'TypeScript', 'CSS'],
  },
];

const coaches = [
  {
    nom: 'Jean-Marc Lebrun',
    specialite: 'Architecture & Sécurité',
    bio: 'Expert technique certifié — accompagne les équipes sur les compétences système et cloud.',
  },
  {
    nom: 'Sophie Girard',
    specialite: 'Leadership & Communication',
    bio: 'Coach certifiée ICF — facilitation, gestion de conflits et intelligence émotionnelle.',
  },
];

const dreyfusVariant: Record<string, 'brand' | 'warm' | 'neutral'> = {
  D1: 'neutral',
  D2: 'neutral',
  D3: 'brand',
  D4: 'warm',
  D5: 'warm',
};

export default function ProjectTeam() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Projet · Équipe"
        title="Équipe du Projet"
        summary="Retrouvez les membres, leurs rôles, niveaux Dreyfus et compétences associées au projet."
        tone="default"
        trailing={
          <Button variant="primary" size="md" leadingIcon={<UserPlus size={16} />}>
            Inviter un membre
          </Button>
        }
      />

      <div className="px-6 flex flex-col gap-section max-w-page mx-auto w-full">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-stack sm:grid-cols-3">
          <StatCard
            label="Membres actifs"
            value="6"
            icon={<Users size={20} />}
            tone="brand"
          />
          <StatCard
            label="Coaches assignés"
            value="2"
            icon={<UserCheck size={20} />}
            tone="neutral"
          />
          <StatCard
            label="Engagement moyen"
            value="84%"
            icon={<TrendingUp size={20} />}
            tone="warm"
          />
        </div>

        {/* Membres */}
        <SectionCard
          titleIcon={<Users size={18} className="text-primary-600" />}
          title="Membres"
          description="Profil compétences de chaque membre de l'équipe."
        >
          <div className="grid grid-cols-1 gap-stack sm:grid-cols-2">
            {membres.map((m) => (
              <div
                key={m.nom}
                className="flex flex-col gap-stack-xs rounded-xl border border-ink-100 bg-ink-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={m.nom} size="md" />
                  <div className="flex flex-col gap-tight min-w-0">
                    <span className="text-body-sm font-semibold text-ink-900 truncate">{m.nom}</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="neutral" size="sm">{m.role}</Badge>
                      <Badge variant={dreyfusVariant[m.dreyfus] ?? 'brand'} size="sm">{m.dreyfus}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {m.competences.map((c) => (
                    <Badge key={c} variant="brand" size="sm">{c}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Coaches */}
        <SectionCard
          titleIcon={<UserCheck size={18} className="text-primary-600" />}
          title="Coaches"
          description="Coaches professionnels assignés pour accompagner l'équipe."
        >
          <ul className="flex flex-col gap-stack divide-y divide-ink-100">
            {coaches.map((c) => (
              <li key={c.nom} className="flex items-start justify-between gap-4 pt-stack first:pt-0">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Avatar name={c.nom} size="md" />
                  <div className="flex flex-col gap-tight flex-1 min-w-0">
                    <span className="text-body-sm font-semibold text-ink-900">{c.nom}</span>
                    <Badge variant="warm" size="sm" className="self-start">{c.specialite}</Badge>
                    <p className="text-caption text-ink-500 m-0">{c.bio}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  leadingIcon={<Mail size={14} />}
                  className="shrink-0"
                >
                  Contacter
                </Button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
