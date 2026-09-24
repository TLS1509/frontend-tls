/**
 * ParcoursCard — Design System Pattern
 *
 * Tinted-glass learning path card for catalogues / hubs.
 *
 * Visual spec :
 *  - Tinted gradient background via Card variant="tinted" tone={tone}
 *  - Titre ink-900 (la couleur de marque ne porte pas un titre — doctrine § 2)
 *  - Title : full text (no truncate) + native tooltip
 *  - MetaPills : duration + lessons (always visible)
 *  - Description : up to 5 lines (line-clamp-5) + native tooltip if longer
 *  - InlineProgress bar tone-aware + bold % label
 *  - Full-width tone CTA button with hover lift + tone-aware focus outline
 *  - Radial top-glow overlay per tone on hover (decorative, aria-hidden)
 *  - Inter-card alignment : bloc progression + CTA poussé en bas (`mt-auto`)
 *
 * Usage : grid layouts (LearningPaths, Dashboard discovery section).
 */

import React from 'react';
import { ArrowRight, Clock3, BookOpen } from 'lucide-react';
import { InlineProgress } from './InlineProgress';
import { Card } from '../core/Card';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import { CARD_HOVER } from '../../lib/tone-classes';

export type ParcoursTone = 'primary' | 'warm' | 'sun';
export type ParcoursStatus = 'en cours' | 'complété' | 'non commencé';

export interface ParcoursCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: ParcoursStatus;
  tone?: ParcoursTone;
  /** Card variant: tinted (default gradient bg) or outline (white bg + colored border). */
  cardVariant?: 'tinted' | 'outline';
  onClick?: (id: string) => void;
  className?: string;
  /** Duration label rendered in a MetaPill (e.g. "6 semaines"). */
  duration?: string;
  /** Number of lessons rendered in a MetaPill (e.g. "12 leçons"). */
  lessons?: number;
}

const CTA_LABELS: Record<ParcoursStatus, string> = {
  'en cours':       'Reprendre le parcours',
  complété:         'Revoir le parcours',
  'non commencé':   'Commencer le parcours',
};

/* ─── Outline variant (minimal, white background + colored border) ─────── */
const BG_OUTLINE = 'bg-white';
const BORDER_OUTLINE: Record<ParcoursTone, string> = {
  primary: '!border-primary-300 !border-2',
  warm:    '!border-secondary-300 !border-2',
  sun:     '!border-accent-300 !border-2',
};

const HOVER_BG_OUTLINE: Record<ParcoursTone, string> = {
  primary: 'hover:bg-primary-50',
  warm:    'hover:bg-secondary-50',
  sun:     'hover:bg-accent-50',
};

/* Libellé en 700, la graisse de Button (passe typographique du 2026-09-24). */
const CTA_BASE =
  'flex items-center justify-center gap-stack-xs w-full h-11 rounded-lg px-stack-md cursor-pointer font-body text-body font-bold whitespace-nowrap transition-[background-color,color,transform,box-shadow] duration-fast ease-emphasis active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2';

/* Tone-aware CTA classes — TINTED depuis le 2026-09-17 (verdict option D :
   l'app abandonne le solid). L'ancienne recette posait du blanc sur 500 —
   2,94 (primary) / 2,64 (warm), mesurés — et contredisait la doctrine
   « blanc seulement sur 700+ ». Labels au 800 du ton, filets 600 (700 pour
   l'or, dont le 600 rate le contour). */
const CTA_TONE_CLASSES: Record<ParcoursTone, string> = {
  primary: 'bg-primary-50 hover:bg-primary-100 text-primary-800 border border-primary-600 hover:border-primary-700 focus-visible:outline-primary-500',
  warm:    'bg-secondary-100/70 hover:bg-secondary-100 text-secondary-800 border border-secondary-600 hover:border-secondary-700 focus-visible:outline-secondary-500',
  sun:     'bg-accent-100/70 hover:bg-accent-100 text-accent-800 border border-accent-700 hover:border-accent-800 focus-visible:outline-accent-500',
};

// Le CTA ne prend plus d'ombre au survol — CTA_SHADOW_HOVER_MD (tone-classes.ts)
// est déprécié depuis la règle du 2026-09-16 (pas d'ombre, pas de soulèvement).

const GLOW_BG: Record<ParcoursTone, React.CSSProperties> = {
  primary: { background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.10) 0%, transparent 70%)' },
  warm:    { background: 'radial-gradient(circle at 50% 0%, rgba(241, 138, 76, 0.14) 0%, transparent 70%)' },
  sun:     { background: 'radial-gradient(circle at 50% 0%, rgba(248, 176, 68, 0.14) 0%, transparent 70%)' },
};

export const ParcoursCard: React.FC<ParcoursCardProps> = ({
  id,
  title,
  description,
  progress,
  status,
  tone = 'primary',
  cardVariant = 'tinted',
  onClick,
  className = '',
  duration,
  lessons,
}) => {
  const hasMeta = Boolean(duration || lessons);
  const isTinted = cardVariant === 'tinted';
  const bgClasses = isTinted ? '' : BG_OUTLINE;
  const borderClasses = isTinted ? '' : BORDER_OUTLINE[tone];
  const hoverClasses = !isTinted ? HOVER_BG_OUTLINE[tone] : '';

  return (
    <Card
      variant={isTinted ? 'tinted' : 'default'}
      tone={isTinted ? tone : undefined}
      onClick={() => onClick?.(id)}
      aria-label={`${title} — ${status}`}
      className={[
        'group relative overflow-hidden cursor-pointer transition-[transform,box-shadow,opacity] duration-base ease-emphasis',
        isTinted ? CARD_HOVER[tone] : '',
        /* Les trois `!important` qui vivaient ici — `!p-0 !rounded-2xl !gap-0` —
           annulaient la primitive que la carte venait d'appeler. Retirés le
           2026-09-16 : `<Card size="md">` donne déjà son rayon de carte (20 px
           depuis le 16/09 — cette note disait « 14 px, R1 », corrigée) et
           `p-stack-lg` (24 px, le canon). Mesuré avant/après sur la carte réelle :
           le padding de 32 coûtait 16 px de largeur de texte, donc une TROISIÈME
           ligne de titre, donc 43 px de hauteur — sur huit cartes, une ligne de
           défilement par rangée.
           ⚠️ Ne jamais rétablir un `!` de rayon ou de padding ici : il bat la
           primitive, et une décision de design ne descend que par elle. */
        bgClasses,
        borderClasses,
        hoverClasses,
        !isTinted ? '!border-none' : '', // outline: remove default border
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Radial glow overlay — opacity-0 → opacity-100 on group-hover (tinted only) */}
      {isTinted && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-base ease-standard"
          style={GLOW_BG[tone]}
        />
      )}

      {/* Anatomie (passe typographique du 2026-09-24) :
            titre h3 20/700 ink-900 → méta 8 → texte 12 · contenu → actions 24.
          Le titre portait la couleur du ton au cran 600 (3,26:1 sur la carte
          teintée, à peine au-dessus du 3:1 du grand texte ; la doctrine ne
          donne une couleur de marque au texte qu'au cran 800, jamais pour
          orner un titre) et un interligne écrit à côté du pas
          (`leading-[1.15]`, 23 px) : le ton vit dans la carte, la barre et le
          bouton, le titre reprend l'encre et l'interligne de son pas.
          Le bloc d'actions descend au bas de la carte (`mt-auto`), avec 24 px
          au moins au-dessus : les barres s'alignent d'une carte à l'autre. */}
      <div className="relative flex flex-col gap-stack-lg h-full min-w-0">
        <div className="flex flex-col gap-stack-sm">
          <div className="flex flex-col gap-stack-xs">
            {/* Titre — pas de truncate, overflow-wrap:anywhere évite le dépassement sur longs mots,
                hyphens-none désactive la césure automatique (évite "Communica-tion"), text-wrap:balance
                pour wrap équilibré. */}
            <h3
              className="font-display text-h3 text-ink-900 [overflow-wrap:anywhere] hyphens-none [text-wrap:balance]"
              title={title}
            >
              {title}
            </h3>

            {/* MetaPills — rendered only when data present (no empty space reservation) */}
            {hasMeta && (
              <MetaPillGroup
                items={[
                  ...(duration ? [{ icon: <Clock3 size={14} />, text: duration }] : []),
                  ...(lessons ? [{ icon: <BookOpen size={14} />, text: `${lessons} leçons` }] : []),
                ]}
                size="sm"
                layout="horizontal"
                gap="sm"
              />
            )}
          </div>

          {/* Description — jusqu'à 5 lignes, tooltip natif si plus long. */}
          <p
            className="font-body text-body text-ink-700 m-0 line-clamp-5"
            title={description}
          >
            {description}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-stack-sm">
          <InlineProgress value={progress} tone={tone} showLabel={true} size="md" />

        {/* Une affordance, pas un contrôle — même motif que PromptCard.
            C'était un <button> qui rappelait le `onClick` de la carte après un
            `stopPropagation` : même cible, même effet, mais DEUX arrêts de
            tabulation par carte et un contenu interactif imbriqué dans un
            `role="button"`, ce qui est invalide. Un lecteur d'écran annonçait
            « bouton, <titre> » puis « bouton, Commencer le parcours ».
            L'apparence ne change pas ; seul le rôle disparaît. */}
          <span
            aria-hidden="true"
            className={`${CTA_BASE} ${CTA_TONE_CLASSES[tone]}`}
          >
            <span>{CTA_LABELS[status]}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ParcoursCard;
