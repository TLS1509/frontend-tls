import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Settings, Video, MapPin } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { Avatar } from '../components/ui/Avatar';
import { Container } from '../components/layout';

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
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Coach · Mon calendrier"
        title="Mes sessions de coaching"
        summary="Synchronisé avec Google Calendar (Outlook V1)"
        tone="warm"
        trailing={<Button variant="warm" leadingIcon={<Plus className="w-4 h-4" />}>Nouvelle session</Button>}
      />

      <Container width="wide" padding={false} className="px-4 py-section flex flex-col gap-section">
        <div className="flex flex-wrap items-center justify-between gap-stack">
          <div className="flex items-center gap-stack-xs">
            <Button variant="ghost" iconOnly leadingIcon={<ChevronLeft className="w-4 h-4" />} aria-label="Semaine précédente" onClick={() => setWeekOffset((w) => w - 1)} />
            <div className="text-h4 font-semibold">Semaine du 11 mai 2026</div>
            <Button variant="ghost" iconOnly leadingIcon={<ChevronRight className="w-4 h-4" />} aria-label="Semaine suivante" onClick={() => setWeekOffset((w) => w + 1)} />
          </div>
          <div className="flex items-center gap-stack-xs">
            <FilterChip label="Tous" active={providerFilter === 'all'} onClick={() => setProviderFilter('all')} />
            <FilterChip label="Google" active={providerFilter === 'google'} onClick={() => setProviderFilter('google')} />
            <FilterChip label="Outlook (V1)" active={providerFilter === 'outlook'} onClick={() => setProviderFilter('outlook')} />
            <Button variant="ghost" size="sm" leadingIcon={<Settings className="w-4 h-4" />}>OAuth</Button>
          </div>
        </div>

        <Card className="p-0 overflow-x-auto">
          <div className="grid grid-cols-[80px_repeat(7,_1fr)] min-w-[800px]">
            <div className="p-3 border-b border-r border-ink-200 bg-ink-50" />
            {WEEK.map((d, i) => (
              <div key={d} className="p-3 border-b border-ink-200 text-center font-semibold text-body-sm">
                {d}<span className="text-caption text-ink-500 block">{11 + i} mai</span>
              </div>
            ))}
            {HOURS.map((h) => (
              <React.Fragment key={h}>
                <div className="p-2 border-r border-b border-ink-200 text-caption text-ink-500 font-mono bg-ink-50">{h}</div>
                {WEEK.map((_, dayIdx) => {
                  const session = SESSIONS.find((s) => s.day === dayIdx && s.hour === h);
                  return (
                    <div key={dayIdx} className="p-1 border-b border-ink-200 min-h-[60px]">
                      {session && (
                        <div className="bg-secondary-50 border-l-4 border-secondary-500 rounded p-2 h-full">
                          <div className="flex items-center gap-1 mb-1">
                            <Avatar initials={session.initials} size="sm" />
                            <span className="text-caption font-semibold truncate">{session.apprenant}</span>
                          </div>
                          <div className="flex items-center gap-1 text-caption text-ink-600">
                            {session.mode === 'remote' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                            <span>{session.duration}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </Card>

        <SectionCard title="Disponibilités configurées" description="Plages où les apprenants peuvent réserver">
          <div className="flex flex-wrap gap-stack-xs">
            <Badge variant="success">Lun-Ven · 9h-12h</Badge>
            <Badge variant="success">Lun-Ven · 14h-17h</Badge>
            <Badge variant="warm">Mer · ½ journée bloquée</Badge>
          </div>
        </SectionCard>
      </Container>
    </div>
  );
};

export default CoachCalendar;
