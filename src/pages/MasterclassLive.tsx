import React from 'react';
import { useParams } from 'react-router-dom';
import { Video, FileText, ExternalLink, Users, Download } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';

// ─── Mock data ──────────────────────────────────────────────────────────────

const QA_QUESTIONS = [
  { id: 1, author: 'Julie M.', initials: 'JM', text: 'Comment gérer un manager qui résiste au changement en période de crise ?' },
  { id: 2, author: 'Thomas R.', initials: 'TR', text: 'Quelle est la fréquence idéale pour les points d\'équipe en situation tendue ?' },
];

const RESOURCES = [
  { id: 1, label: 'Slides : Leadership en crise', type: 'PDF' },
  { id: 2, label: 'Bibliographie recommandée', type: 'PDF' },
];

// ─── MasterclassLive ─────────────────────────────────────────────────────────

export default function MasterclassLive() {
  useParams<{ id: string }>();

  return (
    <PageShell width="page" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      {/* L'état et l'affluence sont la ligne de méta de l'en-tête. */}
      <EditorialHero
        tone="flat"
        eyebrow="Masterclass · En direct"
        title="Leadership en temps de crise"
        summary="Session en cours avec Marie Fontaine · DRH · Groupe Vinci"
        meta={[
          { label: <Badge variant="danger" size="normal" dot>En direct</Badge> },
          { icon: <Users size={14} aria-hidden="true" />, label: '127 participants' },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-page md:gap-section items-start">
          {/* Player embed : col span 2 */}
          <div className="md:col-span-2">
            <Card variant="ink" className="aspect-video flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center gap-stack text-white">
                <Video size={48} className="text-white/40" />
                <p className="text-body text-white/60">Session live · Google Meet</p>
                {/* Rejoindre : l'action principale de l'écran, son seul
                    `solid` (arbitrage n°19) — le verre clair `onDark` sur le
                    lecteur. */}
                <Button
                  emphasis="solid"
                  tone="brand"
                  onDark
                  size="lg"
                  leadingIcon={<ExternalLink size={16} />}
                >
                  Rejoindre sur Google Meet
                </Button>
              </div>
            </Card>
          </div>

          {/* La colonne du direct : le temps (un chiffre, donc une StatCard —
              son libellé était en capitales espacées au-dessus d'un chiffre en
              teal 700), puis deux sections h2 (elles étaient des h3 sans h2
              au-dessus, directement sous le h1). */}
          <div className="md:col-span-1 flex flex-col gap-section">
            <StatCard value="47:23" label="Temps écoulé · session de 90 min" variant="brand" size="sm" />

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Questions & réponses" meta={`${QA_QUESTIONS.length} questions posées`} size="md" />
              <Card className="flex flex-col gap-stack">
                {/* La question est ce qu'on lit : 16 ink-900 (elle était en
                    légende), son auteur en légende 600 au-dessus. */}
                <ul className="flex flex-col divide-y divide-ink-100">
                  {QA_QUESTIONS.map((q) => (
                    <li key={q.id} className="flex items-start gap-stack-xs py-stack-sm first:pt-0">
                      <Avatar name={q.author} initials={q.initials} size="sm" />
                      <div className="flex flex-col gap-tight min-w-0">
                        <span className="text-caption font-semibold text-ink-600">{q.author}</span>
                        <p className="text-body text-ink-900">{q.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Champ et bouton sur la même ligne, à la même hauteur (44 px,
                    arbitrage n°22) : le bouton était à 36. */}
                <div className="flex gap-stack-xs">
                  <Input
                    placeholder="Poser une question…"
                    aria-label="Poser une question"
                    className="flex-1 min-w-0"
                  />
                  <Button emphasis="soft" tone="brand">Envoyer</Button>
                </div>
              </Card>
            </section>

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Ressources" size="md" />
              {/* Le nom de la ressource sur deux lignes au plus, son format en
                  légende, et un bouton icône : « Télécharger » en toutes lettres
                  coupait le nom à 16 caractères et débordait de sa carte. */}
              <Card className="p-0">
                <ul className="flex flex-col divide-y divide-ink-100">
                  {RESOURCES.map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-stack-sm px-stack-md py-stack-sm">
                      <div className="flex items-start gap-stack-xs min-w-0">
                        <span className="shrink-0 inline-flex items-center h-lh text-body text-ink-600" aria-hidden="true">
                          <FileText size={16} />
                        </span>
                        <div className="flex flex-col gap-tight min-w-0">
                          <span className="text-body text-ink-900 line-clamp-2">{r.label}</span>
                          <span className="text-caption text-ink-600">{r.type}</span>
                        </div>
                      </div>
                      <Button emphasis="soft" tone="brand" iconOnly leadingIcon={<Download size={16} />} aria-label={`Télécharger ${r.label}`} className="shrink-0" />
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          </div>
        </div>
    </PageShell>
  );
}
