import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { EditorialHero } from '../../components/patterns/EditorialHero';
import { CardGrid } from '../../components/patterns/CardGrid';
import { SectionHeader } from '../../components/patterns/SectionHeader';
import { MetaPill } from '../../components/ui/MetaPill';
import { FilterChip } from '../../components/ui/FilterChip';

const CATEGORIES = ['Tous', 'IA', 'Pédagogie', 'Outils', 'Innovation', 'Retours d\'expérience'];

const ARTICLES = [
  { title: 'Le Référentiel des 5 Piliers de la formation augmentée', category: 'Pédagogie', date: 'Mai 2026', readTime: '8 min', featured: true, summary: 'Comment structurer une approche pédagogique cohérente face à l\'essor des outils d\'IA générative dans les dispositifs de formation.' },
  { title: 'L\'IA et le syndrome de la réponse facile', category: 'IA', date: 'Avril 2026', readTime: '6 min', featured: false, summary: 'Comprendre pourquoi la facilité apparente des outils IA peut nuire à l\'apprentissage profond et comment y remédier.' },
  { title: 'Le « Digital Twin » de l\'apprenant', category: 'Innovation', date: 'Avril 2026', readTime: '10 min', featured: false, summary: 'Vers une modélisation fine du profil apprenant pour des formations vraiment adaptatives — enjeux, limites et perspectives.' },
  { title: 'Prompt Engineering pour la formation : les 7 patterns clés', category: 'Outils', date: 'Mars 2026', readTime: '12 min', featured: false, summary: 'Maîtriser les patterns de prompt les plus efficaces pour concevoir des activités pédagogiques avec l\'IA générative.' },
  { title: 'Retour d\'expérience : déploiement IA chez un grand groupe industriel', category: 'Retours d\'expérience', date: 'Mars 2026', readTime: '7 min', featured: false, summary: 'Comment une organisation de 500 personnes a intégré l\'IA dans son dispositif formation en 3 mois — ce qui a marché, ce qui n\'a pas marché.' },
  { title: 'Les biais algorithmiques dans les outils pédagogiques', category: 'IA', date: 'Février 2026', readTime: '9 min', featured: false, summary: 'Panorama des biais les plus courants dans les IA génératives utilisées en formation et comment les identifier et les corriger.' },
];

const TONE_MAP: Record<string, 'primary' | 'warm' | 'sun' | 'default'> = {
  'IA': 'primary',
  'Pédagogie': 'warm',
  'Outils': 'sun',
  'Innovation': 'primary',
  'Retours d\'expérience': 'warm',
};

export const MarketingMagazine: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filtered = activeCategory === 'Tous'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <EditorialHero
        tone="default"
        eyebrow={{ icon: <TrendingUp size={14} />, label: 'Le Mag\'' }}
        title="Réflexions sur l'IA & la formation"
        summary="Explorations à la croisée de la pédagogie, de l'intelligence artificielle et de l'innovation. Par les experts de The Learning Society."
      />

      {/* ── Filters ── */}
      <section className="bg-white border-b border-ink-100 py-4 sticky top-16 z-dropdown">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="py-section-lg bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">

          {/* Featured article */}
          {featured && (
            <div className="mb-stack">
              <SectionHeader
                variant="minimal"
                tone="primary"
                size="md"
                icon={<BookOpen size={20} />}
                title="À la une"
              />
              <div className="mt-stack">
                <Link to="/marketing/magazine" className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg bg-white border border-ink-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-base">
                    <div className="h-64 lg:h-auto bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 flex items-center justify-center">
                      <BookOpen size={60} className="text-primary-300" strokeWidth={1} />
                    </div>
                    <div className="p-6 flex flex-col justify-center gap-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <MetaPill text={featured.category} tone={TONE_MAP[featured.category] ?? 'primary'} />
                        <span className="text-caption text-ink-400">{featured.date}</span>
                        <div className="flex items-center gap-1 text-caption text-ink-400">
                          <Clock size={12} />
                          {featured.readTime}
                        </div>
                      </div>
                      <h2 className="font-display text-h2 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-body text-ink-600 leading-relaxed m-0">{featured.summary}</p>
                      <div className="flex items-center gap-1 text-primary-600 font-semibold">
                        Lire l'article <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Article grid */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-stack">
              <SectionHeader
                variant="minimal"
                tone="neutral"
                size="md"
                icon={<TrendingUp size={20} />}
                title="Tous les articles"
              />
              <CardGrid layout="default" gapSize="md">
                {rest.map(({ title, category, date, readTime, summary }) => (
                  <Link key={title} to="/marketing/magazine" className="group block h-full">
                    <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-base h-full flex flex-col">
                      <div className="h-36 bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center">
                        <BookOpen size={32} className="text-primary-200" />
                      </div>
                      <div className="p-5 flex flex-col gap-3 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <MetaPill text={category} tone={TONE_MAP[category] ?? 'primary'} size="sm" />
                          <div className="flex items-center gap-1 text-caption text-ink-400">
                            <Clock size={11} />
                            {readTime}
                          </div>
                        </div>
                        <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors flex-1">
                          {title}
                        </h3>
                        <p className="text-body-sm text-ink-500 leading-relaxed m-0 line-clamp-2">{summary}</p>
                        <div className="flex items-center gap-1 text-primary-600 text-body-sm font-semibold pt-1">
                          Lire <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardGrid>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default MarketingMagazine;
