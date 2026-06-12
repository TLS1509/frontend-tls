/**
 * Magazine : Phase 10 Tier 2 refonte.
 *
 * Page landing du Magazine TLS (numéro courant) : pattern issue/numéro.
 *
 * Structure (per Figma audit) :
 *  1. Sticky glass header (back + bookmark + download)
 *  2. Full-bleed dark hero avec eyebrow + h1 + meta date/pages
 *  3. EditorialLayout asideFirst : Synthèse exécutive sticky gauche
 *     + Sommaire numéroté droite (NumberedArticleListItem)
 */

import React from 'react';
import { useBookmarksStore } from '../stores/persistence';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Download,
  ArrowRight,
  CalendarDays,
  FileText,
  ArrowLeft,
  Bookmark,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { Container } from '../components/layout';

/* ─── Data ───────────────────────────────────────────────────────────────── */

interface MagazineEntry {
  num: string;
  title: string;
  pages: string;
  tone: 'brand' | 'warm' | 'sun';
}

const SOMMAIRE: MagazineEntry[] = [
  { num: '01', title: "L'IA générative redéfinit la conception pédagogique",                pages: 'pp. 4–12',  tone: 'brand' },
  { num: '02', title: 'Micro-learning et neurosciences : ce que la science dit vraiment',   pages: 'pp. 14–22', tone: 'warm'  },
  { num: '03', title: "Portrait : 10 formateurs qui transforment leur pratique avec l'IA", pages: 'pp. 24–30', tone: 'sun'   },
  { num: '04', title: 'Outils du moment : comparatif des LMS nouvelle génération',         pages: 'pp. 32–40', tone: 'brand' },
  { num: '05', title: 'Tendances 2026 : ce qui va changer dans la formation professionnelle', pages: 'pp. 42–50', tone: 'warm'  },
  { num: '06', title: 'Tribune libre : quel futur pour le métier de formateur ?',           pages: 'pp. 52–56', tone: 'sun'   },
];

const SUMMARY_POINTS = [
  '6 thématiques approfondies',
  '12 formateurs interviewés',
  '3 études de cas inédites',
  'Outils & ressources inclus',
];

const ENTRY_TONE: Record<'brand' | 'warm' | 'sun', { num: string; hover: string }> = {
  brand: { num: 'text-primary-600',   hover: 'hover:bg-primary-50' },
  warm:  { num: 'text-secondary-600', hover: 'hover:bg-secondary-50' },
  sun:   { num: 'text-accent-700',    hover: 'hover:bg-accent-50' },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Magazine: React.FC = () => {
  const navigate = useNavigate();
  const bookmarkKey = 'magazine-current-issue';
  const saved = useBookmarksStore((s) => s.ids.includes(bookmarkKey));
  const toggleBookmark = useBookmarksStore((s) => s.toggle);

  return (
    <div className="min-h-[100dvh] bg-surface">
      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <Container width="page" className="h-14 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate('/veille')}
          >
            Retour à la veille
          </Button>

          <div className="flex items-center gap-stack-xs">
            <Button variant="primary" size="sm" leadingIcon={<Download size={13} />} className="hidden sm:inline-flex">
              Télécharger le PDF
            </Button>
            <Button
              variant={saved ? 'primary' : 'ghost'}
              size="sm"
              iconOnly
              aria-label={saved ? 'Retirer le marque-page' : 'Ajouter aux marque-pages'}
              onClick={() => toggleBookmark(bookmarkKey)}
            >
              <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="Partager">
              <Share2 size={15} />
            </Button>
          </div>
        </Container>
      </div>

      {/* Full-bleed dark hero */}
      <section className="relative bg-gradient-to-br from-ink-900 via-primary-900 to-ink-800 overflow-hidden">
        {/* Decorative radial blobs : colored ambient */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(150,195,207,0.5) 0%, transparent 70%)' }}
        />
        <div
          aria-hidden
          className="absolute -bottom-16 -left-16 w-[350px] h-[350px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,154,95,0.6) 0%, transparent 70%)' }}
        />

        <Container width="page" className="relative py-section sm:py-page flex flex-col gap-stack-lg">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-stack-xs self-start px-3 py-1.5 rounded-pill bg-white/10 border border-white/20 text-white font-body text-micro font-bold uppercase tracking-widest backdrop-blur-glass-light">
            <BookOpen size={12} />
            Magazine TLS · Édition Printemps 2026
          </span>

          <h1 className="m-0 font-display text-h1 sm:text-[3.25rem] lg:text-[4rem] font-extrabold text-white leading-[1.05] tracking-tight max-w-content">
            L'IA au cœur de la formation
          </h1>

          <p className="m-0 font-body text-body-lg text-white/75 leading-relaxed max-w-2xl">
            56 pages de recherches, portraits, analyses et tendances pour transformer vos
            pratiques pédagogiques en 2026.
          </p>

          <div className="flex items-center gap-5 flex-wrap font-body text-caption text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} /> Avril 2026
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <FileText size={13} /> 56 pages
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Download size={13} /> 1 240 téléchargements
            </span>
          </div>
        </Container>
      </section>

      {/* Body : Editorial layout aside-left (Synthèse) + Sommaire main */}
      <Container width="page" className="py-section">
        <EditorialLayout
          asideFirst
          aside={
            <SectionCard
              titleIcon={<FileText size={18} />}
              title="Synthèse exécutive"
              description="Lecture rapide"
              actions={
                <Button variant="primary" size="sm" leadingIcon={<Download size={13} />}>
                  Télécharger le PDF
                </Button>
              }
            >
              <p className="m-0 font-body text-body-sm text-ink-700 leading-relaxed">
                Ce numéro explore comment l'IA générative transforme concrètement le métier de
                formateur : de la conception des contenus à la personnalisation des parcours.
                Nos experts dressent un panorama complet des pratiques émergentes, soutenu par
                des données terrain et des témoignages de formateurs pionniers.
              </p>

              <ul className="m-0 p-0 list-none flex flex-col gap-stack-xs mt-stack">
                {SUMMARY_POINTS.map((point, i) => (
                  <li key={i} className="flex items-center gap-stack-xs font-body text-body-sm text-ink-800">
                    <CheckCircle2 size={14} className="text-primary-600 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </SectionCard>
          }
          main={
            <SectionCard
              titleIcon={<BookOpen size={18} />}
              title="Sommaire du magazine"
              description="6 articles · 56 pages"
            >
              <div className="-mx-5 -mb-5 sm:-mx-6 sm:-mb-stack-lg">
                {SOMMAIRE.map((item, index) => {
                  const tone = ENTRY_TONE[item.tone];
                  return (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => navigate('/veille/magazine-article/1')}
                      className={[
                        'w-full flex items-start gap-stack px-5 sm:px-stack-lg py-stack text-left cursor-pointer transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500',
                        tone.hover,
                        index < SOMMAIRE.length - 1 ? 'border-b border-ink-100' : '',
                        '!h-auto !overflow-visible !items-start !font-normal',
                      ].join(' ')}
                    >
                      <span className={`font-display text-h2 font-extrabold leading-none min-w-[40px] shrink-0 tabular-nums ${tone.num}`}>
                        {item.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="m-0 font-body text-body font-semibold text-ink-900 leading-snug">
                          {item.title}
                        </p>
                        <span className="font-body text-caption text-ink-500 italic mt-1 inline-block">
                          {item.pages}
                        </span>
                      </div>
                      <ArrowRight size={15} className="text-ink-400 shrink-0 mt-1.5" />
                    </button>
                  );
                })}
              </div>
            </SectionCard>
          }
        />
      </Container>
    </div>
  );
};

export default Magazine;
