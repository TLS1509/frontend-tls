import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Info, Calendar, Clock, Users, MapPin, Sparkles, Video } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { EtapeAccordion } from '../components/patterns/EtapeAccordion';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Container } from '../components/layout';

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
    detail: 'Session ouverte : apportez vos cas concrets. Marie Fontaine répond en direct à vos questions sur vos situations terrain.',
  },
];

const INFOS = [
  { icon: <Calendar size={15} />, key: 'Date', value: '15 juin 2026' },
  { icon: <Clock size={15} />, key: 'Heure', value: '14h00 – 15h30' },
  { icon: <MapPin size={15} />, key: 'Format', value: 'Distanciel · Google Meet' },
  { icon: <Users size={15} />, key: 'Prérequis', value: 'Dreyfus D2+' },
];

const RELATED = [
  { id: 2, title: 'IA & Décision managériale', expert: 'Thomas Renard', status: 'À venir' },
  { id: 3, title: 'Communication non-violente', expert: 'Sarah Leloup', status: 'REPLAY' },
];

// ─── MasterclassDetail ───────────────────────────────────────────────────────

export default function MasterclassDetail() {
  useParams<{ id: string }>();
  const navigate = useNavigate();
  const [openProg, setOpenProg] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      <EditorialHero
        tone="flat"
        eyebrow="Masterclass · Détail"
        title="Leadership en temps de crise"
        summary="Découvre comment maintenir l'engagement et la performance de tes équipes dans les périodes de turbulences."
        trailing={
          <div className="flex gap-stack-xs flex-wrap">
            <Badge variant="info" size="md">15 juin 2026 · 14h00</Badge>
            <Badge variant="neutral" size="md">90 min · Distanciel</Badge>
          </div>
        }
      />

      <Container width="content" padding={false} className="px-stack py-section">
        <EditorialLayout
          main={
            <div className="flex flex-col gap-section">
              {/* Programme accordion */}
              <SectionCard title="Programme" titleIcon={<BookOpen size={18} />}>
                <div className="flex flex-col gap-stack-xs">
                  {PROGRAMME.map((item, i) => (
                    <EtapeAccordion
                      key={item.label}
                      variant="default"
                      isOpen={openProg === i}
                      onToggle={() => setOpenProg(openProg === i ? null : i)}
                      header={
                        <div className="flex items-center gap-stack-xs flex-1 min-w-0">
                          <Badge variant="neutral" size="sm">{item.duration}</Badge>
                          <span className="text-body-sm text-ink-800 font-medium truncate">{item.label}</span>
                        </div>
                      }
                    >
                      <div className="px-4 py-stack border-t border-ink-100">
                        <p className="text-body-sm text-ink-600 m-0 leading-relaxed">{item.detail}</p>
                      </div>
                    </EtapeAccordion>
                  ))}
                </div>
              </SectionCard>

              {/* Infos pratiques */}
              <SectionCard title="Infos pratiques" titleIcon={<Info size={18} />}>
                <div className="grid sm:grid-cols-2 gap-stack-xs">
                  {INFOS.map((info) => (
                    <div key={info.key} className="flex items-center gap-stack-xs p-3 rounded-xl bg-ink-50">
                      <span className="text-ink-400 shrink-0">{info.icon}</span>
                      <span className="text-caption font-semibold text-ink-500 shrink-0">{info.key}</span>
                      <span className="text-caption text-ink-700">{info.value}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* CTA inscription */}
              <Card variant="tinted" tone="primary" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack p-stack-lg">
                <div className="flex flex-col gap-tight flex-1 min-w-0">
                  <p className="text-body-sm font-semibold text-ink-900 m-0">
                    Inscription ouverte jusqu'au 15 juin à 15h00
                  </p>
                  <p className="text-caption text-ink-400 m-0">47 / 100 places restantes</p>
                  <ProgressBar value={53} fill="brand" size="sm" valueLabel={false} />
                </div>
                <Button variant="primary" size="lg" className="shrink-0">
                  S'inscrire à la masterclass
                </Button>
              </Card>
            </div>
          }
          aside={
            <div className="flex flex-col gap-section">
              {/* Expert card */}
              <SectionCard title="Experte" titleIcon={<Users size={15} />}>
                <div className="flex items-center gap-stack">
                  <Avatar name="Marie Fontaine" initials="MF" size="lg" tint="brand" />
                  <div className="flex flex-col gap-tight min-w-0">
                    <p className="text-body-sm font-semibold text-ink-900 m-0">Marie Fontaine</p>
                    <p className="text-caption text-ink-500 m-0">DRH · Groupe Vinci</p>
                    <p className="text-caption text-ink-400 m-0 leading-snug">
                      15 ans d'expérience en leadership et gestion de crise.
                    </p>
                  </div>
                </div>
              </SectionCard>

              {/* Masterclasses similaires */}
              <SectionCard title="Tu pourrais aussi aimer" titleIcon={<Sparkles size={15} />}>
                <div className="flex flex-col gap-stack-xs">
                  {RELATED.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className="w-full flex items-center justify-between gap-stack p-3 rounded-lg border border-ink-100 hover:bg-ink-50 transition-colors text-left cursor-pointer bg-transparent"
                      onClick={() => navigate(`/masterclass/${m.id}`)}
                    >
                      <div className="flex items-center gap-stack-xs min-w-0">
                        <Video size={14} className="text-primary-400 shrink-0" />
                        <div className="flex flex-col gap-tight min-w-0">
                          <span className="text-body-sm font-semibold text-ink-900 truncate">{m.title}</span>
                          <span className="text-caption text-ink-500">{m.expert}</span>
                        </div>
                      </div>
                      <Badge variant={m.status === 'REPLAY' ? 'success' : 'info'} size="sm">
                        {m.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              </SectionCard>
            </div>
          }
        />
      </Container>
    </div>
  );
}
