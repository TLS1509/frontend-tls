import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Settings, Video, MapPin } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { FilterChip } from '../components/ui/FilterChip';
import { Avatar } from '../components/ui/Avatar';
import { PageShell } from '../components/layout';

interface Session {
  id: string;
  apprenant: string;
  initials: string;
  day: number;
  hour: string;
  duration: string;
  mode: 'remote' | 'onsite';
}

const WEEK = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const HOURS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const SESSIONS: Session[] = [
  { id: '1', apprenant: 'Léa Martin', initials: 'LM', day: 0, hour: '09:00', duration: '45 min', mode: 'remote' },
  { id: '2', apprenant: 'Tom Bernard', initials: 'TB', day: 1, hour: '14:00', duration: '60 min', mode: 'remote' },
  { id: '3', apprenant: 'Sara Costa', initials: 'SC', day: 2, hour: '10:00', duration: '45 min', mode: 'onsite' },
  { id: '4', apprenant: 'Jules Petit', initials: 'JP', day: 3, hour: '16:00', duration: '30 min', mode: 'remote' },
  { id: '5', apprenant: 'Anna Roux', initials: 'AR', day: 4, hour: '11:00', duration: '45 min', mode: 'remote' },
];

const CoachCalendar: React.FC = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [providerFilter, setProviderFilter] = useState<'all' | 'google' | 'outlook'>('all');

  return (
    /* Deux sections à 48 px sous l'en-tête : la semaine (sa barre d'outils et
       sa grille, 16 entre elles) et les disponibilités. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Mon calendrier"
        title="Mes sessions de coaching"
        summary="Synchronisé avec Google Calendar (Outlook V1)"
        tone="flat"
        /* L'action principale de l'écran : le seul `solid` (arbitrage n°19). */
        trailing={<Button emphasis="solid" tone="warm" leadingIcon={<Plus className="w-4 h-4" />}>Nouvelle session</Button>}
      />

      <section className="flex flex-col gap-stack">
        {/* La semaine affichée est le titre de la section (h2 28) : c'était un
            `div` au pas du titre de carte (20 px), sans niveau. Tout ce qui se
            pose sur cette ligne fait 44 px — flèches, pastilles et bouton
            OAuth, qui était le seul à 36 (arbitrage n°22). Les flèches et le
            réglage sont des outils : `ghost` neutre (arbitrage n°19). */}
        <div className="flex flex-wrap items-center justify-between gap-stack">
          <div className="flex items-center gap-stack-xs">
            <Button emphasis="ghost" tone="neutral" iconOnly leadingIcon={<ChevronLeft className="w-4 h-4" />} aria-label="Semaine précédente" onClick={() => setWeekOffset((w) => w - 1)} />
            <h2 className="font-display text-h2 text-ink-900">Semaine du 11 mai 2026</h2>
            <Button emphasis="ghost" tone="neutral" iconOnly leadingIcon={<ChevronRight className="w-4 h-4" />} aria-label="Semaine suivante" onClick={() => setWeekOffset((w) => w + 1)} />
          </div>
          <div className="flex flex-wrap items-center gap-stack-xs">
            <FilterChip label="Tous" active={providerFilter === 'all'} onClick={() => setProviderFilter('all')} />
            <FilterChip label="Google" active={providerFilter === 'google'} onClick={() => setProviderFilter('google')} />
            <FilterChip label="Outlook (V1)" active={providerFilter === 'outlook'} onClick={() => setProviderFilter('outlook')} />
            <Button emphasis="ghost" tone="neutral" leadingIcon={<Settings className="w-4 h-4" />}>OAuth</Button>
          </div>
        </div>

        <Card className="p-0 overflow-x-auto">
          <div className="grid grid-cols-[80px_repeat(7,_1fr)] min-w-[800px]">
            <div className="p-3 border-b border-r border-ink-200 bg-ink-50" />
            {/* Jour 16/600, date en légende ink-600 : le jour se lit d'abord. */}
            {WEEK.map((d, i) => (
              <div key={d} className="p-3 border-b border-ink-200 text-center flex flex-col items-center gap-tight">
                <span className="text-body font-semibold text-ink-900">{d}</span>
                <span className="text-caption text-ink-600 tabular-nums">{11 + i} mai</span>
              </div>
            ))}
            {HOURS.map((h) => (
              <React.Fragment key={h}>
                {/* L'heure en chiffres tabulaires Nunito : la police mono sortait
                    du système typographique. */}
                <div className="p-stack-xs border-r border-b border-ink-200 text-caption text-ink-600 tabular-nums bg-ink-50">{h}</div>
                {WEEK.map((_, dayIdx) => {
                  const session = SESSIONS.find((s) => s.day === dayIdx && s.hour === h);
                  return (
                    <div key={dayIdx} className="p-1 border-b border-ink-200 min-h-[60px] group">
                      {session ? (
                        <div className="bg-secondary-50 border border-secondary-200 rounded p-stack-xs h-full flex flex-col gap-stack-3xs">
                          <div className="flex items-center gap-stack-xs min-w-0">
                            <Avatar initials={session.initials} size="sm" />
                            <span className="text-caption font-semibold text-ink-900 truncate">{session.apprenant}</span>
                          </div>
                          <div className="flex items-center gap-stack-3xs text-caption text-ink-600">
                            {session.mode === 'remote' ? <Video className="w-3.5 h-3.5" aria-hidden="true" /> : <MapPin className="w-3.5 h-3.5" aria-hidden="true" />}
                            <span className="tabular-nums">{session.duration}</span>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          aria-label={`Créer une session ${WEEK[dayIdx]} à ${h}`}
                          className="w-full h-full min-h-[52px] rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary-50 transition-opacity duration-fast focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        >
                          <Plus className="w-4 h-4 text-primary-500" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </section>

      {/* Des plages horaires sont des données : MetaPill, plus des pastilles
          d'état vertes en capitales. Trois pastilles n'ont pas besoin d'une
          carte autour : le titre de section suffit à les rattacher. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Disponibilités configurées"
          subtitle="Plages où les apprenants peuvent réserver."
          size="md"
        />
        <MetaPillGroup
          items={[
            { text: 'Lun-Ven · 9h-12h' },
            { text: 'Lun-Ven · 14h-17h' },
            { text: 'Mer · ½ journée bloquée', tone: 'warm' },
          ]}
        />
      </section>
    </PageShell>
  );
};

export default CoachCalendar;
