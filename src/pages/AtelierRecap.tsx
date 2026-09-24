import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, FileText, Download, Check } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
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
    <PageShell width="medium" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      {/* « Participé » est un état (Badge). Les « +120 XP » de la ligne de
          méta sont sortis avec l'arbitrage n°18. */}
      <EditorialHero
        tone="flat"
        eyebrow="Atelier · Récapitulatif"
        title="Atelier Feedback 360°"
        summary="Session du 18 juin 2026 · Sophie Martin"
        meta={[
          { label: <Badge variant="success" size="normal"><Check size={12} aria-hidden="true" /> Participé</Badge> },
        ]}
      />

      {/* Ce qui s'est passé, dit calmement — une confirmation courte, centrée.
          Elle célébrait « +120 XP gagnés » sous une rosette : l'arbitrage n°18
          retire l'XP de l'app apprenant, et l'atelier se clôt sur ce qu'il a
          réellement produit, une trace au Passeport. Titre en ink-900 ; 12 px
          entre les trois lignes. */}
      <Card variant="tinted" tone="primary" className="text-center py-section flex flex-col items-center gap-stack-sm">
        <CheckCircle2 size={40} className="text-primary-700" aria-hidden="true" />
        <h2 className="font-display text-h2 text-ink-900">Participation enregistrée</h2>
        {/* Assister ne fait pas monter un niveau : seul un niveau validé par
            le coach et le manager bouge le Passeport. L'ancien « +0,2 Dreyfus ·
            D3.2 → D3.4 » disait l'inverse de cet invariant (audit du 23/09). */}
        <p className="text-body text-ink-700">Trace ajoutée à ton Passeport, en attente de validation</p>
      </Card>

      {/* Trois sections h2 (des h3 dans des cartes avant), leurs contenus sans
          carte de section autour. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Mon retour" size="md" />
        <Card variant="tinted" tone="sun" size="sm" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
          <div className="flex flex-col gap-stack-3xs">
            <p className="text-body font-semibold text-ink-900">Tu n'as pas encore donné ton avis</p>
            <p className="text-caption text-ink-600">Aide-nous à améliorer les prochains ateliers</p>
          </div>
          {/* Donner son avis, ce qui reste à faire après l'atelier : l'action
              principale du récapitulatif, son seul `solid` (arbitrage n°19). */}
          <Button emphasis="solid" tone="brand" size="sm">Donner mon avis</Button>
        </Card>
      </section>

      {/* Ressources : rangées dans UNE carte, nom en 16 ink-900, format en
          légende (plus une pastille « PDF »), bouton icône. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Ressources de la session" meta={`${RESSOURCES.length} documents`} size="md" />
        <Card className="p-0">
          <ul className="flex flex-col divide-y divide-ink-100">
            {RESSOURCES.map((res, idx) => (
              <li key={idx} className="flex items-center justify-between gap-stack-sm px-stack-md sm:px-stack-lg py-stack-sm">
                <div className="flex items-start gap-stack-xs min-w-0">
                  <span className="shrink-0 inline-flex items-center h-lh text-body text-ink-600" aria-hidden="true">
                    <FileText size={16} />
                  </span>
                  <div className="flex flex-col gap-tight min-w-0">
                    <span className="text-body text-ink-900">{res.label}</span>
                    <span className="text-caption text-ink-600">{res.type}</span>
                  </div>
                </div>
                <Button
                  emphasis="soft"
                  tone="brand"
                  iconOnly
                  className="shrink-0"
                  aria-label={`Télécharger ${res.label}`}
                  leadingIcon={<Download size={16} />}
                />
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Prochaine étape recommandée : l'étiquette IA à sa place d'action (elle
          s'étirait en barre). La carte suit l'anatomie : l'état et la date →
          4 → le titre h3 20 (un h4 à 16/600) → 8 → le texte 16 ink-700 (une
          légende ink-500) → l'action. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Prochaine étape recommandée"
          size="md"
          action={<AITransparencyLabel variant="recommended" size="sm" />}
        />
        <Card className="flex flex-col sm:flex-row items-start sm:items-center gap-stack">
          <div className="flex flex-col flex-1 min-w-0">
            <p className="flex items-center gap-stack-xs flex-wrap text-caption text-ink-600">
              <Badge variant="info" size="compact">À venir</Badge>
              <span>2 juillet</span>
            </p>
            <h3 className="mt-stack-3xs font-display text-h3 text-ink-900">Atelier Communication assertive</h3>
            <p className="mt-stack-xs text-body text-ink-700 max-w-prose">Développe une communication directe et respectueuse. Avec Pierre Bernard.</p>
          </div>
          <Button emphasis="soft" size="sm" className="shrink-0">S'inscrire</Button>
        </Card>
      </section>
    </PageShell>
  );
}
