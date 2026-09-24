import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Video,
  ExternalLink,
  Download,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';
import { PageShell } from '../components/layout';

// ─── Mock data ───────────────────────────────────────────────────────────────

const EVENT = {
  title: 'Conférence TLS 2026',
  participants: 342,
};

const PROGRAMME_ITEMS = [
  { time: '14h00', title: 'Keynote ouverture', status: 'done' },
  { time: '14h45', title: 'Panel "IA & Learning"', status: 'live' },
  { time: '15h30', title: 'Workshop au choix', status: 'upcoming' },
  { time: '16h30', title: 'Networking & clôture', status: 'upcoming' },
];

const QUESTIONS = [
  { id: '1', author: 'Marie L.', text: "Comment intégrer l'IA dans un programme de formation existant sans tout refaire ?", votes: 24 },
  { id: '2', author: 'Thomas B.', text: "Quels outils recommandez-vous pour mesurer l'impact d'un programme L&D ?", votes: 18 },
  { id: '3', author: 'Amina K.', text: "Y a-t-il des études de cas sur l'adoption de l'IA dans les grandes entreprises françaises ?", votes: 12 },
  { id: '4', author: 'Lucas M.', text: 'Comment gérer la résistance au changement lors de la mise en place de nouvelles formations ?', votes: 7 },
];

const RESOURCES = [
  { type: 'download', title: 'Support keynote ouverture.pdf', size: '2.4 MB' },
  { type: 'download', title: 'Guide IA & Learning 2026.pdf', size: '1.1 MB' },
  { type: 'link', title: 'Ressources supplémentaires (Notion)', url: '#' },
];

const PROGRAMME_BADGE: Record<string, React.ReactNode> = {
  done:     <Badge variant="neutral">Terminé</Badge>,
  live:     <Badge variant="danger" dot>En cours</Badge>,
  upcoming: <Badge variant="info">À venir</Badge>,
};

export default function EvenementLive() {
  useParams<{ id: string }>();
  const [question, setQuestion] = useState('');

  return (
    /* PageShell : la page avait sa propre enveloppe (`px-stack py-stack-lg`)
       plus un `Container`, soit deux bords gauches et un surtitre à 24 px du
       haut. L'état est la ligne de méta ; l'affluence reste dans le chapô (la
       pastille « 342 participants » la répétait). */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        tone="flat"
        eyebrow={{ label: 'Événement · En direct' }}
        title={EVENT.title}
        summary={`En cours · ${EVENT.participants} participants connectés`}
        meta={[{ label: <Badge variant="danger" dot>En direct</Badge> }]}
      />

      <div className="grid md:grid-cols-3 gap-page md:gap-section items-start">
        {/* Player : col span 2 */}
        <div className="md:col-span-2 flex flex-col gap-page min-w-0">
          <Card variant="ink" className="aspect-video flex items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center gap-stack">
              <Video size={48} className="text-white/40" />
              <p className="text-caption text-white/50">Diffusion live</p>
              <Button
                emphasis="soft"
                size="lg"
                leadingIcon={<ExternalLink size={16} />}
              >
                Rejoindre le live
              </Button>
            </div>
          </Card>

          {/* Questions au panel : une section h2 (un h3 de 20 px dans une carte
              avant). La question se lit à 16 ink-900 (13 avant) ; les votes
              sont une donnée — une légende tabulaire, plus une pastille. Champ
              et bouton à la même hauteur, 44 px. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Questions au panel" meta={`${QUESTIONS.length} questions, les plus votées d'abord`} size="md" />
            <Card className="flex flex-col gap-stack">
              <ul className="flex flex-col divide-y divide-ink-100">
                {QUESTIONS.map((q) => (
                  <li key={q.id} className="flex items-start gap-stack-xs py-stack-sm first:pt-0">
                    <Avatar name={q.author} size="sm" />
                    <div className="flex flex-col gap-tight flex-1 min-w-0">
                      <p className="text-caption font-semibold text-ink-600">{q.author}</p>
                      <p className="text-body text-ink-900">{q.text}</p>
                    </div>
                    <span className="shrink-0 text-caption font-semibold text-ink-700 tabular-nums" aria-label={`${q.votes} votes`}>↑ {q.votes}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-stack-xs pt-stack-sm border-t border-ink-100">
                <Input
                  placeholder="Poser une question au panel…"
                  aria-label="Poser une question au panel"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1 min-w-0"
                />
                <Button emphasis="soft">
                  Envoyer
                </Button>
              </div>
            </Card>
          </section>
        </div>

        {/* Colonne latérale, lue à côté du lecteur : trois blocs, dont deux
            sections h2. */}
        <div className="md:col-span-1 flex flex-col gap-section">
          {/* Le chiffre des participants : une StatCard (il était fait main, en
              or 700 centré). */}
          <StatCard value={EVENT.participants} label="Participants en direct" variant="sun" size="sm" />

          {/* Programme : l'heure en légende 600 tabulaire (police mono ink-500
              avant), l'étape en 16 ink-900, l'état en Badge. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Programme" size="md" />
            <Card className="p-0">
              <ol className="flex flex-col divide-y divide-ink-100">
                {PROGRAMME_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-stack-xs px-stack-md py-stack-sm">
                    <span className="w-12 shrink-0 inline-flex items-center h-lh text-caption font-semibold text-ink-600 tabular-nums">
                      {item.time}
                    </span>
                    <span className="text-body text-ink-900 flex-1 min-w-0">{item.title}</span>
                    <span className="shrink-0 inline-flex items-center h-lh">{PROGRAMME_BADGE[item.status]}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </section>

          {/* Ressources : le nom en 16 ink-900 sur deux lignes au plus (il était
              coupé à une), la taille en légende tabulaire (11 px avant). */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Ressources" size="md" />
            <Card className="p-0">
              <ul className="flex flex-col divide-y divide-ink-100">
                {RESOURCES.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-stack-xs px-stack-md py-stack-sm">
                    <span className="shrink-0 inline-flex items-center h-lh text-body text-ink-600" aria-hidden="true">
                      {res.type === 'download' ? <Download size={16} /> : <ExternalLink size={16} />}
                    </span>
                    <div className="flex flex-col gap-tight flex-1 min-w-0">
                      <span className="text-body text-ink-900 line-clamp-2">{res.title}</span>
                      {res.type === 'download' && res.size && (
                        <span className="text-caption text-ink-600 tabular-nums">{res.size.replace('.', ',')}</span>
                      )}
                    </div>
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
