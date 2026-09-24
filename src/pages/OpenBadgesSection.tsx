import React from 'react';
import { Share2, Eye, Award } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { IconChip } from '../components/ui/IconChip';
import { MetaPill } from '../components/ui/MetaPill';
import { PageShell } from '../components/layout';

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
    /* Un seul conteneur pour l'en-tête et le corps (deux bords gauches, et
       un en-tête collé au haut de l'écran). Mots et ordre des blocs
       inchangés : seuls la typographie et le rythme bougent. */
    <PageShell width="wide">
      <EditorialHero
        eyebrow={{ label: 'Profil · Badges', icon: <Award size={14} /> }}
        title="Mes Open Badges"
        summary="Vos certifications numériques vérifiables selon la norme Open Badges. Partagez vos badges sur LinkedIn ou exportez-les."
        tone="flat"
      />

      {/* Badge grid — titre de section à 28 (il était un h2 à 20) ; le
          compte en méta, plus en corps ink-500. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Mes certifications" meta="8 obtenus · 3 partagés · 2 en cours" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack">
          {MOCK_BADGES.map((badge) => (
            <Card
              key={badge.id}
              className="p-stack-md flex flex-col gap-stack-xs"
            >
              {/* Badge icon area */}
              <div className="flex justify-center">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${badge.gradientFrom} ${badge.gradientTo} flex items-center justify-center`}
                >
                  <Award size={28} className="text-white" strokeWidth={1.5} />
                </div>
              </div>

              {/* Badge info — nom → émetteur → date à 4 ; émetteur et date sont
                  des méta (ink-600). */}
              <div className="flex flex-col gap-stack-3xs text-center">
                <p className="font-semibold text-body text-ink-900">{badge.name}</p>
                <p className="text-caption text-ink-600">{badge.issuer}</p>
                <p className="text-caption text-ink-600">{badge.date}</p>
              </div>

              {/* Le niveau est une donnée : MetaPill (arbitrages n°14-15). */}
              <div className="flex justify-center">
                <MetaPill text={badge.level} tone={badge.levelVariant} />
              </div>

              {/* Action buttons — à 20 du contenu (anatomie dense). */}
              <div className="flex gap-stack-xs justify-center mt-stack-sm">
                <Button emphasis="outline" size="sm" leadingIcon={<Eye size={14} />}>
                  Voir
                </Button>
                <Button emphasis="outline" size="sm" leadingIcon={<Share2 size={14} />}>
                  Partager
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Connect wallet section — titre et explication sur la page, les trois
          plateformes en rangées dans une carte (elles étaient trois boîtes
          dans une carte), l'action à la suite. Chaque plateforme : son nom,
          puis sa description en corps ink-700 (elle était en légende ink-500) ;
          la pastille se cale sur la première ligne. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Connecter un wallet Open Badges"
          subtitle="Importez des badges depuis des plateformes externes compatibles Open Badges. Vos certifications Credly, Badgr ou IMS Global seront consolidées dans votre profil."
        />
        <Card className="p-0 overflow-hidden">
          <ul className="divide-y divide-ink-100">
            {([
              { name: 'Credly', tone: 'brand', desc: 'Plateforme leader pour les badges professionnels et certifications IT' },
              { name: 'Badgr', tone: 'warm', desc: 'Solution open-source pour la gestion de badges numériques' },
              { name: 'IMS Global', tone: 'sun', desc: 'Standard international Open Badges 3.0 : compatible avec tous les émetteurs certifiés' },
            ] as const).map((w) => (
              <li key={w.name} className="flex items-start gap-stack-sm px-stack-lg py-stack">
                <IconChip size="sm" tone={w.tone}>
                  <Award />
                </IconChip>
                <div className="flex flex-col gap-stack-3xs min-w-0 mt-[3px]">
                  <p className="text-body font-semibold text-ink-900">{w.name}</p>
                  <p className="text-body text-ink-700 max-w-prose">{w.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Button emphasis="soft" tone="warm" className="self-start mt-stack-xs">
          Connecter un wallet
        </Button>
      </section>
    </PageShell>
  );
}
