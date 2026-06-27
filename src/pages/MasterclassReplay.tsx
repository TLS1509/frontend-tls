import React from 'react';
import { useParams } from 'react-router-dom';
import { Video, Play, Sparkles, FileText, Download, Award, Edit3 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { ResourceListItem } from '../components/learning/ResourceListItem';
import { Container } from '../components/layout';

// ─── Mock data ──────────────────────────────────────────────────────────────

const KEY_THEMES = ['Leadership situationnel', 'Gestion de la pression', 'Communication de crise'];

const MATERIALS = [
  { id: 1, label: 'Slides de la session', icon: <FileText size={14} /> },
  { id: 2, label: 'Bibliographie', icon: <FileText size={14} /> },
  { id: 3, label: 'Fiche pratique', icon: <FileText size={14} /> },
];

// ─── MasterclassReplay ───────────────────────────────────────────────────────

export default function MasterclassReplay() {
  useParams<{ id: string }>();

  return (
    <div className="flex flex-col">
      <EditorialHero
        tone="flat"
        eyebrow="Masterclass · Replay"
        title="Leadership en temps de crise"
        summary="Session du 15 juin 2026 · Marie Fontaine"
        trailing={
          <div className="flex gap-stack-xs flex-wrap">
            <Badge variant="success" size="md">✓ Participé</Badge>
            <Badge variant="success" size="md">+150 XP</Badge>
          </div>
        }
      />

      <Container width="wide" padding={false} className="px-stack py-section">
        <div className="md:grid md:grid-cols-3 gap-section flex flex-col">
          {/* Colonne principale : span 2 */}
          <div className="md:col-span-2 flex flex-col gap-section">
            {/* Player replay */}
            <Card variant="default" className="aspect-video flex items-center justify-center bg-ink-900 rounded-2xl overflow-hidden">
              <div className="flex flex-col items-center gap-stack text-white">
                <Video size={48} className="text-white/40" />
                <p className="text-body text-white/60">Replay · 1h 32min</p>
                <Button variant="glass" size="lg" leadingIcon={<Play size={16} />}>
                  Regarder le replay
                </Button>
              </div>
            </Card>

            {/* Résumé IA */}
            <SectionCard title="Résumé IA" titleIcon={<Sparkles size={18} />}>
              <AITransparencyLabel variant="generated" size="md" />
              <p className="text-body-sm text-ink-600 leading-relaxed mt-stack-xs">
                Marie Fontaine a présenté trois leviers essentiels pour maintenir la cohésion d'équipe en période de crise : la transparence radicale dans la communication, la délégation raisonnée pour préserver l'énergie collective, et le recadrage positif pour maintenir la motivation malgré l'incertitude.
              </p>
              <div className="flex flex-wrap gap-stack-xs mt-tight">
                {KEY_THEMES.map((theme) => (
                  <Badge key={theme} variant="info" size="sm">{theme}</Badge>
                ))}
              </div>
            </SectionCard>

            {/* Notes personnelles */}
            <SectionCard title="Mes notes" titleIcon={<Edit3 size={18} />}>
              <textarea
                placeholder="Ajoute tes notes sur la session..."
                className="w-full min-h-[120px] h-auto p-3 border border-ink-200 rounded-xl text-body-sm resize-none focus:outline-none focus:border-primary-400"
              />
              <div className="flex justify-end mt-tight">
                <Button variant="ghost" size="sm">Sauvegarder</Button>
              </div>
            </SectionCard>
          </div>

          {/* Sidebar droite */}
          <div className="md:col-span-1 flex flex-col gap-stack">
            {/* XP card */}
            <Card variant="tinted" tone="primary" className="text-center p-stack flex flex-col items-center gap-tight">
              <Award size={28} className="text-primary-600" />
              <p className="text-h2 font-display font-bold text-primary-700">+150 XP</p>
              <p className="text-caption text-ink-400">Masterclass complétée</p>
            </Card>

            {/* Ressources */}
            <SectionCard title="Matériaux" titleIcon={<FileText size={18} />}>
              <div className="flex flex-col gap-stack-xs">
                {MATERIALS.map((m) => (
                  <ResourceListItem
                    key={m.id}
                    icon={m.icon}
                    label={m.label}
                    action={
                      <Button variant="ghost" size="sm" leadingIcon={<Download size={13} />}>
                        Télécharger
                      </Button>
                    }
                  />
                ))}
              </div>
            </SectionCard>

            {/* CTA enquête */}
            <Card variant="tinted" tone="sun" className="p-stack flex flex-col gap-tight">
              <p className="text-body-sm font-semibold text-ink-900">Ton avis compte !</p>
              <p className="text-caption text-ink-500">Aide-nous à améliorer les prochaines sessions.</p>
              <Button variant="primary" size="sm" fullWidth className="mt-tight">
                Donner mon avis
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
