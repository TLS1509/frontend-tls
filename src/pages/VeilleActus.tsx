/**
 * VeilleActus — Page n-1 catégorie : toutes les actus TLS.
 *
 * Listing chronologique (feed) avec featured spotlight en haut.
 * Tone : brand (info, leadership).
 *
 * Archétype hero : EditorialHero `brand` bounded + count + filter période.
 * Pattern listing : VeilleCardFeed list-mode (toujours en mode list ici car
 * chronologique).
 *
 * Cross-link : "Voir la newsletter hebdo" → /veille/weekly-newsletter
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ArrowLeft,
  Calendar,
  Megaphone,
  Video as VideoIcon,
  FolderOpen,
} from 'lucide-react';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { FilterChip } from '../components/ui/FilterChip';
import { Search } from '../components/ui/Search';
import { Button } from '../components/core/Button';
import {
  VeilleCardFeed,
  type VeilleFeedItem,
} from '../components/patterns/VeilleCardFeed';

type Period = 'all' | 'week' | 'month';

interface ActuItem extends VeilleFeedItem {
  publishedDate: string; // YYYY-MM-DD for filtering
}

const ACTUS: ActuItem[] = [
  { id: 'a1', type: 'actu', featured: true, typeLabel: 'À la une', TypeIcon: TrendingUp, tone: 'brand', title: 'IA générative en formation : le bilan 2026', summary: "Tour d'horizon des cas d'usage matures dans l'EdTech : qu'est-ce qui a tenu, qu'est-ce qui a déçu, où aller maintenant.", category: 'IA & Pédagogie', author: 'Rédaction TLS', publishedAt: "Aujourd'hui", readTime: '8 min', publishedDate: '2026-05-12' },
  { id: 'a2', type: 'actu', typeLabel: 'Actu', TypeIcon: TrendingUp, tone: 'brand', title: 'Le microlearning explose au CAC40', summary: '78 % des grands groupes ont adopté le microlearning : résultats et bonnes pratiques.', category: 'Formation', author: 'Pierre Leclerc', publishedAt: 'Hier', readTime: '4 min', publishedDate: '2026-05-11' },
  { id: 'a3', type: 'actu', typeLabel: 'Actu', TypeIcon: TrendingUp, tone: 'warm', title: 'Coaching IA : où passe la ligne de crête éthique ?', summary: "Quand l'IA conseille un manager sur sa carrière, qui assume les biais ? Analyse pratique des usages.", category: 'Coaching', author: 'Marie Dubois', publishedAt: 'Il y a 3 jours', readTime: '6 min', publishedDate: '2026-05-09' },
  { id: 'a4', type: 'actu', typeLabel: 'Actu', TypeIcon: TrendingUp, tone: 'sun', title: 'Apprendre dans un monde post-attention', summary: "L'attention résiduelle des apprenants est devenue la première contrainte UX. Comment design-er pour 6 minutes par jour ?", category: 'EdTech', author: 'TLS Insight', publishedAt: 'Il y a 1 semaine', readTime: '7 min', publishedDate: '2026-05-05' },
  { id: 'a5', type: 'actu', typeLabel: 'Actu', TypeIcon: TrendingUp, tone: 'brand', title: 'Compétences vertes : pourquoi tout le monde panique', summary: 'La nouvelle directive CSRD oblige à former massivement. Les RH ont 18 mois pour s\'organiser.', category: 'Management', author: 'TLS Rédaction', publishedAt: 'Il y a 2 semaines', readTime: '5 min', publishedDate: '2026-04-28' },
  { id: 'a6', type: 'actu', typeLabel: 'Actu', TypeIcon: TrendingUp, tone: 'warm', title: 'Le retour de l\'apprentissage par projet', summary: "Après l'âge d'or du e-learning passif, les entreprises redécouvrent les bénéfices du PBL.", category: 'Pédagogie', author: 'Sophie Martin', publishedAt: 'Il y a 3 semaines', readTime: '6 min', publishedDate: '2026-04-21' },
];

const PERIODS: { id: Period; label: string }[] = [
  { id: 'all',   label: 'Tout' },
  { id: 'week',  label: 'Cette semaine' },
  { id: 'month', label: 'Ce mois-ci' },
];

const RELATED_CATEGORIES = [
  { label: 'Newsletter hebdo', href: '/veille/weekly-newsletter', Icon: Megaphone, bubble: 'bg-accent-100 text-accent-700' },
  { label: 'Tutoriels',         href: '/veille/tutoriels',         Icon: VideoIcon, bubble: 'bg-secondary-100 text-secondary-700' },
  { label: 'Dossiers',          href: '/veille/dossiers',          Icon: FolderOpen, bubble: 'bg-primary-100 text-primary-700' },
];

const filterByPeriod = (items: ActuItem[], period: Period): ActuItem[] => {
  if (period === 'all') return items;
  const now = new Date('2026-05-12'); // mock today
  const ms = period === 'week' ? 7 : 30;
  const cutoff = new Date(now.getTime() - ms * 24 * 60 * 60 * 1000);
  return items.filter((item) => new Date(item.publishedDate) >= cutoff);
};

export const VeilleActus: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>('all');
  const [query, setQuery] = useState('');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const byPeriod = filterByPeriod(ACTUS, period);
    if (!query.trim()) return byPeriod;
    const q = query.trim().toLowerCase();
    return byPeriod.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [period, query]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-page-ambient flex flex-col">
      <AmbientBlobs />

      <main className="relative z-base w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12 flex flex-col gap-section flex-1">

        {/* Breadcrumb retour */}
        <button
          type="button"
          onClick={() => navigate('/veille')}
          className="self-start inline-flex items-center gap-1.5 font-body text-caption text-ink-600 hover:text-primary-700 cursor-pointer bg-transparent border-0"
        >
          <ArrowLeft size={14} /> Retour à la veille
        </button>

        {/* Hero éditorial bounded */}
        <header className="flex flex-col gap-tight">
          <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-primary-100 border border-primary-200 text-caption font-bold text-primary-700">
            <TrendingUp size={12} /> Actus TLS
          </span>
          <h1 className="m-0 font-display text-h1 font-bold text-ink-900 leading-tight">
            L'essentiel de la semaine
          </h1>
          <p className="m-0 font-body text-body text-ink-600 max-w-prose">
            Toutes les actualités curées par notre équipe éditoriale. Mises à jour chaque vendredi.
          </p>
        </header>

        {/* Toolbar : search + period filters */}
        <div className="flex flex-col gap-stack-xs">
          <Search
            variant="default"
            placeholder="Rechercher une actu, un sujet…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap">
            {PERIODS.map(({ id, label }) => (
              <FilterChip
                key={id}
                label={label}
                icon={<Calendar size={12} />}
                active={period === id}
                onClick={() => setPeriod(id)}
              />
            ))}
            <span className="ml-auto inline-flex items-center font-body text-caption text-ink-500">
              <strong className="text-primary-700">{filtered.length}</strong>&nbsp;actu{filtered.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Feed */}
        <VeilleCardFeed
          items={filtered}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onItemClick={(item) => navigate(`/veille/weekly-news/${item.id}`)}
          emptyMessage="Aucune actu sur cette période — élargissez la fenêtre."
        />

        {/* Cross-categories nav */}
        <section
          aria-label="Autres catégories"
          className="flex flex-col gap-stack-lg pt-section border-t border-ink-100"
        >
          <div className="flex flex-col gap-tight">
            <h2 className="m-0 font-display text-h4 font-bold text-ink-900">
              Continuer l'exploration
            </h2>
            <p className="m-0 font-body text-body-sm text-ink-600">
              D'autres formats pour creuser ou prendre du recul.
            </p>
          </div>
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
          <div className="self-center">
            <Button variant="ghost" size="sm" onClick={() => navigate('/veille/weekly-newsletter')}>
              Voir la dernière édition hebdo →
            </Button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default VeilleActus;
