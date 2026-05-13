/**
 * VeilleDossiers — Page n-1 catégorie : tous les dossiers TLS.
 *
 * Tone : warm (long-form, analyse, profondeur).
 *
 * Archétype hero : EditorialHero `warm` bounded + emoji + count.
 * Pattern listing : featured top full-bleed + grid 2-cols card-dominant.
 * DossierCard : emoji-bubble + title + pages + downloads + tags.
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  ArrowLeft,
  FileText,
  Download,
  ArrowRight,
  TrendingUp,
  Video as VideoIcon,
  BookOpen,
} from 'lucide-react';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { FilterChip } from '../components/ui/FilterChip';
import { Search } from '../components/ui/Search';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';

type Category = 'all' | 'leadership' | 'pedagogie' | 'tech' | 'rh';

interface Dossier {
  id: string;
  emoji: string;
  title: string;
  summary: string;
  pages: number;
  downloads: number;
  category: 'leadership' | 'pedagogie' | 'tech' | 'rh';
  tags: string[];
  publishedAt: string;
  featured?: boolean;
}

const DOSSIERS: Dossier[] = [
  { id: 'd1', emoji: '🧠', title: 'Transformation IA des parcours de formation', summary: "Synthèse approfondie de l'impact de l'IA sur les dispositifs de formation professionnelle en Europe. Analyse de 47 entreprises, 12 cas d'usage matures.", pages: 42, downloads: 1280, category: 'pedagogie', tags: ['IA', 'Formation pro', 'Europe'], publishedAt: 'Il y a 3 jours', featured: true },
  { id: 'd2', emoji: '📊', title: 'L\'apprenant 2030 : portrait robot', summary: 'Étude longitudinale sur les attentes et comportements d\'apprentissage en entreprise.', pages: 28, downloads: 890, category: 'rh', tags: ['Apprenant', 'Tendances', 'RH'], publishedAt: 'Il y a 1 semaine' },
  { id: 'd3', emoji: '🎯', title: 'ROI de la formation : nouveaux modèles', summary: 'Au-delà de Kirkpatrick — 4 modèles modernes pour mesurer l\'impact réel.', pages: 36, downloads: 2150, category: 'leadership', tags: ['ROI', 'Évaluation', 'Mesure'], publishedAt: 'Il y a 2 semaines' },
  { id: 'd4', emoji: '🔬', title: 'LLM en entreprise : guide d\'implémentation', summary: 'De la POC au déploiement scale — architecture, gouvernance, ROI technique.', pages: 54, downloads: 1730, category: 'tech', tags: ['LLM', 'Architecture', 'Tech'], publishedAt: 'Il y a 3 semaines' },
  { id: 'd5', emoji: '💡', title: 'Coaching augmenté : promesses et limites', summary: "L'IA comme co-pilote du coach : entretiens, expérimentations, cadre déontologique.", pages: 31, downloads: 645, category: 'leadership', tags: ['Coaching', 'IA', 'Éthique'], publishedAt: 'Il y a 1 mois' },
  { id: 'd6', emoji: '🌱', title: 'Compétences vertes : feuille de route 2026-2028', summary: 'Plan d\'action concret pour former 100 % de ses effectifs aux compétences durabilité.', pages: 44, downloads: 920, category: 'rh', tags: ['CSRD', 'Vert', 'RH'], publishedAt: 'Il y a 1 mois' },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all',        label: 'Tous les dossiers' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'pedagogie',  label: 'Pédagogie' },
  { id: 'tech',       label: 'Tech & IA' },
  { id: 'rh',         label: 'RH & Stratégie' },
];

const RELATED_CATEGORIES = [
  { label: 'Actus de la semaine', href: '/veille/actus',     Icon: TrendingUp, bubble: 'bg-primary-100 text-primary-700' },
  { label: 'Tutoriels',           href: '/veille/tutoriels', Icon: VideoIcon,  bubble: 'bg-accent-100 text-accent-700' },
  { label: 'Magazine TLS',        href: '/veille/magazine',  Icon: BookOpen,   bubble: 'bg-primary-100 text-primary-700' },
];

export const VeilleDossiers: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let result = DOSSIERS;
    if (category !== 'all') result = result.filter((d) => d.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((d) =>
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [category, query]);

  const featured = filtered.find((d) => d.featured);
  const others = filtered.filter((d) => !d.featured);

  return (
    <div className="relative min-h-screen bg-gradient-page-ambient-warm flex flex-col">
      <AmbientBlobs />

      <main className="relative z-base w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12 flex flex-col gap-section flex-1">

        <button
          type="button"
          onClick={() => navigate('/veille')}
          className="self-start inline-flex items-center gap-1.5 font-body text-caption text-ink-600 hover:text-secondary-700 cursor-pointer bg-transparent border-0"
        >
          <ArrowLeft size={14} /> Retour à la veille
        </button>

        {/* Hero warm-toned */}
        <header className="flex flex-col gap-tight">
          <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-secondary-100 border border-secondary-200 text-caption font-bold text-secondary-800">
            <FolderOpen size={12} /> Dossiers TLS
          </span>
          <h1 className="m-0 font-display text-h1 font-bold text-ink-900 leading-tight">
            Analyses longues pour creuser
          </h1>
          <p className="m-0 font-body text-body text-ink-600 max-w-prose">
            Dossiers thématiques publiés par l'équipe éditoriale TLS. Lecture posée, données solides, recommandations actionnables.
          </p>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col gap-stack-xs">
          <Search
            variant="default"
            placeholder="Rechercher un dossier, sujet, auteur…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(({ id, label }) => (
              <FilterChip
                key={id}
                label={label}
                active={category === id}
                onClick={() => setCategory(id)}
              />
            ))}
            <span className="ml-auto inline-flex items-center font-body text-caption text-ink-500">
              <strong className="text-secondary-700">{filtered.length}</strong>&nbsp;dossier{filtered.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Featured full-bleed top */}
        {featured && (
          <article
            onClick={() => navigate(`/veille/dossier/${featured.id}`)}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary-100 via-secondary-200 to-accent-200 border border-secondary-200 p-6 sm:p-8 lg:p-10 cursor-pointer hover:shadow-md transition-shadow duration-base"
          >
            <div className="flex flex-col md:flex-row gap-stack-lg md:items-center">
              <span aria-hidden className="text-6xl sm:text-7xl shrink-0">
                {featured.emoji}
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-stack">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="warm">À la une</Badge>
                  {featured.tags.map((t) => (
                    <span key={t} className="inline-flex items-center px-2 py-0.5 rounded-pill bg-white/80 text-secondary-800 border border-secondary-300 text-micro font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight">
                  {featured.title}
                </h2>
                <p className="m-0 font-body text-body text-ink-700 leading-relaxed max-w-2xl">
                  {featured.summary}
                </p>
                <div className="flex items-center gap-3 flex-wrap font-body text-caption text-ink-600">
                  <span className="inline-flex items-center gap-1">
                    <FileText size={13} /> {featured.pages} pages
                  </span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Download size={13} /> {featured.downloads.toLocaleString('fr-FR')} téléchargements
                  </span>
                  <span aria-hidden>·</span>
                  <span>{featured.publishedAt}</span>
                </div>
                <Button variant="warm" size="sm" trailingIcon={<ArrowRight size={13} />} className="self-start mt-1">
                  Lire le dossier
                </Button>
              </div>
            </div>
          </article>
        )}

        {/* Grid 2-cols card-dominant */}
        {others.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {others.map((dossier) => (
              <article
                key={dossier.id}
                onClick={() => navigate(`/veille/dossier/${dossier.id}`)}
                className="group flex flex-col gap-stack p-5 sm:p-6 rounded-2xl bg-white/75 backdrop-blur-glass-light border border-ink-100 cursor-pointer hover:border-secondary-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-base"
              >
                <div className="flex items-start gap-3">
                  <span aria-hidden className="text-4xl shrink-0">
                    {dossier.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="m-0 font-display text-body-lg font-bold text-ink-900 leading-tight">
                      {dossier.title}
                    </h3>
                    <p className="m-0 mt-1 font-body text-body-sm text-ink-600 leading-relaxed line-clamp-3">
                      {dossier.summary}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {dossier.tags.map((t) => (
                    <span key={t} className="inline-flex items-center px-2 py-0.5 rounded-pill bg-secondary-50 text-secondary-700 border border-secondary-200 text-micro font-semibold">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 flex-wrap font-body text-caption text-ink-500 mt-auto">
                  <span className="inline-flex items-center gap-1">
                    <FileText size={12} /> {dossier.pages} p.
                  </span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Download size={12} /> {dossier.downloads.toLocaleString('fr-FR')}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{dossier.publishedAt}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-section font-body text-body text-ink-500">
            Aucun dossier dans cette catégorie — essayez d'élargir la recherche.
          </div>
        )}

        {/* Cross-categories */}
        <section
          aria-label="Autres catégories"
          className="flex flex-col gap-stack-lg pt-section border-t border-ink-100"
        >
          <h2 className="m-0 font-display text-h4 font-bold text-ink-900">
            Continuer l'exploration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RELATED_CATEGORIES.map((cat) => (
              <button
                key={cat.href}
                type="button"
                onClick={() => navigate(cat.href)}
                className={[
                  'group flex items-center gap-3 p-4 rounded-2xl',
                  'bg-white/70 backdrop-blur-glass-light border border-ink-100',
                  'hover:border-ink-200 hover:-translate-y-0.5 hover:shadow-sm',
                  'transition-all duration-base cursor-pointer text-left',
                  '!h-auto !overflow-visible !items-center !font-normal',
                ].join(' ')}
              >
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-pill ${cat.bubble}`}>
                  <cat.Icon size={16} />
                </span>
                <span className="font-body text-body-sm font-semibold text-ink-900 flex-1">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default VeilleDossiers;
