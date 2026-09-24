import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Play,
  Award,
  Video,
  Download,
  ExternalLink,
  Check,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { PageShell } from '../components/layout';

// ─── Mock data ───────────────────────────────────────────────────────────────

const EVENT = {
  title: 'Conférence TLS 2026',
  date: '20 juin 2026',
  participants: 342,
  xp: 80,
  replayDuration: '2h 47min',
};

const KEY_POINTS = [
  {
    id: '1',
    text: "L'IA générative réduit de 40% le temps de création de contenu pédagogique, mais nécessite un cadrage éditorial solide pour maintenir la qualité.",
  },
  {
    id: '2',
    text: "Les managers qui pratiquent le feedback structuré voient une amélioration de 28% de l'engagement de leurs équipes (étude TLS 2025).",
  },
  {
    id: '3',
    text: "Les formations hybrides combinant micro-apprentissage et practice sociale ont un taux de complétion 3x supérieur aux formats e-learning classiques.",
  },
];

const PARALLEL_SESSIONS = [
  { id: '1', title: 'Workshop : Design de parcours IA-first', duration: '55 min' },
  { id: '2', title: 'Atelier : Feedback Culture en pratique', duration: '50 min' },
  { id: '3', title: "Conférence : L'avenir des certifications", duration: '45 min' },
];

const RESOURCES = [
  { type: 'download', title: 'Slides : Keynote ouverture.pdf', size: '3.2 MB' },
  { type: 'download', title: 'Guide complet IA & Learning 2026.pdf', size: '2.1 MB' },
  { type: 'download', title: 'Synthèse des ateliers.pdf', size: '0.9 MB' },
  { type: 'download', title: 'Bibliographie & ressources.pdf', size: '0.4 MB' },
  { type: 'link', title: 'Replay complet sur YouTube', url: '#' },
];

export default function EvenementRecap() {
  useParams<{ id: string }>();

  return (
    /* PageShell (la page avait sa propre enveloppe plus un `Container` : deux
       bords gauches). « Participé » est un état (Badge) ; les XP, une donnée
       de la ligne de méta. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        tone="flat"
        eyebrow={{ label: 'Événement · Récapitulatif' }}
        title={EVENT.title}
        summary={`Session du ${EVENT.date} · ${EVENT.participants} participants`}
        meta={[
          { label: <Badge variant="success"><Check size={12} aria-hidden="true" /> Participé</Badge> },
          { label: `+${EVENT.xp} XP` },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-page md:gap-section items-start">
        {/* Colonne principale : col span 2 */}
        <div className="md:col-span-2 flex flex-col gap-page min-w-0">
          {/* Le replay : l'action principale du récapitulatif, son seul
              `solid` (arbitrage n°19) — le verre clair `onDark` sur le
              lecteur. Les actions des rangées (Voir, Télécharger, Ouvrir)
              sont en `soft`. */}
          <Card variant="ink" className="aspect-video flex items-center justify-center overflow-hidden">
            <Button
              emphasis="solid"
              tone="brand"
              onDark
              size="lg"
              leadingIcon={<Play size={18} />}
            >
              Voir le replay ({EVENT.replayDuration})
            </Button>
          </Card>

          {/* Points clés : une section h2, l'étiquette IA à sa place d'action ;
              le numéro se cale sur la première ligne (il était une pastille
              d'état), le texte se lit en 16 ink-900. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader
              title="Points clés"
              size="md"
              action={<AITransparencyLabel variant="generated" size="sm" />}
            />
            <Card>
              <ol className="flex flex-col divide-y divide-ink-100">
                {KEY_POINTS.map((point) => (
                  <li key={point.id} className="flex items-start gap-stack-sm py-stack-sm first:pt-0 last:pb-0">
                    <span className="shrink-0 inline-flex items-center h-lh text-body">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-pill bg-primary-50 text-primary-800 text-caption font-bold tabular-nums">
                        {point.id}
                      </span>
                    </span>
                    <p className="text-body text-ink-900 flex-1 max-w-prose">{point.text}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </section>

          {/* Sessions à revoir : des rangées dans UNE carte (arbitrage n°5),
              plus trois cartes dans une carte. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Sessions à revoir" meta={`${PARALLEL_SESSIONS.length} sessions parallèles en replay`} size="md" />
            <Card className="p-0">
              <ul className="flex flex-col divide-y divide-ink-100">
                {PARALLEL_SESSIONS.map((session) => (
                  <li key={session.id} className="flex items-center gap-stack px-stack-md sm:px-stack-lg py-stack-sm">
                    <div className="flex flex-col gap-tight flex-1 min-w-0">
                      <p className="text-body font-semibold text-ink-900">{session.title}</p>
                      <p className="text-caption text-ink-600 tabular-nums">{session.duration}</p>
                    </div>
                    <Button emphasis="soft" tone="brand" size="sm" className="shrink-0" leadingIcon={<Video size={14} />}>
                      Voir
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        </div>

        {/* Colonne latérale : les chiffres (des StatCard côte à côte — elles
            étaient enfermées dans une carte, dépouillées de leur cadre), les
            ressources (section h2), l'enquête. */}
        <div className="md:col-span-1 flex flex-col gap-section">
          <div className="grid grid-cols-2 gap-stack-sm">
            <StatCard icon={<Award size={18} />} value={`+${EVENT.xp} XP`} label="Événement complété" variant="brand" size="sm" className="col-span-2" />
            <StatCard value={EVENT.participants} label="Participants" size="sm" />
            <StatCard value={47} label="Questions posées" size="sm" />
          </div>

          {/* Ressources : nom en 16 ink-900 sur deux lignes au plus (coupé à
              une avant), taille en légende tabulaire, boutons icône du système
              (l'icône était glissée en enfant d'un bouton texte). */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Ressources" meta={`${RESOURCES.length} ressources`} size="md" />
            <Card className="p-0">
              <ul className="flex flex-col divide-y divide-ink-100">
                {RESOURCES.map((res, idx) => (
                  <li key={idx} className="flex items-center gap-stack-sm px-stack-md py-stack-sm">
                    <div className="flex flex-col gap-tight flex-1 min-w-0">
                      <span className="text-body text-ink-900 line-clamp-2">{res.title}</span>
                      <span className="text-caption text-ink-600 tabular-nums">
                        {res.type === 'download' && res.size ? `PDF · ${res.size.replace('.', ',')}` : 'Lien externe'}
                      </span>
                    </div>
                    <Button
                      emphasis="soft"
                      tone="brand"
                      iconOnly
                      className="shrink-0"
                      aria-label={res.type === 'download' ? `Télécharger ${res.title}` : `Ouvrir ${res.title}`}
                      leadingIcon={res.type === 'download' ? <Download size={16} /> : <ExternalLink size={16} />}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* L'enquête : titre 16/600, texte en légende ink-600 à 4 px,
              action à 16. */}
          <Card variant="tinted" tone="sun" size="sm" className="flex flex-col gap-stack">
            <div className="flex flex-col gap-stack-3xs">
              <p className="text-body font-semibold text-ink-900">
                Votre avis compte
              </p>
              <p className="text-caption text-ink-600">
                Partagez votre retour d'expérience pour améliorer les prochains événements.
              </p>
            </div>
            <Button emphasis="soft" size="sm" className="w-full">
              Donner mon avis
            </Button>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
