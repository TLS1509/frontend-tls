/**
 * MarketingVariantLab — Switcher de variantes de mise en page
 *
 * Dev-only page at /marketing/_variants (standalone, no MarketingLayout wrapper)
 * Lets you switch between layout variants for Homepage, Accompagnement, Learning App.
 */

import React, { useState } from 'react';
import { MarketingHome } from './MarketingHome';
import { MarketingHomeLight } from './MarketingHomeLight';
import { MarketingHomeParallax } from './MarketingHomeParallax';
import { MarketingHomeEditorial } from './MarketingHomeEditorial';
import { MarketingHomeFullPage } from './MarketingHomeFullPage';
import { MarketingHomeA } from './MarketingHomeA';
import { MarketingHomeCinematic } from './MarketingHomeCinematic';
import { MarketingHomeWatercolorScroll } from './MarketingHomeWatercolorScroll';
import { MarketingAccompagnement } from './MarketingAccompagnement';
import { MarketingAccompagnementA2 } from './MarketingAccompagnementA2';
import { MarketingAccompagnementA3 } from './MarketingAccompagnementA3';
import { MarketingLearningApp } from './MarketingLearningApp';
import { MarketingLearningAppB2 } from './MarketingLearningAppB2';
import { MarketingLearningAppB3 } from './MarketingLearningAppB3';

type PageKey = 'home' | 'acc' | 'la';
type VariantKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const PAGE_LABELS: Record<PageKey, string> = {
  home: 'Homepage',
  acc: 'Accompagnement',
  la: 'Learning App',
};

interface VariantMeta {
  label: string;
  badge: string;
  badgeColor: string;
}

const VARIANT_LABELS: Record<PageKey, Partial<Record<VariantKey, VariantMeta>>> = {
  home: {
    1: { label: 'V1 · Quick Wins', badge: '72→82', badgeColor: 'bg-ink-200 text-ink-700' },
    2: { label: 'V2 · Light', badge: 'Minimaliste', badgeColor: 'bg-primary-100 text-primary-700' },
    3: { label: 'V3 · Parallax', badge: '3-layers', badgeColor: 'bg-secondary-100 text-secondary-700' },
    4: { label: 'V4 · Editorial', badge: 'Sticky', badgeColor: 'bg-accent-100 text-ink-900' },
    5: { label: 'V5 · FullPage', badge: 'Word-swap', badgeColor: 'bg-primary-100 text-primary-700' },
    6: { label: 'V6 · HomeA', badge: 'Épuré', badgeColor: 'bg-secondary-100 text-secondary-700' },
    7: { label: 'V7 · Cinematic', badge: '🎬 Video', badgeColor: 'bg-accent-100 text-ink-900' },
    8: { label: 'V8 · Watercolor', badge: 'Scroll', badgeColor: 'bg-primary-100 text-primary-700' },
  },
  acc: {
    1: { label: 'A1 · Services + Timeline', badge: 'Actuel', badgeColor: 'bg-ink-200 text-ink-700' },
    2: { label: 'A2 · Édito Manifeste', badge: 'Éditorial', badgeColor: 'bg-primary-100 text-primary-700' },
    3: { label: 'A3 · Split Livrables', badge: 'Premium', badgeColor: 'bg-secondary-100 text-secondary-700' },
  },
  la: {
    1: { label: 'B1 · Mockup Hero', badge: 'Actuel', badgeColor: 'bg-ink-200 text-ink-700' },
    2: { label: 'B2 · Zigzag Features', badge: 'Éditorial', badgeColor: 'bg-primary-100 text-primary-700' },
    3: { label: 'B3 · Bento Bold', badge: 'Bold', badgeColor: 'bg-accent-100 text-warning-fg' },
  },
};

type ComponentMap = Record<PageKey, Partial<Record<VariantKey, React.FC>>>;

const COMPONENTS: ComponentMap = {
  home: {
    1: MarketingHome,
    2: MarketingHomeLight,
    3: MarketingHomeParallax,
    4: MarketingHomeEditorial,
    5: MarketingHomeFullPage,
    6: MarketingHomeA,
    7: MarketingHomeCinematic,
    8: MarketingHomeWatercolorScroll,
  },
  acc: {
    1: MarketingAccompagnement,
    2: MarketingAccompagnementA2,
    3: MarketingAccompagnementA3,
  },
  la: {
    1: MarketingLearningApp,
    2: MarketingLearningAppB2,
    3: MarketingLearningAppB3,
  },
};

const PAGE_VARIANT_COUNT: Record<PageKey, number> = {
  home: 8,
  acc: 3,
  la: 3,
};

export const MarketingVariantLab: React.FC = () => {
  const [page, setPage] = useState<PageKey>('home');
  const [variant, setVariant] = useState<Record<PageKey, VariantKey>>({ home: 1, acc: 1, la: 1 });

  const currentVariant = variant[page];
  const PageComponent = COMPONENTS[page][currentVariant];
  const variantMeta = VARIANT_LABELS[page][currentVariant];
  const variantCount = PAGE_VARIANT_COUNT[page];

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

          {/* Page tabs */}
          <div className="flex gap-tight">
            {(Object.keys(PAGE_LABELS) as PageKey[]).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={[
                  'font-body text-body-sm font-bold px-4 h-9 rounded-pill transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  page === p
                    ? 'bg-primary-500 text-white shadow-xs'
                    : 'bg-transparent text-ink-600 hover:bg-ink-100 border border-ink-200',
                ].join(' ')}
              >
                {PAGE_LABELS[p]}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-ink-200 shrink-0" />

          {/* Variant tabs */}
          <div className="flex gap-tight flex-wrap">
            {Array.from({ length: variantCount }, (_, i) => (i + 1) as VariantKey).map((v) => {
              const meta = VARIANT_LABELS[page][v];
              if (!meta) return null;
              const isActive = currentVariant === v;
              return (
                <button
                  key={v}
                  onClick={() => setVariant((prev) => ({ ...prev, [page]: v }))}
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
                {PAGE_LABELS[page]} — {variantMeta.label}
              </span>
            </div>
          )}
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
              if (currentVariant > 1) setVariant((prev) => ({ ...prev, [page]: (currentVariant - 1) as VariantKey }));
            }}
            disabled={currentVariant === 1}
            className="font-body text-body-sm font-bold text-ink-600 disabled:text-ink-300 hover:text-ink-900 transition-colors duration-fast flex items-center gap-tight"
          >
            ← Précédent
          </button>

          <div className="flex gap-stack-xs">
            {Array.from({ length: variantCount }, (_, i) => (i + 1) as VariantKey).map((v) => (
              <button
                key={v}
                onClick={() => setVariant((prev) => ({ ...prev, [page]: v }))}
                className={[
                  'w-2 h-2 rounded-full transition-all duration-fast',
                  currentVariant === v ? 'bg-ink-900 scale-125' : 'bg-ink-300 hover:bg-ink-500',
                ].join(' ')}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (currentVariant < variantCount) setVariant((prev) => ({ ...prev, [page]: (currentVariant + 1) as VariantKey }));
            }}
            disabled={currentVariant === variantCount}
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
