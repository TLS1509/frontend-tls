/**
 * JacCard — Jalons & Certifications card (Cahier #02 + #11).
 *
 * Two variants:
 *  - `pending`   : validation en cours (badge "En revue" + Relancer CTA)
 *  - `next-jalon`: prochain jalon à atteindre (requirements list + progress bar + Préparer CTA)
 *
 * Reused in PasseportJac, ProjectJac (Module 11).
 */

import React from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { Card } from '../core/Card';
import { Badge } from './Badge';
import { MetaPill } from './MetaPill';
import { Button } from '../core/Button';
import { ProgressBar } from './ProgressBar';

// ─── Pending variant ──────────────────────────────────────────────────────────

export interface JacCardPendingProps {
  id: string;
  title: string;
  competence: string;
  dreyfusLevel: string;
  submittedDaysAgo: number;
  waitingFor: string;
  onRelancer?: () => void;
}

export const JacCardPending: React.FC<JacCardPendingProps> = ({
  title,
  submittedDaysAgo,
  waitingFor,
  onRelancer,
}) => (
  <Card variant="default" className="p-stack-md flex flex-col gap-stack-xs">
    {/* Carte dense, lue comme une rangée forte : libellé 16/600 ink-900 (pas
        un titre de 20), méta 13/400 ink-600 à 2 px (passe typographique du
        2026-09-24). Le libellé était en League Spartan 600 — une graisse que
        l'échelle des titres ne connaît pas. */}
    <div className="flex items-start justify-between gap-stack flex-wrap">
      <div className="flex flex-col gap-tight">
        <span className="font-body font-semibold text-body text-ink-900">{title}</span>
        <div className="flex items-center gap-stack-3xs text-caption text-ink-600">
          <AlertCircle size={14} aria-hidden />
          <span>
            Soumis il y a {submittedDaysAgo} j · en attente {waitingFor}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-stack-xs shrink-0">
        <Badge variant="sun" size="compact">En revue</Badge>
        {/* L'action de la carte : `soft` (arbitrage n°19). Elle était en
            `outline`, réservé à Annuler. */}
        <Button emphasis="soft" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={onRelancer}>
          Relancer
        </Button>
      </div>
    </div>
  </Card>
);

// ─── Next-jalon variant ───────────────────────────────────────────────────────

export interface JacCardNextJalonProps {
  id: string;
  title: string;
  competence: string;
  dreyfusLevel: string;
  requirements: string[];
  progress: number;
  onPreparer?: () => void;
}

export const JacCardNextJalon: React.FC<JacCardNextJalonProps> = ({
  title,
  dreyfusLevel,
  requirements,
  progress,
  onPreparer,
}) => (
  <Card variant="default" className="p-stack-md flex flex-col gap-stack-xs">
    {/* Libellé 16/600 · niveau Dreyfus en MetaPill (une DONNÉE, pas un état :
        arbitrages n°14-15) · exigences 16/400 ink-700 à 8 px · progression à
        12 px. Les exigences étaient des légendes ink-500 : c'est pourtant ce
        qu'il reste à faire, le texte qu'on vient lire. */}
    <div className="flex items-start justify-between gap-stack flex-wrap">
      <div className="flex flex-col gap-stack-xs flex-1 min-w-0">
        {/* Le niveau se dit une fois (2026-09-24). Les titres le portent
            souvent déjà (« Communication : Niveau D3 ») et la pastille le
            répétait (« D3 ») : elle ne s'affiche que si le titre ne le dit pas. */}
        <div className="flex items-center gap-stack-xs flex-wrap">
          <span className="font-body font-semibold text-body text-ink-900">{title}</span>
          {!title.includes(dreyfusLevel) && <MetaPill text={dreyfusLevel} tone="primary" />}
        </div>
        <ul className="m-0 pl-0 list-none flex flex-col gap-stack-3xs">
          {requirements.map((req) => (
            <li key={req} className="flex items-start gap-stack-xs text-body text-ink-700">
              <span className="flex items-center h-lh shrink-0" aria-hidden>
                <span className="w-1 h-1 rounded-pill bg-ink-400" />
              </span>
              {req}
            </li>
          ))}
        </ul>
        <div className="pt-stack-3xs">
          <ProgressBar
            value={progress}
            max={100}
            fill="brand"
            size="sm"
            layout="inline"
            label="Progression"
            valueLabel={`${progress} %`}
          />
        </div>
      </div>
      <div className="shrink-0">
        <Button emphasis="soft" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={onPreparer}>
          Préparer
        </Button>
      </div>
    </div>
  </Card>
);
