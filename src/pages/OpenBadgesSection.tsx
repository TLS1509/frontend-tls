import React from 'react';
import { Share2, Eye, Award, ExternalLink } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Container } from '../components/layout';

const MOCK_BADGES = [
  {
    id: 1,
    name: 'Leadership Fondamentaux',
    issuer: 'The Learning Society',
    date: '12 mars 2026',
    level: 'Niveau 3',
    levelVariant: 'success' as const,
    gradientFrom: 'from-accent-400',
    gradientTo: 'to-secondary-500',
  },
  {
    id: 2,
    name: 'Communication Assertive',
    issuer: 'The Learning Society',
    date: '28 fév. 2026',
    level: 'Niveau 2',
    levelVariant: 'info' as const,
    gradientFrom: 'from-primary-400',
    gradientTo: 'to-primary-700',
  },
  {
    id: 3,
    name: 'Gestion du Temps',
    issuer: 'The Learning Society',
    date: '10 fév. 2026',
    level: 'Niveau 2',
    levelVariant: 'info' as const,
    gradientFrom: 'from-secondary-500',
    gradientTo: 'to-accent-400',
  },
  {
    id: 4,
    name: 'Intelligence Émotionnelle',
    issuer: 'The Learning Society',
    date: '3 janv. 2026',
    level: 'Niveau 3',
    levelVariant: 'success' as const,
    gradientFrom: 'from-accent-400',
    gradientTo: 'to-primary-500',
  },
  {
    id: 5,
    name: 'Prise de Décision',
    issuer: 'The Learning Society',
    date: '18 déc. 2025',
    level: 'Niveau 1',
    levelVariant: 'neutral' as const,
    gradientFrom: 'from-primary-500',
    gradientTo: 'to-primary-800',
  },
  {
    id: 6,
    name: 'Travail en Équipe',
    issuer: 'The Learning Society',
    date: '5 déc. 2025',
    level: 'Niveau 2',
    levelVariant: 'info' as const,
    gradientFrom: 'from-secondary-500',
    gradientTo: 'to-secondary-600',
  },
  {
    id: 7,
    name: 'Pensée Critique',
    issuer: 'The Learning Society',
    date: '20 nov. 2025',
    level: 'Niveau 1',
    levelVariant: 'neutral' as const,
    gradientFrom: 'from-accent-400',
    gradientTo: 'to-accent-500',
  },
  {
    id: 8,
    name: 'Créativité & Innovation',
    issuer: 'The Learning Society',
    date: '8 nov. 2025',
    level: 'Niveau 2',
    levelVariant: 'info' as const,
    gradientFrom: 'from-primary-400',
    gradientTo: 'to-secondary-500',
  },
];

export default function OpenBadgesSection() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ label: 'Profil · Badges', icon: <Award size={14} /> }}
        title="Mes Open Badges"
        summary="Vos certifications numériques vérifiables selon la norme Open Badges. Partagez vos badges sur LinkedIn ou exportez-les."
        tone="sun"
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">
        {/* Badge grid */}
        <section className="flex flex-col gap-stack">
          <div className="flex items-baseline justify-between gap-stack-xs flex-wrap">
            <h2 className="font-display text-h3 font-bold text-ink-900 m-0">Mes certifications</h2>
            <p className="m-0 font-body text-body-sm text-ink-500 shrink-0">8 obtenus · 3 partagés · 2 en cours</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack">
            {MOCK_BADGES.map((badge) => (
              <Card
                key={badge.id}
                className="p-5 flex flex-col gap-stack-xs"
              >
                {/* Badge icon area */}
                <div className="flex justify-center">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${badge.gradientFrom} ${badge.gradientTo} flex items-center justify-center`}
                  >
                    <Award size={28} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Badge info */}
                <div className="flex flex-col gap-tight text-center">
                  <p className="m-0 font-semibold text-body-sm text-ink-900 leading-tight">{badge.name}</p>
                  <p className="m-0 text-caption text-ink-500">{badge.issuer}</p>
                  <p className="m-0 text-caption text-ink-400">{badge.date}</p>
                </div>

                {/* Level badge */}
                <div className="flex justify-center">
                  <Badge variant={badge.levelVariant}>{badge.level}</Badge>
                </div>

                {/* Action buttons */}
                <div className="flex gap-stack-xs justify-center pt-1">
                  <Button variant="ghost" size="sm" leadingIcon={<Eye size={13} />}>
                    Voir
                  </Button>
                  <Button variant="ghost" size="sm" leadingIcon={<Share2 size={13} />}>
                    Partager
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Connect wallet section */}
        <SectionCard
          title="Connecter un wallet Open Badges"
          titleIcon={<ExternalLink size={18} className="text-primary-500" />}
          description="Importez des badges depuis des plateformes externes compatibles Open Badges. Vos certifications Credly, Badgr ou IMS Global seront consolidées dans votre profil."
          actions={
            <Button variant="secondary">
              Connecter un wallet
            </Button>
          }
        >
          <div className="flex flex-col gap-stack-xs">
            <div className="flex items-center gap-stack-xs p-3 rounded-lg bg-ink-50 border border-ink-100">
              <div className="w-8 h-8 rounded-md bg-primary-100 flex items-center justify-center shrink-0">
                <Award size={16} className="text-primary-600" />
              </div>
              <div className="flex flex-col gap-tight min-w-0">
                <p className="m-0 text-body-sm font-semibold text-ink-900">Credly</p>
                <p className="m-0 text-caption text-ink-500">Plateforme leader pour les badges professionnels et certifications IT</p>
              </div>
            </div>
            <div className="flex items-center gap-stack-xs p-3 rounded-lg bg-ink-50 border border-ink-100">
              <div className="w-8 h-8 rounded-md bg-secondary-50 flex items-center justify-center shrink-0">
                <Award size={16} className="text-secondary-600" />
              </div>
              <div className="flex flex-col gap-tight min-w-0">
                <p className="m-0 text-body-sm font-semibold text-ink-900">Badgr</p>
                <p className="m-0 text-caption text-ink-500">Solution open-source pour la gestion de badges numériques</p>
              </div>
            </div>
            <div className="flex items-center gap-stack-xs p-3 rounded-lg bg-ink-50 border border-ink-100">
              <div className="w-8 h-8 rounded-md bg-accent-50 flex items-center justify-center shrink-0">
                <Award size={16} className="text-accent-500" />
              </div>
              <div className="flex flex-col gap-tight min-w-0">
                <p className="m-0 text-body-sm font-semibold text-ink-900">IMS Global</p>
                <p className="m-0 text-caption text-ink-500">Standard international Open Badges 3.0 : compatible avec tous les émetteurs certifiés</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </Container>
    </div>
  );
}
