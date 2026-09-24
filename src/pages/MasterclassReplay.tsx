import React from 'react';
import { useParams } from 'react-router-dom';
import { Video, Play, FileText, Download, Award, Check } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { StatCard } from '../components/ui/StatCard';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { ResourceListItem } from '../components/learning/ResourceListItem';

// ─── Mock data ──────────────────────────────────────────────────────────────

const KEY_THEMES = ['Leadership situationnel', 'Gestion de la pression', 'Communication de crise'];

const MATERIALS = [
  { id: 1, label: 'Slides de la session', icon: <FileText size={16} /> },
  { id: 2, label: 'Bibliographie', icon: <FileText size={16} /> },
  { id: 3, label: 'Fiche pratique', icon: <FileText size={16} /> },
];

// ─── MasterclassReplay ───────────────────────────────────────────────────────

export default function MasterclassReplay() {
  useParams<{ id: string }>();

  return (
    <PageShell width="page" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      {/* « Participé » est un état (Badge) ; les XP sont une donnée : la ligne
          de méta, en légende. */}
      <EditorialHero
        tone="flat"
        eyebrow="Masterclass · Replay"
        title="Leadership en temps de crise"
        summary="Session du 15 juin 2026 · Marie Fontaine"
        meta={[
          { label: <Badge variant="success" size="normal"><Check size={12} aria-hidden="true" /> Participé</Badge> },
          { label: '+150 XP' },
        ]}
      />

      <div className="md:grid md:grid-cols-3 gap-page md:gap-section flex flex-col items-start">
          {/* Colonne principale : span 2 */}
          <div className="md:col-span-2 flex flex-col gap-page w-full min-w-0">
            <Card variant="ink" className="aspect-video flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center gap-stack text-white">
                <Video size={48} className="text-white/40" />
                <p className="text-body text-white/60">Replay · 1h 32min</p>
                {/* Regarder : l'action principale de l'écran, son seul
                    `solid` (arbitrage n°19) — le verre clair `onDark` sur le
                    lecteur. Les autres boutons de la page sont des actions de
                    bloc ou de rangée, en `soft`. */}
                <Button emphasis="solid" tone="brand" onDark size="lg" leadingIcon={<Play size={16} />}>
                  Regarder le replay
                </Button>
              </div>
            </Card>

            {/* Résumé IA : une section h2 (c'était un h3 de 20 px dans une
                carte, sous le h1) ; l'étiquette IA à sa place d'action — elle
                s'étirait en barre pleine largeur. Le résumé se lit (16 ink-900,
                largeur de lecture) ; les thèmes sont des données : MetaPill. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Résumé IA"
                size="md"
                action={<AITransparencyLabel variant="generated" size="sm" />}
              />
              <Card className="flex flex-col gap-stack">
                <p className="text-body text-ink-900 max-w-prose">
                  Marie Fontaine a présenté trois leviers essentiels pour maintenir la cohésion d'équipe en période de crise : la transparence radicale dans la communication, la délégation raisonnée pour préserver l'énergie collective, et le recadrage positif pour maintenir la motivation malgré l'incertitude.
                </p>
                <MetaPillGroup items={KEY_THEMES.map((theme) => ({ text: theme, tone: 'primary' as const }))} />
              </Card>
            </section>

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Mes notes" size="md" />
              <Card className="flex flex-col gap-stack">
                <textarea
                  aria-label="Mes notes sur la session"
                  placeholder="Ajoute tes notes sur la session…"
                  className="w-full min-h-[120px] h-auto p-3 border border-ink-400 rounded-lg text-body text-ink-900 placeholder:text-ink-500 resize-none focus:outline-none focus:border-primary-700"
                />
                <div className="flex justify-end">
                  <Button emphasis="soft" tone="brand" size="sm">Sauvegarder</Button>
                </div>
              </Card>
            </section>
          </div>

          {/* Sidebar droite : trois blocs à 32 px — le chiffre, les matériaux
              (titre à 32 au-dessus, 16 en dessous), l'enquête. */}
          <div className="md:col-span-1 flex flex-col gap-section w-full">
            {/* Le chiffre : une StatCard (il était fait main, centré, en teal 700). */}
            <StatCard icon={<Award size={20} />} value="+150 XP" label="Masterclass complétée" variant="brand" size="sm" />

            {/* Matériaux : une section h2, comme les blocs de la colonne du
                direct — à côté du lecteur, elle se lit avant le résumé. Un
                bouton icône libère la place du nom (« Slides de la … » était
                coupé par « Télécharger » en toutes lettres). */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Matériaux" meta={`${MATERIALS.length} documents`} size="md" />
              <div className="flex flex-col gap-stack-xs">
                {MATERIALS.map((m) => (
                  <ResourceListItem
                    key={m.id}
                    icon={m.icon}
                    label={m.label}
                    action={
                      <Button emphasis="soft" tone="brand" iconOnly leadingIcon={<Download size={16} />} aria-label={`Télécharger ${m.label}`} />
                    }
                  />
                ))}
              </div>
            </section>

            {/* L'enquête : titre 16/600, texte en légende ink-600 à 4 px, action
                à 16. */}
            <Card variant="tinted" tone="sun" size="sm" className="flex flex-col gap-stack">
              <div className="flex flex-col gap-stack-3xs">
                <p className="text-body font-semibold text-ink-900">Ton avis compte.</p>
                <p className="text-caption text-ink-600">Aide-nous à améliorer les prochaines sessions.</p>
              </div>
              <Button emphasis="soft" size="sm" fullWidth>
                Donner mon avis
              </Button>
            </Card>
          </div>
        </div>
    </PageShell>
  );
}
