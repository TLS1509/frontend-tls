/**
 * MarketingVariantLab — Switcher de variantes de mise en page
 *
 * Dev-only page at /marketing/_variants (standalone, no MarketingLayout wrapper)
 * Lets you switch between the 6 homepage layout variants.
 *
 * Accompagnement et Learning App n'ont qu'une seule version chacun (pas de
 * variantes à comparer) — ils sont accessibles directement via leurs routes
 * `/website/accompagnement` et `/website/learning-app`.
 *
 * Flow (Organic), Audience-split et Momentum retirés le 03/07 (triage) : Flow
 * dupliquait la même conviction que Cinematic, Audience-split n'était qu'un
 * outil de comparaison pour la décision sitemap (déjà tranchée en faveur
 * d'Original), Momentum partageait le même bug de scroll-jack que Cinematic
 * (conteneur 200vh + fade sur 28% seulement) sans rien apporter de propre
 * (word-swap quasi identique à Cinematic, TRUST_CHIPS vide/mort).
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MarketingHome } from './MarketingHome';
import { MarketingHomeClarity } from './MarketingHomeClarity';
import { MarketingHomeNarrative } from './MarketingHomeNarrative';
import { MarketingHomeRefined } from './MarketingHomeRefined';
import { MarketingHomeCinematic } from './MarketingHomeCinematic';

type VariantKey = 1 | 2 | 4 | 6 | 7;

interface VariantMeta {
  label: string;
  badge: string;
  badgeColor: string;
}

const VARIANT_LABELS: Record<VariantKey, VariantMeta> = {
  1: { label: 'Original', badge: 'SkillMap · STRIDE', badgeColor: 'bg-ink-200 text-ink-700' },
  2: { label: 'Clarity-First', badge: 'Light · Clear', badgeColor: 'bg-primary-100 text-primary-700' },
  4: { label: 'Storyteller', badge: 'Sticky Story', badgeColor: 'bg-accent-100 text-ink-900' },
  6: { label: 'Elegant', badge: 'Premium', badgeColor: 'bg-secondary-100 text-secondary-700' },
  7: { label: 'Cinematic', badge: '🎬 Motion', badgeColor: 'bg-accent-100 text-ink-900' },
};

const COMPONENTS: Record<VariantKey, React.FC> = {
  1: MarketingHome,
  2: MarketingHomeClarity,
  4: MarketingHomeNarrative,
  6: MarketingHomeRefined,
  7: MarketingHomeCinematic,
};

const VARIANT_KEYS = Object.keys(VARIANT_LABELS).map(Number) as VariantKey[];

export const MarketingVariantLab: React.FC = () => {
  const [variant, setVariant] = useState<VariantKey>(1);

  const PageComponent = COMPONENTS[variant];
  const variantMeta = VARIANT_LABELS[variant];
  const currentIndex = VARIANT_KEYS.indexOf(variant);

  return (
    <div className="min-h-screen bg-ink-50">
      {/* ── Sticky switcher bar ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-[999] bg-white/97 backdrop-blur-glass-medium border-b border-ink-200 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center gap-stack flex-wrap">
          {/* Brand mark */}
          <span className="font-display text-body-sm font-extrabold text-primary-700 tracking-tight shrink-0 hidden sm:inline">
            TLS Variant Lab
          </span>
          <div className="w-px h-6 bg-ink-200 shrink-0 hidden sm:block" />

          {/* Variant tabs */}
          <div className="flex gap-tight flex-wrap">
            {VARIANT_KEYS.map((v) => {
              const meta = VARIANT_LABELS[v];
              const isActive = variant === v;
              return (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={[
                    'inline-flex items-center gap-tight font-body text-body-sm font-bold px-3 h-9 rounded-lg transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    isActive
                      ? 'bg-ink-900 text-white shadow-xs'
                      : 'bg-transparent text-ink-600 hover:bg-ink-100 border border-ink-200',
                  ].join(' ')}
                >
                  <span className="hidden md:inline">{meta.label}</span>
                  <span className="md:hidden">{v}</span>
                  <span className={`inline-flex px-1.5 py-px rounded text-micro font-bold ${isActive ? 'bg-white/15 text-white' : meta.badgeColor}`}>
                    {meta.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active indicator */}
          {variantMeta && (
            <div className="ml-auto shrink-0 hidden lg:flex items-center gap-tight">
              <div className="w-2 h-2 rounded-full bg-success-base animate-pulse" />
              <span className="font-body text-caption text-ink-500">
                Homepage · {variantMeta.label}
              </span>
            </div>
          )}

          <Link
            to="/website/_taglines"
            className="shrink-0 inline-flex items-center h-9 px-3 rounded-lg font-body text-body-sm font-bold text-secondary-700 bg-secondary-50 border border-secondary-100 hover:bg-secondary-100 transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            🏷️ Taglines
          </Link>
        </div>
      </div>

      {/* ── Page render ──────────────────────────────────────────────────── */}
      <div className="bg-white">
        {PageComponent ? <PageComponent /> : null}
      </div>

      {/* ── Bottom nav ───────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 z-[998] bg-white/97 backdrop-blur-glass-medium border-t border-ink-200 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-4 h-12 flex items-center justify-between gap-stack">
          <button
            onClick={() => {
              if (currentIndex > 0) setVariant(VARIANT_KEYS[currentIndex - 1]);
            }}
            disabled={currentIndex === 0}
            className="font-body text-body-sm font-bold text-ink-600 disabled:text-ink-300 hover:text-ink-900 transition-colors duration-fast flex items-center gap-tight"
          >
            ← Précédent
          </button>

          <div className="flex gap-stack-xs">
            {VARIANT_KEYS.map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={[
                  'w-2 h-2 rounded-full transition-all duration-fast',
                  variant === v ? 'bg-ink-900 scale-125' : 'bg-ink-300 hover:bg-ink-500',
                ].join(' ')}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (currentIndex < VARIANT_KEYS.length - 1) setVariant(VARIANT_KEYS[currentIndex + 1]);
            }}
            disabled={currentIndex === VARIANT_KEYS.length - 1}
            className="font-body text-body-sm font-bold text-ink-600 disabled:text-ink-300 hover:text-ink-900 transition-colors duration-fast flex items-center gap-tight"
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketingVariantLab;
