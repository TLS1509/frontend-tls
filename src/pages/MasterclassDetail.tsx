import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, Video } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { EtapeAccordion } from '../components/patterns/EtapeAccordion';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';

// ─── Mock data ──────────────────────────────────────────────────────────────

const PROGRAMME = [
  {
    duration: '15 min',
    label: 'Introduction & contexte',
    detail: "Panorama des crises actuelles : économique, organisationnelle, humaine. Pourquoi le leadership est-il plus difficile qu'avant ?",
  },
  {
    duration: '45 min',
    label: 'Outils & méthodes',
    detail: "Trois modèles pratiques : la courbe de deuil, le leadership situationnel en mode dégradé, et les rituels de stabilisation d'équipe. Études de cas réels.",
  },
  {
    duration: '30 min',
    label: 'Q&A live',
    detail: 'Session ouverte : apporte tes cas concrets. Marie Fontaine répond en direct à tes questions sur tes situations terrain.',
  },
];

const INFOS = [
  { icon: <Calendar size={16} />, key: 'Date', value: '15 juin 2026' },
  { icon: <Clock size={16} />, key: 'Heure', value: '14h00 – 15h30' },
  { icon: <MapPin size={16} />, key: 'Format', value: 'Distanciel · Google Meet' },
  { icon: <Users size={16} />, key: 'Prérequis', value: 'Dreyfus D2+' },
];

const RELATED = [
  { id: 2, title: 'IA & Décision managériale', expert: 'Thomas Renard', status: 'À venir' },
  { id: 3, title: 'Communication non-violente', expert: 'Sarah Leloup', status: 'Replay' },
];

/* Fin de la session : passé ce moment, la masterclass est terminée et l'on ne
   s'y inscrit plus. La page affichait « S'inscrire » sur une date passée
   (audit du 23/09). À remplacer par la donnée du store quand la page y sera
   branchée. */
const FIN_SESSION = new Date('2026-06-15T15:30:00+02:00');

// ─── MasterclassDetail ───────────────────────────────────────────────────────

export default function MasterclassDetail() {
  const { id = '1' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [openProg, setOpenProg] = useState<number | null>(null);
  const estTerminee = Date.now() > FIN_SESSION.getTime();

  return (
    <PageShell width="medium" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      {/* Date, heure, durée et format sont des données : la ligne de méta de
          l'en-tête, en légende — ils étaient trois pastilles d'état en
          capitales. Seul « Terminée », un état, reste un Badge. */}
      <EditorialHero
        tone="flat"
        eyebrow="Masterclass"
        title="Leadership en temps de crise"
        summary="Découvre comment maintenir l'engagement et la performance de tes équipes dans les périodes de turbulences."
        meta={[
          ...(estTerminee ? [{ label: <Badge variant="neutral">Terminée</Badge> }] : []),
          { icon: <Calendar size={14} aria-hidden="true" />, label: '15 juin 2026 · 14h00' },
          { icon: <Clock size={14} aria-hidden="true" />, label: '90 min · Distanciel' },
        ]}
      />

      <EditorialLayout
          main={
            /* Deux sections h2 (elles étaient des h3 de 20 px dans des
               cartes), 48 px entre elles, puis l'inscription. */
            <div className="flex flex-col gap-page">
              <section className="flex flex-col gap-stack">
                <SectionHeader title="Programme" meta={`${PROGRAMME.length} temps · 90 min`} size="md" />
                <div className="flex flex-col gap-stack-xs">
                  {PROGRAMME.map((item, i) => (
                    <EtapeAccordion
                      key={item.label}
                      variant="default"
                      isOpen={openProg === i}
                      onToggle={() => setOpenProg(openProg === i ? null : i)}
                      header={
                        /* L'étape 16/600, sa durée en légende tabulaire (une
                           donnée, plus une pastille en capitales). */
                        <div className="flex items-baseline gap-stack-sm flex-1 min-w-0">
                          <span className="w-14 shrink-0 text-caption text-ink-600 tabular-nums">{item.duration}</span>
                          <span className="text-body text-ink-900 font-semibold truncate">{item.label}</span>
                        </div>
                      }
                    >
                      <div className="px-stack py-stack border-t border-ink-100">
                        <p className="text-body text-ink-700 max-w-prose">{item.detail}</p>
                      </div>
                    </EtapeAccordion>
                  ))}
                </div>
              </section>

              {/* Infos pratiques : une liste de définitions — le libellé en
                  légende 600 ink-600, la valeur en 16 ink-900 (les deux étaient
                  à 13 px, dans quatre tuiles grises). */}
              <section className="flex flex-col gap-stack">
                <SectionHeader title="Infos pratiques" size="md" />
                <Card>
                  <dl className="grid sm:grid-cols-2 gap-x-stack-lg gap-y-stack">
                    {INFOS.map((info) => (
                      <div key={info.key} className="flex items-start gap-stack-xs">
                        <span className="shrink-0 inline-flex items-center h-lh text-caption text-ink-600" aria-hidden="true">{info.icon}</span>
                        <div className="flex flex-col gap-tight min-w-0">
                          <dt className="text-caption font-semibold text-ink-600">{info.key}</dt>
                          <dd className="text-body text-ink-900">{info.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </Card>
              </section>

              {/* CTA inscription — ou, la date passée, l'état terminé. Dans
                  les deux cas, l'action principale de la page, son seul
                  `solid` (arbitrage n°19). */}
              {estTerminee ? (
                <Card variant="tinted" tone="primary" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack p-stack-lg">
                  <div className="flex flex-col gap-stack-3xs flex-1 min-w-0">
                    <p className="text-body font-semibold text-ink-900">
                      Cette masterclass est terminée
                    </p>
                    <p className="text-caption text-ink-600">Les inscriptions sont closes.</p>
                  </div>
                  <Button emphasis="solid" tone="brand" size="lg" className="shrink-0" to={`/masterclass/${id}/replay`}>
                    Voir le replay
                  </Button>
                </Card>
              ) : (
              <Card variant="tinted" tone="primary" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack p-stack-lg">
                <div className="flex flex-col gap-stack-xs flex-1 min-w-0">
                  <div className="flex flex-col gap-stack-3xs">
                    <p className="text-body font-semibold text-ink-900">
                      Inscription ouverte jusqu'au 15 juin à 15h00
                    </p>
                    <p className="text-caption text-ink-600 tabular-nums">47 / 100 places restantes</p>
                  </div>
                  <ProgressBar value={53} fill="brand" size="sm" valueLabel={false} />
                </div>
                <Button emphasis="solid" tone="brand" size="lg" className="shrink-0">
                  S'inscrire à la masterclass
                </Button>
              </Card>
              )}
            </div>
          }
          aside={
            <div className="flex flex-col gap-stack">
              {/* Expert card */}
              <SectionCard title="Experte" titleIcon={<Users size={16} />}>
                <div className="flex items-start gap-stack">
                  <Avatar name="Marie Fontaine" initials="MF" size="lg" tint="brand" />
                  <div className="flex flex-col gap-stack-3xs min-w-0">
                    <div className="flex flex-col gap-tight">
                      <p className="text-body font-semibold text-ink-900">Marie Fontaine</p>
                      <p className="text-caption text-ink-600">DRH · Groupe Vinci</p>
                    </div>
                    <p className="mt-stack-3xs text-body text-ink-700">
                      15 ans d'expérience en leadership et gestion de crise.
                    </p>
                  </div>
                </div>
              </SectionCard>

              {/* Masterclasses similaires — plus d'étincelle : elle marque une
                  fonction d'IA (DESIGN.md §10), et rien ne dit que la
                  suggestion en vienne. Titres sur deux lignes au plus, plutôt
                  que coupés à 18 caractères. */}
              <SectionCard title="Tu pourrais aussi aimer">
                <div className="flex flex-col gap-stack-xs">
                  {RELATED.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className="w-full flex items-start justify-between gap-stack-sm p-3 rounded-lg border border-ink-100 hover:bg-ink-50 transition-colors text-left cursor-pointer bg-transparent"
                      onClick={() => navigate(`/masterclass/${m.id}`)}
                    >
                      <div className="flex items-start gap-stack-xs min-w-0">
                        <span className="shrink-0 inline-flex items-center h-lh text-body text-primary-700" aria-hidden="true">
                          <Video size={16} />
                        </span>
                        <div className="flex flex-col gap-tight min-w-0">
                          <span className="text-body font-semibold text-ink-900 line-clamp-2">{m.title}</span>
                          <span className="text-caption text-ink-600">{m.expert}</span>
                        </div>
                      </div>
                      <Badge variant={m.status === 'Replay' ? 'success' : 'info'} size="compact" className="shrink-0">
                        {m.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              </SectionCard>
            </div>
          }
        />
    </PageShell>
  );
}
