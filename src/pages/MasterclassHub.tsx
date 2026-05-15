import React, { useState } from 'react';
import { Video, Calendar, Clock, Users, Play } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { Avatar } from '../components/ui/Avatar';

// ─── Mock data ──────────────────────────────────────────────────────────────

type MasterclassStatus = 'upcoming' | 'replay' | 'full';

interface Masterclass {
  id: number;
  title: string;
  expert: string;
  role: string;
  date: string;
  status: MasterclassStatus;
}

const MASTERCLASSES: Masterclass[] = [
  { id: 1, title: 'Leadership en temps de crise', expert: 'Marie Fontaine', role: 'DRH · Groupe Vinci', date: '15 juin 2026 · 14h00', status: 'upcoming' },
  { id: 2, title: 'IA & Décision managériale', expert: 'Thomas Renard', role: 'CDO · Orange', date: '22 juin 2026 · 11h00', status: 'upcoming' },
  { id: 3, title: 'Communication non-violente', expert: 'Sarah Leloup', role: 'Coach certifiée CNV', date: '8 mai 2026', status: 'replay' },
  { id: 4, title: 'Négociation complexe', expert: 'Paul Mercier', role: 'Consultant senior', date: '20 avr. 2026', status: 'replay' },
  { id: 5, title: 'Feedback 360°', expert: 'Julie Morin', role: 'RH · Decathlon', date: '2 juin 2026 · 10h00', status: 'full' },
  { id: 6, title: 'Délégation & Empowerment', expert: 'Marc Dupuis', role: 'CEO · Scale-up', date: '15 mars 2026', status: 'replay' },
];

const STATUS_BADGE: Record<MasterclassStatus, { variant: 'info' | 'success' | 'neutral'; label: string }> = {
  upcoming: { variant: 'info', label: 'À venir' },
  replay:   { variant: 'success', label: 'REPLAY' },
  full:     { variant: 'neutral', label: 'Complet' },
};

type Filter = 'all' | 'upcoming' | 'replay';

// ─── MasterclassHub ──────────────────────────────────────────────────────────

export default function MasterclassHub() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filtered = MASTERCLASSES.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return m.status === 'upcoming';
    if (activeFilter === 'replay') return m.status === 'replay';
    return true;
  });

  return (
    <div className="flex flex-col">
      <EditorialHero
        tone="default"
        eyebrow="Masterclass"
        title="Masterclasses & Experts"
        summary="Accède aux sessions live avec des experts de l'industrie. Format 90 min. Questions live."
      />

      <div className="max-w-wide mx-auto w-full px-4 py-section flex flex-col gap-section">
        {/* Stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard
            label="Prochaines sessions"
            value="4"
            icon={<Calendar size={18} />}
            tone="brand"
            surface="tinted"
          />
          <StatCard
            label="Replays disponibles"
            value="12"
            icon={<Play size={18} />}
            tone="brand"
            surface="tinted"
          />
          <StatCard
            label="Experts"
            value="8"
            icon={<Users size={18} />}
            variant="brand"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-stack-xs flex-wrap">
          <FilterChip label="Toutes" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
          <FilterChip label="À venir" active={activeFilter === 'upcoming'} onClick={() => setActiveFilter('upcoming')} />
          <FilterChip label="Replays" active={activeFilter === 'replay'} onClick={() => setActiveFilter('replay')} />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stack">
          {filtered.map((m) => {
            const { variant, label } = STATUS_BADGE[m.status];
            return (
              <Card key={m.id} variant="default" className="flex flex-col gap-stack p-0 overflow-hidden">
                {/* Image placeholder */}
                <div className="bg-primary-100 h-44 flex items-center justify-center">
                  <Video size={40} className="text-primary-400" />
                </div>

                <div className="p-4 flex flex-col gap-tight">
                  <Badge variant={variant}>{label}</Badge>
                  <h3 className="text-body font-semibold text-ink-900">{m.title}</h3>

                  {/* Expert row */}
                  <div className="flex items-center gap-stack-xs mt-tight">
                    <Avatar name={m.expert} size="sm" />
                    <div className="flex flex-col">
                      <span className="text-caption font-semibold text-ink-700">{m.expert}</span>
                      <span className="text-caption text-ink-500">{m.role}</span>
                    </div>
                  </div>

                  {/* Date/durée row */}
                  <div className="flex items-center gap-stack-xs mt-tight">
                    <Calendar size={13} className="text-ink-400 shrink-0" />
                    <span className="text-caption text-ink-500">{m.date}</span>
                    <Clock size={13} className="text-ink-400 shrink-0 ml-stack-xs" />
                    <span className="text-caption text-ink-500">90 min</span>
                  </div>

                  {/* CTA */}
                  <div className="mt-tight">
                    {m.status === 'replay' ? (
                      <Button variant="ghost" size="sm" fullWidth leadingIcon={<Play size={14} />}>
                        Voir le replay
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm" fullWidth>
                        S'inscrire
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
