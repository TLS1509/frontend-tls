/**
 * ResumeLessonCard — Dashboard/home dominant action "Reprendre la leçon".
 *
 * Refonte 2026-07 (card-system) :
 *  - Surface : blanc solide + shadow-card (direction app validée — pas de gradient teinté)
 *  - Accent tone (warm/primary/sun) vit UNIQUEMENT dans : bulle icône · bordure · CTA · barre de progression
 *  - Grammaire meta unifiée (4 rôles) :
 *      · Status badge  → "En cours" (seule chip colorée, = l'état)
 *      · Meta pills    → durée · niveau (NEUTRES — ce sont des faits)
 *      · Eyebrow/step  → "Étape X sur Y" (contexte, texte discret)
 *      · Titre         → héros
 *  - Mobile-first : stack vertical, CTA full-width ; desktop : footer progress + CTA.
 */

import React from 'react';
import { Button } from '../core/Button';
import { ArrowRight, Play, Target } from 'lucide-react';
import { MetaPillGroup, type MetaPillItem } from '../ui/MetaPillGroup';
import { Badge, type BadgeVariant } from '../ui/Badge';

export type ResumeLessonTone = 'primary' | 'warm' | 'sun';

export interface ResumeLessonCardProps {
  id: string;
  parcoursTitle: string;
  /** Contexte d'étape affiché en ligne de tête (ex: "Étape 2 sur 5"). */
  eyebrow?: React.ReactNode;
  /** @deprecated non rendu */
  description?: string;
  nextLessonTitle?: string;
  progress: number;
  /** Étape actuelle — alimente le compteur "Étape X sur Y". */
  currentStep?: number;
  /** Nombre total d'étapes. */
  totalSteps?: number;
  ctaLabel?: string;
  tone?: ResumeLessonTone;
  level?: string;
  duration?: string;
  onClick?: (id: string) => void;
  className?: string;
}

// ─── Tone maps (accent only : bulle · bordure · CTA · progress) ───────────────

const CARD_BORDER: Record<ResumeLessonTone, string> = {
  primary: 'border-primary-200/70 hover:border-primary-300',
  warm:    'border-secondary-200/70 hover:border-secondary-300',
  sun:     'border-accent-200/70 hover:border-accent-300',
};

const ICON_BUBBLE: Record<ResumeLessonTone, string> = {
  // Pastille d'icône : 3:1 à l'arrêt le plus clair — 600 pour le teal et l'orange,
  // 700 pour l'or (le blanc y mesure 3,66 · 3,98 · 4,88).
  primary: 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-brand-sm',
  warm:    'bg-gradient-to-br from-secondary-600 to-secondary-700 text-white shadow-warm-sm',
  sun:     'bg-gradient-to-br from-accent-300 to-accent-500 text-accent-900 shadow-sun-sm',
};

/** « En cours » — l'état de la carte : le vrai `Badge`, au ton de l'accent.
    C'était une imitation faite main, avec un point qui pulsait en continu
    (arbitrage n°16 : pas de mouvement permanent pour dire un état). */
const STATUS_BADGE: Record<ResumeLessonTone, BadgeVariant> = {
  primary: 'brand',
  warm:    'warm',
  sun:     'sun',
};

const PROGRESS_FILL: Record<ResumeLessonTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-400',
};

// ─── Component ───────────────────────────────────────────────────────────────

export const ResumeLessonCard: React.FC<ResumeLessonCardProps> = ({
  id,
  parcoursTitle,
  eyebrow,
  nextLessonTitle,
  progress,
  currentStep,
  totalSteps,
  ctaLabel = 'Reprendre',
  tone = 'warm',
  level,
  duration,
  onClick,
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, progress));
  const hasStep = currentStep !== undefined && totalSteps !== undefined;
  const stepText = hasStep ? `Étape ${currentStep} sur ${totalSteps}` : eyebrow;

  /* Meta pills = faits, NEUTRES. */
  const metaItems: MetaPillItem[] = [
    duration ? { text: duration } : null,
    level ? { text: level.charAt(0).toUpperCase() + level.slice(1) } : null,
  ].filter(Boolean) as MetaPillItem[];

  /* La racine n'est plus un contrôle — décidé le 2026-09-16.

        Elle portait `role="button"` et son propre `onClick`, tout en CONTENANT
        le <Button> « Reprendre ». Deux arrêts de tabulation pour une seule
        destination, et un contenu interactif imbriqué dans un `role="button"`,
        ce qui est invalide : un lecteur d'écran annonçait « bouton, Reprendre
        <parcours> » puis, une tabulation plus loin, « bouton, Reprendre ».

        La règle de la famille : dans une GRILLE, la carte est le bouton et ne
        contient pas de contrôle (ParcoursCard, PromptCard, LearningItemCard).
        Sur une carte ISOLÉE et dominante comme celle-ci, l'action mérite un
        vrai bouton — c'est donc la racine qui cède son rôle, pas le bouton. */
  return (
    <article
      aria-labelledby={`resume-${id}-titre`}
      className={[
        /* `@container` fait de la carte le conteneur mesuré pour ses DESCENDANTS.

        Son propre padding ne peut pas en dépendre — une requête de conteneur
        remonte à l'ancêtre, jamais à l'élément qui la porte — donc il reste fixe
        à 24 px, la valeur canonique des cartes.

        ⚠️ Et ce padding décale les seuils : `container-type: inline-size` mesure
        la boîte de CONTENU, pas la boîte externe. Avec 24 px de chaque côté, le
        cran `@lg` (512 px) se déclenche à 560 px de carte. Mesuré : la carte du
        tableau de bord fait 596 px, soit 548 de contenu — elle garde donc sa
        mise en ligne, ce qu'un seuil à `@xl` (576) lui aurait retiré. */
        '@container group relative flex flex-col gap-stack-lg rounded-xl border bg-white p-stack-lg cursor-pointer',
        ' transition-[transform,box-shadow,border-color] duration-base ease-emphasis',
        '',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        CARD_BORDER[tone],
        className,
      ].join(' ')}
    >
      {/* ── Corps : bulle icône + contenu ───────────────────────────────── */}
      <div className="flex items-start gap-stack">
        <span
          className={[
            'shrink-0 grid place-items-center rounded-2xl',
            'w-12 h-12 @lg:w-14 @lg:h-14',
            ICON_BUBBLE[tone],
          ].join(' ')}
          aria-hidden
        >
          <Play size={20} fill="currentColor" strokeWidth={0} className="translate-x-px" />
        </span>

        {/* Anatomie (passe typographique du 2026-09-24) :
              état + étape → titre 4 · titre → prochaine leçon 8 · → méta 12.
            Le titre reste un h2 — la carte vit sous le h1 de la page — et
            prend le pas de son niveau : 20 px dans une colonne étroite, 28 dès
            que la carte a la place (`@lg`). Il était à 20,8 puis 24,8 px, deux
            tailles hors échelle, avec un interligne et un tracking écrits à
            côté du pas. Le `mt-stack-3xs` explicite remplace la marge de base
            des titres (0,75em = 21 px), faite pour séparer des sections. */}
        <div className="flex-1 min-w-0 flex flex-col gap-stack-sm">
          <div className="flex flex-col gap-stack-xs">
            <div className="flex flex-col">
              {/* Rôle 1 — l'état (Badge) + le contexte d'étape (méta) */}
              <div className="flex items-center gap-stack-xs flex-wrap">
                <Badge variant={STATUS_BADGE[tone]} dot className="shrink-0">En cours</Badge>
                {stepText && (
                  <span className="font-body text-caption text-ink-600">
                    {stepText}
                  </span>
                )}
              </div>

              {/* Rôle 2 — titre héros */}
              <h2 id={`resume-${id}-titre`} className="mt-stack-3xs font-display text-h3 @lg:text-h2 text-ink-900 text-balance">
                {parcoursTitle}
              </h2>
            </div>

            {/* Prochaine leçon — l'icône tient dans une boîte haute d'une ligne
                (`h-lh`) : elle se centre sur la première ligne, pas sur le bloc. */}
            {nextLessonTitle && (
              <p className="flex items-start gap-stack-2xs font-body text-body text-ink-700 m-0">
                <span className="inline-flex items-center h-lh shrink-0 text-ink-600" aria-hidden>
                  <Target size={16} strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="text-ink-600">Prochaine leçon · </span>
                  <span className="font-semibold text-ink-900">{nextLessonTitle}</span>
                </span>
              </p>
            )}
          </div>

          {/* Rôle 3 — meta pills NEUTRES (faits) */}
          {metaItems.length > 0 && (
            <MetaPillGroup items={metaItems} size="sm" />
          )}
        </div>
      </div>

      {/* ── Footer : progression + CTA (mobile stack → desktop row) ──────── */}
      <div className="flex flex-col @lg:flex-row @lg:items-center gap-stack-sm @lg:gap-stack-md">
        <div className="flex-1 flex flex-col gap-stack-2xs">
          {/* Étiquette et valeur sur la même ligne de base : légende 13 ink-600,
              valeur 13/600 ink-900. L'étiquette était en capitales espacées
              (11 px) — le registre de Badge, pour un simple libellé. */}
          <div className="flex items-baseline justify-between gap-stack-xs">
            <span className="text-caption text-ink-600">
              Progression
            </span>
            <span className="text-caption font-semibold text-ink-900 tabular-nums">{clamped}&nbsp;%</span>
          </div>
          <div
            className="h-1.5 w-full rounded-pill bg-ink-100 overflow-hidden"
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression : ${clamped}%`}
          >
            <div
              className={['h-full rounded-pill transition-[width] duration-700 ease-out', PROGRESS_FILL[tone]].join(' ')}
              style={{ width: `${clamped}%` }}
            />
          </div>
        </div>

        {/* « Reprendre » est l'action principale de l'accueil (arbitrage n°19,
            qui la cite en exemple) : le `solid` de l'écran, au ton de la carte.
            C'est la seule carte à CTA qui naît `solid` — son unique consommateur,
            le tableau de bord, en fait son action dominante ; les autres cartes
            portent une action de contexte (`soft`).
            Le CTA refaisait à la main ce que <Button> rend déjà, à 44 px près —
            il était à 44 par chance, pas par token. La map CTA_CLASSES est
            remplacée par le ton : brand / warm / sun. */}
        <Button
          size="md"
          emphasis="solid"
          tone={tone === 'primary' ? 'brand' : tone}
          onClick={(e) => { e.stopPropagation(); onClick?.(id); }}
          aria-label={ctaLabel}
          trailingIcon={<ArrowRight />}
          className="shrink-0 w-full @lg:w-auto"
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
};

export default ResumeLessonCard;
