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
  <Card variant="default" className="p-stack flex flex-col gap-stack-xs">
    <div className="flex items-start justify-between gap-stack flex-wrap">
      <div className="flex flex-col gap-tight">
        <span className="font-display font-semibold text-body-sm text-ink-900">{title}</span>
        <div className="flex items-center gap-stack-xs text-caption text-ink-400">
          <AlertCircle size={12} aria-hidden />
          <span>
            Soumis il y a {submittedDaysAgo} j · en attente {waitingFor}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-stack-xs shrink-0">
        <Badge variant="sun" size="sm">En revue</Badge>
        <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={onRelancer}>
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
  <Card variant="default" className="p-stack flex flex-col gap-stack-xs">
    <div className="flex items-start justify-between gap-stack flex-wrap">
      <div className="flex flex-col gap-tight flex-1 min-w-0">
        <div className="flex items-center gap-stack-xs flex-wrap">
          <span className="font-display font-semibold text-body-sm text-ink-900">{title}</span>
          <Badge variant="brand" size="sm">{dreyfusLevel}</Badge>
        </div>
        <ul className="m-0 pl-0 list-none flex flex-col gap-tight">
          {requirements.map((req) => (
            <li key={req} className="flex items-center gap-stack-xs text-caption text-ink-500">
              <span className="w-1 h-1 rounded-full bg-ink-300 shrink-0" />
              {req}
            </li>
          ))}
        </ul>
        <div className="pt-tight">
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
        <Button variant="primary" size="sm" trailingIcon={<ChevronRight size={14} />} onClick={onPreparer}>
          Préparer
        </Button>
      </div>
    </div>
  </Card>
);
