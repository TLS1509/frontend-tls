import React from 'react';
import { useParams } from 'react-router-dom';
import { Award, Star, FileText, Download, Sparkles } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';

// ─── Mock data ───────────────────────────────────────────────────────────────

interface ResourceItem {
  label: string;
  type: string;
}

const RESSOURCES: ResourceItem[] = [
  { label: 'Support atelier', type: 'PDF' },
  { label: 'Exercices pratiques', type: 'PDF' },
  { label: 'Fiche mémo feedback', type: 'PDF' },
];

// ─── AtelierRecap ─────────────────────────────────────────────────────────────

export default function AtelierRecap() {
  const { id } = useParams<{ id: string }>();
  void id;

  return (
    <PageShell width="medium" noPadTop={true}>
      <EditorialHero
        tone="flat"
        eyebrow="Atelier · Récapitulatif"
        title="Atelier Feedback 360°"
        summary="Session du 18 juin 2026 · Sophie Martin"
        trailing={
          <div className="flex gap-stack-xs flex-wrap">
            <Badge variant="success" size="md">✓ Complété</Badge>
            <Badge variant="success" size="md">+120 XP</Badge>
          </div>
        }
      />

      <div className="flex flex-col gap-section">
        {/* XP celebratoire */}
        <Card variant="tinted" tone="primary" className="text-center py-section flex flex-col items-center gap-stack">
          <Award size={40} className="text-primary-600" />
          <h2 className="text-h2 font-display font-bold text-primary-700">+120 XP gagnés</h2>
          <p className="text-body-sm text-ink-500">Atelier complété · Compétence Communication +0.2 Dreyfus</p>
          <Badge variant="info" size="md">Communication D3.2 → D3.4</Badge>
        </Card>

        {/* Mon retour */}
        <SectionCard
          title="Mon retour"
          titleIcon={<Star size={18} />}
        >
          <Card variant="tinted" tone="sun" className="p-stack flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
            <div className="flex flex-col gap-tight">
              <p className="text-body-sm font-semibold text-ink-900">Tu n'as pas encore donné ton avis</p>
              <p className="text-caption text-ink-400">Aide-nous à améliorer les prochains ateliers</p>
            </div>
            <Button variant="primary" size="sm">Donner mon avis</Button>
          </Card>
        </SectionCard>

        {/* Ressources */}
        <SectionCard
          title="Ressources de la session"
          titleIcon={<FileText size={18} />}
        >
          <div className="flex flex-col gap-stack-xs">
            {RESSOURCES.map((res, idx) => (
              <Card key={idx} variant="default" className="flex items-center justify-between p-3">
                <div className="flex items-center gap-stack-xs">
                  <FileText size={14} className="text-ink-400 shrink-0" />
                  <span className="text-caption text-ink-700">{res.label}</span>
                  <Badge variant="neutral" size="sm">{res.type}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  leadingIcon={<Download size={14} />}
                >
                  Télécharger
                </Button>
              </Card>
            ))}
          </div>
        </SectionCard>

        {/* Prochaine étape recommandée */}
        <SectionCard
          title="Prochaine étape recommandée"
          titleIcon={<Sparkles size={18} />}
        >
          <div className="flex flex-col gap-stack">
            <AITransparencyLabel variant="recommended" size="md" />
            <Card variant="default" className="flex flex-col sm:flex-row items-start sm:items-center gap-section p-stack">
              <div className="flex flex-col gap-tight flex-1">
                <Badge variant="info" size="sm">À venir · 2 juil.</Badge>
                <h4 className="text-body font-semibold text-ink-900">Atelier Communication assertive</h4>
                <p className="text-caption text-ink-500">Développe une communication directe et respectueuse. Avec Pierre Bernard.</p>
              </div>
              <Button variant="primary" size="sm">S'inscrire</Button>
            </Card>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
