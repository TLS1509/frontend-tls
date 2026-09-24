import React from 'react';
import { useParams } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Clock,
  Video,
  Globe,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';

// ─── Mock data ───────────────────────────────────────────────────────────────

const EVENT = {
  id: '1',
  title: "Conférence TLS 2026 : L'Avenir du Learning",
  subtitle: "Keynotes, tables rondes et networking autour de l'avenir de la formation professionnelle.",
  date: '20 juin 2026',
  time: '14h00',
  duration: '3h',
  mode: 'Distanciel',
  price: 'Gratuit',
  capacity: 400,
  registered: 342,
  language: 'Français',
  access: 'Lien Zoom envoyé 24h avant',
  organizer: {
    name: 'The Learning Society',
    initials: 'TLS',
    role: 'Organisateur officiel',
    description: 'La plateforme de référence pour la montée en compétences des managers.',
  },
};

const PROGRAMME = [
  { time: '14h00', title: 'Keynote ouverture', speaker: 'Dr. Laura Martin, CEO TLS' },
  { time: '14h45', title: 'Panel "IA & Learning"', speaker: 'Modéré par Jean Dubois' },
  { time: '15h30', title: 'Workshop au choix (3 sessions parallèles)', speaker: 'Intervenants experts' },
  { time: '16h30', title: 'Networking & clôture', speaker: 'Tous les intervenants' },
];

const SPEAKERS = [
  { name: 'Dr. Laura Martin', title: 'CEO & Fondatrice', company: 'The Learning Society' },
  { name: 'Jean Dubois', title: 'Directeur L&D', company: 'Groupe Renault' },
  { name: 'Amina Khoury', title: 'Future of Work Lead', company: 'Meta EMEA' },
];

const INFO_GRID = [
  { icon: <Calendar size={16} />, label: 'Date', value: '20 juin 2026' },
  { icon: <Clock size={16} />, label: 'Heure', value: '14h00 – 17h00' },
  { icon: <Clock size={16} />, label: 'Durée', value: '3 heures' },
  { icon: <Video size={16} />, label: 'Format', value: 'Distanciel (Zoom)' },
  { icon: <Globe size={16} />, label: 'Accès', value: 'Lien envoyé 24h avant' },
  { icon: <MapPin size={16} />, label: 'Langue', value: 'Français' },
];

/* Fin de l'événement : passé ce moment, il est terminé et l'on ne s'y inscrit
   plus. La page proposait « S'inscrire gratuitement » sur une date passée
   (audit du 23/09). À remplacer par la donnée du store quand la page y sera
   branchée. */
const FIN_EVENEMENT = new Date('2026-06-20T17:00:00+02:00');

export default function EvenementDetail() {
  const { id = EVENT.id } = useParams<{ id: string }>();
  const estTermine = Date.now() > FIN_EVENEMENT.getTime();

  const pct = Math.round((EVENT.registered / EVENT.capacity) * 100);

  return (
    <PageShell width="medium" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      {/* Date, heure, mode, durée et prix sont des données : la ligne de méta,
          en légende — ils étaient quatre pastilles d'état en grand format.
          « Terminé » reste un Badge. */}
      <EditorialHero
        tone="flat"
        eyebrow={{ label: 'Événements' }}
        title={EVENT.title}
        summary={EVENT.subtitle}
        meta={[
          ...(estTermine ? [{ label: <Badge variant="neutral" size="normal">Terminé</Badge> }] : []),
          { icon: <Calendar size={14} aria-hidden="true" />, label: `${EVENT.date} · ${EVENT.time}` },
          { icon: <Video size={14} aria-hidden="true" />, label: `${EVENT.mode} · ${EVENT.duration}` },
          { label: EVENT.price },
        ]}
      />

      {/* Quatre sections h2 à 48 px (l'organisateur était un h3 posé sous le
          h1, les autres des h3 dans des cartes). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Organisateur" size="md" />
        <Card variant="tinted" tone="sun" className="flex items-start gap-stack">
          <Avatar name={EVENT.organizer.name} initials={EVENT.organizer.initials} size="lg" />
          <div className="flex flex-col gap-stack-xs min-w-0">
            <div className="flex flex-col gap-tight">
              <p className="text-body font-semibold text-ink-900">{EVENT.organizer.name}</p>
              <p className="text-caption text-ink-600">{EVENT.organizer.role}</p>
            </div>
            <p className="text-body text-ink-700 max-w-prose">{EVENT.organizer.description}</p>
          </div>
        </Card>
      </section>

      {/* Programme : l'heure en légende 600 tabulaire — elle était en police
          mono teal 700, hors du système typographique. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Programme" meta={`${PROGRAMME.length} temps · 14h00 – 17h00`} size="md" />
        <Card className="p-0">
          <ol className="flex flex-col divide-y divide-ink-100">
            {PROGRAMME.map((item, idx) => (
              <li key={idx} className="flex gap-stack items-baseline px-stack-md sm:px-stack-lg py-stack-sm">
                <span className="w-14 shrink-0 text-caption font-semibold text-ink-600 tabular-nums">
                  {item.time}
                </span>
                <div className="flex flex-col gap-tight min-w-0">
                  <p className="text-body font-semibold text-ink-900">{item.title}</p>
                  <p className="text-caption text-ink-600">{item.speaker}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      {/* Informations pratiques : libellés en légende 600 ink-600, en casse
          normale — ils étaient au pas des étiquettes (11 px capitales) ;
          icône calée sur la ligne du libellé ; une colonne à 375 px. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Informations pratiques" size="md" />
        <Card>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-stack-lg gap-y-stack">
            {INFO_GRID.map((item, idx) => (
              <div key={idx} className="flex items-start gap-stack-xs">
                <span className="shrink-0 inline-flex items-center h-lh text-caption text-ink-600" aria-hidden="true">{item.icon}</span>
                <div className="flex flex-col gap-tight min-w-0">
                  <dt className="text-caption font-semibold text-ink-600">{item.label}</dt>
                  <dd className="text-body text-ink-900">{item.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Card>
      </section>

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Intervenants" meta={`${SPEAKERS.length} intervenants`} size="md" />
        <Card className="p-0">
          <ul className="flex flex-col divide-y divide-ink-100">
            {SPEAKERS.map((sp, idx) => (
              <li key={idx} className="flex items-center gap-stack-sm px-stack-md sm:px-stack-lg py-stack-sm">
                <Avatar name={sp.name} size="md" />
                <div className="flex flex-col gap-tight min-w-0">
                  <p className="text-body font-semibold text-ink-900">{sp.name}</p>
                  <p className="text-caption text-ink-600">{sp.title} · {sp.company}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Inscription — ou, la date passée, l'état terminé. Les inscrits sont
          une donnée (légende 600, chiffres tabulaires), plus une pastille. */}
      {estTermine ? (
        <Card variant="default" className="p-stack-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
          <div className="flex flex-col gap-stack-3xs flex-1">
            <p className="text-body font-semibold text-ink-900">Cet événement est terminé</p>
            <p className="text-caption text-ink-600">Les inscriptions sont closes.</p>
          </div>
          <Button emphasis="soft" size="lg" className="shrink-0" to={`/evenements/${id}/recap`}>
            Voir le récapitulatif
          </Button>
        </Card>
      ) : (
      <Card variant="default" className="p-stack-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
        <div className="flex flex-col gap-stack-xs flex-1">
          <p className="text-body font-semibold text-ink-900 tabular-nums">{EVENT.registered} / {EVENT.capacity} inscrits</p>
          <ProgressBar
            value={pct}
            fill="brand"
            size="sm"
            valueLabel={false}
            className="max-w-xs"
          />
          <p className="text-caption text-ink-600">
            Inscription gratuite · Lien de connexion envoyé 24h avant
          </p>
        </div>
        <div className="flex flex-col gap-stack-xs items-end shrink-0">
          <Button emphasis="soft" size="lg">
            S'inscrire gratuitement
          </Button>
          <p className="text-caption text-ink-600">Annulation possible jusqu'à J-1</p>
        </div>
      </Card>
      )}
    </PageShell>
  );
}
