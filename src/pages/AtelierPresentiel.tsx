import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Navigation, Copy, Info, FileText, Download, Calendar } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ResourceListItem } from '../components/learning/ResourceListItem';

// ─── Mock data ───────────────────────────────────────────────────────────────

interface InfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const INFOS_PRATIQUES: InfoItem[] = [
  { icon: <MapPin size={16} />, label: 'Accès', value: 'Métro ligne 9 : Franklin D. Roosevelt' },
  { icon: <MapPin size={16} />, label: 'Parking', value: 'Payant à 200 m : 13 av. Montaigne' },
  { icon: <Info size={16} />, label: 'Accueil', value: 'Demander Sophie Martin à l\'entrée' },
  { icon: <Info size={16} />, label: 'Code WiFi', value: 'LS_Atelier2026' },
];

interface ProgramItem {
  time: string;
  label: string;
  duration: string;
}

const PROGRAMME: ProgramItem[] = [
  { time: '09h30', label: 'Accueil café + installation', duration: '30 min' },
  { time: '10h00', label: 'Introduction + icebreaker', duration: '15 min' },
  { time: '10h15', label: 'Théorie et outils de gestion du stress', duration: '45 min' },
  { time: '11h00', label: 'Exercices pratiques en groupe', duration: '60 min' },
  { time: '12h00', label: 'Debriefing + plan d\'action', duration: '30 min' },
];

interface ResourceItem {
  label: string;
  type: string;
}

const RESSOURCES: ResourceItem[] = [
  { label: 'Support de l\'atelier', type: 'PDF' },
  { label: 'Fiche mémo stress & récupération', type: 'PDF' },
];

// ─── AtelierPresentiel ───────────────────────────────────────────────────────

export default function AtelierPresentiel() {
  const { id } = useParams<{ id: string }>();
  void id;

  return (
    <PageShell width="medium" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      {/* Ton `flat` (l'en-tête était une carte teintée). « Aujourd'hui » est
          une date : une donnée de la ligne de méta — elle était une pastille
          d'état rouge à point, le registre d'une alerte. */}
      <EditorialHero
        tone="flat"
        eyebrow="Atelier · Présentiel"
        title="Atelier Gestion du stress"
        summary="Session en présentiel avec Sophie Martin."
        meta={[
          { icon: <Calendar size={14} aria-hidden="true" />, label: "Aujourd'hui · 09h30 – 12h30" },
          { icon: <MapPin size={14} aria-hidden="true" />, label: 'Paris 8e' },
        ]}
      />

      {/* Quatre sections h2 à 48 px (elles étaient des h3 dans des cartes,
          dont un posé juste sous le h1). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Lieu" size="md" />
        {/* Anatomie de carte : le lieu (h3 20) → 8 → l'adresse (16 ink-700)
            → 16 → la carte → 24 → les actions. Tout se touchait : la carte
            déclarait `flex` et perdait son espacement. */}
        <Card className="flex flex-col gap-0">
          <h3 className="flex items-center gap-stack-xs font-display text-h3 text-ink-900">
            <MapPin size={20} className="shrink-0 text-secondary-700" aria-hidden="true" />
            The Learning Hub
          </h3>
          <address className="mt-stack-xs not-italic flex flex-col text-body text-ink-700">
            <span>45 avenue Montaigne, 75008 Paris</span>
            <span>Salle Liberté · 3e étage</span>
          </address>

          <div className="mt-stack bg-ink-100 rounded-lg h-48 flex flex-col items-center justify-center gap-stack-xs">
            <MapPin size={32} className="text-ink-400" aria-hidden="true" />
            <p className="text-caption text-ink-600">Carte interactive</p>
          </div>

          {/* Le jour d'un atelier en présentiel, s'y rendre est l'action
              principale de l'écran : « Itinéraire » est son seul `solid`
              (arbitrage n°19). Copier l'adresse est un outil (`ghost`). */}
          <div className="mt-stack-lg flex gap-stack-xs flex-wrap">
            <Button emphasis="solid" tone="brand" size="sm" leadingIcon={<Navigation size={14} />}>
              Itinéraire
            </Button>
            <Button emphasis="ghost" tone="neutral" size="sm" leadingIcon={<Copy size={14} />}>
              Copier l'adresse
            </Button>
          </div>
        </Card>
      </section>

      {/* À savoir : libellés en légende 600 ink-600, en casse normale (ils
          étaient en capitales ink-500), valeurs en 16 ink-900 ; l'icône se
          cale sur la première ligne, celle du libellé. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="À savoir avant de venir" size="md" />
        <Card>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-stack-lg gap-y-stack">
            {INFOS_PRATIQUES.map((item, idx) => (
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

      {/* Programme : l'heure en chiffres tabulaires (une pastille d'état
          avant), l'étape en 16 ink-900, la durée alignée à droite. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Programme" meta={`${PROGRAMME.length} temps · 09h30 – 12h30`} size="md" />
        <Card className="p-0">
          <ol className="flex flex-col divide-y divide-ink-100">
            {PROGRAMME.map((item, idx) => (
              <li key={idx} className="flex items-baseline gap-stack px-stack-md sm:px-stack-lg py-stack-sm">
                <span className="w-14 shrink-0 text-caption font-semibold text-ink-600 tabular-nums">{item.time}</span>
                <span className="text-body text-ink-900 flex-1">{item.label}</span>
                <span className="text-caption text-ink-600 tabular-nums text-right">{item.duration}</span>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      {/* Ressources : le type de fichier est une donnée — une légende, plus
          une pastille d'état (signalé par la passe composants). Un bouton
          icône laisse la place au nom. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Ressources" meta={`${RESSOURCES.length} documents`} size="md" />
        <div className="flex flex-col gap-stack-xs">
          {RESSOURCES.map((res, idx) => (
            <ResourceListItem
              key={idx}
              icon={<FileText size={16} />}
              label={res.label}
              badge={<span className="shrink-0 text-caption text-ink-600">{res.type}</span>}
              /* L'action de la rangée : `soft` (arbitrage n°19). */
              action={
                <Button emphasis="soft" tone="brand" iconOnly leadingIcon={<Download size={16} />} aria-label={`Télécharger ${res.label}`} />
              }
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
